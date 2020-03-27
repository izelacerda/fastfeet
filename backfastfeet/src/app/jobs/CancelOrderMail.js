import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelOrderMail {
  get key() {
    return 'CancelOrderMail';
  }

  async handle({ data }) {
    const { order } = data;
    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'cancel',
      context: {
        deliveryman: order.deliveryman.name,
        product: order.product,
        date: format(
          parseISO(order.canceled_at),
          "'dia' dd 'de' MMMM', as' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelOrderMail();
