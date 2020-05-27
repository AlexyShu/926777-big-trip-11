import AddEventButton from "./components/add-button.js";
import FlterController from "./controllers/filter-controller.js";
import InfoController from "./controllers/info-controller.js";
import SiteMenuComponent from "./components/menu.js";
import TripController from "./controllers/trip-controller.js";
import TripDaysListComponent from "./components/days-list.js";
import StatisticsComponent from "./components/statistics.js";
import LoadingListComponent from "./components/loading-list.js";
import LoadErrorListComponent from "./components/loading-error-list.js";
import API from "./api.js";
import Store from "./store.js";
import PointsModel from "./models/points-model.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {DefaultButtonsText, AUTHORIZATION, END_POINT} from "./const.js";

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
const loadingList = new LoadingListComponent();

render(document.querySelector(`.trip-events`), loadingList, RenderPosition.AFTERBEGIN);
render(siteMenuElement, menu, RenderPosition.AFTEREND);
filterController.render();
render(siteFilterElement, addEventButton, RenderPosition.AFTEREND);
render(tripEventsSection, statistics, RenderPosition.AFTEREND);

addEventButton.setClickButtonHandler(() => {
  tripController.createPoint();
  addEventButton.disableButton();
  filterController.changeByDefaultFilter();
  filterController.render();
  // document.querySelector(`.event__reset-btn`).textContent = DefaultButtonsText.canselButtonText;
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
  .then((points) => pointsModel.setPoints(points))
  .then(() => api.getDestinations())
  .then((destinations) => store.setDestinations(destinations))
  .then(() => api.getOffers())
  .then((offers) => store.setOffers(offers))
  .then(() => {
    tripController.render();
    infoController.render();
    remove(loadingList);
  })
  .catch(() => {
    remove(loadingList);
    render(document.querySelector(`.trip-events`), new LoadErrorListComponent(), RenderPosition.AFTERBEGIN);
  });
