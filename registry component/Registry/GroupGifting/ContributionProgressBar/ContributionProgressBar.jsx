import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import styles from './ContributionProgressBar.css';

export const ContributionProgressBar = props => {
  let totalFund = parseFloat(props.ggItemContributionNeeded, 10);
  const amountFullyFilled = parseFloat(props.amountFulfilled, 10);
  if (isNaN(totalFund) || isNaN(amountFullyFilled)) return '';
  /** If ggItemContributionNeeded 0 but still we have
   *  amountFullyFilled some value other than zero we will show amount*/
  if (totalFund === 0 && amountFullyFilled !== 0) {
    totalFund = amountFullyFilled;
  }
  let progressBarWidth = Math.ceil((amountFullyFilled / totalFund) * 100);
  progressBarWidth = progressBarWidth > 100 ? 100 : progressBarWidth;
  const progressBarStyle =
    progressBarWidth <= 5
      ? styles.progressBarTileSmall
      : styles.progressBarTile;

  const { commonStyle, RegistryDetails, enableNewRegDashboard } = props;
  const progressTile = RegistryDetails
    ? styles.progressContainerTile
    : styles.progressContainer;
  return (
    <React.Fragment>
      <Cell
        className={classnames(
          enableNewRegDashboard ? styles.progressContainerNew : progressTile
        )}
      >
        <div
          className={classnames(
            RegistryDetails ? progressBarStyle : styles.progressBar,
            enableNewRegDashboard && styles.progressBarColor
          )}
          data-locator="GroupGifting-PB"
          style={{ width: `${progressBarWidth}%` }}
        />
      </Cell>
      <Cell className={commonStyle}>
        {enableNewRegDashboard && amountFullyFilled < totalFund && (
          <span
            data-locator="groupGiftingamountFullyFilled"
            className={classnames(
              styles.fullFilledAmount,
              styles.commonColor,
              commonStyle
            )}
            tabIndex="0"
          >
            ${amountFullyFilled}
          </span>
        )}
        {totalFund > amountFullyFilled && (
          <span
            data-locator="finalfund"
            className={classnames(
              styles.totalAmount,
              enableNewRegDashboard && styles.commonColor,
              commonStyle
            )}
            tabIndex="0"
          >
            ${totalFund}
          </span>
        )}
        {props.isCashFund && totalFund <= amountFullyFilled && (
          <span
            data-locator="cashFundfinalfund"
            className={classnames(
              styles.totalAmount,
              enableNewRegDashboard && styles.commonColor,
              commonStyle
            )}
            tabIndex="0"
          >
            ${totalFund}
          </span>
        )}
      </Cell>
    </React.Fragment>
  );
};

ContributionProgressBar.propTypes = {
  ggItemContributionNeeded: PropTypes.number,
  amountFulfilled: PropTypes.number,
  commonStyle: PropTypes.string,
  RegistryDetails: PropTypes.any,
  isCashFund: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
};

export default ContributionProgressBar;
