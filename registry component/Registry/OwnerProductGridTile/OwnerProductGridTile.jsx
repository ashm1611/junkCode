/* eslint max-lines: ["error", 1800]*/
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import qs from 'qs';
import isEmpty from 'lodash/fp/isEmpty';
import cloneDeep from 'lodash/fp/cloneDeep';
import pathOr from 'lodash/fp/pathOr';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import truncate from '@bbb-app/utils/truncate';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import {
  decodeHtmlEntities,
  isMobileDevice,
  isBedBathCanada,
} from '@bbb-app/utils/common';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import Button from '@bbb-app/core-ui/button';
import ImgSrcSet from '@bbb-app/core-ui/image-src-set/ImageSrcSet';
import Icon from '@bbb-app/core-ui/icon';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import CustomHTMLTooltip from '@bbb-app/core-ui/custom-html-tooltip/CustomHTMLTooltip';
import {
  PRODUCT_IMAGE_PLACEHOLDER,
  PRODUCT_DEFAULT_IMAGE,
} from '@bbb-app/constants/appConstants';
import { LTL_DSL_UPDATE_LINK_LBL } from '@bbb-app/constants/registryConstants';
import '@bbb-app/assets/icons/bbb_fav.svg';
import '@bbb-app/assets/icons/bbb_fav_white.svg';
import '@bbb-app/assets/icons/checkmarkwhite.svg';
import '@bbb-app/assets/icons/infoIcon.svg';
import '@bbb-app/assets/icons/inline/cart.svg';
import '@bbb-app/assets/icons/star-double.svg';
import '@bbb-app/assets/icons/bbb_must_have.svg';
import '@bbb-app/assets/icons/bbb_must_have_white.svg';
import '@bbb-app/assets/icons/baby_must_have.svg';
import '@bbb-app/assets/icons/baby_must_have_white.svg';
import '@bbb-app/assets/icons/myitems_cross.svg';
import {
  personalizationApplicable,
  showDiscountedPrice,
} from '@bbb-app/utils/RegistryUtils';
import styles from './OwnerProductGridTile.css';
import propTypes, { defaultProps } from '../ProductGridTile/props';
import '../../../../assets/icons/ellipsis.svg';
import '../../../../assets/icons/cross.svg';
import '../../../../assets/icons/outofstock.svg';
import Price from '../Price';
import {
  DATA_LOCATORS,
  SITE_ID_BBBY,
  SITE_ID_BBBY_TBS,
  TEALIUM_PAGE_INFO,
  PURCHASE_DTL_LBL,
  ADDED_MY_FUNDS_LBL,
  BUY_IT_NOW_LBL,
  SHIP_OR_SWAP_LBL,
  PURCHASED_LBL,
  PROGRESS_BAR_TITLE_LBL,
  TOOL_TIP_BODY_LBL,
  TOOL_TIP_HEADING_LBL,
  FUNDED_LBL,
  DELETE_GROUP_GIFTING_INFO_LBL,
  DELETE_GROUP_GIFTING_ITEM_CTA_LBL,
  DELETE_GROUP_GIFTING_ITEM_HEADER_LBL,
  KEEP_GROUP_GIFTING_ITEM_CTA_LBL,
  DIAPER_FUND_LBL,
  TOOL_TIP_DIAPER_HEADING_LBL,
  TOOL_TIP_DIAPER_BODY_LBL,
  PURCHASHED_LBL,
  BOPUS_AVAIL_LBL,
  BOPUS_READY_LBL,
  CURRENTLY_SOLD_OUT_LBL,
  EDIT_LBL,
  REMOVE_LBL,
  OOS_MSG_LBL,
  FAVOURITE_REGISTRY_CANADA_LBL,
  FAVOURITE_REGISTRY_LBL,
} from './constants';
import {
  getTealiumData,
  getFavTealiumData,
  getRemoveTealiumData,
  updateQuantityData,
} from './OwnerProductTealiumEvent';
import { getTealiumVars } from './TealiumVar';
import {
  getPDPURL,
  getFilterCount,
  OwnerProductGridTileUtil,
  renderFavIcons,
  renderMustHaveIcons,
} from './OwnerProductGridTileUtil';
import '../../../../assets/icons/RBYRIcon.svg';
import ContributionProgressBar from '../GroupGifting/ContributionProgressBar/ContributionProgressBar';
import GroupGiftingTooltip from './GroupGiftingTooltip.async';
import LTLAltDslModal from '../../../../containers/LTLAltDslModal/LTLAltDslModal.async';
import RegistryEllipsesButtons from './RegistryEllipsesButtons/RegistryEllipsesButton.async';
import ggStyle from '../ProductGridTile/ProductGridTile.css';
import { updateFacetFiterData } from '../../../../components/Pages/Registry/utils/formatFacetFilters';
import AddToCart from '../../../../containers/AddToCart/AddToCart.async';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal.async';
import ReplaceItem from '../../../../containers/Pages/Registry/ReplaceItem/ReplaceItem';
import {
  DISCONTINUED_LBL,
  NO_LONGER_CARRY_LBL,
} from '../../RegistryNotifications/constants';
import {
  ADDITIONAL_SERVICE_LBL,
  LTL_DSL_NO_LONGER_AVAILABLE_LBL,
} from '../../Registry/constants';

const breakPoint = 640;

/** dummy css class name to prevent click event for SOS event*/
const preventModalClick = 'preventModalClick';

class OwnerProductGridTile extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  constructor(props) {
    super(props);
    this.state = {
      want: this.props.qtyRequested,
      purchased: this.props.qtyPurchased,
      ltlDeliveryServices: this.props.ltlDeliveryServices,
      shipMethodUnsupported: this.props.shipMethodUnsupported,
      deliverySurcharge: this.props.deliverySurcharge,
      ltlShipMethodDesc: this.props.ltlShipMethodDesc,
      purchasedCheck: this.props.purchased,
      ltlModalMountedState: false,
      index: this.props.index,
      [`showDeleteModal_${this.props.index}`]: false,
      ellipsesChunkLoaded: false,
    };
    this.onProductTileClick = this.onProductTileClick.bind(this);
    this.removeRegistryItem = this.removeRegistryItem.bind(this);
    this.markAsFavHandler = this.markAsFavHandler.bind(this);
    this.getStoreAvailabilityMessage = this.getStoreAvailabilityMessage.bind(
      this
    );
    this.renderGroupGift = this.renderGroupGift.bind(this);
    this.isPersonalizationApplicable = this.isPersonalizationApplicable.bind(
      this
    );
    this.onUpdateLtlDsl = this.onUpdateLtlDsl.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.togglehoverModalState = this.togglehoverModalState.bind(this);
    this.renderRBYRFundReceived = this.renderRBYRFundReceived.bind(this);
    this.renderFundedBadge = this.renderFundedBadge.bind(this);
    this.renderDslUpdateableMessage = this.renderDslUpdateableMessage.bind(
      this
    );
    this.hideFlyout = this.hideFlyout.bind(this);
    this.showDiscountedPrice = showDiscountedPrice(props);
    this.isMobileScreen = getWindowInnerWidth() < breakPoint;
    this.isBabySite =
      this.props.siteId === SITE_ID_BBBY ||
      this.props.siteId === SITE_ID_BBBY_TBS;
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sKUDetailVO.skuId !== this.props.sKUDetailVO.skuId ||
      nextProps.sKUDetailVO.parentProdId !== this.props.sKUDetailVO.parentProdId
    ) {
      this.setState({
        purchasedCheck: nextProps.purchased,
        ltlDeliveryServices: nextProps.ltlDeliveryServices,
        shipMethodUnsupported: nextProps.shipMethodUnsupported,
        deliverySurcharge: nextProps.deliverySurcharge,
        ltlShipMethodDesc: nextProps.ltlShipMethodDesc,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !nextProps.updatedSkuId ||
      nextProps.updatedSkuId === this.props.sKUDetailVO.skuId ||
      nextProps.sKUDetailVO.skuId !== this.props.sKUDetailVO.skuId ||
      nextProps.sKUDetailVO.parentProdId !==
        this.props.sKUDetailVO.parentProdId ||
      nextProps.ggEligibleItem ||
      this.state.ellipsesChunkLoaded !== nextState.ellipsesChunkLoaded ||
      this.props.qtyRequested !== nextProps.qtyRequested ||
      this.props.qtyPurchased !== nextProps.qtyPurchased
    );
  }
  onProductTileClick(e) {
    const REMOVE = REMOVE_LBL;
    const Edit = EDIT_LBL;
    const tealiumData = {
      call_to_actiontype: 'Registrant_EditProduct',
      product_id: [this.props.sKUDetailVO.parentProdId],
      registry_add_location: 'Registry',
      crossell_page: 'non-cross sell',
      crossell_product: 'non-cross sell',
      internal_search_term: 'non-search',
      merchandising_category: 'non-browse',
      merchandising_main_level: 'non-browse',
      merchandising_subcategory: 'non-browse',
    };
    if (
      this.props.handleTealiumEvent &&
      typeof this.props.handleTealiumEvent === 'function' &&
      e.target.textContent === Edit
    ) {
      this.props.handleTealiumEvent('', tealiumData, '');
    }
    if (
      e.target.textContent === REMOVE ||
      e.target.textContent === LTL_DSL_UPDATE_LINK_LBL ||
      (e.target.textContent !== Edit && e.target.tagName === 'BUTTON') ||
      ((e.target.textContent === PROGRESS_BAR_TITLE_LBL ||
        e.target.textContent === DIAPER_FUND_LBL) &&
        e.target.tagName === 'DIV') ||
      document.querySelector('#rclModal') ||
      e.target.textContent === BUY_IT_NOW_LBL ||
      (e.target.className && e.target.className.includes(preventModalClick))
    ) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    this.hideFlyout();
    const productInfo = {
      isPersonalised: this.isPersonalizationApplicable(),
      personalizationType: this.props.sKUDetailVO.personalizationType,
      ltlMethod: this.state.ltlDeliveryServices,
      selectedSkuId: this.props.sKUDetailVO.skuId,
      isLtlItem: this.props.sKUDetailVO.ltlItem,
      totalPrice: this.props.formattedPrice,
      pdpUrl: getPDPURL(this.props, this.state),
      personalizedPrice: this.props.formattedPersonalizedPrice,
      ltlFlag: this.props.sKUDetailVO.ltlItem,
      inCart: pathOr(false, 'inCartFlag', this.props.sKUDetailVO),
      formattedPrice: this.props.totalPrice,
      removeRegistry:
        this.props.ggEligibleItem && this.props.amountFulfilled > 0
          ? this.removeGroupGiftItem
          : this.removeRegistryItem,
      priceView: this.renderPrice(),
      shipSwapView:
        pathOr(0, 'qtySVPurchased', this.props) > 0 &&
        this.renderRBYRFundReceived,
      groupGiftView:
        this.props.ggEligibleItem &&
        (this.props.ggItemContributionNeeded !== 0 ||
          this.props.amountFulfilled !== 0) &&
        !this.props.isInternationalUser &&
        this.renderGroupGift,
      ...this.props,
      isBabySite: this.isBabySite,
      ggFundedBadge: this.renderFundedBadge,
      dslUpdateableMessage: this.renderDslUpdateableMessage,
    };
    this.props.onProductTileClick(true, productInfo);
    this.props.updateSkuIdForAnchoring(
      this.props.sKUDetailVO.skuId,
      this.props.categoryId
    );
  }

  onUpdateLtlDsl(e, hideParent) {
    e.preventDefault();
    if (hideParent) {
      this.fromEditModal = true;
      hideParent();
    }
    this.toggleLTLModalState(true);
  }

  onRemoveGroupGift() {
    return (
      this.state[`showDeleteModal_${this.state.index}`] && (
        <ConfirmationModal
          showDeleteModal={this.state[`showDeleteModal_${this.state.index}`]}
          toggleDeleteModal={this.toggleDeleteModal}
          primaryCTAHandler={this.keepGroupGiftItem}
          secondaryCTAHandler={this.removeRegistryItem}
          title={DELETE_GROUP_GIFTING_ITEM_HEADER_LBL}
          description={truncate(DELETE_GROUP_GIFTING_INFO_LBL, 255)}
          primaryCTALabel={KEEP_GROUP_GIFTING_ITEM_CTA_LBL}
          secondaryCTALabel={DELETE_GROUP_GIFTING_ITEM_CTA_LBL}
        />
      )
    );
  }

  getTealiumVariable() {
    const imageURL = this.isPersonalizationApplicable()
      ? this.props.personalizedMobImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr('', 'sKUDetailVO.skuImages.mediumImage', this.props),
          'largeImage'
        );
    return getTealiumVars(imageURL, this.displayTitle, this.props);
  }

  getStoreAvailabilityMessage = () => {
    const { selectedCheckboxFilter, skuInStore } = this.props;
    const { commonName, state } = this.props.storeDetails || {};
    const lblBopusAvail = BOPUS_AVAIL_LBL;
    const lblBopusReady = BOPUS_READY_LBL;
    const availabilityMessage =
      selectedCheckboxFilter === 'store-pickup' ? lblBopusReady : lblBopusAvail;
    const storeName = commonName ? commonName.trim() : '';
    if (!this.props.ggEligibleItem && skuInStore === '1') {
      return (
        <div
          className={classnames('mb1 pr2', styles.storeAvailabiliyMessage)}
          data-locator="bopisDetails"
        >
          <span
            className={styles.twoHoursMessage}
            data-locator="bopisAvailabilityLabel"
          >{`${availabilityMessage} `}</span>
          {`at ${storeName}, ${state}`}
        </div>
      );
    }
    return null;
  };

  getDesktopMediaQuery() {
    const {
      className,
      sKUDetailVO,
      switchConfig,
      isBelowLineItem,
      enableNewRegDashboard,
    } = this.props;

    const rootStyles = classnames({
      [ggStyle.base]: true,
      [className]: className,
      [ggStyle.hoverTile]: true,
      [styles.RLVOwnerTile]: true,
    });
    const enableItemStatus = pathOr(false, 'enableItemStatus', switchConfig);
    const isLtlItem = sKUDetailVO && sKUDetailVO.ltlItem;
    return (
      <ResponsiveMediaQuery minWidth={breakPoint}>
        <PrimaryLink
          href="#"
          onClick={this.onProductTileClick}
          type="noUnderline"
          className={rootStyles}
        >
          <article className={ggStyle.wrapper} data-sku={this.props.sku}>
            <div
              className={classnames('relative', ggStyle.imageMainContainer)}
              data-locator="OwnerViewItemTile"
            >
              <div className={classnames('absolute', styles.topButtonSection)}>
                {enableNewRegDashboard ? (
                  this.renderRemoveItem()
                ) : (
                  <Fragment>
                    {this.renderEllipsis()}
                    {this.renderFavorite()}
                  </Fragment>
                )}
              </div>
              <div
                className={classnames(
                  ggStyle.imageContainer,
                  !enableNewRegDashboard && 'mb2'
                )}
              >
                {this.renderProductImage()}
                {!(isBelowLineItem && isBelowLineItem === 'true') &&
                  this.props.displayNotifyRegistrantMsg &&
                  enableItemStatus &&
                  !enableNewRegDashboard &&
                  this.renderItemStatusBadge()}
                {this.renderAlreadyPurchased()}
                {!this.props.purchased &&
                  this.props.ggEligibleItem &&
                  this.renderFundedBadge()}
                {enableNewRegDashboard && this.renderFavorite()}
              </div>
            </div>
            <Fragment>
              <div className="mb1" data-locator="itemDetails">
                {!enableNewRegDashboard && this.renderPrice()}
                {this.renderTitle()}
                {enableNewRegDashboard && this.renderPrice()}
                {enableItemStatus &&
                  enableNewRegDashboard &&
                  this.renderItemStatusBadge()}
                {enableItemStatus &&
                  !enableNewRegDashboard &&
                  this.renderOOSMsg()}
                {this.props.isBopisFeatureEnable &&
                  this.getStoreAvailabilityMessage()}
              </div>
              {this.renderLtlDslDetails()}
              <div
                className={
                  this.props.itemType === 'CSH'
                    ? ggStyle.productDetailSectionCHF
                    : ggStyle.productDetailSection
                }
              >
                {pathOr(0, 'qtySVPurchased', this.props) > 0 &&
                  this.renderRBYRFundReceived()}
                {this.renderGroupGift()}
                {this.props.itemType === 'CSH' &&
                  this.props.switchConfig.enableCashFund &&
                  this.renderCashFunds()}
                {!enableNewRegDashboard && this.renderReplaceCTA()}
                {this.props.itemType !== 'CSH' && this.renderWantPurchased()}
                {isLtlItem && this.renderLtlDslModal()}
              </div>
              {this.onRemoveGroupGift()}
            </Fragment>
          </article>
        </PrimaryLink>
      </ResponsiveMediaQuery>
    );
  }
  getMobileMediaQuery() {
    const {
      sku,
      purchased,
      switchConfig,
      ggRegItemStatus,
      isBelowLineItem,
      displayNotifyRegistrantMsg,
      sKUDetailVO,
      enableNewRegDashboard,
    } = this.props;
    const enableItemStatus = pathOr(false, 'enableItemStatus', switchConfig);
    const isCurrentlySoldOut =
      isBelowLineItem === 'true' ||
      displayNotifyRegistrantMsg === 'D' ||
      displayNotifyRegistrantMsg === 'N';
    const ItemStatusbabyBadge = this.isBabySite
      ? styles.ItemStatusbabyBadge
      : '';
    const isLtlItem = sKUDetailVO && sKUDetailVO.ltlItem;
    return (
      <ResponsiveMediaQuery maxWidth={breakPoint - 1}>
        <div
          className={classnames(
            enableNewRegDashboard
              ? classnames(styles.mobileNewBase, 'p2')
              : 'p1',
            this.props.itemType === 'CSH'
              ? ggStyle.mobileBaseCashFund
              : ggStyle.mobileBase
          )}
          data-sku={sku}
        >
          <div className="relative">{this.renderFavorite()}</div>
          <div className={styles.ellipsesallign}>
            {enableNewRegDashboard
              ? this.renderRemoveItem()
              : this.renderEllipsis()}
          </div>
          <PrimaryLink
            href="#"
            onClick={this.onProductTileClick}
            type="noUnderline"
            className={styles.contentBase}
          >
            <div className={ggStyle.mobAlign} data-locator="OwnerViewItemTile">
              <div className={ggStyle.imageBase}>
                <div
                  className={
                    enableNewRegDashboard
                      ? styles.newImageContainer
                      : ggStyle.imageContainer
                  }
                >
                  {this.renderProductImage()}
                </div>
              </div>
              <div
                className={classnames('pl1 pr1', styles.contentBase)}
                data-locator="ProductDetailsSection"
              >
                {purchased && (
                  <div
                    className={classnames('relative', styles.purchaseContainer)}
                    data-locator="ItemStockAvailability"
                  >
                    {this.renderAlreadyPurchased()}
                  </div>
                )}
                {enableItemStatus &&
                  !purchased &&
                  !enableNewRegDashboard &&
                  ggRegItemStatus !== 'funded' &&
                  isCurrentlySoldOut && (
                    <div
                      className={classnames('relative', styles.FundedContainer)}
                      data-locator="ItemStockAvailability"
                    >
                      {!(isBelowLineItem && isBelowLineItem === 'true') &&
                        displayNotifyRegistrantMsg &&
                        this.renderItemStatusBadge(ItemStatusbabyBadge)}
                    </div>
                  )}
                {!purchased &&
                  this.props.ggEligibleItem &&
                  ggRegItemStatus === 'funded' && (
                    <div
                      className={classnames('relative', styles.FundedContainer)}
                      data-locator="ItemStockAvailability"
                    >
                      {this.renderFundedBadge()}
                    </div>
                  )}

                <Fragment>
                  {this.renderTitle()}
                  {enableItemStatus &&
                    !enableNewRegDashboard &&
                    this.renderOOSMsg()}
                  {this.renderPrice()}
                  {enableItemStatus &&
                    enableNewRegDashboard &&
                    this.renderItemStatusBadge()}
                  {this.props.isBopisFeatureEnable &&
                    this.getStoreAvailabilityMessage()}
                  {this.renderLtlDslDetails()}
                  {pathOr(0, 'qtySVPurchased', this.props) > 0 && (
                    <div
                      className={classnames(
                        'relative',
                        styles.shiporswapContainer
                      )}
                    >
                      {this.renderRBYRFundReceived()}
                    </div>
                  )}
                  {this.renderGroupGift()}
                  {this.props.itemType === 'CSH' &&
                    this.props.switchConfig.enableCashFund &&
                    this.renderCashFunds()}
                  {!enableNewRegDashboard && this.renderReplaceCTA()}
                  {isLtlItem && this.renderLtlDslModal()}
                  {this.onRemoveGroupGift()}
                </Fragment>
                {this.props.itemType !== 'CSH' &&
                  enableNewRegDashboard &&
                  this.renderWantPurchased()}
              </div>
            </div>
            {this.props.itemType !== 'CSH' &&
              !enableNewRegDashboard &&
              this.renderWantPurchased()}
          </PrimaryLink>
        </div>
      </ResponsiveMediaQuery>
    );
  }
  getCharLength() {
    let charLength = 65;
    const screenWidth = getWindowInnerWidth();
    if (screenWidth >= 1024 && screenWidth <= 1190) {
      charLength = 48;
    } else if (screenWidth > 1190 && screenWidth <= 1400) {
      charLength = 55;
    }
    return charLength;
  }

  getButtonAttribute = () => {
    const { intlRestricted } = this.props.sKUDetailVO;
    const isDisabled = OwnerProductGridTileUtil.isAddToCartDisable(
      intlRestricted,
      this.props.refNum,
      this.props.enableKatori,
      this.props.isInternationalUser
    );
    return {
      attr: {
        theme: 'link',
        variation: 'noPadding',
        tooltip: BUY_IT_NOW_LBL,
        'data-locator': 'registryowner-addtocartbutton',
        disabled: isDisabled,
        className: 'fol',
      },
      contentVariation: 'wrap',
      children: BUY_IT_NOW_LBL,
    };
  };

  removeRegistryItem = () => {
    const { sKUDetailVO, registryId, refNum, amountFulfilled } = this.props;
    const productInfo = {
      skuId: sKUDetailVO.skuId,
      updateRegistryId: registryId,
      productId: sKUDetailVO.parentProdId,
      regItemOldQty: this.props.qtyRequested,
      regItemOldPurchasedQty: this.props.qtyPurchased,
      rowId: this.props.rowID,
      itemTypes: this.props.itemType,
      regType: this.props.eventType,
      refNum,
      ltlDeliveryServices: this.state.ltlDeliveryServices,
      statusFilter: this.props.statusFilter,
    };
    if (this.props.ggEligibleItem) {
      this.setState({
        [`showDeleteModal_${this.state.index}`]: false,
      });
    }
    let productData = cloneDeep(this.props.registryOwnerFirstCategoryList);
    productData = productData.map(category => {
      const currentCategory = category;
      currentCategory.registryItemList.map(product => {
        const currentProduct = product;
        if (
          product.sKUDetailVO.skuId === productInfo.skuId &&
          product.refNum === productInfo.refNum &&
          product.ltlDeliveryServices === productInfo.ltlDeliveryServices
        ) {
          currentProduct.deletedItem = true;
        }
        return currentProduct;
      });
      return currentCategory;
    });
    productInfo.registryTealiumInfo = getRemoveTealiumData(
      sKUDetailVO,
      this.getTealiumVariable(),
      this.props.ggEligibleItem,
      amountFulfilled,
      this.props.eventType,
      registryId
    );
    this.props.removeRegistryItem(productInfo, productData, productInfo.skuId);

    const filterCount = getFilterCount(this.props);
    this.props.updateFilterCount(filterCount);
  };

  toggleLTLModalState = value => {
    this.setState({ ltlModalMountedState: value });
  };

  removeGroupGiftItem = () => {
    this.setState({ [`showDeleteModal_${this.state.index}`]: true });
  };

  markAsFavHandler = () => {
    const productInfo = {
      skuId: this.props.sKUDetailVO.skuId,
      updateRegistryId: this.props.registryId,
      markAsFav: this.props.markedAsFav ? 'N' : 'Y',
      productId: this.props.sKUDetailVO.parentProdId,
      rowId: this.props.rowID,
      itemTypes: this.props.itemType,
      regType: this.props.eventType,
      refNum: this.props.refNum,
      ltlDeliveryServices: this.state.ltlDeliveryServices,
    };
    let productData;
    productData = cloneDeep(this.props.registryOwnerFirstCategoryList);
    productData = productData.map(category => {
      const currentCategory = category;
      currentCategory.registryItemList.map(product => {
        const currentProduct = product;
        if (
          product.sKUDetailVO.skuId === productInfo.skuId &&
          product.refNum === productInfo.refNum &&
          product.ltlDeliveryServices === productInfo.ltlDeliveryServices
        ) {
          currentProduct.markedAsFav = !currentProduct.markedAsFav;
        }

        return currentProduct;
      });
      return currentCategory;
    });
    productData.favTealiumData = getFavTealiumData(
      this.props.registryId,
      this.props.eventType,
      this.props.sKUDetailVO
    );
    this.props.markFavRegistryItem(productInfo, productData, productInfo.skuId);

    const filterCount = getFilterCount(this.props);
    this.props.updateFilterCount(filterCount);
  };

  get displayTitle() {
    const { itemType, personalizationDescription } = this.props;
    return truncate(
      itemType === 'CSH'
        ? personalizationDescription
        : pathOr('', 'sKUDetailVO.displayName', this.props),
      this.getCharLength()
    );
  }

  isPersonalizationApplicable() {
    const { refNum, sKUDetailVO, itemType } = this.props;
    if (itemType === 'CSH') return true;
    return personalizationApplicable(refNum, sKUDetailVO.personalizationType);
  }

  togglehoverModalState = () => {
    this.setState({
      ellipsesChunkLoaded: true,
    });
    /* istanbul ignore next */
    setTimeoutCustom(() => {
      const editNode = document.getElementById('editflyout');
      if (editNode) editNode.focus();
    }, 200);
  };

  /**
   * Hide the ellipsis flyout
   */
  hideFlyout() {
    this.setState({
      ellipsesChunkLoaded: false,
    });
  }

  toggleDeleteModal() {
    this.setState({
      [`showDeleteModal_${this.state.index}`]: ![
        `showDeleteModal_${this.state.index}`,
      ],
    });
  }

  keepGroupGiftItem(e) {
    e.preventDefault();
    this.setState({
      [`showDeleteModal_${this.state.index}`]: false,
    });
  }

  updateRegistryItemSaga = args => {
    const {
      ltlDeliveryServices,
      shipMethodUnsupported,
      ltlShipMethodDesc,
      deliverySurcharge,
    } = args;
    const isInternationalUser = this.props.isInternationalUser;
    const isLTLUpdated = ltlDeliveryServices !== this.state.ltlDeliveryServices;
    let itemPrice = 0;
    if (this.isPersonalizationApplicable()) {
      itemPrice = this.props.personlisedDoublePrice;
    } else {
      itemPrice = this.props.totalPrice;
    }

    const updateData = {
      skuId: this.props.sKUDetailVO.skuId,
      updateRegistryId: this.props.registryId,
      updateQuantity: this.state.want,
      productId: this.props.sKUDetailVO.parentProdId,
      regItemOldQty: this.state.want,
      regItemOldPurchasedQty: this.state.purchased,
      purchasedQuantity: this.state.purchased,
      rowId: this.props.rowID,
      itemTypes: this.props.itemType,
      regType: this.props.eventType,
      refNum: this.props.refNum,
      ltlDeliveryServices,
      isGroupGiftedItem: this.props.ggEligibleItem && !isInternationalUser,
      itemPrice,
      itemStatusFilter: this.props.statusFilter,
    };
    try {
      ServiceUtil.triggerServerRequest({
        url: getApiEndPointsFromStore('registryUpdateItem'),
        method: 'PUT',
        showLoader: true,
        data: qs.stringify(updateData),
      })
        .then(data => {
          const { serviceStatus } = data && data.body;
          if (serviceStatus === 'SUCCESS') {
            const statusFilterData = pathOr(
              '',
              'body.data.component.statusFilter',
              data
            );
            const registryUpdatedFacetsFilter = updateFacetFiterData(
              this.props.registryFacetsFilter,
              { statusFilterData }
            );
            this.props.setFacetData(registryUpdatedFacetsFilter);
            if (isLTLUpdated) {
              const { sKUDetailVO } = this.props;
              const skuId = pathOr('', 'skuId', sKUDetailVO);
              /* istanbul ignore next */
              window.location.href = `${window.location.pathname}?skuAdded=${skuId}`;
            }
            this.setState(
              {
                ltlDeliveryServices,
                shipMethodUnsupported,
                ltlShipMethodDesc,
                deliverySurcharge,
                formattedDeliverySurcharge: `$${deliverySurcharge}`,
              },
              this.toggleLTLModalState(false)
            );
            const filterCount = getFilterCount(this.props);
            this.props.updateFilterCount(filterCount);
            const { sKUDetailVO, tealiumData } = this.props;
            const tealiumProductProps = {
              sKUDetailVO,
              productURL: this.props.productURL,
              price: this.props.price,
              catId: this.props.jdaCatId,
              imageTitle: this.displayTitle,
              levelOfService: this.props.ltlShipMethodDesc,
            };
            const registryQuantityTealiumInfo = updateQuantityData(
              tealiumData,
              this.props.favoriteStore,
              this.props.qtyRequested,
              this.props.qtyPurchased,
              tealiumProductProps
            );
            registryQuantityTealiumInfo.product_quantity = [
              updateData.updateQuantity,
            ];
            this.props.handleTealiumEvent(
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

  renderTitle() {
    return (
      <header
        className="mt1"
        title={decodeHtmlEntities(this.displayTitle)}
        data-locator={DATA_LOCATORS.PRODUCT_TITLE}
      >
        <PrimaryLink
          href="#"
          className={classnames(
            ggStyle.mobFont,
            ggStyle.titleTiles,
            !this.props.sKUDetailVO.activeFlag && ggStyle.primaryLinkDisabled
          )}
          type="noUnderline"
        >
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: this.displayTitle,
            }}
          />
        </PrimaryLink>
      </header>
    );
  }

  renderPrice() {
    const { sKUDetailVO } = this.props;
    const isCartFlag = pathOr(false, 'inCartFlag', sKUDetailVO);
    let price = this.props.formattedPrice;
    if (isCartFlag) {
      price = this.props.formattedInCartPriceVal;
    }

    return (
      <Price
        itemPrice={price}
        totalPrice={this.props.formattedTotalPrice}
        refNum={this.props.refNum}
        personalizedPrice={this.props.formattedPersonalizedPrice}
        ltlFlag={sKUDetailVO && sKUDetailVO.ltlItem}
        personalizationType={sKUDetailVO && sKUDetailVO.personalizationType}
        dataLocator={DATA_LOCATORS.PRODUCT_PRICE}
        ltlDeliveryServices={this.state.ltlDeliveryServices}
        formattedWasPrice={this.props.formattedWasPrice}
        displayDiscountedPrice={this.showDiscountedPrice}
        mobWasPrice={ggStyle.mobWasPrice}
        priceStyle={
          this.props.itemType === 'CSH'
            ? ggStyle.priceStyleCashFund
            : ggStyle.priceStyle
        }
        priceColor={
          this.isBabySite && !this.showDiscountedPrice && ggStyle.babyFontColor
        }
        totalDeliveryCharges={this.props.totalDeliveryCharges}
        enableNewRegDashboard={this.props.enableNewRegDashboard}
      />
    );
  }

  renderGroupGift(isRegistryOwnerModal) {
    const {
      amountFulfilled,
      ggItemContributionNeeded,
      enableNewRegDashboard,
    } = this.props;
    const isDiaperFundSku = this.props.itemType === 'DPF';
    return (
      this.props.ggEligibleItem &&
      (ggItemContributionNeeded !== 0 || amountFulfilled !== 0) &&
      !this.props.isInternationalUser && (
        <React.Fragment>
          <GroupGiftingTooltip
            heading={PROGRESS_BAR_TITLE_LBL}
            diaperFundLabel={DIAPER_FUND_LBL}
            isDiaperFundSku={isDiaperFundSku}
            diapertitle={TOOL_TIP_DIAPER_HEADING_LBL}
            diaperdescription={TOOL_TIP_DIAPER_BODY_LBL}
            title={TOOL_TIP_HEADING_LBL}
            description={TOOL_TIP_BODY_LBL}
            toolTipAlign={`outerTooltipGG`}
            amountFulfilled={amountFulfilled}
            showFulfilledAmount
            fromModal={isRegistryOwnerModal && this.isBabySite}
            commonStyle={ggStyle.commonAmount}
            toolTipOnMob={ggStyle.toolTipAlign}
            ggItemContributionNeeded={ggItemContributionNeeded}
            iconProps={
              (this.isMobileScreen || isRegistryOwnerModal) && {
                width: '12px',
                height: '12px',
              }
            }
            enableNewRegDashboard={enableNewRegDashboard}
          />
          <ContributionProgressBar
            amountFulfilled={amountFulfilled}
            ggItemContributionNeeded={ggItemContributionNeeded}
            commonStyle={ggStyle.commonAmount}
            RegistryDetails={isRegistryOwnerModal}
            enableNewRegDashboard={enableNewRegDashboard}
          />
        </React.Fragment>
      )
    );
  }

  renderCashFunds = isRegistryOwnerModal => {
    const {
      amountFulfilled,
      personlisedPrice,
      enableNewRegDashboard,
    } = this.props;
    return (
      <React.Fragment>
        <GroupGiftingTooltip
          heading={'Cash Funds'}
          description={TOOL_TIP_BODY_LBL}
          toolTipAlign={`outerTooltipGG`}
          amountFulfilled={amountFulfilled}
          showFulfilledAmount
          fromModal={isRegistryOwnerModal && this.isBabySite}
          commonStyle={ggStyle.commonAmount}
          toolTipOnMob={ggStyle.toolTipAlign}
          title={'Cash Funds'}
          ggItemContributionNeeded={personlisedPrice}
          iconProps={
            (this.isMobileScreen || isRegistryOwnerModal) && {
              width: '12px',
              height: '12px',
            }
          }
          isCashFund
          enableNewRegDashboard={enableNewRegDashboard}
        />
        <ContributionProgressBar
          amountFulfilled={amountFulfilled}
          ggItemContributionNeeded={personlisedPrice}
          commonStyle={ggStyle.commonAmount}
          RegistryDetails={isRegistryOwnerModal}
          isCashFund
          enableNewRegDashboard={enableNewRegDashboard}
        />
      </React.Fragment>
    );
  };

  renderOOSMsg() {
    const { isBelowLineItem, purchased } = this.props;
    if (
      isBelowLineItem &&
      isBelowLineItem === 'true' &&
      !this.props.displayNotifyRegistrantMsg &&
      !purchased &&
      this.props.ggRegItemStatus !== 'funded'
    ) {
      return (
        <div className={classnames(styles.oosMsgItemTile)}>
          {
            <Icon
              height="17"
              width="17"
              type="outofstock"
              className={classnames('mr1', styles.oosIcon)}
            />
          }
          <span className={classnames(styles.oosMsg)}>{OOS_MSG_LBL}</span>
        </div>
      );
    }
    return '';
  }

  renderItemStatusBadge = ItemStatusbabyBadge => {
    const {
      isBelowLineItem,
      displayNotifyRegistrantMsg,
      ggRegItemStatus,
      enableNewRegDashboard,
    } = this.props;
    const skuInStock = pathOr('', 'skuInStock', this.props.sKUDetailVO);
    const discontinuedLbl = enableNewRegDashboard
      ? 'Item discontinued'
      : DISCONTINUED_LBL;
    const itemUnavailableLbl = enableNewRegDashboard
      ? 'Item Unavailable'
      : NO_LONGER_CARRY_LBL;
    if (
      isBelowLineItem &&
      isBelowLineItem === 'true' &&
      !displayNotifyRegistrantMsg &&
      !this.props.purchased &&
      ggRegItemStatus !== 'funded'
    ) {
      return (
        <Fragment>
          <span
            className={classnames(
              enableNewRegDashboard
                ? styles.newItemStatusBadge
                : classnames(styles.ItemStatusBadge, ItemStatusbabyBadge)
            )}
            data-locator="registry-item-tile-sold-out-badge"
            tabIndex="0"
          >
            {!enableNewRegDashboard && (
              <Icon
                type="alert"
                width={this.isMobileScreen ? '12px' : '18px'}
                height={this.isMobileScreen ? '12px' : '15px'}
                className={classnames('mb1', styles.alerticon)}
              />
            )}
            {enableNewRegDashboard ? OOS_MSG_LBL : CURRENTLY_SOLD_OUT_LBL}
          </span>
          {enableNewRegDashboard && (
            <span id="NandDReplaceLink">{this.renderReplaceButton()}</span>
          )}
        </Fragment>
      );
    } else if (
      displayNotifyRegistrantMsg &&
      (displayNotifyRegistrantMsg === 'D' ||
        displayNotifyRegistrantMsg === 'N') &&
      !this.props.purchased &&
      ggRegItemStatus !== 'funded'
    ) {
      return (
        <Fragment>
          <span
            className={classnames(
              enableNewRegDashboard
                ? styles.newItemStatusBadge
                : classnames(styles.ItemStatusBadge, ItemStatusbabyBadge)
            )}
            data-locator={
              skuInStock
                ? 'registry-item-tile-discontinued-badge'
                : 'registry-item-tile-nolongercarry-badge'
            }
            tabIndex="0"
          >
            {!enableNewRegDashboard && (
              <Icon
                type="alert"
                width={this.isMobileScreen ? '12px' : '18px'}
                height={this.isMobileScreen ? '12px' : '15px'}
                className={classnames('mb1', styles.alerticon)}
              />
            )}
            {skuInStock === true ? discontinuedLbl : itemUnavailableLbl}
          </span>
          {enableNewRegDashboard && (
            <span id="NandDReplaceLink">{this.renderReplaceButton()}</span>
          )}
        </Fragment>
      );
    }
    return '';
  };

  renderProductImage() {
    const isImageActive =
      !this.isMobileScreen && this.props.purchased
        ? classnames({ [ggStyle.purchasedThumbnail]: true })
        : '';
    const IMAGE_SRC = {
      preset: 'content',
      width: '272',
      height: '272',
    };
    const SRC_SET = [
      {
        preset: 'content',
        width: '272',
        height: '272',
        sourceWidth: '1x',
      },
      {
        preset: 'content',
        width: '408',
        height: '408',
        sourceWidth: '1.5x',
      },
    ];
    return (
      <PrimaryLink
        className={classnames(
          this.props.enableNewRegDashboard
            ? styles.newImgWrapper
            : ggStyle.imgWrapper,
          ggStyle.mobWasPrice,
          'fol'
        )}
        href={getPDPURL(this.props, this.state)}
        onClick={this.onProductTileClick}
        disabledLink={!this.props.sKUDetailVO.activeFlag}
        data-locator={DATA_LOCATORS.PRODUCT_IMAGE}
      >
        {this.isPersonalizationApplicable() ? (
          <LazyLoad
            threshold={1500}
            placeholder={
              <img alt={this.displayTitle} src={PRODUCT_IMAGE_PLACEHOLDER} />
            }
          >
            <img
              className={classnames(isImageActive, 'fol')}
              alt={this.displayTitle}
              src={this.props.personalizedImageUrls}
            />
          </LazyLoad>
        ) : (
          <ImgSrcSet
            className={classnames(isImageActive, 'fol')}
            alt={this.displayTitle}
            srcSet={SRC_SET}
            imageSrc={IMAGE_SRC}
            scene7imageID={pathOr(
              '',
              'sKUDetailVO.skuImages.basicImage',
              this.props
            )}
            isScene7UrlPrefix
            lazyLoadOptions={{
              offset: 1500,
              placeholder: PRODUCT_IMAGE_PLACEHOLDER,
            }}
            lazyLoad
            placeholder={PRODUCT_DEFAULT_IMAGE}
          />
        )}
      </PrimaryLink>
    );
  }

  renderWantPurchased() {
    return (
      <div
        className={classnames(
          this.isMobileScreen ? 'mt1' : 'mt15',
          this.props.enableNewRegDashboard
            ? styles.newStaticSection
            : styles.staticSection,
          this.isMobileScreen ? ggStyle.mobWasPrice : styles.qtyLargeFont
        )}
        data-locator="wantAndPurchasedQuantity"
      >
        <span tabIndex="0">Want </span>
        <span
          className={classnames(styles.qtyStyle, 'pr1')}
          data-locator="want-count"
        >
          {this.props.qtyRequested}
        </span>
        <span className="pr1">{'|'}</span>
        <span tabIndex="0">Purchased </span>
        <span className={styles.qtyStyle} data-locator="purchased-count">
          {this.props.qtyPurchased}
        </span>
      </div>
    );
  }
  renderAlreadyPurchased() {
    const purchasebaby = this.isBabySite ? styles.purchasebaby : '';
    return this.props.purchased ? (
      <div
        className={classnames(
          'absolute',
          this.props.enableNewRegDashboard &&
            this.isMobileScreen &&
            ggStyle.newPurchasedButton,
          ggStyle.purchasedButton,
          purchasebaby
        )}
        data-locator="registry-item-tile-purchased-badge"
        tabIndex="0"
      >
        <span>
          <Icon
            type="checkmarkwhite"
            width="16px"
            height="16px"
            className={ggStyle.checkboxPurchased}
          />{' '}
          {this.props.itemType === 'CSH' ? 'Funded' : PURCHASHED_LBL}
        </span>
      </div>
    ) : null;
  }
  renderFundedBadge(modalFunded, modalCheckbox, isRegistryOwnerModal) {
    const fundedcolorVariation = this.isBabySite
      ? styles.fundedbabycolor
      : styles.fundedUScolor;

    return (
      this.props.ggRegItemStatus === 'funded' && (
        <span
          className={classnames(
            isRegistryOwnerModal ? modalFunded : styles.fundedoverlay,
            fundedcolorVariation
          )}
          data-locator="registry-item-tile-funded-badge"
          tabIndex="0"
        >
          <Icon
            type="checkmarkwhite"
            width="16px"
            height="16px"
            className={
              isRegistryOwnerModal ? modalCheckbox : ggStyle.checkboxPurchased
            }
          />{' '}
          {FUNDED_LBL}
        </span>
      )
    );
  }

  renderLtlDslModal() {
    const { labels, sKUDetailVO, registryId, eventType } = this.props;
    return (
      <LTLAltDslModal
        registryLabels={labels}
        toggleLTLModalState={this.toggleLTLModalState}
        ltlModalMountedState={this.state.ltlModalMountedState}
        skuId={sKUDetailVO.skuId}
        selectDslOnModal
        updateDslOnModal
        updateRegistryItemDsl={this.updateRegistryItemSaga}
        showPhoneNumberInput={false}
        ltlAltDslRegistryId={registryId}
        ltlAltDslRegistryName={eventType}
        modalDescriptionClass={styles.modalDescription}
        shipMethodUnsupported={this.state.shipMethodUnsupported}
        ltlDeliveryServices={this.state.ltlDeliveryServices}
        fromRegistryOwner={this.fromEditModal}
      />
    );
  }

  renderReplaceButton() {
    return (
      <ReplaceItem
        handleNandDReplaceModal={this.props.handleNandDReplaceModal}
        productId={pathOr('', 'sKUDetailVO.parentProdId', this.props)}
        displayName={pathOr('', 'sKUDetailVO.displayName', this.props)}
        {...this.props}
        className={ggStyle.mobCtaHeight}
      />
    );
  }

  renderReplaceCTA() {
    const {
      displayNotifyRegistrantMsg,
      switchConfig,
      isBelowLineItem,
    } = this.props;
    return (
      switchConfig.enableReplaceItem &&
      !this.props.purchased &&
      this.props.ggRegItemStatus !== 'funded' &&
      (displayNotifyRegistrantMsg === 'N' ||
        displayNotifyRegistrantMsg === 'D' ||
        (isBelowLineItem && isBelowLineItem === 'true')) && (
        <div
          id="NandDReplaceCTA"
          className={classnames(styles.manageBtn, 'mt1', {
            [ggStyle.staticSection]: this.isMobileScreen,
          })}
        >
          {this.renderReplaceButton()}
        </div>
      )
    );
  }

  renderAddToCartBtn() {
    const { sKUDetailVO, tealiumData } = this.props;
    const { skuId, parentProdId, size, swatch } = sKUDetailVO;
    const tealiumVariable = this.getTealiumVariable();
    const tealiumDataVars = getTealiumData(sKUDetailVO, tealiumVariable);
    const pathName = tealiumData.location ? tealiumData.location.pathname : '';

    return (
      <LazyLoad threshold={1500}>
        <AddToCart
          className={styles.addtocartBuyItNow}
          skuId={skuId}
          prodId={parentProdId}
          qty={this.props.qtyRequested}
          registryId={this.props.registryId}
          size={size}
          swatch={swatch}
          ltlShipMethod={this.state.ltlDeliveryServices}
          ltlFlag={!isEmpty(this.state.ltlDeliveryServices)}
          refnum={this.props.refNum || ''}
          buttonProps={this.getButtonAttribute()}
          onClientError={errors => {
            this.setState({
              addToCartErrors: errors,
            });
          }}
          parentProductId={parentProdId || ''}
          calledFromRegistry
          closeQuickViewModal={this.props.closeQuickViewModal}
          onModalHide={this.props.onModalHide}
          fireTealiumAction={this.props.handleTealiumEvent}
          registryATCTealiumInfo={tealiumDataVars}
          tealiumLinkLocation={pathName}
          initiateInactivityModal={this.props.initiateInactivityModal}
          isCollegePage={false}
          ignoreEmptyStoreDataOnUnmount
        />
      </LazyLoad>
    );
  }

  renderRBYRFundReceived(isRequiredOnModal, markedAsPurchased) {
    const purchased = pathOr('0', 'qtyPurchsed', this.props);
    const svPurchased = pathOr('0', 'qtySVPurchased', this.props);
    const headingColor =
      isRequiredOnModal && this.isBabySite
        ? ggStyle.babyFontColor
        : styles.tileHeadingColor;
    return (
      <div
        id="sosTooltip"
        className={classnames(
          styles.rbyrPurchasedContainer,
          !this.isMobileScreen && !isRequiredOnModal && 'mb2'
        )}
        data-locator="registry-item-tile-ship-or-swap"
        tabIndex="0"
      >
        <span
          onMouseEnter={this.handleHoverRBYRtooltip}
          className={classnames(
            styles.rbyrPurchased,
            headingColor,
            preventModalClick,
            styles.tooltipPreventCss
          )}
        >
          <span
            className={classnames(
              ggStyle.commonAmount,
              styles.rbyrPurchased,
              preventModalClick
            )}
          >
            {truncate(SHIP_OR_SWAP_LBL)}: {svPurchased.toString()}{' '}
            {svPurchased.toString()}{' '}
          </span>
          <Icon
            className={styles.infoIcon}
            type="infoIcon"
            width={this.isMobileScreen || isRequiredOnModal ? '12px' : '18px'}
            height={this.isMobileScreen || isRequiredOnModal ? '12px' : '15px'}
          />
        </span>
        <CustomHTMLTooltip
          innerClass={classnames(styles.customTooltipRBYR, preventModalClick)}
          className={classnames(
            'showToolTip',
            styles.showToolTip,
            preventModalClick
          )}
        >
          <div className={classnames(styles.toolTip, preventModalClick)}>
            <div
              className={classnames(
                styles.row,
                styles.heading,
                preventModalClick
              )}
            >
              {PURCHASE_DTL_LBL}
            </div>
            <hr className={styles.lineDark} />
            <div className={classnames(styles.row, 'mt2', preventModalClick)}>
              {ADDED_MY_FUNDS_LBL.replace('{0}', svPurchased.toString())}
              {this.props.isBelowLineItem === 'false' &&
                !(this.props.purchased || markedAsPurchased) && (
                  <span className="ml1">{this.renderAddToCartBtn()}</span>
                )}
            </div>
            <hr className={styles.lineGray} />
            <div className={classnames(styles.row, 'mt1', preventModalClick)}>
              {PURCHASED_LBL.replace('{0}', purchased.toString())}
            </div>
          </div>
        </CustomHTMLTooltip>
      </div>
    );
  }

  renderDslUpdateableMessage(hideParent, rlpMsgModal) {
    const { enableNewRegDashboard } = this.props;
    const serviceLabel = hideParent
      ? LabelsUtil.replacePlaceholderValues(LTL_DSL_NO_LONGER_AVAILABLE_LBL, [
          this.props.ltlShipMethodDesc,
        ])
      : ADDITIONAL_SERVICE_LBL;
    return (
      this.props.DSLUpdateable && (
        <div
          className={classnames(
            enableNewRegDashboard
              ? classnames(styles.newLTLStyling, styles.ltlDslNotAvailableNew)
              : classnames('mt1', rlpMsgModal || styles.ltlDslNotAvailable),
            'mb1'
          )}
          data-locator="registry-item-tile-LTL-DSL-message"
          tabIndex="0"
        >
          <span
            className={classnames(
              !enableNewRegDashboard && styles.progressBarTitle,
              'pr1'
            )}
          >
            {serviceLabel}
          </span>
          <PrimaryLink
            variation="primary"
            href="#"
            data-locator="ltlDslUpdateLink"
            id="ltlDslUpdateLink"
            type="bold"
            onClick={e => this.onUpdateLtlDsl(e, hideParent)}
            className={classnames(
              styles.updateLink,
              enableNewRegDashboard
                ? styles.updateLinkFontSize
                : styles.ltlDslNotAvailable
            )}
          >
            {LTL_DSL_UPDATE_LINK_LBL}
          </PrimaryLink>
        </div>
      )
    );
  }

  renderEllipsis() {
    const { amountFulfilled, ggEligibleItem } = this.props;
    return (
      <div
        className={styles.ellipsescontainer}
        data-locator="ellipseslayout"
        onMouseEnter={!isMobileDevice.any() && this.togglehoverModalState}
        onMouseLeave={this.hideFlyout}
        role="button"
        tabIndex="0"
      >
        <Button
          theme=""
          variation=""
          className={classnames(
            'relative fol pb1',
            styles.ellipsesicon,
            styles.buttonellipses
          )}
          aria-label="Edit Product details"
          onClick={
            this.state.ellipsesChunkLoaded
              ? this.hideFlyout
              : this.togglehoverModalState
          }
        >
          <Icon
            type={'ellipsis'}
            width={this.isMobileScreen ? '21px' : '27px'}
            height={this.isMobileScreen ? '6px' : '9px'}
            className={classnames(!this.isMobileScreen && styles.ellipsessvg)}
          />
        </Button>
        {this.state.ellipsesChunkLoaded && (
          <RegistryEllipsesButtons
            removeRegistry={
              ggEligibleItem && amountFulfilled > 0
                ? this.removeGroupGiftItem
                : this.removeRegistryItem
            }
            onQuickViewButtonClick={this.onProductTileClick}
            onProductTileClick={this.onProductTileClick}
            isBabySite={this.isBabySite}
          />
        )}
      </div>
    );
  }
  renderRemoveItem() {
    const { amountFulfilled, ggEligibleItem } = this.props;
    return (
      <div
        className={styles.ellipsescontainer}
        data-locator="removeItemLayout"
        role="button"
        tabIndex="0"
      >
        <Button
          theme=""
          variation=""
          className={classnames('relative fol pb1', styles.removeIcon)}
          aria-label="remove product"
          onClick={
            ggEligibleItem && amountFulfilled > 0
              ? this.removeGroupGiftItem
              : this.removeRegistryItem
          }
          iconProps={{
            type: 'myitems_cross',
            width: '22px',
            height: '22px',
          }}
        ></Button>
      </div>
    );
  }

  renderFavorite() {
    const { markedAsFav, enableNewRegDashboard } = this.props;
    const favStyle = markedAsFav
      ? classnames({ [styles.markedAsFav]: true })
      : classnames({ [styles.fav]: true });

    const favouriteLbl = isBedBathCanada()
      ? FAVOURITE_REGISTRY_CANADA_LBL
      : FAVOURITE_REGISTRY_LBL;
    return (
      <div
        className={classnames(
          enableNewRegDashboard
            ? classnames(styles.newFavBanner)
            : classnames(
                styles.favoriteBanner,
                favStyle,
                this.isBabySite && markedAsFav && styles.markedAsFavBaby
              )
        )}
      >
        <span className="absolute" role="button" tabIndex="0">
          <Button
            aria-label="favorite"
            theme="link"
            variation="noPadding"
            className={classnames(styles.favButton, 'fol')}
            iconProps={{
              className: styles.favIcon,
              type: enableNewRegDashboard
                ? renderMustHaveIcons(markedAsFav, this.isBabySite)
                : renderFavIcons(markedAsFav, this.isBabySite),
              width: this.isMobileScreen ? '18' : '22',
              height: this.isMobileScreen ? '18' : '22',
            }}
            onClick={this.markAsFavHandler}
            marked={`${markedAsFav}`}
            data-locator={DATA_LOCATORS.PRODUCT_FAV}
          >
            {!this.isMobileScreen && !enableNewRegDashboard && favouriteLbl}
          </Button>
        </span>
      </div>
    );
  }

  renderLtlDslDetails() {
    const { sKUDetailVO } = this.props;
    const { ltlDeliveryServices, shipMethodUnsupported } = this.state;
    const isLtlItem = sKUDetailVO && sKUDetailVO.ltlItem;

    return (
      isLtlItem &&
      (!ltlDeliveryServices || shipMethodUnsupported) &&
      this.renderDslUpdateableMessage()
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.getDesktopMediaQuery()}
        {this.getMobileMediaQuery()}
      </React.Fragment>
    );
  }
}

export default OwnerProductGridTile;
export { OwnerProductGridTile as PureOwnerProductGridTile };
