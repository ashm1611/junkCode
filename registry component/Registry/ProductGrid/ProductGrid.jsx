import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import { subscribe } from '@bbb-app/utils/pubsub';
import styles from './ProductGrid.css';
import OwnerProductGridTile from '../OwnerProductGridTile/OwnerProductGridTile';
import ContentSlot from '../ContentSlot/RegistryContentSlot';
import DFContentSlot from '../ContentSlot/DFContentSlot';
import ReplaceModalComponent from '../ReplaceItem/ReplaceModalComponent.async';
import { THRESHOLD_LBL } from '../OwnerProductGridTile/constants';
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
  onProductTileClick: PropTypes.func,
  updateSkuIdForAnchoring: PropTypes.func,
  owner: PropTypes.string,
  eventType: PropTypes.string,
  coOwner: PropTypes.string,
  categoryId: PropTypes.string,
  activeRegistry: PropTypes.object,
  updateGiftData: PropTypes.func,
  enableKatori: PropTypes.bool,
  registryOwnerFirstCategoryList: PropTypes.array,
  removeRegistryItem: PropTypes.func,
  markFavRegistryItem: PropTypes.func,
  favoriteStore: PropTypes.object,
  updateInteractiveCheckList: PropTypes.func,
  variation: PropTypes.string,
  isMobile: PropTypes.bool,
  getUpdatedCategoryData: PropTypes.func,
  deviceConfig: PropTypes.object,
  registryData: PropTypes.object,
  siteId: PropTypes.string,
  location: PropTypes.object,
  interactiveCheckList: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  akamaiData: PropTypes.object,
  tealiumObject: PropTypes.object,
  filter: PropTypes.string,
  updateFilterCount: PropTypes.number,
  mPulseEnabled: PropTypes.bool,
  accordianKey: PropTypes.number,
  initiateInactivityModal: PropTypes.func,
  customizationCodes: PropTypes.object,
  updatedSkuId: PropTypes.string,
  switchConfig: PropTypes.object,
  isMinimumQtyEnabled: PropTypes.bool,
  selectedFilterOption: PropTypes.string,
  track: PropTypes.func,
  sortDataByDate: PropTypes.func,
  getReplacedItemData: PropTypes.func,
  globalSwitchConfig: PropTypes.object,
  displayDiscountedPrice: PropTypes.bool,
  config: PropTypes.object,
  styleVariation: PropTypes.string,
  isRegistryContentSlotReq: PropTypes.bool,
  registryFacetsFilter: PropTypes.array,
  setFacetData: PropTypes.func,
  isBopisFeatureEnable: PropTypes.bool,
  storeDetails: PropTypes.object,
  selectedCheckboxFilter: PropTypes.bool,
  isDiaperFundEnable: PropTypes.bool,
  hasDiaperFund: PropTypes.bool,
  productsCount: PropTypes.number,
  isQuickViewOpen: PropTypes.bool,
  replaceProductFromRegistry: PropTypes.func,
  enableNewRegDashboard: PropTypes.bool,
};
const defaultProps = {
  buttonLayout: 'quickview',
};

let ref;
export class ProductGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleModalState: false,
      productId: '',
      displayName: '',
      discontinuedProductDetails: {
        sku: '',
        registryId: '',
        rowID: '',
        qtyPurchased: '',
        qtyRemaining: '',
        qtyRequested: '',
        qtyWebPurchased: '',
        eventType: '',
        refNum: '',
        itemType: '',
        productId: '',
        ltlDeliveryServices: '',
      },
      qtyPurchased: '',
      qtyRemaining: '',
      qtyRequested: '',
      qtyWebPurchased: '',
    };
    this.toggeleNandDReplaceModal = this.toggeleNandDReplaceModal.bind(this);
    this.hideReplaceModal = this.hideReplaceModal.bind(this);
    ref = this;
  }
  // eslint-disable-next-line max-params
  toggeleNandDReplaceModal(
    val,
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
  ) {
    this.setState({
      toggleModalState: val,
      productId,
      displayName,
      discontinuedProductDetails: {
        sku,
        registryId,
        productId,
        rowID,
        qtyPurchased,
        qtyRemaining: qtyRequested - qtyPurchased,
        qtyRequested,
        qtyWebPurchased,
        eventType,
        refNum,
        itemType,
        ltlDeliveryServices,
      },
      qtyPurchased,
      qtyRemaining,
      qtyRequested,
      qtyWebPurchased,
    });
    // eslint-disable-next-line
  }
  subscribe = subscribe('closeReplaceModal', () => {
    if (ref.state.toggleModalState) {
      ref.toggeleNandDReplaceModal();
    }
  });
  hideReplaceModal(val) {
    this.setState({ hideReplaceModalState: val });
  }
  render() {
    const {
      items,
      labels,
      view = 'list',
      registryOwnerFirstCategoryList,
      registryData,
      productsCount,
      enableNewRegDashboard,
    } = this.props;
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
      location: this.props.location,
      interactiveCheckList: pathOr(
        '',
        'averageC1Percentage',
        this.props.interactiveCheckList
      ),
      akamaiData: this.props.akamaiData,
      customizationCodes: this.props.customizationCodes,
    };
    const productCountThreshold = THRESHOLD_LBL;
    const arrDeletedItem =
      items && items.filter(item => item.deletedItem === true);
    const filteredCondition =
      this.props.styleVariation !== 'oos' &&
      this.props.styleVariation !== 'ais' &&
      productsCount - arrDeletedItem.length <= productCountThreshold;
    const intlUser = isInternationalUser();
    const registryId = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.registryId',
      this.props
    );
    const renderProductTile = () =>
      items.map((item, index) => {
        if (
          item.deletedItem ||
          (item.itemType === 'DPF' &&
            !this.props.isDiaperFundEnable &&
            item.amountFulfilled === 0)
        ) {
          return null;
        }
        return (
          <Cell
            key={`${item.rowID}`}
            className={classnames(
              view !== 'single' && styles.cell,
              enableNewRegDashboard
                ? 'large-4 sm-mb2'
                : classnames('large-3', styles.horizontalTile),
              'small-12 medium-6 pr1 pl1'
            )}
            data-locator="registry-createdregistry-landingpage-productlist"
          >
            <OwnerProductGridTile
              {...item}
              index={index}
              accordianKey={this.props.accordianKey}
              itemIndex={index + 1}
              actions={this.props.ctaLabels}
              contextPath={this.props.contextPath}
              onProductTileClick={this.props.onProductTileClick}
              updateSkuIdForAnchoring={this.props.updateSkuIdForAnchoring}
              buttonLayout={this.props.buttonLayout}
              labels={labels}
              owner={this.props.owner}
              variation={this.props.variation}
              registryId={registryId}
              eventType={this.props.eventType}
              coOwner={this.props.coOwner}
              categoryId={this.props.categoryId}
              updateGiftData={this.props.updateGiftData}
              enableKatori={this.props.enableKatori}
              registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
              removeRegistryItem={this.props.removeRegistryItem}
              markFavRegistryItem={this.props.markFavRegistryItem}
              updateInteractiveCheckList={this.props.updateInteractiveCheckList}
              isLoggedIn={this.props.isLoggedIn}
              activeRegistry={this.props.activeRegistry}
              isMobile={this.props.isMobile}
              getUpdatedCategoryData={this.props.getUpdatedCategoryData}
              deviceConfig={this.props.deviceConfig}
              tealiumData={tealiumData}
              handleTealiumEvent={this.props.handleTealiumEvent}
              favoriteStore={this.props.favoriteStore}
              tealiumObject={this.props.tealiumObject}
              siteId={this.props.siteId}
              filter={this.props.filter}
              updateFilterCount={this.props.updateFilterCount}
              initiateInactivityModal={this.props.initiateInactivityModal}
              isInternationalUser={intlUser}
              updatedSkuId={this.props.updatedSkuId}
              switchConfig={this.props.switchConfig}
              isMinimumQtyEnabled={this.props.isMinimumQtyEnabled}
              handleNandDReplaceModal={this.toggeleNandDReplaceModal}
              selectedFilterOption={this.props.selectedFilterOption}
              globalSwitchConfig={this.props.globalSwitchConfig}
              displayDiscountedPrice={this.props.displayDiscountedPrice}
              config={this.props.config}
              registryFacetsFilter={this.props.registryFacetsFilter}
              setFacetData={this.props.setFacetData}
              storeDetails={this.props.storeDetails}
              selectedCheckboxFilter={this.props.selectedCheckboxFilter}
              isBopisFeatureEnable={this.props.isBopisFeatureEnable}
              hideReplaceModal={this.hideReplaceModal}
              enableNewRegDashboard={this.props.enableNewRegDashboard}
            />
            {((this.props.mPulseEnabled &&
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
        );
      });
    const renderDFContentSlot = () => {
      return (
        !this.props.hasDiaperFund &&
        items &&
        this.props.isRegistryContentSlotReq &&
        this.props.eventType === 'Baby' &&
        this.props.isDiaperFundEnable && (
          <Cell
            className={classnames(
              view !== 'single' && styles.cell,
              'large-3 small-12 medium-6 pr1 pl1'
            )}
            data-locator="registry-createdregistry-landingpage-productlist"
          >
            <DFContentSlot labels={labels} siteId={this.props.siteId} />
          </Cell>
        )
      );
    };
    const renderContentSlot = () => {
      return (
        this.props.isRegistryContentSlotReq &&
        filteredCondition && (
          <Cell
            className={classnames(
              view !== 'single' && styles.cell,
              'large-3 small-12 medium-6 pr1 pl1'
            )}
            data-locator="registry-createdregistry-landingpage-productlist"
          >
            <ContentSlot
              labels={labels}
              styleVariation={this.props.styleVariation}
              siteId={this.props.siteId}
              registryData={registryData}
              enableNewRegDashboard={this.props.enableNewRegDashboard}
            />
          </Cell>
        )
      );
    };
    const replaceProps = {
      nandDProps: this.state.discontinuedProductDetails,
      getReplacedItemData: this.props.getReplacedItemData,
      fromReplace: true,
      closeReplaceModal: this.toggeleNandDReplaceModal,
      replaceProductFromRegistry: this.props.replaceProductFromRegistry,
    };
    return (
      <Cell className="small-12 medium-11 large-11 mx-auto">
        <GridX className={styles.printGrid}>
          {!enableNewRegDashboard && filteredCondition && renderDFContentSlot()}
          {renderProductTile()}
          {!enableNewRegDashboard &&
            !filteredCondition &&
            renderDFContentSlot()}
          {!enableNewRegDashboard && renderContentSlot()}

          {this.state.toggleModalState && (
            <ReplaceModalComponent
              registrylabels={labels}
              toggleModalState={this.state.toggleModalState}
              handleNandDReplaceModal={this.toggeleNandDReplaceModal}
              productId={this.state.productId}
              displayName={this.state.displayName}
              track={this.props.track}
              discontinuedProductDetails={this.state.discontinuedProductDetails}
              variation={this.props.variation}
              sortDataByDate={this.props.sortDataByDate}
              qtyPurchased={this.state.qtyPurchased}
              qtyRemaining={this.state.qtyRemaining}
              qtyRequested={this.state.qtyRequested}
              qtyWebPurchased={this.state.qtyWebPurchased}
              getReplacedItemData={this.props.getReplacedItemData}
              eventType={this.props.eventType}
              hideReplaceModal={this.hideReplaceModal}
              hideReplaceModalState={this.state.hideReplaceModalState}
              replaceProps={replaceProps}
              isQuickViewOpen={this.props.isQuickViewOpen}
            />
          )}
        </GridX>
      </Cell>
    );
  }
}
ProductGrid.propTypes = propTypes;
ProductGrid.defaultProps = defaultProps;
export default ProductGrid;
export { ProductGrid as PureProductGrid }; // pure component. used in tests
