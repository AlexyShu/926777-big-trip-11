import moment from 'moment';

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.city = data[`city`];
    this.description = data[`description`];
    this.pictures = data[`pictures`];
    this.startDate = moment(data[`date_from`]).valueOf();
    this.endDate = moment(data[`date_to`]).valueOf();
    this.offers = data[`offers`] || [];
    this.price = data[`base_price`];
    this.course = data[`course`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}

