/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   lib/legacy/polymer.dom.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {FlattenedNodesObserver} from '../utils/flattened-nodes-observer.js';

export {flush, enqueueDebouncer as addDebouncer} from '../utils/flush.js';

import {Debouncer} from '../utils/debounce.js';

export {matchesSelector};


/**
 * Cross-platform `element.matches` shim.
 *
 * @returns True if node matched selector
 */
declare function matchesSelector(node: Node, selector: string): boolean;

/**
 * Node API wrapper class returned from `Polymer.dom.(target)` when
 * `target` is a `Node`.
 */
declare class DomApiNative {

  /**
   * For shadow roots, returns the currently focused element within this
   * shadow root.
   *
   * return {Node|undefined} Currently focused element
   */
  readonly activeElement: any;
  parentNode: Node|null;
  firstChild: Node|null;
  lastChild: Node|null;
  nextSibling: Node|null;
  previousSibling: Node|null;
  firstElementChild: HTMLElement|null;
  lastElementChild: HTMLElement|null;
  nextElementSibling: HTMLElement|null;
  previousElementSibling: HTMLElement|null;
  childNodes: Node[];
  children: HTMLElement[];
  classList: DOMTokenList|null;
  textContent: string;
  innerHTML: string;

  /**
   * @param node Node for which to create a Polymer.dom helper object.
   */
  constructor(node: Node);

  /**
   * Returns an instance of `FlattenedNodesObserver` that
   * listens for node changes on this element.
   *
   * @param callback Called when direct or distributed children
   *   of this element changes
   * @returns Observer instance
   */
  observeNodes(callback: (p0: {target: HTMLElement, addedNodes: Element[], removedNodes: Element[]}) => void): FlattenedNodesObserver;

  /**
   * Disconnects an observer previously created via `observeNodes`
   *
   * @param observerHandle Observer instance
   *   to disconnect.
   */
  unobserveNodes(observerHandle: FlattenedNodesObserver): void;

  /**
   * Provided as a backwards-compatible API only.  This method does nothing.
   */
  notifyObserver(): void;

  /**
   * Returns true if the provided node is contained with this element's
   * light-DOM children or shadow root, including any nested shadow roots
   * of children therein.
   *
   * @param node Node to test
   * @returns Returns true if the given `node` is contained within
   *   this element's light or shadow DOM.
   */
  deepContains(node: Node|null): boolean;

  /**
   * Returns the root node of this node.  Equivalent to `getRootNode()`.
   *
   * @returns Top most element in the dom tree in which the node
   * exists. If the node is connected to a document this is either a
   * shadowRoot or the document; otherwise, it may be the node
   * itself or a node or document fragment containing it.
   */
  getOwnerRoot(): Node;

  /**
   * For slot elements, returns the nodes assigned to the slot; otherwise
   * an empty array. It is equivalent to `<slot>.addignedNodes({flatten:true})`.
   *
   * @returns Array of assigned nodes
   */
  getDistributedNodes(): Node[];

  /**
   * Returns an array of all slots this element was distributed to.
   *
   * @returns Description
   */
  getDestinationInsertionPoints(): HTMLSlotElement[];

  /**
   * Calls `importNode` on the `ownerDocument` for this node.
   *
   * @param node Node to import
   * @param deep True if the node should be cloned deeply during
   *   import
   * @returns Clone of given node imported to this owner document
   */
  importNode(node: Node, deep: boolean): Node|null;

  /**
   * @returns Returns a flattened list of all child nodes and
   * nodes assigned to child slots.
   */
  getEffectiveChildNodes(): Node[];

  /**
   * Returns a filtered list of flattened child elements for this element based
   * on the given selector.
   *
   * @param selector Selector to filter nodes against
   * @returns List of flattened child elements
   */
  queryDistributedElements(selector: string): HTMLElement[];
  cloneNode(deep?: boolean): Node;
  appendChild(node: Node): Node;
  insertBefore(newChild: Node, refChild: Node|null): Node;
  removeChild(node: Node): Node;
  replaceChild(oldChild: Node, newChild: Node): Node;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  querySelector(selector: string): Element|null;
  querySelectorAll(selector: string): NodeListOf<Element>;
}

export {EventApi};

/**
 * Event API wrapper class returned from `dom.(target)` when
 * `target` is an `Event`.
 */
declare class EventApi {

  /**
   * Returns the first node on the `composedPath` of this event.
   */
  readonly rootTarget: EventTarget;

  /**
   * Returns the local (re-targeted) target for this event.
   */
  readonly localTarget: EventTarget;

  /**
   * Returns the `composedPath` for this event.
   */
  readonly path: EventTarget[];
  constructor(event: any);
}

export {dom};


/**
 * Legacy DOM and Event manipulation API wrapper factory used to abstract
 * differences between native Shadow DOM and "Shady DOM" when polyfilling on
 * older browsers.
 *
 * Note that in Polymer 2.x use of `Polymer.dom` is no longer required and
 * in the majority of cases simply facades directly to the standard native
 * API.
 *
 * @returns Wrapper providing either node API or event API
 */
declare function dom(obj?: Node|Event|DomApiNative|EventApi|null): DomApiNative|EventApi;
