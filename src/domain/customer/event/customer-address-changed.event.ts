import { Customer } from '../entity/customer.ts';
import { EventInterface } from '../../@shared/event/event.interface.ts';

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
