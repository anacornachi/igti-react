export function formatDate(date, onlyDate = false, onlyTime = false) {
  const time = new Date(date);

  if (!onlyDate && !onlyTime) {
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
  }
  if (onlyDate === true) {
    return time.toLocaleDateString();
  }
  if (!onlyDate && !onlyTime) {
    return time.toLocaleTimeString();
  }
}
