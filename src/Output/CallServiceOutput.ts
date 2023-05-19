import { CallServicePayload } from './Payloads/CallServicePayload';
import { ResultInterface } from './ResultInterface';

export class CallServiceOutput extends CallServicePayload implements ResultInterface {
  output(): any {
    return this;
  }

  isEmpty(): boolean {
    return false;
  }
}
