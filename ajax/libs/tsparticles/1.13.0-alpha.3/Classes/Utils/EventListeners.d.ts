import type { Container } from "../Container";
export declare class EventListeners {
    private readonly container;
    private readonly mouseMoveHandler;
    private readonly touchStartHandler;
    private readonly touchMoveHandler;
    private readonly touchEndHandler;
    private readonly mouseLeaveHandler;
    private readonly touchCancelHandler;
    private readonly touchEndClickHandler;
    private readonly mouseUpHandler;
    private readonly visibilityChangeHandler;
    private readonly resizeHandler;
    private canPush;
    constructor(container: Container);
    private static manageListener;
    private static addListener;
    private static removeListener;
    addListeners(): void;
    removeListeners(): void;
    private manageListeners;
    private handleWindowResize;
    private handleVisibilityChange;
    private mouseTouchMove;
    private mouseTouchFinish;
    private mouseTouchClick;
    private doMouseTouchClick;
}
