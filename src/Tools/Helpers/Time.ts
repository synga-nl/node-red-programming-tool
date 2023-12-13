export class Time {
  /**
   * Checks if the current time is the time string + rangeInMinutes
   *
   * @param stringTime e.g. "06:30"
   * @param rangeInMinutes e.g. 10
   */
  isTimeInRange(stringTime: string, rangeInMinutes: number) {
    const currentTime: Date = new Date();

    const [hours, minutes] = stringTime.split(':').map(Number);
    const givenTime: Date = new Date();
    givenTime.setHours(hours);
    givenTime.setMinutes(minutes);

    const upperTimeBoundary: Date = new Date(currentTime.getTime() - rangeInMinutes * 60000 + 1); // Upper boundary = given time + range + 1 minute

    return currentTime >= givenTime && givenTime >= upperTimeBoundary;
  }
}
