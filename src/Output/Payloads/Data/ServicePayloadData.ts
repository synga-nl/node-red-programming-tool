export class ServicePayloadData {
  // tslint:disable-next-line:variable-name
  entity_id: string | null = null;

  public setData(this: Record<string, any>, data: Record<string, any>) {
    for (const [key, value] of Object.entries(data)) {
      this[key as string] = value;
    }
  }
}
