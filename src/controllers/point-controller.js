import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import {replace} from '../utils/render.js';
import {KeyCode} from '../utils/common.js';


export default class PointController {
  constructor(container) {
    this._container = container;

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

    // eventForm.setFavotiteButtonClickHandler(() => {
    //   this._onDataChange(this, this._event, Object.assign({}, this._event, {
    //     isFavorite: !this._event.isFavorite,
    //   }));
    // });


    return eventItem;
  }

}
