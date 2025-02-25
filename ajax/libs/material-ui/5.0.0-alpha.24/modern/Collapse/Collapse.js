import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { deepmerge, elementTypeAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { duration } from '../styles/transitions';
import { getTransitionProps } from '../transitions/utils';
import useTheme from '../styles/useTheme';
import { useForkRef } from '../utils';
import collapseClasses, { getCollapseUtilityClass } from './collapseClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styles[styleProps.orientation], styleProps.state === 'entered' && styles.entered, styleProps.state === 'exited' && !styleProps.in && styleProps.collapsedSize === '0px' && styles.hidden, {
    [`& .${collapseClasses.wrapper}`]: styles.wrapper,
    [`& .${collapseClasses.wrapperInner}`]: styles.wrapperInner
  }));
};

const useUtilityClasses = styleProps => {
  const {
    orientation,
    classes
  } = styleProps;
  const slots = {
    root: ['root', `${orientation}`],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', `${orientation}`],
    wrapperInner: ['wrapperInner', `${orientation}`]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};

const CollapseRoot = experimentalStyled('div', {}, {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  height: 0,
  overflow: 'hidden',
  transition: theme.transitions.create('height')
}, styleProps.orientation === 'horizontal' && {
  height: 'auto',
  width: 0,
  transition: theme.transitions.create('width')
}, styleProps.state === 'entered' && _extends({
  height: 'auto',
  overflow: 'visible'
}, styleProps.orientation === 'horizontal' && {
  width: 'auto'
}), styleProps.state === 'exited' && !styleProps.in && styleProps.collapsedSize === '0px' && {
  visibility: 'hidden'
}));
/* Styles applied to the outer wrapper element. */

const CollapseWrapper = experimentalStyled('div', {}, {
  name: 'MuiCollapse',
  slot: 'Wrapper'
})(({
  styleProps
}) => _extends({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: 'flex',
  width: '100%'
}, styleProps.orientation === 'horizontal' && {
  width: 'auto',
  height: '100%'
}));
/* Styles applied to the inner wrapper element. */

const CollapseWrapperInner = experimentalStyled('div', {}, {
  name: 'MuiCollapse',
  slot: 'WrapperInner'
})(({
  styleProps
}) => _extends({
  width: '100%'
}, styleProps.orientation === 'horizontal' && {
  width: 'auto',
  height: '100%'
}));
/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Collapse = /*#__PURE__*/React.forwardRef(function Collapse(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCollapse'
  });

  const {
    children,
    className,
    collapsedSize: collapsedSizeProp = '0px',
    component,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = 'vertical',
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "collapsedSize", "component", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "orientation", "style", "timeout", "TransitionComponent"]);

  const styleProps = _extends({}, props, {
    orientation,
    collapsedSize: collapsedSizeProp
  });

  const classes = useUtilityClasses(styleProps);
  const theme = useTheme();
  const timer = React.useRef();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedSize = typeof collapsedSizeProp === 'number' ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);

  const normalizedTransitionCallback = callback => maybeIsAppearing => {
    if (callback) {
      const node = nodeRef.current; // onEnterXxx and onExitXxx callbacks have a different arguments.length value.

      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute';
    }

    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();

    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = '';
    }

    const {
      duration: transitionDuration
    } = getTransitionProps({
      style,
      timeout
    }, {
      mode: 'enter'
    });

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style[size] = `${wrapperSize}px`;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback(node => {
    node.style[size] = `${getWrapperSize()}px`;

    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleExiting = normalizedTransitionCallback(node => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration
    } = getTransitionProps({
      style,
      timeout
    }, {
      mode: 'exit'
    });

    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style[size] = collapsedSize;

    if (onExiting) {
      onExiting(node);
    }
  });

  const addEndListener = next => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  return /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: addEndListener,
    nodeRef: nodeRef,
    timeout: timeout === 'auto' ? null : timeout
  }, other), (state, childProps) => /*#__PURE__*/React.createElement(CollapseRoot, _extends({
    as: component,
    className: clsx(classes.root, className, {
      'entered': classes.entered,
      'exited': !inProp && collapsedSize === '0px' && classes.hidden
    }[state]),
    style: _extends({
      [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize
    }, style),
    styleProps: _extends({}, styleProps, {
      state
    }),
    ref: handleRef
  }, childProps), /*#__PURE__*/React.createElement(CollapseWrapper, {
    styleProps: _extends({}, styleProps, {
      state
    }),
    className: classes.wrapper,
    ref: wrapperRef
  }, /*#__PURE__*/React.createElement(CollapseWrapperInner, {
    styleProps: _extends({}, styleProps, {
      state
    }),
    className: classes.wrapperInner
  }, children))));
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content node to be collapsed.
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
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onEntered: PropTypes.func,

  /**
   * @ignore
   */
  onEntering: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  onExited: PropTypes.func,

  /**
   * @ignore
   */
  onExiting: PropTypes.func,

  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
Collapse.muiSupportAuto = true;
export default Collapse;