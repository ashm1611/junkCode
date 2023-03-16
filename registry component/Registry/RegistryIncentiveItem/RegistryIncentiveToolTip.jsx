import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import {
  ADDED_LBL,
  PURCHASED_LBL,
  REDEEM_MESSAGE_LBL,
} from '../../../../containers/Pages/Registry/RegistryIncentive/constants';
import Styles from './RegistryIncentiveToolTip.css';

const RegistryIncentiveToolTip = props => {
  return (
    <div className={classnames(Styles.toolTip)}>
      <div className={classnames(Styles.row)}>
        <span className={classnames(Styles.addedDot, 'mr1')} />
        {LabelsUtil.replacePlaceholderValues(ADDED_LBL, [
          `$${props.incentiveRequestedTotal}`,
        ])}
      </div>
      <div className={classnames(Styles.row)}>
        <span className={classnames(Styles.purchaseddDot, 'mr1')} />
        {LabelsUtil.replacePlaceholderValues(PURCHASED_LBL, [
          `$${props.incentivePurchasedTotal}`,
        ])}
      </div>
      <hr className={classnames('mr1', Styles.lineRow)} />
      <div className={classnames('mb0')}>
        {LabelsUtil.replacePlaceholderValues(REDEEM_MESSAGE_LBL, [
          String('$') +
            (
              Math.floor(
                (parseFloat(
                  `${props.incentiveCompletionTotal -
                    props.incentivePurchasedTotal}`
                ) || 0) * 100
              ) / 100
            ).toFixed(2),
        ])}
      </div>
    </div>
  );
};
RegistryIncentiveToolTip.propTypes = {
  incentiveCompletionTotal: PropTypes.string,
  incentivePurchasedTotal: PropTypes.string,
  incentiveRequestedTotal: PropTypes.string,
};
export default RegistryIncentiveToolTip;
