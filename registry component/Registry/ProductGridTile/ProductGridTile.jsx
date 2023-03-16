/* eslint max-lines: ["error", 1466]*/
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import truncate from '@bbb-app/utils/truncate';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import { isNull, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import Button from '@bbb-app/core-ui/button';
import ImgSrcSet from '@bbb-app/core-ui/image-src-set/ImageSrcSet';
import Icon from '@bbb-app/core-ui/icon';
import getCartQuatitySelectorOptions from '@bbb-app/utils/getCartQuantitySelectorOptions';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import isTbs from '@bbb-app/utils/isTbs';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ResponsiveMediaQuery from '@bbb-app/responsive-media-query/ResponsiveMediaQuery';
import QuantitySelector from '@bbb-app/quantity-selector/QuantitySelector';
import {
  PRODUCT_IMAGE_PLACEHOLDER,
  PRODUCT_DEFAULT_IMAGE,
} from '@bbb-app/constants/appConstants';
import '@bbb-app/assets/icons/checkmarkwhite.svg';
import '@bbb-app/assets/icons/infoIcon.svg';
import '@bbb-app/assets/icons/locations.svg';
import '@bbb-app/assets/icons/star-double.svg';
import '@bbb-app/assets/icons/plus.svg';
import {
  personalizationApplicable,
  showDiscountedPrice,
} from '@bbb-app/utils/RegistryUtils';
import { personalizationCodes } from '@bbb-app/constants/registryConstants';
import { isHrefValidForMultiAppHardSPA } from '@bbb-app/utils/multiAppUtil';
import { redirectTo } from '@bbb-app/utils/redirectTo';
import styles from './ProductGridTile.css';
import propTypes, { defaultProps } from './props';
import '../../../../assets/icons/heart-double.svg';
import Price from '../Price';
import AddToCart from '../../../../containers/AddToCart/AddToCart.async';
import {
  PAGE_NAME,
  IMAGE_SRC,
  SRC_SET,
  PROGRESS_BAR_TITLE_LBL,
  TOOL_TIP_BODY_LBL,
  TOOL_TIP_HEADING_LBL,
  CONTRIBUTE_CTA_LBL,
  DIAPER_FUND_LBL,
  TOOL_TIP_DIAPER_HEADING_LBL,
  TOOL_TIP_DIAPER_BODY_LBL,
  FIND_IN_STORE_BABY_LBL,
  FIND_IN_STORE_US_LBL,
  FAVORITE_REGISTRY_CANADA_LBL,
  FAVOURITE_REGISTRY_LBL,
  ADD_TO_CART_CTA_LBL,
  PURCHASED_LBL,
  BOPIS_PICK_IT_UP_CTA,
} from './constants';
import {
  BOPUS_AVAIL_LBL,
  BOPUS_READY_LBL,
} from '../OwnerProductGridTile/constants';
import isRBYRRegistry from './../utils/isRBYRRegistry';
import { addToCartRegistryTealiumInfo } from './addToCartRegistryTealiumInfo';
import { findInStoreRegistryTealiumInfo } from './findInStoreRegistryTealiumInfo';
import ContributionProgressBar from '../GroupGifting/ContributionProgressBar/ContributionProgressBar';
import GroupGiftingTooltip from '../OwnerProductGridTile/GroupGiftingTooltip';
import ContributeModalComponent from '../CashFunds/ContributeModal/ContributeModalComponent.async';

/**
 * Helper component for Certona Product tile CTA buttons
 * @param {object} props
 * @param {string} props.className className attribute for the inner button
 * @param {string} props.activeRegistry Active registry
 * @param {string} props.BADGE Badge attribute for display tags
 * @param {string} props.SCENE7_URL for image ID
 * @param {function} props.productURL for Image url
 * @param {string} props.WAS_PRICE for prev price
 * @param {string} props.IS_PRICE for current price
 * @param {function} props.REVIEWS for review counts
 * @param {string} props.RATINGS for star ratings
 * @param {function} props.ratingTitle for rating titles
 */

export const FavouriteButton = (isBabySite, isMobile) => (
  <Button
    theme={isMobile ? '' : 'link'}
    variation={isMobile ? 'circle' : 'noPadding'}
    className={isBabySite ? styles.favButtonbaby : styles.favButton}
    iconProps={{
      type: isBabySite ? 'star-double' : 'heart-double',
      width: '18px',
      height: '18px',
    }}
    aria-label="FavoriteItemBadge"
  />
);
const breakPoint = 640;

const isItemAvailable = (isBelowLineItem, skuInStore) => {
  if (isBelowLineItem === 'false' || skuInStore === '1') return true;
  return false;
};

export class ProductGridTile extends PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  constructor(props) {
    super(props);
    this.onQuickViewButtonClick = this.onQuickViewButtonClick.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.renderAddToCartBtn = this.renderAddToCartBtn.bind(this);
    this.onFindInStoreClick = this.onFindInStoreClick.bind(this);
    this.isPersonalizationApplicable = this.isPersonalizationApplicable.bind(
      this
    );
    this.renderContributeBtn = this.renderContributeBtn.bind(this);
    this.renderProductTile = this.renderProductTile.bind(this);
    this.state = {
      quantity: 1,
      cashfundsModalState: false,
    };
    this.showDiscountedPrice = showDiscountedPrice(props);
    this.isMobileScreen = getWindowInnerWidth() < breakPoint;
    this.isGroupGiftEligible = this.isGGItemEligible();
    this.isBabySite =
      this.props.siteId === 'BuyBuyBaby' ||
      this.props.siteId === 'TBS_BuyBuyBaby';
    this.registryUserName = '';
    this.itemType = pathOr(null, 'itemType', props);
    this.isDiaperFundSku = this.itemType === 'DPF';
    this.handleCashFundsModal = this.handleCashFundsModal.bind(this);
    this.handleTealiumOnContributeBtn = this.handleTealiumOnContributeBtn.bind(
      this
    );
  }
  onQuickViewButtonClick(e) {
    const quickViewButtonClickDisable =
      (e.target.offsetParent.dataset.locator === 'GroupGifting-Title' ||
        e.target.offsetParent.dataset.locator === 'modaloverlay') &&
      (e.target.tagName === 'DIV' || e.target.tagName === 'A');

    if (
      e.target.dataset.locator === 'atcmodal_viewcartandcheckoutctabtn' &&
      e.target.tagName === 'A' &&
      isHrefValidForMultiAppHardSPA(e.target.href)
    ) {
      redirectTo(e.target.href);
    }
    if (
      !this.props.sKUDetailVO.activeFlag ||
      e.target.id === 'qtySelect' ||
      (e.target.tagName === 'BUTTON' &&
        e.target.textContent !== CONTRIBUTE_CTA_LBL) ||
      quickViewButtonClickDisable ||
      document.querySelector('#rclModal')
    ) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const productInfo = {
      ...this.props,
      isPersonalised: this.isPersonalizationApplicable(),
      personalizationType: this.props.sKUDetailVO.personalizationType,
      ltlMethod: this.props.ltlDeliveryServices,
      selectedSkuId: this.props.sKUDetailVO.skuId,
      isLtlItem: this.props.sKUDetailVO.ltlItem,
      totalPrice: this.props.formattedPrice,
      pdpUrl: this.getPDPURL(),
      personalizedPrice: this.props.formattedPersonalizedPrice,
      ltlFlag: this.props.sKUDetailVO.ltlItem,
      inCart: pathOr(false, 'inCartFlag', this.props.sKUDetailVO),
      formattedPrice: this.props.totalPrice,
    };
    const swatchDetails = {
      color: null,
      skuId: this.props.sKUDetailVO.skuId,
      ltlMethod: null,
    };

    this.props.onQuickViewButtonClick(
      this.props.sKUDetailVO.parentProdId,
      this.props.sKUDetailVO.skuId,
      this.props.productURL,
      productInfo,
      swatchDetails
    );
    this.props.updateSkuIdForAnchoring(
      this.props.sKUDetailVO.skuId,
      this.props.categoryId
    );
  }

  onFindInStoreClick(e) {
    e.preventDefault();
    const { sKUDetailVO, activeRegistry, registryId, tealiumData } = this.props;
    const imageURL = this.isPersonalizationApplicable()
      ? this.props.personalizedImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr('', 'sKUDetailVO.skuImages.mediumImage', this.props),
          'largeImage'
        );
    const customerpostalCode = pathOr('', 'akamaiData.zip', this.props);
    const tealiumProductProps = {
      sKUDetailVO,
      quantity: this.state.quantity,
      productURL: this.props.productURL,
      price: this.props.price,
      catId: this.props.jdaCatId,
      imageTitle: this.displayTitle,
      imageURL,
      levelOfService: this.props.ltlShipMethodDesc,
      customerpostalCode,
    };
    let registryATCTealiumInfo = {};
    if (tealiumData) {
      registryATCTealiumInfo = findInStoreRegistryTealiumInfo(
        tealiumData.registryData,
        tealiumData.interactiveCheckList,
        this.props.favoriteStore,
        this.props.qtyRequested,
        this.props.qtyPurchased,
        tealiumProductProps
      );
    }
    if (this.props.handleTealiumEvent) {
      this.props.handleTealiumEvent(PAGE_NAME, registryATCTealiumInfo);
    }
    this.props.onPickupInStoreButtonClick({
      DISPLAY_NAME: sKUDetailVO.displayName,
      SKU_ID: this.props.sku,
      SCENE7_URL: sKUDetailVO.skuImages.basicImage,
      PRODUCT_ID: sKUDetailVO.parentProdId,
      price: this.props.price,
      QUANTITY: this.state.quantity,
      REGISTRY_ID:
        registryId || (activeRegistry && activeRegistry.registryId) || null,
    });
  }

  getDesktopMediaQuery = () => {
    const { sKUDetailVO, className } = this.props;
    const rootStyles = classnames({
      [styles.base]: true,
      [className]: className,
    });

    return (
      <ResponsiveMediaQuery minWidth={breakPoint}>
        {isItemAvailable(this.props.isBelowLineItem, this.props.skuInStore) ? (
          <PrimaryLink
            href="#"
            onClick={
              this.itemType === 'CSH'
                ? this.handleTealiumOnContributeBtn
                : this.onQuickViewButtonClick
            }
            type="noUnderline"
            className={classnames(rootStyles, styles.hoverTile)}
          >
            <div className={styles.wrapper} data-sku={sKUDetailVO.skuId}>
              {this.renderProductTile()}
            </div>
          </PrimaryLink>
        ) : (
          <div
            className={classnames(
              this.props.styleVariation === 'oos' && styles.oosCell,
              rootStyles,
              styles.wrapper
            )}
            data-sku={sKUDetailVO.skuId}
          >
            {this.renderProductTile()}
          </div>
        )}
      </ResponsiveMediaQuery>
    );
  };

  getMobileMediaQuery = () => {
    return (
      <ResponsiveMediaQuery maxWidth={breakPoint - 1}>
        {isItemAvailable(this.props.isBelowLineItem, this.props.skuInStore) &&
        this.itemType !== 'CSH' ? (
          <PrimaryLink
            href="#"
            onClick={this.onQuickViewButtonClick}
            className={styles.mobDisplay}
          >
            {this.renderMobileProductTile()}
          </PrimaryLink>
        ) : (
          <React.Fragment>{this.renderMobileProductTile()}</React.Fragment>
        )}
      </ResponsiveMediaQuery>
    );
  };
  getPDPURL() {
    const {
      contextPath,
      productURL,
      sKUDetailVO,
      registryId,
      itemType,
      jdaCatName,
    } = this.props;
    const isRBYR = pathOr(
      false,
      'registryResVO.registrySummaryVO.storedValueOptIn',
      this.props.registryData
    );
    const queryDelimiter = '?';
    let chkForSku = -1;

    if (!isNull(productURL) && typeof productURL !== 'undefined') {
      chkForSku = productURL.indexOf('skuId');
    }
    let PDP_URL = '';
    PDP_URL =
      chkForSku !== -1
        ? `${contextPath}${productURL}&registryId=${registryId}`
        : `${contextPath}${productURL}${queryDelimiter}skuId=${sKUDetailVO.skuId}&registryId=${registryId}`;

    PDP_URL += '&giftGiver=true';

    const isRBYRRegistryEnabled = isRBYRRegistry(
      this.props.labels,
      pathOr(
        '',
        'registryResVO.registrySummaryVO.registryType.registryTypeName',
        this.props.registryData
      )
    );
    if (isRBYRRegistryEnabled) {
      PDP_URL = PDP_URL.concat(
        `&isRBYRRegistryEnabled=${isRBYRRegistryEnabled}`
      );
    }
    /* istanbul ignore if */
    if (
      !this.checkItemNeedToExcluded(itemType, jdaCatName, sKUDetailVO) &&
      isRBYR
    ) {
      PDP_URL = PDP_URL.concat(
        `&isRBYRItem=${isRBYR}&registrantName=${encodeURIComponent(
          this.registryUserName
        )}`
      );
    }
    if (this.props.ltlDeliveryServices) {
      PDP_URL += `&sopt=${this.props.ltlDeliveryServices}`;
    }
    return PDP_URL;
  }

  getStoreAvailabilityMessage = () => {
    const { commonName, state } = this.props.storeDetails || {};
    const lblBopusAvail = BOPUS_AVAIL_LBL;
    const lblBopusReady = BOPUS_READY_LBL;
    const availabilityMessage =
      this.props.styleVariation === 'ais' || this.props.pickupFilterSelected
        ? lblBopusReady
        : lblBopusAvail;
    const storeName = commonName ? commonName.trim() : '';
    if (!this.props.ggEligibleItem && this.props.skuInStore === '1') {
      return (
        <div className={styles.storeAvailabiliyMessage} tabIndex="0">
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

  getATCLabel = () => {
    const { pickupFilterSelected, ggEligibleItem, styleVariation } = this.props;
    if (styleVariation === 'ais' || (pickupFilterSelected && !ggEligibleItem)) {
      return BOPIS_PICK_IT_UP_CTA;
    }
    return ADD_TO_CART_CTA_LBL;
  };

  getDataLocatorATC = (isDisabled, enableATCCTA) => {
    const { pickupFilterSelected, ggEligibleItem, styleVariation } = this.props;
    if (isDisabled || enableATCCTA) {
      return 'registryguest-addtocartdisablebutton';
    }
    if (styleVariation === 'ais' || (pickupFilterSelected && !ggEligibleItem)) {
      return 'registryguest-pickitupbutton';
    }
    return 'registryguest-addtocartbutton';
  };

  getPayload = () => {
    const { storeDetails, pickupFilterSelected, ggEligibleItem } = this.props;
    if (
      this.props.styleVariation === 'ais' ||
      (pickupFilterSelected && !ggEligibleItem && storeDetails.storeId)
    ) {
      return {
        reserveNow: 'true',
        storeId: storeDetails.storeId,
      };
    }
    return {};
  };

  getAtcTheme(isDisabled, enableATCCTA) {
    const { styleVariation } = this.props;
    if ((isDisabled || enableATCCTA) && !this.isGroupGiftEligible)
      return 'deactivated';
    return (this.isGroupGiftEligible && styleVariation !== 'ais') ||
      styleVariation === 'oos'
      ? 'ghostDark'
      : 'secondaryStrokeBasic';
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

  handleCashFundsModal() {
    if (this.props.cfSubmitAPIStatus.submitSuccessFlag)
      this.props.handleFirstCategoryCall(true);
    this.props.clearContributeCashFund();
    this.setState({ cashfundsModalState: false });
  }

  isATCDisabled = () => {
    const { styleVariation, ggEligibleItem } = this.props;
    if (styleVariation === 'ais' && !ggEligibleItem) return false;
    else if (styleVariation === 'oos') return true;
    return false;
  };
  handleTealiumOnContributeBtn(e) {
    e.preventDefault();
    this.setState({ cashfundsModalState: true });
    const ACTIONTYPE = 'cash contribute button click';
    const PAGENAME_BREADCRUMB = 'Contribute to cash fund';
    const TEALIUM_PAGE_INFO = PAGENAME_BREADCRUMB;
    const tealiumInfo = {
      pagename_breadcrumb: PAGENAME_BREADCRUMB,
      call_to_actiontype: 'Cash Fund Contribute',
      link_name: ACTIONTYPE,
    };
    if (this.props.handleTealiumEvent) {
      this.props.handleTealiumEvent(ACTIONTYPE, tealiumInfo, TEALIUM_PAGE_INFO);
    }
  }
  checkItemNeedToExcluded(itemType, jdaCatName, sKUDetailVO) {
    const isGiftCard = pathOr('', 'skuGiftCard', sKUDetailVO);
    return (
      (itemType && itemType === 'PER') ||
      jdaCatName === 'EXPERIENCES' ||
      isGiftCard
    );
  }
  changeQuantity(value) {
    this.setState({
      quantity: value,
    });
  }
  get displayTitle() {
    const { itemType, personalizationDescription } = this.props;
    return truncate(
      itemType === 'CSH'
        ? personalizationDescription
        : pathOr('', 'sKUDetailVO.displayName', this.props),
      this.getCharLength()
    );
  }
  isIntlDisabled() {
    return (
      this.props.isInternationalUser &&
      this.props.sKUDetailVO &&
      this.props.sKUDetailVO.intlRestricted
    );
  }
  isAddToCartDisable(
    intlRestricted,
    refNum,
    enableKatori,
    isInternationalUser
  ) {
    if (isInternationalUser && (intlRestricted || !isEmpty(refNum))) {
      return true;
    }
    if (!enableKatori && !isEmpty(refNum)) {
      return true;
    }
    return false;
  }

  // This function will return the boolean whoich tells us whether the Add To Registry button will be enabled or disabled
  isAddToRegistryEnabled(refNum, message, isInternationalUser) {
    // if international user flag is passed and is true then add to registry should be disabled
    if (isInternationalUser === true) {
      return true;
    }
    if (!isNull(message)) {
      const updatedMessage = message && message.toUpperCase();
      switch (updatedMessage) {
        case personalizationCodes.PY_CODE:
          return !isNull(refNum);
        case personalizationCodes.PB_CODE:
          return !isNull(refNum);
        case personalizationCodes.CR_CODE:
          return !isNull(refNum);
        default:
          return null;
      }
    }
    return null;
  }

  isPersonalizationApplicable() {
    const { refNum, sKUDetailVO, itemType } = this.props;
    if (itemType === 'CSH') return true;
    return personalizationApplicable(refNum, sKUDetailVO.personalizationType);
  }

  isShowContributionButton = () => {
    return (
      (this.props.ggEligibleItem &&
        this.props.isBelowLineItem === 'false' &&
        this.props.ggItemContributionNeeded > this.props.amountFulfilled &&
        !this.props.isInternationalUser) ||
      this.props.itemType === 'CSH'
    );
  };

  isGGItemEligible = () => {
    const { ggItemContributionNeeded, amountFulfilled } = this.props;
    return (
      this.props.ggEligibleItem &&
      (ggItemContributionNeeded !== 0 || amountFulfilled !== 0) &&
      !this.props.isInternationalUser
    );
  };
  renderCashFunds = isRegistryOwnerModal => {
    const { amountFulfilled, price } = this.props;
    return (
      <React.Fragment>
        <div className="md-mb2 md-mt1">
          <GroupGiftingTooltip
            heading={'Cash Funds'}
            description={TOOL_TIP_BODY_LBL}
            toolTipAlign={`outerTooltipGG`}
            amountFulfilled={amountFulfilled}
            showFulfilledAmount
            fromModal={isRegistryOwnerModal && this.isBabySite}
            commonStyle={styles.commonAmount}
            toolTipOnMob={styles.toolTipAlign}
            title={'Cash Funds'}
            ggItemContributionNeeded={price}
            iconProps={
              (this.isMobileScreen || isRegistryOwnerModal) && {
                width: '12px',
                height: '12px',
              }
            }
            isCashFund
          />
          <ContributionProgressBar
            amountFulfilled={amountFulfilled}
            ggItemContributionNeeded={price}
            commonStyle={styles.commonAmount}
            RegistryDetails={isRegistryOwnerModal}
            isCashFund
          />
        </div>
      </React.Fragment>
    );
  };

  renderProductTile() {
    const { purchased, isBopisFeatureEnable, isDpfItem } = this.props;
    return (
      <React.Fragment>
        <div className="relative">
          {this.renderFavoritebadge(this.props.coOwner, this.props.owner)}
        </div>

        <React.Fragment>
          <div
            className={classnames('relative mb2', styles.imageMainContainer)}
          >
            <div className={styles.imageContainer}>
              {this.renderProductImage()}
              {this.renderAlreadyPurchased()}
            </div>
          </div>
          {this.renderPrice()}
          {this.renderTitle()}
          {isBopisFeatureEnable && this.getStoreAvailabilityMessage()}

          {this.isGroupGiftEligible && this.renderGroupGiftProgress()}
          {this.props.itemType === 'CSH' && this.renderCashFunds()}
          <div
            className={
              this.props.itemType === 'CSH' && isDpfItem
                ? styles.productDetailSectionCSH
                : styles.productDetailSection
            }
          >
            {this.renderContributeBtn()}
            {this.itemType !== 'CSH' && this.renderQtyAndCTA()}
            <GridX className="pb2 pt2">
              <Cell className="large-5 small-6">
                {!purchased &&
                  this.itemType !== 'CSH' &&
                  this.renderPurchasedQuantityContainer()}
              </Cell>
              <Cell className="large-7 small-6">
                {this.isGroupGiftEligible &&
                  !purchased &&
                  this.props.styleVariation !== 'ais' &&
                  this.renderAddToCartBtn()}
                {this.renderStaticButton()}
              </Cell>
            </GridX>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }

  renderMobileProductTile() {
    const { purchased, isBopisFeatureEnable, sKUDetailVO } = this.props;
    return (
      <div
        className={classnames(
          'p1 pr2',
          styles.mobileBase,
          styles.mobAlign,
          this.props.styleVariation === 'oos' && styles.oosCell
        )}
        data-sku={sKUDetailVO.skuId}
      >
        <div className={styles.imageBase}>
          <div className={styles.imageContainer}>
            {this.renderProductImage()}
          </div>
          <div className="relative">
            {this.renderFavoritebadge(this.props.coOwner, this.props.owner)}
          </div>
          {!purchased && this.renderPurchasedQuantityContainer()}
        </div>

        <div
          className={classnames('pl1', styles.imageBase, styles.contentBase)}
        >
          {purchased && (
            <div className={classnames('relative', styles.purchaseContainer)}>
              {this.renderAlreadyPurchased()}
            </div>
          )}

          <React.Fragment>
            {this.renderTitle()}
            {this.renderPrice()}
            {isBopisFeatureEnable && this.getStoreAvailabilityMessage()}

            <div className={styles.productDetailSection}>
              {this.isGroupGiftEligible && this.renderGroupGiftProgress()}
              {this.props.itemType === 'CSH' && this.renderCashFunds()}
              <div className={styles.productDetailSection}>
                {this.itemType !== 'CSH' && this.renderQtyAndCTA()}
                {this.renderContributeBtn()}
                {this.renderStaticButton()}
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
    );
  }

  renderFavoritebadge = (coOwner, owner) => {
    const isCanada = getSiteId() === 'BedBathCanada';
    const colorVariation = this.isBabySite ? styles.babycolor : styles.UScolor;
    const favouriteDispaly = coOwner ? `${owner} & ${coOwner}` : `${owner}`;
    const favouriteType = this.props.isMobile
      ? this.props.markedAsFav && (
          <div
            className={styles.favoritedes}
            data-locator="registry-item-tile-fav-badge"
          >
            {FavouriteButton(this.isBabySite, this.props.isMobile)}
          </div>
        )
      : this.props.markedAsFav && (
          <div>
            <span
              className={classnames(styles.favText, colorVariation)}
              data-locator="registry-item-tile-fav-badge"
            >
              {FavouriteButton(this.isBabySite)}
              {LabelsUtil.replacePlaceholderValues(
                isCanada
                  ? FAVORITE_REGISTRY_CANADA_LBL
                  : FAVOURITE_REGISTRY_LBL,
                [favouriteDispaly]
              )}
            </span>
          </div>
        );
    return favouriteType;
  };

  renderTitle = () => {
    /* istanbul ignore next */
    const TitleContainer = props => (
      <PrimaryLink
        href={this.getPDPURL()}
        onClick={this.onQuickViewButtonClick}
        className={classnames(
          'md-mt2 md-mb1',
          styles.titleTiles,
          !this.props.purchased && 'sm-mt1',
          styles.mobFont,
          !isItemAvailable(this.props.isBelowLineItem, this.props.skuInStore)
            ? styles.primaryLinkDisabled
            : null,
          !this.props.sKUDetailVO.activeFlag ? styles.primaryLinkDisabled : null
        )}
        type="noUnderline"
        {...props}
      />
    );
    const TitleWithDangerousHTML = dangerousHTML(TitleContainer);
    if (this.itemType === 'CSH') {
      return <p>{this.displayTitle}</p>;
    }
    return (
      <header>
        <TitleWithDangerousHTML>{this.displayTitle}</TitleWithDangerousHTML>
      </header>
    );
  };

  renderPrice = () => {
    const { sKUDetailVO } = this.props;
    let price = this.props.formattedPrice;
    let isCartFlag = pathOr(false, 'inCartFlag', sKUDetailVO);

    if (isTbs() && isCartFlag) {
      price = this.props.formattedInCartPriceVal;
      isCartFlag = false;
    }
    return (
      <Price
        priceStyle={styles.priceStyle}
        mobWasPrice={styles.mobWasPrice}
        itemPrice={price}
        refNum={this.props.refNum}
        totalPrice={this.props.formattedTotalPrice}
        personalizedPrice={this.props.formattedPersonalizedPrice}
        ltlFlag={sKUDetailVO && sKUDetailVO.ltlItem}
        personalizationType={sKUDetailVO && sKUDetailVO.personalizationType}
        inCart={isCartFlag}
        ltlDeliveryServices={this.props.ltlDeliveryServices}
        displayDiscountedPrice={this.showDiscountedPrice}
        formattedWasPrice={this.props.formattedWasPrice}
        priceColor={
          this.isBabySite && !this.showDiscountedPrice && styles.babyFontColor
        }
        type="noUnderline"
        totalDeliveryCharges={this.props.totalDeliveryCharges}
      />
    );
  };

  renderGroupGiftProgress = () => {
    return (
      <div className="md-mb2 md-mt1">
        <GroupGiftingTooltip
          heading={PROGRESS_BAR_TITLE_LBL}
          diaperFundLabel={DIAPER_FUND_LBL}
          diapertitle={TOOL_TIP_DIAPER_HEADING_LBL}
          isDiaperFundSku={this.isDiaperFundSku}
          diaperdescription={TOOL_TIP_DIAPER_BODY_LBL}
          title={TOOL_TIP_HEADING_LBL}
          description={TOOL_TIP_BODY_LBL}
          toolTipAlign={`outerTooltipGG`}
          amountFulfilled={this.props.amountFulfilled}
          showFulfilledAmount
          giftGiver
          iconProps={this.isMobileScreen && { width: '12px', height: '12px' }}
          ggItemContributionNeeded={this.props.ggItemContributionNeeded}
          commonStyle={styles.commonAmount}
          toolTipOnMob={styles.toolTipAlign}
        />
        <ContributionProgressBar
          amountFulfilled={this.props.amountFulfilled}
          ggItemContributionNeeded={this.props.ggItemContributionNeeded}
          commonStyle={styles.commonAmount}
        />
      </div>
    );
  };

  renderProductImage() {
    const { sKUDetailVO } = this.props;
    const isImageActive = this.props.purchased
      ? classnames({ [styles.purchasedThumbnail]: true })
      : classnames({ [styles.thumbnail]: true });
    return (
      <PrimaryLink
        className={classnames(
          styles.mobWasPrice,
          !isItemAvailable(this.props.isBelowLineItem, this.props.skuInStore)
            ? styles.imgWrapperDisabled
            : styles.imgWrapper
        )}
        href="#"
        disabledLink={!sKUDetailVO.activeFlag}
      >
        {this.isPersonalizationApplicable() ? (
          <LazyLoad
            threshold={1500}
            placeholder={
              <img alt={this.displayTitle} src={PRODUCT_IMAGE_PLACEHOLDER} />
            }
          >
            <img
              className={classnames(styles.thumbnail, isImageActive)}
              alt={this.displayTitle}
              src={this.props.personalizedImageUrls}
            />
          </LazyLoad>
        ) : (
          <ImgSrcSet
            className={classnames(styles.thumbnail, isImageActive)}
            alt={this.displayTitle}
            srcSet={SRC_SET}
            imageSrc={IMAGE_SRC}
            scene7imageID={pathOr('', 'skuImages.mediumImage', sKUDetailVO)}
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

  renderPurchasedQuantityContainer() {
    const { qtyRequested, qtyPurchased } = this.props;
    const needed =
      qtyRequested > qtyPurchased ? qtyRequested - qtyPurchased : 0;
    return (
      <div
        className={styles.requested}
        data-locator="neededQuantity"
        tabIndex="0"
      >
        {`${needed} Needed`}
      </div>
    );
  }

  // eslint-disable-next-line complexity
  renderAddToCartBtn() {
    const { tealiumData, globalSwitchConfig, styleVariation } = this.props;
    const {
      skuId,
      intlRestricted,
      parentProdId,
      ltlItem,
      size,
      swatch,
    } = this.props.sKUDetailVO;
    const isRBYR = pathOr(
      false,
      'registryResVO.registrySummaryVO.storedValueOptIn',
      this.props.registryData
    );
    const registrySummaryVO = pathOr(
      {},
      'registryResVO.registrySummaryVO',
      this.props.registryData
    );

    const {
      coRegistrantFirstName = '',
      primaryRegistrantFirstName = '',
    } = registrySummaryVO;

    this.registryUserName = coRegistrantFirstName
      ? `${primaryRegistrantFirstName} & ${coRegistrantFirstName}`
      : primaryRegistrantFirstName;
    const { quantity } = this.state;
    const isLtlItem = isEqual(true, ltlItem) || isEqual('true', ltlItem);
    const isDisabled = this.isAddToCartDisable(
      intlRestricted,
      this.props.refNum,
      this.props.enableKatori,
      this.props.isInternationalUser
    );

    const cartLbl = this.getATCLabel();

    const imageURL = this.isPersonalizationApplicable()
      ? this.props.personalizedImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr('', 'skuImages.mediumImage', this.props.sKUDetailVO),
          'largeImage'
        );
    const tealiumProductProps = {
      sKUDetailVO: this.props.sKUDetailVO,
      quantity,
      productURL: this.props.productURL,
      price: this.props.price,
      catId: this.props.jdaCatId,
      imageTitle: this.displayTitle,
      imageURL,
      levelOfService: this.props.ltlShipMethodDesc,
      personalisedCode: this.props.personalisedCode,
    };
    let registryATCTealiumInfo;
    let pathName;
    const isRBYRRegistryEnabled = isRBYRRegistry(
      this.props.labels,
      pathOr(
        '',
        'registryResVO.registrySummaryVO.registryType.registryTypeName',
        this.props.registryData
      )
    );
    if (tealiumData) {
      registryATCTealiumInfo = addToCartRegistryTealiumInfo(
        tealiumData,
        this.props.favoriteStore,
        this.props.qtyRequested,
        this.props.qtyPurchased,
        tealiumProductProps
      );
      pathName = tealiumData.location ? tealiumData.location.pathname : '';
    }
    const payload = this.getPayload();

    const enableATCCTA = this.isATCDisabled();
    return (
      !this.isDiaperFundSku &&
      this.itemType !== 'CSH' && (
        <LazyLoad threshold={1500}>
          <AddToCart
            {...payload}
            skuId={skuId}
            prodId={parentProdId}
            ltlShipMethod={this.props.ltlDeliveryServices}
            ltlFlag={isLtlItem}
            size={size}
            swatch={swatch}
            qty={quantity}
            registryId={this.props.registryId}
            refnum={this.props.refNum || ''}
            buttonProps={{
              attr: {
                theme: this.getAtcTheme(isDisabled, enableATCCTA),
                variation:
                  (styleVariation === 'ais' || !this.isGroupGiftEligible) &&
                  'fullWidth',
                tooltip: cartLbl,
                'data-locator': this.getDataLocatorATC(
                  isDisabled,
                  enableATCCTA
                ),
                disabled: isDisabled || enableATCCTA,
                iconProps: this.isGroupGiftEligible &&
                  styleVariation !== 'ais' && {
                    type: 'plus',
                    height: '14',
                    width: '14',
                    className: classnames(
                      styleVariation !== 'oos' && styles.plusColor
                    ),
                  },
                className: classnames(
                  styleVariation === 'oos' &&
                    this.isGroupGiftEligible &&
                    styles.oosATC,
                  styles.mobCtaHeight,
                  styles.staticSection
                ),
              },
              children: cartLbl,
            }}
            onClientError={errors => {
              this.setState({
                addToCartErrors: errors,
              });
            }}
            onSuccess={() => {
              this.setState({
                quantity: 1,
              });
            }}
            parentProductId={this.props.productId || ''}
            calledFromRegistry
            onModalHide={this.props.onModalHide}
            registryATCTealiumInfo={registryATCTealiumInfo}
            tealiumLinkLocation={pathName}
            isCollegePage={false}
            isNeedToExcluded={this.checkItemNeedToExcluded(
              this.props.itemType,
              this.props.jdaCatName,
              this.props.sKUDetailVO
            )}
            enableRBYRFeature={
              globalSwitchConfig &&
              globalSwitchConfig.enableRBYRFeature &&
              isRBYRRegistryEnabled
            }
            isRBYRItem={isRBYR}
            registryUserName={this.registryUserName}
          />
        </LazyLoad>
      )
    );
  }

  renderQtyAndCTA() {
    return (
      !this.props.purchased &&
      (!this.isGroupGiftEligible || this.props.styleVariation === 'ais') && (
        <div className={classnames(styles.qtyAndCtaSection, 'pt2')}>
          <GridX className="grid-margin-x">
            <Cell className="small-4 large-4" tabIndex="0">
              <QuantitySelector
                fieldName="qtySelect"
                labelName="Qty"
                labelStyle="inlineLabel"
                selectedQuantity={this.state.quantity}
                optionSet={getCartQuatitySelectorOptions()}
                updateQuantity={value => {
                  this.changeQuantity(value);
                }}
                buttonProps={{
                  theme: 'ghostPrimary',
                  variation: 'noHorizontalPadding',
                }}
                updateButtonName=""
                showUpdateButton={false}
                data-locator="saveditems_qtydropdown"
              />
            </Cell>
            <Cell className="small-8 large-8">{this.renderAddToCartBtn()}</Cell>
          </GridX>
        </div>
      )
    );
  }

  renderStaticButton() {
    const findinStoreDisabled = this.isAddToRegistryEnabled(
      this.props.refNum,
      this.props.sKUDetailVO.personalizationType,
      this.props.isInternationalUser
    );
    const findInStoreClass = findinStoreDisabled
      ? styles.findInStoreDisabled
      : styles.findInStore;

    const isBabySiteLbl = this.props.siteId === 'BuyBuyBaby';
    return (
      <LazyLoad threshold={1500}>
        {this.props.styleVariation === 'oos' &&
          !this.props.purchased &&
          !this.props.sKUDetailVO.bopusAllowed &&
          !this.props.sKUDetailVO.vdcSku && (
            <div className={styles.staticSection}>
              <PrimaryLink
                href="#"
                variation="primaryColoredIcon"
                className={findInStoreClass}
                iconProps={{
                  type: 'locations',
                  height: this.isMobileScreen ? '14' : '19',
                  width: this.isMobileScreen ? '10' : '19',
                }}
                disabledLink={findinStoreDisabled}
                onClick={this.onFindInStoreClick}
              >
                <span className={styles.wrapContent} data-locator="findInStore">
                  {isBabySiteLbl
                    ? FIND_IN_STORE_BABY_LBL
                    : FIND_IN_STORE_US_LBL}
                </span>
              </PrimaryLink>
            </div>
          )}
      </LazyLoad>
    );
  }
  renderAlreadyPurchased() {
    return (
      this.props.purchased && (
        <div
          className={classnames('absolute', styles.purchasedButton)}
          tabIndex="0"
          data-locator="registry-item-tile-purchased-badge"
        >
          <span>
            <Icon
              type="checkmarkwhite"
              width="16px"
              height="16px"
              className={styles.checkboxPurchased}
            />{' '}
            {this.itemType === 'CSH' ? 'Funded' : PURCHASED_LBL}
          </span>
        </div>
      )
    );
  }
  renderContributeBtn() {
    return (
      this.isShowContributionButton() && (
        <Button
          className={styles.contributeBtn}
          onClick={
            this.itemType === 'CSH'
              ? this.handleTealiumOnContributeBtn
              : this.onQuickViewButtonClick
          }
          theme="secondaryStrokeBasic"
          data-locator="groupGiftingContribute"
        >
          {this.itemType === 'CSH' ? ' Contribute ' : CONTRIBUTE_CTA_LBL}
        </Button>
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <ContributeModalComponent
          handleCashFundsModal={this.handleCashFundsModal}
          cashfundsModalState={this.state.cashfundsModalState}
          {...this.props}
        />
        {this.getDesktopMediaQuery()}
        {this.getMobileMediaQuery()}
      </React.Fragment>
    );
  }
}
export default ProductGridTile;
export { ProductGridTile as PureProductGridTile }; // pure component. used in tests
