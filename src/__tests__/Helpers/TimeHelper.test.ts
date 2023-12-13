import { Time } from '../../Tools/Helpers/Time';

describe('Time Helper test', () => {
  it('can determine if time string is in range', () => {
    const timeHelper = new Time();

    let date = new Date();
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeTruthy();

    date.setMinutes(date.getMinutes() - 1);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeTruthy();

    date = new Date();
    date.setMinutes(date.getMinutes() - 9);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeTruthy();
  });

  it('can determine if time string is not in range', () => {
    const timeHelper = new Time();

    let date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeFalsy();

    date = new Date();
    date.setMinutes(date.getMinutes() + 11);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeFalsy();

    date = new Date();
    date.setHours(date.getHours() - 1);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeFalsy();

    date = new Date();
    date.setHours(date.getHours() + 1);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}`, 10)).toBeFalsy();
  });

  it('can handle HH:MM:SS strings', () => {
    const timeHelper = new Time();

    let date = new Date();
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds}`, 10)).toBeTruthy();

    date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    expect(timeHelper.isTimeInRange(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds}`, 10)).toBeFalsy();
  });
});
