/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.1.0-next.2
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else if(typeof define === 'function' && define.amd)
		define("textoverlap", ["d3-selection", "d3-brush", "d3-voronoi", "d3-polygon"], factory);
	else if(typeof exports === 'object')
		exports["textoverlap"] = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["textoverlap"] = factory(root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.1.0-next.2");



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  area: "bb-area",
  areas: "bb-areas",
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  bar: "bb-bar",
  bars: "bb-bars",
  brush: "bb-brush",
  button: "bb-button",
  buttonZoomReset: "bb-zoom-reset",
  chart: "bb-chart",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsTitle: "bb-chart-arcs-title",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  chartCircles: "bb-chart-circles",
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars",
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  circle: "bb-circle",
  circles: "bb-circles",
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale",
  defocused: "bb-defocused",
  dragarea: "bb-dragarea",
  empty: "bb-empty",
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single",
  focused: "bb-focused",
  gaugeValue: "bb-gauge-value",
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemFocused: "bb-legend-item-focused",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile",
  level: "bb-level",
  levels: "bb-levels",
  line: "bb-line",
  lines: "bb-lines",
  main: "bb-main",
  region: "bb-region",
  regions: "bb-regions",
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  shape: "bb-shape",
  shapes: "bb-shapes",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions",
  subchart: "bb-subchart",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  xgrid: "bb-xgrid",
  xgridFocus: "bb-xgrid-focus",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridFocus: "bb-ygrid-focus",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids",
  zoomBrush: "bb-zoom-brush",
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadConfig; });
/* harmony import */ var _module_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
  var target,
      keys,
      read,
      thisConfig = this.config,
      find = function () {
    var key = keys.shift();
    return key && target && Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isObjectType */ "e"])(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isDefined */ "b"])(read) && (thisConfig[key] = read);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ textoverlap_TextOverlap; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-voronoi","commonjs2":"d3-voronoi","amd":"d3-voronoi","root":"d3"}
var external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_ = __webpack_require__(14);

// EXTERNAL MODULE: external {"commonjs":"d3-polygon","commonjs2":"d3-polygon","amd":"d3-polygon","root":"d3"}
var external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_ = __webpack_require__(15);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: ./src/config/config.ts
var config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/textoverlap/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * TextOverlap plugin option class
 * @class TextOverlapOptions
 * @param {Options} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlapOptions}
 * @private
 */
var Options = function () {
  return {
    /**
     * Set selector string for target text nodes
     * @name selector
     * @memberof plugin-textoverlap
     * @type {string}
     * @default ".bb-texts text"
     * @example
     *  // selector for data label text nodes
     * selector: ".bb-texts text"
     */
    selector: ".bb-texts text",

    /**
     * Set extent of label overlap prevention
     * @name extent
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 1
     * @example
     * 	extent: 1
     */
    extent: 1,

    /**
     * Set minimum area needed to show a data label
     * @name area
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 0
     * @example
     * 	area: 0
     */
    area: 0
  };
};


// CONCATENATED MODULE: ./src/Plugin/textoverlap/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */






/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-voronoi](https://github.com/d3/d3-voronoi)
 * @class plugin-textoverlap
 * @requires d3-selection
 * @requires d3-polygon
 * @requires d3-voronoi
 * @param {object} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlap}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-textoverlap.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *     	  columns: [ ... ]
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.textoverlap({
 *          selector: ".bb-texts text",
 *          extent: 8,
 *          area: 3
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */

var textoverlap_TextOverlap = /*#__PURE__*/function (_Plugin) {
  function TextOverlap(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(TextOverlap, _Plugin);

  var _proto = TextOverlap.prototype;
  return _proto.$init = function $init() {
    config["a" /* loadConfig */].call(this, this.options);
  }, _proto.$redraw = function $redraw() {
    var text = Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["selectAll"])(this.config.selector);
    text.empty() || this.preventLabelOverlap(text);
  }
  /**
   * Generates the voronoi layout for data labels
   * @param {object} data Indices values
   * @returns {object} Voronoi layout points and corresponding Data points
   * @private
   */
  , _proto.generateVoronoi = function generateVoronoi(data) {
    var $$ = this.$$,
        scale = $$.scale,
        _map = ["x", "y"].map(function (v) {
      return scale[v].domain();
    }),
        min = _map[0],
        max = _map[1],
        _ref = [max[0], min[1]];

    return min[1] = _ref[0], max[0] = _ref[1], Object(external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_["voronoi"])().extent([min, max]).polygons(data);
  }
  /**
   * Set text label's position to preventg overlap.
   * @param {d3Selection} text target text selection
   * @private
   */
  , _proto.preventLabelOverlap = function preventLabelOverlap(text) {
    var _this$config = this.config,
        extent = _this$config.extent,
        area = _this$config.area,
        cells = this.generateVoronoi(text.data().map(function (v) {
      return [v.x, v.value];
    })),
        i = 0;
    text.each(function () {
      var cell = cells[i++];

      if (cell && this) {
        var _cell$data = cell.data,
            x = _cell$data[0],
            y = _cell$data[1],
            _d3PolygonCentroid = Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonCentroid"])(cell),
            cx = _d3PolygonCentroid[0],
            cy = _d3PolygonCentroid[1],
            angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2),
            xTranslate = extent * (angle === 0 ? 1 : -1),
            yTranslate = angle === -1 ? -extent : extent + 5,
            txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";

        Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["select"])(this) // @ts-ignore
        .attr("display", Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonArea"])(cell) < area ? "none" : null).attr("text-anchor", txtAnchor).attr("dy", "0." + (angle === 1 ? 71 : 35) + "em").attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")");
      }
    });
  }, TextOverlap;
}(Plugin["a" /* default */]);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getRange; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ isDefined; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ isEmpty; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ isFunction; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ isObjectType; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ isString; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ parseDate; });

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, deepClone, diffDomain, endall, emulateEvent, extend, findIndex, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(11);

// CONCATENATED MODULE: ./src/module/browser.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @private
 */

/* eslint-disable no-new-func, no-undef */


var win = function () {
  var def = function (o) {
    return typeof o !== "undefined" && o;
  };

  return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */






var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isboolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
};

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */


function hasValue(dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0;
  transition.each(function () {
    return ++n;
  }).on("end", function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];

    --n || cb.apply.apply(cb, [this].concat(args));
  });
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */


function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}
/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */


function setTextValue(node, text, dy, toMiddle) {
  if (dy === void 0 && (dy = [-1, 1]), toMiddle === void 0 && (toMiddle = !1), node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
    }
  }
}
/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */


function getRectSegList(path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */


function getPathBox(path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Return brush selection array
 * @param {object} {} Selection object
 * @param {object} {}.$el Selection object
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(_ref) {
  var selection,
      $el = _ref.$el,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes["a" /* default */].brush).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */


function getBoundingRect(node) {
  var needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
}
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @returns {number|string}
 * @private
 */


function getRandom(asStr) {
  asStr === void 0 && (asStr = !0);
  var rand = Math.random();
  return asStr ? rand + "" : rand;
}
/**
 * Find index based on binary search
 * @param {Array} arr Data array
 * @param {number} v Target number to find
 * @param {number} start Start index of data array
 * @param {number} end End index of data arr
 * @param {boolean} isRotated Weather is roted axis
 * @returns {number} Index number
 */


function findIndex(arr, v, start, end, isRotated) {
  if (start > end) return -1;
  var mid = Math.floor((start + end) / 2),
      _arr$mid = arr[mid],
      x = _arr$mid.x,
      _arr$mid$w = _arr$mid.w,
      w = _arr$mid$w === void 0 ? 0 : _arr$mid$w;
  return isRotated && (x = arr[mid].y, w = arr[mid].h), v >= x && v <= x + w ? mid : v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (_clone) {
    function clone() {
      return _clone.apply(this, arguments);
    }

    return clone.toString = function () {
      return _clone.toString();
    }, clone;
  }(function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) r[k] = clone(v[k]);

      return r;
    }

    return v;
  }), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) objectN[_key3] = arguments[_key3];

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || p in target || (target[p] = source[p]);

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }), rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


var getTranslation = function (node) {
  var transform = node ? node.transform : null,
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) objectN[_key4 - 1] = arguments[_key4];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  isAsc === void 0 && (isAsc = !0);
  var fn;
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, res) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */


var getRange = function (start, end, step) {
  step === void 0 && (step = 1);
  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) res.push(start + i * step);

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      return new MouseEvent("t"), function (el, eventType, params) {
        params === void 0 && (params = getParams()), el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        params === void 0 && (params = getParams());
        var mouseEvent = doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
}; // emulate event


/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);

  return res;
}
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */


function parseDate(date) {
  var parsedDate;
  if (date instanceof Date) parsedDate = date;else if (isString(date)) {
    var config = this.config,
        format = this.format;
    parsedDate = format.dataTime(config.data_xFormat)(date);
  } else isNumber(date) && !isNaN(date) && (parsedDate = new Date(+date));
  return (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return !doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var isMobile = !1; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

  if (/Mobi/.test(win.navigator.userAgent) && touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0,
        hasTouch = "ontouchmove" in win || win.DocumentTouch && doc instanceof win.DocumentTouch; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true

    isMobile = hasTouchPoints || hasTouch;
  }

  var hasMouse = !(!mouse || isMobile) && "onmouseover" in win;
  return hasMouse && "mouse" || isMobile && "touch" || null;
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwic2VsZWN0b3IiLCJleHRlbnQiLCJUZXh0T3ZlcmxhcCIsImNhbGwiLCJkM1NlbGVjdEFsbCIsInByZXZlbnRMYWJlbE92ZXJsYXAiLCJnZW5lcmF0ZVZvcm9ub2kiLCJkYXRhIiwiJCQiLCJzY2FsZSIsIm1hcCIsInYiLCJkb21haW4iLCJtaW4iLCJtYXgiLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwieCIsInZhbHVlIiwiaSIsImVhY2giLCJjZWxsIiwieSIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwiTWF0aCIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInhUcmFuc2xhdGUiLCJ5VHJhbnNsYXRlIiwidHh0QW5jaG9yIiwiYWJzIiwiZDNTZWxlY3QiLCJhdHRyIiwiZDNQb2x5Z29uQXJlYSIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJmb3VuZCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJlbmRhbGwiLCJ0cmFuc2l0aW9uIiwiY2IiLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImh0bWwiLCJhcHBlbmQiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJpc1JvdGF0ZWQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJnZXRSYW5nZSIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsInBhcnNlRGF0ZSIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFD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USxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInRleHRvdmVybGFwXCIsIFtcImQzLXNlbGVjdGlvblwiLCBcImQzLWJydXNoXCIsIFwiZDMtdm9yb25vaVwiLCBcImQzLXBvbHlnb25cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLXZvcm9ub2lcIiksIHJlcXVpcmUoXCJkMy1wb2x5Z29uXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJ0ZXh0b3ZlcmxhcFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjEuMC1uZXh0LjJcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XG5cbi8qKlxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XG5cdGxldCB0YXJnZXQ7XG5cdGxldCBrZXlzO1xuXHRsZXQgcmVhZDtcblxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcblxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xuXHRcdFx0cmV0dXJuIGZpbmQoKTtcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xuXHRcdHJlYWQgPSBmaW5kKCk7XG5cblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xuXHRcdH1cblx0fSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb24gY2xhc3NcbiAqIEBjbGFzcyBUZXh0T3ZlcmxhcE9wdGlvbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1RleHRPdmVybGFwT3B0aW9uc31cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2VsZWN0b3Igc3RyaW5nIGZvciB0YXJnZXQgdGV4dCBub2Rlc1xuXHRcdFx0ICogQG5hbWUgc2VsZWN0b3Jcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtzdHJpbmd9XG5cdFx0XHQgKiBAZGVmYXVsdCBcIi5iYi10ZXh0cyB0ZXh0XCJcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgLy8gc2VsZWN0b3IgZm9yIGRhdGEgbGFiZWwgdGV4dCBub2Rlc1xuXHRcdFx0ICogc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIlxuXHRcdFx0ICovXG5cdFx0XHRzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBleHRlbnQgb2YgbGFiZWwgb3ZlcmxhcCBwcmV2ZW50aW9uXG5cdFx0XHQgKiBAbmFtZSBleHRlbnRcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0XHQgKiBAZGVmYXVsdCAxXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRleHRlbnQ6IDFcblx0XHRcdCAqL1xuXHRcdFx0ZXh0ZW50OiAxLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBtaW5pbXVtIGFyZWEgbmVlZGVkIHRvIHNob3cgYSBkYXRhIGxhYmVsXG5cdFx0XHQgKiBAbmFtZSBhcmVhXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdFx0ICogQGRlZmF1bHQgMFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0YXJlYTogMFxuXHRcdFx0ICovXG5cdFx0XHRhcmVhOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt2b3Jvbm9pIGFzIGQzVm9yb25vaX0gZnJvbSBcImQzLXZvcm9ub2lcIjtcbmltcG9ydCB7XG5cdHBvbHlnb25DZW50cm9pZCBhcyBkM1BvbHlnb25DZW50cm9pZCxcblx0cG9seWdvbkFyZWEgYXMgZDNQb2x5Z29uQXJlYVxufSBmcm9tIFwiZDMtcG9seWdvblwiO1xuaW1wb3J0IHtcblx0c2VsZWN0IGFzIGQzU2VsZWN0LFxuXHRzZWxlY3RBbGwgYXMgZDNTZWxlY3RBbGxcbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5cbi8qKlxuICogVGV4dE92ZXJsYXAgcGx1Z2luPGJyPlxuICogUHJldmVudHMgbGFiZWwgb3ZlcmxhcCB1c2luZyBbVm9yb25vaSBsYXlvdXRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zvcm9ub2lfZGlhZ3JhbSkuXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiAgIC0gW2QzLXBvbHlnb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1wb2x5Z29uKVxuICogICAtIFtkMy12b3Jvbm9pXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdm9yb25vaSlcbiAqIEBjbGFzcyBwbHVnaW4tdGV4dG92ZXJsYXBcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1wb2x5Z29uXG4gKiBAcmVxdWlyZXMgZDMtdm9yb25vaVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcH1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qc1wiPjwvc2NyaXB0PlxuICpcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgIFx0ICBjb2x1bW5zOiBbIC4uLiBdXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnRleHRvdmVybGFwKHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCIsXG4gKiAgICAgICAgICBleHRlbnQ6IDgsXG4gKiAgICAgICAgICBhcmVhOiAzXG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgVGV4dE92ZXJsYXAgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5lc21cIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBUZXh0T3ZlcmxhcCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRPdmVybGFwIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XG5cdH1cblxuXHQkcmVkcmF3KCk6IHZvaWQge1xuXHRcdGNvbnN0IHRleHQgPSBkM1NlbGVjdEFsbCh0aGlzLmNvbmZpZy5zZWxlY3Rvcik7XG5cblx0XHQhdGV4dC5lbXB0eSgpICYmIHRoaXMucHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgdGhlIHZvcm9ub2kgbGF5b3V0IGZvciBkYXRhIGxhYmVsc1xuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBJbmRpY2VzIHZhbHVlc1xuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBWb3Jvbm9pIGxheW91dCBwb2ludHMgYW5kIGNvcnJlc3BvbmRpbmcgRGF0YSBwb2ludHNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGdlbmVyYXRlVm9yb25vaShkYXRhKSB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IFttaW4sIG1heF0gPSBbXCJ4XCIsIFwieVwiXS5tYXAodiA9PiBzY2FsZVt2XS5kb21haW4oKSk7XG5cblx0XHRbbWluWzFdLCBtYXhbMF1dID0gW21heFswXSwgbWluWzFdXTtcblxuXHRcdHJldHVybiBkM1Zvcm9ub2koKVxuXHRcdFx0LmV4dGVudChbbWluLCBtYXhdKVxuXHRcdFx0LnBvbHlnb25zKGRhdGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0ZXh0IGxhYmVsJ3MgcG9zaXRpb24gdG8gcHJldmVudGcgb3ZlcmxhcC5cblx0ICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gdGV4dCB0YXJnZXQgdGV4dCBzZWxlY3Rpb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk6IHZvaWQge1xuXHRcdGNvbnN0IHtleHRlbnQsIGFyZWF9ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgY2VsbHMgPSB0aGlzLmdlbmVyYXRlVm9yb25vaSh0ZXh0LmRhdGEoKS5tYXAodiA9PiBbdi54LCB2LnZhbHVlXSkpO1xuXHRcdGxldCBpID0gMDtcblxuXHRcdHRleHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IGNlbGwgPSBjZWxsc1tpKytdO1xuXG5cdFx0XHRpZiAoY2VsbCAmJiB0aGlzKSB7XG5cdFx0XHRcdGNvbnN0IFt4LCB5XSA9IGNlbGwuZGF0YTtcblx0XHRcdFx0Y29uc3QgW2N4LCBjeV0gPSBkM1BvbHlnb25DZW50cm9pZChjZWxsKTtcblx0XHRcdFx0Y29uc3QgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIoY3kgLSB5LCBjeCAtIHgpIC8gTWF0aC5QSSAqIDIpO1xuXG5cdFx0XHRcdGNvbnN0IHhUcmFuc2xhdGUgPSBleHRlbnQgKiAoYW5nbGUgPT09IDAgPyAxIDogLTEpO1xuXHRcdFx0XHRjb25zdCB5VHJhbnNsYXRlID0gYW5nbGUgPT09IC0xID8gLWV4dGVudCA6IGV4dGVudCArIDU7XG5cblx0XHRcdFx0Y29uc3QgdHh0QW5jaG9yID0gTWF0aC5hYnMoYW5nbGUpID09PSAxID9cblx0XHRcdFx0XHRcIm1pZGRsZVwiIDogKGFuZ2xlID09PSAwID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG5cblx0XHRcdFx0ZDNTZWxlY3QodGhpcylcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0LmF0dHIoXCJkaXNwbGF5XCIsIGQzUG9seWdvbkFyZWEoY2VsbCkgPCBhcmVhID8gXCJub25lXCIgOiBudWxsKVxuXHRcdFx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgdHh0QW5jaG9yKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYDAuJHthbmdsZSA9PT0gMSA/IDcxIDogMzV9ZW1gKVxuXHRcdFx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt4VHJhbnNsYXRlfSwgJHt5VHJhbnNsYXRlfSlgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBXaW5kb3cgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cbmV4cG9ydCB7d2luIGFzIHdpbmRvdywgZG9jIGFzIGRvY3VtZW50fTtcblxuY29uc3Qgd2luID0gKCgpID0+IHtcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xuXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRjb252ZXJ0SW5wdXRUeXBlLFxuXHRkZWVwQ2xvbmUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGZpbmRJbmRleCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzYm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVGFiVmlzaWJsZSxcblx0aXNVbmRlZmluZWQsXG5cdGlzVmFsdWUsXG5cdG1lcmdlQXJyYXksXG5cdG1lcmdlT2JqLFxuXHRub3RFbXB0eSxcblx0cGFyc2VEYXRlLFxuXHRzYW5pdGlzZSxcblx0c2V0VGV4dFZhbHVlLFxuXHRzb3J0VmFsdWUsXG5cdHRvQXJyYXksXG5cdHRwbFByb2Nlc3Ncbn07XG5cbmNvbnN0IGlzVmFsdWUgPSAodjogYW55KTogYm9vbGVhbiA9PiB2IHx8IHYgPT09IDA7XG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc051bWJlciA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNib29sZWFuID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcbmNvbnN0IGRpZmZEb21haW4gPSAoZDogbnVtYmVyW10pOiBudW1iZXIgPT4gZFsxXSAtIGRbMF07XG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpOiBib29sZWFuID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbi8qKlxuICogR2V0IHNwZWNpZmllZCBrZXkgdmFsdWUgZnJvbSBvYmplY3RcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IHZhbHVlXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xuXHRyZXR1cm4gaXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGxldCBmb3VuZCA9IGZhbHNlO1xuXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XG5cblx0cmV0dXJuIGZvdW5kO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xuXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcblx0cmV0dXJuIGlzRm47XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiBhZnRlciBhbGwgdHJhbnNpdGlvbnMgZW5kc1xuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdGxldCBuID0gMDtcblxuXHR0cmFuc2l0aW9uXG5cdFx0LmVhY2goKCkgPT4gKytuKVxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxuXHR0ZXh0OiBzdHJpbmcsXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2Vcbikge1xuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcblx0XHRub2RlLnRleHQodGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XG5cblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xuXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XG5cblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcblx0XHRcdFx0XHQudGV4dCh2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWN0U2VnTGlzdChwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnQpOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9W10ge1xuXHQvKlxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xuXHQgKiAqL1xuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcblxuXHRyZXR1cm4gW1xuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxuXHRcdHt4LCB5fSwgLy8gc2VnMVxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xuXHRdO1xufVxuXG4vKipcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRQYXRoQm94KFxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0ge30gU2VsZWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHt9LiRlbCBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcblx0bGV0IHNlbGVjdGlvbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdChub2RlKToge1xuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXG59IHtcblx0Y29uc3QgbmVlZEV2YWx1YXRlID0gIShcInJlY3RcIiBpbiBub2RlKSB8fCAoXG5cdFx0XCJyZWN0XCIgaW4gbm9kZSAmJiBub2RlLmhhc0F0dHJpYnV0ZShcIndpZHRoXCIpICYmIG5vZGUucmVjdC53aWR0aCAhPT0gK25vZGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIilcblx0KTtcblxuXHRyZXR1cm4gbmVlZEV2YWx1YXRlID9cblx0XHQobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkgOiBub2RlLnJlY3Q7XG59XG5cbi8qKlxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XG59XG5cbi8qKlxuICogRmluZCBpbmRleCBiYXNlZCBvbiBiaW5hcnkgc2VhcmNoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IHYgVGFyZ2V0IG51bWJlciB0byBmaW5kXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgaW5kZXggb2YgZGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgaW5kZXggb2YgZGF0YSBhcnJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSb3RhdGVkIFdlYXRoZXIgaXMgcm90ZWQgYXhpc1xuICogQHJldHVybnMge251bWJlcn0gSW5kZXggbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIHY6IG51bWJlciwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGlzUm90YXRlZDogYm9vbGVhbik6IG51bWJlciB7XG5cdGlmIChzdGFydCA+IGVuZCkge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xuXHRsZXQge3gsIHcgPSAwfSA9IGFyclttaWRdO1xuXG5cdGlmIChpc1JvdGF0ZWQpIHtcblx0XHR4ID0gYXJyW21pZF0ueTtcblx0XHR3ID0gYXJyW21pZF0uaDtcblx0fVxuXG5cdGlmICh2ID49IHggJiYgdiA8PSB4ICsgdykge1xuXHRcdHJldHVybiBtaWQ7XG5cdH1cblxuXHRyZXR1cm4gdiA8IHggP1xuXHRcdGZpbmRJbmRleChhcnIsIHYsIHN0YXJ0LCBtaWQgLSAxLCBpc1JvdGF0ZWQpIDpcblx0XHRmaW5kSW5kZXgoYXJyLCB2LCBtaWQgKyAxLCBlbmQsIGlzUm90YXRlZCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYnJ1c2ggaXMgZW1wdHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBicnVzaEVtcHR5KGN0eCk6IGJvb2xlYW4ge1xuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xuXG5cdGlmIChzZWxlY3Rpb24pIHtcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxuXHRcdC8vIG9uZS1kaW1lbnNpb25hbDogW3gwLCB4MV0gb3IgW3kwLCB5MV1cblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBEZWVwIGNvcHkgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0TiBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBDbG9uZWQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWVwQ2xvbmUoLi4ub2JqZWN0Tikge1xuXHRjb25zdCBjbG9uZSA9IHYgPT4ge1xuXHRcdGlmIChpc09iamVjdCh2KSAmJiB2LmNvbnN0cnVjdG9yKSB7XG5cdFx0XHRjb25zdCByID0gbmV3IHYuY29uc3RydWN0b3IoKTtcblxuXHRcdFx0Zm9yIChjb25zdCBrIGluIHYpIHtcblx0XHRcdFx0cltrXSA9IGNsb25lKHZba10pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdjtcblx0fTtcblxuXHRyZXR1cm4gb2JqZWN0Ti5tYXAodiA9PiBjbG9uZSh2KSlcblx0XHQucmVkdWNlKChhLCBjKSA9PiAoXG5cdFx0XHR7Li4uYSwgLi4uY31cblx0XHQpKTtcbn1cblxuLyoqXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdHxBcnJheX0gc291cmNlIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XG5cdGlmIChpc0FycmF5KHNvdXJjZSkpIHtcblx0XHRzb3VyY2UuZm9yRWFjaCh2ID0+IGV4dGVuZCh0YXJnZXQsIHYpKTtcblx0fVxuXG5cdC8vIGV4Y2x1ZGUgbmFtZSB3aXRoIG9ubHkgbnVtYmVyc1xuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XG5cdFx0aWYgKC9eXFxkKyQvLnRlc3QocCkgfHwgcCBpbiB0YXJnZXQpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhcGl0YWxpemUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodjogQ1NTU3R5bGVEZWNsYXJhdGlvbiB8IGFueSk6IGFueSA9PiBbXS5zbGljZS5jYWxsKHYpO1xuXG4vKipcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XG5cdGxldCBydWxlcyA9IFtdO1xuXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcnVsZXM7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0dFbGVtZW50XG4gKiBAcGFyYW0ge1NWR0VsZW1lbnR9IG5vZGUgTm9kZSBlbGVtZW50XG4gKiBAcmV0dXJucyB7U1ZHTWF0cml4fSBtYXRyaXhcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFRyYW5zbGF0aW9uID0gbm9kZSA9PiB7XG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmJhc2VWYWw7XG5cblx0cmV0dXJuIGJhc2VWYWwgJiYgYmFzZVZhbC5udW1iZXJPZkl0ZW1zID9cblx0XHRiYXNlVmFsLmdldEl0ZW0oMCkubWF0cml4IDpcblx0XHR7YTogMCwgYjogMCwgYzogMCwgZDogMCwgZTogMCwgZjogMH07XG59O1xuXG4vKipcbiAqIEdldCB1bmlxdWUgdmFsdWUgZnJvbSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBTb3VyY2UgZGF0YVxuICogQHJldHVybnMge0FycmF5fSBVbmlxdWUgYXJyYXkgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZShkYXRhOiBhbnlbXSk6IGFueVtdIHtcblx0Y29uc3QgaXNEYXRlID0gZGF0YVswXSBpbnN0YW5jZW9mIERhdGU7XG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXG5cdFx0LmZpbHRlcigodiwgaSwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHYpID09PSBpKTtcblxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xufVxuXG4vKipcbiAqIE1lcmdlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgU291cmNlIGFycmF5XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XG5cdHJldHVybiBhcnIgJiYgYXJyLmxlbmd0aCA/IGFyci5yZWR1Y2UoKHAsIGMpID0+IHAuY29uY2F0KGMpKSA6IFtdO1xufVxuXG4vKipcbiAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0TiBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VPYmoodGFyZ2V0OiBvYmplY3QsIC4uLm9iamVjdE4pOiBhbnkge1xuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xufVxuXG4vKipcbiAqIFNvcnQgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgdmFsdWUgdG8gYmUgc29ydGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjIHRydWU6IGFzYywgZmFsc2U6IGRlc2NcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb3J0VmFsdWUoZGF0YTogYW55W10sIGlzQXNjID0gdHJ1ZSk6IGFueVtdIHtcblx0bGV0IGZuO1xuXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdGZuID0gaXNBc2MgPyAoYSwgYikgPT4gYSAtIGIgOiAoYSwgYikgPT4gYiAtIGE7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gYSAtIGI7XG5cdFx0fSBlbHNlIGlmICghaXNBc2MpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkYXRhLmNvbmNhdCgpLnNvcnQoZm4pO1xufVxuXG4vKipcbiAqIEdldCBtaW4vbWF4IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xuICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBkYXRhIHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfERhdGV8dW5kZWZpbmVkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0TWluTWF4KHR5cGU6IFwibWluXCIgfCBcIm1heFwiLCBkYXRhOiBudW1iZXJbXSB8IERhdGVbXSB8IGFueSk6IG51bWJlciB8IERhdGUgfCB1bmRlZmluZWQgfCBhbnkge1xuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XG5cblx0aWYgKHJlcy5sZW5ndGgpIHtcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xuXHRcdFx0cmVzID0gTWF0aFt0eXBlXSguLi5yZXMpO1xuXHRcdH0gZWxzZSBpZiAocmVzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlcyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIFN0ZXAgbnVtYmVyXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRSYW5nZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc3RlcCA9IDEpOiBudW1iZXJbXSA9PiB7XG5cdGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcblx0Y29uc3QgbiA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCkpIHwgMDtcblxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcblx0XHRyZXMucHVzaChzdGFydCArIGkgKiBzdGVwKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59O1xuXG4vLyBlbXVsYXRlIGV2ZW50XG5jb25zdCBlbXVsYXRlRXZlbnQgPSB7XG5cdG1vdXNlOiAoKCkgPT4ge1xuXHRcdGNvbnN0IGdldFBhcmFtcyA9ICgpID0+ICh7XG5cdFx0XHRidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIHNjcmVlblg6IDAsIHNjcmVlblk6IDAsIGNsaWVudFg6IDAsIGNsaWVudFk6IDBcblx0XHR9KTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XG5cdFx0XHRuZXcgTW91c2VFdmVudChcInRcIik7XG5cblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMpKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gUG9seWZpbGxzIERPTTQgTW91c2VFdmVudFxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdGV2ZW50VHlwZSxcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcblx0XHRcdFx0XHR3aW5kb3csXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXG5cdFx0XHRcdFx0cGFyYW1zLmNsaWVudFgsIHBhcmFtcy5jbGllbnRZLFxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KSgpLFxuXHR0b3VjaDogKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xuXHRcdGNvbnN0IHRvdWNoT2JqID0gbmV3IFRvdWNoKG1lcmdlT2JqKHtcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXG5cdFx0XHR0YXJnZXQ6IGVsLFxuXHRcdFx0cmFkaXVzWDogMi41LFxuXHRcdFx0cmFkaXVzWTogMi41LFxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXG5cdFx0XHRmb3JjZTogMC41XG5cdFx0fSwgcGFyYW1zKSk7XG5cblx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBUb3VjaEV2ZW50KGV2ZW50VHlwZSwge1xuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRzaGlmdEtleTogdHJ1ZSxcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcblx0XHRcdGNoYW5nZWRUb3VjaGVzOiBbdG91Y2hPYmpdXG5cdFx0fSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlICAmIHJldHVybiBib3VuZCBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdHBsUHJvY2Vzcyh0cGw6IHN0cmluZywgZGF0YTogb2JqZWN0KTogc3RyaW5nIHtcblx0bGV0IHJlcyA9IHRwbDtcblxuXHRmb3IgKGNvbnN0IHggaW4gZGF0YSkge1xuXHRcdHJlcyA9IHJlcy5yZXBsYWNlKG5ldyBSZWdFeHAoYHs9JHt4fX1gLCBcImdcIiksIGRhdGFbeF0pO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcGFyc2VkIGRhdGUgdmFsdWVcbiAqIChJdCBtdXN0IGJlIGNhbGxlZCBpbiAnQ2hhcnRJbnRlcm5hbCcgY29udGV4dClcbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIFZhbHVlIG9mIGRhdGUgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7RGF0ZX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgYW55KTogRGF0ZSB7XG5cdGxldCBwYXJzZWREYXRlO1xuXG5cdGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdHBhcnNlZERhdGUgPSBkYXRlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nKGRhdGUpKSB7XG5cdFx0Y29uc3Qge2NvbmZpZywgZm9ybWF0fSA9IHRoaXM7XG5cblx0XHRwYXJzZWREYXRlID0gZm9ybWF0LmRhdGFUaW1lKGNvbmZpZy5kYXRhX3hGb3JtYXQpKGRhdGUpO1xuXHR9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGUpICYmICFpc05hTihkYXRlKSkge1xuXHRcdHBhcnNlZERhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cdH1cblxuXHRpZiAoIXBhcnNlZERhdGUgfHwgaXNOYU4oK3BhcnNlZERhdGUpKSB7XG5cdFx0Y29uc29sZSAmJiBjb25zb2xlLmVycm9yICYmXG5cdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgeCAnJHtkYXRlfScgdG8gRGF0ZSBvYmplY3RgKTtcblx0fVxuXG5cdHJldHVybiBwYXJzZWREYXRlO1xufVxuXG4vKipcbiAqIFJldHVybiBpZiB0aGUgY3VycmVudCBkb2MgaXMgdmlzaWJsZSBvciBub3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNUYWJWaXNpYmxlKCk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gIWRvY3VtZW50LmhpZGRlbjtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxuICogQHBhcmFtIHtib29sZWFufSBtb3VzZSBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS5tb3VzZVxuICogQHBhcmFtIHtib29sZWFufSB0b3VjaCBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS50b3VjaFxuICogQHJldHVybnMge3N0cmluZ30gXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY29udmVydElucHV0VHlwZShtb3VzZTogYm9vbGVhbiwgdG91Y2g6IGJvb2xlYW4pOiBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsIHtcblx0bGV0IGlzTW9iaWxlID0gZmFsc2U7XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9Ccm93c2VyX2RldGVjdGlvbl91c2luZ190aGVfdXNlcl9hZ2VudCNNb2JpbGVfVGFibGV0X29yX0Rlc2t0b3Bcblx0aWYgKC9Nb2JpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSAmJiB0b3VjaCkge1xuXHRcdC8vIFNvbWUgRWRnZSBkZXNrdG9wIHJldHVybiB0cnVlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8yMDQxNzA3NC9cblx0XHRjb25zdCBoYXNUb3VjaFBvaW50cyA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgXCJtYXhUb3VjaFBvaW50c1wiIGluIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XG5cblx0XHQvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy90b3VjaGV2ZW50cy5qc1xuXHRcdC8vIE9uIElFMTEgd2l0aCBJRTkgZW11bGF0aW9uIG1vZGUsICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIGlzIHJldHVybmluZyB0cnVlXG5cdFx0Y29uc3QgaGFzVG91Y2ggPSAoXCJvbnRvdWNobW92ZVwiIGluIHdpbmRvdyB8fCAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpO1xuXG5cdFx0aXNNb2JpbGUgPSBoYXNUb3VjaFBvaW50cyB8fCBoYXNUb3VjaDtcblx0fVxuXG5cdGNvbnN0IGhhc01vdXNlID0gbW91c2UgJiYgIWlzTW9iaWxlID8gKFwib25tb3VzZW92ZXJcIiBpbiB3aW5kb3cpIDogZmFsc2U7XG5cblx0cmV0dXJuIChoYXNNb3VzZSAmJiBcIm1vdXNlXCIpIHx8IChpc01vYmlsZSAmJiBcInRvdWNoXCIpIHx8IG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9