import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import truncate from '@bbb-app/utils/truncate';
import Icon from '@bbb-app/core-ui/icon';
import CustomHTMLTooltip from '@bbb-app/core-ui/custom-html-tooltip/CustomHTMLTooltip';
import styles from './GroupGiftingTooltip.css';

export default function GroupGiftingTooltip(props) {
  const {
    handleHoverRBYRtooltip,
    heading,
    title,
    description,
    fromModal,
    toolTipAlign,
    amountFulfilled,
    showFulfilledAmount,
    iconProps,
    ggItemContributionNeeded,
    commonStyle,
    toolTipOnMob,
    diaperFundLabel,
    isDiaperFundSku,
    diapertitle,
    diaperdescription,
    isCashFund,
    enableNewRegDashboard,
  } = props;
  const indicatorHeading = isDiaperFundSku ? diaperFundLabel : heading;
  const headingStyle = fromModal
    ? styles.modalHeadingColor
    : styles.tileHeadingColor;
  const toolTipTitle = isDiaperFundSku ? diapertitle : title;
  const toolTipdescription = isDiaperFundSku ? diaperdescription : description;
  const truncateLength = showFulfilledAmount ? 15 : 30;
  let totalFund = parseFloat(ggItemContributionNeeded, 10);
  const amountFullyFilled = parseFloat(amountFulfilled, 10);
  totalFund =
    totalFund === 0 && amountFullyFilled !== 0 ? amountFullyFilled : totalFund;
  return (
    <React.Fragment>
      <span
        data-locator="GroupGifting-Title"
        className={classnames(
          styles.rbyrPurchasedContainer,
          showFulfilledAmount ? 'mb1' : 'mb1 block',
          headingStyle
        )}
      >
        <div
          onMouseEnter={handleHoverRBYRtooltip}
          className={classnames(
            commonStyle,
            styles.rbyrPurchased,
            enableNewRegDashboard && styles.fontStyle
          )}
          data-locator={`${indicatorHeading}-title`}
          tabIndex="0"
        >
          {truncate(indicatorHeading, truncateLength)}
          {!isCashFund && (
            <Icon
              className={styles.infoIcon}
              type="infoIcon"
              width={iconProps ? iconProps.width : '18px'}
              height={iconProps ? iconProps.height : '15px'}
            />
          )}
        </div>
        {!isCashFund && (
          <CustomHTMLTooltip
            id={toolTipAlign}
            innerClass={classnames(styles.customTooltipRBYR, toolTipOnMob)}
            className={classnames('showToolTip', styles.showToolTip)}
          >
            <div className={styles.toolTip}>
              <div className={classnames(styles.row, styles.heading)}>
                {toolTipTitle}
              </div>
              <hr className={styles.lineDark} />
              <div className={styles.row}>
                {truncate(toolTipdescription, 250)}
              </div>
            </div>
          </CustomHTMLTooltip>
        )}
      </span>
      {!enableNewRegDashboard && amountFulfilled < totalFund && (
        <span
          data-locator="groupGiftingAmountFulfilled"
          className={classnames(styles.bottomAmount, commonStyle)}
          tabIndex="0"
        >
          ${amountFulfilled}
        </span>
      )}
      {props.isCashFund && amountFulfilled >= totalFund && (
        <span
          data-locator="cashFundsAmountFulfilled"
          className={classnames(
            styles.bottomAmount,
            commonStyle,
            styles.fontStyle,
            enableNewRegDashboard && styles.commonColor
          )}
          tabIndex="0"
        >
          {'Congrats!'}
        </span>
      )}
    </React.Fragment>
  );
}

GroupGiftingTooltip.propTypes = {
  handleHoverRBYRtooltip: PropTypes.func,
  heading: PropTypes.string,
  title: PropTypes.string,
  diapertitle: PropTypes.string,
  description: PropTypes.string,
  diaperdescription: PropTypes.string,
  fromModal: PropTypes.bool,
  toolTipAlign: PropTypes.any,
  amountFulfilled: PropTypes.number,
  showFulfilledAmount: PropTypes.bool,
  iconProps: PropTypes.string,
  ggItemContributionNeeded: PropTypes.number,
  commonStyle: PropTypes.string,
  toolTipOnMob: PropTypes.string,
  diaperFundLabel: PropTypes.string,
  isDiaperFundSku: PropTypes.string,
  isCashFund: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
};
