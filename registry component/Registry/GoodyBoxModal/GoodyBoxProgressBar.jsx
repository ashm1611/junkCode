import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import styles from './GoodyBoxModal.css';
import AddToCart from '../../../../containers/AddToCart/AddToCart.async';
import {
  GOODY_BOX_OOS_LBL,
  TITLE_LBL,
  INITIAL_ITEMS_LBL,
  CLAIMED_STATUS_LBL,
  CLAIM_NOW_LBL,
  MAX_ITEMS_LBL,
} from './constants';

const renderClaimNowCTA = (props, itemsInRegistry, totalItems) => {
  const goodyBoxSku = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.goodyBoxSku',
    props
  );
  const goodyBoxPrd = pathOr(
    null,
    'registryData.registryResVO.registrySummaryVO.goodyBoxPrd',
    props
  );
  const isDisable = itemsInRegistry < totalItems;
  const goodyBoxInStock = pathOr(
    false,
    'registryData.registryResVO.registrySummaryVO.goodyBoxInStock',
    props
  );

  if (!goodyBoxInStock && !isDisable)
    return (
      <div
        className={classnames(styles.maxItems, 'm2 center')}
        data-locator="goodyBoxOOSmessage"
      >
        {GOODY_BOX_OOS_LBL}
      </div>
    );

  return (
    <AddToCart
      skuId={goodyBoxSku}
      prodId={goodyBoxPrd}
      qty={1}
      registryId={props.registryId}
      calledFromRegistry
      buttonProps={{
        attr: {
          theme: !isDisable && 'secondary',
          className: styles.claimCTA,
          disabled: isDisable,
          'data-locator': 'goodybox-status-model-claimnow',
        },
        children: CLAIM_NOW_LBL,
      }}
      onError={props.hideParent}
      onSuccess={props.hideParent}
      initiateInactivityModal={props.initiateInactivityModal}
    />
  );
};

function GoodyBoxProgressBar(props) {
  const { registryData } = props;
  const goodyBoxClaimed = pathOr(
    false,
    'registryResVO.registrySummaryVO.goodyBoxClaimed',
    registryData
  );
  const itemsInRegistry = pathOr(
    0,
    'registryResVO.registrySummaryVO.giftRegistered',
    registryData
  );
  const totalItem = MAX_ITEMS_LBL;
  const amoutFulFilled = parseFloat(itemsInRegistry, 10);
  if (isNaN(totalItem) || isNaN(amoutFulFilled)) return '';
  let progressBarWidth = Math.ceil((amoutFulFilled / totalItem) * 100);
  progressBarWidth = progressBarWidth > 100 ? 100 : progressBarWidth;

  return (
    <GridX
      className={classnames(styles.backgroundbox, 'pt2 p1 mt2')}
      data-locator="goodybox-status-model-progressdetails"
    >
      <Cell className="center">
        <div className={styles.title} data-locator="goodyBoxTitle">
          {TITLE_LBL}
        </div>
        {!goodyBoxClaimed && (
          <Cell className={classnames(styles.ProgressOuterContainer, 'mb1')}>
            <span
              className={styles.initialItem}
              data-locator={`initialitem${0}`}
            >
              {LabelsUtil.replacePlaceholderValues(INITIAL_ITEMS_LBL, [0])}
            </span>

            <Cell className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                data-locator="goodybox-PB"
                style={{ width: `${progressBarWidth}%` }}
              />
            </Cell>
            <span
              data-locator="totalItems"
              className={classnames(styles.bottomAmount, styles.maxItems)}
              tabIndex="0"
            >
              {LabelsUtil.replacePlaceholderValues(INITIAL_ITEMS_LBL, [
                totalItem,
              ])}
            </span>
          </Cell>
        )}
        {goodyBoxClaimed ? (
          <div
            className={classnames(styles.maxItems, 'm2')}
            data-locator="goodyBoxClaimedStatus"
          >
            {CLAIMED_STATUS_LBL}
          </div>
        ) : (
          renderClaimNowCTA(props, itemsInRegistry, totalItem)
        )}
      </Cell>
    </GridX>
  );
}

GoodyBoxProgressBar.propTypes = {
  registryData: PropTypes.object,
};

renderClaimNowCTA.propTypes = {
  registryId: PropTypes.string,
  hideParent: PropTypes.func,
  initiateInactivityModal: PropTypes.func,
};
export default GoodyBoxProgressBar;
