import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class DeliveryManOrdersController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    let whereStatement = { deliveryman_id: req.params.id };
    if (req.query.status) {
      if (req.query.status === 'PENDENTE') {
        whereStatement = {
          ...whereStatement,
          canceled_at: null,
          end_date: null,
        };
      } else if (req.query.status === 'ENTREGUE') {
        whereStatement = {
          ...whereStatement,
          canceled_at: null,
        };
        whereStatement.end_date = {
          [Op.ne]: null,
        };
      } else if (req.query.status === 'CANCELADO') {
        whereStatement = {
          ...whereStatement,
        };
        whereStatement.canceled_at = {
          [Op.ne]: null,
        };
      }
    }

    const deliveries = await Order.findAll({
      where: whereStatement,
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
        'createdAt',
      ],
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
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveries);
  }
}

export default new DeliveryManOrdersController();
