import { SVG_NS, DEFAULT_ANIMATION_DURATION } from './model.js';
import { renderAnnotation } from './render.js';
import { ensureKeyframes } from './keyframes.js';
import { randomSeed } from 'roughjs/bin/math';
class RoughAnnotationImpl {
    constructor(e, config) {
        this._state = 'unattached';
        this._resizing = false;
        this._seed = randomSeed();
        this._animationGroupDelay = 0;
        this._resizeListener = () => {
            if (!this._resizing) {
                this._resizing = true;
                setTimeout(() => {
                    this._resizing = false;
                    if (this._state === 'showing') {
                        const newSize = this.size();
                        if (newSize && this.hasRectChanged(newSize)) {
                            this.show();
                        }
                    }
                }, 400);
            }
        };
        this._e = e;
        this._config = config;
        this.attach();
    }
    get animate() { return this._config.animate; }
    set animate(value) { this._config.animate = value; }
    get animationDuration() { return this._config.animationDuration; }
    set animationDuration(value) { this._config.animationDuration = value; }
    get animationDelay() { return this._config.animationDelay; }
    set animationDelay(value) { this._config.animationDelay = value; }
    get iterations() { return this._config.iterations; }
    set iterations(value) { this._config.iterations = value; }
    get color() { return this._config.color; }
    set color(value) {
        if (this._config.color !== value) {
            this._config.color = value;
            this.refresh();
        }
    }
    get strokeWidth() { return this._config.strokeWidth; }
    set strokeWidth(value) {
        if (this._config.strokeWidth !== value) {
            this._config.strokeWidth = value;
            this.refresh();
        }
    }
    get padding() { return this._config.padding; }
    set padding(value) {
        if (this._config.padding !== value) {
            this._config.padding = value;
            this.refresh();
        }
    }
    attach() {
        if (this._state === 'unattached' && this._e.parentElement) {
            ensureKeyframes();
            const svg = this._svg = document.createElementNS(SVG_NS, 'svg');
            svg.setAttribute('class', 'rough-annotation');
            const style = svg.style;
            style.position = 'absolute';
            style.top = '0';
            style.left = '0';
            style.overflow = 'visible';
            style.pointerEvents = 'none';
            style.width = '100px';
            style.height = '100px';
            const prepend = this._config.type === 'highlight';
            this._e.insertAdjacentElement(prepend ? 'beforebegin' : 'afterend', svg);
            this._state = 'not-showing';
            // ensure e is positioned
            if (prepend) {
                const computedPos = window.getComputedStyle(this._e).position;
                const unpositioned = (!computedPos) || (computedPos === 'static');
                if (unpositioned) {
                    this._e.style.position = 'relative';
                }
            }
            this.attachListeners();
        }
    }
    detachListeners() {
        window.removeEventListener('resize', this._resizeListener);
        if (this._ro) {
            this._ro.unobserve(this._e);
        }
    }
    attachListeners() {
        this.detachListeners();
        window.addEventListener('resize', this._resizeListener, { passive: true });
        if ((!this._ro) && ('ResizeObserver' in window)) {
            this._ro = new window.ResizeObserver((entries) => {
                for (const entry of entries) {
                    let trigger = true;
                    if (entry.contentRect) {
                        const newRect = this.sizeFor(entry.contentRect);
                        if (newRect && (!this.hasRectChanged(newRect))) {
                            trigger = false;
                        }
                    }
                    if (trigger) {
                        this._resizeListener();
                    }
                }
            });
        }
        if (this._ro) {
            this._ro.observe(this._e);
        }
    }
    sameInteger(a, b) {
        return Math.round(a) === Math.round(b);
    }
    hasRectChanged(rect) {
        if (this._lastSize && rect) {
            return !(this.sameInteger(rect.x, this._lastSize.x) &&
                this.sameInteger(rect.y, this._lastSize.y) &&
                this.sameInteger(rect.w, this._lastSize.w) &&
                this.sameInteger(rect.h, this._lastSize.h));
        }
        return true;
    }
    isShowing() {
        return (this._state !== 'not-showing');
    }
    refresh() {
        if (this.isShowing() && (!this.pendingRefresh)) {
            this.pendingRefresh = Promise.resolve().then(() => {
                if (this.isShowing()) {
                    this.show();
                }
                delete this.pendingRefresh;
            });
        }
    }
    show() {
        switch (this._state) {
            case 'unattached':
                break;
            case 'showing':
                this.hide();
                if (this._svg) {
                    this.render(this._svg, true);
                }
                break;
            case 'not-showing':
                this.attach();
                if (this._svg) {
                    this.render(this._svg, false);
                }
                break;
        }
    }
    hide() {
        if (this._svg) {
            while (this._svg.lastChild) {
                this._svg.removeChild(this._svg.lastChild);
            }
        }
        this._state = 'not-showing';
    }
    remove() {
        if (this._svg && this._svg.parentElement) {
            this._svg.parentElement.removeChild(this._svg);
        }
        this._svg = undefined;
        this._state = 'unattached';
        this.detachListeners();
    }
    render(svg, ensureNoAnimation) {
        const rect = this.size();
        if (rect) {
            let config = this._config;
            if (ensureNoAnimation) {
                config = JSON.parse(JSON.stringify(this._config));
                config.animate = false;
            }
            renderAnnotation(svg, rect, config, this._animationGroupDelay, this._seed);
            this._lastSize = rect;
            this._state = 'showing';
        }
    }
    size() {
        return this.sizeFor(this._e.getBoundingClientRect());
    }
    sizeFor(bounds) {
        if (this._svg) {
            const rect1 = this._svg.getBoundingClientRect();
            const rect2 = bounds;
            const x = (rect2.x || rect2.left) - (rect1.x || rect1.left);
            const y = (rect2.y || rect2.top) - (rect1.y || rect1.top);
            const w = rect2.width;
            const h = rect2.height;
            return { x, y, w, h };
        }
        return null;
    }
}
export function annotate(element, config) {
    return new RoughAnnotationImpl(element, config);
}
export function annotationGroup(annotations) {
    let delay = 0;
    for (const a of annotations) {
        const ai = a;
        ai._animationGroupDelay = delay;
        const duration = ai.animationDuration === 0 ? 0 : (ai.animationDuration || DEFAULT_ANIMATION_DURATION);
        delay += duration;
    }
    const list = [...annotations];
    return {
        show() {
            for (const a of list) {
                a.show();
            }
        },
        hide() {
            for (const a of list) {
                a.hide();
            }
        }
    };
}
