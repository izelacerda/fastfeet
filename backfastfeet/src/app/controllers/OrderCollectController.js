import * as Yup from 'yup';
import { Op } from 'sequelize';
import { getHours, startOfDay, endOfDay } from 'date-fns';

import Order from '../models/Order';

async function verifyCountDelivery(orderId, searchDate) {
  const numberDate = Number(searchDate);
  const counter = await Order.count({
    where: {
      deliveryman_id: orderId,
      // start_date: {
      //   [Op.not]: null,
      // },
      start_date: {
        [Op.between]: [startOfDay(numberDate), endOfDay(numberDate)],
      },
    },
  });
  return counter >= 5;
}
class OrderCollectController {
  async update(req, res) {
    const collect = new Date();
    if (getHours(collect) < 8 || getHours(collect) > 18) {
      return res
        .status(400)
        .json({ error: 'Collect is valid only between 8:00 and 18:00' });
    }
    const orderExists = await Order.findOne({
      where: { id: req.params.id, canceled_at: null, start_date: null },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists or Canceled or Already Collect!',
      });
    }
    if (await verifyCountDelivery(orderExists.deliveryman_id, collect)) {
      return res.status(400).json({
        error: 'Limit of Deliveries exceed ( Max 5)!',
      });
    }
    const orderUpdate = await orderExists.update({ start_date: collect });
    return res.json(orderUpdate);
  }

  async altercollect(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const { start_date } = req.body;
    if (getHours(start_date) < 8 || getHours(start_date) > 18) {
      return res
        .status(400)
        .json({ error: 'Collect is valid only between 8:00 and 18:00' });
    }
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Delivery does not exists!',
      });
    }
    if (
      await this.verifyCountDelivery(orderExists.deliveryman_id, start_date)
    ) {
      return res.status(400).json({
        error: 'Limit of Deliveries exceed ( Max 5)!',
      });
    }

    const orderUpdate = await orderExists.update({
      start_date,
    });
    return res.json(orderUpdate);
  }
}

export default new OrderCollectController();
