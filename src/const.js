export const HIDDEN_CLASS = `visually-hidden`;

export const KeyCode = {
  ESC: 27
};

export const TripTypes = {
  TRANSFER: [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`],
  ACTIVITY: [`check-in`, `restaurant`, `sightseeing`]
};

export const Months = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`
};

export const EmptyPoint = {
  id: 0,
  eventType: `flight`,
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  offers: [],
  startEventTime: new Date(),
  endEventTime: new Date(),
  price: 0,
  isFavorite: false
};

