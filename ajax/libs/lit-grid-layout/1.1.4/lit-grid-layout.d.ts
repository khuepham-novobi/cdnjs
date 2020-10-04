import { CSSResult, LitElement, PropertyValues, TemplateResult } from "lit-element";
import "./lit-grid-item";
import type { Layout, LayoutItemElement } from "./types";
export declare class LitGridLayout extends LitElement {
    layout?: Layout;
    sortStyle: "default" | "masonry";
    items: LayoutItemElement[];
    margin: [number, number];
    containerPadding: [number, number];
    rowHeight: number;
    columns: number;
    dragDisabled: boolean;
    resizeDisabled: boolean;
    resizeHandle?: HTMLElement;
    dragHandle?: string;
    resizing?: boolean;
    dragging?: boolean;
    private _width;
    private _layout;
    private _layoutObject;
    private _placeholder?;
    private _oldItemLayout?;
    private _oldItemIndex?;
    private _resizeObserver?;
    get _childrenElements(): LayoutItemElement[];
    get _layoutHeight(): number;
    disconnectedCallback(): void;
    connectedCallback(): void;
    protected updated(changedProps: PropertyValues): void;
    protected render(): TemplateResult;
    private _setupLayout;
    private _updateLayout;
    private _itemResizeStart;
    private _itemResize;
    private _itemResizeEnd;
    private _itemDragStart;
    private _itemDrag;
    private _itemDragEnd;
    private _renderPlaceHolder;
    private _attachObserver;
    private _measureLayoutWidth;
    static get styles(): CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "lit-grid-layout": LitGridLayout;
    }
}
//# sourceMappingURL=lit-grid-layout.d.ts.map