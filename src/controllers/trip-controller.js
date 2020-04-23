/* eslint-disable max-nested-callbacks */

import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import NoEventComponent from '../components/no-event.js';
import TripInfoComponent from '../components/trip-info.js';
import EventSortComponent from '../components/event-sort.js';
import TripDayComponent from '../components/day-number.js';
import EventListComponent from '../components/events-list.js';
import {SortType} from '../mocks/event-sort.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {KeyCode, makeGroupedEvents, EVENTS_COUNT} from '../utils/common.js';

// const getEventsSort = (sortType, events) => {
//   let sortedEvents = [];
//   const showingEvents = events.slice();
//   switch (sortType) {
//     case SortType.EVENT:
//       sortedEvents = showingEvents;
//       break;
//     case SortType.TIME:
//       sortedEvents = showingEvents.sort((a, b) => b.startDate - a.startDate);
//       break;
//     case SortType.PRICE:
//       sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
//       break;
//   }
//   return sortedEvents.slice();
// };

export default class TripController {
  constructor(container) {
    this._container = container;
    this._eventsSort = new EventSortComponent();
  }

  render(events) {
    const siteTripEventElement = document.querySelector(`.trip-events`);
    const siteFilterElement = document.querySelector(`.trip-main__trip-controls`);
    if (EVENTS_COUNT === 0) {
      render(siteTripEventElement, new NoEventComponent(), RenderPosition.BEFOREEND);
    } else {
      render(siteFilterElement, new TripInfoComponent(events), RenderPosition.BEFOREBEGIN);
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

        events.forEach((event) => {
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
          render(eventList.getElement(), eventItem, RenderPosition.BEFOREEND);

          this._eventsSort.setSortTypeChangeHandler((sortType) => {
            events = [];
            switch (sortType) {
              case SortType.EVENT:
                events.slice();
                break;
              case SortType.TIME:
                events.sort((a, b) => b.startDate - a.startDate);
                break;
              case SortType.PRICE:
                events.sort((a, b) => b.price - a.price);
                break;
            }
            return events.slice();
          });
        });
      });

    }
  }
}


