import {towns} from '../mocks/event.js';
import {day, month} from '../mocks/trip-info.js';
import {getRandomArrayItem} from '../utils.js';

export const createTripInfoTemplate = () => {
  return (`
    <section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${getRandomArrayItem(towns)} &mdash; ${getRandomArrayItem(towns)} &mdash; ${getRandomArrayItem(towns)}</h>
         <p class="trip-info__dates"> ${month} ${day} &nbsp;&mdash;&nbsp;  </p>
      </div>

       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};
