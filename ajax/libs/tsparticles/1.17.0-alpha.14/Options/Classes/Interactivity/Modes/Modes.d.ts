import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import { Bubble } from "./Bubble";
import { Connect } from "./Connect";
import { Grab } from "./Grab";
import { Remove } from "./Remove";
import { Push } from "./Push";
import { Repulse } from "./Repulse";
import { Slow } from "./Slow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { Trail } from "./Trail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
export declare class Modes implements IModes, IOptionLoader<IModes> {
    bubble: Bubble;
    connect: Connect;
    grab: Grab;
    push: Push;
    remove: Remove;
    repulse: Repulse;
    slow: Slow;
    trail: Trail;
    constructor();
    load(data?: RecursivePartial<IModes>): void;
}
