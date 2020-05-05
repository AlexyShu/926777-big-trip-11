import SiteMenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller.js';
import FlterController from './controllers/filter-controller.js';
import TripDaysListComponent from './components/days-list.js';
import TripInfoComponent from './components/trip-info.js';
import PointsModel from "./models/points-model.js";
import {render, RenderPosition} from './utils/render.js';
import {menuItems} from './mocks/menu.js';
import {generateEvents} from './mocks/event.js';
import {EVENTS_COUNT} from './utils/common.js';

export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const pointsModel = new PointsModel();
pointsModel.setEvents(cards);

render(siteMenuElement, new SiteMenuComponent(menuItems), RenderPosition.AFTEREND);
const filterController = new FlterController(siteFilterElement, pointsModel);
filterController.render();


if (cards.length !== 0) {
  render(siteFilterElement, new TripInfoComponent(cards), RenderPosition.BEFOREBEGIN);
}

const tripDaysList = new TripDaysListComponent();
const tripController = new TripController(tripDaysList, pointsModel);
tripController.render();
