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

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);
const siteFormElement = document.querySelector(`.trip-events h2`);
const siteTripEventElement = document.querySelector(`.trip-events`);
const SiteMainTripElement = document.querySelector(`.trip-main`);

render(siteMenuElement, createMenuTemplate(menuItems), `afterend`);
render(siteFilterElement, createFilterTemplate(filters));
render(siteFormElement, createFormTemplate(), `afterend`);
render(SiteMainTripElement, createTripInfoTemplate(), `afterbegin`);
render(siteTripEventElement, createTripDayWrapperTemplate());

const siteTripDayElement = document.querySelector(`.trip-days`);

render(siteTripDayElement, createTripDayItemTemplate());
render(siteTripDayElement, createEventSortTemplate(), `beforebegin`);

const siteDayItemElement = document.querySelector(`.trip-days__item`);

render(siteDayItemElement, createEventListTemplate());

const siteEventListElement = document.querySelector(`.trip-events__list`);

const EVENT_COUNT = 8;

for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteEventListElement, createCardTemplate());
}

