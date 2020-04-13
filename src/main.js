import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filters.js';
import {createFormTemplate} from './components/form.js';
import {createTripDayWrapperTemplate} from './components/days-list.js';
import {createTripDayItemTemplate} from './components/day-number.js';
import {createEventListTemplate} from './components/events-list.js';
import {createCardTemplate} from './components/event.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createEventSortTemplate} from './components/event-sort.js';
import {render} from './utils.js';
import {filters} from './mocks/filters.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';

const EVENTS_COUNT = 15;

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const siteTripEventElement = document.querySelector(`.trip-events`);
const SiteMainTripElement = document.querySelector(`.trip-main`);

render(siteMenuElement, createMenuTemplate(menuItems), `afterend`);
render(siteFilterElement, createFilterTemplate(filters));
render(SiteMainTripElement, createTripInfoTemplate(cards), `afterbegin`);
render(siteTripEventElement, createTripDayWrapperTemplate());

const siteTripDayElement = document.querySelector(`.trip-days`);

render(siteTripDayElement, createTripDayItemTemplate(cards));
render(siteTripDayElement, createEventSortTemplate(), `beforebegin`);

const siteDayItemElement = document.querySelector(`.trip-days__item`);

render(siteDayItemElement, createEventListTemplate());

const siteEventListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  render(siteEventListElement, createCardTemplate(card));
}

const siteEventItemElement = document.querySelector(`.trip-events__item`);
render(siteEventItemElement, createFormTemplate(cards[0]));
