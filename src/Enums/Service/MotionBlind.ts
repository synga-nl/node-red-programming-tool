import { Enum } from '../Enum';

export class MotionBlind extends Enum {
  static readonly SET_ABSOLUTE_POSITION = new this(1);

  get data(): { title: string | null } {
    switch (this.value) {
      case MotionBlind.SET_ABSOLUTE_POSITION.value:
        return {
          title: 'set_absolute_position',
        };
      default:
        return {
          title: null,
        };
    }
  }
}
