import { OrderItem } from './order-item.ts';
import { Order } from './order.ts';

describe('Order unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', []);
    }).toThrow(new Error('Id is required'));
  });

  it('should throw an error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '', []);
    }).toThrow(new Error('customerId is required'));
  });

  it('should throw an error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '123', []);
    }).toThrow(new Error('Item quantity must be greater than zero'));
  });

  it('should calculate total', () => {
    const item = new OrderItem('1', 'Item 1', 100, 'p1', 2);
    const item2 = new OrderItem('2', 'Item 2', 200, 'p2', 2);

    const order = new Order('o1', 'c1', [item]);
    const total = order.total();
    expect(total).toBe(200);

    const order2 = new Order('o1', 'c1', [item, item2]);

    const total2 = order2.total();
    expect(total2).toBe(600);
  });

  it('should throw error if the item quantity is less or equal to zero', () => {
    expect(() => {
      const item = new OrderItem('1', 'Item 1', 100, 'p1', 0);
      const order = new Order('o1', 'c1', [item]);
    }).toThrow(new Error('Item quantity must be greater than zero'));
  });

  it('should add item to order', () => {
    const item = new OrderItem('1', 'Item 1', 100, 'p1', 2);
    const item2 = new OrderItem('2', 'Item 2', 200, 'p2', 2);

    const order = new Order('o1', 'c1', [item]);

    order.addItem(item2);

    expect(order.items.length).toBe(2);
    expect(order.items).toStrictEqual([item, item2]);
  });
});
