/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v3.0.0
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.noframe = factory());
}(this, (function () { 'use strict';

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

    /* noframe.js () 🖼
      -------------
      takes 2 arguments:
      => target: targeted <element>
      => container: optional targeted <parent> of targeted <element>
      -------------
      defines the height/width ratio of the targeted <element>
      based on the targeted <parent> width
    */
    function noframe(target, container) {
        var frames = __spreadArrays((typeof target === 'string' ? document.querySelectorAll(target) : target));
        for (var i = 0; i < frames.length; i += 1) {
            var frame = frames[i];
            var isContainerElement = typeof container !== 'undefined' && document.querySelector(container);
            var parent_1 = isContainerElement ? document.querySelector(container) : frame.parentElement;
            var h = frame.offsetHeight;
            var w = frame.offsetWidth;
            var styles = frame.style;
            var maxW = w + "px";
            // => If a targeted <container> element is defined
            if (isContainerElement) {
                // gets/sets the height/width ratio
                maxW = window.getComputedStyle(parent_1, null).getPropertyValue('max-width');
                styles.width = '100%';
                // calc is needed here b/c the maxW measurement type is unknown
                styles.maxHeight = "calc(" + maxW + " * " + h + " / " + w + ")";
            }
            else {
                // gets/sets the height/width ratio
                // => if a targeted <element> closest parent <element> is NOT defined
                var maxH = void 0;
                styles.display = 'block';
                styles.marginLeft = 'auto';
                styles.marginRight = 'auto';
                var fullW = maxW;
                // if targeted <element> width is > than it's parent <element>
                // => set the targeted <element> maxheight/fullwidth to it's parent <element>
                if (w > parent_1.offsetWidth) {
                    fullW = parent_1.offsetWidth;
                    maxH = (fullW * h) / w; // eslint-disable-line no-mixed-operators
                }
                else
                    maxH = w * (h / w);
                styles.maxHeight = maxH + "px";
                styles.width = fullW;
            }
            // set a calculated height of the targeted <element>
            var cssHeight = (100 * h) / w; // eslint-disable-line no-mixed-operators
            styles.height = cssHeight + "vw";
            styles.maxWidth = '100%';
        }
    }

    return noframe;

})));
