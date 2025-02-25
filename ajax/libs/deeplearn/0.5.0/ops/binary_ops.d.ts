import { Tensor } from '../tensor';
export declare class Ops {
    static add<T extends Tensor>(a: Tensor, b: Tensor): T;
    static addStrict<T extends Tensor>(a: T, b: T): T;
    static sub<T extends Tensor>(a: Tensor, b: Tensor): T;
    static subStrict<T extends Tensor>(a: T, b: T): T;
    static pow<T extends Tensor>(base: Tensor, exp: Tensor): T;
    static powStrict<T extends Tensor>(base: T, exp: Tensor): T;
    static mul<T extends Tensor>(a: Tensor, b: Tensor): T;
    static mulStrict<T extends Tensor>(a: T, b: T): T;
    static div<T extends Tensor>(a: Tensor, b: Tensor): T;
    static divStrict<T extends Tensor>(a: T, b: T): T;
    static minimum<T extends Tensor>(a: Tensor, b: Tensor): T;
    static minimumStrict<T extends Tensor>(a: T, b: T): T;
    static maximum<T extends Tensor>(a: Tensor, b: Tensor): T;
    static maximumStrict<T extends Tensor>(a: T, b: T): T;
}
