import EventFormComponent from '../components/form.js';
import CardComponent from '../components/event.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {KeyCode} from '../utils/common.js';

export default class TripController {
  constructor(container) {
    this._container = container;
  }
  render(events) {
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
      eventItem.setRollupButton(() => {
        replaceEventToForm();
        document.addEventListener(`keydown`, onEscPress);
      });
      eventForm.setSaveButton(() => {
        replaceFormToEvent();
      });
      eventForm.setResetButton(() => {
        replaceFormToEvent();
      });
      eventForm.setSubmitForm((evt) => {
        evt.preventDefault();
        eventForm.getElement().replaceChild(eventItem.getElement(), eventForm.getElement());
      });
      render(this._container, eventItem, RenderPosition.BEFOREEND);
    });
  }
}
