"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotate = void 0;
const RotateAnimation_1 = require("./RotateAnimation");
const Enums_1 = require("../../../../Enums");
class Rotate {
    constructor() {
        this.animation = new RotateAnimation_1.RotateAnimation();
        this.direction = Enums_1.RotateDirection.clockwise;
        this.random = false;
        this.value = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.animation.load(data.animation);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.Rotate = Rotate;
