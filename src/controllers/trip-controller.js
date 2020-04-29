import NoEventComponent from '../components/no-event.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {SortType} from '../mocks/event-sort.js';
import {render, RenderPosition} from '../utils/render.js';
import {makeGroupedEvents} from '../utils/common.js';
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
  constructor(container) {
    this._container = container;
    this._eventsSort = new EventSortComponent();

    this._pointControllers = [];
    this._events = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  renderDay(events, dayCount) {
    const dayComponent = new TripDayComponent(events, dayCount);
    render(this._container.getElement(), dayComponent, RenderPosition.BEFOREEND);
    const eventList = new EventListComponent();
    render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);
    events.forEach((event) => {
      const pointController = new PointController(eventList.getElement(), this._onDataChange, this._onViewChange);
      this._pointControllers.push(pointController);
      pointController.render(event);
    });
  }

  render(events, isGroupOnDays = true) {
    this._events = events;
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
    const index = this._events.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => {
      it._setDefaultView();
    });
  }
}
