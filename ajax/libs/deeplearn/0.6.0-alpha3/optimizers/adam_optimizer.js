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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var globals_1 = require("../globals");
var ops_1 = require("../ops/ops");
var optimizer_1 = require("./optimizer");
var AdamOptimizer = (function (_super) {
    __extends(AdamOptimizer, _super);
    function AdamOptimizer(learningRate, beta1, beta2, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-8; }
        var _this = _super.call(this) || this;
        _this.learningRate = learningRate;
        _this.accumulatedFirstMoment = {};
        _this.accumulatedSecondMoment = {};
        _this.c = globals_1.keep(ops_1.scalar(-learningRate));
        _this.eps = globals_1.keep(ops_1.scalar(epsilon));
        _this.beta1 = globals_1.keep(ops_1.scalar(beta1));
        _this.beta2 = globals_1.keep(ops_1.scalar(beta2));
        globals_1.tidy(function () {
            _this.accBeta1 = ops_1.scalar(beta1).variable();
            _this.accBeta2 = ops_1.scalar(beta2).variable();
        });
        _this.oneMinusBeta1 = globals_1.keep(ops_1.scalar(1 - beta1));
        _this.oneMinusBeta2 = globals_1.keep(ops_1.scalar(1 - beta2));
        _this.one = globals_1.keep(ops_1.scalar(1));
        return _this;
    }
    AdamOptimizer.prototype.applyGradients = function (variableGradients) {
        var _this = this;
        globals_1.tidy(function () {
            var oneMinusAccBeta1 = _this.one.sub(_this.accBeta1);
            var oneMinusAccBeta2 = _this.one.sub(_this.accBeta2);
            for (var variableName in variableGradients) {
                var value = environment_1.ENV.engine.registeredVariables[variableName];
                if (_this.accumulatedFirstMoment[variableName] == null) {
                    var trainable = false;
                    _this.accumulatedFirstMoment[variableName] =
                        ops_1.zerosLike(value).variable(trainable);
                }
                if (_this.accumulatedSecondMoment[variableName] == null) {
                    var trainable = false;
                    _this.accumulatedSecondMoment[variableName] =
                        ops_1.zerosLike(value).variable(trainable);
                }
                var gradient = variableGradients[variableName];
                var firstMoment = _this.accumulatedFirstMoment[variableName];
                var secondMoment = _this.accumulatedSecondMoment[variableName];
                var newFirstMoment = _this.beta1.mul(firstMoment).add(_this.oneMinusBeta1.mul(gradient));
                var newSecondMoment = _this.beta2.mul(secondMoment)
                    .add(_this.oneMinusBeta2.mul(gradient.square()));
                var biasCorrectedFirstMoment = newFirstMoment.div(oneMinusAccBeta1);
                var biasCorrectedSecondMoment = newSecondMoment.div(oneMinusAccBeta2);
                _this.accumulatedFirstMoment[variableName].assign(newFirstMoment);
                _this.accumulatedSecondMoment[variableName].assign(newSecondMoment);
                var newValue = _this.c
                    .mul(biasCorrectedFirstMoment.div(_this.eps.add(biasCorrectedSecondMoment.sqrt())))
                    .add(value);
                value.assign(newValue);
            }
            _this.accBeta1.assign(_this.accBeta1.mul(_this.beta1));
            _this.accBeta2.assign(_this.accBeta2.mul(_this.beta2));
        });
    };
    AdamOptimizer.prototype.dispose = function () {
        var _this = this;
        this.c.dispose();
        this.eps.dispose();
        this.beta1.dispose();
        this.beta2.dispose();
        this.accBeta1.dispose();
        this.accBeta2.dispose();
        this.oneMinusBeta1.dispose();
        this.oneMinusBeta2.dispose();
        this.one.dispose();
        if (this.accumulatedFirstMoment != null) {
            Object.keys(this.accumulatedFirstMoment)
                .forEach(function (name) { return _this.accumulatedFirstMoment[name].dispose(); });
        }
        if (this.accumulatedSecondMoment != null) {
            Object.keys(this.accumulatedSecondMoment)
                .forEach(function (name) { return _this.accumulatedSecondMoment[name].dispose(); });
        }
    };
    return AdamOptimizer;
}(optimizer_1.Optimizer));
exports.AdamOptimizer = AdamOptimizer;
