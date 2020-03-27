import * as Yup from 'yup';
import Order from '../models/Order';
import File from '../models/File';

class OrderFinishController {
  async update(req, res) {
    const orderExists = await Order.findOne({
      where: {
        id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
    });
    if (!orderExists) {
      return res.status(400).json({
        error:
          'Order does not exists or Canceled or Not Started or Already Finished!',
      });
    }
    const orderUpdate = await orderExists.update({
      end_date: new Date(),
    });
    return res.json(orderUpdate);
  }

  async alterfinish(req, res) {
    const { originalname: name, filename: path } = req.file;
    let signature_id = null;
    const fileinc = await File.create({
      name,
      path,
    });
    signature_id = fileinc.id;
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!orderExists) {
      return res.status(400).json({
        error: 'Order does not exists!',
      });
    }
    const end_date = new Date();
    const orderUpdate = await orderExists.update({
      end_date,
      signature_id,
    });
    return res.json(orderUpdate);
  }
}

export default new OrderFinishController();
