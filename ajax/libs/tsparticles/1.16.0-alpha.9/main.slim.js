"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSlim = void 0;
const SquareDrawer_1 = require("./ShapeDrawers/SquareDrawer");
const TextDrawer_1 = require("./ShapeDrawers/TextDrawer");
const ImageDrawer_1 = require("./ShapeDrawers/ImageDrawer");
const Utils_1 = require("./Utils");
const Types_1 = require("./Enums/Types");
const LineDrawer_1 = require("./ShapeDrawers/LineDrawer");
const CircleDrawer_1 = require("./ShapeDrawers/CircleDrawer");
const TriangleDrawer_1 = require("./ShapeDrawers/TriangleDrawer");
const StarDrawer_1 = require("./ShapeDrawers/StarDrawer");
const PolygonDrawer_1 = require("./ShapeDrawers/PolygonDrawer");
const Loader_1 = require("./Core/Loader");
class MainSlim {
    constructor() {
        this.initialized = false;
        if (typeof window !== "undefined" && window) {
            window.customRequestAnimationFrame = (() => {
                return (window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    ((callback) => window.setTimeout(callback, 1000 / 60)));
            })();
            window.customCancelRequestAnimationFrame = (() => {
                return (window.cancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame ||
                    clearTimeout);
            })();
        }
        const squareDrawer = new SquareDrawer_1.SquareDrawer();
        const textDrawer = new TextDrawer_1.TextDrawer();
        const imageDrawer = new ImageDrawer_1.ImageDrawer();
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.line, new LineDrawer_1.LineDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.circle, new CircleDrawer_1.CircleDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.edge, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.square, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.triangle, new TriangleDrawer_1.TriangleDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.star, new StarDrawer_1.StarDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.polygon, new PolygonDrawer_1.PolygonDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.char, textDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.character, textDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.image, imageDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.images, imageDrawer);
    }
    init() {
        if (!this.initialized) {
            this.initialized = true;
        }
    }
    loadFromArray(tagId, params, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader_1.Loader.loadFromArray(tagId, params, index);
        });
    }
    load(tagId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader_1.Loader.load(tagId, params);
        });
    }
    loadJSON(tagId, pathConfigJson) {
        return Loader_1.Loader.loadJSON(tagId, pathConfigJson);
    }
    setOnClickHandler(callback) {
        Loader_1.Loader.setOnClickHandler(callback);
    }
    dom() {
        return Loader_1.Loader.dom();
    }
    domItem(index) {
        return Loader_1.Loader.domItem(index);
    }
    addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        Utils_1.Plugins.addShapeDrawer(shape, customDrawer);
    }
    addPreset(preset, options) {
        Utils_1.Plugins.addPreset(preset, options);
    }
    addPlugin(plugin) {
        Utils_1.Plugins.addPlugin(plugin);
    }
}
exports.MainSlim = MainSlim;
