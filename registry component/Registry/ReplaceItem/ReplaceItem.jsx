import React from 'react';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { REPLACE_CTA_LBL } from '../../RegistryNotifications/constants';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  handleNandDReplaceModal: PropTypes.func,
  productId: PropTypes.string,
  displayName: PropTypes.string,
  sku: PropTypes.number,
  registryId: PropTypes.string,
  rowID: PropTypes.string,
  qtyPurchased: PropTypes.number,
  qtyRemaining: PropTypes.number,
  qtyRequested: PropTypes.number,
  qtyWebPurchased: PropTypes.number,
  eventType: PropTypes.string,
  refNum: PropTypes.string,
  itemType: PropTypes.string,
  ltlDeliveryServices: PropTypes.string,
  className: PropTypes.object,
  hideReplaceModal: PropTypes.func,
};

/**
 * @property defaultProps
 * @description defining defaultProps of the component
 */
const defaultProps = {
  labels: {},
};

/**
 * Render ReplaceItem Compnent
 * @param {Object} props
 */
const ReplaceItem = props => {
  const {
    handleNandDReplaceModal,
    productId,
    displayName,
    sku,
    registryId,
    rowID,
    qtyPurchased,
    qtyRemaining,
    qtyRequested,
    qtyWebPurchased,
    eventType,
    refNum,
    itemType,
    ltlDeliveryServices,
    className,
  } = props;

  return (
    <ErrorBoundary>
      <Button
        className={className}
        variation="fullWidth"
        theme="secondaryStrokeBasic"
        onClick={() => {
          props.hideReplaceModal(false);
          handleNandDReplaceModal(
            true,
            productId,
            displayName,
            sku,
            registryId,
            rowID,
            qtyPurchased,
            qtyRemaining,
            qtyRequested,
            qtyWebPurchased,
            eventType,
            refNum,
            itemType,
            ltlDeliveryServices
          );
        }}
      >
        {REPLACE_CTA_LBL}
      </Button>
    </ErrorBoundary>
  );
};

ReplaceItem.propTypes = propTypes;
ReplaceItem.defaultProps = defaultProps;

export default ReplaceItem;
