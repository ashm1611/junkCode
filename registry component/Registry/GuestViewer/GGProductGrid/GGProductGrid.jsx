import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Img from '@bbb-app/core-ui/image/CoreImage';
import PrimaryLink from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import styles from '../../ProductGrid/ProductGrid.css';
import ContentSlot from '../../ContentSlot/RegistryContentSlot';
import ProductGridTile from '../../ProductGridTile/ProductGridTile';
import {
  RECOMMENDED_TILE_TITLE_LBL,
  RECOMMENDED_TILE_LBL,
  RECOMMENDED_TILE_SUBCOPY_LBL,
  RECOMMENDED_TILE_CTA_LBL,
} from '../CollaborationGiftBanner/constants';
import Style from '../../ContentSlot/RegistryContentSlot.css';
/**
 * Helper component for Certona Product grid CTA buttons
 * @param {object} props
 * @param {string} props.className className attribute for the inner button
 * @param {string} props.items items attribute to manipulate response
 * @param {function} props.deviceConfig for dimension, either desktop or mobile
 */

const propTypes = {
  items: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  labels: PropTypes.object,
  contextPath: PropTypes.string,
  ctaLabels: PropTypes.string,
  buttonLayout: PropTypes.string,
  view: PropTypes.string,
  onQuickViewButtonClick: PropTypes.func,
  updateSkuIdForAnchoring: PropTypes.func,
  owner: PropTypes.string,
  registryId: PropTypes.string,
  coOwner: PropTypes.string,
  activeRegistry: PropTypes.object,
  enableKatori: PropTypes.bool,
  styleVariation: PropTypes.string,
  onPickupInStoreButtonClick: PropTypes.func,
  searchStoreDetails: PropTypes.func,
  favoriteStore: PropTypes.object,
  enableSearchFlag: PropTypes.func,
  searchRadius: PropTypes.object,
  isMobile: PropTypes.bool,
  deviceConfig: PropTypes.object,
  registryData: PropTypes.object,
  siteId: PropTypes.string,
  location: PropTypes.object,
  interactiveCheckList: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  akamaiData: PropTypes.object,
  registryList: PropTypes.array,
  mPulseEnabled: PropTypes.bool,
  isPOBoxAddress: PropTypes.bool,
  customizationCodes: PropTypes.object,
  isMinimumQtyEnabled: PropTypes.bool,
  globalSwitchConfig: PropTypes.object,
  header: PropTypes.object,
  updateStateData: PropTypes.func,
  addFormField: PropTypes.func,
  displayDiscountedPrice: PropTypes.bool,
  pickupFilterSelected: PropTypes.bool,
  storeDetails: PropTypes.object,
  isBopisFeatureEnable: PropTypes.bool,
  variation: PropTypes.bool,
  selectedFilterOption: PropTypes.string,
  isRegistryContentSlotReq: PropTypes.bool,
  selectedCheckboxFilter: PropTypes.string,
  isDiaperFundEnable: PropTypes.bool,
  regCashFundEventTypes: PropTypes.object,
};

const defaultProps = {
  buttonLayout: 'quickview',
};

export const GGProductGrid = ({
  items,
  view = 'list',
  styleVariation,
  registryData,
  selectedFilterOption,
  selectedCheckboxFilter,
  ...props
}) => {
  const tealiumData = {
    registryData: {
      favouriteCategoryIdList: pathOr(
        [],
        'favouriteCategoryIdList',
        registryData
      ),
      favouriteCategoryNameList: pathOr(
        [],
        'favouriteCategoryNameList',
        registryData
      ),
      registrySummaryVO: pathOr(
        '',
        'registryResVO.registrySummaryVO',
        registryData
      ),
    },
    location: props.location,
    interactiveCheckList: pathOr(
      '',
      'averageC1Percentage',
      props.interactiveCheckList
    ),
    akamaiData: props.akamaiData,
    customizationCodes: props.customizationCodes,
  };
  const filteredCondition =
    styleVariation !== 'oos' &&
    styleVariation !== 'ais' &&
    props.variation === 'Date' &&
    (selectedFilterOption === 'View All' ||
      selectedFilterOption === 'All Items') &&
    selectedCheckboxFilter !== 'in-stock-online' &&
    selectedCheckboxFilter !== 'store-pickup';

  const intlUser = isInternationalUser();

  const renderProductTile = () =>
    items.map((item, index) => {
      let isDpfItem;
      if (item.itemType === 'DPF') {
        isDpfItem = true;
      }
      if (
        item.deletedItem ||
        (item.itemType === 'DPF' &&
          !props.isDiaperFundEnable &&
          item.amountFulfilled === 0)
      ) {
        return null;
      }
      let recommendTile;
      if (
        props.showWelcomeMsg &&
        props.isRegistryContentSlotReq &&
        filteredCondition &&
        props.enableRegistryCollaboration &&
        ((index === 3 && items.length >= 4) ||
          (items.length < 4 && index === items.length - 1))
      ) {
        recommendTile = (
          <Cell
            className={classnames(
              view !== 'single' && styles.cell,
              'large-3 small-12 medium-6 pr1 pl1'
            )}
            data-locator="GGRegistryView-Recommend-Tile"
          >
            {renderRecommendedTile()}
          </Cell>
        );
      }
      return (
        <React.Fragment>
          <Cell
            key={`${item.sku}_${item.refNum}`}
            className={classnames(
              view !== 'single' && styles.cell,
              'large-3 small-12 medium-6 pr1 pl1',
              styles.horizontalTile
            )}
            data-locator="registry-createdregistry-landingpage-productlist"
          >
            <ProductGridTile
              {...item}
              itemIndex={index + 1}
              actions={props.ctaLabels}
              contextPath={props.contextPath}
              onQuickViewButtonClick={props.onQuickViewButtonClick}
              updateSkuIdForAnchoring={props.updateSkuIdForAnchoring}
              buttonLayout={props.buttonLayout}
              labels={props.labels}
              owner={props.owner}
              coOwner={props.coOwner}
              registryId={props.registryId}
              enableKatori={props.enableKatori}
              onPickupInStoreButtonClick={props.onPickupInStoreButtonClick}
              searchStoreDetails={props.searchStoreDetails}
              favoriteStore={props.favoriteStore}
              styleVariation={styleVariation}
              isLoggedIn={props.isLoggedIn}
              activeRegistry={props.activeRegistry}
              enableSearchFlag={props.enableSearchFlag}
              searchRadius={props.searchRadius}
              isMobile={props.isMobile}
              deviceConfig={props.deviceConfig}
              tealiumData={tealiumData}
              handleTealiumEvent={props.handleTealiumEvent}
              registryList={props.registryList}
              siteId={props.siteId}
              akamaiData={props.akamaiData}
              isPOBoxAddress={props.isPOBoxAddress}
              isInternationalUser={intlUser}
              isMinimumQtyEnabled={props.isMinimumQtyEnabled}
              globalSwitchConfig={props.globalSwitchConfig}
              header={props.header}
              updateStateData={props.updateStateData}
              addFormField={props.addFormField}
              registryData={registryData}
              displayDiscountedPrice={props.displayDiscountedPrice}
              pickupFilterSelected={props.pickupFilterSelected}
              storeDetails={props.storeDetails}
              isBopisFeatureEnable={props.isBopisFeatureEnable}
              enableCashFund={props.enableCashFund}
              contributeCashFund={props.contributeCashFund}
              cfSubmitAPIStatus={props.cfSubmitAPIStatus}
              clearContributeCashFund={props.clearContributeCashFund}
              handleFirstCategoryCall={props.handleFirstCategoryCall}
              regCashFundEventTypes={props.regCashFundEventTypes}
              pageConfigRegistryOwner={props.pageConfigRegistryOwner}
              isDpfItem={isDpfItem}
            />
            {((props.mPulseEnabled &&
              items.length <= 4 &&
              index === items.length - 1) ||
              index === 3) && (
              <div>
                <Instrumentation
                  zoneName={'ux-primary-content-displayed'}
                  markName={'ux-handler-expand-top-primary-content'}
                />
                <Instrumentation
                  zoneName={'ux-primary-action-available'}
                  markName={'ux-handler-expand-top-primary-action'}
                />
              </div>
            )}
          </Cell>
          {recommendTile}
        </React.Fragment>
      );
    });
  const renderRecommendedTile = () => {
    let exploreResult = '';
    let recommendTileImage = '';
    let recommendHeading = '';
    let imgAltText = '';
    const siteIDBased = props.siteId.includes('BuyBuyBaby');
    if (siteIDBased) {
      exploreResult = classnames(Style.exploreBaby, 'pl15 pr15');
      recommendTileImage = '/static/assets/images/babyHeartIcon.png';
      recommendHeading = RECOMMENDED_TILE_LBL;
      imgAltText = 'babyHeartIcon';
    } else {
      exploreResult = classnames(Style.explore, 'px3');
      recommendTileImage = '/static/assets/images/bbb-add-icon.png';
      recommendHeading = RECOMMENDED_TILE_LBL;
      imgAltText = 'bbbAddIcon';
    }
    return (
      <GridX
        className={classnames(
          Style.recommendArticle,
          siteIDBased
            ? Style.recommendTileBabyBGColor
            : Style.recommendTileBGColor
        )}
        data-locator={'recommendedTile'}
      >
        <Cell
          className={classnames(
            Style.recommendTileImageContainer,
            'small-3 large-12 medium-12',
            Style.common
          )}
        >
          <Img
            src={recommendTileImage}
            alt={imgAltText}
            className={Style.icon}
          />
        </Cell>
        <Cell
          className={classnames('small-9 large-12 medium-12 pt3', Style.common)}
        >
          <div tabIndex="0" className={Style.collaborateTitle}>
            {RECOMMENDED_TILE_TITLE_LBL}
          </div>
          <div
            tabIndex="0"
            className={classnames(Style.RecommendTile, 'p1 pb2 pt2')}
          >
            {recommendHeading}
          </div>
          <div
            tabIndex="0"
            className={classnames(Style.exploreCommon, exploreResult)}
          >
            {RECOMMENDED_TILE_SUBCOPY_LBL}
          </div>
          {props.isMobile ? (
            <div className={Style.primaryContainer}>
              <PrimaryLink
                type="bold"
                data-locator={'linkDataLocators'}
                className={siteIDBased ? Style.babyCTA : Style.primary}
                href={'/store/static/giftnotonregistry/'}
              >
                {RECOMMENDED_TILE_CTA_LBL}
              </PrimaryLink>
            </div>
          ) : (
            <div className={Style.buttonContainer}>
              <Cell>
                <Button
                  theme="secondary"
                  href={'/store/static/giftnotonregistry/'}
                  data-locator={'linkDataLocators'}
                >
                  {RECOMMENDED_TILE_CTA_LBL}
                </Button>
              </Cell>
            </div>
          )}
        </Cell>
      </GridX>
    );
  };
  return (
    <Cell className="small-12 medium-11 large-11 mx-auto">
      <GridX className={styles.printGrid}>
        {renderProductTile()}
        {items && props.isRegistryContentSlotReq && filteredCondition && (
          <Cell
            className={classnames(
              view !== 'single' && styles.cell,
              'large-3 small-12 medium-6 pr1 pl1'
            )}
            data-locator="registry-createdregistry-landingpage-productlist"
          >
            <ContentSlot
              isGiftGiver
              labels={props.labels}
              styleVariation={styleVariation}
              siteId={props.siteId}
              registryData={registryData}
            />
          </Cell>
        )}
      </GridX>
    </Cell>
  );
};

GGProductGrid.propTypes = propTypes;
GGProductGrid.defaultProps = defaultProps;

export default GGProductGrid;
export { GGProductGrid as PureProductGrid }; // pure component. used in tests
