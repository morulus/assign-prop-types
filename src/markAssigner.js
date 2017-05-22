import { ASSIGNER } from './constants';

export default function markAssigner(assigner) {
  Object.defineProperty(assigner, ASSIGNER, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: true
  });
}
