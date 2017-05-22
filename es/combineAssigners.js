import assignPropTypes from './assignPropTypes';

export default function combineAssigners() {
  var pseudoComponent = function pseudoComponent() {};
  var assigners = Array.prototype.slice.call(arguments);
  assigners.forEach(function (assigner) {
    pseudoComponent = assigner(pseudoComponent);
  });
  return assignPropTypes(pseudoComponent.propTypes, pseudoComponent.defaultProps, pseudoComponent.contextTypes);
}