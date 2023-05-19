import { Tool } from '../Tool';
import { Entity } from '../Entities/Entity';
import { Collection } from 'collect.js';

export class Entities {
  private readonly nrptPath: string = 'homeassistant.homeAssistant.states';

  constructor(protected tool: Tool) {}

  public isLoaded(): boolean {
    const nodes = this.tool.nodeRed.global.get(this.nrptPath) ?? [];

    return nodes.length > 0;
  }

  public all(): Collection<Record<string, any>> {
    return new Collection<object>(Object.values(this.tool.nodeRed.global.get(this.nrptPath)));
  }

  private createEntity(data: object): Entity {
    return new Entity(data).setTool(this.tool);
  }

  public getEntity(entityId: string, key?: string, fallback?: any): Entity {
    const state = this.all().where('entity_id', entityId).first() ?? fallback;

    return this.createEntity({
      key: key ?? state?.entity_id,
      ...state,
    });
  }

  public getEntities(entityIds: [] | object, throwOnEmpty: boolean = false): Collection<Entity> {
    const result: Collection<Entity> = new Collection<Entity>();
    if (Array.isArray(entityIds)) {
      entityIds.forEach((entityId) => {
        result.push(this.getEntity(entityId, entityId));
      });
    } else {
      for (const [key, entityId] of Object.entries(entityIds)) {
        result.push(this.getEntity(entityId, key));
      }
    }

    if (throwOnEmpty) {
      const filteredResult = result.filter((object) => object.exists());

      if (result.diff(filteredResult).count()) {
        throw new Error('The key(s) "' + result.diff(filteredResult).pluck('key').join('", "') + '" are empty.');
      }
    }

    return result;
  }

  public getEntitiesByDomain(domain: string): Collection<Entity> {
    return this.all()
      .filter((entity) => {
        return entity.entity_id.startsWith(domain);
      })
      .map((state) => {
        return new Entity({
          key: state.entity_id,
          ...state,
        });
      }) as Collection<Entity>;
  }

  public getEntitiesByDomainExcept(domain: string, entityIds: object | []): Collection<Entity> {
    return this.getEntitiesByDomain(domain).filter((entity: Entity) => {
      return !Object.values(entityIds).includes(entity.entityId);
    });
  }

  public getLatestEntity(
    cb: string | ((item: any) => number),
    entityIds: [] | object,
    throwOnEmpty: boolean = false,
  ): Entity {
    return this.getEntities(entityIds, throwOnEmpty).sortByDesc(cb).first();
  }

  public getEntityState(entityId: string, fallback?: any): any {
    return this.getEntity(entityId)?.state ?? fallback;
  }

  public logEntityData(entityId: string): void {
    this.tool.logger.log(this.getEntity(entityId));
  }

  public logEntityDataFor(entityIds: [] | object): void {
    this.tool.logger.log(this.getEntities(entityIds));
  }
}
