export const createMenuTemplate = (menuPoints) => {
  return (`
  <nav class="trip-controls__trip-tabs trip-tabs">
  ${menuPoints.map(({name, isActive}) => {
      return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
    }).join(`\n`)}
  </nav>`
  );
};
