export const HIDDEN_CLASS = `visually-hidden`;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const AUTHORIZATION = `Basic kukurukublablabla`;

export const VALIDATION = `Please select a valid value from list.`;

export const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

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
  `Dec`
];

export const KeyCode = {
  ESC: 27
};

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
  startEventTime: Date.now(),
  endEventTime: Date.now(),
  price: 0,
  isFavorite: false
};

export const DefaultButtonsText = {
  deleteButtonText: `Delete`,
  canselButtonText: `Cancel`,
  saveButtonText: `Save`
};

export const ConnectingButtonsText = {
  deleteButtonText: `Deleting...`,
  saveButtonText: `Saving...`
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const TitleName = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME SPENT`
};

export const LabelPrefix = {
  EURO: `€`,
  TIMES: `x`,
  HOURS: `h`
};


