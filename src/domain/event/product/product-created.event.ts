import { EventInterface } from '../@shared/event.interface.ts';

export class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: unknown;

  constructor(eventData: unknown) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
