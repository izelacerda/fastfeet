import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const whereStatement = { profile: 1 };

    if (req.query.id) {
      whereStatement.id = req.query.id;
    }
    if (req.params.id) {
      whereStatement.id = req.params.id;
    }
    if (req.query.name) {
      whereStatement.name = {
        [Op.like]: `%${req.query.name}%`,
      };
    }
    if (req.query.email) {
      whereStatement.email = req.query.email;
    }
    const deliveryman = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id', 'createdAt'],
      where: whereStatement,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    if (req.params.id && deliveryman.length === 0) {
      return res.status(400).json({ error: 'DeliveryMan does not exists!' });
    }
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const deliverymanExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }
    req.body.profile = 1;
    req.body.password = null;
    const { id, name, email, profile } = await User.create(req.body);

    const { avatar } = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      email,
      avatar,
      profile,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email } = req.body;

    const deliveryman = await User.findByPk(req.params.id);
    if (email !== deliveryman.email) {
      const deliverymanExists = await User.findOne({ where: { email } });
      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' });
      }
    }

    await deliveryman.update(req.body);

    const { id, name, avatar_id, avatar } = await User.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({
      id,
      name,
      email,
      avatar_id,
      avatar,
    });
  }

  async delete(req, res) {
    try {
      const deliveryman = await User.findByPk(req.params.id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exists.' });
      }
      deliveryman.destroy();
      return res.status(200).json({ error: 'Deliveryman deleted.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error to delete Deliveryman' });
    }
  }
}

export default new DeliveryManController();
