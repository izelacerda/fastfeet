import User from '../models/User';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import OrderProblems from '../models/OrderProblem';

class DashBoardController {
  async index(req, res) {
    const orders = await Order.count();
    const users = await User.count({
      where: {
        profile: 1,
      },
    });
    const recipients = await Recipient.count();
    const orderProblems = await OrderProblems.count();
    const result = {
      orders,
      users,
      recipients,
      orderProblems,
    };
    return res.json(result);
  }
}

export default new DashBoardController();
