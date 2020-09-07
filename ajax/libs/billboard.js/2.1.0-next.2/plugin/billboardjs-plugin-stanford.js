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
		module.exports = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("stanford", ["d3-selection", "d3-interpolate", "d3-color", "d3-scale", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["stanford"] = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
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
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ stanford_Stanford; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(6);

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(7);

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(8);

// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// EXTERNAL MODULE: ./src/config/config.ts
var config_config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @augments Plugin
 * @returns {StanfordOptions}
 * @private
 */
var Options = function () {
  return {
    /**
     * Set the color of the color scale. This function receives a value between 0 and 1, and should return a color.
     * @name colors
     * @memberof plugin-stanford
     * @type {Function}
     * @default undefined
     * @example
     *   colors: d3.interpolateHslLong(
     *      d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
     *   )
     */
    colors: undefined,

    /**
     * Specify the key of epochs values in the data.
     * @name epochs
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     * 	epochs: [ 1, 1, 2, 2, ... ]
     */
    epochs: [],

    /**
     * Show additional lines anywhere on the chart.
     * - Each line object should consist with following options:
     *
     * | Key | Type | Description |
     * | --- | --- | --- |
     * | x1 | Number | Starting position on the x axis |
     * | y1 | Number | Starting position on the y axis |
     * | x2 | Number | Ending position on the x axis  |
     * | y2 | Number | Ending position on the y axis |
     * | class | String | Optional value. Set a custom css class to this line. |
     * @type {Array}
     * @memberof plugin-stanford
     * @default []
     * @example
     *   lines: [
     *       { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
     *       { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
     *   ]
     */
    lines: [],

    /**
     * Set scale values
     * @name scale
     * @memberof plugin-stanford
     * @type {object}
     * @property {object} [scale] scale object
     * @property {number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {number} [scale.width=20] Width of the color scale
     * @property {string|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
     * @example
     *  scale: {
     *    max: 10000,
     *    min: 1,
     *    width: 500,
     *
     *    // specify 'pow10' to format as powers of 10
     *    format: "pow10",
     *
     *    // or specify a format function
     *    format: function(x) {
     *    	return x +"%";
     *    }
     *  },
     */
    scale_min: undefined,
    scale_max: undefined,
    scale_width: 20,
    scale_format: undefined,

    /**
     * The padding for color scale element
     * @name padding
     * @memberof plugin-stanford
     * @type {object}
     * @property {object} [padding] padding object
     * @property {number} [padding.top=0] Top padding value.
     * @property {number} [padding.right=0] Right padding value.
     * @property {number} [padding.bottom=0] Bottom padding value.
     * @property {number} [padding.left=0] Left padding value.
     * @example
     *  padding: {
     *     top: 15,
     *     right: 0,
     *     bottom: 0,
     *     left: 0
     *  },
     */
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,

    /**
     * Show additional regions anywhere on the chart.
     * - Each region object should consist with following options:
     *
     *   | Key | Type | Default | Attributes | Description |
     *   | --- | --- | --- | --- | --- |
     *   | points | Array |  | | Accepts a group of objects that has x and y.<br>These points should be added in a counter-clockwise fashion to make a closed polygon. |
     *   | opacity | Number | `0.2` | &lt;optional> | Sets the opacity of the region as value between 0 and 1 |
     *   | text | Function |  | &lt;optional> | This function receives a value and percentage of the number of epochs in this region.<br>Return a string to place text in the middle of the region. |
     *   | class | String | | &lt;optional> | Se a custom css class to this region, use the fill property in css to set a background color. |
     * @name regions
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     *   regions: [
     *       {
     *           points: [ // add points counter-clockwise
     *               { x: 0, y: 0 },
     *               { x: 40, y: 40 },
     *               { x: 0, y: 40 },
     *           ],
     *           text: function (value, percentage) {
     *               return `Normal Operations: ${value} (${percentage}%)`;
     *           },
     *           opacity: 0.2, // 0 to 1
     *           class: "test-polygon1"
     *       },
     *       ...
     *   ]
     */
    regions: []
  };
};


// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
// EXTERNAL MODULE: ./src/module/util.ts + 1 modules
var util = __webpack_require__(18);

// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */

/**
 * Check if point is in region
 * @param {object} point Point
 * @param {Array} region Region
 * @returns {boolean}
 * @private
 */

function pointInRegion(point, region) {
  // thanks to: http://bl.ocks.org/bycoffe/5575904
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var x = point.x,
      y = point.value,
      inside = !1;

  for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
    var xi = region[i].x,
        yi = region[i].y,
        xj = region[j].x,
        yj = region[j].y;
    yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi && (inside = !inside);
  }

  return inside;
}
/**
 * Compare epochs
 * @param {object} a Target
 * @param {object} b Source
 * @returns {number}
 * @private
 */


function compareEpochs(a, b) {
  return a.epochs < b.epochs ? -1 : a.epochs > b.epochs ? 1 : 0;
}
/**
 * Get region area
 * @param {Array} points Points
 * @returns {number}
 * @private
 */


function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  for (var point1, point2, area = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) point1 = points[i], point2 = points[j], area += point1.x * point2.y, area -= point1.y * point2.x;

  return area /= 2, area;
}
/**
 * Get centroid
 * @param {Array} points Points
 * @returns {object}
 * @private
 */


function getCentroid(points) {
  for (var f, area = getRegionArea(points), x = 0, y = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    var _point = points[i],
        _point2 = points[j];
    f = _point.x * _point2.y - _point2.x * _point.y, x += (_point.x + _point2.x) * f, y += (_point.y + _point2.y) * f;
  }

  return f = area * 6, {
    x: x / f,
    y: y / f
  };
}


// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck


/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var Elements_Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    Object(defineProperty["a" /* default */])(this, "owner", void 0), this.owner = owner;
    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.$el.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines), elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }

  var _proto = Elements.prototype;
  return _proto.updateStanfordLines = function updateStanfordLines(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        stanfordLine = main.select("." + stanford_classes.stanfordLines).style("shape-rendering", "geometricprecision").selectAll("." + stanford_classes.stanfordLine).data(this.owner.config.lines);
    stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordLineEnter = stanfordLine.enter().append("g");
    stanfordLineEnter.append("line").style("opacity", "0"), stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
      return stanford_classes.stanfordLine + (d.class ? " " + d.class : "");
    }).select("line").transition().duration(duration).attr("x1", function (d) {
      return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
    }).attr("x2", function (d) {
      return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
    }).attr("y1", function (d) {
      return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
    }).attr("y2", function (d) {
      return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
    }).transition().style("opacity", "1");
  }, _proto.updateStanfordRegions = function updateStanfordRegions(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
        stanfordRegion = main.select("." + stanford_classes.stanfordRegions).selectAll("." + stanford_classes.stanfordRegion).data(this.owner.config.regions);
    stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordRegionEnter = stanfordRegion.enter().append("g");
    stanfordRegionEnter.append("polygon").style("opacity", "0"), stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), stanfordRegion = stanfordRegionEnter.merge(stanfordRegion), stanfordRegion.attr("class", function (d) {
      return stanford_classes.stanfordRegion + (d.class ? " " + d.class : "");
    }).select("polygon").transition().duration(duration).attr("points", function (d) {
      return d.points.map(function (value) {
        return [isRotated ? yvCustom(value, "y") : xvCustom(value, "x"), isRotated ? xvCustom(value, "x") : yvCustom(value, "y")].join(",");
      }).join(" ");
    }).transition().style("opacity", function (d) {
      return (d.opacity ? d.opacity : .2) + "";
    }), stanfordRegion.select("text").transition().duration(duration).attr("x", function (d) {
      return isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x");
    }).attr("y", function (d) {
      return isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y");
    }).text(function (d) {
      if (d.text) {
        var _countPointsInRegion = countPointsInRegion(d.points),
            value = _countPointsInRegion.value,
            percentage = _countPointsInRegion.percentage;

        return d.text(value, percentage);
      }

      return "";
    }).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", "1");
  }, _proto.updateStanfordElements = function updateStanfordElements(duration) {
    duration === void 0 && (duration = 0), this.updateStanfordLines(duration), this.updateStanfordRegions(duration);
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(12);

// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(13);

// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/**
 * Stanford diagram plugin color scale class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var ColorScale_ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    Object(defineProperty["a" /* default */])(this, "owner", void 0), Object(defineProperty["a" /* default */])(this, "colorScale", void 0), this.owner = owner;
  }

  var _proto = ColorScale.prototype;
  return _proto.drawColorScale = function drawColorScale() {
    var _this$owner = this.owner,
        $$ = _this$owner.$$,
        config = _this$owner.config,
        target = $$.data.targets[0],
        height = $$.state.height - config.padding_bottom - config.padding_top,
        barWidth = config.scale_width,
        barHeight = 5,
        points = Object(util["a" /* getRange */])(config.padding_bottom, height, barHeight),
        inverseScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequential"])(target.colors).domain([points[points.length - 1], points[0]]);
    this.colorScale && this.colorScale.remove(), this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      return i * barHeight;
    }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
      return inverseScale(d);
    });
    // Legend Axis
    var axisScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleLog"])().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
        legendAxis = Object(external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_["axisRight"])(axisScale),
        scaleFormat = config.scale_format;
    scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : Object(util["d" /* isFunction */])(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat(Object(external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_["format"])("d"));
    // Draw Axis
    var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(" + barWidth + ",0)").call(legendAxis);
    scaleFormat === "pow10" && axis.selectAll(".tick text").text(null).filter(function (d) {
      return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
    }) // Power of Ten
    .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
    .text(function (d) {
      return Math.round(Math.log(d) / Math.LN10);
    }), this.colorScale.attr("transform", "translate(" + ($$.state.current.width - this.xForColorScale()) + ", 0)");
  }, _proto.xForColorScale = function xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  }, _proto.getColorScalePadding = function getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  }, ColorScale;
}();


// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck










/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Is preferable use `scatter` as data.type
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-interpolate](https://github.com/d3/d3-interpolate)
 *   - [d3-color](https://github.com/d3/d3-color)
 *   - [d3-scale](https://github.com/d3/d3-scale)
 *   - [d3-brush](https://github.com/d3/d3-brush)
 *   - [d3-axis](https://github.com/d3/d3-axis)
 *   - [d3-format](https://github.com/d3/d3-format)
 * @class plugin-stanford
 * @requires d3-selection
 * @requires d3-interpolate
 * @requires d3-color
 * @requires d3-scale
 * @requires d3-brush
 * @requires d3-axis
 * @requires d3-format
 * @param {object} options Stanford plugin options
 * @augments Plugin
 * @returns {Stanford}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-stanford.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "scatter"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({
 *           colors: d3.interpolateHslLong(
 *              d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
 *           ),
 *           epochs: [ 1, 1, 2, 2, ... ],
 *           lines: [
 *                  { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
 *                  { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
 *           ],
 *           scale: {
 *           	max: 10000,
 *             	min: 1,
 *           	width: 500,
 *             	format: 'pow10',
 *           },
 *           padding: {
 *           	top: 15,
 *           	right: 0,
 *           	bottom: 0,
 *           	left: 0
 *           },
 *           regions: [
 *           	{
 *               	points: [ // add points counter-clockwise
 *               	    { x: 0, y: 0 },
 *               	    { x: 40, y: 40 },
 *               	    { x: 0, y: 40 }
 *               	],
 *               	text: function (value, percentage) {
 *               	    return `Normal Operations: ${value} (${percentage}%)`;
 *               	},
 *               	opacity: 0.2, // 0 to 1
 *               	class: "test-polygon1"
 *              },
 *             	...
 *           ]
 *        }
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */

var stanford_Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "colorScale", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "elements", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(Stanford, _Plugin);

  var _proto = Stanford.prototype;
  return _proto.$beforeInit = function $beforeInit() {
    var _this2 = this,
        $$ = this.$$;

    $$.config.data_xSort = !1, $$.isMultipleX = function () {
      return !0;
    }, $$.showGridFocus = function () {}, $$.labelishData = function (d) {
      return d.values;
    }, $$.opacityForCircle = function () {
      return 1;
    };
    var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);

    $$.getCurrentPaddingRight = function () {
      return getCurrentPaddingRight() + (_this2.colorScale ? _this2.colorScale.getColorScalePadding() : 0);
    };
  }, _proto.$init = function $init() {
    var $$ = this.$$;
    config_config["a" /* loadConfig */].call(this, this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale_ColorScale(this), this.elements = new Elements_Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
  }, _proto.$redraw = function $redraw(duration) {
    this.colorScale && this.colorScale.drawColorScale(), this.elements && this.elements.updateStanfordElements(duration);
  }, _proto.getOptions = function getOptions() {
    return new Options();
  }, _proto.convertData = function convertData() {
    var data = this.$$.data.targets,
        epochs = this.options.epochs;
    data.forEach(function (d) {
      d.values.forEach(function (v, i) {
        v.epochs = epochs[i];
      }), d.minEpochs = undefined, d.maxEpochs = undefined, d.colors = undefined, d.colorscale = undefined;
    });
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        scale = $$.scale,
        yScale = d.axis && d.axis === "y2" ? scale.y2 : scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, _proto.initStanfordData = function initStanfordData() {
    var config = this.config,
        target = this.$$.data.targets[0];
    target.values.sort(compareEpochs);
    // Get array of epochs
    var epochs = target.values.map(function (a) {
      return a.epochs;
    });
    target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, epochs) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, epochs) : config.scale_max, target.colors = Object(util["d" /* isFunction */])(config.colors) ? config.colors : Object(external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_["interpolateHslLong"])(Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(250, 1, .5), Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(0, 1, .5)), target.colorscale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequentialLog"])(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }, _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }, _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    Object(util["c" /* isEmpty */])(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
      var html = "<table class=\"" + classes["a" /* default */].tooltip + "\"><tbody>";
      return d.forEach(function (v) {
        html += "<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(config.data_x) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(v.id) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + classes["a" /* default */].tooltipName + "-" + v.id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>" + defaultTitleFormat("Epochs") + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(v.epochs) + "</td>\n\t\t\t\t\t\t</tr>";
      }), html + "</tbody></table>";
    });
  }, _proto.countEpochsInRegion = function countEpochsInRegion(region) {
    var $$ = this,
        target = $$.data.targets[0],
        total = target.values.reduce(function (accumulator, currentValue) {
      return accumulator + +currentValue.epochs;
    }, 0),
        value = target.values.reduce(function (accumulator, currentValue) {
      return pointInRegion(currentValue, region) ? accumulator + +currentValue.epochs : accumulator;
    }, 0);
    return {
      value: value,
      percentage: value === 0 ? 0 : +(value / total * 100).toFixed(1)
    };
  }, Stanford;
}(Plugin["a" /* default */]);



/***/ }),
/* 17 */,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsImdldE1pbk1heCIsInJlcyIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FB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c0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjEuMC1uZXh0LjJcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XG5cbi8qKlxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XG5cdGxldCB0YXJnZXQ7XG5cdGxldCBrZXlzO1xuXHRsZXQgcmVhZDtcblxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcblxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xuXHRcdFx0cmV0dXJuIGZpbmQoKTtcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xuXHRcdHJlYWQgPSBmaW5kKCk7XG5cblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xuXHRcdH1cblx0fSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIG9wdGlvbiBjbGFzc1xuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmRPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCB0aGUgY29sb3Igb2YgdGhlIGNvbG9yIHNjYWxlLiBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBhbmQgc2hvdWxkIHJldHVybiBhIGNvbG9yLlxuXHRcdFx0ICogQG5hbWUgY29sb3JzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdFx0XHQgKiBAZGVmYXVsdCB1bmRlZmluZWRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuXHRcdFx0ICogICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuXHRcdFx0ICogICApXG5cdFx0XHQgKi9cblx0XHRcdGNvbG9yczogdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNwZWNpZnkgdGhlIGtleSBvZiBlcG9jaHMgdmFsdWVzIGluIHRoZSBkYXRhLlxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdXG5cdFx0XHQgKi9cblx0XHRcdGVwb2NoczogPG51bWJlcltdPiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgbGluZXMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIGxpbmUgb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCB4MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzICB8XG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGxpbmVzOiBbXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdGxpbmVzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2NhbGUgdmFsdWVzXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbc2NhbGVdIHNjYWxlIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5taW49dW5kZWZpbmVkXSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogbG93ZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5tYXg9dW5kZWZpbmVkXSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogaGlnaGVzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd8RnVuY3Rpb259IFtzY2FsZS5mb3JtYXQ9dW5kZWZpbmVkXSBGb3JtYXQgb2YgdGhlIGF4aXMgb2YgdGhlIGNvbG9yIHNjYWxlLiBVc2UgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwIG9yIGEgY3VzdG9tIGZ1bmN0aW9uLiBFeGFtcGxlOiBkMy5mb3JtYXQoXCJkXCIpXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHNjYWxlOiB7XG5cdFx0XHQgKiAgICBtYXg6IDEwMDAwLFxuXHRcdFx0ICogICAgbWluOiAxLFxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBzcGVjaWZ5ICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMFxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gb3Igc3BlY2lmeSBhIGZvcm1hdCBmdW5jdGlvblxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHQgKiAgICBcdHJldHVybiB4ICtcIiVcIjtcblx0XHRcdCAqICAgIH1cblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRzY2FsZV9taW46IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV9tYXg6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV93aWR0aDogPG51bWJlcnx1bmRlZmluZWQ+IDIwLFxuXHRcdFx0c2NhbGVfZm9ybWF0OiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBwYWRkaW5nIGZvciBjb2xvciBzY2FsZSBlbGVtZW50XG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtwYWRkaW5nXSBwYWRkaW5nIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnRvcD0wXSBUb3AgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5yaWdodD0wXSBSaWdodCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5sZWZ0PTBdIExlZnQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgcGFkZGluZzoge1xuXHRcdFx0ICogICAgIHRvcDogMTUsXG5cdFx0XHQgKiAgICAgcmlnaHQ6IDAsXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxuXHRcdFx0ICogICAgIGxlZnQ6IDBcblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRwYWRkaW5nX3RvcDogMCxcblx0XHRcdHBhZGRpbmdfcmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcblx0XHRcdHBhZGRpbmdfbGVmdDogMCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgcmVnaW9ucyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggcmVnaW9uIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHRcdCAqICAgfCBLZXkgfCBUeXBlIHwgRGVmYXVsdCB8IEF0dHJpYnV0ZXMgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiAgIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XG5cdFx0XHQgKiAgIHwgb3BhY2l0eSB8IE51bWJlciB8IGAwLjJgIHwgJmx0O29wdGlvbmFsPiB8IFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIHJlZ2lvbiBhcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgfFxuXHRcdFx0ICogICB8IHRleHQgfCBGdW5jdGlvbiB8ICB8ICZsdDtvcHRpb25hbD4gfCBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYW5kIHBlcmNlbnRhZ2Ugb2YgdGhlIG51bWJlciBvZiBlcG9jaHMgaW4gdGhpcyByZWdpb24uPGJyPlJldHVybiBhIHN0cmluZyB0byBwbGFjZSB0ZXh0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHJlZ2lvbi4gfFxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcblx0XHRcdCAqIEBuYW1lIHJlZ2lvbnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICByZWdpb25zOiBbXG5cdFx0XHQgKiAgICAgICB7XG5cdFx0XHQgKiAgICAgICAgICAgcG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2Vcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogNDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICBdLFxuXHRcdFx0ICogICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuXHRcdFx0ICogICAgICAgICAgICAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcblx0XHRcdCAqICAgICAgICAgICB9LFxuXHRcdFx0ICogICAgICAgICAgIG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG5cdFx0XHQgKiAgICAgICAgICAgY2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG5cdFx0XHQgKiAgICAgICB9LFxuXHRcdFx0ICogICAgICAgLi4uXG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0cmVnaW9uczogW11cblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5cbmltcG9ydCB7Z2V0UmFuZ2UsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuLi8uLi9tb2R1bGUvdXRpbFwiO1xuXG4vKipcbiAqIENoZWNrIGlmIHBvaW50IGlzIGluIHJlZ2lvblxuICogQHBhcmFtIHtvYmplY3R9IHBvaW50IFBvaW50XG4gKiBAcGFyYW0ge0FycmF5fSByZWdpb24gUmVnaW9uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbik6IGJvb2xlYW4geyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXG5cdC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcblx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XG5cdFx0Y29uc3QgeGkgPSByZWdpb25baV0ueDtcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xuXG5cdFx0Y29uc3QgeGogPSByZWdpb25bal0ueDtcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xuXG5cdFx0Y29uc3QgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcblxuXHRcdGlmIChpbnRlcnNlY3QpIHtcblx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc2lkZTtcbn1cblxuLyoqXG4gKiBDb21wYXJlIGVwb2Noc1xuICogQHBhcmFtIHtvYmplY3R9IGEgVGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gYiBTb3VyY2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb21wYXJlRXBvY2hzKGEsIGIpOiBudW1iZXIge1xuXHRpZiAoYS5lcG9jaHMgPCBiLmVwb2Nocykge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBHZXQgcmVnaW9uIGFyZWFcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cyk6IG51bWJlciB7IC8vIHRoYW5rcyB0bzogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYyODIzMzAvZmluZC1jZW50ZXJwb2ludC1vZi1wb2x5Z29uLWluLWphdmFzY3JpcHRcblx0bGV0IGFyZWEgPSAwO1xuXHRsZXQgcG9pbnQxO1xuXHRsZXQgcG9pbnQyO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRwb2ludDIgPSBwb2ludHNbal07XG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xuXHRcdGFyZWEgLT0gcG9pbnQxLnkgKiBwb2ludDIueDtcblx0fVxuXG5cdGFyZWEgLz0gMjtcblxuXHRyZXR1cm4gYXJlYTtcbn1cblxuLyoqXG4gKiBHZXQgY2VudHJvaWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcblx0Y29uc3QgYXJlYSA9IGdldFJlZ2lvbkFyZWEocG9pbnRzKTtcblxuXHRsZXQgeCA9IDA7XG5cdGxldCB5ID0gMDtcblx0bGV0IGY7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0Y29uc3QgcG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcblxuXHRcdGYgPSBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQyLnggKiBwb2ludDEueTtcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XG5cdFx0eSArPSAocG9pbnQxLnkgKyBwb2ludDIueSkgKiBmO1xuXHR9XG5cblx0ZiA9IGFyZWEgKiA2O1xuXG5cdHJldHVybiB7XG5cdFx0eDogeCAvIGYsXG5cdFx0eTogeSAvIGZcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0Y29tcGFyZUVwb2Nocyxcblx0Z2V0Q2VudHJvaWQsXG5cdGdldFJhbmdlLFxuXHRnZXRSZWdpb25BcmVhLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc1N0cmluZyxcblx0cGFyc2VEYXRlLFxuXHRwb2ludEluUmVnaW9uXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2dldENlbnRyb2lkLCBpc1N0cmluZywgcGFyc2VEYXRlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gZWxlbWVudCBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyB7XG5cdHByaXZhdGUgb3duZXI7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3Rcblx0XHRjb25zdCBlbGVtZW50cyA9IG93bmVyLiQkLiRlbC5tYWluLnNlbGVjdChcIi5iYi1jaGFydFwiKVxuXHRcdFx0LmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRFbGVtZW50cyk7XG5cblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZFJlZ2lvbnMpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtTGluZXNcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxuXHRcdFx0LnN0eWxlKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiZ2VvbWV0cmljcHJlY2lzaW9uXCIpXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZExpbmV9YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXIuYXBwZW5kKFwibGluZVwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZExpbmUgKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJsaW5lXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcIngxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTFcIikgOiB4dkN1c3RvbShkLCBcIngxXCIpKSlcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngxXCIpIDogeXZDdXN0b20oZCwgXCJ5MVwiKSkpXG5cdFx0XHQuYXR0cihcInkyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDJcIikgOiB5dkN1c3RvbShkLCBcInkyXCIpKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgY291bnRQb2ludHNJblJlZ2lvbiA9IHRoaXMub3duZXIuY291bnRFcG9jaHNJblJlZ2lvbi5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcblx0XHRsZXQgc3RhbmZvcmRSZWdpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb25zfWApXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbn1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwicG9seWdvblwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInRleHRcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XG5cblx0XHQvLyB1cGRhdGVcblx0XHRzdGFuZm9yZFJlZ2lvblxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkUmVnaW9uICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwicG9seWdvblwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJwb2ludHNcIiwgZCA9PiBkLnBvaW50cy5tYXAodmFsdWUgPT4gW1xuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcblx0XHRcdFx0aXNSb3RhdGVkID8geHZDdXN0b20odmFsdWUsIFwieFwiKSA6IHl2Q3VzdG9tKHZhbHVlLCBcInlcIilcblx0XHRcdF0uam9pbihcIixcIikpLmpvaW4oXCIgXCIpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBkID0+IFN0cmluZyhkLm9wYWNpdHkgPyBkLm9wYWNpdHkgOiAwLjIpKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcblx0XHRcdC5hdHRyKFwieVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSA6IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpKSlcblx0XHRcdC50ZXh0KGQgPT4ge1xuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3Qge3ZhbHVlLCBwZXJjZW50YWdlfSA9IGNvdW50UG9pbnRzSW5SZWdpb24oZC5wb2ludHMpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdH0pXG5cdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24gPSAwKTogdm9pZCB7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbik7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gJCQuc2NhbGUueTIgOiAkJC5zY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcbmltcG9ydCB7Zm9ybWF0IGFzIGQzRm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbCBhcyBkM1NjYWxlU2VxdWVudGlhbCwgc2NhbGVMb2cgYXMgZDNTY2FsZUxvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc0Z1bmN0aW9uLCBnZXRSYW5nZX0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xuXHRwcml2YXRlIG93bmVyO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cdH1cblxuXHRkcmF3Q29sb3JTY2FsZSgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCQsIGNvbmZpZ30gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblx0XHRjb25zdCBoZWlnaHQgPSAkJC5zdGF0ZS5oZWlnaHQgLSBjb25maWcucGFkZGluZ19ib3R0b20gLSBjb25maWcucGFkZGluZ190b3A7XG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XG5cdFx0Y29uc3QgYmFySGVpZ2h0ID0gNTtcblx0XHRjb25zdCBwb2ludHMgPSBnZXRSYW5nZShjb25maWcucGFkZGluZ19ib3R0b20sIGhlaWdodCwgYmFySGVpZ2h0KTtcblxuXHRcdGNvbnN0IGludmVyc2VTY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLCBwb2ludHNbMF1dKTtcblxuXHRcdGlmICh0aGlzLmNvbG9yU2NhbGUpIHtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5yZW1vdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSAkJC4kZWwuc3ZnLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLmNvbG9yU2NhbGUpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtjb25maWcucGFkZGluZ190b3B9KWApXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxuXHRcdFx0LmRhdGEocG9pbnRzKVxuXHRcdFx0LmVudGVyKClcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgZCA9PiBpbnZlcnNlU2NhbGUoZCkpO1xuXG5cdFx0Ly8gTGVnZW5kIEF4aXNcblx0XHRjb25zdCBheGlzU2NhbGUgPSBkM1NjYWxlTG9nKClcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxuXHRcdFx0LnJhbmdlKFtcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wICsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSArIGJhckhlaWdodCAtIDEsXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxuXHRcdFx0XSk7XG5cblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzY2FsZUZvcm1hdCkpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChkM0Zvcm1hdChcImRcIikpO1xuXHRcdH1cblxuXHRcdC8vIERyYXcgQXhpc1xuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7YmFyV2lkdGh9LDApYClcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxuXHRcdFx0XHQudGV4dChudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGQgPT4gZCAvIE1hdGgucG93KDEwLCBNYXRoLmNlaWwoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTAgLSAxZS0xMikpID09PSAxKSAvLyBQb3dlciBvZiBUZW5cblx0XHRcdFx0LnRleHQoMTApXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHQuYXR0cihcImR5XCIsIFwiLS43ZW1cIikgLy8gaHR0cHM6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay82NzM4MjI5XG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5zdGF0ZS5jdXJyZW50LndpZHRoIC0gdGhpcy54Rm9yQ29sb3JTY2FsZSgpfSwgMClgKTtcblx0fVxuXG5cdHhGb3JDb2xvclNjYWxlKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG5cdH1cblxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLnhGb3JDb2xvclNjYWxlKCkgKyB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX2xlZnQgKyAyMDtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XG5pbXBvcnQgQ29sb3JTY2FsZSBmcm9tIFwiLi9Db2xvclNjYWxlXCI7XG5pbXBvcnQge2NvbXBhcmVFcG9jaHMsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGUsIHBvaW50SW5SZWdpb259IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpblxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogICAtIElzIHByZWZlcmFibGUgdXNlIGBzY2F0dGVyYCBhcyBkYXRhLnR5cGVcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqICAgLSBbZDMtaW50ZXJwb2xhdGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1pbnRlcnBvbGF0ZSlcbiAqICAgLSBbZDMtY29sb3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1jb2xvcilcbiAqICAgLSBbZDMtc2NhbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZSlcbiAqICAgLSBbZDMtYnJ1c2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1icnVzaClcbiAqICAgLSBbZDMtYXhpc10oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWF4aXMpXG4gKiAgIC0gW2QzLWZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWZvcm1hdClcbiAqIEBjbGFzcyBwbHVnaW4tc3RhbmZvcmRcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1pbnRlcnBvbGF0ZVxuICogQHJlcXVpcmVzIGQzLWNvbG9yXG4gKiBAcmVxdWlyZXMgZDMtc2NhbGVcbiAqIEByZXF1aXJlcyBkMy1icnVzaFxuICogQHJlcXVpcmVzIGQzLWF4aXNcbiAqIEByZXF1aXJlcyBkMy1mb3JtYXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmR9XG4gKiBAZXhhbXBsZVxuICogLy8gUGx1Z2luIG11c3QgYmUgbG9hZGVkIGJlZm9yZSB0aGUgdXNlLlxuICogPHNjcmlwdCBzcmM9XCIkWU9VUl9QQVRIL3BsdWdpbi9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanNcIj48L3NjcmlwdD5cbiAqXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICAgICBjb2x1bW5zOiBbIC4uLiBdLFxuICogICAgICAgIHR5cGU6IFwic2NhdHRlclwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcbiAqICAgICAgICAgICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcbiAqICAgICAgICAgICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuICogICAgICAgICAgICksXG4gKiAgICAgICAgICAgZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdLFxuICogICAgICAgICAgIGxpbmVzOiBbXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cbiAqICAgICAgICAgICBdLFxuICogICAgICAgICAgIHNjYWxlOiB7XG4gKiAgICAgICAgICAgXHRtYXg6IDEwMDAwLFxuICogICAgICAgICAgICAgXHRtaW46IDEsXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxuICogICAgICAgICAgICAgXHRmb3JtYXQ6ICdwb3cxMCcsXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XG4gKiAgICAgICAgICAgXHR0b3A6IDE1LFxuICogICAgICAgICAgIFx0cmlnaHQ6IDAsXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXG4gKiAgICAgICAgICAgXHRsZWZ0OiAwXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgXHR7XG4gKiAgICAgICAgICAgICAgIFx0cG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2VcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogNDAsIHk6IDQwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogNDAgfVxuICogICAgICAgICAgICAgICBcdF0sXG4gKiAgICAgICAgICAgICAgIFx0dGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG4gKiAgICAgICAgICAgICAgIFx0ICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuICogICAgICAgICAgICAgICBcdH0sXG4gKiAgICAgICAgICAgICAgIFx0b3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcbiAqICAgICAgICAgICAgICAgXHRjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcbiAqICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgXHQuLi5cbiAqICAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFN0YW5mb3JkIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuZXNtXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XG5cdHByaXZhdGUgY29uZmlnO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cdHByaXZhdGUgZWxlbWVudHM7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGJlZm9yZUluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHQvLyBvdmVycmlkZSBvbiBjb25maWcgdmFsdWVzICYgbWV0aG9kc1xuXHRcdCQkLmNvbmZpZy5kYXRhX3hTb3J0ID0gZmFsc2U7XG5cdFx0JCQuaXNNdWx0aXBsZVggPSAoKSA9PiB0cnVlO1xuXHRcdCQkLnNob3dHcmlkRm9jdXMgPSAoKSA9PiB7fTtcblx0XHQkJC5sYWJlbGlzaERhdGEgPSBkID0+IGQudmFsdWVzO1xuXHRcdCQkLm9wYWNpdHlGb3JDaXJjbGUgPSAoKSA9PiAxO1xuXG5cdFx0Y29uc3QgZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQuYmluZCgkJCk7XG5cblx0XHQkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gKCkgPT4gKFxuXHRcdFx0Z2V0Q3VycmVudFBhZGRpbmdSaWdodCgpICsgKFxuXHRcdFx0XHR0aGlzLmNvbG9yU2NhbGUgPyB0aGlzLmNvbG9yU2NhbGUuZ2V0Q29sb3JTY2FsZVBhZGRpbmcoKSA6IDBcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcblxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXG5cdFx0dGhpcy4kcmVkcmF3KCk7XG5cdH1cblxuXHQkcmVkcmF3KGR1cmF0aW9uPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcblx0fVxuXG5cblx0Z2V0T3B0aW9ucygpOiBPcHRpb25zIHtcblx0XHRyZXR1cm4gbmV3IE9wdGlvbnMoKTtcblx0fVxuXG5cdGNvbnZlcnREYXRhKCk6IHZvaWQge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiQkLmRhdGEudGFyZ2V0cztcblx0XHRjb25zdCBlcG9jaHMgPSB0aGlzLm9wdGlvbnMuZXBvY2hzO1xuXG5cdFx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xuXHRcdFx0ZC52YWx1ZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHR2LmVwb2NocyA9IGVwb2Noc1tpXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkLm1pbkVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQubWF4RXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9yc2NhbGUgPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/IHNjYWxlLnkyIDogc2NhbGUueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxuXG5cdGluaXRTdGFuZm9yZERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xuXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcblxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xuXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xuXHR9XG5cblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XG5cdH1cblxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXMuJCQ7XG5cblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcblxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQoY29uZmlnLmRhdGFfeCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LngpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodi5pZCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LnZhbHVlKX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0ciBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcE5hbWV9LSR7di5pZH1cIj5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwibmFtZVwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2NvbG9yKHYpfVwiPjwvc3Bhbj4ke2RlZmF1bHRUaXRsZUZvcm1hdChcIkVwb2Noc1wiKX08L3RkPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYuZXBvY2hzKX08L3RkPlxuXHRcdFx0XHRcdFx0PC90cj5gO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gYCR7aHRtbH08L3Rib2R5PjwvdGFibGU+YDtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Y291bnRFcG9jaHNJblJlZ2lvbihyZWdpb24pOiB7dmFsdWU6IG51bWJlciwgcGVyY2VudGFnZTogbnVtYmVyfSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdGNvbnN0IHRvdGFsID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+XG5cdFx0XHRhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKSwgMCk7XG5cblx0XHRjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiB7XG5cdFx0XHRpZiAocG9pbnRJblJlZ2lvbihjdXJyZW50VmFsdWUsIHJlZ2lvbikpIHtcblx0XHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdFx0fSwgMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWUsXG5cdFx0XHRwZXJjZW50YWdlOiB2YWx1ZSAhPT0gMCA/ICsodmFsdWUgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgxKSA6IDBcblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xuXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XG5cblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSkoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5cbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xuXG5leHBvcnQge1xuXHRhc0hhbGZQaXhlbCxcblx0YnJ1c2hFbXB0eSxcblx0Y2FsbEZuLFxuXHRjYXBpdGFsaXplLFxuXHRjZWlsMTAsXG5cdGNvbnZlcnRJbnB1dFR5cGUsXG5cdGRlZXBDbG9uZSxcblx0ZGlmZkRvbWFpbixcblx0ZW5kYWxsLFxuXHRlbXVsYXRlRXZlbnQsXG5cdGV4dGVuZCxcblx0ZmluZEluZGV4LFxuXHRnZXRCcnVzaFNlbGVjdGlvbixcblx0Z2V0Qm91bmRpbmdSZWN0LFxuXHRnZXRDc3NSdWxlcyxcblx0Z2V0TWluTWF4LFxuXHRnZXRPcHRpb24sXG5cdGdldFBhdGhCb3gsXG5cdGdldFJhbmRvbSxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlY3RTZWdMaXN0LFxuXHRnZXRUcmFuc2xhdGlvbixcblx0Z2V0VW5pcXVlLFxuXHRoYXNWYWx1ZSxcblx0aXNBcnJheSxcblx0aXNib29sZWFuLFxuXHRpc0RlZmluZWQsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzTnVtYmVyLFxuXHRpc09iamVjdCxcblx0aXNPYmplY3RUeXBlLFxuXHRpc1N0cmluZyxcblx0aXNUYWJWaXNpYmxlLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNWYWx1ZSxcblx0bWVyZ2VBcnJheSxcblx0bWVyZ2VPYmosXG5cdG5vdEVtcHR5LFxuXHRwYXJzZURhdGUsXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcblxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XG5jb25zdCBpc1VuZGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XG5jb25zdCBjZWlsMTAgPSAodjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXG4pO1xuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0FycmF5ID0gKGFycjogYW55KTogYm9vbGVhbiA9PiBBcnJheS5pc0FycmF5KGFycik7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcblxuLyoqXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxuICogSWYgZGVmYXVsdCB2YWx1ZSBpcyBnaXZlbiwgd2lsbCByZXR1cm4gaWYgZ2l2ZW4ga2V5IHZhbHVlIG5vdCBmb3VuZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWVcbiAqIEByZXR1cm5zIHsqfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBleGlzdCBpbiB0aGUgZ2l2ZW4gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNWYWx1ZShkaWN0OiBvYmplY3QsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbGxGbihmbiwgLi4uYXJncyk6IGJvb2xlYW4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXG4gKiBAcGFyYW0ge2QzLnRyYW5zaXRpb259IHRyYW5zaXRpb24gVHJhbnNpdGlvblxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcblx0bGV0IG4gPSAwO1xuXG5cdHRyYW5zaXRpb25cblx0XHQuZWFjaCgoKSA9PiArK24pXG5cdFx0Lm9uKFwiZW5kXCIsIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcoc3RyKSA/XG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldFRleHRWYWx1ZShcblx0bm9kZTogZDNTZWxlY3Rpb24sXG5cdHRleHQ6IHN0cmluZyxcblx0ZHk6IG51bWJlcltdID0gWy0xLCAxXSxcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xuXHRcdG5vZGUudGV4dCh0ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcblxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XG5cblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcblxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxuXHRcdFx0XHRcdC50ZXh0KHYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XG5cdC8qXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXG5cdCAqICovXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xuXG5cdHJldHVybiBbXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXG5cdFx0e3gsIHl9LCAvLyBzZWcxXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXG5cdF07XG59XG5cbi8qKlxuICogR2V0IHN2ZyBib3VuZGluZyBwYXRoIGJveCBkaW1lbnNpb25cbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhCb3goXG5cdHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudFxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xuXG5cdHJldHVybiB7XG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fSBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0ge30uJGVsIFNlbGVjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9ICRlbC5zdWJjaGFydC5tYWluIHx8ICRlbC5tYWluO1xuXHRsZXQgc2VsZWN0aW9uO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmdDbGllbnRSZWN0LlxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRpbmdSZWN0KG5vZGUpOiB7XG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcbn0ge1xuXHRjb25zdCBuZWVkRXZhbHVhdGUgPSAhKFwicmVjdFwiIGluIG5vZGUpIHx8IChcblx0XHRcInJlY3RcIiBpbiBub2RlICYmIG5vZGUuaGFzQXR0cmlidXRlKFwid2lkdGhcIikgJiYgbm9kZS5yZWN0LndpZHRoICE9PSArbm9kZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKVxuXHQpO1xuXG5cdHJldHVybiBuZWVkRXZhbHVhdGUgP1xuXHRcdChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSA6IG5vZGUucmVjdDtcbn1cblxuLyoqXG4gKiBSZXRydW4gcmFuZG9tIG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcblx0Y29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG5cblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcbn1cblxuLyoqXG4gKiBGaW5kIGluZGV4IGJhc2VkIG9uIGJpbmFyeSBzZWFyY2hcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gdiBUYXJnZXQgbnVtYmVyIHRvIGZpbmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBpbmRleCBvZiBkYXRhIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBpbmRleCBvZiBkYXRhIGFyclxuICogQHBhcmFtIHtib29sZWFufSBpc1JvdGF0ZWQgV2VhdGhlciBpcyByb3RlZCBheGlzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBJbmRleCBudW1iZXJcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgdjogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgaXNSb3RhdGVkOiBib29sZWFuKTogbnVtYmVyIHtcblx0aWYgKHN0YXJ0ID4gZW5kKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0Y29uc3QgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG5cdGxldCB7eCwgdyA9IDB9ID0gYXJyW21pZF07XG5cblx0aWYgKGlzUm90YXRlZCkge1xuXHRcdHggPSBhcnJbbWlkXS55O1xuXHRcdHcgPSBhcnJbbWlkXS5oO1xuXHR9XG5cblx0aWYgKHYgPj0geCAmJiB2IDw9IHggKyB3KSB7XG5cdFx0cmV0dXJuIG1pZDtcblx0fVxuXG5cdHJldHVybiB2IDwgeCA/XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgc3RhcnQsIG1pZCAtIDEsIGlzUm90YXRlZCkgOlxuXHRcdGZpbmRJbmRleChhcnIsIHYsIG1pZCArIDEsIGVuZCwgaXNSb3RhdGVkKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIERlZXAgY29weSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IENsb25lZCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZXBDbG9uZSguLi5vYmplY3ROKSB7XG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IHIgPSBuZXcgdi5jb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xuXHRcdFx0XHRyW2tdID0gY2xvbmUodltrXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByO1xuXHRcdH1cblxuXHRcdHJldHVybiB2O1xuXHR9O1xuXG5cdHJldHVybiBvYmplY3ROLm1hcCh2ID0+IGNsb25lKHYpKVxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcblx0XHRcdHsuLi5hLCAuLi5jfVxuXHRcdCkpO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fEFycmF5fSBzb3VyY2UgU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xuXHR9XG5cblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=