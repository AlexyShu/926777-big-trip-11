export default class Points {
  constructor() {
    this._events = [];

    this._dataChangeHandlers = [];
  }

  // метод для получения карточек
  getEvents() {
    return this._events;
  }

  // метод для заполнения карточек
  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  // метод для обновления одной карточки
  updateTask(id, event) {
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
}
