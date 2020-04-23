export default (value: number) => {
  const date = new Date(value);
  const daysName = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  const dayName = daysName[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes() < 10 ? `${date.getMinutes()}0` : date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return [minutes, hours, day, dayName, month];
};
