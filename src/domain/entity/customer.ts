import { EventDispatcher } from '../event/@shared/event-dispatcher.ts';
import { CustomerCreatedEvent } from '../event/customer/customer-created.event.ts';
import { EnviaConsoleLog1Handler } from '../event/customer/handler/envia-console-log1.handler.ts';
import { EnviaConsoleLog2Handler } from '../event/customer/handler/envia-console-log2.handler.ts';
import { Address } from './address.ts';

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.createCustomerCreatedEvent();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }

  get name() {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  private createCustomerCreatedEvent() {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

    eventDispatcher.register('CustomerCreatedEvent', enviaConsoleLog1Handler);
    eventDispatcher.register('CustomerCreatedEvent', enviaConsoleLog2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
      address: this._address,
    });

    eventDispatcher.notify(customerCreatedEvent);
  }
}
