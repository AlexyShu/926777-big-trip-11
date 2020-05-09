import moment from "moment";

export const KeyCode = {
  ESC: 27
};

export const EVENTS_COUNT = 10;

// функция возвращающая случайное целое число
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// функциявозвращает случайный эелемент массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const timeFormat = (date) => {
  return moment(date).format(`hh:mm`);
};

export const dateFormat = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

export const parseDateWithoutTime = (dateString) => moment(dateString, `YYYY MMM DD`).valueOf();

export const parseDate = (dateString) => moment(dateString, `DD/MM/YY HH:mm`).valueOf();

export const calculateTimeInterval = (time1, time2) => {
  const daysInterval = moment(time2).diff(moment(time1), `days`);
  const hoursInterval = moment(time2).diff(moment(time1), `hours`) - daysInterval * 24;
  const minutesInterval = moment(time2).diff(moment(time1), `minutes`) - daysInterval * 60 * 24 - hoursInterval * 60;
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

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const EmptyPoint = {
  id: 0,
  type: `flight`,
  description: ``,
  city: ``,
  course: ``,
  pictures: [],
  offers: [{}],
  startDate: Date.now(),
  endDate: Date.now(),
  price: 0,
  isFavorite: false
};

