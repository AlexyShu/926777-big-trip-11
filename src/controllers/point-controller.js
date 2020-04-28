import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import {replace, render, RenderPosition} from '../utils/render.js';
import {KeyCode} from '../utils/common.js';


export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

  }

  render(event) {
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

    render(this._container, eventItem, RenderPosition.BEFOREEND);

    eventForm.setFavotiteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

  }

}
