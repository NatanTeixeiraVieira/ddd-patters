import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CustomerModel } from './customer.model.ts';
import { OrderItemModel } from './order-item.model.ts';

@Table({ tableName: 'orders', timestamps: false })
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}

// @Table({ tableName: 'order_items', timestamps: false })
// export class OrderItemModel extends Model {
//   @PrimaryKey
//   @Column
//   declare id: string;

//   @ForeignKey(() => ProductModel)
//   @Column({ allowNull: false })
//   declare productId: string;

//   @BelongsTo(() => ProductModel)
//   declare product: ProductModel;

//   @ForeignKey(() => OrderModel)
//   @Column({ allowNull: false })
//   declare orderId: string;

//   @BelongsTo(() => OrderModel)
//   declare order: OrderModel;

//   @Column({ allowNull: false })
//   declare quantity: number;

//   @Column({ allowNull: false })
//   declare name: string;

//   @Column({ allowNull: false })
//   declare price: number;
// }
