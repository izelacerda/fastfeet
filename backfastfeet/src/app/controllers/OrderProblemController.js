import Sequelize from 'sequelize';
import * as Yup from 'yup';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import User from '../models/User';
import OrderProblem from '../models/OrderProblem';
import CancelOrderMail from '../jobs/CancelOrderMail';
import Queue from '../../lib/Queue';

class OrderProblemController {
  async index(req, res) {
    const problems = await OrderProblem.findAll({
      attributes: ['id', 'order_id', 'description', 'created_at'],
    });
    return res.json(problems);
  }

  async show(req, res) {
    const problems = await OrderProblem.findAll({
      where: { order_id: req.params.id },
      attributes: ['id', 'order_id', 'description', 'created_at'],
    });
    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists!',
      });
    }
    req.body.order_id = req.params.id;
    const orderProblem = await OrderProblem.create(req.body);

    return res.json({
      orderProblem,
    });
  }

  async delete(req, res) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists!',
      });
    }
    await orderExists.update({
      canceled_at: new Date(),
    });
    const order = await Order.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'product', 'canceled_at', 'status'],
      include: [
        {
          model: User,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    await Queue.add(CancelOrderMail.key, {
      order,
    });
    return res.json(order);
  }
}

export default new OrderProblemController();
