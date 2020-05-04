import {FilterType} from '../const.js';
import moment from 'moment';

export const getPointsByFilter = (events, filterType) => {
  const nowDate = moment().format(`YYYY-MM-DD`);
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return events.filter(({startDate}) => moment(moment(startDate).format(`YYYY-MM-DD`)).isAfter(nowDate));
    case FilterType.PAST:
      return events.filter(({endDate}) => moment(moment(endDate).format(`YYYY-MM-DD`)).isBefore(nowDate));
  }
  return events;
};
