"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styleFunction = _interopRequireDefault(require("./styleFunction"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

function omit(input, fields) {
  const output = {};
  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}
/**
 * @ignore - do not document.
 */


const Box = /*#__PURE__*/React.forwardRef(function Box(props, ref) {
  const {
    children,
    clone,
    className,
    component: Component = 'div'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "clone", "className", "component"]);
  const spread = omit(other, _styleFunction.default.filterProps);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, (0, _extends2.default)({
      className: (0, _clsx.default)(children.props.className, className)
    }, spread));
  }

  if (typeof children === 'function') {
    return children((0, _extends2.default)({
      className
    }, spread));
  }

  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: className
  }, spread), children);
});
process.env.NODE_ENV !== "production" ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.node, _propTypes.default.func]),

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  clone: _propTypes.default.bool,

  /**
   * @ignore
   */
  component: _propTypes.default.elementType,

  /**
   * @ignore
   */
  sx: _propTypes.default.object
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line react/forbid-foreign-prop-types -- this branch is DCE'd as well in production.
  Box.propTypes.deprecatedSystemProps = props => {
    const unsupportedProps = Object.keys(props).filter(prop => ['children', 'className', 'clone', 'component'].indexOf(prop) === -1);

    if (unsupportedProps.length > 0) {
      return new Error([`The following props are deprecated: ${unsupportedProps.map(prop => `\`${prop}\``).join(', ')}.`, `You should move the properties inside the \`sx\` prop, for example:`, '', `<Box m={2} /> should become <Box sx={{ m: 2 }} />`, '', 'You can automate the migration with this codemod: https://github.com/mui-org/material-ui/blob/HEAD/packages/material-ui-codemod/README.md#box-sx-prop'].join('\n'));
    }

    return null;
  };
}

var _default = (0, _experimentalStyled.default)(Box, {}, {
  muiName: 'MuiBox'
})(_styleFunction.default);

exports.default = _default;