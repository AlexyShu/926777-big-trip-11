export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// функция возвращающая случайное целое число
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// функциявозвращает случайный эелемент массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const getZeroFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getDateFormat = (dateUnix) => {
  const date = new Date(dateUnix);
  const year = date.getFullYear();
  const month = getZeroFormat(date.getMonth() + 1);
  const day = getZeroFormat(date.getDate());
  return `${year}-${month}-${day}`;
};

export const getTimeFormat = (dateUnix) => {
  const date = new Date(dateUnix);
  const hours = getZeroFormat(date.getHours());
  const minutes = getZeroFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomIntegerNumber(0, 60) * 60 * 1000;
};

