type Constructor<T> = new (value: number) => T;

export class Enum {
  constructor(public readonly value: number) {
    if (this.constructor === Enum) {
      throw new Error('Cannot instantiate Enum base class');
    }
  }

  static from<T>(this: Constructor<T>, value: number): T {
    return new this(value);
  }

  get key(): string {
    let name = '';

    Object.entries(this.constructor).forEach((entry) => {
      if (entry[1] === this.value) {
        name = entry[0];
      }
    });

    return name;
  }

  get data(): Record<string, any> {
    return {};
  }

  is(enumObject: Enum): boolean {
    return this.constructor.name === enumObject.constructor.name && this.value === enumObject.value;
  }

  isAny(...enumObjects: Enum[]): boolean {
    for (const i in enumObjects) {
      if (this.is(enumObjects[i])) {
        return true;
      }
    }

    return false;
  }
}
