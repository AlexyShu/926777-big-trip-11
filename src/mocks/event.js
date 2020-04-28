import {getRandomArrayItem, getRandomIntegerNumber} from '../utils/common.js';

const COUNT_PICTURE = 5;

export const types = {
  TRANSFER: [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`, `trip`],
  ACTIVITY: [`check-in`, `restaurant`, `sightseeing`]
};

const offersGroupedInTypes = {
  'taxi': [`Switch to comfort class`, `Order Uber`],
  'train': [`Switch to comfort class`, `Add meal`, `Choose seats`],
  'bus': [`Choose seats`],
  'ship': [`Add luggage`, `Switch to comfort class`],
  'transport': [`Choose seats`],
  'drive': [],
  'flight': [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  'check-in': [],
  'restaurant': [`Order Uber`],
  'sightseeing': [`Book tickets`]
};

export const chooseOfferCourse = (eventType) => {
  let offerCourse;
  if (eventType === `check-in`) {
    offerCourse = `in hotel in`;
  } else {
    if (eventType === `restaurant` || eventType === `sightseeing`) {
      offerCourse = `in`;
    } else {
      offerCourse = `to`;
    }
  }
  return offerCourse;
};

export const cities = [`Amsterdam`, `Geneva`, `Chamonix`];

const generatePictures = () => `http://picsum.photos/300/150?r=${Math.random()}`;

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
  const type = getRandomArrayItem(Math.random() > 0.5 ? types.TRANSFER : types.ACTIVITY);
  return {
    type,
    city: getRandomArrayItem(cities),
    description: getRandomArrayItem(descriptions),
    pictures: Array(COUNT_PICTURE).fill(``).map(generatePictures),
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    offers: createOffers(type),
    price: getRandomIntegerNumber(0, MAX_PRICE),
    course: chooseOfferCourse(type),
    isFavorite: Math.random() > 0.5
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent)
    .sort((a, b) => a.startDate - b.startDate);
};

export const createOffers = (eventType) => {
  const offers = [];
  const offersCount = getRandomIntegerNumber(0, 5);
  if (offersGroupedInTypes[eventType].length !== 0) {
    for (let i = 0; i < offersCount; i++) {
      offers.push({
        type: eventType,
        price: getRandomIntegerNumber(0, 300),
        isChecked: true,
        name: getRandomArrayItem(offersGroupedInTypes[eventType])
      });
    }
  }
  return offers;
};


