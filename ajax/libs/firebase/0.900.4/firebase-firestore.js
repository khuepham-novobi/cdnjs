(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.firestore = global.firebase.firestore || {}), global.firebase.app));
}(this, (function (exports, app) { 'use strict';

    try {
                (function() {

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns navigator.userAgent string or '' if it's not defined.
     * @return user agent string
     */
    function getUA() {
        if (typeof navigator !== 'undefined' &&
            typeof navigator['userAgent'] === 'string') {
            return navigator['userAgent'];
        }
        else {
            return '';
        }
    }
    /**
     * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
     *
     * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
     * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
     * wait for a callback.
     */
    function isMobileCordova() {
        return (typeof window !== 'undefined' &&
            // @ts-ignore Setting up an broadly applicable index signature for Window
            // just to deal with this case would probably be a bad idea.
            !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
    }
    function isBrowserExtension() {
        var runtime = typeof chrome === 'object'
            ? chrome.runtime
            : typeof browser === 'object'
                ? browser.runtime
                : undefined;
        return typeof runtime === 'object' && runtime.id !== undefined;
    }
    /**
     * Detect React Native.
     *
     * @return true if ReactNative environment is detected.
     */
    function isReactNative() {
        return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
    }
    /** Detects Electron apps. */
    function isElectron() {
        return getUA().indexOf('Electron/') >= 0;
    }
    /** Detects Internet Explorer. */
    function isIE() {
        var ua = getUA();
        return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    }
    /** Detects Universal Windows Platform apps. */
    function isUWP() {
        return getUA().indexOf('MSAppHost/') >= 0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    var FirebaseError = /** @class */ (function (_super) {
        __extends(FirebaseError, _super);
        function FirebaseError(code, message, customData) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.customData = customData;
            _this.name = ERROR_NAME;
            // Fix For ES5
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, FirebaseError.prototype);
            // Maintains proper stack trace for where our error was thrown.
            // Only available on V8.
            if (Error.captureStackTrace) {
                Error.captureStackTrace(_this, ErrorFactory.prototype.create);
            }
            return _this;
        }
        return FirebaseError;
    }(Error));
    var ErrorFactory = /** @class */ (function () {
        function ErrorFactory(service, serviceName, errors) {
            this.service = service;
            this.serviceName = serviceName;
            this.errors = errors;
        }
        ErrorFactory.prototype.create = function (code) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            var customData = data[0] || {};
            var fullCode = this.service + "/" + code;
            var template = this.errors[code];
            var message = template ? replaceTemplate(template, customData) : 'Error';
            // Service Name: Error message (service/code).
            var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
            var error = new FirebaseError(fullCode, fullMessage, customData);
            return error;
        };
        return ErrorFactory;
    }());
    function replaceTemplate(template, data) {
        return template.replace(PATTERN, function (_, key) {
            var value = data[key];
            return value != null ? String(value) : "<" + key + "?>";
        });
    }
    var PATTERN = /\{\$([^}]+)}/g;

    /**
     * Component for service name T, e.g. `auth`, `auth-internal`
     */
    var Component = /** @class */ (function () {
        /**
         *
         * @param name The public service name, e.g. app, auth, firestore, database
         * @param instanceFactory Service factory responsible for creating the public interface
         * @param type whether the service provided by the component is public or private
         */
        function Component(name, instanceFactory, type) {
            this.name = name;
            this.instanceFactory = instanceFactory;
            this.type = type;
            this.multipleInstances = false;
            /**
             * Properties to be added to the service namespace
             */
            this.serviceProps = {};
            this.instantiationMode = "LAZY" /* LAZY */;
        }
        Component.prototype.setInstantiationMode = function (mode) {
            this.instantiationMode = mode;
            return this;
        };
        Component.prototype.setMultipleInstances = function (multipleInstances) {
            this.multipleInstances = multipleInstances;
            return this;
        };
        Component.prototype.setServiceProps = function (props) {
            this.serviceProps = props;
            return this;
        };
        return Component;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a;
    /**
     * The JS SDK supports 5 log levels and also allows a user the ability to
     * silence the logs altogether.
     *
     * The order is a follows:
     * DEBUG < VERBOSE < INFO < WARN < ERROR
     *
     * All of the log types above the current log level will be captured (i.e. if
     * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
     * `VERBOSE` logs will not)
     */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    var levelStringToEnum = {
        'debug': LogLevel.DEBUG,
        'verbose': LogLevel.VERBOSE,
        'info': LogLevel.INFO,
        'warn': LogLevel.WARN,
        'error': LogLevel.ERROR,
        'silent': LogLevel.SILENT
    };
    /**
     * The default log level
     */
    var defaultLogLevel = LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    var ConsoleMethod = (_a = {},
        _a[LogLevel.DEBUG] = 'log',
        _a[LogLevel.VERBOSE] = 'log',
        _a[LogLevel.INFO] = 'info',
        _a[LogLevel.WARN] = 'warn',
        _a[LogLevel.ERROR] = 'error',
        _a);
    /**
     * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
     * messages on to their corresponding console counterparts (if the log method
     * is supported by the current log level)
     */
    var defaultLogHandler = function (instance, logType) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (logType < instance.logLevel) {
            return;
        }
        var now = new Date().toISOString();
        var method = ConsoleMethod[logType];
        if (method) {
            console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
        }
        else {
            throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
        }
    };
    var Logger = /** @class */ (function () {
        /**
         * Gives you an instance of a Logger to capture messages according to
         * Firebase's logging scheme.
         *
         * @param name The name that the logs will be associated with
         */
        function Logger(name) {
            this.name = name;
            /**
             * The log level of the given Logger instance.
             */
            this._logLevel = defaultLogLevel;
            /**
             * The main (internal) log handler for the Logger instance.
             * Can be set to a new function in internal package code but not by user.
             */
            this._logHandler = defaultLogHandler;
            /**
             * The optional, additional, user-defined log handler for the Logger instance.
             */
            this._userLogHandler = null;
        }
        Object.defineProperty(Logger.prototype, "logLevel", {
            get: function () {
                return this._logLevel;
            },
            set: function (val) {
                if (!(val in LogLevel)) {
                    throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
                }
                this._logLevel = val;
            },
            enumerable: false,
            configurable: true
        });
        // Workaround for setter/getter having to be the same type.
        Logger.prototype.setLogLevel = function (val) {
            this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
        };
        Object.defineProperty(Logger.prototype, "logHandler", {
            get: function () {
                return this._logHandler;
            },
            set: function (val) {
                if (typeof val !== 'function') {
                    throw new TypeError('Value assigned to `logHandler` must be a function');
                }
                this._logHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger.prototype, "userLogHandler", {
            get: function () {
                return this._userLogHandler;
            },
            set: function (val) {
                this._userLogHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * The functions below are all based on the `console` interface
         */
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
        };
        return Logger;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var h, goog = goog || {}, k = commonjsGlobal || self;
    function aa() { }
    function ba(a) { var b = typeof a; b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"; return "array" == b || "object" == b && "number" == typeof a.length; }
    function n(a) { var b = typeof a; return "object" == b && null != a || "function" == b; }
    function ca(a) { return Object.prototype.hasOwnProperty.call(a, da) && a[da] || (a[da] = ++ea); }
    var da = "closure_uid_" + (1E9 * Math.random() >>> 0), ea = 0;
    function fa(a, b, c) { return a.call.apply(a.bind, arguments); }
    function ha(a, b, c) { if (!a)
        throw Error(); if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () { var e = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(e, d); return a.apply(b, e); };
    } return function () { return a.apply(b, arguments); }; }
    function p(a, b, c) { Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? p = fa : p = ha; return p.apply(null, arguments); }
    function ja(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function () { var d = c.slice(); d.push.apply(d, arguments); return a.apply(this, d); }; }
    function q() { return Date.now(); }
    function r(a, b) { function c() { } c.prototype = b.prototype; a.X = b.prototype; a.prototype = new c; a.prototype.constructor = a; a.Kb = function (d, e, f) { for (var g = Array(arguments.length - 2), m = 2; m < arguments.length; m++)
        g[m - 2] = arguments[m]; return b.prototype[e].apply(d, g); }; }
    function t() { this.j = this.j; this.i = this.i; }
    var ka = 0;
    t.prototype.j = !1;
    t.prototype.ja = function () { if (!this.j && (this.j = !0, this.G(), 0 != ka)) {
        var a = ca(this);
    } };
    t.prototype.G = function () { if (this.i)
        for (; this.i.length;)
            this.i.shift()(); };
    var ma = Array.prototype.indexOf ? function (a, b) { return Array.prototype.indexOf.call(a, b, void 0); } : function (a, b) { if ("string" === typeof a)
        return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0); for (var c = 0; c < a.length; c++)
        if (c in a && a[c] === b)
            return c; return -1; }, na = Array.prototype.forEach ? function (a, b, c) { Array.prototype.forEach.call(a, b, c); } : function (a, b, c) { for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a); };
    function oa(a) { a: {
        var b = pa;
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) {
                b = e;
                break a;
            }
        b = -1;
    } return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]; }
    function qa(a) { return Array.prototype.concat.apply([], arguments); }
    function ra(a) { var b = a.length; if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        return c;
    } return []; }
    function sa(a) { return /^[\s\xa0]*$/.test(a); }
    var ta = String.prototype.trim ? function (a) { return a.trim(); } : function (a) { return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]; };
    function v(a, b) { return -1 != a.indexOf(b); }
    function ua(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
    var w;
    a: {
        var va = k.navigator;
        if (va) {
            var wa = va.userAgent;
            if (wa) {
                w = wa;
                break a;
            }
        }
        w = "";
    }
    function za(a, b, c) { for (var d in a)
        b.call(c, a[d], d, a); }
    function Aa(a) { var b = {}; for (var c in a)
        b[c] = a[c]; return b; }
    var Ba = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Ca(a, b) { var c, d; for (var e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            a[c] = d[c];
        for (var f = 0; f < Ba.length; f++)
            c = Ba[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    } }
    function Da(a) { Da[" "](a); return a; }
    Da[" "] = aa;
    function Ea(a, b) { var c = Fa; return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a); }
    var Ga = v(w, "Opera"), x = v(w, "Trident") || v(w, "MSIE"), Ha = v(w, "Edge"), Ia = Ha || x, Ja = v(w, "Gecko") && !(v(w.toLowerCase(), "webkit") && !v(w, "Edge")) && !(v(w, "Trident") || v(w, "MSIE")) && !v(w, "Edge"), Ka = v(w.toLowerCase(), "webkit") && !v(w, "Edge");
    function La() { var a = k.document; return a ? a.documentMode : void 0; }
    var Ma;
    a: {
        var Na = "", Oa = function () { var a = w; if (Ja)
            return /rv:([^\);]+)(\)|;)/.exec(a); if (Ha)
            return /Edge\/([\d\.]+)/.exec(a); if (x)
            return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a); if (Ka)
            return /WebKit\/(\S+)/.exec(a); if (Ga)
            return /(?:Version)[ \/]?(\S+)/.exec(a); }();
        Oa && (Na = Oa ? Oa[1] : "");
        if (x) {
            var Pa = La();
            if (null != Pa && Pa > parseFloat(Na)) {
                Ma = String(Pa);
                break a;
            }
        }
        Ma = Na;
    }
    var Fa = {};
    function Qa(a) { return Ea(a, function () { {
        var b = 0;
        var e = ta(String(Ma)).split("."), f = ta(String(a)).split("."), g = Math.max(e.length, f.length);
        for (var m = 0; 0 == b && m < g; m++) {
            var c = e[m] || "", d = f[m] || "";
            do {
                c = /(\d*)(\D*)(.*)/.exec(c) || ["", "", "", ""];
                d = /(\d*)(\D*)(.*)/.exec(d) || ["", "", "", ""];
                if (0 == c[0].length && 0 == d[0].length)
                    break;
                b = ua(0 == c[1].length ? 0 : parseInt(c[1], 10), 0 == d[1].length ? 0 : parseInt(d[1], 10)) || ua(0 == c[2].length, 0 == d[2].length) || ua(c[2], d[2]);
                c = c[3];
                d = d[3];
            } while (0 == b);
        }
    } return 0 <= b; }); }
    var Ra;
    if (k.document && x) {
        var Sa = La();
        Ra = Sa ? Sa : parseInt(Ma, 10) || void 0;
    }
    else
        Ra = void 0;
    var Ta = Ra;
    var Ua = !x || 9 <= Number(Ta), Va = x && !Qa("9"), Wa = function () { if (!k.addEventListener || !Object.defineProperty)
        return !1; var a = !1, b = Object.defineProperty({}, "passive", { get: function () { a = !0; } }); try {
        k.addEventListener("test", aa, b), k.removeEventListener("test", aa, b);
    }
    catch (c) { } return a; }();
    function y(a, b) { this.type = a; this.a = this.target = b; this.defaultPrevented = !1; }
    y.prototype.b = function () { this.defaultPrevented = !0; };
    function z(a, b) {
        y.call(this, a ? a.type : "");
        this.relatedTarget = this.a = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.c = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.a = b;
            if (b = a.relatedTarget) {
                if (Ja) {
                    a: {
                        try {
                            Da(b.nodeName);
                            var e = !0;
                            break a;
                        }
                        catch (f) { }
                        e = !1;
                    }
                    e || (b = null);
                }
            }
            else
                "mouseover" ==
                    c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey =
                a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Xa[a.pointerType] || "";
            this.c = a;
            a.defaultPrevented && this.b();
        }
    }
    r(z, y);
    var Xa = { 2: "touch", 3: "pen", 4: "mouse" };
    z.prototype.b = function () { z.X.b.call(this); var a = this.c; if (a.preventDefault)
        a.preventDefault();
    else if (a.returnValue = !1, Va)
        try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                a.keyCode = -1;
        }
        catch (b) { } };
    var A = "closure_listenable_" + (1E6 * Math.random() | 0), Ya = 0;
    function Za(a, b, c, d, e) { this.listener = a; this.proxy = null; this.src = b; this.type = c; this.capture = !!d; this.ca = e; this.key = ++Ya; this.Y = this.Z = !1; }
    function $a(a) { a.Y = !0; a.listener = null; a.proxy = null; a.src = null; a.ca = null; }
    function ab(a) { this.src = a; this.a = {}; this.b = 0; }
    ab.prototype.add = function (a, b, c, d, e) { var f = a.toString(); a = this.a[f]; a || (a = this.a[f] = [], this.b++); var g = bb(a, b, d, e); -1 < g ? (b = a[g], c || (b.Z = !1)) : (b = new Za(b, this.src, f, !!d, e), b.Z = c, a.push(b)); return b; };
    function cb(a, b) { var c = b.type; if (c in a.a) {
        var d = a.a[c], e = ma(d, b), f;
        (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
        f && ($a(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
    } }
    function bb(a, b, c, d) { for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Y && f.listener == b && f.capture == !!c && f.ca == d)
            return e;
    } return -1; }
    var db = "closure_lm_" + (1E6 * Math.random() | 0), eb = {};
    function gb(a, b, c, d, e) { if (d && d.once)
        return hb(a, b, c, d, e); if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            gb(a, b[f], c, d, e);
        return null;
    } c = ib(c); return a && a[A] ? a.va(b, c, n(d) ? !!d.capture : !!d, e) : jb(a, b, c, !1, d, e); }
    function jb(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = n(e) ? !!e.capture : !!e;
        if (g && !Ua)
            return null;
        var m = kb(a);
        m || (a[db] = m = new ab(a));
        c = m.add(b, c, d, g, f);
        if (c.proxy)
            return c;
        d = lb();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Wa || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(mb(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        return c;
    }
    function lb() { var a = nb, b = Ua ? function (c) { return a.call(b.src, b.listener, c); } : function (c) { c = a.call(b.src, b.listener, c); if (!c)
        return c; }; return b; }
    function hb(a, b, c, d, e) { if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            hb(a, b[f], c, d, e);
        return null;
    } c = ib(c); return a && a[A] ? a.wa(b, c, n(d) ? !!d.capture : !!d, e) : jb(a, b, c, !0, d, e); }
    function ob(a, b, c, d, e) { if (Array.isArray(b))
        for (var f = 0; f < b.length; f++)
            ob(a, b[f], c, d, e);
    else
        (d = n(d) ? !!d.capture : !!d, c = ib(c), a && a[A]) ? (a = a.c, b = String(b).toString(), b in a.a && (f = a.a[b], c = bb(f, c, d, e), -1 < c && ($a(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = kb(a)) && (b = a.a[b.toString()], a = -1, b && (a = bb(b, c, d, e)), (c = -1 < a ? b[a] : null) && pb(c)); }
    function pb(a) { if ("number" !== typeof a && a && !a.Y) {
        var b = a.src;
        if (b && b[A])
            cb(b.c, a);
        else {
            var c = a.type, d = a.proxy;
            b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(mb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
            (c = kb(b)) ? (cb(c, a), 0 == c.b && (c.src = null, b[db] = null)) : $a(a);
        }
    } }
    function mb(a) { return a in eb ? eb[a] : eb[a] = "on" + a; }
    function qb(a, b) { var c = a.listener, d = a.ca || a.src; a.Z && pb(a); return c.call(d, b); }
    function nb(a, b) { if (a.Y)
        return !0; if (!Ua) {
        if (!b)
            a: {
                b = ["window", "event"];
                for (var c = k, d = 0; d < b.length; d++)
                    if (c = c[b[d]], null == c) {
                        b = null;
                        break a;
                    }
                b = c;
            }
        b = new z(b, this);
        return qb(a, b);
    } return qb(a, new z(b, this)); }
    function kb(a) { a = a[db]; return a instanceof ab ? a : null; }
    var sb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function ib(a) { if ("function" === typeof a)
        return a; a[sb] || (a[sb] = function (b) { return a.handleEvent(b); }); return a[sb]; }
    function D() { t.call(this); this.c = new ab(this); this.J = this; this.C = null; }
    r(D, t);
    D.prototype[A] = !0;
    h = D.prototype;
    h.addEventListener = function (a, b, c, d) { gb(this, a, b, c, d); };
    h.removeEventListener = function (a, b, c, d) { ob(this, a, b, c, d); };
    function E(a, b) { var c, d = a.C; if (d)
        for (c = []; d; d = d.C)
            c.push(d); a = a.J; d = b.type || b; if ("string" === typeof b)
        b = new y(b, a);
    else if (b instanceof y)
        b.target = b.target || a;
    else {
        var e = b;
        b = new y(d, a);
        Ca(b, e);
    } e = !0; if (c)
        for (var f = c.length - 1; 0 <= f; f--) {
            var g = b.a = c[f];
            e = tb(g, d, !0, b) && e;
        } g = b.a = a; e = tb(g, d, !0, b) && e; e = tb(g, d, !1, b) && e; if (c)
        for (f = 0; f < c.length; f++)
            g = b.a = c[f], e = tb(g, d, !1, b) && e; }
    h.G = function () { D.X.G.call(this); if (this.c) {
        var a = this.c, c;
        for (c in a.a) {
            for (var d = a.a[c], e = 0; e < d.length; e++)
                $a(d[e]);
            delete a.a[c];
            a.b--;
        }
    } this.C = null; };
    h.va = function (a, b, c, d) { return this.c.add(String(a), b, !1, c, d); };
    h.wa = function (a, b, c, d) { return this.c.add(String(a), b, !0, c, d); };
    function tb(a, b, c, d) { b = a.c.a[String(b)]; if (!b)
        return !0; b = b.concat(); for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.Y && g.capture == c) {
            var m = g.listener, l = g.ca || g.src;
            g.Z && cb(a.c, g);
            e = !1 !== m.call(l, d) && e;
        }
    } return e && !d.defaultPrevented; }
    var ub = k.JSON.stringify;
    function vb() { this.b = this.a = null; }
    var xb = new /** @class */ (function () {
        function class_1(a, b) {
            this.c = a;
            this.f = b;
            this.b = 0;
            this.a = null;
        }
        class_1.prototype.get = function () { var a; 0 < this.b ? (this.b--, a = this.a, this.a = a.next, a.next = null) : a = this.c(); return a; };
        return class_1;
    }())(function () { return new wb; }, function (a) { a.reset(); });
    vb.prototype.add = function (a, b) { var c = xb.get(); c.set(a, b); this.b ? this.b.next = c : this.a = c; this.b = c; };
    function yb() { var a = zb, b = null; a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null); return b; }
    function wb() { this.next = this.b = this.a = null; }
    wb.prototype.set = function (a, b) { this.a = a; this.b = b; this.next = null; };
    wb.prototype.reset = function () { this.next = this.b = this.a = null; };
    function Ab(a) { k.setTimeout(function () { throw a; }, 0); }
    function Bb(a, b) { Cb || Db(); Eb || (Cb(), Eb = !0); zb.add(a, b); }
    var Cb;
    function Db() { var a = k.Promise.resolve(void 0); Cb = function () { a.then(Fb); }; }
    var Eb = !1, zb = new vb;
    function Fb() { for (var a; a = yb();) {
        try {
            a.a.call(a.b);
        }
        catch (c) {
            Ab(c);
        }
        var b = xb;
        b.f(a);
        100 > b.b && (b.b++, a.next = b.a, b.a = a);
    } Eb = !1; }
    function Gb(a, b) { D.call(this); this.b = a || 1; this.a = b || k; this.f = p(this.Za, this); this.g = q(); }
    r(Gb, D);
    h = Gb.prototype;
    h.aa = !1;
    h.M = null;
    h.Za = function () { if (this.aa) {
        var a = q() - this.g;
        0 < a && a < .8 * this.b ? this.M = this.a.setTimeout(this.f, this.b - a) : (this.M && (this.a.clearTimeout(this.M), this.M = null), E(this, "tick"), this.aa && (Hb(this), this.start()));
    } };
    h.start = function () { this.aa = !0; this.M || (this.M = this.a.setTimeout(this.f, this.b), this.g = q()); };
    function Hb(a) { a.aa = !1; a.M && (a.a.clearTimeout(a.M), a.M = null); }
    h.G = function () { Gb.X.G.call(this); Hb(this); delete this.a; };
    function Ib(a, b, c) { if ("function" === typeof a)
        c && (a = p(a, c));
    else if (a && "function" == typeof a.handleEvent)
        a = p(a.handleEvent, a);
    else
        throw Error("Invalid listener argument"); return 2147483647 < Number(b) ? -1 : k.setTimeout(a, b || 0); }
    function Jb(a) { a.a = Ib(function () { a.a = null; a.c && (a.c = !1, Jb(a)); }, a.h); var b = a.b; a.b = null; a.g.apply(null, b); }
    var Kb = /** @class */ (function (_super) {
        __extends$1(Kb, _super);
        function Kb(a, b) {
            var _this = _super.call(this) || this;
            _this.g = a;
            _this.h = b;
            _this.b = null;
            _this.c = !1;
            _this.a = null;
            return _this;
        }
        Kb.prototype.f = function (a) { this.b = arguments; this.a ? this.c = !0 : Jb(this); };
        Kb.prototype.G = function () { _super.prototype.G.call(this); this.a && (k.clearTimeout(this.a), this.a = null, this.c = !1, this.b = null); };
        return Kb;
    }(t));
    function F(a) { t.call(this); this.b = a; this.a = {}; }
    r(F, t);
    var Lb = [];
    function Mb(a, b, c, d) { Array.isArray(c) || (c && (Lb[0] = c.toString()), c = Lb); for (var e = 0; e < c.length; e++) {
        var f = gb(b, c[e], d || a.handleEvent, !1, a.b || a);
        if (!f)
            break;
        a.a[f.key] = f;
    } }
    function Nb(a) { za(a.a, function (b, c) { this.a.hasOwnProperty(c) && pb(b); }, a); a.a = {}; }
    F.prototype.G = function () { F.X.G.call(this); Nb(this); };
    F.prototype.handleEvent = function () { throw Error("EventHandler.handleEvent not implemented"); };
    function Ob() { this.a = !0; }
    function Pb(a, b, c, d, e, f) { a.info(function () { if (a.a)
        if (f) {
            var g = "";
            for (var m = f.split("&"), l = 0; l < m.length; l++) {
                var u = m[l].split("=");
                if (1 < u.length) {
                    var C = u[0];
                    u = u[1];
                    var B = C.split("_");
                    g = 2 <= B.length && "type" == B[1] ? g + (C + "=" + u + "&") : g + (C + "=redacted&");
                }
            }
        }
        else
            g = null;
    else
        g = f; return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + g; }); }
    function Qb(a, b, c, d, e, f, g) { a.info(function () { return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + g; }); }
    function G(a, b, c, d) { a.info(function () { return "XMLHTTP TEXT (" + b + "): " + Rb(a, c) + (d ? " " + d : ""); }); }
    function Sb(a, b) { a.info(function () { return "TIMEOUT: " + b; }); }
    Ob.prototype.info = function () { };
    function Rb(a, b) { if (!a.a)
        return b; if (!b)
        return null; try {
        var c = JSON.parse(b);
        if (c)
            for (a = 0; a < c.length; a++)
                if (Array.isArray(c[a])) {
                    var d = c[a];
                    if (!(2 > d.length)) {
                        var e = d[1];
                        if (Array.isArray(e) && !(1 > e.length)) {
                            var f = e[0];
                            if ("noop" != f && "stop" != f && "close" != f)
                                for (var g = 1; g < e.length; g++)
                                    e[g] = "";
                        }
                    }
                }
        return ub(c);
    }
    catch (m) {
        return b;
    } }
    var H = {}, Tb = null;
    function Ub() { return Tb = Tb || new D; }
    H.Fa = "serverreachability";
    function Vb(a) { y.call(this, H.Fa, a); }
    r(Vb, y);
    function I(a) { var b = Ub(); E(b, new Vb(b, a)); }
    H.STAT_EVENT = "statevent";
    function Wb(a, b) { y.call(this, H.STAT_EVENT, a); this.stat = b; }
    r(Wb, y);
    function J(a) { var b = Ub(); E(b, new Wb(b, a)); }
    H.Ga = "timingevent";
    function Xb(a) { y.call(this, H.Ga, a); }
    r(Xb, y);
    function K(a, b) { if ("function" !== typeof a)
        throw Error("Fn must not be null and must be a function"); return k.setTimeout(function () { a(); }, b); }
    var Yb = { NO_ERROR: 0, $a: 1, nb: 2, mb: 3, hb: 4, lb: 5, ob: 6, Da: 7, TIMEOUT: 8, rb: 9 };
    var Zb = { fb: "complete", Bb: "success", Ea: "error", Da: "abort", tb: "ready", ub: "readystatechange", TIMEOUT: "timeout", pb: "incrementaldata", sb: "progress", ib: "downloadprogress", Jb: "uploadprogress" };
    function $b() { }
    $b.prototype.a = null;
    function ac(a) { var b; (b = a.a) || (b = a.a = {}); return b; }
    function bc() { }
    var L = { OPEN: "a", eb: "b", Ea: "c", qb: "d" };
    function cc() { y.call(this, "d"); }
    r(cc, y);
    function dc() { y.call(this, "c"); }
    r(dc, y);
    var ec;
    function fc() { }
    r(fc, $b);
    ec = new fc;
    function M(a, b, c, d) { this.g = a; this.c = b; this.f = c; this.S = d || 1; this.J = new F(this); this.P = gc; a = Ia ? 125 : void 0; this.R = new Gb(a); this.B = null; this.b = !1; this.j = this.l = this.i = this.H = this.u = this.T = this.o = null; this.s = []; this.a = null; this.D = 0; this.h = this.m = null; this.N = -1; this.A = !1; this.O = 0; this.F = null; this.V = this.C = this.U = this.I = !1; }
    var gc = 45E3, hc = {}, ic = {};
    h = M.prototype;
    h.setTimeout = function (a) { this.P = a; };
    function jc(a, b, c) { a.H = 1; a.i = kc(N(b)); a.j = c; a.I = !0; lc(a, null); }
    function lc(a, b) { a.u = q(); mc(a); a.l = N(a.i); var c = a.l, d = a.S; Array.isArray(d) || (d = [String(d)]); nc(c.b, "t", d); a.D = 0; a.a = oc(a.g, a.g.C ? b : null); 0 < a.O && (a.F = new Kb(p(a.Ca, a, a.a), a.O)); Mb(a.J, a.a, "readystatechange", a.Xa); b = a.B ? Aa(a.B) : {}; a.j ? (a.m || (a.m = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.a.ba(a.l, a.m, a.j, b)) : (a.m = "GET", a.a.ba(a.l, a.m, null, b)); I(1); Pb(a.c, a.m, a.l, a.f, a.S, a.j); }
    h.Xa = function (a) { a = a.target; var b = this.F; b && 3 == O(a) ? b.f() : this.Ca(a); };
    h.Ca = function (a) {
        try {
            if (a == this.a)
                a: {
                    var b = O(this.a), c = this.a.ua(), d = this.a.W();
                    if (!(3 > b || 3 == b && !Ia && !this.a.$())) {
                        this.A || 4 != b || 7 == c || (8 == c || 0 >= d ? I(3) : I(2));
                        pc(this);
                        var e = this.a.W();
                        this.N = e;
                        var f = this.a.$();
                        this.b = 200 == e;
                        Qb(this.c, this.m, this.l, this.f, this.S, b, e);
                        if (this.b) {
                            if (this.U && !this.C) {
                                b: {
                                    if (this.a) {
                                        var g, m = this.a;
                                        if ((g = m.a ? m.a.getResponseHeader("X-HTTP-Initial-Response") : null) && !sa(g)) {
                                            var l = g;
                                            break b;
                                        }
                                    }
                                    l = null;
                                }
                                if (l)
                                    G(this.c, this.f, l, "Initial handshake response via X-HTTP-Initial-Response"),
                                        this.C = !0, qc(this, l);
                                else {
                                    this.b = !1;
                                    this.h = 3;
                                    J(12);
                                    P(this);
                                    rc(this);
                                    break a;
                                }
                            }
                            this.I ? (sc(this, b, f), Ia && this.b && 3 == b && (Mb(this.J, this.R, "tick", this.Wa), this.R.start())) : (G(this.c, this.f, f, null), qc(this, f));
                            4 == b && P(this);
                            this.b && !this.A && (4 == b ? uc(this.g, this) : (this.b = !1, mc(this)));
                        }
                        else
                            400 == e && 0 < f.indexOf("Unknown SID") ? (this.h = 3, J(12)) : (this.h = 0, J(13)), P(this), rc(this);
                    }
                }
        }
        catch (u) { }
        finally { }
    };
    function sc(a, b, c) { for (var d = !0; !a.A && a.D < c.length;) {
        var e = vc(a, c);
        if (e == ic) {
            4 == b && (a.h = 4, J(14), d = !1);
            G(a.c, a.f, null, "[Incomplete Response]");
            break;
        }
        else if (e == hc) {
            a.h = 4;
            J(15);
            G(a.c, a.f, c, "[Invalid Chunk]");
            d = !1;
            break;
        }
        else
            G(a.c, a.f, e, null), qc(a, e);
    } 4 == b && 0 == c.length && (a.h = 1, J(16), d = !1); a.b = a.b && d; d ? 0 < c.length && !a.V && (a.V = !0, b = a.g, b.a == a && b.U && !b.F && (b.c.info("Great, no buffering proxy detected. Bytes received: " + c.length), wc(b), b.F = !0, J(11))) : (G(a.c, a.f, c, "[Invalid Chunked Response]"), P(a), rc(a)); }
    h.Wa = function () { if (this.a) {
        var a = O(this.a), b = this.a.$();
        this.D < b.length && (pc(this), sc(this, a, b), this.b && 4 != a && mc(this));
    } };
    function vc(a, b) { var c = a.D, d = b.indexOf("\n", c); if (-1 == d)
        return ic; c = Number(b.substring(c, d)); if (isNaN(c))
        return hc; d += 1; if (d + c > b.length)
        return ic; b = b.substr(d, c); a.D = d + c; return b; }
    h.cancel = function () { this.A = !0; P(this); };
    function mc(a) { a.T = q() + a.P; yc(a, a.P); }
    function yc(a, b) { if (null != a.o)
        throw Error("WatchDog timer not null"); a.o = K(p(a.Va, a), b); }
    function pc(a) { a.o && (k.clearTimeout(a.o), a.o = null); }
    h.Va = function () { this.o = null; var a = q(); 0 <= a - this.T ? (Sb(this.c, this.l), 2 != this.H && (I(3), J(17)), P(this), this.h = 2, rc(this)) : yc(this, this.T - a); };
    function rc(a) { 0 == a.g.v || a.A || uc(a.g, a); }
    function P(a) { pc(a); var b = a.F; b && "function" == typeof b.ja && b.ja(); a.F = null; Hb(a.R); Nb(a.J); a.a && (b = a.a, a.a = null, b.abort(), b.ja()); }
    function qc(a, b) {
        try {
            var c = a.g;
            if (0 != c.v && (c.a == a || zc(c.b, a)))
                if (c.I = a.N, !a.C && zc(c.b, a) && 3 == c.v) {
                    try {
                        var d = c.ka.a.parse(b);
                    }
                    catch (tc) {
                        d = null;
                    }
                    if (Array.isArray(d) && 3 == d.length) {
                        var e = d;
                        if (0 == e[0])
                            a: {
                                if (!c.j) {
                                    if (c.a)
                                        if (c.a.u + 3E3 < a.u)
                                            Ac(c), Bc(c);
                                        else
                                            break a;
                                    Cc(c);
                                    J(18);
                                }
                            }
                        else
                            c.oa = e[1], 0 < c.oa - c.P && 37500 > e[2] && c.H && 0 == c.o && !c.m && (c.m = K(p(c.Sa, c), 6E3));
                        if (1 >= Dc(c.b) && c.ea) {
                            try {
                                c.ea();
                            }
                            catch (tc) { }
                            c.ea = void 0;
                        }
                    }
                    else
                        Q(c, 11);
                }
                else if ((a.C || c.a == a) && Ac(c), !sa(b))
                    for (b = d = c.ka.a.parse(b), d = 0; d < b.length; d++)
                        if (e =
                            b[d], c.P = e[0], e = e[1], 2 == c.v)
                            if ("c" == e[0]) {
                                c.J = e[1];
                                c.ga = e[2];
                                var f = e[3];
                                null != f && (c.ha = f, c.c.info("VER=" + c.ha));
                                var g = e[4];
                                null != g && (c.pa = g, c.c.info("SVER=" + c.pa));
                                var m = e[5];
                                if (null != m && "number" === typeof m && 0 < m) {
                                    var l = 1.5 * m;
                                    c.D = l;
                                    c.c.info("backChannelRequestTimeoutMs_=" + l);
                                }
                                l = c;
                                var u = a.a;
                                if (u) {
                                    var C = u.a ? u.a.getResponseHeader("X-Client-Wire-Protocol") : null;
                                    if (C) {
                                        var B = l.b;
                                        !B.a && (v(C, "spdy") || v(C, "quic") || v(C, "h2")) && (B.f = B.g, B.a = new Set, B.b && (Ec(B, B.b), B.b = null));
                                    }
                                    if (l.A) {
                                        var rb = u.a ? u.a.getResponseHeader("X-HTTP-Session-Id") :
                                            null;
                                        rb && (l.na = rb, R(l.B, l.A, rb));
                                    }
                                }
                                c.v = 3;
                                c.f && c.f.ta();
                                c.U && (c.N = q() - a.u, c.c.info("Handshake RTT: " + c.N + "ms"));
                                l = c;
                                var xa = a;
                                l.la = Fc(l, l.C ? l.ga : null, l.fa);
                                if (xa.C) {
                                    Gc(l.b, xa);
                                    var ya = xa, xc = l.D;
                                    xc && ya.setTimeout(xc);
                                    ya.o && (pc(ya), mc(ya));
                                    l.a = xa;
                                }
                                else
                                    Hc(l);
                                0 < c.g.length && Ic(c);
                            }
                            else
                                "stop" != e[0] && "close" != e[0] || Q(c, 7);
                        else
                            3 == c.v && ("stop" == e[0] || "close" == e[0] ? "stop" == e[0] ? Q(c, 7) : Jc(c) : "noop" != e[0] && c.f && c.f.sa(e), c.o = 0);
            I(4);
        }
        catch (tc) { }
    }
    function Kc(a) { if (a.K && "function" == typeof a.K)
        return a.K(); if ("string" === typeof a)
        return a.split(""); if (ba(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++)
            b.push(a[d]);
        return b;
    } b = []; c = 0; for (d in a)
        b[c++] = a[d]; return a = b; }
    function Lc(a, b) { if (a.forEach && "function" == typeof a.forEach)
        a.forEach(b, void 0);
    else if (ba(a) || "string" === typeof a)
        na(a, b, void 0);
    else {
        if (a.L && "function" == typeof a.L)
            var c = a.L();
        else if (a.K && "function" == typeof a.K)
            c = void 0;
        else if (ba(a) || "string" === typeof a) {
            c = [];
            for (var d = a.length, e = 0; e < d; e++)
                c.push(e);
        }
        else
            for (e in c = [], d = 0, a)
                c[d++] = e;
        d = Kc(a);
        e = d.length;
        for (var f = 0; f < e; f++)
            b.call(void 0, d[f], c && c[f], a);
    } }
    function S(a, b) { this.b = {}; this.a = []; this.c = 0; var c = arguments.length; if (1 < c) {
        if (c % 2)
            throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2)
            this.set(arguments[d], arguments[d + 1]);
    }
    else if (a)
        if (a instanceof S)
            for (c = a.L(), d = 0; d < c.length; d++)
                this.set(c[d], a.get(c[d]));
        else
            for (d in a)
                this.set(d, a[d]); }
    h = S.prototype;
    h.K = function () { Mc(this); for (var a = [], b = 0; b < this.a.length; b++)
        a.push(this.b[this.a[b]]); return a; };
    h.L = function () { Mc(this); return this.a.concat(); };
    function Mc(a) { if (a.c != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length;) {
            var d = a.a[b];
            T(a.b, d) && (a.a[c++] = d);
            b++;
        }
        a.a.length = c;
    } if (a.c != a.a.length) {
        var e = {};
        for (c = b = 0; b < a.a.length;)
            d = a.a[b], T(e, d) || (a.a[c++] = d, e[d] = 1), b++;
        a.a.length = c;
    } }
    h.get = function (a, b) { return T(this.b, a) ? this.b[a] : b; };
    h.set = function (a, b) { T(this.b, a) || (this.c++, this.a.push(a)); this.b[a] = b; };
    h.forEach = function (a, b) { for (var c = this.L(), d = 0; d < c.length; d++) {
        var e = c[d], f = this.get(e);
        a.call(b, f, e, this);
    } };
    function T(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
    var Nc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function Oc(a, b) { if (a) {
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
            var d = a[c].indexOf("="), e = null;
            if (0 <= d) {
                var f = a[c].substring(0, d);
                e = a[c].substring(d + 1);
            }
            else
                f = a[c];
            b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
        }
    } }
    function U(a, b) { this.c = this.j = this.f = ""; this.h = null; this.i = this.g = ""; this.a = !1; if (a instanceof U) {
        this.a = void 0 !== b ? b : a.a;
        Pc(this, a.f);
        this.j = a.j;
        Qc(this, a.c);
        Rc(this, a.h);
        this.g = a.g;
        b = a.b;
        var c = new Sc;
        c.c = b.c;
        b.a && (c.a = new S(b.a), c.b = b.b);
        Tc(this, c);
        this.i = a.i;
    }
    else
        a && (c = String(a).match(Nc)) ? (this.a = !!b, Pc(this, c[1] || "", !0), this.j = Uc(c[2] || ""), Qc(this, c[3] || "", !0), Rc(this, c[4]), this.g = Uc(c[5] || "", !0), Tc(this, c[6] || "", !0), this.i = Uc(c[7] || "")) : (this.a = !!b, this.b = new Sc(null, this.a)); }
    U.prototype.toString = function () { var a = [], b = this.f; b && a.push(Vc(b, Wc, !0), ":"); var c = this.c; if (c || "file" == b)
        a.push("//"), (b = this.j) && a.push(Vc(b, Wc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.h, null != c && a.push(":", String(c)); if (c = this.g)
        this.c && "/" != c.charAt(0) && a.push("/"), a.push(Vc(c, "/" == c.charAt(0) ? Xc : Yc, !0)); (c = this.b.toString()) && a.push("?", c); (c = this.i) && a.push("#", Vc(c, Zc)); return a.join(""); };
    function N(a) { return new U(a); }
    function Pc(a, b, c) { a.f = c ? Uc(b, !0) : b; a.f && (a.f = a.f.replace(/:$/, "")); }
    function Qc(a, b, c) { a.c = c ? Uc(b, !0) : b; }
    function Rc(a, b) { if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b)
            throw Error("Bad port number " + b);
        a.h = b;
    }
    else
        a.h = null; }
    function Tc(a, b, c) { b instanceof Sc ? (a.b = b, $c(a.b, a.a)) : (c || (b = Vc(b, ad)), a.b = new Sc(b, a.a)); }
    function R(a, b, c) { a.b.set(b, c); }
    function kc(a) { R(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ q()).toString(36)); return a; }
    function bd(a) { return a instanceof U ? N(a) : new U(a, void 0); }
    function cd(a, b, c, d) { var e = new U(null, void 0); a && Pc(e, a); b && Qc(e, b); c && Rc(e, c); d && (e.g = d); return e; }
    function Uc(a, b) { return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""; }
    function Vc(a, b, c) { return "string" === typeof a ? (a = encodeURI(a).replace(b, dd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null; }
    function dd(a) { a = a.charCodeAt(0); return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16); }
    var Wc = /[#\/\?@]/g, Yc = /[#\?:]/g, Xc = /[#\?]/g, ad = /[#\?@]/g, Zc = /#/g;
    function Sc(a, b) { this.b = this.a = null; this.c = a || null; this.f = !!b; }
    function V(a) { a.a || (a.a = new S, a.b = 0, a.c && Oc(a.c, function (b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c); })); }
    h = Sc.prototype;
    h.add = function (a, b) { V(this); this.c = null; a = W(this, a); var c = this.a.get(a); c || this.a.set(a, c = []); c.push(b); this.b += 1; return this; };
    function ed(a, b) { V(a); b = W(a, b); T(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, a = a.a, T(a.b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && Mc(a))); }
    function fd(a, b) { V(a); b = W(a, b); return T(a.a.b, b); }
    h.forEach = function (a, b) { V(this); this.a.forEach(function (c, d) { na(c, function (e) { a.call(b, e, d, this); }, this); }, this); };
    h.L = function () { V(this); for (var a = this.a.K(), b = this.a.L(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++)
            c.push(b[d]); return c; };
    h.K = function (a) { V(this); var b = []; if ("string" === typeof a)
        fd(this, a) && (b = qa(b, this.a.get(W(this, a))));
    else {
        a = this.a.K();
        for (var c = 0; c < a.length; c++)
            b = qa(b, a[c]);
    } return b; };
    h.set = function (a, b) { V(this); this.c = null; a = W(this, a); fd(this, a) && (this.b -= this.a.get(a).length); this.a.set(a, [b]); this.b += 1; return this; };
    h.get = function (a, b) { if (!a)
        return b; a = this.K(a); return 0 < a.length ? String(a[0]) : b; };
    function nc(a, b, c) { ed(a, b); 0 < c.length && (a.c = null, a.a.set(W(a, b), ra(c)), a.b += c.length); }
    h.toString = function () { if (this.c)
        return this.c; if (!this.a)
        return ""; for (var a = [], b = this.a.L(), c = 0; c < b.length; c++) {
        var d = b[c], e = encodeURIComponent(String(d));
        d = this.K(d);
        for (var f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
            a.push(g);
        }
    } return this.c = a.join("&"); };
    function W(a, b) { b = String(b); a.f && (b = b.toLowerCase()); return b; }
    function $c(a, b) { b && !a.f && (V(a), a.c = null, a.a.forEach(function (c, d) { var e = d.toLowerCase(); d != e && (ed(this, d), nc(this, e, c)); }, a)); a.f = b; }
    var gd = /** @class */ (function () {
        function gd(a, b) {
            this.b = a;
            this.a = b;
        }
        return gd;
    }());
    function hd(a) { this.g = a || id; k.PerformanceNavigationTiming ? (a = k.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(k.ia && k.ia.ya && k.ia.ya() && k.ia.ya().Lb); this.f = a ? this.g : 1; this.a = null; 1 < this.f && (this.a = new Set); this.b = null; this.c = []; }
    var id = 10;
    function jd(a) { return a.b ? !0 : a.a ? a.a.size >= a.f : !1; }
    function Dc(a) { return a.b ? 1 : a.a ? a.a.size : 0; }
    function zc(a, b) { return a.b ? a.b == b : a.a ? a.a.has(b) : !1; }
    function Ec(a, b) { a.a ? a.a.add(b) : a.b = b; }
    function Gc(a, b) { a.b && a.b == b ? a.b = null : a.a && a.a.has(b) && a.a.delete(b); }
    hd.prototype.cancel = function () {
        var e_1, _a;
        this.c = kd(this);
        if (this.b)
            this.b.cancel(), this.b = null;
        else if (this.a && 0 !== this.a.size) {
            try {
                for (var _b = __values(this.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var a = _c.value;
                    a.cancel();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.a.clear();
        }
    };
    function kd(a) {
        var e_2, _a;
        if (null != a.b)
            return a.c.concat(a.b.s);
        if (null != a.a && 0 !== a.a.size) {
            var b = a.c;
            try {
                for (var _b = __values(a.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    b = b.concat(c.s);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return b;
        }
        return ra(a.c);
    }
    function ld() { }
    ld.prototype.stringify = function (a) { return k.JSON.stringify(a, void 0); };
    ld.prototype.parse = function (a) { return k.JSON.parse(a, void 0); };
    function md() { this.a = new ld; }
    function nd(a, b, c) { var d = c || ""; try {
        Lc(a, function (e, f) { var g = e; n(e) && (g = ub(e)); b.push(d + f + "=" + encodeURIComponent(g)); });
    }
    catch (e) {
        throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
    } }
    function od(a, b) { var c = new Ob; if (k.Image) {
        var d = new Image;
        d.onload = ja(pd, c, d, "TestLoadImage: loaded", !0, b);
        d.onerror = ja(pd, c, d, "TestLoadImage: error", !1, b);
        d.onabort = ja(pd, c, d, "TestLoadImage: abort", !1, b);
        d.ontimeout = ja(pd, c, d, "TestLoadImage: timeout", !1, b);
        k.setTimeout(function () { if (d.ontimeout)
            d.ontimeout(); }, 1E4);
        d.src = a;
    }
    else
        b(!1); }
    function pd(a, b, c, d, e) { try {
        b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
    }
    catch (f) { } }
    var qd = k.JSON.parse;
    function X(a) { D.call(this); this.headers = new S; this.H = a || null; this.b = !1; this.s = this.a = null; this.B = ""; this.h = 0; this.f = ""; this.g = this.A = this.l = this.u = !1; this.o = 0; this.m = null; this.I = rd; this.D = this.F = !1; }
    r(X, D);
    var rd = "", sd = /^https?$/i, td = ["POST", "PUT"];
    h = X.prototype;
    h.ba = function (a, b, c, d) {
        if (this.a)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.B + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.B = a;
        this.f = "";
        this.h = 0;
        this.u = !1;
        this.b = !0;
        this.a = new XMLHttpRequest;
        this.s = this.H ? ac(this.H) : ac(ec);
        this.a.onreadystatechange = p(this.za, this);
        try {
            this.A = !0, this.a.open(b, String(a), !0), this.A = !1;
        }
        catch (f) {
            ud(this, f);
            return;
        }
        a = c || "";
        var e = new S(this.headers);
        d && Lc(d, function (f, g) { e.set(g, f); });
        d = oa(e.L());
        c = k.FormData && a instanceof k.FormData;
        !(0 <=
            ma(td, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function (f, g) { this.a.setRequestHeader(g, f); }, this);
        this.I && (this.a.responseType = this.I);
        "withCredentials" in this.a && this.a.withCredentials !== this.F && (this.a.withCredentials = this.F);
        try {
            vd(this), 0 < this.o && ((this.D = wd(this.a)) ? (this.a.timeout = this.o, this.a.ontimeout = p(this.xa, this)) : this.m = Ib(this.xa, this.o, this)), this.l = !0, this.a.send(a), this.l = !1;
        }
        catch (f) {
            ud(this, f);
        }
    };
    function wd(a) { return x && Qa(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout; }
    function pa(a) { return "content-type" == a.toLowerCase(); }
    h.xa = function () { "undefined" != typeof goog && this.a && (this.f = "Timed out after " + this.o + "ms, aborting", this.h = 8, E(this, "timeout"), this.abort(8)); };
    function ud(a, b) { a.b = !1; a.a && (a.g = !0, a.a.abort(), a.g = !1); a.f = b; a.h = 5; xd(a); yd(a); }
    function xd(a) { a.u || (a.u = !0, E(a, "complete"), E(a, "error")); }
    h.abort = function (a) { this.a && this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1, this.h = a || 7, E(this, "complete"), E(this, "abort"), yd(this)); };
    h.G = function () { this.a && (this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1), yd(this, !0)); X.X.G.call(this); };
    h.za = function () { this.j || (this.A || this.l || this.g ? zd(this) : this.Ua()); };
    h.Ua = function () { zd(this); };
    function zd(a) {
        if (a.b && "undefined" != typeof goog && (!a.s[1] || 4 != O(a) || 2 != a.W()))
            if (a.l && 4 == O(a))
                Ib(a.za, 0, a);
            else if (E(a, "readystatechange"), 4 == O(a)) {
                a.b = !1;
                try {
                    {
                        var l = a.W();
                        a: switch (l) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                var b = !0;
                                break a;
                            default: b = !1;
                        }
                        var c;
                        if (!(c = b)) {
                            var d;
                            if (d = 0 === l) {
                                var e = String(a.B).match(Nc)[1] || null;
                                if (!e && k.self && k.self.location) {
                                    var f = k.self.location.protocol;
                                    e = f.substr(0, f.length - 1);
                                }
                                d = !sd.test(e ? e.toLowerCase() : "");
                            }
                            c = d;
                        }
                        var g = c;
                    }
                    if (g)
                        E(a, "complete"),
                            E(a, "success");
                    else {
                        a.h = 6;
                        try {
                            var m = 2 < O(a) ? a.a.statusText : "";
                        }
                        catch (l) {
                            m = "";
                        }
                        a.f = m + " [" + a.W() + "]";
                        xd(a);
                    }
                }
                finally {
                    yd(a);
                }
            }
    }
    function yd(a, b) { if (a.a) {
        vd(a);
        var c = a.a, d = a.s[0] ? aa : null;
        a.a = null;
        a.s = null;
        b || E(a, "ready");
        try {
            c.onreadystatechange = d;
        }
        catch (e) { }
    } }
    function vd(a) { a.a && a.D && (a.a.ontimeout = null); a.m && (k.clearTimeout(a.m), a.m = null); }
    function O(a) { return a.a ? a.a.readyState : 0; }
    h.W = function () { try {
        return 2 < O(this) ? this.a.status : -1;
    }
    catch (a) {
        return -1;
    } };
    h.$ = function () { try {
        return this.a ? this.a.responseText : "";
    }
    catch (a) {
        return "";
    } };
    h.Pa = function (a) { if (this.a) {
        var b = this.a.responseText;
        a && 0 == b.indexOf(a) && (b = b.substring(a.length));
        return qd(b);
    } };
    h.ua = function () { return this.h; };
    h.Qa = function () { return "string" === typeof this.f ? this.f : String(this.f); };
    function Ad(a) { var b = ""; za(a, function (c, d) { b += d; b += ":"; b += c; b += "\r\n"; }); return b; }
    function Bd(a, b, c) { a: {
        for (d in c) {
            var d = !1;
            break a;
        }
        d = !0;
    } d || (c = Ad(c), "string" === typeof a ? (null != c && encodeURIComponent(String(c))) : R(a, b, c)); }
    function Cd(a, b, c) { return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b; }
    function Dd(a) {
        this.pa = 0;
        this.g = [];
        this.c = new Ob;
        this.ga = this.la = this.B = this.fa = this.a = this.na = this.A = this.V = this.i = this.O = this.l = null;
        this.Oa = this.R = 0;
        this.La = Cd("failFast", !1, a);
        this.H = this.m = this.j = this.h = this.f = null;
        this.S = !0;
        this.I = this.oa = this.P = -1;
        this.T = this.o = this.u = 0;
        this.Ha = Cd("baseRetryDelayMs", 5E3, a);
        this.Ra = Cd("retryDelaySeedMs", 1E4, a);
        this.Ma = Cd("forwardChannelMaxRetries", 2, a);
        this.ma = Cd("forwardChannelRequestTimeoutMs", 2E4, a);
        this.Na = a && a.g || void 0;
        this.D = void 0;
        this.C = a && a.supportsCrossDomainXhr ||
            !1;
        this.J = "";
        this.b = new hd(a && a.concurrentRequestLimit);
        this.ka = new md;
        this.da = a && a.fastHandshake || !1;
        this.Ia = a && a.b || !1;
        a && a.f && (this.c.a = !1);
        a && a.forceLongPolling && (this.S = !1);
        this.U = !this.da && this.S && a && a.detectBufferingProxy || !1;
        this.ea = void 0;
        this.N = 0;
        this.F = !1;
        this.s = null;
        (this.Ka = a && a.c || !1) && this.c.info("Opt-in to enable Chrome Origin Trials.");
    }
    h = Dd.prototype;
    h.ha = 8;
    h.v = 1;
    function Jc(a) { Ed(a); if (3 == a.v) {
        var b = a.R++, c = N(a.B);
        R(c, "SID", a.J);
        R(c, "RID", b);
        R(c, "TYPE", "terminate");
        Fd(a, c);
        b = new M(a, a.c, b, void 0);
        b.H = 2;
        b.i = kc(N(c));
        c = !1;
        k.navigator && k.navigator.sendBeacon && (c = k.navigator.sendBeacon(b.i.toString(), ""));
        !c && k.Image && ((new Image).src = b.i, c = !0);
        c || (b.a = oc(b.g, null), b.a.ba(b.i));
        b.u = q();
        mc(b);
    } Gd(a); }
    function Bc(a) { a.a && (wc(a), a.a.cancel(), a.a = null); }
    function Ed(a) { Bc(a); a.j && (k.clearTimeout(a.j), a.j = null); Ac(a); a.b.cancel(); a.h && ("number" === typeof a.h && k.clearTimeout(a.h), a.h = null); }
    function Hd(a, b) { a.g.push(new gd(a.Oa++, b)); 3 == a.v && Ic(a); }
    function Ic(a) { jd(a.b) || a.h || (a.h = !0, Bb(a.Ba, a), a.u = 0); }
    function Id(a, b) { if (Dc(a.b) >= a.b.f - (a.h ? 1 : 0))
        return !1; if (a.h)
        return a.g = b.s.concat(a.g), !0; if (1 == a.v || 2 == a.v || a.u >= (a.La ? 0 : a.Ma))
        return !1; a.h = K(p(a.Ba, a, b), Jd(a, a.u)); a.u++; return !0; }
    h.Ba = function (a) {
        if (this.h)
            if (this.h = null, 1 == this.v) {
                if (!a) {
                    this.R = Math.floor(1E5 * Math.random());
                    a = this.R++;
                    var b = new M(this, this.c, a, void 0), c = this.l;
                    this.O && (c ? (c = Aa(c), Ca(c, this.O)) : c = this.O);
                    null === this.i && (b.B = c);
                    var d;
                    if (this.da)
                        a: {
                            for (var e = d = 0; e < this.g.length; e++) {
                                b: {
                                    var f = this.g[e];
                                    if ("__data__" in f.a && (f = f.a.__data__, "string" === typeof f)) {
                                        f = f.length;
                                        break b;
                                    }
                                    f = void 0;
                                }
                                if (void 0 === f)
                                    break;
                                d += f;
                                if (4096 < d) {
                                    d = e;
                                    break a;
                                }
                                if (4096 === d || e === this.g.length - 1) {
                                    d = e + 1;
                                    break a;
                                }
                            }
                            d = 1E3;
                        }
                    else
                        d = 1E3;
                    d = Kd(this, b, d);
                    e = N(this.B);
                    R(e, "RID", a);
                    R(e, "CVER", 22);
                    this.A && R(e, "X-HTTP-Session-Id", this.A);
                    Fd(this, e);
                    this.i && c && Bd(e, this.i, c);
                    Ec(this.b, b);
                    this.Ia && R(e, "TYPE", "init");
                    this.da ? (R(e, "$req", d), R(e, "SID", "null"), b.U = !0, jc(b, e, null)) : jc(b, e, d);
                    this.v = 2;
                }
            }
            else
                3 == this.v && (a ? Ld(this, a) : 0 == this.g.length || jd(this.b) || Ld(this));
    };
    function Ld(a, b) { var c; b ? c = b.f : c = a.R++; var d = N(a.B); R(d, "SID", a.J); R(d, "RID", c); R(d, "AID", a.P); Fd(a, d); a.i && a.l && Bd(d, a.i, a.l); c = new M(a, a.c, c, a.u + 1); null === a.i && (c.B = a.l); b && (a.g = b.s.concat(a.g)); b = Kd(a, c, 1E3); c.setTimeout(Math.round(.5 * a.ma) + Math.round(.5 * a.ma * Math.random())); Ec(a.b, c); jc(c, d, b); }
    function Fd(a, b) { a.f && Lc({}, function (c, d) { R(b, d, c); }); }
    function Kd(a, b, c) { c = Math.min(a.g.length, c); var d = a.f ? p(a.f.Ja, a.f, a) : null; a: for (var e = a.g, f = -1;;) {
        var g = ["count=" + c];
        -1 == f ? 0 < c ? (f = e[0].b, g.push("ofs=" + f)) : f = 0 : g.push("ofs=" + f);
        for (var m = !0, l = 0; l < c; l++) {
            var u = e[l].b, C = e[l].a;
            u -= f;
            if (0 > u)
                f = Math.max(0, e[l].b - 100), m = !1;
            else
                try {
                    nd(C, g, "req" + u + "_");
                }
                catch (B) {
                    d && d(C);
                }
        }
        if (m) {
            d = g.join("&");
            break a;
        }
    } a = a.g.splice(0, c); b.s = a; return d; }
    function Hc(a) { a.a || a.j || (a.T = 1, Bb(a.Aa, a), a.o = 0); }
    function Cc(a) { if (a.a || a.j || 3 <= a.o)
        return !1; a.T++; a.j = K(p(a.Aa, a), Jd(a, a.o)); a.o++; return !0; }
    h.Aa = function () { this.j = null; Md(this); if (this.U && !(this.F || null == this.a || 0 >= this.N)) {
        var a = 2 * this.N;
        this.c.info("BP detection timer enabled: " + a);
        this.s = K(p(this.Ta, this), a);
    } };
    h.Ta = function () { this.s && (this.s = null, this.c.info("BP detection timeout reached."), this.c.info("Buffering proxy detected and switch to long-polling!"), this.H = !1, this.F = !0, J(10), Bc(this), Md(this)); };
    function wc(a) { null != a.s && (k.clearTimeout(a.s), a.s = null); }
    function Md(a) { a.a = new M(a, a.c, "rpc", a.T); null === a.i && (a.a.B = a.l); a.a.O = 0; var b = N(a.la); R(b, "RID", "rpc"); R(b, "SID", a.J); R(b, "CI", a.H ? "0" : "1"); R(b, "AID", a.P); Fd(a, b); R(b, "TYPE", "xmlhttp"); a.i && a.l && Bd(b, a.i, a.l); a.D && a.a.setTimeout(a.D); var c = a.a; a = a.ga; c.H = 1; c.i = kc(N(b)); c.j = null; c.I = !0; lc(c, a); }
    h.Sa = function () { null != this.m && (this.m = null, Bc(this), Cc(this), J(19)); };
    function Ac(a) { null != a.m && (k.clearTimeout(a.m), a.m = null); }
    function uc(a, b) { var c = null; if (a.a == b) {
        Ac(a);
        wc(a);
        a.a = null;
        var d = 2;
    }
    else if (zc(a.b, b))
        c = b.s, Gc(a.b, b), d = 1;
    else
        return; a.I = b.N; if (0 != a.v)
        if (b.b)
            if (1 == d) {
                c = b.j ? b.j.length : 0;
                b = q() - b.u;
                var e = a.u;
                d = Ub();
                E(d, new Xb(d, c, b, e));
                Ic(a);
            }
            else
                Hc(a);
        else if (e = b.h, 3 == e || 0 == e && 0 < a.I || !(1 == d && Id(a, b) || 2 == d && Cc(a)))
            switch (c && 0 < c.length && (b = a.b, b.c = b.c.concat(c)), e) {
                case 1:
                    Q(a, 5);
                    break;
                case 4:
                    Q(a, 10);
                    break;
                case 3:
                    Q(a, 6);
                    break;
                default: Q(a, 2);
            } }
    function Jd(a, b) { var c = a.Ha + Math.floor(Math.random() * a.Ra); a.f || (c *= 2); return c * b; }
    function Q(a, b) { a.c.info("Error code " + b); if (2 == b) {
        var c = null;
        a.f && (c = null);
        var d = p(a.Ya, a);
        c || (c = new U("//www.google.com/images/cleardot.gif"), k.location && "http" == k.location.protocol || Pc(c, "https"), kc(c));
        od(c.toString(), d);
    }
    else
        J(2); a.v = 0; a.f && a.f.ra(b); Gd(a); Ed(a); }
    h.Ya = function (a) { a ? (this.c.info("Successfully pinged google.com"), J(2)) : (this.c.info("Failed to ping google.com"), J(1)); };
    function Gd(a) { a.v = 0; a.I = -1; if (a.f) {
        if (0 != kd(a.b).length || 0 != a.g.length)
            a.b.c.length = 0, ra(a.g), a.g.length = 0;
        a.f.qa();
    } }
    function Fc(a, b, c) { var d = bd(c); if ("" != d.c)
        b && Qc(d, b + "." + d.c), Rc(d, d.h);
    else {
        var e = k.location;
        d = cd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
    } a.V && za(a.V, function (f, g) { R(d, g, f); }); b = a.A; c = a.na; b && c && R(d, b, c); R(d, "VER", a.ha); Fd(a, d); return d; }
    function oc(a, b) { if (b && !a.C)
        throw Error("Can't create secondary domain capable XhrIo object."); b = new X(a.Na); b.F = a.C; return b; }
    function Nd() { }
    h = Nd.prototype;
    h.ta = function () { };
    h.sa = function () { };
    h.ra = function () { };
    h.qa = function () { };
    h.Ja = function () { };
    function Od() { if (x && !(10 <= Number(Ta)))
        throw Error("Environmental error: no available transport."); }
    Od.prototype.a = function (a, b) { return new Y(a, b); };
    function Y(a, b) {
        D.call(this);
        this.a = new Dd(b);
        this.o = a;
        this.b = b && b.messageUrlParams || null;
        a = b && b.messageHeaders || null;
        b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
        this.a.l = a;
        a = b && b.initMessageHeaders || null;
        b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
        b && b.a && (a ? a["X-WebChannel-Client-Profile"] = b.a : a = { "X-WebChannel-Client-Profile": b.a });
        this.a.O =
            a;
        (a = b && b.httpHeadersOverwriteParam) && !sa(a) && (this.a.i = a);
        this.m = b && b.supportsCrossDomainXhr || !1;
        this.l = b && b.sendRawJson || !1;
        (b = b && b.httpSessionIdParam) && !sa(b) && (this.a.A = b, a = this.b, null !== a && b in a && (a = this.b, b in a && delete a[b]));
        this.f = new Z(this);
    }
    r(Y, D);
    Y.prototype.g = function () { this.a.f = this.f; this.m && (this.a.C = !0); var a = this.a, b = this.o, c = this.b || void 0; J(0); a.fa = b; a.V = c || {}; a.H = a.S; a.B = Fc(a, null, a.fa); Ic(a); };
    Y.prototype.close = function () { Jc(this.a); };
    Y.prototype.h = function (a) { if ("string" === typeof a) {
        var b = {};
        b.__data__ = a;
        Hd(this.a, b);
    }
    else
        this.l ? (b = {}, b.__data__ = ub(a), Hd(this.a, b)) : Hd(this.a, a); };
    Y.prototype.G = function () { this.a.f = null; delete this.f; Jc(this.a); delete this.a; Y.X.G.call(this); };
    function Pd(a) { cc.call(this); var b = a.__sm__; if (b) {
        a: {
            for (var c in b) {
                a = c;
                break a;
            }
            a = void 0;
        }
        (this.c = a) ? (a = this.c, this.data = null !== b && a in b ? b[a] : void 0) : this.data = b;
    }
    else
        this.data = a; }
    r(Pd, cc);
    function Qd() { dc.call(this); this.status = 1; }
    r(Qd, dc);
    function Z(a) { this.a = a; }
    r(Z, Nd);
    Z.prototype.ta = function () { E(this.a, "a"); };
    Z.prototype.sa = function (a) { E(this.a, new Pd(a)); };
    Z.prototype.ra = function (a) { E(this.a, new Qd(a)); };
    Z.prototype.qa = function () { E(this.a, "b"); }; /*

     Copyright 2017 Google LLC

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    Od.prototype.createWebChannel = Od.prototype.a;
    Y.prototype.send = Y.prototype.h;
    Y.prototype.open = Y.prototype.g;
    Y.prototype.close = Y.prototype.close;
    Yb.NO_ERROR = 0;
    Yb.TIMEOUT = 8;
    Yb.HTTP_ERROR = 6;
    Zb.COMPLETE = "complete";
    bc.EventType = L;
    L.OPEN = "a";
    L.CLOSE = "b";
    L.ERROR = "c";
    L.MESSAGE = "d";
    D.prototype.listen = D.prototype.va;
    X.prototype.listenOnce = X.prototype.wa;
    X.prototype.getLastError = X.prototype.Qa;
    X.prototype.getLastErrorCode = X.prototype.ua;
    X.prototype.getStatus = X.prototype.W;
    X.prototype.getResponseJson = X.prototype.Pa;
    X.prototype.getResponseText = X.prototype.$;
    X.prototype.send = X.prototype.ba;
    var createWebChannelTransport = function () { return new Od; };
    var getStatEventTarget = function () { return Ub(); };
    var ErrorCode = Yb;
    var EventType = Zb;
    var Event = H;
    var Stat = { gb: 0, jb: 1, kb: 2, Db: 3, Ib: 4, Fb: 5, Gb: 6, Eb: 7, Cb: 8, Hb: 9, PROXY: 10, NOPROXY: 11, Ab: 12, wb: 13, xb: 14, vb: 15, yb: 16, zb: 17, bb: 18, ab: 19, cb: 20 };
    var WebChannel = bc;
    var XhrIo = X;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Simple wrapper around a nullable UID. Mostly exists to make code more
     * readable.
     */
    class P$1 {
        constructor(t) {
            this.uid = t;
        }
        t() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    i() {
            return this.t() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ P$1.UNAUTHENTICATED = new P$1(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    P$1.o = new P$1("google-credentials-uid"), P$1.u = new P$1("first-party-uid");

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const V$1 = new Logger("@firebase/firestore");

    // Helper methods are needed because variables can't be exported as read/write
    function g() {
        return V$1.logLevel;
    }

    /**
     * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
     *
     * @param logLevel - The verbosity you set for activity and error logging. Can
     *   be any of the following values:
     *
     *   <ul>
     *     <li>`debug` for the most verbose logging level, primarily for
     *     debugging.</li>
     *     <li>`error` to log errors only.</li>
     *     <li><code>`silent` to turn off logging.</li>
     *   </ul>
     */ function y$1(t) {
        V$1.setLogLevel(t);
    }

    function p$1(t, ...e) {
        if (V$1.logLevel <= LogLevel.DEBUG) {
            const n = e.map(S$1);
            V$1.debug("Firestore (8.2.0): " + t, ...n);
        }
    }

    function v$1(t, ...e) {
        if (V$1.logLevel <= LogLevel.ERROR) {
            const n = e.map(S$1);
            V$1.error("Firestore (8.2.0): " + t, ...n);
        }
    }

    function b(t, ...e) {
        if (V$1.logLevel <= LogLevel.WARN) {
            const n = e.map(S$1);
            V$1.warn("Firestore (8.2.0): " + t, ...n);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */ function S$1(t) {
        if ("string" == typeof t) return t;
        try {
            return e = t, JSON.stringify(e);
        } catch (e) {
            // Converting to JSON failed, just log the object directly
            return t;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /** Formats an object as a JSON string, suitable for logging. */
        var e;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Unconditionally fails, throwing an Error with the given message.
     * Messages are stripped in production builds.
     *
     * Returns `never` and can be used in expressions:
     * @example
     * let futureVar = fail('not implemented yet');
     */ function D$1(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const e = "FIRESTORE (8.2.0) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw v$1(e), new Error(e);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function C(t, e) {
        t || D$1();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function N$1(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const x$1 = {
        // Causes are copied from:
        // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
        /** Not an error; returned on success. */
        OK: "ok",
        /** The operation was cancelled (typically by the caller). */
        CANCELLED: "cancelled",
        /** Unknown error or an error from a different error domain. */
        UNKNOWN: "unknown",
        /**
         * Client specified an invalid argument. Note that this differs from
         * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
         * problematic regardless of the state of the system (e.g., a malformed file
         * name).
         */
        INVALID_ARGUMENT: "invalid-argument",
        /**
         * Deadline expired before operation could complete. For operations that
         * change the state of the system, this error may be returned even if the
         * operation has completed successfully. For example, a successful response
         * from a server could have been delayed long enough for the deadline to
         * expire.
         */
        DEADLINE_EXCEEDED: "deadline-exceeded",
        /** Some requested entity (e.g., file or directory) was not found. */
        NOT_FOUND: "not-found",
        /**
         * Some entity that we attempted to create (e.g., file or directory) already
         * exists.
         */
        ALREADY_EXISTS: "already-exists",
        /**
         * The caller does not have permission to execute the specified operation.
         * PERMISSION_DENIED must not be used for rejections caused by exhausting
         * some resource (use RESOURCE_EXHAUSTED instead for those errors).
         * PERMISSION_DENIED must not be used if the caller can not be identified
         * (use UNAUTHENTICATED instead for those errors).
         */
        PERMISSION_DENIED: "permission-denied",
        /**
         * The request does not have valid authentication credentials for the
         * operation.
         */
        UNAUTHENTICATED: "unauthenticated",
        /**
         * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
         * entire file system is out of space.
         */
        RESOURCE_EXHAUSTED: "resource-exhausted",
        /**
         * Operation was rejected because the system is not in a state required for
         * the operation's execution. For example, directory to be deleted may be
         * non-empty, an rmdir operation is applied to a non-directory, etc.
         *
         * A litmus test that may help a service implementor in deciding
         * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
         *  (a) Use UNAVAILABLE if the client can retry just the failing call.
         *  (b) Use ABORTED if the client should retry at a higher-level
         *      (e.g., restarting a read-modify-write sequence).
         *  (c) Use FAILED_PRECONDITION if the client should not retry until
         *      the system state has been explicitly fixed. E.g., if an "rmdir"
         *      fails because the directory is non-empty, FAILED_PRECONDITION
         *      should be returned since the client should not retry unless
         *      they have first fixed up the directory by deleting files from it.
         *  (d) Use FAILED_PRECONDITION if the client performs conditional
         *      REST Get/Update/Delete on a resource and the resource on the
         *      server does not match the condition. E.g., conflicting
         *      read-modify-write on the same resource.
         */
        FAILED_PRECONDITION: "failed-precondition",
        /**
         * The operation was aborted, typically due to a concurrency issue like
         * sequencer check failures, transaction aborts, etc.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        ABORTED: "aborted",
        /**
         * Operation was attempted past the valid range. E.g., seeking or reading
         * past end of file.
         *
         * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
         * if the system state changes. For example, a 32-bit file system will
         * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
         * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
         * an offset past the current file size.
         *
         * There is a fair bit of overlap between FAILED_PRECONDITION and
         * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
         * when it applies so that callers who are iterating through a space can
         * easily look for an OUT_OF_RANGE error to detect when they are done.
         */
        OUT_OF_RANGE: "out-of-range",
        /** Operation is not implemented or not supported/enabled in this service. */
        UNIMPLEMENTED: "unimplemented",
        /**
         * Internal errors. Means some invariants expected by underlying System has
         * been broken. If you see one of these errors, Something is very broken.
         */
        INTERNAL: "internal",
        /**
         * The service is currently unavailable. This is a most likely a transient
         * condition and may be corrected by retrying with a backoff.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        UNAVAILABLE: "unavailable",
        /** Unrecoverable data loss or corruption. */
        DATA_LOSS: "data-loss"
    };

    /** An error returned by a Firestore operation. */ class k$1 extends Error {
        /** @hideconstructor */
        constructor(t, e) {
            super(e), this.code = t, this.message = e, this.name = "FirebaseError", 
            // HACK: We write a toString property directly because Error is not a real
            // class and so inheritance does not work correctly. We could alternatively
            // do the same "back-door inheritance" trick that FirebaseError does.
            this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class O$1 {
        constructor(t, e) {
            this.user = e, this.type = "OAuth", this.h = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.h.Authorization = "Bearer " + t;
        }
    }

    /** A CredentialsProvider that always yields an empty token. */ class M$1 {
        constructor() {
            /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
            this.l = null;
        }
        getToken() {
            return Promise.resolve(null);
        }
        _() {}
        T(t) {
            this.l = t, 
            // Fire with initial user.
            t(P$1.UNAUTHENTICATED);
        }
        I() {
            this.l = null;
        }
    }

    class F$1 {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.A = null, 
            /** Tracks the current User. */
            this.currentUser = P$1.UNAUTHENTICATED, this.m = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.R = 0, 
            /** The listener registered with setChangeListener(). */
            this.l = null, this.forceRefresh = !1, this.A = () => {
                this.R++, this.currentUser = this.P(), this.m = !0, this.l && this.l(this.currentUser);
            }, this.R = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.A) : (
            // if auth is not available, invoke tokenListener once with null token
            this.A(null), t.get().then((t => {
                this.auth = t, this.A && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.A);
            }), (() => {})));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.R, e = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then((e => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.R !== t ? (p$1("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : e ? (C("string" == typeof e.accessToken), new O$1(e.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
        }
        _() {
            this.forceRefresh = !0;
        }
        T(t) {
            this.l = t, 
            // Fire the initial event
            this.m && t(this.currentUser);
        }
        I() {
            this.auth && this.auth.removeAuthTokenListener(this.A), this.A = null, this.l = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        P() {
            const t = this.auth && this.auth.getUid();
            return C(null === t || "string" == typeof t), new P$1(t);
        }
    }

    /*
     * FirstPartyToken provides a fresh token each time its value
     * is requested, because if the token is too old, requests will be rejected.
     * Technically this may no longer be necessary since the SDK should gracefully
     * recover from unauthenticated errors (see b/33147818 for context), but it's
     * safer to keep the implementation as-is.
     */ class $ {
        constructor(t, e) {
            this.V = t, this.g = e, this.type = "FirstParty", this.user = P$1.u;
        }
        get h() {
            const t = {
                "X-Goog-AuthUser": this.g
            }, e = this.V.auth.getAuthHeaderValueForFirstParty([]);
            // Use array notation to prevent minification
                    return e && (t.Authorization = e), t;
        }
    }

    /*
     * Provides user credentials required for the Firestore JavaScript SDK
     * to authenticate the user, using technique that is only available
     * to applications hosted by Google.
     */ class L$1 {
        constructor(t, e) {
            this.V = t, this.g = e;
        }
        getToken() {
            return Promise.resolve(new $(this.V, this.g));
        }
        T(t) {
            // Fire with initial uid.
            t(P$1.u);
        }
        I() {}
        _() {}
    }

    /**
     * Builds a CredentialsProvider depending on the type of
     * the credentials passed in.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class B {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId - The database to use.
         * @param persistenceKey - A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host - The Firestore backend host to connect to.
         * @param ssl - Whether to use SSL when connecting.
         * @param forceLongPolling - Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
         * option when using WebChannel as the network transport.
         */
        constructor(t, e, n, s, i, r) {
            this.p = t, this.persistenceKey = e, this.host = n, this.ssl = s, this.forceLongPolling = i, 
            this.v = r;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class q$1 {
        constructor(t, e) {
            this.projectId = t, this.database = e || "(default)";
        }
        get S() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof q$1 && t.projectId === this.projectId && t.database === this.database;
        }
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
     * exceed. All subsequent calls to next will return increasing values. If provided with a
     * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
     * well as write out sequence numbers that it produces via `next()`.
     */ class U$1 {
        constructor(t, e) {
            this.previousValue = t, e && (e.D = t => this.C(t), this.N = t => e.k(t));
        }
        C(t) {
            return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
        }
        next() {
            const t = ++this.previousValue;
            return this.N && this.N(t), t;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */
    function K$1(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
        if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
        // Falls back to Math.random
        for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
        return n;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ U$1.O = -1;

    class Q$1 {
        static M() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let n = "";
            for (;n.length < 20; ) {
                const s = K$1(40);
                for (let i = 0; i < s.length; ++i) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                n.length < 20 && s[i] < e && (n += t.charAt(s[i] % t.length));
            }
            return n;
        }
    }

    function W$1(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function j(t, e, n) {
        return t.length === e.length && t.every(((t, s) => n(t, e[s])));
    }

    /**
     * Returns the immediate lexicographically-following string. This is useful to
     * construct an inclusive range for indexeddb iterators.
     */ function G$1(t) {
        // Return the input string, with an additional NUL byte appended.
        return t + "\0";
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
    /**
     * A `Timestamp` represents a point in time independent of any time zone or
     * calendar, represented as seconds and fractions of seconds at nanosecond
     * resolution in UTC Epoch time.
     *
     * It is encoded using the Proleptic Gregorian Calendar which extends the
     * Gregorian calendar backwards to year one. It is encoded assuming all minutes
     * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
     * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
     * 9999-12-31T23:59:59.999999999Z.
     *
     * @see https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto
     */
    class z$1 {
        /**
         * Creates a new timestamp.
         *
         * @param seconds - The number of seconds of UTC time since Unix epoch
         *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
         *     9999-12-31T23:59:59Z inclusive.
         * @param nanoseconds - The non-negative fractions of a second at nanosecond
         *     resolution. Negative second values with fractions must still have
         *     non-negative nanoseconds values that count forward in time. Must be
         *     from 0 to 999,999,999 inclusive.
         */
        constructor(t, e) {
            if (this.seconds = t, this.nanoseconds = e, e < 0) throw new k$1(x$1.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (e >= 1e9) throw new k$1(x$1.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (t < -62135596800) throw new k$1(x$1.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new k$1(x$1.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @returns a new timestamp representing the current date.
         */    static now() {
            return z$1.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date - The date to initialize the `Timestamp` from.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return z$1.fromMillis(t.getTime());
        }
        /**
         * Creates a new timestamp from the given number of milliseconds.
         *
         * @param milliseconds - Number of milliseconds since Unix epoch
         *     1970-01-01T00:00:00Z.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     number of milliseconds.
         */    static fromMillis(t) {
            const e = Math.floor(t / 1e3);
            return new z$1(e, 1e6 * (t - 1e3 * e));
        }
        /**
         * Converts a `Timestamp` to a JavaScript `Date` object. This conversion causes
         * a loss of precision since `Date` objects only support millisecond precision.
         *
         * @returns JavaScript `Date` object representing the same point in time as
         *     this `Timestamp`, with millisecond precision.
         */    toDate() {
            return new Date(this.toMillis());
        }
        /**
         * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
         * epoch). This operation causes a loss of precision.
         *
         * @returns The point in time corresponding to this timestamp, represented as
         *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
         */    toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        F(t) {
            return this.seconds === t.seconds ? W$1(this.nanoseconds, t.nanoseconds) : W$1(this.seconds, t.seconds);
        }
        /**
         * Returns true if this `Timestamp` is equal to the provided one.
         *
         * @param other - The `Timestamp` to compare against.
         * @returns true if this `Timestamp` is equal to the provided one.
         */    isEqual(t) {
            return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
        }
        toString() {
            return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
        }
        toJSON() {
            return {
                seconds: this.seconds,
                nanoseconds: this.nanoseconds
            };
        }
        /**
         * Converts this object to a primitive string, which allows Timestamp objects to be compared
         * using the `>`, `<=`, `>=` and `>` operators.
         */    valueOf() {
            // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
            // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
            // with zeroes to be a consistent length. Strings with this format then have a lexiographical
            // ordering that matches the expected ordering. The <seconds> translation is done to avoid
            // having a leading negative sign (i.e. a leading '-' character) in its string representation,
            // which would affect its lexiographical ordering.
            const t = this.seconds - -62135596800;
            // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                    return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A version of a document in Firestore. This corresponds to the version
     * timestamp, such as update_time or read_time.
     */ class H$1 {
        constructor(t) {
            this.timestamp = t;
        }
        static $(t) {
            return new H$1(t);
        }
        static min() {
            return new H$1(new z$1(0, 0));
        }
        L(t) {
            return this.timestamp.F(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    B() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        q() {
            return this.timestamp;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Path represents an ordered sequence of string segments.
     */
    class J$1 {
        constructor(t, e, n) {
            void 0 === e ? e = 0 : e > t.length && D$1(), void 0 === n ? n = t.length - e : n > t.length - e && D$1(), 
            this.segments = t, this.offset = e, this.U = n;
        }
        get length() {
            return this.U;
        }
        isEqual(t) {
            return 0 === J$1.K(this, t);
        }
        child(t) {
            const e = this.segments.slice(this.offset, this.limit());
            return t instanceof J$1 ? t.forEach((t => {
                e.push(t);
            })) : e.push(t), this.W(e);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        j(t) {
            return t = void 0 === t ? 1 : t, this.W(this.segments, this.offset + t, this.length - t);
        }
        G() {
            return this.W(this.segments, this.offset, this.length - 1);
        }
        H() {
            return this.segments[this.offset];
        }
        J() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        Y() {
            return 0 === this.length;
        }
        X(t) {
            if (t.length < this.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        Z(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        forEach(t) {
            for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
        }
        tt() {
            return this.segments.slice(this.offset, this.limit());
        }
        static K(t, e) {
            const n = Math.min(t.length, e.length);
            for (let s = 0; s < n; s++) {
                const n = t.get(s), i = e.get(s);
                if (n < i) return -1;
                if (n > i) return 1;
            }
            return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class Y$1 extends J$1 {
        W(t, e, n) {
            return new Y$1(t, e, n);
        }
        et() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.tt().join("/");
        }
        toString() {
            return this.et();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static nt(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const e = [];
            for (const n of t) {
                if (n.indexOf("//") >= 0) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            e.push(...n.split("/").filter((t => t.length > 0)));
            }
            return new Y$1(e);
        }
        static st() {
            return new Y$1([]);
        }
    }

    const X$1 = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class Z$1 extends J$1 {
        W(t, e, n) {
            return new Z$1(t, e, n);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static it(t) {
            return X$1.test(t);
        }
        et() {
            return this.tt().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), Z$1.it(t) || (t = "`" + t + "`"), 
            t))).join(".");
        }
        toString() {
            return this.et();
        }
        /**
         * Returns true if this field references the key of a document.
         */    rt() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static ot() {
            return new Z$1([ "__name__" ]);
        }
        /**
         * Parses a field string from the given server-formatted string.
         *
         * - Splitting the empty string is not allowed (for now at least).
         * - Empty segments within the string (e.g. if there are two consecutive
         *   separators) are not allowed.
         *
         * TODO(b/37244157): we should make this more strict. Right now, it allows
         * non-identifier path components, even if they aren't escaped.
         */    static ct(t) {
            const e = [];
            let n = "", s = 0;
            const i = () => {
                if (0 === n.length) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                e.push(n), n = "";
            };
            let r = !1;
            for (;s < t.length; ) {
                const e = t[s];
                if ("\\" === e) {
                    if (s + 1 === t.length) throw new k$1(x$1.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                    const e = t[s + 1];
                    if ("\\" !== e && "." !== e && "`" !== e) throw new k$1(x$1.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                    n += e, s += 2;
                } else "`" === e ? (r = !r, s++) : "." !== e || r ? (n += e, s++) : (i(), s++);
            }
            if (i(), r) throw new k$1(x$1.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
            return new Z$1(e);
        }
        static st() {
            return new Z$1([]);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class tt {
        constructor(t) {
            this.path = t;
        }
        static ut(t) {
            return new tt(Y$1.nt(t));
        }
        static at(t) {
            return new tt(Y$1.nt(t).j(5));
        }
        /** Returns true if the document is in the specified collectionId. */    ht(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === Y$1.K(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static K(t, e) {
            return Y$1.K(t.path, e.path);
        }
        static lt(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments - The segments of the path to the document
         * @returns A new instance of DocumentKey
         */    static _t(t) {
            return new tt(new Y$1(t.slice()));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function et(t) {
        let e = 0;
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
        return e;
    }

    function nt(t, e) {
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
    }

    function st(t) {
        for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */ class it {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(Z$1.K);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    ft(t) {
            for (const e of this.fields) if (e.X(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return j(this.fields, t.fields, ((t, e) => t.isEqual(e)));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Converts a Base64 encoded string to a binary string. */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Immutable class that represents a "proto" byte string.
     *
     * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
     * sent on the wire. This class abstracts away this differentiation by holding
     * the proto byte string in a common class that must be converted into a string
     * before being sent as a proto.
     */
    class rt {
        constructor(t) {
            this.dt = t;
        }
        static fromBase64String(t) {
            const e = atob(t);
            return new rt(e);
        }
        static fromUint8Array(t) {
            const e = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let e = "";
                for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
                return e;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new rt(e);
        }
        toBase64() {
            return t = this.dt, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const e = new Uint8Array(t.length);
                for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
                return e;
            }
            /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
            // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
            (this.dt);
        }
        wt() {
            return 2 * this.dt.length;
        }
        L(t) {
            return W$1(this.dt, t.dt);
        }
        isEqual(t) {
            return this.dt === t.dt;
        }
    }

    rt.Et = new rt("");

    const ot = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ function ct(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (C(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let e = 0;
            const n = ot.exec(t);
            if (C(!!n), n[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = n[1];
                t = (t + "000000000").substr(0, 9), e = Number(t);
            }
            // Parse the date to get the seconds.
                    const s = new Date(t);
            return {
                seconds: Math.floor(s.getTime() / 1e3),
                nanos: e
            };
        }
        return {
            seconds: ut(t.seconds),
            nanos: ut(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function ut(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function at(t) {
        return "string" == typeof t ? rt.fromBase64String(t) : rt.fromUint8Array(t);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a locally-applied ServerTimestamp.
     *
     * Server Timestamps are backed by MapValues that contain an internal field
     * `__type__` with a value of `server_timestamp`. The previous value and local
     * write time are stored in its `__previous_value__` and `__local_write_time__`
     * fields respectively.
     *
     * Notes:
     * - ServerTimestampValue instances are created as the result of applying a
     *   TransformMutation (see TransformMutation.applyTo()). They can only exist in
     *   the local view of a document. Therefore they do not need to be parsed or
     *   serialized.
     * - When evaluated locally (e.g. for snapshot.data()), they by default
     *   evaluate to `null`. This behavior can be configured by passing custom
     *   FieldValueOptions to value().
     * - With respect to other ServerTimestampValues, they sort by their
     *   localWriteTime.
     */ function ht(t) {
        var e, n;
        return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
    }

    /**
     * Creates a new ServerTimestamp proto value (using the internal format).
     */
    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */
    function lt(t) {
        const e = t.mapValue.fields.__previous_value__;
        return ht(e) ? lt(e) : e;
    }

    /**
     * Returns the local time at which this timestamp was first set.
     */ function _t(t) {
        const e = ct(t.mapValue.fields.__local_write_time__.timestampValue);
        return new z$1(e.seconds, e.nanos);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Sentinel value that sorts before any Mutation Batch ID. */
    /**
     * Returns whether a variable is either undefined or null.
     */
    function ft(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function dt(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value - The value to test for being an integer and in the safe range
     */ function wt(t) {
        return "number" == typeof t && Number.isInteger(t) && !dt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Extracts the backend's type order for the provided value. */ function Et(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? ht(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : D$1();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function Tt(t, e) {
        const n = Et(t);
        if (n !== Et(e)) return !1;
        switch (n) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === e.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return _t(t).isEqual(_t(e));

          case 3 /* TimestampValue */ :
            return function(t, e) {
                if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === e.timestampValue;
                const n = ct(t.timestampValue), s = ct(e.timestampValue);
                return n.seconds === s.seconds && n.nanos === s.nanos;
            }(t, e);

          case 5 /* StringValue */ :
            return t.stringValue === e.stringValue;

          case 6 /* BlobValue */ :
            return function(t, e) {
                return at(t.bytesValue).isEqual(at(e.bytesValue));
            }(t, e);

          case 7 /* RefValue */ :
            return t.referenceValue === e.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                return ut(t.geoPointValue.latitude) === ut(e.geoPointValue.latitude) && ut(t.geoPointValue.longitude) === ut(e.geoPointValue.longitude);
            }(t, e);

          case 2 /* NumberValue */ :
            return function(t, e) {
                if ("integerValue" in t && "integerValue" in e) return ut(t.integerValue) === ut(e.integerValue);
                if ("doubleValue" in t && "doubleValue" in e) {
                    const n = ut(t.doubleValue), s = ut(e.doubleValue);
                    return n === s ? dt(n) === dt(s) : isNaN(n) && isNaN(s);
                }
                return !1;
            }(t, e);

          case 9 /* ArrayValue */ :
            return j(t.arrayValue.values || [], e.arrayValue.values || [], Tt);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.mapValue.fields || {}, s = e.mapValue.fields || {};
                if (et(n) !== et(s)) return !1;
                for (const t in n) if (n.hasOwnProperty(t) && (void 0 === s[t] || !Tt(n[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, e);

          default:
            return D$1();
        }
    }

    function It(t, e) {
        return void 0 !== (t.values || []).find((t => Tt(t, e)));
    }

    function At(t, e) {
        const n = Et(t), s = Et(e);
        if (n !== s) return W$1(n, s);
        switch (n) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return W$1(t.booleanValue, e.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, e) {
                const n = ut(t.integerValue || t.doubleValue), s = ut(e.integerValue || e.doubleValue);
                return n < s ? -1 : n > s ? 1 : n === s ? 0 : 
                // one or both are NaN.
                isNaN(n) ? isNaN(s) ? 0 : -1 : 1;
            }(t, e);

          case 3 /* TimestampValue */ :
            return mt(t.timestampValue, e.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return mt(_t(t), _t(e));

          case 5 /* StringValue */ :
            return W$1(t.stringValue, e.stringValue);

          case 6 /* BlobValue */ :
            return function(t, e) {
                const n = at(t), s = at(e);
                return n.L(s);
            }(t.bytesValue, e.bytesValue);

          case 7 /* RefValue */ :
            return function(t, e) {
                const n = t.split("/"), s = e.split("/");
                for (let t = 0; t < n.length && t < s.length; t++) {
                    const e = W$1(n[t], s[t]);
                    if (0 !== e) return e;
                }
                return W$1(n.length, s.length);
            }(t.referenceValue, e.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                const n = W$1(ut(t.latitude), ut(e.latitude));
                if (0 !== n) return n;
                return W$1(ut(t.longitude), ut(e.longitude));
            }(t.geoPointValue, e.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, e) {
                const n = t.values || [], s = e.values || [];
                for (let t = 0; t < n.length && t < s.length; ++t) {
                    const e = At(n[t], s[t]);
                    if (e) return e;
                }
                return W$1(n.length, s.length);
            }(t.arrayValue, e.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.fields || {}, s = Object.keys(n), i = e.fields || {}, r = Object.keys(i);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                s.sort(), r.sort();
                for (let t = 0; t < s.length && t < r.length; ++t) {
                    const e = W$1(s[t], r[t]);
                    if (0 !== e) return e;
                    const o = At(n[s[t]], i[r[t]]);
                    if (0 !== o) return o;
                }
                return W$1(s.length, r.length);
            }
            /**
     * Generates the canonical ID for the provided field value (as used in Target
     * serialization).
     */ (t.mapValue, e.mapValue);

          default:
            throw D$1();
        }
    }

    function mt(t, e) {
        if ("string" == typeof t && "string" == typeof e && t.length === e.length) return W$1(t, e);
        const n = ct(t), s = ct(e), i = W$1(n.seconds, s.seconds);
        return 0 !== i ? i : W$1(n.nanos, s.nanos);
    }

    function Rt(t) {
        return Pt(t);
    }

    function Pt(t) {
        return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
            const e = ct(t);
            return `time(${e.seconds},${e.nanos})`;
        }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? at(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
        tt.at(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
            let e = "[", n = !0;
            for (const s of t.values || []) n ? n = !1 : e += ",", e += Pt(s);
            return e + "]";
        }
        /** Returns a reference value for the provided database and key. */ (t.arrayValue) : "mapValue" in t ? function(t) {
            // Iteration order in JavaScript is not guaranteed. To ensure that we generate
            // matching canonical IDs for identical maps, we need to sort the keys.
            const e = Object.keys(t.fields || {}).sort();
            let n = "{", s = !0;
            for (const i of e) s ? s = !1 : n += ",", n += `${i}:${Pt(t.fields[i])}`;
            return n + "}";
        }(t.mapValue) : D$1();
        var e, n;
    }

    function Vt(t, e) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.et()}`
        };
    }

    /** Returns true if `value` is an IntegerValue . */ function gt(t) {
        return !!t && "integerValue" in t;
    }

    /** Returns true if `value` is a DoubleValue. */
    /** Returns true if `value` is an ArrayValue. */
    function yt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function pt(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function vt(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function bt(t) {
        return !!t && "mapValue" in t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */ class St {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new St({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path - the path to search
         * @returns The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.Y()) return this.proto;
            {
                let e = this.proto;
                for (let n = 0; n < t.length - 1; ++n) {
                    if (!e.mapValue.fields) return null;
                    if (e = e.mapValue.fields[t.get(n)], !bt(e)) return null;
                }
                return e = (e.mapValue.fields || {})[t.J()], e || null;
            }
        }
        isEqual(t) {
            return Tt(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class Dt {
        /**
         * @param baseObject - The object to mutate.
         */
        constructor(t = St.empty()) {
            this.Tt = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.It = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path - The field path to set.
         * @param value - The value to set.
         * @returns The current Builder instance.
         */    set(t, e) {
            return this.At(t, e), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path - The field path to remove.
         * @returns The current Builder instance.
         */    delete(t) {
            return this.At(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    At(t, e) {
            let n = this.It;
            for (let e = 0; e < t.length - 1; ++e) {
                const s = t.get(e);
                let i = n.get(s);
                i instanceof Map ? 
                // Re-use a previously created map
                n = i : i && 10 /* ObjectValue */ === Et(i) ? (
                // Convert the existing Protobuf MapValue into a map
                i = new Map(Object.entries(i.mapValue.fields || {})), n.set(s, i), n = i) : (
                // Create an empty map to represent the current nesting level
                i = new Map, n.set(s, i), n = i);
            }
            n.set(t.J(), e);
        }
        /** Returns an ObjectValue with all mutations applied. */    Rt() {
            const t = this.Pt(Z$1.st(), this.It);
            return null != t ? new St(t) : this.Tt;
        }
        /**
         * Applies any overlays from `currentOverlays` that exist at `currentPath`
         * and returns the merged data at `currentPath` (or null if there were no
         * changes).
         *
         * @param currentPath - The path at the current nesting level. Can be set to
         * FieldValue.emptyPath() to represent the root.
         * @param currentOverlays - The overlays at the current nesting level in the
         * same format as `overlayMap`.
         * @returns The merged data at `currentPath` or null if no modifications
         * were applied.
         */    Pt(t, e) {
            let n = !1;
            const s = this.Tt.field(t), i = bt(s) ? // If there is already data at the current path, base our
            Object.assign({}, s.mapValue.fields) : {};
            return e.forEach(((e, s) => {
                if (e instanceof Map) {
                    const r = this.Pt(t.child(s), e);
                    null != r && (i[s] = r, n = !0);
                } else null !== e ? (i[s] = e, n = !0) : i.hasOwnProperty(s) && (delete i[s], n = !0);
            })), n ? {
                mapValue: {
                    fields: i
                }
            } : null;
        }
    }

    /**
     * Returns a FieldMask built from all fields in a MapValue.
     */ function Ct(t) {
        const e = [];
        return nt(t.fields || {}, ((t, n) => {
            const s = new Z$1([ t ]);
            if (bt(n)) {
                const t = Ct(n.mapValue).fields;
                if (0 === t.length) 
                // Preserve the empty map by adding it to the FieldMask.
                e.push(s); else 
                // For nested and non-empty ObjectValues, add the FieldPath of the
                // leaf nodes.
                for (const n of t) e.push(s.child(n));
            } else 
            // For nested and non-empty ObjectValues, add the FieldPath of the leaf
            // nodes.
            e.push(s);
        })), new it(e);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The result of a lookup for a given path may be an existing document or a
     * marker that this document does not exist at a given version.
     */ class Nt {
        constructor(t, e) {
            this.key = t, this.version = e;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class xt extends Nt {
        constructor(t, e, n, s) {
            super(t, e), this.Vt = n, this.gt = !!s.gt, this.hasCommittedMutations = !!s.hasCommittedMutations;
        }
        field(t) {
            return this.Vt.field(t);
        }
        data() {
            return this.Vt;
        }
        yt() {
            return this.Vt.proto;
        }
        isEqual(t) {
            return t instanceof xt && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.gt === t.gt && this.hasCommittedMutations === t.hasCommittedMutations && this.Vt.isEqual(t.Vt);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.Vt.toString()}, {hasLocalMutations: ${this.gt}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.gt || this.hasCommittedMutations;
        }
    }

    /**
     * Compares the value for field `field` in the provided documents. Throws if
     * the field does not exist in both documents.
     */
    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */
    class kt extends Nt {
        constructor(t, e, n) {
            super(t, e), this.hasCommittedMutations = !(!n || !n.hasCommittedMutations);
        }
        toString() {
            return `NoDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return this.hasCommittedMutations;
        }
        isEqual(t) {
            return t instanceof kt && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
        }
    }

    /**
     * A class representing an existing document whose data is unknown (e.g. a
     * document that was updated without a known base document).
     */ class Ot extends Nt {
        toString() {
            return `UnknownDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return !0;
        }
        isEqual(t) {
            return t instanceof Ot && t.version.isEqual(this.version) && t.key.isEqual(this.key);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Visible for testing
    class Mt {
        constructor(t, e = null, n = [], s = [], i = null, r = null, o = null) {
            this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, 
            this.startAt = r, this.endAt = o, this.vt = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function Ft(t, e = null, n = [], s = [], i = null, r = null, o = null) {
        return new Mt(t, e, n, s, i, r, o);
    }

    function $t(t) {
        const e = N$1(t);
        if (null === e.vt) {
            let t = e.path.et();
            null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map((t => Kt(t))).join(","), 
            t += "|ob:", t += e.orderBy.map((t => function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.et() + t.dir;
            }(t))).join(","), ft(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", 
            t += Zt(e.startAt)), e.endAt && (t += "|ub:", t += Zt(e.endAt)), e.vt = t;
        }
        return e.vt;
    }

    function Lt(t) {
        let e = t.path.et();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += `, filters: [${t.filters.map((t => {
        return `${(e = t).field.et()} ${e.op} ${Rt(e.value)}`;
        /** Returns a debug description for `filter`. */
        var e;
        /** Filter that matches on key fields (i.e. '__name__'). */    })).join(", ")}]`), 
        ft(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map((t => function(t) {
        return `${t.field.et()} (${t.dir})`;
    }(t))).join(", ")}]`), t.startAt && (e += ", startAt: " + Zt(t.startAt)), t.endAt && (e += ", endAt: " + Zt(t.endAt)), 
        `Target(${e})`;
    }

    function Bt(t, e) {
        if (t.limit !== e.limit) return !1;
        if (t.orderBy.length !== e.orderBy.length) return !1;
        for (let n = 0; n < t.orderBy.length; n++) if (!ee(t.orderBy[n], e.orderBy[n])) return !1;
        if (t.filters.length !== e.filters.length) return !1;
        for (let i = 0; i < t.filters.length; i++) if (n = t.filters[i], s = e.filters[i], 
        n.op !== s.op || !n.field.isEqual(s.field) || !Tt(n.value, s.value)) return !1;
        var n, s;
        return t.collectionGroup === e.collectionGroup && (!!t.path.isEqual(e.path) && (!!se(t.startAt, e.startAt) && se(t.endAt, e.endAt)));
    }

    function qt(t) {
        return tt.lt(t.path) && null === t.collectionGroup && 0 === t.filters.length;
    }

    class Ut extends class {} {
        constructor(t, e, n) {
            super(), this.field = t, this.op = e, this.value = n;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, e, n) {
            return t.rt() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.bt(t, e, n) : new Qt(t, e, n) : "array-contains" /* ARRAY_CONTAINS */ === e ? new zt(t, n) : "in" /* IN */ === e ? new Ht(t, n) : "not-in" /* NOT_IN */ === e ? new Jt(t, n) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Yt(t, n) : new Ut(t, e, n);
        }
        static bt(t, e, n) {
            return "in" /* IN */ === e ? new Wt(t, n) : new jt(t, n);
        }
        matches(t) {
            const e = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.St(At(e, this.value)) : null !== e && Et(this.value) === Et(e) && this.St(At(e, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        St(t) {
            switch (this.op) {
              case "<" /* LESS_THAN */ :
                return t < 0;

              case "<=" /* LESS_THAN_OR_EQUAL */ :
                return t <= 0;

              case "==" /* EQUAL */ :
                return 0 === t;

              case "!=" /* NOT_EQUAL */ :
                return 0 !== t;

              case ">" /* GREATER_THAN */ :
                return t > 0;

              case ">=" /* GREATER_THAN_OR_EQUAL */ :
                return t >= 0;

              default:
                return D$1();
            }
        }
        Dt() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    function Kt(t) {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return t.field.et() + t.op.toString() + Rt(t.value);
    }

    class Qt extends Ut {
        constructor(t, e, n) {
            super(t, e, n), this.key = tt.at(n.referenceValue);
        }
        matches(t) {
            const e = tt.K(t.key, this.key);
            return this.St(e);
        }
    }

    /** Filter that matches on key fields within an array. */ class Wt extends Ut {
        constructor(t, e) {
            super(t, "in" /* IN */ , e), this.keys = Gt("in" /* IN */ , e);
        }
        matches(t) {
            return this.keys.some((e => e.isEqual(t.key)));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class jt extends Ut {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e), this.keys = Gt("not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            return !this.keys.some((e => e.isEqual(t.key)));
        }
    }

    function Gt(t, e) {
        var n;
        return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t => tt.at(t.referenceValue)));
    }

    /** A Filter that implements the array-contains operator. */ class zt extends Ut {
        constructor(t, e) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return yt(e) && It(e.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class Ht extends Ut {
        constructor(t, e) {
            super(t, "in" /* IN */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return null !== e && It(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the not-in operator. */ class Jt extends Ut {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            if (It(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const e = t.field(this.field);
            return null !== e && !It(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class Yt extends Ut {
        constructor(t, e) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return !(!yt(e) || !e.arrayValue.values) && e.arrayValue.values.some((t => It(this.value.arrayValue, t)));
        }
    }

    /**
     * Represents a bound of a query.
     *
     * The bound is specified with the given components representing a position and
     * whether it's just before or just after the position (relative to whatever the
     * query order is).
     *
     * The position represents a logical index position for a query. It's a prefix
     * of values for the (potentially implicit) order by clauses of a query.
     *
     * Bound provides a function to determine whether a document comes before or
     * after a bound. This is influenced by whether the position is just before or
     * just after the provided values.
     */ class Xt {
        constructor(t, e) {
            this.position = t, this.before = e;
        }
    }

    function Zt(t) {
        // TODO(b/29183165): Make this collision robust.
        return `${t.before ? "b" : "a"}:${t.position.map((t => Rt(t))).join(",")}`;
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class te {
        constructor(t, e = "asc" /* ASCENDING */) {
            this.field = t, this.dir = e;
        }
    }

    function ee(t, e) {
        return t.dir === e.dir && t.field.isEqual(e.field);
    }

    /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */ function ne(t, e, n) {
        let s = 0;
        for (let i = 0; i < t.position.length; i++) {
            const r = e[i], o = t.position[i];
            if (r.field.rt()) s = tt.K(tt.at(o.referenceValue), n.key); else {
                s = At(o, n.field(r.field));
            }
            if ("desc" /* DESCENDING */ === r.dir && (s *= -1), 0 !== s) break;
        }
        return t.before ? s <= 0 : s < 0;
    }

    function se(t, e) {
        if (null === t) return null === e;
        if (null === e) return !1;
        if (t.before !== e.before || t.position.length !== e.position.length) return !1;
        for (let n = 0; n < t.position.length; n++) {
            if (!Tt(t.position[n], e.position[n])) return !1;
        }
        return !0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Query encapsulates all the query attributes we support in the SDK. It can
     * be run against the LocalStore, as well as be converted to a `Target` to
     * query the RemoteStore results.
     *
     * Visible for testing.
     */ class ie {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, e = null, n = [], s = [], i = null, r = "F" /* First */ , o = null, c = null) {
            this.path = t, this.collectionGroup = e, this.Ct = n, this.filters = s, this.limit = i, 
            this.limitType = r, this.startAt = o, this.endAt = c, this.Nt = null, 
            // The corresponding `Target` of this `Query` instance.
            this.xt = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query instance with the options provided. */ function re(t, e, n, s, i, r, o, c) {
        return new ie(t, e, n, s, i, r, o, c);
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function oe(t) {
        return new ie(t);
    }

    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */ function ce(t) {
        return !ft(t.limit) && "F" /* First */ === t.limitType;
    }

    function ue(t) {
        return !ft(t.limit) && "L" /* Last */ === t.limitType;
    }

    function ae(t) {
        return t.Ct.length > 0 ? t.Ct[0].field : null;
    }

    function he(t) {
        for (const e of t.filters) if (e.Dt()) return e.field;
        return null;
    }

    /**
     * Checks if any of the provided Operators are included in the query and
     * returns the first one that is, or null if none are.
     */
    /**
     * Returns whether the query matches a collection group rather than a specific
     * collection.
     */
    function le(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function _e(t) {
        const e = N$1(t);
        if (null === e.Nt) {
            e.Nt = [];
            const t = he(e), n = ae(e);
            if (null !== t && null === n) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.rt() || e.Nt.push(new te(t)), e.Nt.push(new te(Z$1.ot(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const n of e.Ct) e.Nt.push(n), n.field.rt() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = e.Ct.length > 0 ? e.Ct[e.Ct.length - 1].dir : "asc" /* ASCENDING */;
                    e.Nt.push(new te(Z$1.ot(), t));
                }
            }
        }
        return e.Nt;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function fe(t) {
        const e = N$1(t);
        if (!e.xt) if ("F" /* First */ === e.limitType) e.xt = Ft(e.path, e.collectionGroup, _e(e), e.filters, e.limit, e.startAt, e.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const n of _e(e)) {
                const e = "desc" /* DESCENDING */ === n.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new te(n.field, e));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const n = e.endAt ? new Xt(e.endAt.position, !e.endAt.before) : null, s = e.startAt ? new Xt(e.startAt.position, !e.startAt.before) : null;
            // Now return as a LimitType.First query.
            e.xt = Ft(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
        }
        return e.xt;
    }

    function de(t, e, n) {
        return new ie(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
    }

    function we(t, e) {
        return Bt(fe(t), fe(e)) && t.limitType === e.limitType;
    }

    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    function Ee(t) {
        return `${$t(fe(t))}|lt:${t.limitType}`;
    }

    function Te(t) {
        return `Query(target=${Lt(fe(t))}; limitType=${t.limitType})`;
    }

    /** Returns whether `doc` matches the constraints of `query`. */ function Ie(t, e) {
        return function(t, e) {
            const n = e.key.path;
            return null !== t.collectionGroup ? e.key.ht(t.collectionGroup) && t.path.X(n) : tt.lt(t.path) ? t.path.isEqual(n) : t.path.Z(n);
        }
        /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */ (t, e) && function(t, e) {
            for (const n of t.Ct) 
            // order by key always matches
            if (!n.field.rt() && null === e.field(n.field)) return !1;
            return !0;
        }(t, e) && function(t, e) {
            for (const n of t.filters) if (!n.matches(e)) return !1;
            return !0;
        }
        /** Makes sure a document is within the bounds, if provided. */ (t, e) && function(t, e) {
            if (t.startAt && !ne(t.startAt, _e(t), e)) return !1;
            if (t.endAt && ne(t.endAt, _e(t), e)) return !1;
            return !0;
        }
        /**
     * Returns a new comparator function that can be used to compare two documents
     * based on the Query's ordering constraint.
     */ (t, e);
    }

    function Ae(t) {
        return (e, n) => {
            let s = !1;
            for (const i of _e(t)) {
                const t = me(i, e, n);
                if (0 !== t) return t;
                s = s || i.field.rt();
            }
            return 0;
        };
    }

    function me(t, e, n) {
        const s = t.field.rt() ? tt.K(e.key, n.key) : function(t, e, n) {
            const s = e.field(t), i = n.field(t);
            return null !== s && null !== i ? At(s, i) : D$1();
        }(t.field, e, n);
        switch (t.dir) {
          case "asc" /* ASCENDING */ :
            return s;

          case "desc" /* DESCENDING */ :
            return -1 * s;

          default:
            return D$1();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable set of metadata that the local store tracks for each target.
     */ class Re {
        constructor(
        /** The target being listened to. */
        t, 
        /**
         * The target ID to which the target corresponds; Assigned by the
         * LocalStore for user listens and by the SyncEngine for limbo watches.
         */
        e, 
        /** The purpose of the target. */
        n, 
        /**
         * The sequence number of the last transaction during which this target data
         * was modified.
         */
        s, 
        /** The latest snapshot version seen for this target. */
        i = H$1.min()
        /**
         * The maximum snapshot version at which the associated view
         * contained no limbo documents.
         */ , r = H$1.min()
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */ , o = rt.Et) {
            this.target = t, this.targetId = e, this.kt = n, this.sequenceNumber = s, this.Ot = i, 
            this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
        }
        /** Creates a new target data instance with an updated sequence number. */    Mt(t) {
            return new Re(this.target, this.targetId, this.kt, t, this.Ot, this.lastLimboFreeSnapshotVersion, this.resumeToken);
        }
        /**
         * Creates a new target data instance with an updated resume token and
         * snapshot version.
         */    Ft(t, e) {
            return new Re(this.target, this.targetId, this.kt, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
        }
        /**
         * Creates a new target data instance with an updated last limbo free
         * snapshot version number.
         */    $t(t) {
            return new Re(this.target, this.targetId, this.kt, this.sequenceNumber, this.Ot, t, this.resumeToken);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */ function Pe(t, e) {
        if (t.Lt) {
            if (isNaN(e)) return {
                doubleValue: "NaN"
            };
            if (e === 1 / 0) return {
                doubleValue: "Infinity"
            };
            if (e === -1 / 0) return {
                doubleValue: "-Infinity"
            };
        }
        return {
            doubleValue: dt(e) ? "-0" : e
        };
    }

    /**
     * Returns an IntegerValue for `value`.
     */ function Ve(t) {
        return {
            integerValue: "" + t
        };
    }

    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */ function ge(t, e) {
        return wt(e) ? Ve(e) : Pe(t, e);
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Represents a transform within a TransformMutation. */ class ye {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this.Bt = void 0;
        }
    }

    /**
     * Computes the local transform result against the provided `previousValue`,
     * optionally using the provided localWriteTime.
     */ function pe(t, e, n) {
        return t instanceof Se ? function(t, e) {
            const n = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (n.fields.__previous_value__ = e), {
                mapValue: n
            };
        }(n, e) : t instanceof De ? Ce(t, e) : t instanceof Ne ? xe(t, e) : function(t, e) {
            // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
            // precision and resolves overflows by reducing precision, we do not
            // manually cap overflows at 2^63.
            const n = be(t, e), s = Oe(n) + Oe(t.qt);
            return gt(n) && gt(t.qt) ? Ve(s) : Pe(t.Ut, s);
        }(t, e);
    }

    /**
     * Computes a final transform result after the transform has been acknowledged
     * by the server, potentially using the server-provided transformResult.
     */ function ve(t, e, n) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return t instanceof De ? Ce(t, e) : t instanceof Ne ? xe(t, e) : n;
    }

    /**
     * If this transform operation is not idempotent, returns the base value to
     * persist for this transform. If a base value is returned, the transform
     * operation is always applied to this base value, even if document has
     * already been updated.
     *
     * Base values provide consistent behavior for non-idempotent transforms and
     * allow us to return the same latency-compensated value even if the backend
     * has already applied the transform operation. The base value is null for
     * idempotent transforms, as they can be re-played even if the backend has
     * already applied them.
     *
     * @returns a base value to store along with the mutation, or null for
     * idempotent transforms.
     */ function be(t, e) {
        return t instanceof ke ? gt(n = e) || function(t) {
            return !!t && "doubleValue" in t;
        }
        /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (n) ? e : {
            integerValue: 0
        } : null;
        var n;
    }

    /** Transforms a value into a server-generated timestamp. */
    class Se extends ye {}

    /** Transforms an array value via a union operation. */ class De extends ye {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function Ce(t, e) {
        const n = Me(e);
        for (const e of t.elements) n.some((t => Tt(t, e))) || n.push(e);
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /** Transforms an array value via a remove operation. */ class Ne extends ye {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function xe(t, e) {
        let n = Me(e);
        for (const e of t.elements) n = n.filter((t => !Tt(t, e)));
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class ke extends ye {
        constructor(t, e) {
            super(), this.Ut = t, this.qt = e;
        }
    }

    function Oe(t) {
        return ut(t.integerValue || t.doubleValue);
    }

    function Me(t) {
        return yt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** A field path and the TransformOperation to perform upon it. */ class Fe {
        constructor(t, e) {
            this.field = t, this.transform = e;
        }
    }

    function $e(t, e) {
        return t.field.isEqual(e.field) && function(t, e) {
            return t instanceof De && e instanceof De || t instanceof Ne && e instanceof Ne ? j(t.elements, e.elements, Tt) : t instanceof ke && e instanceof ke ? Tt(t.qt, e.qt) : t instanceof Se && e instanceof Se;
        }(t.transform, e.transform);
    }

    /** The result of successfully applying a mutation to the backend. */
    class Le {
        constructor(
        /**
         * The version at which the mutation was committed:
         *
         * - For most operations, this is the updateTime in the WriteResult.
         * - For deletes, the commitTime of the WriteResponse (because deletes are
         *   not stored and have no updateTime).
         *
         * Note that these versions can be different: No-op writes will not change
         * the updateTime even though the commitTime advances.
         */
        t, 
        /**
         * The resulting fields returned from the backend after a
         * TransformMutation has been committed. Contains one FieldValue for each
         * FieldTransform that was in the mutation.
         *
         * Will be null if the mutation was not a TransformMutation.
         */
        e) {
            this.version = t, this.transformResults = e;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class Be {
        constructor(t, e) {
            this.updateTime = t, this.exists = e;
        }
        /** Creates a new empty Precondition. */    static Kt() {
            return new Be;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new Be(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new Be(t);
        }
        /** Returns whether this Precondition is empty. */    get Qt() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
    }

    /**
     * Returns true if the preconditions is valid for the given document
     * (or null if no document is available).
     */ function qe(t, e) {
        return void 0 !== t.updateTime ? e instanceof xt && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e instanceof xt;
    }

    /**
     * A mutation describes a self-contained change to a document. Mutations can
     * create, replace, delete, and update subsets of documents.
     *
     * Mutations not only act on the value of the document but also its version.
     *
     * For local mutations (mutations that haven't been committed yet), we preserve
     * the existing version for Set, Patch, and Transform mutations. For Delete
     * mutations, we reset the version to 0.
     *
     * Here's the expected transition table.
     *
     * MUTATION           APPLIED TO            RESULTS IN
     *
     * SetMutation        Document(v3)          Document(v3)
     * SetMutation        NoDocument(v3)        Document(v0)
     * SetMutation        null                  Document(v0)
     * PatchMutation      Document(v3)          Document(v3)
     * PatchMutation      NoDocument(v3)        NoDocument(v3)
     * PatchMutation      null                  null
     * TransformMutation  Document(v3)          Document(v3)
     * TransformMutation  NoDocument(v3)        NoDocument(v3)
     * TransformMutation  null                  null
     * DeleteMutation     Document(v3)          NoDocument(v0)
     * DeleteMutation     NoDocument(v3)        NoDocument(v0)
     * DeleteMutation     null                  NoDocument(v0)
     *
     * For acknowledged mutations, we use the updateTime of the WriteResponse as
     * the resulting version for Set, Patch, and Transform mutations. As deletes
     * have no explicit update time, we use the commitTime of the WriteResponse for
     * Delete mutations.
     *
     * If a mutation is acknowledged by the backend but fails the precondition check
     * locally, we return an `UnknownDocument` and rely on Watch to send us the
     * updated version.
     *
     * Note that TransformMutations don't create Documents (in the case of being
     * applied to a NoDocument), even though they would on the backend. This is
     * because the client always combines the TransformMutation with a SetMutation
     * or PatchMutation and we only want to apply the transform if the prior
     * mutation resulted in a Document (always true for a SetMutation, but not
     * necessarily for a PatchMutation).
     *
     * ## Subclassing Notes
     *
     * Subclasses of Mutation need to implement applyToRemoteDocument() and
     * applyToLocalView() to implement the actual behavior of applying the mutation
     * to some source document.
     */ class Ue {}

    /**
     * Applies this mutation to the given MaybeDocument or null for the purposes
     * of computing a new remote document. If the input document doesn't match the
     * expected state (e.g. it is null or outdated), an `UnknownDocument` can be
     * returned.
     *
     * @param mutation - The mutation to apply.
     * @param maybeDoc - The document to mutate. The input document can be null if
     *     the client has no knowledge of the pre-mutation state of the document.
     * @param mutationResult - The result of applying the mutation from the backend.
     * @returns The mutated document. The returned document may be an
     *     UnknownDocument if the mutation could not be applied to the locally
     *     cached base document.
     */ function Ke(t, e, n) {
        return t instanceof ze ? function(t, e, n) {
            // Unlike applySetMutationToLocalView, if we're applying a mutation to a
            // remote document the server has accepted the mutation so the precondition
            // must have held.
            let s = t.value;
            if (n.transformResults) {
                const i = Ye(t.fieldTransforms, e, n.transformResults);
                s = Ze(t.fieldTransforms, s, i);
            }
            return new xt(t.key, n.version, s, {
                hasCommittedMutations: !0
            });
        }(t, e, n) : t instanceof He ? function(t, e, n) {
            if (!qe(t.Wt, e)) 
            // Since the mutation was not rejected, we know that the precondition
            // matched on the backend. We therefore must not have the expected version
            // of the document in our cache and return an UnknownDocument with the
            // known updateTime.
            return new Ot(t.key, n.version);
            const s = n.transformResults ? Ye(t.fieldTransforms, e, n.transformResults) : [], i = Je(t, e, s);
            return new xt(t.key, n.version, i, {
                hasCommittedMutations: !0
            });
        }(t, e, n) : function(t, e, n) {
            // Unlike applyToLocalView, if we're applying a mutation to a remote
            // document the server has accepted the mutation so the precondition must
            // have held.
            return new kt(t.key, n.version, {
                hasCommittedMutations: !0
            });
        }(t, 0, n);
    }

    /**
     * Applies this mutation to the given MaybeDocument or null for the purposes
     * of computing the new local view of a document. Both the input and returned
     * documents can be null.
     *
     * @param mutation - The mutation to apply.
     * @param maybeDoc - The document to mutate. The input document can be null if
     *     the client has no knowledge of the pre-mutation state of the document.
     * @param baseDoc - The state of the document prior to this mutation batch. The
     *     input document can be null if the client has no knowledge of the
     *     pre-mutation state of the document.
     * @param localWriteTime - A timestamp indicating the local write time of the
     *     batch this mutation is a part of.
     * @returns The mutated document. The returned document may be null, but only
     *     if maybeDoc was null and the mutation would not create a new document.
     */ function Qe(t, e, n, s) {
        return t instanceof ze ? function(t, e, n, s) {
            if (!qe(t.Wt, e)) return e;
            let i = t.value;
            if (t.fieldTransforms) {
                const r = Xe(t.fieldTransforms, n, e, s);
                i = Ze(t.fieldTransforms, i, r);
            }
            const r = Ge(e);
            return new xt(t.key, r, i, {
                gt: !0
            });
        }
        /**
     * A mutation that modifies fields of the document at the given key with the
     * given values. The values are applied through a field mask:
     *
     *  * When a field is in both the mask and the values, the corresponding field
     *    is updated.
     *  * When a field is in neither the mask nor the values, the corresponding
     *    field is unmodified.
     *  * When a field is in the mask but not in the values, the corresponding field
     *    is deleted.
     *  * When a field is not in the mask but is in the values, the values map is
     *    ignored.
     */ (t, e, s, n) : t instanceof He ? function(t, e, n, s) {
            if (!qe(t.Wt, e)) return e;
            const i = Ge(e), r = Xe(t.fieldTransforms, n, e, s), o = Je(t, e, r);
            return new xt(t.key, i, o, {
                gt: !0
            });
        }
        /**
     * Patches the data of document if available or creates a new document. Note
     * that this does not check whether or not the precondition of this patch
     * holds.
     */ (t, e, s, n) : function(t, e) {
            if (!qe(t.Wt, e)) return e;
            return new kt(t.key, H$1.min());
        }
        /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ (t, e);
    }

    /**
     * If this mutation is not idempotent, returns the base value to persist with
     * this mutation. If a base value is returned, the mutation is always applied
     * to this base value, even if document has already been updated.
     *
     * The base value is a sparse object that consists of only the document
     * fields for which this mutation contains a non-idempotent transformation
     * (e.g. a numeric increment). The provided value guarantees consistent
     * behavior for non-idempotent transforms and allow us to return the same
     * latency-compensated value even if the backend has already applied the
     * mutation. The base value is null for idempotent mutations, as they can be
     * re-played even if the backend has already applied them.
     *
     * @returns a base value to store along with the mutation, or null for
     * idempotent mutations.
     */ function We(t, e) {
        return void 0 !== t.fieldTransforms ? function(t, e) {
            let n = null;
            for (const s of t) {
                const t = e instanceof xt ? e.field(s.field) : void 0, i = be(s.transform, t || null);
                null != i && (n = null == n ? (new Dt).set(s.field, i) : n.set(s.field, i));
            }
            return n ? n.Rt() : null;
        }(t.fieldTransforms, e) : null;
    }

    function je(t, e) {
        return t.type === e.type && (!!t.key.isEqual(e.key) && (!!t.Wt.isEqual(e.Wt) && (!!function(t, e) {
            return void 0 === t && void 0 === e || !(!t || !e) && j(t, e, ((t, e) => $e(t, e)));
        }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.jt.isEqual(e.jt)))));
    }

    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */ function Ge(t) {
        return t instanceof xt ? t.version : H$1.min();
    }

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class ze extends Ue {
        constructor(t, e, n, s = []) {
            super(), this.key = t, this.value = e, this.Wt = n, this.fieldTransforms = s, this.type = 0 /* Set */;
        }
    }

    class He extends Ue {
        constructor(t, e, n, s, i = []) {
            super(), this.key = t, this.data = e, this.jt = n, this.Wt = s, this.fieldTransforms = i, 
            this.type = 1 /* Patch */;
        }
    }

    function Je(t, e, n) {
        let s;
        return s = e instanceof xt ? e.data() : St.empty(), s = function(t, e) {
            const n = new Dt(e);
            return t.jt.fields.forEach((e => {
                if (!e.Y()) {
                    const s = t.data.field(e);
                    null !== s ? n.set(e, s) : n.delete(e);
                }
            })), n.Rt();
        }
        /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a
     * TransformMutation has been acknowledged by the server.
     *
     * @param fieldTransforms - The field transforms to apply the result to.
     * @param baseDoc - The document prior to applying this mutation batch.
     * @param serverTransformResults - The transform results received by the server.
     * @returns The transform results list.
     */ (t, s), s = Ze(t.fieldTransforms, s, n), s;
    }

    function Ye(t, e, n) {
        const s = [];
        C(t.length === n.length);
        for (let i = 0; i < n.length; i++) {
            const r = t[i], o = r.transform;
            let c = null;
            e instanceof xt && (c = e.field(r.field)), s.push(ve(o, c, n[i]));
        }
        return s;
    }

    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * TransformMutation locally.
     *
     * @param fieldTransforms - The field transforms to apply the result to.
     * @param localWriteTime - The local time of the transform mutation (used to
     *     generate ServerTimestampValues).
     * @param maybeDoc - The current state of the document after applying all
     *     previous mutations.
     * @param baseDoc - The document prior to applying this mutation batch.
     * @returns The transform results list.
     */ function Xe(t, e, n, s) {
        const i = [];
        for (const r of t) {
            const t = r.transform;
            let o = null;
            n instanceof xt && (o = n.field(r.field)), null === o && s instanceof xt && (
            // If the current document does not contain a value for the mutated
            // field, use the value that existed before applying this mutation
            // batch. This solves an edge case where a PatchMutation clears the
            // values in a nested map before the TransformMutation is applied.
            o = s.field(r.field)), i.push(pe(t, o, e));
        }
        return i;
    }

    function Ze(t, e, n) {
        const s = new Dt(e);
        for (let e = 0; e < t.length; e++) {
            const i = t[e];
            s.set(i.field, n[e]);
        }
        return s.Rt();
    }

    /** A mutation that deletes the document at the given key. */ class tn extends Ue {
        constructor(t, e) {
            super(), this.key = t, this.Wt = e, this.type = 2 /* Delete */ , this.fieldTransforms = [];
        }
    }

    class en extends Ue {
        constructor(t, e) {
            super(), this.key = t, this.Wt = e, this.type = 3 /* Verify */ , this.fieldTransforms = [];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class nn {
        // TODO(b/33078163): just use simplest form of existence filter for now
        constructor(t) {
            this.count = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Error Codes describing the different ways GRPC can fail. These are copied
     * directly from GRPC's sources here:
     *
     * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
     *
     * Important! The names of these identifiers matter because the string forms
     * are used for reverse lookups from the webchannel stream. Do NOT change the
     * names of these identifiers or change this into a const enum.
     */ var sn, rn;

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
    function on(t) {
        switch (t) {
          case x$1.OK:
            return D$1();

          case x$1.CANCELLED:
          case x$1.UNKNOWN:
          case x$1.DEADLINE_EXCEEDED:
          case x$1.RESOURCE_EXHAUSTED:
          case x$1.INTERNAL:
          case x$1.UNAVAILABLE:
     // Unauthenticated means something went wrong with our token and we need
            // to retry with new credentials which will happen automatically.
                  case x$1.UNAUTHENTICATED:
            return !1;

          case x$1.INVALID_ARGUMENT:
          case x$1.NOT_FOUND:
          case x$1.ALREADY_EXISTS:
          case x$1.PERMISSION_DENIED:
          case x$1.FAILED_PRECONDITION:
     // Aborted might be retried in some scenarios, but that is dependant on
            // the context and should handled individually by the calling code.
            // See https://cloud.google.com/apis/design/errors.
                  case x$1.ABORTED:
          case x$1.OUT_OF_RANGE:
          case x$1.UNIMPLEMENTED:
          case x$1.DATA_LOSS:
            return !0;

          default:
            return D$1();
        }
    }

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a write operation.
     *
     * Write operations must be handled specially because as of b/119437764, ABORTED
     * errors on the write stream should be retried too (even though ABORTED errors
     * are not generally retryable).
     *
     * Note that during the initial handshake on the write stream an ABORTED error
     * signals that we should discard our stream token (i.e. it is permanent). This
     * means a handshake error should be classified with isPermanentError, above.
     */
    /**
     * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
     * are not the same as HTTP status codes.
     *
     * @returns The Code equivalent to the given GRPC status code. Fails if there
     *     is no match.
     */
    function cn(t) {
        if (void 0 === t) 
        // This shouldn't normally happen, but in certain error cases (like trying
        // to send invalid proto messages) we may get an error with no GRPC code.
        return v$1("GRPC error has no .code"), x$1.UNKNOWN;
        switch (t) {
          case sn.OK:
            return x$1.OK;

          case sn.CANCELLED:
            return x$1.CANCELLED;

          case sn.UNKNOWN:
            return x$1.UNKNOWN;

          case sn.DEADLINE_EXCEEDED:
            return x$1.DEADLINE_EXCEEDED;

          case sn.RESOURCE_EXHAUSTED:
            return x$1.RESOURCE_EXHAUSTED;

          case sn.INTERNAL:
            return x$1.INTERNAL;

          case sn.UNAVAILABLE:
            return x$1.UNAVAILABLE;

          case sn.UNAUTHENTICATED:
            return x$1.UNAUTHENTICATED;

          case sn.INVALID_ARGUMENT:
            return x$1.INVALID_ARGUMENT;

          case sn.NOT_FOUND:
            return x$1.NOT_FOUND;

          case sn.ALREADY_EXISTS:
            return x$1.ALREADY_EXISTS;

          case sn.PERMISSION_DENIED:
            return x$1.PERMISSION_DENIED;

          case sn.FAILED_PRECONDITION:
            return x$1.FAILED_PRECONDITION;

          case sn.ABORTED:
            return x$1.ABORTED;

          case sn.OUT_OF_RANGE:
            return x$1.OUT_OF_RANGE;

          case sn.UNIMPLEMENTED:
            return x$1.UNIMPLEMENTED;

          case sn.DATA_LOSS:
            return x$1.DATA_LOSS;

          default:
            return D$1();
        }
    }

    /**
     * Converts an HTTP response's error status to the equivalent error code.
     *
     * @param status - An HTTP error response status ("FAILED_PRECONDITION",
     * "UNKNOWN", etc.)
     * @returns The equivalent Code. Non-matching responses are mapped to
     *     Code.UNKNOWN.
     */ (rn = sn || (sn = {}))[rn.OK = 0] = "OK", rn[rn.CANCELLED = 1] = "CANCELLED", 
    rn[rn.UNKNOWN = 2] = "UNKNOWN", rn[rn.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    rn[rn.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", rn[rn.NOT_FOUND = 5] = "NOT_FOUND", 
    rn[rn.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", rn[rn.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    rn[rn.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", rn[rn.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    rn[rn.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", rn[rn.ABORTED = 10] = "ABORTED", 
    rn[rn.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", rn[rn.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    rn[rn.INTERNAL = 13] = "INTERNAL", rn[rn.UNAVAILABLE = 14] = "UNAVAILABLE", rn[rn.DATA_LOSS = 15] = "DATA_LOSS";

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // An immutable sorted map implementation, based on a Left-leaning Red-Black
    // tree.
    class un {
        constructor(t, e) {
            this.K = t, this.root = e || hn.EMPTY;
        }
        // Returns a copy of the map, with the specified key/value added or replaced.
        Gt(t, e) {
            return new un(this.K, this.root.Gt(t, e, this.K).copy(null, null, hn.zt, null, null));
        }
        // Returns a copy of the map, with the specified key removed.
        remove(t) {
            return new un(this.K, this.root.remove(t, this.K).copy(null, null, hn.zt, null, null));
        }
        // Returns the value of the node with the given key, or null.
        get(t) {
            let e = this.root;
            for (;!e.Y(); ) {
                const n = this.K(t, e.key);
                if (0 === n) return e.value;
                n < 0 ? e = e.left : n > 0 && (e = e.right);
            }
            return null;
        }
        // Returns the index of the element in this sorted map, or -1 if it doesn't
        // exist.
        indexOf(t) {
            // Number of nodes that were pruned when descending right
            let e = 0, n = this.root;
            for (;!n.Y(); ) {
                const s = this.K(t, n.key);
                if (0 === s) return e + n.left.size;
                s < 0 ? n = n.left : (
                // Count all nodes left of the node plus the node itself
                e += n.left.size + 1, n = n.right);
            }
            // Node not found
                    return -1;
        }
        Y() {
            return this.root.Y();
        }
        // Returns the total number of nodes in the map.
        get size() {
            return this.root.size;
        }
        // Returns the minimum key in the map.
        Ht() {
            return this.root.Ht();
        }
        // Returns the maximum key in the map.
        Jt() {
            return this.root.Jt();
        }
        // Traverses the map in key order and calls the specified action function
        // for each key/value pair. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        Yt(t) {
            return this.root.Yt(t);
        }
        forEach(t) {
            this.Yt(((e, n) => (t(e, n), !1)));
        }
        toString() {
            const t = [];
            return this.Yt(((e, n) => (t.push(`${e}:${n}`), !1))), `{${t.join(", ")}}`;
        }
        // Traverses the map in reverse key order and calls the specified action
        // function for each key/value pair. If action returns true, traversal is
        // aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        Xt(t) {
            return this.root.Xt(t);
        }
        // Returns an iterator over the SortedMap.
        Zt() {
            return new an(this.root, null, this.K, !1);
        }
        te(t) {
            return new an(this.root, t, this.K, !1);
        }
        ee() {
            return new an(this.root, null, this.K, !0);
        }
        ne(t) {
            return new an(this.root, t, this.K, !0);
        }
    }

     // end SortedMap
    // An iterator over an LLRBNode.
    class an {
        constructor(t, e, n, s) {
            this.se = s, this.ie = [];
            let i = 1;
            for (;!t.Y(); ) if (i = e ? n(t.key, e) : 1, 
            // flip the comparison if we're going in reverse
            s && (i *= -1), i < 0) 
            // This node is less than our start key. ignore it
            t = this.se ? t.left : t.right; else {
                if (0 === i) {
                    // This node is exactly equal to our start key. Push it on the stack,
                    // but stop iterating;
                    this.ie.push(t);
                    break;
                }
                // This node is greater than our start key, add it to the stack and move
                // to the next one
                this.ie.push(t), t = this.se ? t.right : t.left;
            }
        }
        re() {
            let t = this.ie.pop();
            const e = {
                key: t.key,
                value: t.value
            };
            if (this.se) for (t = t.left; !t.Y(); ) this.ie.push(t), t = t.right; else for (t = t.right; !t.Y(); ) this.ie.push(t), 
            t = t.left;
            return e;
        }
        oe() {
            return this.ie.length > 0;
        }
        ce() {
            if (0 === this.ie.length) return null;
            const t = this.ie[this.ie.length - 1];
            return {
                key: t.key,
                value: t.value
            };
        }
    }

     // end SortedMapIterator
    // Represents a node in a Left-leaning Red-Black tree.
    class hn {
        constructor(t, e, n, s, i) {
            this.key = t, this.value = e, this.color = null != n ? n : hn.RED, this.left = null != s ? s : hn.EMPTY, 
            this.right = null != i ? i : hn.EMPTY, this.size = this.left.size + 1 + this.right.size;
        }
        // Returns a copy of the current node, optionally replacing pieces of it.
        copy(t, e, n, s, i) {
            return new hn(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
        }
        Y() {
            return !1;
        }
        // Traverses the tree in key order and calls the specified action function
        // for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        Yt(t) {
            return this.left.Yt(t) || t(this.key, this.value) || this.right.Yt(t);
        }
        // Traverses the tree in reverse key order and calls the specified action
        // function for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        Xt(t) {
            return this.right.Xt(t) || t(this.key, this.value) || this.left.Xt(t);
        }
        // Returns the minimum node in the tree.
        min() {
            return this.left.Y() ? this : this.left.min();
        }
        // Returns the maximum key in the tree.
        Ht() {
            return this.min().key;
        }
        // Returns the maximum key in the tree.
        Jt() {
            return this.right.Y() ? this.key : this.right.Jt();
        }
        // Returns new tree, with the key/value added.
        Gt(t, e, n) {
            let s = this;
            const i = n(t, s.key);
            return s = i < 0 ? s.copy(null, null, null, s.left.Gt(t, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.Gt(t, e, n)), 
            s.ue();
        }
        ae() {
            if (this.left.Y()) return hn.EMPTY;
            let t = this;
            return t.left.he() || t.left.left.he() || (t = t.le()), t = t.copy(null, null, null, t.left.ae(), null), 
            t.ue();
        }
        // Returns new tree, with the specified item removed.
        remove(t, e) {
            let n, s = this;
            if (e(t, s.key) < 0) s.left.Y() || s.left.he() || s.left.left.he() || (s = s.le()), 
            s = s.copy(null, null, null, s.left.remove(t, e), null); else {
                if (s.left.he() && (s = s._e()), s.right.Y() || s.right.he() || s.right.left.he() || (s = s.fe()), 
                0 === e(t, s.key)) {
                    if (s.right.Y()) return hn.EMPTY;
                    n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.ae());
                }
                s = s.copy(null, null, null, null, s.right.remove(t, e));
            }
            return s.ue();
        }
        he() {
            return this.color;
        }
        // Returns new tree after performing any needed rotations.
        ue() {
            let t = this;
            return t.right.he() && !t.left.he() && (t = t.de()), t.left.he() && t.left.left.he() && (t = t._e()), 
            t.left.he() && t.right.he() && (t = t.we()), t;
        }
        le() {
            let t = this.we();
            return t.right.left.he() && (t = t.copy(null, null, null, null, t.right._e()), t = t.de(), 
            t = t.we()), t;
        }
        fe() {
            let t = this.we();
            return t.left.left.he() && (t = t._e(), t = t.we()), t;
        }
        de() {
            const t = this.copy(null, null, hn.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, t, null);
        }
        _e() {
            const t = this.copy(null, null, hn.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, t);
        }
        we() {
            const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, t, e);
        }
        // For testing.
        Ee() {
            const t = this.Te();
            return Math.pow(2, t) <= this.size + 1;
        }
        // In a balanced RB tree, the black-depth (number of black nodes) from root to
        // leaves is equal on both sides.  This function verifies that or asserts.
        Te() {
            if (this.he() && this.left.he()) throw D$1();
            if (this.right.he()) throw D$1();
            const t = this.left.Te();
            if (t !== this.right.Te()) throw D$1();
            return t + (this.he() ? 0 : 1);
        }
    }

     // end LLRBNode
    // Empty node is shared between all LLRB trees.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hn.EMPTY = null, hn.RED = !0, hn.zt = !1;

    // end LLRBEmptyNode
    hn.EMPTY = new 
    // Represents an empty node (a leaf node in the Red-Black Tree).
    class {
        constructor() {
            this.size = 0;
        }
        get key() {
            throw D$1();
        }
        get value() {
            throw D$1();
        }
        get color() {
            throw D$1();
        }
        get left() {
            throw D$1();
        }
        get right() {
            throw D$1();
        }
        // Returns a copy of the current node.
        copy(t, e, n, s, i) {
            return this;
        }
        // Returns a copy of the tree, with the specified key/value added.
        Gt(t, e, n) {
            return new hn(t, e);
        }
        // Returns a copy of the tree, with the specified key removed.
        remove(t, e) {
            return this;
        }
        Y() {
            return !0;
        }
        Yt(t) {
            return !1;
        }
        Xt(t) {
            return !1;
        }
        Ht() {
            return null;
        }
        Jt() {
            return null;
        }
        he() {
            return !1;
        }
        // For testing.
        Ee() {
            return !0;
        }
        Te() {
            return 0;
        }
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * SortedSet is an immutable (copy-on-write) collection that holds elements
     * in order specified by the provided comparator.
     *
     * NOTE: if provided comparator returns 0 for two elements, we consider them to
     * be equal!
     */
    class ln {
        constructor(t) {
            this.K = t, this.data = new un(this.K);
        }
        has(t) {
            return null !== this.data.get(t);
        }
        first() {
            return this.data.Ht();
        }
        last() {
            return this.data.Jt();
        }
        get size() {
            return this.data.size;
        }
        indexOf(t) {
            return this.data.indexOf(t);
        }
        /** Iterates elements in order defined by "comparator" */    forEach(t) {
            this.data.Yt(((e, n) => (t(e), !1)));
        }
        /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */    Ie(t, e) {
            const n = this.data.te(t[0]);
            for (;n.oe(); ) {
                const s = n.re();
                if (this.K(s.key, t[1]) >= 0) return;
                e(s.key);
            }
        }
        /**
         * Iterates over `elem`s such that: start &lt;= elem until false is returned.
         */    Ae(t, e) {
            let n;
            for (n = void 0 !== e ? this.data.te(e) : this.data.Zt(); n.oe(); ) {
                if (!t(n.re().key)) return;
            }
        }
        /** Finds the least element greater than or equal to `elem`. */    me(t) {
            const e = this.data.te(t);
            return e.oe() ? e.re().key : null;
        }
        Zt() {
            return new _n(this.data.Zt());
        }
        te(t) {
            return new _n(this.data.te(t));
        }
        /** Inserts or updates an element */    add(t) {
            return this.copy(this.data.remove(t).Gt(t, !0));
        }
        /** Deletes an element */    delete(t) {
            return this.has(t) ? this.copy(this.data.remove(t)) : this;
        }
        Y() {
            return this.data.Y();
        }
        Re(t) {
            let e = this;
            // Make sure `result` always refers to the larger one of the two sets.
                    return e.size < t.size && (e = t, t = this), t.forEach((t => {
                e = e.add(t);
            })), e;
        }
        isEqual(t) {
            if (!(t instanceof ln)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.data.Zt(), n = t.data.Zt();
            for (;e.oe(); ) {
                const t = e.re().key, s = n.re().key;
                if (0 !== this.K(t, s)) return !1;
            }
            return !0;
        }
        tt() {
            const t = [];
            return this.forEach((e => {
                t.push(e);
            })), t;
        }
        toString() {
            const t = [];
            return this.forEach((e => t.push(e))), "SortedSet(" + t.toString() + ")";
        }
        copy(t) {
            const e = new ln(this.K);
            return e.data = t, e;
        }
    }

    class _n {
        constructor(t) {
            this.Pe = t;
        }
        re() {
            return this.Pe.re().key;
        }
        oe() {
            return this.Pe.oe();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const fn = new un(tt.K);

    function dn() {
        return fn;
    }

    function wn() {
        return dn();
    }

    const En = new un(tt.K);

    function Tn() {
        return En;
    }

    const In = new un(tt.K);

    const An = new ln(tt.K);

    function mn(...t) {
        let e = An;
        for (const n of t) e = e.add(n);
        return e;
    }

    const Rn = new ln(W$1);

    function Pn() {
        return Rn;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentSet is an immutable (copy-on-write) collection that holds documents
     * in order specified by the provided comparator. We always add a document key
     * comparator on top of what is provided to guarantee document equality based on
     * the key.
     */ class Vn {
        /** The default ordering is by key if the comparator is omitted */
        constructor(t) {
            // We are adding document key comparator to the end as it's the only
            // guaranteed unique property of a document.
            this.K = t ? (e, n) => t(e, n) || tt.K(e.key, n.key) : (t, e) => tt.K(t.key, e.key), 
            this.Ve = Tn(), this.ge = new un(this.K);
        }
        /**
         * Returns an empty copy of the existing DocumentSet, using the same
         * comparator.
         */    static ye(t) {
            return new Vn(t.K);
        }
        has(t) {
            return null != this.Ve.get(t);
        }
        get(t) {
            return this.Ve.get(t);
        }
        first() {
            return this.ge.Ht();
        }
        last() {
            return this.ge.Jt();
        }
        Y() {
            return this.ge.Y();
        }
        /**
         * Returns the index of the provided key in the document set, or -1 if the
         * document key is not present in the set;
         */    indexOf(t) {
            const e = this.Ve.get(t);
            return e ? this.ge.indexOf(e) : -1;
        }
        get size() {
            return this.ge.size;
        }
        /** Iterates documents in order defined by "comparator" */    forEach(t) {
            this.ge.Yt(((e, n) => (t(e), !1)));
        }
        /** Inserts or updates a document with the same key */    add(t) {
            // First remove the element if we have it.
            const e = this.delete(t.key);
            return e.copy(e.Ve.Gt(t.key, t), e.ge.Gt(t, null));
        }
        /** Deletes a document with a given key */    delete(t) {
            const e = this.get(t);
            return e ? this.copy(this.Ve.remove(t), this.ge.remove(e)) : this;
        }
        isEqual(t) {
            if (!(t instanceof Vn)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.ge.Zt(), n = t.ge.Zt();
            for (;e.oe(); ) {
                const t = e.re().key, s = n.re().key;
                if (!t.isEqual(s)) return !1;
            }
            return !0;
        }
        toString() {
            const t = [];
            return this.forEach((e => {
                t.push(e.toString());
            })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
        }
        copy(t, e) {
            const n = new Vn;
            return n.K = this.K, n.Ve = t, n.ge = e, n;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
     * duplicate events for the same doc.
     */ class gn {
        constructor() {
            this.pe = new un(tt.K);
        }
        track(t) {
            const e = t.doc.key, n = this.pe.get(e);
            n ? 
            // Merge the new change with the existing change.
            0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.pe = this.pe.Gt(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.pe = this.pe.Gt(e, {
                type: n.type,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.pe = this.pe.Gt(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.pe = this.pe.Gt(e, {
                type: 0 /* Added */ ,
                doc: t.doc
            }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.pe = this.pe.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.pe = this.pe.Gt(e, {
                type: 1 /* Removed */ ,
                doc: n.doc
            }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.pe = this.pe.Gt(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 
            // This includes these cases, which don't make sense:
            // Added->Added
            // Removed->Removed
            // Modified->Added
            // Removed->Modified
            // Metadata->Added
            // Removed->Metadata
            D$1() : this.pe = this.pe.Gt(e, t);
        }
        ve() {
            const t = [];
            return this.pe.Yt(((e, n) => {
                t.push(n);
            })), t;
        }
    }

    class yn {
        constructor(t, e, n, s, i, r, o, c) {
            this.query = t, this.docs = e, this.be = n, this.docChanges = s, this.Se = i, this.fromCache = r, 
            this.De = o, this.Ce = c;
        }
        /** Returns a view snapshot as if all documents in the snapshot were added. */    static Ne(t, e, n, s) {
            const i = [];
            return e.forEach((t => {
                i.push({
                    type: 0 /* Added */ ,
                    doc: t
                });
            })), new yn(t, e, Vn.ye(e), i, n, s, 
            /* syncStateChanged= */ !0, 
            /* excludesMetadataChanges= */ !1);
        }
        get hasPendingWrites() {
            return !this.Se.Y();
        }
        isEqual(t) {
            if (!(this.fromCache === t.fromCache && this.De === t.De && this.Se.isEqual(t.Se) && we(this.query, t.query) && this.docs.isEqual(t.docs) && this.be.isEqual(t.be))) return !1;
            const e = this.docChanges, n = t.docChanges;
            if (e.length !== n.length) return !1;
            for (let t = 0; t < e.length; t++) if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1;
            return !0;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An event from the RemoteStore. It is split into targetChanges (changes to the
     * state or the set of documents in our watched targets) and documentUpdates
     * (changes to the actual documents).
     */ class pn {
        constructor(
        /**
         * The snapshot version this event brings us up to, or MIN if not set.
         */
        t, 
        /**
         * A map from target to changes to the target. See TargetChange.
         */
        e, 
        /**
         * A set of targets that is known to be inconsistent. Listens for these
         * targets should be re-established without resume tokens.
         */
        n, 
        /**
         * A set of which documents have changed or been deleted, along with the
         * doc's new values (if not deleted).
         */
        s, 
        /**
         * A set of which document updates are due only to limbo resolution targets.
         */
        i) {
            this.Ot = t, this.xe = e, this.ke = n, this.Oe = s, this.Me = i;
        }
        /**
         * HACK: Views require RemoteEvents in order to determine whether the view is
         * CURRENT, but secondary tabs don't receive remote events. So this method is
         * used to create a synthesized RemoteEvent that can be used to apply a
         * CURRENT status change to a View, for queries executed in a different tab.
         */
        // PORTING NOTE: Multi-tab only
        static Fe(t, e) {
            const n = new Map;
            return n.set(t, vn.$e(t, e)), new pn(H$1.min(), n, Pn(), dn(), mn());
        }
    }

    /**
     * A TargetChange specifies the set of changes for a specific target as part of
     * a RemoteEvent. These changes track which documents are added, modified or
     * removed, as well as the target's resume token and whether the target is
     * marked CURRENT.
     * The actual changes *to* documents are not part of the TargetChange since
     * documents may be part of multiple targets.
     */ class vn {
        constructor(
        /**
         * An opaque, server-assigned token that allows watching a query to be resumed
         * after disconnecting without retransmitting all the data that matches the
         * query. The resume token essentially identifies a point in time from which
         * the server should resume sending results.
         */
        t, 
        /**
         * The "current" (synced) status of this target. Note that "current"
         * has special meaning in the RPC protocol that implies that a target is
         * both up-to-date and consistent with the rest of the watch stream.
         */
        e, 
        /**
         * The set of documents that were newly assigned to this target as part of
         * this remote event.
         */
        n, 
        /**
         * The set of documents that were already assigned to this target but received
         * an update during this remote event.
         */
        s, 
        /**
         * The set of documents that were removed from this target as part of this
         * remote event.
         */
        i) {
            this.resumeToken = t, this.Le = e, this.Be = n, this.qe = s, this.Ue = i;
        }
        /**
         * This method is used to create a synthesized TargetChanges that can be used to
         * apply a CURRENT status change to a View (for queries executed in a different
         * tab) or for new queries (to raise snapshots with correct CURRENT status).
         */    static $e(t, e) {
            return new vn(rt.Et, e, mn(), mn(), mn());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a changed document and a list of target ids to which this change
     * applies.
     *
     * If document has been deleted NoDocument will be provided.
     */ class bn {
        constructor(
        /** The new document applies to all of these targets. */
        t, 
        /** The new document is removed from all of these targets. */
        e, 
        /** The key of the document for this change. */
        n, 
        /**
         * The new document or NoDocument if it was deleted. Is null if the
         * document went out of view without the server sending a new document.
         */
        s) {
            this.Ke = t, this.removedTargetIds = e, this.key = n, this.Qe = s;
        }
    }

    class Sn {
        constructor(t, e) {
            this.targetId = t, this.We = e;
        }
    }

    class Dn {
        constructor(
        /** What kind of change occurred to the watch target. */
        t, 
        /** The target IDs that were added/removed/set. */
        e, 
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */
        n = rt.Et
        /** An RPC error indicating why the watch failed. */ , s = null) {
            this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = s;
        }
    }

    /** Tracks the internal state of a Watch target. */ class Cn {
        constructor() {
            /**
             * The number of pending responses (adds or removes) that we are waiting on.
             * We only consider targets active that have no pending responses.
             */
            this.je = 0, 
            /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
            this.Ge = kn(), 
            /** See public getters for explanations of these fields. */
            this.ze = rt.Et, this.He = !1, 
            /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
            this.Je = !0;
        }
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */    get Le() {
            return this.He;
        }
        /** The last resume token sent to us for this target. */    get resumeToken() {
            return this.ze;
        }
        /** Whether this target has pending target adds or target removes. */    get Ye() {
            return 0 !== this.je;
        }
        /** Whether we have modified any state that should trigger a snapshot. */    get Xe() {
            return this.Je;
        }
        /**
         * Applies the resume token to the TargetChange, but only when it has a new
         * value. Empty resumeTokens are discarded.
         */    Ze(t) {
            t.wt() > 0 && (this.Je = !0, this.ze = t);
        }
        /**
         * Creates a target change from the current set of changes.
         *
         * To reset the document changes after raising this snapshot, call
         * `clearPendingChanges()`.
         */    tn() {
            let t = mn(), e = mn(), n = mn();
            return this.Ge.forEach(((s, i) => {
                switch (i) {
                  case 0 /* Added */ :
                    t = t.add(s);
                    break;

                  case 2 /* Modified */ :
                    e = e.add(s);
                    break;

                  case 1 /* Removed */ :
                    n = n.add(s);
                    break;

                  default:
                    D$1();
                }
            })), new vn(this.ze, this.He, t, e, n);
        }
        /**
         * Resets the document changes and sets `hasPendingChanges` to false.
         */    en() {
            this.Je = !1, this.Ge = kn();
        }
        nn(t, e) {
            this.Je = !0, this.Ge = this.Ge.Gt(t, e);
        }
        sn(t) {
            this.Je = !0, this.Ge = this.Ge.remove(t);
        }
        rn() {
            this.je += 1;
        }
        on() {
            this.je -= 1;
        }
        cn() {
            this.Je = !0, this.He = !0;
        }
    }

    /**
     * A helper class to accumulate watch changes into a RemoteEvent.
     */
    class Nn {
        constructor(t) {
            this.un = t, 
            /** The internal state of all tracked targets. */
            this.an = new Map, 
            /** Keeps track of the documents to update since the last raised snapshot. */
            this.hn = dn(), 
            /** A mapping of document keys to their set of target IDs. */
            this.ln = xn(), 
            /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
            this._n = new ln(W$1);
        }
        /**
         * Processes and adds the DocumentWatchChange to the current set of changes.
         */    fn(t) {
            for (const e of t.Ke) t.Qe instanceof xt ? this.dn(e, t.Qe) : t.Qe instanceof kt && this.wn(e, t.key, t.Qe);
            for (const e of t.removedTargetIds) this.wn(e, t.key, t.Qe);
        }
        /** Processes and adds the WatchTargetChange to the current set of changes. */    En(t) {
            this.Tn(t, (e => {
                const n = this.In(e);
                switch (t.state) {
                  case 0 /* NoChange */ :
                    this.An(e) && n.Ze(t.resumeToken);
                    break;

                  case 1 /* Added */ :
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.on(), n.Ye || 
                    // We have a freshly added target, so we need to reset any state
                    // that we had previously. This can happen e.g. when remove and add
                    // back a target for existence filter mismatches.
                    n.en(), n.Ze(t.resumeToken);
                    break;

                  case 2 /* Removed */ :
                    // We need to keep track of removed targets to we can post-filter and
                    // remove any target changes.
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.on(), n.Ye || this.removeTarget(e);
                    break;

                  case 3 /* Current */ :
                    this.An(e) && (n.cn(), n.Ze(t.resumeToken));
                    break;

                  case 4 /* Reset */ :
                    this.An(e) && (
                    // Reset the target and synthesizes removes for all existing
                    // documents. The backend will re-add any documents that still
                    // match the target before it sends the next global snapshot.
                    this.mn(e), n.Ze(t.resumeToken));
                    break;

                  default:
                    D$1();
                }
            }));
        }
        /**
         * Iterates over all targetIds that the watch change applies to: either the
         * targetIds explicitly listed in the change or the targetIds of all currently
         * active targets.
         */    Tn(t, e) {
            t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.an.forEach(((t, n) => {
                this.An(n) && e(n);
            }));
        }
        /**
         * Handles existence filters and synthesizes deletes for filter mismatches.
         * Targets that are invalidated by filter mismatches are added to
         * `pendingTargetResets`.
         */    Rn(t) {
            const e = t.targetId, n = t.We.count, s = this.Pn(e);
            if (s) {
                const t = s.target;
                if (qt(t)) if (0 === n) {
                    // The existence filter told us the document does not exist. We deduce
                    // that this document does not exist and apply a deleted document to
                    // our updates. Without applying this deleted document there might be
                    // another query that will raise this document as part of a snapshot
                    // until it is resolved, essentially exposing inconsistency between
                    // queries.
                    const n = new tt(t.path);
                    this.wn(e, n, new kt(n, H$1.min()));
                } else C(1 === n); else {
                    this.Vn(e) !== n && (
                    // Existence filter mismatch: We reset the mapping and raise a new
                    // snapshot with `isFromCache:true`.
                    this.mn(e), this._n = this._n.add(e));
                }
            }
        }
        /**
         * Converts the currently accumulated state into a remote event at the
         * provided snapshot version. Resets the accumulated changes before returning.
         */    gn(t) {
            const e = new Map;
            this.an.forEach(((n, s) => {
                const i = this.Pn(s);
                if (i) {
                    if (n.Le && qt(i.target)) {
                        // Document queries for document that don't exist can produce an empty
                        // result set. To update our local cache, we synthesize a document
                        // delete if we have not previously received the document. This
                        // resolves the limbo state of the document, removing it from
                        // limboDocumentRefs.
                        // TODO(dimond): Ideally we would have an explicit lookup target
                        // instead resulting in an explicit delete message and we could
                        // remove this special logic.
                        const e = new tt(i.target.path);
                        null !== this.hn.get(e) || this.yn(s, e) || this.wn(s, e, new kt(e, t));
                    }
                    n.Xe && (e.set(s, n.tn()), n.en());
                }
            }));
            let n = mn();
            // We extract the set of limbo-only document updates as the GC logic
            // special-cases documents that do not appear in the target cache.
            
            // TODO(gsoltis): Expand on this comment once GC is available in the JS
            // client.
                    this.ln.forEach(((t, e) => {
                let s = !0;
                e.Ae((t => {
                    const e = this.Pn(t);
                    return !e || 2 /* LimboResolution */ === e.kt || (s = !1, !1);
                })), s && (n = n.add(t));
            }));
            const s = new pn(t, e, this._n, this.hn, n);
            return this.hn = dn(), this.ln = xn(), this._n = new ln(W$1), s;
        }
        /**
         * Adds the provided document to the internal list of document updates and
         * its document key to the given target's mapping.
         */
        // Visible for testing.
        dn(t, e) {
            if (!this.An(t)) return;
            const n = this.yn(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.In(t).nn(e.key, n), this.hn = this.hn.Gt(e.key, e), this.ln = this.ln.Gt(e.key, this.pn(e.key).add(t));
        }
        /**
         * Removes the provided document from the target mapping. If the
         * document no longer matches the target, but the document's state is still
         * known (e.g. we know that the document was deleted or we received the change
         * that caused the filter mismatch), the new document can be provided
         * to update the remote document cache.
         */
        // Visible for testing.
        wn(t, e, n) {
            if (!this.An(t)) return;
            const s = this.In(t);
            this.yn(t, e) ? s.nn(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            s.sn(e), this.ln = this.ln.Gt(e, this.pn(e).delete(t)), n && (this.hn = this.hn.Gt(e, n));
        }
        removeTarget(t) {
            this.an.delete(t);
        }
        /**
         * Returns the current count of documents in the target. This includes both
         * the number of documents that the LocalStore considers to be part of the
         * target as well as any accumulated changes.
         */    Vn(t) {
            const e = this.In(t).tn();
            return this.un.vn(t).size + e.Be.size - e.Ue.size;
        }
        /**
         * Increment the number of acks needed from watch before we can consider the
         * server to be 'in-sync' with the client's active targets.
         */    rn(t) {
            this.In(t).rn();
        }
        In(t) {
            let e = this.an.get(t);
            return e || (e = new Cn, this.an.set(t, e)), e;
        }
        pn(t) {
            let e = this.ln.get(t);
            return e || (e = new ln(W$1), this.ln = this.ln.Gt(t, e)), e;
        }
        /**
         * Verifies that the user is still interested in this target (by calling
         * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
         * from watch.
         */    An(t) {
            const e = null !== this.Pn(t);
            return e || p$1("WatchChangeAggregator", "Detected inactive target", t), e;
        }
        /**
         * Returns the TargetData for an active target (i.e. a target that the user
         * is still interested in that has no outstanding target change requests).
         */    Pn(t) {
            const e = this.an.get(t);
            return e && e.Ye ? null : this.un.bn(t);
        }
        /**
         * Resets the state of a Watch target to its initial state (e.g. sets
         * 'current' to false, clears the resume token and removes its target mapping
         * from all documents).
         */    mn(t) {
            this.an.set(t, new Cn);
            this.un.vn(t).forEach((e => {
                this.wn(t, e, /*updatedDocument=*/ null);
            }));
        }
        /**
         * Returns whether the LocalStore considers the document to be part of the
         * specified target.
         */    yn(t, e) {
            return this.un.vn(t).has(e);
        }
    }

    function xn() {
        return new un(tt.K);
    }

    function kn() {
        return new un(tt.K);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const On = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), Mn = (() => {
        const t = {
            "<": "LESS_THAN",
            "<=": "LESS_THAN_OR_EQUAL",
            ">": "GREATER_THAN",
            ">=": "GREATER_THAN_OR_EQUAL",
            "==": "EQUAL",
            "!=": "NOT_EQUAL",
            "array-contains": "ARRAY_CONTAINS",
            in: "IN",
            "not-in": "NOT_IN",
            "array-contains-any": "ARRAY_CONTAINS_ANY"
        };
        return t;
    })();

    /**
     * This class generates JsonObject values for the Datastore API suitable for
     * sending to either GRPC stub methods or via the JSON/HTTP REST API.
     *
     * The serializer supports both Protobuf.js and Proto3 JSON formats. By
     * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
     * format.
     *
     * For a description of the Proto3 JSON format check
     * https://developers.google.com/protocol-buffers/docs/proto3#json
     *
     * TODO(klimt): We can remove the databaseId argument if we keep the full
     * resource name in documents.
     */
    class Fn {
        constructor(t, e) {
            this.p = t, this.Lt = e;
        }
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */
    function $n(t, e) {
        if (t.Lt) {
            return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + e.seconds,
            nanos: e.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function Ln(t, e) {
        return t.Lt ? e.toBase64() : e.toUint8Array();
    }

    /**
     * Returns a ByteString based on the proto string value.
     */ function Bn(t, e) {
        return $n(t, e.q());
    }

    function qn(t) {
        return C(!!t), H$1.$(function(t) {
            const e = ct(t);
            return new z$1(e.seconds, e.nanos);
        }(t));
    }

    function Un(t, e) {
        return function(t) {
            return new Y$1([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(e).et();
    }

    function Kn(t) {
        const e = Y$1.nt(t);
        return C(Es(e)), e;
    }

    function Qn(t, e) {
        return Un(t.p, e.path);
    }

    function Wn(t, e) {
        const n = Kn(e);
        if (n.get(1) !== t.p.projectId) throw new k$1(x$1.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.p.projectId);
        if (n.get(3) !== t.p.database) throw new k$1(x$1.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.p.database);
        return new tt(Hn(n));
    }

    function jn(t, e) {
        return Un(t.p, e);
    }

    function Gn(t) {
        const e = Kn(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
            return 4 === e.length ? Y$1.st() : Hn(e);
    }

    function zn(t) {
        return new Y$1([ "projects", t.p.projectId, "databases", t.p.database ]).et();
    }

    function Hn(t) {
        return C(t.length > 4 && "documents" === t.get(4)), t.j(5);
    }

    /** Creates a Document proto from key and fields (but no create/update time) */ function Jn(t, e, n) {
        return {
            name: Qn(t, e),
            fields: n.proto.mapValue.fields
        };
    }

    function Yn(t, e) {
        return "found" in e ? function(t, e) {
            C(!!e.found), e.found.name, e.found.updateTime;
            const n = Wn(t, e.found.name), s = qn(e.found.updateTime), i = new St({
                mapValue: {
                    fields: e.found.fields
                }
            });
            return new xt(n, s, i, {});
        }(t, e) : "missing" in e ? function(t, e) {
            C(!!e.missing), C(!!e.readTime);
            const n = Wn(t, e.missing), s = qn(e.readTime);
            return new kt(n, s);
        }(t, e) : D$1();
    }

    function Xn(t, e) {
        let n;
        if ("targetChange" in e) {
            e.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            const s = function(t) {
                return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : D$1();
            }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t, e) {
                return t.Lt ? (C(void 0 === e || "string" == typeof e), rt.fromBase64String(e || "")) : (C(void 0 === e || e instanceof Uint8Array), 
                rt.fromUint8Array(e || new Uint8Array));
            }(t, e.targetChange.resumeToken), o = e.targetChange.cause, c = o && function(t) {
                const e = void 0 === t.code ? x$1.UNKNOWN : cn(t.code);
                return new k$1(e, t.message || "");
            }
            /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */ (o);
            n = new Dn(s, i, r, c || null);
        } else if ("documentChange" in e) {
            e.documentChange;
            const s = e.documentChange;
            s.document, s.document.name, s.document.updateTime;
            const i = Wn(t, s.document.name), r = qn(s.document.updateTime), o = new St({
                mapValue: {
                    fields: s.document.fields
                }
            }), c = new xt(i, r, o, {}), u = s.targetIds || [], a = s.removedTargetIds || [];
            n = new bn(u, a, c.key, c);
        } else if ("documentDelete" in e) {
            e.documentDelete;
            const s = e.documentDelete;
            s.document;
            const i = Wn(t, s.document), r = s.readTime ? qn(s.readTime) : H$1.min(), o = new kt(i, r), c = s.removedTargetIds || [];
            n = new bn([], c, o.key, o);
        } else if ("documentRemove" in e) {
            e.documentRemove;
            const s = e.documentRemove;
            s.document;
            const i = Wn(t, s.document), r = s.removedTargetIds || [];
            n = new bn([], r, i, null);
        } else {
            if (!("filter" in e)) return D$1();
            {
                e.filter;
                const t = e.filter;
                t.targetId;
                const s = t.count || 0, i = new nn(s), r = t.targetId;
                n = new Sn(r, i);
            }
        }
        return n;
    }

    function Zn(t, e) {
        let n;
        if (e instanceof ze) n = {
            update: Jn(t, e.key, e.value)
        }; else if (e instanceof tn) n = {
            delete: Qn(t, e.key)
        }; else if (e instanceof He) n = {
            update: Jn(t, e.key, e.data),
            updateMask: ws(e.jt)
        }; else {
            if (!(e instanceof en)) return D$1();
            n = {
                verify: Qn(t, e.key)
            };
        }
        return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t => function(t, e) {
            const n = e.transform;
            if (n instanceof Se) return {
                fieldPath: e.field.et(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof De) return {
                fieldPath: e.field.et(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof Ne) return {
                fieldPath: e.field.et(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof ke) return {
                fieldPath: e.field.et(),
                increment: n.qt
            };
            throw D$1();
        }(0, t)))), e.Wt.Qt || (n.currentDocument = function(t, e) {
            return void 0 !== e.updateTime ? {
                updateTime: Bn(t, e.updateTime)
            } : void 0 !== e.exists ? {
                exists: e.exists
            } : D$1();
        }(t, e.Wt)), n;
    }

    function ts(t, e) {
        const n = e.currentDocument ? function(t) {
            return void 0 !== t.updateTime ? Be.updateTime(qn(t.updateTime)) : void 0 !== t.exists ? Be.exists(t.exists) : Be.Kt();
        }(e.currentDocument) : Be.Kt(), s = e.updateTransforms ? e.updateTransforms.map((e => function(t, e) {
            let n = null;
            if ("setToServerValue" in e) C("REQUEST_TIME" === e.setToServerValue), n = new Se; else if ("appendMissingElements" in e) {
                const t = e.appendMissingElements.values || [];
                n = new De(t);
            } else if ("removeAllFromArray" in e) {
                const t = e.removeAllFromArray.values || [];
                n = new Ne(t);
            } else "increment" in e ? n = new ke(t, e.increment) : D$1();
            const s = Z$1.ct(e.fieldPath);
            return new Fe(s, n);
        }(t, e))) : [];
        if (e.update) {
            e.update.name;
            const i = Wn(t, e.update.name), r = new St({
                mapValue: {
                    fields: e.update.fields
                }
            });
            if (e.updateMask) {
                const t = function(t) {
                    const e = t.fieldPaths || [];
                    return new it(e.map((t => Z$1.ct(t))));
                }(e.updateMask);
                return new He(i, r, t, n, s);
            }
            return new ze(i, r, n, s);
        }
        if (e.delete) {
            const s = Wn(t, e.delete);
            return new tn(s, n);
        }
        if (e.verify) {
            const s = Wn(t, e.verify);
            return new en(s, n);
        }
        return D$1();
    }

    function es(t, e) {
        return t && t.length > 0 ? (C(void 0 !== e), t.map((t => function(t, e) {
            // NOTE: Deletes don't have an updateTime.
            let n = t.updateTime ? qn(t.updateTime) : qn(e);
            n.isEqual(H$1.min()) && (
            // The Firestore Emulator currently returns an update time of 0 for
            // deletes of non-existing documents (rather than null). This breaks the
            // test "get deleted doc while offline with source=cache" as NoDocuments
            // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
            // TODO(#2149): Remove this when Emulator is fixed
            n = qn(e));
            let s = null;
            return t.transformResults && t.transformResults.length > 0 && (s = t.transformResults), 
            new Le(n, s);
        }(t, e)))) : [];
    }

    function ns(t, e) {
        return {
            documents: [ jn(t, e.path) ]
        };
    }

    function ss(t, e) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const n = {
            structuredQuery: {}
        }, s = e.path;
        null !== e.collectionGroup ? (n.parent = jn(t, s), n.structuredQuery.from = [ {
            collectionId: e.collectionGroup,
            allDescendants: !0
        } ]) : (n.parent = jn(t, s.G()), n.structuredQuery.from = [ {
            collectionId: s.J()
        } ]);
        const i = function(t) {
            if (0 === t.length) return;
            const e = t.map((t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (vt(t.value)) return {
                        unaryFilter: {
                            field: ls(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (pt(t.value)) return {
                        unaryFilter: {
                            field: ls(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (vt(t.value)) return {
                        unaryFilter: {
                            field: ls(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (pt(t.value)) return {
                        unaryFilter: {
                            field: ls(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: ls(t.field),
                        op: hs(t.op),
                        value: t.value
                    }
                };
            }(t)));
            if (1 === e.length) return e[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }(e.filters);
        i && (n.structuredQuery.where = i);
        const r = function(t) {
            if (0 === t.length) return;
            return t.map((t => 
            // visible for testing
            function(t) {
                return {
                    field: ls(t.field),
                    direction: as(t.dir)
                };
            }(t)));
        }(e.orderBy);
        r && (n.structuredQuery.orderBy = r);
        const o = function(t, e) {
            return t.Lt || ft(e) ? e : {
                value: e
            };
        }
        /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */ (t, e.limit);
        return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = cs(e.startAt)), 
        e.endAt && (n.structuredQuery.endAt = cs(e.endAt)), n;
    }

    function is(t) {
        let e = Gn(t.parent);
        const n = t.structuredQuery, s = n.from ? n.from.length : 0;
        let i = null;
        if (s > 0) {
            C(1 === s);
            const t = n.from[0];
            t.allDescendants ? i = t.collectionId : e = e.child(t.collectionId);
        }
        let r = [];
        n.where && (r = os(n.where));
        let o = [];
        n.orderBy && (o = n.orderBy.map((t => function(t) {
            return new te(_s(t.field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }
            // visible for testing
            (t.direction));
        }(t))));
        let c = null;
        n.limit && (c = function(t) {
            let e;
            return e = "object" == typeof t ? t.value : t, ft(e) ? null : e;
        }(n.limit));
        let u = null;
        n.startAt && (u = us(n.startAt));
        let a = null;
        return n.endAt && (a = us(n.endAt)), re(e, i, o, r, c, "F" /* First */ , u, a);
    }

    function rs(t, e) {
        const n = function(t, e) {
            switch (e) {
              case 0 /* Listen */ :
                return null;

              case 1 /* ExistenceFilterMismatch */ :
                return "existence-filter-mismatch";

              case 2 /* LimboResolution */ :
                return "limbo-document";

              default:
                return D$1();
            }
        }(0, e.kt);
        return null == n ? null : {
            "goog-listen-tags": n
        };
    }

    function os(t) {
        return t ? void 0 !== t.unaryFilter ? [ ds(t) ] : void 0 !== t.fieldFilter ? [ fs(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((t => os(t))).reduce(((t, e) => t.concat(e))) : D$1() : [];
    }

    function cs(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    function us(t) {
        const e = !!t.before, n = t.values || [];
        return new Xt(n, e);
    }

    // visible for testing
    function as(t) {
        return On[t];
    }

    function hs(t) {
        return Mn[t];
    }

    function ls(t) {
        return {
            fieldPath: t.et()
        };
    }

    function _s(t) {
        return Z$1.ct(t.fieldPath);
    }

    function fs(t) {
        return Ut.create(_s(t.fieldFilter.field), function(t) {
            switch (t) {
              case "EQUAL":
                return "==" /* EQUAL */;

              case "NOT_EQUAL":
                return "!=" /* NOT_EQUAL */;

              case "GREATER_THAN":
                return ">" /* GREATER_THAN */;

              case "GREATER_THAN_OR_EQUAL":
                return ">=" /* GREATER_THAN_OR_EQUAL */;

              case "LESS_THAN":
                return "<" /* LESS_THAN */;

              case "LESS_THAN_OR_EQUAL":
                return "<=" /* LESS_THAN_OR_EQUAL */;

              case "ARRAY_CONTAINS":
                return "array-contains" /* ARRAY_CONTAINS */;

              case "IN":
                return "in" /* IN */;

              case "NOT_IN":
                return "not-in" /* NOT_IN */;

              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

              case "OPERATOR_UNSPECIFIED":
              default:
                return D$1();
            }
        }(t.fieldFilter.op), t.fieldFilter.value);
    }

    function ds(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            const e = _s(t.unaryFilter.field);
            return Ut.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            const n = _s(t.unaryFilter.field);
            return Ut.create(n, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "IS_NOT_NAN":
            const s = _s(t.unaryFilter.field);
            return Ut.create(s, "!=" /* NOT_EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NOT_NULL":
            const i = _s(t.unaryFilter.field);
            return Ut.create(i, "!=" /* NOT_EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "OPERATOR_UNSPECIFIED":
          default:
            return D$1();
        }
    }

    function ws(t) {
        const e = [];
        return t.fields.forEach((t => e.push(t.et()))), {
            fieldPaths: e
        };
    }

    function Es(t) {
        // Resource names have at least 4 components (project ID, database ID)
        return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Ts {
        constructor() {
            this.promise = new Promise(((t, e) => {
                this.resolve = t, this.reject = e;
            }));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * PersistencePromise is essentially a re-implementation of Promise except
     * it has a .next() method instead of .then() and .next() and .catch() callbacks
     * are executed synchronously when a PersistencePromise resolves rather than
     * asynchronously (Promise implementations use setImmediate() or similar).
     *
     * This is necessary to interoperate with IndexedDB which will automatically
     * commit transactions if control is returned to the event loop without
     * synchronously initiating another operation on the transaction.
     *
     * NOTE: .then() and .catch() only allow a single consumer, unlike normal
     * Promises.
     */ class Is {
        constructor(t) {
            // NOTE: next/catchCallback will always point to our own wrapper functions,
            // not the user's raw next() or catch() callbacks.
            this.Sn = null, this.Dn = null, 
            // When the operation resolves, we'll set result or error and mark isDone.
            this.result = void 0, this.error = void 0, this.Cn = !1, 
            // Set to true when .then() or .catch() are called and prevents additional
            // chaining.
            this.Nn = !1, t((t => {
                this.Cn = !0, this.result = t, this.Sn && 
                // value should be defined unless T is Void, but we can't express
                // that in the type system.
                this.Sn(t);
            }), (t => {
                this.Cn = !0, this.error = t, this.Dn && this.Dn(t);
            }));
        }
        catch(t) {
            return this.next(void 0, t);
        }
        next(t, e) {
            return this.Nn && D$1(), this.Nn = !0, this.Cn ? this.error ? this.xn(e, this.error) : this.kn(t, this.result) : new Is(((n, s) => {
                this.Sn = e => {
                    this.kn(t, e).next(n, s);
                }, this.Dn = t => {
                    this.xn(e, t).next(n, s);
                };
            }));
        }
        On() {
            return new Promise(((t, e) => {
                this.next(t, e);
            }));
        }
        Mn(t) {
            try {
                const e = t();
                return e instanceof Is ? e : Is.resolve(e);
            } catch (t) {
                return Is.reject(t);
            }
        }
        kn(t, e) {
            return t ? this.Mn((() => t(e))) : Is.resolve(e);
        }
        xn(t, e) {
            return t ? this.Mn((() => t(e))) : Is.reject(e);
        }
        static resolve(t) {
            return new Is(((e, n) => {
                e(t);
            }));
        }
        static reject(t) {
            return new Is(((e, n) => {
                n(t);
            }));
        }
        static Fn(
        // Accept all Promise types in waitFor().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t) {
            return new Is(((e, n) => {
                let s = 0, i = 0, r = !1;
                t.forEach((t => {
                    ++s, t.next((() => {
                        ++i, r && i === s && e();
                    }), (t => n(t)));
                })), r = !0, i === s && e();
            }));
        }
        /**
         * Given an array of predicate functions that asynchronously evaluate to a
         * boolean, implements a short-circuiting `or` between the results. Predicates
         * will be evaluated until one of them returns `true`, then stop. The final
         * result will be whether any of them returned `true`.
         */    static $n(t) {
            let e = Is.resolve(!1);
            for (const n of t) e = e.next((t => t ? Is.resolve(t) : n()));
            return e;
        }
        static forEach(t, e) {
            const n = [];
            return t.forEach(((t, s) => {
                n.push(e.call(this, t, s));
            })), this.Fn(n);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // References to `window` are guarded by SimpleDb.isAvailable()
    /* eslint-disable no-restricted-globals */
    /**
     * Wraps an IDBTransaction and exposes a store() method to get a handle to a
     * specific object store.
     */
    class As {
        constructor(t, e) {
            this.action = t, this.transaction = e, this.aborted = !1, 
            /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
            this.Ln = new Ts, this.transaction.oncomplete = () => {
                this.Ln.resolve();
            }, this.transaction.onabort = () => {
                e.error ? this.Ln.reject(new Ps(t, e.error)) : this.Ln.resolve();
            }, this.transaction.onerror = e => {
                const n = vs(e.target.error);
                this.Ln.reject(new Ps(t, n));
            };
        }
        static open(t, e, n, s) {
            try {
                return new As(e, t.transaction(s, n));
            } catch (t) {
                throw new Ps(e, t);
            }
        }
        get Bn() {
            return this.Ln.promise;
        }
        abort(t) {
            t && this.Ln.reject(t), this.aborted || (p$1("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
            this.aborted = !0, this.transaction.abort());
        }
        /**
         * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
         * operations performed on the SimpleDbStore happen within the context of this
         * transaction and it cannot be used anymore once the transaction is
         * completed.
         *
         * Note that we can't actually enforce that the KeyType and ValueType are
         * correct, but they allow type safety through the rest of the consuming code.
         */    store(t) {
            const e = this.transaction.objectStore(t);
            return new gs(e);
        }
    }

    /**
     * Provides a wrapper around IndexedDb with a simplified interface that uses
     * Promise-like return values to chain operations. Real promises cannot be used
     * since .then() continuations are executed asynchronously (e.g. via
     * .setImmediate), which would cause IndexedDB to end the transaction.
     * See PersistencePromise for more details.
     */ class ms {
        /*
         * Creates a new SimpleDb wrapper for IndexedDb database `name`.
         *
         * Note that `version` must not be a downgrade. IndexedDB does not support
         * downgrading the schema version. We currently do not support any way to do
         * versioning outside of IndexedDB's versioning mechanism, as only
         * version-upgrade transactions are allowed to do things like create
         * objectstores.
         */
        constructor(t, e, n) {
            this.name = t, this.version = e, this.qn = n;
            // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
            // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
            // whatever reason it's much harder to hit after 12.2 so we only proactively
            // log on 12.2.
            12.2 === ms.Un(getUA()) && v$1("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
        }
        /** Deletes the specified database. */    static delete(t) {
            return p$1("SimpleDb", "Removing database:", t), ys(window.indexedDB.deleteDatabase(t)).On();
        }
        /** Returns true if IndexedDB is available in the current environment. */    static Kn() {
            if ("undefined" == typeof indexedDB) return !1;
            if (ms.Qn()) return !0;
            // We extensively use indexed array values and compound keys,
            // which IE and Edge do not support. However, they still have indexedDB
            // defined on the window, so we need to check for them here and make sure
            // to return that persistence is not enabled for those browsers.
            // For tracking support of this feature, see here:
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
            // Check the UA string to find out the browser.
                    const t = getUA(), e = ms.Un(t), n = 0 < e && e < 10, s = ms.Wn(t), i = 0 < s && s < 4.5;
            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
            // Edge
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
            // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
            // iOS Safari: Disable for users running iOS version < 10.
                    return !(t.indexOf("MSIE ") > 0 || t.indexOf("Trident/") > 0 || t.indexOf("Edge/") > 0 || n || i);
        }
        /**
         * Returns true if the backing IndexedDB store is the Node IndexedDBShim
         * (see https://github.com/axemclion/IndexedDBShim).
         */    static Qn() {
            var t;
            return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.jn);
        }
        /** Helper to get a typed SimpleDbStore from a transaction. */    static Gn(t, e) {
            return t.store(e);
        }
        // visible for testing
        /** Parse User Agent to determine iOS version. Returns -1 if not found. */
        static Un(t) {
            const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
            return Number(n);
        }
        // visible for testing
        /** Parse User Agent to determine Android version. Returns -1 if not found. */
        static Wn(t) {
            const e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
            return Number(n);
        }
        /**
         * Opens the specified database, creating or upgrading it if necessary.
         */    async zn(t) {
            return this.db || (p$1("SimpleDb", "Opening database:", this.name), this.db = await new Promise(((e, n) => {
                // TODO(mikelehen): Investigate browser compatibility.
                // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                // suggests IE9 and older WebKit browsers handle upgrade
                // differently. They expect setVersion, as described here:
                // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                const s = indexedDB.open(this.name, this.version);
                s.onsuccess = t => {
                    const n = t.target.result;
                    e(n);
                }, s.onblocked = () => {
                    n(new Ps(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                }, s.onerror = e => {
                    const s = e.target.error;
                    "VersionError" === s.name ? n(new k$1(x$1.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : n(new Ps(t, s));
                }, s.onupgradeneeded = t => {
                    p$1("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', t.oldVersion);
                    const e = t.target.result;
                    this.qn.Hn(e, s.transaction, t.oldVersion, this.version).next((() => {
                        p$1("SimpleDb", "Database upgrade to version " + this.version + " complete");
                    }));
                };
            }))), this.Jn && (this.db.onversionchange = t => this.Jn(t)), this.db;
        }
        Yn(t) {
            this.Jn = t, this.db && (this.db.onversionchange = e => t(e));
        }
        async runTransaction(t, e, n, s) {
            const i = "readonly" === e;
            let r = 0;
            for (;;) {
                ++r;
                try {
                    this.db = await this.zn(t);
                    const e = As.open(this.db, t, i ? "readonly" : "readwrite", n), r = s(e).catch((t => (
                    // Abort the transaction if there was an error.
                    e.abort(t), Is.reject(t)))).On();
                    // As noted above, errors are propagated by aborting the transaction. So
                    // we swallow any error here to avoid the browser logging it as unhandled.
                    return r.catch((() => {})), 
                    // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                    // fire), but still return the original transactionFnResult back to the
                    // caller.
                    await e.Bn, r;
                } catch (t) {
                    // TODO(schmidt-sebastian): We could probably be smarter about this and
                    // not retry exceptions that are likely unrecoverable (such as quota
                    // exceeded errors).
                    // Note: We cannot use an instanceof check for FirestoreException, since the
                    // exception is wrapped in a generic error by our async/await handling.
                    const e = "FirebaseError" !== t.name && r < 3;
                    if (p$1("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", e), 
                    this.close(), !e) return Promise.reject(t);
                }
            }
        }
        close() {
            this.db && this.db.close(), this.db = void 0;
        }
    }

    /**
     * A controller for iterating over a key range or index. It allows an iterate
     * callback to delete the currently-referenced object, or jump to a new key
     * within the key range or index.
     */ class Rs {
        constructor(t) {
            this.Xn = t, this.Zn = !1, this.ts = null;
        }
        get Cn() {
            return this.Zn;
        }
        get es() {
            return this.ts;
        }
        set cursor(t) {
            this.Xn = t;
        }
        /**
         * This function can be called to stop iteration at any point.
         */    done() {
            this.Zn = !0;
        }
        /**
         * This function can be called to skip to that next key, which could be
         * an index or a primary key.
         */    ns(t) {
            this.ts = t;
        }
        /**
         * Delete the current cursor value from the object store.
         *
         * NOTE: You CANNOT do this with a keysOnly query.
         */    delete() {
            return ys(this.Xn.delete());
        }
    }

    /** An error that wraps exceptions that thrown during IndexedDB execution. */ class Ps extends k$1 {
        constructor(t, e) {
            super(x$1.UNAVAILABLE, `IndexedDB transaction '${t}' failed: ${e}`), this.name = "IndexedDbTransactionError";
        }
    }

    /** Verifies whether `e` is an IndexedDbTransactionError. */ function Vs(t) {
        // Use name equality, as instanceof checks on errors don't work with errors
        // that wrap other errors.
        return "IndexedDbTransactionError" === t.name;
    }

    /**
     * A wrapper around an IDBObjectStore providing an API that:
     *
     * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
     * methods for acting against the object store.
     * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
     * method return a PersistencePromise instead.
     * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
     * intermediate IndexedDB types (IDBCursorWithValue, etc.)
     */ class gs {
        constructor(t) {
            this.store = t;
        }
        put(t, e) {
            let n;
            return void 0 !== e ? (p$1("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (p$1("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
            n = this.store.put(t)), ys(n);
        }
        /**
         * Adds a new value into an Object Store and returns the new key. Similar to
         * IndexedDb's `add()`, this method will fail on primary key collisions.
         *
         * @param value - The object to write.
         * @returns The key of the value to add.
         */    add(t) {
            p$1("SimpleDb", "ADD", this.store.name, t, t);
            return ys(this.store.add(t));
        }
        /**
         * Gets the object with the specified key from the specified store, or null
         * if no object exists with the specified key.
         *
         * @key The key of the object to get.
         * @returns The object with the specified key or null if no object exists.
         */    get(t) {
            // We're doing an unsafe cast to ValueType.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return ys(this.store.get(t)).next((e => (
            // Normalize nonexistence to null.
            void 0 === e && (e = null), p$1("SimpleDb", "GET", this.store.name, t, e), e)));
        }
        delete(t) {
            p$1("SimpleDb", "DELETE", this.store.name, t);
            return ys(this.store.delete(t));
        }
        /**
         * If we ever need more of the count variants, we can add overloads. For now,
         * all we need is to count everything in a store.
         *
         * Returns the number of rows in the store.
         */    count() {
            p$1("SimpleDb", "COUNT", this.store.name);
            return ys(this.store.count());
        }
        ss(t, e) {
            const n = this.cursor(this.options(t, e)), s = [];
            return this.rs(n, ((t, e) => {
                s.push(e);
            })).next((() => s));
        }
        os(t, e) {
            p$1("SimpleDb", "DELETE ALL", this.store.name);
            const n = this.options(t, e);
            n.cs = !1;
            const s = this.cursor(n);
            return this.rs(s, ((t, e, n) => n.delete()));
        }
        us(t, e) {
            let n;
            e ? n = t : (n = {}, e = t);
            const s = this.cursor(n);
            return this.rs(s, e);
        }
        /**
         * Iterates over a store, but waits for the given callback to complete for
         * each entry before iterating the next entry. This allows the callback to do
         * asynchronous work to determine if this iteration should continue.
         *
         * The provided callback should return `true` to continue iteration, and
         * `false` otherwise.
         */    hs(t) {
            const e = this.cursor({});
            return new Is(((n, s) => {
                e.onerror = t => {
                    const e = vs(t.target.error);
                    s(e);
                }, e.onsuccess = e => {
                    const s = e.target.result;
                    s ? t(s.primaryKey, s.value).next((t => {
                        t ? s.continue() : n();
                    })) : n();
                };
            }));
        }
        rs(t, e) {
            const n = [];
            return new Is(((s, i) => {
                t.onerror = t => {
                    i(t.target.error);
                }, t.onsuccess = t => {
                    const i = t.target.result;
                    if (!i) return void s();
                    const r = new Rs(i), o = e(i.primaryKey, i.value, r);
                    if (o instanceof Is) {
                        const t = o.catch((t => (r.done(), Is.reject(t))));
                        n.push(t);
                    }
                    r.Cn ? s() : null === r.es ? i.continue() : i.continue(r.es);
                };
            })).next((() => Is.Fn(n)));
        }
        options(t, e) {
            let n = void 0;
            return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
                index: n,
                range: e
            };
        }
        cursor(t) {
            let e = "next";
            if (t.reverse && (e = "prev"), t.index) {
                const n = this.store.index(t.index);
                return t.cs ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
            }
            return this.store.openCursor(t.range, e);
        }
    }

    /**
     * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
     * handlers to resolve / reject the PersistencePromise as appropriate.
     */ function ys(t) {
        return new Is(((e, n) => {
            t.onsuccess = t => {
                const n = t.target.result;
                e(n);
            }, t.onerror = t => {
                const e = vs(t.target.error);
                n(e);
            };
        }));
    }

    // Guard so we only report the error once.
    let ps = !1;

    function vs(t) {
        const e = ms.Un(getUA());
        if (e >= 12.2 && e < 13) {
            const e = "An internal error was encountered in the Indexed Database server";
            if (t.message.indexOf(e) >= 0) {
                // Wrap error in a more descriptive one.
                const t = new k$1("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
                return ps || (ps = !0, 
                // Throw a global exception outside of this promise chain, for the user to
                // potentially catch.
                setTimeout((() => {
                    throw t;
                }), 0)), t;
            }
        }
        return t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents an operation scheduled to be run in the future on an AsyncQueue.
     *
     * It is created via DelayedOperation.createAndSchedule().
     *
     * Supports cancellation (via cancel()) and early execution (via skipDelay()).
     *
     * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
     * in newer versions of TypeScript defines `finally`, which is not available in
     * IE.
     */
    class bs {
        constructor(t, e, n, s, i) {
            this.ls = t, this._s = e, this.fs = n, this.op = s, this.ds = i, this.ws = new Ts, 
            this.then = this.ws.promise.then.bind(this.ws.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.ws.promise.catch((t => {}));
        }
        /**
         * Creates and returns a DelayedOperation that has been scheduled to be
         * executed on the provided asyncQueue after the provided delayMs.
         *
         * @param asyncQueue - The queue to schedule the operation on.
         * @param id - A Timer ID identifying the type of operation this is.
         * @param delayMs - The delay (ms) before the operation should be scheduled.
         * @param op - The operation to run.
         * @param removalCallback - A callback to be called synchronously once the
         *   operation is executed or canceled, notifying the AsyncQueue to remove it
         *   from its delayedOperations list.
         *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
         *   the DelayedOperation class public.
         */    static Es(t, e, n, s, i) {
            const r = Date.now() + n, o = new bs(t, e, r, s, i);
            return o.start(n), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.Ts = setTimeout((() => this.Is()), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    As() {
            return this.Is();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.Ts && (this.clearTimeout(), this.ws.reject(new k$1(x$1.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        Is() {
            this.ls.Rs((() => null !== this.Ts ? (this.clearTimeout(), this.op().then((t => this.ws.resolve(t)))) : Promise.resolve()));
        }
        clearTimeout() {
            null !== this.Ts && (this.ds(this), clearTimeout(this.Ts), this.Ts = null);
        }
    }

    /**
     * Returns a FirestoreError that can be surfaced to the user if the provided
     * error is an IndexedDbTransactionError. Re-throws the error otherwise.
     */ function Ss(t, e) {
        if (v$1("AsyncQueue", `${e}: ${t}`), Vs(t)) return new k$1(x$1.UNAVAILABLE, `${e}: ${t}`);
        throw t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Ds = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

    /**
     * A base class representing a persistence transaction, encapsulating both the
     * transaction's sequence numbers as well as a list of onCommitted listeners.
     *
     * When you call Persistence.runTransaction(), it will create a transaction and
     * pass it to your callback. You then pass it to any method that operates
     * on persistence.
     */ class Cs {
        constructor() {
            this.Ps = [];
        }
        Vs(t) {
            this.Ps.push(t);
        }
        gs() {
            this.Ps.forEach((t => t()));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Encodes a resource path into a IndexedDb-compatible string form.
     */
    function Ns(t) {
        let e = "";
        for (let n = 0; n < t.length; n++) e.length > 0 && (e = ks(e)), e = xs(t.get(n), e);
        return ks(e);
    }

    /** Encodes a single segment of a resource path into the given result */ function xs(t, e) {
        let n = e;
        const s = t.length;
        for (let e = 0; e < s; e++) {
            const s = t.charAt(e);
            switch (s) {
              case "\0":
                n += "";
                break;

              case "":
                n += "";
                break;

              default:
                n += s;
            }
        }
        return n;
    }

    /** Encodes a path separator into the given result */ function ks(t) {
        return t + "";
    }

    /**
     * Decodes the given IndexedDb-compatible string form of a resource path into
     * a ResourcePath instance. Note that this method is not suitable for use with
     * decoding resource names from the server; those are One Platform format
     * strings.
     */ function Os(t) {
        // Event the empty path must encode as a path of at least length 2. A path
        // with exactly 2 must be the empty path.
        const e = t.length;
        if (C(e >= 2), 2 === e) return C("" === t.charAt(0) && "" === t.charAt(1)), Y$1.st();
        // Escape characters cannot exist past the second-to-last position in the
        // source value.
            const n = e - 2, s = [];
        let i = "";
        for (let r = 0; r < e; ) {
            // The last two characters of a valid encoded path must be a separator, so
            // there must be an end to this segment.
            const e = t.indexOf("", r);
            (e < 0 || e > n) && D$1();
            switch (t.charAt(e + 1)) {
              case "":
                const n = t.substring(r, e);
                let o;
                0 === i.length ? 
                // Avoid copying for the common case of a segment that excludes \0
                // and \001
                o = n : (i += n, o = i, i = ""), s.push(o);
                break;

              case "":
                i += t.substring(r, e), i += "\0";
                break;

              case "":
                // The escape character can be used in the output to encode itself.
                i += t.substring(r, e + 1);
                break;

              default:
                D$1();
            }
            r = e + 2;
        }
        return new Y$1(s);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Schema Version for the Web client:
     * 1.  Initial version including Mutation Queue, Query Cache, and Remote
     *     Document Cache
     * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
     *     longer required because migration 3 unconditionally clears it.
     * 3.  Dropped and re-created Query Cache to deal with cache corruption related
     *     to limbo resolution. Addresses
     *     https://github.com/firebase/firebase-ios-sdk/issues/1548
     * 4.  Multi-Tab Support.
     * 5.  Removal of held write acks.
     * 6.  Create document global for tracking document cache size.
     * 7.  Ensure every cached document has a sentinel row with a sequence number.
     * 8.  Add collection-parent index for Collection Group queries.
     * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
     *     an auto-incrementing ID. This is required for Index-Free queries.
     * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
     * 11. Add bundles and named_queries for bundle support.
     */
    /**
     * Wrapper class to store timestamps (seconds and nanos) in IndexedDb objects.
     */
    class Ms {
        constructor(t, e) {
            this.seconds = t, this.nanoseconds = e;
        }
    }

    /**
     * A singleton object to be stored in the 'owner' store in IndexedDb.
     *
     * A given database can have a single primary tab assigned at a given time. That
     * tab must validate that it is still holding the primary lease before every
     * operation that requires locked access. The primary tab should regularly
     * write an updated timestamp to this lease to prevent other tabs from
     * "stealing" the primary lease
     */ class Fs {
        constructor(t, 
        /** Whether to allow shared access from multiple tabs. */
        e, n) {
            this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
        }
    }

    /**
     * Name of the IndexedDb object store.
     *
     * Note that the name 'owner' is chosen to ensure backwards compatibility with
     * older clients that only supported single locked access to the persistence
     * layer.
     */ Fs.store = "owner", 
    /**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
    Fs.key = "owner";

    /**
     * An object to be stored in the 'mutationQueues' store in IndexedDb.
     *
     * Each user gets a single queue of MutationBatches to apply to the server.
     * DbMutationQueue tracks the metadata about the queue.
     */
    class $s {
        constructor(
        /**
         * The normalized user ID to which this queue belongs.
         */
        t, 
        /**
         * An identifier for the highest numbered batch that has been acknowledged
         * by the server. All MutationBatches in this queue with batchIds less
         * than or equal to this value are considered to have been acknowledged by
         * the server.
         *
         * NOTE: this is deprecated and no longer used by the code.
         */
        e, 
        /**
         * A stream token that was previously sent by the server.
         *
         * See StreamingWriteRequest in datastore.proto for more details about
         * usage.
         *
         * After sending this token, earlier tokens may not be used anymore so
         * only a single stream token is retained.
         *
         * NOTE: this is deprecated and no longer used by the code.
         */
        n) {
            this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
        }
    }

    /** Name of the IndexedDb object store.  */ $s.store = "mutationQueues", 
    /** Keys are automatically assigned via the userId property. */
    $s.keyPath = "userId";

    /**
     * An object to be stored in the 'mutations' store in IndexedDb.
     *
     * Represents a batch of user-level mutations intended to be sent to the server
     * in a single write. Each user-level batch gets a separate DbMutationBatch
     * with a new batchId.
     */
    class Ls {
        constructor(
        /**
         * The normalized user ID to which this batch belongs.
         */
        t, 
        /**
         * An identifier for this batch, allocated using an auto-generated key.
         */
        e, 
        /**
         * The local write time of the batch, stored as milliseconds since the
         * epoch.
         */
        n, 
        /**
         * A list of "mutations" that represent a partial base state from when this
         * write batch was initially created. During local application of the write
         * batch, these baseMutations are applied prior to the real writes in order
         * to override certain document fields from the remote document cache. This
         * is necessary in the case of non-idempotent writes (e.g. `increment()`
         * transforms) to make sure that the local view of the modified documents
         * doesn't flicker if the remote document cache receives the result of the
         * non-idempotent write before the write is removed from the queue.
         *
         * These mutations are never sent to the backend.
         */
        s, 
        /**
         * A list of mutations to apply. All mutations will be applied atomically.
         *
         * Mutations are serialized via toMutation().
         */
        i) {
            this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = s, 
            this.mutations = i;
        }
    }

    /** Name of the IndexedDb object store.  */ Ls.store = "mutations", 
    /** Keys are automatically assigned via the userId, batchId properties. */
    Ls.keyPath = "batchId", 
    /** The index name for lookup of mutations by user. */
    Ls.userMutationsIndex = "userMutationsIndex", 
    /** The user mutations index is keyed by [userId, batchId] pairs. */
    Ls.userMutationsKeyPath = [ "userId", "batchId" ];

    /**
     * An object to be stored in the 'documentMutations' store in IndexedDb.
     *
     * A manually maintained index of all the mutation batches that affect a given
     * document key. The rows in this table are references based on the contents of
     * DbMutationBatch.mutations.
     */
    class Bs {
        constructor() {}
        /**
         * Creates a [userId] key for use in the DbDocumentMutations index to iterate
         * over all of a user's document mutations.
         */    static prefixForUser(t) {
            return [ t ];
        }
        /**
         * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
         * index to iterate over all at document mutations for a given path or lower.
         */    static prefixForPath(t, e) {
            return [ t, Ns(e) ];
        }
        /**
         * Creates a full index key of [userId, encodedPath, batchId] for inserting
         * and deleting into the DbDocumentMutations index.
         */    static key(t, e, n) {
            return [ t, Ns(e), n ];
        }
    }

    Bs.store = "documentMutations", 
    /**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
    Bs.PLACEHOLDER = new Bs;

    /**
     * Represents the known absence of a document at a particular version.
     * Stored in IndexedDb as part of a DbRemoteDocument object.
     */
    class qs {
        constructor(t, e) {
            this.path = t, this.readTime = e;
        }
    }

    /**
     * Represents a document that is known to exist but whose data is unknown.
     * Stored in IndexedDb as part of a DbRemoteDocument object.
     */ class Us {
        constructor(t, e) {
            this.path = t, this.version = e;
        }
    }

    /**
     * An object to be stored in the 'remoteDocuments' store in IndexedDb.
     * It represents either:
     *
     * - A complete document.
     * - A "no document" representing a document that is known not to exist (at
     * some version).
     * - An "unknown document" representing a document that is known to exist (at
     * some version) but whose contents are unknown.
     *
     * Note: This is the persisted equivalent of a MaybeDocument and could perhaps
     * be made more general if necessary.
     */ class Ks {
        // TODO: We are currently storing full document keys almost three times
        // (once as part of the primary key, once - partly - as `parentPath` and once
        // inside the encoded documents). During our next migration, we should
        // rewrite the primary key as parentPath + document ID which would allow us
        // to drop one value.
        constructor(
        /**
         * Set to an instance of DbUnknownDocument if the data for a document is
         * not known, but it is known that a document exists at the specified
         * version (e.g. it had a successful update applied to it)
         */
        t, 
        /**
         * Set to an instance of a DbNoDocument if it is known that no document
         * exists.
         */
        e, 
        /**
         * Set to an instance of a Document if there's a cached version of the
         * document.
         */
        n, 
        /**
         * Documents that were written to the remote document store based on
         * a write acknowledgment are marked with `hasCommittedMutations`. These
         * documents are potentially inconsistent with the backend's copy and use
         * the write's commit version as their document version.
         */
        s, 
        /**
         * When the document was read from the backend. Undefined for data written
         * prior to schema version 9.
         */
        i, 
        /**
         * The path of the collection this document is part of. Undefined for data
         * written prior to schema version 9.
         */
        r) {
            this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = s, 
            this.readTime = i, this.parentPath = r;
        }
    }

    Ks.store = "remoteDocuments", 
    /**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
    Ks.readTimeIndex = "readTimeIndex", Ks.readTimeIndexPath = "readTime", 
    /**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
    Ks.collectionReadTimeIndex = "collectionReadTimeIndex", Ks.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

    /**
     * Contains a single entry that has metadata about the remote document cache.
     */
    class Qs {
        /**
         * @param byteSize - Approximately the total size in bytes of all the
         * documents in the document cache.
         */
        constructor(t) {
            this.byteSize = t;
        }
    }

    Qs.store = "remoteDocumentGlobal", Qs.key = "remoteDocumentGlobalKey";

    /**
     * An object to be stored in the 'targets' store in IndexedDb.
     *
     * This is based on and should be kept in sync with the proto used in the iOS
     * client.
     *
     * Each query the client listens to against the server is tracked on disk so
     * that the query can be efficiently resumed on restart.
     */
    class Ws {
        constructor(
        /**
         * An auto-generated sequential numeric identifier for the query.
         *
         * Queries are stored using their canonicalId as the key, but these
         * canonicalIds can be quite long so we additionally assign a unique
         * queryId which can be used by referenced data structures (e.g.
         * indexes) to minimize the on-disk cost.
         */
        t, 
        /**
         * The canonical string representing this query. This is not unique.
         */
        e, 
        /**
         * The last readTime received from the Watch Service for this query.
         *
         * This is the same value as TargetChange.read_time in the protos.
         */
        n, 
        /**
         * An opaque, server-assigned token that allows watching a query to be
         * resumed after disconnecting without retransmitting all the data
         * that matches the query. The resume token essentially identifies a
         * point in time from which the server should resume sending results.
         *
         * This is related to the snapshotVersion in that the resumeToken
         * effectively also encodes that value, but the resumeToken is opaque
         * and sometimes encodes additional information.
         *
         * A consequence of this is that the resumeToken should be used when
         * asking the server to reason about where this client is in the watch
         * stream, but the client should use the snapshotVersion for its own
         * purposes.
         *
         * This is the same value as TargetChange.resume_token in the protos.
         */
        s, 
        /**
         * A sequence number representing the last time this query was
         * listened to, used for garbage collection purposes.
         *
         * Conventionally this would be a timestamp value, but device-local
         * clocks are unreliable and they must be able to create new listens
         * even while disconnected. Instead this should be a monotonically
         * increasing number that's incremented on each listen call.
         *
         * This is different from the queryId since the queryId is an
         * immutable identifier assigned to the Query on first use while
         * lastListenSequenceNumber is updated every time the query is
         * listened to.
         */
        i, 
        /**
         * Denotes the maximum snapshot version at which the associated query view
         * contained no limbo documents.  Undefined for data written prior to
         * schema version 9.
         */
        r, 
        /**
         * The query for this target.
         *
         * Because canonical ids are not unique we must store the actual query. We
         * use the proto to have an object we can persist without having to
         * duplicate translation logic to and from a `Query` object.
         */
        o) {
            this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = s, 
            this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = r, this.query = o;
        }
    }

    Ws.store = "targets", 
    /** Keys are automatically assigned via the targetId property. */
    Ws.keyPath = "targetId", 
    /** The name of the queryTargets index. */
    Ws.queryTargetsIndexName = "queryTargetsIndex", 
    /**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
    Ws.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

    /**
     * An object representing an association between a target and a document, or a
     * sentinel row marking the last sequence number at which a document was used.
     * Each document cached must have a corresponding sentinel row before lru
     * garbage collection is enabled.
     *
     * The target associations and sentinel rows are co-located so that orphaned
     * documents and their sequence numbers can be identified efficiently via a scan
     * of this store.
     */
    class js {
        constructor(
        /**
         * The targetId identifying a target or 0 for a sentinel row.
         */
        t, 
        /**
         * The path to the document, as encoded in the key.
         */
        e, 
        /**
         * If this is a sentinel row, this should be the sequence number of the last
         * time the document specified by `path` was used. Otherwise, it should be
         * `undefined`.
         */
        n) {
            this.targetId = t, this.path = e, this.sequenceNumber = n;
        }
    }

    /** Name of the IndexedDb object store.  */ js.store = "targetDocuments", 
    /** Keys are automatically assigned via the targetId, path properties. */
    js.keyPath = [ "targetId", "path" ], 
    /** The index name for the reverse index. */
    js.documentTargetsIndex = "documentTargetsIndex", 
    /** We also need to create the reverse index for these properties. */
    js.documentTargetsKeyPath = [ "path", "targetId" ];

    /**
     * A record of global state tracked across all Targets, tracked separately
     * to avoid the need for extra indexes.
     *
     * This should be kept in-sync with the proto used in the iOS client.
     */
    class Gs {
        constructor(
        /**
         * The highest numbered target id across all targets.
         *
         * See DbTarget.targetId.
         */
        t, 
        /**
         * The highest numbered lastListenSequenceNumber across all targets.
         *
         * See DbTarget.lastListenSequenceNumber.
         */
        e, 
        /**
         * A global snapshot version representing the last consistent snapshot we
         * received from the backend. This is monotonically increasing and any
         * snapshots received from the backend prior to this version (e.g. for
         * targets resumed with a resumeToken) should be suppressed (buffered)
         * until the backend has caught up to this snapshot version again. This
         * prevents our cache from ever going backwards in time.
         */
        n, 
        /**
         * The number of targets persisted.
         */
        s) {
            this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, 
            this.targetCount = s;
        }
    }

    /**
     * The key string used for the single object that exists in the
     * DbTargetGlobal store.
     */ Gs.key = "targetGlobalKey", Gs.store = "targetGlobal";

    /**
     * An object representing an association between a Collection id (e.g. 'messages')
     * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
     * This is used to efficiently find all collections to query when performing
     * a Collection Group query.
     */
    class zs {
        constructor(
        /**
         * The collectionId (e.g. 'messages')
         */
        t, 
        /**
         * The path to the parent (either a document location or an empty path for
         * a root-level collection).
         */
        e) {
            this.collectionId = t, this.parent = e;
        }
    }

    /** Name of the IndexedDb object store. */ zs.store = "collectionParents", 
    /** Keys are automatically assigned via the collectionId, parent properties. */
    zs.keyPath = [ "collectionId", "parent" ];

    /**
     * A record of the metadata state of each client.
     *
     * PORTING NOTE: This is used to synchronize multi-tab state and does not need
     * to be ported to iOS or Android.
     */
    class Hs {
        constructor(
        // Note: Previous schema versions included a field
        // "lastProcessedDocumentChangeId". Don't use anymore.
        /** The auto-generated client id assigned at client startup. */
        t, 
        /** The last time this state was updated. */
        e, 
        /** Whether the client's network connection is enabled. */
        n, 
        /** Whether this client is running in a foreground tab. */
        s) {
            this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = s;
        }
    }

    /** Name of the IndexedDb object store. */ Hs.store = "clientMetadata", 
    /** Keys are automatically assigned via the clientId properties. */
    Hs.keyPath = "clientId";

    /**
     * A object representing a bundle loaded by the SDK.
     */
    class Js {
        constructor(
        /** The ID of the loaded bundle. */
        t, 
        /** The create time of the loaded bundle. */
        e, 
        /** The schema version of the loaded bundle. */
        n) {
            this.bundleId = t, this.createTime = e, this.version = n;
        }
    }

    /** Name of the IndexedDb object store. */ Js.store = "bundles", Js.keyPath = "bundleId";

    /**
     * A object representing a named query loaded by the SDK via a bundle.
     */
    class Ys {
        constructor(
        /** The name of the query. */
        t, 
        /** The read time of the results saved in the bundle from the named query. */
        e, 
        /** The query saved in the bundle. */
        n) {
            this.name = t, this.readTime = e, this.bundledQuery = n;
        }
    }

    /** Name of the IndexedDb object store. */ Ys.store = "namedQueries", Ys.keyPath = "name";

    // Visible for testing
    const Xs = [ ...[ ...[ ...[ ...[ $s.store, Ls.store, Bs.store, Ks.store, Ws.store, Fs.store, Gs.store, js.store ], Hs.store ], Qs.store ], zs.store ], Js.store, Ys.store ];

    // V2 is no longer usable (see comment at top of file)
    // Visible for testing
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Zs extends Cs {
        constructor(t, e) {
            super(), this.ys = t, this.ps = e;
        }
    }

    function ti(t, e) {
        const n = N$1(t);
        return ms.Gn(n.ys, e);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A batch of mutations that will be sent as one unit to the backend.
     */ class ei {
        /**
         * @param batchId - The unique ID of this mutation batch.
         * @param localWriteTime - The original write time of this mutation.
         * @param baseMutations - Mutations that are used to populate the base
         * values when this mutation is applied locally. This can be used to locally
         * overwrite values that are persisted in the remote document cache. Base
         * mutations are never sent to the backend.
         * @param mutations - The user-provided mutations in this mutation batch.
         * User-provided mutations are applied both locally and remotely on the
         * backend.
         */
        constructor(t, e, n, s) {
            this.batchId = t, this.vs = e, this.baseMutations = n, this.mutations = s;
        }
        /**
         * Applies all the mutations in this MutationBatch to the specified document
         * to create a new remote document
         *
         * @param docKey - The key of the document to apply mutations to.
         * @param maybeDoc - The document to apply mutations to.
         * @param batchResult - The result of applying the MutationBatch to the
         * backend.
         */    bs(t, e, n) {
            const s = n.Ss;
            for (let n = 0; n < this.mutations.length; n++) {
                const i = this.mutations[n];
                if (i.key.isEqual(t)) {
                    e = Ke(i, e, s[n]);
                }
            }
            return e;
        }
        /**
         * Computes the local view of a document given all the mutations in this
         * batch.
         *
         * @param docKey - The key of the document to apply mutations to.
         * @param maybeDoc - The document to apply mutations to.
         */    Ds(t, e) {
            // First, apply the base state. This allows us to apply non-idempotent
            // transform against a consistent set of values.
            for (const n of this.baseMutations) n.key.isEqual(t) && (e = Qe(n, e, e, this.vs));
            const n = e;
            // Second, apply all user-provided mutations.
                    for (const s of this.mutations) s.key.isEqual(t) && (e = Qe(s, e, n, this.vs));
            return e;
        }
        /**
         * Computes the local view for all provided documents given the mutations in
         * this batch.
         */    Cs(t) {
            // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
            // directly (as done in `applyToLocalView()`), we can reduce the complexity
            // to O(n).
            let e = t;
            return this.mutations.forEach((n => {
                const s = this.Ds(n.key, t.get(n.key));
                s && (e = e.Gt(n.key, s));
            })), e;
        }
        keys() {
            return this.mutations.reduce(((t, e) => t.add(e.key)), mn());
        }
        isEqual(t) {
            return this.batchId === t.batchId && j(this.mutations, t.mutations, ((t, e) => je(t, e))) && j(this.baseMutations, t.baseMutations, ((t, e) => je(t, e)));
        }
    }

    /** The result of applying a mutation batch to the backend. */ class ni {
        constructor(t, e, n, 
        /**
         * A pre-computed mapping from each mutated document to the resulting
         * version.
         */
        s) {
            this.batch = t, this.Ns = e, this.Ss = n, this.xs = s;
        }
        /**
         * Creates a new MutationBatchResult for the given batch and results. There
         * must be one result for each mutation in the batch. This static factory
         * caches a document=&gt;version mapping (docVersions).
         */    static from(t, e, n) {
            C(t.mutations.length === n.length);
            let s = In;
            const i = t.mutations;
            for (let t = 0; t < i.length; t++) s = s.Gt(i[t].key, n[t].version);
            return new ni(t, e, n, s);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Serializer for values stored in the LocalStore. */ class si {
        constructor(t) {
            this.ks = t;
        }
    }

    /** Decodes a remote document from storage locally to a Document. */ function ii(t, e) {
        if (e.document) return function(t, e, n) {
            const s = Wn(t, e.name), i = qn(e.updateTime), r = new St({
                mapValue: {
                    fields: e.fields
                }
            });
            return new xt(s, i, r, {
                hasCommittedMutations: !!n
            });
        }(t.ks, e.document, !!e.hasCommittedMutations);
        if (e.noDocument) {
            const t = tt._t(e.noDocument.path), n = ai(e.noDocument.readTime);
            return new kt(t, n, {
                hasCommittedMutations: !!e.hasCommittedMutations
            });
        }
        if (e.unknownDocument) {
            const t = tt._t(e.unknownDocument.path), n = ai(e.unknownDocument.version);
            return new Ot(t, n);
        }
        return D$1();
    }

    /** Encodes a document for storage locally. */ function ri(t, e, n) {
        const s = oi(n), i = e.key.path.G().tt();
        if (e instanceof xt) {
            const n = function(t, e) {
                return {
                    name: Qn(t, e.key),
                    fields: e.yt().mapValue.fields,
                    updateTime: $n(t, e.version.q())
                };
            }(t.ks, e), r = e.hasCommittedMutations;
            return new Ks(
            /* unknownDocument= */ null, 
            /* noDocument= */ null, n, r, s, i);
        }
        if (e instanceof kt) {
            const t = e.key.path.tt(), n = ui(e.version), r = e.hasCommittedMutations;
            return new Ks(
            /* unknownDocument= */ null, new qs(t, n), 
            /* document= */ null, r, s, i);
        }
        if (e instanceof Ot) {
            const t = e.key.path.tt(), n = ui(e.version);
            return new Ks(new Us(t, n), 
            /* noDocument= */ null, 
            /* document= */ null, 
            /* hasCommittedMutations= */ !0, s, i);
        }
        return D$1();
    }

    function oi(t) {
        const e = t.q();
        return [ e.seconds, e.nanoseconds ];
    }

    function ci(t) {
        const e = new z$1(t[0], t[1]);
        return H$1.$(e);
    }

    function ui(t) {
        const e = t.q();
        return new Ms(e.seconds, e.nanoseconds);
    }

    function ai(t) {
        const e = new z$1(t.seconds, t.nanoseconds);
        return H$1.$(e);
    }

    /** Encodes a batch of mutations into a DbMutationBatch for local storage. */
    /** Decodes a DbMutationBatch into a MutationBatch */
    function hi(t, e) {
        const n = (e.baseMutations || []).map((e => ts(t.ks, e)));
        // Squash old transform mutations into existing patch or set mutations.
        // The replacement of representing `transforms` with `update_transforms`
        // on the SDK means that old `transform` mutations stored in IndexedDB need
        // to be updated to `update_transforms`.
        // TODO(b/174608374): Remove this code once we perform a schema migration.
            for (let t = e.mutations.length - 1; t >= 0; --t) {
            const n = e.mutations[t];
            if (void 0 !== (null == n ? void 0 : n.transform)) {
                e.mutations[t - 1].updateTransforms = n.transform.fieldTransforms, e.mutations.splice(t, 1), 
                --t;
            }
        }
        const s = e.mutations.map((e => ts(t.ks, e))), i = z$1.fromMillis(e.localWriteTimeMs);
        return new ei(e.batchId, i, n, s);
    }

    /** Decodes a DbTarget into TargetData */ function li(t) {
        const e = ai(t.readTime), n = void 0 !== t.lastLimboFreeSnapshotVersion ? ai(t.lastLimboFreeSnapshotVersion) : H$1.min();
        let s;
        var i;
        return void 0 !== t.query.documents ? (C(1 === (i = t.query).documents.length), 
        s = fe(oe(Gn(i.documents[0])))) : s = function(t) {
            return fe(is(t));
        }(t.query), new Re(s, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, e, n, rt.fromBase64String(t.resumeToken));
    }

    /** Encodes TargetData into a DbTarget for storage locally. */ function _i(t, e) {
        const n = ui(e.Ot), s = ui(e.lastLimboFreeSnapshotVersion);
        let i;
        i = qt(e.target) ? ns(t.ks, e.target) : ss(t.ks, e.target);
        // We can't store the resumeToken as a ByteString in IndexedDb, so we
        // convert it to a base64 string for storage.
            const r = e.resumeToken.toBase64();
        // lastListenSequenceNumber is always 0 until we do real GC.
            return new Ws(e.targetId, $t(e.target), n, r, e.sequenceNumber, s, i);
    }

    /**
     * A helper function for figuring out what kind of query has been stored.
     */
    /**
     * Encodes a `BundledQuery` from bundle proto to a Query object.
     *
     * This reconstructs the original query used to build the bundle being loaded,
     * including features exists only in SDKs (for example: limit-to-last).
     */
    function fi(t) {
        const e = is({
            parent: t.parent,
            structuredQuery: t.structuredQuery
        });
        return "LAST" === t.limitType ? de(e, e.limit, "L" /* Last */) : e;
    }

    /** Encodes a NamedQuery proto object to a NamedQuery model object. */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class di {
        Os(t, e) {
            return wi(t).get(e).next((t => {
                if (t) return {
                    id: (e = t).bundleId,
                    createTime: ai(e.createTime),
                    version: e.version
                };
                /** Encodes a DbBundle to a Bundle. */
                var e;
                /** Encodes a BundleMetadata to a DbBundle. */        }));
        }
        Ms(t, e) {
            return wi(t).put({
                bundleId: (n = e).id,
                createTime: ui(qn(n.createTime)),
                version: n.version
            });
            var n;
            /** Encodes a DbNamedQuery to a NamedQuery. */    }
        Fs(t, e) {
            return Ei(t).get(e).next((t => {
                if (t) return {
                    name: (e = t).name,
                    query: fi(e.bundledQuery),
                    readTime: ai(e.readTime)
                };
                var e;
                /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
        }
        $s(t, e) {
            return Ei(t).put(function(t) {
                return {
                    name: t.name,
                    readTime: ui(qn(t.readTime)),
                    bundledQuery: t.bundledQuery
                };
            }(e));
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the bundles object store.
     */ function wi(t) {
        return ti(t, Js.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the namedQueries object store.
     */ function Ei(t) {
        return ti(t, Ys.store);
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory implementation of IndexManager.
     */ class Ti {
        constructor() {
            this.Ls = new Ii;
        }
        Bs(t, e) {
            return this.Ls.add(e), Is.resolve();
        }
        qs(t, e) {
            return Is.resolve(this.Ls.getEntries(e));
        }
    }

    /**
     * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
     * Also used for in-memory caching by IndexedDbIndexManager and initial index population
     * in indexeddb_schema.ts
     */ class Ii {
        constructor() {
            this.index = {};
        }
        // Returns false if the entry already existed.
        add(t) {
            const e = t.J(), n = t.G(), s = this.index[e] || new ln(Y$1.K), i = !s.has(n);
            return this.index[e] = s.add(n), i;
        }
        has(t) {
            const e = t.J(), n = t.G(), s = this.index[e];
            return s && s.has(n);
        }
        getEntries(t) {
            return (this.index[t] || new ln(Y$1.K)).tt();
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A persisted implementation of IndexManager.
     */ class Ai {
        constructor() {
            /**
             * An in-memory copy of the index entries we've already written since the SDK
             * launched. Used to avoid re-writing the same entry repeatedly.
             *
             * This is *NOT* a complete cache of what's in persistence and so can never be used to
             * satisfy reads.
             */
            this.Us = new Ii;
        }
        /**
         * Adds a new entry to the collection parent index.
         *
         * Repeated calls for the same collectionPath should be avoided within a
         * transaction as IndexedDbIndexManager only caches writes once a transaction
         * has been committed.
         */    Bs(t, e) {
            if (!this.Us.has(e)) {
                const n = e.J(), s = e.G();
                t.Vs((() => {
                    // Add the collection to the in memory cache only if the transaction was
                    // successfully committed.
                    this.Us.add(e);
                }));
                const i = {
                    collectionId: n,
                    parent: Ns(s)
                };
                return mi(t).put(i);
            }
            return Is.resolve();
        }
        qs(t, e) {
            const n = [], s = IDBKeyRange.bound([ e, "" ], [ G$1(e), "" ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            return mi(t).ss(s).next((t => {
                for (const s of t) {
                    // This collectionId guard shouldn't be necessary (and isn't as long
                    // as we're running in a real browser), but there's a bug in
                    // indexeddbshim that breaks our range in our tests running in node:
                    // https://github.com/axemclion/IndexedDBShim/issues/334
                    if (s.collectionId !== e) break;
                    n.push(Os(s.parent));
                }
                return n;
            }));
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the collectionParents
     * document store.
     */ function mi(t) {
        return ti(t, zs.store);
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Ri = {
        Ks: !1,
        Qs: 0,
        Ws: 0,
        js: 0
    };

    class Pi {
        constructor(
        // When we attempt to collect, we will only do so if the cache size is greater than this
        // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
        t, 
        // The percentage of sequence numbers that we will attempt to collect
        e, 
        // A cap on the total number of sequence numbers that will be collected. This prevents
        // us from collecting a huge number of sequence numbers if the cache has grown very large.
        n) {
            this.Gs = t, this.zs = e, this.Hs = n;
        }
        static Js(t) {
            return new Pi(t, Pi.Ys, Pi.Xs);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Verifies the error thrown by a LocalStore operation. If a LocalStore
     * operation fails because the primary lease has been taken by another client,
     * we ignore the error (the persistence layer will immediately call
     * `applyPrimaryLease` to propagate the primary state change). All other errors
     * are re-thrown.
     *
     * @param err - An error returned by a LocalStore operation.
     * @returns A Promise that resolves after we recovered, or the original error.
     */
    async function Vi(t) {
        if (t.code !== x$1.FAILED_PRECONDITION || t.message !== Ds) throw t;
        p$1("LocalStore", "Unexpectedly lost primary lease");
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A map implementation that uses objects as keys. Objects must have an
     * associated equals function and must be immutable. Entries in the map are
     * stored together with the key being produced from the mapKeyFn. This map
     * automatically handles collisions of keys.
     */ Pi.Ys = 10, Pi.Xs = 1e3, Pi.Zs = new Pi(41943040, Pi.Ys, Pi.Xs), Pi.ti = new Pi(-1, 0, 0);

    class gi {
        constructor(t, e) {
            this.ei = t, this.ni = e, 
            /**
             * The inner map for a key/value pair. Due to the possibility of collisions we
             * keep a list of entries that we do a linear search through to find an actual
             * match. Note that collisions should be rare, so we still expect near
             * constant time lookups in practice.
             */
            this.si = {};
        }
        /** Get a value for this key, or undefined if it does not exist. */    get(t) {
            const e = this.ei(t), n = this.si[e];
            if (void 0 !== n) for (const [e, s] of n) if (this.ni(e, t)) return s;
        }
        has(t) {
            return void 0 !== this.get(t);
        }
        /** Put this key and value in the map. */    set(t, e) {
            const n = this.ei(t), s = this.si[n];
            if (void 0 !== s) {
                for (let n = 0; n < s.length; n++) if (this.ni(s[n][0], t)) return void (s[n] = [ t, e ]);
                s.push([ t, e ]);
            } else this.si[n] = [ [ t, e ] ];
        }
        /**
         * Remove this key from the map. Returns a boolean if anything was deleted.
         */    delete(t) {
            const e = this.ei(t), n = this.si[e];
            if (void 0 === n) return !1;
            for (let s = 0; s < n.length; s++) if (this.ni(n[s][0], t)) return 1 === n.length ? delete this.si[e] : n.splice(s, 1), 
            !0;
            return !1;
        }
        forEach(t) {
            nt(this.si, ((e, n) => {
                for (const [e, s] of n) t(e, s);
            }));
        }
        Y() {
            return st(this.si);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory buffer of entries to be written to a RemoteDocumentCache.
     * It can be used to batch up a set of changes to be written to the cache, but
     * additionally supports reading entries back with the `getEntry()` method,
     * falling back to the underlying RemoteDocumentCache if no entry is
     * buffered.
     *
     * Entries added to the cache *must* be read first. This is to facilitate
     * calculating the size delta of the pending changes.
     *
     * PORTING NOTE: This class was implemented then removed from other platforms.
     * If byte-counting ends up being needed on the other platforms, consider
     * porting this class as part of that implementation work.
     */ class yi {
        constructor() {
            // A mapping of document key to the new cache entry that should be written (or null if any
            // existing cache entry should be removed).
            this.ii = new gi((t => t.toString()), ((t, e) => t.isEqual(e))), this.ri = !1;
        }
        oi(t) {
            const e = this.ii.get(t);
            return e ? e.readTime : H$1.min();
        }
        /**
         * Buffers a `RemoteDocumentCache.addEntry()` call.
         *
         * You can only modify documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    ci(t, e) {
            this.ui(), this.ii.set(t.key, {
                ai: t,
                readTime: e
            });
        }
        /**
         * Buffers a `RemoteDocumentCache.removeEntry()` call.
         *
         * You can only remove documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    hi(t, e = null) {
            this.ui(), this.ii.set(t, {
                ai: null,
                readTime: e
            });
        }
        /**
         * Looks up an entry in the cache. The buffered changes will first be checked,
         * and if no buffered change applies, this will forward to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction - The transaction in which to perform any persistence
         *     operations.
         * @param documentKey - The key of the entry to look up.
         * @returns The cached Document or NoDocument entry, or null if we have
         *     nothing cached.
         */    li(t, e) {
            this.ui();
            const n = this.ii.get(e);
            return void 0 !== n ? Is.resolve(n.ai) : this._i(t, e);
        }
        /**
         * Looks up several entries in the cache, forwarding to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction - The transaction in which to perform any persistence
         *     operations.
         * @param documentKeys - The keys of the entries to look up.
         * @returns A map of cached `Document`s or `NoDocument`s, indexed by key. If
         *     an entry cannot be found, the corresponding key will be mapped to a
         *     null value.
         */    getEntries(t, e) {
            return this.fi(t, e);
        }
        /**
         * Applies buffered changes to the underlying RemoteDocumentCache, using
         * the provided transaction.
         */    apply(t) {
            return this.ui(), this.ri = !0, this.di(t);
        }
        /** Helper to assert this.changes is not null  */    ui() {}
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Delete a mutation batch and the associated document mutations.
     * @returns A PersistencePromise of the document mutations that were removed.
     */ function pi(t, e, n) {
        const s = t.store(Ls.store), i = t.store(Bs.store), r = [], o = IDBKeyRange.only(n.batchId);
        let c = 0;
        const u = s.us({
            range: o
        }, ((t, e, n) => (c++, n.delete())));
        r.push(u.next((() => {
            C(1 === c);
        })));
        const a = [];
        for (const t of n.mutations) {
            const s = Bs.key(e, t.key.path, n.batchId);
            r.push(i.delete(s)), a.push(t.key);
        }
        return Is.Fn(r).next((() => a));
    }

    /**
     * Returns an approximate size for the given document.
     */ function vi(t) {
        let e;
        if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
            if (!t.noDocument) throw D$1();
            e = t.noDocument;
        }
        return JSON.stringify(e).length;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** A mutation queue for a specific user, backed by IndexedDB. */ class bi {
        constructor(
        /**
         * The normalized userId (e.g. null UID => "" userId) used to store /
         * retrieve mutations.
         */
        t, e, n, s) {
            this.userId = t, this.Ut = e, this.wi = n, this.Ei = s, 
            /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
            // PORTING NOTE: Multi-tab only.
            this.Ti = {};
        }
        /**
         * Creates a new mutation queue for the given user.
         * @param user - The user for which to create a mutation queue.
         * @param serializer - The serializer to use when persisting to IndexedDb.
         */    static Ii(t, e, n, s) {
            // TODO(mcg): Figure out what constraints there are on userIDs
            // In particular, are there any reserved characters? are empty ids allowed?
            // For the moment store these together in the same mutations table assuming
            // that empty userIDs aren't allowed.
            C("" !== t.uid);
            const i = t.t() ? t.uid : "";
            return new bi(i, e, n, s);
        }
        Ai(t) {
            let e = !0;
            const n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
            return Di(t).us({
                index: Ls.userMutationsIndex,
                range: n
            }, ((t, n, s) => {
                e = !1, s.done();
            })).next((() => e));
        }
        mi(t, e, n, s) {
            const i = Ci(t), r = Di(t);
            // The IndexedDb implementation in Chrome (and Firefox) does not handle
            // compound indices that include auto-generated keys correctly. To ensure
            // that the index entry is added correctly in all browsers, we perform two
            // writes: The first write is used to retrieve the next auto-generated Batch
            // ID, and the second write populates the index and stores the actual
            // mutation batch.
            // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
            // We write an empty object to obtain key
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return r.add({}).next((o => {
                C("number" == typeof o);
                const c = new ei(o, e, n, s), u = function(t, e, n) {
                    const s = n.baseMutations.map((e => Zn(t.ks, e))), i = n.mutations.map((e => Zn(t.ks, e)));
                    return new Ls(e, n.batchId, n.vs.toMillis(), s, i);
                }(this.Ut, this.userId, c), a = [];
                let h = new ln(((t, e) => W$1(t.et(), e.et())));
                for (const t of s) {
                    const e = Bs.key(this.userId, t.key.path, o);
                    h = h.add(t.key.path.G()), a.push(r.put(u)), a.push(i.put(e, Bs.PLACEHOLDER));
                }
                return h.forEach((e => {
                    a.push(this.wi.Bs(t, e));
                })), t.Vs((() => {
                    this.Ti[o] = c.keys();
                })), Is.Fn(a).next((() => c));
            }));
        }
        Ri(t, e) {
            return Di(t).get(e).next((t => t ? (C(t.userId === this.userId), hi(this.Ut, t)) : null));
        }
        /**
         * Returns the document keys for the mutation batch with the given batchId.
         * For primary clients, this method returns `null` after
         * `removeMutationBatches()` has been called. Secondary clients return a
         * cached result until `removeCachedMutationKeys()` is invoked.
         */
        // PORTING NOTE: Multi-tab only.
        Pi(t, e) {
            return this.Ti[e] ? Is.resolve(this.Ti[e]) : this.Ri(t, e).next((t => {
                if (t) {
                    const n = t.keys();
                    return this.Ti[e] = n, n;
                }
                return null;
            }));
        }
        Vi(t, e) {
            const n = e + 1, s = IDBKeyRange.lowerBound([ this.userId, n ]);
            let i = null;
            return Di(t).us({
                index: Ls.userMutationsIndex,
                range: s
            }, ((t, e, s) => {
                e.userId === this.userId && (C(e.batchId >= n), i = hi(this.Ut, e)), s.done();
            })).next((() => i));
        }
        gi(t) {
            const e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]);
            let n = -1;
            return Di(t).us({
                index: Ls.userMutationsIndex,
                range: e,
                reverse: !0
            }, ((t, e, s) => {
                n = e.batchId, s.done();
            })).next((() => n));
        }
        yi(t) {
            const e = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
            return Di(t).ss(Ls.userMutationsIndex, e).next((t => t.map((t => hi(this.Ut, t)))));
        }
        pi(t, e) {
            // Scan the document-mutation index starting with a prefix starting with
            // the given documentKey.
            const n = Bs.prefixForPath(this.userId, e.path), s = IDBKeyRange.lowerBound(n), i = [];
            return Ci(t).us({
                range: s
            }, ((n, s, r) => {
                const [o, c, u] = n, a = Os(c);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                            if (o === this.userId && e.path.isEqual(a)) 
                // Look up the mutation batch in the store.
                return Di(t).get(u).next((t => {
                    if (!t) throw D$1();
                    C(t.userId === this.userId), i.push(hi(this.Ut, t));
                }));
                r.done();
            })).next((() => i));
        }
        vi(t, e) {
            let n = new ln(W$1);
            const s = [];
            return e.forEach((e => {
                const i = Bs.prefixForPath(this.userId, e.path), r = IDBKeyRange.lowerBound(i), o = Ci(t).us({
                    range: r
                }, ((t, s, i) => {
                    const [r, o, c] = t, u = Os(o);
                    // Only consider rows matching exactly the specific key of
                    // interest. Note that because we order by path first, and we
                    // order terminators before path separators, we'll encounter all
                    // the index rows for documentKey contiguously. In particular, all
                    // the rows for documentKey will occur before any rows for
                    // documents nested in a subcollection beneath documentKey so we
                    // can stop as soon as we hit any such row.
                                    r === this.userId && e.path.isEqual(u) ? n = n.add(c) : i.done();
                }));
                s.push(o);
            })), Is.Fn(s).next((() => this.bi(t, n)));
        }
        Si(t, e) {
            const n = e.path, s = n.length + 1, i = Bs.prefixForPath(this.userId, n), r = IDBKeyRange.lowerBound(i);
            // Collect up unique batchIDs encountered during a scan of the index. Use a
            // SortedSet to accumulate batch IDs so they can be traversed in order in a
            // scan of the main table.
            let o = new ln(W$1);
            return Ci(t).us({
                range: r
            }, ((t, e, i) => {
                const [r, c, u] = t, a = Os(c);
                r === this.userId && n.X(a) ? 
                // Rows with document keys more than one segment longer than the
                // query path can't be matches. For example, a query on 'rooms'
                // can't match the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                a.length === s && (o = o.add(u)) : i.done();
            })).next((() => this.bi(t, o)));
        }
        bi(t, e) {
            const n = [], s = [];
            // TODO(rockwood): Implement this using iterate.
            return e.forEach((e => {
                s.push(Di(t).get(e).next((t => {
                    if (null === t) throw D$1();
                    C(t.userId === this.userId), n.push(hi(this.Ut, t));
                })));
            })), Is.Fn(s).next((() => n));
        }
        Di(t, e) {
            return pi(t.ys, this.userId, e).next((n => (t.Vs((() => {
                this.Ci(e.batchId);
            })), Is.forEach(n, (e => this.Ei.Ni(t, e))))));
        }
        /**
         * Clears the cached keys for a mutation batch. This method should be
         * called by secondary clients after they process mutation updates.
         *
         * Note that this method does not have to be called from primary clients as
         * the corresponding cache entries are cleared when an acknowledged or
         * rejected batch is removed from the mutation queue.
         */
        // PORTING NOTE: Multi-tab only
        Ci(t) {
            delete this.Ti[t];
        }
        xi(t) {
            return this.Ai(t).next((e => {
                if (!e) return Is.resolve();
                // Verify that there are no entries in the documentMutations index if
                // the queue is empty.
                            const n = IDBKeyRange.lowerBound(Bs.prefixForUser(this.userId)), s = [];
                return Ci(t).us({
                    range: n
                }, ((t, e, n) => {
                    if (t[0] === this.userId) {
                        const e = Os(t[1]);
                        s.push(e);
                    } else n.done();
                })).next((() => {
                    C(0 === s.length);
                }));
            }));
        }
        ki(t, e) {
            return Si(t, this.userId, e);
        }
        // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
        /** Returns the mutation queue's metadata from IndexedDb. */
        Oi(t) {
            return Ni(t).get(this.userId).next((t => t || new $s(this.userId, -1, 
            /*lastStreamToken=*/ "")));
        }
    }

    /**
     * @returns true if the mutation queue for the given user contains a pending
     *         mutation for the given key.
     */ function Si(t, e, n) {
        const s = Bs.prefixForPath(e, n.path), i = s[1], r = IDBKeyRange.lowerBound(s);
        let o = !1;
        return Ci(t).us({
            range: r,
            cs: !0
        }, ((t, n, s) => {
            const [r, c, /*batchID*/ u] = t;
            r === e && c === i && (o = !0), s.done();
        })).next((() => o));
    }

    /** Returns true if any mutation queue contains the given document. */
    /**
     * Helper to get a typed SimpleDbStore for the mutations object store.
     */
    function Di(t) {
        return ti(t, Ls.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the mutationQueues object store.
     */ function Ci(t) {
        return ti(t, Bs.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the mutationQueues object store.
     */ function Ni(t) {
        return ti(t, $s.store);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Offset to ensure non-overlapping target ids. */
    /**
     * Generates monotonically increasing target IDs for sending targets to the
     * watch stream.
     *
     * The client constructs two generators, one for the target cache, and one for
     * for the sync engine (to generate limbo documents targets). These
     * generators produce non-overlapping IDs (by using even and odd IDs
     * respectively).
     *
     * By separating the target ID space, the query cache can generate target IDs
     * that persist across client restarts, while sync engine can independently
     * generate in-memory target IDs that are transient and can be reused after a
     * restart.
     */
    class xi {
        constructor(t) {
            this.Mi = t;
        }
        next() {
            return this.Mi += 2, this.Mi;
        }
        static Fi() {
            // The target cache generator must return '2' in its first call to `next()`
            // as there is no differentiation in the protocol layer between an unset
            // number and the number '0'. If we were to sent a target with target ID
            // '0', the backend would consider it unset and replace it with its own ID.
            return new xi(0);
        }
        static $i() {
            // Sync engine assigns target IDs for limbo document detection.
            return new xi(-1);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class ki {
        constructor(t, e) {
            this.Ei = t, this.Ut = e;
        }
        // PORTING NOTE: We don't cache global metadata for the target cache, since
        // some of it (in particular `highestTargetId`) can be modified by secondary
        // tabs. We could perhaps be more granular (and e.g. still cache
        // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
        // to IndexedDb whenever we need to read metadata. We can revisit if it turns
        // out to have a meaningful performance impact.
        Li(t) {
            return this.Bi(t).next((e => {
                const n = new xi(e.highestTargetId);
                return e.highestTargetId = n.next(), this.qi(t, e).next((() => e.highestTargetId));
            }));
        }
        Ui(t) {
            return this.Bi(t).next((t => H$1.$(new z$1(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds))));
        }
        Ki(t) {
            return this.Bi(t).next((t => t.highestListenSequenceNumber));
        }
        Qi(t, e, n) {
            return this.Bi(t).next((s => (s.highestListenSequenceNumber = e, n && (s.lastRemoteSnapshotVersion = n.q()), 
            e > s.highestListenSequenceNumber && (s.highestListenSequenceNumber = e), this.qi(t, s))));
        }
        Wi(t, e) {
            return this.ji(t, e).next((() => this.Bi(t).next((n => (n.targetCount += 1, this.Gi(e, n), 
            this.qi(t, n))))));
        }
        zi(t, e) {
            return this.ji(t, e);
        }
        Hi(t, e) {
            return this.Ji(t, e.targetId).next((() => Oi(t).delete(e.targetId))).next((() => this.Bi(t))).next((e => (C(e.targetCount > 0), 
            e.targetCount -= 1, this.qi(t, e))));
        }
        /**
         * Drops any targets with sequence number less than or equal to the upper bound, excepting those
         * present in `activeTargetIds`. Document associations for the removed targets are also removed.
         * Returns the number of targets removed.
         */    Yi(t, e, n) {
            let s = 0;
            const i = [];
            return Oi(t).us(((r, o) => {
                const c = li(o);
                c.sequenceNumber <= e && null === n.get(c.targetId) && (s++, i.push(this.Hi(t, c)));
            })).next((() => Is.Fn(i))).next((() => s));
        }
        /**
         * Call provided function with each `TargetData` that we have cached.
         */    Tn(t, e) {
            return Oi(t).us(((t, n) => {
                const s = li(n);
                e(s);
            }));
        }
        Bi(t) {
            return Mi(t).get(Gs.key).next((t => (C(null !== t), t)));
        }
        qi(t, e) {
            return Mi(t).put(Gs.key, e);
        }
        ji(t, e) {
            return Oi(t).put(_i(this.Ut, e));
        }
        /**
         * In-place updates the provided metadata to account for values in the given
         * TargetData. Saving is done separately. Returns true if there were any
         * changes to the metadata.
         */    Gi(t, e) {
            let n = !1;
            return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
            t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
            n = !0), n;
        }
        Xi(t) {
            return this.Bi(t).next((t => t.targetCount));
        }
        Zi(t, e) {
            // Iterating by the canonicalId may yield more than one result because
            // canonicalId values are not required to be unique per target. This query
            // depends on the queryTargets index to be efficient.
            const n = $t(e), s = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]);
            let i = null;
            return Oi(t).us({
                range: s,
                index: Ws.queryTargetsIndexName
            }, ((t, n, s) => {
                const r = li(n);
                // After finding a potential match, check that the target is
                // actually equal to the requested target.
                            Bt(e, r.target) && (i = r, s.done());
            })).next((() => i));
        }
        tr(t, e, n) {
            // PORTING NOTE: The reverse index (documentsTargets) is maintained by
            // IndexedDb.
            const s = [], i = Fi(t);
            return e.forEach((e => {
                const r = Ns(e.path);
                s.push(i.put(new js(n, r))), s.push(this.Ei.er(t, n, e));
            })), Is.Fn(s);
        }
        nr(t, e, n) {
            // PORTING NOTE: The reverse index (documentsTargets) is maintained by
            // IndexedDb.
            const s = Fi(t);
            return Is.forEach(e, (e => {
                const i = Ns(e.path);
                return Is.Fn([ s.delete([ n, i ]), this.Ei.sr(t, n, e) ]);
            }));
        }
        Ji(t, e) {
            const n = Fi(t), s = IDBKeyRange.bound([ e ], [ e + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            return n.delete(s);
        }
        ir(t, e) {
            const n = IDBKeyRange.bound([ e ], [ e + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0), s = Fi(t);
            let i = mn();
            return s.us({
                range: n,
                cs: !0
            }, ((t, e, n) => {
                const s = Os(t[1]), r = new tt(s);
                i = i.add(r);
            })).next((() => i));
        }
        ki(t, e) {
            const n = Ns(e.path), s = IDBKeyRange.bound([ n ], [ G$1(n) ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            let i = 0;
            return Fi(t).us({
                index: js.documentTargetsIndex,
                cs: !0,
                range: s
            }, (([t, e], n, s) => {
                // Having a sentinel row for a document does not count as containing that document;
                // For the target cache, containing the document means the document is part of some
                // target.
                0 !== t && (i++, s.done());
            })).next((() => i > 0));
        }
        /**
         * Looks up a TargetData entry by target ID.
         *
         * @param targetId - The target ID of the TargetData entry to look up.
         * @returns The cached TargetData entry, or null if the cache has no entry for
         * the target.
         */
        // PORTING NOTE: Multi-tab only.
        bn(t, e) {
            return Oi(t).get(e).next((t => t ? li(t) : null));
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the queries object store.
     */ function Oi(t) {
        return ti(t, Ws.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the target globals object store.
     */ function Mi(t) {
        return ti(t, Gs.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the document target object store.
     */ function Fi(t) {
        return ti(t, js.store);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function $i([t, e], [n, s]) {
        const i = W$1(t, n);
        return 0 === i ? W$1(e, s) : i;
    }

    /**
     * Used to calculate the nth sequence number. Keeps a rolling buffer of the
     * lowest n values passed to `addElement`, and finally reports the largest of
     * them in `maxValue`.
     */ class Li {
        constructor(t) {
            this.rr = t, this.buffer = new ln($i), this.cr = 0;
        }
        ur() {
            return ++this.cr;
        }
        ar(t) {
            const e = [ t, this.ur() ];
            if (this.buffer.size < this.rr) this.buffer = this.buffer.add(e); else {
                const t = this.buffer.last();
                $i(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e));
            }
        }
        get maxValue() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        }
    }

    /**
     * This class is responsible for the scheduling of LRU garbage collection. It handles checking
     * whether or not GC is enabled, as well as which delay to use before the next run.
     */ class Bi {
        constructor(t, e) {
            this.hr = t, this.ls = e, this.lr = !1, this._r = null;
        }
        start(t) {
            -1 !== this.hr.params.Gs && this.dr(t);
        }
        stop() {
            this._r && (this._r.cancel(), this._r = null);
        }
        get wr() {
            return null !== this._r;
        }
        dr(t) {
            const e = this.lr ? 3e5 : 6e4;
            p$1("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this._r = this.ls.Er("lru_garbage_collection" /* LruGarbageCollection */ , e, (async () => {
                this._r = null, this.lr = !0;
                try {
                    await t.Tr(this.hr);
                } catch (t) {
                    Vs(t) ? p$1("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t) : await Vi(t);
                }
                await this.dr(t);
            }));
        }
    }

    /** Implements the steps for LRU garbage collection. */ class qi {
        constructor(t, e) {
            this.Ir = t, this.params = e;
        }
        Ar(t, e) {
            return this.Ir.mr(t).next((t => Math.floor(e / 100 * t)));
        }
        Rr(t, e) {
            if (0 === e) return Is.resolve(U$1.O);
            const n = new Li(e);
            return this.Ir.Tn(t, (t => n.ar(t.sequenceNumber))).next((() => this.Ir.Pr(t, (t => n.ar(t))))).next((() => n.maxValue));
        }
        Yi(t, e, n) {
            return this.Ir.Yi(t, e, n);
        }
        Vr(t, e) {
            return this.Ir.Vr(t, e);
        }
        gr(t, e) {
            return -1 === this.params.Gs ? (p$1("LruGarbageCollector", "Garbage collection skipped; disabled"), 
            Is.resolve(Ri)) : this.yr(t).next((n => n < this.params.Gs ? (p$1("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ` + this.params.Gs), 
            Ri) : this.pr(t, e)));
        }
        yr(t) {
            return this.Ir.yr(t);
        }
        pr(t, e) {
            let n, s, i, r, c, u, a;
            const h = Date.now();
            return this.Ar(t, this.params.zs).next((e => (
            // Cap at the configured max
            e > this.params.Hs ? (p$1("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.Hs} from ` + e), 
            s = this.params.Hs) : s = e, r = Date.now(), this.Rr(t, s)))).next((s => (n = s, 
            c = Date.now(), this.Yi(t, n, e)))).next((e => (i = e, u = Date.now(), this.Vr(t, n)))).next((t => {
                if (a = Date.now(), g() <= LogLevel.DEBUG) {
                    p$1("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${r - h}ms\n\tDetermined least recently used ${s} in ` + (c - r) + "ms\n" + `\tRemoved ${i} targets in ` + (u - c) + "ms\n" + `\tRemoved ${t} documents in ` + (a - u) + "ms\n" + `Total Duration: ${a - h}ms`);
                }
                return Is.resolve({
                    Ks: !0,
                    Qs: s,
                    Ws: i,
                    js: t
                });
            }));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Provides LRU functionality for IndexedDB persistence. */
    class Ui {
        constructor(t, e) {
            this.db = t, this.hr = function(t, e) {
                return new qi(t, e);
            }(this, e);
        }
        mr(t) {
            const e = this.vr(t);
            return this.db.br().Xi(t).next((t => e.next((e => t + e))));
        }
        vr(t) {
            let e = 0;
            return this.Pr(t, (t => {
                e++;
            })).next((() => e));
        }
        Tn(t, e) {
            return this.db.br().Tn(t, e);
        }
        Pr(t, e) {
            return this.Sr(t, ((t, n) => e(n)));
        }
        er(t, e, n) {
            return Ki(t, n);
        }
        sr(t, e, n) {
            return Ki(t, n);
        }
        Yi(t, e, n) {
            return this.db.br().Yi(t, e, n);
        }
        Ni(t, e) {
            return Ki(t, e);
        }
        /**
         * Returns true if anything would prevent this document from being garbage
         * collected, given that the document in question is not present in any
         * targets and has a sequence number less than or equal to the upper bound for
         * the collection run.
         */    Dr(t, e) {
            return function(t, e) {
                let n = !1;
                return Ni(t).hs((s => Si(t, s, e).next((t => (t && (n = !0), Is.resolve(!t)))))).next((() => n));
            }(t, e);
        }
        Vr(t, e) {
            const n = this.db.Nr().Cr(), s = [];
            let i = 0;
            return this.Sr(t, ((r, o) => {
                if (o <= e) {
                    const e = this.Dr(t, r).next((e => {
                        if (!e) 
                        // Our size accounting requires us to read all documents before
                        // removing them.
                        return i++, n.li(t, r).next((() => (n.hi(r), Fi(t).delete([ 0, Ns(r.path) ]))));
                    }));
                    s.push(e);
                }
            })).next((() => Is.Fn(s))).next((() => n.apply(t))).next((() => i));
        }
        removeTarget(t, e) {
            const n = e.Mt(t.ps);
            return this.db.br().zi(t, n);
        }
        kr(t, e) {
            return Ki(t, e);
        }
        /**
         * Call provided function for each document in the cache that is 'orphaned'. Orphaned
         * means not a part of any target, so the only entry in the target-document index for
         * that document will be the sentinel row (targetId 0), which will also have the sequence
         * number for the last time the document was accessed.
         */    Sr(t, e) {
            const n = Fi(t);
            let s, i = U$1.O;
            return n.us({
                index: js.documentTargetsIndex
            }, (([t, n], {path: r, sequenceNumber: o}) => {
                0 === t ? (
                // if nextToReport is valid, report it, this is a new key so the
                // last one must not be a member of any targets.
                i !== U$1.O && e(new tt(Os(s)), i), 
                // set nextToReport to be this sequence number. It's the next one we
                // might report, if we don't find any targets for this document.
                // Note that the sequence number must be defined when the targetId
                // is 0.
                i = o, s = r) : 
                // set nextToReport to be invalid, we know we don't need to report
                // this one since we found a target for it.
                i = U$1.O;
            })).next((() => {
                // Since we report sequence numbers after getting to the next key, we
                // need to check if the last key we iterated over was an orphaned
                // document and report it.
                i !== U$1.O && e(new tt(Os(s)), i);
            }));
        }
        yr(t) {
            return this.db.Nr().Or(t);
        }
    }

    function Ki(t, e) {
        return Fi(t).put(
        /**
     * @returns A value suitable for writing a sentinel row in the target-document
     * store.
     */
        function(t, e) {
            return new js(0, Ns(t.path), e);
        }(e, t.ps));
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The RemoteDocumentCache for IndexedDb. To construct, invoke
     * `newIndexedDbRemoteDocumentCache()`.
     */ class Qi {
        /**
         * @param serializer - The document serializer.
         * @param indexManager - The query indexes that need to be maintained.
         */
        constructor(t, e) {
            this.Ut = t, this.wi = e;
        }
        /**
         * Adds the supplied entries to the cache.
         *
         * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
         */    ci(t, e, n) {
            return Gi(t).put(zi(e), n);
        }
        /**
         * Removes a document from the cache.
         *
         * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
         */    hi(t, e) {
            const n = Gi(t), s = zi(e);
            return n.delete(s);
        }
        /**
         * Updates the current cache size.
         *
         * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
         * cache's metadata.
         */    updateMetadata(t, e) {
            return this.getMetadata(t).next((n => (n.byteSize += e, this.Mr(t, n))));
        }
        li(t, e) {
            return Gi(t).get(zi(e)).next((t => this.Fr(t)));
        }
        /**
         * Looks up an entry in the cache.
         *
         * @param documentKey - The key of the entry to look up.
         * @returns The cached MaybeDocument entry and its size, or null if we have
         * nothing cached.
         */    $r(t, e) {
            return Gi(t).get(zi(e)).next((t => {
                const e = this.Fr(t);
                return e ? {
                    ai: e,
                    size: vi(t)
                } : null;
            }));
        }
        getEntries(t, e) {
            let n = wn();
            return this.Lr(t, e, ((t, e) => {
                const s = this.Fr(e);
                n = n.Gt(t, s);
            })).next((() => n));
        }
        /**
         * Looks up several entries in the cache.
         *
         * @param documentKeys - The set of keys entries to look up.
         * @returns A map of MaybeDocuments indexed by key (if a document cannot be
         *     found, the key will be mapped to null) and a map of sizes indexed by
         *     key (zero if the key cannot be found).
         */    Br(t, e) {
            let n = wn(), s = new un(tt.K);
            return this.Lr(t, e, ((t, e) => {
                const i = this.Fr(e);
                i ? (n = n.Gt(t, i), s = s.Gt(t, vi(e))) : (n = n.Gt(t, null), s = s.Gt(t, 0));
            })).next((() => ({
                qr: n,
                Ur: s
            })));
        }
        Lr(t, e, n) {
            if (e.Y()) return Is.resolve();
            const s = IDBKeyRange.bound(e.first().path.tt(), e.last().path.tt()), i = e.Zt();
            let r = i.re();
            return Gi(t).us({
                range: s
            }, ((t, e, s) => {
                const o = tt._t(t);
                // Go through keys not found in cache.
                            for (;r && tt.K(r, o) < 0; ) n(r, null), r = i.re();
                r && r.isEqual(o) && (
                // Key found in cache.
                n(r, e), r = i.oe() ? i.re() : null), 
                // Skip to the next key (if there is one).
                r ? s.ns(r.path.tt()) : s.done();
            })).next((() => {
                // The rest of the keys are not in the cache. One case where `iterate`
                // above won't go through them is when the cache is empty.
                for (;r; ) n(r, null), r = i.oe() ? i.re() : null;
            }));
        }
        Kr(t, e, n) {
            let s = Tn();
            const i = e.path.length + 1, r = {};
            if (n.isEqual(H$1.min())) {
                // Documents are ordered by key, so we can use a prefix scan to narrow
                // down the documents we need to match the query against.
                const t = e.path.tt();
                r.range = IDBKeyRange.lowerBound(t);
            } else {
                // Execute an index-free query and filter by read time. This is safe
                // since all document changes to queries that have a
                // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
                const t = e.path.tt(), s = oi(n);
                r.range = IDBKeyRange.lowerBound([ t, s ], 
                /* open= */ !0), r.index = Ks.collectionReadTimeIndex;
            }
            return Gi(t).us(r, ((t, n, r) => {
                // The query is actually returning any path that starts with the query
                // path prefix which may include documents in subcollections. For
                // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
                // shouldn't match it. Fix this by discarding rows with document keys
                // more than one segment longer than the query path.
                if (t.length !== i) return;
                const o = ii(this.Ut, n);
                e.path.X(o.key.path) ? o instanceof xt && Ie(e, o) && (s = s.Gt(o.key, o)) : r.done();
            })).next((() => s));
        }
        Cr(t) {
            return new Wi(this, !!t && t.Qr);
        }
        Or(t) {
            return this.getMetadata(t).next((t => t.byteSize));
        }
        getMetadata(t) {
            return ji(t).get(Qs.key).next((t => (C(!!t), t)));
        }
        Mr(t, e) {
            return ji(t).put(Qs.key, e);
        }
        /**
         * Decodes `remoteDoc` and returns the document (or null, if the document
         * corresponds to the format used for sentinel deletes).
         */    Fr(t) {
            if (t) {
                const e = ii(this.Ut, t);
                return e instanceof kt && e.version.isEqual(H$1.min()) ? null : e;
            }
            return null;
        }
    }

    /**
     * Creates a new IndexedDbRemoteDocumentCache.
     *
     * @param serializer - The document serializer.
     * @param indexManager - The query indexes that need to be maintained.
     */
    /**
     * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
     *
     * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
     * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
     * when we apply the changes.
     */
    class Wi extends yi {
        /**
         * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
         * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
         * `getNewDocumentChanges()`.
         */
        constructor(t, e) {
            super(), this.Wr = t, this.Qr = e, 
            // A map of document sizes prior to applying the changes in this buffer.
            this.jr = new gi((t => t.toString()), ((t, e) => t.isEqual(e)));
        }
        di(t) {
            const e = [];
            let n = 0, s = new ln(((t, e) => W$1(t.et(), e.et())));
            return this.ii.forEach(((i, r) => {
                const o = this.jr.get(i);
                if (r.ai) {
                    const c = ri(this.Wr.Ut, r.ai, this.oi(i));
                    s = s.add(i.path.G());
                    const u = vi(c);
                    n += u - o, e.push(this.Wr.ci(t, i, c));
                } else if (n -= o, this.Qr) {
                    // In order to track removals, we store a "sentinel delete" in the
                    // RemoteDocumentCache. This entry is represented by a NoDocument
                    // with a version of 0 and ignored by `maybeDecodeDocument()` but
                    // preserved in `getNewDocumentChanges()`.
                    const n = ri(this.Wr.Ut, new kt(i, H$1.min()), this.oi(i));
                    e.push(this.Wr.ci(t, i, n));
                } else e.push(this.Wr.hi(t, i));
            })), s.forEach((n => {
                e.push(this.Wr.wi.Bs(t, n));
            })), e.push(this.Wr.updateMetadata(t, n)), Is.Fn(e);
        }
        _i(t, e) {
            // Record the size of everything we load from the cache so we can compute a delta later.
            return this.Wr.$r(t, e).next((t => null === t ? (this.jr.set(e, 0), null) : (this.jr.set(e, t.size), 
            t.ai)));
        }
        fi(t, e) {
            // Record the size of everything we load from the cache so we can compute
            // a delta later.
            return this.Wr.Br(t, e).next((({qr: t, Ur: e}) => (
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `NullableMaybeDocumentMap` directly, without a conversion.
            e.forEach(((t, e) => {
                this.jr.set(t, e);
            })), t)));
        }
    }

    function ji(t) {
        return ti(t, Qs.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
     */ function Gi(t) {
        return ti(t, Ks.store);
    }

    function zi(t) {
        return t.path.tt();
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Performs database creation and schema upgrades. */ class Hi {
        constructor(t) {
            this.Ut = t;
        }
        /**
         * Performs database creation and schema upgrades.
         *
         * Note that in production, this method is only ever used to upgrade the schema
         * to SCHEMA_VERSION. Different values of toVersion are only used for testing
         * and local feature development.
         */    Hn(t, e, n, s) {
            C(n < s && n >= 0 && s <= 11);
            const i = new As("createOrUpgrade", e);
            n < 1 && s >= 1 && (function(t) {
                t.createObjectStore(Fs.store);
            }(t), function(t) {
                t.createObjectStore($s.store, {
                    keyPath: $s.keyPath
                });
                t.createObjectStore(Ls.store, {
                    keyPath: Ls.keyPath,
                    autoIncrement: !0
                }).createIndex(Ls.userMutationsIndex, Ls.userMutationsKeyPath, {
                    unique: !0
                }), t.createObjectStore(Bs.store);
            }
            /**
     * Upgrade function to migrate the 'mutations' store from V1 to V3. Loads
     * and rewrites all data.
     */ (t), Ji(t), function(t) {
                t.createObjectStore(Ks.store);
            }(t));
            // Migration 2 to populate the targetGlobal object no longer needed since
            // migration 3 unconditionally clears it.
                    let r = Is.resolve();
            return n < 3 && s >= 3 && (
            // Brand new clients don't need to drop and recreate--only clients that
            // potentially have corrupt data.
            0 !== n && (!function(t) {
                t.deleteObjectStore(js.store), t.deleteObjectStore(Ws.store), t.deleteObjectStore(Gs.store);
            }(t), Ji(t)), r = r.next((() => 
            /**
     * Creates the target global singleton row.
     *
     * @param txn - The version upgrade transaction for indexeddb
     */
            function(t) {
                const e = t.store(Gs.store), n = new Gs(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, H$1.min().q(), 
                /*targetCount=*/ 0);
                return e.put(Gs.key, n);
            }
            /**
     * Creates indices on the RemoteDocuments store used for both multi-tab
     * and Index-Free queries.
     */ (i)))), n < 4 && s >= 4 && (0 !== n && (
            // Schema version 3 uses auto-generated keys to generate globally unique
            // mutation batch IDs (this was previously ensured internally by the
            // client). To migrate to the new schema, we have to read all mutations
            // and write them back out. We preserve the existing batch IDs to guarantee
            // consistency with other object stores. Any further mutation batch IDs will
            // be auto-generated.
            r = r.next((() => function(t, e) {
                return e.store(Ls.store).ss().next((n => {
                    t.deleteObjectStore(Ls.store);
                    t.createObjectStore(Ls.store, {
                        keyPath: Ls.keyPath,
                        autoIncrement: !0
                    }).createIndex(Ls.userMutationsIndex, Ls.userMutationsKeyPath, {
                        unique: !0
                    });
                    const s = e.store(Ls.store), i = n.map((t => s.put(t)));
                    return Is.Fn(i);
                }));
            }(t, i)))), r = r.next((() => {
                !function(t) {
                    t.createObjectStore(Hs.store, {
                        keyPath: Hs.keyPath
                    });
                }(t);
            }))), n < 5 && s >= 5 && (r = r.next((() => this.Gr(i)))), n < 6 && s >= 6 && (r = r.next((() => (function(t) {
                t.createObjectStore(Qs.store);
            }(t), this.zr(i))))), n < 7 && s >= 7 && (r = r.next((() => this.Hr(i)))), n < 8 && s >= 8 && (r = r.next((() => this.Jr(t, i)))), 
            n < 9 && s >= 9 && (r = r.next((() => {
                // Multi-Tab used to manage its own changelog, but this has been moved
                // to the DbRemoteDocument object store itself. Since the previous change
                // log only contained transient data, we can drop its object store.
                !function(t) {
                    t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
                }(t), function(t) {
                    const e = t.objectStore(Ks.store);
                    e.createIndex(Ks.readTimeIndex, Ks.readTimeIndexPath, {
                        unique: !1
                    }), e.createIndex(Ks.collectionReadTimeIndex, Ks.collectionReadTimeIndexPath, {
                        unique: !1
                    });
                }(e);
            }))), n < 10 && s >= 10 && (r = r.next((() => this.Yr(i)))), n < 11 && s >= 11 && (r = r.next((() => {
                !function(t) {
                    t.createObjectStore(Js.store, {
                        keyPath: Js.keyPath
                    });
                }(t), function(t) {
                    t.createObjectStore(Ys.store, {
                        keyPath: Ys.keyPath
                    });
                }
                /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t);
            }))), r;
        }
        zr(t) {
            let e = 0;
            return t.store(Ks.store).us(((t, n) => {
                e += vi(n);
            })).next((() => {
                const n = new Qs(e);
                return t.store(Qs.store).put(Qs.key, n);
            }));
        }
        Gr(t) {
            const e = t.store($s.store), n = t.store(Ls.store);
            return e.ss().next((e => Is.forEach(e, (e => {
                const s = IDBKeyRange.bound([ e.userId, -1 ], [ e.userId, e.lastAcknowledgedBatchId ]);
                return n.ss(Ls.userMutationsIndex, s).next((n => Is.forEach(n, (n => {
                    C(n.userId === e.userId);
                    const s = hi(this.Ut, n);
                    return pi(t, e.userId, s).next((() => {}));
                }))));
            }))));
        }
        /**
         * Ensures that every document in the remote document cache has a corresponding sentinel row
         * with a sequence number. Missing rows are given the most recently used sequence number.
         */    Hr(t) {
            const e = t.store(js.store), n = t.store(Ks.store);
            return t.store(Gs.store).get(Gs.key).next((t => {
                const s = [];
                return n.us(((n, i) => {
                    const r = new Y$1(n), o = function(t) {
                        return [ 0, Ns(t) ];
                    }(r);
                    s.push(e.get(o).next((n => n ? Is.resolve() : (n => e.put(new js(0, Ns(n), t.highestListenSequenceNumber)))(r))));
                })).next((() => Is.Fn(s)));
            }));
        }
        Jr(t, e) {
            // Create the index.
            t.createObjectStore(zs.store, {
                keyPath: zs.keyPath
            });
            const n = e.store(zs.store), s = new Ii, i = t => {
                if (s.add(t)) {
                    const e = t.J(), s = t.G();
                    return n.put({
                        collectionId: e,
                        parent: Ns(s)
                    });
                }
            };
            // Helper to add an index entry iff we haven't already written it.
                    // Index existing remote documents.
            return e.store(Ks.store).us({
                cs: !0
            }, ((t, e) => {
                const n = new Y$1(t);
                return i(n.G());
            })).next((() => e.store(Bs.store).us({
                cs: !0
            }, (([t, e, n], s) => {
                const r = Os(e);
                return i(r.G());
            }))));
        }
        Yr(t) {
            const e = t.store(Ws.store);
            return e.us(((t, n) => {
                const s = li(n), i = _i(this.Ut, s);
                return e.put(i);
            }));
        }
    }

    function Ji(t) {
        t.createObjectStore(js.store, {
            keyPath: js.keyPath
        }).createIndex(js.documentTargetsIndex, js.documentTargetsKeyPath, {
            unique: !0
        });
        // NOTE: This is unique only because the TargetId is the suffix.
        t.createObjectStore(Ws.store, {
            keyPath: Ws.keyPath
        }).createIndex(Ws.queryTargetsIndexName, Ws.queryTargetsKeyPath, {
            unique: !0
        }), t.createObjectStore(Gs.store);
    }

    const Yi = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";

    /**
     * Oldest acceptable age in milliseconds for client metadata before the client
     * is considered inactive and its associated data is garbage collected.
     */
    /**
     * An IndexedDB-backed instance of Persistence. Data is stored persistently
     * across sessions.
     *
     * On Web only, the Firestore SDKs support shared access to its persistence
     * layer. This allows multiple browser tabs to read and write to IndexedDb and
     * to synchronize state even without network connectivity. Shared access is
     * currently optional and not enabled unless all clients invoke
     * `enablePersistence()` with `{synchronizeTabs:true}`.
     *
     * In multi-tab mode, if multiple clients are active at the same time, the SDK
     * will designate one client as the “primary client”. An effort is made to pick
     * a visible, network-connected and active client, and this client is
     * responsible for letting other clients know about its presence. The primary
     * client writes a unique client-generated identifier (the client ID) to
     * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
     * update this entry, another client can acquire the lease and take over as
     * primary.
     *
     * Some persistence operations in the SDK are designated as primary-client only
     * operations. This includes the acknowledgment of mutations and all updates of
     * remote documents. The effects of these operations are written to persistence
     * and then broadcast to other tabs via LocalStorage (see
     * `WebStorageSharedClientState`), which then refresh their state from
     * persistence.
     *
     * Similarly, the primary client listens to notifications sent by secondary
     * clients to discover persistence changes written by secondary clients, such as
     * the addition of new mutations and query targets.
     *
     * If multi-tab is not enabled and another tab already obtained the primary
     * lease, IndexedDbPersistence enters a failed state and all subsequent
     * operations will automatically fail.
     *
     * Additionally, there is an optimization so that when a tab is closed, the
     * primary lease is released immediately (this is especially important to make
     * sure that a refreshed tab is able to immediately re-acquire the primary
     * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
     * since it is an asynchronous API. So in addition to attempting to give up the
     * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
     * LocalStorage which acts as an indicator that another tab should go ahead and
     * take the primary lease immediately regardless of the current lease timestamp.
     *
     * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
     * longer optional.
     */
    class Xi {
        constructor(
        /**
         * Whether to synchronize the in-memory state of multiple tabs and share
         * access to local persistence.
         */
        t, e, n, s, i, r, o, c, u, 
        /**
         * If set to true, forcefully obtains database access. Existing tabs will
         * no longer be able to access IndexedDB.
         */
        a) {
            if (this.allowTabSynchronization = t, this.persistenceKey = e, this.clientId = n, 
            this.Xr = i, this.window = r, this.document = o, this.Zr = u, this.eo = a, this.no = null, 
            this.so = !1, this.isPrimary = !1, this.networkEnabled = !0, 
            /** Our window.unload handler, if registered. */
            this.io = null, this.inForeground = !1, 
            /** Our 'visibilitychange' listener if registered. */
            this.ro = null, 
            /** The client metadata refresh task. */
            this.oo = null, 
            /** The last time we garbage collected the client metadata object store. */
            this.co = Number.NEGATIVE_INFINITY, 
            /** A listener to notify on primary state changes. */
            this.uo = t => Promise.resolve(), !Xi.Kn()) throw new k$1(x$1.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
            this.Ei = new Ui(this, s), this.ao = e + "main", this.Ut = new si(c), this.ho = new ms(this.ao, 11, new Hi(this.Ut)), 
            this.lo = new ki(this.Ei, this.Ut), this.wi = new Ai, this._o = function(t, e) {
                return new Qi(t, e);
            }
            /**
     * Returns the set of documents that have changed since the specified read
     * time.
     */
            // PORTING NOTE: This is only used for multi-tab synchronization.
            (this.Ut, this.wi), this.fo = new di, this.window && this.window.localStorage ? this.wo = this.window.localStorage : (this.wo = null, 
            !1 === a && v$1("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
        }
        /**
         * Attempt to start IndexedDb persistence.
         *
         * @returns Whether persistence was enabled.
         */    start() {
            // NOTE: This is expected to fail sometimes (in the case of another tab
            // already having the persistence lock), so it's the first thing we should
            // do.
            return this.Eo().then((() => {
                if (!this.isPrimary && !this.allowTabSynchronization) 
                // Fail `start()` if `synchronizeTabs` is disabled and we cannot
                // obtain the primary lease.
                throw new k$1(x$1.FAILED_PRECONDITION, Yi);
                return this.To(), this.Io(), this.Ao(), this.runTransaction("getHighestListenSequenceNumber", "readonly", (t => this.lo.Ki(t)));
            })).then((t => {
                this.no = new U$1(t, this.Zr);
            })).then((() => {
                this.so = !0;
            })).catch((t => (this.ho && this.ho.close(), Promise.reject(t))));
        }
        /**
         * Registers a listener that gets called when the primary state of the
         * instance changes. Upon registering, this listener is invoked immediately
         * with the current primary state.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    mo(t) {
            return this.uo = async e => {
                if (this.wr) return t(e);
            }, t(this.isPrimary);
        }
        /**
         * Registers a listener that gets called when the database receives a
         * version change event indicating that it has deleted.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    Ro(t) {
            this.ho.Yn((async e => {
                // Check if an attempt is made to delete IndexedDB.
                null === e.newVersion && await t();
            }));
        }
        /**
         * Adjusts the current network state in the client's metadata, potentially
         * affecting the primary lease.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    Po(t) {
            this.networkEnabled !== t && (this.networkEnabled = t, 
            // Schedule a primary lease refresh for immediate execution. The eventual
            // lease update will be propagated via `primaryStateListener`.
            this.Xr.Rs((async () => {
                this.wr && await this.Eo();
            })));
        }
        /**
         * Updates the client metadata in IndexedDb and attempts to either obtain or
         * extend the primary lease for the local client. Asynchronously notifies the
         * primary state listener if the client either newly obtained or released its
         * primary lease.
         */    Eo() {
            return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (t => tr(t).put(new Hs(this.clientId, Date.now(), this.networkEnabled, this.inForeground)).next((() => {
                if (this.isPrimary) return this.Vo(t).next((t => {
                    t || (this.isPrimary = !1, this.Xr.yo((() => this.uo(!1))));
                }));
            })).next((() => this.po(t))).next((e => this.isPrimary && !e ? this.vo(t).next((() => !1)) : !!e && this.bo(t).next((() => !0)))))).catch((t => {
                if (Vs(t)) 
                // Proceed with the existing state. Any subsequent access to
                // IndexedDB will verify the lease.
                return p$1("IndexedDbPersistence", "Failed to extend owner lease: ", t), this.isPrimary;
                if (!this.allowTabSynchronization) throw t;
                return p$1("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", t), 
                /* isPrimary= */ !1;
            })).then((t => {
                this.isPrimary !== t && this.Xr.yo((() => this.uo(t))), this.isPrimary = t;
            }));
        }
        Vo(t) {
            return Zi(t).get(Fs.key).next((t => Is.resolve(this.So(t))));
        }
        Do(t) {
            return tr(t).delete(this.clientId);
        }
        /**
         * If the garbage collection threshold has passed, prunes the
         * RemoteDocumentChanges and the ClientMetadata store based on the last update
         * time of all clients.
         */    async Co() {
            if (this.isPrimary && !this.No(this.co, 18e5)) {
                this.co = Date.now();
                const t = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (t => {
                    const e = ti(t, Hs.store);
                    return e.ss().next((t => {
                        const n = this.xo(t, 18e5), s = t.filter((t => -1 === n.indexOf(t)));
                        // Delete metadata for clients that are no longer considered active.
                        return Is.forEach(s, (t => e.delete(t.clientId))).next((() => s));
                    }));
                })).catch((() => []));
                // Delete potential leftover entries that may continue to mark the
                // inactive clients as zombied in LocalStorage.
                // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                // the client atomically, but we can't. So we opt to delete the IndexedDb
                // entries first to avoid potentially reviving a zombied client.
                            if (this.wo) for (const e of t) this.wo.removeItem(this.ko(e.clientId));
            }
        }
        /**
         * Schedules a recurring timer to update the client metadata and to either
         * extend or acquire the primary lease if the client is eligible.
         */    Ao() {
            this.oo = this.Xr.Er("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (() => this.Eo().then((() => this.Co())).then((() => this.Ao()))));
        }
        /** Checks whether `client` is the local client. */    So(t) {
            return !!t && t.ownerId === this.clientId;
        }
        /**
         * Evaluate the state of all active clients and determine whether the local
         * client is or can act as the holder of the primary lease. Returns whether
         * the client is eligible for the lease, but does not actually acquire it.
         * May return 'false' even if there is no active leaseholder and another
         * (foreground) client should become leaseholder instead.
         */    po(t) {
            if (this.eo) return Is.resolve(!0);
            return Zi(t).get(Fs.key).next((e => {
                // A client is eligible for the primary lease if:
                // - its network is enabled and the client's tab is in the foreground.
                // - its network is enabled and no other client's tab is in the
                //   foreground.
                // - every clients network is disabled and the client's tab is in the
                //   foreground.
                // - every clients network is disabled and no other client's tab is in
                //   the foreground.
                // - the `forceOwningTab` setting was passed in.
                if (null !== e && this.No(e.leaseTimestampMs, 5e3) && !this.Oo(e.ownerId)) {
                    if (this.So(e) && this.networkEnabled) return !0;
                    if (!this.So(e)) {
                        if (!e.allowTabSynchronization) 
                        // Fail the `canActAsPrimary` check if the current leaseholder has
                        // not opted into multi-tab synchronization. If this happens at
                        // client startup, we reject the Promise returned by
                        // `enablePersistence()` and the user can continue to use Firestore
                        // with in-memory persistence.
                        // If this fails during a lease refresh, we will instead block the
                        // AsyncQueue from executing further operations. Note that this is
                        // acceptable since mixing & matching different `synchronizeTabs`
                        // settings is not supported.
                        // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                        // no longer be turned off.
                        throw new k$1(x$1.FAILED_PRECONDITION, Yi);
                        return !1;
                    }
                }
                return !(!this.networkEnabled || !this.inForeground) || tr(t).ss().next((t => void 0 === this.xo(t, 5e3).find((t => {
                    if (this.clientId !== t.clientId) {
                        const e = !this.networkEnabled && t.networkEnabled, n = !this.inForeground && t.inForeground, s = this.networkEnabled === t.networkEnabled;
                        if (e || n && s) return !0;
                    }
                    return !1;
                }))));
            })).next((t => (this.isPrimary !== t && p$1("IndexedDbPersistence", `Client ${t ? "is" : "is not"} eligible for a primary lease.`), 
            t)));
        }
        async Mo() {
            // The shutdown() operations are idempotent and can be called even when
            // start() aborted (e.g. because it couldn't acquire the persistence lease).
            this.so = !1, this.Fo(), this.oo && (this.oo.cancel(), this.oo = null), this.$o(), 
            this.Lo(), 
            // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
            // has obtained the primary lease.
            await this.ho.runTransaction("shutdown", "readwrite", [ Fs.store, Hs.store ], (t => {
                const e = new Zs(t, U$1.O);
                return this.vo(e).next((() => this.Do(e)));
            })), this.ho.close(), 
            // Remove the entry marking the client as zombied from LocalStorage since
            // we successfully deleted its metadata from IndexedDb.
            this.Bo();
        }
        /**
         * Returns clients that are not zombied and have an updateTime within the
         * provided threshold.
         */    xo(t, e) {
            return t.filter((t => this.No(t.updateTimeMs, e) && !this.Oo(t.clientId)));
        }
        /**
         * Returns the IDs of the clients that are currently active. If multi-tab
         * is not supported, returns an array that only contains the local client's
         * ID.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    qo() {
            return this.runTransaction("getActiveClients", "readonly", (t => tr(t).ss().next((t => this.xo(t, 18e5).map((t => t.clientId))))));
        }
        get wr() {
            return this.so;
        }
        Uo(t) {
            return bi.Ii(t, this.Ut, this.wi, this.Ei);
        }
        br() {
            return this.lo;
        }
        Nr() {
            return this._o;
        }
        Ko() {
            return this.wi;
        }
        Qo() {
            return this.fo;
        }
        runTransaction(t, e, n) {
            p$1("IndexedDbPersistence", "Starting transaction:", t);
            const s = "readonly" === e ? "readonly" : "readwrite";
            let i;
            // Do all transactions as readwrite against all object stores, since we
            // are the only reader/writer.
                    return this.ho.runTransaction(t, s, Xs, (s => (i = new Zs(s, this.no ? this.no.next() : U$1.O), 
            "readwrite-primary" === e ? this.Vo(i).next((t => !!t || this.po(i))).next((e => {
                if (!e) throw v$1(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, 
                this.Xr.yo((() => this.uo(!1))), new k$1(x$1.FAILED_PRECONDITION, Ds);
                return n(i);
            })).next((t => this.bo(i).next((() => t)))) : this.Wo(i).next((() => n(i)))))).then((t => (i.gs(), 
            t)));
        }
        /**
         * Verifies that the current tab is the primary leaseholder or alternatively
         * that the leaseholder has opted into multi-tab synchronization.
         */
        // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
        // be turned off.
        Wo(t) {
            return Zi(t).get(Fs.key).next((t => {
                if (null !== t && this.No(t.leaseTimestampMs, 5e3) && !this.Oo(t.ownerId) && !this.So(t) && !(this.eo || this.allowTabSynchronization && t.allowTabSynchronization)) throw new k$1(x$1.FAILED_PRECONDITION, Yi);
            }));
        }
        /**
         * Obtains or extends the new primary lease for the local client. This
         * method does not verify that the client is eligible for this lease.
         */    bo(t) {
            const e = new Fs(this.clientId, this.allowTabSynchronization, Date.now());
            return Zi(t).put(Fs.key, e);
        }
        static Kn() {
            return ms.Kn();
        }
        /** Checks the primary lease and removes it if we are the current primary. */    vo(t) {
            const e = Zi(t);
            return e.get(Fs.key).next((t => this.So(t) ? (p$1("IndexedDbPersistence", "Releasing primary lease."), 
            e.delete(Fs.key)) : Is.resolve()));
        }
        /** Verifies that `updateTimeMs` is within `maxAgeMs`. */    No(t, e) {
            const n = Date.now();
            return !(t < n - e) && (!(t > n) || (v$1(`Detected an update time that is in the future: ${t} > ${n}`), 
            !1));
        }
        To() {
            null !== this.document && "function" == typeof this.document.addEventListener && (this.ro = () => {
                this.Xr.Rs((() => (this.inForeground = "visible" === this.document.visibilityState, 
                this.Eo())));
            }, this.document.addEventListener("visibilitychange", this.ro), this.inForeground = "visible" === this.document.visibilityState);
        }
        $o() {
            this.ro && (this.document.removeEventListener("visibilitychange", this.ro), this.ro = null);
        }
        /**
         * Attaches a window.unload handler that will synchronously write our
         * clientId to a "zombie client id" location in LocalStorage. This can be used
         * by tabs trying to acquire the primary lease to determine that the lease
         * is no longer valid even if the timestamp is recent. This is particularly
         * important for the refresh case (so the tab correctly re-acquires the
         * primary lease). LocalStorage is used for this rather than IndexedDb because
         * it is a synchronous API and so can be used reliably from  an unload
         * handler.
         */    Io() {
            var t;
            "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.io = () => {
                // Note: In theory, this should be scheduled on the AsyncQueue since it
                // accesses internal state. We execute this code directly during shutdown
                // to make sure it gets a chance to run.
                this.Fo(), this.Xr.Rs((() => this.Mo()));
            }, this.window.addEventListener("unload", this.io));
        }
        Lo() {
            this.io && (this.window.removeEventListener("unload", this.io), this.io = null);
        }
        /**
         * Returns whether a client is "zombied" based on its LocalStorage entry.
         * Clients become zombied when their tab closes without running all of the
         * cleanup logic in `shutdown()`.
         */    Oo(t) {
            var e;
            try {
                const n = null !== (null === (e = this.wo) || void 0 === e ? void 0 : e.getItem(this.ko(t)));
                return p$1("IndexedDbPersistence", `Client '${t}' ${n ? "is" : "is not"} zombied in LocalStorage`), 
                n;
            } catch (t) {
                // Gracefully handle if LocalStorage isn't working.
                return v$1("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
            }
        }
        /**
         * Record client as zombied (a client that had its tab closed). Zombied
         * clients are ignored during primary tab selection.
         */    Fo() {
            if (this.wo) try {
                this.wo.setItem(this.ko(this.clientId), String(Date.now()));
            } catch (t) {
                // Gracefully handle if LocalStorage isn't available / working.
                v$1("Failed to set zombie client id.", t);
            }
        }
        /** Removes the zombied client entry if it exists. */    Bo() {
            if (this.wo) try {
                this.wo.removeItem(this.ko(this.clientId));
            } catch (t) {
                // Ignore
            }
        }
        ko(t) {
            return `firestore_zombie_${this.persistenceKey}_${t}`;
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the primary client object store.
     */ function Zi(t) {
        return ti(t, Fs.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the client metadata object store.
     */ function tr(t) {
        return ti(t, Hs.store);
    }

    /**
     * Generates a string used as a prefix when storing data in IndexedDB and
     * LocalStorage.
     */ function er(t, e) {
        // Use two different prefix formats:
        //   * firestore / persistenceKey / projectID . databaseID / ...
        //   * firestore / persistenceKey / projectID / ...
        // projectIDs are DNS-compatible names and cannot contain dots
        // so there's no danger of collisions.
        let n = t.projectId;
        return t.S || (n += "." + t.database), "firestore/" + e + "/" + n + "/";
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A readonly view of the local state of all documents we're tracking (i.e. we
     * have a cached version in remoteDocumentCache or local mutations for the
     * document). The view is computed by applying the mutations in the
     * MutationQueue to the RemoteDocumentCache.
     */
    class nr {
        constructor(t, e, n) {
            this._o = t, this.jo = e, this.wi = n;
        }
        /**
         * Get the local view of the document identified by `key`.
         *
         * @returns Local view of the document or null if we don't have any cached
         * state for it.
         */    Go(t, e) {
            return this.jo.pi(t, e).next((n => this.zo(t, e, n)));
        }
        /** Internal version of `getDocument` that allows reusing batches. */    zo(t, e, n) {
            return this._o.li(t, e).next((t => {
                for (const s of n) t = s.Ds(e, t);
                return t;
            }));
        }
        // Returns the view of the given `docs` as they would appear after applying
        // all mutations in the given `batches`.
        Ho(t, e, n) {
            let s = wn();
            return e.forEach(((t, e) => {
                for (const s of n) e = s.Ds(t, e);
                s = s.Gt(t, e);
            })), s;
        }
        /**
         * Gets the local view of the documents identified by `keys`.
         *
         * If we don't have cached state for a document in `keys`, a NoDocument will
         * be stored for that key in the resulting set.
         */    Jo(t, e) {
            return this._o.getEntries(t, e).next((e => this.Yo(t, e)));
        }
        /**
         * Similar to `getDocuments`, but creates the local view from the given
         * `baseDocs` without retrieving documents from the local store.
         */    Yo(t, e) {
            return this.jo.vi(t, e).next((n => {
                const s = this.Ho(t, e, n);
                let i = dn();
                return s.forEach(((t, e) => {
                    // TODO(http://b/32275378): Don't conflate missing / deleted.
                    e || (e = new kt(t, H$1.min())), i = i.Gt(t, e);
                })), i;
            }));
        }
        /**
         * Performs a query against the local view of all documents.
         *
         * @param transaction - The persistence transaction.
         * @param query - The query to match documents against.
         * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
         *     documents that have been read since this snapshot version (exclusive).
         */    Kr(t, e, n) {
            /**
     * Returns whether the query matches a single document by path (rather than a
     * collection).
     */
            return function(t) {
                return tt.lt(t.path) && null === t.collectionGroup && 0 === t.filters.length;
            }(e) ? this.Xo(t, e.path) : le(e) ? this.Zo(t, e, n) : this.tc(t, e, n);
        }
        Xo(t, e) {
            // Just do a simple document lookup.
            return this.Go(t, new tt(e)).next((t => {
                let e = Tn();
                return t instanceof xt && (e = e.Gt(t.key, t)), e;
            }));
        }
        Zo(t, e, n) {
            const s = e.collectionGroup;
            let i = Tn();
            return this.wi.qs(t, s).next((r => Is.forEach(r, (r => {
                const o = function(t, e) {
                    return new ie(e, 
                    /*collectionGroup=*/ null, t.Ct.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
                }
                /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */ (e, r.child(s));
                return this.tc(t, o, n).next((t => {
                    t.forEach(((t, e) => {
                        i = i.Gt(t, e);
                    }));
                }));
            })).next((() => i))));
        }
        tc(t, e, n) {
            // Query the remote documents and overlay mutations.
            let s, i;
            return this._o.Kr(t, e, n).next((n => (s = n, this.jo.Si(t, e)))).next((e => (i = e, 
            this.ec(t, i, s).next((t => {
                s = t;
                for (const t of i) for (const e of t.mutations) {
                    const n = e.key, i = s.get(n), r = Qe(e, i, i, t.vs);
                    s = r instanceof xt ? s.Gt(n, r) : s.remove(n);
                }
            }))))).next((() => (
            // Finally, filter out any documents that don't actually match
            // the query.
            s.forEach(((t, n) => {
                Ie(e, n) || (s = s.remove(t));
            })), s)));
        }
        ec(t, e, n) {
            let s = mn();
            for (const t of e) for (const e of t.mutations) e instanceof He && null === n.get(e.key) && (s = s.add(e.key));
            let i = n;
            return this._o.getEntries(t, s).next((t => (t.forEach(((t, e) => {
                null !== e && e instanceof xt && (i = i.Gt(t, e));
            })), i)));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A set of changes to what documents are currently in view and out of view for
     * a given query. These changes are sent to the LocalStore by the View (via
     * the SyncEngine) and are used to pin / unpin documents as appropriate.
     */ class sr {
        constructor(t, e, n, s) {
            this.targetId = t, this.fromCache = e, this.nc = n, this.sc = s;
        }
        static ic(t, e) {
            let n = mn(), s = mn();
            for (const t of e.docChanges) switch (t.type) {
              case 0 /* Added */ :
                n = n.add(t.doc.key);
                break;

              case 1 /* Removed */ :
                s = s.add(t.doc.key);
     // do nothing
                    }
            return new sr(t, e.fromCache, n, s);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A query engine that takes advantage of the target document mapping in the
     * QueryCache. Query execution is optimized by only reading the documents that
     * previously matched a query plus any documents that were edited after the
     * query was last listened to.
     *
     * There are some cases when this optimization is not guaranteed to produce
     * the same results as full collection scans. In these cases, query
     * processing falls back to full scans. These cases are:
     *
     * - Limit queries where a document that matched the query previously no longer
     *   matches the query.
     *
     * - Limit queries where a document edit may cause the document to sort below
     *   another document that is in the local cache.
     *
     * - Queries that have never been CURRENT or free of limbo documents.
     */ class ir {
        /** Sets the document view to query against. */
        rc(t) {
            this.oc = t;
        }
        /** Returns all local documents matching the specified query. */    Kr(t, e, n, s) {
            // Queries that match all documents don't benefit from using
            // key-based lookups. It is more efficient to scan all documents in a
            // collection, rather than to perform individual lookups.
            return function(t) {
                return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.Ct.length || 1 === t.Ct.length && t.Ct[0].field.rt());
            }(e) || n.isEqual(H$1.min()) ? this.cc(t, e) : this.oc.Jo(t, s).next((i => {
                const r = this.uc(e, i);
                return (ce(e) || ue(e)) && this.ac(e.limitType, r, s, n) ? this.cc(t, e) : (g() <= LogLevel.DEBUG && p$1("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), Te(e)), 
                this.oc.Kr(t, e, n).next((t => (
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                r.forEach((e => {
                    t = t.Gt(e.key, e);
                })), t))));
            }));
            // Queries that have never seen a snapshot without limbo free documents
            // should also be run as a full collection scan.
            }
        /** Applies the query filter and sorting to the provided documents.  */    uc(t, e) {
            // Sort the documents and re-apply the query filter since previously
            // matching documents do not necessarily still match the query.
            let n = new ln(Ae(t));
            return e.forEach(((e, s) => {
                s instanceof xt && Ie(t, s) && (n = n.add(s));
            })), n;
        }
        /**
         * Determines if a limit query needs to be refilled from cache, making it
         * ineligible for index-free execution.
         *
         * @param sortedPreviousResults - The documents that matched the query when it
         * was last synchronized, sorted by the query's comparator.
         * @param remoteKeys - The document keys that matched the query at the last
         * snapshot.
         * @param limboFreeSnapshotVersion - The version of the snapshot when the
         * query was last synchronized.
         */    ac(t, e, n, s) {
            // The query needs to be refilled if a previously matching document no
            // longer matches.
            if (n.size !== e.size) return !0;
            // Limit queries are not eligible for index-free query execution if there is
            // a potential that an older document from cache now sorts before a document
            // that was previously part of the limit. This, however, can only happen if
            // the document at the edge of the limit goes out of limit.
            // If a document that is not the limit boundary sorts differently,
            // the boundary of the limit itself did not change and documents from cache
            // will continue to be "rejected" by this boundary. Therefore, we can ignore
            // any modifications that don't affect the last document.
                    const i = "F" /* First */ === t ? e.last() : e.first();
            return !!i && (i.hasPendingWrites || i.version.L(s) > 0);
        }
        cc(t, e) {
            return g() <= LogLevel.DEBUG && p$1("QueryEngine", "Using full collection scan to execute query:", Te(e)), 
            this.oc.Kr(t, e, H$1.min());
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Implements `LocalStore` interface.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */
    class rr {
        constructor(
        /** Manages our in-memory or durable persistence. */
        t, e, n, s) {
            this.persistence = t, this.hc = e, this.Ut = s, 
            /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
            this.lc = new un(W$1), 
            /** Maps a target to its targetID. */
            // TODO(wuandy): Evaluate if TargetId can be part of Target.
            this._c = new gi((t => $t(t)), Bt), 
            /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
            this.fc = H$1.min(), this.jo = t.Uo(n), this.dc = t.Nr(), this.lo = t.br(), this.wc = new nr(this.dc, this.jo, this.persistence.Ko()), 
            this.fo = t.Qo(), this.hc.rc(this.wc);
        }
        Tr(t) {
            return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e => t.gr(e, this.lc)));
        }
    }

    function or(
    /** Manages our in-memory or durable persistence. */
    t, e, n, s) {
        return new rr(t, e, n, s);
    }

    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    async function cr(t, e) {
        const n = N$1(t);
        let s = n.jo, i = n.wc;
        const r = await n.persistence.runTransaction("Handle user change", "readonly", (t => {
            // Swap out the mutation queue, grabbing the pending mutation batches
            // before and after.
            let r;
            return n.jo.yi(t).next((o => (r = o, s = n.persistence.Uo(e), 
            // Recreate our LocalDocumentsView using the new
            // MutationQueue.
            i = new nr(n.dc, s, n.persistence.Ko()), s.yi(t)))).next((e => {
                const n = [], s = [];
                // Union the old/new changed keys.
                let o = mn();
                for (const t of r) {
                    n.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                for (const t of e) {
                    s.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                // Return the set of all (potentially) changed documents and the list
                // of mutation batch IDs that were affected by change.
                            return i.Jo(t, o).next((t => ({
                    Ec: t,
                    Tc: n,
                    Ic: s
                })));
            }));
        }));
        return n.jo = s, n.wc = i, n.hc.rc(n.wc), r;
    }

    /* Accepts locally generated Mutations and commit them to storage. */
    /**
     * Acknowledges the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    function ur(t, e) {
        const n = N$1(t);
        return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t => {
            const s = e.batch.keys(), i = n.dc.Cr({
                Qr: !0
            });
            return function(t, e, n, s) {
                const i = n.batch, r = i.keys();
                let o = Is.resolve();
                return r.forEach((t => {
                    o = o.next((() => s.li(e, t))).next((e => {
                        let r = e;
                        const o = n.xs.get(t);
                        C(null !== o), (!r || r.version.L(o) < 0) && (r = i.bs(t, r, n), r && 
                        // We use the commitVersion as the readTime rather than the
                        // document's updateTime since the updateTime is not advanced
                        // for updates that do not modify the underlying document.
                        s.ci(r, n.Ns));
                    }));
                })), o.next((() => t.jo.Di(e, i)));
            }
            /** Returns the local view of the documents affected by a mutation batch. */
            // PORTING NOTE: Multi-Tab only.
            (n, t, e, i).next((() => i.apply(t))).next((() => n.jo.xi(t))).next((() => n.wc.Jo(t, s)));
        }));
    }

    /**
     * Removes mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    function ar(t) {
        const e = N$1(t);
        return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t => e.lo.Ui(t)));
    }

    /**
     * Updates the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */ function hr(t, e) {
        const n = N$1(t), s = e.Ot;
        let i = n.lc;
        return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t => {
            const r = n.dc.Cr({
                Qr: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                    i = n.lc;
            const o = [];
            e.xe.forEach(((e, r) => {
                const c = i.get(r);
                if (!c) return;
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                            o.push(n.lo.nr(t, e.Ue, r).next((() => n.lo.tr(t, e.Be, r))));
                const u = e.resumeToken;
                // Update the resume token if the change includes one.
                            if (u.wt() > 0) {
                    const a = c.Ft(u, s).Mt(t.ps);
                    i = i.Gt(r, a), 
                    // Update the target data if there are target changes (or if
                    // sufficient time has passed since the last update).
                    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                    function(t, e, n) {
                        // Always persist target data if we don't already have a resume token.
                        if (C(e.resumeToken.wt() > 0), 0 === t.resumeToken.wt()) return !0;
                        // Don't allow resume token changes to be buffered indefinitely. This
                        // allows us to be reasonably up-to-date after a crash and avoids needing
                        // to loop over all active queries on shutdown. Especially in the browser
                        // we may not get time to do anything interesting while the current tab is
                        // closing.
                                            if (e.Ot.B() - t.Ot.B() >= 3e8) return !0;
                        // Otherwise if the only thing that has changed about a target is its resume
                        // token it's not worth persisting. Note that the RemoteStore keeps an
                        // in-memory view of the currently active targets which includes the current
                        // resume token, so stream failure or user changes will still use an
                        // up-to-date resume token regardless of what we do here.
                                            return n.Be.size + n.qe.size + n.Ue.size > 0;
                    }
                    /**
     * Notifies local store of the changed views to locally pin documents.
     */ (c, a, e) && o.push(n.lo.zi(t, a));
                }
            }));
            let c = dn();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
            if (e.Oe.forEach(((s, i) => {
                e.Me.has(s) && o.push(n.persistence.Ei.kr(t, s));
            })), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            o.push(
            /**
     * Populates document change buffer with documents from backend or a bundle.
     * Returns the document changes resulting from applying those documents.
     *
     * @param txn - Transaction to use to read existing documents from storage.
     * @param documentBuffer - Document buffer to collect the resulted changes to be
     *        applied to storage.
     * @param documents - Documents to be applied.
     * @param globalVersion - A `SnapshotVersion` representing the read time if all
     *        documents have the same read time.
     * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
     *        have their own read time.
     *
     * Note: this function will use `documentVersions` if it is defined;
     * when it is not defined, resorts to `globalVersion`.
     */
            function(t, e, n, s, 
            // TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
            // this parameter.
            i) {
                let r = mn();
                return n.forEach((t => r = r.add(t))), e.getEntries(t, r).next((t => {
                    let r = dn();
                    return n.forEach(((n, o) => {
                        const c = t.get(n), u = (null == i ? void 0 : i.get(n)) || s;
                        // Note: The order of the steps below is important, since we want
                        // to ensure that rejected limbo resolutions (which fabricate
                        // NoDocuments with SnapshotVersion.min()) never add documents to
                        // cache.
                        o instanceof kt && o.version.isEqual(H$1.min()) ? (
                        // NoDocuments with SnapshotVersion.min() are used in manufactured
                        // events. We remove these documents from cache since we lost
                        // access.
                        e.hi(n, u), r = r.Gt(n, o)) : null == c || o.version.L(c.version) > 0 || 0 === o.version.L(c.version) && c.hasPendingWrites ? (e.ci(o, u), 
                        r = r.Gt(n, o)) : p$1("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", c.version, " Watch version:", o.version);
                    })), r;
                }));
            }(t, r, e.Oe, s, void 0).next((t => {
                c = t;
            }))), !s.isEqual(H$1.min())) {
                const e = n.lo.Ui(t).next((e => n.lo.Qi(t, t.ps, s)));
                o.push(e);
            }
            return Is.Fn(o).next((() => r.apply(t))).next((() => n.wc.Yo(t, c)));
        })).then((t => (n.lc = i, t)));
    }

    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId - If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    function lr(t, e) {
        const n = N$1(t);
        return n.persistence.runTransaction("Get next mutation batch", "readonly", (t => (void 0 === e && (e = -1), 
        n.jo.Vi(t, e))));
    }

    /**
     * Reads the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */
    function _r(t, e) {
        const n = N$1(t);
        return n.persistence.runTransaction("Allocate target", "readwrite", (t => {
            let s;
            return n.lo.Zi(t, e).next((i => i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            s = i, Is.resolve(s)) : n.lo.Li(t).next((i => (s = new Re(e, i, 0 /* Listen */ , t.ps), 
            n.lo.Wi(t, s).next((() => s)))))));
        })).then((t => {
            // If Multi-Tab is enabled, the existing target data may be newer than
            // the in-memory data
            const s = n.lc.get(t.targetId);
            return (null === s || t.Ot.L(s.Ot) > 0) && (n.lc = n.lc.Gt(t.targetId, t), n._c.set(e, t.targetId)), 
            t;
        }));
    }

    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    /**
     * Unpins all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    async function fr(t, e, n) {
        const s = N$1(t), i = s.lc.get(e), r = n ? "readwrite" : "readwrite-primary";
        try {
            n || await s.persistence.runTransaction("Release target", r, (t => s.persistence.Ei.removeTarget(t, i)));
        } catch (t) {
            if (!Vs(t)) throw t;
            // All `releaseTarget` does is record the final metadata state for the
            // target, but we've been recording this periodically during target
            // activity. If we lose this write this could cause a very slight
            // difference in the order of target deletion during GC, but we
            // don't define exact LRU semantics so this is acceptable.
            p$1("LocalStore", `Failed to update sequence numbers for target ${e}: ${t}`);
        }
        s.lc = s.lc.remove(e), s._c.delete(i.target);
    }

    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults - Whether results from previous executions can
     * be used to optimize this query execution.
     */ function dr(t, e, n) {
        const s = N$1(t);
        let i = H$1.min(), r = mn();
        return s.persistence.runTransaction("Execute query", "readonly", (t => function(t, e, n) {
            const s = N$1(t), i = s._c.get(n);
            return void 0 !== i ? Is.resolve(s.lc.get(i)) : s.lo.Zi(e, n);
        }(s, t, fe(e)).next((e => {
            if (e) return i = e.lastLimboFreeSnapshotVersion, s.lo.ir(t, e.targetId).next((t => {
                r = t;
            }));
        })).next((() => s.hc.Kr(t, e, n ? i : H$1.min(), n ? r : mn()))).next((t => ({
            documents: t,
            Ac: r
        })))));
    }

    // PORTING NOTE: Multi-Tab only.
    function wr(t, e) {
        const n = N$1(t), s = N$1(n.lo), i = n.lc.get(e);
        return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (t => s.bn(t, e).next((t => t ? t.target : null))));
    }

    /**
     * Returns the set of documents that have been updated since the last call.
     * If this is the first call, returns the set of changes since client
     * initialization. Further invocations will return document that have changed
     * since the prior call.
     */
    // PORTING NOTE: Multi-Tab only.
    function Er(t) {
        const e = N$1(t);
        return e.persistence.runTransaction("Get new document changes", "readonly", (t => function(t, e, n) {
            const s = N$1(t);
            let i = dn(), r = oi(n);
            const o = Gi(e), c = IDBKeyRange.lowerBound(r, !0);
            return o.us({
                index: Ks.readTimeIndex,
                range: c
            }, ((t, e) => {
                // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
                // the documents directly since we want to keep sentinel deletes.
                const n = ii(s.Ut, e);
                i = i.Gt(n.key, n), r = e.readTime;
            })).next((() => ({
                mc: i,
                readTime: ci(r)
            })));
        }
        /**
     * Returns the read time of the most recently read document in the cache, or
     * SnapshotVersion.min() if not available.
     */
        // PORTING NOTE: This is only used for multi-tab synchronization.
        (e.dc, t, e.fc))).then((({mc: t, readTime: n}) => (e.fc = n, t)));
    }

    /**
     * Reads the newest document change from persistence and moves the internal
     * synchronization marker forward so that calls to `getNewDocumentChanges()`
     * only return changes that happened after client initialization.
     */
    // PORTING NOTE: Multi-Tab only.
    async function Tr(t) {
        const e = N$1(t);
        return e.persistence.runTransaction("Synchronize last document change read time", "readonly", (t => function(t) {
            const e = Gi(t);
            // If there are no existing entries, we return SnapshotVersion.min().
                    let n = H$1.min();
            return e.us({
                index: Ks.readTimeIndex,
                reverse: !0
            }, ((t, e, s) => {
                e.readTime && (n = ci(e.readTime)), s.done();
            })).next((() => n));
        }(t))).then((t => {
            e.fc = t;
        }));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Ir {
        constructor(t) {
            this.Ut = t, this.Rc = new Map, this.Pc = new Map;
        }
        Os(t, e) {
            return Is.resolve(this.Rc.get(e));
        }
        Ms(t, e) {
            /** Encodes a BundleMetadata proto object to a Bundle model object. */
            var n;
            return this.Rc.set(e.id, {
                id: (n = e).id,
                version: n.version,
                createTime: qn(n.createTime)
            }), Is.resolve();
        }
        Fs(t, e) {
            return Is.resolve(this.Pc.get(e));
        }
        $s(t, e) {
            var n;
            return this.Pc.set(e.name, {
                name: (n = e).name,
                query: fi(n.bundledQuery),
                readTime: qn(n.readTime)
            }), Is.resolve();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A collection of references to a document from some kind of numbered entity
     * (either a target ID or batch ID). As references are added to or removed from
     * the set corresponding events are emitted to a registered garbage collector.
     *
     * Each reference is represented by a DocumentReference object. Each of them
     * contains enough information to uniquely identify the reference. They are all
     * stored primarily in a set sorted by key. A document is considered garbage if
     * there's no references in that set (this can be efficiently checked thanks to
     * sorting by key).
     *
     * ReferenceSet also keeps a secondary set that contains references sorted by
     * IDs. This one is used to efficiently implement removal of all references by
     * some target ID.
     */ class Ar {
        constructor() {
            // A set of outstanding references to a document sorted by key.
            this.Vc = new ln(mr.gc), 
            // A set of outstanding references to a document sorted by target id.
            this.yc = new ln(mr.vc);
        }
        /** Returns true if the reference set contains no references. */    Y() {
            return this.Vc.Y();
        }
        /** Adds a reference to the given document key for the given ID. */    er(t, e) {
            const n = new mr(t, e);
            this.Vc = this.Vc.add(n), this.yc = this.yc.add(n);
        }
        /** Add references to the given document keys for the given ID. */    bc(t, e) {
            t.forEach((t => this.er(t, e)));
        }
        /**
         * Removes a reference to the given document key for the given
         * ID.
         */    sr(t, e) {
            this.Sc(new mr(t, e));
        }
        Dc(t, e) {
            t.forEach((t => this.sr(t, e)));
        }
        /**
         * Clears all references with a given ID. Calls removeRef() for each key
         * removed.
         */    Cc(t) {
            const e = new tt(new Y$1([])), n = new mr(e, t), s = new mr(e, t + 1), i = [];
            return this.yc.Ie([ n, s ], (t => {
                this.Sc(t), i.push(t.key);
            })), i;
        }
        Nc() {
            this.Vc.forEach((t => this.Sc(t)));
        }
        Sc(t) {
            this.Vc = this.Vc.delete(t), this.yc = this.yc.delete(t);
        }
        xc(t) {
            const e = new tt(new Y$1([])), n = new mr(e, t), s = new mr(e, t + 1);
            let i = mn();
            return this.yc.Ie([ n, s ], (t => {
                i = i.add(t.key);
            })), i;
        }
        ki(t) {
            const e = new mr(t, 0), n = this.Vc.me(e);
            return null !== n && t.isEqual(n.key);
        }
    }

    class mr {
        constructor(t, e) {
            this.key = t, this.kc = e;
        }
        /** Compare by key then by ID */    static gc(t, e) {
            return tt.K(t.key, e.key) || W$1(t.kc, e.kc);
        }
        /** Compare by ID then by key */    static vc(t, e) {
            return W$1(t.kc, e.kc) || tt.K(t.key, e.key);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Rr {
        constructor(t, e) {
            this.wi = t, this.Ei = e, 
            /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
            this.jo = [], 
            /** Next value to use when assigning sequential IDs to each mutation batch. */
            this.Oc = 1, 
            /** An ordered mapping between documents and the mutations batch IDs. */
            this.Mc = new ln(mr.gc);
        }
        Ai(t) {
            return Is.resolve(0 === this.jo.length);
        }
        mi(t, e, n, s) {
            const i = this.Oc;
            if (this.Oc++, this.jo.length > 0) {
                this.jo[this.jo.length - 1];
            }
            const r = new ei(i, e, n, s);
            this.jo.push(r);
            // Track references by document key and index collection parents.
            for (const e of s) this.Mc = this.Mc.add(new mr(e.key, i)), this.wi.Bs(t, e.key.path.G());
            return Is.resolve(r);
        }
        Ri(t, e) {
            return Is.resolve(this.Fc(e));
        }
        Vi(t, e) {
            const n = e + 1, s = this.$c(n), i = s < 0 ? 0 : s;
            // The requested batchId may still be out of range so normalize it to the
            // start of the queue.
                    return Is.resolve(this.jo.length > i ? this.jo[i] : null);
        }
        gi() {
            return Is.resolve(0 === this.jo.length ? -1 : this.Oc - 1);
        }
        yi(t) {
            return Is.resolve(this.jo.slice());
        }
        pi(t, e) {
            const n = new mr(e, 0), s = new mr(e, Number.POSITIVE_INFINITY), i = [];
            return this.Mc.Ie([ n, s ], (t => {
                const e = this.Fc(t.kc);
                i.push(e);
            })), Is.resolve(i);
        }
        vi(t, e) {
            let n = new ln(W$1);
            return e.forEach((t => {
                const e = new mr(t, 0), s = new mr(t, Number.POSITIVE_INFINITY);
                this.Mc.Ie([ e, s ], (t => {
                    n = n.add(t.kc);
                }));
            })), Is.resolve(this.Lc(n));
        }
        Si(t, e) {
            // Use the query path as a prefix for testing if a document matches the
            // query.
            const n = e.path, s = n.length + 1;
            // Construct a document reference for actually scanning the index. Unlike
            // the prefix the document key in this reference must have an even number of
            // segments. The empty segment can be used a suffix of the query path
            // because it precedes all other segments in an ordered traversal.
            let i = n;
            tt.lt(i) || (i = i.child(""));
            const r = new mr(new tt(i), 0);
            // Find unique batchIDs referenced by all documents potentially matching the
            // query.
                    let o = new ln(W$1);
            return this.Mc.Ae((t => {
                const e = t.key.path;
                return !!n.X(e) && (
                // Rows with document keys more than one segment longer than the query
                // path can't be matches. For example, a query on 'rooms' can't match
                // the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                e.length === s && (o = o.add(t.kc)), !0);
            }), r), Is.resolve(this.Lc(o));
        }
        Lc(t) {
            // Construct an array of matching batches, sorted by batchID to ensure that
            // multiple mutations affecting the same document key are applied in order.
            const e = [];
            return t.forEach((t => {
                const n = this.Fc(t);
                null !== n && e.push(n);
            })), e;
        }
        Di(t, e) {
            C(0 === this.Bc(e.batchId, "removed")), this.jo.shift();
            let n = this.Mc;
            return Is.forEach(e.mutations, (s => {
                const i = new mr(s.key, e.batchId);
                return n = n.delete(i), this.Ei.Ni(t, s.key);
            })).next((() => {
                this.Mc = n;
            }));
        }
        Ci(t) {
            // No-op since the memory mutation queue does not maintain a separate cache.
        }
        ki(t, e) {
            const n = new mr(e, 0), s = this.Mc.me(n);
            return Is.resolve(e.isEqual(s && s.key));
        }
        xi(t) {
            return this.jo.length, Is.resolve();
        }
        /**
         * Finds the index of the given batchId in the mutation queue and asserts that
         * the resulting index is within the bounds of the queue.
         *
         * @param batchId - The batchId to search for
         * @param action - A description of what the caller is doing, phrased in passive
         * form (e.g. "acknowledged" in a routine that acknowledges batches).
         */    Bc(t, e) {
            return this.$c(t);
        }
        /**
         * Finds the index of the given batchId in the mutation queue. This operation
         * is O(1).
         *
         * @returns The computed index of the batch with the given batchId, based on
         * the state of the queue. Note this index can be negative if the requested
         * batchId has already been remvoed from the queue or past the end of the
         * queue if the batchId is larger than the last added batch.
         */    $c(t) {
            if (0 === this.jo.length) 
            // As an index this is past the end of the queue
            return 0;
            // Examine the front of the queue to figure out the difference between the
            // batchId and indexes in the array. Note that since the queue is ordered
            // by batchId, if the first batch has a larger batchId then the requested
            // batchId doesn't exist in the queue.
                    return t - this.jo[0].batchId;
        }
        /**
         * A version of lookupMutationBatch that doesn't return a promise, this makes
         * other functions that uses this code easier to read and more efficent.
         */    Fc(t) {
            const e = this.$c(t);
            if (e < 0 || e >= this.jo.length) return null;
            return this.jo[e];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
     * `newMemoryRemoteDocumentCache()`.
     */
    class Pr {
        /**
         * @param sizer - Used to assess the size of a document. For eager GC, this is
         * expected to just return 0 to avoid unnecessarily doing the work of
         * calculating the size.
         */
        constructor(t, e) {
            this.wi = t, this.qc = e, 
            /** Underlying cache of documents and their read times. */
            this.docs = new un(tt.K), 
            /** Size of all cached documents. */
            this.size = 0;
        }
        /**
         * Adds the supplied entry to the cache and updates the cache size as appropriate.
         *
         * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    ci(t, e, n) {
            const s = e.key, i = this.docs.get(s), r = i ? i.size : 0, o = this.qc(e);
            return this.docs = this.docs.Gt(s, {
                ai: e,
                size: o,
                readTime: n
            }), this.size += o - r, this.wi.Bs(t, s.path.G());
        }
        /**
         * Removes the specified entry from the cache and updates the cache size as appropriate.
         *
         * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    hi(t) {
            const e = this.docs.get(t);
            e && (this.docs = this.docs.remove(t), this.size -= e.size);
        }
        li(t, e) {
            const n = this.docs.get(e);
            return Is.resolve(n ? n.ai : null);
        }
        getEntries(t, e) {
            let n = wn();
            return e.forEach((t => {
                const e = this.docs.get(t);
                n = n.Gt(t, e ? e.ai : null);
            })), Is.resolve(n);
        }
        Kr(t, e, n) {
            let s = Tn();
            // Documents are ordered by key, so we can use a prefix scan to narrow down
            // the documents we need to match the query against.
                    const i = new tt(e.path.child("")), r = this.docs.te(i);
            for (;r.oe(); ) {
                const {key: t, value: {ai: i, readTime: o}} = r.re();
                if (!e.path.X(t.path)) break;
                o.L(n) <= 0 || i instanceof xt && Ie(e, i) && (s = s.Gt(i.key, i));
            }
            return Is.resolve(s);
        }
        Uc(t, e) {
            return Is.forEach(this.docs, (t => e(t)));
        }
        Cr(t) {
            // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
            // a separate changelog and does not need special handling for removals.
            return new Vr(this);
        }
        Or(t) {
            return Is.resolve(this.size);
        }
    }

    /**
     * Creates a new memory-only RemoteDocumentCache.
     *
     * @param indexManager - A class that manages collection group indices.
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    /**
     * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
     */
    class Vr extends yi {
        constructor(t) {
            super(), this.Wr = t;
        }
        di(t) {
            const e = [];
            return this.ii.forEach(((n, s) => {
                s && s.ai ? e.push(this.Wr.ci(t, s.ai, this.oi(n))) : this.Wr.hi(n);
            })), Is.Fn(e);
        }
        _i(t, e) {
            return this.Wr.li(t, e);
        }
        fi(t, e) {
            return this.Wr.getEntries(t, e);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class gr {
        constructor(t) {
            this.persistence = t, 
            /**
             * Maps a target to the data about that target
             */
            this.Kc = new gi((t => $t(t)), Bt), 
            /** The last received snapshot version. */
            this.lastRemoteSnapshotVersion = H$1.min(), 
            /** The highest numbered target ID encountered. */
            this.highestTargetId = 0, 
            /** The highest sequence number encountered. */
            this.Qc = 0, 
            /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
            this.Wc = new Ar, this.targetCount = 0, this.jc = xi.Fi();
        }
        Tn(t, e) {
            return this.Kc.forEach(((t, n) => e(n))), Is.resolve();
        }
        Ui(t) {
            return Is.resolve(this.lastRemoteSnapshotVersion);
        }
        Ki(t) {
            return Is.resolve(this.Qc);
        }
        Li(t) {
            return this.highestTargetId = this.jc.next(), Is.resolve(this.highestTargetId);
        }
        Qi(t, e, n) {
            return n && (this.lastRemoteSnapshotVersion = n), e > this.Qc && (this.Qc = e), 
            Is.resolve();
        }
        ji(t) {
            this.Kc.set(t.target, t);
            const e = t.targetId;
            e > this.highestTargetId && (this.jc = new xi(e), this.highestTargetId = e), t.sequenceNumber > this.Qc && (this.Qc = t.sequenceNumber);
        }
        Wi(t, e) {
            return this.ji(e), this.targetCount += 1, Is.resolve();
        }
        zi(t, e) {
            return this.ji(e), Is.resolve();
        }
        Hi(t, e) {
            return this.Kc.delete(e.target), this.Wc.Cc(e.targetId), this.targetCount -= 1, 
            Is.resolve();
        }
        Yi(t, e, n) {
            let s = 0;
            const i = [];
            return this.Kc.forEach(((r, o) => {
                o.sequenceNumber <= e && null === n.get(o.targetId) && (this.Kc.delete(r), i.push(this.Ji(t, o.targetId)), 
                s++);
            })), Is.Fn(i).next((() => s));
        }
        Xi(t) {
            return Is.resolve(this.targetCount);
        }
        Zi(t, e) {
            const n = this.Kc.get(e) || null;
            return Is.resolve(n);
        }
        tr(t, e, n) {
            return this.Wc.bc(e, n), Is.resolve();
        }
        nr(t, e, n) {
            this.Wc.Dc(e, n);
            const s = this.persistence.Ei, i = [];
            return s && e.forEach((e => {
                i.push(s.Ni(t, e));
            })), Is.Fn(i);
        }
        Ji(t, e) {
            return this.Wc.Cc(e), Is.resolve();
        }
        ir(t, e) {
            const n = this.Wc.xc(e);
            return Is.resolve(n);
        }
        ki(t, e) {
            return Is.resolve(this.Wc.ki(e));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A memory-backed instance of Persistence. Data is stored only in RAM and
     * not persisted across sessions.
     */
    class yr {
        /**
         * The constructor accepts a factory for creating a reference delegate. This
         * allows both the delegate and this instance to have strong references to
         * each other without having nullable fields that would then need to be
         * checked or asserted on every access.
         */
        constructor(t, e) {
            this.Gc = {}, this.no = new U$1(0), this.so = !1, this.so = !0, this.Ei = t(this), 
            this.lo = new gr(this);
            this.wi = new Ti, this._o = function(t, e) {
                return new Pr(t, e);
            }(this.wi, (t => this.Ei.zc(t))), this.Ut = new si(e), this.fo = new Ir(this.Ut);
        }
        start() {
            return Promise.resolve();
        }
        Mo() {
            // No durable state to ensure is closed on shutdown.
            return this.so = !1, Promise.resolve();
        }
        get wr() {
            return this.so;
        }
        Ro() {
            // No op.
        }
        Po() {
            // No op.
        }
        Ko() {
            return this.wi;
        }
        Uo(t) {
            let e = this.Gc[t.i()];
            return e || (e = new Rr(this.wi, this.Ei), this.Gc[t.i()] = e), e;
        }
        br() {
            return this.lo;
        }
        Nr() {
            return this._o;
        }
        Qo() {
            return this.fo;
        }
        runTransaction(t, e, n) {
            p$1("MemoryPersistence", "Starting transaction:", t);
            const s = new pr(this.no.next());
            return this.Ei.Hc(), n(s).next((t => this.Ei.Jc(s).next((() => t)))).On().then((t => (s.gs(), 
            t)));
        }
        Yc(t, e) {
            return Is.$n(Object.values(this.Gc).map((n => () => n.ki(t, e))));
        }
    }

    /**
     * Memory persistence is not actually transactional, but future implementations
     * may have transaction-scoped state.
     */ class pr extends Cs {
        constructor(t) {
            super(), this.ps = t;
        }
    }

    class vr {
        constructor(t) {
            this.persistence = t, 
            /** Tracks all documents that are active in Query views. */
            this.Xc = new Ar, 
            /** The list of documents that are potentially GCed after each transaction. */
            this.Zc = null;
        }
        static tu(t) {
            return new vr(t);
        }
        get eu() {
            if (this.Zc) return this.Zc;
            throw D$1();
        }
        er(t, e, n) {
            return this.Xc.er(n, e), this.eu.delete(n.toString()), Is.resolve();
        }
        sr(t, e, n) {
            return this.Xc.sr(n, e), this.eu.add(n.toString()), Is.resolve();
        }
        Ni(t, e) {
            return this.eu.add(e.toString()), Is.resolve();
        }
        removeTarget(t, e) {
            this.Xc.Cc(e.targetId).forEach((t => this.eu.add(t.toString())));
            const n = this.persistence.br();
            return n.ir(t, e.targetId).next((t => {
                t.forEach((t => this.eu.add(t.toString())));
            })).next((() => n.Hi(t, e)));
        }
        Hc() {
            this.Zc = new Set;
        }
        Jc(t) {
            // Remove newly orphaned documents.
            const e = this.persistence.Nr().Cr();
            return Is.forEach(this.eu, (n => {
                const s = tt.ut(n);
                return this.nu(t, s).next((t => {
                    t || e.hi(s);
                }));
            })).next((() => (this.Zc = null, e.apply(t))));
        }
        kr(t, e) {
            return this.nu(t, e).next((t => {
                t ? this.eu.delete(e.toString()) : this.eu.add(e.toString());
            }));
        }
        zc(t) {
            // For eager GC, we don't care about the document size, there are no size thresholds.
            return 0;
        }
        nu(t, e) {
            return Is.$n([ () => Is.resolve(this.Xc.ki(e)), () => this.persistence.br().ki(t, e), () => this.persistence.Yc(t, e) ]);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The format of the LocalStorage key that stores the client state is:
    //     firestore_clients_<persistence_prefix>_<instance_key>
    /** Assembles the key for a client state in WebStorage */
    function br(t, e) {
        return `firestore_clients_${t}_${e}`;
    }

    // The format of the WebStorage key that stores the mutation state is:
    //     firestore_mutations_<persistence_prefix>_<batch_id>
    //     (for unauthenticated users)
    // or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>

    // 'user_uid' is last to avoid needing to escape '_' characters that it might
    // contain.
    /** Assembles the key for a mutation batch in WebStorage */
    function Sr(t, e, n) {
        let s = `firestore_mutations_${t}_${n}`;
        return e.t() && (s += "_" + e.uid), s;
    }

    // The format of the WebStorage key that stores a query target's metadata is:
    //     firestore_targets_<persistence_prefix>_<target_id>
    /** Assembles the key for a query state in WebStorage */
    function Dr(t, e) {
        return `firestore_targets_${t}_${e}`;
    }

    // The WebStorage prefix that stores the primary tab's online state. The
    // format of the key is:
    //     firestore_online_state_<persistence_prefix>
    /**
     * Holds the state of a mutation batch, including its user ID, batch ID and
     * whether the batch is 'pending', 'acknowledged' or 'rejected'.
     */
    // Visible for testing
    class Cr {
        constructor(t, e, n, s) {
            this.user = t, this.batchId = e, this.state = n, this.error = s;
        }
        /**
         * Parses a MutationMetadata from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static su(t, e, n) {
            const s = JSON.parse(n);
            let i = "object" == typeof s && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(s.state) && (void 0 === s.error || "object" == typeof s.error), r = void 0;
            return i && s.error && (i = "string" == typeof s.error.message && "string" == typeof s.error.code, 
            i && (r = new k$1(s.error.code, s.error.message))), i ? new Cr(t, e, s.state, r) : (v$1("SharedClientState", `Failed to parse mutation state for ID '${e}': ${n}`), 
            null);
        }
        iu() {
            const t = {
                state: this.state,
                updateTimeMs: Date.now()
            };
            return this.error && (t.error = {
                code: this.error.code,
                message: this.error.message
            }), JSON.stringify(t);
        }
    }

    /**
     * Holds the state of a query target, including its target ID and whether the
     * target is 'not-current', 'current' or 'rejected'.
     */
    // Visible for testing
    class Nr {
        constructor(t, e, n) {
            this.targetId = t, this.state = e, this.error = n;
        }
        /**
         * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static su(t, e) {
            const n = JSON.parse(e);
            let s = "object" == typeof n && -1 !== [ "not-current", "current", "rejected" ].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error), i = void 0;
            return s && n.error && (s = "string" == typeof n.error.message && "string" == typeof n.error.code, 
            s && (i = new k$1(n.error.code, n.error.message))), s ? new Nr(t, n.state, i) : (v$1("SharedClientState", `Failed to parse target state for ID '${t}': ${e}`), 
            null);
        }
        iu() {
            const t = {
                state: this.state,
                updateTimeMs: Date.now()
            };
            return this.error && (t.error = {
                code: this.error.code,
                message: this.error.message
            }), JSON.stringify(t);
        }
    }

    /**
     * This class represents the immutable ClientState for a client read from
     * WebStorage, containing the list of active query targets.
     */ class xr {
        constructor(t, e) {
            this.clientId = t, this.activeTargetIds = e;
        }
        /**
         * Parses a RemoteClientState from the JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static su(t, e) {
            const n = JSON.parse(e);
            let s = "object" == typeof n && n.activeTargetIds instanceof Array, i = Pn();
            for (let t = 0; s && t < n.activeTargetIds.length; ++t) s = wt(n.activeTargetIds[t]), 
            i = i.add(n.activeTargetIds[t]);
            return s ? new xr(t, i) : (v$1("SharedClientState", `Failed to parse client data for instance '${t}': ${e}`), 
            null);
        }
    }

    /**
     * This class represents the online state for all clients participating in
     * multi-tab. The online state is only written to by the primary client, and
     * used in secondary clients to update their query views.
     */ class kr {
        constructor(t, e) {
            this.clientId = t, this.onlineState = e;
        }
        /**
         * Parses a SharedOnlineState from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static su(t) {
            const e = JSON.parse(t);
            return "object" == typeof e && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(e.onlineState) && "string" == typeof e.clientId ? new kr(e.clientId, e.onlineState) : (v$1("SharedClientState", "Failed to parse online state: " + t), 
            null);
        }
    }

    /**
     * Metadata state of the local client. Unlike `RemoteClientState`, this class is
     * mutable and keeps track of all pending mutations, which allows us to
     * update the range of pending mutation batch IDs as new mutations are added or
     * removed.
     *
     * The data in `LocalClientState` is not read from WebStorage and instead
     * updated via its instance methods. The updated state can be serialized via
     * `toWebStorageJSON()`.
     */
    // Visible for testing.
    class Or {
        constructor() {
            this.activeTargetIds = Pn();
        }
        ru(t) {
            this.activeTargetIds = this.activeTargetIds.add(t);
        }
        ou(t) {
            this.activeTargetIds = this.activeTargetIds.delete(t);
        }
        /**
         * Converts this entry into a JSON-encoded format we can use for WebStorage.
         * Does not encode `clientId` as it is part of the key in WebStorage.
         */    iu() {
            const t = {
                activeTargetIds: this.activeTargetIds.tt(),
                updateTimeMs: Date.now()
            };
            return JSON.stringify(t);
        }
    }

    /**
     * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
     * backing store for the SharedClientState. It keeps track of all active
     * clients and supports modifications of the local client's data.
     */ class Mr {
        constructor(t, e, n, s, i) {
            this.window = t, this.Xr = e, this.persistenceKey = n, this.cu = s, this.uu = null, 
            this.au = null, this.D = null, this.hu = this.lu.bind(this), this._u = new un(W$1), 
            this.wr = !1, 
            /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
            this.fu = [];
            // Escape the special characters mentioned here:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            const r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            this.storage = this.window.localStorage, this.currentUser = i, this.du = br(this.persistenceKey, this.cu), 
            this.wu = 
            /** Assembles the key for the current sequence number. */
            function(t) {
                return "firestore_sequence_number_" + t;
            }
            /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (this.persistenceKey), this._u = this._u.Gt(this.cu, new Or), this.Eu = new RegExp(`^firestore_clients_${r}_([^_]*)$`), 
            this.Tu = new RegExp(`^firestore_mutations_${r}_(\\d+)(?:_(.*))?$`), this.Iu = new RegExp(`^firestore_targets_${r}_(\\d+)$`), 
            this.Au = 
            /** Assembles the key for the online state of the primary tab. */
            function(t) {
                return "firestore_online_state_" + t;
            }
            // The WebStorage prefix that plays as a event to indicate the remote documents
            // might have changed due to some secondary tabs loading a bundle.
            // format of the key is:
            //     firestore_bundle_loaded_<persistenceKey>
            (this.persistenceKey), this.mu = function(t) {
                return "firestore_bundle_loaded_" + t;
            }
            // The WebStorage key prefix for the key that stores the last sequence number allocated. The key
            // looks like 'firestore_sequence_number_<persistence_prefix>'.
            (this.persistenceKey), 
            // Rather than adding the storage observer during start(), we add the
            // storage observer during initialization. This ensures that we collect
            // events before other components populate their initial state (during their
            // respective start() calls). Otherwise, we might for example miss a
            // mutation that is added after LocalStore's start() processed the existing
            // mutations but before we observe WebStorage events.
            this.window.addEventListener("storage", this.hu);
        }
        /** Returns 'true' if WebStorage is available in the current environment. */    static Kn(t) {
            return !(!t || !t.localStorage);
        }
        async start() {
            // Retrieve the list of existing clients to backfill the data in
            // SharedClientState.
            const t = await this.uu.qo();
            for (const e of t) {
                if (e === this.cu) continue;
                const t = this.getItem(br(this.persistenceKey, e));
                if (t) {
                    const n = xr.su(e, t);
                    n && (this._u = this._u.Gt(n.clientId, n));
                }
            }
            this.Ru();
            // Check if there is an existing online state and call the callback handler
            // if applicable.
            const e = this.storage.getItem(this.Au);
            if (e) {
                const t = this.Pu(e);
                t && this.Vu(t);
            }
            for (const t of this.fu) this.lu(t);
            this.fu = [], 
            // Register a window unload hook to remove the client metadata entry from
            // WebStorage even if `shutdown()` was not called.
            this.window.addEventListener("unload", (() => this.Mo())), this.wr = !0;
        }
        k(t) {
            this.setItem(this.wu, JSON.stringify(t));
        }
        gu() {
            return this.yu(this._u);
        }
        pu(t) {
            let e = !1;
            return this._u.forEach(((n, s) => {
                s.activeTargetIds.has(t) && (e = !0);
            })), e;
        }
        vu(t) {
            this.bu(t, "pending");
        }
        Su(t, e, n) {
            this.bu(t, e, n), 
            // Once a final mutation result is observed by other clients, they no longer
            // access the mutation's metadata entry. Since WebStorage replays events
            // in order, it is safe to delete the entry right after updating it.
            this.Du(t);
        }
        Cu(t) {
            let e = "not-current";
            // Lookup an existing query state if the target ID was already registered
            // by another tab
                    if (this.pu(t)) {
                const n = this.storage.getItem(Dr(this.persistenceKey, t));
                if (n) {
                    const s = Nr.su(t, n);
                    s && (e = s.state);
                }
            }
            return this.Nu.ru(t), this.Ru(), e;
        }
        xu(t) {
            this.Nu.ou(t), this.Ru();
        }
        ku(t) {
            return this.Nu.activeTargetIds.has(t);
        }
        Ou(t) {
            this.removeItem(Dr(this.persistenceKey, t));
        }
        Mu(t, e, n) {
            this.Fu(t, e, n);
        }
        $u(t, e, n) {
            e.forEach((t => {
                this.Du(t);
            })), this.currentUser = t, n.forEach((t => {
                this.vu(t);
            }));
        }
        Lu(t) {
            this.Bu(t);
        }
        qu() {
            this.Uu();
        }
        Mo() {
            this.wr && (this.window.removeEventListener("storage", this.hu), this.removeItem(this.du), 
            this.wr = !1);
        }
        getItem(t) {
            const e = this.storage.getItem(t);
            return p$1("SharedClientState", "READ", t, e), e;
        }
        setItem(t, e) {
            p$1("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
        }
        removeItem(t) {
            p$1("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
        }
        lu(t) {
            // Note: The function is typed to take Event to be interface-compatible with
            // `Window.addEventListener`.
            const e = t;
            if (e.storageArea === this.storage) {
                if (p$1("SharedClientState", "EVENT", e.key, e.newValue), e.key === this.du) return void v$1("Received WebStorage notification for local change. Another client might have garbage-collected our state");
                this.Xr.yo((async () => {
                    if (this.wr) {
                        if (null !== e.key) if (this.Eu.test(e.key)) {
                            if (null == e.newValue) {
                                const t = this.Ku(e.key);
                                return this.Qu(t, null);
                            }
                            {
                                const t = this.Wu(e.key, e.newValue);
                                if (t) return this.Qu(t.clientId, t);
                            }
                        } else if (this.Tu.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.ju(e.key, e.newValue);
                                if (t) return this.Gu(t);
                            }
                        } else if (this.Iu.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.zu(e.key, e.newValue);
                                if (t) return this.Hu(t);
                            }
                        } else if (e.key === this.Au) {
                            if (null !== e.newValue) {
                                const t = this.Pu(e.newValue);
                                if (t) return this.Vu(t);
                            }
                        } else if (e.key === this.wu) {
                            const t = function(t) {
                                let e = U$1.O;
                                if (null != t) try {
                                    const n = JSON.parse(t);
                                    C("number" == typeof n), e = n;
                                } catch (t) {
                                    v$1("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }
                            /**
     * `MemorySharedClientState` is a simple implementation of SharedClientState for
     * clients using memory persistence. The state in this class remains fully
     * isolated and no synchronization is performed.
     */ (e.newValue);
                            t !== U$1.O && this.D(t);
                        } else if (e.key === this.mu) return this.uu.Ju();
                    } else this.fu.push(e);
                }));
            }
        }
        get Nu() {
            return this._u.get(this.cu);
        }
        Ru() {
            this.setItem(this.du, this.Nu.iu());
        }
        bu(t, e, n) {
            const s = new Cr(this.currentUser, t, e, n), i = Sr(this.persistenceKey, this.currentUser, t);
            this.setItem(i, s.iu());
        }
        Du(t) {
            const e = Sr(this.persistenceKey, this.currentUser, t);
            this.removeItem(e);
        }
        Bu(t) {
            const e = {
                clientId: this.cu,
                onlineState: t
            };
            this.storage.setItem(this.Au, JSON.stringify(e));
        }
        Fu(t, e, n) {
            const s = Dr(this.persistenceKey, t), i = new Nr(t, e, n);
            this.setItem(s, i.iu());
        }
        Uu() {
            this.setItem(this.mu, "value-not-used");
        }
        /**
         * Parses a client state key in WebStorage. Returns null if the key does not
         * match the expected key format.
         */    Ku(t) {
            const e = this.Eu.exec(t);
            return e ? e[1] : null;
        }
        /**
         * Parses a client state in WebStorage. Returns 'null' if the value could not
         * be parsed.
         */    Wu(t, e) {
            const n = this.Ku(t);
            return xr.su(n, e);
        }
        /**
         * Parses a mutation batch state in WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    ju(t, e) {
            const n = this.Tu.exec(t), s = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
            return Cr.su(new P$1(i), s, e);
        }
        /**
         * Parses a query target state from WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    zu(t, e) {
            const n = this.Iu.exec(t), s = Number(n[1]);
            return Nr.su(s, e);
        }
        /**
         * Parses an online state from WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    Pu(t) {
            return kr.su(t);
        }
        async Gu(t) {
            if (t.user.uid === this.currentUser.uid) return this.uu.Yu(t.batchId, t.state, t.error);
            p$1("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid);
        }
        Hu(t) {
            return this.uu.Xu(t.targetId, t.state, t.error);
        }
        Qu(t, e) {
            const n = e ? this._u.Gt(t, e) : this._u.remove(t), s = this.yu(this._u), i = this.yu(n), r = [], o = [];
            return i.forEach((t => {
                s.has(t) || r.push(t);
            })), s.forEach((t => {
                i.has(t) || o.push(t);
            })), this.uu.Zu(r, o).then((() => {
                this._u = n;
            }));
        }
        Vu(t) {
            // We check whether the client that wrote this online state is still active
            // by comparing its client ID to the list of clients kept active in
            // IndexedDb. If a client does not update their IndexedDb client state
            // within 5 seconds, it is considered inactive and we don't emit an online
            // state event.
            this._u.get(t.clientId) && this.au(t.onlineState);
        }
        yu(t) {
            let e = Pn();
            return t.forEach(((t, n) => {
                e = e.Re(n.activeTargetIds);
            })), e;
        }
    }

    class Fr {
        constructor() {
            this.ta = new Or, this.ea = {}, this.au = null, this.D = null;
        }
        vu(t) {
            // No op.
        }
        Su(t, e, n) {
            // No op.
        }
        Cu(t) {
            return this.ta.ru(t), this.ea[t] || "not-current";
        }
        Mu(t, e, n) {
            this.ea[t] = e;
        }
        xu(t) {
            this.ta.ou(t);
        }
        ku(t) {
            return this.ta.activeTargetIds.has(t);
        }
        Ou(t) {
            delete this.ea[t];
        }
        gu() {
            return this.ta.activeTargetIds;
        }
        pu(t) {
            return this.ta.activeTargetIds.has(t);
        }
        start() {
            return this.ta = new Or, Promise.resolve();
        }
        $u(t, e, n) {
            // No op.
        }
        Lu(t) {
            // No op.
        }
        Mo() {}
        k(t) {}
        qu() {
            // No op.
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class $r {
        na(t) {
            // No-op.
        }
        Mo() {
            // No-op.
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
    /* eslint-disable no-restricted-globals */
    /**
     * Browser implementation of ConnectivityMonitor.
     */
    class Lr {
        constructor() {
            this.sa = () => this.ia(), this.ra = () => this.oa(), this.ca = [], this.ua();
        }
        na(t) {
            this.ca.push(t);
        }
        Mo() {
            window.removeEventListener("online", this.sa), window.removeEventListener("offline", this.ra);
        }
        ua() {
            window.addEventListener("online", this.sa), window.addEventListener("offline", this.ra);
        }
        ia() {
            p$1("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
            for (const t of this.ca) t(0 /* AVAILABLE */);
        }
        oa() {
            p$1("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
            for (const t of this.ca) t(1 /* UNAVAILABLE */);
        }
        // TODO(chenbrian): Consider passing in window either into this component or
        // here for testing via FakeWindow.
        /** Checks that all used attributes of window are available. */
        static Kn() {
            return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Br = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery"
    };

    /**
     * Maps RPC names to the corresponding REST endpoint name.
     *
     * We use array notation to avoid mangling.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a simple helper class that implements the Stream interface to
     * bridge to other implementations that are streams but do not implement the
     * interface. The stream callbacks are invoked with the callOn... methods.
     */
    class qr {
        constructor(t) {
            this.aa = t.aa, this.ha = t.ha;
        }
        la(t) {
            this._a = t;
        }
        fa(t) {
            this.da = t;
        }
        onMessage(t) {
            this.wa = t;
        }
        close() {
            this.ha();
        }
        send(t) {
            this.aa(t);
        }
        Ea() {
            this._a();
        }
        Ta(t) {
            this.da(t);
        }
        Ia(t) {
            this.wa(t);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Ur extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.Aa = t, this.p = t.p;
            const e = t.ssl ? "https" : "http";
            this.ma = e + "://" + t.host, this.Ra = "projects/" + this.p.projectId + "/databases/" + this.p.database + "/documents";
        }
        Pa(t, e, n, s) {
            const i = this.Va(t, e);
            p$1("RestConnection", "Sending: ", i, n);
            const r = {};
            return this.ga(r, s), this.ya(t, i, r, n).then((t => (p$1("RestConnection", "Received: ", t), 
            t)), (e => {
                throw b("RestConnection", t + " failed with error: ", e, "url: ", i, "request:", n), 
                e;
            }));
        }
        pa(t, e, n, s) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.Pa(t, e, n, s);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    ga(t, e) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/8.2.0", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", e) for (const n in e.h) e.h.hasOwnProperty(n) && (t[n] = e.h[n]);
        }
        Va(t, e) {
            const n = Br[t];
            return `${this.ma}/v1/${e}:${n}`;
        }
    } {
        constructor(t) {
            super(t), this.forceLongPolling = t.forceLongPolling, this.v = t.v;
        }
        ya(t, e, n, s) {
            return new Promise(((i, r) => {
                const o = new XhrIo;
                o.listenOnce(EventType.COMPLETE, (() => {
                    try {
                        switch (o.getLastErrorCode()) {
                          case ErrorCode.NO_ERROR:
                            const e = o.getResponseJson();
                            p$1("Connection", "XHR received:", JSON.stringify(e)), i(e);
                            break;

                          case ErrorCode.TIMEOUT:
                            p$1("Connection", 'RPC "' + t + '" timed out'), r(new k$1(x$1.DEADLINE_EXCEEDED, "Request time out"));
                            break;

                          case ErrorCode.HTTP_ERROR:
                            const n = o.getStatus();
                            if (p$1("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", o.getResponseText()), 
                            n > 0) {
                                const t = o.getResponseJson().error;
                                if (t && t.status && t.message) {
                                    const e = function(t) {
                                        const e = t.toLowerCase().replace(/_/g, "-");
                                        return Object.values(x$1).indexOf(e) >= 0 ? e : x$1.UNKNOWN;
                                    }(t.status);
                                    r(new k$1(e, t.message));
                                } else r(new k$1(x$1.UNKNOWN, "Server responded with status " + o.getStatus()));
                            } else 
                            // If we received an HTTP_ERROR but there's no status code,
                            // it's most probably a connection issue
                            r(new k$1(x$1.UNAVAILABLE, "Connection failed."));
                            break;

                          default:
                            D$1();
                        }
                    } finally {
                        p$1("Connection", 'RPC "' + t + '" completed.');
                    }
                }));
                const c = JSON.stringify(s);
                o.send(e, "POST", c, n, 15);
            }));
        }
        va(t, e) {
            const n = [ this.ma, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], s = createWebChannelTransport(), i = getStatEventTarget(), r = {
                // Required for backend stickiness, routing behavior is based on this
                // parameter.
                httpSessionIdParam: "gsessionid",
                initMessageHeaders: {},
                messageUrlParams: {
                    // This param is used to improve routing and project isolation by the
                    // backend and must be included in every request.
                    database: `projects/${this.p.projectId}/databases/${this.p.database}`
                },
                sendRawJson: !0,
                supportsCrossDomainXhr: !0,
                internalChannelParams: {
                    // Override the default timeout (randomized between 10-20 seconds) since
                    // a large write batch on a slow internet connection may take a long
                    // time to send to the backend. Rather than have WebChannel impose a
                    // tight timeout which could lead to infinite timeouts and retries, we
                    // set it very large (5-10 minutes) and rely on the browser's builtin
                    // timeouts to kick in if the request isn't working.
                    forwardChannelRequestTimeoutMs: 6e5
                },
                forceLongPolling: this.forceLongPolling,
                detectBufferingProxy: this.v
            };
            this.ga(r.initMessageHeaders, e), 
            // Sending the custom headers we just added to request.initMessageHeaders
            // (Authorization, etc.) will trigger the browser to make a CORS preflight
            // request because the XHR will no longer meet the criteria for a "simple"
            // CORS request:
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
            // Therefore to avoid the CORS preflight request (an extra network
            // roundtrip), we use the httpHeadersOverwriteParam option to specify that
            // the headers should instead be encoded into a special "$httpHeaders" query
            // parameter, which is recognized by the webchannel backend. This is
            // formally defined here:
            // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
            // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
            // doesn't have an Origin header. So we have to exclude a few browser environments that are
            // known to (sometimes) not include an Origin. See
            // https://github.com/firebase/firebase-js-sdk/issues/1491.
            isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (r.httpHeadersOverwriteParam = "$httpHeaders");
            const o = n.join("");
            p$1("Connection", "Creating WebChannel: " + o, r);
            const c = s.createWebChannel(o, r);
            // WebChannel supports sending the first message with the handshake - saving
            // a network round trip. However, it will have to call send in the same
            // JS event loop as open. In order to enforce this, we delay actually
            // opening the WebChannel until send is called. Whether we have called
            // open is tracked with this variable.
                    let d = !1, w = !1;
            // A flag to determine whether the stream was closed (by us or through an
            // error/close event) to avoid delivering multiple close events or sending
            // on a closed stream
                    const E = new qr({
                aa: t => {
                    w ? p$1("Connection", "Not sending because WebChannel is closed:", t) : (d || (p$1("Connection", "Opening WebChannel transport."), 
                    c.open(), d = !0), p$1("Connection", "WebChannel sending:", t), c.send(t));
                },
                ha: () => c.close()
            }), P = (t, e, n) => {
                // TODO(dimond): closure typing seems broken because WebChannel does
                // not implement goog.events.Listenable
                t.listen(e, (t => {
                    try {
                        n(t);
                    } catch (t) {
                        setTimeout((() => {
                            throw t;
                        }), 0);
                    }
                }));
            };
            // Closure events are guarded and exceptions are swallowed, so catch any
            // exception and rethrow using a setTimeout so they become visible again.
            // Note that eventually this function could go away if we are confident
            // enough the code is exception free.
                    return P(c, WebChannel.EventType.OPEN, (() => {
                w || p$1("Connection", "WebChannel transport opened.");
            })), P(c, WebChannel.EventType.CLOSE, (() => {
                w || (w = !0, p$1("Connection", "WebChannel transport closed"), E.Ta());
            })), P(c, WebChannel.EventType.ERROR, (t => {
                w || (w = !0, b("Connection", "WebChannel transport errored:", t), E.Ta(new k$1(x$1.UNAVAILABLE, "The operation could not be completed")));
            })), P(c, WebChannel.EventType.MESSAGE, (t => {
                var e;
                if (!w) {
                    const n = t.data[0];
                    C(!!n);
                    // TODO(b/35143891): There is a bug in One Platform that caused errors
                    // (and only errors) to be wrapped in an extra array. To be forward
                    // compatible with the bug we need to check either condition. The latter
                    // can be removed once the fix has been rolled out.
                    // Use any because msgData.error is not typed.
                    const s = n, i = s.error || (null === (e = s[0]) || void 0 === e ? void 0 : e.error);
                    if (i) {
                        p$1("Connection", "WebChannel received error:", i);
                        // error.status will be a string like 'OK' or 'NOT_FOUND'.
                        const t = i.status;
                        let e = 
                        /**
     * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
     *
     * @returns The Code equivalent to the given status string or undefined if
     *     there is no match.
     */
                        function(t) {
                            // lookup by string
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const e = sn[t];
                            if (void 0 !== e) return cn(e);
                        }(t), n = i.message;
                        void 0 === e && (e = x$1.INTERNAL, n = "Unknown error status: " + t + " with message " + i.message), 
                        // Mark closed so no further events are propagated
                        w = !0, E.Ta(new k$1(e, n)), c.close();
                    } else p$1("Connection", "WebChannel received:", n), E.Ia(n);
                }
            })), P(i, Event.STAT_EVENT, (t => {
                t.stat === Stat.PROXY ? p$1("Connection", "Detected buffering proxy") : t.stat === Stat.NOPROXY && p$1("Connection", "Detected no buffering proxy");
            })), setTimeout((() => {
                // Technically we could/should wait for the WebChannel opened event,
                // but because we want to send the first message with the WebChannel
                // handshake we pretend the channel opened here (asynchronously), and
                // then delay the actual open until the first message is sent.
                E.Ea();
            }), 0), E;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Initializes the WebChannelConnection for the browser. */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** The Platform's 'window' implementation or null if not available. */
    function Kr() {
        // `window` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof window ? window : null;
    }

    /** The Platform's 'document' implementation or null if not available. */ function Qr() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function Wr(t) {
        return new Fn(t, /* useProto3Json= */ !0);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class jr {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        e, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        n = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , s = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , i = 6e4) {
            this.Xr = t, this._s = e, this.ba = n, this.Sa = s, this.Da = i, this.Ca = 0, this.Na = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.xa = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.Ca = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    ka() {
            this.Ca = this.Da;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    Oa(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const e = Math.floor(this.Ca + this.Ma()), n = Math.max(0, Date.now() - this.xa), s = Math.max(0, e - n);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && p$1("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.Ca} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), 
            this.Na = this.Xr.Er(this._s, s, (() => (this.xa = Date.now(), t()))), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.Ca *= this.Sa, this.Ca < this.ba && (this.Ca = this.ba), this.Ca > this.Da && (this.Ca = this.Da);
        }
        Fa() {
            null !== this.Na && (this.Na.As(), this.Na = null);
        }
        cancel() {
            null !== this.Na && (this.Na.cancel(), this.Na = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Ma() {
            return (Math.random() - .5) * this.Ca;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A PersistentStream is an abstract base class that represents a streaming RPC
     * to the Firestore backend. It's built on top of the connections own support
     * for streaming RPCs, and adds several critical features for our clients:
     *
     *   - Exponential backoff on failure
     *   - Authentication via CredentialsProvider
     *   - Dispatching all callbacks into the shared worker queue
     *   - Closing idle streams after 60 seconds of inactivity
     *
     * Subclasses of PersistentStream implement serialization of models to and
     * from the JSON representation of the protocol buffers for a specific
     * streaming RPC.
     *
     * ## Starting and Stopping
     *
     * Streaming RPCs are stateful and need to be start()ed before messages can
     * be sent and received. The PersistentStream will call the onOpen() function
     * of the listener once the stream is ready to accept requests.
     *
     * Should a start() fail, PersistentStream will call the registered onClose()
     * listener with a FirestoreError indicating what went wrong.
     *
     * A PersistentStream can be started and stopped repeatedly.
     *
     * Generic types:
     *  SendType: The type of the outgoing message of the underlying
     *    connection stream
     *  ReceiveType: The type of the incoming message of the underlying
     *    connection stream
     *  ListenerType: The type of the listener that will be used for callbacks
     */
    class Gr {
        constructor(t, e, n, s, i, r) {
            this.Xr = t, this.$a = n, this.La = s, this.Ba = i, this.listener = r, this.state = 0 /* Initial */ , 
            /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
            this.qa = 0, this.Ua = null, this.stream = null, this.Ka = new jr(t, e);
        }
        /**
         * Returns true if start() has been called and no error has occurred. True
         * indicates the stream is open or in the process of opening (which
         * encompasses respecting backoff, getting auth tokens, and starting the
         * actual RPC). Use isOpen() to determine if the stream is open and ready for
         * outbound requests.
         */    Qa() {
            return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
        }
        /**
         * Returns true if the underlying RPC is open (the onOpen() listener has been
         * called) and the stream is ready for outbound requests.
         */    Wa() {
            return 2 /* Open */ === this.state;
        }
        /**
         * Starts the RPC. Only allowed if isStarted() returns false. The stream is
         * not immediately ready for use: onOpen() will be invoked when the RPC is
         * ready for outbound requests, at which point isOpen() will return true.
         *
         * When start returns, isStarted() will return true.
         */    start() {
            3 /* Error */ !== this.state ? this.auth() : this.ja();
        }
        /**
         * Stops the RPC. This call is idempotent and allowed regardless of the
         * current isStarted() state.
         *
         * When stop returns, isStarted() and isOpen() will both return false.
         */    async stop() {
            this.Qa() && await this.close(0 /* Initial */);
        }
        /**
         * After an error the stream will usually back off on the next attempt to
         * start it. If the error warrants an immediate restart of the stream, the
         * sender can use this to indicate that the receiver should not back off.
         *
         * Each error will call the onClose() listener. That function can decide to
         * inhibit backoff if required.
         */    Ga() {
            this.state = 0 /* Initial */ , this.Ka.reset();
        }
        /**
         * Marks this stream as idle. If no further actions are performed on the
         * stream for one minute, the stream will automatically close itself and
         * notify the stream's onClose() handler with Status.OK. The stream will then
         * be in a !isStarted() state, requiring the caller to start the stream again
         * before further use.
         *
         * Only streams that are in state 'Open' can be marked idle, as all other
         * states imply pending network operations.
         */    za() {
            // Starts the idle time if we are in state 'Open' and are not yet already
            // running a timer (in which case the previous idle timeout still applies).
            this.Wa() && null === this.Ua && (this.Ua = this.Xr.Er(this.$a, 6e4, (() => this.Ha())));
        }
        /** Sends a message to the underlying stream. */    Ja(t) {
            this.Ya(), this.stream.send(t);
        }
        /** Called by the idle timer when the stream should close due to inactivity. */    async Ha() {
            if (this.Wa()) 
            // When timing out an idle stream there's no reason to force the stream into backoff when
            // it restarts so set the stream state to Initial instead of Error.
            return this.close(0 /* Initial */);
        }
        /** Marks the stream as active again. */    Ya() {
            this.Ua && (this.Ua.cancel(), this.Ua = null);
        }
        /**
         * Closes the stream and cleans up as necessary:
         *
         * * closes the underlying GRPC stream;
         * * calls the onClose handler with the given 'error';
         * * sets internal stream state to 'finalState';
         * * adjusts the backoff timer based on the error
         *
         * A new stream can be opened by calling start().
         *
         * @param finalState - the intended state of the stream after closing.
         * @param error - the error the connection was closed with.
         */    async close(t, e) {
            // Cancel any outstanding timers (they're guaranteed not to execute).
            this.Ya(), this.Ka.cancel(), 
            // Invalidates any stream-related callbacks (e.g. from auth or the
            // underlying stream), guaranteeing they won't execute.
            this.qa++, 3 /* Error */ !== t ? 
            // If this is an intentional close ensure we don't delay our next connection attempt.
            this.Ka.reset() : e && e.code === x$1.RESOURCE_EXHAUSTED ? (
            // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
            v$1(e.toString()), v$1("Using maximum backoff delay to prevent overloading the backend."), 
            this.Ka.ka()) : e && e.code === x$1.UNAUTHENTICATED && 
            // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
            // just expired.
            this.Ba._(), 
            // Clean up the underlying stream because we are no longer interested in events.
            null !== this.stream && (this.Xa(), this.stream.close(), this.stream = null), 
            // This state must be assigned before calling onClose() to allow the callback to
            // inhibit backoff or otherwise manipulate the state in its non-started state.
            this.state = t, 
            // Notify the listener that the stream closed.
            await this.listener.fa(e);
        }
        /**
         * Can be overridden to perform additional cleanup before the stream is closed.
         * Calling super.tearDown() is not required.
         */    Xa() {}
        auth() {
            this.state = 1 /* Starting */;
            const t = this.Za(this.qa), e = this.qa;
            // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                    this.Ba.getToken().then((t => {
                // Stream can be stopped while waiting for authentication.
                // TODO(mikelehen): We really should just use dispatchIfNotClosed
                // and let this dispatch onto the queue, but that opened a spec test can
                // of worms that I don't want to deal with in this PR.
                this.qa === e && 
                // Normally we'd have to schedule the callback on the AsyncQueue.
                // However, the following calls are safe to be called outside the
                // AsyncQueue since they don't chain asynchronous calls
                this.th(t);
            }), (e => {
                t((() => {
                    const t = new k$1(x$1.UNKNOWN, "Fetching auth token failed: " + e.message);
                    return this.eh(t);
                }));
            }));
        }
        th(t) {
            const e = this.Za(this.qa);
            this.stream = this.nh(t), this.stream.la((() => {
                e((() => (this.state = 2 /* Open */ , this.listener.la())));
            })), this.stream.fa((t => {
                e((() => this.eh(t)));
            })), this.stream.onMessage((t => {
                e((() => this.onMessage(t)));
            }));
        }
        ja() {
            this.state = 4 /* Backoff */ , this.Ka.Oa((async () => {
                this.state = 0 /* Initial */ , this.start();
            }));
        }
        // Visible for tests
        eh(t) {
            // In theory the stream could close cleanly, however, in our current model
            // we never expect this to happen because if we stop a stream ourselves,
            // this callback will never be called. To prevent cases where we retry
            // without a backoff accidentally, we set the stream to error in all cases.
            return p$1("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
        }
        /**
         * Returns a "dispatcher" function that dispatches operations onto the
         * AsyncQueue but only runs them if closeCount remains unchanged. This allows
         * us to turn auth / stream callbacks into no-ops if the stream is closed /
         * re-opened, etc.
         */    Za(t) {
            return e => {
                this.Xr.Rs((() => this.qa === t ? e() : (p$1("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve())));
            };
        }
    }

    /**
     * A PersistentStream that implements the Listen RPC.
     *
     * Once the Listen stream has called the onOpen() listener, any number of
     * listen() and unlisten() calls can be made to control what changes will be
     * sent from the server for ListenResponses.
     */ class zr extends Gr {
        constructor(t, e, n, s, i) {
            super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , e, n, i), 
            this.Ut = s;
        }
        nh(t) {
            return this.La.va("Listen", t);
        }
        onMessage(t) {
            // A successful response means the stream is healthy
            this.Ka.reset();
            const e = Xn(this.Ut, t), n = function(t) {
                // We have only reached a consistent snapshot for the entire stream if there
                // is a read_time set and it applies to all targets (i.e. the list of
                // targets is empty). The backend is guaranteed to send such responses.
                if (!("targetChange" in t)) return H$1.min();
                const e = t.targetChange;
                return e.targetIds && e.targetIds.length ? H$1.min() : e.readTime ? qn(e.readTime) : H$1.min();
            }(t);
            return this.listener.sh(e, n);
        }
        /**
         * Registers interest in the results of the given target. If the target
         * includes a resumeToken it will be included in the request. Results that
         * affect the target will be streamed back as WatchChange messages that
         * reference the targetId.
         */    ih(t) {
            const e = {};
            e.database = zn(this.Ut), e.addTarget = function(t, e) {
                let n;
                const s = e.target;
                return n = qt(s) ? {
                    documents: ns(t, s)
                } : {
                    query: ss(t, s)
                }, n.targetId = e.targetId, e.resumeToken.wt() > 0 ? n.resumeToken = Ln(t, e.resumeToken) : e.Ot.L(H$1.min()) > 0 && (
                // TODO(wuandy): Consider removing above check because it is most likely true.
                // Right now, many tests depend on this behaviour though (leaving min() out
                // of serialization).
                n.readTime = $n(t, e.Ot.q())), n;
            }(this.Ut, t);
            const n = rs(this.Ut, t);
            n && (e.labels = n), this.Ja(e);
        }
        /**
         * Unregisters interest in the results of the target associated with the
         * given targetId.
         */    rh(t) {
            const e = {};
            e.database = zn(this.Ut), e.removeTarget = t, this.Ja(e);
        }
    }

    /**
     * A Stream that implements the Write RPC.
     *
     * The Write RPC requires the caller to maintain special streamToken
     * state in between calls, to help the server understand which responses the
     * client has processed by the time the next request is made. Every response
     * will contain a streamToken; this value must be passed to the next
     * request.
     *
     * After calling start() on this stream, the next request must be a handshake,
     * containing whatever streamToken is on hand. Once a response to this
     * request is received, all pending mutations may be submitted. When
     * submitting multiple batches of mutations at the same time, it's
     * okay to use the same streamToken for the calls to writeMutations.
     *
     * TODO(b/33271235): Use proto types
     */ class Hr extends Gr {
        constructor(t, e, n, s, i) {
            super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , e, n, i), 
            this.Ut = s, this.oh = !1;
        }
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */    get uh() {
            return this.oh;
        }
        // Override of PersistentStream.start
        start() {
            this.oh = !1, this.lastStreamToken = void 0, super.start();
        }
        Xa() {
            this.oh && this.ah([]);
        }
        nh(t) {
            return this.La.va("Write", t);
        }
        onMessage(t) {
            if (
            // Always capture the last stream token.
            C(!!t.streamToken), this.lastStreamToken = t.streamToken, this.oh) {
                // A successful first write response means the stream is healthy,
                // Note, that we could consider a successful handshake healthy, however,
                // the write itself might be causing an error we want to back off from.
                this.Ka.reset();
                const e = es(t.writeResults, t.commitTime), n = qn(t.commitTime);
                return this.listener.hh(n, e);
            }
            // The first response is always the handshake response
            return C(!t.writeResults || 0 === t.writeResults.length), this.oh = !0, this.listener.lh();
        }
        /**
         * Sends an initial streamToken to the server, performing the handshake
         * required to make the StreamingWrite RPC work. Subsequent
         * calls should wait until onHandshakeComplete was called.
         */    _h() {
            // TODO(dimond): Support stream resumption. We intentionally do not set the
            // stream token on the handshake, ignoring any stream token we might have.
            const t = {};
            t.database = zn(this.Ut), this.Ja(t);
        }
        /** Sends a group of mutations to the Firestore backend to apply. */    ah(t) {
            const e = {
                streamToken: this.lastStreamToken,
                writes: t.map((t => Zn(this.Ut, t)))
            };
            this.Ja(e);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Datastore and its related methods are a wrapper around the external Google
     * Cloud Datastore grpc API, which provides an interface that is more convenient
     * for the rest of the client SDK architecture to consume.
     */
    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class Jr extends class {} {
        constructor(t, e, n) {
            super(), this.credentials = t, this.La = e, this.Ut = n, this.fh = !1;
        }
        dh() {
            if (this.fh) throw new k$1(x$1.FAILED_PRECONDITION, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    Pa(t, e, n) {
            return this.dh(), this.credentials.getToken().then((s => this.La.Pa(t, e, n, s))).catch((t => {
                throw t.code === x$1.UNAUTHENTICATED && this.credentials._(), t;
            }));
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    pa(t, e, n) {
            return this.dh(), this.credentials.getToken().then((s => this.La.pa(t, e, n, s))).catch((t => {
                throw t.code === x$1.UNAUTHENTICATED && this.credentials._(), t;
            }));
        }
        terminate() {
            this.fh = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    /**
     * A component used by the RemoteStore to track the OnlineState (that is,
     * whether or not the client as a whole should be considered to be online or
     * offline), implementing the appropriate heuristics.
     *
     * In particular, when the client is trying to connect to the backend, we
     * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
     * a connection to succeed. If we have too many failures or the timeout elapses,
     * then we set the OnlineState to Offline, and the client will behave as if
     * it is offline (get()s will return cached data, etc.).
     */
    class Yr {
        constructor(t, e) {
            this.ls = t, this.au = e, 
            /** The current OnlineState. */
            this.state = "Unknown" /* Unknown */ , 
            /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
            this.wh = 0, 
            /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
            this.Eh = null, 
            /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
            this.Th = !0;
        }
        /**
         * Called by RemoteStore when a watch stream is started (including on each
         * backoff attempt).
         *
         * If this is the first attempt, it sets the OnlineState to Unknown and starts
         * the onlineStateTimer.
         */    Ih() {
            0 === this.wh && (this.Ah("Unknown" /* Unknown */), this.Eh = this.ls.Er("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (() => (this.Eh = null, 
            this.mh("Backend didn't respond within 10 seconds."), this.Ah("Offline" /* Offline */), 
            Promise.resolve()))));
        }
        /**
         * Updates our OnlineState as appropriate after the watch stream reports a
         * failure. The first failure moves us to the 'Unknown' state. We then may
         * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
         * actually transition to the 'Offline' state.
         */    Rh(t) {
            "Online" /* Online */ === this.state ? this.Ah("Unknown" /* Unknown */) : (this.wh++, 
            this.wh >= 1 && (this.Ph(), this.mh("Connection failed 1 times. Most recent error: " + t.toString()), 
            this.Ah("Offline" /* Offline */)));
        }
        /**
         * Explicitly sets the OnlineState to the specified state.
         *
         * Note that this resets our timers / failure counters, etc. used by our
         * Offline heuristics, so must not be used in place of
         * handleWatchStreamStart() and handleWatchStreamFailure().
         */    set(t) {
            this.Ph(), this.wh = 0, "Online" /* Online */ === t && (
            // We've connected to watch at least once. Don't warn the developer
            // about being offline going forward.
            this.Th = !1), this.Ah(t);
        }
        Ah(t) {
            t !== this.state && (this.state = t, this.au(t));
        }
        mh(t) {
            const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
            this.Th ? (v$1(e), this.Th = !1) : p$1("OnlineStateTracker", e);
        }
        Ph() {
            null !== this.Eh && (this.Eh.cancel(), this.Eh = null);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Xr {
        constructor(
        /**
         * The local store, used to fill the write pipeline with outbound mutations.
         */
        t, 
        /** The client-side proxy for interacting with the backend. */
        e, n, s, i) {
            this.Vh = t, this.gh = e, this.ls = n, this.yh = {}, 
            /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
            this.ph = [], 
            /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
            this.bh = new Map, 
            /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
            this.Sh = new Set, 
            /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
            this.Dh = [], this.Ch = i, this.Ch.na((t => {
                n.Rs((async () => {
                    // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                    // network becomes unreachable as we don't have any other way to tear
                    // down our streams.
                    co(this) && (p$1("RemoteStore", "Restarting streams for network reachability change."), 
                    await async function(t) {
                        const e = N$1(t);
                        e.Sh.add(4 /* ConnectivityChange */), await to(e), e.Nh.set("Unknown" /* Unknown */), 
                        e.Sh.delete(4 /* ConnectivityChange */), await Zr(e);
                    }(this));
                }));
            })), this.Nh = new Yr(n, s);
        }
    }

    async function Zr(t) {
        if (co(t)) for (const e of t.Dh) await e(/* enabled= */ !0);
    }

    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */ async function to(t) {
        for (const e of t.Dh) await e(/* enabled= */ !1);
    }

    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    function eo(t, e) {
        const n = N$1(t);
        n.bh.has(e.targetId) || (
        // Mark this as something the client is currently listening for.
        n.bh.set(e.targetId, e), oo(n) ? 
        // The listen will be sent in onWatchStreamOpen
        ro(n) : yo(n).Wa() && so(n, e));
    }

    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */ function no(t, e) {
        const n = N$1(t), s = yo(n);
        n.bh.delete(e), s.Wa() && io(n, e), 0 === n.bh.size && (s.Wa() ? s.za() : co(n) && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        n.Nh.set("Unknown" /* Unknown */));
    }

    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */ function so(t, e) {
        t.xh.rn(e.targetId), yo(t).ih(e);
    }

    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */ function io(t, e) {
        t.xh.rn(e), yo(t).rh(e);
    }

    function ro(t) {
        t.xh = new Nn({
            vn: e => t.yh.vn(e),
            bn: e => t.bh.get(e) || null
        }), yo(t).start(), t.Nh.Ih();
    }

    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */ function oo(t) {
        return co(t) && !yo(t).Qa() && t.bh.size > 0;
    }

    function co(t) {
        return 0 === N$1(t).Sh.size;
    }

    function uo(t) {
        t.xh = void 0;
    }

    async function ao(t) {
        t.bh.forEach(((e, n) => {
            so(t, e);
        }));
    }

    async function ho(t, e) {
        uo(t), 
        // If we still need the watch stream, retry the connection.
        oo(t) ? (t.Nh.Rh(e), ro(t)) : 
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        t.Nh.set("Unknown" /* Unknown */);
    }

    async function lo(t, e, n) {
        if (
        // Mark the client as online since we got a message from the server
        t.Nh.set("Online" /* Online */), e instanceof Dn && 2 /* Removed */ === e.state && e.cause) 
        // There was an error on a target, don't wait for a consistent snapshot
        // to raise events
        try {
            await 
            /** Handles an error on a target */
            async function(t, e) {
                const n = e.cause;
                for (const s of e.targetIds) 
                // A watched target might have been removed already.
                t.bh.has(s) && (await t.yh.kh(s, n), t.bh.delete(s), t.xh.removeTarget(s));
            }
            /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */ (t, e);
        } catch (n) {
            p$1("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), 
            await _o(t, n);
        } else if (e instanceof bn ? t.xh.fn(e) : e instanceof Sn ? t.xh.Rn(e) : t.xh.En(e), 
        !n.isEqual(H$1.min())) try {
            const e = await ar(t.Vh);
            n.L(e) >= 0 && 
            // We have received a target change with a global snapshot if the snapshot
            // version is not equal to SnapshotVersion.min().
            await 
            /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
            function(t, e) {
                const n = t.xh.gn(e);
                // Update in-memory resume tokens. LocalStore will update the
                // persistent view of these when applying the completed RemoteEvent.
                            return n.xe.forEach(((n, s) => {
                    if (n.resumeToken.wt() > 0) {
                        const i = t.bh.get(s);
                        // A watched target might have been removed already.
                                            i && t.bh.set(s, i.Ft(n.resumeToken, e));
                    }
                })), 
                // Re-establish listens for the targets that have been invalidated by
                // existence filter mismatches.
                n.ke.forEach((e => {
                    const n = t.bh.get(e);
                    if (!n) 
                    // A watched target might have been removed already.
                    return;
                    // Clear the resume token for the target, since we're in a known mismatch
                    // state.
                                    t.bh.set(e, n.Ft(rt.Et, n.Ot)), 
                    // Cause a hard reset by unwatching and rewatching immediately, but
                    // deliberately don't send a resume token so that we get a full update.
                    io(t, e);
                    // Mark the target we send as being on behalf of an existence filter
                    // mismatch, but don't actually retain that in listenTargets. This ensures
                    // that we flag the first re-listen this way without impacting future
                    // listens of this target (that might happen e.g. on reconnect).
                    const s = new Re(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                    so(t, s);
                })), t.yh.Oh(n);
            }(t, n);
        } catch (e) {
            p$1("RemoteStore", "Failed to raise snapshot:", e), await _o(t, e);
        }
    }

    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * `op` succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
     * validated via a generic operation.
     *
     * The returned Promise is resolved once the network is disabled and before
     * any retry attempt.
     */ async function _o(t, e, n) {
        if (!Vs(e)) throw e;
        t.Sh.add(1 /* IndexedDbFailed */), 
        // Disable network and raise offline snapshots
        await to(t), t.Nh.set("Offline" /* Offline */), n || (
        // Use a simple read operation to determine if IndexedDB recovered.
        // Ideally, we would expose a health check directly on SimpleDb, but
        // RemoteStore only has access to persistence through LocalStore.
        n = () => ar(t.Vh)), 
        // Probe IndexedDB periodically and re-enable network
        t.ls.yo((async () => {
            p$1("RemoteStore", "Retrying IndexedDB access"), await n(), t.Sh.delete(1 /* IndexedDbFailed */), 
            await Zr(t);
        }));
    }

    /**
     * Executes `op`. If `op` fails, takes the network offline until `op`
     * succeeds. Returns after the first attempt.
     */ function fo(t, e) {
        return e().catch((n => _o(t, n, e)));
    }

    async function wo(t) {
        const e = N$1(t), n = po(e);
        let s = e.ph.length > 0 ? e.ph[e.ph.length - 1].batchId : -1;
        for (;Eo(e); ) try {
            const t = await lr(e.Vh, s);
            if (null === t) {
                0 === e.ph.length && n.za();
                break;
            }
            s = t.batchId, To(e, t);
        } catch (t) {
            await _o(e, t);
        }
        Io(e) && Ao(e);
    }

    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */ function Eo(t) {
        return co(t) && t.ph.length < 10;
    }

    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */ function To(t, e) {
        t.ph.push(e);
        const n = po(t);
        n.Wa() && n.uh && n.ah(e.mutations);
    }

    function Io(t) {
        return co(t) && !po(t).Qa() && t.ph.length > 0;
    }

    function Ao(t) {
        po(t).start();
    }

    async function mo(t) {
        po(t)._h();
    }

    async function Ro(t) {
        const e = po(t);
        // Send the write pipeline now that the stream is established.
            for (const n of t.ph) e.ah(n.mutations);
    }

    async function Po(t, e, n) {
        const s = t.ph.shift(), i = ni.from(s, e, n);
        await fo(t, (() => t.yh.Mh(i))), 
        // It's possible that with the completion of this mutation another
        // slot has freed up.
        await wo(t);
    }

    async function Vo(t, e) {
        // If the write stream closed after the write handshake completes, a write
        // operation failed and we fail the pending operation.
        e && po(t).uh && 
        // This error affects the actual write.
        await async function(t, e) {
            // Only handle permanent errors here. If it's transient, just let the retry
            // logic kick in.
            if (n = e.code, on(n) && n !== x$1.ABORTED) {
                // This was a permanent error, the request itself was the problem
                // so it's not going to succeed if we resend it.
                const n = t.ph.shift();
                // In this case it's also unlikely that the server itself is melting
                // down -- this was just a bad request so inhibit backoff on the next
                // restart.
                            po(t).Ga(), await fo(t, (() => t.yh.Fh(n.batchId, e))), 
                // It's possible that with the completion of this mutation
                // another slot has freed up.
                await wo(t);
            }
            var n;
        }(t, e), 
        // The write stream might have been started by refilling the write
        // pipeline for failed writes
        Io(t) && Ao(t);
    }

    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */
    async function go(t, e) {
        const n = N$1(t);
        e ? (n.Sh.delete(2 /* IsSecondary */), await Zr(n)) : e || (n.Sh.add(2 /* IsSecondary */), 
        await to(n), n.Nh.set("Unknown" /* Unknown */));
    }

    /**
     * If not yet initialized, registers the WatchStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function yo(t) {
        return t.$h || (
        // Create stream (but note that it is not started yet).
        t.$h = function(t, e, n) {
            const s = N$1(t);
            return s.dh(), new zr(e, s.La, s.credentials, s.Ut, n);
        }
        /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.gh, t.ls, {
            la: ao.bind(null, t),
            fa: ho.bind(null, t),
            sh: lo.bind(null, t)
        }), t.Dh.push((async e => {
            e ? (t.$h.Ga(), oo(t) ? ro(t) : t.Nh.set("Unknown" /* Unknown */)) : (await t.$h.stop(), 
            uo(t));
        }))), t.$h;
    }

    /**
     * If not yet initialized, registers the WriteStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function po(t) {
        return t.Lh || (
        // Create stream (but note that it is not started yet).
        t.Lh = function(t, e, n) {
            const s = N$1(t);
            return s.dh(), new Hr(e, s.La, s.credentials, s.Ut, n);
        }(t.gh, t.ls, {
            la: mo.bind(null, t),
            fa: Vo.bind(null, t),
            lh: Ro.bind(null, t),
            hh: Po.bind(null, t)
        }), t.Dh.push((async e => {
            e ? (t.Lh.Ga(), 
            // This will start the write stream if necessary.
            await wo(t)) : (await t.Lh.stop(), t.ph.length > 0 && (p$1("RemoteStore", `Stopping write stream with ${t.ph.length} pending writes`), 
            t.ph = []));
        }))), t.Lh;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Holds the listeners and the last received ViewSnapshot for a query being
     * tracked by EventManager.
     */ class vo {
        constructor() {
            this.Bh = void 0, this.listeners = [];
        }
    }

    class bo {
        constructor() {
            this.queries = new gi((t => Ee(t)), we), this.onlineState = "Unknown" /* Unknown */ , 
            this.qh = new Set;
        }
    }

    async function So(t, e) {
        const n = N$1(t), s = e.query;
        let i = !1, r = n.queries.get(s);
        if (r || (i = !0, r = new vo), i) try {
            r.Bh = await n.Uh(s);
        } catch (t) {
            const n = Ss(t, `Initialization of query '${Te(e.query)}' failed`);
            return void e.onError(n);
        }
        n.queries.set(s, r), r.listeners.push(e);
        // Run global snapshot listeners if a consistent snapshot has been emitted.
        e.Kh(n.onlineState);
        if (r.Bh) {
            e.Qh(r.Bh) && xo(n);
        }
    }

    async function Do(t, e) {
        const n = N$1(t), s = e.query;
        let i = !1;
        const r = n.queries.get(s);
        if (r) {
            const t = r.listeners.indexOf(e);
            t >= 0 && (r.listeners.splice(t, 1), i = 0 === r.listeners.length);
        }
        if (i) return n.queries.delete(s), n.Wh(s);
    }

    function Co(t, e) {
        const n = N$1(t);
        let s = !1;
        for (const t of e) {
            const e = t.query, i = n.queries.get(e);
            if (i) {
                for (const e of i.listeners) e.Qh(t) && (s = !0);
                i.Bh = t;
            }
        }
        s && xo(n);
    }

    function No(t, e, n) {
        const s = N$1(t), i = s.queries.get(e);
        if (i) for (const t of i.listeners) t.onError(n);
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
            s.queries.delete(e);
    }

    // Call all global snapshot listeners that have been set.
    function xo(t) {
        t.qh.forEach((t => {
            t.next();
        }));
    }

    /**
     * QueryListener takes a series of internal view snapshots and determines
     * when to raise the event.
     *
     * It uses an Observer to dispatch events.
     */ class ko {
        constructor(t, e, n) {
            this.query = t, this.jh = e, 
            /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
            this.Gh = !1, this.zh = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {};
        }
        /**
         * Applies the new ViewSnapshot to this listener, raising a user-facing event
         * if applicable (depending on what changed, whether the user has opted into
         * metadata-only changes, etc.). Returns true if a user-facing event was
         * indeed raised.
         */    Qh(t) {
            if (!this.options.includeMetadataChanges) {
                // Remove the metadata only changes.
                const e = [];
                for (const n of t.docChanges) 3 /* Metadata */ !== n.type && e.push(n);
                t = new yn(t.query, t.docs, t.be, e, t.Se, t.fromCache, t.De, 
                /* excludesMetadataChanges= */ !0);
            }
            let e = !1;
            return this.Gh ? this.Hh(t) && (this.jh.next(t), e = !0) : this.Jh(t, this.onlineState) && (this.Yh(t), 
            e = !0), this.zh = t, e;
        }
        onError(t) {
            this.jh.error(t);
        }
        /** Returns whether a snapshot was raised. */    Kh(t) {
            this.onlineState = t;
            let e = !1;
            return this.zh && !this.Gh && this.Jh(this.zh, t) && (this.Yh(this.zh), e = !0), 
            e;
        }
        Jh(t, e) {
            // Always raise the first event when we're synced
            if (!t.fromCache) return !0;
            // NOTE: We consider OnlineState.Unknown as online (it should become Offline
            // or Online if we wait long enough).
                    const n = "Offline" /* Offline */ !== e;
            // Don't raise the event if we're online, aren't synced yet (checked
            // above) and are waiting for a sync.
                    return (!this.options.Xh || !n) && (!t.docs.Y() || "Offline" /* Offline */ === e);
            // Raise data from cache if we have any documents or we are offline
            }
        Hh(t) {
            // We don't need to handle includeDocumentMetadataChanges here because
            // the Metadata only changes have already been stripped out if needed.
            // At this point the only changes we will see are the ones we should
            // propagate.
            if (t.docChanges.length > 0) return !0;
            const e = this.zh && this.zh.hasPendingWrites !== t.hasPendingWrites;
            return !(!t.De && !e) && !0 === this.options.includeMetadataChanges;
            // Generally we should have hit one of the cases above, but it's possible
            // to get here if there were only metadata docChanges and they got
            // stripped out.
            }
        Yh(t) {
            t = yn.Ne(t.query, t.docs, t.Se, t.fromCache), this.Gh = !0, this.jh.next(t);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Oo {
        constructor(t) {
            this.key = t;
        }
    }

    class Mo {
        constructor(t) {
            this.key = t;
        }
    }

    /**
     * View is responsible for computing the final merged truth of what docs are in
     * a query. It gets notified of local and remote changes to docs, and applies
     * the query filters and limits to determine the most correct possible results.
     */ class Fo {
        constructor(t, 
        /** Documents included in the remote target */
        e) {
            this.query = t, this.Zh = e, this.tl = null, 
            /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
            this.Le = !1, 
            /** Documents in the view but not in the remote target */
            this.el = mn(), 
            /** Document Keys that have local changes */
            this.Se = mn(), this.nl = Ae(t), this.sl = new Vn(this.nl);
        }
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */    get il() {
            return this.Zh;
        }
        /**
         * Iterates over a set of doc changes, applies the query limit, and computes
         * what the new results should be, what the changes were, and whether we may
         * need to go back to the local cache for more results. Does not make any
         * changes to the view.
         * @param docChanges - The doc changes to apply to this view.
         * @param previousChanges - If this is being called with a refill, then start
         *        with this set of docs and changes instead of the current view.
         * @returns a new set of docs, changes, and refill flag.
         */    rl(t, e) {
            const n = e ? e.ol : new gn, s = e ? e.sl : this.sl;
            let i = e ? e.Se : this.Se, r = s, o = !1;
            // Track the last doc in a (full) limit. This is necessary, because some
            // update (a delete, or an update moving a doc past the old limit) might
            // mean there is some other document in the local cache that either should
            // come (1) between the old last limit doc and the new last document, in the
            // case of updates, or (2) after the new last document, in the case of
            // deletes. So we keep this doc at the old limit to compare the updates to.
            // Note that this should never get used in a refill (when previousChanges is
            // set), because there will only be adds -- no deletes or updates.
            const c = ce(this.query) && s.size === this.query.limit ? s.last() : null, u = ue(this.query) && s.size === this.query.limit ? s.first() : null;
            // Drop documents out to meet limit/limitToLast requirement.
            if (t.Yt(((t, e) => {
                const a = s.get(t);
                let h = e instanceof xt ? e : null;
                h && (h = Ie(this.query, h) ? h : null);
                const l = !!a && this.Se.has(a.key), _ = !!h && (h.gt || 
                // We only consider committed mutations for documents that were
                // mutated during the lifetime of the view.
                this.Se.has(h.key) && h.hasCommittedMutations);
                let f = !1;
                // Calculate change
                            if (a && h) {
                    a.data().isEqual(h.data()) ? l !== _ && (n.track({
                        type: 3 /* Metadata */ ,
                        doc: h
                    }), f = !0) : this.cl(a, h) || (n.track({
                        type: 2 /* Modified */ ,
                        doc: h
                    }), f = !0, (c && this.nl(h, c) > 0 || u && this.nl(h, u) < 0) && (
                    // This doc moved from inside the limit to outside the limit.
                    // That means there may be some other doc in the local cache
                    // that should be included instead.
                    o = !0));
                } else !a && h ? (n.track({
                    type: 0 /* Added */ ,
                    doc: h
                }), f = !0) : a && !h && (n.track({
                    type: 1 /* Removed */ ,
                    doc: a
                }), f = !0, (c || u) && (
                // A doc was removed from a full limit query. We'll need to
                // requery from the local cache to see if we know about some other
                // doc that should be in the results.
                o = !0));
                f && (h ? (r = r.add(h), i = _ ? i.add(t) : i.delete(t)) : (r = r.delete(t), i = i.delete(t)));
            })), ce(this.query) || ue(this.query)) for (;r.size > this.query.limit; ) {
                const t = ce(this.query) ? r.last() : r.first();
                r = r.delete(t.key), i = i.delete(t.key), n.track({
                    type: 1 /* Removed */ ,
                    doc: t
                });
            }
            return {
                sl: r,
                ol: n,
                ac: o,
                Se: i
            };
        }
        cl(t, e) {
            // We suppress the initial change event for documents that were modified as
            // part of a write acknowledgment (e.g. when the value of a server transform
            // is applied) as Watch will send us the same document again.
            // By suppressing the event, we only raise two user visible events (one with
            // `hasPendingWrites` and the final state of the document) instead of three
            // (one with `hasPendingWrites`, the modified document with
            // `hasPendingWrites` and the final state of the document).
            return t.gt && e.hasCommittedMutations && !e.gt;
        }
        /**
         * Updates the view with the given ViewDocumentChanges and optionally updates
         * limbo docs and sync state from the provided target change.
         * @param docChanges - The set of changes to make to the view's docs.
         * @param updateLimboDocuments - Whether to update limbo documents based on
         *        this change.
         * @param targetChange - A target change to apply for computing limbo docs and
         *        sync state.
         * @returns A new ViewChange with the given docs, changes, and sync state.
         */
        // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
        di(t, e, n) {
            const s = this.sl;
            this.sl = t.sl, this.Se = t.Se;
            // Sort changes based on type and query comparator
            const i = t.ol.ve();
            i.sort(((t, e) => function(t, e) {
                const n = t => {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return D$1();
                    }
                };
                return n(t) - n(e);
            }
            /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.type, e.type) || this.nl(t.doc, e.doc))), this.ul(n);
            const r = e ? this.al() : [], o = 0 === this.el.size && this.Le ? 1 /* Synced */ : 0 /* Local */ , c = o !== this.tl;
            if (this.tl = o, 0 !== i.length || c) {
                return {
                    snapshot: new yn(this.query, t.sl, s, i, t.Se, 0 /* Local */ === o, c, 
                    /* excludesMetadataChanges= */ !1),
                    hl: r
                };
            }
            // no changes
            return {
                hl: r
            };
        }
        /**
         * Applies an OnlineState change to the view, potentially generating a
         * ViewChange if the view's syncState changes as a result.
         */    Kh(t) {
            return this.Le && "Offline" /* Offline */ === t ? (
            // If we're offline, set `current` to false and then call applyChanges()
            // to refresh our syncState and generate a ViewChange as appropriate. We
            // are guaranteed to get a new TargetChange that sets `current` back to
            // true once the client is back online.
            this.Le = !1, this.di({
                sl: this.sl,
                ol: new gn,
                Se: this.Se,
                ac: !1
            }, 
            /* updateLimboDocuments= */ !1)) : {
                hl: []
            };
        }
        /**
         * Returns whether the doc for the given key should be in limbo.
         */    ll(t) {
            // If the remote end says it's part of this query, it's not in limbo.
            return !this.Zh.has(t) && (
            // The local store doesn't think it's a result, so it shouldn't be in limbo.
            !!this.sl.has(t) && !this.sl.get(t).gt);
        }
        /**
         * Updates syncedDocuments, current, and limbo docs based on the given change.
         * Returns the list of changes to which docs are in limbo.
         */    ul(t) {
            t && (t.Be.forEach((t => this.Zh = this.Zh.add(t))), t.qe.forEach((t => {})), t.Ue.forEach((t => this.Zh = this.Zh.delete(t))), 
            this.Le = t.Le);
        }
        al() {
            // We can only determine limbo documents when we're in-sync with the server.
            if (!this.Le) return [];
            // TODO(klimt): Do this incrementally so that it's not quadratic when
            // updating many documents.
                    const t = this.el;
            this.el = mn(), this.sl.forEach((t => {
                this.ll(t.key) && (this.el = this.el.add(t.key));
            }));
            // Diff the new limbo docs with the old limbo docs.
            const e = [];
            return t.forEach((t => {
                this.el.has(t) || e.push(new Mo(t));
            })), this.el.forEach((n => {
                t.has(n) || e.push(new Oo(n));
            })), e;
        }
        /**
         * Update the in-memory state of the current view with the state read from
         * persistence.
         *
         * We update the query view whenever a client's primary status changes:
         * - When a client transitions from primary to secondary, it can miss
         *   LocalStorage updates and its query views may temporarily not be
         *   synchronized with the state on disk.
         * - For secondary to primary transitions, the client needs to update the list
         *   of `syncedDocuments` since secondary clients update their query views
         *   based purely on synthesized RemoteEvents.
         *
         * @param queryResult.documents - The documents that match the query according
         * to the LocalStore.
         * @param queryResult.remoteKeys - The keys of the documents that match the
         * query according to the backend.
         *
         * @returns The ViewChange that resulted from this synchronization.
         */
        // PORTING NOTE: Multi-tab only.
        _l(t) {
            this.Zh = t.Ac, this.el = mn();
            const e = this.rl(t.documents);
            return this.di(e, /*updateLimboDocuments=*/ !0);
        }
        /**
         * Returns a view snapshot as if this query was just listened to. Contains
         * a document add for every existing document and the `fromCache` and
         * `hasPendingWrites` status of the already established view.
         */
        // PORTING NOTE: Multi-tab only.
        fl() {
            return yn.Ne(this.query, this.sl, this.Se, 0 /* Local */ === this.tl);
        }
    }

    /**
     * QueryView contains all of the data that SyncEngine needs to keep track of for
     * a particular query.
     */
    class $o {
        constructor(
        /**
         * The query itself.
         */
        t, 
        /**
         * The target number created by the client that is used in the watch
         * stream to identify this query.
         */
        e, 
        /**
         * The view is responsible for computing the final merged truth of what
         * docs are in the query. It gets notified of local and remote changes,
         * and applies the query filters and limits to determine the most correct
         * possible results.
         */
        n) {
            this.query = t, this.targetId = e, this.view = n;
        }
    }

    /** Tracks a limbo resolution. */ class Lo {
        constructor(t) {
            this.key = t, 
            /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
            this.dl = !1;
        }
    }

    /**
     * An implementation of `SyncEngine` coordinating with other parts of SDK.
     *
     * The parts of SyncEngine that act as a callback to RemoteStore need to be
     * registered individually. This is done in `syncEngineWrite()` and
     * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
     * serve as entry points to RemoteStore's functionality.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */ class Bo {
        constructor(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        s, i, r) {
            this.Vh = t, this.wl = e, this.El = n, this.Tl = s, this.currentUser = i, this.Il = r, 
            this.Al = {}, this.ml = new gi((t => Ee(t)), we), this.Rl = new Map, 
            /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query.
             */
            this.Pl = [], 
            /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
            this.Vl = new un(tt.K), 
            /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
            this.gl = new Map, this.yl = new Ar, 
            /** Stores user completion handlers, indexed by User and BatchId. */
            this.pl = {}, 
            /** Stores user callbacks waiting for all pending writes to be acknowledged. */
            this.vl = new Map, this.bl = xi.$i(), this.onlineState = "Unknown" /* Unknown */ , 
            // The primary state is set to `true` or `false` immediately after Firestore
            // startup. In the interim, a client should only be considered primary if
            // `isPrimary` is true.
            this.Sl = void 0;
        }
        get Dl() {
            return !0 === this.Sl;
        }
    }

    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    async function qo(t, e) {
        const n = Ec$1(t);
        let s, i;
        const r = n.ml.get(e);
        if (r) 
        // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
        // already exists when EventManager calls us for the first time. This
        // happens when the primary tab is already listening to this query on
        // behalf of another tab and the user of the primary also starts listening
        // to the query. EventManager will not have an assigned target ID in this
        // case and calls `listen` to obtain this ID.
        s = r.targetId, n.Tl.Cu(s), i = r.view.fl(); else {
            const t = await _r(n.Vh, fe(e)), r = n.Tl.Cu(t.targetId);
            s = t.targetId, i = await Uo(n, e, s, "current" === r), n.Dl && eo(n.wl, t);
        }
        return i;
    }

    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */ async function Uo(t, e, n, s) {
        // PORTING NOTE: On Web only, we inject the code that registers new Limbo
        // targets based on view changes. This allows us to only depend on Limbo
        // changes when user code includes queries.
        t.Cl = (e, n, s) => async function(t, e, n, s) {
            let i = e.view.rl(n);
            i.ac && (
            // The query has a limit and some docs were removed, so we need
            // to re-run the query against the local store to make sure we
            // didn't lose any good docs that had been past the limit.
            i = await dr(t.Vh, e.query, 
            /* usePreviousResults= */ !1).then((({documents: t}) => e.view.rl(t, i))));
            const r = s && s.xe.get(e.targetId), o = e.view.di(i, 
            /* updateLimboDocuments= */ t.Dl, r);
            return ec$1(t, e.targetId, o.hl), o.snapshot;
        }(t, e, n, s);
        const i = await dr(t.Vh, e, 
        /* usePreviousResults= */ !0), r = new Fo(e, i.Ac), o = r.rl(i.documents), c = vn.$e(n, s && "Offline" /* Offline */ !== t.onlineState), u = r.di(o, 
        /* updateLimboDocuments= */ t.Dl, c);
        ec$1(t, n, u.hl);
        const a = new $o(e, n, r);
        return t.ml.set(e, a), t.Rl.has(n) ? t.Rl.get(n).push(e) : t.Rl.set(n, [ e ]), u.snapshot;
    }

    /** Stops listening to the query. */ async function Ko(t, e) {
        const n = N$1(t), s = n.ml.get(e), i = n.Rl.get(s.targetId);
        if (i.length > 1) return n.Rl.set(s.targetId, i.filter((t => !we(t, e)))), void n.ml.delete(e);
        // No other queries are mapped to the target, clean up the query and the target.
            if (n.Dl) {
            // We need to remove the local query target first to allow us to verify
            // whether any other client is still interested in this target.
            n.Tl.xu(s.targetId);
            n.Tl.pu(s.targetId) || await fr(n.Vh, s.targetId, 
            /*keepPersistedTargetData=*/ !1).then((() => {
                n.Tl.Ou(s.targetId), no(n.wl, s.targetId), Zo(n, s.targetId);
            })).catch(Vi);
        } else Zo(n, s.targetId), await fr(n.Vh, s.targetId, 
        /*keepPersistedTargetData=*/ !0);
    }

    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */ async function Qo(t, e, n) {
        const s = Tc$1(t);
        try {
            const t = await function(t, e) {
                const n = N$1(t), s = z$1.now(), i = e.reduce(((t, e) => t.add(e.key)), mn());
                let r;
                return n.persistence.runTransaction("Locally write mutations", "readwrite", (t => n.wc.Jo(t, i).next((i => {
                    r = i;
                    // For non-idempotent mutations (such as `FieldValue.increment()`),
                    // we record the base state in a separate patch mutation. This is
                    // later used to guarantee consistent values and prevents flicker
                    // even if the backend sends us an update that already includes our
                    // transform.
                    const o = [];
                    for (const t of e) {
                        const e = We(t, r.get(t.key));
                        null != e && 
                        // NOTE: The base state should only be applied if there's some
                        // existing document to override, so use a Precondition of
                        // exists=true
                        o.push(new He(t.key, e, Ct(e.proto.mapValue), Be.exists(!0)));
                    }
                    return n.jo.mi(t, s, o, e);
                })))).then((t => {
                    const e = t.Cs(r);
                    return {
                        batchId: t.batchId,
                        ii: e
                    };
                }));
            }(s.Vh, e);
            s.Tl.vu(t.batchId), function(t, e, n) {
                let s = t.pl[t.currentUser.i()];
                s || (s = new un(W$1));
                s = s.Gt(e, n), t.pl[t.currentUser.i()] = s;
            }
            /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */ (s, t.batchId, n), await ic$1(s, t.ii), await wo(s.wl);
        } catch (t) {
            // If we can't persist the mutation, we reject the user callback and
            // don't send the mutation. The user can then retry the write.
            const e = Ss(t, "Failed to persist write");
            n.reject(e);
        }
    }

    /**
     * Applies one remote event to the sync engine, notifying any views of the
     * changes, and releasing any pending mutation batches that would become
     * visible because of the snapshot version the remote event contains.
     */ async function Wo(t, e) {
        const n = N$1(t);
        try {
            const t = await hr(n.Vh, e);
            // Update `receivedDocument` as appropriate for any limbo targets.
                    e.xe.forEach(((t, e) => {
                const s = n.gl.get(e);
                s && (
                // Since this is a limbo resolution lookup, it's for a single document
                // and it could be added, modified, or removed, but not a combination.
                C(t.Be.size + t.qe.size + t.Ue.size <= 1), t.Be.size > 0 ? s.dl = !0 : t.qe.size > 0 ? C(s.dl) : t.Ue.size > 0 && (C(s.dl), 
                s.dl = !1));
            })), await ic$1(n, t, e);
        } catch (t) {
            await Vi(t);
        }
    }

    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */ function jo(t, e, n) {
        const s = N$1(t);
        // If we are the secondary client, we explicitly ignore the remote store's
        // online state (the local client may go offline, even though the primary
        // tab remains online) and only apply the primary tab's online state from
        // SharedClientState.
            if (s.Dl && 0 /* RemoteStore */ === n || !s.Dl && 1 /* SharedClientState */ === n) {
            const t = [];
            s.ml.forEach(((n, s) => {
                const i = s.view.Kh(e);
                i.snapshot && t.push(i.snapshot);
            })), function(t, e) {
                const n = N$1(t);
                n.onlineState = e;
                let s = !1;
                n.queries.forEach(((t, n) => {
                    for (const t of n.listeners) 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.Kh(e) && (s = !0);
                })), s && xo(n);
            }(s.El, e), t.length && s.Al.sh(t), s.onlineState = e, s.Dl && s.Tl.Lu(e);
        }
    }

    /**
     * Rejects the listen for the given targetID. This can be triggered by the
     * backend for any active target.
     *
     * @param syncEngine - The sync engine implementation.
     * @param targetId - The targetID corresponds to one previously initiated by the
     * user as part of TargetData passed to listen() on RemoteStore.
     * @param err - A description of the condition that has forced the rejection.
     * Nearly always this will be an indication that the user is no longer
     * authorized to see the data matching the target.
     */ async function Go(t, e, n) {
        const s = N$1(t);
        // PORTING NOTE: Multi-tab only.
            s.Tl.Mu(e, "rejected", n);
        const i = s.gl.get(e), r = i && i.key;
        if (r) {
            // TODO(klimt): We really only should do the following on permission
            // denied errors, but we don't have the cause code here.
            // It's a limbo doc. Create a synthetic event saying it was deleted.
            // This is kind of a hack. Ideally, we would have a method in the local
            // store to purge a document. However, it would be tricky to keep all of
            // the local store's invariants with another method.
            let t = new un(tt.K);
            t = t.Gt(r, new kt(r, H$1.min()));
            const n = mn().add(r), i = new pn(H$1.min(), 
            /* targetChanges= */ new Map, 
            /* targetMismatches= */ new ln(W$1), t, n);
            await Wo(s, i), 
            // Since this query failed, we won't want to manually unlisten to it.
            // We only remove it from bookkeeping after we successfully applied the
            // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
            // this query when the RemoteStore restarts the Watch stream, which should
            // re-trigger the target failure.
            s.Vl = s.Vl.remove(r), s.gl.delete(e), sc$1(s);
        } else await fr(s.Vh, e, 
        /* keepPersistedTargetData */ !1).then((() => Zo(s, e, n))).catch(Vi);
    }

    async function zo(t, e) {
        const n = N$1(t), s = e.batch.batchId;
        try {
            const t = await ur(n.Vh, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught
            // up), so we raise user callbacks first so that they consistently happen
            // before listen events.
                    Xo(n, s, /*error=*/ null), Yo(n, s), n.Tl.Su(s, "acknowledged"), await ic$1(n, t);
        } catch (t) {
            await Vi(t);
        }
    }

    async function Ho(t, e, n) {
        const s = N$1(t);
        try {
            const t = await function(t, e) {
                const n = N$1(t);
                return n.persistence.runTransaction("Reject batch", "readwrite-primary", (t => {
                    let s;
                    return n.jo.Ri(t, e).next((e => (C(null !== e), s = e.keys(), n.jo.Di(t, e)))).next((() => n.jo.xi(t))).next((() => n.wc.Jo(t, s)));
                }));
            }
            /**
     * Returns the largest (latest) batch id in mutation queue that is pending
     * server response.
     *
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */ (s.Vh, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught up),
            // so we raise user callbacks first so that they consistently happen before
            // listen events.
                    Xo(s, e, n), Yo(s, e), s.Tl.Su(e, "rejected", n), await ic$1(s, t);
        } catch (n) {
            await Vi(n);
        }
    }

    /**
     * Registers a user callback that resolves when all pending mutations at the moment of calling
     * are acknowledged .
     */ async function Jo(t, e) {
        const n = N$1(t);
        co(n.wl) || p$1("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
        try {
            const t = await function(t) {
                const e = N$1(t);
                return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (t => e.jo.gi(t)));
            }(n.Vh);
            if (-1 === t) 
            // Trigger the callback right away if there is no pending writes at the moment.
            return void e.resolve();
            const s = n.vl.get(t) || [];
            s.push(e), n.vl.set(t, s);
        } catch (t) {
            const n = Ss(t, "Initialization of waitForPendingWrites() operation failed");
            e.reject(n);
        }
    }

    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */ function Yo(t, e) {
        (t.vl.get(e) || []).forEach((t => {
            t.resolve();
        })), t.vl.delete(e);
    }

    /** Reject all outstanding callbacks waiting for pending writes to complete. */ function Xo(t, e, n) {
        const s = N$1(t);
        let i = s.pl[s.currentUser.i()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
            if (i) {
            const t = i.get(e);
            t && (n ? t.reject(n) : t.resolve(), i = i.remove(e)), s.pl[s.currentUser.i()] = i;
        }
    }

    function Zo(t, e, n = null) {
        t.Tl.xu(e);
        for (const s of t.Rl.get(e)) t.ml.delete(s), n && t.Al.Nl(s, n);
        if (t.Rl.delete(e), t.Dl) {
            t.yl.Cc(e).forEach((e => {
                t.yl.ki(e) || 
                // We removed the last reference for this key
                tc(t, e);
            }));
        }
    }

    function tc(t, e) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        const n = t.Vl.get(e);
        null !== n && (no(t.wl, n), t.Vl = t.Vl.remove(e), t.gl.delete(n), sc$1(t));
    }

    function ec$1(t, e, n) {
        for (const s of n) if (s instanceof Oo) t.yl.er(s.key, e), nc$1(t, s); else if (s instanceof Mo) {
            p$1("SyncEngine", "Document no longer in limbo: " + s.key), t.yl.sr(s.key, e);
            t.yl.ki(s.key) || 
            // We removed the last reference for this key
            tc(t, s.key);
        } else D$1();
    }

    function nc$1(t, e) {
        const n = e.key;
        t.Vl.get(n) || (p$1("SyncEngine", "New document in limbo: " + n), t.Pl.push(n), sc$1(t));
    }

    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */ function sc$1(t) {
        for (;t.Pl.length > 0 && t.Vl.size < t.Il; ) {
            const e = t.Pl.shift(), n = t.bl.next();
            t.gl.set(n, new Lo(e)), t.Vl = t.Vl.Gt(e, n), eo(t.wl, new Re(fe(oe(e.path)), n, 2 /* LimboResolution */ , U$1.O));
        }
    }

    async function ic$1(t, e, n) {
        const s = N$1(t), i = [], r = [], o = [];
        s.ml.Y() || (s.ml.forEach(((t, c) => {
            o.push(s.Cl(c, e, n).then((t => {
                if (t) {
                    s.Dl && s.Tl.Mu(c.targetId, t.fromCache ? "not-current" : "current"), i.push(t);
                    const e = sr.ic(c.targetId, t);
                    r.push(e);
                }
            })));
        })), await Promise.all(o), s.Al.sh(i), await async function(t, e) {
            const n = N$1(t);
            try {
                await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t => Is.forEach(e, (e => Is.forEach(e.nc, (s => n.persistence.Ei.er(t, e.targetId, s))).next((() => Is.forEach(e.sc, (s => n.persistence.Ei.sr(t, e.targetId, s)))))))));
            } catch (t) {
                if (!Vs(t)) throw t;
                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                // number for the documents that were included in this transaction.
                // This might trigger them to be deleted earlier than they otherwise
                // would have, but it should not invalidate the integrity of the data.
                p$1("LocalStore", "Failed to update sequence numbers: " + t);
            }
            for (const t of e) {
                const e = t.targetId;
                if (!t.fromCache) {
                    const t = n.lc.get(e), s = t.Ot, i = t.$t(s);
                    // Advance the last limbo free snapshot version
                                    n.lc = n.lc.Gt(e, i);
                }
            }
        }(s.Vh, r));
    }

    async function rc$1(t, e) {
        const n = N$1(t);
        if (!n.currentUser.isEqual(e)) {
            p$1("SyncEngine", "User change. New user:", e.i());
            const t = await cr(n.Vh, e);
            n.currentUser = e, 
            // Fails tasks waiting for pending writes requested by previous user.
            function(t, e) {
                t.vl.forEach((t => {
                    t.forEach((t => {
                        t.reject(new k$1(x$1.CANCELLED, e));
                    }));
                })), t.vl.clear();
            }(n, "'waitForPendingWrites' promise is rejected due to a user change."), 
            // TODO(b/114226417): Consider calling this only in the primary tab.
            n.Tl.$u(e, t.Tc, t.Ic), await ic$1(n, t.Ec);
        }
    }

    function oc$1(t, e) {
        const n = N$1(t), s = n.gl.get(e);
        if (s && s.dl) return mn().add(s.key);
        {
            let t = mn();
            const s = n.Rl.get(e);
            if (!s) return t;
            for (const e of s) {
                const s = n.ml.get(e);
                t = t.Re(s.view.il);
            }
            return t;
        }
    }

    /**
     * Reconcile the list of synced documents in an existing view with those
     * from persistence.
     */ async function cc$1(t, e) {
        const n = N$1(t), s = await dr(n.Vh, e.query, 
        /* usePreviousResults= */ !0), i = e.view._l(s);
        return n.Dl && ec$1(n, e.targetId, i.hl), i;
    }

    /**
     * Retrieves newly changed documents from remote document cache and raises
     * snapshots if needed.
     */
    // PORTING NOTE: Multi-Tab only.
    async function uc$1(t) {
        const e = N$1(t);
        return Er(e.Vh).then((t => ic$1(e, t)));
    }

    /** Applies a mutation state to an existing batch.  */
    // PORTING NOTE: Multi-Tab only.
    async function ac$1(t, e, n, s) {
        const i = N$1(t), r = await function(t, e) {
            const n = N$1(t), s = N$1(n.jo);
            return n.persistence.runTransaction("Lookup mutation documents", "readonly", (t => s.Pi(t, e).next((e => e ? n.wc.Jo(t, e) : Is.resolve(null)))));
        }
        // PORTING NOTE: Multi-Tab only.
        (i.Vh, e);
        null !== r ? ("pending" === n ? 
        // If we are the primary client, we need to send this write to the
        // backend. Secondary clients will ignore these writes since their remote
        // connection is disabled.
        await wo(i.wl) : "acknowledged" === n || "rejected" === n ? (
        // NOTE: Both these methods are no-ops for batches that originated from
        // other clients.
        Xo(i, e, s || null), Yo(i, e), function(t, e) {
            N$1(N$1(t).jo).Ci(e);
        }
        // PORTING NOTE: Multi-Tab only.
        (i.Vh, e)) : D$1(), await ic$1(i, r)) : 
        // A throttled tab may not have seen the mutation before it was completed
        // and removed from the mutation queue, in which case we won't have cached
        // the affected documents. In this case we can safely ignore the update
        // since that means we didn't apply the mutation locally at all (if we
        // had, we would have cached the affected documents), and so we will just
        // see any resulting document changes via normal remote document updates
        // as applicable.
        p$1("SyncEngine", "Cannot apply mutation batch with id: " + e);
    }

    /** Applies a query target change from a different tab. */
    // PORTING NOTE: Multi-Tab only.
    async function hc$1(t, e) {
        const n = N$1(t);
        if (Ec$1(n), Tc$1(n), !0 === e && !0 !== n.Sl) {
            // Secondary tabs only maintain Views for their local listeners and the
            // Views internal state may not be 100% populated (in particular
            // secondary tabs don't track syncedDocuments, the set of documents the
            // server considers to be in the target). So when a secondary becomes
            // primary, we need to need to make sure that all views for all targets
            // match the state on disk.
            const t = n.Tl.gu(), e = await lc$1(n, t.tt());
            n.Sl = !0, await go(n.wl, !0);
            for (const t of e) eo(n.wl, t);
        } else if (!1 === e && !1 !== n.Sl) {
            const t = [];
            let e = Promise.resolve();
            n.Rl.forEach(((s, i) => {
                n.Tl.ku(i) ? t.push(i) : e = e.then((() => (Zo(n, i), fr(n.Vh, i, 
                /*keepPersistedTargetData=*/ !0)))), no(n.wl, i);
            })), await e, await lc$1(n, t), 
            // PORTING NOTE: Multi-Tab only.
            function(t) {
                const e = N$1(t);
                e.gl.forEach(((t, n) => {
                    no(e.wl, n);
                })), e.yl.Nc(), e.gl = new Map, e.Vl = new un(tt.K);
            }
            /**
     * Reconcile the query views of the provided query targets with the state from
     * persistence. Raises snapshots for any changes that affect the local
     * client and returns the updated state of all target's query data.
     *
     * @param syncEngine - The sync engine implementation
     * @param targets - the list of targets with views that need to be recomputed
     * @param transitionToPrimary - `true` iff the tab transitions from a secondary
     * tab to a primary tab
     */
            // PORTING NOTE: Multi-Tab only.
            (n), n.Sl = !1, await go(n.wl, !1);
        }
    }

    async function lc$1(t, e, n) {
        const s = N$1(t), i = [], r = [];
        for (const t of e) {
            let e;
            const n = s.Rl.get(t);
            if (n && 0 !== n.length) {
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                e = await _r(s.Vh, fe(n[0]));
                for (const t of n) {
                    const e = s.ml.get(t), n = await cc$1(s, e);
                    n.snapshot && r.push(n.snapshot);
                }
            } else {
                // For queries that never executed on this client, we need to
                // allocate the target in LocalStore and initialize a new View.
                const n = await wr(s.Vh, t);
                e = await _r(s.Vh, n), await Uo(s, _c(n), t, 
                /*current=*/ !1);
            }
            i.push(e);
        }
        return s.Al.sh(r), i;
    }

    /**
     * Creates a `Query` object from the specified `Target`. There is no way to
     * obtain the original `Query`, so we synthesize a `Query` from the `Target`
     * object.
     *
     * The synthesized result might be different from the original `Query`, but
     * since the synthesized `Query` should return the same results as the
     * original one (only the presentation of results might differ), the potential
     * difference will not cause issues.
     */
    // PORTING NOTE: Multi-Tab only.
    function _c(t) {
        return re(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
    }

    /** Returns the IDs of the clients that are currently active. */
    // PORTING NOTE: Multi-Tab only.
    function fc$1(t) {
        const e = N$1(t);
        return N$1(N$1(e.Vh).persistence).qo();
    }

    /** Applies a query target change from a different tab. */
    // PORTING NOTE: Multi-Tab only.
    async function dc$1(t, e, n, s) {
        const i = N$1(t);
        if (i.Sl) 
        // If we receive a target state notification via WebStorage, we are
        // either already secondary or another tab has taken the primary lease.
        p$1("SyncEngine", "Ignoring unexpected query state notification."); else if (i.Rl.has(e)) switch (n) {
          case "current":
          case "not-current":
            {
                const t = await Er(i.Vh), s = pn.Fe(e, "current" === n);
                await ic$1(i, t, s);
                break;
            }

          case "rejected":
            await fr(i.Vh, e, 
            /* keepPersistedTargetData */ !0), Zo(i, e, s);
            break;

          default:
            D$1();
        }
    }

    /** Adds or removes Watch targets for queries from different tabs. */ async function wc$1(t, e, n) {
        const s = Ec$1(t);
        if (s.Sl) {
            for (const t of e) {
                if (s.Rl.has(t)) {
                    // A target might have been added in a previous attempt
                    p$1("SyncEngine", "Adding an already active target " + t);
                    continue;
                }
                const e = await wr(s.Vh, t), n = await _r(s.Vh, e);
                await Uo(s, _c(e), n.targetId, 
                /*current=*/ !1), eo(s.wl, n);
            }
            for (const t of n) 
            // Check that the target is still active since the target might have been
            // removed if it has been rejected by the backend.
            s.Rl.has(t) && 
            // Release queries that are still active.
            await fr(s.Vh, t, 
            /* keepPersistedTargetData */ !1).then((() => {
                no(s.wl, t), Zo(s, t);
            })).catch(Vi);
        }
    }

    function Ec$1(t) {
        const e = N$1(t);
        return e.wl.yh.Oh = Wo.bind(null, e), e.wl.yh.vn = oc$1.bind(null, e), e.wl.yh.kh = Go.bind(null, e), 
        e.Al.sh = Co.bind(null, e.El), e.Al.Nl = No.bind(null, e.El), e;
    }

    function Tc$1(t) {
        const e = N$1(t);
        return e.wl.yh.Mh = zo.bind(null, e), e.wl.yh.Fh = Ho.bind(null, e), e;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides all components needed for Firestore with in-memory persistence.
     * Uses EagerGC garbage collection.
     */ class Ic$1 {
        constructor() {
            this.synchronizeTabs = !1;
        }
        async initialize(t) {
            this.Ut = Wr(t.Aa.p), this.Tl = this.xl(t), this.persistence = this.kl(t), await this.persistence.start(), 
            this.Ol = this.Ml(t), this.Vh = this.Fl(t);
        }
        Ml(t) {
            return null;
        }
        Fl(t) {
            return or(this.persistence, new ir, t.$l, this.Ut);
        }
        kl(t) {
            return new yr(vr.tu, this.Ut);
        }
        xl(t) {
            return new Fr;
        }
        async terminate() {
            this.Ol && this.Ol.stop(), await this.Tl.Mo(), await this.persistence.Mo();
        }
    }

    /**
     * Provides all components needed for Firestore with IndexedDB persistence.
     */ class Ac$1 extends Ic$1 {
        constructor(t, e, n) {
            super(), this.Ll = t, this.cacheSizeBytes = e, this.forceOwnership = n, this.synchronizeTabs = !1;
        }
        async initialize(t) {
            await super.initialize(t), await Tr(this.Vh), await this.Ll.initialize(this, t), 
            // Enqueue writes from a previous session
            await Tc$1(this.Ll.uu), await wo(this.Ll.wl);
        }
        Fl(t) {
            return or(this.persistence, new ir, t.$l, this.Ut);
        }
        Ml(t) {
            const e = this.persistence.Ei.hr;
            return new Bi(e, t.ls);
        }
        kl(t) {
            const e = er(t.Aa.p, t.Aa.persistenceKey), n = void 0 !== this.cacheSizeBytes ? Pi.Js(this.cacheSizeBytes) : Pi.Zs;
            return new Xi(this.synchronizeTabs, e, t.clientId, n, t.ls, Kr(), Qr(), this.Ut, this.Tl, !!this.forceOwnership);
        }
        xl(t) {
            return new Fr;
        }
    }

    /**
     * Provides all components needed for Firestore with multi-tab IndexedDB
     * persistence.
     *
     * In the legacy client, this provider is used to provide both multi-tab and
     * non-multi-tab persistence since we cannot tell at build time whether
     * `synchronizeTabs` will be enabled.
     */ class mc$1 extends Ac$1 {
        constructor(t, e) {
            super(t, e, /* forceOwnership= */ !1), this.Ll = t, this.cacheSizeBytes = e, this.synchronizeTabs = !0;
        }
        async initialize(t) {
            await super.initialize(t);
            const e = this.Ll.uu;
            this.Tl instanceof Mr && (this.Tl.uu = {
                Yu: ac$1.bind(null, e),
                Xu: dc$1.bind(null, e),
                Zu: wc$1.bind(null, e),
                qo: fc$1.bind(null, e),
                Ju: uc$1.bind(null, e)
            }, await this.Tl.start()), 
            // NOTE: This will immediately call the listener, so we make sure to
            // set it after localStore / remoteStore are started.
            await this.persistence.mo((async t => {
                await hc$1(this.Ll.uu, t), this.Ol && (t && !this.Ol.wr ? this.Ol.start(this.Vh) : t || this.Ol.stop());
            }));
        }
        xl(t) {
            const e = Kr();
            if (!Mr.Kn(e)) throw new k$1(x$1.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
            const n = er(t.Aa.p, t.Aa.persistenceKey);
            return new Mr(e, t.ls, n, t.clientId, t.$l);
        }
    }

    /**
     * Initializes and wires the components that are needed to interface with the
     * network.
     */ class Rc$1 {
        async initialize(t, e) {
            this.Vh || (this.Vh = t.Vh, this.Tl = t.Tl, this.gh = this.Bl(e), this.wl = this.ql(e), 
            this.El = this.Ul(e), this.uu = this.Kl(e, 
            /* startAsPrimary=*/ !t.synchronizeTabs), this.Tl.au = t => jo(this.uu, t, 1 /* SharedClientState */), 
            this.wl.yh.Ql = rc$1.bind(null, this.uu), await go(this.wl, this.uu.Dl));
        }
        Ul(t) {
            return new bo;
        }
        Bl(t) {
            const e = Wr(t.Aa.p), n = (s = t.Aa, new Ur(s));
            var s;
            /** Return the Platform-specific connectivity monitor. */        return function(t, e, n) {
                return new Jr(t, e, n);
            }(t.credentials, n, e);
        }
        ql(t) {
            return e = this.Vh, n = this.gh, s = t.ls, i = t => jo(this.uu, t, 0 /* RemoteStore */), 
            r = Lr.Kn() ? new Lr : new $r, new Xr(e, n, s, i, r);
            var e, n, s, i, r;
            /** Re-enables the network. Idempotent. */    }
        Kl(t, e) {
            return function(t, e, n, 
            // PORTING NOTE: Manages state synchronization in multi-tab environments.
            s, i, r, o) {
                const c = new Bo(t, e, n, s, i, r);
                return o && (c.Sl = !0), c;
            }(this.Vh, this.wl, this.El, this.Tl, t.$l, t.Il, e);
        }
        terminate() {
            return async function(t) {
                const e = N$1(t);
                p$1("RemoteStore", "RemoteStore shutting down."), e.Sh.add(5 /* Shutdown */), await to(e), 
                e.Ch.Mo(), 
                // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                // triggering spurious listener events with cached data, etc.
                e.Nh.set("Unknown" /* Unknown */);
            }(this.wl);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * A wrapper implementation of Observer<T> that will dispatch events
     * asynchronously. To allow immediate silencing, a mute call is added which
     * causes events scheduled to no longer be raised.
     */ class Pc$1 {
        constructor(t) {
            this.observer = t, 
            /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
            this.muted = !1;
        }
        next(t) {
            this.observer.next && this.Wl(this.observer.next, t);
        }
        error(t) {
            this.observer.error ? this.Wl(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
        }
        jl() {
            this.muted = !0;
        }
        Wl(t, e) {
            this.muted || setTimeout((() => {
                this.muted || t(e);
            }), 0);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable object representing an array of bytes.
     */ class Vc$1 {
        /** @hideconstructor */
        constructor(t) {
            this.Gl = t;
        }
        /**
         * Creates a new `Bytes` object from the given Base64 string, converting it to
         * bytes.
         *
         * @param base64 - The Base64 string used to create the `Bytes` object.
         */    static fromBase64String(t) {
            try {
                return new Vc$1(rt.fromBase64String(t));
            } catch (t) {
                throw new k$1(x$1.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array - The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new Vc$1(rt.fromUint8Array(t));
        }
        /**
         * Returns the underlying bytes as a Base64-encoded string.
         *
         * @returns The Base64-encoded string created from the `Bytes` object.
         */    toBase64() {
            return this.Gl.toBase64();
        }
        /**
         * Returns the underlying bytes in a new `Uint8Array`.
         *
         * @returns The Uint8Array created from the `Bytes` object.
         */    toUint8Array() {
            return this.Gl.toUint8Array();
        }
        /**
         * Returns a string representation of the `Bytes` object.
         *
         * @returns A string representation of the `Bytes` object.
         */    toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        /**
         * Returns true if this `Bytes` object is equal to the provided one.
         *
         * @param other - The `Bytes` object to compare against.
         * @returns true if this `Bytes` object is equal to the provided one.
         */    isEqual(t) {
            return this.Gl.isEqual(t.Gl);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A `FieldPath` refers to a field in a document. The path may consist of a
     * single field name (referring to a top-level field in the document), or a
     * list of field names (referring to a nested field in the document).
     *
     * Create a `FieldPath` by providing field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     */ class gc$1 {
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames - A list of field names.
         */
        constructor(...t) {
            for (let e = 0; e < t.length; ++e) if (0 === t[e].length) throw new k$1(x$1.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.zl = new Z$1(t);
        }
        /**
         * Returns true if this `FieldPath` is equal to the provided one.
         *
         * @param other - The `FieldPath` to compare against.
         * @returns true if this `FieldPath` is equal to the provided one.
         */    isEqual(t) {
            return this.zl.isEqual(t.zl);
        }
    }

    /**
     * Returns a special sentinel `FieldPath` to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */ function yc$1() {
        return new gc$1("__name__");
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Sentinel values that can be used when writing document fields with `set()`
     * or `update()`.
     */ class pc$1 {
        /**
         * @param _methodName - The public API endpoint that returns this class.
         */
        constructor(t) {
            this._methodName = t;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A class implemented by all API types of the legacy Firestore API which
     * contains a reference to the API type in the firestore-exp API. All internal
     * code unwraps these references, which allows us to only use firestore-exp
     * types in the SDK.
     */ class vc$1 {
        constructor(t) {
            this.Hl = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function bc$1(t, e, n) {
        if (!n) throw new k$1(x$1.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
    }

    /**
     * Validates that two boolean options are not set at the same time.
     */
    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */
    function Sc$1(t) {
        if (!tt.lt(t)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function Dc$1(t) {
        if (tt.lt(t)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */
    /** Returns a string describing the type / value of the provided input. */
    function Cc$1(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const e = 
                /** Hacky method to try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) {
                        const e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (e && e.length > 1) return e[1];
                    }
                    return null;
                }
                /**
     * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
     * underlying instance. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     */ (t);
                return e ? `a custom ${e} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : D$1();
    }

    function Nc$1(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        if ("_delegate" in t && (
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t = t.Hl), !(t instanceof e)) {
            if (e.name === t.constructor.name) throw new k$1(x$1.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
            {
                const n = Cc$1(t);
                throw new k$1(x$1.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
            }
        }
        return t;
    }

    function xc(t, e) {
        if (e <= 0) throw new k$1(x$1.INVALID_ARGUMENT, `Function ${t}() requires a positive number, but it was: ${e}.`);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // settings() defaults:
    /**
     * A concrete type describing all the values that can be applied via a
     * user-supplied firestore.Settings object. This is a separate type so that
     * defaults can be supplied and the value can be checked for equality.
     */
    class kc$1 {
        constructor(t) {
            var e;
            if (void 0 === t.host) {
                if (void 0 !== t.ssl) throw new k$1(x$1.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                this.host = "firestore.googleapis.com", this.ssl = true;
            } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
            if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
            void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
                if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new k$1(x$1.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
                this.cacheSizeBytes = t.cacheSizeBytes;
            }
            this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
            function(t, e, n, s) {
                if (!0 === e && !0 === s) throw new k$1(x$1.INVALID_ARGUMENT, `${t} and ${n} cannot be used together.`);
            }("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
        }
        isEqual(t) {
            return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Oc$1 = new Map;

    /**
     * An instance map that ensures only one Datastore exists per Firestore
     * instance.
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The Cloud Firestore service interface.
     *
     * Do not call this constructor directly. Instead, use {@link getFirestore}.
     */
    class Mc$1 {
        /** @hideconstructor */
        constructor(t, e) {
            this.Jl = "(lite)", this.Yl = new kc$1({}), this.Xl = !1, t instanceof q$1 ? (this.Zl = t, 
            this.t_ = new M$1) : (this.e_ = t, this.Zl = function(t) {
                if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new k$1(x$1.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                return new q$1(t.options.projectId);
            }
            /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
            /**
     * A `DocumentReference` refers to a document location in a Firestore database
     * and can be used to write, read, or listen to the location. The document at
     * the referenced location may or may not exist.
     */ (t), this.t_ = new F$1(e));
        }
        /**
         * The {@link FirebaseApp} associated with this `Firestore` service
         * instance.
         */    get app() {
            if (!this.e_) throw new k$1(x$1.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.e_;
        }
        get n_() {
            return this.Xl;
        }
        get s_() {
            return void 0 !== this.i_;
        }
        r_(t) {
            if (this.Xl) throw new k$1(x$1.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
            this.Yl = new kc$1(t), void 0 !== t.credentials && (this.t_ = function(t) {
                if (!t) return new M$1;
                switch (t.type) {
                  case "gapi":
                    const e = t.client;
                    // Make sure this really is a Gapi client.
                                    return C(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                    new L$1(e, t.sessionIndex || "0");

                  case "provider":
                    return t.client;

                  default:
                    throw new k$1(x$1.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
                }
            }(t.credentials));
        }
        o_() {
            return this.Yl;
        }
        c_() {
            return this.Xl = !0, this.Yl;
        }
        _delete() {
            return this.i_ || (this.i_ = this.u_()), this.i_;
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    u_() {
            /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
     */
            return function(t) {
                const e = Oc$1.get(t);
                e && (p$1("ComponentProvider", "Removing Datastore"), Oc$1.delete(t), e.terminate());
            }(this), Promise.resolve();
        }
    }

    class Fc$1 {
        /** @hideconstructor */
        constructor(t, e, n) {
            this.a_ = e, this.h_ = n, 
            /** The type of this Firestore reference. */
            this.type = "document", this.firestore = t;
        }
        get l_() {
            return this.h_.path;
        }
        /**
         * The document's identifier within its collection.
         */    get id() {
            return this.h_.path.J();
        }
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */    get path() {
            return this.h_.path.et();
        }
        /**
         * The collection this `DocumentReference` belongs to.
         */    get parent() {
            return new Lc$1(this.firestore, this.a_, this.h_.path.G());
        }
        /**
         * Applies a custom data converter to this `DocumentReference`, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * setDoc}, {@link getDoc}, etc. with the returned `DocumentReference`
         * instance, the provided converter will convert between Firestore data and
         * your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `DocumentReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new Fc$1(this.firestore, t, this.h_);
        }
    }

    /**
     * A `Query` refers to a Query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class $c$1 {
        // This is the lite version of the Query class in the main SDK.
        /** @hideconstructor protected */
        constructor(t, e, n) {
            this.a_ = e, this.__ = n, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        /**
         * Applies a custom data converter to this query, allowing you to use your own
         * custom model objects with Firestore. When you call {@link getDocs} with
         * the returned query, the provided converter will convert between Firestore
         * data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `Query<U>` that uses the provided converter.
         */    withConverter(t) {
            return new $c$1(this.firestore, t, this.__);
        }
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query}).
     */ class Lc$1 extends $c$1 {
        /** @hideconstructor */
        constructor(t, e, n) {
            super(t, e, oe(n)), this.firestore = t, this.l_ = n, this.type = "collection";
        }
        /** The collection's identifier. */    get id() {
            return this.__.path.J();
        }
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */    get path() {
            return this.__.path.et();
        }
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */    get parent() {
            const t = this.l_.G();
            return t.Y() ? null : new Fc$1(this.firestore, 
            /* converter= */ null, new tt(t));
        }
        /**
         * Applies a custom data converter to this CollectionReference, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * addDoc} with the returned `CollectionReference` instance, the provided
         * converter will convert between Firestore data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `CollectionReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new Lc$1(this.firestore, t, this.l_);
        }
    }

    function Bc$1(t, e, ...n) {
        if (t instanceof vc$1 && (t = t.Hl), bc$1("collection", "path", e), t instanceof Mc$1) {
            const s = Y$1.nt(e, ...n);
            return Dc$1(s), new Lc$1(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof Fc$1 || t instanceof Lc$1)) throw new k$1(x$1.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = Y$1.nt(t.path, ...n).child(Y$1.nt(e));
            return Dc$1(s), new Lc$1(t.firestore, 
            /* converter= */ null, s);
        }
    }

    // TODO(firestorelite): Consider using ErrorFactory -
    // https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
    /**
     * Creates and returns a new `Query` instance that includes all documents in the
     * database that are contained in a collection or subcollection with the
     * given `collectionId`.
     *
     * @param firestore - A reference to the root Firestore instance.
     * @param collectionId - Identifies the collections to query over. Every
     * collection or subcollection with this ID as the last segment of its path
     * will be included. Cannot contain a slash.
     * @returns The created `Query`.
     */ function qc$1(t, e) {
        if (t = Nc$1(t, Mc$1), bc$1("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new $c$1(t, 
        /* converter= */ null, 
        /**
     * Creates a new Query for a collection group query that matches all documents
     * within the provided collection group.
     */
        function(t) {
            return new ie(Y$1.st(), t);
        }(e));
    }

    function Uc$1(t, e, ...n) {
        if (t instanceof vc$1 && (t = t.Hl), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (e = Q$1.M()), bc$1("doc", "path", e), t instanceof Mc$1) {
            const s = Y$1.nt(e, ...n);
            return Sc$1(s), new Fc$1(t, 
            /* converter= */ null, new tt(s));
        }
        {
            if (!(t instanceof Fc$1 || t instanceof Lc$1)) throw new k$1(x$1.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t.l_.child(Y$1.nt(e, ...n));
            return Sc$1(s), new Fc$1(t.firestore, t instanceof Lc$1 ? t.a_ : null, new tt(s));
        }
    }

    /**
     * Returns true if the provided references are equal.
     *
     * @param left - A reference to compare.
     * @param right - A reference to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function Kc$1(t, e) {
        return t instanceof vc$1 && (t = t.Hl), e instanceof vc$1 && (e = e.Hl), (t instanceof Fc$1 || t instanceof Lc$1) && (e instanceof Fc$1 || e instanceof Lc$1) && (t.firestore === e.firestore && t.path === e.path && t.a_ === e.a_);
    }

    /**
     * Returns true if the provided queries point to the same collection and apply
     * the same constraints.
     *
     * @param left - A `Query` to compare.
     * @param right - A `Query` to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function Qc$1(t, e) {
        return t instanceof vc$1 && (t = t.Hl), e instanceof vc$1 && (e = e.Hl), t instanceof $c$1 && e instanceof $c$1 && (t.firestore === e.firestore && we(t.__, e.__) && t.a_ === e.a_);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable object representing a geographic location in Firestore. The
     * location is represented as latitude/longitude pair.
     *
     * Latitude values are in the range of [-90, 90].
     * Longitude values are in the range of [-180, 180].
     */ class Wc$1 {
        /**
         * Creates a new immutable `GeoPoint` object with the provided latitude and
         * longitude values.
         * @param latitude - The latitude as number between -90 and 90.
         * @param longitude - The longitude as number between -180 and 180.
         */
        constructor(t, e) {
            if (!isFinite(t) || t < -90 || t > 90) throw new k$1(x$1.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(e) || e < -180 || e > 180) throw new k$1(x$1.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
            this.f_ = t, this.d_ = e;
        }
        /**
         * The latitude of this `GeoPoint` instance.
         */    get latitude() {
            return this.f_;
        }
        /**
         * The longitude of this `GeoPoint` instance.
         */    get longitude() {
            return this.d_;
        }
        /**
         * Returns true if this `GeoPoint` is equal to the provided one.
         *
         * @param other - The `GeoPoint` to compare against.
         * @returns true if this `GeoPoint` is equal to the provided one.
         */    isEqual(t) {
            return this.f_ === t.f_ && this.d_ === t.d_;
        }
        toJSON() {
            return {
                latitude: this.f_,
                longitude: this.d_
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    F(t) {
            return W$1(this.f_, t.f_) || W$1(this.d_, t.d_);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const jc$1 = /^__.*__$/;

    /** The result of parsing document data (e.g. for a setData call). */ class Gc$1 {
        constructor(t, e, n) {
            this.data = t, this.jt = e, this.fieldTransforms = n;
        }
        w_(t, e) {
            return null !== this.jt ? new He(t, this.data, this.jt, e, this.fieldTransforms) : new ze(t, this.data, e, this.fieldTransforms);
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class zc$1 {
        constructor(t, 
        // The fieldMask does not include document transforms.
        e, n) {
            this.data = t, this.jt = e, this.fieldTransforms = n;
        }
        w_(t, e) {
            return new He(t, this.data, this.jt, e, this.fieldTransforms);
        }
    }

    function Hc$1(t) {
        switch (t) {
          case 0 /* Set */ :
     // fall through
                  case 2 /* MergeSet */ :
     // fall through
                  case 1 /* Update */ :
            return !0;

          case 3 /* Argument */ :
          case 4 /* ArrayArgument */ :
            return !1;

          default:
            throw D$1();
        }
    }

    /** A "context" object passed around while parsing user data. */ class Jc$1 {
        /**
         * Initializes a ParseContext with the given source and path.
         *
         * @param settings - The settings for the parser.
         * @param databaseId - The database ID of the Firestore instance.
         * @param serializer - The serializer to use to generate the Value proto.
         * @param ignoreUndefinedProperties - Whether to ignore undefined properties
         * rather than throw.
         * @param fieldTransforms - A mutable list of field transforms encountered
         * while parsing the data.
         * @param fieldMask - A mutable list of field paths encountered while parsing
         * the data.
         *
         * TODO(b/34871131): We don't support array paths right now, so path can be
         * null to indicate the context represents any location within an array (in
         * which case certain features will not work and errors will be somewhat
         * compromised).
         */
        constructor(t, e, n, s, i, r) {
            this.settings = t, this.p = e, this.Ut = n, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === i && this.E_(), this.fieldTransforms = i || [], this.jt = r || [];
        }
        get path() {
            return this.settings.path;
        }
        get T_() {
            return this.settings.T_;
        }
        /** Returns a new context with the specified settings overwritten. */    I_(t) {
            return new Jc$1(Object.assign(Object.assign({}, this.settings), t), this.p, this.Ut, this.ignoreUndefinedProperties, this.fieldTransforms, this.jt);
        }
        A_(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.I_({
                path: n,
                m_: !1
            });
            return s.R_(t), s;
        }
        P_(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.I_({
                path: n,
                m_: !1
            });
            return s.E_(), s;
        }
        V_(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.I_({
                path: void 0,
                m_: !0
            });
        }
        g_(t) {
            return Eu(t, this.settings.methodName, this.settings.y_ || !1, this.path, this.settings.p_);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.jt.find((e => t.X(e))) || void 0 !== this.fieldTransforms.find((e => t.X(e.field)));
        }
        E_() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.R_(this.path.get(t));
        }
        R_(t) {
            if (0 === t.length) throw this.g_("Document fields must not be empty");
            if (Hc$1(this.T_) && jc$1.test(t)) throw this.g_('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Yc$1 {
        constructor(t, e, n) {
            this.p = t, this.ignoreUndefinedProperties = e, this.Ut = n || Wr(t);
        }
        /** Creates a new top-level parse context. */    v_(t, e, n, s = !1) {
            return new Jc$1({
                T_: t,
                methodName: e,
                p_: n,
                path: Z$1.st(),
                m_: !1,
                y_: s
            }, this.p, this.Ut, this.ignoreUndefinedProperties);
        }
    }

    function Xc$1(t) {
        const e = t.c_(), n = Wr(t.Zl);
        return new Yc$1(t.Zl, !!e.ignoreUndefinedProperties, n);
    }

    /** Parse document data from a set() call. */ function Zc$1(t, e, n, s, i, r = {}) {
        const o = t.v_(r.merge || r.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
        _u("Data must be an object, but it was:", o, s);
        const c = hu(s, o);
        let u, a;
        if (r.merge) u = new it(o.jt), a = o.fieldTransforms; else if (r.mergeFields) {
            const t = [];
            for (const s of r.mergeFields) {
                const i = fu(e, s, n);
                if (!o.contains(i)) throw new k$1(x$1.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
                Tu(t, i) || t.push(i);
            }
            u = new it(t), a = o.fieldTransforms.filter((t => u.ft(t.field)));
        } else u = null, a = o.fieldTransforms;
        return new Gc$1(new St(c), u, a);
    }

    class tu extends pc$1 {
        b_(t) {
            if (2 /* MergeSet */ !== t.T_) throw 1 /* Update */ === t.T_ ? t.g_(this._methodName + "() can only appear at the top level of your update data") : t.g_(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.jt.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof tu;
        }
    }

    /**
     * Creates a child context for parsing SerializableFieldValues.
     *
     * This is different than calling `ParseContext.contextWith` because it keeps
     * the fieldTransforms and fieldMask separate.
     *
     * The created context has its `dataSource` set to `UserDataSource.Argument`.
     * Although these values are used with writes, any elements in these FieldValues
     * are not considered writes since they cannot contain any FieldValue sentinels,
     * etc.
     *
     * @param fieldValue - The sentinel FieldValue for which to create a child
     *     context.
     * @param context - The parent context.
     * @param arrayElement - Whether or not the FieldValue has an array.
     */ function eu(t, e, n) {
        return new Jc$1({
            T_: 3 /* Argument */ ,
            p_: e.settings.p_,
            methodName: t._methodName,
            m_: n
        }, e.p, e.Ut, e.ignoreUndefinedProperties);
    }

    class nu extends pc$1 {
        b_(t) {
            return new Fe(t.path, new Se);
        }
        isEqual(t) {
            return t instanceof nu;
        }
    }

    class su extends pc$1 {
        constructor(t, e) {
            super(t), this.S_ = e;
        }
        b_(t) {
            const e = eu(this, t, 
            /*array=*/ !0), n = this.S_.map((t => au(t, e))), s = new De(n);
            return new Fe(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class iu extends pc$1 {
        constructor(t, e) {
            super(t), this.S_ = e;
        }
        b_(t) {
            const e = eu(this, t, 
            /*array=*/ !0), n = this.S_.map((t => au(t, e))), s = new Ne(n);
            return new Fe(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class ru extends pc$1 {
        constructor(t, e) {
            super(t), this.D_ = e;
        }
        b_(t) {
            const e = new ke(t.Ut, ge(t.Ut, this.D_));
            return new Fe(t.path, e);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    /** Parse update data from an update() call. */ function ou(t, e, n, s) {
        const i = t.v_(1 /* Update */ , e, n);
        _u("Data must be an object, but it was:", i, s);
        const r = [], o = new Dt;
        nt(s, ((t, s) => {
            const c = wu(e, t, n);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    s instanceof vc$1 && (s = s.Hl);
            const u = i.P_(c);
            if (s instanceof tu) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(c); else {
                const t = au(s, u);
                null != t && (r.push(c), o.set(c, t));
            }
        }));
        const c = new it(r);
        return new zc$1(o.Rt(), c, i.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function cu(t, e, n, s, i, r) {
        const o = t.v_(1 /* Update */ , e, n), c = [ fu(e, s, n) ], u = [ i ];
        if (r.length % 2 != 0) throw new k$1(x$1.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < r.length; t += 2) c.push(fu(e, r[t])), u.push(r[t + 1]);
        const a = [], h = new Dt;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = c.length - 1; t >= 0; --t) if (!Tu(a, c[t])) {
            const e = c[t];
            let n = u[t];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    n instanceof vc$1 && (n = n.Hl);
            const s = o.P_(e);
            if (n instanceof tu) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(e); else {
                const t = au(n, s);
                null != t && (a.push(e), h.set(e, t));
            }
        }
        const l = new it(a);
        return new zc$1(h.Rt(), l, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays - Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function uu(t, e, n, s = !1) {
        return au(n, t.v_(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input - Data to be parsed.
     * @param context - A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @returns The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function au(t, e) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof vc$1 && (t = t.Hl), lu(t)) return _u("Unsupported field value:", e, t), 
        hu(t, e);
        if (t instanceof pc$1) 
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, e) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!Hc$1(e.T_)) throw e.g_(t._methodName + "() can only be used with update() and set()");
            if (!e.path) throw e.g_(t._methodName + "() is not currently supported inside arrays");
            const n = t.b_(e);
            n && e.fieldTransforms.push(n);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @returns The parsed value
     */ (t, e), null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        e.path && e.jt.push(e.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (e.settings.m_ && 4 /* ArrayArgument */ !== e.T_) throw e.g_("Nested arrays are not supported");
            return function(t, e) {
                const n = [];
                let s = 0;
                for (const i of t) {
                    let t = au(i, e.V_(s));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), n.push(t), s++;
                }
                return {
                    arrayValue: {
                        values: n
                    }
                };
            }(t, e);
        }
        return function(t, e) {
            t instanceof vc$1 && (t = t.Hl);
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return ge(e.Ut, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const n = z$1.fromDate(t);
                return {
                    timestampValue: $n(e.Ut, n)
                };
            }
            if (t instanceof z$1) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const n = new z$1(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: $n(e.Ut, n)
                };
            }
            if (t instanceof Wc$1) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof Vc$1) return {
                bytesValue: Ln(e.Ut, t.Gl)
            };
            if (t instanceof Fc$1) {
                const n = e.p, s = t.firestore.Zl;
                if (!s.isEqual(n)) throw e.g_(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
                return {
                    referenceValue: Un(t.firestore.Zl || e.p, t.h_.path)
                };
            }
            if (void 0 === t && e.ignoreUndefinedProperties) return null;
            throw e.g_("Unsupported field value: " + Cc$1(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, e);
    }

    function hu(t, e) {
        const n = {};
        return st(t) ? 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        e.path && e.path.length > 0 && e.jt.push(e.path) : nt(t, ((t, s) => {
            const i = au(s, e.A_(t));
            null != i && (n[t] = i);
        })), {
            mapValue: {
                fields: n
            }
        };
    }

    function lu(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof z$1 || t instanceof Wc$1 || t instanceof Vc$1 || t instanceof Fc$1 || t instanceof pc$1);
    }

    function _u(t, e, n) {
        if (!lu(n) || !function(t) {
            return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
        }(n)) {
            const s = Cc$1(n);
            throw "an object" === s ? e.g_(t + " a custom object") : e.g_(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function fu(t, e, n) {
        if (
        // If required, replace the FieldPath Compat class with with the firestore-exp
        // FieldPath.
        e instanceof vc$1 && (e = e.Hl), e instanceof gc$1) return e.zl;
        if ("string" == typeof e) return wu(t, e);
        throw Eu("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const du = new RegExp("[~\\*/\\[\\]]");

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName - The publicly visible method name
     * @param path - The dot-separated string form of a field path which will be
     * split on dots.
     * @param targetDoc - The document against which the field path will be
     * evaluated.
     */ function wu(t, e, n) {
        if (e.search(du) >= 0) throw Eu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
        try {
            return new gc$1(...e.split(".")).zl;
        } catch (s) {
            throw Eu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, n);
        }
    }

    function Eu(t, e, n, s, i) {
        const r = s && !s.Y(), o = void 0 !== i;
        let c = `Function ${e}() called with invalid data`;
        n && (c += " (via `toFirestore()`)"), c += ". ";
        let u = "";
        return (r || o) && (u += " (found", r && (u += " in field " + s), o && (u += " in document " + i), 
        u += ")"), new k$1(x$1.INVALID_ARGUMENT, c + t + u);
    }

    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function Tu(t, e) {
        return t.some((t => t.isEqual(e)));
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Internal transaction object responsible for accumulating the mutations to
     * perform and the base versions for any documents read.
     */ class Iu {
        constructor(t) {
            this.gh = t, 
            // The version of each document that was read during this transaction.
            this.C_ = new Map, this.mutations = [], this.N_ = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.x_ = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.k_ = new Set;
        }
        async O_(t) {
            if (this.M_(), this.mutations.length > 0) throw new k$1(x$1.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
            const e = await async function(t, e) {
                const n = N$1(t), s = zn(n.Ut) + "/documents", i = {
                    documents: e.map((t => Qn(n.Ut, t)))
                }, r = await n.pa("BatchGetDocuments", s, i), o = new Map;
                r.forEach((t => {
                    const e = Yn(n.Ut, t);
                    o.set(e.key.toString(), e);
                }));
                const c = [];
                return e.forEach((t => {
                    const e = o.get(t.toString());
                    C(!!e), c.push(e);
                })), c;
            }(this.gh, t);
            return e.forEach((t => {
                t instanceof kt || t instanceof xt ? this.F_(t) : D$1();
            })), e;
        }
        set(t, e) {
            this.write(e.w_(t, this.Wt(t))), this.k_.add(t.toString());
        }
        update(t, e) {
            try {
                this.write(e.w_(t, this.L_(t)));
            } catch (t) {
                this.x_ = t;
            }
            this.k_.add(t.toString());
        }
        delete(t) {
            this.write(new tn(t, this.Wt(t))), this.k_.add(t.toString());
        }
        async commit() {
            if (this.M_(), this.x_) throw this.x_;
            const t = this.C_;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach((e => {
                t.delete(e.key.toString());
            })), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach(((t, e) => {
                const n = tt.ut(e);
                this.mutations.push(new en(n, this.Wt(n)));
            })), await async function(t, e) {
                const n = N$1(t), s = zn(n.Ut) + "/documents", i = {
                    writes: e.map((t => Zn(n.Ut, t)))
                };
                await n.Pa("Commit", s, i);
            }(this.gh, this.mutations), this.N_ = !0;
        }
        F_(t) {
            let e;
            if (t instanceof xt) e = t.version; else {
                if (!(t instanceof kt)) throw D$1();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                e = H$1.min();
            }
            const n = this.C_.get(t.key.toString());
            if (n) {
                if (!e.isEqual(n)) 
                // This transaction will fail no matter what.
                throw new k$1(x$1.ABORTED, "Document version changed between two reads.");
            } else this.C_.set(t.key.toString(), e);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    Wt(t) {
            const e = this.C_.get(t.toString());
            return !this.k_.has(t.toString()) && e ? Be.updateTime(e) : Be.Kt();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    L_(t) {
            const e = this.C_.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.k_.has(t.toString()) && e) {
                if (e.isEqual(H$1.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new k$1(x$1.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return Be.updateTime(e);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return Be.exists(!0);
        }
        write(t) {
            this.M_(), this.mutations.push(t);
        }
        M_() {}
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * TransactionRunner encapsulates the logic needed to run and retry transactions
     * with backoff.
     */
    class Au {
        constructor(t, e, n, s) {
            this.ls = t, this.gh = e, this.updateFunction = n, this.ws = s, this.B_ = 5, this.Ka = new jr(this.ls, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.q_();
        }
        q_() {
            this.Ka.Oa((async () => {
                const t = new Iu(this.gh), e = this.U_(t);
                e && e.then((e => {
                    this.ls.Rs((() => t.commit().then((() => {
                        this.ws.resolve(e);
                    })).catch((t => {
                        this.K_(t);
                    }))));
                })).catch((t => {
                    this.K_(t);
                }));
            }));
        }
        U_(t) {
            try {
                const e = this.updateFunction(t);
                return !ft(e) && e.catch && e.then ? e : (this.ws.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.ws.reject(t), null;
            }
        }
        K_(t) {
            this.B_ > 0 && this.Q_(t) ? (this.B_ -= 1, this.ls.Rs((() => (this.q_(), Promise.resolve())))) : this.ws.reject(t);
        }
        Q_(t) {
            if ("FirebaseError" === t.name) {
                // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
                // non-matching document versions with ABORTED. These errors should be retried.
                const e = t.code;
                return "aborted" === e || "failed-precondition" === e || !on(e);
            }
            return !1;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * FirestoreClient is a top-level class that constructs and owns all of the
     * pieces of the client SDK architecture. It is responsible for creating the
     * async queue that is shared by all of the other components in the system.
     */
    class mu {
        constructor(t, 
        /**
         * Asynchronous queue responsible for all of our internal processing. When
         * we get incoming work from the user (via public API) or the network
         * (incoming GRPC messages), we should always schedule onto this queue.
         * This ensures all of our work is properly serialized (e.g. we don't
         * start processing a new operation while the previous one is waiting for
         * an async I/O to complete).
         */
        e, n) {
            this.credentials = t, this.ls = e, this.Aa = n, this.user = P$1.UNAUTHENTICATED, this.clientId = Q$1.M(), 
            this.W_ = () => {}, this.m = new Ts, this.credentials.T((t => {
                p$1("FirestoreClient", "Received user=", t.uid), this.user = t, this.W_(t), this.m.resolve();
            }));
        }
        async getConfiguration() {
            return await this.m.promise, {
                ls: this.ls,
                Aa: this.Aa,
                clientId: this.clientId,
                credentials: this.credentials,
                $l: this.user,
                Il: 100
            };
        }
        j_(t) {
            this.W_ = t, 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.m.promise.then((() => this.W_(this.user)));
        }
        /**
         * Checks that the client has not been terminated. Ensures that other methods on
         * this class cannot be called after the client is terminated.
         */    G_() {
            if (this.ls.z_) throw new k$1(x$1.FAILED_PRECONDITION, "The client has already been terminated.");
        }
        terminate() {
            this.ls.H_();
            const t = new Ts;
            return this.ls.J_((async () => {
                try {
                    this.Y_ && await this.Y_.terminate(), this.X_ && await this.X_.terminate(), 
                    // `removeChangeListener` must be called after shutting down the
                    // RemoteStore as it will prevent the RemoteStore from retrieving
                    // auth tokens.
                    this.credentials.I(), t.resolve();
                } catch (e) {
                    const n = Ss(e, "Failed to shutdown persistence");
                    t.reject(n);
                }
            })), t.promise;
        }
    }

    async function Ru(t, e) {
        t.ls.Z_(), p$1("FirestoreClient", "Initializing OfflineComponentProvider");
        const n = await t.getConfiguration();
        await e.initialize(n);
        let s = n.$l;
        t.j_((n => {
            s.isEqual(n) || (s = n, t.ls.yo((async () => {
                await cr(e.Vh, n);
            })));
        })), 
        // When a user calls clearPersistence() in one client, all other clients
        // need to be terminated to allow the delete to succeed.
        e.persistence.Ro((() => t.terminate())), t.X_ = e;
    }

    async function Pu(t, e) {
        t.ls.Z_();
        const n = await Vu(t);
        p$1("FirestoreClient", "Initializing OnlineComponentProvider");
        const s = await t.getConfiguration();
        await e.initialize(n, s), 
        // The CredentialChangeListener of the online component provider takes
        // precedence over the offline component provider.
        t.j_((n => t.ls.yo((() => async function(t, e) {
            const n = N$1(t);
            n.ls.Z_(), p$1("RemoteStore", "RemoteStore received new credentials");
            const s = co(n);
            // Tear down and re-create our network streams. This will ensure we get a
            // fresh auth token for the new user and re-fill the write pipeline with
            // new mutations from the LocalStore (since mutations are per-user).
                    n.Sh.add(3 /* CredentialChange */), await to(n), s && 
            // Don't set the network status to Unknown if we are offline.
            n.Nh.set("Unknown" /* Unknown */), await n.yh.Ql(e), n.Sh.delete(3 /* CredentialChange */), 
            await Zr(n);
        }(e.wl, n))))), t.Y_ = e;
    }

    async function Vu(t) {
        return t.X_ || (p$1("FirestoreClient", "Using default OfflineComponentProvider"), 
        await Ru(t, new Ic$1)), t.X_;
    }

    async function gu(t) {
        return t.Y_ || (p$1("FirestoreClient", "Using default OnlineComponentProvider"), await Pu(t, new Rc$1)), 
        t.Y_;
    }

    function yu(t) {
        return Vu(t).then((t => t.persistence));
    }

    function pu(t) {
        return Vu(t).then((t => t.Vh));
    }

    function vu(t) {
        return gu(t).then((t => t.wl));
    }

    function bu(t) {
        return gu(t).then((t => t.uu));
    }

    async function Su(t) {
        const e = await gu(t), n = e.El;
        return n.Uh = qo.bind(null, e.uu), n.Wh = Ko.bind(null, e.uu), n;
    }

    /** Enables the network connection and re-enqueues all pending operations. */ function Du(t) {
        return t.ls.enqueue((async () => {
            const e = await yu(t), n = await vu(t);
            return e.Po(!0), function(t) {
                const e = N$1(t);
                return e.Sh.delete(0 /* UserDisabled */), Zr(e);
            }(n);
        }));
    }

    /** Disables the network connection. Pending operations will not complete. */ function Cu(t) {
        return t.ls.enqueue((async () => {
            const e = await yu(t), n = await vu(t);
            return e.Po(!1), async function(t) {
                const e = N$1(t);
                e.Sh.add(0 /* UserDisabled */), await to(e), 
                // Set the OnlineState to Offline so get()s return from cache, etc.
                e.Nh.set("Offline" /* Offline */);
            }(n);
        }));
    }

    /**
     * Returns a Promise that resolves when all writes that were pending at the time
     * this method was called received server acknowledgement. An acknowledgement
     * can be either acceptance or rejection.
     */ function Nu(t, e) {
        const n = new Ts;
        return t.ls.Rs((async () => async function(t, e, n) {
            try {
                const s = await function(t, e) {
                    const n = N$1(t);
                    return n.persistence.runTransaction("read document", "readonly", (t => n.wc.Go(t, e)));
                }(t, e);
                s instanceof xt ? n.resolve(s) : s instanceof kt ? n.resolve(null) : n.reject(new k$1(x$1.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"));
            } catch (t) {
                const s = Ss(t, `Failed to get document '${e} from cache`);
                n.reject(s);
            }
        }
        /**
     * Retrieves a latency-compensated document from the backend via a
     * SnapshotListener.
     */ (await pu(t), e, n))), n.promise;
    }

    function xu(t, e, n = {}) {
        const s = new Ts;
        return t.ls.Rs((async () => function(t, e, n, s, i) {
            const r = new Pc$1({
                next: r => {
                    // Remove query first before passing event to user to avoid
                    // user actions affecting the now stale query.
                    e.Rs((() => Do(t, o)));
                    const c = r.docs.has(n);
                    !c && r.fromCache ? 
                    // TODO(dimond): If we're online and the document doesn't
                    // exist then we resolve with a doc.exists set to false. If
                    // we're offline however, we reject the Promise in this
                    // case. Two options: 1) Cache the negative response from
                    // the server so we can deliver that even when you're
                    // offline 2) Actually reject the Promise in the online case
                    // if the document doesn't exist.
                    i.reject(new k$1(x$1.UNAVAILABLE, "Failed to get document because the client is offline.")) : c && r.fromCache && s && "server" === s.source ? i.reject(new k$1(x$1.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r);
                },
                error: t => i.reject(t)
            }), o = new ko(oe(n.path), r, {
                includeMetadataChanges: !0,
                Xh: !0
            });
            return So(t, o);
        }(await Su(t), t.ls, e, n, s))), s.promise;
    }

    function ku(t, e) {
        const n = new Ts;
        return t.ls.Rs((async () => async function(t, e, n) {
            try {
                const s = await dr(t, e, 
                /* usePreviousResults= */ !0), i = new Fo(e, s.Ac), r = i.rl(s.documents), o = i.di(r, 
                /* updateLimboDocuments= */ !1);
                n.resolve(o.snapshot);
            } catch (t) {
                const s = Ss(t, `Failed to execute query '${e} against cache`);
                n.reject(s);
            }
        }
        /**
     * Retrieves a latency-compensated query snapshot from the backend via a
     * SnapshotListener.
     */ (await pu(t), e, n))), n.promise;
    }

    function Ou(t, e, n = {}) {
        const s = new Ts;
        return t.ls.Rs((async () => function(t, e, n, s, i) {
            const r = new Pc$1({
                next: n => {
                    // Remove query first before passing event to user to avoid
                    // user actions affecting the now stale query.
                    e.Rs((() => Do(t, o))), n.fromCache && "server" === s.source ? i.reject(new k$1(x$1.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                },
                error: t => i.reject(t)
            }), o = new ko(n, r, {
                includeMetadataChanges: !0,
                Xh: !0
            });
            return So(t, o);
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (await Su(t), t.ls, e, n, s))), s.promise;
    }

    function Mu(t, e) {
        const n = new Pc$1(e);
        return t.ls.Rs((async () => function(t, e) {
            N$1(t).qh.add(e), 
            // Immediately fire an initial event, indicating all existing listeners
            // are in-sync.
            e.next();
        }(await Su(t), n))), () => {
            n.jl(), t.ls.Rs((async () => function(t, e) {
                N$1(t).qh.delete(e);
            }(await Su(t), n)));
        };
    }

    /**
     * Takes an updateFunction in which a set of reads and writes can be performed
     * atomically. In the updateFunction, the client can read and write values
     * using the supplied transaction object. After the updateFunction, all
     * changes will be committed. If a retryable error occurs (ex: some other
     * client has changed any of the data referenced), then the updateFunction
     * will be called again after a backoff. If the updateFunction still fails
     * after all retries, then the transaction will be rejected.
     *
     * The transaction object passed to the updateFunction contains methods for
     * accessing documents and collections. Unlike other datastore access, data
     * accessed with the transaction will not reflect local changes that have not
     * been committed. For this reason, it is required that all reads are
     * performed before any writes. Transactions must be performed while online.
     */ function Fu(t, e) {
        const n = new Ts;
        return t.ls.Rs((async () => {
            const s = await function(t) {
                return gu(t).then((t => t.gh));
            }(t);
            new Au(t.ls, s, e, n).run();
        })), n.promise;
    }

    class $u {
        constructor() {
            // The last promise in the queue.
            this.tf = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.ef = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.nf = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.sf = [], 
            // visible for testing
            this.rf = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.cf = !1, 
            // List of TimerIds to fast-forward delays for.
            this.uf = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.Ka = new jr(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.af = () => {
                const t = Qr();
                t && p$1("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.Ka.Fa();
            };
            const t = Qr();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.af);
        }
        get z_() {
            return this.nf;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    Rs(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        J_(t) {
            this.hf(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.lf(t);
        }
        H_() {
            if (!this.nf) {
                this.nf = !0;
                const t = Qr();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.af);
            }
        }
        enqueue(t) {
            return this.hf(), this.nf ? new Promise((t => {})) : this.lf(t);
        }
        yo(t) {
            this.Rs((() => (this.ef.push(t), this._f())));
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async _f() {
            if (0 !== this.ef.length) {
                try {
                    await this.ef[0](), this.ef.shift(), this.Ka.reset();
                } catch (t) {
                    if (!Vs(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    p$1("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.ef.length > 0 && 
                // If there are additional operations, we re-schedule `retryNextOp()`.
                // This is necessary to run retryable operations that failed during
                // their initial attempt since we don't know whether they are already
                // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                // call scheduled here.
                // Since `backoffAndRun()` cancels an existing backoff and schedules a
                // new backoff on every call, there is only ever a single additional
                // operation in the queue.
                this.Ka.Oa((() => this._f()));
            }
        }
        lf(t) {
            const e = this.tf.then((() => (this.cf = !0, t().catch((t => {
                this.rf = t, this.cf = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw v$1("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error - Error or FirestoreError
     */
                function(t) {
                    let e = t.message || "";
                    t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                    return e;
                }
                /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
                /** DOMException error code constants. */ (t)), t;
            })).then((t => (this.cf = !1, t))))));
            return this.tf = e, e;
        }
        Er(t, e, n) {
            this.hf(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.uf.indexOf(t) > -1 && (e = 0);
            const s = bs.Es(this, t, e, n, (t => this.ff(t)));
            return this.sf.push(s), s;
        }
        hf() {
            this.rf && D$1();
        }
        Z_() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async df() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.tf, await t;
            } while (t !== this.tf);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    wf(t) {
            for (const e of this.sf) if (e._s === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId - Delayed operations up to and including this TimerId
         * will be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Ef(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.df().then((() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.sf.sort(((t, e) => t.fs - e.fs));
                for (const e of this.sf) if (e.As(), "all" /* All */ !== t && e._s === t) break;
                return this.df();
            }));
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    Tf(t) {
            this.uf.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    ff(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const e = this.sf.indexOf(t);
            this.sf.splice(e, 1);
        }
    }

    const Lu = -1;

    /**
     * The Cloud Firestore service interface.
     *
     * Do not call this constructor directly. Instead, use {@link getFirestore}.
     */
    class Bu extends Mc$1 {
        /** @hideconstructor */
        constructor(t, e) {
            super(t, e), this.If = new $u, this.Jl = "name" in t ? t.name : "[DEFAULT]";
        }
        u_() {
            return this.Af || 
            // The client must be initialized to ensure that all subsequent API
            // usage throws an exception.
            Qu(this), this.Af.terminate();
        }
    }

    /**
     * Initializes a new instance of Cloud Firestore with the provided settings.
     * Can only be called before any other function, including
     * {@link getFirestore}. If the custom settings are empty, this function is
     * equivalent to calling {@link getFirestore}.
     *
     * @param app - The {@link FirebaseApp} with which the `Firestore` instance will
     * be associated.
     * @param settings - A settings object to configure the `Firestore` instance.
     * @returns A newly initialized `Firestore` instance.
     */ function qu(e, n) {
        const s = app._getProvider(e, "firestore-exp").getImmediate();
        if (void 0 !== n.cacheSizeBytes && -1 !== n.cacheSizeBytes && n.cacheSizeBytes < 1048576) throw new k$1(x$1.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
        return s.r_(n), s;
    }

    /**
     * Returns the existing instance of Firestore that is associated with the
     * provided {@link FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app - The {@link FirebaseApp} instance that the returned Firestore
     * instance is associated with.
     * @returns The `Firestore` instance of the provided app.
     */ function Uu(e) {
        return app._getProvider(e, "firestore-exp").getImmediate();
    }

    function Ku(t) {
        return t.Af || Qu(t), t.Af.G_(), t.Af;
    }

    function Qu(t) {
        const e = t.c_(), n = function(t, e, n) {
            return new B(t, e, n.host, n.ssl, n.experimentalForceLongPolling, n.experimentalAutoDetectLongPolling);
        }(t.Zl, t.Jl, e);
        t.Af = new mu(t.t_, t.If, n);
    }

    /**
     * Attempts to enable persistent storage, if possible.
     *
     * Must be called before any other functions (other than
     * {@link initializeFirestore}, {@link getFirestore} or
     * {@link clearIndexedDbPersistence}.
     *
     * If this fails, `enableIndexedDbPersistence()` will reject the promise it
     * returns. Note that even after this failure, the `Firestore` instance will
     * remain usable, however offline persistence will be disabled.
     *
     * There are several reasons why this can fail, which can be identified by
     * the `code` on the error.
     *
     *   * failed-precondition: The app is already open in another browser tab.
     *   * unimplemented: The browser is incompatible with the offline
     *     persistence implementation.
     *
     * @param firestore - The `Firestore` instance to enable persistence for.
     * @param persistenceSettings - Optional settings object to configure
     * persistence.
     * @returns A promise that represents successfully enabling persistent storage.
     */ function Wu(t, e) {
        Zu(t = Nc$1(t, Bu));
        const n = Ku(t), s = t.c_(), i = new Rc$1;
        return Gu(n, i, new Ac$1(i, s.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
    }

    /**
     * Attempts to enable multi-tab persistent storage, if possible. If enabled
     * across all tabs, all operations share access to local persistence, including
     * shared execution of queries and latency-compensated local document updates
     * across all connected instances.
     *
     * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
     * it returns. Note that even after this failure, the `Firestore` instance will
     * remain usable, however offline persistence will be disabled.
     *
     * There are several reasons why this can fail, which can be identified by
     * the `code` on the error.
     *
     *   * failed-precondition: The app is already open in another browser tab and
     *     multi-tab is not enabled.
     *   * unimplemented: The browser is incompatible with the offline
     *     persistence implementation.
     *
     * @param firestore - The `Firestore` instance to enable persistence for.
     * @returns A promise that represents successfully enabling persistent
     * storage.
     */ function ju(t) {
        Zu(t = Nc$1(t, Bu));
        const e = Ku(t), n = t.c_(), s = new Rc$1;
        return Gu(e, s, new mc$1(s, n.cacheSizeBytes));
    }

    /**
     * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
     * If the operation fails with a recoverable error (see
     * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
     * but the client remains usable.
     */ function Gu(t, e, n) {
        const s = new Ts;
        return t.ls.enqueue((async () => {
            try {
                await Ru(t, n), await Pu(t, e), s.resolve();
            } catch (t) {
                if (!
                /**
     * Decides whether the provided error allows us to gracefully disable
     * persistence (as opposed to crashing the client).
     */
                function(t) {
                    if ("FirebaseError" === t.name) return t.code === x$1.FAILED_PRECONDITION || t.code === x$1.UNIMPLEMENTED;
                    if ("undefined" != typeof DOMException && t instanceof DOMException) 
                    // There are a few known circumstances where we can open IndexedDb but
                    // trying to read/write will fail (e.g. quota exceeded). For
                    // well-understood cases, we attempt to detect these and then gracefully
                    // fall back to memory persistence.
                    // NOTE: Rather than continue to add to this list, we could decide to
                    // always fall back, with the risk that we might accidentally hide errors
                    // representing actual SDK bugs.
                    // When the browser is out of quota we could get either quota exceeded
                    // or an aborted error depending on whether the error happened during
                    // schema migration.
                    return 22 === t.code || 20 === t.code || 
                    // Firefox Private Browsing mode disables IndexedDb and returns
                    // INVALID_STATE for any usage.
                    11 === t.code;
                    return !0;
                }
                /**
     * Clears the persistent storage. This includes pending writes and cached
     * documents.
     *
     * Must be called while the `Firestore` instance is not started (after the app is
     * terminated or when the app is first initialized). On startup, this function
     * must be called before other functions (other than {@link
     * initializeFirestore} or {@link getFirestore})). If the `Firestore`
     * instance is still running, the promise will be rejected with the error code
     * of `failed-precondition`.
     *
     * Note: `clearIndexedDbPersistence()` is primarily intended to help write
     * reliable tests that use Cloud Firestore. It uses an efficient mechanism for
     * dropping existing data but does not attempt to securely overwrite or
     * otherwise make cached data unrecoverable. For applications that are sensitive
     * to the disclosure of cached data in between user sessions, we strongly
     * recommend not enabling persistence at all.
     *
     * @param firestore - The `Firestore` instance to clear persistence for.
     * @returns A promise that is resolved when the persistent storage is
     * cleared. Otherwise, the promise is rejected with an error.
     */ (t)) throw t;
                console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + t), 
                s.reject(t);
            }
        })).then((() => s.promise));
    }

    function zu(t) {
        if (t.n_ && !t.s_) throw new k$1(x$1.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
        const e = new Ts;
        return t.If.J_((async () => {
            try {
                await async function(t) {
                    if (!ms.Kn()) return Promise.resolve();
                    const e = t + "main";
                    await ms.delete(e);
                }(er(t.Zl, t.Jl)), e.resolve();
            } catch (t) {
                e.reject(t);
            }
        })), e.promise;
    }

    /**
     * Waits until all currently pending writes for the active user have been
     * acknowledged by the backend.
     *
     * The returned Promise resolves immediately if there are no outstanding writes.
     * Otherwise, the Promise waits for all previously issued writes (including
     * those written in a previous app session), but it does not wait for writes
     * that were added after the function is called. If you want to wait for
     * additional writes, call `waitForPendingWrites()` again.
     *
     * Any outstanding `waitForPendingWrites()` Promises are rejected during user
     * changes.
     *
     * @returns A Promise which resolves when all currently pending writes have been
     * acknowledged by the backend.
     */ function Hu(t) {
        return function(t) {
            const e = new Ts;
            return t.ls.Rs((async () => Jo(await bu(t), e))), e.promise;
        }(Ku(t = Nc$1(t, Bu)));
    }

    /**
     * Re-enables use of the network for this Firestore instance after a prior
     * call to {@link disableNetwork}.
     *
     * @returns A promise that is resolved once the network has been enabled.
     */ function Ju(t) {
        return Du(Ku(t = Nc$1(t, Bu)));
    }

    /**
     * Disables network usage for this instance. It can be re-enabled via {@link
     * enableNetwork}. While the network is disabled, any snapshot listeners,
     * `getDoc()` or `getDocs()` calls will return results from cache, and any write
     * operations will be queued until the network is restored.
     *
     * @returns A promise that is resolved once the network has been disabled.
     */ function Yu(t) {
        return Cu(Ku(t = Nc$1(t, Bu)));
    }

    /**
     * Terminates the provided Firestore instance.
     *
     * After calling `terminate()` only the `clearIndexedDbPersistence()` function
     * may be used. Any other function will throw a `FirestoreError`.
     *
     * To restart after termination, create a new instance of FirebaseFirestore with
     * {@link getFirestore}.
     *
     * Termination does not cancel any pending writes, and any promises that are
     * awaiting a response from the server will not be resolved. If you have
     * persistence enabled, the next time you start this instance, it will resume
     * sending these writes to the server.
     *
     * Note: Under normal circumstances, calling `terminate()` is not required. This
     * function is useful only when you want to force this instance to release all
     * of its resources or in combination with `clearIndexedDbPersistence()` to
     * ensure that all local state is destroyed between test runs.
     *
     * @returns A promise that is resolved when the instance has been successfully
     * terminated.
     */ function Xu(t) {
        return app._removeServiceInstance(t.app, "firestore-exp"), t._delete();
    }

    function Zu(t) {
        if (t.n_ || t.s_) throw new k$1(x$1.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
     */
    class ta$1 {
        mf(t, e = "none") {
            switch (Et(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return ut(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.Rf(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.Pf(t, e);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.Vf(at(t.bytesValue));

              case 7 /* RefValue */ :
                return this.gf(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.yf(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.pf(t.arrayValue, e);

              case 10 /* ObjectValue */ :
                return this.vf(t.mapValue, e);

              default:
                throw D$1();
            }
        }
        vf(t, e) {
            const n = {};
            return nt(t.fields || {}, ((t, s) => {
                n[t] = this.mf(s, e);
            })), n;
        }
        yf(t) {
            return new Wc$1(ut(t.latitude), ut(t.longitude));
        }
        pf(t, e) {
            return (t.values || []).map((t => this.mf(t, e)));
        }
        Pf(t, e) {
            switch (e) {
              case "previous":
                const n = lt(t);
                return null == n ? null : this.mf(n, e);

              case "estimate":
                return this.Rf(_t(t));

              default:
                return null;
            }
        }
        Rf(t) {
            const e = ct(t);
            return new z$1(e.seconds, e.nanos);
        }
        bf(t, e) {
            const n = Y$1.nt(t);
            C(Es(n));
            const s = new q$1(n.get(1), n.get(3)), i = new tt(n.j(5));
            return s.isEqual(e) || 
            // TODO(b/64130202): Somehow support foreign references.
            v$1(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), 
            i;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */ class ea$1 {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        /** @hideconstructor protected */
        constructor(t, e, n, s, i) {
            this.Sf = t, this.Df = e, this.h_ = n, this.Cf = s, this.a_ = i;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this.h_.path.J();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new Fc$1(this.Sf, this.a_, this.h_);
        }
        /**
         * Signals whether or not the document at the snapshot's location exists.
         *
         * @returns true if the document exists.
         */    exists() {
            return null !== this.Cf;
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * @returns An `Object` containing all fields in the document or `undefined`
         * if the document doesn't exist.
         */    data() {
            if (this.Cf) {
                if (this.a_) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new na$1(this.Sf, this.Df, this.h_, this.Cf, 
                    /* converter= */ null);
                    return this.a_.fromFirestore(t);
                }
                return this.Df.mf(this.Cf.yt());
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @returns The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t) {
            if (this.Cf) {
                const e = this.Cf.data().field(sa$1("DocumentSnapshot.get", t));
                if (null !== e) return this.Df.mf(e);
            }
        }
    }

    /**
     * A `QueryDocumentSnapshot` contains data read from a document in your
     * Firestore database as part of a query. The document is guaranteed to exist
     * and its data can be extracted with `.data()` or `.get(<field>)` to get a
     * specific field.
     *
     * A `QueryDocumentSnapshot` offers the same API surface as a
     * `DocumentSnapshot`. Since query results contain only existing documents, the
     * `exists` property will always be true and `data()` will never return
     * 'undefined'.
     */ class na$1 extends ea$1 {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * @override
         * @returns An `Object` containing all fields in the document.
         */
        data() {
            return super.data();
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function sa$1(t, e) {
        return "string" == typeof e ? wu(t, e) : e instanceof vc$1 ? e.Hl.zl : e.zl;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Metadata about a snapshot, describing the state of the snapshot.
     */ class ia {
        /** @hideconstructor */
        constructor(t, e) {
            this.hasPendingWrites = t, this.fromCache = e;
        }
        /**
         * Returns true if this `SnapshotMetadata` is equal to the provided one.
         *
         * @param other - The `SnapshotMetadata` to compare against.
         * @returns true if this `SnapshotMetadata` is equal to the provided one.
         */    isEqual(t) {
            return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
        }
    }

    /**
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */ class ra$1 extends ea$1 {
        /** @hideconstructor protected */
        constructor(t, e, n, s, i, r) {
            super(t, e, n, s, r), this.Sf = t, this.Nf = t, this.metadata = i;
        }
        /**
         * Property of the `DocumentSnapshot` that signals whether or not the data
         * exists. True if the document exists.
         */    exists() {
            return super.exists();
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * By default, `FieldValue.serverTimestamp()` values that have not yet been
         * set to their final value will be returned as `null`. You can override
         * this by passing an options object.
         *
         * @param options - An options object to configure how data is retrieved from
         * the snapshot (for example the desired behavior for server timestamps that
         * have not yet been set to their final value).
         * @returns An `Object` containing all fields in the document or `undefined` if
         * the document doesn't exist.
         */    data(t = {}) {
            if (this.Cf) {
                if (this.a_) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const e = new oa$1(this.Sf, this.Df, this.h_, this.Cf, this.metadata, 
                    /* converter= */ null);
                    return this.a_.fromFirestore(e, t);
                }
                return this.Df.mf(this.Cf.yt(), t.serverTimestamps);
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
         * its final value will be returned as `null`. You can override this by
         * passing an options object.
         *
         * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @param options - An options object to configure how the field is retrieved
         * from the snapshot (for example the desired behavior for server timestamps
         * that have not yet been set to their final value).
         * @returns The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t, e = {}) {
            if (this.Cf) {
                const n = this.Cf.data().field(sa$1("DocumentSnapshot.get", t));
                if (null !== n) return this.Df.mf(n, e.serverTimestamps);
            }
        }
    }

    /**
     * A `QueryDocumentSnapshot` contains data read from a document in your
     * Firestore database as part of a query. The document is guaranteed to exist
     * and its data can be extracted with `.data()` or `.get(<field>)` to get a
     * specific field.
     *
     * A `QueryDocumentSnapshot` offers the same API surface as a
     * `DocumentSnapshot`. Since query results contain only existing documents, the
     * `exists` property will always be true and `data()` will never return
     * 'undefined'.
     */ class oa$1 extends ra$1 {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * By default, `FieldValue.serverTimestamp()` values that have not yet been
         * set to their final value will be returned as `null`. You can override
         * this by passing an options object.
         *
         * @override
         * @param options - An options object to configure how data is retrieved from
         * the snapshot (for example the desired behavior for server timestamps that
         * have not yet been set to their final value).
         * @returns An `Object` containing all fields in the document.
         */
        data(t = {}) {
            return super.data(t);
        }
    }

    /**
     * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
     * representing the results of a query. The documents can be accessed as an
     * array via the `docs` property or enumerated using the `forEach` method. The
     * number of documents can be determined via the `empty` and `size`
     * properties.
     */ class ca$1 {
        /** @hideconstructor */
        constructor(t, e, n, s) {
            this.Sf = t, this.Df = e, this.xf = s, this.metadata = new ia(s.hasPendingWrites, s.fromCache), 
            this.query = n;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            const t = [];
            return this.forEach((e => t.push(e))), t;
        }
        /** The number of documents in the `QuerySnapshot`. */    get size() {
            return this.xf.docs.size;
        }
        /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
            return 0 === this.size;
        }
        /**
         * Enumerates all of the documents in the `QuerySnapshot`.
         *
         * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
         * each document in the snapshot.
         * @param thisArg - The `this` binding for the callback.
         */    forEach(t, e) {
            this.xf.docs.forEach((n => {
                t.call(e, new oa$1(this.Sf, this.Df, n.key, n, new ia(this.xf.Se.has(n.key), this.xf.fromCache), this.query.a_));
            }));
        }
        /**
         * Returns an array of the documents changes since the last snapshot. If this
         * is the first snapshot, all documents will be in the list as 'added'
         * changes.
         *
         * @param options - `SnapshotListenOptions` that control whether metadata-only
         * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
         * snapshot events.
         */    docChanges(t = {}) {
            const e = !!t.includeMetadataChanges;
            if (e && this.xf.Ce) throw new k$1(x$1.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
            return this.kf && this.Of === e || (this.kf = 
            /** Calculates the array of DocumentChanges for a given ViewSnapshot. */
            function(t, e) {
                if (t.xf.be.Y()) {
                    // Special case the first snapshot because index calculation is easy and
                    // fast
                    let e, n = 0;
                    return t.xf.docChanges.map((s => {
                        const i = new oa$1(t.Sf, t.Df, s.doc.key, s.doc, new ia(t.xf.Se.has(s.doc.key), t.xf.fromCache), t.query.a_);
                        return e = s.doc, {
                            type: "added",
                            doc: i,
                            oldIndex: -1,
                            newIndex: n++
                        };
                    }));
                }
                {
                    // A DocumentSet that is updated incrementally as changes are applied to use
                    // to lookup the index of a document.
                    let n = t.xf.be;
                    return t.xf.docChanges.filter((t => e || 3 /* Metadata */ !== t.type)).map((e => {
                        const s = new oa$1(t.Sf, t.Df, e.doc.key, e.doc, new ia(t.xf.Se.has(e.doc.key), t.xf.fromCache), t.query.a_);
                        let i = -1, r = -1;
                        return 0 /* Added */ !== e.type && (i = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 
                        1 /* Removed */ !== e.type && (n = n.add(e.doc), r = n.indexOf(e.doc.key)), {
                            type: ua$1(e.type),
                            doc: s,
                            oldIndex: i,
                            newIndex: r
                        };
                    }));
                }
            }(this, e), this.Of = e), this.kf;
        }
    }

    function ua$1(t) {
        switch (t) {
          case 0 /* Added */ :
            return "added";

          case 2 /* Modified */ :
          case 3 /* Metadata */ :
            return "modified";

          case 1 /* Removed */ :
            return "removed";

          default:
            return D$1();
        }
    }

    // TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
    // metadata
    /**
     * Returns true if the provided snapshots are equal.
     *
     * @param left - A snapshot to compare.
     * @param right - A snapshot to compare.
     * @returns true if the snapshots are equal.
     */ function aa$1(t, e) {
        return t instanceof ra$1 && e instanceof ra$1 ? t.Sf === e.Sf && t.h_.isEqual(e.h_) && (null === t.Cf ? null === e.Cf : t.Cf.isEqual(e.Cf)) && t.a_ === e.a_ : t instanceof ca$1 && e instanceof ca$1 && (t.Sf === e.Sf && Qc$1(t.query, e.query) && t.metadata.isEqual(e.metadata) && t.xf.isEqual(e.xf));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function ha$1(t) {
        if (ue(t) && 0 === t.Ct.length) throw new k$1(x$1.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }

    /**
     * A `QueryConstraint` is used to narrow the set of documents returned by a
     * Firestore query. `QueryConstraint`s are created by invoking {@link where},
     * {@link orderBy}, {@link startAt}, {@link startAfter}, {@link
     * endBefore}, {@link endAt}, {@link limit} or {@link limitToLast} and
     * can then be passed to {@link query} to create a new query instance that
     * also contains this `QueryConstraint`.
     */ class la {}

    /**
     * Creates a new immutable instance of `query` that is extended to also include
     * additional query constraints.
     *
     * @param query - The query instance to use as a base for the new constraints.
     * @param queryConstraints - The list of `QueryConstraint`s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function _a$1(t, ...e) {
        for (const n of e) t = n.Mf(t);
        return t;
    }

    class fa$1 extends la {
        constructor(t, e, n) {
            super(), this.Ff = t, this.$f = e, this.Lf = n, this.type = "where";
        }
        Mf(t) {
            const e = Xc$1(t.firestore), n = function(t, e, n, s, i, r, o) {
                let c;
                if (i.rt()) {
                    if ("array-contains" /* ARRAY_CONTAINS */ === r || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === r) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on FieldPath.documentId().`);
                    if ("in" /* IN */ === r || "not-in" /* NOT_IN */ === r) {
                        ba$1(o, r);
                        const e = [];
                        for (const n of o) e.push(va$1(s, t, n));
                        c = {
                            arrayValue: {
                                values: e
                            }
                        };
                    } else c = va$1(s, t, o);
                } else "in" /* IN */ !== r && "not-in" /* NOT_IN */ !== r && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== r || ba$1(o, r), 
                c = uu(n, e, o, 
                /* allowArrays= */ "in" /* IN */ === r || "not-in" /* NOT_IN */ === r);
                const u = Ut.create(i, r, c);
                return function(t, e) {
                    if (e.Dt()) {
                        const n = he(t);
                        if (null !== n && !n.isEqual(e.field)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
                        const s = ae(t);
                        null !== s && Sa$1(t, e.field, s);
                    }
                    const n = function(t, e) {
                        for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;
                        return null;
                    }(t, 
                    /**
     * Given an operator, returns the set of operators that cannot be used with it.
     *
     * Operators in a query must adhere to the following set of rules:
     * 1. Only one array operator is allowed.
     * 2. Only one disjunctive operator is allowed.
     * 3. NOT_EQUAL cannot be used with another NOT_EQUAL operator.
     * 4. NOT_IN cannot be used with array, disjunctive, or NOT_EQUAL operators.
     *
     * Array operators: ARRAY_CONTAINS, ARRAY_CONTAINS_ANY
     * Disjunctive operators: IN, ARRAY_CONTAINS_ANY, NOT_IN
     */
                    function(t) {
                        switch (t) {
                          case "!=" /* NOT_EQUAL */ :
                            return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                          case "array-contains" /* ARRAY_CONTAINS */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                          case "in" /* IN */ :
                            return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                          case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                          case "not-in" /* NOT_IN */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                          default:
                            return [];
                        }
                    }(e.op));
                    if (null !== n) 
                    // Special case when it's a duplicate op to give a slightly clearer error message.
                    throw n === e.op ? new k$1(x$1.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new k$1(x$1.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
                }(t, u), u;
            }(t.__, "where", e, t.firestore.Zl, this.Ff, this.$f, this.Lf);
            return new $c$1(t.firestore, t.a_, function(t, e) {
                const n = t.filters.concat([ e ]);
                return new ie(t.path, t.collectionGroup, t.Ct.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
            }(t.__, n));
        }
    }

    /**
     * Creates a `QueryConstraint` that enforces that documents must contain the
     * specified field and that the value should satisfy the relation constraint
     * provided.
     *
     * @param fieldPath - The path to compare
     * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
     *   "&lt;=", "!=").
     * @param value - The value for comparison
     * @returns The created `Query`.
     */ function da$1(t, e, n) {
        const s = e, i = sa$1("where", t);
        return new fa$1(i, s, n);
    }

    class wa$1 extends la {
        constructor(t, e) {
            super(), this.Ff = t, this.Bf = e, this.type = "orderBy";
        }
        Mf(t) {
            const e = function(t, e, n) {
                if (null !== t.startAt) throw new k$1(x$1.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                if (null !== t.endAt) throw new k$1(x$1.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                const s = new te(e, n);
                return function(t, e) {
                    if (null === ae(t)) {
                        // This is the first order by. It must match any inequality.
                        const n = he(t);
                        null !== n && Sa$1(t, n, e.field);
                    }
                }(t, s), s;
            }
            /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */ (t.__, this.Ff, this.Bf);
            return new $c$1(t.firestore, t.a_, function(t, e) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const n = t.Ct.concat([ e ]);
                return new ie(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }(t.__, e));
        }
    }

    /**
     * Creates a `QueryConstraint` that sorts the query result by the
     * specified field, optionally in descending order instead of ascending.
     *
     * @param fieldPath - The field to sort by.
     * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
     * not specified, order will be ascending.
     * @returns The created `Query`.
     */ function Ea$1(t, e = "asc") {
        const n = e, s = sa$1("orderBy", t);
        return new wa$1(s, n);
    }

    class Ta$1 extends la {
        constructor(t, e, n) {
            super(), this.type = t, this.qf = e, this.Uf = n;
        }
        Mf(t) {
            return new $c$1(t.firestore, t.a_, de(t.__, this.qf, this.Uf));
        }
    }

    /**
     * Creates a `QueryConstraint` that only returns the first matching documents.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function Ia$1(t) {
        return xc("limit", t), new Ta$1("limit", t, "F" /* First */);
    }

    /**
     * Creates a `QueryConstraint` that only returns the last matching documents.
     *
     * You must specify at least one `orderBy` clause for `limitToLast` queries,
     * otherwise an exception will be thrown during execution.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function Aa$1(t) {
        return xc("limitToLast", t), new Ta$1("limitToLast", t, "L" /* Last */);
    }

    class ma$1 extends la {
        constructor(t, e, n) {
            super(), this.type = t, this.Kf = e, this.Qf = n;
        }
        Mf(t) {
            const e = pa$1(t, this.type, this.Kf, this.Qf);
            return new $c$1(t.firestore, t.a_, function(t, e) {
                return new ie(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
            }(t.__, e));
        }
    }

    function Ra$1(...t) {
        return new ma$1("startAt", t, /*before=*/ !0);
    }

    function Pa$1(...t) {
        return new ma$1("startAfter", t, 
        /*before=*/ !1);
    }

    class Va$1 extends la {
        constructor(t, e, n) {
            super(), this.type = t, this.Kf = e, this.Qf = n;
        }
        Mf(t) {
            const e = pa$1(t, this.type, this.Kf, this.Qf);
            return new $c$1(t.firestore, t.a_, function(t, e) {
                return new ie(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
            }(t.__, e));
        }
    }

    function ga(...t) {
        return new Va$1("endBefore", t, /*before=*/ !0);
    }

    function ya(...t) {
        return new Va$1("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function pa$1(t, e, n, s) {
        if (n[0] instanceof vc$1 && (n[0] = n[0].Hl), n[0] instanceof ea$1) return function(t, e, n, s, i) {
            if (!s) throw new k$1(x$1.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
            const r = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const n of _e(t)) if (n.field.rt()) r.push(Vt(e, s.key)); else {
                const t = s.field(n.field);
                if (ht(t)) throw new k$1(x$1.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = n.field.et();
                    throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                r.push(t);
            }
            return new Xt(r, i);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.__, t.firestore.Zl, e, n[0].Cf, s);
        {
            const i = Xc$1(t.firestore);
            return function(t, e, n, s, i, r) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.Ct;
                if (i.length > o.length) throw new k$1(x$1.INVALID_ARGUMENT, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const c = [];
                for (let r = 0; r < i.length; r++) {
                    const u = i[r];
                    if (o[r].field.rt()) {
                        if ("string" != typeof u) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof u}`);
                        if (!le(t) && -1 !== u.indexOf("/")) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${s}() must be a plain document ID, but '${u}' contains a slash.`);
                        const n = t.path.child(Y$1.nt(u));
                        if (!tt.lt(n)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                        const i = new tt(n);
                        c.push(Vt(e, i));
                    } else {
                        const t = uu(n, s, u);
                        c.push(t);
                    }
                }
                return new Xt(c, r);
            }
            /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */ (t.__, t.firestore.Zl, i, e, n, s);
        }
    }

    function va$1(t, e, n) {
        if (n instanceof vc$1 && (n = n.Hl), "string" == typeof n) {
            if ("" === n) throw new k$1(x$1.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!le(e) && -1 !== n.indexOf("/")) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
            const s = e.path.child(Y$1.nt(n));
            if (!tt.lt(s)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return Vt(t, new tt(s));
        }
        if (n instanceof Fc$1) return Vt(t, n.h_);
        throw new k$1(x$1.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Cc$1(n) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function ba$1(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
        if (t.length > 10) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
    }

    function Sa$1(t, e, n) {
        if (!n.isEqual(e)) throw new k$1(x$1.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */ function Da$1(t, e, n) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, 
        s;
    }

    class Ca$1 extends ta$1 {
        constructor(t) {
            super(), this.firestore = t;
        }
        Vf(t) {
            return new Vc$1(t);
        }
        gf(t) {
            const e = this.bf(t, this.firestore.Zl);
            return new Fc$1(this.firestore, /* converter= */ null, e);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A write batch, used to perform multiple writes as a single atomic unit.
     *
     * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
     * provides methods for adding writes to the write batch. None of the writes
     * will be committed (or visible locally) until {@link WriteBatch#commit} is
     * called.
     */ class Na$1 {
        /** @hideconstructor */
        constructor(t, e) {
            this.Sf = t, this.Wf = e, this.jf = [], this.Gf = !1, this.zf = Xc$1(t);
        }
        set(t, e, n) {
            this.Hf();
            const s = xa(t, this.Sf), i = Da$1(s.a_, e, n), r = Zc$1(this.zf, "WriteBatch.set", s.h_, i, null !== s.a_, n);
            return this.jf.push(r.w_(s.h_, Be.Kt())), this;
        }
        update(t, e, n, ...s) {
            this.Hf();
            const i = xa(t, this.Sf);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let r;
            return e instanceof vc$1 && (e = e.Hl), r = "string" == typeof e || e instanceof gc$1 ? cu(this.zf, "WriteBatch.update", i.h_, e, n, s) : ou(this.zf, "WriteBatch.update", i.h_, e), 
            this.jf.push(r.w_(i.h_, Be.exists(!0))), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `WriteBatch` instance. Used for chaining method calls.
         */    delete(t) {
            this.Hf();
            const e = xa(t, this.Sf);
            return this.jf = this.jf.concat(new tn(e.h_, Be.Kt())), this;
        }
        /**
         * Commits all of the writes in this write batch as a single atomic unit.
         *
         * The result of these writes will only be reflected in document reads that
         * occur after the returned Promise resolves. If the client is offline, the
         * write fails. If you would like to see local modifications or buffer writes
         * until the client is online, use the full Firestore SDK.
         *
         * @returns A Promise resolved once all of the writes in the batch have been
         * successfully written to the backend as an atomic unit (note that it won't
         * resolve while you're offline).
         */    commit() {
            return this.Hf(), this.Gf = !0, this.jf.length > 0 ? this.Wf(this.jf) : Promise.resolve();
        }
        Hf() {
            if (this.Gf) throw new k$1(x$1.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function xa(t, e) {
        if (t instanceof vc$1 && (t = t.Hl), t.firestore !== e) throw new k$1(x$1.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
    // legacy SDK.
    /**
     * A reference to a transaction.
     *
     * The `Transaction` object passed to a transaction's `updateFunction` provides
     * the methods to read and write data within the transaction context. See
     * {@link runTransaction}.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function ka$1(t) {
        /**
     * Returns true if obj is an object and contains at least one of the specified
     * methods.
     */
        return function(t, e) {
            if ("object" != typeof t || null === t) return !1;
            const n = t;
            for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
            return !1;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /**
     * Reads the document referred to by this `DocumentReference`.
     *
     * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
     * for data from the server, but it may return cached data or fail if you are
     * offline and the server cannot be reached. To specify this behavior, invoke
     * {@link getDocFromCache} or {@link getDocFromServer}.
     *
     * @param reference - The reference of the document to fetch.
     * @returns A Promise resolved with a `DocumentSnapshot` containing the
     * current document contents.
     */ (t, [ "next", "error", "complete" ]);
    }

    function Oa$1(t) {
        t = Nc$1(t, Fc$1);
        const e = Nc$1(t.firestore, Bu);
        return xu(Ku(e), t.h_).then((n => Ha$1(e, t, n)));
    }

    class Ma$1 extends ta$1 {
        constructor(t) {
            super(), this.firestore = t;
        }
        Vf(t) {
            return new Vc$1(t);
        }
        gf(t) {
            const e = this.bf(t, this.firestore.Zl);
            return new Fc$1(this.firestore, /* converter= */ null, e);
        }
    }

    /**
     * Reads the document referred to by this `DocumentReference` from cache.
     * Returns an error if the document is not currently cached.
     *
     * @returns A Promise resolved with a `DocumentSnapshot` containing the
     * current document contents.
     */ function Fa$1(t) {
        t = Nc$1(t, Fc$1);
        const e = Nc$1(t.firestore, Bu), n = Ku(e), s = new Ma$1(e);
        return Nu(n, t.h_).then((n => new ra$1(e, s, t.h_, n, new ia(n instanceof xt && n.gt, 
        /* fromCache= */ !0), t.a_)));
    }

    /**
     * Reads the document referred to by this `DocumentReference` from the server.
     * Returns an error if the network is not available.
     *
     * @returns A Promise resolved with a `DocumentSnapshot` containing the
     * current document contents.
     */ function $a$1(t) {
        t = Nc$1(t, Fc$1);
        const e = Nc$1(t.firestore, Bu);
        return xu(Ku(e), t.h_, {
            source: "server"
        }).then((n => Ha$1(e, t, n)));
    }

    /**
     * Executes the query and returns the results as a `QuerySnapshot`.
     *
     * Note: `getDocs()` attempts to provide up-to-date data when possible by
     * waiting for data from the server, but it may return cached data or fail if
     * you are offline and the server cannot be reached. To specify this behavior,
     * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
     *
     * @returns A Promise that will be resolved with the results of the query.
     */ function La$1(t) {
        t = Nc$1(t, $c$1);
        const e = Nc$1(t.firestore, Bu), n = Ku(e), s = new Ma$1(e);
        return ha$1(t.__), Ou(n, t.__).then((n => new ca$1(e, s, t, n)));
    }

    /**
     * Executes the query and returns the results as a `QuerySnapshot` from cache.
     * Returns an error if the document is not currently cached.
     *
     * @returns A Promise that will be resolved with the results of the query.
     */ function Ba$1(t) {
        t = Nc$1(t, $c$1);
        const e = Nc$1(t.firestore, Bu), n = Ku(e), s = new Ma$1(e);
        return ku(n, t.__).then((n => new ca$1(e, s, t, n)));
    }

    /**
     * Executes the query and returns the results as a `QuerySnapshot` from the
     * server. Returns an error if the network is not available.
     *
     * @returns A Promise that will be resolved with the results of the query.
     */ function qa$1(t) {
        t = Nc$1(t, $c$1);
        const e = Nc$1(t.firestore, Bu), n = Ku(e), s = new Ma$1(e);
        return Ou(n, t.__, {
            source: "server"
        }).then((n => new ca$1(e, s, t, n)));
    }

    function Ua$1(t, e, n) {
        t = Nc$1(t, Fc$1);
        const s = Nc$1(t.firestore, Bu), i = Da$1(t.a_, e, n);
        return za$1(s, [ Zc$1(Xc$1(s), "setDoc", t.h_, i, null !== t.a_, n).w_(t.h_, Be.Kt()) ]);
    }

    function Ka$1(t, e, n, ...s) {
        t = Nc$1(t, Fc$1);
        const i = Nc$1(t.firestore, Bu), r = Xc$1(i);
        let o;
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        e instanceof vc$1 && (e = e.Hl), o = "string" == typeof e || e instanceof gc$1 ? cu(r, "updateDoc", t.h_, e, n, s) : ou(r, "updateDoc", t.h_, e);
        return za$1(i, [ o.w_(t.h_, Be.exists(!0)) ]);
    }

    /**
     * Deletes the document referred to by the specified `DocumentReference`.
     *
     * @param reference - A reference to the document to delete.
     * @returns A Promise resolved once the document has been successfully
     * deleted from the backend (note that it won't resolve while you're offline).
     */ function Qa$1(t) {
        return za$1(Nc$1(t.firestore, Bu), [ new tn(t.h_, Be.Kt()) ]);
    }

    /**
     * Add a new document to specified `CollectionReference` with the given data,
     * assigning it a document ID automatically.
     *
     * @param reference - A reference to the collection to add this document to.
     * @param data - An Object containing the data for the new document.
     * @returns A Promise resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend (Note that it
     * won't resolve while you're offline).
     */ function Wa$1(t, e) {
        const n = Nc$1(t.firestore, Bu), s = Uc$1(t), i = Da$1(t.a_, e);
        return za$1(n, [ Zc$1(Xc$1(t.firestore), "addDoc", s.h_, i, null !== t.a_, {}).w_(s.h_, Be.exists(!1)) ]).then((() => s));
    }

    function ja$1(t, ...e) {
        var n, s, i;
        t instanceof vc$1 && (t = t.Hl);
        let r = {
            includeMetadataChanges: !1
        }, o = 0;
        "object" != typeof e[o] || ka$1(e[o]) || (r = e[o], o++);
        const c = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        if (ka$1(e[o])) {
            const t = e[o];
            e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (s = t.error) || void 0 === s ? void 0 : s.bind(t), 
            e[o + 2] = null === (i = t.complete) || void 0 === i ? void 0 : i.bind(t);
        }
        let u, a, h;
        if (t instanceof Fc$1) a = Nc$1(t.firestore, Bu), h = oe(t.h_.path), u = {
            next: n => {
                e[o] && e[o](Ha$1(a, t, n));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }; else {
            const n = Nc$1(t, $c$1);
            a = Nc$1(n.firestore, Bu), h = n.__;
            const s = new Ma$1(a);
            u = {
                next: t => {
                    e[o] && e[o](new ca$1(a, s, n, t));
                },
                error: e[o + 1],
                complete: e[o + 2]
            }, ha$1(t.__);
        }
        return function(t, e, n, s) {
            const i = new Pc$1(s), r = new ko(e, i, n);
            return t.ls.Rs((async () => So(await Su(t), r))), () => {
                i.jl(), t.ls.Rs((async () => Do(await Su(t), r)));
            };
        }(Ku(a), h, c, u);
    }

    function Ga$1(t, e) {
        return Mu(Ku(t = Nc$1(t, Bu)), ka$1(e) ? e : {
            next: e
        });
    }

    /** Locally writes `mutations` on the async queue. */ function za$1(t, e) {
        return function(t, e) {
            const n = new Ts;
            return t.ls.Rs((async () => Qo(await bu(t), e, n))), n.promise;
        }(Ku(t), e);
    }

    /**
     * Converts a ViewSnapshot that contains the single document specified by `ref`
     * to a DocumentSnapshot.
     */ function Ha$1(t, e, n) {
        const s = n.docs.get(e.h_), i = new Ma$1(t);
        return new ra$1(t, i, e.h_, s, new ia(n.hasPendingWrites, n.fromCache), e.a_);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A reference to a transaction.
     *
     * The `Transaction` object passed to a transaction's `updateFunction` provides
     * the methods to read and write data within the transaction context. See
     * {@link runTransaction}.
     */ class Ja$1 extends class {
        /** @hideconstructor */
        constructor(t, e) {
            this.Sf = t, this.Jf = e, this.zf = Xc$1(t);
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */    get(t) {
            const e = xa(t, this.Sf), n = new Ca$1(this.Sf);
            return this.Jf.O_([ e.h_ ]).then((t => {
                if (!t || 1 !== t.length) return D$1();
                const s = t[0];
                if (s instanceof kt) return new ea$1(this.Sf, n, e.h_, null, e.a_);
                if (s instanceof xt) return new ea$1(this.Sf, n, s.key, s, e.a_);
                throw D$1();
            }));
        }
        set(t, e, n) {
            const s = xa(t, this.Sf), i = Da$1(s.a_, e, n), r = Zc$1(this.zf, "Transaction.set", s.h_, i, null !== s.a_, n);
            return this.Jf.set(s.h_, r), this;
        }
        update(t, e, n, ...s) {
            const i = xa(t, this.Sf);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let r;
            return e instanceof vc$1 && (e = e.Hl), r = "string" == typeof e || e instanceof gc$1 ? cu(this.zf, "Transaction.update", i.h_, e, n, s) : ou(this.zf, "Transaction.update", i.h_, e), 
            this.Jf.update(i.h_, r), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `Transaction` instance. Used for chaining method calls.
         */    delete(t) {
            const e = xa(t, this.Sf);
            return this.Jf.delete(e.h_), this;
        }
    } {
        // This class implements the same logic as the Transaction API in the Lite SDK
        // but is subclassed in order to return its own DocumentSnapshot types.
        /** @hideconstructor */
        constructor(t, e) {
            super(t, e), this.Sf = t;
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */    get(t) {
            const e = xa(t, this.Sf), n = new Ma$1(this.Sf);
            return super.get(t).then((t => new ra$1(this.Sf, n, e.h_, t.Cf, new ia(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), e.a_)));
        }
    }

    /**
     * Executes the given `updateFunction` and then attempts to commit the changes
     * applied within the transaction. If any document read within the transaction
     * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
     * commit after 5 attempts, the transaction fails.
     *
     * The maximum number of writes allowed in a single transaction is 500.
     *
     * @param firestore - A reference to the Firestore database to run this
     * transaction against.
     * @param updateFunction - The function to execute within the transaction
     * context.
     * @returns If the transaction completed successfully or was explicitly aborted
     * (the `updateFunction` returned a failed promise), the promise returned by the
     * `updateFunction `is returned here. Otherwise, if the transaction failed, a
     * rejected promise with the corresponding failure error is returned.
     */ function Ya$1(t, e) {
        return Fu(Ku(t), (n => e(new Ja$1(t, n))));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns a sentinel for use with {@link updateDoc} or
     * {@link setDoc} with `{merge: true}` to mark a field for deletion.
     */ function Xa$1() {
        return new tu("deleteField");
    }

    /**
     * Returns a sentinel used with {@link setDoc} or {@link updateDoc} to
     * include a server-generated timestamp in the written data.
     */ function Za$1() {
        return new nu("serverTimestamp");
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to union the given elements with any array
     * value that already exists on the server. Each specified element that doesn't
     * already exist in the array will be added to the end. If the field being
     * modified is not already an array it will be overwritten with an array
     * containing exactly the specified elements.
     *
     * @param elements - The elements to union into the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`.
     */ function th(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new su("arrayUnion", t);
    }

    /**
     * Returns a special value that can be used with {@link (setDoc:1)} or {@link
     * updateDoc} that tells the server to remove the given elements from any
     * array value that already exists on the server. All instances of each element
     * specified will be removed from the array. If the field being modified is not
     * already an array it will be overwritten with an empty array.
     *
     * @param elements - The elements to remove from the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function eh(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new iu("arrayRemove", t);
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to increment the field's current value by
     * the given value.
     *
     * If either the operand or the current field value uses floating point
     * precision, all arithmetic follows IEEE 754 semantics. If both values are
     * integers, values outside of JavaScript's safe number range
     * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
     * precision loss. Furthermore, once processed by the Firestore backend, all
     * integer operations are capped between -2^63 and 2^63-1.
     *
     * If the current field value is not of type `number`, or if the field does not
     * yet exist, the transformation sets the field to the given value.
     *
     * @param n - The value to increment by.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function nh(t) {
        return new ru("increment", t);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Creates a write batch, used for performing multiple writes as a single
     * atomic operation. The maximum number of writes allowed in a single WriteBatch
     * is 500.
     *
     * Unlike transactions, write batches are persisted offline and therefore are
     * preferable when you don't need to condition your writes on read data.
     *
     * @returns A `WriteBatch` that can be used to atomically execute multiple
     * writes.
     */ function sh(t) {
        return Ku(t = Nc$1(t, Bu)), new Na$1(t, (e => za$1(t, e)));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ app._registerComponent(new Component("firestore-exp", (t => ((t, e) => new Bu(t, e))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal"))), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-exp", "0.0.900", "node");

    exports.Bytes = Vc$1;
    exports.CACHE_SIZE_UNLIMITED = Lu;
    exports.CollectionReference = Lc$1;
    exports.DocumentReference = Fc$1;
    exports.DocumentSnapshot = ra$1;
    exports.FieldPath = gc$1;
    exports.FieldValue = pc$1;
    exports.FirebaseFirestore = Bu;
    exports.FirestoreError = k$1;
    exports.GeoPoint = Wc$1;
    exports.Query = $c$1;
    exports.QueryConstraint = la;
    exports.QueryDocumentSnapshot = oa$1;
    exports.QuerySnapshot = ca$1;
    exports.SnapshotMetadata = ia;
    exports.Timestamp = z$1;
    exports.Transaction = Ja$1;
    exports.WriteBatch = Na$1;
    exports.addDoc = Wa$1;
    exports.arrayRemove = eh;
    exports.arrayUnion = th;
    exports.clearIndexedDbPersistence = zu;
    exports.collection = Bc$1;
    exports.collectionGroup = qc$1;
    exports.deleteDoc = Qa$1;
    exports.deleteField = Xa$1;
    exports.disableNetwork = Yu;
    exports.doc = Uc$1;
    exports.documentId = yc$1;
    exports.enableIndexedDbPersistence = Wu;
    exports.enableMultiTabIndexedDbPersistence = ju;
    exports.enableNetwork = Ju;
    exports.endAt = ya;
    exports.endBefore = ga;
    exports.getDoc = Oa$1;
    exports.getDocFromCache = Fa$1;
    exports.getDocFromServer = $a$1;
    exports.getDocs = La$1;
    exports.getDocsFromCache = Ba$1;
    exports.getDocsFromServer = qa$1;
    exports.getFirestore = Uu;
    exports.increment = nh;
    exports.initializeFirestore = qu;
    exports.limit = Ia$1;
    exports.limitToLast = Aa$1;
    exports.onSnapshot = ja$1;
    exports.onSnapshotsInSync = Ga$1;
    exports.orderBy = Ea$1;
    exports.query = _a$1;
    exports.queryEqual = Qc$1;
    exports.refEqual = Kc$1;
    exports.runTransaction = Ya$1;
    exports.serverTimestamp = Za$1;
    exports.setDoc = Ua$1;
    exports.setLogLevel = y$1;
    exports.snapshotEqual = aa$1;
    exports.startAfter = Pa$1;
    exports.startAt = Ra$1;
    exports.terminate = Xu;
    exports.updateDoc = Ka$1;
    exports.waitForPendingWrites = Hu;
    exports.where = da$1;
    exports.writeBatch = sh;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-firestore.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-firestore.js.map
