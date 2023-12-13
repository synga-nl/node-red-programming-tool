export class Time {
  /**
   * Checks if the current time is the time string + rangeInMinutes
   *
   * @param stringTime e.g. "06:30" or "06:30:56"
   * @param rangeInMinutes e.g. 10
   */
  isTimeInRange(stringTime: string, rangeInMinutes: number) {
    const currentTime: Date = new Date();

    const [hours, minutes, seconds] = stringTime.split(':').slice(0,3).map(Number);
    const givenTime: Date = new Date();

    givenTime.setHours(hours);
    givenTime.setMinutes(minutes);
    givenTime.setSeconds(isNaN(seconds) ? 0 : seconds);

    const upperTimeBoundary: Date = new Date(currentTime.getTime() - rangeInMinutes * 60000 + 1); // Upper boundary = given time + range + 1 minute

    return currentTime >= givenTime && givenTime >= upperTimeBoundary;
  }
}
