import AddEventButton from './components/add-button.js';
import FlterController from './controllers/filter-controller.js';
import SiteMenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller.js';
import TripDaysListComponent from './components/days-list.js';
import TripInfoComponent from './components/trip-info.js';
import StatisticsComponent from './components/statistics.js';
import API from "./api.js";
import PointsModel from "./models/points-model.js";
// import {generateEvents} from './mocks/event.js';
import {render, RenderPosition} from './utils/render.js';
// import {EVENTS_COUNT} from './const.js';

// export const cards = generateEvents(EVENTS_COUNT);

const AUTHORIZATION = `Basic kukurukublablabla`;

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);
const tripEventsSection = document.querySelector(`.trip-events`);

const api = new API(AUTHORIZATION);
const pointsModel = new PointsModel();
const menu = new SiteMenuComponent();
const filterController = new FlterController(siteFilterElement, pointsModel);
const addEventButton = new AddEventButton();
const tripDaysList = new TripDaysListComponent();
const tripController = new TripController(tripDaysList, pointsModel);
const statistics = new StatisticsComponent(pointsModel);

// pointsModel.setEvents(cards);

render(siteMenuElement, menu, RenderPosition.AFTEREND);
filterController.render();
render(siteFilterElement, addEventButton, RenderPosition.AFTEREND);
render(tripEventsSection, statistics, RenderPosition.AFTEREND);

// if (cards.length !== 0) {
//   render(siteFilterElement, new TripInfoComponent(cards), RenderPosition.BEFOREBEGIN);
// }

// tripController.render();

addEventButton.setClickButtonHandler(() => {
  tripController.createPoint();
  filterController.changeByDefaultFilter();
  filterController.render();
});

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

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    tripController.render();
  });


