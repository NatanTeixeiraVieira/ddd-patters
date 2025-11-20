import { EventInterface } from './event.interface.ts';

export interface EventHandlerInterface<
  T extends EventInterface = EventInterface,
> {
  handle(event: T): void;
}
