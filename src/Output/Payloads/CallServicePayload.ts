import { ServicePayload } from './ServicePayload';
import { Enum } from '../../Enums/Enum';

export class CallServicePayload {
  public readonly payload: ServicePayload = new ServicePayload();

  public getDomain(): string | null {
    return this.payload.domain;
  }

  public setDomain(domain: string): this {
    this.payload.domain = domain;

    return this;
  }

  public getService(): string | null {
    return this.payload.service;
  }

  public setService(service: string | Enum): this {
    this.payload.service = service instanceof Enum ? service.data.title : service;

    return this;
  }

  public getEntityId(): string | null {
    return this.payload.data.entity_id;
  }

  public setEntityId(entityId: string): this {
    this.payload.data.entity_id = entityId;

    if (this.payload.domain === null) {
      this.payload.domain = entityId.split('.')[0];
    }

    return this;
  }

  public setData(data: Record<string, any>): this {
    this.payload.data.setData(data);

    return this;
  }
}
