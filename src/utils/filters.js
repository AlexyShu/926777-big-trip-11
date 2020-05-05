import {FilterType} from '../const.js';
import moment from 'moment';

export const getPointsByFilter = (events, filterType) => {
  const nowDate = moment().format(`YYYY-MM-DD`);
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.slice().sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return events.slice().filter(({startDate}) => moment(moment(startDate).format(`YYYY-MM-DD`)).isAfter(nowDate));
    case FilterType.PAST:
      return events.slice().filter(({endDate}) => moment(moment(endDate).format(`YYYY-MM-DD`)).isBefore(nowDate));
  }
  return events;
};
