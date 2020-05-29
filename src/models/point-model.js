import moment from "moment";

export default class PointModel {
  constructor(data) {
    this.id = data[`id`];
    this.eventType = data[`type`];
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.startEventTime = moment(data[`date_from`]).valueOf();
    this.endEventTime = moment(data[`date_to`]).valueOf();
    this.offers = data[`offers`] || [];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.eventType,
      "destination": this.destination,
      "base_price": this.price,
      "date_from": moment(this.startEventTime).toISOString(),
      "date_to": moment(this.endEventTime).toISOString(),
      "offers": this.offers,
      "is_favorite": this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new PointModel(data);
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }

  static clone(data) {
    return new PointModel(data.toRAW());
  }
}

