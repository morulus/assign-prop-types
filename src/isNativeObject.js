export default function isNativeObject(something) {
  if (typeof something !== 'object') {
    return false;
  }
  return something.constructor === Object;
}
