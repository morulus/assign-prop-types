exports.__esModule = true;
var isDevelopment = typeof process === 'object' && process.env && process.env.NODE_ENV !== 'production';
var ASSIGNER = typeof Symbol === 'function' ? Symbol('PROP_TYPES_ASSIGNER') : 'PROP_TYPES_ASSIGNER';

function markAssigner(assigner) {
  Object.defineProperty(assigner, ASSIGNER, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: true
  });
}

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

var expectedTypes = [
  'assigner',
  'propTypes',
  'defaultProps',
  'contextTypes'
];

function assignPropTypes() {
  var advanceAssigners = [];
  var pdc = [];
  var length = arguments.length;
  var expectedType = 0;
  for (var i = 0; i < length; i++) {
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
  var originalAssigner = function originalAssigner(component) {
    if (!isComponentLike(component)) {
      throw new TypeError('Assigner called on non-component');
    }
    if (advanceAssigners.length > 0) {
      var length = advanceAssigners.length;
      for (var i = 0; i < length; i++) {
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

  markAssigner(originalAssigner);

  var propTypesAssigner = function propTypesAssigner(component) {
    if (isNativeObject(component)) {
      // Extending
      var reassigner = assignPropTypes.apply(null, arguments);
      return assignPropTypes(
        originalAssigner,
        reassigner
      );
    } else {
      return originalAssigner(component);
    }
  };
  markAssigner(propTypesAssigner);
  return propTypesAssigner;
}

exports.default = assignPropTypes;
exports.combineAssigners = function combineAssigners() {
  var pseudoComponent = function() {};
  var assigners = Array.prototype.slice.call(arguments);
  assigners.forEach(function(assigner) {
    pseudoComponent = assigner(pseudoComponent);
  });
  return assignPropTypes(
    pseudoComponent.propTypes,
    pseudoComponent.defaultProps,
    pseudoComponent.contextTypes
  );
};
