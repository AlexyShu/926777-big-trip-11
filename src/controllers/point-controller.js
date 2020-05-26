import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import PointModel from '../models/point-model';
import {replace, render, remove, RenderPosition} from '../utils/render.js';
import {KeyCode, Mode, SHAKE_ANIMATION_TIMEOUT} from '../const.js';
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

    this._eventItem = new CardComponent(event, this._store);
    this._eventForm = new EventFormComponent(event, this._store);

    const parseFormData = (formData) => {
      const eventOffers = this._store.getOffers().find((el) => el.type === event.eventType);
      const checkboxes = document.querySelectorAll(`.event__offer-checkbox`);
      const offersChecked = [];
      checkboxes.forEach((element, index) => {
        if (element.checked) {
          offersChecked.push(eventOffers[index]);
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
      this._eventForm.setData({
        deleteButtonText: `Deleting...`,
      });
      this._onDataChange(this, event, null);
      this._eventForm.blockForm();
      const addButton = document.querySelector(`.trip-main__event-add-btn`);
      addButton.disabled = false;
    });

    this._eventForm.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._eventForm.setData({
        saveButtonText: `Saving...`
      });
      const formData = this._eventForm.getData();
      const data = parseFormData(formData, event);
      this._onDataChange(this, event, data);
      this._eventForm.blockForm();
      this._eventForm.getElement().style.border = `none`;
    });

    switch (mode) {
      case Mode.DEFAULT:
        this._eventForm.setRpllupFormButtonClick(() => {
          this._replaceFormToEvent();
        });
        this._eventForm.setFavotiteButtonClickHandler(() => {
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

  catchError() {
    this._eventForm.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventItem.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._eventForm.getElement().style.animation = ``;
      this._eventItem.getElement().style.animation = ``;
      this._eventForm.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
      this._eventForm.getElement().style.border = `4px solid red`;
      this._eventForm.unBlockForm();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

}
