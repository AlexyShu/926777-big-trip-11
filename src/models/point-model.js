import moment from 'moment';

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.eventType = data[`type`];
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.startEventTime = moment(data[`date_from`]);
    this.endEventTime = moment(data[`date_to`]);
    this.offers = data[`offers`] || [];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.eventType,
      "destination": this.destination,
      "base_price": this.price,
      "date_from": this.startEventTime.toJSON(),
      "date_to": this.endEventTime.toJSON(),
      "offers": this.offers,
      "is_favorite": this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}

