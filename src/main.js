import SiteMenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import EventFormComponent from './components/form.js';
import TripDaysListComponent from './components/days-list.js';
import TripDayComponent from './components/day-number.js';
import EventListComponent from './components/events-list.js';
import CardComponent from './components/event.js';
import TripInfoComponent from './components/trip-info.js';
import EventSortComponent from './components/event-sort.js';
import NoEventComponent from './components/no-event.js';
import {makeGroupedEvents, KeyCode} from './utils.js';
import {render, RenderPosition, replace} from './utils/render.js';
import {filters} from './mocks/filters.js';
import {eventSorts} from './mocks/event-sort.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';

const EVENTS_COUNT = 5;

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const siteTripEventElement = document.querySelector(`.trip-events`);

render(siteMenuElement, new SiteMenuComponent(menuItems), RenderPosition.AFTEREND);
render(siteFilterElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);

if (EVENTS_COUNT === 0) {
  render(siteTripEventElement, new NoEventComponent(), RenderPosition.BEFOREEND);
} else {
  render(siteFilterElement, new TripInfoComponent(cards), RenderPosition.BEFOREBEGIN);
  render(siteTripEventElement, new TripDaysListComponent(), RenderPosition.BEFOREEND);

  const siteTripDayElement = document.querySelector(`.trip-days`);

  render(siteTripDayElement, new EventSortComponent(eventSorts), RenderPosition.BEFOREBEGIN);

  const tripTotalPrice = document.querySelector(`.trip-info__cost-value`);
  tripTotalPrice.textContent = cards.reduce((totalPrice, it) => {
    return totalPrice + it.price + it.offers.reduce((totalOfferPrice, offer) => {
      return totalOfferPrice + offer.price;
    }, 0);
  }, 0);

  const eventGroups = makeGroupedEvents(cards);

  let dayCount = 0;

  eventGroups.forEach((events) => {
    dayCount++;
    const dayComponent = new TripDayComponent(events, dayCount);
    render(siteTripDayElement, dayComponent, RenderPosition.BEFOREEND);
    const eventList = new EventListComponent();
    render(dayComponent, eventList, RenderPosition.BEFOREEND);
    events.forEach((event) => {
      const eventItem = new CardComponent(event);
      const eventForm = new EventFormComponent(event);
      const replaceFormToEvent = () => {
        replace(eventList, eventItem.getElement(), eventForm.getElement());
      };
      const replaceEventToForm = () => {
        replace(eventList, eventForm.getElement(), eventItem.getElement());
      };

      const onEscPress = (evt) => {
        if (evt.keyCode === KeyCode.ESC) {
          evt.preventDefault();
          replaceFormToEvent();
          document.removeEventListener(`keydown`, onEscPress);
        }
      };

      const rollupButton = eventItem.getElement().querySelector(`.event__rollup-btn`);
      rollupButton.addEventListener(`click`, () => {
        replaceEventToForm();
        document.addEventListener(`keydown`, onEscPress);
      });

      const saveButton = eventForm.getElement().querySelector(`.event__save-btn`);
      const resetButton = eventForm.getElement().querySelector(`.event__reset-btn`);
      saveButton.addEventListener(`click`, replaceFormToEvent);
      resetButton.addEventListener(`click`, replaceFormToEvent);
      const submitForm = eventForm.getElement();
      submitForm.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        submitForm.replaceChild(eventItem.getElement(), eventForm.getElement());

      });
      render(eventList, eventItem, RenderPosition.BEFOREEND);
    });
  });

}
