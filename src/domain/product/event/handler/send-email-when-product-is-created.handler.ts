import { EventHandlerInterface } from '../../../@shared/event/event-handler.interface.ts';
import { EventInterface } from '../../../@shared/event/event.interface.ts';

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: EventInterface): void {
    console.log('Sending email to...');
  }
}
