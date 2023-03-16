import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import CustomHTMLTooltip from '@bbb-app/core-ui/custom-html-tooltip/CustomHTMLTooltip';
import styles from './RQPProductTileHeader.css';
/**
 * @classdesc Displays a header within the Product Tile.
 * The header has text and may contain and a tooltip.
 *
 * @see {@link app/components/Pages/RegistryQuickPicks/ProductTile/ProductTile.jsx}
 */
const RQPProductTileHeader = ({
  className,
  label,
  tooltip,
  tooltipButtonLabel,
  ...otherProps
}) => (
  <span className={classnames(styles.base, className)} {...otherProps}>
    {label}
    {tooltip && (
      <a className={classnames(styles.tooltipIcon)}>{tooltipButtonLabel}</a>
    )}
    <CustomHTMLTooltip
      id="RQPProductTileHeader"
      className={styles.showToolTip}
      innerClass={styles.tooltipInnerClass}
    >
      <span className={styles.tooltip}>{tooltip}</span>
    </CustomHTMLTooltip>
  </span>
);
RQPProductTileHeader.defaultProps = {
  tooltipButtonLabel: '?',
};
RQPProductTileHeader.propTypes = {
  className: string,
  /* Text label (e.g. Clearance) */
  label: string.isRequired,
  /* Tooltip text
   * @see app/components/common/Tooltip/Tooltip.jsx
   */
  tooltip: string,
  /* Tooltip button label (Renders after label) */
  tooltipButtonLabel: string,
};
// @exports RQPProductTileHeader
export default RQPProductTileHeader;
