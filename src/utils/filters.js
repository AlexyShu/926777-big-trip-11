import {FilterType} from "../const.js";

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points.slice().sort((a, b) => a.startEventTime - b.startEventTime);
    case FilterType.FUTURE:
      return points.slice().filter((point) => point.startEventTime > Date.now()).sort((a, b) => a.startEventTime - b.startEventTime);
    case FilterType.PAST:
      return points.slice().filter((point) => point.endEventTime < Date.now()).sort((a, b) => a.startEventTime - b.startEventTime);
  }
  return points;
};
