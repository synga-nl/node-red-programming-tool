import { Tool } from '../Tool';
import { CallServiceOutput } from '../Output/CallServiceOutput';
import { ServiceEnum } from '../Enums/Service/ServiceEnum';

type callback = (callService: CallServiceOutput) => void;

export class Entity {
  private tool: Tool | null = null;
  public readonly key: string;
  public readonly entityId: string;
  public readonly state: any;
  public readonly attributes: any;
  public readonly context: { id: string; parent_id: number | null; user_id: number | null };
  public readonly lastChanged: Date;
  public readonly lastUpdated: Date;

  constructor(entityData: any) {
    this.key = entityData.key;
    this.entityId = entityData.entity_id;
    this.state = entityData.state;
    this.attributes = entityData.attributes;
    this.context = entityData.context;
    this.lastChanged = new Date(entityData.last_changed);
    this.lastUpdated = new Date(entityData.last_updated);
  }

  public setTool(tool: Tool): this {
    this.tool = tool;

    return this;
  }

  public exists(): boolean {
    return typeof this.entityId !== 'undefined';
  }

  public callService(cb?: string | ServiceEnum | callback): CallServiceOutput | null {
    if (!this.tool) {
      throw new Error('The tool was not set for Entity "' + this.entityId + '"');
    }

    if ((cb as ServiceEnum)?.data?.state === this.state) {
      return null;
    }

    return this.tool?.output.callService((output) => {
      output.setEntityId(this.entityId);

      if (typeof cb === 'function') {
        cb(output);

        return;
      }

      // @todo fix the unknown part.
      output.setService(cb as unknown as string);
    }) as CallServiceOutput;
  }
}
