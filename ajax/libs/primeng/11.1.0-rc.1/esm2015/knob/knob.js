import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, forwardRef, ChangeDetectorRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const KNOB_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Knob),
    multi: true
};
export class Knob {
    constructor(cd, el) {
        this.cd = cd;
        this.el = el;
        this.valueColor = "var(--primary-color, Black)";
        this.rangeColor = "var(--surface-d, LightGray)";
        this.textColor = "var(--text-color-secondary, Black)";
        this.valueTemplate = "{value}";
        this.size = 100;
        this.step = 1;
        this.min = 0;
        this.max = 100;
        this.strokeWidth = 14;
        this.showValue = true;
        this.readonly = false;
        this.onChange = new EventEmitter();
        this.radius = 40;
        this.midX = 50;
        this.midY = 50;
        this.minRadians = 4 * Math.PI / 3;
        this.maxRadians = -Math.PI / 3;
        this.value = null;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    mapRange(x, inMin, inMax, outMin, outMax) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    onClick(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }
    updateValue(offsetX, offsetY) {
        let dx = offsetX - this.size / 2;
        let dy = this.size / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }
    updateModel(angle, start) {
        let mappedValue;
        if (angle > this.maxRadians)
            mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
        else if (angle < start)
            mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
        else
            return;
        let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
        this.value = newValue;
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }
    onMouseDown(event) {
        if (!this.disabled && !this.readonly) {
            this.windowMouseMoveListener = this.onMouseMove.bind(this);
            this.windowMouseUpListener = this.onMouseUp.bind(this);
            window.addEventListener('mousemove', this.windowMouseMoveListener);
            window.addEventListener('mouseup', this.windowMouseUpListener);
            event.preventDefault();
        }
    }
    onMouseUp(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('mousemove', this.windowMouseMoveListener);
            window.removeEventListener('mouseup', this.windowMouseUpListener);
            this.windowMouseUpListener = null;
            this.windowMouseMoveListener = null;
            event.preventDefault();
        }
    }
    onTouchStart(event) {
        if (!this.disabled && !this.readonly) {
            this.windowTouchMoveListener = this.onTouchMove.bind(this);
            this.windowTouchEndListener = this.onTouchEnd.bind(this);
            window.addEventListener('touchmove', this.windowTouchMoveListener);
            window.addEventListener('touchend', this.windowTouchEndListener);
            event.preventDefault();
        }
    }
    onTouchEnd(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('touchmove', this.windowTouchMoveListener);
            window.removeEventListener('touchend', this.windowTouchEndListener);
            this.windowTouchMoveListener = null;
            this.windowTouchEndListener = null;
            event.preventDefault();
        }
    }
    onMouseMove(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }
    onTouchMove(event) {
        if (!this.disabled && !this.readonly && event.touches.length == 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            this.updateValue(offsetX, offsetY);
        }
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    containerClass() {
        return {
            'p-knob p-component': true,
            'p-disabled': this.disabled
        };
    }
    rangePath() {
        return `M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`;
    }
    valuePath() {
        return `M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`;
    }
    zeroRadians() {
        if (this.min > 0 && this.max > 0)
            return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
        else
            return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
    }
    valueRadians() {
        return this.mapRange(this._value, this.min, this.max, this.minRadians, this.maxRadians);
    }
    minX() {
        return this.midX + Math.cos(this.minRadians) * this.radius;
    }
    minY() {
        return this.midY - Math.sin(this.minRadians) * this.radius;
    }
    maxX() {
        return this.midX + Math.cos(this.maxRadians) * this.radius;
    }
    maxY() {
        return this.midY - Math.sin(this.maxRadians) * this.radius;
    }
    zeroX() {
        return this.midX + Math.cos(this.zeroRadians()) * this.radius;
    }
    zeroY() {
        return this.midY - Math.sin(this.zeroRadians()) * this.radius;
    }
    valueX() {
        return this.midX + Math.cos(this.valueRadians()) * this.radius;
    }
    valueY() {
        return this.midY - Math.sin(this.valueRadians()) * this.radius;
    }
    largeArc() {
        return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
    }
    sweep() {
        return this.valueRadians() > this.zeroRadians() ? 0 : 1;
    }
    valueToDisplay() {
        return this.valueTemplate.replace("{value}", this._value.toString());
    }
    get _value() {
        return this.value != null ? this.value : this.min;
    }
}
Knob.decorators = [
    { type: Component, args: [{
                selector: 'p-knob',
                template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
        <svg viewBox="0 0 100 100" [style.width]="size" [style.height]="size" (click)="onClick($event)" (mousedown)="onMouseDown($event)" (mouseup)="onMouseUp($event)"
            (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
            <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
            <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
            <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{valueToDisplay()}}</text>
        </svg>
        </div>
    `,
                providers: [KNOB_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-fill-mode:forwards;animation-name:dash-frame;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}"]
            },] }
];
Knob.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
Knob.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    severity: [{ type: Input }],
    valueColor: [{ type: Input }],
    rangeColor: [{ type: Input }],
    textColor: [{ type: Input }],
    valueTemplate: [{ type: Input }],
    name: [{ type: Input }],
    size: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    strokeWidth: [{ type: Input }],
    disabled: [{ type: Input }],
    showValue: [{ type: Input }],
    readonly: [{ type: Input }],
    onChange: [{ type: Output }]
};
export class KnobModule {
}
KnobModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Knob],
                declarations: [Knob]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vYi5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMva25vYi8iLCJzb3VyY2VzIjpbImtub2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2SyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQVE7SUFDcEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUNuQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFtQkYsTUFBTSxPQUFPLElBQUk7SUE0RGIsWUFBb0IsRUFBcUIsRUFBVSxFQUFjO1FBQTdDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXBEeEQsZUFBVSxHQUFXLDZCQUE2QixDQUFDO1FBRW5ELGVBQVUsR0FBVyw2QkFBNkIsQ0FBQztRQUVuRCxjQUFTLEdBQVcsb0NBQW9DLENBQUM7UUFFekQsa0JBQWEsR0FBVyxTQUFTLENBQUM7UUFJbEMsU0FBSSxHQUFXLEdBQUcsQ0FBQztRQUVuQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRWpCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFFaEIsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUVsQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUl6QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFekIsYUFBUSxHQUFzQixJ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SUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNqSCxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUN0SixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFFckYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9ELENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvRCxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNuRSxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbkUsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxLQUFLO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN0RCxDQUFDOzs7WUFuUUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO2dCQUNELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBRXhDOzs7WUExQjRGLGlCQUFpQjtZQUFFLFVBQVU7Ozt5QkE2QnJILEtBQUs7b0JBRUwsS0FBSzt1QkFFTCxLQUFLO3lCQUVMLEtBQUs7eUJBRUwsS0FBSzt3QkFFTCxLQUFLOzRCQUVMLEtBQUs7bUJBRUwsS0FBSzttQkFFTCxLQUFLO21CQUVMLEtBQUs7a0JBRUwsS0FBSztrQkFFTCxLQUFLOzBCQUVMLEtBQUs7dUJBRUwsS0FBSzt3QkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsTUFBTTs7QUF3TlgsTUFBTSxPQUFPLFVBQVU7OztZQUx0QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IEtOT0JfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBLbm9iKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWtub2InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBbc3R5bGUud2lkdGhdPVwic2l6ZVwiIFtzdHlsZS5oZWlnaHRdPVwic2l6ZVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIiAobW91c2V1cCk9XCJvbk1vdXNlVXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIj5cbiAgICAgICAgICAgIDxwYXRoIFthdHRyLmRdPVwicmFuZ2VQYXRoKClcIiBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIiBbYXR0ci5zdHJva2VdPVwicmFuZ2VDb2xvclwiIGNsYXNzPVwicC1rbm9iLXJhbmdlXCI+PC9wYXRoPlxuICAgICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJ2YWx1ZVBhdGgoKVwiIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiIFthdHRyLnN0cm9rZV09XCJ2YWx1ZUNvbG9yXCIgY2xhc3M9XCJwLWtub2ItdmFsdWVcIj48L3BhdGg+XG4gICAgICAgICAgICA8dGV4dCAqbmdJZj1cInNob3dWYWx1ZVwiIFthdHRyLnhdPVwiNTBcIiBbYXR0ci55XT1cIjU3XCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBbYXR0ci5maWxsXT1cInRleHRDb2xvclwiIGNsYXNzPVwicC1rbm9iLXRleHRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIj57e3ZhbHVlVG9EaXNwbGF5KCl9fTwvdGV4dD5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbS05PQl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9rbm9iLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEtub2Ige1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB2YWx1ZUNvbG9yOiBzdHJpbmcgPSBcInZhcigtLXByaW1hcnktY29sb3IsIEJsYWNrKVwiO1xuXG4gICAgQElucHV0KCkgcmFuZ2VDb2xvcjogc3RyaW5nID0gXCJ2YXIoLS1zdXJmYWNlLWQsIExpZ2h0R3JheSlcIjtcblxuICAgIEBJbnB1dCgpIHRleHRDb2xvcjogc3RyaW5nID0gXCJ2YXIoLS10ZXh0LWNvbG9yLXNlY29uZGFyeSwgQmxhY2spXCI7XG5cbiAgICBASW5wdXQoKSB2YWx1ZVRlbXBsYXRlOiBzdHJpbmcgPSBcInt2YWx1ZX1cIjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlciA9IDEwMDtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlciA9IDEwMDtcblxuICAgIEBJbnB1dCgpIHN0cm9rZVdpZHRoOiBudW1iZXIgPSAxNDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcmFkaXVzOiBudW1iZXIgPSA0MDtcblxuICAgIG1pZFg6IG51bWJlciA9IDUwO1xuXG4gICAgbWlkWTogbnVtYmVyID0gNTA7XG5cbiAgICBtaW5SYWRpYW5zOiBudW1iZXIgPSA0ICogTWF0aC5QSSAvIDM7XG5cbiAgICBtYXhSYWRpYW5zOiBudW1iZXIgPSAtTWF0aC5QSSAvIDM7XG4gICAgXG4gICAgdmFsdWU6IG51bWJlciA9IG51bGw7XG5cbiAgICB3aW5kb3dNb3VzZU1vdmVMaXN0ZW5lcjogYW55O1xuXG4gICAgd2luZG93TW91c2VVcExpc3RlbmVyOiBhbnk7XG5cbiAgICB3aW5kb3dUb3VjaE1vdmVMaXN0ZW5lcjogYW55O1xuXG4gICAgd2luZG93VG91Y2hFbmRMaXN0ZW5lcjogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgbWFwUmFuZ2UoeCwgaW5NaW4sIGluTWF4LCBvdXRNaW4sIG91dE1heCkge1xuICAgICAgICByZXR1cm4gKHggLSBpbk1pbikgKiAob3V0TWF4IC0gb3V0TWluKSAvIChpbk1heCAtIGluTWluKSArIG91dE1pbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgbGV0IGR4ID0gb2Zmc2V0WCAtIHRoaXMuc2l6ZSAvIDI7XG4gICAgICAgIGxldCBkeSA9ICB0aGlzLnNpemUgLyAyIC0gb2Zmc2V0WTtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICBsZXQgc3RhcnQgPSAtTWF0aC5QSSAvIDIgLSBNYXRoLlBJIC8gNjtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChhbmdsZSwgc3RhcnQpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGFuZ2xlLCBzdGFydCkge1xuICAgICAgICBsZXQgbWFwcGVkVmFsdWU7XG4gICAgICAgIGlmIChhbmdsZSA+IHRoaXMubWF4UmFkaWFucylcbiAgICAgICAgICAgIG1hcHBlZFZhbHVlID0gdGhpcy5tYXBSYW5nZShhbmdsZSwgdGhpcy5taW5SYWRpYW5zLCB0aGlzLm1heFJhZGlhbnMsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlIDwgc3RhcnQpXG4gICAgICAgICAgICBtYXBwZWRWYWx1ZSA9IHRoaXMubWFwUmFuZ2UoYW5nbGUgKyAyICogTWF0aC5QSSwgdGhpcy5taW5SYWRpYW5zLCB0aGlzLm1heFJhZGlhbnMsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBNYXRoLnJvdW5kKChtYXBwZWRWYWx1ZSAtIHRoaXMubWluKSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXAgKyB0aGlzLm1pbjtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93TW91c2VNb3ZlTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcylcbiAgICAgICAgICAgIHRoaXMud2luZG93TW91c2VVcExpc3RlbmVyID0gdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMud2luZG93TW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMud2luZG93TW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLndpbmRvd1RvdWNoTW92ZUxpc3RlbmVyID0gdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaEVuZExpc3RlbmVyID0gdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLndpbmRvd1RvdWNoRW5kTGlzdGVuZXIpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLndpbmRvd1RvdWNoRW5kTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndpbmRvd1RvdWNoRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudGFyZ2V0VG91Y2hlcy5pdGVtKDApO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHRvdWNoLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gdG91Y2guY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWtub2IgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmFuZ2VQYXRoKCkge1xuICAgICAgICByZXR1cm4gYE0gJHt0aGlzLm1pblgoKX0gJHt0aGlzLm1pblkoKX0gQSAke3RoaXMucmFkaXVzfSAke3RoaXMucmFkaXVzfSAwIDEgMSAke3RoaXMubWF4WCgpfSAke3RoaXMubWF4WSgpfWA7XG4gICAgfVxuXG4gICAgdmFsdWVQYXRoKCkge1xuICAgICAgICByZXR1cm4gYE0gJHt0aGlzLnplcm9YKCl9ICR7dGhpcy56ZXJvWSgpfSBBICR7dGhpcy5yYWRpdXN9ICR7dGhpcy5yYWRpdXN9IDAgJHt0aGlzLmxhcmdlQXJjKCl9ICR7dGhpcy5zd2VlcCgpfSAke3RoaXMudmFsdWVYKCl9ICR7dGhpcy52YWx1ZVkoKX1gO1xuICAgIH1cblxuICAgIHplcm9SYWRpYW5zKCkge1xuICAgICAgICBpZiAodGhpcy5taW4gPiAwICYmIHRoaXMubWF4ID4gMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcFJhbmdlKHRoaXMubWluLCB0aGlzLm1pbiwgdGhpcy5tYXgsIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwUmFuZ2UoMCwgdGhpcy5taW4sIHRoaXMubWF4LCB0aGlzLm1pblJhZGlhbnMsIHRoaXMubWF4UmFkaWFucyk7XG4gICAgfVxuXG4gICAgdmFsdWVSYWRpYW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBSYW5nZSh0aGlzLl92YWx1ZSwgdGhpcy5taW4sIHRoaXMubWF4LCB0aGlzLm1pblJhZGlhbnMsIHRoaXMubWF4UmFkaWFucyk7XG4gICAgfVxuXG4gICAgbWluWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWCArIE1hdGguY29zKHRoaXMubWluUmFkaWFucykgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBtaW5ZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRZIC0gTWF0aC5zaW4odGhpcy5taW5SYWRpYW5zKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIG1heFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFggKyBNYXRoLmNvcyh0aGlzLm1heFJhZGlhbnMpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgbWF4WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWSAtIE1hdGguc2luKHRoaXMubWF4UmFkaWFucykgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICB6ZXJvWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWCArIE1hdGguY29zKHRoaXMuemVyb1JhZGlhbnMoKSkgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICB6ZXJvWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWSAtIE1hdGguc2luKHRoaXMuemVyb1JhZGlhbnMoKSkgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICB2YWx1ZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFggKyBNYXRoLmNvcyh0aGlzLnZhbHVlUmFkaWFucygpKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIHZhbHVlWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWSAtIE1hdGguc2luKHRoaXMudmFsdWVSYWRpYW5zKCkpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgbGFyZ2VBcmMoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnplcm9SYWRpYW5zKCkgLSB0aGlzLnZhbHVlUmFkaWFucygpKSA8IE1hdGguUEkgPyAwIDogMTtcbiAgICB9XG5cbiAgICBzd2VlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVSYWRpYW5zKCkgPiB0aGlzLnplcm9SYWRpYW5zKCkgPyAwIDogMTtcbiAgICB9XG5cbiAgICB2YWx1ZVRvRGlzcGxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVUZW1wbGF0ZS5yZXBsYWNlKFwie3ZhbHVlfVwiLCB0aGlzLl92YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgX3ZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlICE9IG51bGwgPyB0aGlzLnZhbHVlIDogdGhpcy5taW47XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtLbm9iXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtLbm9iXVxufSlcbmV4cG9ydCBjbGFzcyBLbm9iTW9kdWxlIHsgfVxuIl19