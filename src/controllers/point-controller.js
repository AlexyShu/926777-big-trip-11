import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import PointModel from '../models/point-model';
import {replace, render, remove, RenderPosition} from '../utils/render.js';
import {KeyCode, Mode} from '../const.js';
import flatpickr from "flatpickr";


export default class PointController {
  constructor(container, onDataChange, onViewChange, store) {
    this._container = container;
    this._store = store;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._eventItem = null;
    this._eventForm = null;
    this._replaceFormToEvent = this._replaceFormToEvent.bind(this);
    this._replaceEventToForm = this._replaceEventToForm.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  }

  render(event, mode) {
    this._mode = mode;

    const oldEventItem = this._eventItem;
    const oldEventForm = this._eventForm;

    this._eventItem = new CardComponent(event);
    this._eventForm = new EventFormComponent(event, this._store);

    const parseFormData = (formData) => {
      const checkboxes = document.querySelectorAll(`.event__offer-checkbox`);
      const offersChecked = [];
      checkboxes.forEach((element, index) => {
        if (element.checked) {
          offersChecked.push(event.offers[index]);
        }
      });
      return new PointModel({
        "id": event.id,
        "destination": {
          "name": formData.get(`event-destination`),
          "description": event.destination.description,
          "pictures": event.destination.pictures
        },
        "type": formData.get(`event-type`),
        "date_from": flatpickr.parseDate(formData.get(`event-start-time`), `d/m/y H:i`),
        "date_to": flatpickr.parseDate(formData.get(`event-end-time`), `d/m/y H:i`),
        "base_price": parseInt(formData.get(`event-price`), 10),
        "offers": offersChecked,
        "is_favorite": false
      });
    };


    this._eventItem.setRollupButtonHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscPress);
    });
    this._eventForm.setResetButtonHandler(() => {
      this._onDataChange(this, event, null);
      remove(this._eventItem);
      remove(this._eventForm);
    });
    this._eventForm.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      // const data = this._eventForm.getData();
      const formData = this._eventForm.getData();
      const data = parseFormData(formData);
      this._onDataChange(this, event, data);
    });

    switch (mode) {
      case Mode.DEFAULT:
        this._eventForm.setRpllupFormButtonClick(() => {
          this._replaceFormToEvent();
        });
        this._eventForm.setFavotiteButtonClickHandler(() => {
          // this._onDataChange(this, event, Object.assign({}, event, {
          //   isFavorite: !event.isFavorite,
          // }));
          const newPoint = PointModel.clone(event);
          newPoint.isFavorite = !newPoint.isFavorite;
          this._onDataChange(this, event, newPoint);
        });
        if (oldEventItem && oldEventForm) {
          replace(this._eventItem, oldEventItem);
          replace(this._eventForm, oldEventForm);
          this._replaceFormToEvent();
        } else {
          render(this._container, this._eventItem, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADD:
        if (oldEventItem && oldEventForm) {
          remove(oldEventItem);
          remove(oldEventForm);
        } else {
          document.querySelector(`.trip-sort`).after(this._eventForm.getElement());
          // render(this._container, this._eventForm, RenderPosition.BEFOREBEGIN);
        }
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this. _replaceFormToEvent();
    }
  }

  _replaceFormToEvent() {
    this._mode = Mode.DEFAULT;
    if (document.contains(this._eventForm.getElement())) {
      replace(this._eventItem, this._eventForm);
    }
  }

  _replaceEventToForm() {
    this._onViewChange();
    this._mode = Mode.EDIT;
    replace(this._eventForm, this._eventItem);
  }

  _onEscPress(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      this._replaceFormToEvent();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }

  _setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  destroy() {
    remove(this._eventItem);
    remove(this._eventForm);
    document.removeEventListener(`keydown`, this._onEscPress);
  }

}
