export class Event {
    name: string;
    execute: (...args: any[]) => void;
  
    constructor(name: string, execute: (...args: any[]) => void) {
      this.name = name;
      this.execute = execute;
    }
  }