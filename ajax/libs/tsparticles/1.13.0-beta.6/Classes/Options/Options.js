"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interactivity_1 = require("./Interactivity/Interactivity");
var Particles_1 = require("./Particles/Particles");
var PolygonMask_1 = require("./PolygonMask/PolygonMask");
var BackgroundMask_1 = require("./BackgroundMask/BackgroundMask");
var Presets_1 = require("../Utils/Presets");
var Background_1 = require("./Background/Background");
var Emitter_1 = require("./Emitters/Emitter");
var BlackHole_1 = require("./BlackHoles/BlackHole");
var Options = (function () {
    function Options() {
        this.background = new Background_1.Background();
        this.backgroundMask = new BackgroundMask_1.BackgroundMask();
        this.blackHoles = [];
        this.detectRetina = false;
        this.emitters = [];
        this.fpsLimit = 30;
        this.interactivity = new Interactivity_1.Interactivity();
        this.particles = new Particles_1.Particles();
        this.pauseOnBlur = true;
        this.polygon = new PolygonMask_1.PolygonMask();
    }
    Object.defineProperty(Options.prototype, "fps_limit", {
        get: function () {
            return this.fpsLimit;
        },
        set: function (value) {
            this.fpsLimit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Options.prototype, "retina_detect", {
        get: function () {
            return this.detectRetina;
        },
        set: function (value) {
            this.detectRetina = value;
        },
        enumerable: true,
        configurable: true
    });
    Options.prototype.load = function (data) {
        var _this = this;
        var _a, _b;
        if (data !== undefined) {
            if (data.preset !== undefined) {
                if (data.preset instanceof Array) {
                    for (var _i = 0, _c = data.preset; _i < _c.length; _i++) {
                        var preset = _c[_i];
                        this.importPreset(preset);
                    }
                }
                else {
                    this.importPreset(data.preset);
                }
            }
            if (data.background !== undefined) {
                this.background.load(data.background);
            }
            var detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
            if (detectRetina !== undefined) {
                this.detectRetina = detectRetina;
            }
            var fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
            if (fpsLimit !== undefined) {
                this.fpsLimit = fpsLimit;
            }
            if (data.pauseOnBlur !== undefined) {
                this.pauseOnBlur = data.pauseOnBlur;
            }
            this.particles.load(data.particles);
            this.interactivity.load(data.interactivity, this.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);
            if (data.emitters !== undefined) {
                if (data.emitters instanceof Array) {
                    this.emitters = data.emitters.map(function (s) {
                        var tmp = new Emitter_1.Emitter();
                        tmp.load(s, _this.particles);
                        return tmp;
                    });
                }
                else {
                    if (this.emitters instanceof Array) {
                        this.emitters = new Emitter_1.Emitter();
                    }
                    this.emitters.load(data.emitters, this.particles);
                }
            }
            if (data.blackHoles !== undefined) {
                if (data.blackHoles instanceof Array) {
                    this.blackHoles = data.blackHoles.map(function (s) {
                        var tmp = new BlackHole_1.BlackHole();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.emitters instanceof Array) {
                        this.blackHoles = new BlackHole_1.BlackHole();
                    }
                    this.blackHoles.load(data.blackHoles);
                }
            }
        }
    };
    Options.prototype.importPreset = function (preset) {
        var presetOptions = Presets_1.Presets.getPreset(preset);
        if (presetOptions !== undefined) {
            this.load(presetOptions);
        }
    };
    return Options;
}());
exports.Options = Options;
