"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var environment_1 = require("../environment");
var util = require("../util");
var rand_1 = require("./rand");
var DType;
(function (DType) {
    DType["float32"] = "float32";
    DType["int32"] = "int32";
    DType["bool"] = "bool";
})(DType = exports.DType || (exports.DType = {}));
var NDArray = (function () {
    function NDArray(shape, dtype, values, dataId, math) {
        this.isDisposed = false;
        this.math = math || environment_1.ENV.math;
        this.size = util.sizeFromShape(shape);
        if (values != null) {
            util.assert(this.size === values.length, "Constructing ndarray of shape (" + this.size + ") should match the " +
                ("length of values (" + values.length + ")"));
        }
        this.shape = shape;
        this.dtype = dtype || 'float32';
        var dim = this.shape.length;
        if (dim < 2) {
            this.strides = [];
        }
        else {
            this.strides = new Array(dim - 1);
            this.strides[dim - 2] = this.shape[dim - 1];
            for (var i = dim - 3; i >= 0; --i) {
                this.strides[i] = this.strides[i + 1] * this.shape[i + 1];
            }
        }
        this.dataId = dataId != null ? dataId : NDArray.nextDataId++;
        this.id = NDArray.nextId++;
        this.rankType = (this.rank < 5 ? this.rank.toString() : 'higher');
        this.math.register(this);
        if (values != null) {
            this.math.write(this.dataId, values);
        }
    }
    NDArray.ones = function (shape, dtype) {
        var values = makeOnesTypedArray(util.sizeFromShape(shape), dtype);
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.zeros = function (shape, dtype) {
        var values = makeZerosTypedArray(util.sizeFromShape(shape), dtype);
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.onesLike = function (another) {
        return NDArray.ones(another.shape, another.dtype);
    };
    NDArray.zerosLike = function (another) {
        return NDArray.zeros(another.shape, another.dtype);
    };
    NDArray.like = function (another) {
        var newValues = copyTypedArray(another.dataSync(), another.dtype);
        return NDArray.make(another.shape, { values: newValues }, another.dtype, another.math);
    };
    NDArray.make = function (shape, data, dtype, math) {
        switch (shape.length) {
            case 0:
                return new Scalar(shape, dtype, data.values, data.dataId, math);
            case 1:
                return new Array1D(shape, dtype, data.values, data.dataId, math);
            case 2:
                return new Array2D(shape, dtype, data.values, data.dataId, math);
            case 3:
                return new Array3D(shape, dtype, data.values, data.dataId, math);
            case 4:
                return new Array4D(shape, dtype, data.values, data.dataId, math);
            default:
                return new NDArray(shape, dtype, data.values, data.dataId, math);
        }
    };
    NDArray.fromPixels = function (pixels, numChannels, math) {
        if (numChannels === void 0) { numChannels = 3; }
        if (numChannels > 4) {
            throw new Error('Cannot construct NDArray with more than 4 channels from pixels.');
        }
        var ndarrayData = {};
        var shape = [pixels.height, pixels.width, numChannels];
        math = math || environment_1.ENV.math;
        var res = NDArray.make(shape, ndarrayData, 'int32', math);
        math.writePixels(res.dataId, pixels, numChannels);
        return res;
    };
    NDArray.prototype.reshape = function (newShape) {
        this.throwIfDisposed();
        return this.math.reshape(this, newShape);
    };
    NDArray.prototype.squeeze = function (axis) {
        return this.reshape(util.squeezeShape(this.shape, axis).newShape);
    };
    NDArray.prototype.flatten = function () {
        this.throwIfDisposed();
        if (this instanceof Array1D) {
            return this;
        }
        return this.as1D();
    };
    NDArray.prototype.asScalar = function () {
        this.throwIfDisposed();
        util.assert(this.size === 1, 'The array must have only 1 element.');
        return this.reshape([]);
    };
    NDArray.prototype.as1D = function () {
        this.throwIfDisposed();
        return this.reshape([this.size]);
    };
    NDArray.prototype.as2D = function (rows, columns) {
        this.throwIfDisposed();
        return this.reshape([rows, columns]);
    };
    NDArray.prototype.as3D = function (rows, columns, depth) {
        this.throwIfDisposed();
        return this.reshape([rows, columns, depth]);
    };
    NDArray.prototype.as4D = function (rows, columns, depth, depth2) {
        this.throwIfDisposed();
        return this.reshape([rows, columns, depth, depth2]);
    };
    NDArray.prototype.asType = function (dtype) {
        this.throwIfDisposed();
        return this.math.cast(this, dtype);
    };
    Object.defineProperty(NDArray.prototype, "rank", {
        get: function () {
            return this.shape.length;
        },
        enumerable: true,
        configurable: true
    });
    NDArray.prototype.get = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return this.dataSync()[index];
    };
    NDArray.prototype.add = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.set.apply(this, [this.get.apply(this, locs) + value].concat(locs));
    };
    NDArray.prototype.set = function (value) {
        var locs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            locs[_i - 1] = arguments[_i];
        }
        this.throwIfDisposed();
        util.assert(locs.length === this.rank, "The number of provided coordinates (" + locs.length + ") must " +
            ("match the rank (" + this.rank + ")"));
        var index = locs.length > 0 ? locs[locs.length - 1] : 0;
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        var vals = this.dataSync();
        vals[index] = value;
        this.math.write(this.dataId, vals);
    };
    NDArray.prototype.val = function () {
        var locs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            locs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.throwIfDisposed();
                        return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get.apply(this, locs)];
                }
            });
        });
    };
    NDArray.prototype.locToIndex = function (locs) {
        this.throwIfDisposed();
        if (locs.length === 0) {
            return 0;
        }
        var index = locs[locs.length - 1];
        for (var i = 0; i < locs.length - 1; ++i) {
            index += this.strides[i] * locs[i];
        }
        return index;
    };
    NDArray.prototype.indexToLoc = function (index) {
        this.throwIfDisposed();
        var locs = new Array(this.shape.length);
        for (var i = 0; i < locs.length - 1; ++i) {
            locs[i] = Math.floor(index / this.strides[i]);
            index -= locs[i] * this.strides[i];
        }
        locs[locs.length - 1] = index;
        return locs;
    };
    NDArray.prototype.fill = function (value) {
        this.throwIfDisposed();
        var vals = this.dataSync();
        vals.fill(value);
        this.math.write(this.dataId, vals);
    };
    NDArray.prototype.getValues = function () {
        return this.dataSync();
    };
    NDArray.prototype.getValuesAsync = function () {
        return this.data();
    };
    NDArray.prototype.data = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.throwIfDisposed();
                return [2, this.math.read(this.dataId)];
            });
        });
    };
    NDArray.prototype.dataSync = function () {
        this.throwIfDisposed();
        return this.math.readSync(this.dataId);
    };
    NDArray.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.math.disposeData(this.dataId);
    };
    NDArray.prototype.equals = function (t) {
        this.throwIfDisposed();
        return this.dtype === t.dtype && util.arraysEqual(this.shape, t.shape) &&
            util.arraysEqual(this.dataSync(), t.dataSync());
    };
    NDArray.rand = function (shape, randFunction, dtype) {
        var size = util.sizeFromShape(shape);
        var values = null;
        if (dtype == null || dtype === 'float32') {
            values = new Float32Array(size);
        }
        else if (dtype === 'int32') {
            values = new Int32Array(size);
        }
        else if (dtype === 'bool') {
            values = new Uint8Array(size);
        }
        else {
            throw new Error("Unknown data type " + dtype);
        }
        for (var i = 0; i < size; i++) {
            values[i] = randFunction();
        }
        return NDArray.make(shape, { values: values }, dtype);
    };
    NDArray.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    NDArray.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    NDArray.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    NDArray.prototype.throwIfDisposed = function () {
        if (this.isDisposed) {
            throw new Error("NDArray is disposed.");
        }
    };
    NDArray.nextId = 0;
    NDArray.nextDataId = 0;
    return NDArray;
}());
exports.NDArray = NDArray;
var Scalar = (function (_super) {
    __extends(Scalar, _super);
    function Scalar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scalar.new = function (value, dtype) {
        var values = [value];
        return new Scalar([], dtype, toTypedArray(values, dtype));
    };
    Scalar.prototype.get = function () {
        return this.dataSync()[0];
    };
    Scalar.prototype.val = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get()];
                }
            });
        });
    };
    Scalar.prototype.add = function (value) {
        this.dataSync()[0] += value;
    };
    Scalar.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Scalar.prototype.locToIndex = function (loc) {
        return 0;
    };
    Scalar.prototype.indexToLoc = function (index) {
        return [];
    };
    return Scalar;
}(NDArray));
exports.Scalar = Scalar;
var Array1D = (function (_super) {
    __extends(Array1D, _super);
    function Array1D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Array1D.new = function (values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            util.assert(inferredShape.length === 1, "Error constructing Array1D. Shape of values " + inferredShape + " is " +
                "not 1 dimensional.");
        }
        return new Array1D([values.length], dtype, toTypedArray(values, dtype));
    };
    Array1D.prototype.get = function (i) {
        return this.dataSync()[i];
    };
    Array1D.prototype.val = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i)];
                }
            });
        });
    };
    Array1D.prototype.add = function (value, i) {
        this.dataSync()[i] += value;
    };
    Array1D.prototype.locToIndex = function (loc) {
        return loc[0];
    };
    Array1D.prototype.indexToLoc = function (index) {
        return [index];
    };
    Array1D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array1D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array1D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array1D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array1D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array1D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array1D;
}(NDArray));
exports.Array1D = Array1D;
var Array2D = (function (_super) {
    __extends(Array2D, _super);
    function Array2D(shape, dtype, values, dataId, math) {
        var _this = this;
        util.assert(shape.length === 2, 'Shape should be of length 2');
        _this = _super.call(this, shape, dtype, values, dataId, math) || this;
        return _this;
    }
    Array2D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array2D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array2D(shape, dtype, toTypedArray(values, dtype));
    };
    Array2D.prototype.get = function (i, j) {
        return this.dataSync()[this.strides[0] * i + j];
    };
    Array2D.prototype.add = function (value, i, j) {
        this.dataSync()[this.strides[0] * i + j] += value;
    };
    Array2D.prototype.val = function (i, j) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j)];
                }
            });
        });
    };
    Array2D.prototype.locToIndex = function (locs) {
        return this.strides[0] * locs[0] + locs[1];
    };
    Array2D.prototype.indexToLoc = function (index) {
        return [Math.floor(index / this.strides[0]), index % this.strides[0]];
    };
    Array2D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array2D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array2D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array2D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array2D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array2D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array2D;
}(NDArray));
exports.Array2D = Array2D;
var Array3D = (function (_super) {
    __extends(Array3D, _super);
    function Array3D(shape, dtype, values, dataId, math) {
        var _this = this;
        util.assert(shape.length === 3, 'Shape should be of length 3');
        _this = _super.call(this, shape, dtype, values, dataId, math) || this;
        return _this;
    }
    Array3D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array3D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array3D(shape, dtype, toTypedArray(values, dtype));
    };
    Array3D.prototype.get = function (i, j, k) {
        return this.dataSync()[this.strides[0] * i + this.strides[1] * j + k];
    };
    Array3D.prototype.val = function (i, j, k) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k)];
                }
            });
        });
    };
    Array3D.prototype.add = function (value, i, j, k) {
        this.dataSync()[this.strides[0] * i + this.strides[1] * j + k] += value;
    };
    Array3D.prototype.locToIndex = function (locs) {
        return this.strides[0] * locs[0] + this.strides[1] * locs[1] + locs[2];
    };
    Array3D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.strides[0]);
        index -= i * this.strides[0];
        return [i, Math.floor(index / this.strides[1]), index % this.strides[1]];
    };
    Array3D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array3D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array3D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array3D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array3D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array3D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array3D;
}(NDArray));
exports.Array3D = Array3D;
var Array4D = (function (_super) {
    __extends(Array4D, _super);
    function Array4D(shape, dtype, values, dataId, math) {
        var _this = this;
        util.assert(shape.length === 4, 'Shape should be of length 4');
        _this = _super.call(this, shape, dtype, values, dataId, math) || this;
        return _this;
    }
    Array4D.new = function (shape, values, dtype) {
        if (!instanceofTypedArray(values)) {
            var inferredShape = util.inferShape(values);
            if (inferredShape.length > 1) {
                util.assertShapesMatch(shape, inferredShape, "Error when constructing Array4D. Shape of values " +
                    (inferredShape + " does not match the provided shape ") +
                    (shape + ". "));
            }
        }
        return new Array4D(shape, dtype, toTypedArray(values, dtype));
    };
    Array4D.prototype.get = function (i, j, k, l) {
        return this.dataSync()[this.strides[0] * i + this.strides[1] * j + this.strides[2] * k + l];
    };
    Array4D.prototype.val = function (i, j, k, l) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data()];
                    case 1:
                        _a.sent();
                        return [2, this.get(i, j, k, l)];
                }
            });
        });
    };
    Array4D.prototype.add = function (value, i, j, k, l) {
        this.dataSync()[this.strides[0] * i + this.strides[1] * j + this.strides[2] * k + l] +=
            value;
    };
    Array4D.prototype.locToIndex = function (locs) {
        return this.strides[0] * locs[0] + this.strides[1] * locs[1] +
            this.strides[2] * locs[2] + locs[3];
    };
    Array4D.prototype.indexToLoc = function (index) {
        var i = Math.floor(index / this.strides[0]);
        index -= i * this.strides[0];
        var j = Math.floor(index / this.strides[1]);
        index -= j * this.strides[1];
        return [i, j, Math.floor(index / this.strides[2]), index % this.strides[2]];
    };
    Array4D.prototype.asType = function (dtype) {
        return _super.prototype.asType.call(this, dtype);
    };
    Array4D.ones = function (shape, dtype) {
        return NDArray.ones(shape, dtype);
    };
    Array4D.zeros = function (shape, dtype) {
        return NDArray.zeros(shape, dtype);
    };
    Array4D.randNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array4D.randTruncatedNormal = function (shape, mean, stdDev, dtype, seed) {
        if (mean === void 0) { mean = 0; }
        if (stdDev === void 0) { stdDev = 1; }
        if (dtype != null && dtype === 'bool') {
            throw new Error("Unsupported data type " + dtype);
        }
        var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true, seed);
        return NDArray.rand(shape, function () { return randGauss.nextValue(); }, dtype);
    };
    Array4D.randUniform = function (shape, a, b, dtype) {
        return NDArray.rand(shape, function () { return util.randUniform(a, b); }, dtype);
    };
    return Array4D;
}(NDArray));
exports.Array4D = Array4D;
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(initialValue, trainable, name) {
        if (trainable === void 0) { trainable = true; }
        var _this = _super.call(this, initialValue.shape, initialValue.dtype, null, initialValue.dataId) || this;
        _this.trainable = trainable;
        initialValue.dispose();
        _this.name = name;
        if (_this.name == null) {
            _this.name = Variable.nextVarId.toString();
            Variable.nextVarId++;
        }
        _this.math.registerVariable(_this);
        return _this;
    }
    Variable.variable = function (initialValue, trainable, name, dtype) {
        if (trainable === void 0) { trainable = true; }
        if (dtype != null && dtype !== initialValue.dtype) {
            initialValue = initialValue.asType(dtype);
        }
        return new Variable(initialValue, trainable, name);
    };
    Variable.prototype.assign = function (newValue) {
        if (newValue.dtype !== this.dtype) {
            throw new Error("dtype of the new value (" + newValue.dtype + ") and " +
                ("previous value (" + this.dtype + ") must match"));
        }
        if (!util.arraysEqual(newValue.shape, this.shape)) {
            throw new Error("shape of the new value (" + newValue.shape + ") and " +
                ("previous value (" + this.shape + ") must match"));
        }
        this.math.disposeData(this.dataId);
        this.dataId = newValue.dataId;
        this.math.register(this);
        newValue.dispose();
    };
    Variable.nextVarId = 0;
    return Variable;
}(NDArray));
exports.Variable = Variable;
var variable = Variable.variable;
exports.variable = variable;
function copyTypedArray(array, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(array);
    }
    else if (dtype === 'int32') {
        var vals = new Int32Array(array.length);
        for (var i = 0; i < vals.length; ++i) {
            var val = array[i];
            if (util.isValNaN(val, 'int32')) {
                vals[i] = util.getNaN('int32');
            }
            else {
                vals[i] = val;
            }
        }
        return vals;
    }
    else if (dtype === 'bool') {
        var bool = new Uint8Array(array.length);
        for (var i = 0; i < bool.length; ++i) {
            var val = array[i];
            if (util.isValNaN(val, 'bool')) {
                bool[i] = util.getNaN('bool');
            }
            else if (Math.round(val) !== 0) {
                bool[i] = 1;
            }
        }
        return bool;
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function instanceofTypedArray(a) {
    return a instanceof Float32Array || a instanceof Int32Array ||
        a instanceof Uint8Array;
}
function noConversionNeeded(a, dtype) {
    return (a instanceof Float32Array && dtype === 'float32') ||
        (a instanceof Int32Array && dtype === 'int32') ||
        (a instanceof Uint8Array && dtype === 'bool');
}
function toTypedArray(a, dtype) {
    if (noConversionNeeded(a, dtype)) {
        return a;
    }
    if (Array.isArray(a)) {
        a = util.flatten(a);
    }
    return copyTypedArray(a, dtype);
}
function makeZerosTypedArray(size, dtype) {
    if (dtype == null || dtype === 'float32') {
        return new Float32Array(size);
    }
    else if (dtype === 'int32') {
        return new Int32Array(size);
    }
    else if (dtype === 'bool') {
        return new Uint8Array(size);
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
}
function makeOnesTypedArray(size, dtype) {
    var array = makeZerosTypedArray(size, dtype);
    for (var i = 0; i < array.length; i++) {
        array[i] = 1;
    }
    return array;
}
