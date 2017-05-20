const PropTypes = require('prop-types');
const _assignPropTypes = require('./index.js');
const assignPropTypes = _assignPropTypes.default;
const combineAssigners = _assignPropTypes.combineAssigners;

const DEFAULT_NODE = Symbol('DEFAULT_NODE');
const DEFAULT_FUNC = Symbol('DEFAULT_FUNC');
const DEFAULT_A = Symbol('DEFAULT_A');
const DEFAULT_B = Symbol('DEFAULT_A');
const DEFAULT_STRING = 'DEFAULT_STRING';

describe('assignPropTypes', () => {
  it ('Clean target', () => {
    const pseudoComponent = function () {};
    const assigner = assignPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultComponent = assigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.node).toBe(PropTypes.node);
    expect(resultComponent.propTypes.func).toBe(PropTypes.func);
    expect(resultComponent.defaultProps.node).toBe(DEFAULT_NODE);
    expect(resultComponent.defaultProps.func).toBe(DEFAULT_FUNC);
    expect(resultComponent.contextTypes.store).toBe(PropTypes.object);
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
    const assigner = assignPropTypes({
      node: PropTypes.node,
      func: PropTypes.func,
    }, {
      node: DEFAULT_NODE,
      func: DEFAULT_FUNC,
    }, {
      store: PropTypes.object,
    });
    const resultComponent = assigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.node).toBe(PropTypes.node);
    expect(resultComponent.propTypes.func).toBe(PropTypes.func);
    expect(resultComponent.propTypes.ownProp).toBe(PropTypes.bool);
    expect(resultComponent.defaultProps.node).toBe(DEFAULT_NODE);
    expect(resultComponent.defaultProps.func).toBe(DEFAULT_FUNC);
    expect(resultComponent.defaultProps.ownProp).toEqual(true);
    expect(resultComponent.contextTypes.store).toBe(PropTypes.object);
    expect(resultComponent.contextTypes.ownContext).toBe(PropTypes.string);
  });
  it ('Extension', () => {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
      prop2: PropTypes.func,
    }, {
      prop1: DEFAULT_NODE,
      prop2: DEFAULT_FUNC,
    }, {
      prop1: PropTypes.object,
      prop2: PropTypes.bool,
    });
    const reassigner = assigner({
      prop3: PropTypes.string,
    }, {
      prop3: DEFAULT_STRING,
    }, {
      prop3: PropTypes.number,
    });
    const pseudoComponent = function () {};
    const resultComponent = reassigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.prop1).toBe(PropTypes.node);
    expect(resultComponent.propTypes.prop2).toBe(PropTypes.func);
    expect(resultComponent.propTypes.prop3).toBe(PropTypes.string);
    expect(resultComponent.defaultProps.prop1).toBe(DEFAULT_NODE);
    expect(resultComponent.defaultProps.prop2).toBe(DEFAULT_FUNC);
    expect(resultComponent.defaultProps.prop3).toBe(DEFAULT_STRING);
    expect(resultComponent.contextTypes.prop1).toBe(PropTypes.object);
    expect(resultComponent.contextTypes.prop2).toBe(PropTypes.bool);
    expect(resultComponent.contextTypes.prop3).toBe(PropTypes.number);
  });
  it ('Extends', () => {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, {
      prop1: DEFAULT_NODE,
    }, {
      prop1: PropTypes.object,
    });
    const assigner2 = assignPropTypes({
      prop2: PropTypes.func,
    }, {
      prop2: DEFAULT_FUNC,
    }, {
      prop2: PropTypes.bool,
    });
    const combinedAssigner = assignPropTypes(
      assigner,
      assigner2,
      {
        prop3: PropTypes.string,
      }, {
        prop3: DEFAULT_STRING,
      }, {
        prop3: PropTypes.number,
      }
    );
    const pseudoComponent = function () {};
    const resultComponent = combinedAssigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.prop1).toBe(PropTypes.node);
    expect(resultComponent.propTypes.prop2).toBe(PropTypes.func);
    expect(resultComponent.propTypes.prop3).toBe(PropTypes.string);
    expect(resultComponent.defaultProps.prop1).toBe(DEFAULT_NODE);
    expect(resultComponent.defaultProps.prop2).toBe(DEFAULT_FUNC);
    expect(resultComponent.defaultProps.prop3).toBe(DEFAULT_STRING);
    expect(resultComponent.contextTypes.prop1).toBe(PropTypes.object);
    expect(resultComponent.contextTypes.prop2).toBe(PropTypes.bool);
    expect(resultComponent.contextTypes.prop3).toBe(PropTypes.number);
  });
  it ('Extends with overriding', () => {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, {
      prop1: DEFAULT_NODE,
    }, {
      prop1: PropTypes.object,
    });
    const assigner2 = assignPropTypes({
      prop1: PropTypes.func,
    }, {
      prop1: DEFAULT_FUNC,
    }, {
      prop1: PropTypes.bool,
    });
    const combinedAssigner = assignPropTypes(
      assigner,
      assigner2,
      {
        prop1: PropTypes.string,
      }, {
        prop1: DEFAULT_STRING,
      }, {
        prop1: PropTypes.number,
      }
    );
    const pseudoComponent = function () {};
    const resultComponent = combinedAssigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.prop1).toBe(PropTypes.string);
    expect(resultComponent.defaultProps.prop1).toBe(DEFAULT_STRING);
    expect(resultComponent.contextTypes.prop1).toBe(PropTypes.number);
  });
  it ('Extends with overriding native', () => {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, {
      prop1: DEFAULT_NODE,
    }, {
      prop1: PropTypes.object,
    });
    const assigner2 = assignPropTypes({
      prop1: PropTypes.func,
    }, {
      prop1: DEFAULT_FUNC,
    }, {
      prop1: PropTypes.bool,
    });
    const combinedAssigner = assignPropTypes(
      assigner,
      assigner2,
      {
        prop1: PropTypes.string,
      }, {
        prop1: DEFAULT_STRING,
      }, {
        prop1: PropTypes.number,
      }
    );
    const pseudoComponent = function () {};
    pseudoComponent.propTypes = {
      prop1: PropTypes.symbol,
      prop2: PropTypes.number,
    };
    pseudoComponent.defaultProps = {
      prop1: DEFAULT_A,
      prop2: DEFAULT_B,
    };
    pseudoComponent.contextTypes = {
      prop1: PropTypes.bool,
      prop2: PropTypes.array,
    };
    const resultComponent = combinedAssigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.propTypes.prop1).toBe(PropTypes.string);
    expect(resultComponent.defaultProps.prop1).toBe(DEFAULT_STRING);
    expect(resultComponent.contextTypes.prop1).toBe(PropTypes.number);
    expect(resultComponent.propTypes.prop2).toBe(PropTypes.number);
    expect(resultComponent.defaultProps.prop2).toBe(DEFAULT_B);
    expect(resultComponent.contextTypes.prop2).toBe(PropTypes.array);
  });
  function superfluousArgument() {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, {
      prop1: DEFAULT_NODE,
    }, {
      prop1: PropTypes.object,
    }, {
      prop1: PropTypes.number, // Wha??
    });
  }
  it ('Superfluous argument', () => {
    expect(superfluousArgument).toThrowError('Superfluous argument');
  });

  function invalidTypePropTypes() {
    const assigner = assignPropTypes(true, {
      prop1: DEFAULT_NODE,
    }, {
      prop1: PropTypes.number,
    });
  }

  function invalidTypeDefaultProps() {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, [], {
      prop1: PropTypes.number,
    });
  }

  function invalidTypeContextTypes() {
    const assigner = assignPropTypes({
      prop1: PropTypes.node,
    }, {
      prop1: DEFAULT_NODE,
    }, function() {});
  }

  function quasiInvalidType() {
    const assigner = assignPropTypes(null, null, {
      prop1: PropTypes.number,
    });
  }

  function emptyPropTypes() {
    const assigner = assignPropTypes({});
  }

  function emptyDefaultProps() {
    const assigner = assignPropTypes(null, {});
  }

  function emptyContextTypes() {
    const assigner = assignPropTypes(null, null, {});
  }

  it ('Type restriction > propTypes', () => {
    expect(invalidTypePropTypes).toThrowError('assignPropTypes can accept propTypes only of type object, boolean passed');
  });
  it ('Type restriction > defaultProps', () => {
    expect(invalidTypeDefaultProps).toThrowError('assignPropTypes can accept defaultProps only of type object, object passed');
  });
  it ('Type restriction > contextTypes', () => {
    expect(invalidTypeContextTypes).toThrowError('assignPropTypes can accept contextTypes only of type object, function passed');
  });
  it ('Type restriction > falsy', () => {
    expect(quasiInvalidType).not.toThrowError();
  });
  it ('Useless propTypes', () => {
    expect(emptyPropTypes).toThrowError('Useless empty propTypes');
  });
  it ('Useless defaultProps', () => {
    expect(emptyDefaultProps).toThrowError('Useless empty defaultProps');
  });
  it ('Useless contextTypes', () => {
    expect(emptyContextTypes).toThrowError('Useless empty contextTypes');
  });
  it ('Skip few', () => {
    const pseudoComponent = function () {};
    const assigner = assignPropTypes(false, undefined, {
      store: PropTypes.object,
    });
    const resultComponent = assigner(pseudoComponent);
    expect(resultComponent).toBe(pseudoComponent);
    expect(resultComponent.contextTypes.store).toBe(PropTypes.object);
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
