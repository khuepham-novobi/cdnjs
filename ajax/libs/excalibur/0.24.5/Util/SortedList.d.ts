/**
 * A sorted list implementation. NOTE: this implementation is not self-balancing
 */
export declare class SortedList<T> {
    private _getComparable;
    private _root;
    constructor(getComparable: (item: T) => number);
    find(element: T): boolean;
    private _find;
    get(key: number): any[];
    private _get;
    add(element: T): boolean;
    private _insert;
    removeByComparable(element: T): void;
    private _remove;
    private _cleanup;
    private _findMinNode;
    list(): Array<T>;
    private _list;
}
/**
 * A tree node part of [[SortedList]]
 */
export declare class BinaryTreeNode<T> {
    private _key;
    private _data;
    private _left;
    private _right;
    constructor(key: number, data: Array<T>, left: BinaryTreeNode<T>, right: BinaryTreeNode<T>);
    getKey(): number;
    setKey(key: number): void;
    getData(): T[];
    setData(data: T[]): void;
    getLeft(): BinaryTreeNode<T>;
    setLeft(left: BinaryTreeNode<T>): void;
    getRight(): BinaryTreeNode<T>;
    setRight(right: BinaryTreeNode<T>): void;
}
/**
 * Mock element for testing
 *
 * @internal
 */
export declare class MockedElement {
    private _key;
    constructor(key: number);
    getTheKey(): number;
    setKey(key: number): void;
}
