import SiteMenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller.js';
import FlterController from './controllers/filter-controller.js';
import TripDaysListComponent from './components/days-list.js';
import AddEventButton from './components/add-button.js';
import TripInfoComponent from './components/trip-info.js';
import StatisticsComponent from './components/statistics.js';
import PointsModel from "./models/points-model.js";
import {generateEvents} from './mocks/event.js';
import {render, RenderPosition} from './utils/render.js';
import {EVENTS_COUNT} from './const.js';


export const cards = generateEvents(EVENTS_COUNT);

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);

const pointsModel = new PointsModel();
pointsModel.setEvents(cards);

const menu = new SiteMenuComponent();
render(siteMenuElement, menu, RenderPosition.AFTEREND);
const filterController = new FlterController(siteFilterElement, pointsModel);
filterController.render();

const addEventButton = new AddEventButton();
render(siteFilterElement, addEventButton, RenderPosition.AFTEREND);

if (cards.length !== 0) {
  render(siteFilterElement, new TripInfoComponent(cards), RenderPosition.BEFOREBEGIN);
}

const tripDaysList = new TripDaysListComponent();
const tripController = new TripController(tripDaysList, pointsModel);
tripController.render();

addEventButton.setClickButtonHandler(() => {
  tripController.createPoint();

  filterController.changeByDefaultFilter();
  filterController.render();
});

const tripEventsSection = document.querySelector(`.trip-events`);
const statistics = new StatisticsComponent(pointsModel);
render(tripEventsSection, statistics, RenderPosition.AFTEREND);
statistics.hide();

menu.setStatisticsButtonClickHandler(() => {
  statistics.rerender();
  menu.setActiveStatistics();
  tripController.hide();
  statistics.show();
});

menu.setTableButtonClickHandler(() => {
  statistics.destroy();
  menu.setActiveTable();
  tripController.show();
  statistics.hide();
});


