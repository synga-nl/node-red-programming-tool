import { Tool, create } from '../Tool';
import { nodeRed } from './__src__/NodeRed';

describe('Tools', () => {
  // Initialization
  it('can initialize via create method', () => {
    expect(new Tool({})).toEqual(create({}));
  });

  // Logging
  it('can log', () => {
    const tool = new Tool(nodeRed);
    const mock = tool.nodeRed.__node__.reset();

    tool.logger.log('unit');

    expect(mock).toBeCalledWith('unit');
  });

  it('can log one entity', () => {
    const tool = new Tool(nodeRed);
    const mock = tool.nodeRed.__node__.reset();

    tool.entities.logEntityData('switch.switch_1');

    expect(mock).toBeCalledWith(tool.entities.getEntity('switch.switch_1'));
  });

  it('can log one entity', () => {
    const tool = new Tool(nodeRed);
    const mock = tool.nodeRed.__node__.reset();

    tool.entities.logEntityDataFor(['switch.switch_1', 'switch.switch_2']);

    expect(mock).toBeCalledWith({ ...tool.entities.getEntities(['switch.switch_1', 'switch.switch_2']) });
  });
  // End logging

  // Entities
  it('can retrieve entity data', () => {
    const tool = new Tool(nodeRed);
    const entityData = tool.entities.getEntity('sun.sun');

    expect(entityData).not.toBeNull();
    expect(entityData).not.toBeUndefined();
    expect(entityData?.entityId).toBe('sun.sun');
  });

  it('can retrieve multiple entities from array', () => {
    const tool = new Tool(nodeRed);

    const result = tool.entities.getEntities(['sun.sun', 'update.home_assistant_supervisor_update']);

    expect(result.pluck('key').toArray()).toEqual(['sun.sun', 'update.home_assistant_supervisor_update']);
    expect(result.getByKey('sun.sun')?.entityId).toBe('sun.sun');
    expect(result.getByKey('update.home_assistant_supervisor_update')?.entityId).toBe(
      'update.home_assistant_supervisor_update',
    );
  });

  it('can throw an exception when one of the requested entities are empty when told to', () => {
    const tool = new Tool(nodeRed);

    expect(() => {
      tool.entities.getEntities(['sun.sun', 'does.notExists'], true);
    }).toThrow('The key(s) "does.notExists" are empty.');
  });

  it('does not throw an exception when one of the requested entities are empty', () => {
    const tool = new Tool(nodeRed);

    expect(() => {
      tool.entities.getEntities(['sun.sun', 'does.notExists']);
    }).not.toThrow('The key(s) "does.notExists" are empty.');
  });

  it('can retrieve multiple entities from object', () => {
    const tool = new Tool(nodeRed);

    const result = tool.entities.getEntities({
      sun: 'sun.sun',
      updater: 'update.home_assistant_supervisor_update',
    });

    expect(result.pluck('key').toArray()).toEqual(['sun', 'updater']);
    expect(result?.getByKey('sun')?.entityId).toBe('sun.sun');
    expect(result?.getByKey('updater')?.entityId).toBe('update.home_assistant_supervisor_update');
  });

  it('can retrieve all entities for a certain domain', () => {
    const tool = new Tool(nodeRed);

    const switchEntities = tool.entities.getEntitiesByDomain('switch');
    expect(switchEntities.first().entityId).toBe('switch.switch_1');
    expect(switchEntities.count()).toBe(2);
  });

  it('can retrieve all entities for a certain domain', () => {
    const tool = new Tool(nodeRed);

    const switchEntities = tool.entities.getEntitiesByDomainExcept('switch', ['switch.switch_1']);
    expect(switchEntities.first().entityId).toBe('switch.switch_2');
    expect(switchEntities.count()).toBe(1);
  });

  it('can retrieve the latest entity', () => {
    const tool = new Tool(nodeRed);

    const latestEntity = tool.entities.getLatestEntity('last_updated', ['switch.switch_1', 'switch.switch_2']);
    expect(latestEntity.entityId).toEqual('switch.switch_2');
  });

  it('can retrieve the state of an entity', () => {
    const tool = new Tool(nodeRed);
    expect(tool.entities.getEntityState('switch.switch_1')).toEqual('off');
    expect(tool.entities.getEntityState('switch.switch_3', 'unknown')).toEqual('unknown');
  });
  // End entities

  // Outputs
  it('can output one service call output', () => {
    const tool = new Tool({});
    const output = tool.output.callService((callService) => {
      callService.setEntityId('test.unit');
    });

    expect(output.payload.data.entity_id).toEqual('test.unit');
    expect(output.payload.domain).toEqual('test');
  });

  it('can output multiple service call output', () => {
    const tool = new Tool({});
    const output = tool.output.callMultipleServices((callMultipleServices) => {
      callMultipleServices.createPayload((callServicePayload) => {
        callServicePayload.setEntityId('test.unit');
      });
    });

    expect(output.payloads[0].payload.data.entity_id).toEqual('test.unit');
    expect(output.payloads[0].payload.domain).toEqual('test');
  });
  // End outputs
});
