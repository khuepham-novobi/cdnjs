import * as React from 'react';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * A HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Element | (() => Element | null) | null;
  /**
   * The `children` will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 * Demos:
 *
 * - [Portal](https://material-ui.com/components/portal/)
 *
 * API:
 *
 * - [Portal API](https://material-ui.com/api/portal/)
 */
export default function Portal(props: PortalProps): JSX.Element;
