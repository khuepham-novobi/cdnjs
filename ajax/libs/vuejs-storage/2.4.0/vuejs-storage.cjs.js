'use strict';

/**
 * Create customize localStorage
 */
var LSStorage = /** @class */ (function () {
    function LSStorage(_a) {
        var _b = _a.storage, storage = _b === void 0 ? window.localStorage : _b, _c = _a.stringify, stringify = _c === void 0 ? JSON.stringify : _c, _d = _a.parse, parse = _d === void 0 ? JSON.parse : _d;
        this.storage = storage;
        this.stringify = stringify;
        this.parse = parse;
    }
    LSStorage.prototype.set = function (key, value) {
        this.storage.setItem(key, this.stringify(value));
    };
    LSStorage.prototype.get = function (key) {
        return this.parse(this.storage.getItem(key));
    };
    LSStorage.prototype.has = function (key) {
        return this.storage.getItem(key) != null;
    };
    return LSStorage;
}());

function parsePath(path) {
    return path
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(function (t) { return t !== ''; });
}
function get(obj, path) {
    return parsePath(path).reduce(function (prev, cur) { return prev && prev[cur]; }, obj);
}
function set(obj, path, value) {
    var paths = parsePath(path);
    var cur = obj;
    for (var i = 0; i < paths.length - 1; i++) {
        var pname = paths[i];
        if (!cur.hasOwnProperty(pname))
            cur[pname] = {};
        cur = cur[pname];
    }
    cur[paths[paths.length - 1]] = value;
}
function copy(dest, source, path) {
    set(dest, path, get(source, path));
}

// a simple object merge function implementation
var isobj = function (x) { return typeof x === 'object' && !Array.isArray(x) && x !== null; };
function merge(obj1) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    for (var _a = 0, objs_1 = objs; _a < objs_1.length; _a++) {
        var obj2 = objs_1[_a];
        for (var k in obj2) {
            if (!obj2.hasOwnProperty(k))
                continue;
            if (isobj(obj2[k]))
                merge(obj1[k], obj2[k]);
            else
                obj1[k] = obj2[k];
        }
    }
    return obj1;
}

function applyPersistence(vm, option) {
    var keys = option.keys, _a = option.merge, merge$$1 = _a === void 0 ? merge : _a, ns = option.namespace;
    var ls = new LSStorage(option);
    var optdata = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        copy(optdata, vm, k);
    }
    var data = null;
    if (ls.has(ns)) {
        data = ls.get(ns);
    }
    else {
        var tmp = {};
        for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
            var k = keys_2[_b];
            copy(tmp, optdata, k);
        }
        data = tmp;
    }
    ls.set(ns, data);
    data = merge$$1(optdata, data);
    var _loop_1 = function (k) {
        copy(vm, data, k);
        vm.$watch(k, {
            handler: function (value) {
                set(data, k, value);
                ls.set(ns, data);
            },
            deep: true
        });
    };
    for (var _c = 0, keys_3 = keys; _c < keys_3.length; _c++) {
        var k = keys_3[_c];
        _loop_1(k);
    }
}
function install(Vue) {
    Vue.mixin({
        created: function () {
            var _this = this;
            if ('storage' in this.$options) {
                var option = this.$options.storage;
                if (Array.isArray(option)) {
                    option.forEach(function (opt) { return applyPersistence(_this, opt); });
                    return;
                }
                applyPersistence(this, option);
            }
        }
    });
}

/**
 * Create Vuex plugin
 */
function createVuexPlugin(option) {
    var ls = new LSStorage(option);
    var keys = option.keys, _a = option.merge, merge$$1 = _a === void 0 ? merge : _a, ns = option.namespace;
    return function (store) {
        var data = null;
        if (ls.has(ns)) {
            data = ls.get(ns);
        }
        else {
            var obj = {};
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var k = keys_1[_i];
                copy(obj, store.state, k);
            }
            data = obj;
        }
        store.replaceState(merge$$1(store.state, data)); //merge state
        ls.set(ns, data);
        store.subscribe(function (mutation, state) {
            var obj = {};
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var k = keys_2[_i];
                copy(obj, state, k);
            }
            data = obj;
            ls.set(ns, obj);
        });
    };
}

var vuejsStorage = function (option) {
    return createVuexPlugin(option);
};
vuejsStorage.install = install;

module.exports = vuejsStorage;
