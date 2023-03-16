import React from 'react';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell/Cell';
import GridX from '@bbb-app/core-ui/grid-x/GridX';
import Checkbox from '@bbb-app/core-ui/checkbox';
import style from './GuestViewerLayout.css';
import { renderFacetsCheckboxProps } from './props';
import {
  CURRENTLY_UNAVAILABLE_LBL,
  SELECT_A_STORE_LBL,
  IN_STOCK_ONLINE_LBL,
  FREE_PICK_UP_LBL,
  STORE_PICKUP_LBL,
} from '../../OwnerProductGridTile/constants';

/**
 * Created by Ashish Bansal on 5/7/2020
 */

/** will render the bopis checkboxes
 * @type {{selectedCheckboxFilter, storeDetails, handleChangePickupInStore, handleBopisCheckboxChange, labels}}
 */
export const RenderFacetsCheckbox = props => {
  const {
    storeDetails,
    selectedCheckboxFilter,
    handleBopisCheckboxChange,
    handleChangePickupInStore,
    bopisStoreDetail,
    isMobile,
    siteId,
    isNewDashboard,
    handleToggleAllFilters,
  } = props;
  const isStoreExists = !isEmpty(storeDetails);
  const getStoreHelpLabel = () => {
    let cmsLabelName = SELECT_A_STORE_LBL;
    let datalocators = 'selectAStorePickup';
    if (bopisStoreDetail && !bopisStoreDetail.isBopisStore) {
      cmsLabelName = CURRENTLY_UNAVAILABLE_LBL;
      datalocators = 'currentlyUnavailable';
    } else if (isStoreExists) {
      cmsLabelName = FREE_PICK_UP_LBL;
      datalocators = 'free2hrPickupLabel';
    }
    return (
      <div
        className={classnames(
          style.freePickUpMsg,
          !isStoreExists && style.selectAStore
        )}
        data-locator={datalocators}
      >
        {' '}
        {cmsLabelName}
      </div>
    );
  };
  return (
    <GridX className={!isNewDashboard && style.facetContainer}>
      <Cell
        className={classnames(
          !isNewDashboard && 'small-3 large-4',
          style.mrbottom,
          style.mobileWidth,
          !isNewDashboard && style.autowidth,
          style.mrright,
          isNewDashboard && style.facetCheckbox
        )}
      >
        <Checkbox
          id={'instockOnline'}
          aria-label={IN_STOCK_ONLINE_LBL}
          label={IN_STOCK_ONLINE_LBL}
          checked={selectedCheckboxFilter === 'in-stock-online'}
          onSelect={() => handleBopisCheckboxChange('in-stock-online')}
          data-locator="giftGiver online-stock_checkbox"
          variation="multiline"
        />
      </Cell>
      {
        <Cell
          className={classnames(
            'small-9 large-8',
            style.mobileWidth,
            style.autowidth
          )}
        >
          <GridX>
            <Cell
              className={classnames(
                'small-1 large-1',
                style.checkboxWidth,
                style.autowidth,
                style.storepickupbox
              )}
            >
              {isStoreExists ? (
                <Checkbox
                  id={'storePickUp'}
                  label={STORE_PICKUP_LBL}
                  aria-label={`${STORE_PICKUP_LBL}at-${storeDetails.commonName}`}
                  checked={selectedCheckboxFilter === 'store-pickup'}
                  disabled={
                    !pathOr(false, 'bopisStoreDetail.isBopisStore', props)
                  }
                  onSelect={() => handleBopisCheckboxChange('store-pickup')}
                  data-locator="giftGiver store-pickup_checkbox"
                  variation="multiline"
                />
              ) : (
                <Checkbox
                  id={'store-not-exists'}
                  label={STORE_PICKUP_LBL}
                  aria-label={`${STORE_PICKUP_LBL}-${storeDetails.commonName}`}
                  checked={false}
                  disabled
                  data-locator="gift-giver-store-not-exists"
                  variation="multiline"
                />
              )}
            </Cell>
            <Cell
              className={classnames(
                'small-11 large-9',
                style.pdleft,
                style.autowidth
              )}
            >
              <span
                className={style.storeName}
                data-locator="pickupStoreLayout"
              >
                <span
                  className={style.storepickup}
                  data-locator="storePickupLabel"
                >
                  {isStoreExists && STORE_PICKUP_LBL}{' '}
                </span>
                {isStoreExists && `at ${storeDetails.commonName} `}
              </span>
              {!isMobile && <span tabIndex="0">{getStoreHelpLabel()}</span>}
              {isMobile && <span tabIndex="0">{getStoreHelpLabel()}</span>}
              {
                <Cell
                  className={classnames('small-2 large-2', style.autowidth)}
                >
                  <a
                    className={classnames(
                      !isStoreExists && style.changeStorePadding,
                      siteId === 'BuyBuyBaby' || siteId === 'TBS_BuyBuyBaby'
                        ? style.babychangeStoreLink
                        : style.changeStoreLink
                    )}
                    id="changeStoreCTA"
                    href={`#change-store`}
                    onClick={evt => {
                      if (isNewDashboard) handleToggleAllFilters();
                      handleChangePickupInStore(evt);
                    }}
                    data-locator="giftGiverChangeStore"
                  >
                    {isStoreExists ? 'Change' : 'Change or add stores'}
                  </a>
                </Cell>
              }
            </Cell>
          </GridX>
        </Cell>
      }
    </GridX>
  );
};

RenderFacetsCheckbox.propTypes = renderFacetsCheckboxProps;
