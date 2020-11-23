import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styleFunction from './styleFunction';
import styled from '../styles/experimentalStyled';

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
        other = _objectWithoutPropertiesLoose(props, ["children", "clone", "className", "component"]);

  const spread = omit(other, styleFunction.filterProps);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      className: clsx(children.props.className, className)
    }, spread));
  }

  if (typeof children === 'function') {
    return children(_extends({
      className
    }, spread));
  }

  return /*#__PURE__*/React.createElement(Component, _extends({
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
   * @ignore
   */
  component: PropTypes.elementType,

  /**
   * @ignore
   */
  sx: PropTypes.object
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

export default styled(Box, {}, {
  muiName: 'MuiBox'
})(styleFunction);