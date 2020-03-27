import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const whereStatement = {};

    if (req.query.id) {
      whereStatement.id = req.query.id;
    }
    if (req.query.name) {
      whereStatement.name = {
        [Op.like]: `%${req.query.name}%`,
      };
    }
    const recipients = await Recipient.findAll({
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
      where: whereStatement,
    });
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipient Validation fails!' });
    }
    if (!req.userId) {
      return res
        .status(400)
        .json({ error: 'Only Administrators can insert Recipients!' });
    }
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });
    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }
    const recipient = await Recipient.create(req.body);

    return res.json({
      recipient,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Recipient Validation fails!' });
    }

    const { name } = req.body;

    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient id not exist.' });
    }
    if (name !== recipient.name) {
      const recipientExists = await Recipient.findOne({ where: { name } });
      if (recipientExists) {
        return res.status(400).json({
          error: 'Recipient already exists with a same name and diferente id.',
        });
      }
    }

    const recipientUpdate = await recipient.update(req.body);
    return res.json({
      recipientUpdate,
    });
  }

  async delete(req, res) {
    try {
      const recipient = await Recipient.findByPk(req.params.id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient does not exists.' });
      }
      recipient.destroy();
      return res.status(200).json({ error: 'Recipient deleted.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error to delete Recipient' });
    }
  }
}

export default new RecipientController();
