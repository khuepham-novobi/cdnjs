"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var globals_1 = require("./globals");
var kernel_registry = require("./kernels/kernel_registry");
var ops = require("./ops/ops");
var profiler_1 = require("./profiler");
var tape_util = require("./tape_util");
var tensor_1 = require("./tensor");
var util = require("./util");
var Engine = (function () {
    function Engine(backend, customBackend, safeMode) {
        this.backend = backend;
        this.customBackend = customBackend;
        this.safeMode = safeMode;
        this.registeredVariables = {};
        this.refCounter = new WeakMap();
        this.nextTapeNodeId = 0;
        this.numBytes = 0;
        this.numTensors = 0;
        this.numDataBuffers = 0;
        this.gradientScopeCount = 0;
        this.customGradientDepth = 0;
        this.activeScope = { keep: [], track: [] };
        this.scopeStack = [this.activeScope];
        this.profiler = new profiler_1.Profiler(backend);
    }
    Engine.prototype.executeKernel = function (kernelName, config, grad) {
        var _this = this;
        var result;
        if (!environment_1.ENV.get('DEBUG')) {
            result = kernel_registry.executeKernel(this.backend, kernelName, config);
        }
        else {
            result = this.profiler.profileKernel(kernelName, function () {
                return kernel_registry.executeKernel(_this.backend, kernelName, config);
            });
        }
        var recordKernel = this.activeTape != null && this.customGradientDepth === 0;
        if (recordKernel) {
            config = tape_util.stripUndefinedInputsFromInputConfig(config);
            var evaluatedNode = {
                id: this.nextTapeNodeId++,
                type: 'kernel',
                name: "kernel: " + kernelName,
                kernel: kernelName,
                inputAndArgs: config,
                output: result,
                gradient: grad
            };
            this.activeTape.push(evaluatedNode);
        }
        return result;
    };
    Engine.prototype.registerTensor = function (a) {
        var refCount = this.refCounter.has(a.dataId) ? this.refCounter.get(a.dataId) : 0;
        this.numTensors++;
        if (refCount === 0) {
            this.numDataBuffers++;
            this.numBytes +=
                util.sizeFromShape(a.shape) * util.bytesPerElement(a.dtype);
            this.backend.register(a.dataId, a.shape, a.dtype);
        }
        this.refCounter.set(a.dataId, refCount + 1);
        if (!(a instanceof tensor_1.Variable)) {
            this.track(a);
        }
    };
    Engine.prototype.registerVariable = function (v) {
        if (this.registeredVariables[v.name] != null) {
            throw new Error("Variable with name " + v.name + " was already registered");
        }
        this.registeredVariables[v.name] = v;
    };
    Engine.prototype.disposeTensor = function (a) {
        if (!this.refCounter.has(a.dataId)) {
            return;
        }
        this.numTensors--;
        var refCount = this.refCounter.get(a.dataId);
        if (refCount <= 1) {
            this.refCounter.delete(a.dataId);
            this.backend.disposeData(a.dataId);
            this.numDataBuffers--;
            this.numBytes -=
                util.sizeFromShape(a.shape) * util.bytesPerElement(a.dtype);
        }
        else {
            this.refCounter.set(a.dataId, refCount - 1);
        }
    };
    Engine.prototype.memory = function () {
        var info = this.backend.memory();
        info.numTensors = this.numTensors;
        info.numDataBuffers = this.numDataBuffers;
        info.numBytes = this.numBytes;
        return info;
    };
    Engine.prototype.shouldRecord = function () {
        return this.activeTape != null && this.customGradientDepth === 0;
    };
    Engine.prototype.addTapeNode = function (inputs, result, gradientsFunc) {
        var inputsMap = {};
        inputs.forEach(function (input, idx) {
            inputsMap[idx] = input;
        });
        var gradient = function (dy) {
            var res = gradientsFunc(dy);
            var resMap = {};
            res.forEach(function (r, idx) {
                resMap[idx] = function () { return r; };
            });
            return resMap;
        };
        var evaluatedNode = {
            id: this.nextTapeNodeId++,
            type: 'customGradient',
            name: name,
            inputAndArgs: { inputs: inputsMap },
            output: result,
            gradient: gradient
        };
        this.activeTape.push(evaluatedNode);
    };
    Engine.prototype.keep = function (result) {
        if (this.scopeStack.length === 1 && environment_1.ENV.engine.safeMode) {
            throw new Error('Safe mode is ON. Enclose all tensor operations inside dl.tidy(): ' +
                'dl.tidy(() => {...}) to avoid memory leaks.');
        }
        this.activeScope.keep.push(result);
        return result;
    };
    Engine.prototype.startScope = function (gradientsMode) {
        if (gradientsMode === void 0) { gradientsMode = false; }
        if (gradientsMode && this.gradientScopeCount === 0) {
            this.activeTape = [];
        }
        if (gradientsMode) {
            this.gradientScopeCount++;
        }
        var newScopeArrays = { keep: [], track: [] };
        this.scopeStack.push(newScopeArrays);
        this.activeScope = newScopeArrays;
    };
    Engine.prototype.endScope = function (result, gradientsMode) {
        var _this = this;
        if (gradientsMode === void 0) { gradientsMode = false; }
        if (gradientsMode) {
            this.gradientScopeCount--;
            if (this.gradientScopeCount === 0) {
                this.activeTape = null;
            }
        }
        var tensorsToKeep = this.activeScope.keep;
        var tensorsToTrackInParent = tape_util.extractTensorsFromScopeResult(result);
        tensorsToKeep = tensorsToKeep.concat(tensorsToTrackInParent);
        for (var i = 0; i < this.activeScope.track.length; i++) {
            var tensor = this.activeScope.track[i];
            if (util.isTensorInList(tensor, tensorsToKeep)) {
                continue;
            }
            if (this.activeTape != null) {
                tensorsToTrackInParent.push(tensor);
            }
            else {
                tensor.dispose();
            }
        }
        this.scopeStack.pop();
        this.activeScope = this.scopeStack.length === 0 ?
            { keep: [], track: [] } :
            this.scopeStack[this.scopeStack.length - 1];
        tensorsToTrackInParent.forEach(function (tensor) {
            if (!util.isTensorInList(tensor, _this.activeScope.keep)) {
                _this.track(tensor);
            }
        });
    };
    Engine.prototype.dispose = function () {
        if (this.customBackend) {
            this.backend.dispose();
        }
    };
    Engine.prototype.gradients = function (f, xs, dy, allowNoGradients) {
        var _this = this;
        if (allowNoGradients === void 0) { allowNoGradients = false; }
        return globals_1.tidy('gradients', function () {
            var y = f();
            util.assert(y instanceof tensor_1.Tensor, 'The result y returned by f() must be a tensor.');
            var filteredTape = tape_util.getFilteredNodesXToY(_this.activeTape, xs, y);
            if (!allowNoGradients && filteredTape.length === 0 && xs.length > 0) {
                throw new Error('Cannot compute gradient of y=f(x) with respect to x. Make sure ' +
                    'that the f you passed encloses all operations that lead from x ' +
                    'to y.');
            }
            var accumulatedGradientMap = {};
            accumulatedGradientMap[y.id] = (dy == null) ? ops.onesLike(y) : dy;
            tape_util.backpropagateGradients(accumulatedGradientMap, filteredTape);
            var grads = xs.map(function (x) { return accumulatedGradientMap[x.id]; });
            return { value: y, grads: grads };
        }, true);
    };
    Engine.prototype.customGrad = function (f) {
        var _this = this;
        util.assert(util.isFunction(f), 'The f passed in customGrad(f) must be a function.');
        return function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            util.assert(inputs.every(function (t) { return t instanceof tensor_1.Tensor; }), 'The args passed in customGrad(f)(x1, x2,...) must all be tensors');
            _this.customGradientDepth++;
            var gradientsFunc;
            var gradientsMode = true;
            var result = globals_1.tidy(f.name, function () {
                var _a = f.apply(void 0, inputs), value = _a.value, gradFunc = _a.gradFunc;
                util.assert(value instanceof tensor_1.Tensor, 'The function f passed in customGrad(f) must return an object ' +
                    'where `obj.value` is a tensor');
                util.assert(util.isFunction(gradFunc), 'The function f passed in customGrad(f) must return an object ' +
                    'where `obj.gradFunc` is a function.');
                gradientsFunc = gradFunc;
                return value;
            }, gradientsMode);
            _this.customGradientDepth--;
            if (_this.shouldRecord()) {
                var gradFunc = function (dy) {
                    var res = gradientsFunc(dy);
                    var grads = Array.isArray(res) ? res : [res];
                    util.assert(grads.length === inputs.length, 'The function f passed in customGrad(f) must return an object ' +
                        'where `obj.gradFunc` is a function that returns the same ' +
                        'number of tensors as inputs passed to f(...).');
                    util.assert(grads.every(function (t) { return t instanceof tensor_1.Tensor; }), 'The function f passed in customGrad(f) must return an object ' +
                        'where `obj.gradFunc` is a function that returns a list of ' +
                        'only tensors.');
                    return grads;
                };
                _this.addTapeNode(inputs, result, gradFunc);
            }
            return result;
        };
    };
    Engine.prototype.write = function (dataId, values) {
        this.backend.write(dataId, values);
    };
    Engine.prototype.readSync = function (dataId) {
        return this.backend.readSync(dataId);
    };
    Engine.prototype.read = function (dataId) {
        return this.backend.read(dataId);
    };
    Engine.prototype.fromPixels = function (pixels, numChannels) {
        return this.backend.fromPixels(pixels, numChannels);
    };
    Engine.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start, timingInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = performance.now();
                        return [4, this.backend.time(query)];
                    case 1:
                        timingInfo = _a.sent();
                        timingInfo.wallMs = performance.now() - start;
                        return [2, timingInfo];
                }
            });
        });
    };
    Engine.prototype.track = function (result) {
        if (this.scopeStack.length === 1 && this.safeMode) {
            throw new Error('Safe mode is ON. Enclose all tensor operations inside dl.tidy(): ' +
                'dl.tidy(() => {op();...}); to avoid memory leaks.');
        }
        this.activeScope.track.push(result);
        return result;
    };
    return Engine;
}());
exports.Engine = Engine;
