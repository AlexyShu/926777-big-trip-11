import {months} from '../mocks/trip-info.js';

export const createTripDayItemTemplate = (events) => {
  const startRouteDate = new Date(events[0].startDate);
  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"> ${startRouteDate.getDate()} </span>
        <time class="day__date" datetime="2019-03-18"> ${months[startRouteDate.getMonth()]} ${startRouteDate.getFullYear()}</time>
      </div>
    </li>`
  );
};
