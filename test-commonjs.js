'use strict';

const assignPropTypes = require('./lib/index.js');
const PropTypes = require('prop-types');

module.exports = assignPropTypes({
  mockProp: PropTypes.string,
})(function mockComponent() {
  return {};
});
