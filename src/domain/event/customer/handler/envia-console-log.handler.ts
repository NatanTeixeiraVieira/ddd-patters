import { EventHandlerInterface } from '../../@shared/event-handler.interface.ts';
import { CustomerAddressChangedEvent } from '../customer-address-changed.event.ts';

export class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle({ eventData }: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: {${eventData.id}}, {${
        eventData.name
      }} alterado para: {${eventData.address.toString()}}`,
    );
  }
}
