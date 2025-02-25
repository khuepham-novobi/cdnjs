(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/virtualscroller', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/cdk/scrolling'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.virtualscroller = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.cdk.scrolling));
}(this, (function (exports, core, common, api, scrolling) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var VirtualScroller = /** @class */ (function () {
        function VirtualScroller(el) {
            this.el = el;
            this.trackBy = function (index, item) { return item; };
            this.onLazyLoad = new core.EventEmitter();
            this._totalRecords = 0;
            this.page = 0;
            this._first = 0;
            this.loadedPages = [];
        }
        Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
                console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "cache", {
            get: function () {
                return this._cache;
            },
            set: function (val) {
                this._cache = val;
                console.log("cache is deprecated as it is always on.");
            },
            enumerable: true,
            configurable: true
        });
        VirtualScroller.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'loadingItem':
                        _this.loadingItemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        VirtualScroller.prototype.onScrollIndexChange = function (index) {
            var _this = this;
            if (this.lazy) {
                var pageRange = this.createPageRange(Math.floor(index / this.rows));
                pageRange.forEach(function (page) { return _this.loadPage(page); });
            }
        };
        VirtualScroller.prototype.createPageRange = function (page) {
            var range = [];
            if (page !== 0) {
                range.push(page - 1);
            }
            range.push(page);
            if (page !== (Math.ceil(this.value.length / this.rows) - 1)) {
                range.push(page + 1);
            }
            return range;
        };
        VirtualScroller.prototype.loadPage = function (page) {
            if (!this.loadedPages.includes(page)) {
                this.onLazyLoad.emit({ first: this.rows * page, rows: this.rows });
                this.loadedPages.push(page);
            }
        };
        VirtualScroller.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        //@deprecated
        VirtualScroller.prototype.scrollTo = function (index, mode) {
            this.scrollToIndex(index, mode);
        };
        VirtualScroller.prototype.scrollToIndex = function (index, mode) {
            if (this.viewport) {
                this.viewport.scrollToIndex(index, mode);
            }
        };
        VirtualScroller.prototype.clearCache = function () {
            this.loadedPages = [];
        };
        VirtualScroller.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                if (!this.lazy) {
                    this.clearCache();
                }
            }
        };
        VirtualScroller.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "itemSize", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "scrollHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "lazy", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "rows", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "minBufferPx", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "maxBufferPx", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "trackBy", void 0);
        __decorate([
            core.ContentChild(api.Header)
        ], VirtualScroller.prototype, "header", void 0);
        __decorate([
            core.ContentChild(api.Footer)
        ], VirtualScroller.prototype, "footer", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], VirtualScroller.prototype, "templates", void 0);
        __decorate([
            core.ViewChild(scrolling.CdkVirtualScrollViewport)
        ], VirtualScroller.prototype, "viewport", void 0);
        __decorate([
            core.Output()
        ], VirtualScroller.prototype, "onLazyLoad", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "totalRecords", null);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "first", null);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "cache", null);
        VirtualScroller = __decorate([
            core.Component({
                selector: 'p-virtualScroller',
                template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <div class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <div [ngStyle]=\"{'height': itemSize + 'px'}\" class=\"ui-virtualscroller-item\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </div>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </div>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default
            })
        ], VirtualScroller);
        return VirtualScroller;
    }());
    var VirtualScrollerModule = /** @class */ (function () {
        function VirtualScrollerModule() {
        }
        VirtualScrollerModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, scrolling.ScrollingModule],
                exports: [VirtualScroller, api.SharedModule, scrolling.ScrollingModule],
                declarations: [VirtualScroller]
            })
        ], VirtualScrollerModule);
        return VirtualScrollerModule;
    }());

    exports.VirtualScroller = VirtualScroller;
    exports.VirtualScrollerModule = VirtualScrollerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-virtualscroller.umd.js.map
