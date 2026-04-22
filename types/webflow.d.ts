/**
 * Extend React's JSX intrinsic elements to accept the custom
 * Webflow attribute-driven layout attributes used across the site:
 *   container="large|medium|small"
 *   padding-global=""
 *   padding-section="xlarge|large|medium|small"
 *
 * These are matched by the Webflow CSS's `[container="large"]` etc. rules.
 */

import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    container?: string;
    "padding-global"?: string;
    "padding-section"?: string;
    "blocks-name"?: string;
    "blocks-slot-children"?: string;
    "data-wf--component-button-primary--variant"?: string;
    "data-wf--component-tag--variant"?: string;
    "data-wf--component-heading-center--variant"?: string;
    "data-wf--footer--variant"?: string;
    "fs-scrolldisable-element"?: string;
  }
}
