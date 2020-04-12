export default (value: number): string => {
  const date = new Date(value);
  const daysName = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  const hours = date.getHours();
  const minutes = date.getMinutes() === 0 ? `${date.getMinutes()}0` : date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayName = daysName[date.getDay()];

  return `${hours}:${minutes} ${day}.${month} ${dayName}`;
};
