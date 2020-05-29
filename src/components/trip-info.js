import AbstractComponent from "./abstract-component.js";
import {Months} from "../const.js";

export default class TripInfo extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    const startRouteDate = new Date(this._cards[0].startEventTime);
    const endRouteDate = new Date(this._cards[this._cards.length - 1].startEventTime);
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
        <h1 class="trip-info__title">${this._cards[0].destination.name} &mdash; ... &mdash; ${this._cards[this._cards.length - 1].destination.name}</h1>
        <p class="trip-info__dates">${startRouteDate.getDate()}&nbsp;${Months[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;${endRouteDate.getDate()}&nbsp;${Months[endRouteDate.getMonth()]}</p>
      </div>
      <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    </section>`;
  }
}
