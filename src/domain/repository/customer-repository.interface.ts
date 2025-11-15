import { Customer } from '../entity/customer.ts';
import { RepositoryInterface } from './repository-interface.ts';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
