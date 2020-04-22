import SiteMenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import TripController from './controllers/trip-controller.js';
import EventListComponent from './components/events-list.js';
import {render, RenderPosition} from './utils/render.js';
import {filters} from './mocks/filters.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';
import {EVENTS_COUNT} from './utils/common.js';

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

render(siteMenuElement, new SiteMenuComponent(menuItems), RenderPosition.AFTEREND);
render(siteFilterElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);

const eventList = new EventListComponent();
const tripController = new TripController(eventList.getElement());
tripController.render(cards);
