import { collect, Collection } from 'collect.js';
import { Entity } from './../Entities/Entity';

export class CollectionExtender {
  public static install() {
    this.installGetKeyBy();
  }

  private static installGetKeyBy() {
    collect().macro('getByKey', function (this: Collection<Entity>, key: string, fallback?: any): any | Entity {
      const entity = this.where('key', key).first();

      return !!entity ? entity : fallback;
    });
  }
}
