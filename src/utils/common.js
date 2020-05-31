import moment from "moment";

export const timeFormat = (date) => {
  return moment(date).format(`HH:mm`);
};

export const dateFormat = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const dateFormatforForm = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const calculateTimeInterval = (time1, time2) => {
  const daysInterval = moment(time2).diff(moment(time1), `days`);
  const hoursInterval = moment(time2).diff(moment(time1), `hours`) - daysInterval * 24;
  const minutesInterval = moment(time2).diff(moment(time1), `minutes`) - daysInterval * 60 * 24 - hoursInterval * 60;
  const formattedInterval = `${daysInterval > 0 ? castInterval(daysInterval, `D`) : ``} ${hoursInterval > 0 ? castInterval(hoursInterval, `H`) : ``} ${castInterval(minutesInterval, `M`)}`;
  return formattedInterval;
};

const castInterval = (timeValue, unitOfTime) => timeValue < 10 ? `0${timeValue}${unitOfTime}` : `${timeValue}${unitOfTime}`;

export const makeGroupedEvents = (points) => {
  const groupedEvents = new Map();
  points.forEach((point) => {
    const startInMilliseconds = new Date(point.startEventTime).setHours(1, 0, 0, 0);
    if (groupedEvents.has(startInMilliseconds)) {
      groupedEvents.get(startInMilliseconds).push(point);
    } else {
      groupedEvents.set(startInMilliseconds, [point]);
    }
  });
  return groupedEvents;
};

export const doFirstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPrepositionForEventType = (eventType) => {
  let offerCourse;
  if (eventType === `restaurant` || eventType === `sightseeing` || eventType === `check-in`) {
    offerCourse = `in`;
  } else {
    offerCourse = `to`;
  }
  return offerCourse;
};

export const getUpperCaseString = (string) => {
  const upperCaseString = string[0].toUpperCase() + string.slice(1);
  return upperCaseString;
};

export const removeButton = () => {
  document.querySelector(`.event__favorite-btn`).remove();
  document.querySelector(`.event__rollup-btn`).remove();
};
