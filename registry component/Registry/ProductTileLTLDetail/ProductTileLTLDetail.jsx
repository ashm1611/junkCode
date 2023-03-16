import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Button from '@bbb-app/core-ui/button';
import '@bbb-app/assets/icons/helpIcon.svg';
import styles from './ProductTileLTLDetail.css';
import {
  ADDITIONAL_FEE_LBL,
  NO_ADDITIONAL_FEE_LBL,
  LTL_PO_BOX_REGISTRY_LBL,
  ADDITIONAL_SERVICE_LBL,
  ITEM_PRICE_LBL,
  DELIVERY_CHARGE_TOOLTIP_LBL,
} from './../../Registry/constants';

const propTypes = {
  ltlShipMethodDesc: PropTypes.string,
  activeRegistry: PropTypes.object,
  shipMethodUnsupported: PropTypes.bool,
  ltlDeliveryServices: PropTypes.string,
  isPOBoxAddress: PropTypes.bool,
};

const renderAdditionalFeeAndDelivery = props => {
  const {
    ltlDeliveryServices,
    totalDeliveryCharges,
    ltlShipMethodDesc,
    formattedTotalDeliveryCharges,
    formattedPriceVal,
    refNum,
    sKUDetailVO,
  } = props;

  const noAdditionalFeeLabel = (
    <React.Fragment>
      <li
        className={classnames(styles.personalizationMessage)}
        data-locator="quick-view-ltl-item-dsl"
      >
        {LabelsUtil.replacePlaceholderValues(NO_ADDITIONAL_FEE_LBL, [
          ltlShipMethodDesc,
        ])}
      </li>
    </React.Fragment>
  );

  const additionalFeeLabel = (
    <React.Fragment>
      <li
        className={classnames(styles.personalizationMessage)}
        data-locator="quick-view-ltl-item-dsl"
      >
        {LabelsUtil.replacePlaceholderValues(ADDITIONAL_FEE_LBL, [
          ltlShipMethodDesc,
          formattedTotalDeliveryCharges || totalDeliveryCharges,
        ])}
        <Button
          className={classnames('ml1', 'tooltip-bottom')}
          data-tooltip={DELIVERY_CHARGE_TOOLTIP_LBL}
          theme="ghost"
          variation="noPadding"
          iconProps={{
            type: 'helpIcon',
            height: '12px',
            width: '12px',
          }}
          aria-label={DELIVERY_CHARGE_TOOLTIP_LBL}
        />
      </li>
      <li
        className={classnames(styles.personalizationMessage)}
        data-locator="quick-view-ltl-item-price"
      >
        {!(refNum && sKUDetailVO.personalizationType === 'CR') &&
          LabelsUtil.replacePlaceholderValues(ITEM_PRICE_LBL, [
            formattedPriceVal,
          ])}
      </li>
    </React.Fragment>
  );

  if (ltlDeliveryServices && totalDeliveryCharges === 0) {
    return noAdditionalFeeLabel;
  } else if (ltlDeliveryServices && totalDeliveryCharges > 0) {
    return additionalFeeLabel;
  }
  return null;
};

const ProductTileLTLDetail = props => {
  const {
    ltlShipMethodDesc,
    ltlDeliveryServices,
    shipMethodUnsupported,
    activeRegistry,
    isPOBoxAddress,
  } = props;
  return (
    <ul className={classnames('mb2')}>
      {((activeRegistry && activeRegistry.activeRegistryHasPoBoxAddress) ||
        isPOBoxAddress === 'true') && (
        <li className={classnames(styles.personalizationMessage)}>
          {LTL_PO_BOX_REGISTRY_LBL}
        </li>
      )}
      {!ltlDeliveryServices || shipMethodUnsupported === true ? (
        <li className={classnames(styles.personalizationMessage)}>
          {ADDITIONAL_SERVICE_LBL}
        </li>
      ) : (
        ltlShipMethodDesc && renderAdditionalFeeAndDelivery(props)
      )}
    </ul>
  );
};

ProductTileLTLDetail.propTypes = propTypes;

export default ProductTileLTLDetail;
