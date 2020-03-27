import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CadastroOrderMail {
  get key() {
    return 'CadastroDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda Incluída',
      template: 'included',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        date: format(
          parseISO(delivery.created_at),
          "'dia' dd 'de' MMMM', as' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CadastroOrderMail();
