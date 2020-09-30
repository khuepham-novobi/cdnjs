(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase['firestore-lite'] = global.firebase['firestore-lite'] || {}), global.firebase.app));
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

    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(exports.LogLevel || (exports.LogLevel = {}));
    var levelStringToEnum = {
        'debug': exports.LogLevel.DEBUG,
        'verbose': exports.LogLevel.VERBOSE,
        'info': exports.LogLevel.INFO,
        'warn': exports.LogLevel.WARN,
        'error': exports.LogLevel.ERROR,
        'silent': exports.LogLevel.SILENT
    };
    /**
     * The default log level
     */
    var defaultLogLevel = exports.LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    var ConsoleMethod = (_a = {},
        _a[exports.LogLevel.DEBUG] = 'log',
        _a[exports.LogLevel.VERBOSE] = 'log',
        _a[exports.LogLevel.INFO] = 'info',
        _a[exports.LogLevel.WARN] = 'warn',
        _a[exports.LogLevel.ERROR] = 'error',
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
                if (!(val in exports.LogLevel)) {
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
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
        };
        return Logger;
    }());

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
     */ const u = "ok", a = "cancelled", c = "unknown", h = "invalid-argument", l = "deadline-exceeded", f = "not-found", d = "already-exists", _ = "permission-denied", w = "unauthenticated", m = "resource-exhausted", p = "failed-precondition", y = "aborted", E = "out-of-range", I = "unimplemented", A = "internal", T = "unavailable", P = "data-loss";

    /** An error returned by a Firestore operation. */ class R extends Error {
        constructor(t, n) {
            super(n), this.code = t, this.message = n, this.name = "FirebaseError", 
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
     */
    const V = new Logger("@firebase/firestore");

    /**
     * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
     *
     * @param logLevel
     *   The verbosity you set for activity and error logging. Can be any of
     *   the following values:
     *
     *   <ul>
     *     <li>`debug` for the most verbose logging level, primarily for
     *     debugging.</li>
     *     <li>`error` to log errors only.</li>
     *     <li><code>`silent` to turn off logging.</li>
     *   </ul>
     */ function g(t) {
        V.setLogLevel(t);
    }

    function b(t, ...n) {
        if (V.logLevel <= exports.LogLevel.DEBUG) {
            const e = n.map(N);
            V.debug("Firestore (7.21.1): " + t, ...e);
        }
    }

    function v(t, ...n) {
        if (V.logLevel <= exports.LogLevel.ERROR) {
            const e = n.map(N);
            V.error("Firestore (7.21.1): " + t, ...e);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */
    function N(t) {
        if ("string" == typeof t) return t;
        try {
            return n = t, JSON.stringify(n);
        } catch (n) {
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
        var n;
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
     */ function $(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const n = "FIRESTORE (7.21.1) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw v(n), new Error(n);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function F(t, n) {
        t || $();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function D(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
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
    /**
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */ function q(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const n = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), e = new Uint8Array(t);
        if (n && "function" == typeof n.getRandomValues) n.getRandomValues(e); else 
        // Falls back to Math.random
        for (let n = 0; n < t; n++) e[n] = Math.floor(256 * Math.random());
        return e;
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
     */ class x {
        static t() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let e = "";
            for (;e.length < 20; ) {
                const r = q(40);
                for (let s = 0; s < r.length; ++s) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                e.length < 20 && r[s] < n && (e += t.charAt(r[s] % t.length));
            }
            return e;
        }
    }

    function S(t, n) {
        return t < n ? -1 : t > n ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function O(t, n, e) {
        return t.length === n.length && t.every((t, r) => e(t, n[r]));
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
     */ class C {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId The database to use.
         * @param persistenceKey A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host The Firestore backend host to connect to.
         * @param ssl Whether to use SSL when connecting.
         * @param forceLongPolling Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         */
        constructor(t, n, e, r, s) {
            this.i = t, this.persistenceKey = n, this.host = e, this.ssl = r, this.forceLongPolling = s;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class L {
        constructor(t, n) {
            this.projectId = t, this.database = n || "(default)";
        }
        get o() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof L && t.projectId === this.projectId && t.database === this.database;
        }
        u(t) {
            return S(this.projectId, t.projectId) || S(this.database, t.database);
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
     * Simple wrapper around a nullable UID. Mostly exists to make code more
     * readable.
     */ class U {
        constructor(t) {
            this.uid = t;
        }
        h() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    l() {
            return this.h() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ U.UNAUTHENTICATED = new U(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    U._ = new U("google-credentials-uid"), U.m = new U("first-party-uid");

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
    class M {
        constructor(t, n) {
            this.user = n, this.type = "OAuth", this.p = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.p.Authorization = "Bearer " + t;
        }
    }

    class j {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.I = null, 
            /** Tracks the current User. */
            this.currentUser = U.UNAUTHENTICATED, this.A = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.T = 0, 
            /** The listener registered with setChangeListener(). */
            this.P = null, this.forceRefresh = !1, this.I = () => {
                this.T++, this.currentUser = this.R(), this.A = !0, this.P && this.P(this.currentUser);
            }, this.T = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.I) : (
            // if auth is not available, invoke tokenListener once with null token
            this.I(null), t.get().then(t => {
                this.auth = t, this.I && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.I);
            }, () => {}));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.T, n = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then(n => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.T !== t ? (b("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : n ? (F("string" == typeof n.accessToken), new M(n.accessToken, this.currentUser)) : null) : Promise.resolve(null);
        }
        V() {
            this.forceRefresh = !0;
        }
        g(t) {
            this.P = t, 
            // Fire the initial event
            this.A && t(this.currentUser);
        }
        v() {
            this.auth && this.auth.removeAuthTokenListener(this.I), this.I = null, this.P = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        R() {
            const t = this.auth && this.auth.getUid();
            return F(null === t || "string" == typeof t), new U(t);
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
    // The earlist date supported by Firestore timestamps (0001-01-01T00:00:00Z).
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
    class B {
        /**
         * Creates a new timestamp.
         *
         * @param seconds The number of seconds of UTC time since Unix epoch
         *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
         *     9999-12-31T23:59:59Z inclusive.
         * @param nanoseconds The non-negative fractions of a second at nanosecond
         *     resolution. Negative second values with fractions must still have
         *     non-negative nanoseconds values that count forward in time. Must be
         *     from 0 to 999,999,999 inclusive.
         */
        constructor(t, n) {
            if (this.seconds = t, this.nanoseconds = n, n < 0) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (n >= 1e9) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (t < -62135596800) throw new R(h, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new R(h, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @return a new timestamp representing the current date.
         */    static now() {
            return B.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date The date to initialize the `Timestamp` from.
         * @return A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return B.fromMillis(t.getTime());
        }
        /**
         * Creates a new timestamp from the given number of milliseconds.
         *
         * @param milliseconds Number of milliseconds since Unix epoch
         *     1970-01-01T00:00:00Z.
         * @return A new `Timestamp` representing the same point in time as the given
         *     number of milliseconds.
         */    static fromMillis(t) {
            const n = Math.floor(t / 1e3);
            return new B(n, 1e6 * (t - 1e3 * n));
        }
        /**
         * Converts a `Timestamp` to a JavaScript `Date` object. This conversion causes
         * a loss of precision since `Date` objects only support millisecond precision.
         *
         * @return JavaScript `Date` object representing the same point in time as
         *     this `Timestamp`, with millisecond precision.
         */    toDate() {
            return new Date(this.toMillis());
        }
        /**
         * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
         * epoch). This operation causes a loss of precision.
         *
         * @return The point in time corresponding to this timestamp, represented as
         *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
         */    toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        N(t) {
            return this.seconds === t.seconds ? S(this.nanoseconds, t.nanoseconds) : S(this.seconds, t.seconds);
        }
        /**
         * Returns true if this `Timestamp` is equal to the provided one.
         *
         * @param other The `Timestamp` to compare against.
         * @return true if this `Timestamp` is equal to the provided one.
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
     */ class k {
        constructor(t) {
            this.timestamp = t;
        }
        static $(t) {
            return new k(t);
        }
        static min() {
            return new k(new B(0, 0));
        }
        u(t) {
            return this.timestamp.N(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    F() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        D() {
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
    class Q {
        constructor(t, n, e) {
            void 0 === n ? n = 0 : n > t.length && $(), void 0 === e ? e = t.length - n : e > t.length - n && $(), 
            this.segments = t, this.offset = n, this.q = e;
        }
        get length() {
            return this.q;
        }
        isEqual(t) {
            return 0 === Q.S(this, t);
        }
        child(t) {
            const n = this.segments.slice(this.offset, this.limit());
            return t instanceof Q ? t.forEach(t => {
                n.push(t);
            }) : n.push(t), this.O(n);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        C(t) {
            return t = void 0 === t ? 1 : t, this.O(this.segments, this.offset + t, this.length - t);
        }
        L() {
            return this.O(this.segments, this.offset, this.length - 1);
        }
        U() {
            return this.segments[this.offset];
        }
        M() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        j() {
            return 0 === this.length;
        }
        B(t) {
            if (t.length < this.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        k(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        forEach(t) {
            for (let n = this.offset, e = this.limit(); n < e; n++) t(this.segments[n]);
        }
        G() {
            return this.segments.slice(this.offset, this.limit());
        }
        static S(t, n) {
            const e = Math.min(t.length, n.length);
            for (let r = 0; r < e; r++) {
                const e = t.get(r), s = n.get(r);
                if (e < s) return -1;
                if (e > s) return 1;
            }
            return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class G extends Q {
        O(t, n, e) {
            return new G(t, n, e);
        }
        W() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.G().join("/");
        }
        toString() {
            return this.W();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static Y(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const n = [];
            for (const e of t) {
                if (e.indexOf("//") >= 0) throw new R(h, `Invalid segment (${e}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            n.push(...e.split("/").filter(t => t.length > 0));
            }
            return new G(n);
        }
        static H() {
            return new G([]);
        }
    }

    const W = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class Y extends Q {
        O(t, n, e) {
            return new Y(t, n, e);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static K(t) {
            return W.test(t);
        }
        W() {
            return this.G().map(t => (t = t.replace("\\", "\\\\").replace("`", "\\`"), Y.K(t) || (t = "`" + t + "`"), 
            t)).join(".");
        }
        toString() {
            return this.W();
        }
        /**
         * Returns true if this field references the key of a document.
         */    J() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static Z() {
            return new Y([ "__name__" ]);
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
         */    static X(t) {
            const n = [];
            let e = "", r = 0;
            const s = () => {
                if (0 === e.length) throw new R(h, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                n.push(e), e = "";
            };
            let i = !1;
            for (;r < t.length; ) {
                const n = t[r];
                if ("\\" === n) {
                    if (r + 1 === t.length) throw new R(h, "Path has trailing escape character: " + t);
                    const n = t[r + 1];
                    if ("\\" !== n && "." !== n && "`" !== n) throw new R(h, "Path has invalid escape sequence: " + t);
                    e += n, r += 2;
                } else "`" === n ? (i = !i, r++) : "." !== n || i ? (e += n, r++) : (s(), r++);
            }
            if (s(), i) throw new R(h, "Unterminated ` in path: " + t);
            return new Y(n);
        }
        static H() {
            return new Y([]);
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
     */ class z {
        constructor(t) {
            this.path = t;
        }
        static tt(t) {
            return new z(G.Y(t));
        }
        static nt(t) {
            return new z(G.Y(t).C(5));
        }
        /** Returns true if the document is in the specified collectionId. */    et(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === G.S(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static S(t, n) {
            return G.S(t.path, n.path);
        }
        static rt(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments The segments of the path to the document
         * @return A new instance of DocumentKey
         */    static st(t) {
            return new z(new G(t.slice()));
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
     */ function H(t) {
        let n = 0;
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n++;
        return n;
    }

    function K(t, n) {
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n(e, t[e]);
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
     * Immutable class that represents a "proto" byte string.
     *
     * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
     * sent on the wire. This class abstracts away this differentiation by holding
     * the proto byte string in a common class that must be converted into a string
     * before being sent as a proto.
     */
    class J {
        constructor(t) {
            this.it = t;
        }
        static fromBase64String(t) {
            const n = atob(t);
            return new J(n);
        }
        static fromUint8Array(t) {
            const n = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let n = "";
                for (let e = 0; e < t.length; ++e) n += String.fromCharCode(t[e]);
                return n;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new J(n);
        }
        toBase64() {
            return t = this.it, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const n = new Uint8Array(t.length);
                for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
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
     */
            /**
     * Returns whether a variable is either undefined or null.
     */ (this.it);
        }
        ot() {
            return 2 * this.it.length;
        }
        u(t) {
            return S(this.it, t.it);
        }
        isEqual(t) {
            return this.it === t.it;
        }
    }

    function Z(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function X(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value The value to test for being an integer and in the safe range
     */ J.ut = new J("");

    function tt(t) {
        var n, e;
        return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
    }

    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */
    /**
     * Returns the local time at which this timestamp was first set.
     */
    function nt(t) {
        const n = at(t.mapValue.fields.__local_write_time__.timestampValue);
        return new B(n.seconds, n.nanos);
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
    const et = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /** Extracts the backend's type order for the provided value. */ function rt(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? tt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : $();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function st(t, n) {
        const e = rt(t);
        if (e !== rt(n)) return !1;
        switch (e) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === n.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return nt(t).isEqual(nt(n));

          case 3 /* TimestampValue */ :
            return function(t, n) {
                if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === n.timestampValue;
                const e = at(t.timestampValue), r = at(n.timestampValue);
                return e.seconds === r.seconds && e.nanos === r.nanos;
            }(t, n);

          case 5 /* StringValue */ :
            return t.stringValue === n.stringValue;

          case 6 /* BlobValue */ :
            return function(t, n) {
                return ht(t.bytesValue).isEqual(ht(n.bytesValue));
            }(t, n);

          case 7 /* RefValue */ :
            return t.referenceValue === n.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                return ct(t.geoPointValue.latitude) === ct(n.geoPointValue.latitude) && ct(t.geoPointValue.longitude) === ct(n.geoPointValue.longitude);
            }(t, n);

          case 2 /* NumberValue */ :
            return function(t, n) {
                if ("integerValue" in t && "integerValue" in n) return ct(t.integerValue) === ct(n.integerValue);
                if ("doubleValue" in t && "doubleValue" in n) {
                    const e = ct(t.doubleValue), r = ct(n.doubleValue);
                    return e === r ? X(e) === X(r) : isNaN(e) && isNaN(r);
                }
                return !1;
            }(t, n);

          case 9 /* ArrayValue */ :
            return O(t.arrayValue.values || [], n.arrayValue.values || [], st);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.mapValue.fields || {}, r = n.mapValue.fields || {};
                if (H(e) !== H(r)) return !1;
                for (const t in e) if (e.hasOwnProperty(t) && (void 0 === r[t] || !st(e[t], r[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, n);

          default:
            return $();
        }
    }

    function it(t, n) {
        return void 0 !== (t.values || []).find(t => st(t, n));
    }

    function ot(t, n) {
        const e = rt(t), r = rt(n);
        if (e !== r) return S(e, r);
        switch (e) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return S(t.booleanValue, n.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, n) {
                const e = ct(t.integerValue || t.doubleValue), r = ct(n.integerValue || n.doubleValue);
                return e < r ? -1 : e > r ? 1 : e === r ? 0 : 
                // one or both are NaN.
                isNaN(e) ? isNaN(r) ? 0 : -1 : 1;
            }(t, n);

          case 3 /* TimestampValue */ :
            return ut(t.timestampValue, n.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return ut(nt(t), nt(n));

          case 5 /* StringValue */ :
            return S(t.stringValue, n.stringValue);

          case 6 /* BlobValue */ :
            return function(t, n) {
                const e = ht(t), r = ht(n);
                return e.u(r);
            }(t.bytesValue, n.bytesValue);

          case 7 /* RefValue */ :
            return function(t, n) {
                const e = t.split("/"), r = n.split("/");
                for (let t = 0; t < e.length && t < r.length; t++) {
                    const n = S(e[t], r[t]);
                    if (0 !== n) return n;
                }
                return S(e.length, r.length);
            }(t.referenceValue, n.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                const e = S(ct(t.latitude), ct(n.latitude));
                if (0 !== e) return e;
                return S(ct(t.longitude), ct(n.longitude));
            }(t.geoPointValue, n.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, n) {
                const e = t.values || [], r = n.values || [];
                for (let t = 0; t < e.length && t < r.length; ++t) {
                    const n = ot(e[t], r[t]);
                    if (n) return n;
                }
                return S(e.length, r.length);
            }(t.arrayValue, n.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.fields || {}, r = Object.keys(e), s = n.fields || {}, i = Object.keys(s);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                r.sort(), i.sort();
                for (let t = 0; t < r.length && t < i.length; ++t) {
                    const n = S(r[t], i[t]);
                    if (0 !== n) return n;
                    const o = ot(e[r[t]], s[i[t]]);
                    if (0 !== o) return o;
                }
                return S(r.length, i.length);
            }
            /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ (t.mapValue, n.mapValue);

          default:
            throw $();
        }
    }

    function ut(t, n) {
        if ("string" == typeof t && "string" == typeof n && t.length === n.length) return S(t, n);
        const e = at(t), r = at(n), s = S(e.seconds, r.seconds);
        return 0 !== s ? s : S(e.nanos, r.nanos);
    }

    function at(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (F(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let n = 0;
            const e = et.exec(t);
            if (F(!!e), e[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = e[1];
                t = (t + "000000000").substr(0, 9), n = Number(t);
            }
            // Parse the date to get the seconds.
                    const r = new Date(t);
            return {
                seconds: Math.floor(r.getTime() / 1e3),
                nanos: n
            };
        }
        return {
            seconds: ct(t.seconds),
            nanos: ct(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function ct(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function ht(t) {
        return "string" == typeof t ? J.fromBase64String(t) : J.fromUint8Array(t);
    }

    /** Returns a reference value for the provided database and key. */ function lt(t, n) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${n.path.W()}`
        };
    }

    /** Returns true if `value` is an ArrayValue. */ function ft(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function dt(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function _t(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function wt(t) {
        return !!t && "mapValue" in t;
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
    class mt {
        constructor(t, n = null, e = [], r = [], s = null, i = null, o = null) {
            this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = r, this.limit = s, 
            this.startAt = i, this.endAt = o, this.at = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function pt(t, n = null, e = [], r = [], s = null, i = null, o = null) {
        return new mt(t, n, e, r, s, i, o);
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
     */
    class yt {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, n = null, e = [], r = [], s = null, i = "F" /* First */ , o = null, u = null) {
            this.path = t, this.collectionGroup = n, this.ct = e, this.filters = r, this.limit = s, 
            this.ht = i, this.startAt = o, this.endAt = u, this.lt = null, 
            // The corresponding `Target` of this `Query` instance.
            this.ft = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function Et(t) {
        return !Z(t.limit) && "L" /* Last */ === t.ht;
    }

    function It(t) {
        return t.ct.length > 0 ? t.ct[0].field : null;
    }

    function At(t) {
        for (const n of t.filters) if (n.dt()) return n.field;
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
    function Tt(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function Pt(t) {
        const n = D(t);
        if (null === n.lt) {
            n.lt = [];
            const t = At(n), e = It(n);
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.J() || n.lt.push(new Ct(t)), n.lt.push(new Ct(Y.Z(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of n.ct) n.lt.push(e), e.field.J() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = n.ct.length > 0 ? n.ct[n.ct.length - 1].dir : "asc" /* ASCENDING */;
                    n.lt.push(new Ct(Y.Z(), t));
                }
            }
        }
        return n.lt;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function Rt(t) {
        const n = D(t);
        if (!n.ft) if ("F" /* First */ === n.ht) n.ft = pt(n.path, n.collectionGroup, Pt(n), n.filters, n.limit, n.startAt, n.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of Pt(n)) {
                const n = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Ct(e.field, n));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const e = n.endAt ? new St(n.endAt.position, !n.endAt.before) : null, r = n.startAt ? new St(n.startAt.position, !n.startAt.before) : null;
            // Now return as a LimitType.First query.
            n.ft = pt(n.path, n.collectionGroup, t, n.filters, n.limit, e, r);
        }
        return n.ft;
    }

    function Vt(t, n) {
        return function(t, n) {
            if (t.limit !== n.limit) return !1;
            if (t.orderBy.length !== n.orderBy.length) return !1;
            for (let e = 0; e < t.orderBy.length; e++) if (!Lt(t.orderBy[e], n.orderBy[e])) return !1;
            if (t.filters.length !== n.filters.length) return !1;
            for (let s = 0; s < t.filters.length; s++) if (e = t.filters[s], r = n.filters[s], 
            e.op !== r.op || !e.field.isEqual(r.field) || !st(e.value, r.value)) return !1;
            var e, r;
            /** Filter that matches on key fields (i.e. '__name__'). */        return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!Ot(t.startAt, n.startAt) && Ot(t.endAt, n.endAt);
        }(Rt(t), Rt(n)) && t.ht === n.ht;
    }

    class gt extends class {} {
        constructor(t, n, e) {
            super(), this.field = t, this.op = n, this.value = e;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, n, e) {
            if (t.J()) return "in" /* IN */ === n || "not-in" /* NOT_IN */ === n ? this._t(t, n, e) : new bt(t, n, e);
            if (dt(e)) {
                if ("==" /* EQUAL */ !== n && "!=" /* NOT_EQUAL */ !== n) throw new R(h, "Invalid query. Null only supports '==' and '!=' comparisons.");
                return new gt(t, n, e);
            }
            if (_t(e)) {
                if ("==" /* EQUAL */ !== n && "!=" /* NOT_EQUAL */ !== n) throw new R(h, "Invalid query. NaN only supports '==' and '!=' comparisons.");
                return new gt(t, n, e);
            }
            return "array-contains" /* ARRAY_CONTAINS */ === n ? new Ft(t, e) : "in" /* IN */ === n ? new Dt(t, e) : "not-in" /* NOT_IN */ === n ? new qt(t, e) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n ? new xt(t, e) : new gt(t, n, e);
        }
        static _t(t, n, e) {
            return "in" /* IN */ === n ? new vt(t, e) : new Nt(t, e);
        }
        matches(t) {
            const n = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== n && this.wt(ot(n, this.value)) : null !== n && rt(this.value) === rt(n) && this.wt(ot(n, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        wt(t) {
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
                return $();
            }
        }
        dt() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    class bt extends gt {
        constructor(t, n, e) {
            super(t, n, e), this.key = z.nt(e.referenceValue);
        }
        matches(t) {
            const n = z.S(t.key, this.key);
            return this.wt(n);
        }
    }

    /** Filter that matches on key fields within an array. */ class vt extends gt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n), this.keys = $t("in" /* IN */ , n);
        }
        matches(t) {
            return this.keys.some(n => n.isEqual(t.key));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class Nt extends gt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n), this.keys = $t("not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            return !this.keys.some(n => n.isEqual(t.key));
        }
    }

    function $t(t, n) {
        var e;
        return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map(t => z.nt(t.referenceValue));
    }

    /** A Filter that implements the array-contains operator. */ class Ft extends gt {
        constructor(t, n) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return ft(n) && it(n.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class Dt extends gt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && it(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the not-in operator. */ class qt extends gt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            if (it(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const n = t.field(this.field);
            return null !== n && !it(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class xt extends gt {
        constructor(t, n) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return !(!ft(n) || !n.arrayValue.values) && n.arrayValue.values.some(t => it(this.value.arrayValue, t));
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
     */ class St {
        constructor(t, n) {
            this.position = t, this.before = n;
        }
    }

    function Ot(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (t.before !== n.before || t.position.length !== n.position.length) return !1;
        for (let e = 0; e < t.position.length; e++) {
            if (!st(t.position[e], n.position[e])) return !1;
        }
        return !0;
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class Ct {
        constructor(t, n = "asc" /* ASCENDING */) {
            this.field = t, this.dir = n;
        }
    }

    function Lt(t, n) {
        return t.dir === n.dir && t.field.isEqual(n.field);
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
     */ var Ut, Mt;

    /**
     * Converts an HTTP Status Code to the equivalent error code.
     *
     * @param status An HTTP Status Code, like 200, 404, 503, etc.
     * @returns The equivalent Code. Unknown status codes are mapped to
     *     Code.UNKNOWN.
     */
    function jt(t) {
        if (void 0 === t) return v("RPC_ERROR", "HTTP error has no status"), c;
        // The canonical error codes for Google APIs [1] specify mapping onto HTTP
        // status codes but the mapping is not bijective. In each case of ambiguity
        // this function chooses a primary error.
        
        // [1]
        // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
            switch (t) {
          case 200:
            // OK
            return u;

          case 400:
            // Bad Request
            return p;

            // Other possibilities based on the forward mapping
            // return Code.INVALID_ARGUMENT;
            // return Code.OUT_OF_RANGE;
                  case 401:
            // Unauthorized
            return w;

          case 403:
            // Forbidden
            return _;

          case 404:
            // Not Found
            return f;

          case 409:
            // Conflict
            return y;

            // Other possibilities:
            // return Code.ALREADY_EXISTS;
                  case 416:
            // Range Not Satisfiable
            return E;

          case 429:
            // Too Many Requests
            return m;

          case 499:
            // Client Closed Request
            return a;

          case 500:
            // Internal Server Error
            return c;

            // Other possibilities:
            // return Code.INTERNAL;
            // return Code.DATA_LOSS;
                  case 501:
            // Unimplemented
            return I;

          case 503:
            // Service Unavailable
            return T;

          case 504:
            // Gateway Timeout
            return l;

          default:
            return t >= 200 && t < 300 ? u : t >= 400 && t < 500 ? p : t >= 500 && t < 600 ? A : c;
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
     */ (Mt = Ut || (Ut = {}))[Mt.OK = 0] = "OK", Mt[Mt.CANCELLED = 1] = "CANCELLED", 
    Mt[Mt.UNKNOWN = 2] = "UNKNOWN", Mt[Mt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    Mt[Mt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Mt[Mt.NOT_FOUND = 5] = "NOT_FOUND", 
    Mt[Mt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Mt[Mt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    Mt[Mt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Mt[Mt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    Mt[Mt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Mt[Mt.ABORTED = 10] = "ABORTED", 
    Mt[Mt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Mt[Mt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    Mt[Mt.INTERNAL = 13] = "INTERNAL", Mt[Mt.UNAVAILABLE = 14] = "UNAVAILABLE", Mt[Mt.DATA_LOSS = 15] = "DATA_LOSS";

    const Bt = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), kt = (() => {
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
    class Qt {
        constructor(t, n) {
            this.i = t, this.yt = n;
        }
    }

    /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */
    function Gt(t, n) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !X(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
     */ (n) ? 
        /**
     * Returns an IntegerValue for `value`.
     */
        function(t) {
            return {
                integerValue: "" + t
            };
        }
        /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */ (n) : function(t, n) {
            if (t.yt) {
                if (isNaN(n)) return {
                    doubleValue: "NaN"
                };
                if (n === 1 / 0) return {
                    doubleValue: "Infinity"
                };
                if (n === -1 / 0) return {
                    doubleValue: "-Infinity"
                };
            }
            return {
                doubleValue: X(n) ? "-0" : n
            };
        }(t, n);
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */ function Wt(t, n) {
        if (t.yt) {
            return `${new Date(1e3 * n.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + n.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + n.seconds,
            nanos: n.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function Yt(t, n) {
        return t.yt ? n.toBase64() : n.toUint8Array();
    }

    function zt(t, n) {
        return Wt(t, n.D());
    }

    function Ht(t) {
        return F(!!t), k.$(function(t) {
            const n = at(t);
            return new B(n.seconds, n.nanos);
        }(t));
    }

    function Kt(t, n) {
        return function(t) {
            return new G([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(n).W();
    }

    function Jt(t, n) {
        return Kt(t.i, n.path);
    }

    function Zt(t, n) {
        const e = function(t) {
            const n = G.Y(t);
            return F(ln(n)), n;
        }(n);
        return F(e.get(1) === t.i.projectId), F(!e.get(3) && !t.i.database || e.get(3) === t.i.database), 
        new z((F((r = e).length > 4 && "documents" === r.get(4)), r.C(5)));
        var r;
        /** Creates a Document proto from key and fields (but no create/update time) */}

    function Xt(t, n) {
        return Kt(t.i, n);
    }

    function tn(t) {
        return new G([ "projects", t.i.projectId, "databases", t.i.database ]).W();
    }

    function nn(t, n, e) {
        return {
            name: Jt(t, n),
            fields: e.proto.mapValue.fields
        };
    }

    function en(t, n) {
        return "found" in n ? function(t, n) {
            F(!!n.found), n.found.name, n.found.updateTime;
            const e = Zt(t, n.found.name), r = Ht(n.found.updateTime), s = new gn({
                mapValue: {
                    fields: n.found.fields
                }
            });
            return new Nn(e, r, s, {});
        }(t, n) : "missing" in n ? function(t, n) {
            F(!!n.missing), F(!!n.readTime);
            const e = Zt(t, n.missing), r = Ht(n.readTime);
            return new $n(e, r);
        }(t, n) : $();
    }

    function rn(t, n) {
        let e;
        if (n instanceof An) e = {
            update: nn(t, n.key, n.value)
        }; else if (n instanceof Rn) e = {
            delete: Jt(t, n.key)
        }; else if (n instanceof Tn) e = {
            update: nn(t, n.key, n.data),
            updateMask: hn(n.Et)
        }; else if (n instanceof Pn) e = {
            transform: {
                document: Jt(t, n.key),
                fieldTransforms: n.fieldTransforms.map(t => function(t, n) {
                    const e = n.transform;
                    if (e instanceof dn) return {
                        fieldPath: n.field.W(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (e instanceof _n) return {
                        fieldPath: n.field.W(),
                        appendMissingElements: {
                            values: e.elements
                        }
                    };
                    if (e instanceof wn) return {
                        fieldPath: n.field.W(),
                        removeAllFromArray: {
                            values: e.elements
                        }
                    };
                    if (e instanceof mn) return {
                        fieldPath: n.field.W(),
                        increment: e.It
                    };
                    throw $();
                }(0, t))
            }
        }; else {
            if (!(n instanceof Vn)) return $();
            e = {
                verify: Jt(t, n.key)
            };
        }
        return n.Tt.At || (e.currentDocument = function(t, n) {
            return void 0 !== n.updateTime ? {
                updateTime: zt(t, n.updateTime)
            } : void 0 !== n.exists ? {
                exists: n.exists
            } : $();
        }(t, n.Tt)), e;
    }

    function sn(t, n) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, r = n.path;
        null !== n.collectionGroup ? (e.parent = Xt(t, r), e.structuredQuery.from = [ {
            collectionId: n.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = Xt(t, r.L()), e.structuredQuery.from = [ {
            collectionId: r.M()
        } ]);
        const s = function(t) {
            if (0 === t.length) return;
            const n = t.map(t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (_t(t.value)) return {
                        unaryFilter: {
                            field: cn(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (dt(t.value)) return {
                        unaryFilter: {
                            field: cn(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (_t(t.value)) return {
                        unaryFilter: {
                            field: cn(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (dt(t.value)) return {
                        unaryFilter: {
                            field: cn(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: cn(t.field),
                        op: an(t.op),
                        value: t.value
                    }
                };
            }(t));
            if (1 === n.length) return n[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: n
                }
            };
        }(n.filters);
        s && (e.structuredQuery.where = s);
        const i = function(t) {
            if (0 === t.length) return;
            return t.map(t => 
            // visible for testing
            function(t) {
                return {
                    field: cn(t.field),
                    direction: un(t.dir)
                };
            }(t));
        }(n.orderBy);
        i && (e.structuredQuery.orderBy = i);
        const o = function(t, n) {
            return t.yt || Z(n) ? n : {
                value: n
            };
        }(t, n.limit);
        return null !== o && (e.structuredQuery.limit = o), n.startAt && (e.structuredQuery.startAt = on(n.startAt)), 
        n.endAt && (e.structuredQuery.endAt = on(n.endAt)), e;
    }

    function on(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    // visible for testing
    function un(t) {
        return Bt[t];
    }

    // visible for testing
    function an(t) {
        return kt[t];
    }

    function cn(t) {
        return {
            fieldPath: t.W()
        };
    }

    function hn(t) {
        const n = [];
        return t.fields.forEach(t => n.push(t.W())), {
            fieldPaths: n
        };
    }

    function ln(t) {
        // Resource names have at least 4 components (project ID, database ID)
        return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
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
    /** Represents a transform within a TransformMutation. */ class fn {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this.Pt = void 0;
        }
    }

    /** Transforms a value into a server-generated timestamp. */ class dn extends fn {}

    /** Transforms an array value via a union operation. */ class _n extends fn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /** Transforms an array value via a remove operation. */ class wn extends fn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class mn extends fn {
        constructor(t, n) {
            super(), this.serializer = t, this.It = n;
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
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */ class pn {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(Y.S);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    Rt(t) {
            for (const n of this.fields) if (n.B(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return O(this.fields, t.fields, (t, n) => t.isEqual(n));
        }
    }

    /** A field path and the TransformOperation to perform upon it. */ class yn {
        constructor(t, n) {
            this.field = t, this.transform = n;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class En {
        constructor(t, n) {
            this.updateTime = t, this.exists = n;
        }
        /** Creates a new empty Precondition. */    static Vt() {
            return new En;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new En(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new En(t);
        }
        /** Returns whether this Precondition is empty. */    get At() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
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
     */ class In {}

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class An extends In {
        constructor(t, n, e) {
            super(), this.key = t, this.value = n, this.Tt = e, this.type = 0 /* Set */;
        }
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
     */ class Tn extends In {
        constructor(t, n, e, r) {
            super(), this.key = t, this.data = n, this.Et = e, this.Tt = r, this.type = 1 /* Patch */;
        }
    }

    /**
     * A mutation that modifies specific fields of the document with transform
     * operations. Currently the only supported transform is a server timestamp, but
     * IP Address, increment(n), etc. could be supported in the future.
     *
     * It is somewhat similar to a PatchMutation in that it patches specific fields
     * and has no effect when applied to a null or NoDocument (see comment on
     * Mutation for rationale).
     */ class Pn extends In {
        constructor(t, n) {
            super(), this.key = t, this.fieldTransforms = n, this.type = 2 /* Transform */ , 
            // NOTE: We set a precondition of exists: true as a safety-check, since we
            // always combine TransformMutations with a SetMutation or PatchMutation which
            // (if successful) should end up with an existing document.
            this.Tt = En.exists(!0);
        }
    }

    /** A mutation that deletes the document at the given key. */ class Rn extends In {
        constructor(t, n) {
            super(), this.key = t, this.Tt = n, this.type = 3 /* Delete */;
        }
    }

    /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ class Vn extends In {
        constructor(t, n) {
            super(), this.key = t, this.Tt = n, this.type = 4 /* Verify */;
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
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */ class gn {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new gn({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path the path to search
         * @return The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.j()) return this.proto;
            {
                let n = this.proto;
                for (let e = 0; e < t.length - 1; ++e) {
                    if (!n.mapValue.fields) return null;
                    if (n = n.mapValue.fields[t.get(e)], !wt(n)) return null;
                }
                return n = (n.mapValue.fields || {})[t.M()], n || null;
            }
        }
        isEqual(t) {
            return st(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class bn {
        /**
         * @param baseObject The object to mutate.
         */
        constructor(t = gn.empty()) {
            this.gt = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.bt = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path The field path to set.
         * @param value The value to set.
         * @return The current Builder instance.
         */    set(t, n) {
            return this.vt(t, n), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path The field path to remove.
         * @return The current Builder instance.
         */    delete(t) {
            return this.vt(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    vt(t, n) {
            let e = this.bt;
            for (let n = 0; n < t.length - 1; ++n) {
                const r = t.get(n);
                let s = e.get(r);
                s instanceof Map ? 
                // Re-use a previously created map
                e = s : s && 10 /* ObjectValue */ === rt(s) ? (
                // Convert the existing Protobuf MapValue into a map
                s = new Map(Object.entries(s.mapValue.fields || {})), e.set(r, s), e = s) : (
                // Create an empty map to represent the current nesting level
                s = new Map, e.set(r, s), e = s);
            }
            e.set(t.M(), n);
        }
        /** Returns an ObjectValue with all mutations applied. */    Nt() {
            const t = this.$t(Y.H(), this.bt);
            return null != t ? new gn(t) : this.gt;
        }
        /**
         * Applies any overlays from `currentOverlays` that exist at `currentPath`
         * and returns the merged data at `currentPath` (or null if there were no
         * changes).
         *
         * @param currentPath The path at the current nesting level. Can be set to
         * FieldValue.emptyPath() to represent the root.
         * @param currentOverlays The overlays at the current nesting level in the
         * same format as `overlayMap`.
         * @return The merged data at `currentPath` or null if no modifications
         * were applied.
         */    $t(t, n) {
            let e = !1;
            const r = this.gt.field(t), s = wt(r) ? // If there is already data at the current path, base our
            Object.assign({}, r.mapValue.fields) : {};
            return n.forEach((n, r) => {
                if (n instanceof Map) {
                    const i = this.$t(t.child(r), n);
                    null != i && (s[r] = i, e = !0);
                } else null !== n ? (s[r] = n, e = !0) : s.hasOwnProperty(r) && (delete s[r], e = !0);
            }), e ? {
                mapValue: {
                    fields: s
                }
            } : null;
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
     * The result of a lookup for a given path may be an existing document or a
     * marker that this document does not exist at a given version.
     */ class vn {
        constructor(t, n) {
            this.key = t, this.version = n;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class Nn extends vn {
        constructor(t, n, e, r) {
            super(t, n), this.Ft = e, this.Dt = !!r.Dt, this.hasCommittedMutations = !!r.hasCommittedMutations;
        }
        field(t) {
            return this.Ft.field(t);
        }
        data() {
            return this.Ft;
        }
        qt() {
            return this.Ft.proto;
        }
        isEqual(t) {
            return t instanceof Nn && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.Dt === t.Dt && this.hasCommittedMutations === t.hasCommittedMutations && this.Ft.isEqual(t.Ft);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.Ft.toString()}, {hasLocalMutations: ${this.Dt}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.Dt || this.hasCommittedMutations;
        }
    }

    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */ class $n extends vn {
        constructor(t, n, e) {
            super(t, n), this.hasCommittedMutations = !(!e || !e.hasCommittedMutations);
        }
        toString() {
            return `NoDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return this.hasCommittedMutations;
        }
        isEqual(t) {
            return t instanceof $n && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
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
     */ class Fn {
        constructor() {
            this.promise = new Promise((t, n) => {
                this.resolve = t, this.reject = n;
            });
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
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class Dn {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        n, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        e = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , r = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , s = 6e4) {
            this.xt = t, this.St = n, this.Ot = e, this.Ct = r, this.Lt = s, this.Ut = 0, this.Mt = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.jt = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.Ut = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    Bt() {
            this.Ut = this.Lt;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    kt(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const n = Math.floor(this.Ut + this.Qt()), e = Math.max(0, Date.now() - this.jt), r = Math.max(0, n - e);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    r > 0 && b("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.Ut} ms, delay with jitter: ${n} ms, last attempt: ${e} ms ago)`), 
            this.Mt = this.xt.Gt(this.St, r, () => (this.jt = Date.now(), t())), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.Ut *= this.Ct, this.Ut < this.Ot && (this.Ut = this.Ot), this.Ut > this.Lt && (this.Ut = this.Lt);
        }
        Wt() {
            null !== this.Mt && (this.Mt.Yt(), this.Mt = null);
        }
        cancel() {
            null !== this.Mt && (this.Mt.cancel(), this.Mt = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Qt() {
            return (Math.random() - .5) * this.Ut;
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
    /** Verifies whether `e` is an IndexedDbTransactionError. */
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
    /** The Platform's 'document' implementation or null if not available. */
    function qn() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
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
    class xn {
        constructor(t, n, e, r, s) {
            this.zt = t, this.St = n, this.Ht = e, this.op = r, this.Kt = s, this.Jt = new Fn, 
            this.then = this.Jt.promise.then.bind(this.Jt.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.Jt.promise.catch(t => {});
        }
        /**
         * Creates and returns a DelayedOperation that has been scheduled to be
         * executed on the provided asyncQueue after the provided delayMs.
         *
         * @param asyncQueue The queue to schedule the operation on.
         * @param id A Timer ID identifying the type of operation this is.
         * @param delayMs The delay (ms) before the operation should be scheduled.
         * @param op The operation to run.
         * @param removalCallback A callback to be called synchronously once the
         *   operation is executed or canceled, notifying the AsyncQueue to remove it
         *   from its delayedOperations list.
         *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
         *   the DelayedOperation class public.
         */    static Zt(t, n, e, r, s) {
            const i = Date.now() + e, o = new xn(t, n, i, r, s);
            return o.start(e), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.Xt = setTimeout(() => this.tn(), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    Yt() {
            return this.tn();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.Xt && (this.clearTimeout(), this.Jt.reject(new R(a, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        tn() {
            this.zt.nn(() => null !== this.Xt ? (this.clearTimeout(), this.op().then(t => this.Jt.resolve(t))) : Promise.resolve());
        }
        clearTimeout() {
            null !== this.Xt && (this.Kt(this), clearTimeout(this.Xt), this.Xt = null);
        }
    }

    class Sn {
        constructor() {
            // The last promise in the queue.
            this.en = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.rn = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.sn = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.on = [], 
            // visible for testing
            this.un = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.an = !1, 
            // List of TimerIds to fast-forward delays for.
            this.cn = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.hn = new Dn(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.ln = () => {
                const t = qn();
                t && b("AsyncQueue", "Visibility state changed to  ", t.visibilityState), this.hn.Wt();
            };
            const t = qn();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.ln);
        }
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get fn() {
            return this.sn;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    nn(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        /**
         * Regardless if the queue has initialized shutdown, adds a new operation to the
         * queue without waiting for it to complete (i.e. we ignore the Promise result).
         */    dn(t) {
            this._n(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.wn(t);
        }
        /**
         * Initialize the shutdown of this queue. Once this method is called, the
         * only possible way to request running an operation is through
         * `enqueueEvenWhileRestricted()`.
         */    mn() {
            if (!this.sn) {
                this.sn = !0;
                const t = qn();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.ln);
            }
        }
        /**
         * Adds a new operation to the queue. Returns a promise that will be resolved
         * when the promise returned by the new operation is (with its value).
         */    enqueue(t) {
            return this._n(), this.sn ? new Promise(t => {}) : this.wn(t);
        }
        /**
         * Enqueue a retryable operation.
         *
         * A retryable operation is rescheduled with backoff if it fails with a
         * IndexedDbTransactionError (the error type used by SimpleDb). All
         * retryable operations are executed in order and only run if all prior
         * operations were retried successfully.
         */    pn(t) {
            this.rn.push(t), this.nn(() => this.yn());
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async yn() {
            if (0 !== this.rn.length) {
                try {
                    await this.rn[0](), this.rn.shift(), this.hn.reset();
                } catch (t) {
                    if (!function(t) {
                        // Use name equality, as instanceof checks on errors don't work with errors
                        // that wrap other errors.
                        return "IndexedDbTransactionError" === t.name;
                    }(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    b("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.rn.length > 0 && 
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
                this.hn.kt(() => this.yn());
            }
        }
        wn(t) {
            const n = this.en.then(() => (this.an = !0, t().catch(t => {
                this.un = t, this.an = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw v("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error Error or FirestoreError
     */
                function(t) {
                    let n = t.message || "";
                    t.stack && (n = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
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
     */
                /**
     * Datastore and its related methods are a wrapper around the external Google
     * Cloud Datastore grpc API, which provides an interface that is more convenient
     * for the rest of the client SDK architecture to consume.
     */ (t)), t;
            }).then(t => (this.an = !1, t))));
            return this.en = n, n;
        }
        /**
         * Schedules an operation to be queued on the AsyncQueue once the specified
         * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
         * or fast-forward the operation prior to its running.
         */    Gt(t, n, e) {
            this._n(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.cn.indexOf(t) > -1 && (n = 0);
            const r = xn.Zt(this, t, n, e, t => this.En(t));
            return this.on.push(r), r;
        }
        _n() {
            this.un && $();
        }
        /**
         * Verifies there's an operation currently in-progress on the AsyncQueue.
         * Unfortunately we can't verify that the running code is in the promise chain
         * of that operation, so this isn't a foolproof check, but it should be enough
         * to catch some bugs.
         */    In() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async An() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.en, await t;
            } while (t !== this.en);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    Tn(t) {
            for (const n of this.on) if (n.St === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId Delayed operations up to and including this TimerId will
         *  be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Pn(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.An().then(() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.on.sort((t, n) => t.Ht - n.Ht);
                for (const n of this.on) if (n.Yt(), "all" /* All */ !== t && n.St === t) break;
                return this.An();
            });
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    Rn(t) {
            this.cn.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    En(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const n = this.on.indexOf(t);
            this.on.splice(n, 1);
        }
    }

    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class On extends class {} {
        constructor(t, n, e) {
            super(), this.credentials = t, this.Vn = n, this.serializer = e, this.gn = !1;
        }
        bn() {
            if (this.gn) throw new R(p, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    vn(t, n, e) {
            return this.bn(), this.credentials.getToken().then(r => this.Vn.vn(t, n, e, r)).catch(t => {
                throw t.code === w && this.credentials.V(), t;
            });
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    Nn(t, n, e) {
            return this.bn(), this.credentials.getToken().then(r => this.Vn.Nn(t, n, e, r)).catch(t => {
                throw t.code === w && this.credentials.V(), t;
            });
        }
        terminate() {
            this.gn = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    async function Cn(t, n) {
        const e = D(t), r = tn(e.serializer) + "/documents", s = {
            writes: n.map(t => rn(e.serializer, t))
        };
        await e.vn("Commit", r, s);
    }

    async function Ln(t, n) {
        const e = D(t), r = tn(e.serializer) + "/documents", s = {
            documents: n.map(t => Jt(e.serializer, t))
        }, i = await e.Nn("BatchGetDocuments", r, s), o = new Map;
        i.forEach(t => {
            const n = en(e.serializer, t);
            o.set(n.key.toString(), n);
        });
        const u = [];
        return n.forEach(t => {
            const n = o.get(t.toString());
            F(!!n), u.push(n);
        }), u;
    }

    async function Un(t, n) {
        const e = D(t), r = sn(e.serializer, Rt(n));
        return (await e.Nn("RunQuery", r.parent, {
            structuredQuery: r.structuredQuery
        })).filter(t => !!t.document).map(t => function(t, n, e) {
            const r = Zt(t, n.name), s = Ht(n.updateTime), i = new gn({
                mapValue: {
                    fields: n.fields
                }
            });
            return new Nn(r, s, i, {
                hasCommittedMutations: !!e
            });
        }(e.serializer, t.document, void 0));
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
     */ const Mn = {
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
     * A Rest-based connection that relies on the native HTTP stack
     * (e.g. `fetch` or a polyfill).
     */
    class jn extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.$n = t, this.i = t.i;
            const n = t.ssl ? "https" : "http";
            this.Fn = n + "://" + t.host, this.Dn = "projects/" + this.i.projectId + "/databases/" + this.i.database + "/documents";
        }
        vn(t, n, e, r) {
            const s = this.qn(t, n);
            b("RestConnection", "Sending: ", s, e);
            const i = {};
            return this.xn(i, r), this.Sn(t, s, i, e).then(t => (b("RestConnection", "Received: ", t), 
            t), n => {
                throw function(t, ...n) {
                    if (V.logLevel <= exports.LogLevel.WARN) {
                        const e = n.map(N);
                        V.warn("Firestore (7.21.1): " + t, ...e);
                    }
                }("RestConnection", t + " failed with error: ", n, "url: ", s, "request:", e), n;
            });
        }
        Nn(t, n, e, r) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.vn(t, n, e, r);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    xn(t, n) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/7.21.1", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", n) for (const e in n.p) n.p.hasOwnProperty(e) && (t[e] = n.p[e]);
        }
        qn(t, n) {
            const e = Mn[t];
            return `${this.Fn}/v1/${n}:${e}`;
        }
    } {
        /**
         * @param databaseInfo The connection info.
         * @param fetchImpl `fetch` or a Polyfill that implements the fetch API.
         */
        constructor(t, n) {
            super(t), this.On = n;
        }
        Cn(t, n) {
            throw new Error("Not supported by FetchConnection");
        }
        async Sn(t, n, e, r) {
            const s = JSON.stringify(r);
            let i;
            try {
                i = await this.On(n, {
                    method: "POST",
                    headers: e,
                    body: s
                });
            } catch (t) {
                throw new R(jt(t.status), "Request failed with error: " + t.statusText);
            }
            if (!i.ok) throw new R(jt(i.status), "Request failed with error: " + i.statusText);
            return i.json();
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
    /** Initializes the HTTP connection for the REST API. */
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
    function Bn(t) {
        return new Qt(t, /* useProto3Json= */ !0);
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
     */ const kn = new Map;

    // settings() defaults:
    /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeDatastore() when the Firestore
     * instance is terminated.
     */
    function Qn(t) {
        var n, e;
        if (t.Ln) throw new R(p, "The client has already been terminated.");
        if (!kn.has(t)) {
            b("ComponentProvider", "Initializing Datastore");
            const r = t.Un(), s = new C(t.Mn, t.jn, null !== (n = r.host) && void 0 !== n ? n : "firestore.googleapis.com", null === (e = r.ssl) || void 0 === e || e, 
            /* forceLongPolling= */ !1), i = function(t) {
                return new jn(t, fetch.bind(null));
            }(s), o = Bn(s.i), u = function(t, n, e) {
                return new On(t, n, e);
            }(t.Bn, i, o);
            kn.set(t, u);
        }
        return kn.get(t);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
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
     * Do not call this constructor directly. Instead, use {@link getFirestore()}.
     */
    class Gn {
        constructor(t, n) {
            this.jn = "(lite)", this.kn = !1, this.app = t, this.Mn = Gn.Qn(t), this.Bn = new j(n);
        }
        get Gn() {
            return this.kn;
        }
        get Ln() {
            return void 0 !== this.Wn;
        }
        Yn(t) {
            if (this.kn) throw new R(p, "Firestore has already been started and its settings can no longer be changed. initializeFirestore() cannot be called after calling getFirestore().");
            this.zn = t;
        }
        Un() {
            return this.zn || (this.zn = {}), this.kn = !0, this.zn;
        }
        static Qn(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new R(h, '"projectId" not provided in firebase.initializeApp.');
            return new L(t.options.projectId);
        }
        _delete() {
            return this.Wn || (this.Wn = this.Hn()), this.Wn;
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    Hn() {
            return function(t) {
                const n = kn.get(t);
                n && (b("ComponentProvider", "Removing Datastore"), kn.delete(t), n.terminate());
            }(this), Promise.resolve();
        }
    }

    /**
     * Initializes a new instance of Cloud Firestore with the provided settings.
     * Can only be called before any other functions, including
     * {@link getFirestore()}. If the custom settings are empty, this function is
     * equivalent to calling {@link getFirestore()}.
     *
     * @param app The {@link FirebaseApp} with which the `Firestore` instance will be
     * associated.
     * @param settings A settings object to configure the `Firestore` instance.
     * @return A newly initialized Firestore instance.
     */ function Wn(n, e) {
        const r = app._getProvider(n, "firestore/lite").getImmediate();
        return r.Yn(e), r;
    }

    /**
     * Returns the existing instance of Firestore that is associated with the
     * provided {@link FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app The {@link FirebaseApp} instance that the returned Firestore
     * instance is associated with.
     * @return The `Firestore` instance of the provided app.
     */ function Yn(n) {
        return app._getProvider(n, "firestore/lite").getImmediate();
    }

    /**
     * Terminates the provided Firestore instance.
     *
     * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
     * may be used. Any other function will throw a `FirestoreError`. Termination
     * does not cancel any pending writes, and any promises that are awaiting a
     * response from the server will not be resolved.
     *
     * To restart after termination, create a new instance of FirebaseFirestore with
     * {@link getFirestore()}.
     *
     * Note: Under normal circumstances, calling `terminate()` is not required. This
     * function is useful only when you want to force this instance to release all of
     * its resources or in combination with {@link clearIndexedDbPersistence()} to
     * ensure that all local state is destroyed between test runs.
     *
     * @return A promise that is resolved when the instance has been successfully
     * terminated.
     */ function zn(t) {
        return app._removeServiceInstance(t.app, "firestore/lite"), t._delete();
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
     * Validates the invocation of functionName has the exact number of arguments.
     *
     * Forward the magic "arguments" variable as second parameter on which the
     * parameter validation is performed:
     * validateExactNumberOfArgs('myFunction', arguments, 2);
     */
    function Hn(t, n, e) {
        if (n.length !== e) throw new R(h, `Function ${t}() requires ` + se(e, "argument") + ", but was called with " + se(n.length, "argument") + ".");
    }

    /**
     * Validates the invocation of functionName has at least the provided number of
     * arguments (but can have many more).
     *
     * Forward the magic "arguments" variable as second parameter on which the
     * parameter validation is performed:
     * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
     */ function Kn(t, n, e) {
        if (n.length < e) throw new R(h, `Function ${t}() requires at least ` + se(e, "argument") + ", but was called with " + se(n.length, "argument") + ".");
    }

    /**
     * Validates the provided argument is an array and has as least the expected
     * number of elements.
     */
    /**
     * Validates the provided positional argument has the native JavaScript type
     * using typeof checks.
     */
    function Jn(t, n, e, r) {
        !
        /** Helper to validate the type of a provided input. */
        function(t, n, e, r) {
            let s = !1;
            s = "object" === n ? te(r) : "non-empty string" === n ? "string" == typeof r && "" !== r : typeof r === n;
            if (!s) {
                const s = ne(r);
                throw new R(h, `Function ${t}() requires its ${e} to be of type ${n}, but it was: ${s}`);
            }
        }
        /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */ (t, n, re(e) + " argument", r);
    }

    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */ function Zn(t) {
        if (!z.rt(t)) throw new R(h, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function Xn(t) {
        if (z.rt(t)) throw new R(h, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    function te(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }

    /** Returns a string describing the type / value of the provided input. */ function ne(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const n = 
                /** Hacky method to try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) {
                        const n = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (n && n.length > 1) return n[1];
                    }
                    return null;
                }
                /**
     * Helper method to throw an error that the provided argument did not pass
     * an instanceof check.
     */ (t);
                return n ? `a custom ${n} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : $();
    }

    function ee(t, n, e) {
        if (e <= 0) throw new R(h, `Function ${t}() requires its ${re(n)} argument to be a positive number, but it was: ${e}.`);
    }

    /** Converts a number to its english word representation */ function re(t) {
        switch (t) {
          case 1:
            return "first";

          case 2:
            return "second";

          case 3:
            return "third";

          default:
            return t + "th";
        }
    }

    /**
     * Formats the given word as plural conditionally given the preceding number.
     */ function se(t, n) {
        return `${t} ${n}` + (1 === t ? "" : "s");
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
    // The objects that are a part of this API are exposed to third-parties as
    // compiled javascript so we want to flag our private members with a leading
    // underscore to discourage their use.
    /**
     * A field class base class that is shared by the lite, full and legacy SDK,
     * which supports shared code that deals with FieldPaths.
     */
    // Use underscore prefix to hide this class from our Public API.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    class ie {
        constructor(t) {
            !function(t, n, e, r) {
                if (!(n instanceof Array) || n.length < r) throw new R(h, `Function ${t}() requires its ${e} argument to be an array with at least ` + se(r, "element") + ".");
            }("FieldPath", t, "fieldNames", 1);
            for (let n = 0; n < t.length; ++n) if (Jn("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new R(h, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.Kn = new Y(t);
        }
    }

    /**
     * A `FieldPath` refers to a field in a document. The path may consist of a
     * single field name (referring to a top-level field in the document), or a list
     * of field names (referring to a nested field in the document).
     */ class oe extends ie {
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames A list of field names.
         */
        constructor(...t) {
            super(t);
        }
        static documentId() {
            /**
             * Internal Note: The backend doesn't technically support querying by
             * document ID. Instead it queries by the entire document name (full path
             * included), but in the cases we currently support documentId(), the net
             * effect is the same.
             */
            return new oe(Y.Z().W());
        }
        isEqual(t) {
            if (!(t instanceof oe)) throw function(t, n, e, r) {
                const s = ne(r);
                return new R(h, `Function ${t}() requires its ${re(e)} argument to be a ${n}, but it was: ${s}`);
            }("isEqual", "FieldPath", 1, t);
            return this.Kn.isEqual(t.Kn);
        }
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const ue = new RegExp("[~\\*/\\[\\]]");

    /**
     * Parses a field path string into a FieldPath, treating dots as separators.
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
     * Sentinel values that can be used when writing document fields with `set()`
     * or `update()`.
     */
    class ae {
        /**
         * @param _methodName The public API endpoint that returns this class.
         */
        constructor(t) {
            this.Jn = t;
        }
    }

    /**
     * Returns a sentinel for use with {@link updateDoc()} or
     * {@link setDoc `setDoc({}, { merge: true })`} to mark a field for deletion.
     */ function ce() {
        return new _e("deleteField");
    }

    /**
     * Returns a sentinel used with {@link setDoc()} or {@link updateDoc()} to
     * include a server-generated timestamp in the written data.
     */ function he() {
        return new me("serverTimestamp");
    }

    /**
     * Returns a special value that can be used with {@link setDoc()} or {@link
     * updateDoc()} that tells the server to union the given elements with any array
     * value that already exists on the server. Each specified element that doesn't
     * already exist in the array will be added to the end. If the field being
     * modified is not already an array it will be overwritten with an array
     * containing exactly the specified elements.
     *
     * @param elements The elements to union into the array.
     * @return The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`.
     */ function le(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return Kn("arrayUnion()", arguments, 1), new pe("arrayUnion", t);
    }

    /**
     * Returns a special value that can be used with {@link setDoc()} or {@link
     * updateDoc()} that tells the server to remove the given elements from any
     * array value that already exists on the server. All instances of each element
     * specified will be removed from the array. If the field being modified is not
     * already an array it will be overwritten with an empty array.
     *
     * @param elements The elements to remove from the array.
     * @return The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function fe(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return Kn("arrayRemove()", arguments, 1), new ye("arrayRemove", t);
    }

    /**
     * Returns a special value that can be used with {@link setDoc()} or {@link
     * updateDoc()} that tells the server to increment the field's current value by
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
     * @param n The value to increment by.
     * @return The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function de(t) {
        return new Ee("increment", t);
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
     */ class _e extends ae {
        Zn(t) {
            if (2 /* MergeSet */ !== t.Xn) throw 1 /* Update */ === t.Xn ? t.te(this.Jn + "() can only appear at the top level of your update data") : t.te(this.Jn + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.Et.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof _e;
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
     * @param fieldValue The sentinel FieldValue for which to create a child
     *     context.
     * @param context The parent context.
     * @param arrayElement Whether or not the FieldValue has an array.
     */ function we(t, n, e) {
        return new ve({
            Xn: 3 /* Argument */ ,
            ne: n.settings.ne,
            methodName: t.Jn,
            ee: e
        }, n.i, n.serializer, n.ignoreUndefinedProperties);
    }

    class me extends ae {
        Zn(t) {
            return new yn(t.path, new dn);
        }
        isEqual(t) {
            return t instanceof me;
        }
    }

    class pe extends ae {
        constructor(t, n) {
            super(t), this.re = n;
        }
        Zn(t) {
            const n = we(this, t, 
            /*array=*/ !0), e = this.re.map(t => xe(t, n)), r = new _n(e);
            return new yn(t.path, r);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class ye extends ae {
        constructor(t, n) {
            super(t), this.re = n;
        }
        Zn(t) {
            const n = we(this, t, 
            /*array=*/ !0), e = this.re.map(t => xe(t, n)), r = new wn(e);
            return new yn(t.path, r);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class Ee extends ae {
        constructor(t, n) {
            super(t), this.se = n;
        }
        Zn(t) {
            const n = new mn(t.serializer, Gt(t.serializer, this.se));
            return new yn(t.path, n);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
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
     * An immutable object representing a geographic location in Firestore. The
     * location is represented as latitude/longitude pair.
     *
     * Latitude values are in the range of [-90, 90].
     * Longitude values are in the range of [-180, 180].
     */ class Ie {
        /**
         * Creates a new immutable `GeoPoint` object with the provided latitude and
         * longitude values.
         * @param latitude The latitude as number between -90 and 90.
         * @param longitude The longitude as number between -180 and 180.
         */
        constructor(t, n) {
            if (Hn("GeoPoint", arguments, 2), Jn("GeoPoint", "number", 1, t), Jn("GeoPoint", "number", 2, n), 
            !isFinite(t) || t < -90 || t > 90) throw new R(h, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(n) || n < -180 || n > 180) throw new R(h, "Longitude must be a number between -180 and 180, but was: " + n);
            this.ie = t, this.oe = n;
        }
        /**
         * The latitude of this `GeoPoint` instance.
         */    get latitude() {
            return this.ie;
        }
        /**
         * The longitude of this `GeoPoint` instance.
         */    get longitude() {
            return this.oe;
        }
        /**
         * Returns true if this `GeoPoint` is equal to the provided one.
         *
         * @param other The `GeoPoint` to compare against.
         * @return true if this `GeoPoint` is equal to the provided one.
         */    isEqual(t) {
            return this.ie === t.ie && this.oe === t.oe;
        }
        toJSON() {
            return {
                latitude: this.ie,
                longitude: this.oe
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    N(t) {
            return S(this.ie, t.ie) || S(this.oe, t.oe);
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
     */ class Ae {
        constructor(t) {
            this.ue = t;
        }
        /**
         * Creates a new `Bytes` object from the given Base64 string, converting it to
         * bytes.
         *
         * @param base64 The Base64 string used to create the `Bytes` object.
         */    static fromBase64String(t) {
            try {
                return new Ae(J.fromBase64String(t));
            } catch (t) {
                throw new R(h, "Failed to construct Bytes from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new Ae(J.fromUint8Array(t));
        }
        /**
         * Returns the underlying bytes as a Base64-encoded string.
         *
         * @return The Base64-encoded string created from the `Bytes` object.
         */    toBase64() {
            return this.ue.toBase64();
        }
        /**
         * Returns the underlying bytes in a new `Uint8Array`.
         *
         * @return The Uint8Array created from the `Bytes` object.
         */    toUint8Array() {
            return this.ue.toUint8Array();
        }
        /**
         * Returns a string representation of the `Bytes` object.
         *
         * @return A string representation of the `Bytes` object.
         */    toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        /**
         * Returns true if this `Bytes` object is equal to the provided one.
         *
         * @param other The `Bytes` object to compare against.
         * @return true if this `Bytes` object is equal to the provided one.
         */    isEqual(t) {
            return this.ue.isEqual(t.ue);
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
     */ class Te {
        constructor(t) {
            this.ae = t;
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
     */ const Pe = /^__.*__$/;

    /**
     * A reference to a document in a Firebase project.
     *
     * This class serves as a common base class for the public DocumentReferences
     * exposed in the lite, full and legacy SDK.
     */
    // Use underscore prefix to hide this class from our Public API.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    class Re {
        constructor(t, n, e) {
            this.Mn = t, this.ce = n, this.he = e;
        }
    }

    /** The result of parsing document data (e.g. for a setData call). */ class Ve {
        constructor(t, n, e) {
            this.data = t, this.Et = n, this.fieldTransforms = e;
        }
        le(t, n) {
            const e = [];
            return null !== this.Et ? e.push(new Tn(t, this.data, this.Et, n)) : e.push(new An(t, this.data, n)), 
            this.fieldTransforms.length > 0 && e.push(new Pn(t, this.fieldTransforms)), e;
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class ge {
        constructor(t, n, e) {
            this.data = t, this.Et = n, this.fieldTransforms = e;
        }
        le(t, n) {
            const e = [ new Tn(t, this.data, this.Et, n) ];
            return this.fieldTransforms.length > 0 && e.push(new Pn(t, this.fieldTransforms)), 
            e;
        }
    }

    function be(t) {
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
            throw $();
        }
    }

    /** A "context" object passed around while parsing user data. */ class ve {
        /**
         * Initializes a ParseContext with the given source and path.
         *
         * @param settings The settings for the parser.
         * @param databaseId The database ID of the Firestore instance.
         * @param serializer The serializer to use to generate the Value proto.
         * @param ignoreUndefinedProperties Whether to ignore undefined properties
         * rather than throw.
         * @param fieldTransforms A mutable list of field transforms encountered while
         *     parsing the data.
         * @param fieldMask A mutable list of field paths encountered while parsing
         *     the data.
         *
         * TODO(b/34871131): We don't support array paths right now, so path can be
         * null to indicate the context represents any location within an array (in
         * which case certain features will not work and errors will be somewhat
         * compromised).
         */
        constructor(t, n, e, r, s, i) {
            this.settings = t, this.i = n, this.serializer = e, this.ignoreUndefinedProperties = r, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === s && this.fe(), this.fieldTransforms = s || [], this.Et = i || [];
        }
        get path() {
            return this.settings.path;
        }
        get Xn() {
            return this.settings.Xn;
        }
        /** Returns a new context with the specified settings overwritten. */    de(t) {
            return new ve(Object.assign(Object.assign({}, this.settings), t), this.i, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.Et);
        }
        _e(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), r = this.de({
                path: e,
                ee: !1
            });
            return r.we(t), r;
        }
        me(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), r = this.de({
                path: e,
                ee: !1
            });
            return r.fe(), r;
        }
        pe(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.de({
                path: void 0,
                ee: !0
            });
        }
        te(t) {
            return Me(t, this.settings.methodName, this.settings.ye || !1, this.path, this.settings.ne);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.Et.find(n => t.B(n)) || void 0 !== this.fieldTransforms.find(n => t.B(n.field));
        }
        fe() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.we(this.path.get(t));
        }
        we(t) {
            if (0 === t.length) throw this.te("Document fields must not be empty");
            if (be(this.Xn) && Pe.test(t)) throw this.te('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Ne {
        constructor(t, n, e) {
            this.i = t, this.ignoreUndefinedProperties = n, this.serializer = e || Bn(t);
        }
        /** Creates a new top-level parse context. */    Ee(t, n, e, r = !1) {
            return new ve({
                Xn: t,
                methodName: n,
                ne: e,
                path: Y.H(),
                ee: !1,
                ye: r
            }, this.i, this.serializer, this.ignoreUndefinedProperties);
        }
    }

    /** Parse document data from a set() call. */ function $e(t, n, e, r, s, i = {}) {
        const o = t.Ee(i.merge || i.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , n, e, s);
        Ce("Data must be an object, but it was:", o, r);
        const u = Se(r, o);
        let a, c;
        if (i.merge) a = new pn(o.Et), c = o.fieldTransforms; else if (i.mergeFields) {
            const t = [];
            for (const r of i.mergeFields) {
                let s;
                if (r instanceof ie) s = r.Kn; else {
                    if ("string" != typeof r) throw $();
                    s = Ue(n, r, e);
                }
                if (!o.contains(s)) throw new R(h, `Field '${s}' is specified in your field mask but missing from your input data.`);
                je(t, s) || t.push(s);
            }
            a = new pn(t), c = o.fieldTransforms.filter(t => a.Rt(t.field));
        } else a = null, c = o.fieldTransforms;
        return new Ve(new gn(u), a, c);
    }

    /** Parse update data from an update() call. */ function Fe(t, n, e, r) {
        const s = t.Ee(1 /* Update */ , n, e);
        Ce("Data must be an object, but it was:", s, r);
        const i = [], o = new bn;
        K(r, (t, r) => {
            const u = Ue(n, t, e), a = s.me(u);
            if (r instanceof _e || r instanceof Te && r.ae instanceof _e) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(u); else {
                const t = xe(r, a);
                null != t && (i.push(u), o.set(u, t));
            }
        });
        const u = new pn(i);
        return new ge(o.Nt(), u, s.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function De(t, n, e, r, s, i) {
        const o = t.Ee(1 /* Update */ , n, e), u = [ Le(n, r, e) ], a = [ s ];
        if (i.length % 2 != 0) throw new R(h, `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < i.length; t += 2) u.push(Le(n, i[t])), a.push(i[t + 1]);
        const c = [], l = new bn;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = u.length - 1; t >= 0; --t) if (!je(c, u[t])) {
            const n = u[t], e = a[t], r = o.me(n);
            if (e instanceof _e || e instanceof Te && e.ae instanceof _e) 
            // Add it to the field mask, but don't add anything to updateData.
            c.push(n); else {
                const t = xe(e, r);
                null != t && (c.push(n), l.set(n, t));
            }
        }
        const f = new pn(c);
        return new ge(l.Nt(), f, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function qe(t, n, e, r = !1) {
        return xe(e, t.Ee(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , n));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input Data to be parsed.
     * @param context A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @return The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function xe(t, n) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof Te && (t = t.ae), Oe(t)) return Ce("Unsupported field value:", n, t), 
        Se(t, n);
        if (t instanceof ae) 
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, n) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!be(n.Xn)) throw n.te(t.Jn + "() can only be used with update() and set()");
            if (!n.path) throw n.te(t.Jn + "() is not currently supported inside arrays");
            const e = t.Zn(n);
            e && n.fieldTransforms.push(e);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @return The parsed value
     */ (t, n), null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        n.path && n.Et.push(n.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (n.settings.ee && 4 /* ArrayArgument */ !== n.Xn) throw n.te("Nested arrays are not supported");
            return function(t, n) {
                const e = [];
                let r = 0;
                for (const s of t) {
                    let t = xe(s, n.pe(r));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), e.push(t), r++;
                }
                return {
                    arrayValue: {
                        values: e
                    }
                };
            }(t, n);
        }
        return function(t, n) {
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return Gt(n.serializer, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const e = B.fromDate(t);
                return {
                    timestampValue: Wt(n.serializer, e)
                };
            }
            if (t instanceof B) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const e = new B(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: Wt(n.serializer, e)
                };
            }
            if (t instanceof Ie) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof Ae) return {
                bytesValue: Yt(n.serializer, t.ue)
            };
            if (t instanceof Re) {
                const e = n.i, r = t.Mn;
                if (!r.isEqual(e)) throw n.te(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${e.projectId}/${e.database}`);
                return {
                    referenceValue: Kt(t.Mn || n.i, t.ce.path)
                };
            }
            if (void 0 === t && n.ignoreUndefinedProperties) return null;
            throw n.te("Unsupported field value: " + ne(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, n);
    }

    function Se(t, n) {
        const e = {};
        return !function(t) {
            for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n)) return !1;
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
        /** Converts a Base64 encoded string to a binary string. */ (t) ? K(t, (t, r) => {
            const s = xe(r, n._e(t));
            null != s && (e[t] = s);
        }) : 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        n.path && n.path.length > 0 && n.Et.push(n.path), {
            mapValue: {
                fields: e
            }
        };
    }

    function Oe(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof B || t instanceof Ie || t instanceof Ae || t instanceof Re || t instanceof ae);
    }

    function Ce(t, n, e) {
        if (!Oe(e) || !te(e)) {
            const r = ne(e);
            throw "an object" === r ? n.te(t + " a custom object") : n.te(t + " " + r);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Le(t, n, e) {
        if (n instanceof ie) return n.Kn;
        if ("string" == typeof n) return Ue(t, n);
        throw Me("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
    }

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName The publicly visible method name
     * @param path The dot-separated string form of a field path which will be split
     * on dots.
     * @param targetDoc The document against which the field path will be evaluated.
     */ function Ue(t, n, e) {
        try {
            return function(t) {
                if (t.search(ue) >= 0) throw new R(h, `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`);
                try {
                    return new oe(...t.split("."));
                } catch (n) {
                    throw new R(h, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                }
            }(n).Kn;
        } catch (n) {
            throw Me((r = n) instanceof Error ? r.message : r.toString(), t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, e);
        }
        /**
     * Extracts the message from a caught exception, which should be an Error object
     * though JS doesn't guarantee that.
     */
        var r;
        /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

    function Me(t, n, e, r, s) {
        const i = r && !r.j(), o = void 0 !== s;
        let u = `Function ${n}() called with invalid data`;
        e && (u += " (via `toFirestore()`)"), u += ". ";
        let a = "";
        return (i || o) && (a += " (found", i && (a += " in field " + r), o && (a += " in document " + s), 
        a += ")"), new R(h, u + t + a);
    }

    function je(t, n) {
        return t.some(t => t.isEqual(n));
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
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
     */ class Be {
        constructor(t, n, e, r, s) {
            this.i = t, this.timestampsInSnapshots = n, this.Ie = e, this.Ae = r, this.Te = s;
        }
        Pe(t) {
            switch (rt(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return ct(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.Re(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.Ve(t);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.Te(ht(t.bytesValue));

              case 7 /* RefValue */ :
                return this.ge(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.be(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.ve(t.arrayValue);

              case 10 /* ObjectValue */ :
                return this.Ne(t.mapValue);

              default:
                throw $();
            }
        }
        Ne(t) {
            const n = {};
            return K(t.fields || {}, (t, e) => {
                n[t] = this.Pe(e);
            }), n;
        }
        be(t) {
            return new Ie(ct(t.latitude), ct(t.longitude));
        }
        ve(t) {
            return (t.values || []).map(t => this.Pe(t));
        }
        Ve(t) {
            switch (this.Ie) {
              case "previous":
                const n = function t(n) {
                    const e = n.mapValue.fields.__previous_value__;
                    return tt(e) ? t(e) : e;
                }(t);
                return null == n ? null : this.Pe(n);

              case "estimate":
                return this.Re(nt(t));

              default:
                return null;
            }
        }
        Re(t) {
            const n = at(t), e = new B(n.seconds, n.nanos);
            return this.timestampsInSnapshots ? e : e.toDate();
        }
        ge(t) {
            const n = G.Y(t);
            F(ln(n));
            const e = new L(n.get(1), n.get(3)), r = new z(n.C(5));
            return e.isEqual(this.i) || 
            // TODO(b/64130202): Somehow support foreign references.
            v(`Document ${r} contains a document reference within a different database (${e.projectId}/${e.database}) which is not supported. It will be treated as a reference in the current database (${this.i.projectId}/${this.i.database}) instead.`), 
            this.Ae(r);
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
     */ class ke {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        constructor(t, n, e, r) {
            this.$e = t, this.ce = n, this.Fe = e, this.he = r;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this.ce.path.M();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new sr(this.$e, this.he, this.ce.path);
        }
        /**
         * Signals whether or not the document at the snapshot's location exists.
         *
         * @return true if the document exists.
         */    exists() {
            return null !== this.Fe;
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * @return An `Object` containing all fields in the document or `undefined`
         * if the document doesn't exist.
         */    data() {
            if (this.Fe) {
                if (this.he) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new Qe(this.$e, this.ce, this.Fe, 
                    /* converter= */ null);
                    return this.he.fromFirestore(t);
                }
                return new Be(this.$e.Mn, 
                /* timestampsInSnapshots= */ !0, 
                /* serverTimestampBehavior=*/ "none", t => new sr(this.$e, 
                /* converter= */ null, t.path), t => new Ae(t)).Pe(this.Fe.qt());
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * @param fieldPath The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @return The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t) {
            if (this.Fe) {
                const n = this.Fe.data().field(Ye("DocumentSnapshot.get", t));
                if (null !== n) {
                    return new Be(this.$e.Mn, 
                    /* timestampsInSnapshots= */ !0, 
                    /* serverTimestampBehavior=*/ "none", t => new sr(this.$e, this.he, t.path), t => new Ae(t)).Pe(n);
                }
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
     */ class Qe extends ke {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * @override
         * @return An `Object` containing all fields in the document.
         */
        data() {
            return super.data();
        }
    }

    /**
     * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
     * representing the results of a query. The documents can be accessed as an
     * array via the `docs` property or enumerated using the `forEach` method. The
     * number of documents can be determined via the `empty` and `size`
     * properties.
     */ class Ge {
        constructor(t, n) {
            this.De = n, this.query = t;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            return [ ...this.De ];
        }
        /** The number of documents in the `QuerySnapshot`. */    get size() {
            return this.docs.length;
        }
        /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
            return 0 === this.docs.length;
        }
        /**
         * Enumerates all of the documents in the `QuerySnapshot`.
         *
         * @param callback A callback to be called with a `QueryDocumentSnapshot` for
         * each document in the snapshot.
         * @param thisArg The `this` binding for the callback.
         */    forEach(t, n) {
            this.De.forEach(t, n);
        }
    }

    /**
     * Returns true if the provided snapshots are equal.
     *
     * @param left A snapshot to compare.
     * @param right A snapshot to compare.
     * @return true if the snapshots are equal.
     */ function We(t, n) {
        return t instanceof ke && n instanceof ke ? t.$e === n.$e && t.ce.isEqual(n.ce) && (null === t.Fe ? null === n.Fe : t.Fe.isEqual(n.Fe)) && t.he === n.he : t instanceof Ge && n instanceof Ge && (qr(t.query, n.query) && O(t.docs, n.docs, We));
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Ye(t, n) {
        return "string" == typeof n ? Ue(t, n) : n.Kn;
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
     */ class ze {
        constructor(t) {
            this.qe = t, 
            // The version of each document that was read during this transaction.
            this.xe = new Map, this.mutations = [], this.Se = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.Oe = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.Ce = new Set;
        }
        async Le(t) {
            if (this.Ue(), this.mutations.length > 0) throw new R(h, "Firestore transactions require all reads to be executed before all writes.");
            const n = await Ln(this.qe, t);
            return n.forEach(t => {
                t instanceof $n || t instanceof Nn ? this.Me(t) : $();
            }), n;
        }
        set(t, n) {
            this.write(n.le(t, this.Tt(t))), this.Ce.add(t.toString());
        }
        update(t, n) {
            try {
                this.write(n.le(t, this.je(t)));
            } catch (t) {
                this.Oe = t;
            }
            this.Ce.add(t.toString());
        }
        delete(t) {
            this.write([ new Rn(t, this.Tt(t)) ]), this.Ce.add(t.toString());
        }
        async commit() {
            if (this.Ue(), this.Oe) throw this.Oe;
            const t = this.xe;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach(n => {
                t.delete(n.key.toString());
            }), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach((t, n) => {
                const e = z.tt(n);
                this.mutations.push(new Vn(e, this.Tt(e)));
            }), await Cn(this.qe, this.mutations), this.Se = !0;
        }
        Me(t) {
            let n;
            if (t instanceof Nn) n = t.version; else {
                if (!(t instanceof $n)) throw $();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                n = k.min();
            }
            const e = this.xe.get(t.key.toString());
            if (e) {
                if (!n.isEqual(e)) 
                // This transaction will fail no matter what.
                throw new R(y, "Document version changed between two reads.");
            } else this.xe.set(t.key.toString(), n);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    Tt(t) {
            const n = this.xe.get(t.toString());
            return !this.Ce.has(t.toString()) && n ? En.updateTime(n) : En.Vt();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    je(t) {
            const n = this.xe.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.Ce.has(t.toString()) && n) {
                if (n.isEqual(k.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new R(h, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return En.updateTime(n);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return En.exists(!0);
        }
        write(t) {
            this.Ue(), this.mutations = this.mutations.concat(t);
        }
        Ue() {}
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
    class He {
        constructor(t, n, e, r) {
            this.zt = t, this.qe = n, this.updateFunction = e, this.Jt = r, this.Be = 5, this.hn = new Dn(this.zt, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.ke();
        }
        ke() {
            this.hn.kt(async () => {
                const t = new ze(this.qe), n = this.Qe(t);
                n && n.then(n => {
                    this.zt.nn(() => t.commit().then(() => {
                        this.Jt.resolve(n);
                    }).catch(t => {
                        this.Ge(t);
                    }));
                }).catch(t => {
                    this.Ge(t);
                });
            });
        }
        Qe(t) {
            try {
                const n = this.updateFunction(t);
                return !Z(n) && n.catch && n.then ? n : (this.Jt.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.Jt.reject(t), null;
            }
        }
        Ge(t) {
            this.Be > 0 && this.We(t) ? (this.Be -= 1, this.zt.nn(() => (this.ke(), Promise.resolve()))) : this.Jt.reject(t);
        }
        We(t) {
            if ("FirebaseError" === t.name) {
                // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
                // non-matching document versions with ABORTED. These errors should be retried.
                const n = t.code;
                return "aborted" === n || "failed-precondition" === n || !
                /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
                function(t) {
                    switch (t) {
                      case u:
                        return $();

                      case a:
                      case c:
                      case l:
                      case m:
                      case A:
                      case T:
     // Unauthenticated means something went wrong with our token and we need
                        // to retry with new credentials which will happen automatically.
                                          case w:
                        return !1;

                      case h:
                      case f:
                      case d:
                      case _:
                      case p:
     // Aborted might be retried in some scenarios, but that is dependant on
                        // the context and should handled individually by the calling code.
                        // See https://cloud.google.com/apis/design/errors.
                                          case y:
                      case E:
                      case I:
                      case P:
                        return !0;

                      default:
                        return $();
                    }
                }(n);
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
     */ function Ke(t, n, e, r, s, i, o) {
        let u;
        if (s.J()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new R(h, `Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);
            if ("in" /* IN */ === i || "not-in" /* NOT_IN */ === i) {
                Xe(o, i);
                const n = [];
                for (const e of o) n.push(Ze(r, t, e));
                u = {
                    arrayValue: {
                        values: n
                    }
                };
            } else u = Ze(r, t, o);
        } else "in" /* IN */ !== i && "not-in" /* NOT_IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || Xe(o, i), 
        u = qe(e, n, o, 
        /* allowArrays= */ "in" /* IN */ === i || "not-in" /* NOT_IN */ === i);
        const a = gt.create(s, i, u);
        return function(t, n) {
            if (n.dt()) {
                const e = At(t);
                if (null !== e && !e.isEqual(n.field)) throw new R(h, `Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '${e.toString()}' and '${n.field.toString()}'`);
                const r = It(t);
                null !== r && tr(t, n.field, r);
            }
            const e = function(t, n) {
                for (const e of t.filters) if (n.indexOf(e.op) >= 0) return e.op;
                return null;
            }
            /**
     * Creates a new Query for a collection group query that matches all documents
     * within the provided collection group.
     */ (t, 
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
            }(n.op));
            if (null !== e) 
            // Special case when it's a duplicate op to give a slightly clearer error message.
            throw e === n.op ? new R(h, `Invalid query. You cannot use more than one '${n.op.toString()}' filter.`) : new R(h, `Invalid query. You cannot use '${n.op.toString()}' filters with '${e.toString()}' filters.`);
        }(t, a), a;
    }

    function Je(t, n, e) {
        if (null !== t.startAt) throw new R(h, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
        if (null !== t.endAt) throw new R(h, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
        const r = new Ct(n, e);
        return function(t, n) {
            if (null === It(t)) {
                // This is the first order by. It must match any inequality.
                const e = At(t);
                null !== e && tr(t, e, n.field);
            }
        }(t, r), r;
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
     */
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */
    function Ze(t, n, e) {
        if ("string" == typeof e) {
            if ("" === e) throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!Tt(n) && -1 !== e.indexOf("/")) throw new R(h, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
            const r = n.path.child(G.Y(e));
            if (!z.rt(r)) throw new R(h, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
            return lt(t, new z(r));
        }
        if (e instanceof Re) return lt(t, e.ce);
        throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + ne(e) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function Xe(t, n) {
        if (!Array.isArray(t) || 0 === t.length) throw new R(h, `Invalid Query. A non-empty array is required for '${n.toString()}' filters.`);
        if (t.length > 10) throw new R(h, `Invalid Query. '${n.toString()}' filters support a maximum of 10 elements in the value array.`);
        if ("in" /* IN */ === n || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n) {
            if (t.indexOf(null) >= 0) throw new R(h, `Invalid Query. '${n.toString()}' filters cannot contain 'null' in the value array.`);
            if (t.filter(t => Number.isNaN(t)).length > 0) throw new R(h, `Invalid Query. '${n.toString()}' filters cannot contain 'NaN' in the value array.`);
        }
    }

    function tr(t, n, e) {
        if (!e.isEqual(n)) throw new R(h, `Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '${n.toString()}' and so you must also use '${n.toString()}' as your first orderBy(), but your first orderBy() is on field '${e.toString()}' instead.`);
    }

    /**
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */
    function nr(t, n, e) {
        let r;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return r = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, 
        r;
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
     */ class er extends ie {
        // Note: This class is stripped down a copy of the FieldPath class in the
        // legacy SDK. The changes are:
        // - The `documentId()` static method has been removed
        // - Input validation is limited to errors that cannot be caught by the
        //   TypeScript transpiler.
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames A list of field names.
         */
        constructor(...t) {
            super(t);
        }
        /**
         * Returns true if this `FieldPath` is equal to the provided one.
         *
         * @param other The `FieldPath` to compare against.
         * @return true if this `FieldPath` is equal to the provided one.
         */    isEqual(t) {
            return this.Kn.isEqual(t.Kn);
        }
    }

    /**
     * Returns a special sentinel `FieldPath` to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */ function rr() {
        return new er("__name__");
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
     */ class sr extends Re {
        constructor(t, n, e) {
            super(t.Mn, new z(e), n), this.Ye = e, 
            /** The type of this Firestore reference. */
            this.type = "document", this.firestore = t;
        }
        /**
         * The document's identifier within its collection.
         */    get id() {
            return this.Ye.M();
        }
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */    get path() {
            return this.Ye.W();
        }
        /**
         * The collection this `DocumentReference` belongs to.
         */    get parent() {
            return new Tr(this.firestore, this.he, this.ce.path.L());
        }
        /**
         * Applies a custom data converter to this `DocumentReference`, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * setDoc()}, {@link getDoc()}, etc. with the returned `DocumentReference`
         * instance, the provided converter will convert between Firestore data and
         * your custom type `U`.
         *
         * @param converter Converts objects to and from Firestore.
         * @return A `DocumentReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new sr(this.firestore, t, this.Ye);
        }
    }

    /**
     * A `Query` refers to a Query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class ir {
        // This is the lite version of the Query class in the main SDK.
        constructor(t, n, e) {
            this.he = n, this.ze = e, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        /**
         * Applies a custom data converter to this query, allowing you to use your own
         * custom model objects with Firestore. When you call {@link getDocs()} with
         * the returned query, the provided converter will convert between Firestore
         * data and your custom type `U`.
         *
         * @param converter Converts objects to and from Firestore.
         * @return A `Query<U>` that uses the provided converter.
         */    withConverter(t) {
            return new ir(this.firestore, t, this.ze);
        }
    }

    /**
     * A `QueryConstraint` is used to narrow the set of documents returned by a
     * Firestore query. `QueryConstraint`s are created by invoking {@link where()},
     * {@link orderBy()}, {@link startAt()}, {@link startAfter()}, {@link
     * endBefore()}, {@link endAt()}, {@link limit()} or {@link limitToLast()} and
     * can then be passed to {@link query()} to create a new query instance that
     * also contains this `QueryConstraint`.
     */ class or {}

    /**
     * Creates a new immutable instance of `query` that is extended to also include
     * additional query constraints.
     *
     * @param query The query instance to use as a base for the new constraints.
     * @param queryConstraints The list of `QueryConstraint`s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function ur(t, ...n) {
        for (const e of n) t = e.He(t);
        return t;
    }

    class ar extends or {
        constructor(t, n, e) {
            super(), this.Ke = t, this.Je = n, this.Ze = e, this.type = "where";
        }
        He(t) {
            const n = xr(t.firestore), e = Ke(t.ze, "where", n, t.firestore.Mn, this.Ke, this.Je, this.Ze);
            return new ir(t.firestore, t.he, function(t, n) {
                const e = t.filters.concat([ n ]);
                return new yt(t.path, t.collectionGroup, t.ct.slice(), e, t.limit, t.ht, t.startAt, t.endAt);
            }(t.ze, e));
        }
    }

    /**
     * Creates a `QueryConstraint` that enforces that documents must contain the
     * specified field and that the value should satisfy the relation constraint
     * provided.
     *
     * @param fieldPath The path to compare
     * @param opStr The operation string (e.g "<", "<=", "==", ">", ">=", "!=").
     * @param value The value for comparison
     * @return The created `Query`.
     */ function cr(t, n, e) {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const r = n, s = Ye("where", t);
        return new ar(s, r, e);
    }

    class hr extends or {
        constructor(t, n) {
            super(), this.Ke = t, this.Xe = n, this.type = "orderBy";
        }
        He(t) {
            const n = Je(t.ze, this.Ke, this.Xe);
            return new ir(t.firestore, t.he, function(t, n) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const e = t.ct.concat([ n ]);
                return new yt(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.ht, t.startAt, t.endAt);
            }(t.ze, n));
        }
    }

    /**
     * Creates a `QueryConstraint` that sorts the query result by the
     * specified field, optionally in descending order instead of ascending.
     *
     * @param fieldPath The field to sort by.
     * @param directionStr Optional direction to sort by ('asc' or 'desc'). If
     * not specified, order will be ascending.
     * @return The created `Query`.
     */ function lr(t, n = "asc") {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const e = n, r = Ye("orderBy", t);
        return new hr(r, e);
    }

    class fr extends or {
        constructor(t, n, e) {
            super(), this.type = t, this.tr = n, this.nr = e;
        }
        He(t) {
            return new ir(t.firestore, t.he, function(t, n, e) {
                return new yt(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
            }(t.ze, this.tr, this.nr));
        }
    }

    /**
     * Creates a `QueryConstraint` that only returns the first matching documents.
     *
     * @param limit The maximum number of items to return.
     * @return The created `Query`.
     */ function dr(t) {
        return ee("limit", 1, t), new fr("limit", t, "F" /* First */);
    }

    /**
     * Creates a `QueryConstraint` that only returns the last matching documents.
     *
     * You must specify at least one `orderBy` clause for `limitToLast` queries,
     * otherwise an exception will be thrown during execution.
     *
     * @param limit The maximum number of items to return.
     * @return The created `Query`.
     */ function _r(t) {
        return ee("limitToLast", 1, t), new fr("limitToLast", t, "L" /* Last */);
    }

    class wr extends or {
        constructor(t, n, e) {
            super(), this.type = t, this.er = n, this.rr = e;
        }
        He(t) {
            const n = Ar(t, this.type, this.er, this.rr);
            return new ir(t.firestore, t.he, function(t, n) {
                return new yt(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), t.limit, t.ht, n, t.endAt);
            }(t.ze, n));
        }
    }

    function mr(...t) {
        return new wr("startAt", t, /*before=*/ !0);
    }

    function pr(...t) {
        return new wr("startAfter", t, 
        /*before=*/ !1);
    }

    class yr extends or {
        constructor(t, n, e) {
            super(), this.type = t, this.er = n, this.rr = e;
        }
        He(t) {
            const n = Ar(t, this.type, this.er, this.rr);
            return new ir(t.firestore, t.he, function(t, n) {
                return new yt(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), t.limit, t.ht, t.startAt, n);
            }(t.ze, n));
        }
    }

    function Er(...t) {
        return new yr("endBefore", t, /*before=*/ !0);
    }

    function Ir(...t) {
        return new yr("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function Ar(t, n, e, r) {
        if (e[0] instanceof ke) return Hn(n, e, 1), function(t, n, e, r, s) {
            if (!r) throw new R(f, "Can't use a DocumentSnapshot that doesn't exist for " + e + "().");
            const i = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const e of Pt(t)) if (e.field.J()) i.push(lt(n, r.key)); else {
                const t = r.field(e.field);
                if (tt(t)) throw new R(h, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = e.field.W();
                    throw new R(h, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                i.push(t);
            }
            return new St(i, s);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.ze, t.firestore.Mn, n, e[0].Fe, r);
        {
            const s = xr(t.firestore);
            return function(t, n, e, r, s, i) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.ct;
                if (s.length > o.length) throw new R(h, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const u = [];
                for (let i = 0; i < s.length; i++) {
                    const a = s[i];
                    if (o[i].field.J()) {
                        if ("string" != typeof a) throw new R(h, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof a}`);
                        if (!Tt(t) && -1 !== a.indexOf("/")) throw new R(h, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${a}' contains a slash.`);
                        const e = t.path.child(G.Y(a));
                        if (!z.rt(e)) throw new R(h, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${e}' is not because it contains an odd number of segments.`);
                        const s = new z(e);
                        u.push(lt(n, s));
                    } else {
                        const t = qe(e, r, a);
                        u.push(t);
                    }
                }
                return new St(u, i);
            }(t.ze, t.firestore.Mn, s, n, e, r);
        }
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query()}`).
     */ class Tr extends ir {
        constructor(t, n, e) {
            super(t, n, new yt(e)), this.firestore = t, this.Ye = e, this.type = "collection";
        }
        /** The collection's identifier. */    get id() {
            return this.ze.path.M();
        }
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */    get path() {
            return this.ze.path.W();
        }
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */    get parent() {
            const t = this.Ye.L();
            return t.j() ? null : new sr(this.firestore, 
            /* converter= */ null, t);
        }
        /**
         * Applies a custom data converter to this CollectionReference, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * addDoc()} with the returned `CollectionReference` instance, the provided
         * converter will convert between Firestore data and your custom type `U`.
         *
         * @param converter Converts objects to and from Firestore.
         * @return A `CollectionReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new Tr(this.firestore, t, this.Ye);
        }
    }

    function Pr(t, n, ...e) {
        if (Sr("collection", "path", n), t instanceof Gn) {
            const r = G.Y(n, ...e);
            return Xn(r), new Tr(t, /* converter= */ null, r);
        }
        {
            if (!(t instanceof sr || t instanceof Tr)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const r = G.Y(t.path, ...e).child(G.Y(n));
            return Xn(r), new Tr(t.firestore, 
            /* converter= */ null, r);
        }
    }

    // TODO(firestorelite): Consider using ErrorFactory -
    // https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
    /**
     * Creates and returns a new `Query` instance that includes all documents in the
     * database that are contained in a collection or subcollection with the
     * given `collectionId`.
     *
     * @param firestore A reference to the root Firestore instance.
     * @param collectionId Identifies the collections to query over. Every
     * collection or subcollection with this ID as the last segment of its path
     * will be included. Cannot contain a slash.
     * @return The created `Query`.
     */ function Rr(t, n) {
        if (Sr("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new R(h, `Invalid collection ID '${n}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new ir(t, 
        /* converter= */ null, function(t) {
            return new yt(G.H(), t);
        }(n));
    }

    function Vr(t, n, ...e) {
        if (
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (n = x.t()), Sr("doc", "path", n), t instanceof Gn) {
            const r = G.Y(n, ...e);
            return Zn(r), new sr(t, /* converter= */ null, r);
        }
        {
            if (!(t instanceof sr || t instanceof Tr)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const r = t.Ye.child(G.Y(n, ...e));
            return Zn(r), new sr(t.firestore, t instanceof Tr ? t.he : null, r);
        }
    }

    /**
     * Reads the document referred to by the specified document reference.
     *
     * All documents are directly fetched from the server, even if the document was
     * previously read or modified. Recent modifications are only reflected in the
     * retrieved `DocumentSnapshot` if they have already been applied by the
     * backend. If the client is offline, the read fails. If you like to use
     * caching or see local modifications, please use the full Firestore SDK.
     *
     * @param reference The reference of the document to fetch.
     * @return A Promise resolved with a `DocumentSnapshot` containing the current
     * document contents.
     */ function gr(t) {
        return Ln(Qn(t.firestore), [ t.ce ]).then(n => {
            F(1 === n.length);
            const e = n[0];
            return new ke(t.firestore, t.ce, e instanceof Nn ? e : null, t.he);
        });
    }

    /**
     * Executes the query and returns the results as a {@link QuerySnapshot}.
     *
     * All queries are executed directly by the server, even if the the query was
     * previously executed. Recent modifications are only reflected in the retrieved
     * results if they have already been applied by the backend. If the client is
     * offline, the operation fails. To see previously cached result and local
     * modifications, use the full Firestore SDK.
     *
     * @param query The `Query` to execute.
     * @return A Promise that will be resolved with the results of the query.
     */ function br(t) {
        !function(t) {
            if (Et(t) && 0 === t.ct.length) throw new R(I, "limitToLast() queries require specifying at least one orderBy() clause");
        }(t.ze);
        return Un(Qn(t.firestore), t.ze).then(n => {
            const e = n.map(n => new Qe(t.firestore, n.key, n, t.he));
            return Et(t.ze) && 
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            e.reverse(), new Ge(t, e);
        });
    }

    function vr(t, n, e) {
        const r = nr(t.he, n, e), s = $e(xr(t.firestore), "setDoc", t.ce, r, null !== t.he, e);
        return Cn(Qn(t.firestore), s.le(t.ce, En.Vt()));
    }

    function Nr(t, n, e, ...r) {
        const s = xr(t.firestore);
        let i;
        i = "string" == typeof n || n instanceof er ? De(s, "updateDoc", t.ce, n, e, r) : Fe(s, "updateDoc", t.ce, n);
        return Cn(Qn(t.firestore), i.le(t.ce, En.exists(!0)));
    }

    /**
     * Deletes the document referred to by the specified `DocumentReference`.
     *
     * The deletion will only be reflected in document reads that occur after the
     * returned Promise resolves. If the client is offline, the
     * delete fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference A reference to the document to delete.
     * @return A Promise resolved once the document has been successfully
     * deleted from the backend.
     */ function $r(t) {
        return Cn(Qn(t.firestore), [ new Rn(t.ce, En.Vt()) ]);
    }

    /**
     * Add a new document to specified `CollectionReference` with the given data,
     * assigning it a document ID automatically.
     *
     * The result of this write will only be reflected in document reads that occur
     * after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference A reference to the collection to add this document to.
     * @param data An Object containing the data for the new document.
     * @return A Promise resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend.
     */ function Fr(t, n) {
        const e = Vr(t), r = nr(t.he, n), s = $e(xr(t.firestore), "addDoc", e.ce, r, null !== e.he, {});
        return Cn(Qn(t.firestore), s.le(e.ce, En.exists(!1))).then(() => e);
    }

    /**
     * Returns true if the provided references are equal.
     *
     * @param left A reference to compare.
     * @param right A reference to compare.
     * @return true if the references point to the same location in the same
     * Firestore database.
     */ function Dr(t, n) {
        return (t instanceof sr || t instanceof Tr) && (n instanceof sr || n instanceof Tr) && (t.firestore === n.firestore && t.path === n.path && t.he === n.he);
    }

    /**
     * Returns true if the provided queries point to the same collection and apply
     * the same constraints.
     *
     * @param left A `Query` to compare.
     * @param right A Query` to compare.
     * @return true if the references point to the same location in the same
     * Firestore database.
     */ function qr(t, n) {
        return t instanceof ir && n instanceof ir && (t.firestore === n.firestore && Vt(t.ze, n.ze) && t.he === n.he);
    }

    function xr(t) {
        const n = t.Un(), e = Bn(t.Mn);
        return new Ne(t.Mn, !!n.ignoreUndefinedProperties, e);
    }

    function Sr(t, n, e) {
        if (!e) throw new R(h, `Function ${t}() cannot be called with an empty ${n}.`);
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
     * A `WriteBatch` object can be acquired by calling {@link writeBatch()}. It
     * provides methods for adding writes to the write batch. None of the writes
     * will be committed (or visible locally) until {@link WriteBatch#commit()} is
     * called.
     */ class Or {
        constructor(t, n) {
            this.$e = t, this.sr = n, this.ir = [], this.ur = !1, this.ar = xr(t);
        }
        set(t, n, e) {
            this.cr();
            const r = Cr(t, this.$e), s = nr(r.he, n, e), i = $e(this.ar, "WriteBatch.set", r.ce, s, null !== r.he, e);
            return this.ir = this.ir.concat(i.le(r.ce, En.Vt())), this;
        }
        update(t, n, e, ...r) {
            this.cr();
            const s = Cr(t, this.$e);
            let i;
            return i = "string" == typeof n || n instanceof er ? De(this.ar, "WriteBatch.update", s.ce, n, e, r) : Fe(this.ar, "WriteBatch.update", s.ce, n), 
            this.ir = this.ir.concat(i.le(s.ce, En.exists(!0))), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef A reference to the document to be deleted.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */    delete(t) {
            this.cr();
            const n = Cr(t, this.$e);
            return this.ir = this.ir.concat(new Rn(n.ce, En.Vt())), this;
        }
        /**
         * Commits all of the writes in this write batch as a single atomic unit.
         *
         * The result of these writes will only be reflected in document reads that
         * occur after the returned Promise resolves. If the client is offline, the
         * write fails. If you would like to see local modifications or buffer writes
         * until the client is online, use the full Firestore SDK.
         *
         * @return A Promise resolved once all of the writes in the batch have been
         * successfully written to the backend as an atomic unit (note that it won't
         * resolve while you're offline).
         */    commit() {
            return this.cr(), this.ur = !0, this.ir.length > 0 ? this.sr(this.ir) : Promise.resolve();
        }
        cr() {
            if (this.ur) throw new R(p, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function Cr(t, n) {
        if (t.firestore !== n) throw new R(h, "Provided document reference is from a different Firestore instance.");
        return t;
    }

    /**
     * Creates a write batch, used for performing multiple writes as a single
     * atomic operation. The maximum number of writes allowed in a single WriteBatch
     * is 500.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @return A `WriteBatch` that can be used to atomically execute multiple
     * writes.
     */ function Lr(t) {
        const n = Qn(t);
        return new Or(t, t => Cn(n, t));
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
     * {@link runTransaction()}.
     */ class Ur {
        constructor(t, n) {
            this.$e = t, this.hr = n, this.ar = xr(t);
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef A reference to the document to be read.
         * @return A `DocumentSnapshot` with the read data.
         */    get(t) {
            const n = Cr(t, this.$e);
            return this.hr.Le([ n.ce ]).then(t => {
                if (!t || 1 !== t.length) return $();
                const e = t[0];
                if (e instanceof $n) return new ke(this.$e, n.ce, null, n.he);
                if (e instanceof Nn) return new ke(this.$e, e.key, e, n.he);
                throw $();
            });
        }
        set(t, n, e) {
            const r = Cr(t, this.$e), s = nr(r.he, n, e), i = $e(this.ar, "Transaction.set", r.ce, s, null !== r.he, e);
            return this.hr.set(r.ce, i), this;
        }
        update(t, n, e, ...r) {
            const s = Cr(t, this.$e);
            let i;
            return i = "string" == typeof n || n instanceof er ? De(this.ar, "Transaction.update", s.ce, n, e, r) : Fe(this.ar, "Transaction.update", s.ce, n), 
            this.hr.update(s.ce, i), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef A reference to the document to be deleted.
         * @return This `Transaction` instance. Used for chaining method calls.
         */    delete(t) {
            const n = Cr(t, this.$e);
            return this.hr.delete(n.ce), this;
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
     * @param firestore A reference to the Firestore database to run this
     * transaction against.
     * @param updateFunction The function to execute within the transaction context.
     * @return  If the transaction completed successfully or was explicitly aborted
     * (the `updateFunction` returned a failed promise), the promise returned by the
     * `updateFunction `is returned here. Otherwise, if the transaction failed, a
     * rejected promise with the corresponding failure error is returned.
     */ function Mr(t, n) {
        const e = Qn(t), r = new Fn;
        return new He(new Sn, e, e => n(new Ur(t, e)), r).run(), r.promise;
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
     */ app._registerComponent(new Component("firestore/lite", t => ((t, n) => new Gn(t, n))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal")), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-lite", "0.0.800", "node");

    exports.Bytes = Ae;
    exports.CollectionReference = Tr;
    exports.DocumentReference = sr;
    exports.DocumentSnapshot = ke;
    exports.FieldPath = er;
    exports.FieldValue = ae;
    exports.FirebaseFirestore = Gn;
    exports.FirestoreError = R;
    exports.GeoPoint = Ie;
    exports.Query = ir;
    exports.QueryConstraint = or;
    exports.QueryDocumentSnapshot = Qe;
    exports.QuerySnapshot = Ge;
    exports.Timestamp = B;
    exports.Transaction = Ur;
    exports.WriteBatch = Or;
    exports.addDoc = Fr;
    exports.arrayRemove = fe;
    exports.arrayUnion = le;
    exports.collection = Pr;
    exports.collectionGroup = Rr;
    exports.deleteDoc = $r;
    exports.deleteField = ce;
    exports.doc = Vr;
    exports.documentId = rr;
    exports.endAt = Ir;
    exports.endBefore = Er;
    exports.getDoc = gr;
    exports.getDocs = br;
    exports.getFirestore = Yn;
    exports.increment = de;
    exports.initializeFirestore = Wn;
    exports.limit = dr;
    exports.limitToLast = _r;
    exports.orderBy = lr;
    exports.query = ur;
    exports.queryEqual = qr;
    exports.refEqual = Dr;
    exports.runTransaction = Mr;
    exports.serverTimestamp = he;
    exports.setDoc = vr;
    exports.setLogLevel = g;
    exports.snapshotEqual = We;
    exports.startAfter = pr;
    exports.startAt = mr;
    exports.terminate = zn;
    exports.updateDoc = Nr;
    exports.where = cr;
    exports.writeBatch = Lr;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-firestore-lite.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-firestore-lite.js.map
