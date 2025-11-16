import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer.model.ts';
import { ProductModel } from '../db/sequelize/model/product.model.ts';
import CustomerRepository from './customer.repository.ts';
import { Customer } from '../../domain/entity/customer.ts';
import { Address } from '../../domain/entity/address.ts';
import { ProductRepository } from './product.repository.ts';
import { Product } from '../../domain/entity/product.ts';
import { OrderItem } from '../../domain/entity/order-item.ts';
import { Order } from '../../domain/entity/order.ts';
import OrderRepository from './order.repository.ts';
import { OrderModel } from '../db/sequelize/model/order.model.ts';
import { OrderItemModel } from '../db/sequelize/model/order-item.model.ts';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customerId: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: '123',
          productId: '123',
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const product2 = new Product('1234', 'Product 2', 5);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      1,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        orderId: order.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total(),
    });
  });

  it('should find an order by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: '123' },
      include: ['items'],
    });

    const foundOrder = await orderRepository.find('123');

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customerId: foundOrder.id,
      total: foundOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: foundOrder.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      1,
    );

    const order2 = new Order('1234', '123', [orderItem2]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    const orders = [order, order2];

    expect(foundOrders.length).toBe(2);
    expect(orders).toEqual(foundOrders);
  });
});
