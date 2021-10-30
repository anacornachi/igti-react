export function formatDate(date) {
  const time = new Date(date);
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
}
