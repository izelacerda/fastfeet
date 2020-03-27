import Order from '../models/Order';

class OrderCancelController {
  async update(req, res) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id, canceled_at: null, start_date: null },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists or Already Canceled or Started!',
      });
    }
    const orderUpdate = await orderExists.update({
      canceled_at: new Date(),
    });
    return res.json(orderUpdate);
  }
}

export default new OrderCancelController();
