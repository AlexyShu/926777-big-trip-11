import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import {replace, render, RenderPosition} from '../utils/render.js';
import {KeyCode, Mode} from '../utils/common.js';


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

  render(event) {
    const oldEventItem = this._eventItem;
    const oldEventForm = this._eventForm;

    this._eventItem = new CardComponent(event);
    this._eventForm = new EventFormComponent(event);

    this._eventItem.setRollupButtonHandler(() => {
      this._replaceEventToForm();
      document.addEventListener(`keydown`, this._onEscPress);
    });
    this._eventForm.setSaveButtonHandler(() => {
      this._replaceFormToEvent();
    });
    this._eventForm.setResetButtonHandler(() => {
      this._replaceFormToEvent();
    });
    this._eventForm.setSubmitFormHandler((evt) => {
      evt.preventDefault();
      this._eventForm.getElement().replaceChild(this._eventItem.getElement(), this._eventForm.getElement());
    });

    this._eventForm.setFavotiteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventItem && oldEventForm) {
      replace(this._eventItem, oldEventItem);
      replace(this._eventForm, oldEventForm);
    } else {
      render(this._container, this._eventItem, RenderPosition.BEFOREEND);
    }

  }

  _replaceFormToEvent() {
    this._mode = Mode.DEFAULT;
    replace(this._eventItem, this._eventForm);
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

}
