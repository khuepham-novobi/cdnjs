import { NgModule, Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild, OnInit, EventEmitter, Output, forwardRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const INPUTNUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
export class InputNumber {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.showButtons = false;
        this.format = true;
        this.buttonLayout = "stacked";
        this.useGrouping = true;
        this.incrementButtonIcon = 'pi pi-angle-up';
        this.decrementButtonIcon = 'pi pi-angle-down';
        this.mode = "decimal";
        this.step = 1;
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._decimal = this.getDecimalExpression();
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._suffix = new RegExp(`[${this.suffix || ''}]`, 'g');
        this._prefix = new RegExp(`[${this.prefix || ''}]`, 'g');
        this._index = d => index.get(d);
    }
    formatValue(value) {
        if (value != null) {
            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);
                if (this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }
                if (this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }
                return formattedValue;
            }
            return value;
        }
        return '';
    }
    formattedValue() {
        return this.formatValue(this.value);
    }
    onInput(event) {
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }
    onInputKeyDown(event) {
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
        if (event.altKey) {
            event.preventDefault();
        }
        switch (event.which) {
            //up
            case 38:
                this.spin(event, 1);
                event.preventDefault();
                break;
            //down
            case 40:
                this.spin(event, -1);
                event.preventDefault();
                break;
            //left
            case 37:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                    event.preventDefault();
                }
                break;
            //right
            case 39:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                    event.preventDefault();
                }
                break;
            //backspace
            case 8: {
                event.preventDefault();
                let newValueStr = null;
                if (selectionStart === selectionEnd) {
                    let deleteChar = inputValue.charAt(selectionStart - 1);
                    let decimalCharIndex = inputValue.search(this._decimal);
                    this._decimal.lastIndex = 0;
                    if (this.isNumeralChar(deleteChar)) {
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }
                    if (newValueStr != null) {
                        this.updateValue(event, newValueStr, 'delete-single');
                    }
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, 'delete-range');
                }
                break;
            }
            default:
                break;
        }
    }
    onInputKeyPress(event) {
        event.preventDefault();
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        if ((48 <= code && code <= 57) || this.isMinusSign(char)) {
            this.insert(event, char);
        }
    }
    onPaste(event) {
        event.preventDefault();
        let data = (event.clipboardData || window['clipboardData']).getData('Text');
        if (data) {
            let filteredData = this.parseValue(data);
            if (filteredData != null) {
                this.insert(event, filteredData.toString());
            }
        }
    }
    onInputClick() {
        this.initCursor();
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);
        this.onBlur.emit(event);
    }
    onUpButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
    }
    onUpButtonMouseUp() {
        this.clearTimer();
    }
    onUpButtonMouseLeave() {
        this.clearTimer();
    }
    onUpButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }
    onUpButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
    }
    onDownButtonMouseUp() {
        this.clearTimer();
    }
    onDownButtonMouseLeave() {
        this.clearTimer();
    }
    onDownButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.input.nativeElement.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, 'spin');
        this.updateModel(event, newValue);
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    insert(event, text) {
        let selectionStart = this.input.nativeElement.selectionStart;
        let selectionEnd = this.input.nativeElement.selectionEnd;
        let inputValue = this.input.nativeElement.value.trim();
        let maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
        let newValueStr;
        let decimalCharIndex = inputValue.search(this._decimal);
        this._decimal.lastIndex = 0;
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
            if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length);
                this.updateValue(event, newValueStr, 'insert');
            }
        }
        else {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, 'insert');
        }
    }
    insertText(value, text, start, end) {
        let newValueStr;
        if ((end - start) === value.length)
            newValueStr = text;
        else if (start === 0)
            newValueStr = text + value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start) + text;
        else
            newValueStr = value.slice(0, start) + text + value.slice(end);
        return newValueStr;
    }
    initCursor() {
        let selectionStart = this.input.nativeElement.selectionStart;
        let inputValue = this.input.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;
        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return;
        }
        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i;
                break;
            }
            else {
                i--;
            }
        }
        if (index !== null) {
            this.input.nativeElement.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart + 1;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i;
                    break;
                }
                else {
                    i++;
                }
            }
            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index, index);
            }
        }
    }
    updateInput(value, operation) {
        let currentLength = this.input.nativeElement.value.length;
        if (currentLength === 0) {
            this.input.nativeElement.value = this.formatValue(value);
            this.input.nativeElement.setSelectionRange(0, 0);
            this.initCursor();
            this.input.nativeElement.setSelectionRange(this.input.nativeElement.selectionStart + 1, this.input.nativeElement.selectionStart + 1);
        }
        else {
            let selectionStart = this.input.nativeElement.selectionEnd;
            let selectionEnd = this.input.nativeElement.selectionEnd;
            let formattedValue = this.formatValue(value);
            if (this.maxlength && this.maxlength < formattedValue.length) {
                return;
            }
            this.input.nativeElement.value = this.formatValue(value);
            let newLength = this.input.nativeElement.value.length;
            if (newLength === currentLength) {
                if (operation === 'insert')
                    this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range')
                    this.input.nativeElement.setSelectionRange(selectionStart, selectionStart);
                else if (operation === 'spin')
                    this.input.nativeElement.setSelectionRange(selectionStart, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }
        this.input.nativeElement.setAttribute('aria-valuenow', value);
    }
    updateModel(event, value) {
        this.value = value;
        this.onModelChange(value);
    }
    updateValue(event, valueStr, operation) {
        if (valueStr != null) {
            let newValue = this.parseValue(valueStr);
            this.updateInput(newValue, operation);
        }
    }
    validateValue(value) {
        if (this.min !== null && value < this.min) {
            return this.min;
        }
        if (this.max !== null && value > this.max) {
            return this.max;
        }
        return value;
    }
    deleteRange(value, start, end) {
        let newValueStr;
        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
    }
    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        return false;
    }
    isMinusSign(char) {
        if (this._minusSign.test(char)) {
            this._minusSign.lastIndex = 0;
            return true;
        }
        return false;
    }
    parseValue(text) {
        let filteredText = text.trim()
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._group, '')
            .replace(this._suffix, '')
            .replace(this._prefix, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);
        if (filteredText) {
            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
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
    }
    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    }
    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(1.1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        return new RegExp(`[${formatter.format(1000).trim().replace(this._numeral, '')}]`, 'g');
    }
    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getCurrencyExpression() {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay });
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, '')}]`, 'g');
        }
        return new RegExp(`[]`, 'g');
    }
    get filled() {
        return (this.value != null && this.value.toString().length > 0);
    }
    resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    }
}
InputNumber.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
InputNumber.decorators = [
    { type: Component, args: [{
                selector: 'p-inputNumber',
                template: `
        <span [ngClass]="{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}" 
                [ngStyle]="style" [class]="styleClass">
            <input #input [ngClass]="'p-inputnumber-input'" [ngStyle]="inputStyle" [class]="inputStyleClass" pInputText [value]="formattedValue()" [attr.placeholder]="placeholder" [attr.title]="title" [attr.id]="inputId"
                [attr.size]="size" [attr.name]="name" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired" [disabled]="disabled" [attr.required]="required" [attr.aria-valumin]="min" [attr.aria-valuemax]="max"
                (input)="onInput($event)" (keydown)="onInputKeyDown($event)" (keypress)="onInputKeyPress($event)" (paste)="onPaste($event)" (click)="onInputClick()"
                (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
            </span>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
        </span>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [INPUTNUMBER_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.p-inputwrapper-filled]': 'filled',
                    '[class.p-inputwrapper-focus]': 'focused'
                },
                styles: [".p-inputnumber{display:-ms-inline-flexbox;display:inline-flex}.p-inputnumber-button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex:0 0 auto;flex:0 0 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{-ms-flex:1 1 auto;flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{-ms-flex-order:3;order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{-ms-flex-order:2;order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{-ms-flex-order:1;order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{-ms-flex-direction:column;flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{-ms-flex-order:1;order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{-ms-flex-order:2;order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{-ms-flex-order:3;order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{-ms-flex:1 1 auto;flex:1 1 auto}.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}"]
            },] }
];
InputNumber.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
InputNumber.propDecorators = {
    showButtons: [{ type: Input }],
    format: [{ type: Input }],
    buttonLayout: [{ type: Input }],
    prefix: [{ type: Input }],
    locale: [{ type: Input }],
    suffix: [{ type: Input }],
    localeMatcher: [{ type: Input }],
    currency: [{ type: Input }],
    currencyDisplay: [{ type: Input }],
    useGrouping: [{ type: Input }],
    disabled: [{ type: Input }],
    inputId: [{ type: Input }],
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    placeholder: [{ type: Input }],
    size: [{ type: Input }],
    maxlength: [{ type: Input }],
    tabindex: [{ type: Input }],
    title: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    ariaRequired: [{ type: Input }],
    name: [{ type: Input }],
    required: [{ type: Input }],
    autocomplete: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    minFractionDigits: [{ type: Input }],
    maxFractionDigits: [{ type: Input }],
    incrementButtonClass: [{ type: Input }],
    decrementButtonClass: [{ type: Input }],
    incrementButtonIcon: [{ type: Input }],
    decrementButtonIcon: [{ type: Input }],
    mode: [{ type: Input }],
    step: [{ type: Input }],
    inputStyle: [{ type: Input }],
    inputStyleClass: [{ type: Input }],
    input: [{ type: ViewChild, args: ['input',] }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }]
};
export class InputNumberModule {
}
InputNumberModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, InputTextModule, ButtonModule],
                exports: [InputNumber],
                declarations: [InputNumber]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRudW1iZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2lucHV0bnVtYmVyLyIsInNvdXJjZXMiOlsiaW5wdXRudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZMLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBUTtJQUMzQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWlDRixNQUFNLE9BQU8sV0FBVztJQWdIcEIsWUFBbUIsRUFBYyxFQUFVLEVBQXFCO1FBQTdDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTlHdkQsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQWNqQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQTBDNUIsd0JBQW1CLEdBQVcsZ0JBQWdCLENBQUM7UUFFL0Msd0JBQW1CLEdBQVcsa0JBQWtCLENBQUM7UUFFakQsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6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QkFDRiwrQkFBK0IsRUFBRSxRQUFRO29CQUN6Qyw4QkFBOEIsRUFBRSxTQUFTO2lCQUM1Qzs7YUFDSjs7O1lBMUMwRCxVQUFVO1lBQTBFLGlCQUFpQjs7OzBCQTZDM0osS0FBSztxQkFFTCxLQUFLOzJCQUVMLEtBQUs7cUJBRUwsS0FBSztxQkFFTCxLQUFLO3FCQUVMLEtBQUs7NEJBRUwsS0FBSzt1QkFFTCxLQUFLOzhCQUVMLEtBQUs7MEJBRUwsS0FBSzt1QkFFTCxLQUFLO3NCQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsS0FBSzt3QkFFTCxLQUFLO3VCQUVMLEtBQUs7b0JBRUwsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLEtBQUs7bUJBRUwsS0FBSzt1QkFFTCxLQUFLOzJCQUVMLEtBQUs7a0JBRUwsS0FBSztrQkFFTCxLQUFLO2dDQUVMLEtBQUs7Z0NBRUwsS0FBSzttQ0FFTCxLQUFLO21DQUVMLEtBQUs7a0NBRUwsS0FBSztrQ0FFTCxLQUFLO21CQUVMLEtBQUs7bUJBRUwsS0FBSzt5QkFFTCxLQUFLOzhCQUVMLEtBQUs7b0JBRUwsU0FBUyxTQUFDLE9BQU87c0JBRWpCLE1BQU07cUJBRU4sTUFBTTs7QUEwaUJYLE1BQU0sT0FBTyxpQkFBaUI7OztZQUw3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7Z0JBQ3JELE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgZm9yd2FyZFJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IElOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXROdW1iZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0TnVtYmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3AtaW5wdXRudW1iZXIgcC1jb21wb25lbnQnOiB0cnVlLCdwLWlucHV0bnVtYmVyLWJ1dHRvbnMtc3RhY2tlZCc6IHRoaXMuc2hvd0J1dHRvbnMgJiYgdGhpcy5idXR0b25MYXlvdXQgPT09ICdzdGFja2VkJyxcbiAgICAgICAgICAgICAgICAncC1pbnB1dG51bWJlci1idXR0b25zLWhvcml6b250YWwnOiB0aGlzLnNob3dCdXR0b25zICYmIHRoaXMuYnV0dG9uTGF5b3V0ID09PSAnaG9yaXpvbnRhbCcsICdwLWlucHV0bnVtYmVyLWJ1dHRvbnMtdmVydGljYWwnOiB0aGlzLnNob3dCdXR0b25zICYmIHRoaXMuYnV0dG9uTGF5b3V0ID09PSAndmVydGljYWwnfVwiIFxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXQgW25nQ2xhc3NdPVwiJ3AtaW5wdXRudW1iZXItaW5wdXQnXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBwSW5wdXRUZXh0IFt2YWx1ZV09XCJmb3JtYXR0ZWRWYWx1ZSgpXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbYXR0ci50aXRsZV09XCJ0aXRsZVwiIFthdHRyLmlkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLmF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJhcmlhUmVxdWlyZWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFthdHRyLmFyaWEtdmFsdW1pbl09XCJtaW5cIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlEb3duKCRldmVudClcIiAoa2V5cHJlc3MpPVwib25JbnB1dEtleVByZXNzKCRldmVudClcIiAocGFzdGUpPVwib25QYXN0ZSgkZXZlbnQpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaW5wdXRudW1iZXItYnV0dG9uLWdyb3VwXCIgKm5nSWY9XCJzaG93QnV0dG9ucyAmJiBidXR0b25MYXlvdXQgPT09ICdzdGFja2VkJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieydwLWlucHV0bnVtYmVyLWJ1dHRvbiBwLWlucHV0bnVtYmVyLWJ1dHRvbi11cCc6IHRydWV9XCIgW2NsYXNzXT1cImluY3JlbWVudEJ1dHRvbkNsYXNzXCIgW2ljb25dPVwiaW5jcmVtZW50QnV0dG9uSWNvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGhpcy5vblVwQnV0dG9uTW91c2VEb3duKCRldmVudClcIiAobW91c2V1cCk9XCJvblVwQnV0dG9uTW91c2VVcCgpXCIgKG1vdXNlbGVhdmUpPVwib25VcEJ1dHRvbk1vdXNlTGVhdmUoKVwiIChrZXlkb3duKT1cIm9uVXBCdXR0b25LZXlEb3duKCRldmVudClcIiAoa2V5dXApPVwib25VcEJ1dHRvbktleVVwKClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtuZ0NsYXNzXT1cInsncC1pbnB1dG51bWJlci1idXR0b24gcC1pbnB1dG51bWJlci1idXR0b24tZG93bic6IHRydWV9XCIgW2NsYXNzXT1cImRlY3JlbWVudEJ1dHRvbkNsYXNzXCIgW2ljb25dPVwiZGVjcmVtZW50QnV0dG9uSWNvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGhpcy5vbkRvd25CdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uRG93bkJ1dHRvbk1vdXNlVXAoKVwiIChtb3VzZWxlYXZlKT1cIm9uRG93bkJ1dHRvbk1vdXNlTGVhdmUoKVwiIChrZXlkb3duKT1cIm9uRG93bkJ1dHRvbktleURvd24oJGV2ZW50KVwiIChrZXl1cCk9XCJvbkRvd25CdXR0b25LZXlVcCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtuZ0NsYXNzXT1cInsncC1pbnB1dG51bWJlci1idXR0b24gcC1pbnB1dG51bWJlci1idXR0b24tdXAnOiB0cnVlfVwiIFtjbGFzc109XCJpbmNyZW1lbnRCdXR0b25DbGFzc1wiIFtpY29uXT1cImluY3JlbWVudEJ1dHRvbkljb25cIiAqbmdJZj1cInNob3dCdXR0b25zICYmIGJ1dHRvbkxheW91dCAhPT0gJ3N0YWNrZWQnXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cInRoaXMub25VcEJ1dHRvbk1vdXNlRG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25VcEJ1dHRvbk1vdXNlVXAoKVwiIChtb3VzZWxlYXZlKT1cIm9uVXBCdXR0b25Nb3VzZUxlYXZlKClcIiAoa2V5ZG93bik9XCJvblVwQnV0dG9uS2V5RG93bigkZXZlbnQpXCIgKGtleXVwKT1cIm9uVXBCdXR0b25LZXlVcCgpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtuZ0NsYXNzXT1cInsncC1pbnB1dG51bWJlci1idXR0b24gcC1pbnB1dG51bWJlci1idXR0b24tZG93bic6IHRydWV9XCIgW2NsYXNzXT1cImRlY3JlbWVudEJ1dHRvbkNsYXNzXCIgW2ljb25dPVwiZGVjcmVtZW50QnV0dG9uSWNvblwiICpuZ0lmPVwic2hvd0J1dHRvbnMgJiYgYnV0dG9uTGF5b3V0ICE9PSAnc3RhY2tlZCdcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGhpcy5vbkRvd25CdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uRG93bkJ1dHRvbk1vdXNlVXAoKVwiIChtb3VzZWxlYXZlKT1cIm9uRG93bkJ1dHRvbk1vdXNlTGVhdmUoKVwiIChrZXlkb3duKT1cIm9uRG93bkJ1dHRvbktleURvd24oJGV2ZW50KVwiIChrZXl1cCk9XCJvbkRvd25CdXR0b25LZXlVcCgpXCI+PC9idXR0b24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW0lOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2lucHV0bnVtYmVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dE51bWJlciBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgXG4gICAgQElucHV0KCkgc2hvd0J1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGZvcm1hdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBidXR0b25MYXlvdXQ6IHN0cmluZyA9IFwic3RhY2tlZFwiO1xuXG4gICAgQElucHV0KCkgcHJlZml4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbG9jYWxlTWF0Y2hlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3k6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXNlR3JvdXBpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFSZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBpbmNyZW1lbnRCdXR0b25DbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGVjcmVtZW50QnV0dG9uQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGluY3JlbWVudEJ1dHRvbkljb246IHN0cmluZyA9ICdwaSBwaS1hbmdsZS11cCc7XG5cbiAgICBASW5wdXQoKSBkZWNyZW1lbnRCdXR0b25JY29uOiBzdHJpbmcgPSAncGkgcGktYW5nbGUtZG93bic7XG5cbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSBcImRlY2ltYWxcIjtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiBudW1iZXI7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgaXNTcGVjaWFsQ2hhcjogYm9vbGVhbjtcblxuICAgIHRpbWVyOiBhbnk7XG5cbiAgICBsYXN0VmFsdWU6IHN0cmluZztcblxuICAgIF9udW1lcmFsOiBhbnk7XG5cbiAgICBudW1iZXJGb3JtYXQ6IGFueTtcblxuICAgIF9kZWNpbWFsOiBhbnk7XG5cbiAgICBfZ3JvdXA6IGFueTtcblxuICAgIF9taW51c1NpZ246IGFueTtcblxuICAgIF9jdXJyZW5jeTogYW55O1xuXG4gICAgX3ByZWZpeDogYW55O1xuXG4gICAgX3N1ZmZpeDogYW55O1xuXG4gICAgX2luZGV4OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm51bWJlckZvcm1hdCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICAgICAgICBjb25zdCBudW1lcmFscyA9IFsuLi5uZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHt1c2VHcm91cGluZzogZmFsc2V9KS5mb3JtYXQoOTg3NjU0MzIxMCldLnJldmVyc2UoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBuZXcgTWFwKG51bWVyYWxzLm1hcCgoZCwgaSkgPT4gW2QsIGldKSk7XG4gICAgICAgIHRoaXMuX251bWVyYWwgPSBuZXcgUmVnRXhwKGBbJHtudW1lcmFscy5qb2luKCcnKX1dYCwgJ2cnKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbCA9IHRoaXMuZ2V0RGVjaW1hbEV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5fZ3JvdXAgPSB0aGlzLmdldEdyb3VwaW5nRXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24gPSB0aGlzLmdldE1pbnVzU2lnbkV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5fY3VycmVuY3kgPSB0aGlzLmdldEN1cnJlbmN5RXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9zdWZmaXggPSBuZXcgUmVnRXhwKGBbJHt0aGlzLnN1ZmZpeHx8Jyd9XWAsICdnJyk7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IG5ldyBSZWdFeHAoYFske3RoaXMucHJlZml4fHwnJ31dYCwgJ2cnKTtcbiAgICAgICAgdGhpcy5faW5kZXggPSBkID0+IGluZGV4LmdldChkKTtcbiAgICB9XG5cbiAgICBmb3JtYXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICAgICAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlci5mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucHJlZml4ICsgZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25JbnB1dChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1NwZWNpYWxDaGFyKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSB0aGlzLmxhc3RWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3BlY2lhbENoYXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbklucHV0S2V5RG93bihldmVudCkge1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgdGhpcy5pc1NwZWNpYWxDaGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IGV2ZW50LnRhcmdldC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgbGV0IHNlbGVjdGlvbkVuZCA9IGV2ZW50LnRhcmdldC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgIGxldCBpbnB1dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL3VwXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2Rvd25cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAtMSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2xlZnRcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTnVtZXJhbENoYXIoaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQgLSAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9yaWdodFxuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmFsQ2hhcihpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25TdGFydCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vYmFja3NwYWNlXG4gICAgICAgICAgICBjYXNlIDg6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZVN0ciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPT09IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZXRlQ2hhciA9IGlucHV0VmFsdWUuY2hhckF0KHNlbGVjdGlvblN0YXJ0IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNpbWFsQ2hhckluZGV4ID0gaW5wdXRWYWx1ZS5zZWFyY2godGhpcy5fZGVjaW1hbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ3JvdXAudGVzdChkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0IC0gMikgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9kZWNpbWFsLnRlc3QoZGVsZXRlQ2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0IC0gMSwgc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlY2ltYWxDaGFySW5kZXggPiAwICYmIHNlbGVjdGlvblN0YXJ0ID4gZGVjaW1hbENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDEpICsgJzAnICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQgLSAxKSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlU3RyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCAnZGVsZXRlLXNpbmdsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMuZGVsZXRlUmFuZ2UoaW5wdXRWYWx1ZSwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCAnZGVsZXRlLXJhbmdlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRLZXlQcmVzcyhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgY29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGxldCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcblxuICAgICAgICBpZiAoKDQ4IDw9IGNvZGUgJiYgY29kZSA8PSA1NykgfHwgdGhpcy5pc01pbnVzU2lnbihjaGFyKSkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnQoZXZlbnQsIGNoYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgZGF0YSA9IChldmVudC5jbGlwYm9hcmREYXRhIHx8IHdpbmRvd1snY2xpcGJvYXJkRGF0YSddKS5nZXREYXRhKCdUZXh0Jyk7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5wYXJzZVZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGZpbHRlcmVkRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoZXZlbnQsIGZpbHRlcmVkRGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgdGhpcy5pbml0Q3Vyc29yKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnZhbGlkYXRlVmFsdWUodGhpcy5wYXJzZVZhbHVlKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSkpO1xuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgbmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uVXBCdXR0b25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblVwQnV0dG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uVXBCdXR0b25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbktleVVwKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2VVcCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uS2V5VXAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3BpbihldmVudCwgZGlyKSB7XG4gICAgICAgIGxldCBzdGVwID0gdGhpcy5zdGVwICogZGlyO1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSkgfHwgMDtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKGN1cnJlbnRWYWx1ZSArIHN0ZXApO1xuICAgICAgICBpZiAodGhpcy5tYXhsZW5ndGggJiYgdGhpcy5tYXhsZW5ndGggPCB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dChuZXdWYWx1ZSwgJ3NwaW4nKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHJlcGVhdChldmVudCwgaW50ZXJ2YWwsIGRpcikge1xuICAgICAgICBsZXQgaSA9IGludGVydmFsIHx8IDUwMDtcblxuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDQwLCBkaXIpO1xuICAgICAgICB9LCBpKTtcblxuICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIGRpcik7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnNlcnQoZXZlbnQsIHRleHQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgICBsZXQgbWF4RnJhY3Rpb25EaWdpdHMgPSB0aGlzLm51bWJlckZvcm1hdC5yZXNvbHZlZE9wdGlvbnMoKS5tYXhpbXVtRnJhY3Rpb25EaWdpdHM7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcbiAgICAgICAgbGV0IGRlY2ltYWxDaGFySW5kZXggPSBpbnB1dFZhbHVlLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIGlmIChkZWNpbWFsQ2hhckluZGV4ID4gMCAmJiBzZWxlY3Rpb25TdGFydCA+IGRlY2ltYWxDaGFySW5kZXgpIHtcbiAgICAgICAgICAgIGlmICgoc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aCAtIChkZWNpbWFsQ2hhckluZGV4ICsgMSkpIDw9IG1heEZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIHRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0ICsgdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMuaW5zZXJ0VGV4dChpbnB1dFZhbHVlLCB0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCAnaW5zZXJ0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnNlcnRUZXh0KHZhbHVlLCB0ZXh0LCBzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcblxuICAgICAgICBpZiAoKGVuZCAtIHN0YXJ0KSA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0ZXh0O1xuICAgICAgICBlbHNlIGlmIChzdGFydCA9PT0gMClcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGV4dCArIHZhbHVlLnNsaWNlKGVuZCk7XG4gICAgICAgIGVsc2UgaWYgKGVuZCA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB2YWx1ZS5zbGljZSgwLCBzdGFydCkgKyB0ZXh0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIHRleHQgKyB2YWx1ZS5zbGljZShlbmQpO1xuXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZVN0cjtcbiAgICB9XG5cbiAgICBpbml0Q3Vyc29yKCkge1xuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGxldCBpbnB1dFZhbHVlID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVMZW5ndGggPSBpbnB1dFZhbHVlLmxlbmd0aDtcbiAgICAgICAgbGV0IGluZGV4ID0gbnVsbDtcblxuICAgICAgICBsZXQgY2hhciA9IGlucHV0VmFsdWUuY2hhckF0KHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sZWZ0XG4gICAgICAgIGxldCBpID0gc2VsZWN0aW9uU3RhcnQgLSAxO1xuICAgICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgICAgICBjaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGNoYXIpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoaW5kZXggKyAxLCBpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaSA9IHNlbGVjdGlvblN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdmFsdWVMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGluZGV4LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dCh2YWx1ZSwgb3BlcmF0aW9uKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aDtcblxuICAgICAgICBpZiAoY3VycmVudExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgKyAxLCB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICYmIHRoaXMubWF4bGVuZ3RoIDwgZm9ybWF0dGVkVmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIGxldCBuZXdMZW5ndGggPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobmV3TGVuZ3RoID09PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ2luc2VydCcpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25FbmQgKyAxLCBzZWxlY3Rpb25FbmQgKyAxKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdkZWxldGUtc2luZ2xlJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCAtIDEsIHNlbGVjdGlvbkVuZCAtIDEpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZS1yYW5nZScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ3NwaW4nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQgKyAobmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHZhbHVlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShldmVudCwgdmFsdWVTdHIsIG9wZXJhdGlvbikge1xuICAgICAgICBpZiAodmFsdWVTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKHZhbHVlU3RyKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQobmV3VmFsdWUsIG9wZXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLm1pbiAhPT0gbnVsbCAmJiB2YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5taW47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXggIT09IG51bGwgJiYgdmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGRlbGV0ZVJhbmdlKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcblxuICAgICAgICBpZiAoKGVuZCAtIHN0YXJ0KSA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSAnJztcbiAgICAgICAgZWxzZSBpZiAoc3RhcnQgPT09IDApXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHZhbHVlLnNsaWNlKGVuZCk7XG4gICAgICAgIGVsc2UgaWYgKGVuZCA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB2YWx1ZS5zbGljZSgwLCBzdGFydCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdmFsdWUuc2xpY2UoZW5kKTtcblxuICAgICAgICByZXR1cm4gbmV3VmFsdWVTdHI7XG4gICAgfVxuXG4gICAgaXNOdW1lcmFsQ2hhcihjaGFyKSB7XG4gICAgICAgIGlmIChjaGFyLmxlbmd0aCA9PT0gMSAmJiAodGhpcy5fbnVtZXJhbC50ZXN0KGNoYXIpIHx8IHRoaXMuX2RlY2ltYWwudGVzdChjaGFyKSB8fCB0aGlzLl9ncm91cC50ZXN0KGNoYXIpIHx8IHRoaXMuX21pbnVzU2lnbi50ZXN0KGNoYXIpKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFJlZ2V4KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc01pbnVzU2lnbihjaGFyKSB7XG4gICAgICAgIGlmICh0aGlzLl9taW51c1NpZ24udGVzdChjaGFyKSkge1xuICAgICAgICAgICAgdGhpcy5fbWludXNTaWduLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwYXJzZVZhbHVlKHRleHQpIHtcbiAgICAgICAgbGV0IGZpbHRlcmVkVGV4dCA9IHRleHQudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fZ3JvdXAsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX3N1ZmZpeCwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fcHJlZml4LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9taW51c1NpZ24sICctJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9kZWNpbWFsLCAnLicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgdGhpcy5faW5kZXgpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJlZFRleHQpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZWRWYWx1ZSA9ICtmaWx0ZXJlZFRleHQ7XG4gICAgICAgICAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gbnVsbCA6IHBhcnNlZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cblxuICAgIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhbGVNYXRjaGVyOiB0aGlzLmxvY2FsZU1hdGNoZXIsXG4gICAgICAgICAgICBzdHlsZTogdGhpcy5tb2RlLFxuICAgICAgICAgICAgY3VycmVuY3k6IHRoaXMuY3VycmVuY3ksXG4gICAgICAgICAgICBjdXJyZW5jeURpc3BsYXk6IHRoaXMuY3VycmVuY3lEaXNwbGF5LFxuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRoaXMudXNlR3JvdXBpbmcsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IHRoaXMubWluRnJhY3Rpb25EaWdpdHMsXG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IHRoaXMubWF4RnJhY3Rpb25EaWdpdHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWNpbWFsRXhwcmVzc2lvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7dXNlR3JvdXBpbmc6IGZhbHNlfSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbJHtmb3JtYXR0ZXIuZm9ybWF0KDEuMSkudHJpbSgpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpfV1gLCAnZycpO1xuICAgIH1cblxuICAgIGdldEdyb3VwaW5nRXhwcmVzc2lvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7dXNlR3JvdXBpbmc6IHRydWV9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske2Zvcm1hdHRlci5mb3JtYXQoMTAwMCkudHJpbSgpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpfV1gLCAnZycpO1xuICAgIH1cblxuICAgIGdldE1pbnVzU2lnbkV4cHJlc3Npb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwge3VzZUdyb3VwaW5nOiBmYWxzZX0pO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgWyR7Zm9ybWF0dGVyLmZvcm1hdCgtMSkudHJpbSgpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpfV1gLCAnZycpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbmN5RXhwcmVzc2lvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVuY3kpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwge3N0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogdGhpcy5jdXJyZW5jeSwgY3VycmVuY3lEaXNwbGF5OiB0aGlzLmN1cnJlbmN5RGlzcGxheX0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske2Zvcm1hdHRlci5mb3JtYXQoMSkucmVwbGFjZSgvXFxzL2csICcnKS5yZXBsYWNlKHRoaXMuX251bWVyYWwsICcnKS5yZXBsYWNlKHRoaXMuX2RlY2ltYWwsICcnKS5yZXBsYWNlKHRoaXMuX2dyb3VwLCAnJyl9XWAsICdnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgW11gLCdnJyk7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGxlZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnZhbHVlICE9IG51bGwgJiYgdGhpcy52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDApXG4gICAgfVxuXG4gICAgcmVzZXRSZWdleCgpIHtcbiAgICAgICAgdGhpcy5fbnVtZXJhbC5sYXN0SW5kZXggPSAgMDtcbiAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAgMDtcbiAgICAgICAgdGhpcy5fZ3JvdXAubGFzdEluZGV4ID0gIDA7XG4gICAgICAgIHRoaXMuX21pbnVzU2lnbi5sYXN0SW5kZXggPSAgMDtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGUsIEJ1dHRvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0lucHV0TnVtYmVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dE51bWJlcl1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXROdW1iZXJNb2R1bGUgeyB9XG4iXX0=