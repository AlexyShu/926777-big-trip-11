import {towns, cards} from '../mocks/event.js';
import {months} from '../mocks/trip-info.js';
import {getRandomArrayItem} from '../utils.js';

export const createTripInfoTemplate = () => {
  const startRouteDate = new Date(cards[0].startDate);
  // const endRouteDate = new Date(cards[cards.length - 1].startDate);
  return (`
    <section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${getRandomArrayItem(towns)} &mdash; ${getRandomArrayItem(towns)} &mdash; ${getRandomArrayItem(towns)}</h>
         <p class="trip-info__dates"> ${startRouteDate.getDate()}&nbsp;${months[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;</p>
      </div>

       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};
