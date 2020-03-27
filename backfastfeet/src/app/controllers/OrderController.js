import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import CadastroOrderMail from '../jobs/CadastroOrderMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    const whereStatement = {};

    if (req.query.id) {
      whereStatement.id = req.query.id;
    }
    if (req.query.product) {
      whereStatement.product = {
        [Op.like]: `%${req.query.product}%`,
      };
    }
    const orders = await Order.findAll({
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
        'createdAt',
      ],
      where: whereStatement,
      // limit: 20,
      // offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'address',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: User,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }
    const deliverymanExists = await User.findOne({
      where: { id: req.body.deliveryman_id, profile: 1 },
    });
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }
    const orderInc = await Order.create(req.body);

    const order = await Order.findOne({
      where: {
        id: orderInc.id,
      },
      attributes: ['id', 'product', 'created_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'address',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: User,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    await Queue.add(CadastroOrderMail.key, {
      order,
    });
    return res.json({
      order,
      // signature,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const orderExists = await Order.findOne({
      where: { id: req.params.id, canceled_at: null, start_date: null },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists or Canceled or Start!',
      });
    }

    const orderUpdate = await orderExists.update(req.body);
    return res.json(orderUpdate);
  }

  async delete(req, res) {
    try {
      const orderExists = await Order.findOne({
        where: { id: req.params.id },
      });
      if (!orderExists) {
        return res.status(400).json({
          error: 'Order does not exists or Canceled or Start!',
        });
      }
      await orderExists.destroy();
      return res.status(200).json({ error: 'Order deleted.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error to delete order' });
    }
  }
}

export default new OrderController();
