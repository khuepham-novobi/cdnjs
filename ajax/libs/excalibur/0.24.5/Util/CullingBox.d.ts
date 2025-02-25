import { Actor } from '../Actor';
import { Engine } from '../Engine';
export declare class CullingBox {
    private _topLeft;
    private _topRight;
    private _bottomLeft;
    private _bottomRight;
    private _xCoords;
    private _yCoords;
    private _xMin;
    private _yMin;
    private _xMax;
    private _yMax;
    private _xMinWorld;
    private _yMinWorld;
    private _xMaxWorld;
    private _yMaxWorld;
    isSpriteOffScreen(actor: Actor, engine: Engine): boolean;
    debugDraw(ctx: CanvasRenderingContext2D): void;
}
