import {FilterType} from "../const.js";

export const getPointsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.slice().sort((a, b) => a.startEventTime - b.startEventTime);
    case FilterType.FUTURE:
      return events.slice().filter((event) => event.startEventTime > Date.now()).sort((a, b) => a.startEventTime - b.startEventTime);
    case FilterType.PAST:
      return events.slice().filter((event) => event.endEventTime < Date.now()).sort((a, b) => a.startEventTime - b.startEventTime);
  }
  return events;
};
