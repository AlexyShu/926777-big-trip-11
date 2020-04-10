export const createMenuTemplate = (items) => {
  return (`
  <nav class="trip-controls__trip-tabs trip-tabs">
  ${items.map(({name, isActive}) => {
      return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
    }).join(`\n`)}
  </nav>`
  );
};
