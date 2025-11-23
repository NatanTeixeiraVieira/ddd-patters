import { Address } from '../value-object/address.ts';
import { CustomerFactory } from './customer.factory.ts';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street', 123, '12345678', 'City');
    let customer = CustomerFactory.createWithAddress('Jane Doe', address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Jane Doe');
    expect(customer.address).toBe(address);
  });
});
