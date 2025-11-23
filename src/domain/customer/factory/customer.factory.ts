import { Customer } from '../entity/customer.ts';
import { Address } from '../value-object/address.ts';

export class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(crypto.randomUUID(), name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(crypto.randomUUID(), name);
    customer.address = address;
    return customer;
  }
}
