(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Navigo", [], factory);
	else if(typeof exports === 'object')
		exports["Navigo"] = factory();
	else
		root["Navigo"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Q.ts":
/*!******************!*\
  !*** ./src/Q.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Q
/* harmony export */ });
function Q(funcs, c, done) {
  var context = c || {};
  var idx = 0;

  (function next() {
    if (!funcs[idx]) {
      if (done) {
        done(context);
      }

      return;
    }

    if (Array.isArray(funcs[idx])) {
      funcs.splice.apply(funcs, [idx, 1].concat(funcs[idx][0](context) ? funcs[idx][1] : funcs[idx][2]));
      next();
    } else {
      // console.log(funcs[idx].name + " / " + JSON.stringify(context));
      // console.log(funcs[idx].name);
      funcs[idx](context, function (moveForward) {
        if (typeof moveForward === "undefined" || moveForward === true) {
          idx += 1;
          next();
        } else if (done) {
          done(context);
        }
      });
    }
  })();
}

Q.if = function (condition, one, two) {
  if (!Array.isArray(one)) one = [one];
  if (!Array.isArray(two)) two = [two];
  return [condition, one, two];
};

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PARAMETER_REGEXP": () => /* binding */ PARAMETER_REGEXP,
/* harmony export */   "REPLACE_VARIABLE_REGEXP": () => /* binding */ REPLACE_VARIABLE_REGEXP,
/* harmony export */   "WILDCARD_REGEXP": () => /* binding */ WILDCARD_REGEXP,
/* harmony export */   "REPLACE_WILDCARD": () => /* binding */ REPLACE_WILDCARD,
/* harmony export */   "NOT_SURE_REGEXP": () => /* binding */ NOT_SURE_REGEXP,
/* harmony export */   "REPLACE_NOT_SURE": () => /* binding */ REPLACE_NOT_SURE,
/* harmony export */   "START_BY_SLASH_REGEXP": () => /* binding */ START_BY_SLASH_REGEXP,
/* harmony export */   "MATCH_REGEXP_FLAGS": () => /* binding */ MATCH_REGEXP_FLAGS
/* harmony export */ });
var PARAMETER_REGEXP = /([:*])(\w+)/g;
var REPLACE_VARIABLE_REGEXP = "([^/]+)";
var WILDCARD_REGEXP = /\*/g;
var REPLACE_WILDCARD = "?(?:.*)";
var NOT_SURE_REGEXP = /\/\?/g;
var REPLACE_NOT_SURE = "/?([^/]+|)";
var START_BY_SLASH_REGEXP = "(?:/^|^)";
var MATCH_REGEXP_FLAGS = "";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Navigo
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Q__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Q */ "./src/Q.ts");
/* harmony import */ var _middlewares_setLocationPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middlewares/setLocationPath */ "./src/middlewares/setLocationPath.ts");
/* harmony import */ var _middlewares_matchPathToRegisteredRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/matchPathToRegisteredRoutes */ "./src/middlewares/matchPathToRegisteredRoutes.ts");
/* harmony import */ var _middlewares_checkForDeprecationMethods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares/checkForDeprecationMethods */ "./src/middlewares/checkForDeprecationMethods.ts");
/* harmony import */ var _middlewares_checkForForceOp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/checkForForceOp */ "./src/middlewares/checkForForceOp.ts");
/* harmony import */ var _middlewares_updateBrowserURL__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middlewares/updateBrowserURL */ "./src/middlewares/updateBrowserURL.ts");
/* harmony import */ var _middlewares_processMatches__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares/processMatches */ "./src/middlewares/processMatches.ts");
/* harmony import */ var _lifecycles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lifecycles */ "./src/lifecycles.ts");









function Navigo(appRoute, resolveOptions) {
  var DEFAULT_RESOLVE_OPTIONS = resolveOptions || {
    strategy: "ONE",
    hash: false,
    noMatchWarning: false
  };
  var self = this;
  var root = "/";
  var current = null;
  var routes = [];
  var destroyed = false;
  var genericHooks;
  var isPushStateAvailable = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pushStateAvailable)();
  var isWindowAvailable = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.windowAvailable)();

  if (!appRoute) {
    console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');
  } else {
    root = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(appRoute);
  }

  function _checkForAHash(url) {
    if (url.indexOf("#") >= 0) {
      if (DEFAULT_RESOLVE_OPTIONS.hash === true) {
        url = url.split("#")[1] || "/";
      } else {
        url = url.split("#")[0];
      }
    }

    return url;
  }

  function composePathWithRoot(path) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(root + "/" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(path));
  }

  function createRoute(path, handler, hooks, name) {
    path = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(path) ? composePathWithRoot(path) : path;
    return {
      name: name || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(String(path)),
      path: path,
      handler: handler,
      hooks: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.accumulateHooks)(hooks)
    };
  } // public APIs


  function on(path, handler, hooks) {
    var _this = this;

    if (typeof path === "object" && !(path instanceof RegExp)) {
      Object.keys(path).forEach(function (p) {
        if (typeof path[p] === "function") {
          _this.on(p, path[p]);
        } else {
          var _path$p = path[p],
              _handler = _path$p.uses,
              name = _path$p.as,
              _hooks = _path$p.hooks;
          routes.push(createRoute(p, _handler, [genericHooks, _hooks], name));
        }
      });
      return this;
    } else if (typeof path === "function") {
      hooks = handler;
      handler = path;
      path = root;
    }

    routes.push(createRoute(path, handler, [genericHooks, hooks]));
    return this;
  }

  function resolve(to, options) {
    var context = {
      instance: self,
      currentLocationPath: to ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(root) + "/" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(to) : undefined,
      navigateOptions: {},
      resolveOptions: options || DEFAULT_RESOLVE_OPTIONS
    };
    (0,_Q__WEBPACK_IMPORTED_MODULE_1__.default)([_middlewares_setLocationPath__WEBPACK_IMPORTED_MODULE_2__.default, _middlewares_matchPathToRegisteredRoutes__WEBPACK_IMPORTED_MODULE_3__.default, _Q__WEBPACK_IMPORTED_MODULE_1__.default.if(function (_ref) {
      var matches = _ref.matches;
      // console.log(`${currentLocationPath} -> Matches: ${matches.length}`);
      return matches && matches.length > 0;
    }, _middlewares_processMatches__WEBPACK_IMPORTED_MODULE_7__.default, _lifecycles__WEBPACK_IMPORTED_MODULE_8__.notFoundLifeCycle)], context);
    return context.matches ? context.matches : false;
  }

  function navigate(to, navigateOptions) {
    to = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(root) + "/" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(to);
    var context = {
      instance: self,
      to: to,
      navigateOptions: navigateOptions || {},
      resolveOptions: navigateOptions && navigateOptions.resolveOptions ? navigateOptions.resolveOptions : DEFAULT_RESOLVE_OPTIONS,
      currentLocationPath: _checkForAHash(to)
    };
    (0,_Q__WEBPACK_IMPORTED_MODULE_1__.default)([_middlewares_checkForDeprecationMethods__WEBPACK_IMPORTED_MODULE_4__.default, _middlewares_checkForForceOp__WEBPACK_IMPORTED_MODULE_5__.default, _middlewares_matchPathToRegisteredRoutes__WEBPACK_IMPORTED_MODULE_3__.default, _Q__WEBPACK_IMPORTED_MODULE_1__.default.if(function (_ref2) {
      var matches = _ref2.matches;
      return matches && matches.length > 0;
    }, _middlewares_processMatches__WEBPACK_IMPORTED_MODULE_7__.default, _lifecycles__WEBPACK_IMPORTED_MODULE_8__.notFoundLifeCycle), _middlewares_updateBrowserURL__WEBPACK_IMPORTED_MODULE_6__.default], context);
  }

  function off(what) {
    this.routes = routes = routes.filter(function (r) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(what)) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(r.path) !== (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(what);
      } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction)(what)) {
        return what !== r.handler;
      }

      return String(r.path) !== String(what);
    });
    return this;
  }

  function listen() {
    if (isPushStateAvailable) {
      this.__popstateListener = function () {
        resolve();
      };

      window.addEventListener("popstate", this.__popstateListener);
    }
  }

  function destroy() {
    this.routes = routes = [];

    if (isPushStateAvailable) {
      window.removeEventListener("popstate", this.__popstateListener);
    }

    this.destroyed = destroyed = true;
  }

  function notFound(handler, hooks) {
    self._notFoundRoute = createRoute("*", handler, [genericHooks, hooks], "__NOT_FOUND__");
    return this;
  }

  function updatePageLinks() {
    if (!isWindowAvailable) return;
    findLinks().forEach(function (link) {
      if ("false" === link.getAttribute("data-navigo") || "_blank" === link.getAttribute("target")) {
        if (link.hasListenerAttached) {
          link.removeEventListener("click", link.navigoHandler);
        }

        return;
      }

      if (!link.hasListenerAttached) {
        link.hasListenerAttached = true;

        link.navigoHandler = function (e) {
          if ((e.ctrlKey || e.metaKey) && e.target.tagName.toLowerCase() === "a") {
            return false;
          }

          var location = link.getAttribute("href");

          if (typeof location === "undefined" || location === null) {
            return false;
          } // handling absolute paths


          if (location.match(/^(http|https)/) && typeof URL !== "undefined") {
            try {
              var u = new URL(location);
              location = u.pathname + u.search;
            } catch (err) {}
          }

          var options = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parseNavigateOptions)(link.getAttribute("data-navigo-options"));

          if (!destroyed) {
            e.preventDefault();
            e.stopPropagation();
            self.navigate((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(location), options);
          }
        };

        link.addEventListener("click", link.navigoHandler);
      }
    });
    return self;
  }

  function findLinks() {
    if (isWindowAvailable) {
      return [].slice.call(document.querySelectorAll("[data-navigo]"));
    }

    return [];
  }

  function link(path) {
    return "/" + root + "/" + (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(path);
  }

  function setGenericHooks(hooks) {
    genericHooks = hooks;
    return this;
  }

  function lastResolved() {
    return current;
  }

  function generate(name, data) {
    var result = routes.reduce(function (result, route) {
      var key;

      if (route.name === name) {
        result = route.path;

        for (key in data) {
          result = result.replace(":" + key, data[key]);
        }
      }

      return result;
    }, "");
    return !result.match(/^\//) ? "/" + result : result;
  }

  function getLinkPath(link) {
    return link.getAttribute("href");
  }

  function pathToMatchObject(path) {
    var _extractGETParameters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.extractGETParameters)((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(path)),
        url = _extractGETParameters[0],
        queryString = _extractGETParameters[1];

    var params = queryString === "" ? null : (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parseQuery)(queryString);
    var route = createRoute(url, function () {}, [genericHooks], url);
    return {
      url: url,
      queryString: queryString,
      route: route,
      data: null,
      params: params
    };
  }

  function getCurrentLocation() {
    return pathToMatchObject((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentEnvURL)(root)).replace(new RegExp("^" + root), ""));
  }

  function directMatchWithRegisteredRoutes(path) {
    var context = {
      instance: self,
      currentLocationPath: path,
      navigateOptions: {},
      resolveOptions: DEFAULT_RESOLVE_OPTIONS
    };
    (0,_middlewares_matchPathToRegisteredRoutes__WEBPACK_IMPORTED_MODULE_3__.default)(context, function () {});
    return context.matches ? context.matches : false;
  }

  function directMatchWithLocation(path, currentLocation) {
    var context = {
      instance: self,
      currentLocationPath: currentLocation
    };
    (0,_middlewares_setLocationPath__WEBPACK_IMPORTED_MODULE_2__.default)(context, function () {});
    path = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(path);
    var match = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.matchRoute)(context.currentLocationPath, {
      name: path,
      path: path,
      handler: function handler() {},
      hooks: {}
    });
    return match ? match : false;
  }

  function addHook(type, route, func) {
    if (typeof route === "string") {
      route = getRoute(route);
    }

    if (route) {
      if (!route.hooks[type]) route.hooks[type] = [];
      route.hooks[type].push(func);
      return function () {
        route.hooks[type] = route.hooks[type].filter(function (f) {
          return f !== func;
        });
      };
    } else {
      console.warn("Route doesn't exists: " + route);
    }

    return function () {};
  }

  function getRoute(nameOrHandler) {
    if (typeof nameOrHandler === "string") {
      return routes.find(function (r) {
        return r.name === composePathWithRoot(nameOrHandler);
      });
    }

    return routes.find(function (r) {
      return r.handler === nameOrHandler;
    });
  }

  this.root = root;
  this.routes = routes;
  this.destroyed = destroyed;
  this.current = current;
  this.on = on;
  this.off = off;
  this.resolve = resolve;
  this.navigate = navigate;
  this.destroy = destroy;
  this.notFound = notFound;
  this.updatePageLinks = updatePageLinks;
  this.link = link;
  this.hooks = setGenericHooks;

  this.extractGETParameters = function (url) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.extractGETParameters)(_checkForAHash(url));
  };

  this.lastResolved = lastResolved;
  this.generate = generate;
  this.getLinkPath = getLinkPath;
  this.match = directMatchWithRegisteredRoutes;
  this.matchLocation = directMatchWithLocation;
  this.getCurrentLocation = getCurrentLocation;
  this.addBeforeHook = addHook.bind(this, "before");
  this.addAfterHook = addHook.bind(this, "after");
  this.addAlreadyHook = addHook.bind(this, "already");
  this.addLeaveHook = addHook.bind(this, "leave");
  this.getRoute = getRoute;
  this._pathToMatchObject = pathToMatchObject;
  this._clean = _utils__WEBPACK_IMPORTED_MODULE_0__.clean;
  this._checkForAHash = _checkForAHash;

  this._setCurrent = function (c) {
    return current = self.current = c;
  };

  listen.call(this);
  updatePageLinks.call(this);
}

/***/ }),

/***/ "./src/lifecycles.ts":
/*!***************************!*\
  !*** ./src/lifecycles.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "foundLifecycle": () => /* binding */ foundLifecycle,
/* harmony export */   "notFoundLifeCycle": () => /* binding */ notFoundLifeCycle
/* harmony export */ });
/* harmony import */ var _Q__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Q */ "./src/Q.ts");
/* harmony import */ var _middlewares_checkForLeaveHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares/checkForLeaveHook */ "./src/middlewares/checkForLeaveHook.ts");
/* harmony import */ var _middlewares_checkForBeforeHook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middlewares/checkForBeforeHook */ "./src/middlewares/checkForBeforeHook.ts");
/* harmony import */ var _middlewares_callHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/callHandler */ "./src/middlewares/callHandler.ts");
/* harmony import */ var _middlewares_checkForAfterHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares/checkForAfterHook */ "./src/middlewares/checkForAfterHook.ts");
/* harmony import */ var _middlewares_checkForAlreadyHook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/checkForAlreadyHook */ "./src/middlewares/checkForAlreadyHook.ts");
/* harmony import */ var _middlewares_checkForNotFoundHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middlewares/checkForNotFoundHandler */ "./src/middlewares/checkForNotFoundHandler.ts");
/* harmony import */ var _middlewares_errorOut__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares/errorOut */ "./src/middlewares/errorOut.ts");
/* harmony import */ var _middlewares_flushCurrent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middlewares/flushCurrent */ "./src/middlewares/flushCurrent.ts");









var foundLifecycle = [_middlewares_checkForAlreadyHook__WEBPACK_IMPORTED_MODULE_5__.default, _middlewares_checkForBeforeHook__WEBPACK_IMPORTED_MODULE_2__.default, _middlewares_callHandler__WEBPACK_IMPORTED_MODULE_3__.default, _middlewares_checkForAfterHook__WEBPACK_IMPORTED_MODULE_4__.default];
var notFoundLifeCycle = [_middlewares_checkForLeaveHook__WEBPACK_IMPORTED_MODULE_1__.default, _middlewares_checkForNotFoundHandler__WEBPACK_IMPORTED_MODULE_6__.default, _Q__WEBPACK_IMPORTED_MODULE_0__.default.if(function (_ref) {
  var notFoundHandled = _ref.notFoundHandled;
  return notFoundHandled;
}, foundLifecycle, [_middlewares_errorOut__WEBPACK_IMPORTED_MODULE_7__.default]), _middlewares_flushCurrent__WEBPACK_IMPORTED_MODULE_8__.default];

/***/ }),

/***/ "./src/middlewares/callHandler.ts":
/*!****************************************!*\
  !*** ./src/middlewares/callHandler.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ callHandler
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function callHandler(context, done) {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.undefinedOrTrue)(context.navigateOptions, "callHandler")) {
    context.match.route.handler(context.match);
  }

  context.instance.updatePageLinks();
  done();
}

/***/ }),

/***/ "./src/middlewares/checkForAfterHook.ts":
/*!**********************************************!*\
  !*** ./src/middlewares/checkForAfterHook.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ _checkForAfterHook
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function _checkForAfterHook(context, done) {
  if (context.match.route.hooks && context.match.route.hooks.after && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.undefinedOrTrue)(context.navigateOptions, "callHooks")) {
    context.match.route.hooks.after.forEach(function (f) {
      return f(context.match);
    });
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/checkForAlreadyHook.ts":
/*!************************************************!*\
  !*** ./src/middlewares/checkForAlreadyHook.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForAlreadyHook
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function checkForAlreadyHook(context, done) {
  var current = context.instance.lastResolved();

  if (current && current[0] && current[0].route === context.match.route && current[0].url === context.match.url && current[0].queryString === context.match.queryString) {
    current.forEach(function (c) {
      if (c.route.hooks && c.route.hooks.already) {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.undefinedOrTrue)(context.navigateOptions, "callHooks")) {
          c.route.hooks.already.forEach(function (f) {
            return f(context.match);
          });
        }
      }
    });
    done(false);
    return;
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/checkForBeforeHook.ts":
/*!***********************************************!*\
  !*** ./src/middlewares/checkForBeforeHook.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForBeforeHook
/* harmony export */ });
/* harmony import */ var _Q__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Q */ "./src/Q.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");


function checkForBeforeHook(context, done) {
  if (context.match.route.hooks && context.match.route.hooks.before && (0,_utils__WEBPACK_IMPORTED_MODULE_1__.undefinedOrTrue)(context.navigateOptions, "callHooks")) {
    (0,_Q__WEBPACK_IMPORTED_MODULE_0__.default)(context.match.route.hooks.before.map(function (f) {
      // just so we match the Q interface
      return function beforeHookInternal(_, d) {
        return f(d, context.match);
      };
    }).concat([function () {
      return done();
    }]));
  } else {
    done();
  }
}

/***/ }),

/***/ "./src/middlewares/checkForDeprecationMethods.ts":
/*!*******************************************************!*\
  !*** ./src/middlewares/checkForDeprecationMethods.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForDeprecationMethods
/* harmony export */ });
function checkForDeprecationMethods(context, done) {
  if (context.navigateOptions) {
    if (typeof context.navigateOptions["shouldResolve"] !== "undefined") {
      console.warn("\"shouldResolve\" is deprecated. Please check the documentation.");
    }

    if (typeof context.navigateOptions["silent"] !== "undefined") {
      console.warn("\"silent\" is deprecated. Please check the documentation.");
    }
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/checkForForceOp.ts":
/*!********************************************!*\
  !*** ./src/middlewares/checkForForceOp.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForForceOp
/* harmony export */ });
function checkForForceOp(context, done) {
  if (context.navigateOptions.force === true) {
    context.instance._setCurrent([context.instance._pathToMatchObject(context.to)]);

    done(false);
  } else {
    done();
  }
}

/***/ }),

/***/ "./src/middlewares/checkForLeaveHook.ts":
/*!**********************************************!*\
  !*** ./src/middlewares/checkForLeaveHook.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForLeaveHook
/* harmony export */ });
/* harmony import */ var _Q__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Q */ "./src/Q.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");


function checkForLeaveHook(context, done) {
  var instance = context.instance;

  if (!instance.lastResolved()) {
    done();
    return;
  }

  (0,_Q__WEBPACK_IMPORTED_MODULE_0__.default)(instance.lastResolved().map(function (oldMatch) {
    return function (_, leaveLoopDone) {
      // no leave hook
      if (!oldMatch.route.hooks || !oldMatch.route.hooks.leave) {
        leaveLoopDone();
        return;
      }

      var someOfTheLastOnesMatch = context.matches ? context.matches.find(function (match) {
        return oldMatch.route.path === match.route.path;
      }) : false;

      if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.undefinedOrTrue)(context.navigateOptions, "callHooks") && !someOfTheLastOnesMatch) {
        (0,_Q__WEBPACK_IMPORTED_MODULE_0__.default)(oldMatch.route.hooks.leave.map(function (f) {
          // just so we match the Q interface
          return function (_, d) {
            return f(d, context.matches && context.matches.length > 0 ? context.matches.length === 1 ? context.matches[0] : context.matches : undefined);
          };
        }).concat([function () {
          return leaveLoopDone();
        }]));
        return;
      } else {
        leaveLoopDone();
      }
    };
  }), {}, function () {
    return done();
  });
}

/***/ }),

/***/ "./src/middlewares/checkForNotFoundHandler.ts":
/*!****************************************************!*\
  !*** ./src/middlewares/checkForNotFoundHandler.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ checkForNotFoundHandler
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function checkForNotFoundHandler(context, done) {
  var notFoundRoute = context.instance._notFoundRoute;

  if (notFoundRoute) {
    context.notFoundHandled = true;

    var _extractGETParameters = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.extractGETParameters)(context.currentLocationPath),
        url = _extractGETParameters[0],
        queryString = _extractGETParameters[1];

    notFoundRoute.path = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clean)(url);
    var notFoundMatch = {
      url: notFoundRoute.path,
      queryString: queryString,
      data: null,
      route: notFoundRoute,
      params: queryString !== "" ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.parseQuery)(queryString) : null
    };
    context.matches = [notFoundMatch];
    context.match = notFoundMatch;
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/errorOut.ts":
/*!*************************************!*\
  !*** ./src/middlewares/errorOut.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ errorOut
/* harmony export */ });
function errorOut(context, done) {
  if (!context.resolveOptions || context.resolveOptions.noMatchWarning === false || typeof context.resolveOptions.noMatchWarning === "undefined") console.warn("Navigo: \"" + context.currentLocationPath + "\" didn't match any of the registered routes.");
  done();
}

/***/ }),

/***/ "./src/middlewares/flushCurrent.ts":
/*!*****************************************!*\
  !*** ./src/middlewares/flushCurrent.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ flushCurrent
/* harmony export */ });
function flushCurrent(context, done) {
  context.instance._setCurrent(null);

  done();
}

/***/ }),

/***/ "./src/middlewares/matchPathToRegisteredRoutes.ts":
/*!********************************************************!*\
  !*** ./src/middlewares/matchPathToRegisteredRoutes.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ matchPathToRegisteredRoutes
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function matchPathToRegisteredRoutes(context, done) {
  for (var i = 0; i < context.instance.routes.length; i++) {
    var route = context.instance.routes[i];
    var match = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.matchRoute)(context.currentLocationPath, route);

    if (match) {
      if (!context.matches) context.matches = [];
      context.matches.push(match);

      if (context.resolveOptions.strategy === "ONE") {
        done();
        return;
      }
    }
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/processMatches.ts":
/*!*******************************************!*\
  !*** ./src/middlewares/processMatches.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ processMatches
/* harmony export */ });
/* harmony import */ var _Q__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Q */ "./src/Q.ts");
/* harmony import */ var _lifecycles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lifecycles */ "./src/lifecycles.ts");
/* harmony import */ var _updateState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateState */ "./src/middlewares/updateState.ts");
/* harmony import */ var _checkForLeaveHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkForLeaveHook */ "./src/middlewares/checkForLeaveHook.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





function processMatches(context, done) {
  var idx = 0;

  function nextMatch() {
    if (idx === context.matches.length) {
      (0,_updateState__WEBPACK_IMPORTED_MODULE_2__.default)(context, done);
      return;
    }

    (0,_Q__WEBPACK_IMPORTED_MODULE_0__.default)(_lifecycles__WEBPACK_IMPORTED_MODULE_1__.foundLifecycle, _extends({}, context, {
      match: context.matches[idx]
    }), function end() {
      idx += 1;
      nextMatch();
    });
  }

  (0,_checkForLeaveHook__WEBPACK_IMPORTED_MODULE_3__.default)(context, nextMatch);
}

/***/ }),

/***/ "./src/middlewares/setLocationPath.ts":
/*!********************************************!*\
  !*** ./src/middlewares/setLocationPath.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ _setLocationPath
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function _setLocationPath(context, done) {
  if (typeof context.currentLocationPath === "undefined") {
    context.currentLocationPath = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentEnvURL)(context.instance.root);
  }

  context.currentLocationPath = context.instance._checkForAHash(context.currentLocationPath);
  done();
}

/***/ }),

/***/ "./src/middlewares/updateBrowserURL.ts":
/*!*********************************************!*\
  !*** ./src/middlewares/updateBrowserURL.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ updateBrowserURL
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

var isWindowAvailable = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.windowAvailable)();
var isPushStateAvailable = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pushStateAvailable)();
function updateBrowserURL(context, done) {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.undefinedOrTrue)(context.navigateOptions, "updateBrowserURL")) {
    var value = ("/" + context.to).replace(/\/\//g, "/"); // making sure that we don't have two slashes

    var isItUsingHash = isWindowAvailable && context.resolveOptions && context.resolveOptions.hash === true;

    if (isPushStateAvailable) {
      history[context.navigateOptions.historyAPIMethod || "pushState"](context.navigateOptions.stateObj || {}, context.navigateOptions.title || "", isItUsingHash ? "#" + value : value); // This is to solve a nasty bug where the page doesn't scroll to the anchor.
      // We set a microtask to update the hash only.

      if (location && location.hash) {
        setTimeout(function () {
          var tmp = location.hash;
          location.hash = "";
          location.hash = tmp;
        }, 1);
      }
    } else if (isWindowAvailable) {
      window.location.href = context.to;
    }
  }

  done();
}

/***/ }),

/***/ "./src/middlewares/updateState.ts":
/*!****************************************!*\
  !*** ./src/middlewares/updateState.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ callHandler
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");

function callHandler(context, done) {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.undefinedOrTrue)(context.navigateOptions, "updateState")) {
    context.instance._setCurrent(context.matches);
  }

  done();
}

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentEnvURL": () => /* binding */ getCurrentEnvURL,
/* harmony export */   "clean": () => /* binding */ clean,
/* harmony export */   "isString": () => /* binding */ isString,
/* harmony export */   "isFunction": () => /* binding */ isFunction,
/* harmony export */   "regExpResultToParams": () => /* binding */ regExpResultToParams,
/* harmony export */   "extractGETParameters": () => /* binding */ extractGETParameters,
/* harmony export */   "parseQuery": () => /* binding */ parseQuery,
/* harmony export */   "matchRoute": () => /* binding */ matchRoute,
/* harmony export */   "pushStateAvailable": () => /* binding */ pushStateAvailable,
/* harmony export */   "undefinedOrTrue": () => /* binding */ undefinedOrTrue,
/* harmony export */   "parseNavigateOptions": () => /* binding */ parseNavigateOptions,
/* harmony export */   "windowAvailable": () => /* binding */ windowAvailable,
/* harmony export */   "accumulateHooks": () => /* binding */ accumulateHooks
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");

function getCurrentEnvURL(fallback) {
  if (fallback === void 0) {
    fallback = "/";
  }

  if (windowAvailable()) {
    return location.pathname + location.search + location.hash;
  }

  return fallback;
}
function clean(s) {
  return s.replace(/\/+$/, "").replace(/^\/+/, "");
}
function isString(s) {
  return typeof s === "string";
}
function isFunction(s) {
  return typeof s === "function";
}
function regExpResultToParams(match, names) {
  if (names.length === 0) return null;
  if (!match) return null;
  return match.slice(1, match.length).reduce(function (params, value, index) {
    if (params === null) params = {};
    params[names[index]] = decodeURIComponent(value);
    return params;
  }, null);
}
function extractGETParameters(url) {
  var tmp = clean(url).split(/\?(.*)?$/);
  return [clean(tmp[0]), tmp.slice(1).join("")];
}
function parseQuery(queryString) {
  var query = {};
  var pairs = queryString.split("&");

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");

    if (pair[0] !== "") {
      var key = decodeURIComponent(pair[0]);

      if (!query[key]) {
        query[key] = decodeURIComponent(pair[1] || "");
      } else {
        if (!Array.isArray(query[key])) query[key] = [query[key]];
        query[key].push(decodeURIComponent(pair[1] || ""));
      }
    }
  }

  return query;
}
function matchRoute(currentPath, route) {
  var _extractGETParameters = extractGETParameters(clean(currentPath)),
      current = _extractGETParameters[0],
      GETParams = _extractGETParameters[1];

  var params = GETParams === "" ? null : parseQuery(GETParams);
  var paramNames = [];
  var pattern;

  if (isString(route.path)) {
    pattern = _constants__WEBPACK_IMPORTED_MODULE_0__.START_BY_SLASH_REGEXP + clean(route.path).replace(_constants__WEBPACK_IMPORTED_MODULE_0__.PARAMETER_REGEXP, function (full, dots, name) {
      paramNames.push(name);
      return _constants__WEBPACK_IMPORTED_MODULE_0__.REPLACE_VARIABLE_REGEXP;
    }).replace(_constants__WEBPACK_IMPORTED_MODULE_0__.WILDCARD_REGEXP, _constants__WEBPACK_IMPORTED_MODULE_0__.REPLACE_WILDCARD).replace(_constants__WEBPACK_IMPORTED_MODULE_0__.NOT_SURE_REGEXP, _constants__WEBPACK_IMPORTED_MODULE_0__.REPLACE_NOT_SURE) + "$";

    if (clean(route.path) === "") {
      if (clean(current) === "") {
        return {
          url: current,
          queryString: GETParams,
          route: route,
          data: null,
          params: params
        };
      }
    }
  } else {
    pattern = route.path;
  }

  var regexp = new RegExp(pattern, _constants__WEBPACK_IMPORTED_MODULE_0__.MATCH_REGEXP_FLAGS);
  var match = current.match(regexp); // console.log(current, regexp);

  if (match) {
    var data = isString(route.path) ? regExpResultToParams(match, paramNames) : match.slice(1);
    return {
      url: current,
      queryString: GETParams,
      route: route,
      data: data,
      params: params
    };
  }

  return false;
}
function pushStateAvailable() {
  return !!(typeof window !== "undefined" && window.history && window.history.pushState);
}
function undefinedOrTrue(obj, key) {
  return typeof obj[key] === "undefined" || obj[key] === true;
}
function parseNavigateOptions(source) {
  if (!source) return {};
  var pairs = source.split(",");
  var options = {};
  var resolveOptions;
  pairs.forEach(function (str) {
    var temp = str.split(":").map(function (v) {
      return v.replace(/(^ +| +$)/g, "");
    });

    switch (temp[0]) {
      case "historyAPIMethod":
        options.historyAPIMethod = temp[1];
        break;

      case "resolveOptionsStrategy":
        if (!resolveOptions) resolveOptions = {};
        resolveOptions.strategy = temp[1];
        break;

      case "resolveOptionsHash":
        if (!resolveOptions) resolveOptions = {};
        resolveOptions.hash = temp[1] === "true";
        break;

      case "updateBrowserURL":
      case "callHandler":
      case "updateState":
      case "force":
        options[temp[0]] = temp[1] === "true";
        break;
    }
  });

  if (resolveOptions) {
    options.resolveOptions = resolveOptions;
  }

  return options;
}
function windowAvailable() {
  return typeof window !== "undefined";
}
function accumulateHooks(hooks, result) {
  if (hooks === void 0) {
    hooks = [];
  }

  if (result === void 0) {
    result = {};
  }

  hooks.filter(function (h) {
    return h;
  }).forEach(function (h) {
    ["before", "after", "already", "leave"].forEach(function (type) {
      if (h[type]) {
        if (!result[type]) result[type] = [];
        result[type].push(h[type]);
      }
    });
  });
  return result;
}

/***/ })

/******/ 	});
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
.default;
});
//# sourceMappingURL=navigo.js.map