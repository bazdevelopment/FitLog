export const computeFutureTimestamp = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);
