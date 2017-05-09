const PropTypes = require('prop-types');
const _connectPropTypes = require('./index.js');
const connectPropTypes = _connectPropTypes.default;
const combineConnectors = _connectPropTypes.combineConnectors;

const DEFAULT_NODE = Symbol('DEFAULT_NODE');
const DEFAULT_FUNC = Symbol('DEFAULT_FUNC');
const DEFAULT_A = Symbol('DEFAULT_A');
const DEFAULT_B = Symbol('DEFAULT_A');

describe('connectPropTypes', () => {
  it ('Clean target', () => {
    const pseudoComponent = function () {};
    const connector = connectPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultCompontent = connector(pseudoComponent);
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
    const connector = connectPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultCompontent = connector(pseudoComponent);
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
  it ('Combine connectors', () => {
    const pseudoComponent = function () {};
    const A = connectPropTypes({
      a: PropTypes.object,
    }, {
      a: DEFAULT_A,
    }, {
      a: PropTypes.func,
    });
    const B = connectPropTypes({
      b: PropTypes.number,
    }, {
      b: DEFAULT_B,
    }, {
      b: PropTypes.symbol,
    });
    combineConnectors(A, B)(pseudoComponent);
    expect(pseudoComponent.propTypes.a).toBe(PropTypes.object);
    expect(pseudoComponent.propTypes.b).toBe(PropTypes.number);
    expect(pseudoComponent.defaultProps.a).toBe(DEFAULT_A);
    expect(pseudoComponent.defaultProps.b).toBe(DEFAULT_B);
    expect(pseudoComponent.contextTypes.a).toBe(PropTypes.func);
    expect(pseudoComponent.contextTypes.b).toBe(PropTypes.symbol);
  });
});
