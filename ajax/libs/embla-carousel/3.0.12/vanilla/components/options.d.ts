import { AlignmentOption } from './alignment';
import { AxisOption } from './axis';
import { ScrollContainOption } from './scrollContain';
export declare type Options = {
    align: AlignmentOption;
    axis: AxisOption;
    containScroll: ScrollContainOption;
    containerSelector: string;
    dragFree: boolean;
    draggable: boolean;
    draggableClass: string;
    draggingClass: string;
    inViewThreshold: number;
    loop: boolean;
    selectedClass: string;
    slidesToScroll: number;
    speed: number;
    startIndex: number;
};
export declare const defaultOptions: Options;
export declare type EmblaOptions = Partial<Options>;
