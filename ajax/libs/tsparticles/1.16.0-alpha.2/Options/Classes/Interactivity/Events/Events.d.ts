import type { IEvents } from "../../../Interfaces/Interactivity/Events/IEvents";
import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class Events implements IEvents {
    get onclick(): ClickEvent;
    set onclick(value: ClickEvent);
    get ondiv(): SingleOrMultiple<DivEvent>;
    set ondiv(value: SingleOrMultiple<DivEvent>);
    get onhover(): HoverEvent;
    set onhover(value: HoverEvent);
    onClick: ClickEvent;
    onDiv: SingleOrMultiple<DivEvent>;
    onHover: HoverEvent;
    resize: boolean;
    constructor();
    load(data?: RecursivePartial<IEvents>): void;
}
