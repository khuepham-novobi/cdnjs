import { CollisionContact } from './CollisionContact';
import { CollisionResolutionStrategy } from '../Physics';
import { Collider } from './Collider';
/**
 * Models a potential collision between 2 bodies
 */
export declare class Pair {
    colliderA: Collider;
    colliderB: Collider;
    id: string;
    collision: CollisionContact;
    constructor(colliderA: Collider, colliderB: Collider);
    static canCollide(colliderA: Collider, colliderB: Collider): boolean;
    /**
     * Returns whether or not it is possible for the pairs to collide
     */
    get canCollide(): boolean;
    /**
     * Runs the collision intersection logic on the members of this pair
     */
    collide(): void;
    /**
     * Resolves the collision body position and velocity if a collision occurred
     */
    resolve(strategy: CollisionResolutionStrategy): void;
    /**
     * Calculates the unique pair hash id for this collision pair
     */
    static calculatePairHash(colliderA: Collider, colliderB: Collider): string;
    debugDraw(ctx: CanvasRenderingContext2D): void;
}
