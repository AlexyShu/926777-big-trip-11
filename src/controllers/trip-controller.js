import NoEventComponent from '../components/no-event.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {SortType} from '../mocks/event-sort.js';
import {render, RenderPosition} from '../utils/render.js';
import {Mode as PointControllerMode, makeGroupedEvents, EmptyPoint} from '../utils/common.js';
import PointController from './point-controller.js';

const getEventsSort = (events, sortType) => {
  let sortedItems = [];
  switch (sortType) {
    case SortType.EVENT:
      sortedItems = events.slice();
      break;
    case SortType.TIME:
      sortedItems = events.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
    case SortType.PRICE:
      sortedItems = events.slice().sort((a, b) => b.price - a.price);
      break;
  }
  return sortedItems;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._eventsSort = new EventSortComponent();

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
      const pointController = new PointController(eventList.getElement(), this._onDataChange, this._onViewChange);
      this._pointControllers.push(pointController);
      pointController.render(event, PointControllerMode.DEFAULT);
    });
  }

  render(isGroupOnDays = true) {
    const events = this._pointsModel.getEvents();
    const siteTripEventElement = document.querySelector(`.trip-events`);
    if (!events.length) {
      render(siteTripEventElement, new NoEventComponent(), RenderPosition.BEFOREEND);
    } else {
      render(siteTripEventElement, this._container, RenderPosition.BEFOREEND);
      render(this._container.getElement(), this._eventsSort, RenderPosition.BEFOREBEGIN);

      this._eventsSort.setSortTypeChangeHandler((sortType) => {
        const sortedEvents = getEventsSort(events, sortType);
        this._container.getElement().innerHTML = ``;
        const sortDayItem = document.querySelector(`.trip-sort__item--day`);
        sortDayItem.innerHTML = ``;
        this.render(sortedEvents, sortType === `event`);
      });

      const tripTotalPrice = document.querySelector(`.trip-info__cost-value`);

      tripTotalPrice.textContent = events.reduce((totalPrice, it) => {
        return totalPrice + it.price + it.offers.reduce((totalOfferPrice, offer) => {
          return totalOfferPrice + offer.price;
        }, 0);
      }, 0);

      if (isGroupOnDays) {
        const eventGroups = makeGroupedEvents(events);
        let dayCount = 0;
        eventGroups.forEach((tripEvents) => {
          dayCount++;
          this.renderDay(tripEvents, dayCount);
        });
      } else {
        this.renderDay(events, 0);
      }

    }
  }

  _onDataChange(pointController, oldData, newData) {
    // добавление
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
      } else {
        this._pointsModel.addEvent(newData);
        pointController.render(newData, PointControllerMode.ADD);
      }
    }
    // удаление
    if (newData === null) {
      this._pointsModel.removeEvent(oldData.id);
    } else {
      // обнавление
      const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
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
    const eventsListElement = eventList.getElement();
    this._creatingPoint = new PointController(eventsListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADD);
  }
}
