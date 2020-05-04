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
  getEvents() {
    return getPointsByFilter(this._events, this._activeFilterType);
  }
  // метод для получения карточек
  getEventsAll() {
    return this._events;
  }

  // метод для заполнения карточек
  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  // метод для обновления одной карточки
  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }
    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
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
}
