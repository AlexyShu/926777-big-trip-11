import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import NoEventComponent from '../components/no-event.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {SortType} from '../mocks/event-sort.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {KeyCode, makeGroupedEvents} from '../utils/common.js';

const getEventsSort = (events, sortType) => {
  let sortedItems = [];
  switch (sortType) {
    case SortType.EVENT:
      sortedItems = events.slice().sort((a, b) => a.startDate - b.startDate);
      break;
    case SortType.TIME:
      sortedItems = events.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
    case SortType.PRICE:
      sortedItems = events.sort((a, b) => b.price - a.price);
      break;
  }
  return sortedItems;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._eventsSort = new EventSortComponent();
  }

  renderDay(events, dayCount) {
    const dayComponent = new TripDayComponent(events, dayCount);
    render(this._container.getElement(), dayComponent, RenderPosition.BEFOREEND);
    const eventList = new EventListComponent();
    render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);
    events.forEach((it) => {
      const event = this.createEvent(it);
      render(eventList.getElement(), event, RenderPosition.BEFOREEND);
    });
  }


  createEvent(event) {
    const eventItem = new CardComponent(event);
    const eventForm = new EventFormComponent(event);
    const replaceFormToEvent = () => {
      replace(eventItem, eventForm);
    };
    const replaceEventToForm = () => {
      replace(eventForm, eventItem);
    };
    const onEscPress = (evt) => {
      if (evt.keyCode === KeyCode.ESC) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };
    eventItem.setRollupButtonHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscPress);
    });
    eventForm.setSaveButtonHandler(() => {
      replaceFormToEvent();
    });
    eventForm.setResetButtonHandler(() => {
      replaceFormToEvent();
    });
    eventForm.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      eventForm.getElement().replaceChild(eventItem.getElement(), eventForm.getElement());
    });
    return eventItem;
  }


  render(events, isGroupOnDays = true) {
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
}


