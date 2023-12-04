import { Logger } from './Tools/Logger';
import { OutputFactory } from './Tools/OutputFactory';
import { Entities } from './Tools/Entities';
import { CollectionExtender } from './Support/CollectionExtender';
import { Helper } from './Tools/Helper';

// Add functionality to Collect.js
CollectionExtender.install();

export class Tool {
  public static toolClasses = {
    logger: Logger,
    output: OutputFactory,
    entities: Entities,
    helpers: Helper,
  };

  // @ts-expect-error: The value is not initiated because this is done automatically in the constructor
  public readonly logger: Logger;
  // @ts-expect-error: The value is not initiated because this is done automatically in the constructor
  public readonly output: OutputFactory;
  // @ts-expect-error: The value is not initiated because this is done automatically in the constructor
  public readonly entities: Entities;
  // @ts-expect-error: The value is not initiated because this is done automatically in the constructor
  public readonly helpers: Entities;

  constructor(public readonly nodeRed: any) {
    Object.entries(Tool.toolClasses).forEach((entry) => {
      const [key, value] = entry;
      // @ts-expect-error: The value is dynamically set
      this[key] = new value(this);
    });
  }
}

export function create(nodeRed: any): Tool {
  return new Tool(nodeRed);
}
