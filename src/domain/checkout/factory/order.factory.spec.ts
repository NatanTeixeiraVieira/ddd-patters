import { OrderFactory } from './order.factory.ts';

describe('Order factory unit tests', () => {
  it('should create an order', () => {
    const orderProps = {
      id: crypto.randomUUID(),
      customerId: crypto.randomUUID(),
      items: [
        {
          id: crypto.randomUUID(),
          name: 'Product 1',
          productId: crypto.randomUUID(),
          quantity: 2,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items).toHaveLength(1);
  });
});
