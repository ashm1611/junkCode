import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import cloneDeep from 'lodash/fp/cloneDeep';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { decodeHtmlEntities } from '@bbb-app/utils/common';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import { personalizationApplicable } from '@bbb-app/utils/RegistryUtils';
import styles from './RegistryOwnerModalLayout.css';
import layout from './layout.css';
import {
  getProductTitle,
  renderPDPLinkText,
  renderShipSwap,
  renderGroupGift,
  renderProductImage,
  getCharLength,
  renderColorSizeUpc,
  renderWantPurchased,
  renderMarkAsPurchased,
  renderFavoriteBadge,
  renderFavouriteBtn,
  renderPurchasedBadge,
  renderFundedBadge,
  renderItemStatusBadge,
  ProductSkuAttributesRLP,
  getStoreAvailabilityMessage,
  renderButton,
  renderOOSMsg,
  renderRemoveCTA,
} from '../RegistryOwnerModalUtil';
import truncateWithEllipses from '../../../../../utils/truncateWithEllipses';
import {
  getFilterCount,
  OwnerProductGridTileUtil,
} from '../../OwnerProductGridTile/OwnerProductGridTileUtil';
import ContributionProgressBar from '../../GroupGifting/ContributionProgressBar/ContributionProgressBar';
import GroupGiftingTooltip from '../../OwnerProductGridTile/GroupGiftingTooltip';
import {
  updateQuantityData,
  getFavTealiumData,
} from '../../OwnerProductGridTile/OwnerProductTealiumEvent';
import { getTealiumVars } from '../../OwnerProductGridTile/TealiumVar';
import RegistryDetailModalRecommendation from '../../../../../containers/Pages/Registry/RegistryDetailModalRecommendation/RegistryDetailModalRecommendation';
import { updateFacetFiterData } from '../../utils/formatFacetFilters';
export const TOOL_TIP_BODY_LBL =
  "Contribute any amount you'd like. Even if an item isn't fully funded, the registrant will still receive your contribution. And we'll let them know you contributed to their gift, so they can properly send thanks.";
const propTypes = {
  registryModalData: PropTypes.object,
  refNum: PropTypes.string,
  isMobile: PropTypes.bool,
  hideParent: PropTypes.func,
  markedAsFav: PropTypes.bool,
  storeDetails: PropTypes.object,
  siteId: PropTypes.string,
};
const TEALIUM_PAGE_INFO = {
  page_type: 'Registry',
  page_name: 'update quantity',
};
/**
 * Renders Product Detail
 */
class RegistryOwnerModalLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.newlyCreatedCart = false;

    this.state = {
      want: this.props.registryModalData.qtyRequested,
      markedAsFav: this.props.registryModalData.markedAsFav,
      ltlDeliveryServices: this.props.registryModalData.ltlDeliveryServices,
      shipMethodUnsupported: this.props.registryModalData.shipMethodUnsupported,
      deliverySurcharge: this.props.registryModalData.deliverySurcharge,
      ltlShipMethodDesc: this.props.registryModalData.ltlShipMethodDesc,
      purchased: this.props.registryModalData.qtyPurchased,
      purchasedCheck: this.props.registryModalData.purchased,
      ltlModalMountedState: false,
    };
    this.purchasedValue = -1;
    this.wantValue = -1;
    this.statusFilter = this.props.registryModalData.statusFilter;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    ) {
      return true;
    }
    return false;
  }

  getTealiumVariable() {
    const imageURL = this.isPersonalizationApplicable()
      ? this.props.registryModalData.personalizedMobImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr(
            '',
            'sKUDetailVO.skuImages.mediumImage',
            this.props.registryModalData
          ),
          'largeImage'
        );
    return getTealiumVars(
      imageURL,
      this.displayTitle,
      this.props.registryModalData
    );
  }

  isPersonalizationApplicable() {
    const { refNum, sKUDetailVO } = this.props.registryModalData;
    return personalizationApplicable(refNum, sKUDetailVO.personalizationType);
  }

  markAsFavHandler = () => {
    const productInfo = {
      skuId: this.props.registryModalData.sKUDetailVO.skuId,
      updateRegistryId: this.props.registryModalData.registryId,
      markAsFav: this.state.markedAsFav ? 'N' : 'Y',
      productId: this.props.registryModalData.sKUDetailVO.parentProdId,
      rowId: this.props.registryModalData.rowID,
      itemTypes: this.props.registryModalData.itemType,
      regType: this.props.registryModalData.eventType,
      refNum: this.props.registryModalData.refNum,
      ltlDeliveryServices: this.state.ltlDeliveryServices,
    };
    let productData;
    productData = cloneDeep(
      this.props.registryModalData.registryOwnerFirstCategoryList
    );
    productData = productData.map(category => {
      const currentCategory = category;
      currentCategory.registryItemList.map(product => {
        const currentProduct = product;
        if (
          product.sKUDetailVO.skuId === productInfo.skuId &&
          product.refNum === productInfo.refNum &&
          product.ltlDeliveryServices === productInfo.ltlDeliveryServices
        ) {
          currentProduct.markedAsFav = !this.state.markedAsFav;
          currentProduct.purchased = this.state.want <= this.state.purchased;
          currentProduct.qtyPurchased = this.state.purchased;
          currentProduct.qtyRequested = this.state.want;
          currentProduct.statusFilter = this.statusFilter;
        }

        return currentProduct;
      });
      return currentCategory;
    });
    productData.favTealiumData = getFavTealiumData(
      this.props.registryModalData.registryId,
      this.props.registryModalData.eventType,
      this.props.registryModalData.sKUDetailVO
    );
    this.props.registryModalData.markFavRegistryItem(
      productInfo,
      productData,
      productInfo.skuId
    );

    const filterCount = getFilterCount(this.props);
    this.props.registryModalData.updateFilterCount(filterCount);
    this.toggleState();
  };

  toggleState = () => {
    this.setState({
      markedAsFav: !this.state.markedAsFav,
    });
  };
  updateRegistryItemSaga = args => {
    const {
      ltlDeliveryServices,
      shipMethodUnsupported,
      ltlShipMethodDesc,
      deliverySurcharge,
      want,
      purchased,
      oldPurchased,
      oldWant,
    } = args;
    const { registryModalData } = this.props;
    let itemPrice = 0;
    const isLTLItem = pathOr(false, 'sKUDetailVO.ltlItem', registryModalData);
    if (isLTLItem) {
      itemPrice = registryModalData.totalPrice;
    } else if (this.isPersonalizationApplicable()) {
      itemPrice = registryModalData.personlisedDoublePrice;
    } else {
      itemPrice = registryModalData.price;
    }

    const updateData = {
      skuId: registryModalData.sKUDetailVO.skuId,
      updateRegistryId: registryModalData.registryId,
      updateQuantity: this.state.want,
      productId: registryModalData.sKUDetailVO.parentProdId,
      regItemOldQty: oldWant,
      regItemOldPurchasedQty: oldPurchased,
      purchasedQuantity: this.state.purchased,
      rowId: registryModalData.rowID,
      itemTypes: registryModalData.itemType,
      regType: registryModalData.eventType,
      refNum: registryModalData.refNum,
      ltlDeliveryServices,
      isGroupGiftedItem:
        registryModalData.ggEligibleItem &&
        !registryModalData.isInternationalUser,
      itemPrice,
      itemStatusFilter: registryModalData.statusFilter,
    };
    registryModalData.initiateInactivityModal(true);

    const updateQuantity = (
      skuId,
      refNum,
      contributionRequired,
      contributionReceived,
      itemStatus,
      itemStatusFilter
    ) => {
      const { purchasedCheck } = this.state;
      let productData = cloneDeep(
        registryModalData.registryOwnerFirstCategoryList
      );
      productData = productData.map(category => {
        const currentCategory = category;
        currentCategory.registryItemList.map(product => {
          const currentProduct = product;
          if (
            product.sKUDetailVO.skuId === skuId &&
            product.refNum === refNum &&
            product.ltlDeliveryServices === ltlDeliveryServices
          ) {
            currentProduct.qtyPurchased = purchased;
            currentProduct.qtyRequested = want;
            currentProduct.purchased = purchasedCheck;
            currentProduct.amountFulfilled = contributionReceived || 0;
            currentProduct.ggItemContributionNeeded = contributionRequired || 0;
            currentProduct.ggRegItemStatus = itemStatus || '';
            currentProduct.statusFilter = itemStatusFilter;
            currentProduct.markedAsFav = this.state.markedAsFav;
            this.statusFilter = itemStatusFilter;
          }
          return currentProduct;
        });
        return currentCategory;
      });
      registryModalData.getUpdatedCategoryData(productData, skuId);
    };

    const hanldleUpdateWantPurchased = ({
      itemsTotalPrice,
      contributionRequired,
      contributionReceived,
      itemStatus,
      itemStatusFilter,
    }) => {
      const updatedGiftRegistered =
        updateData.updateQuantity - updateData.regItemOldQty;
      const updatedGiftPurchased =
        updateData.purchasedQuantity - updateData.regItemOldPurchasedQty;
      this.setState({
        purchasedCheck:
          updateData.purchasedQuantity >= updateData.updateQuantity,
      });
      /* istanbul ignore else  */
      if (updatedGiftRegistered !== 0) {
        registryModalData.updateInteractiveCheckList(false);
      }
      registryModalData.updateGiftData(
        updatedGiftRegistered,
        updatedGiftPurchased,
        itemsTotalPrice
      );
      updateQuantity(
        updateData.skuId,
        updateData.refNum,
        contributionRequired,
        contributionReceived,
        itemStatus,
        itemStatusFilter
      );
    };

    try {
      ServiceUtil.triggerServerRequest({
        url: getApiEndPointsFromStore('registryUpdateItem'),
        method: 'PUT',
        showLoader: true,
        data: qs.stringify(updateData),
      })
        .then(res => {
          const { serviceStatus, data } = res && res.body;
          if (serviceStatus === 'SUCCESS') {
            const statusFilterData = pathOr('', 'component.statusFilter', data);
            const registryUpdatedFacetsFilter = updateFacetFiterData(
              registryModalData.registryFacetsFilter,
              { statusFilterData }
            );
            registryModalData.setFacetData(registryUpdatedFacetsFilter);
            this.setState({
              ltlDeliveryServices,
              shipMethodUnsupported,
              ltlShipMethodDesc,
              deliverySurcharge,
              formattedDeliverySurcharge: `$${deliverySurcharge}`,
            });
            hanldleUpdateWantPurchased({ ...data.component });
            const filterCount = getFilterCount(this.props);
            registryModalData.updateFilterCount(filterCount);
            const { sKUDetailVO, tealiumData } = registryModalData;
            const tealiumProductProps = {
              sKUDetailVO,
              productURL: registryModalData.productURL,
              price: registryModalData.price,
              catId: registryModalData.jdaCatId,
              imageTitle: this.displayTitle,
              levelOfService: registryModalData.ltlShipMethodDesc,
            };
            const registryQuantityTealiumInfo = updateQuantityData(
              tealiumData,
              registryModalData.favoriteStore,
              registryModalData.qtyRequested,
              registryModalData.qtyPurchased,
              tealiumProductProps
            );
            registryQuantityTealiumInfo.product_quantity = [
              updateData.updateQuantity,
            ];
            registryModalData.handleTealiumEvent(
              'update quantity',
              Object.assign({}, registryQuantityTealiumInfo),
              TEALIUM_PAGE_INFO
            );
          }
        })
        .catch(e => {
          OwnerProductGridTileUtil.handleSagaError(e);
        });
    } catch (e) {
      OwnerProductGridTileUtil.handleSagaError(e);
    }
  };

  changeQuantity = (type, value, element, field) => {
    const {
      ltlDeliveryServices,
      shipMethodUnsupported,
      ltlShipMethodDesc,
      deliverySurcharge,
      want,
      purchased,
    } = this.state;
    const args = {
      ltlDeliveryServices,
      shipMethodUnsupported,
      ltlShipMethodDesc,
      deliverySurcharge,
      want: type === 'want' ? value : this.state.want,
      purchased: type === 'purchased' ? value : this.state.purchased,
      oldPurchased: this.state.purchased,
      oldWant: this.state.want,
    };

    /* check if Quantity selected is same as before */
    const isQuantitySame = () => {
      const isPurchasedSame =
        type === 'purchased' &&
        value === purchased &&
        this.purchasedValue === -1;
      const isWantSame =
        type === 'want' && value === want && this.wantValue === -1;
      return isPurchasedSame || isWantSame;
    };

    if (!isNaN(value)) {
      if (isQuantitySame()) {
        return;
      }
      this.setState({ [type]: value }, () => {
        /*
            If Element is a select box and user selected 10+ from dropdown
            Populate input with last selected value and move focus in this input
          */
        if (element === 'select' && value === 10) {
          const refElement = document.getElementById(field);
          if (type === 'purchased' && refElement) {
            refElement.value = purchased;
            refElement.focus();
            this.purchasedValue = purchased;
          }
          if (type === 'want' && refElement) {
            refElement.value = want;
            refElement.focus();
            this.wantValue = want;
          }
        } else if (
          (type === 'purchased' &&
            this.state.purchased !== this.purchasedValue) ||
          (type === 'want' && this.state.want !== this.wantValue)
        ) {
          if (type === 'purchased' && this.purchasedValue !== -1) {
            args.purchased = value;
            args.oldPurchased = this.purchasedValue;
          }
          if (type === 'want' && this.wantValue !== -1) {
            args.want = value;
            args.oldWant = this.wantValue;
          }
          this.purchasedValue = -1;
          this.wantValue = -1;
          this.updateRegistryItemSaga(args);
        }
      });
    } else if (type === 'purchased') {
      this.setState({ purchased: 0 }, () => this.updateRegistryItemSaga(args));
    } else if (type === 'want') {
      this.setState({ want: 1 }, () => this.updateRegistryItemSaga(args));
    }
  };
  renderModalRecommendation = isPurchased => {
    const productId = pathOr(
      '',
      'registryModalData.sKUDetailVO.parentProdId',
      this.props
    );
    return (
      <RegistryDetailModalRecommendation
        {...this.props}
        productId={productId}
        isPurchased={isPurchased}
        itemTypes={this.props.registryModalData.itemType}
      />
    );
  };

  renderCashFunds = () => {
    const {
      amountFulfilled,
      personlisedPrice,
      enableNewRegDashboard,
    } = this.props.registryModalData;
    return (
      <React.Fragment>
        <div className={!this.isDiaperFundSku && styles.borderTop} />
        <div
          className={classnames(
            'md-mb2 md-mt1',
            enableNewRegDashboard && styles.staticSectionNew
          )}
        >
          <GroupGiftingTooltip
            heading={'Cash Funds'}
            title={'Cash Funds'}
            description={TOOL_TIP_BODY_LBL}
            toolTipAlign={`outerTooltipGG`}
            amountFulfilled={amountFulfilled}
            showFulfilledAmount
            iconProps={this.isMobileScreen && { width: '12px', height: '12px' }}
            ggItemContributionNeeded={personlisedPrice}
            commonStyle={styles.commonAmount}
            toolTipOnMob={styles.toolTipAlign}
            fromModal={this.props.siteId === 'BuyBuyBaby'}
            isCashFund
            enableNewRegDashboard={enableNewRegDashboard}
          />
          <ContributionProgressBar
            amountFulfilled={amountFulfilled}
            ggItemContributionNeeded={personlisedPrice}
            commonStyle={styles.commonAmount}
            RegistryDetails="RegistryDetailsModal"
            isCashFund
            enableNewRegDashboard={enableNewRegDashboard}
          />
        </div>
      </React.Fragment>
    );
  };
  render() {
    const { registryModalData, isMobile, storeDetails } = this.props;
    const displayname =
      registryModalData.sKUDetailVO &&
      registryModalData.sKUDetailVO.displayName;
    const tealiumData = {
      pagename_breadcrumb: `registry product flyout for registrants: ${displayname}`,
      call_to_actiontype: 'Registrant_ProductFlyout',
      product_id: [
        registryModalData && registryModalData.sKUDetailVO.parentProdId,
      ],
      Reg_Product_View: true,
      registry_add_location: 'Registry Owner',
    };
    const isBopisFeatureEnable = pathOr(
      false,
      'isBopisFeatureEnable',
      registryModalData
    );
    const enableItemStatus = pathOr(
      false,
      'enableItemStatus',
      registryModalData.switchConfig
    );
    const enableOtherRecomm = pathOr(
      false,
      'switchConfig.enableRegOtherRecommendation',
      registryModalData
    );
    const isCashFundEnabled = pathOr(
      false,
      'switchConfig.enableCashFund',
      registryModalData
    );

    const sKUDetailVO = pathOr({}, 'registryModalData.sKUDetailVO', this.props);
    const refNum = registryModalData.refNum;
    const charLength = getCharLength();

    const isPurchased = this.state.want <= this.state.purchased;
    const fundedBadge = renderFundedBadge({
      ggFundedBadge: registryModalData.ggFundedBadge,
    });

    const itemStatusBadge =
      !isPurchased &&
      enableItemStatus &&
      renderItemStatusBadge({
        props: { ...registryModalData },
        babysiteId: registryModalData.isBabySite,
      });
    const { isBelowLineItem } = registryModalData;
    const CashFundPrice = pathOr(
      '',
      'priceView.props.itemPrice',
      registryModalData
    );
    const formattedCashFundPrice = CashFundPrice.slice(0, -3);
    const enableNewRegDashboard = pathOr(
      false,
      'enableNewRegDashboard',
      registryModalData
    );

    return (
      <div className={styles.productDetails}>
        <div
          className={classnames(
            layout.twoColumnLayout,
            registryModalData.itemType === 'CSH' &&
              enableNewRegDashboard &&
              layout.twoColumnLayoutNew
          )}
        >
          <div
            className={classnames(
              enableNewRegDashboard && layout.imageWrapperNew,
              layout.imageWrapper
            )}
          >
            {!enableNewRegDashboard &&
              renderFavoriteBadge(
                registryModalData.isBabySite,
                this.markAsFavHandler,
                this.state.markedAsFav
              )}
            {renderProductImage({
              personalizedImageUrls: registryModalData.personalizedImageUrls,
              displayTitle: truncateWithEllipses({
                str: sKUDetailVO.displayName,
                charLength,
              }),
              basicImage:
                isCashFundEnabled && registryModalData.itemType === 'CSH'
                  ? registryModalData.personalizedImageUrls
                  : pathOr('', 'skuImages.basicImage', sKUDetailVO),
              sKUDetailVO,
              items: registryModalData.itemType === 'CSH',
              enableNewRegDashboard,
            })}
          </div>
          <div className={layout.detailWrapper}>
            {(isPurchased || fundedBadge || itemStatusBadge) && (
              <div className={styles.badgeStyle}>
                {isPurchased &&
                  renderPurchasedBadge({
                    babysiteId: registryModalData.isBabySite,
                    itemType: registryModalData.itemType,
                  })}
                {!isPurchased && fundedBadge}
                {(!(isBelowLineItem && isBelowLineItem === 'true') ||
                  enableNewRegDashboard) &&
                  itemStatusBadge}
              </div>
            )}
            {registryModalData.itemType !== 'CSH' &&
              sKUDetailVO.displayName &&
              getProductTitle(decodeHtmlEntities(sKUDetailVO.displayName))}
            {registryModalData.itemType === 'CSH' &&
              registryModalData.personalizationDescription &&
              getProductTitle(
                decodeHtmlEntities(registryModalData.personalizationDescription)
              )}
            {!enableNewRegDashboard &&
              enableItemStatus &&
              renderOOSMsg({ props: { ...registryModalData } })}
            {registryModalData.itemType !== 'CSH' ? (
              <div className={styles.priceStyle}>
                {registryModalData.priceView}
              </div>
            ) : (
              <div className={styles.priceStyleCashFund}>
                {formattedCashFundPrice}
              </div>
            )}
            {!isMobile && (
              <div data-locator="quick-view-item-attribute">
                {isBopisFeatureEnable &&
                  getStoreAvailabilityMessage({
                    storeDetails,
                    selectedCheckboxFilter:
                      registryModalData.selectedCheckboxFilter,
                    skuInStore: registryModalData.skuInStore,
                  })}
                {ProductSkuAttributesRLP({
                  sKUDetailVO,
                  refNum,
                  ltlShipMethodDesc: registryModalData.ltlShipMethodDesc,
                  ltlDeliveryServices: registryModalData.ltlDeliveryServices,
                  shipMethodUnsupported:
                    registryModalData.shipMethodUnsupported,
                  activeRegistry: registryModalData.activeRegistry,
                  isPOBoxAddress: registryModalData.isPOBoxAddress,
                  totalDeliveryCharges: registryModalData.totalDeliveryCharges,
                  formattedTotalDeliveryCharges:
                    registryModalData.formattedTotalDeliveryCharges,
                  formattedPrice: registryModalData.formattedPrice,
                  dslUpdateableMessage: registryModalData.dslUpdateableMessage,
                  hideParent: this.props.hideParent,
                })}
              </div>
            )}
          </div>
        </div>
        <div>
          {isMobile && (
            <div data-locator="quick-view-item-attribute">
              {isBopisFeatureEnable &&
                getStoreAvailabilityMessage({
                  storeDetails,
                  selectedCheckboxFilter:
                    registryModalData.selectedCheckboxFilter,
                  skuInStore: registryModalData.skuInStore,
                })}
              {ProductSkuAttributesRLP({
                sKUDetailVO,
                refNum,
                ltlShipMethodDesc: registryModalData.ltlShipMethodDesc,
                ltlDeliveryServices: registryModalData.ltlDeliveryServices,
                shipMethodUnsupported: registryModalData.shipMethodUnsupported,
                activeRegistry: registryModalData.activeRegistry,
                isPOBoxAddress: registryModalData.isPOBoxAddress,
                totalDeliveryCharges: registryModalData.totalDeliveryCharges,
                formattedTotalDeliveryCharges:
                  registryModalData.formattedTotalDeliveryCharges,
                formattedPrice: registryModalData.formattedPrice,
                dslUpdateableMessage: registryModalData.dslUpdateableMessage,
                hideParent: this.props.hideParent,
              })}
            </div>
          )}
          {isCashFundEnabled &&
            !enableNewRegDashboard &&
            registryModalData.itemType === 'CSH' &&
            this.renderCashFunds()}
          {registryModalData.itemType !== 'CSH' &&
            !enableNewRegDashboard &&
            renderColorSizeUpc({
              color: sKUDetailVO.color,
              size: decodeHtmlEntities(sKUDetailVO.size),
              upc: sKUDetailVO.upc,
            })}
          {registryModalData.itemType !== 'CSH' &&
            renderWantPurchased({
              qtyRequested: registryModalData.qtyRequested,
              accordianKey: registryModalData.accordianKey,
              index: registryModalData.index,
              want: this.state.want,
              purchased: this.state.purchased,
              changeQuantity: this.changeQuantity,
              enableNewRegDashboard,
            })}

          {registryModalData.shipSwapView &&
            renderShipSwap({
              shipSwapView: registryModalData.shipSwapView,
              isPurchased,
            })}
          {registryModalData.groupGiftView &&
            !enableNewRegDashboard &&
            renderGroupGift({
              groupGiftView: registryModalData.groupGiftView,
            })}
          {renderFavouriteBtn(
            registryModalData.isBabySite,
            this.markAsFavHandler,
            this.state.markedAsFav,
            enableNewRegDashboard
          )}
          {(!isPurchased || enableNewRegDashboard) &&
            registryModalData.itemType !== 'CSH' &&
            !(registryModalData.itemType === 'DPF' && fundedBadge) &&
            renderMarkAsPurchased(
              this.state.want,
              this.changeQuantity,
              isPurchased,
              enableNewRegDashboard,
              registryModalData.isBabySite
            )}
          {registryModalData.groupGiftView &&
            enableNewRegDashboard &&
            renderGroupGift({
              groupGiftView: registryModalData.groupGiftView,
              enableNewRegDashboard,
            })}
          {isCashFundEnabled &&
            enableNewRegDashboard &&
            registryModalData.itemType === 'CSH' &&
            this.renderCashFunds()}
          {(!isPurchased || enableNewRegDashboard) &&
            registryModalData.itemType !== 'DPF' &&
            renderButton({ ...this.props, want: this.state.want })}
          {enableNewRegDashboard
            ? renderRemoveCTA(registryModalData.removeRegistry)
            : renderPDPLinkText(
                registryModalData,
                isPurchased,
                this.getTealiumVariable,
                this.props.hideParent
              )}

          {enableOtherRecomm && this.renderModalRecommendation(isPurchased)}
          <TealiumHandler
            identifier="REGISTRY_MODAL_INFO"
            tealiumPageInfoNotAvailable
            utagData={tealiumData}
          />
        </div>
      </div>
    );
  }
}

RegistryOwnerModalLayout.propTypes = propTypes;

export default RegistryOwnerModalLayout;
