import {getRandomArrayItem, getRandomIntegerNumber} from '../utils.js';

export const types = [
  {
    name: `taxi`,
    course: `to`
  },
  {
    name: `train`,
    course: `to`

  },
  {
    name: `bus`,
    course: `to`
  },
  {
    name: `ship`,
    course: `to`
  },
  {
    name: `transport`,
    course: `to`
  },
  {
    name: `drive`,
    course: `to`
  },
  {
    name: `flight`,
    course: `to`
  },
  {
    name: `check-in`,
    course: `in hotel in`
  },
  {
    name: `sightseeing`,
    course: `in`
  },
  {
    name: `restaurant`,
    course: `in`
  }
];

export const offers = [
  {
    type: `flight`,
    offerName: `Add luggage`,
    offerPrice: 10,
    isChecked: true
  },
  {
    type: `flight`,
    offerName: `Switch to comfort class`,
    offerPrice: 150,
    isChecked: true
  },
  {
    type: `flight`,
    offerName: `Add meal`,
    offerPrice: 2,
    isChecked: true
  },
  {
    type: `flight`,
    offerName: `Choose seats`,
    offerPrice: 9,
    isChecked: true
  },
  {
    type: `taxi`,
    offerName: `Switch to comfort class`,
    offerPrice: 150,
    isChecked: true
  },
  {
    type: `train`,
    offerName: `Add meal`,
    offerPrice: 2,
    isChecked: true
  },
  {
    type: `bus`,
    offerName: `Choose seats`,
    offerPrice: 9,
    isChecked: true
  },
  {
    type: `taxi`,
    offerName: `Order Uber`,
    price: 30,
    isChecked: true
  },
  {
    type: `sightseeing`,
    offerName: `Book tickets`,
    price: 40,
    isChecked: true
  }
];

export const towns = [`Amsterdam`, `Geneva`, `Chamonix`];

const COUNT_PICTURE = 5;

const pictures = new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const MAX_PRICE = 500;

const getRandomDate = () => {
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomIntegerNumber(0, 60) * 60 * 1000;
};

const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  return {
    type: getRandomArrayItem(types),
    town: getRandomArrayItem(towns),
    description: getRandomArrayItem(descriptions),
    pictures,
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomIntegerNumber(0, MAX_PRICE)
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

const EVENTS_COUNT = 15;

export const cards = generateEvents(EVENTS_COUNT);

export const createOffers = (eventType) => {
  const eventOffers = [];
  const element = offers.find((it) => it.type === eventType);
  if (element) {
    eventOffers.push(element);
  }
  return eventOffers;
};
