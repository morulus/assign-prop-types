"use strict";

exports.__esModule = true;
function connectPropTypes(propTypes, defaultProps, contextTypes) {
  return function propTypesConnector(component) {
    if (propTypes) {
      component.propTypes = Object.assign({}, component.propTypes || {}, propTypes);
    }
    if (defaultProps) {
      component.defaultProps = Object.assign({}, component.defaultProps || {}, defaultProps);
    }
    if (contextTypes) {
      component.contextTypes = Object.assign({}, component.contextTypes || {}, contextTypes);
    }
    return component;
  };
};

exports.default = connectPropTypes;

var combineConnectors = exports.combineConnectors = function combineConnectors() {
  let pseudoComponent = {};
  const connectors = Array.prototype.slice.call(arguments);
  connectors.forEach(function(connector) {
    pseudoComponent = connector(pseudoComponent);
  });
  return connectPropTypes(
    pseudoComponent.propTypes,
    pseudoComponent.defaultProps,
    pseudoComponent.contextTypes,
  );
}
