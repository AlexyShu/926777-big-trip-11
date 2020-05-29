import TripInfo from "../components/trip-info.js";
import {render, RenderPosition} from "../utils/render.js";

export default class InfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
  }

  render() {
    const cards = this._pointsModel.getPoints();
    const tripInfoComponent = new TripInfo(cards);
    if (cards.length !== 0) {
      render(this._container, tripInfoComponent, RenderPosition.BEFOREBEGIN);
      const tripTotalPrice = document.querySelector(`.trip-info__cost-value`);
      tripTotalPrice.textContent = cards.reduce((totalPrice, it) => {
        return totalPrice + parseInt(it.price, 10) + it.offers.reduce((totalOfferPrice, offer) => {
          return totalOfferPrice + parseInt(offer.price, 10);
        }, 0);
      }, 0);
    }
  }
}
