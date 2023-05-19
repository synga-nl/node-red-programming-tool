import { CallMultipleServicesOutput } from '../Output/CallMultipleServicesOutput';
import { CallServiceOutput } from '../Output/CallServiceOutput';
import { create } from '../Tool';
import { nodeRed } from './__src__/NodeRed';
import { Switch } from '../Enums/Service/Switch';
import { CallServicePayload } from '../Output/Payloads/CallServicePayload';

describe('Call multiple services result', () => {
  it('can call multiple services', () => {
    const callMultipleServicesResult = new CallMultipleServicesOutput();
    callMultipleServicesResult.createPayload((callServicePayload) => {
      callServicePayload.setEntityId('test.unit');
    });

    expect(callMultipleServicesResult.payloads[0].payload.domain).toBe('test');
    expect(callMultipleServicesResult.payloads[0].payload.data.entity_id).toBe('test.unit');
    expect(Array.isArray(callMultipleServicesResult.output())).toBeTruthy();
  });

  it('can call a single service', () => {
    const callServiceResult = new CallServiceOutput();
    callServiceResult.setEntityId('sun.sun');
    callServiceResult.payload.data.setData({
      unit: 'lost',
    });

    expect(callServiceResult.output().payload.data).toEqual({ entity_id: 'sun.sun', unit: 'lost' });
  });

  it('can call a service from an entity', () => {
    const tool = create(nodeRed);
    const output = tool.entities.getEntity('switch.switch_1').callService(Switch.TURN_ON);

    expect(output?.constructor.name).toEqual('CallServiceOutput');
    expect(output?.getEntityId()).toEqual('switch.switch_1');
    expect(output?.getService()).toEqual(Switch.TURN_ON.data.title as string);
  });

  it('can call multiple service from an entity', () => {
    const tool = create(nodeRed);
    const multipleServices = tool.output.callMultipleServices((cb) => {
      const entities = tool.entities.getEntities({
        switch1: 'switch.switch_1',
        switch2: 'switch.switch_2',
      });

      cb.pushPayload(entities.getByKey('switch1').callService(Switch.TURN_ON.data.title as string)).pushPayload(
        entities.getByKey('switch2').callService((callback: CallServicePayload) => {
          callback.setService(Switch.TURN_OFF);
        }),
      );
    });

    expect(multipleServices.payloads.length).toEqual(2);
    expect(multipleServices.payloads[0].getService()).toEqual(Switch.TURN_ON.data.title as string);
    expect(multipleServices.payloads[1].getService()).toEqual(Switch.TURN_OFF.data.title as string);
    expect(multipleServices.payloads[0].getEntityId()).toEqual('switch.switch_1');
    expect(multipleServices.payloads[1].getEntityId()).toEqual('switch.switch_2');
  });
});
