import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { personalizationApplicable } from '@bbb-app/utils/RegistryUtils';
import styles from './Price.css';
import { INCLUDING_DELIVERY_LBL, WAS_LBL } from '../constants';

/**
 * Helper component for Registry Price
 *  @param {string} props.className className attribute for the inner button
 * @param {string} props.itemPrice Formatted Price of product
 * @param {string} props.personalizedPrice Formatted Price of product including personalization
 * @param {string} props.totalPrice Formatted Price of product including delivery and assemble
 * @param {string} props.dataLocator for current price
 * @param {string} props.personalizationType Type of personalization applicable
 * @param {string} props.personalisedCode Personalization code
 * @param {string} props.ltlFlag If product is LTL
 * @param {bool} inCart [bool used for incart messages]
 */

const propTypes = {
  className: PropTypes.string,
  itemPrice: PropTypes.string,
  totalPrice: PropTypes.string,
  personalizedPrice: PropTypes.string,
  dataLocator: PropTypes.string,
  personalizationType: PropTypes.string,
  ltlFlag: PropTypes.bool,
  refNum: PropTypes.number,
  inCart: PropTypes.bool,
  totalDeliveryCharges: PropTypes.number,
  displayDiscountedPrice: PropTypes.bool,
  formattedWasPrice: PropTypes.string,
  priceStyle: PropTypes.string,
  mobWasPrice: PropTypes.string,
  priceColor: PropTypes.string,
  enableNewRegDashboard: PropTypes.bool,
};

const Price = ({
  className,
  itemPrice,
  totalPrice,
  personalizedPrice,
  dataLocator,
  ltlFlag,
  personalizationType,
  refNum,
  inCart,
  totalDeliveryCharges,
  displayDiscountedPrice,
  formattedWasPrice,
  priceStyle,
  mobWasPrice,
  priceColor,
  enableNewRegDashboard,
}) => {
  let displayPrice = itemPrice;

  // If delivery service for LTL item is not selected, "Inc. Delivery" label should not be displayed
  const incDeliveryLabel =
    totalDeliveryCharges > 0 ? INCLUDING_DELIVERY_LBL : '';

  displayPrice = personalizationApplicable(refNum, personalizationType)
    ? personalizedPrice
    : displayPrice;
  displayPrice = ltlFlag ? `${totalPrice} ${incDeliveryLabel}` : displayPrice;

  return (
    <div tabIndex="0">
      <div
        data-locator={dataLocator}
        className={classnames(
          styles.base,
          enableNewRegDashboard && styles.baseDirection,
          className
        )}
      >
        <span
          className={classnames(
            priceStyle,
            priceColor,
            displayDiscountedPrice && !inCart
              ? styles.discountedPrice
              : styles.isPrice
          )}
        >
          {displayPrice}
        </span>
        {displayDiscountedPrice && !inCart && (
          <s
            className={classnames(
              enableNewRegDashboard
                ? styles.newWasPrice
                : classnames(mobWasPrice, styles.wasPrice)
            )}
          >
            {WAS_LBL} ${formattedWasPrice}
          </s>
        )}
      </div>
    </div>
  );
};

Price.propTypes = propTypes;

export default Price;
