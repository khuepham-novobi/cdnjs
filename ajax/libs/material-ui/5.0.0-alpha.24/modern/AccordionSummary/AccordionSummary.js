import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import AccordionContext from '../Accordion/AccordionContext';
import accordionSummaryClasses, { getAccordionSummaryUtilityClass } from './accordionSummaryClasses';

const overridesResolver = (props, styles) => {
  return deepmerge(styles.root || {}, {
    [`& .${accordionSummaryClasses.content}`]: styles.content,
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: styles.expandIconWrapper
  });
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    expanded,
    disabled,
    disableGutters
  } = styleProps;
  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded']
  };
  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};

const AccordionSummaryRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiAccordionSummary',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return _extends({
    /* Styles applied to the root element. */
    display: 'flex',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition),

    /* Styles applied to the ButtonBase root element if the button is keyboard focused. */
    [`&.${accordionSummaryClasses.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus
    },

    /* Styles applied to the root element if `disabled={true}`. */
    [`&.${accordionSummaryClasses.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity
    },
    [`&:hover:not(.${accordionSummaryClasses.disabled})`]: {
      cursor: 'pointer'
    }
  }, !styleProps.disableGutters && {
    [`&.${accordionSummaryClasses.expanded}`]: {
      minHeight: 64
    }
  });
});
const AccordionSummaryContent = experimentalStyled('div', {}, {
  name: 'MuiAccordionSummary',
  slot: 'Content'
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the children wrapper element. */
  display: 'flex',
  flexGrow: 1,
  margin: '12px 0'
}, !styleProps.disableGutters && {
  transition: theme.transitions.create(['margin'], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${accordionSummaryClasses.expanded}`]: {
    margin: '20px 0'
  }
}));
const AccordionSummaryExpandIconWrapper = experimentalStyled('div', {}, {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper'
})(({
  theme
}) => ({
  /* Styles applied to the `expandIcon`'s wrapper element. */
  display: 'flex',
  color: theme.palette.action.active,
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),

  /* Styles applied to the `expandIcon`'s wrapper element if `expanded={true}`. */
  [`&.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)'
  }
}));
const AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAccordionSummary'
  });

  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "expandIcon", "focusVisibleClassName", "onClick"]);

  const {
    disabled = false,
    disableGutters,
    expanded,
    toggle
  } = React.useContext(AccordionContext);

  const handleChange = event => {
    if (toggle) {
      toggle(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const styleProps = _extends({}, props, {
    expanded,
    disabled,
    disableGutters
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(AccordionSummaryRoot, _extends({
    focusRipple: false,
    disableRipple: true,
    disabled: disabled,
    component: "div",
    "aria-expanded": expanded,
    className: clsx(classes.root, className),
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    onClick: handleChange,
    ref: ref,
    styleProps: styleProps
  }, other), /*#__PURE__*/React.createElement(AccordionSummaryContent, {
    className: classes.content,
    styleProps: styleProps
  }, children), expandIcon && /*#__PURE__*/React.createElement(AccordionSummaryExpandIconWrapper, {
    className: classes.expandIconWrapper,
    styleProps: styleProps
  }, expandIcon));
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AccordionSummary;