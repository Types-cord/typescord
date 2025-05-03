import { Command } from '../core/Command';

const registeredCommands: Command[] = [];

export function getDecoratedCommands() {
  return registeredCommands;
}

export function CommandHandler(name: string, description: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    registeredCommands.push(
      new Command({
        name,
        description,
        execute: descriptor.value,
      })
    );
  };
}
