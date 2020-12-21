'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echartsLib = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
var constants = require('./constants');
var utilsLite = require('utils-lite');
var numerify = _interopDefault(require('numerify'));

var Loading = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
  }, staticRenderFns: []
};

var DataEmpty = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
  }, staticRenderFns: []
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var STATIC_PROPS = ['initOptions', 'loading', 'dataEmpty', 'judgeWidth', 'widthChangeDelay'];

var core = {
  render: function render(h) {
    return h('div', {
      class: [utilsLite.camelToKebab(this.$options.name || this.$options._componentTag)],
      style: this.canvasStyle
    }, [h('div', {
      style: this.canvasStyle,
      ref: 'canvas'
    }), h(DataEmpty, {
      style: { display: this.dataEmpty ? '' : 'none' }
    }), h(Loading, {
      style: { display: this.loading ? '' : 'none' }
    }), this.$slots.default]);
  },


  props: {
    data: { type: [Object, Array], default: function _default() {
        return {};
      }
    },
    settings: { type: Object, default: function _default() {
        return {};
      }
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    afterSetOption: { type: Function },
    afterSetOptionOnce: { type: Function },
    events: { type: Object },
    grid: { type: [Object, Array] },
    colors: { type: Array },
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    legendPosition: { type: String },
    markLine: { type: Object },
    markArea: { type: Object },
    markPoint: { type: Object },
    visualMap: { type: [Object, Array] },
    dataZoom: { type: [Object, Array] },
    toolbox: { type: [Object, Array] },
    initOptions: { type: Object, default: function _default() {
        return {};
      }
    },
    title: [Object, Array],
    legend: [Object, Array],
    xAxis: [Object, Array],
    yAxis: [Object, Array],
    radar: Object,
    tooltip: Object,
    axisPointer: [Object, Array],
    brush: [Object, Array],
    geo: [Object, Array],
    timeline: [Object, Array],
    graphic: [Object, Array],
    series: [Object, Array],
    backgroundColor: [Object, String],
    textStyle: [Object, Array],
    animation: Object,
    theme: Object,
    themeName: String,
    loading: Boolean,
    dataEmpty: Boolean,
    extend: Object,
    judgeWidth: { type: Boolean, default: false },
    widthChangeDelay: { type: Number, default: 300 },
    tooltipFormatter: { type: Function },
    resizeable: { type: Boolean, default: true },
    resizeDelay: { type: Number, default: 200 },
    changeDelay: { type: Number, default: 0 },
    setOptionOpts: { type: [Boolean, Object], default: true }
  },

  watch: {
    data: {
      deep: true,
      handler: function handler(v) {
        if (v) {
          this.changeHandler();
        }
      }
    },

    settings: {
      deep: true,
      handler: function handler(v) {
        if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
        this.changeHandler();
      }
    },

    width: 'nextTickResize',
    height: 'nextTickResize',

    events: {
      deep: true,
      handler: function handler() {
        this.createEventProxy();
      }
    },

    theme: {
      deep: true,
      handler: function handler(v) {
        this.themeChange(v);
      }
    },

    themeName: function themeName(v) {
      this.themeChange(v);
    }
  },

  computed: {
    canvasStyle: function canvasStyle() {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      };
    },
    chartColor: function chartColor() {
      return this.colors || this.theme && this.theme.color || constants.DEFAULT_COLORS;
    }
  },

  methods: {
    dataHandler: function dataHandler() {
      if (!this.chartHandler) return;
      var data = this.data;
      var _data = data,
          _data$columns = _data.columns,
          columns = _data$columns === undefined ? [] : _data$columns,
          _data$rows = _data.rows,
          rows = _data$rows === undefined ? [] : _data$rows;

      var extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        echarts: this.echarts,
        color: this.chartColor,
        tooltipFormatter: this.tooltipFormatter,
        _once: this._once
      };
      if (this.beforeConfig) data = this.beforeConfig(data);

      var options = this.chartHandler(columns, rows, this.settings, extra);
      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler);
        } else {
          this.optionsHandler(options);
        }
      }
    },
    nextTickResize: function nextTickResize() {
      var _this = this;

      this.$nextTick(function (_) {
        _this.echarts.resize();
      });
    },
    resize: function resize() {
      this.echarts.resize();
    },
    optionsHandler: function optionsHandler(options) {
      var _this2 = this;

      if (this.legendPosition && options.legend) {
        options.legend[this.legendPosition] = 10;
        if (~['left', 'right'].indexOf(this.legendPosition)) {
          options.legend.top = 'middle';
          options.legend.orient = 'vertical';
        }
      }
      if (!this.themeName) options.color = this.chartColor;
      var echartsSettings = ['grid', 'dataZoom', 'visualMap', 'toolbox', 'title', 'legend', 'xAxis', 'yAxis', 'radar', 'tooltip', 'axisPointer', 'brush', 'geo', 'timeline', 'graphic', 'series', 'backgroundColor', 'textStyle'];
      echartsSettings.forEach(function (setting) {
        if (_this2[setting]) options[setting] = _this2[setting];
      });
      if (this.animation) {
        Object.keys(this.animation).forEach(function (key) {
          options[key] = _this2.animation[key];
        });
      }
      if (this.markArea || this.markLine || this.markPoint) {
        var marks = {
          markArea: this.markArea,
          markLine: this.markLine,
          markPoint: this.markPoint
        };
        var series = options.series;
        if (utilsLite.getType(series) === '[object Array]') {
          series.forEach(function (item) {
            _this2.addMark(item, marks);
          });
        } else if (utilsLite.getType(series) === '[object Object]') {
          this.addMark(series, marks);
        }
      }

      // extend sub attribute
      if (this.extend) {
        Object.keys(this.extend).forEach(function (attr) {
          var value = _this2.extend[attr];
          if (~attr.indexOf('.')) {
            // eg: a.b.c a.1.b
            utilsLite.set(options, attr, value);
          } else if (typeof value === 'function') {
            // get callback value
            options[attr] = value(options[attr]);
          } else {
            // mixin extend value
            if (utilsLite.isArray(options[attr]) && utilsLite.isObject(options[attr][0])) {
              // eg: [{ xx: 1 }, { xx: 2 }]
              options[attr].forEach(function (option, index) {
                options[attr][index] = _extends({}, option, value);
              });
            } else if (utilsLite.isObject(options[attr])) {
              // eg: { xx: 1, yy: 2 }
              options[attr] = _extends({}, options[attr], value);
            } else {
              options[attr] = value;
            }
          }
        });
      }

      if (this.afterConfig) options = this.afterConfig(options);
      var setOptionOpts = this.setOptionOpts;
      if (this.settings.bmap || this.settings.amap) setOptionOpts = false;
      this.echarts.setOption(options, setOptionOpts);
      this.$emit('ready', this.echarts);
      if (!this._once['ready-once']) {
        this._once['ready-once'] = true;
        this.$emit('ready-once', this.echarts);
      }
      if (this.judgeWidth) this.judgeWidthHandler(options);
      if (this.afterSetOption) this.afterSetOption(this.echarts);
      if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
        this._once['afterSetOptionOnce'] = true;
        this.afterSetOptionOnce(this.echarts);
      }
    },
    judgeWidthHandler: function judgeWidthHandler(options) {
      var _this3 = this;

      var echarts = this.echarts,
          widthChangeDelay = this.widthChangeDelay;

      if (this.$el.clientWidth) {
        echarts && echarts.resize();
      } else {
        this.$nextTick(function (_) {
          if (_this3.$el.clientWidth) {
            echarts && echarts.resize();
          } else {
            setTimeout(function (_) {
              echarts && echarts.resize();
              if (!_this3.$el.clientWidth) {
                console.warn(' Can\'t get dom width or height ');
              }
            }, widthChangeDelay);
          }
        });
      }
    },
    addMark: function addMark(seriesItem, marks) {
      Object.keys(marks).forEach(function (key) {
        if (marks[key]) {
          seriesItem[key] = marks[key];
        }
      });
    },
    init: function init() {
      if (this.echarts) return;
      var themeName = this.themeName || this.theme || constants.DEFAULT_THEME;
      this.echarts = echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
      if (this.data) this.changeHandler();
      this.createEventProxy();
      if (this.resizeable) window.addEventListener('resize', this.resizeHandler);
    },
    addWatchToProps: function addWatchToProps() {
      var _this4 = this;

      var watchedVariable = this._watchers.map(function (watcher) {
        return watcher.expression;
      });
      Object.keys(this.$props).forEach(function (prop) {
        if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
          var opts = {};
          if (~['[object Object]', '[object Array]'].indexOf(utilsLite.getType(_this4.$props[prop]))) {
            opts.deep = true;
          }
          _this4.$watch(prop, function () {
            _this4.changeHandler();
          }, opts);
        }
      });
    },
    createEventProxy: function createEventProxy() {
      var _this5 = this;

      // 只要用户使用 on 方法绑定的事件都做一层代理，
      // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
      // 实现 events 的动态响应
      var self = this;
      var keys = Object.keys(this.events || {});
      keys.length && keys.forEach(function (ev) {
        if (_this5.registeredEvents.indexOf(ev) === -1) {
          _this5.registeredEvents.push(ev);
          _this5.echarts.on(ev, function (ev) {
            return function () {
              if (ev in self.events) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                self.events[ev].apply(null, args);
              }
            };
          }(ev));
        }
      });
    },
    themeChange: function themeChange(theme) {
      this.clean();
      this.echarts = null;
      this.init();
    },
    clean: function clean() {
      if (this.resizeable) window.removeEventListener('resize', this.resizeHandler);
      this.echarts.dispose();
    }
  },

  created: function created() {
    var _this6 = this;

    this.echarts = null;
    this.registeredEvents = [];
    this._once = {};
    this.resizeHandler = utilsLite.debounce(function (_) {
      _this6.echarts && _this6.echarts.resize();
    }, this.resizeDelay);
    this.changeHandler = utilsLite.debounce(function (_) {
      _this6.dataHandler();
    }, this.changeDelay);
    this.addWatchToProps();
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.clean();
  },


  _numerify: numerify
};

module.exports = core;
