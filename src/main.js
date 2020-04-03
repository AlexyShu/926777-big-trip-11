import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filters.js';
import {createFormTemplate} from './components/form.js';
import {createTripDayWrapperTemplate} from './components/days-list.js';
import {createTripDayItemTemplate} from './components/day-number.js';
import {createEventListTemplate} from './components/events-list.js';
import {createCardTemplate} from './components/event.js';
import {createTripInfoTemplate} from './components/trip-info.js';

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);
const siteFormElement = document.querySelector(`.trip-events h2`);
const siteTripEventElement = document.querySelector(`.trip-events`);
const SiteMainTripElement = document.querySelector(`.trip-main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMenuElement, createMenuTemplate(), `afterend`);
render(siteFilterElement, createFilterTemplate());
render(siteFormElement, createFormTemplate(), `afterend`);
render(SiteMainTripElement, createTripInfoTemplate(), `afterbegin`);
render(siteTripEventElement, createTripDayWrapperTemplate());

const siteTripDayElement = document.querySelector(`.trip-days`);

render(siteTripDayElement, createTripDayItemTemplate());

const siteDayItemElement = document.querySelector(`.trip-days__item`);

render(siteDayItemElement, createEventListTemplate());

const siteEventListElement = document.querySelector(`.trip-events__list`);

const EVENT_COUNT = 3;

for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteEventListElement, createCardTemplate());
}
