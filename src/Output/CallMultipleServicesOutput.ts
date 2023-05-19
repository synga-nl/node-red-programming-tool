import { ResultInterface } from './ResultInterface';
import { CallServicePayload } from './Payloads/CallServicePayload';

export class CallMultipleServicesOutput implements ResultInterface {
  public readonly payloads: CallServicePayload[] = [];

  public createPayload(cb: (callServicePayload: CallServicePayload) => void): this {
    const callServicePayload = new CallServicePayload();
    cb(callServicePayload);

    this.payloads.push(callServicePayload);

    return this;
  }

  public pushPayload(callServicePayload: CallServicePayload): this {
    this.payloads.push(callServicePayload);

    return this;
  }

  public output(): [any] {
    return [this.payloads];
  }

  // Check if we can validate this better.
  isEmpty(): boolean {
    return false;
  }
}
