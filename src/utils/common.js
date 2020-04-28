export const KeyCode = {
  ESC: 27
};

export const EVENTS_COUNT = 5;

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
  const daysInterval = Math.floor((time2 - time1) / (1000 * 60 * 60 * 24));
  const hoursInterval = Math.floor((time2 - time1) / (1000 * 60 * 60)) - daysInterval * 24;
  const minutesInterval = Math.floor((time2 - time1) / (1000 * 60)) - daysInterval * 60 * 24 - hoursInterval * 60;
  const formattedInterval = `${daysInterval > 0 ? castInterval(daysInterval, `D`) : ``} ${hoursInterval > 0 ? castInterval(hoursInterval, `H`) : ``} ${castInterval(minutesInterval, `M`)}`;
  return formattedInterval;
};

const castInterval = (timeValue, unitOfTime) => timeValue < 10 ? `0${timeValue}${unitOfTime}` : `${timeValue}${unitOfTime}`;

export const makeGroupedEvents = (events) => {
  const groupedEvents = new Map();
  events.forEach((event) => {
    const startInMilliseconds = new Date(event.startDate).setHours(1, 0, 0, 0);
    if (groupedEvents.has(startInMilliseconds)) {
      groupedEvents.get(startInMilliseconds).push(event);
    } else {
      groupedEvents.set(startInMilliseconds, [event]);
    }
  });
  return groupedEvents;
};

export const doFirstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
