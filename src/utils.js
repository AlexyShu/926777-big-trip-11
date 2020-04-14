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
  return `${year}/${month}/${day}`;
};

export const getTimeFormat = (dateUnix) => {
  const date = new Date(dateUnix);
  const hours = getZeroFormat(date.getHours());
  const minutes = getZeroFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const calculateTimeInterval = (time1, time2) => {
  const startDate = new Date(time1);
  const endDate = new Date(time2);
  const daysInterval = Math.abs(endDate.getDay() - startDate.getDay());
  const hoursInterval = Math.abs(endDate.getHours() - startDate.getHours());
  const minutesInterval = Math.abs(endDate.getMinutes() - startDate.getMinutes());
  let formattedInterval = daysInterval > 0 ? castDateInterval(daysInterval) : ``;
  if (daysInterval > 0 || hoursInterval > 0) {
    formattedInterval += ` ${castHoursInterval(hoursInterval)}`;
  }
  return formattedInterval + ` ${castMinutesInterval(minutesInterval)}`;
};

const castDateInterval = (days) => {
  return days < 10 ? `0${days}D` : `${days}D`;
};

const castHoursInterval = (hours) => {
  return hours < 10 ? `0${hours}H` : `${hours}H`;
};

const castMinutesInterval = (minutes) => {
  return minutes < 10 ? `0${minutes}M` : `${minutes}M`;
};


