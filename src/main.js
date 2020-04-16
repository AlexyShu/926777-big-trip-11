import SiteMenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import FormComponent from './components/form.js';
import TripDayWrapperComponent from './components/days-list.js';
import TripDayItemComponent from './components/day-number.js';
import EventListComponent from './components/events-list.js';
import CardComponent from './components/event.js';
import TripInfoComponent from './components/trip-info.js';
import EventSortComponent from './components/event-sort.js';
import {render, RenderPosition} from './utils.js';
import {filters} from './mocks/filters.js';
import {eventSorts} from './mocks/event-sort.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';

const EVENTS_COUNT = 15;

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const siteTripEventElement = document.querySelector(`.trip-events`);
const SiteMainTripElement = document.querySelector(`.trip-main`);

render(siteMenuElement, new SiteMenuComponent(menuItems).getElement(), RenderPosition.AFTEREND);
render(siteFilterElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(SiteMainTripElement, new TripInfoComponent(cards).getElement(), RenderPosition.AFTERBRGIN);
render(siteTripEventElement, new TripDayWrapperComponent().getElement(), RenderPosition.BEFOREEND);

const siteTripDayElement = document.querySelector(`.trip-days`);

render(siteTripDayElement, new TripDayItemComponent(cards).getElement(), RenderPosition.BEFOREEND);
render(siteTripDayElement, new EventSortComponent(eventSorts).getElement(), RenderPosition.BEFOREBEGIN);

const siteDayItemElement = document.querySelector(`.trip-days__item`);

render(siteDayItemElement, new EventListComponent().getElement(), RenderPosition.BEFOREEND);

const siteEventListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  const eventItem = new CardComponent(card);
  const eventForm = new FormComponent(card);
  const replaceFormToEvent = () => {
    siteEventListElement.replaceChild(eventItem.getElement(), eventForm.getElement());
  };
  const replaceEventToForm = () => {
    siteEventListElement.replaceChild(eventForm.getElement(), eventItem.getElement());
  };
  const rollupButton = eventItem.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, replaceEventToForm);
  const saveButton = eventForm.getElement().querySelector(`.event__save-btn`);
  const resetButton = eventForm.getElement().querySelector(`.event__reset-btn`);
  saveButton.addEventListener(`click`, replaceFormToEvent);
  resetButton.addEventListener(`click`, replaceFormToEvent);
  const submitForm = eventForm.getElement();
  submitForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    submitForm.replaceChild(eventItem.getElement(), eventForm.getElement());
  });
  render(siteEventListElement, eventItem.getElement(), RenderPosition.BEFOREEND);
}
// render(siteEventListElement, new CardComponent(card).getElement(), RenderPosition.BEFOREEND);
// render(siteEventListElement, new FormComponent(card).getElement(), RenderPosition.BEFOREEND);


