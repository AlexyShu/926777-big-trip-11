import AbstractComponent from "./abstract-component.js";

const createSortItemTemplate = (sort) => {
  const {name, title} = sort;
  return (`<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}">
  <label class="trip-sort__btn" for="sort-${name}">
    ${title}
    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
     </svg>
   </label>
 </div>`
  );
};

const createEventSortTemplate = (sorts) => {
  const sortsTemplate = sorts.map((it, i) => createSortItemTemplate(it, i === 0)).join(`\n`);
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
       <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    ${sortsTemplate}
     <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`);
};

export default class EventSortComponent extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }
  getTemplate() {
    return createEventSortTemplate(this._menuItems);
  }
}

