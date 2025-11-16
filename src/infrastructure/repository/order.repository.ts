import { Order } from '../../domain/entity/order.ts';
import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface.ts';
import { OrderItemModel } from '../db/sequelize/model/order-item.model.ts';
import { OrderModel } from '../db/sequelize/model/order.model.ts';

export default class OrderRepository implements OrderRepositoryInterface {
  find(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
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
