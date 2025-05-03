import { Event } from '../core/Event';

const registeredEvents: Event[] = [];

export function getDecoratedEvents() {
  return registeredEvents;
}

export function EventHandler(name: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    registeredEvents.push(new Event(name, descriptor.value));
  };
}