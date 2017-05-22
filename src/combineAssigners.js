import assignPropTypes from './assignPropTypes';

export default function combineAssigners() {
  let pseudoComponent = function() {};
  const assigners = Array.prototype.slice.call(arguments);
  assigners.forEach(function(assigner) {
    pseudoComponent = assigner(pseudoComponent);
  });
  return assignPropTypes(
    pseudoComponent.propTypes,
    pseudoComponent.defaultProps,
    pseudoComponent.contextTypes
  );
}
