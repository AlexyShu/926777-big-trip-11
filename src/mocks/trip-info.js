
import {getRandomArrayItem, getRandomIntegerNumber, getZeroFormat} from '../utils.js';

const months = [
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

export const month = getRandomArrayItem(months);
export const day = getRandomIntegerNumber(1, 31);

const randomYear = getRandomIntegerNumber(1, 9);

export const year = getZeroFormat(randomYear);
