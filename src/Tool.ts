import { Logger } from './Tools/Logger';
import { OutputFactory } from './Tools/OutputFactory';
import { Entities } from './Tools/Entities';
import { CollectionExtender } from './Support/CollectionExtender';

// Add functionality to Collect.js
CollectionExtender.install();

export class Tool {
  public static toolClasses = {
    logger: Logger,
    output: OutputFactory,
    entities: Entities,
  };

  // @ts-ignore
  public readonly logger: Logger;

  // @ts-ignore
  public readonly output: OutputFactory;

  // @ts-ignore
  public readonly entities: Entities;

  constructor(public readonly nodeRed: any) {
    Object.entries(Tool.toolClasses).forEach((entry) => {
      const [key, value] = entry;
      // @ts-ignore
      this[key] = new value(this);
    });
  }
}

export function create(nodeRed: any): Tool {
  return new Tool(nodeRed);
}
