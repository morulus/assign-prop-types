exports.__esModule = true;
const isDevelopment = typeof process === 'object' && process.env && process.env.NODE_ENV !== 'production';
const ASSIGNER = Symbol('PROP_TYPES_ASSIGNER');

function isNativeObject(something) {
  if (typeof something !== 'object') {
    return false;
  }
  return something.constructor === Object;
}

function isFalsy(something) {
  return something === undefined || something === null || something === false;
}

function isComponentLike(something) {
  return typeof something === 'function';
}

function isAssigner(something) {
  if (typeof something !== 'function') {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(something, ASSIGNER)) {
    return false;
  }
  return true;
}

const expectedTypes = [
  'assigner',
  'propTypes',
  'defaultProps',
  'contextTypes'
];

function assignPropTypes() {
  const advanceAssigners = [];
  const pdc = [];
  const length = arguments.length;
  let expectedType = 0;
  for (let i = 0; i < length; i++) {
    if (expectedType === 0) {
      if (isAssigner(arguments[i])) {
        advanceAssigners.push(arguments[i]);
        continue;
      } else {
        expectedType = 1;
      }
    }
    // Check for expected type
    if (expectedType >= expectedTypes.length) {
      throw new TypeError('Superfluous argument');
    }
    if (!isFalsy(arguments[i])) {
      // Type restriction
      if (!isNativeObject(arguments[i])) {
        throw new TypeError('assignPropTypes can accept '+expectedTypes[expectedType]+' only of type object, '+(typeof arguments[i])+' passed');
      }
      // Check for non-empty object
      if (isDevelopment && Object.keys(arguments[i]).length === 0) {
        throw new TypeError('Useless empty '+expectedTypes[expectedType]);
      }
    }
    pdc.push(arguments[i]);
    expectedType++;
  }
  const originalAssigner = function originalAssigner(component) {
    if (!isComponentLike(component)) {
      throw new TypeError('Assigner called on non-component');
    }
    if (advanceAssigners.length > 0) {
      const length = advanceAssigners.length;
      for (let i = 0; i < length; i++) {
        component = advanceAssigners[i](component);
      }
    }
    if (pdc[0]) { // propTypes
      component.propTypes = Object.assign({}, component.propTypes || {}, pdc[0]);
    }
    if (pdc[1]) { // defaultProps
      component.defaultProps = Object.assign({}, component.defaultProps || {}, pdc[1]);
    }
    if (pdc[2]) { // contextTypes
      component.contextTypes = Object.assign({}, component.contextTypes || {}, pdc[2]);
    }
    return component;
  };
  originalAssigner[ASSIGNER] = true;

  const propTypesAssigner = function propTypesAssigner(component) {
    if (isNativeObject(component)) {
      // Extending
      const reassigner = assignPropTypes.apply(null, arguments);
      return assignPropTypes(
        originalAssigner,
        reassigner
      );
    } else {
      return originalAssigner(component);
    }
  }
  propTypesAssigner[ASSIGNER] = true;
  return propTypesAssigner;
}

exports.default = assignPropTypes;
const combineAssigners = exports.combineAssigners = function combineAssigners() {
  let pseudoComponent = function() {};
  const assigners = Array.prototype.slice.call(arguments);
  assigners.forEach((assigner) => {
    pseudoComponent = assigner(pseudoComponent);
  });
  return assignPropTypes(
    pseudoComponent.propTypes,
    pseudoComponent.defaultProps,
    pseudoComponent.contextTypes
  );
};
