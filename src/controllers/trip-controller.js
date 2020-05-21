import NoEventComponent from '../components/no-event.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {Mode as PointControllerMode, makeGroupedEvents, EmptyPoint} from '../utils/common.js';
import PointController from './point-controller.js';
import {FilterType, SortType} from '../const.js';

export default class TripController {
  constructor(container, pointsModel, api, store) {
    this._container = container;
    this._api = api;
    this._store = store;
    this._eventsSort = new EventSortComponent();
    this._noEventComponent = new NoEventComponent();

    this._pointControllers = [];
    this._creatingPoint = null;
    this._pointsModel = pointsModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderDay(events, dayCount) {
    const dayComponent = new TripDayComponent(events, dayCount);
    render(this._container.getElement(), dayComponent, RenderPosition.BEFOREEND);
    const eventList = new EventListComponent();
    render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);
    events.forEach((event) => {
      const pointController = new PointController(eventList.getElement(), this._onDataChange, this._onViewChange, this._store);
      this._pointControllers.push(pointController);
      pointController.render(event, PointControllerMode.DEFAULT);
    });
  }

  render(isGroupOnDays = true) {
    const events = this._pointsModel.getPoints();
    const siteTripEventElement = document.querySelector(`.trip-events`);
    if (!events.length) {
      render(siteTripEventElement, this._noEventComponent, RenderPosition.BEFOREEND);
    } else {
      remove(this._noEventComponent);
      render(siteTripEventElement, this._container, RenderPosition.BEFOREEND);
      render(siteTripEventElement, this._eventsSort, RenderPosition.AFTERBEGIN);

      if (isGroupOnDays) {
        const eventGroups = makeGroupedEvents(events);
        let dayCount = 0;
        eventGroups.forEach((tripEvents) => {
          dayCount++;
          this.renderDay(tripEvents, dayCount);
        });

        this._eventsSort.setSortTypeChangeHandler((sortType) => {
          this.getEventsSort(sortType);
        });

      } else {
        this.renderDay(events, 0);

        this._eventsSort.setSortTypeChangeHandler((sortType) => {
          this.getEventsSort(sortType);
        });
      }

    }
  }

  getEventsSort(sortType) {
    const sortDayItem = document.querySelector(`.trip-sort__item--day`);
    const sortByNotDefult = () => {
      this._container.getElement().innerHTML = ``;
      sortDayItem.innerHTML = ``;
    };
    const events = this._pointsModel.getPoints();
    let sortedItems = [];
    switch (sortType) {
      case SortType.EVENT:
        this._container.getElement().innerHTML = ``;
        sortedItems = events.slice();
        this.render();
        break;
      case SortType.TIME:
        sortByNotDefult();
        sortedItems = events.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
        this.renderDay(sortedItems);
        break;
      case SortType.PRICE:
        sortByNotDefult();
        sortedItems = events.slice().sort((a, b) => b.price - a.price);
        this.renderDay(sortedItems);
        break;
    }
  }

  _onDataChange(pointController, oldData, newData) {
    // добавление
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
      } else {
        this._pointsModel.addPoint(newData);
        remove(this._container);
        const form = document.querySelector(`.trip-events__item`);
        form.remove();
        this.render();
        // pointController.render(newData, PointControllerMode.ADD);
      }
    }
    // удаление
    if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
    } else {
      // обнавление
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);
          if (isSuccess) {
            pointController.render(pointModel, PointControllerMode.DEFAULT);
            this._updateEvents();
          }
        });
    }
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => {
      it._setDefaultView();
    });
  }

  _removeEvents() {
    this._container.getElement().innerHTML = ``;
    this._pointControllers.forEach((_pointController) => _pointController.destroy());
    this._pointControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    this.render();
  }

  _onFilterChange() {
    this._updateEvents();
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }
    this._onViewChange();
    // this._eventsSort.getSortType();
    this.getEventsSort(SortType.EVENT);
    document.querySelector(`#sort-event`).checked = true;
    this._pointsModel.setFilter(FilterType.EVERYTHING);
    this._creatingPoint = new PointController(this._container.getElement(), this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADD);
  }

  hide() {
    this._container.hide();
    this._eventsSort.hide();
  }

  show() {
    this._container.show();
    this._eventsSort.show();
  }

}
