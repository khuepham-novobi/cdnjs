import { ElementRef, NgZone, Input, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Tooltip = class Tooltip {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.tooltipPosition = 'right';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.tooltipZIndex = 'auto';
        this.escape = true;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
        this.deactivate();
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            if (this.tooltipEvent === 'hover') {
                this.mouseEnterListener = this.onMouseEnter.bind(this);
                this.mouseLeaveListener = this.onMouseLeave.bind(this);
                this.clickListener = this.onClick.bind(this);
                this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                this.el.nativeElement.addEventListener('click', this.clickListener);
            }
            else if (this.tooltipEvent === 'focus') {
                this.focusListener = this.onFocus.bind(this);
                this.blurListener = this.onBlur.bind(this);
                this.el.nativeElement.addEventListener('focus', this.focusListener);
                this.el.nativeElement.addEventListener('blur', this.blurListener);
            }
        });
    }
    onMouseEnter(e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }
    onMouseLeave(e) {
        this.deactivate();
    }
    onFocus(e) {
        this.activate();
    }
    onBlur(e) {
        this.deactivate();
    }
    onClick(e) {
        this.deactivate();
    }
    activate() {
        this.active = true;
        this.clearHideTimeout();
        if (this.showDelay)
            this.showTimeout = setTimeout(() => { this.show(); }, this.showDelay);
        else
            this.show();
        if (this.life) {
            let duration = this.showDelay ? this.life + this.showDelay : this.life;
            this.hideTimeout = setTimeout(() => { this.hide(); }, duration);
        }
    }
    deactivate() {
        this.active = false;
        this.clearShowTimeout();
        if (this.hideDelay) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(() => { this.hide(); }, this.hideDelay);
        }
        else {
            this.hide();
        }
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
        if (this.active) {
            if (this._text) {
                if (this.container && this.container.offsetParent) {
                    this.updateText();
                    this.align();
                }
                else {
                    this.show();
                }
            }
            else {
                this.hide();
            }
        }
    }
    create() {
        this.container = document.createElement('div');
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
        this.updateText();
        if (this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        this.container.appendChild(this.tooltipText);
        if (this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if (this.appendTo === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.appendTo);
        this.container.style.display = 'inline-block';
    }
    show() {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);
        if (this.tooltipZIndex === 'auto')
            this.container.style.zIndex = ++DomHandler.zindex;
        else
            this.container.style.zIndex = this.tooltipZIndex;
        this.bindDocumentResizeListener();
    }
    hide() {
        this.remove();
    }
    updateText() {
        if (this.escape) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this._text));
        }
        else {
            this.tooltipText.innerHTML = this._text;
        }
    }
    align() {
        let position = this.tooltipPosition;
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    }
    getHostOffset() {
        if (this.appendTo === 'body' || this.appendTo === 'target') {
            let offset = this.el.nativeElement.getBoundingClientRect();
            let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            let targetTop = offset.top + DomHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    }
    alignRight() {
        this.preAlign('right');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
    alignLeft() {
        this.preAlign('left');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
    alignTop() {
        this.preAlign('top');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
    alignBottom() {
        this.preAlign('bottom');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
    preAlign(position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        let defaultClassName = 'ui-tooltip ui-widget ui-tooltip-' + position;
        this.container.className = this.tooltipStyleClass ? defaultClassName + ' ' + this.tooltipStyleClass : defaultClassName;
    }
    isOutOfBounds() {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = DomHandler.getOuterWidth(this.container);
        let height = DomHandler.getOuterHeight(this.container);
        let viewport = DomHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    }
    onWindowResize(e) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.zone.runOutsideAngular(() => {
            this.resizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
        });
    }
    unbindDocumentResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    unbindEvents() {
        if (this.tooltipEvent === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        else if (this.tooltipEvent === 'focus') {
            this.el.nativeElement.removeEventListener('focus', this.focusListener);
            this.el.nativeElement.removeEventListener('blur', this.blurListener);
        }
        this.unbindDocumentResizeListener();
    }
    remove() {
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.appendTo);
        }
        this.unbindDocumentResizeListener();
        this.clearTimeouts();
        this.container = null;
    }
    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    clearTimeouts() {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }
    ngOnDestroy() {
        this.unbindEvents();
        this.remove();
    }
};
Tooltip.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], Tooltip.prototype, "tooltipPosition", void 0);
__decorate([
    Input()
], Tooltip.prototype, "tooltipEvent", void 0);
__decorate([
    Input()
], Tooltip.prototype, "appendTo", void 0);
__decorate([
    Input()
], Tooltip.prototype, "positionStyle", void 0);
__decorate([
    Input()
], Tooltip.prototype, "tooltipStyleClass", void 0);
__decorate([
    Input()
], Tooltip.prototype, "tooltipZIndex", void 0);
__decorate([
    Input()
], Tooltip.prototype, "escape", void 0);
__decorate([
    Input()
], Tooltip.prototype, "showDelay", void 0);
__decorate([
    Input()
], Tooltip.prototype, "hideDelay", void 0);
__decorate([
    Input()
], Tooltip.prototype, "life", void 0);
__decorate([
    Input("tooltipDisabled")
], Tooltip.prototype, "disabled", null);
__decorate([
    Input('pTooltip')
], Tooltip.prototype, "text", null);
Tooltip = __decorate([
    Directive({
        selector: '[pTooltip]'
    })
], Tooltip);
let TooltipModule = class TooltipModule {
};
TooltipModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Tooltip],
        declarations: [Tooltip]
    })
], TooltipModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Tooltip, TooltipModule };
//# sourceMappingURL=primeng-tooltip.js.map
