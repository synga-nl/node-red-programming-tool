import { CallMultipleServicesOutput } from '../Output/CallMultipleServicesOutput';
import { CallServiceOutput } from '../Output/CallServiceOutput';

export class OutputFactory {
  public callService(cb?: (callService: CallServiceOutput) => void): CallServiceOutput {
    const callService = new CallServiceOutput();
    if (cb) {
      cb(callService);
    }

    return callService;
  }

  public callMultipleServices(
    cb?: (callMultipleServices: CallMultipleServicesOutput) => void,
  ): CallMultipleServicesOutput {
    const callMultipleServicesOutput = new CallMultipleServicesOutput();
    if (cb) {
      cb(callMultipleServicesOutput);
    }

    return callMultipleServicesOutput;
  }
}
