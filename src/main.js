import SiteMenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import TripDaysListComponent from './components/days-list.js';
import TripDayComponent from './components/day-number.js';
import EventListComponent from './components/events-list.js';
import TripController from './controllers/trip-controller.js';
import TripInfoComponent from './components/trip-info.js';
import EventSortComponent from './components/event-sort.js';
import NoEventComponent from './components/no-event.js';
import {makeGroupedEvents} from './utils/common.js';
import {render, RenderPosition} from './utils/render.js';
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
    render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);
    const tripController = new TripController(eventList.getElement());
    tripController.render(events);
  });

}
