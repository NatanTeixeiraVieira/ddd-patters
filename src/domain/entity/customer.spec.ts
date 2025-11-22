import { EnviaConsoleLogHandler } from '../event/customer/handler/envia-console-log.handler.ts';
import { EnviaConsoleLog1Handler } from '../event/customer/handler/envia-console-log1.handler.ts';
import { EnviaConsoleLog2Handler } from '../event/customer/handler/envia-console-log2.handler.ts';
import { Address } from './address.ts';
import { Customer } from './customer.ts';

describe('Customer unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrow(new Error('Id is required'));
  });

  it('should throw an error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrow(new Error('Name is required'));
  });

  it('should change name', () => {
    const customer = new Customer('123', 'Natãn');
    customer.changeName('João');

    expect(customer.name).toBe('João');
  });

  it('should change address', () => {
    const spy = jest.spyOn(EnviaConsoleLogHandler.prototype, 'handle');

    const customer = new Customer('123', 'Natãn');
    const address = new Address('Street 1', 123, '12345-678', 'City');
    customer.changeAddress(address);

    expect(customer.address).toBe(address);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1');

    const address = new Address('Street 1', 123, '12345-678', 'City');

    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1');

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it('should throw error when address is undefined and customer is activated', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrow(new Error('Address is mandatory to activate a customer'));
  });

  it('should send an event when customer is created', () => {
    const spy1 = jest.spyOn(EnviaConsoleLog1Handler.prototype, 'handle');
    const spy2 = jest.spyOn(EnviaConsoleLog2Handler.prototype, 'handle');

    const customer = new Customer('1', 'Customer 1');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
