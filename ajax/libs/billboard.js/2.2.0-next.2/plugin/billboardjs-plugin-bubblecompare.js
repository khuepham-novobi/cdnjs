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
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ BubbleCompare
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
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
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

;// CONCATENATED MODULE: ./src/Plugin/bubblecompare/index.ts




/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare = /*#__PURE__*/function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.$$ = void 0, _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(BubbleCompare, _Plugin);

  var _proto = BubbleCompare.prototype;
  return _proto.$init = function $init() {
    var $$ = this.$$;
    $$.findClosest = this.findClosest.bind(this), $$.getBubbleR = this.getBubbleR.bind(this), $$.pointExpandedR = this.pointExpandedR.bind(this);
  }, _proto.pointExpandedR = function pointExpandedR(d) {
    var baseR = this.getBubbleR(d),
        _this$options$expandS = this.options.expandScale,
        expandScale = _this$options$expandS === void 0 ? 1 : _this$options$expandS;
    return BubbleCompare.raiseFocusedBubbleLayer(d), this.changeCursorPoint(), baseR * expandScale;
  }, BubbleCompare.raiseFocusedBubbleLayer = function raiseFocusedBubbleLayer(d) {
    d.raise && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(d.node().parentNode.parentNode).raise();
  }, _proto.changeCursorPoint = function changeCursorPoint() {
    this.$$.$el.svg.select(".bb-event-rect").style("cursor", "pointer");
  }, _proto.findClosest = function findClosest(values, pos) {
    var _this2 = this,
        $$ = this.$$;

    return values.filter(function (v) {
      return v && !$$.isBarType(v.id);
    }).reduce(function (acc, cur) {
      var d = $$.dist(cur, pos);
      return d < _this2.getBubbleR(cur) ? cur : acc;
    }, 0);
  }, _proto.getBubbleR = function getBubbleR(d) {
    var _this3 = this,
        _this$options = this.options,
        minR = _this$options.minR,
        maxR = _this$options.maxR,
        curVal = this.getZData(d);

    if (!curVal) return minR;

    var _this$$$$data$targets = this.$$.data.targets.reduce(function (_ref, cur) {
      var accMin = _ref[0],
          accMax = _ref[1],
          val = _this3.getZData(cur.values[0]);

      return [Math.min(accMin, val), Math.max(accMax, val)];
    }, [1e4, 0]),
        min = _this$$$$data$targets[0],
        max = _this$$$$data$targets[1],
        size = min > 0 && max === min ? 0 : curVal / max;

    return Math.abs(size) * (maxR - minR) + minR;
  }, _proto.getZData = function getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }, BubbleCompare;
}(Plugin);

BubbleCompare.version = "0.0.1";


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

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
/******/ 	return __webpack_require__(0);
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2luaGVyaXRzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vUGx1Z2luLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL2J1YmJsZWNvbXBhcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2VsZWN0aW9uXCIsXCJjb21tb25qczJcIjpcImQzLXNlbGVjdGlvblwiLFwiYW1kXCI6XCJkMy1zZWxlY3Rpb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIlBsdWdpbiIsIm9wdGlvbnMiLCIkJCIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidmVyc2lvbiIsIkJ1YmJsZUNvbXBhcmUiLCJmaW5kQ2xvc2VzdCIsImJpbmQiLCJnZXRCdWJibGVSIiwicG9pbnRFeHBhbmRlZFIiLCJkIiwiYmFzZVIiLCJleHBhbmRTY2FsZSIsInJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyIiwiY2hhbmdlQ3Vyc29yUG9pbnQiLCJyYWlzZSIsImQzU2VsZWN0Iiwibm9kZSIsInBhcmVudE5vZGUiLCIkZWwiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsInZhbHVlcyIsInBvcyIsImZpbHRlciIsInYiLCJpc0JhclR5cGUiLCJpZCIsInJlZHVjZSIsImFjYyIsImN1ciIsImRpc3QiLCJtaW5SIiwibWF4UiIsImN1clZhbCIsImdldFpEYXRhIiwiZGF0YSIsInRhcmdldHMiLCJhY2NNaW4iLCJhY2NNYXgiLCJ2YWwiLCJNYXRoIiwibWluIiwibWF4Iiwic2l6ZSIsImFicyIsImlzQnViYmxlWlR5cGUiLCJnZXRCdWJibGVaRGF0YSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7O0FDVmU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOztBQ05lO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTTtBQUtwQjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Msa0JBQVlDLE9BQVosRUFBMEI7QUFBZEEsV0FBYyxnQkFBZEEsT0FBYyxHQUFKLEVBQUksUUFUbkJDLEVBU21CLGdCQVJuQkQsT0FRbUIsV0FDekIsS0FBS0EsT0FBTCxHQUFlQSxPQURVO0FBRXpCO0FBRUQ7QUFDRDtBQUNBO0FBQ0E7Ozs7Z0JBQ0NFLFcsR0FBQSx1QkFBYyxDQUFFO0FBRWhCO0FBQ0Q7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RyxRLEdBQUEsa0JBQVMxQixDQUFULEVBQW9CO0FBQ25CLFdBQU8sS0FBS2hCLEVBQUwsQ0FBUXFELGFBQVIsQ0FBc0JyQyxDQUF0QixJQUNOLEtBQUtoQixFQUFMLENBQVFzRCxjQUFSLENBQXVCdEMsQ0FBQyxDQUFDdUMsS0FBekIsRUFBZ0MsR0FBaEMsQ0FETSxHQUVOdkMsQ0FBQyxDQUFDdUMsS0FGSDtBQUdBLEc7RUF2RXlDekQsTTs7QUFBdEJhLGEsQ0FDYkQsTzs7Ozs7OztBQzlDUixnRDs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYlwiLCBbXCJkMy1zZWxlY3Rpb25cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX18pIHtcbnJldHVybiAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjIuMC1uZXh0LjFcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwiaW1wb3J0IHtzZWxlY3QgYXMgZDNTZWxlY3R9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuXG4vKipcbiAqIEJ1YmJsZSBjb21wYXJlIGRpYWdyYW0gcGx1Z2luLjxicj5cbiAqIENvbXBhcmUgZGF0YSAzLWRpbWVuc2lvbmFsIHdheXM6IHgtYXhpcywgeS1heGlzICYgYnViYmxlLXNpemUuXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiBAY2xhc3MgcGx1Z2luLWJ1YmJsZWNvbXBhcmVcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIGJ1YmJsZSBjb21wYXJlIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7QnViYmxlQ29tcGFyZX1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi1idWJibGVjb21wYXJlLmpzXCI+PC9zY3JpcHQ+XG4gKlxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgICAgY29sdW1uczogWyAuLi4gXSxcbiAqICAgICAgICB0eXBlOiBcImJ1YmJsZVwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLmJ1YmJsZWNvbXBhcmUoe1xuICogICAgICAgICAgbWluUjogMTEsXG4gKiAgICAgICAgICBtYXhSOiA3NCxcbiAqICAgICAgICAgIGV4cGFuZFNjYWxlOiAxLjFcbiAqICAgICAgICB9KSxcbiAqICAgICBdXG4gKiAgfSk7XG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IEJ1YmJsZUNvbXBhcmUgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1idWJibGVjb21wYXJlLmVzbVwiO1xuICpcbiAqIGJiLmdlbmVyYXRlKHtcbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IEJ1YmJsZUNvbXBhcmUoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1YmJsZUNvbXBhcmUgZXh0ZW5kcyBQbHVnaW4ge1xuXHRzdGF0aWMgdmVyc2lvbiA9IGAwLjAuMWA7XG5cdHB1YmxpYyAkJDtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRpbml0KCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXG5cdFx0JCQuZmluZENsb3Nlc3QgPSB0aGlzLmZpbmRDbG9zZXN0LmJpbmQodGhpcyk7XG5cdFx0JCQuZ2V0QnViYmxlUiA9IHRoaXMuZ2V0QnViYmxlUi5iaW5kKHRoaXMpO1xuXHRcdCQkLnBvaW50RXhwYW5kZWRSID0gdGhpcy5wb2ludEV4cGFuZGVkUi5iaW5kKHRoaXMpO1xuXHR9XG5cblx0cG9pbnRFeHBhbmRlZFIoZCk6IG51bWJlciB7XG5cdFx0Y29uc3QgYmFzZVIgPSB0aGlzLmdldEJ1YmJsZVIoZCk7XG5cdFx0Y29uc3Qge2V4cGFuZFNjYWxlID0gMX0gPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRCdWJibGVDb21wYXJlLnJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyKGQpO1xuXHRcdHRoaXMuY2hhbmdlQ3Vyc29yUG9pbnQoKTtcblxuXHRcdHJldHVybiBiYXNlUiAqIGV4cGFuZFNjYWxlO1xuXHR9XG5cblx0c3RhdGljIHJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyKGQpOiB2b2lkIHtcblx0XHRkLnJhaXNlICYmIGQzU2VsZWN0KGQubm9kZSgpLnBhcmVudE5vZGUucGFyZW50Tm9kZSkucmFpc2UoKTtcblx0fVxuXG5cdGNoYW5nZUN1cnNvclBvaW50KCk6IHZvaWQge1xuXHRcdHRoaXMuJCQuJGVsLnN2Zy5zZWxlY3QoYC5iYi1ldmVudC1yZWN0YCkuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xuXHR9XG5cblx0ZmluZENsb3Nlc3QodmFsdWVzLCBwb3MpOiBudW1iZXIge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXG5cdFx0cmV0dXJuIHZhbHVlc1xuXHRcdFx0LmZpbHRlcih2ID0+IHYgJiYgISQkLmlzQmFyVHlwZSh2LmlkKSlcblx0XHRcdC5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGQgPSAkJC5kaXN0KGN1ciwgcG9zKTtcblxuXHRcdFx0XHRyZXR1cm4gZCA8IHRoaXMuZ2V0QnViYmxlUihjdXIpID8gY3VyIDogYWNjO1xuXHRcdFx0fSwgMCk7XG5cdH1cblxuXHRnZXRCdWJibGVSKGQpOiBudW1iZXIge1xuXHRcdGNvbnN0IHttaW5SLCBtYXhSfSA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBjdXJWYWwgPSB0aGlzLmdldFpEYXRhKGQpO1xuXG5cdFx0aWYgKCFjdXJWYWwpIHJldHVybiBtaW5SO1xuXG5cdFx0Y29uc3QgW21pbiwgbWF4XSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzLnJlZHVjZShcblx0XHRcdChbYWNjTWluLCBhY2NNYXhdLCBjdXIpID0+IHtcblx0XHRcdFx0Y29uc3QgdmFsID0gdGhpcy5nZXRaRGF0YShjdXIudmFsdWVzWzBdKTtcblxuXHRcdFx0XHRyZXR1cm4gW01hdGgubWluKGFjY01pbiwgdmFsKSwgTWF0aC5tYXgoYWNjTWF4LCB2YWwpXTtcblx0XHRcdH0sXG5cdFx0XHRbMTAwMDAsIDBdXG5cdFx0KTtcblx0XHRjb25zdCBzaXplID0gbWluID4gMCAmJiBtYXggPT09IG1pbiA/IDAgOiBjdXJWYWwgLyBtYXg7XG5cblx0XHRyZXR1cm4gTWF0aC5hYnMoc2l6ZSkgKiAobWF4UiAtIG1pblIpICsgbWluUjtcblx0fVxuXG5cdGdldFpEYXRhKGQpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLiQkLmlzQnViYmxlWlR5cGUoZCkgP1xuXHRcdFx0dGhpcy4kJC5nZXRCdWJibGVaRGF0YShkLnZhbHVlLCBcInpcIikgOlxuXHRcdFx0ZC52YWx1ZTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==