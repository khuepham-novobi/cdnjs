import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from '../styles/experimentalStyled';
/**
 * @ignore - do not document.
 */

var Box = /*#__PURE__*/React.forwardRef(function Box(props, ref) {
  var children = props.children,
      clone = props.clone,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      sx = props.sx,
      other = _objectWithoutProperties(props, ["children", "clone", "className", "component", "sx"]);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, other));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className: className
    }, other));
  }

  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: className
  }, other), children);
});
process.env.NODE_ENV !== "production" ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  clone: PropTypes.bool,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * @ignore
   */
  sx: PropTypes.object
} : void 0;
export default styled(Box, {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})(_templateObject());