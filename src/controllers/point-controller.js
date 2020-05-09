import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import {replace, render, remove, RenderPosition} from '../utils/render.js';
import {KeyCode, Mode} from '../utils/common.js';

export const EmptyEvent = {};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
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
    this._eventForm = new EventFormComponent(event);

    this._eventItem.setRollupButtonHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscPress);
    });
    this._eventForm.setResetButtonHandler(() => {
      this._onDataChange(this, event, null);
    });
    this._eventForm.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      const data = this._eventForm.getData();
      this._onDataChange(this, event, data);
    });


    // if (oldEventItem && oldEventForm) {
    //   replace(this._eventItem, oldEventItem);
    //   replace(this._eventForm, oldEventForm);
    //   this. _replaceFormToEvent();
    // } else {
    //   render(this._container, this._eventItem, RenderPosition.BEFOREEND);
    // }

    switch (mode) {
      case Mode.DEFAULT:
        this._eventForm.setRpllupFormButtonClick(() => {
          this._replaceFormToEvent();
        });
        this._eventForm.setFavotiteButtonClickHandler(() => {
          this._onDataChange(this, event, Object.assign({}, event, {
            isFavorite: !event.isFavorite,
          }));
        });
        if (oldEventItem && oldEventForm) {
          replace(this._eventItem, oldEventItem);
          replace(this._eventForm, oldEventForm);
          this. _replaceFormToEvent();
          this._replaceFormToEvent();
        } else {
          render(this._container, this._eventItem, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADD:
        this._eventForm.setMode(Mode);
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

}
