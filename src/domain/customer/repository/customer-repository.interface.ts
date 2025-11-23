import { Customer } from '../entity/customer.ts';
import { RepositoryInterface } from '../../@shared/repository/repository-interface.ts';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
