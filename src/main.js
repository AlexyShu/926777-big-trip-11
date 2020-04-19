import SiteMenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import EventFormComponent from './components/form.js';
import TripDaysListComponent from './components/days-list.js';
import TripDayComponent from './components/day-number.js';
import EventListComponent from './components/events-list.js';
import CardComponent from './components/event.js';
import TripInfoComponent from './components/trip-info.js';
import EventSortComponent from './components/event-sort.js';
import {render, RenderPosition, makeGroupedEvents} from './utils.js';
import {filters} from './mocks/filters.js';
import {eventSorts} from './mocks/event-sort.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';

const EVENTS_COUNT = 5;

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const siteTripEventElement = document.querySelector(`.trip-events`);

render(siteMenuElement, new SiteMenuComponent(menuItems).getElement(), RenderPosition.AFTEREND);
render(siteFilterElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new TripInfoComponent(cards).getElement(), RenderPosition.BEFOREBEGIN);
render(siteTripEventElement, new TripDaysListComponent().getElement(), RenderPosition.BEFOREEND);

const siteTripDayElement = document.querySelector(`.trip-days`);

render(siteTripDayElement, new EventSortComponent(eventSorts).getElement(), RenderPosition.BEFOREBEGIN);

const eventGroups = makeGroupedEvents(cards);

let dayCount = 0;
eventGroups.forEach((events, dayInMillesecondsts) => {
  dayCount++;
  const dayComponent = new TripDayComponent(events, dayCount).getElement();
  render(siteTripDayElement, dayComponent, RenderPosition.BEFOREEND);
  const eventList = new EventListComponent().getElement();
  render(dayComponent, eventList, RenderPosition.BEFOREEND);
  events.forEach((event) => {
    const eventItem = new CardComponent(event);
    const eventForm = new EventFormComponent(event);
    const replaceFormToEvent = () => {
      eventList.replaceChild(eventItem.getElement(), eventForm.getElement());
    };
    const replaceEventToForm = () => {
      eventList.replaceChild(eventForm.getElement(), eventItem.getElement());
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
    render(eventList, eventItem.getElement(), RenderPosition.BEFOREEND);
  });
});


