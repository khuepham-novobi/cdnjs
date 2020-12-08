/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 2.2.0-next.2
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-interpolate", "d3-color", "d3-scale", "d3-selection", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ Stanford
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(3);
// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(4);
// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(5);
;// CONCATENATED MODULE: ./src/config/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ const classes = ({
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
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(6);
;// CONCATENATED MODULE: ./src/module/browser.ts
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
  }; // Prioritize referencing Node.js global first to prevent refence error
  // https://github.com/naver/billboard.js/issues/1778


  return def(global) || def(globalThis) || def(self) || def(window) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
;// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

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
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.event,
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes.brush).node()) && (selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection)), selection;
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
 * @private
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
;// CONCATENATED MODULE: ./src/config/config.ts
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
    return key && target && isObjectType(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), isDefined(read) && (thisConfig[key] = read);
  });
}
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
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
    options === void 0 && (options = {}), this.$$ = void 0, this.options = void 0, this.options = options;
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

Plugin.version = "2.2.0-next.1";

;// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ const stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
;// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts
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

var Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    this.owner = void 0, this.owner = owner;
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
    return axis.isTimeSeries() ? value = parseDate.call($$, value) : axis.isCategorized() && isString(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(7);
// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(8);
;// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts
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

var ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    this.owner = void 0, this.colorScale = void 0, this.owner = owner;
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
        points = getRange(config.padding_bottom, height, barHeight),
        inverseScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequential)(target.colors).domain([points[points.length - 1], points[0]]);
    this.colorScale && this.colorScale.remove(), this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      return i * barHeight;
    }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
      return inverseScale(d);
    });
    // Legend Axis
    var axisScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLog)().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
        legendAxis = (0,external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight)(axisScale),
        scaleFormat = config.scale_format;
    scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : isFunction(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat((0,external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_.format)("d"));
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts



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

var Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.config = void 0, _this.colorScale = void 0, _this.elements = void 0, _this.config = new Options(), _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(Stanford, _Plugin);

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
    loadConfig.call(this, this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale(this), this.elements = new Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
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
    return axis.isTimeSeries() ? value = parseDate.call($$, value) : axis.isCategorized() && isString(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
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
    target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, epochs) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, epochs) : config.scale_max, target.colors = isFunction(config.colors) ? config.colors : (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolateHslLong)((0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(250, 1, .5), (0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(0, 1, .5)), target.colorscale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequentialLog)(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }, _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }, _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    isEmpty(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
      var html = "<table class=\"" + classes.tooltip + "\"><tbody>";
      return d.forEach(function (v) {
        html += "<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(config.data_x) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(v.id) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + classes.tooltipName + "-" + v.id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>" + defaultTitleFormat("Epochs") + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(v.epochs) + "</td>\n\t\t\t\t\t\t</tr>";
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
}(Plugin);



/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(2);
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zZWxlY3Rpb25cIixcImNvbW1vbmpzMlwiOlwiZDMtc2VsZWN0aW9uXCIsXCJhbWRcIjpcImQzLXNlbGVjdGlvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvY29uZmlnL2NsYXNzZXMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9PcHRpb25zLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL2NsYXNzZXMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9FbGVtZW50cy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9Db2xvclNjYWxlLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL2luZGV4LnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWludGVycG9sYXRlXCIsXCJjb21tb25qczJcIjpcImQzLWludGVycG9sYXRlXCIsXCJhbWRcIjpcImQzLWludGVycG9sYXRlXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1jb2xvclwiLFwiY29tbW9uanMyXCI6XCJkMy1jb2xvclwiLFwiYW1kXCI6XCJkMy1jb2xvclwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2NhbGVcIixcImNvbW1vbmpzMlwiOlwiZDMtc2NhbGVcIixcImFtZFwiOlwiZDMtc2NhbGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWJydXNoXCIsXCJjb21tb25qczJcIjpcImQzLWJydXNoXCIsXCJhbWRcIjpcImQzLWJydXNoXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1heGlzXCIsXCJjb21tb25qczJcIjpcImQzLWF4aXNcIixcImFtZFwiOlwiZDMtYXhpc1wiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtZm9ybWF0XCIsXCJjb21tb25qczJcIjpcImQzLWZvcm1hdFwiLFwiYW1kXCI6XCJkMy1mb3JtYXRcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImFyYyIsImFyY0xhYmVsTGluZSIsImFyY3MiLCJhcmVhIiwiYXJlYXMiLCJheGlzIiwiYXhpc1giLCJheGlzWExhYmVsIiwiYXhpc1kiLCJheGlzWTIiLCJheGlzWTJMYWJlbCIsImF4aXNZTGFiZWwiLCJiYXIiLCJiYXJzIiwiYnJ1c2giLCJidXR0b24iLCJidXR0b25ab29tUmVzZXQiLCJjaGFydCIsImNoYXJ0QXJjIiwiY2hhcnRBcmNzIiwiY2hhcnRBcmNzQmFja2dyb3VuZCIsImNoYXJ0QXJjc0dhdWdlTWF4IiwiY2hhcnRBcmNzR2F1Z2VNaW4iLCJjaGFydEFyY3NHYXVnZVVuaXQiLCJjaGFydEFyY3NUaXRsZSIsImNoYXJ0QXJjc0dhdWdlVGl0bGUiLCJjaGFydEJhciIsImNoYXJ0QmFycyIsImNoYXJ0Q2lyY2xlcyIsImNoYXJ0TGluZSIsImNoYXJ0TGluZXMiLCJjaGFydFJhZGFyIiwiY2hhcnRSYWRhcnMiLCJjaGFydFRleHQiLCJjaGFydFRleHRzIiwiY2lyY2xlIiwiY2lyY2xlcyIsImNvbG9yUGF0dGVybiIsImNvbG9yU2NhbGUiLCJkZWZvY3VzZWQiLCJkcmFnYXJlYSIsImVtcHR5IiwiZXZlbnRSZWN0IiwiZXZlbnRSZWN0cyIsImV2ZW50UmVjdHNNdWx0aXBsZSIsImV2ZW50UmVjdHNTaW5nbGUiLCJmb2N1c2VkIiwiZ2F1Z2VWYWx1ZSIsImdyaWQiLCJncmlkTGluZXMiLCJsZWdlbmQiLCJsZWdlbmRCYWNrZ3JvdW5kIiwibGVnZW5kSXRlbSIsImxlZ2VuZEl0ZW1FdmVudCIsImxlZ2VuZEl0ZW1Gb2N1c2VkIiwibGVnZW5kSXRlbUhpZGRlbiIsImxlZ2VuZEl0ZW1Qb2ludCIsImxlZ2VuZEl0ZW1UaWxlIiwibGV2ZWwiLCJsZXZlbHMiLCJsaW5lIiwibGluZXMiLCJtYWluIiwicmVnaW9uIiwicmVnaW9ucyIsInNlbGVjdGVkQ2lyY2xlIiwic2VsZWN0ZWRDaXJjbGVzIiwic2hhcGUiLCJzaGFwZXMiLCJzdGFuZm9yZEVsZW1lbnRzIiwic3RhbmZvcmRMaW5lIiwic3RhbmZvcmRMaW5lcyIsInN0YW5mb3JkUmVnaW9uIiwic3RhbmZvcmRSZWdpb25zIiwic3ViY2hhcnQiLCJ0YXJnZXQiLCJ0ZXh0IiwidGV4dHMiLCJ0aXRsZSIsInRvb2x0aXAiLCJ0b29sdGlwQ29udGFpbmVyIiwidG9vbHRpcE5hbWUiLCJ4Z3JpZCIsInhncmlkRm9jdXMiLCJ4Z3JpZExpbmUiLCJ4Z3JpZExpbmVzIiwieGdyaWRzIiwieWdyaWQiLCJ5Z3JpZEZvY3VzIiwieWdyaWRMaW5lIiwieWdyaWRMaW5lcyIsInlncmlkcyIsInpvb21CcnVzaCIsIkVYUEFOREVEIiwiU0VMRUNURUQiLCJJTkNMVURFRCIsIlRleHRPdmVybGFwcGluZyIsIndpbiIsImRlZiIsIm8iLCJnbG9iYWwiLCJnbG9iYWxUaGlzIiwic2VsZiIsIndpbmRvdyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwidiIsImlzRnVuY3Rpb24iLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc0RlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJNYXRoIiwiY2VpbCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJkIiwiaXNPYmplY3RUeXBlIiwiaXNFbXB0eSIsImxlbmd0aCIsIkRhdGUiLCJPYmplY3QiLCJrZXlzIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJvcHRpb25zIiwia2V5IiwiZGVmYXVsdFZhbHVlIiwiaGFzVmFsdWUiLCJkaWN0IiwidmFsdWUiLCJmb3VuZCIsImZvckVhY2giLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsImVuZGFsbCIsInRyYW5zaXRpb24iLCJjYiIsImVhY2giLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm1hcCIsIm11bHRpbGluZSIsInNwbGl0IiwibGVuIiwiaHRtbCIsImkiLCJhcHBlbmQiLCJhdHRyIiwiZ2V0UmVjdFNlZ0xpc3QiLCJwYXRoIiwiZ2V0QkJveCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJtaW4iLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJpc1JvdGF0ZWQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiZGF0YSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJtZXJnZU9iaiIsInNoaWZ0Iiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJ1bmRlZmluZWQiLCJnZXRSYW5nZSIsInN0ZXAiLCJtYXgiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJwYXJzZURhdGUiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImNvbmZpZyIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwiaGFzVG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsImhhc01vdXNlIiwibG9hZENvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsIlBsdWdpbiIsIiQkIiwiJGJlZm9yZUluaXQiLCIkaW5pdCIsIiRhZnRlckluaXQiLCIkcmVkcmF3IiwiJHdpbGxEZXN0cm95IiwidmVyc2lvbiIsIk9wdGlvbnMiLCJjb2xvcnMiLCJlcG9jaHMiLCJzY2FsZV9taW4iLCJzY2FsZV9tYXgiLCJzY2FsZV93aWR0aCIsInNjYWxlX2Zvcm1hdCIsInBhZGRpbmdfdG9wIiwicGFkZGluZ19yaWdodCIsInBhZGRpbmdfYm90dG9tIiwicGFkZGluZ19sZWZ0IiwicG9pbnRJblJlZ2lvbiIsInBvaW50IiwiaW5zaWRlIiwiaiIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImdldFJlZ2lvbkFyZWEiLCJwb2ludHMiLCJwb2ludDEiLCJwb2ludDIiLCJsIiwiZ2V0Q2VudHJvaWQiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCJ1cGRhdGVTdGFuZm9yZExpbmVzIiwiZHVyYXRpb24iLCJheGlzX3JvdGF0ZWQiLCJ4dkN1c3RvbSIsImJpbmQiLCJ5dkN1c3RvbSIsInN0eWxlIiwic2VsZWN0QWxsIiwiZXhpdCIsInJlbW92ZSIsInN0YW5mb3JkTGluZUVudGVyIiwiZW50ZXIiLCJtZXJnZSIsImNsYXNzIiwidXBkYXRlU3RhbmZvcmRSZWdpb25zIiwiY291bnRQb2ludHNJblJlZ2lvbiIsImNvdW50RXBvY2hzSW5SZWdpb24iLCJzdGFuZm9yZFJlZ2lvbkVudGVyIiwiam9pbiIsIm9wYWNpdHkiLCJwZXJjZW50YWdlIiwidXBkYXRlU3RhbmZvcmRFbGVtZW50cyIsInh5VmFsdWUiLCJnZXRCYXNlVmFsdWUiLCJpc1RpbWVTZXJpZXMiLCJpc0NhdGVnb3JpemVkIiwiYXhpc194X2NhdGVnb3JpZXMiLCJzY2FsZSIsInlTY2FsZSIsInkyIiwiQ29sb3JTY2FsZSIsImRyYXdDb2xvclNjYWxlIiwidGFyZ2V0cyIsInN0YXRlIiwiYmFyV2lkdGgiLCJiYXJIZWlnaHQiLCJpbnZlcnNlU2NhbGUiLCJkM1NjYWxlU2VxdWVudGlhbCIsImRvbWFpbiIsInN2ZyIsImF4aXNTY2FsZSIsImQzU2NhbGVMb2ciLCJtaW5FcG9jaHMiLCJtYXhFcG9jaHMiLCJyYW5nZSIsImxlZ2VuZEF4aXMiLCJkM0F4aXNSaWdodCIsInNjYWxlRm9ybWF0IiwidGlja1ZhbHVlcyIsInRpY2tGb3JtYXQiLCJkM0Zvcm1hdCIsInBvdyIsImxvZyIsIkxOMTAiLCJyb3VuZCIsImN1cnJlbnQiLCJ4Rm9yQ29sb3JTY2FsZSIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJjb2xvcnNjYWxlIiwiZDNJbnRlcnBvbGF0ZUhzbExvbmciLCJkM0hzbCIsImQzU2NhbGVTZXF1ZW50aWFsTG9nIiwidG9vbHRpcF9jb250ZW50cyIsImRlZmF1bHRUaXRsZUZvcm1hdCIsImRlZmF1bHRWYWx1ZUZvcm1hdCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87Ozs7Ozs7QUNWQSxnRDs7Ozs7Ozs7Ozs7OztBQ0FlO0FBQ2Y7QUFDQTtBQUNBOztBQUVB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QSxhQUM3RHJHLGFBQWEsQ0FBQ3FHLFlBQUQsRUFBZXZYLE1BQWYsQ0FEZ0QsR0FFekRzWCxXQUFXLElBQVVDLFlBQVksQ0FBQzlHLE1BRnVCLEdBSzFENkcsV0FMMEQ7QUFNakUsS0FOYSxFQU1YLENBTlcsQ0FQa0Q7QUFlaEUsV0FBTztBQUNOdlMsV0FBSyxFQUFMQSxLQURNO0FBRU55TyxnQkFBVSxFQUFFek8sS0FBSyxLQUFLLENBQVYsR0FBa0QsQ0FBbEQsR0FBYyxDQUFDLENBQUNBLEtBQUssR0FBR3NTLEtBQVIsR0FBZ0IsR0FBakIsRUFBc0JHLE9BQXRCLENBQThCLENBQTlCO0FBRnJCLEtBQVA7QUFJQSxHO0VBMUtvQ3pILE07Ozs7Ozs7O0FDckd0QyxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYlwiLCBbXCJkMy1pbnRlcnBvbGF0ZVwiLCBcImQzLWNvbG9yXCIsIFwiZDMtc2NhbGVcIiwgXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1icnVzaFwiLCBcImQzLWF4aXNcIiwgXCJkMy1mb3JtYXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fKSB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX187IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XG5cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHQvLyBQcmlvcml0aXplIHJlZmVyZW5jaW5nIE5vZGUuanMgZ2xvYmFsIGZpcnN0IHRvIHByZXZlbnQgcmVmZW5jZSBlcnJvclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvYmlsbGJvYXJkLmpzL2lzc3Vlcy8xNzc4XG5cdHJldHVybiBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRjb252ZXJ0SW5wdXRUeXBlLFxuXHRkZWVwQ2xvbmUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGZpbmRJbmRleCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzYm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVGFiVmlzaWJsZSxcblx0aXNVbmRlZmluZWQsXG5cdGlzVmFsdWUsXG5cdG1lcmdlQXJyYXksXG5cdG1lcmdlT2JqLFxuXHRub3RFbXB0eSxcblx0cGFyc2VEYXRlLFxuXHRzYW5pdGlzZSxcblx0c2V0VGV4dFZhbHVlLFxuXHRzb3J0VmFsdWUsXG5cdHRvQXJyYXksXG5cdHRwbFByb2Nlc3Ncbn07XG5cbmNvbnN0IGlzVmFsdWUgPSAodjogYW55KTogYm9vbGVhbiA9PiB2IHx8IHYgPT09IDA7XG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc051bWJlciA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNib29sZWFuID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcbmNvbnN0IGRpZmZEb21haW4gPSAoZDogbnVtYmVyW10pOiBudW1iZXIgPT4gZFsxXSAtIGRbMF07XG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpOiBib29sZWFuID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbi8qKlxuICogR2V0IHNwZWNpZmllZCBrZXkgdmFsdWUgZnJvbSBvYmplY3RcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IHZhbHVlXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xuXHRyZXR1cm4gaXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGxldCBmb3VuZCA9IGZhbHNlO1xuXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XG5cblx0cmV0dXJuIGZvdW5kO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xuXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcblx0cmV0dXJuIGlzRm47XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiBhZnRlciBhbGwgdHJhbnNpdGlvbnMgZW5kc1xuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdGxldCBuID0gMDtcblxuXHR0cmFuc2l0aW9uXG5cdFx0LmVhY2goKCkgPT4gKytuKVxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxuXHR0ZXh0OiBzdHJpbmcsXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2Vcbikge1xuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcblx0XHRub2RlLnRleHQodGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XG5cblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xuXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XG5cblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcblx0XHRcdFx0XHQudGV4dCh2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWN0U2VnTGlzdChwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnQpOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9W10ge1xuXHQvKlxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xuXHQgKiAqL1xuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcblxuXHRyZXR1cm4gW1xuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxuXHRcdHt4LCB5fSwgLy8gc2VnMVxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xuXHRdO1xufVxuXG4vKipcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRQYXRoQm94KFxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0ge30gU2VsZWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHt9LiRlbCBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcblx0bGV0IHNlbGVjdGlvbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdChub2RlKToge1xuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXG59IHtcblx0Y29uc3QgbmVlZEV2YWx1YXRlID0gIShcInJlY3RcIiBpbiBub2RlKSB8fCAoXG5cdFx0XCJyZWN0XCIgaW4gbm9kZSAmJiBub2RlLmhhc0F0dHJpYnV0ZShcIndpZHRoXCIpICYmIG5vZGUucmVjdC53aWR0aCAhPT0gK25vZGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIilcblx0KTtcblxuXHRyZXR1cm4gbmVlZEV2YWx1YXRlID9cblx0XHQobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkgOiBub2RlLnJlY3Q7XG59XG5cbi8qKlxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XG59XG5cbi8qKlxuICogRmluZCBpbmRleCBiYXNlZCBvbiBiaW5hcnkgc2VhcmNoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IHYgVGFyZ2V0IG51bWJlciB0byBmaW5kXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgaW5kZXggb2YgZGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgaW5kZXggb2YgZGF0YSBhcnJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSb3RhdGVkIFdlYXRoZXIgaXMgcm90ZWQgYXhpc1xuICogQHJldHVybnMge251bWJlcn0gSW5kZXggbnVtYmVyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCB2OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpc1JvdGF0ZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuXHRpZiAoc3RhcnQgPiBlbmQpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRjb25zdCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcblx0bGV0IHt4LCB3ID0gMH0gPSBhcnJbbWlkXTtcblxuXHRpZiAoaXNSb3RhdGVkKSB7XG5cdFx0eCA9IGFyclttaWRdLnk7XG5cdFx0dyA9IGFyclttaWRdLmg7XG5cdH1cblxuXHRpZiAodiA+PSB4ICYmIHYgPD0geCArIHcpIHtcblx0XHRyZXR1cm4gbWlkO1xuXHR9XG5cblx0cmV0dXJuIHYgPCB4ID9cblx0XHRmaW5kSW5kZXgoYXJyLCB2LCBzdGFydCwgbWlkIC0gMSwgaXNSb3RhdGVkKSA6XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgbWlkICsgMSwgZW5kLCBpc1JvdGF0ZWQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogRGVlcCBjb3B5IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcblx0Y29uc3QgY2xvbmUgPSB2ID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHY7XG5cdH07XG5cblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXG5cdFx0LnJlZHVjZSgoYSwgYykgPT4gKFxuXHRcdFx0ey4uLmEsIC4uLmN9XG5cdFx0KSk7XG59XG5cbi8qKlxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R8QXJyYXl9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XG5cdH1cblxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn1cblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn1cblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge0RhdGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xuXHRsZXQgcGFyc2VkRGF0ZTtcblxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xuXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xuXHR9XG5cblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XG5cdH1cblxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcblxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XG5cdH1cblxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xuXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcblxuLyoqXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcblx0bGV0IHRhcmdldDtcblx0bGV0IGtleXM7XG5cdGxldCByZWFkO1xuXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xuXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XG5cdFx0XHRyZXR1cm4gZmluZCgpO1xuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcblx0XHR0YXJnZXQgPSBjb25maWc7XG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XG5cdFx0cmVhZCA9IGZpbmQoKTtcblxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbi8qKlxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG4gKiBAbmFtZSB2ZXJzaW9uXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUGx1Z2luXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcblx0cHVibGljICQkO1xuXHRwdWJsaWMgb3B0aW9ucztcblx0c3RhdGljIHZlcnNpb24gPSBcIjIuMi4wLW5leHQuMVwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIG9wdGlvbiBjbGFzc1xuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmRPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCB0aGUgY29sb3Igb2YgdGhlIGNvbG9yIHNjYWxlLiBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBhbmQgc2hvdWxkIHJldHVybiBhIGNvbG9yLlxuXHRcdFx0ICogQG5hbWUgY29sb3JzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdFx0XHQgKiBAZGVmYXVsdCB1bmRlZmluZWRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuXHRcdFx0ICogICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuXHRcdFx0ICogICApXG5cdFx0XHQgKi9cblx0XHRcdGNvbG9yczogdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNwZWNpZnkgdGhlIGtleSBvZiBlcG9jaHMgdmFsdWVzIGluIHRoZSBkYXRhLlxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdXG5cdFx0XHQgKi9cblx0XHRcdGVwb2NoczogPG51bWJlcltdPiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgbGluZXMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIGxpbmUgb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCB4MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzICB8XG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGxpbmVzOiBbXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdGxpbmVzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2NhbGUgdmFsdWVzXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbc2NhbGVdIHNjYWxlIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5taW49dW5kZWZpbmVkXSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogbG93ZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5tYXg9dW5kZWZpbmVkXSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogaGlnaGVzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd8RnVuY3Rpb259IFtzY2FsZS5mb3JtYXQ9dW5kZWZpbmVkXSBGb3JtYXQgb2YgdGhlIGF4aXMgb2YgdGhlIGNvbG9yIHNjYWxlLiBVc2UgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwIG9yIGEgY3VzdG9tIGZ1bmN0aW9uLiBFeGFtcGxlOiBkMy5mb3JtYXQoXCJkXCIpXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHNjYWxlOiB7XG5cdFx0XHQgKiAgICBtYXg6IDEwMDAwLFxuXHRcdFx0ICogICAgbWluOiAxLFxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBzcGVjaWZ5ICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMFxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gb3Igc3BlY2lmeSBhIGZvcm1hdCBmdW5jdGlvblxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHQgKiAgICBcdHJldHVybiB4ICtcIiVcIjtcblx0XHRcdCAqICAgIH1cblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRzY2FsZV9taW46IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV9tYXg6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV93aWR0aDogPG51bWJlcnx1bmRlZmluZWQ+IDIwLFxuXHRcdFx0c2NhbGVfZm9ybWF0OiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBwYWRkaW5nIGZvciBjb2xvciBzY2FsZSBlbGVtZW50XG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtwYWRkaW5nXSBwYWRkaW5nIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnRvcD0wXSBUb3AgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5yaWdodD0wXSBSaWdodCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5sZWZ0PTBdIExlZnQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgcGFkZGluZzoge1xuXHRcdFx0ICogICAgIHRvcDogMTUsXG5cdFx0XHQgKiAgICAgcmlnaHQ6IDAsXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxuXHRcdFx0ICogICAgIGxlZnQ6IDBcblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRwYWRkaW5nX3RvcDogMCxcblx0XHRcdHBhZGRpbmdfcmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcblx0XHRcdHBhZGRpbmdfbGVmdDogMCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgcmVnaW9ucyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggcmVnaW9uIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHRcdCAqICAgfCBLZXkgfCBUeXBlIHwgRGVmYXVsdCB8IEF0dHJpYnV0ZXMgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiAgIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XG5cdFx0XHQgKiAgIHwgb3BhY2l0eSB8IE51bWJlciB8IGAwLjJgIHwgJmx0O29wdGlvbmFsPiB8IFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIHJlZ2lvbiBhcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgfFxuXHRcdFx0ICogICB8IHRleHQgfCBGdW5jdGlvbiB8ICB8ICZsdDtvcHRpb25hbD4gfCBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYW5kIHBlcmNlbnRhZ2Ugb2YgdGhlIG51bWJlciBvZiBlcG9jaHMgaW4gdGhpcyByZWdpb24uPGJyPlJldHVybiBhIHN0cmluZyB0byBwbGFjZSB0ZXh0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHJlZ2lvbi4gfFxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcblx0XHRcdCAqIEBuYW1lIHJlZ2lvbnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICByZWdpb25zOiBbXG5cdFx0XHQgKiAgICAgICB7XG5cdFx0XHQgKiAgICAgICAgICAgcG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2Vcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogNDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICBdLFxuXHRcdFx0ICogICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuXHRcdFx0ICogICAgICAgICAgICAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcblx0XHRcdCAqICAgICAgICAgICB9LFxuXHRcdFx0ICogICAgICAgICAgIG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG5cdFx0XHQgKiAgICAgICAgICAgY2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG5cdFx0XHQgKiAgICAgICB9LFxuXHRcdFx0ICogICAgICAgLi4uXG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0cmVnaW9uczogW11cblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5cbmltcG9ydCB7Z2V0UmFuZ2UsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuLi8uLi9tb2R1bGUvdXRpbFwiO1xuXG4vKipcbiAqIENoZWNrIGlmIHBvaW50IGlzIGluIHJlZ2lvblxuICogQHBhcmFtIHtvYmplY3R9IHBvaW50IFBvaW50XG4gKiBAcGFyYW0ge0FycmF5fSByZWdpb24gUmVnaW9uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbik6IGJvb2xlYW4geyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXG5cdC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcblx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XG5cdFx0Y29uc3QgeGkgPSByZWdpb25baV0ueDtcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xuXG5cdFx0Y29uc3QgeGogPSByZWdpb25bal0ueDtcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xuXG5cdFx0Y29uc3QgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcblxuXHRcdGlmIChpbnRlcnNlY3QpIHtcblx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc2lkZTtcbn1cblxuLyoqXG4gKiBDb21wYXJlIGVwb2Noc1xuICogQHBhcmFtIHtvYmplY3R9IGEgVGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gYiBTb3VyY2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb21wYXJlRXBvY2hzKGEsIGIpOiBudW1iZXIge1xuXHRpZiAoYS5lcG9jaHMgPCBiLmVwb2Nocykge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBHZXQgcmVnaW9uIGFyZWFcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cyk6IG51bWJlciB7IC8vIHRoYW5rcyB0bzogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYyODIzMzAvZmluZC1jZW50ZXJwb2ludC1vZi1wb2x5Z29uLWluLWphdmFzY3JpcHRcblx0bGV0IGFyZWEgPSAwO1xuXHRsZXQgcG9pbnQxO1xuXHRsZXQgcG9pbnQyO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRwb2ludDIgPSBwb2ludHNbal07XG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xuXHRcdGFyZWEgLT0gcG9pbnQxLnkgKiBwb2ludDIueDtcblx0fVxuXG5cdGFyZWEgLz0gMjtcblxuXHRyZXR1cm4gYXJlYTtcbn1cblxuLyoqXG4gKiBHZXQgY2VudHJvaWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcblx0Y29uc3QgYXJlYSA9IGdldFJlZ2lvbkFyZWEocG9pbnRzKTtcblxuXHRsZXQgeCA9IDA7XG5cdGxldCB5ID0gMDtcblx0bGV0IGY7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0Y29uc3QgcG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcblxuXHRcdGYgPSBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQyLnggKiBwb2ludDEueTtcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XG5cdFx0eSArPSAocG9pbnQxLnkgKyBwb2ludDIueSkgKiBmO1xuXHR9XG5cblx0ZiA9IGFyZWEgKiA2O1xuXG5cdHJldHVybiB7XG5cdFx0eDogeCAvIGYsXG5cdFx0eTogeSAvIGZcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0Y29tcGFyZUVwb2Nocyxcblx0Z2V0Q2VudHJvaWQsXG5cdGdldFJhbmdlLFxuXHRnZXRSZWdpb25BcmVhLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc1N0cmluZyxcblx0cGFyc2VEYXRlLFxuXHRwb2ludEluUmVnaW9uXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2dldENlbnRyb2lkLCBpc1N0cmluZywgcGFyc2VEYXRlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gZWxlbWVudCBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyB7XG5cdHByaXZhdGUgb3duZXI7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3Rcblx0XHRjb25zdCBlbGVtZW50cyA9IG93bmVyLiQkLiRlbC5tYWluLnNlbGVjdChcIi5iYi1jaGFydFwiKVxuXHRcdFx0LmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRFbGVtZW50cyk7XG5cblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZFJlZ2lvbnMpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtTGluZXNcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxuXHRcdFx0LnN0eWxlKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiZ2VvbWV0cmljcHJlY2lzaW9uXCIpXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZExpbmV9YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXIuYXBwZW5kKFwibGluZVwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZExpbmUgKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJsaW5lXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcIngxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTFcIikgOiB4dkN1c3RvbShkLCBcIngxXCIpKSlcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngxXCIpIDogeXZDdXN0b20oZCwgXCJ5MVwiKSkpXG5cdFx0XHQuYXR0cihcInkyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDJcIikgOiB5dkN1c3RvbShkLCBcInkyXCIpKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgY291bnRQb2ludHNJblJlZ2lvbiA9IHRoaXMub3duZXIuY291bnRFcG9jaHNJblJlZ2lvbi5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcblx0XHRsZXQgc3RhbmZvcmRSZWdpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb25zfWApXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbn1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwicG9seWdvblwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInRleHRcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XG5cblx0XHQvLyB1cGRhdGVcblx0XHRzdGFuZm9yZFJlZ2lvblxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkUmVnaW9uICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwicG9seWdvblwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJwb2ludHNcIiwgZCA9PiBkLnBvaW50cy5tYXAodmFsdWUgPT4gW1xuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcblx0XHRcdFx0aXNSb3RhdGVkID8geHZDdXN0b20odmFsdWUsIFwieFwiKSA6IHl2Q3VzdG9tKHZhbHVlLCBcInlcIilcblx0XHRcdF0uam9pbihcIixcIikpLmpvaW4oXCIgXCIpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBkID0+IFN0cmluZyhkLm9wYWNpdHkgPyBkLm9wYWNpdHkgOiAwLjIpKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcblx0XHRcdC5hdHRyKFwieVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSA6IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpKSlcblx0XHRcdC50ZXh0KGQgPT4ge1xuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3Qge3ZhbHVlLCBwZXJjZW50YWdlfSA9IGNvdW50UG9pbnRzSW5SZWdpb24oZC5wb2ludHMpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdH0pXG5cdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24gPSAwKTogdm9pZCB7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbik7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gJCQuc2NhbGUueTIgOiAkJC5zY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcbmltcG9ydCB7Zm9ybWF0IGFzIGQzRm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbCBhcyBkM1NjYWxlU2VxdWVudGlhbCwgc2NhbGVMb2cgYXMgZDNTY2FsZUxvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc0Z1bmN0aW9uLCBnZXRSYW5nZX0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xuXHRwcml2YXRlIG93bmVyO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cdH1cblxuXHRkcmF3Q29sb3JTY2FsZSgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCQsIGNvbmZpZ30gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblx0XHRjb25zdCBoZWlnaHQgPSAkJC5zdGF0ZS5oZWlnaHQgLSBjb25maWcucGFkZGluZ19ib3R0b20gLSBjb25maWcucGFkZGluZ190b3A7XG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XG5cdFx0Y29uc3QgYmFySGVpZ2h0ID0gNTtcblx0XHRjb25zdCBwb2ludHMgPSBnZXRSYW5nZShjb25maWcucGFkZGluZ19ib3R0b20sIGhlaWdodCwgYmFySGVpZ2h0KTtcblxuXHRcdGNvbnN0IGludmVyc2VTY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLCBwb2ludHNbMF1dKTtcblxuXHRcdGlmICh0aGlzLmNvbG9yU2NhbGUpIHtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5yZW1vdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSAkJC4kZWwuc3ZnLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLmNvbG9yU2NhbGUpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtjb25maWcucGFkZGluZ190b3B9KWApXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxuXHRcdFx0LmRhdGEocG9pbnRzKVxuXHRcdFx0LmVudGVyKClcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgZCA9PiBpbnZlcnNlU2NhbGUoZCkpO1xuXG5cdFx0Ly8gTGVnZW5kIEF4aXNcblx0XHRjb25zdCBheGlzU2NhbGUgPSBkM1NjYWxlTG9nKClcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxuXHRcdFx0LnJhbmdlKFtcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wICsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSArIGJhckhlaWdodCAtIDEsXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxuXHRcdFx0XSk7XG5cblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzY2FsZUZvcm1hdCkpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChkM0Zvcm1hdChcImRcIikpO1xuXHRcdH1cblxuXHRcdC8vIERyYXcgQXhpc1xuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7YmFyV2lkdGh9LDApYClcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxuXHRcdFx0XHQudGV4dChudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGQgPT4gZCAvIE1hdGgucG93KDEwLCBNYXRoLmNlaWwoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTAgLSAxZS0xMikpID09PSAxKSAvLyBQb3dlciBvZiBUZW5cblx0XHRcdFx0LnRleHQoMTApXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHQuYXR0cihcImR5XCIsIFwiLS43ZW1cIikgLy8gaHR0cHM6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay82NzM4MjI5XG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5zdGF0ZS5jdXJyZW50LndpZHRoIC0gdGhpcy54Rm9yQ29sb3JTY2FsZSgpfSwgMClgKTtcblx0fVxuXG5cdHhGb3JDb2xvclNjYWxlKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG5cdH1cblxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLnhGb3JDb2xvclNjYWxlKCkgKyB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX2xlZnQgKyAyMDtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XG5pbXBvcnQgQ29sb3JTY2FsZSBmcm9tIFwiLi9Db2xvclNjYWxlXCI7XG5pbXBvcnQge2NvbXBhcmVFcG9jaHMsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGUsIHBvaW50SW5SZWdpb259IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpblxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogICAtIElzIHByZWZlcmFibGUgdXNlIGBzY2F0dGVyYCBhcyBkYXRhLnR5cGVcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqICAgLSBbZDMtaW50ZXJwb2xhdGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1pbnRlcnBvbGF0ZSlcbiAqICAgLSBbZDMtY29sb3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1jb2xvcilcbiAqICAgLSBbZDMtc2NhbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZSlcbiAqICAgLSBbZDMtYnJ1c2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1icnVzaClcbiAqICAgLSBbZDMtYXhpc10oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWF4aXMpXG4gKiAgIC0gW2QzLWZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWZvcm1hdClcbiAqIEBjbGFzcyBwbHVnaW4tc3RhbmZvcmRcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1pbnRlcnBvbGF0ZVxuICogQHJlcXVpcmVzIGQzLWNvbG9yXG4gKiBAcmVxdWlyZXMgZDMtc2NhbGVcbiAqIEByZXF1aXJlcyBkMy1icnVzaFxuICogQHJlcXVpcmVzIGQzLWF4aXNcbiAqIEByZXF1aXJlcyBkMy1mb3JtYXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmR9XG4gKiBAZXhhbXBsZVxuICogLy8gUGx1Z2luIG11c3QgYmUgbG9hZGVkIGJlZm9yZSB0aGUgdXNlLlxuICogPHNjcmlwdCBzcmM9XCIkWU9VUl9QQVRIL3BsdWdpbi9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanNcIj48L3NjcmlwdD5cbiAqXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICAgICBjb2x1bW5zOiBbIC4uLiBdLFxuICogICAgICAgIHR5cGU6IFwic2NhdHRlclwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcbiAqICAgICAgICAgICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcbiAqICAgICAgICAgICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuICogICAgICAgICAgICksXG4gKiAgICAgICAgICAgZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdLFxuICogICAgICAgICAgIGxpbmVzOiBbXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cbiAqICAgICAgICAgICBdLFxuICogICAgICAgICAgIHNjYWxlOiB7XG4gKiAgICAgICAgICAgXHRtYXg6IDEwMDAwLFxuICogICAgICAgICAgICAgXHRtaW46IDEsXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxuICogICAgICAgICAgICAgXHRmb3JtYXQ6ICdwb3cxMCcsXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XG4gKiAgICAgICAgICAgXHR0b3A6IDE1LFxuICogICAgICAgICAgIFx0cmlnaHQ6IDAsXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXG4gKiAgICAgICAgICAgXHRsZWZ0OiAwXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgXHR7XG4gKiAgICAgICAgICAgICAgIFx0cG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2VcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogNDAsIHk6IDQwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogNDAgfVxuICogICAgICAgICAgICAgICBcdF0sXG4gKiAgICAgICAgICAgICAgIFx0dGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG4gKiAgICAgICAgICAgICAgIFx0ICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuICogICAgICAgICAgICAgICBcdH0sXG4gKiAgICAgICAgICAgICAgIFx0b3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcbiAqICAgICAgICAgICAgICAgXHRjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcbiAqICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgXHQuLi5cbiAqICAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFN0YW5mb3JkIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuZXNtXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XG5cdHByaXZhdGUgY29uZmlnO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cdHByaXZhdGUgZWxlbWVudHM7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGJlZm9yZUluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHQvLyBvdmVycmlkZSBvbiBjb25maWcgdmFsdWVzICYgbWV0aG9kc1xuXHRcdCQkLmNvbmZpZy5kYXRhX3hTb3J0ID0gZmFsc2U7XG5cdFx0JCQuaXNNdWx0aXBsZVggPSAoKSA9PiB0cnVlO1xuXHRcdCQkLnNob3dHcmlkRm9jdXMgPSAoKSA9PiB7fTtcblx0XHQkJC5sYWJlbGlzaERhdGEgPSBkID0+IGQudmFsdWVzO1xuXHRcdCQkLm9wYWNpdHlGb3JDaXJjbGUgPSAoKSA9PiAxO1xuXG5cdFx0Y29uc3QgZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQuYmluZCgkJCk7XG5cblx0XHQkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gKCkgPT4gKFxuXHRcdFx0Z2V0Q3VycmVudFBhZGRpbmdSaWdodCgpICsgKFxuXHRcdFx0XHR0aGlzLmNvbG9yU2NhbGUgPyB0aGlzLmNvbG9yU2NhbGUuZ2V0Q29sb3JTY2FsZVBhZGRpbmcoKSA6IDBcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcblxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXG5cdFx0dGhpcy4kcmVkcmF3KCk7XG5cdH1cblxuXHQkcmVkcmF3KGR1cmF0aW9uPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcblx0fVxuXG5cblx0Z2V0T3B0aW9ucygpOiBPcHRpb25zIHtcblx0XHRyZXR1cm4gbmV3IE9wdGlvbnMoKTtcblx0fVxuXG5cdGNvbnZlcnREYXRhKCk6IHZvaWQge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiQkLmRhdGEudGFyZ2V0cztcblx0XHRjb25zdCBlcG9jaHMgPSB0aGlzLm9wdGlvbnMuZXBvY2hzO1xuXG5cdFx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xuXHRcdFx0ZC52YWx1ZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHR2LmVwb2NocyA9IGVwb2Noc1tpXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkLm1pbkVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQubWF4RXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9yc2NhbGUgPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/IHNjYWxlLnkyIDogc2NhbGUueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxuXG5cdGluaXRTdGFuZm9yZERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xuXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcblxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xuXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xuXHR9XG5cblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XG5cdH1cblxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXMuJCQ7XG5cblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcblxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQoY29uZmlnLmRhdGFfeCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LngpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodi5pZCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LnZhbHVlKX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0ciBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcE5hbWV9LSR7di5pZH1cIj5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwibmFtZVwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2NvbG9yKHYpfVwiPjwvc3Bhbj4ke2RlZmF1bHRUaXRsZUZvcm1hdChcIkVwb2Noc1wiKX08L3RkPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYuZXBvY2hzKX08L3RkPlxuXHRcdFx0XHRcdFx0PC90cj5gO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gYCR7aHRtbH08L3Rib2R5PjwvdGFibGU+YDtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Y291bnRFcG9jaHNJblJlZ2lvbihyZWdpb24pOiB7dmFsdWU6IG51bWJlciwgcGVyY2VudGFnZTogbnVtYmVyfSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdGNvbnN0IHRvdGFsID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+XG5cdFx0XHRhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKSwgMCk7XG5cblx0XHRjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiB7XG5cdFx0XHRpZiAocG9pbnRJblJlZ2lvbihjdXJyZW50VmFsdWUsIHJlZ2lvbikpIHtcblx0XHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdFx0fSwgMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWUsXG5cdFx0XHRwZXJjZW50YWdlOiB2YWx1ZSAhPT0gMCA/ICsodmFsdWUgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgxKSA6IDBcblx0XHR9O1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzNfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMik7XG4iXSwic291cmNlUm9vdCI6IiJ9