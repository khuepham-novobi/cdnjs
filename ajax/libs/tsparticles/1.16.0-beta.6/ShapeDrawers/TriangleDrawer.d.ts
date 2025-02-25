import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../Core/Interfaces/ISide";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IParticle } from "../Core/Interfaces/IParticle";
export declare class TriangleDrawer extends PolygonDrawerBase {
    getSidesData(particle: IParticle, radius: number): ISide;
    getCenter(particle: IParticle, radius: number): ICoordinates;
}
