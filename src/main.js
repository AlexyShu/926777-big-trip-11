import AddEventButton from './components/add-button.js';
import FlterController from './controllers/filter-controller.js';
import InfoController from './controllers/info-controller.js';
import SiteMenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller.js';
import TripDaysListComponent from './components/days-list.js';
import StatisticsComponent from './components/statistics.js';
import API from "./api.js";
import Store from './store.js';
import PointsModel from "./models/points-model.js";
import {render, RenderPosition} from './utils/render.js';

const AUTHORIZATION = `Basic kukurukublablabla`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2`);
const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);
const tripEventsSection = document.querySelector(`.trip-events`);

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store();
const pointsModel = new PointsModel();
const menu = new SiteMenuComponent();
const filterController = new FlterController(siteFilterElement, pointsModel);
const addEventButton = new AddEventButton();
const tripDaysList = new TripDaysListComponent();
const tripController = new TripController(tripDaysList, pointsModel, api, store);
const statistics = new StatisticsComponent(pointsModel);
const infoController = new InfoController(siteFilterElement, pointsModel);

render(siteMenuElement, menu, RenderPosition.AFTEREND);
filterController.render();
render(siteFilterElement, addEventButton, RenderPosition.AFTEREND);
render(tripEventsSection, statistics, RenderPosition.AFTEREND);

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
    infoController.render();
  });

api.getDestinations()
  .then((data) => store.setDestinations(data));

api.getOffers()
  .then((data) => store.setOffers(data));
