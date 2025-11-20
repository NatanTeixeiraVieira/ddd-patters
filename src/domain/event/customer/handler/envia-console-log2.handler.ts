import { EventHandlerInterface } from '../../@shared/event-handler.interface.ts';
import { EventInterface } from '../../@shared/event.interface.ts';

export class EnviaConsoleLog2Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
