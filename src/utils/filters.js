import {FilterType} from '../const.js';

export const getPointsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.slice().sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return events.slice().filter((event) => event.startDate > Date.now()).sort((a, b) => a.startDate - b.startDate);
    case FilterType.PAST:
      return events.slice().filter((event) => event.endDate < Date.now()).sort((a, b) => a.startDate - b.startDate);
  }
  return events;
};
