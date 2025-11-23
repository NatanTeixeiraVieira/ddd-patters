import { EventHandlerInterface } from './event-handler.interface.ts';
import { EventInterface } from './event.interface.ts';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
