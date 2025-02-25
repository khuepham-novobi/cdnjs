import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { DivMode } from "../Enums";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IImage } from "../Core/Interfaces/IImage";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IHsl } from "../Core/Interfaces/IHsl";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
declare type CSSOMString = string;
declare type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
declare type FontFaceSetStatus = "loading" | "loaded";
interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;
    load(): Promise<FontFace>;
}
interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;
    check(font: string, text?: string): boolean;
    load(font: string, text?: string): Promise<FontFace[]>;
}
declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}
declare global {
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
        Path2D?: Path2D;
    }
}
export declare class Utils {
    static isSsr(): boolean;
    static get animate(): (callback: FrameRequestCallback) => number;
    static get cancelAnimation(): (handle: number) => void;
    static replaceColorSvg(image: IImage, color: IHsl, opacity: number): string;
    static clamp(num: number, min: number, max: number): number;
    static isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean;
    static mix(comp1: number, comp2: number, weight1: number, weight2: number): number;
    static getParticleBaseVelocity(particle: IParticle): ICoordinates;
    static getDistances(pointA: ICoordinates, pointB: ICoordinates): {
        dx: number;
        dy: number;
        distance: number;
    };
    static getDistance(pointA: ICoordinates, pointB: ICoordinates): number;
    static loadFont(character: ICharacterShape): Promise<void>;
    static arrayRandomIndex<T>(array: T[]): number;
    static itemFromArray<T>(array: T[], index?: number): T;
    static randomInRange(r1: number, r2: number): number;
    static isPointInside(point: ICoordinates, size: IDimension, radius?: number): boolean;
    static areBoundsInside(bounds: IBounds, size: IDimension): boolean;
    static calculateBounds(point: ICoordinates, radius: number): IBounds;
    static loadImage(source: string): Promise<IImage>;
    static downloadSvgImage(source: string): Promise<IImage>;
    static deepExtend(destination: any, ...sources: any): any;
    static isDivModeEnabled(mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean;
    static divModeExecute(mode: DivMode, divs: SingleOrMultiple<DivEvent>, callback: (id: string, div: DivEvent) => void): void;
    static singleDivModeExecute(div: DivEvent, callback: (id: string, div: DivEvent) => void): void;
    static divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, divId?: string): T | undefined;
}
export {};
