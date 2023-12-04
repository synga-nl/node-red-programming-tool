import { ServiceEnum } from './ServiceEnum';

export class Switch extends ServiceEnum {
  static readonly TURN_ON = new this(1);
  static readonly TURN_OFF = new this(2);
  static readonly TOGGLE = new this(3);

  get data(): { title: string | null; state: string | null } {
    switch (this.value) {
      case Switch.TURN_ON.value:
        return {
          title: 'turn_on',
          state: 'on',
        };
      case Switch.TURN_OFF.value:
        return {
          title: 'turn_off',
          state: 'off',
        };
      case Switch.TOGGLE.value:
        return {
          title: 'toggle',
          state: null,
        };
      default:
        return {
          title: null,
          state: null,
        };
    }
  }
}
