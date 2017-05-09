connect-prop-types
----

Allow you to create stateless [React](https://facebook.github.io/react/) components with [propTypes](https://github.com/reactjs/prop-types) (and [defaultProps](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) & [contextTypes](https://facebook.github.io/react/docs/context.html)) without breaking the chain.

`connectPropTypes([propTypes], [defaultProps], [contextTypes]) : connector`

Usage
----

```shell
npm i connect-prop-types --S
```

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import connectPropTypes from 'connect-prop-types';

export default connectPropTypes({
  children: PropTypes.node.isRequired,
})(({ children }) => (<div>{children}</div>));
```

Prepare connector for reuse:

```jsx
/* reusable-prop-types.js */
export const textualChild = connectPropTypes({
  children: PropTypes.node.isRequired,
});
```

```jsx
/* H1.js */
import { textualChildPropTypes } from '../reusable-prop-types';
export default textualChildPropTypes(({ children }) => (<h1>{children}</h1>));
```

```jsx
/* H2.js */
import { textualChildPropTypes } from '../reusable-prop-types';
export default textualChildPropTypes(({ children }) => (<h2>{children}</h2>));
```

Mixin up prop-types:

```jsx
import { combineConnectors } from 'connect-prop-types';
import { textualChildPropTypes, classNamePropTypes } from '../reusable-prop-types';
export default combineConnectors(
  textualChildPropTypes,
  classNamePropTypes,
)(({ children, className }) => (<h1
  className={className}
>{children}</h1>));

```

🙆 Mutates!
----

Target component will be mutated. Keep this fact in your mind.

Why?
----

The code...

```jsx
export default connectPropTypes({
  children: PropTypes.node.isRequired,
})(({children}) => (<div>{children}</div>));
```

is more chainable than...
```jsx
const DivComponent = ({children}) => (<div>{children}</div>);
DivComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DivComponent;
```

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
