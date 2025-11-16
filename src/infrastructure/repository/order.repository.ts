import { OrderItem } from '../../domain/entity/order-item.ts';
import { Order } from '../../domain/entity/order.ts';
import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface.ts';
import { OrderItemModel } from '../db/sequelize/model/order-item.model.ts';
import { OrderModel } from '../db/sequelize/model/order.model.ts';

export default class OrderRepository implements OrderRepositoryInterface {
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items'],
    });
    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity,
          ),
      ),
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] });

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customerId,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity,
              ),
          ),
        ),
    );
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] },
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize!.transaction(async (t) => {
      await OrderModel.update(
        {
          customerId: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction: t,
        },
      );

      await OrderItemModel.destroy({
        where: { orderId: entity.id },
        transaction: t,
      });

      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          orderId: entity.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        { transaction: t },
      );
    });
  }
}
