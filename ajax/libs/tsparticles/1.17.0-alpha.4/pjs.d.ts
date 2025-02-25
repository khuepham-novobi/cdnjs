import type { RecursivePartial } from "./Types/RecursivePartial";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { Container } from "./Core/Container";
import type { MainSlim } from "./main.slim";
export interface IParticlesJS {
    (tagId: string, params: RecursivePartial<IOptions>): Promise<Container | undefined>;
    load(tagId: string, pathConfigJson: string, callback: (container: Container) => void): void;
    setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}
declare const initPjs: (main: MainSlim) => {
    particlesJS: IParticlesJS;
    pJSDom: Container[];
};
export { initPjs };
