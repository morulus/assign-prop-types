assign-prop-types
----

Allows you to create stateless [React](https://facebook.github.io/react/) components with assigned [propTypes](https://github.com/reactjs/prop-types) (and [defaultProps](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) & [contextTypes](https://facebook.github.io/react/docs/context.html)) without breaking the chain.

```js
export default assignPropTypes(
  // propTypes
  {
    selector: PropTypes.func,
  },
  // defaultProps
  {
    selector: () => 'No selector passed'
  },
  // contextTypes
  {
    store: PropTypes.object
  }
)(({ selector }, { store }) => (
  <div>{selector(store.getState())}</div>
));
```

Install
----

Yarn:
```shell
yarn add assign-prop-types
```

Npm:
```shell
npm install assign-prop-types --S
```

Import
----

```js
import assignPropTypes from 'assign-prop-types';
```

In most cases, you will also need to import packages [react](https://www.npmjs.com/package/react) and [prop-types](https://www.npmjs.com/package/prop-types) (or `React.PropTypes` for [React < v15.5](https://facebook.github.io/react/warnings/dont-call-proptypes.html)).

```js
import React from 'react';
import PropTypes from 'prop-types';
import assignPropTypes from 'assign-prop-types';
```

Usage
----

The function assignPropTypes accepts optional parameters [`propTypes`], [`defaultProp`], [`contextTypes`] and returns function, called assigner, which, in turn, accepts React component and returns component, mutaded with passed properties.

```js
export default assignPropTypes({
  children: PropTypes.node.isRequired,
})(({ children }) => (<div>{children}</div>));
```

Identical to:

```js
const Component = ({ children }) => (<div>{children}</div>);
Component.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Component;
```

Reusable assigner
----

Assigners can be prepared in advance:

```js
const assignUsualTypes = assignPropTypes({
  children: PropTypes.node,
}, {
  children: "No children specified"
});
```
And applied later multiple times:

```js
export const H1 = assignUsualTypes(({ children }) => (<h1>{children}</h1>));
export const H2 = assignUsualTypes(({ children }) => (<h2>{children}</h2>));
```

Extending
----

Assigners can be extended. To extend assigner, just call it with advanced configuration:

```js
const usualPropTypes = assignPropTypes({
  children: PropTypes.node.isRequired,
});
export default usualPropTypes({
  title: PropTypes.string,
})(YourComponent);

// propTypes will be { children, title }
```

Or by passing another assigner(s) to combine them:

```js
import assignerA from './assignerA';
import assignerB from './assignerB';
import assignerC from './assignerC';

export default assignPropTypes(
  assignerA,
  assignerB,
  assignerC
)(YourComponent);
```

👾 Mutates!
----

Target component will be mutated. Keep this fact in your mind.

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
