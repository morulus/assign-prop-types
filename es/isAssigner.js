import { ASSIGNER } from './constants';

export default function isAssigner(something) {
  if (typeof something !== 'function') {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(something, ASSIGNER)) {
    return false;
  }
  return true;
}
