import {getRandomArrayItem, getRandomIntegerNumber} from '../utils.js';

export const types = [
  {
    icon: `taxi`,
    name: `taxi to`
  },
  {
    icon: `train`,
    name: `train to`

  },
  {
    icon: `bus`,
    name: `bus to`
  },
  {
    icon: `ship`,
    name: `ship to`
  },
  {
    icon: `transport`,
    name: `transport to`
  },
  {
    icon: `drive`,
    name: `drive to`
  },
  {
    icon: `flight`,
    name: `flight to`
  },
  {
    icon: `check-in`,
    name: `check-in in hotel in`
  },
  {
    icon: `sightseeing`,
    name: `sightseeing in`
  },
  {
    icon: `restaurant`,
    name: `restaurant in`
  }
];

export const offers = [
  {
    type: `flight`,
    name: `Add luggage`,
    price: 10,
    checked: true
  },
  {
    type: `flight`,
    name: `Switch to comfort class`,
    price: 150,
    checked: true
  },
  {
    type: `flight`,
    name: `Add meal`,
    price: 2,
    checked: true
  },
  {
    type: `flight`,
    name: `Choose seats`,
    price: 9,
    checked: true
  },
  {
    type: `taxi`,
    name: `Switch to comfort class`,
    price: 150,
    checked: true
  },
  {
    type: `train`,
    name: `Add meal`,
    price: 2,
    checked: true
  },
  {
    type: `bus`,
    name: `Choose seats`,
    price: 9,
    checked: true
  },
  {
    type: `taxi`,
    name: `Order Uber`,
    price: 30,
    checked: true
  },
  {
    type: `sightseeing`,
    name: `Book tickets`,
    price: 40,
    checked: true
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

// const startDate = getRandomDate();
// const endDate = getRandomDate();
const MAX_PRICE = 500;

const generateCard = () => {
  return {
    type: getRandomArrayItem(types),
    town: getRandomArrayItem(towns),
    description: getRandomArrayItem(descriptions),
    pictures,
    // startDate: Math.min(startDate, endDate),
    // endDate: Math.max(startDate, endDate),
    price: getRandomIntegerNumber(0, MAX_PRICE)
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

const CARDS_COUNT = 15;

export const cards = generateCards(CARDS_COUNT);
