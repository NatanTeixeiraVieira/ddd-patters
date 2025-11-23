import { Order } from '../entity/order.ts';
import { RepositoryInterface } from '../../@shared/repository/repository-interface.ts';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
