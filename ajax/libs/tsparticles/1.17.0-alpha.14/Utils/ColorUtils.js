"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorUtils = void 0;
const Utils_1 = require("./Utils");
const Constants_1 = require("./Constants");
class ColorUtils {
    static colorToRgb(input) {
        var _a, _b;
        if (input === undefined) {
            return;
        }
        const color = typeof input === "string" ? { value: input } : input;
        let res;
        if (typeof color.value === "string") {
            if (color.value === Constants_1.Constants.randomColorValue) {
                res = this.getRandomRgbColor();
            }
            else {
                res = ColorUtils.stringToRgb(color.value);
            }
        }
        else {
            if (color.value instanceof Array) {
                const colorSelected = Utils_1.Utils.itemFromArray(color.value);
                res = ColorUtils.colorToRgb({ value: colorSelected });
            }
            else {
                const colorValue = color.value;
                const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                }
                else {
                    const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
                    if (hslColor.h !== undefined) {
                        res = ColorUtils.hslToRgb(hslColor);
                    }
                }
            }
        }
        return res;
    }
    static colorToHsl(color) {
        const rgb = this.colorToRgb(color);
        return rgb !== undefined ? this.rgbToHsl(rgb) : rgb;
    }
    static rgbToHsl(color) {
        const r1 = color.r / 255;
        const g1 = color.g / 255;
        const b1 = color.b / 255;
        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);
        const res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };
        if (max != min) {
            res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
            res.h =
                r1 === max
                    ? (g1 - b1) / (max - min)
                    : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
        }
        res.l *= 100;
        res.s *= 100;
        res.h *= 60;
        if (res.h < 0) {
            res.h += 360;
        }
        return res;
    }
    static stringToAlpha(input) {
        var _a;
        return (_a = ColorUtils.stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
    }
    static stringToRgb(input) {
        return ColorUtils.stringToRgba(input);
    }
    static hslToRgb(hsl) {
        const result = { b: 0, g: 0, r: 0 };
        const hslPercent = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };
        if (hslPercent.s === 0) {
            result.b = hslPercent.l;
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        }
        else {
            const q = hslPercent.l < 0.5
                ? hslPercent.l * (1 + hslPercent.s)
                : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
            const p = 2 * hslPercent.l - q;
            result.r = ColorUtils.hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = ColorUtils.hue2rgb(p, q, hslPercent.h);
            result.b = ColorUtils.hue2rgb(p, q, hslPercent.h - 1 / 3);
        }
        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);
        return result;
    }
    static hslaToRgba(hsla) {
        const rgbResult = ColorUtils.hslToRgb(hsla);
        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    static getRandomRgbColor(min) {
        const fixedMin = min !== null && min !== void 0 ? min : 0;
        return {
            b: Math.floor(Utils_1.Utils.randomInRange(fixedMin, 256)),
            g: Math.floor(Utils_1.Utils.randomInRange(fixedMin, 256)),
            r: Math.floor(Utils_1.Utils.randomInRange(fixedMin, 256)),
        };
    }
    static getStyleFromRgb(color, opacity) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    static getStyleFromHsl(color, opacity) {
        return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    static mix(color1, color2, size1, size2) {
        let rgb1 = color1;
        let rgb2 = color2;
        if (rgb1.r === undefined) {
            rgb1 = this.hslToRgb(color1);
        }
        if (rgb2.r === undefined) {
            rgb2 = this.hslToRgb(color2);
        }
        return {
            b: Utils_1.Utils.mix(rgb1.b, rgb2.b, size1, size2),
            g: Utils_1.Utils.mix(rgb1.g, rgb2.g, size1, size2),
            r: Utils_1.Utils.mix(rgb1.r, rgb2.r, size1, size2),
        };
    }
    static hue2rgb(p, q, t) {
        let tCalc = t;
        if (tCalc < 0) {
            tCalc += 1;
        }
        if (tCalc > 1) {
            tCalc -= 1;
        }
        if (tCalc < 1 / 6) {
            return p + (q - p) * 6 * tCalc;
        }
        if (tCalc < 1 / 2) {
            return q;
        }
        if (tCalc < 2 / 3) {
            return p + (q - p) * (2 / 3 - tCalc) * 6;
        }
        return p;
    }
    static stringToRgba(input) {
        if (input.startsWith("rgb")) {
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);
            return result
                ? {
                    a: result.length > 4 ? parseFloat(result[5]) : 1,
                    b: parseInt(result[3], 10),
                    g: parseInt(result[2], 10),
                    r: parseInt(result[1], 10),
                }
                : undefined;
        }
        else if (input.startsWith("hsl")) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);
            return result
                ? ColorUtils.hslaToRgba({
                    a: result.length > 4 ? parseFloat(result[5]) : 1,
                    h: parseInt(result[1], 10),
                    l: parseInt(result[3], 10),
                    s: parseInt(result[2], 10),
                })
                : undefined;
        }
        else {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);
            return result
                ? {
                    a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                    b: parseInt(result[3], 16),
                    g: parseInt(result[2], 16),
                    r: parseInt(result[1], 16),
                }
                : undefined;
        }
    }
}
exports.ColorUtils = ColorUtils;
