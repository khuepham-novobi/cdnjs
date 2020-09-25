(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.performance = global.firebase.performance || {}), global.firebase.app));
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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * This method checks if indexedDB is supported by current browser/service worker context
     * @return true if indexedDB is supported by current browser/service worker context
     */
    function isIndexedDBAvailable() {
        return 'indexedDB' in self && indexedDB != null;
    }
    /**
     * This method validates browser context for indexedDB by opening a dummy indexedDB database and reject
     * if errors occur during the database open operation.
     */
    function validateIndexedDBOpenable() {
        return new Promise(function (resolve, reject) {
            try {
                var preExist_1 = true;
                var DB_CHECK_NAME_1 = 'validate-browser-context-for-indexeddb-analytics-module';
                var request_1 = window.indexedDB.open(DB_CHECK_NAME_1);
                request_1.onsuccess = function () {
                    request_1.result.close();
                    // delete database only when it doesn't pre-exist
                    if (!preExist_1) {
                        window.indexedDB.deleteDatabase(DB_CHECK_NAME_1);
                    }
                    resolve(true);
                };
                request_1.onupgradeneeded = function () {
                    preExist_1 = false;
                };
                request_1.onerror = function () {
                    var _a;
                    reject(((_a = request_1.error) === null || _a === void 0 ? void 0 : _a.message) || '');
                };
            }
            catch (error) {
                reject(error);
            }
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
     */
    var ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    var FirebaseError = /** @class */ (function (_super) {
        __extends(FirebaseError, _super);
        function FirebaseError(code, message) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
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
            var error = new FirebaseError(fullCode, fullMessage);
            // Keys with an underscore at the end of their name are not included in
            // error.data for some reason.
            // TODO: Replace with Object.entries when lib is updated to es2017.
            for (var _a = 0, _b = Object.keys(customData); _a < _b.length; _a++) {
                var key = _b[_a];
                if (key.slice(-1) !== '_') {
                    if (key in error) {
                        console.warn("Overwriting FirebaseError base field \"" + key + "\" can cause unexpected behavior.");
                    }
                    error[key] = customData[key];
                }
            }
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

    function __spreadArrays$1() {
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
            console[method].apply(console, __spreadArrays$1(["[" + now + "]  " + instance.name + ":"], args));
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
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.ERROR], args));
        };
        return Logger;
    }());

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

    var name = "@firebase/performance-exp";
    var version = "0.0.800";

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
    var SDK_VERSION = version;
    /** The prefix for start User Timing marks used for creating Traces. */
    var TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
    /** The prefix for stop User Timing marks used for creating Traces. */
    var TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
    /** The prefix for User Timing measure used for creating Traces. */
    var TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
    /** The prefix for out of the box page load Trace name. */
    var OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
    var FIRST_PAINT_COUNTER_NAME = '_fp';
    var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
    var FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
    var CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
    var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
    var SERVICE = 'performance';
    var SERVICE_NAME = 'Performance';

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
    var _a$1;
    var ERROR_DESCRIPTION_MAP = (_a$1 = {},
        _a$1["trace started" /* TRACE_STARTED_BEFORE */] = 'Trace {$traceName} was started before.',
        _a$1["trace stopped" /* TRACE_STOPPED_BEFORE */] = 'Trace {$traceName} is not running.',
        _a$1["no window" /* NO_WINDOW */] = 'Window is not available.',
        _a$1["no app id" /* NO_APP_ID */] = 'App id is not available.',
        _a$1["no project id" /* NO_PROJECT_ID */] = 'Project id is not available.',
        _a$1["no api key" /* NO_API_KEY */] = 'Api key is not available.',
        _a$1["invalid cc log" /* INVALID_CC_LOG */] = 'Attempted to queue invalid cc event',
        _a$1["FB not default" /* FB_NOT_DEFAULT */] = 'Performance can only start when Firebase app instance is the default one.',
        _a$1["RC response not ok" /* RC_NOT_OK */] = 'RC response is not ok',
        _a$1["invalid attribute name" /* INVALID_ATTRIBUTE_NAME */] = 'Attribute name {$attributeName} is invalid.',
        _a$1["invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */] = 'Attribute value {$attributeValue} is invalid.',
        _a$1["invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */] = 'Custom metric name {$customMetricName} is invalid',
        _a$1["invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */] = 'Input for String merger is invalid, contact support team to resolve.',
        _a$1);
    var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);

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
    var consoleLogger = new Logger(SERVICE_NAME);
    consoleLogger.logLevel = LogLevel.INFO;

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
    var apiInstance;
    var windowInstance;
    /**
     * This class holds a reference to various browser related objects injected by
     * set methods.
     */
    var Api = /** @class */ (function () {
        function Api(window) {
            this.window = window;
            if (!window) {
                throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
            }
            this.performance = window.performance;
            this.PerformanceObserver = window.PerformanceObserver;
            this.windowLocation = window.location;
            this.navigator = window.navigator;
            this.document = window.document;
            if (this.navigator && this.navigator.cookieEnabled) {
                // If user blocks cookies on the browser, accessing localStorage will
                // throw an exception.
                this.localStorage = window.localStorage;
            }
            if (window.perfMetrics && window.perfMetrics.onFirstInputDelay) {
                this.onFirstInputDelay = window.perfMetrics.onFirstInputDelay;
            }
        }
        Api.prototype.getUrl = function () {
            // Do not capture the string query part of url.
            return this.windowLocation.href.split('?')[0];
        };
        Api.prototype.mark = function (name) {
            if (!this.performance || !this.performance.mark) {
                return;
            }
            this.performance.mark(name);
        };
        Api.prototype.measure = function (measureName, mark1, mark2) {
            if (!this.performance || !this.performance.measure) {
                return;
            }
            this.performance.measure(measureName, mark1, mark2);
        };
        Api.prototype.getEntriesByType = function (type) {
            if (!this.performance || !this.performance.getEntriesByType) {
                return [];
            }
            return this.performance.getEntriesByType(type);
        };
        Api.prototype.getEntriesByName = function (name) {
            if (!this.performance || !this.performance.getEntriesByName) {
                return [];
            }
            return this.performance.getEntriesByName(name);
        };
        Api.prototype.getTimeOrigin = function () {
            // Polyfill the time origin with performance.timing.navigationStart.
            return (this.performance &&
                (this.performance.timeOrigin || this.performance.timing.navigationStart));
        };
        Api.prototype.requiredApisAvailable = function () {
            if (!fetch ||
                !Promise ||
                !this.navigator ||
                !this.navigator.cookieEnabled) {
                consoleLogger.info('Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.');
                return false;
            }
            if (!isIndexedDBAvailable()) {
                consoleLogger.info('IndexedDB is not supported by current browswer');
                return false;
            }
            return true;
        };
        Api.prototype.setupObserver = function (entryType, callback) {
            if (!this.PerformanceObserver) {
                return;
            }
            var observer = new this.PerformanceObserver(function (list) {
                for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                    var entry = _a[_i];
                    // `entry` is a PerformanceEntry instance.
                    callback(entry);
                }
            });
            // Start observing the entry types you care about.
            observer.observe({ entryTypes: [entryType] });
        };
        Api.getInstance = function () {
            if (apiInstance === undefined) {
                apiInstance = new Api(windowInstance);
            }
            return apiInstance;
        };
        return Api;
    }());
    function setupApi(window) {
        windowInstance = window;
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
    var iid;
    function getIidPromise(installationsService) {
        var iidPromise = installationsService.getId();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        iidPromise.then(function (iidVal) {
            iid = iidVal;
        });
        return iidPromise;
    }
    // This method should be used after the iid is retrieved by getIidPromise method.
    function getIid() {
        return iid;
    }
    function getAuthTokenPromise(installationsService) {
        var authTokenPromise = installationsService.getToken();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        authTokenPromise.then(function (authTokenVal) {
        });
        return authTokenPromise;
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
    function mergeStrings(part1, part2) {
        var sizeDiff = part1.length - part2.length;
        if (sizeDiff < 0 || sizeDiff > 1) {
            throw ERROR_FACTORY.create("invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */);
        }
        var resultArray = [];
        for (var i = 0; i < part1.length; i++) {
            resultArray.push(part1.charAt(i));
            if (part2.length > i) {
                resultArray.push(part2.charAt(i));
            }
        }
        return resultArray.join('');
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
    var settingsServiceInstance;
    var SettingsService = /** @class */ (function () {
        function SettingsService() {
            // The variable which controls logging of automatic traces and HTTP/S network monitoring.
            this.instrumentationEnabled = true;
            // The variable which controls logging of custom traces.
            this.dataCollectionEnabled = true;
            // Configuration flags set through remote config.
            this.loggingEnabled = false;
            // Sampling rate between 0 and 1.
            this.tracesSamplingRate = 1;
            this.networkRequestsSamplingRate = 1;
            // Address of logging service.
            this.logEndPointUrl = 'https://firebaselogging.googleapis.com/v0cc/log?format=json_proto';
            // Performance event transport endpoint URL which should be compatible with proto3.
            // New Address for transport service, not configurable via Remote Config.
            this.flTransportEndpointUrl = mergeStrings('hts/frbslgigp.ogepscmv/ieo/eaylg', 'tp:/ieaeogn-agolai.o/1frlglgc/o');
            this.transportKey = mergeStrings('AzSC8r6ReiGqFMyfvgow', 'Iayx0u-XT3vksVM-pIV');
            // Source type for performance event logs.
            this.logSource = 462;
            // Flags which control per session logging of traces and network requests.
            this.logTraceAfterSampling = false;
            this.logNetworkAfterSampling = false;
            // TTL of config retrieved from remote config in hours.
            this.configTimeToLive = 12;
        }
        SettingsService.prototype.getFlTransportFullUrl = function () {
            return this.flTransportEndpointUrl.concat('?key=', this.transportKey);
        };
        SettingsService.getInstance = function () {
            if (settingsServiceInstance === undefined) {
                settingsServiceInstance = new SettingsService();
            }
            return settingsServiceInstance;
        };
        return SettingsService;
    }());

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
    var VisibilityState;
    (function (VisibilityState) {
        VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
        VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
        VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
    })(VisibilityState || (VisibilityState = {}));
    var RESERVED_ATTRIBUTE_PREFIXES = ['firebase_', 'google_', 'ga_'];
    var ATTRIBUTE_FORMAT_REGEX = new RegExp('^[a-zA-Z]\\w*$');
    var MAX_ATTRIBUTE_NAME_LENGTH = 40;
    var MAX_ATTRIBUTE_VALUE_LENGTH = 100;
    function getServiceWorkerStatus() {
        var navigator = Api.getInstance().navigator;
        if ('serviceWorker' in navigator) {
            if (navigator.serviceWorker.controller) {
                return 2 /* CONTROLLED */;
            }
            else {
                return 3 /* UNCONTROLLED */;
            }
        }
        else {
            return 1 /* UNSUPPORTED */;
        }
    }
    function getVisibilityState() {
        var document = Api.getInstance().document;
        var visibilityState = document.visibilityState;
        switch (visibilityState) {
            case 'visible':
                return VisibilityState.VISIBLE;
            case 'hidden':
                return VisibilityState.HIDDEN;
            default:
                return VisibilityState.UNKNOWN;
        }
    }
    function getEffectiveConnectionType() {
        var navigator = Api.getInstance().navigator;
        var navigatorConnection = navigator.connection;
        var effectiveType = navigatorConnection && navigatorConnection.effectiveType;
        switch (effectiveType) {
            case 'slow-2g':
                return 1 /* CONNECTION_SLOW_2G */;
            case '2g':
                return 2 /* CONNECTION_2G */;
            case '3g':
                return 3 /* CONNECTION_3G */;
            case '4g':
                return 4 /* CONNECTION_4G */;
            default:
                return 0 /* UNKNOWN */;
        }
    }
    function isValidCustomAttributeName(name) {
        if (name.length === 0 || name.length > MAX_ATTRIBUTE_NAME_LENGTH) {
            return false;
        }
        var matchesReservedPrefix = RESERVED_ATTRIBUTE_PREFIXES.some(function (prefix) {
            return name.startsWith(prefix);
        });
        return !matchesReservedPrefix && !!name.match(ATTRIBUTE_FORMAT_REGEX);
    }
    function isValidCustomAttributeValue(value) {
        return value.length !== 0 && value.length <= MAX_ATTRIBUTE_VALUE_LENGTH;
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
    function getAppId(firebaseApp) {
        var _a;
        var appId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.appId;
        if (!appId) {
            throw ERROR_FACTORY.create("no app id" /* NO_APP_ID */);
        }
        return appId;
    }
    function getProjectId(firebaseApp) {
        var _a;
        var projectId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.projectId;
        if (!projectId) {
            throw ERROR_FACTORY.create("no project id" /* NO_PROJECT_ID */);
        }
        return projectId;
    }
    function getApiKey(firebaseApp) {
        var _a;
        var apiKey = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.apiKey;
        if (!apiKey) {
            throw ERROR_FACTORY.create("no api key" /* NO_API_KEY */);
        }
        return apiKey;
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
    var REMOTE_CONFIG_SDK_VERSION = '0.0.1';
    // These values will be used if the remote config object is successfully
    // retrieved, but the template does not have these fields.
    var DEFAULT_CONFIGS = {
        loggingEnabled: true
    };
    var FIS_AUTH_PREFIX = 'FIREBASE_INSTALLATIONS_AUTH';
    function getConfig(performanceController, iid) {
        var config = getStoredConfig();
        if (config) {
            processConfig(config);
            return Promise.resolve();
        }
        return getRemoteConfig(performanceController, iid)
            .then(processConfig)
            .then(function (config) { return storeConfig(config); }, 
        /** Do nothing for error, use defaults set in settings service. */
        function () { });
    }
    function getStoredConfig() {
        var localStorage = Api.getInstance().localStorage;
        if (!localStorage) {
            return;
        }
        var expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
        if (!expiryString || !configValid(expiryString)) {
            return;
        }
        var configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
        if (!configStringified) {
            return;
        }
        try {
            var configResponse = JSON.parse(configStringified);
            return configResponse;
        }
        catch (_a) {
            return;
        }
    }
    function storeConfig(config) {
        var localStorage = Api.getInstance().localStorage;
        if (!config || !localStorage) {
            return;
        }
        localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
        localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() +
            SettingsService.getInstance().configTimeToLive * 60 * 60 * 1000));
    }
    var COULD_NOT_GET_CONFIG_MSG = 'Could not fetch config, will use default configs';
    function getRemoteConfig(performanceController, iid) {
        // Perf needs auth token only to retrieve remote config.
        return getAuthTokenPromise(performanceController.installations)
            .then(function (authToken) {
            var projectId = getProjectId(performanceController.app);
            var apiKey = getApiKey(performanceController.app);
            var configEndPoint = "https://firebaseremoteconfig.googleapis.com/v1/projects/" + projectId + "/namespaces/fireperf:fetch?key=" + apiKey;
            var request = new Request(configEndPoint, {
                method: 'POST',
                headers: { Authorization: FIS_AUTH_PREFIX + " " + authToken },
                /* eslint-disable camelcase */
                body: JSON.stringify({
                    app_instance_id: iid,
                    app_instance_id_token: authToken,
                    app_id: getAppId(performanceController.app),
                    app_version: SDK_VERSION,
                    sdk_version: REMOTE_CONFIG_SDK_VERSION
                })
                /* eslint-enable camelcase */
            });
            return fetch(request).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                // In case response is not ok. This will be caught by catch.
                throw ERROR_FACTORY.create("RC response not ok" /* RC_NOT_OK */);
            });
        })
            .catch(function () {
            consoleLogger.info(COULD_NOT_GET_CONFIG_MSG);
            return undefined;
        });
    }
    /**
     * Processes config coming either from calling RC or from local storage.
     * This method only runs if call is successful or config in storage
     * is valid.
     */
    function processConfig(config) {
        if (!config) {
            return config;
        }
        var settingsServiceInstance = SettingsService.getInstance();
        var entries = config.entries || {};
        if (entries.fpr_enabled !== undefined) {
            // TODO: Change the assignment of loggingEnabled once the received type is
            // known.
            settingsServiceInstance.loggingEnabled =
                String(entries.fpr_enabled) === 'true';
        }
        else {
            // Config retrieved successfully, but there is no fpr_enabled in template.
            // Use secondary configs value.
            settingsServiceInstance.loggingEnabled = DEFAULT_CONFIGS.loggingEnabled;
        }
        if (entries.fpr_log_source) {
            settingsServiceInstance.logSource = Number(entries.fpr_log_source);
        }
        if (entries.fpr_log_endpoint_url) {
            settingsServiceInstance.logEndPointUrl = entries.fpr_log_endpoint_url;
        }
        // Key from Remote Config has to be non-empty string, otherwsie use local value.
        if (entries.fpr_log_transport_key) {
            settingsServiceInstance.transportKey = entries.fpr_log_transport_key;
        }
        if (entries.fpr_vc_network_request_sampling_rate !== undefined) {
            settingsServiceInstance.networkRequestsSamplingRate = Number(entries.fpr_vc_network_request_sampling_rate);
        }
        if (entries.fpr_vc_trace_sampling_rate !== undefined) {
            settingsServiceInstance.tracesSamplingRate = Number(entries.fpr_vc_trace_sampling_rate);
        }
        // Set the per session trace and network logging flags.
        settingsServiceInstance.logTraceAfterSampling = shouldLogAfterSampling(settingsServiceInstance.tracesSamplingRate);
        settingsServiceInstance.logNetworkAfterSampling = shouldLogAfterSampling(settingsServiceInstance.networkRequestsSamplingRate);
        return config;
    }
    function configValid(expiry) {
        return Number(expiry) > Date.now();
    }
    function shouldLogAfterSampling(samplingRate) {
        return Math.random() <= samplingRate;
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
    var initializationStatus = 1 /* notInitialized */;
    var initializationPromise;
    function getInitializationPromise(performanceController) {
        initializationStatus = 2 /* initializationPending */;
        initializationPromise =
            initializationPromise || initializePerf(performanceController);
        return initializationPromise;
    }
    function isPerfInitialized() {
        return initializationStatus === 3 /* initialized */;
    }
    function initializePerf(performanceController) {
        return getDocumentReadyComplete()
            .then(function () { return getIidPromise(performanceController.installations); })
            .then(function (iid) { return getConfig(performanceController, iid); })
            .then(function () { return changeInitializationStatus(); }, function () { return changeInitializationStatus(); });
    }
    /**
     * Returns a promise which resolves whenever the document readystate is complete or
     * immediately if it is called after page load complete.
     */
    function getDocumentReadyComplete() {
        var document = Api.getInstance().document;
        return new Promise(function (resolve) {
            if (document && document.readyState !== 'complete') {
                var handler_1 = function () {
                    if (document.readyState === 'complete') {
                        document.removeEventListener('readystatechange', handler_1);
                        resolve();
                    }
                };
                document.addEventListener('readystatechange', handler_1);
            }
            else {
                resolve();
            }
        });
    }
    function changeInitializationStatus() {
        initializationStatus = 3 /* initialized */;
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
    var DEFAULT_SEND_INTERVAL_MS = 10 * 1000;
    var INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1000;
    // If end point does not work, the call will be tried for these many times.
    var DEFAULT_REMAINING_TRIES = 3;
    var remainingTries = DEFAULT_REMAINING_TRIES;
    /* eslint-enable camelcase */
    var queue = [];
    var isTransportSetup = false;
    function setupTransportService() {
        if (!isTransportSetup) {
            processQueue(INITIAL_SEND_TIME_DELAY_MS);
            isTransportSetup = true;
        }
    }
    function processQueue(timeOffset) {
        setTimeout(function () {
            // If there is no remainingTries left, stop retrying.
            if (remainingTries === 0) {
                return;
            }
            // If there are no events to process, wait for DEFAULT_SEND_INTERVAL_MS and try again.
            if (!queue.length) {
                return processQueue(DEFAULT_SEND_INTERVAL_MS);
            }
            dispatchQueueEvents();
        }, timeOffset);
    }
    function dispatchQueueEvents() {
        // Capture a snapshot of the queue and empty the "official queue".
        var staged = __spreadArrays(queue);
        queue = [];
        /* eslint-disable camelcase */
        // We will pass the JSON serialized event to the backend.
        var log_event = staged.map(function (evt) { return ({
            source_extension_json_proto3: evt.message,
            event_time_ms: String(evt.eventTime)
        }); });
        var data = {
            request_time_ms: String(Date.now()),
            client_info: {
                client_type: 1,
                js_client_info: {}
            },
            log_source: SettingsService.getInstance().logSource,
            log_event: log_event
        };
        /* eslint-enable camelcase */
        sendEventsToFl(data, staged).catch(function () {
            // If the request fails for some reason, add the events that were attempted
            // back to the primary queue to retry later.
            queue = __spreadArrays(staged, queue);
            remainingTries--;
            consoleLogger.info("Tries left: " + remainingTries + ".");
            processQueue(DEFAULT_SEND_INTERVAL_MS);
        });
    }
    function sendEventsToFl(data, staged) {
        return postToFlEndpoint(data)
            .then(function (res) {
            if (!res.ok) {
                consoleLogger.info('Call to Firebase backend failed.');
            }
            return res.json();
        })
            .then(function (res) {
            // Find the next call wait time from the response.
            var transportWait = Number(res.nextRequestWaitMillis);
            var requestOffset = DEFAULT_SEND_INTERVAL_MS;
            if (!isNaN(transportWait)) {
                requestOffset = Math.max(transportWait, requestOffset);
            }
            // Delete request if response include RESPONSE_ACTION_UNKNOWN or DELETE_REQUEST action.
            // Otherwise, retry request using normal scheduling if response include RETRY_REQUEST_LATER.
            var logResponseDetails = res.logResponseDetails;
            if (Array.isArray(logResponseDetails) &&
                logResponseDetails.length > 0 &&
                logResponseDetails[0].responseAction === 'RETRY_REQUEST_LATER') {
                queue = __spreadArrays(staged, queue);
                consoleLogger.info("Retry transport request later.");
            }
            remainingTries = DEFAULT_REMAINING_TRIES;
            // Schedule the next process.
            processQueue(requestOffset);
        });
    }
    function postToFlEndpoint(data) {
        var flTransportFullUrl = SettingsService.getInstance().getFlTransportFullUrl();
        return fetch(flTransportFullUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    function addToQueue(evt) {
        if (!evt.eventTime || !evt.message) {
            throw ERROR_FACTORY.create("invalid cc log" /* INVALID_CC_LOG */);
        }
        // Add the new event to the queue.
        queue = __spreadArrays(queue, [evt]);
    }
    /** Log handler for cc service to send the performance logs to the server. */
    function transportHandler(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serializer) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var message = serializer.apply(void 0, args);
            addToQueue({
                message: message,
                eventTime: Date.now()
            });
        };
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
    /* eslint-enble camelcase */
    var logger;
    // This method is not called before initialization.
    function sendLog(resource, resourceType) {
        if (!logger) {
            logger = transportHandler(serializer);
        }
        logger(resource, resourceType);
    }
    function logTrace(trace) {
        var settingsService = SettingsService.getInstance();
        // Do not log if trace is auto generated and instrumentation is disabled.
        if (!settingsService.instrumentationEnabled && trace.isAuto) {
            return;
        }
        // Do not log if trace is custom and data collection is disabled.
        if (!settingsService.dataCollectionEnabled && !trace.isAuto) {
            return;
        }
        // Do not log if required apis are not available.
        if (!Api.getInstance().requiredApisAvailable()) {
            return;
        }
        // Only log the page load auto traces if page is visible.
        if (trace.isAuto && getVisibilityState() !== VisibilityState.VISIBLE) {
            return;
        }
        if (!settingsService.loggingEnabled ||
            !settingsService.logTraceAfterSampling) {
            return;
        }
        if (isPerfInitialized()) {
            sendTraceLog(trace);
        }
        else {
            // Custom traces can be used before the initialization but logging
            // should wait until after.
            getInitializationPromise(trace.performanceController).then(function () { return sendTraceLog(trace); }, function () { return sendTraceLog(trace); });
        }
    }
    function sendTraceLog(trace) {
        if (getIid()) {
            setTimeout(function () { return sendLog(trace, 1 /* Trace */); }, 0);
        }
    }
    function logNetworkRequest(networkRequest) {
        var settingsService = SettingsService.getInstance();
        // Do not log network requests if instrumentation is disabled.
        if (!settingsService.instrumentationEnabled) {
            return;
        }
        // Do not log the js sdk's call to transport service domain to avoid unnecessary cycle.
        // Need to blacklist both old and new endpoints to avoid migration gap.
        var networkRequestUrl = networkRequest.url;
        // Blacklist old log endpoint and new transport endpoint.
        // Because Performance SDK doesn't instrument requests sent from SDK itself.
        var logEndpointUrl = settingsService.logEndPointUrl.split('?')[0];
        var flEndpointUrl = settingsService.flTransportEndpointUrl.split('?')[0];
        if (networkRequestUrl === logEndpointUrl ||
            networkRequestUrl === flEndpointUrl) {
            return;
        }
        if (!settingsService.loggingEnabled ||
            !settingsService.logNetworkAfterSampling) {
            return;
        }
        setTimeout(function () { return sendLog(networkRequest, 0 /* NetworkRequest */); }, 0);
    }
    function serializer(resource, resourceType) {
        if (resourceType === 0 /* NetworkRequest */) {
            return serializeNetworkRequest(resource);
        }
        return serializeTrace(resource);
    }
    function serializeNetworkRequest(networkRequest) {
        var networkRequestMetric = {
            url: networkRequest.url,
            http_method: networkRequest.httpMethod || 0,
            http_response_code: 200,
            response_payload_bytes: networkRequest.responsePayloadBytes,
            client_start_time_us: networkRequest.startTimeUs,
            time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
            time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
        };
        var perfMetric = {
            application_info: getApplicationInfo(networkRequest.performanceController.app),
            network_request_metric: networkRequestMetric
        };
        return JSON.stringify(perfMetric);
    }
    function serializeTrace(trace) {
        var traceMetric = {
            name: trace.name,
            is_auto: trace.isAuto,
            client_start_time_us: trace.startTimeUs,
            duration_us: trace.durationUs
        };
        if (Object.keys(trace.counters).length !== 0) {
            traceMetric.counters = trace.counters;
        }
        var customAttributes = trace.getAttributes();
        if (Object.keys(customAttributes).length !== 0) {
            traceMetric.custom_attributes = customAttributes;
        }
        var perfMetric = {
            application_info: getApplicationInfo(trace.performanceController.app),
            trace_metric: traceMetric
        };
        return JSON.stringify(perfMetric);
    }
    function getApplicationInfo(firebaseApp) {
        return {
            google_app_id: getAppId(firebaseApp),
            app_instance_id: getIid(),
            web_app_info: {
                sdk_version: SDK_VERSION,
                page_url: Api.getInstance().getUrl(),
                service_worker_status: getServiceWorkerStatus(),
                visibility_state: getVisibilityState(),
                effective_connection_type: getEffectiveConnectionType()
            },
            application_process_state: 0
        };
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
    var MAX_METRIC_NAME_LENGTH = 100;
    var RESERVED_AUTO_PREFIX = '_';
    var oobMetrics = [
        FIRST_PAINT_COUNTER_NAME,
        FIRST_CONTENTFUL_PAINT_COUNTER_NAME,
        FIRST_INPUT_DELAY_COUNTER_NAME
    ];
    /**
     * Returns true if the metric is custom and does not start with reserved prefix, or if
     * the metric is one of out of the box page load trace metrics.
     */
    function isValidMetricName(name, traceName) {
        if (name.length === 0 || name.length > MAX_METRIC_NAME_LENGTH) {
            return false;
        }
        return ((traceName &&
            traceName.startsWith(OOB_TRACE_PAGE_LOAD_PREFIX) &&
            oobMetrics.indexOf(name) > -1) ||
            !name.startsWith(RESERVED_AUTO_PREFIX));
    }
    /**
     * Converts the provided value to an integer value to be used in case of a metric.
     * @param providedValue Provided number value of the metric that needs to be converted to an integer.
     *
     * @returns Converted integer number to be set for the metric.
     */
    function convertMetricValueToInteger(providedValue) {
        var valueAsInteger = Math.floor(providedValue);
        if (valueAsInteger < providedValue) {
            consoleLogger.info("Metric value should be an Integer, setting the value as : " + valueAsInteger + ".");
        }
        return valueAsInteger;
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
    var Trace = /** @class */ (function () {
        /**
         * @param performanceController The performance controller running.
         * @param name The name of the trace.
         * @param isAuto If the trace is auto-instrumented.
         * @param traceMeasureName The name of the measure marker in user timing specification. This field
         * is only set when the trace is built for logging when the user directly uses the user timing
         * api (performance.mark and performance.measure).
         */
        function Trace(performanceController, name, isAuto, traceMeasureName) {
            if (isAuto === void 0) { isAuto = false; }
            this.performanceController = performanceController;
            this.name = name;
            this.isAuto = isAuto;
            this.state = 1 /* UNINITIALIZED */;
            this.customAttributes = {};
            this.counters = {};
            this.api = Api.getInstance();
            this.randomId = Math.floor(Math.random() * 1000000);
            if (!this.isAuto) {
                this.traceStartMark = TRACE_START_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
                this.traceStopMark = TRACE_STOP_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
                this.traceMeasure =
                    traceMeasureName ||
                        TRACE_MEASURE_PREFIX + "-" + this.randomId + "-" + this.name;
                if (traceMeasureName) {
                    // For the case of direct user timing traces, no start stop will happen. The measure object
                    // is already available.
                    this.calculateTraceMetrics();
                }
            }
        }
        /**
         * Starts a trace. The measurement of the duration starts at this point.
         */
        Trace.prototype.start = function () {
            if (this.state !== 1 /* UNINITIALIZED */) {
                throw ERROR_FACTORY.create("trace started" /* TRACE_STARTED_BEFORE */, {
                    traceName: this.name
                });
            }
            this.api.mark(this.traceStartMark);
            this.state = 2 /* RUNNING */;
        };
        /**
         * Stops the trace. The measurement of the duration of the trace stops at this point and trace
         * is logged.
         */
        Trace.prototype.stop = function () {
            if (this.state !== 2 /* RUNNING */) {
                throw ERROR_FACTORY.create("trace stopped" /* TRACE_STOPPED_BEFORE */, {
                    traceName: this.name
                });
            }
            this.state = 3 /* TERMINATED */;
            this.api.mark(this.traceStopMark);
            this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
            this.calculateTraceMetrics();
            logTrace(this);
        };
        /**
         * Records a trace with predetermined values. If this method is used a trace is created and logged
         * directly. No need to use start and stop methods.
         * @param startTime Trace start time since epoch in millisec
         * @param duration The duraction of the trace in millisec
         * @param options An object which can optionally hold maps of custom metrics and custom attributes
         */
        Trace.prototype.record = function (startTime, duration, options) {
            this.durationUs = Math.floor(duration * 1000);
            this.startTimeUs = Math.floor(startTime * 1000);
            if (options && options.attributes) {
                this.customAttributes = __assign({}, options.attributes);
            }
            if (options && options.metrics) {
                for (var _i = 0, _a = Object.keys(options.metrics); _i < _a.length; _i++) {
                    var metric = _a[_i];
                    if (!isNaN(Number(options.metrics[metric]))) {
                        this.counters[metric] = Number(Math.floor(options.metrics[metric]));
                    }
                }
            }
            logTrace(this);
        };
        /**
         * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
         * custom metric if one with the given name does not exist. The value will be floored down to an
         * integer.
         * @param counter Name of the custom metric
         * @param numAsInteger Increment by value
         */
        Trace.prototype.incrementMetric = function (counter, numAsInteger) {
            if (numAsInteger === void 0) { numAsInteger = 1; }
            if (this.counters[counter] === undefined) {
                this.putMetric(counter, numAsInteger);
            }
            else {
                this.putMetric(counter, this.counters[counter] + numAsInteger);
            }
        };
        /**
         * Sets a custom metric to a specified value. Will create a new custom metric if one with the
         * given name does not exist. The value will be floored down to an integer.
         * @param counter Name of the custom metric
         * @param numAsInteger Set custom metric to this value
         */
        Trace.prototype.putMetric = function (counter, numAsInteger) {
            if (isValidMetricName(counter, this.name)) {
                this.counters[counter] = convertMetricValueToInteger(numAsInteger);
            }
            else {
                throw ERROR_FACTORY.create("invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */, {
                    customMetricName: counter
                });
            }
        };
        /**
         * Returns the value of the custom metric by that name. If a custom metric with that name does
         * not exist will return zero.
         * @param counter
         */
        Trace.prototype.getMetric = function (counter) {
            return this.counters[counter] || 0;
        };
        /**
         * Sets a custom attribute of a trace to a certain value.
         * @param attr
         * @param value
         */
        Trace.prototype.putAttribute = function (attr, value) {
            var isValidName = isValidCustomAttributeName(attr);
            var isValidValue = isValidCustomAttributeValue(value);
            if (isValidName && isValidValue) {
                this.customAttributes[attr] = value;
                return;
            }
            // Throw appropriate error when the attribute name or value is invalid.
            if (!isValidName) {
                throw ERROR_FACTORY.create("invalid attribute name" /* INVALID_ATTRIBUTE_NAME */, {
                    attributeName: attr
                });
            }
            if (!isValidValue) {
                throw ERROR_FACTORY.create("invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */, {
                    attributeValue: value
                });
            }
        };
        /**
         * Retrieves the value a custom attribute of a trace is set to.
         * @param attr
         */
        Trace.prototype.getAttribute = function (attr) {
            return this.customAttributes[attr];
        };
        Trace.prototype.removeAttribute = function (attr) {
            if (this.customAttributes[attr] === undefined) {
                return;
            }
            delete this.customAttributes[attr];
        };
        Trace.prototype.getAttributes = function () {
            return __assign({}, this.customAttributes);
        };
        Trace.prototype.setStartTime = function (startTime) {
            this.startTimeUs = startTime;
        };
        Trace.prototype.setDuration = function (duration) {
            this.durationUs = duration;
        };
        /**
         * Calculates and assigns the duration and start time of the trace using the measure performance
         * entry.
         */
        Trace.prototype.calculateTraceMetrics = function () {
            var perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
            var perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
            if (perfMeasureEntry) {
                this.durationUs = Math.floor(perfMeasureEntry.duration * 1000);
                this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1000);
            }
        };
        /**
         * @param navigationTimings A single element array which contains the navigationTIming object of
         * the page load
         * @param paintTimings A array which contains paintTiming object of the page load
         * @param firstInputDelay First input delay in millisec
         */
        Trace.createOobTrace = function (performanceController, navigationTimings, paintTimings, firstInputDelay) {
            var route = Api.getInstance().getUrl();
            if (!route) {
                return;
            }
            var trace = new Trace(performanceController, OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
            var timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1000);
            trace.setStartTime(timeOriginUs);
            // navigationTimings includes only one element.
            if (navigationTimings && navigationTimings[0]) {
                trace.setDuration(Math.floor(navigationTimings[0].duration * 1000));
                trace.putMetric('domInteractive', Math.floor(navigationTimings[0].domInteractive * 1000));
                trace.putMetric('domContentLoadedEventEnd', Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1000));
                trace.putMetric('loadEventEnd', Math.floor(navigationTimings[0].loadEventEnd * 1000));
            }
            var FIRST_PAINT = 'first-paint';
            var FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
            if (paintTimings) {
                var firstPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_PAINT; });
                if (firstPaint && firstPaint.startTime) {
                    trace.putMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1000));
                }
                var firstContentfulPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_CONTENTFUL_PAINT; });
                if (firstContentfulPaint && firstContentfulPaint.startTime) {
                    trace.putMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1000));
                }
                if (firstInputDelay) {
                    trace.putMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1000));
                }
            }
            logTrace(trace);
        };
        Trace.createUserTimingTrace = function (performanceController, measureName) {
            var trace = new Trace(performanceController, measureName, false, measureName);
            logTrace(trace);
        };
        return Trace;
    }());

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
    function createNetworkRequestEntry(performanceController, entry) {
        var performanceEntry = entry;
        if (!performanceEntry || performanceEntry.responseStart === undefined) {
            return;
        }
        var timeOrigin = Api.getInstance().getTimeOrigin();
        var startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1000);
        var timeToResponseInitiatedUs = performanceEntry.responseStart
            ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1000)
            : undefined;
        var timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1000);
        // Remove the query params from logged network request url.
        var url = performanceEntry.name && performanceEntry.name.split('?')[0];
        var networkRequest = {
            performanceController: performanceController,
            url: url,
            responsePayloadBytes: performanceEntry.transferSize,
            startTimeUs: startTimeUs,
            timeToResponseInitiatedUs: timeToResponseInitiatedUs,
            timeToResponseCompletedUs: timeToResponseCompletedUs
        };
        logNetworkRequest(networkRequest);
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
    var FID_WAIT_TIME_MS = 5000;
    function setupOobResources(performanceController) {
        // Do not initialize unless iid is available.
        if (!getIid()) {
            return;
        }
        // The load event might not have fired yet, and that means performance navigation timing
        // object has a duration of 0. The setup should run after all current tasks in js queue.
        setTimeout(function () { return setupOobTraces(performanceController); }, 0);
        setTimeout(function () { return setupNetworkRequests(performanceController); }, 0);
        setTimeout(function () { return setupUserTimingTraces(performanceController); }, 0);
    }
    function setupNetworkRequests(performanceController) {
        var api = Api.getInstance();
        var resources = api.getEntriesByType('resource');
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            createNetworkRequestEntry(performanceController, resource);
        }
        api.setupObserver('resource', function (entry) {
            return createNetworkRequestEntry(performanceController, entry);
        });
    }
    function setupOobTraces(performanceController) {
        var api = Api.getInstance();
        var navigationTimings = api.getEntriesByType('navigation');
        var paintTimings = api.getEntriesByType('paint');
        // If First Input Desly polyfill is added to the page, report the fid value.
        // https://github.com/GoogleChromeLabs/first-input-delay
        if (api.onFirstInputDelay) {
            // If the fid call back is not called for certain time, continue without it.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var timeoutId_1 = setTimeout(function () {
                Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
                timeoutId_1 = undefined;
            }, FID_WAIT_TIME_MS);
            api.onFirstInputDelay(function (fid) {
                if (timeoutId_1) {
                    clearTimeout(timeoutId_1);
                    Trace.createOobTrace(performanceController, navigationTimings, paintTimings, fid);
                }
            });
        }
        else {
            Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
        }
    }
    function setupUserTimingTraces(performanceController) {
        var api = Api.getInstance();
        // Run through the measure performance entries collected up to this point.
        var measures = api.getEntriesByType('measure');
        for (var _i = 0, measures_1 = measures; _i < measures_1.length; _i++) {
            var measure = measures_1[_i];
            createUserTimingTrace(performanceController, measure);
        }
        // Setup an observer to capture the measures from this point on.
        api.setupObserver('measure', function (entry) {
            return createUserTimingTrace(performanceController, entry);
        });
    }
    function createUserTimingTrace(performanceController, measure) {
        var measureName = measure.name;
        // Do not create a trace, if the user timing marks and measures are created by the sdk itself.
        if (measureName.substring(0, TRACE_MEASURE_PREFIX.length) ===
            TRACE_MEASURE_PREFIX) {
            return;
        }
        Trace.createUserTimingTrace(performanceController, measureName);
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
    var PerformanceController = /** @class */ (function () {
        function PerformanceController(app, installations) {
            this.app = app;
            this.installations = installations;
            this.initialized = false;
        }
        /**
         * This method *must* be called internally as part of creating a
         * PerformanceController instance.
         *
         * Currently it's not possible to pass the settings object through the
         * constructor using Components, so this method exists to be called with the
         * desired settings, to ensure nothing is collected without the user's
         * consent.
         */
        PerformanceController.prototype._init = function (settings) {
            var _this = this;
            if (this.initialized) {
                return;
            }
            if ((settings === null || settings === void 0 ? void 0 : settings.dataCollectionEnabled) !== undefined) {
                this.dataCollectionEnabled = settings.dataCollectionEnabled;
            }
            if ((settings === null || settings === void 0 ? void 0 : settings.instrumentationEnabled) !== undefined) {
                this.instrumentationEnabled = settings.instrumentationEnabled;
            }
            if (Api.getInstance().requiredApisAvailable()) {
                validateIndexedDBOpenable()
                    .then(function (isAvailable) {
                    if (isAvailable) {
                        setupTransportService();
                        getInitializationPromise(_this).then(function () { return setupOobResources(_this); }, function () { return setupOobResources(_this); });
                        _this.initialized = true;
                    }
                })
                    .catch(function (error) {
                    consoleLogger.info("Environment doesn't support IndexedDB: " + error);
                });
            }
            else {
                consoleLogger.info('Firebase Performance cannot start if the browser does not support ' +
                    '"Fetch" and "Promise", or cookies are disabled.');
            }
        };
        Object.defineProperty(PerformanceController.prototype, "instrumentationEnabled", {
            get: function () {
                return SettingsService.getInstance().instrumentationEnabled;
            },
            set: function (val) {
                SettingsService.getInstance().instrumentationEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PerformanceController.prototype, "dataCollectionEnabled", {
            get: function () {
                return SettingsService.getInstance().dataCollectionEnabled;
            },
            set: function (val) {
                SettingsService.getInstance().dataCollectionEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        return PerformanceController;
    }());

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
    var DEFAULT_ENTRY_NAME = '[DEFAULT]';
    function getPerformance(app$1, settings) {
        var provider = app._getProvider(app$1, 'performance-exp');
        var perfInstance = provider.getImmediate();
        perfInstance._init(settings);
        return perfInstance;
    }
    function trace(performance, name) {
        return new Trace(performance, name);
    }
    var factory = function (container) {
        // Dependencies
        var app = container.getProvider('app-exp').getImmediate();
        var installations = container
            .getProvider('installations-exp-internal')
            .getImmediate();
        if (app.name !== DEFAULT_ENTRY_NAME) {
            throw ERROR_FACTORY.create("FB not default" /* FB_NOT_DEFAULT */);
        }
        if (typeof window === 'undefined') {
            throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
        }
        setupApi(window);
        return new PerformanceController(app, installations);
    };
    function registerPerformance() {
        app._registerComponent(new Component('performance-exp', factory, "PUBLIC" /* PUBLIC */));
    }
    registerPerformance();
    app.registerVersion(name, version);

    exports.getPerformance = getPerformance;
    exports.registerPerformance = registerPerformance;
    exports.trace = trace;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-performance.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-performance.js.map
