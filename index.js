exports.__esModule = true;
function assignPropTypes(propTypes, defaultProps, contextTypes) {
  return function propTypesAssigner(component) {
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
}

exports.default = assignPropTypes;

var combineAssigners = exports.combineAssigners = function combineAssigners() {
  let pseudoComponent = {};
  var assignors = Array.prototype.slice.call(arguments);
  assignors.forEach((assignor) => {
    pseudoComponent = assignor(pseudoComponent);
  });
  return assignPropTypes(
    pseudoComponent.propTypes,
    pseudoComponent.defaultProps,
    pseudoComponent.contextTypes
  );
};
