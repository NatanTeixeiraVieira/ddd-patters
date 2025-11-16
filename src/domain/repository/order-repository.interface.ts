import { Order } from '../entity/order.ts';
import { RepositoryInterface } from './repository-interface.ts';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
