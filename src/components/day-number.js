import {day, year, month} from '../mocks/trip-info.js';

export const createTripDayItemTemplate = () => {
  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"> ${day} </span>
        <time class="day__date" datetime="2019-03-18"> ${month} ${year} </time>
      </div>
    </li>`
  );
};
