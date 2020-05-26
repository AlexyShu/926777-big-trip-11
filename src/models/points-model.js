import {getPointsByFilter} from "../utils/filters.js";
import {FilterType} from "../const.js";

export default class Points {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // метод для получения карточек
  getPoints() {
    return getPointsByFilter(this._events, this._activeFilterType);
  }
  // метод для получения карточек
  getPointsAll() {
    return this._events;
  }

  // метод для заполнения карточек
  setPoints(events) {
    this._events = Array.from(events);
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
  updatePoint(id, event) {
    const index = this._events.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  // из массива удали
  removePoint(id) {
    const index = this._events.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  // в массив добавь
  addPoint(event) {
    this._events = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }
}
