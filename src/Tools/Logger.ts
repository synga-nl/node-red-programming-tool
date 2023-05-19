import { Tool } from '../Tool';

export class Logger {
  constructor(protected tool: Tool) {}

  public log(value: any): void {
    if (typeof this?.tool?.nodeRed?.__node__?.warn === 'function') {
      switch (typeof value) {
        case 'object':
          value = { ...value };
          break;
      }

      this?.tool?.nodeRed?.__node__?.warn(value);

      return;
    }

    // tslint:disable-next-line:no-console
    console.log('COMMAND LINE: ', value);
  }
}
