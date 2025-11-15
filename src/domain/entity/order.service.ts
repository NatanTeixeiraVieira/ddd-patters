import { Customer } from './customer.ts';
import { OrderItem } from './order-item.ts';
import { Order } from './order.ts';

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) {
      throw new Error('Order must have at least one item');
    }

    const order = new Order(crypto.randomUUID(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
