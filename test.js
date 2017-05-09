const PropTypes = require('prop-types');
const _assignPropTypes = require('./index.js');
const assignPropTypes = _assignPropTypes.default;
const combineAssigners = _assignPropTypes.combineAssigners;

const DEFAULT_NODE = Symbol('DEFAULT_NODE');
const DEFAULT_FUNC = Symbol('DEFAULT_FUNC');
const DEFAULT_A = Symbol('DEFAULT_A');
const DEFAULT_B = Symbol('DEFAULT_A');

describe('assignPropTypes', () => {
  it ('Clean target', () => {
    const pseudoComponent = function () {};
    const assignor = assignPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultCompontent = assignor(pseudoComponent);
    expect(resultCompontent).toBe(pseudoComponent);
    expect(resultCompontent.propTypes.node).toBe(PropTypes.node);
    expect(resultCompontent.propTypes.func).toBe(PropTypes.func);
    expect(resultCompontent.defaultProps.node).toBe(DEFAULT_NODE);
    expect(resultCompontent.defaultProps.func).toBe(DEFAULT_FUNC);
    expect(resultCompontent.contextTypes.store).toBe(PropTypes.object);
  });

  it ('Filled target', () => {
    const pseudoComponent = function () {};
    pseudoComponent.propTypes = {
      ownProp: PropTypes.bool,
    };
    pseudoComponent.defaultProps = {
      ownProp: true,
    };
    pseudoComponent.contextTypes = {
      ownContext: PropTypes.string,
    };
    const assignor = assignPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultCompontent = assignor(pseudoComponent);
    expect(resultCompontent).toBe(pseudoComponent);
    expect(resultCompontent.propTypes.node).toBe(PropTypes.node);
    expect(resultCompontent.propTypes.func).toBe(PropTypes.func);
    expect(resultCompontent.propTypes.ownProp).toBe(PropTypes.bool);
    expect(resultCompontent.defaultProps.node).toBe(DEFAULT_NODE);
    expect(resultCompontent.defaultProps.func).toBe(DEFAULT_FUNC);
    expect(resultCompontent.defaultProps.ownProp).toEqual(true);
    expect(resultCompontent.contextTypes.store).toBe(PropTypes.object);
    expect(resultCompontent.contextTypes.ownContext).toBe(PropTypes.string);
  });
  it ('Combine assigners', () => {
    const pseudoComponent = function () {};
    const A = assignPropTypes({
      a: PropTypes.object,
    }, {
      a: DEFAULT_A,
    }, {
      a: PropTypes.func,
    });
    const B = assignPropTypes({
      b: PropTypes.number,
    }, {
      b: DEFAULT_B,
    }, {
      b: PropTypes.symbol,
    });
    combineAssigners(A, B)(pseudoComponent);
    expect(pseudoComponent.propTypes.a).toBe(PropTypes.object);
    expect(pseudoComponent.propTypes.b).toBe(PropTypes.number);
    expect(pseudoComponent.defaultProps.a).toBe(DEFAULT_A);
    expect(pseudoComponent.defaultProps.b).toBe(DEFAULT_B);
    expect(pseudoComponent.contextTypes.a).toBe(PropTypes.func);
    expect(pseudoComponent.contextTypes.b).toBe(PropTypes.symbol);
  });
});
