import {getPointsByFilter} from "../utils/filters.js";
import {FilterType} from "../const.js";

export default class Points {
  constructor() {
    this._points = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // метод для получения карточек
  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }
  // метод для получения карточек
  getPointsAll() {
    return this._points;
  }

  // метод для заполнения карточек
  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  // колбек который вызывается если карточка изменилась
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  // метод чтоб вызывать колбеки
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  // метод для обновления одной карточки
  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  // из массива удали
  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  // в массив добавь
  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }
}
