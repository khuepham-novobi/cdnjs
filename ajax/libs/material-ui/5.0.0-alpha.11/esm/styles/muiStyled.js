import _extends from "@babel/runtime/helpers/esm/extends";
import styled from '@material-ui/styled-engine';
import { propsToClassKey } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

var getStyleOverrides = function getStyleOverrides(name, theme) {
  var styleOverrides = {};

  if (theme && theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  return styleOverrides;
};

var getVariantStyles = function getVariantStyles(name, theme) {
  var variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  var variantsStyles = {};
  variants.forEach(function (definition) {
    var key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

var variantsResolver = function variantsResolver(props, styles, theme, name) {
  var _theme$components, _theme$components$nam;

  var _props$styleProps = props.styleProps,
      styleProps = _props$styleProps === void 0 ? {} : _props$styleProps;
  var variantsStyles = {};
  var themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(function (themeVariant) {
      var isMatch = true;
      Object.keys(themeVariant.props).forEach(function (key) {
        if (styleProps[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles = _extends({}, variantsStyles, styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

var shouldForwardProp = function shouldForwardProp(prop) {
  return prop !== 'styleProps' && prop !== 'theme';
};

var muiStyled = function muiStyled(tag, options, muiOptions) {
  var name = muiOptions.muiName;
  var defaultStyledResolver = styled(tag, _extends({
    shouldForwardProp: shouldForwardProp,
    label: name
  }, options));

  var muiStyledResolver = function muiStyledResolver() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    if (muiOptions.overridesResolver) {
      styles.push(function (props) {
        var theme = props.theme || defaultTheme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    styles.push(function (props) {
      var theme = props.theme || defaultTheme;
      return variantsResolver(props, getVariantStyles(name, theme), theme, name);
    });
    return defaultStyledResolver.apply(void 0, styles);
  };

  return muiStyledResolver;
};

export default muiStyled;