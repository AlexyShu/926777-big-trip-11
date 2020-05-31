import {doFirstLetterUppercase, dateFormatforForm, getPrepositionForEventType, getUpperCaseString} from "../utils/common.js";
import {TripTypes, Mode, DefaultButtonsText, VALIDATION} from "../const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import moment from "moment";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const createPicturesTemplate = (pics) => {
  return pics.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join(`\n`);
};

const createOffersTemplate = (offers, type, point) => {
  if (offers.length === 0) {
    return ``;
  } else {
    return (`<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offers.map(({title, price}) => {
        const id = Math.random();
        const isChecked = point.offers.some((offer) => offer.title === title && offer.price === price);
        return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox"
      name="event-offer-${type}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
      <span class="event__offer-title"> ${title} </span>
      &plus;
     &euro;&nbsp;<span class="event__offer-price">${price}</span>
     </label>
   </div>`;
      }).join(`\n`)}
  </div>
  </section>`
    );
  }
};

const createDestinationTemplate = (point) => {
  if (point.name === ``) {
    return ``;
  } else {
    return (`<h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${point.description}</p>`
    );
  }
};

const createCitySelectTemplate = (places) => {
  return (`<datalist id="destination-list-1">
  ${places.map((it) => {
      return `<option value="${it}"></option>`;
    }).join(`\n`)}
    </datalist>`
  );
};

const createFormTemplate = (point, store, externalData, isNew) => {
  const {eventType, startEventTime, endEventTime, price, isFavorite} = point;
  const {name} = point.destination;
  const picturesTemplate = createPicturesTemplate(point.destination.pictures);
  const pointOffers = store.getOffers().find((el) => el.type === point.eventType);
  const preposition = getPrepositionForEventType(eventType);
  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
           <div class="event__type-wrapper">
             <label class="event__type  event__type-btn" for="event-type-toggle-1">
               <span class="visually-hidden">Choose event type</span>
               <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
             </label>
             <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             <div class="event__type-list">
             ${Object.keys(TripTypes).map((group) => {
      return (`<fieldset class="event__type-group">
                  <legend class="visually-hidden">${TripTypes[group]}</legend>
                ${TripTypes[group].map((el) => {
          return (`<div class="event__type-item">
                      <input id="event-type-${el}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${el}" ${eventType === el && `checked`}>
                      <label class="event__type-label  event__type-label--${el}" for="event-type-${el}-1">${doFirstLetterUppercase(el)}</label>
                    </div>`
          );
        }).join(`\n`)}
                </fieldset>`
      );
    }).join(`\n`)}
         </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-1">
           ${getUpperCaseString(eventType)} ${preposition}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
           ${createCitySelectTemplate(store.getDestinationNames())}
        </div>
        <div class="event__field-group  event__field-group--time">
           <label class="visually-hidden" for="event-start-time-1">
           From
           </label>
           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFormatforForm(startEventTime)}">
           &mdash;
           <label class="visually-hidden" for="event-end-time-1">
           To
           </label>
           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateFormatforForm(endEventTime)}">
        </div>
        <div class="event__field-group  event__field-group--price">
           <label class="event__label" for="event-price-1">
           <span class="visually-hidden">Price</span>
           &euro;
           </label>
           <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">${externalData.saveButtonText}</button>
        <button class="event__reset-btn" type="reset">${isNew ? DefaultButtonsText.canselButtonText : externalData.deleteButtonText}</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
          ${createOffersTemplate(pointOffers.offers, pointOffers.type, point)}
        <section class="event__section  event__section--destination">
          ${createDestinationTemplate(point.destination)}
          <div class="event__photos-container">
             <div class="event__photos-tape">
             ${picturesTemplate}
             </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class PointForm extends AbstractSmartComponent {
  constructor(card, store) {
    super();
    this._card = card;
    this._store = store;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._rollupHandler = null;
    this._resetHandler = null;
    this._submitHandler = null;
    this._favoriteHandler = null;
    this._mode = Mode.DEFAULT;
    this._type = card.TripTypes;
    this._destination = card.destination;
    this._externalData = DefaultButtonsText;
    this._destinations = store.getDestinations();
    this._townsList = store.getDestinationNames();
    this._isNewForm = false;
    this._applyFlatpickr();
    this.addListeners();
  }

  getTemplate() {
    return createFormTemplate(this._card, this._store, this._externalData, this._isNewForm);
  }

  removeElement() {
    this._deleteFlatpickrs();
    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _deleteFlatpickrs() {
    if (this._flatpickrStartDate && this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate.destroy();
      this._flatpickrEndDate = null;
    }
  }

  _applyFlatpickr() {
    this._deleteFlatpickrs();
    this._flatpickrStartDate = this._setFlatpickr(this.getElement().querySelector(`#event-start-time-1`), this._card.startEventTime);
    this._flatpickrEndDate = this._setFlatpickr(this.getElement().querySelector(`#event-end-time-1`), this._card.endEventTime, this._card.startEventTime);
  }

  _setFlatpickr(input, defaultTime, dateMin = `today`) {
    return flatpickr(input, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      minDate: dateMin,
      defaultDate: defaultTime,
      allowInput: true,
    });
  }

  setRpllupFormButtonClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
    this._rollupHandler = handler;
  }

  setResetButtonHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);
    this._resetHandler = handler;
  }

  setSubmitFormHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavotiteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitFormHandler(this._submitHandler);
    this.setResetButtonHandler(this._resetHandler);
    this.addListeners();
    if (this._mode === Mode.DEFAULT) {
      this.setResetButtonHandler(this._cancelHandler);
      this.setFavotiteButtonClickHandler(this._favoriteHandler);
    }
  }

  addListeners() {
    const element = this.getElement();
    element.querySelectorAll(`.event__type-input`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._card.eventType = evt.target.value;
        this.rerender();
      });
    });
    const eventInput = element.querySelector(`.event__input--destination`);
    if (eventInput.value === ``) {
      eventInput.setCustomValidity(VALIDATION);
    }
    eventInput.addEventListener(`change`, (evt) => {
      if (this._townsList.some((el) => el === eventInput.value)) {
        this._destination.name = evt.target.value;
        const town = this._destinations.find((el) => el.name === this._destination.name);
        this._destination.description = town ? town.description : ``;
        this._destination.pictures = town ? town.pictures : [];
        this.rerender();
      }
      eventInput.setCustomValidity(VALIDATION);
    });
    element.querySelector(`#event-start-time-1`)
      .addEventListener(`change`, (evt) => {
        this._card.startEventTime = moment(evt.target.value, `DD/MM/YY HH:mm`).valueOf();
        this._card.endEventTime = this._card.startEventTime > this._card.endEventTime
          ? this._card.startEventTime : this._card.endEventTime;
        this.rerender();
      });
    const favoriteButtun = element.querySelector(`.event__favorite-checkbox`);
    if (favoriteButtun) {
      favoriteButtun.addEventListener(`change`, (evt) => {
        this._card.isFavorite = evt.target.checked;
      });
    }
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultButtonsText, data);
    this.rerender();
  }

  blockForm() {
    const form = this.getElement();
    form.querySelectorAll(`input`).forEach((input) => (input.disabled = true));
    form.querySelectorAll(`button`).forEach((button) => (button.disabled = true));
  }

  unBlockForm() {
    const form = this.getElement();
    form.querySelectorAll(`input`).forEach((input) => (input.disabled = false));
    form.querySelectorAll(`button`).forEach((button) => (button.disabled = false));
  }

  getFormType() {
    this._isNewForm = true;
  }
}
