import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import NoEventComponent from '../components/no-event.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {SortType} from '../mocks/event-sort.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {KeyCode, makeGroupedEvents, EVENTS_COUNT} from '../utils/common.js';

const getEventsSort = (events, sortType, from, to) => {
  let sortedItems = [];
  const showingEvents = events.slice();
  switch (sortType) {
    case SortType.EVENT:
      sortedItems = showingEvents;
      break;
    case SortType.TIME:
      sortedItems = showingEvents.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
    case SortType.PRICE:
      sortedItems = showingEvents.sort((a, b) => b.price - a.price);
      break;
  }
  return sortedItems.slice(from, to);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._eventsSort = new EventSortComponent();
  }

  render(events) {
    const siteTripEventElement = document.querySelector(`.trip-events`);
    if (EVENTS_COUNT === 0) {
      render(siteTripEventElement, new NoEventComponent(), RenderPosition.BEFOREEND);
    } else {
      render(siteTripEventElement, this._container, RenderPosition.BEFOREEND);
      render(this._container.getElement(), this._eventsSort, RenderPosition.BEFOREBEGIN);
      const tripTotalPrice = document.querySelector(`.trip-info__cost-value`);

      tripTotalPrice.textContent = events.reduce((totalPrice, it) => {
        return totalPrice + it.price + it.offers.reduce((totalOfferPrice, offer) => {
          return totalOfferPrice + offer.price;
        }, 0);
      }, 0);

      const eventGroups = makeGroupedEvents(events);
      let dayCount = 0;

      eventGroups.forEach((tripEvents) => {
        dayCount++;
        const dayComponent = new TripDayComponent(tripEvents, dayCount);
        render(this._container.getElement(), dayComponent, RenderPosition.BEFOREEND);
        const eventList = new EventListComponent();
        render(dayComponent.getElement(), eventList, RenderPosition.BEFOREEND);

        tripEvents.forEach((tripEvent) => {
          const eventItem = new CardComponent(tripEvent);
          const eventForm = new EventFormComponent(tripEvent);

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


          render(eventList.getElement(), eventItem, RenderPosition.BEFOREEND);

          this._eventsSort.setSortTypeChangeHandler((sortType) => {
            const sortedEvents = getEventsSort(events, sortType, 0, EVENTS_COUNT);
            this._container.getElement().innerHTML = ``;
            const daySort = document.querySelector(`.trip-sort__item--day`);
            daySort.innerHTML = ``;
            const siteDayComponent = new TripDayComponent(sortedEvents, 1);
            render(this._container.getElement(), siteDayComponent, RenderPosition.BEFOREEND);
            const siteEventListComponent = new EventListComponent();
            render(siteDayComponent.getElement(), siteEventListComponent, RenderPosition.BEFOREEND);
            sortedEvents.forEach((it) => {
              render(siteEventListComponent.getElement(), new CardComponent(it), RenderPosition.BEFOREEND);
            });
            const dayCounter = document.querySelectorAll(`.day__counter`);
            const dayDate = document.querySelectorAll(`.day__date`);
            dayCounter.forEach((dayNumber) => {
              dayNumber.remove();
            });
            dayDate.forEach((date) => {
              date.remove();
            });
          });

        });

      });

    }
  }
}


