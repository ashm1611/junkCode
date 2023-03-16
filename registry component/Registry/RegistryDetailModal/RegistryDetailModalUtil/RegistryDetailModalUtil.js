import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import isEqual from 'lodash/fp/isEqual';
import isEmpty from 'lodash/fp/isEmpty';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { decodeHtmlEntities, isNull } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import getCartQuatitySelectorOptions from '@bbb-app/utils/getCartQuantitySelectorOptions';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import QuantitySelector from '@bbb-app/quantity-selector/QuantitySelector';
import {
  personalizationApplicable,
  showDiscountedPrice,
} from '@bbb-app/utils/RegistryUtils';
import style from './RegistryDetailModalUtil.css';
import { REGISTRY_QUICK_VIEW } from '../../../PDP/constants';
import Rating from '../Rating/Rating';
import { ProductDetailsUtil } from '../../../PDP/ProductDetails/ProductDetailsUtil';
import ProductSkuAttributesRLP from '../../ProductGridTile/ProductSkuAttributesRLP';
import isRBYRRegistry from '../../utils/isRBYRRegistry';
import { addToCartRegistryTealiumInfo } from '../../ProductGridTile/addToCartRegistryTealiumInfo';
import '../../../../../assets/icons/bbb-detail.svg';
import AddToCart from '../../../../../containers/AddToCart/AddToCart.async';
import truncateWithEllipses from '../../../../../utils/truncateWithEllipses';
import ProductTileLTLDetail from '../../../../Pages/Registry/ProductTileLTLDetail';
import { ADD_TO_CART_CTA_LBL } from './constant';
import {
  INCLUDING_DELIVERY_LBL,
  LIMITED_AVAILABILITY_LBL,
  LIMITED_AVAILABILITY_MSG_LBL,
  INTL_RESTRICTED_MESSAGE_LBL,
  WAS_LBL,
} from '../../constants';
import {
  BOPIS_PICK_IT_UP_CTA,
  VIEW_PRODUCT_DETAILS_CTA_LBL,
  MINIMUM_QUANTITY_MESSAGE_LBL,
  MINIMUM_QUANTITY_TOOLTIP_LBL,
} from '../../ProductGridTile/constants';
import {
  BOPUS_READY_LBL,
  BOPUS_AVAIL_LBL,
} from '../../OwnerProductGridTile/constants';
import { QTY_LBL } from '../RegistryDetailModalLayout/constants';

const getPrice = ({
  itemPrice,
  totalPrice,
  personalizedPrice,
  ltlFlag,
  personalizationType,
  refNum,
  inCart,
  totalDeliveryCharges,
  displayDiscountedPrice,
  formattedWasPrice,
}) => {
  let displayPrice = itemPrice;

  // If delivery service for LTL item is not selected, "Inc. Delivery" label should not be displayed
  const incDeliveryLabel =
    totalDeliveryCharges > 0 ? INCLUDING_DELIVERY_LBL : '';

  displayPrice = personalizationApplicable(refNum, personalizationType)
    ? personalizedPrice
    : displayPrice;
  displayPrice = ltlFlag ? `${totalPrice} ${incDeliveryLabel}` : displayPrice;

  const wasPrice =
    displayDiscountedPrice && !inCart && `${WAS_LBL} ${formattedWasPrice}`;
  return [displayPrice, wasPrice];
};

/* eslint-disable */
export const getProductPrice = props => {
  const price = getPrice({
    itemPrice: props.totalPrice,
    refNum: props.refNum,
    totalPrice: props.formattedTotalPrice,
    personalizedPrice: props.formattedPersonalizedPrice,
    ltlFlag: props.sKUDetailVO.ltlItem,
    personalizationType: props.personalizationType,
    inCart: props.isCartFlag,
    totalDeliveryCharges: props.totalDeliveryCharges,
    displayDiscountedPrice: showDiscountedPrice({
      ...props,
      price: props.formattedPrice,
    }),
    formattedWasPrice: props.formattedWasPrice,
  });
  return (
    <div tabIndex="0" data-locator="registry-quick-view-item-price">
      <div
        className={classnames(style.productPrice, {
          [style.isPrice]: !price[1],
        })}
      >
        {price[0]}
      </div>
      {price[1] && <div className={style.wasPrice}>{price[1]}</div>}
    </div>
  );
};

export const getProductTitle = title => {
  return (
    <React.Fragment>
      <div
        tabIndex="0"
        className={style.productTitle}
        data-locator="registry-quick-view-item-title"
      >
        {`${truncateWithEllipses({
          str: decodeHtmlEntities(title),
          len: 61,
          isEllipses: true,
        })}`}
        {}
      </div>
    </React.Fragment>
  );
};

export const getUPC = upc => {
  return (
    <React.Fragment>
      <div
        tabIndex="0"
        className={style.upcText}
        data-locator="registry-quick-view-item-UPC"
      >
        UPC <span>{upc}</span>
      </div>
    </React.Fragment>
  );
};
export const getPurchase = purchasedLabel => {
  return (
    <div tabIndex="0" data-locator="registry-quick-view-item-purchased-symbol">
      <span className={style.purchasedTextStyle}>
        <Icon
          type="checkmarkwhite"
          width="12px"
          height="12px"
          className={style.purchasedCheckMarkStyle}
        />{' '}
        {purchasedLabel}
      </span>
    </div>
  );
};
export const getRequestPurchased = (qtyReq, qtyPur) => {
  return (
    <React.Fragment>
      <div
        tabIndex="0"
        className={style.requestedPurchased}
        data-locator="registry-quick-view-item-quantity-rp"
      >
        <span>{qtyReq}</span> Requested | <span>{qtyPur}</span> Purchased
      </div>
    </React.Fragment>
  );
};

export const getQtyDropDown = updateQuantity => {
  return (
    <div className={style.qtyDropDown}>
      <QuantitySelector
        fieldName="qtySelect"
        labelName={QTY_LBL}
        labelStyle={'inlineLabel'}
        selectedQuantity={1}
        optionSet={getCartQuatitySelectorOptions()}
        updateQuantity={updateQuantity}
        buttonProps={{
          theme: 'ghostPrimary',
          variation: 'noHorizontalPadding',
        }}
        updateButtonName=""
        showUpdateButton={false}
        data-locator="RLV_qtydropdown"
        buttonClassName={style.qtySelectorStyle}
      />
    </div>
  );
};

/**
 * Renders Rating component (rating stars and review count)
 * @param { number } RATINGS rating number
 * @param { number } REVIEWS number of reviews
 * @param { object } labels label from api
 */
export const getProductRating = props => {
  const {
    RATINGS,
    REVIEWS,
    labels,
    otherRatingProps,
    location,
    switchConfig,
    PRODUCT_ID,
    DISPLAY_NAME,
    fireTealiumAction,
    quickViewMode,
    contextPath,
    SEO_URL,
    variation,
  } = props;

  // if review or rating available then only displaying rating micro data
  const { AverageRatingMicroData, mPulseEnabled } = otherRatingProps;
  const displayMicroData = !!(
    pathOr(false, 'enableCustomAggregateRatingPDP', switchConfig) &&
    (REVIEWS || RATINGS)
  );
  const SEOMicroData = displayMicroData ? AverageRatingMicroData : null;
  let pathname = contextPath && SEO_URL ? `${contextPath}${SEO_URL}` : '';
  /* istanbul ignore else */
  if (variation === REGISTRY_QUICK_VIEW) {
    pathname = ProductDetailsUtil.getPDP_URL(props);
  }
  const searchParams = pathOr('', 'search', location);

  const linkProps = {
    'data-locator': 'pdp-reviewslink',
    textUnderline: true,
    replace: location.pathname === pathname,
    href: `${pathname}${searchParams}#reviews`,
    className: 'fol',
  };

  const interactionTealiumData = {
    fireTealiumAction,
    location,
    productData: { PRODUCT_ID, DISPLAY_NAME },
    label: 'review',
  };

  return (
    REVIEWS > 0 && (
      <Rating
        value={parseFloat(RATINGS) / 5}
        total={
          REVIEWS && `${REVIEWS} ${LabelsUtil.getLabel(labels, 'reviews')}`
        }
        reviewLinkProps={linkProps}
        ratingValue={parseFloat(RATINGS)}
        displayMicroData={displayMicroData}
        reviewCount={REVIEWS}
        SEOMicroData={SEOMicroData}
        title={decodeHtmlEntities(DISPLAY_NAME)}
        enableMPulse={mPulseEnabled}
        interactionTealiumData={interactionTealiumData}
        quickViewMode={quickViewMode}
      />
    )
  );
};

const isAddToCartDisable = (
  intlRestricted,
  refNum,
  enableKatori,
  isInternationalUser,
  isItemPurchased,
  isItemFunded
) => {
  if (isInternationalUser && (intlRestricted || !isEmpty(refNum))) {
    return true;
  }
  if (!enableKatori && !isEmpty(refNum)) {
    return true;
  }
  if (isItemPurchased || isItemFunded) {
    return true;
  }
  return false;
};

/* eslint-disable */
export const renderAddToCartBtn = ({
  quantity,
  pickupFilterSelected,
  ggEligibleItem,
  theme,
  productId,
  registryId,
  sKUDetailVO,
  labels,
  refNum,
  onModalHide,
  enableKatori,
  tealiumData,
  ltlDeliveryServices,
  personalizedImageUrls,
  productURL,
  price,
  jdaCatId,
  ltlShipMethodDesc,
  favoriteStore,
  qtyRequested,
  qtyPurchased,
  personalisedCode,
  isInternationalUser,
  itemType,
  registryData,
  globalSwitchConfig,
  jdaCatName,
  styleVariation,
  isGroupGiftEligible,
  displayTitle,
  storeDetails,
  isItemPurchased,
  isItemFunded,
  hideParent,
  registryUserName,
}) => {
  const {
    skuId,
    intlRestricted,
    parentProdId,
    ltlItem,
    size,
    swatch,
  } = sKUDetailVO;
  const isRBYR = pathOr(
    false,
    'registryResVO.registrySummaryVO.storedValueOptIn',
    registryData
  );
  const isLtlItem = isEqual(true, ltlItem) || isEqual('true', ltlItem);
  const isDisabled = isAddToCartDisable(
    intlRestricted,
    refNum,
    enableKatori,
    isInternationalUser,
    isItemPurchased,
    isItemFunded
  );
  const getATCLabel = () => {
    if (styleVariation === 'ais' || (pickupFilterSelected && !ggEligibleItem)) {
      return BOPIS_PICK_IT_UP_CTA;
    }
    return ADD_TO_CART_CTA_LBL;
  };

  const cartLbl = getATCLabel();

  const tealiumProductProps = {
    sKUDetailVO,
    quantity,
    productURL,
    price,
    catId: jdaCatId,
    imageTitle: displayTitle,
    imageURL,
    levelOfService: ltlShipMethodDesc,
    personalisedCode,
  };

  const isPersonalizationApplicable = () => {
    return personalizationApplicable(refNum, sKUDetailVO.personalizationType);
  };

  const imageURL = isPersonalizationApplicable()
    ? personalizedImageUrls
    : getConcatenatedScene7URLWithImageId(
        pathOr('', 'skuImages.mediumImage', sKUDetailVO),
        'largeImage'
      );
  let registryATCTealiumInfo;
  let pathName;
  const isRBYRRegistryEnabled = isRBYRRegistry(
    labels,
    pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeName',
      registryData
    )
  );
  if (tealiumData) {
    registryATCTealiumInfo = addToCartRegistryTealiumInfo(
      tealiumData,
      favoriteStore,
      qtyRequested,
      qtyPurchased,
      tealiumProductProps
    );
    pathName = tealiumData.location ? tealiumData.location.pathname : '';
  }

  const getPayload = () => {
    if (
      styleVariation === 'ais' ||
      (pickupFilterSelected && !ggEligibleItem && storeDetails.storeId)
    ) {
      return {
        reserveNow: 'true',
        storeId: storeDetails.storeId,
      };
    }
    return {};
  };

  const payload = getPayload();

  const isATCDisabled = () => {
    if (styleVariation === 'ais' && !ggEligibleItem) return false;
    else if (styleVariation === 'oos') return true;
    return false;
  };

  const getAtcTheme = (isDisabled, enableATCCTA) => {
    if (isItemPurchased && isGroupGiftEligible) {
      return 'deactivated';
    }
    if ((isDisabled || enableATCCTA) && !isGroupGiftEligible)
      return 'deactivated';
    return isGroupGiftEligible || styleVariation === 'oos'
      ? 'ghostDark'
      : 'secondaryStrokeBasic';
  };

  const checkItemNeedToExcluded = (itemType, jdaCatName, sKUDetailVO) => {
    const isGiftCard = pathOr('', 'skuGiftCard', sKUDetailVO);
    return (
      (itemType && itemType === 'PER') ||
      jdaCatName === 'EXPERIENCES' ||
      isGiftCard
    );
  };
  const isDiaperFundSku = itemType === 'DPF';
  const enableATCCTA = isATCDisabled();
  return (
    !isDiaperFundSku && (
      <AddToCart
        {...payload}
        skuId={skuId}
        prodId={parentProdId}
        ltlShipMethod={ltlDeliveryServices}
        ltlFlag={isLtlItem}
        size={size}
        swatch={swatch}
        qty={quantity}
        registryId={registryId}
        refnum={refNum || ''}
        buttonProps={{
          attr: {
            theme: theme ? theme : getAtcTheme(isDisabled, enableATCCTA),
            variation: !isGroupGiftEligible && 'fullWidth',
            tooltip: cartLbl,
            'data-locator': 'registryguest-addtocartbutton',
            iconProps: isGroupGiftEligible && {
              type: 'plus',
              height: '14',
              width: '14',
              className: classnames({
                [style.plusColor]: styleVariation !== 'oos',
              }),
            },
            className: classnames(
              styleVariation === 'oos' && isGroupGiftEligible && style.oosATC,
              style.mobCtaHeight,
              style.staticSection,
              style.addToCart
            ),
          },
          children: cartLbl,
        }}
        onError={hideParent}
        onClientError={hideParent}
        onSuccess={hideParent}
        parentProductId={productId || ''}
        calledFromRegistry
        onModalHide={onModalHide}
        registryATCTealiumInfo={registryATCTealiumInfo}
        tealiumLinkLocation={pathName}
        isCollegePage={false}
        isNeedToExcluded={checkItemNeedToExcluded(
          itemType,
          jdaCatName,
          sKUDetailVO
        )}
        enableRBYRFeature={
          globalSwitchConfig &&
          globalSwitchConfig.enableRBYRFeature &&
          isRBYRRegistryEnabled
        }
        isRBYRItem={isRBYR}
        registryUserName={registryUserName}
      />
    )
  );
};

export const getStoreAvailabilityMessage = filterProps => {
  const {
    pickupFilterSelected,
    ggEligibleItem,
    storeDetails,
    styleVariation,
  } = filterProps;
  const { commonName, state } = storeDetails || {};
  const lblBopusAvail = BOPUS_AVAIL_LBL;
  const lblBopusReady = BOPUS_READY_LBL;
  const availabilityMessage =
    styleVariation === 'ais' || pickupFilterSelected
      ? lblBopusReady
      : lblBopusAvail;
  const storeName = commonName ? commonName.trim() : '';
  if (!ggEligibleItem) {
    return (
      <div tabIndex="0" className={style.availableStatus}>
        {' '}
        <span data-locator="bopisAvailabilityLabel">
          {availabilityMessage}
        </span>{' '}
        {`at ${storeName}, ${state}`}
      </div>
    );
  }

  return null;
};

export const renderPDPLinkText = pdpUrl => {
  return (
    <PrimaryLink
      ariaLabel={VIEW_PRODUCT_DETAILS_CTA_LBL}
      className={style.viewProductDetailsLink}
      href={pdpUrl}
      isHardSpaReq
      data-locator="registry-quick-view-item-view-detail-cta"
    >
      <Icon type="bbb-detail" height="20px" width="15px" />
      <span className={style.viewProductDetails}>
        {VIEW_PRODUCT_DETAILS_CTA_LBL}
      </span>
    </PrimaryLink>
  );
};

export const getProductAttributes = props => {
  let limitedAvailability;
  if (
    props.displayNotifyRegistrantMsg === 'N' ||
    props.displayNotifyRegistrantMsg === 'D'
  ) {
    limitedAvailability = (
      <div
        tabIndex="0"
        className={style.productAttr}
        data-locator="registry-quick-view-item-attribute"
      >
        <span>{LIMITED_AVAILABILITY_LBL} </span>
        <Button
          tabIndex="0"
          data-tooltip={LIMITED_AVAILABILITY_MSG_LBL}
          className="tooltip-bottom"
          theme="ghost"
          variation="noPadding"
          iconProps={{
            type: 'infoIcon',
            height: '14px',
            width: '14px',
          }}
          aria-label={LIMITED_AVAILABILITY_MSG_LBL}
        />
      </div>
    );
  }

  const personalizationCode = !isNull(props.personalizationCode) && (
    <div
      className={style.productAttr}
      data-locator="registry-quick-view-item-attribute"
    >
      <span>{props.personalizationCode}</span>
    </div>
  );

  const productSkuAttributesRLP = (
    <ProductSkuAttributesRLP
      sKUDetailVO={props.sKUDetailVO}
      refNum={props.refNum}
      freeShippingMessage={props.freeShippingMessage}
    />
  );

  const ltlDetails = props.sKUDetailVO && props.sKUDetailVO.ltlItem && (
    <ProductTileLTLDetail {...props} />
  );

  const isIntlDisabled = () => {
    return (
      props.isInternationalUser &&
      props.sKUDetailVO &&
      props.sKUDetailVO.intlRestricted
    );
  };

  const intlRestrictedMessage = isIntlDisabled() && (
    <div
      tabIndex="0"
      className={style.productAttr}
      data-locator="registry-quick-view-item-attribute"
    >
      {INTL_RESTRICTED_MESSAGE_LBL}
    </div>
  );
  const renderMinimumQtyMessage = () => {
    const { sKUDetailVO, labels } = props;
    const minimumQty = sKUDetailVO.minimumQty ? sKUDetailVO.minimumQty : 0;
    const message = LabelsUtil.replacePlaceholderValues(
      MINIMUM_QUANTITY_MESSAGE_LBL,
      [minimumQty]
    );
    const tooltip = LabelsUtil.replacePlaceholderValues(
      MINIMUM_QUANTITY_TOOLTIP_LBL,
      [minimumQty]
    );
    const ariaLabel = LabelsUtil.getLabel(
      labels.giftGiver,
      'minimumQuantityAriaLabel',
      [minimumQty]
    );
    if (minimumQty < 1) {
      return null;
    }
    return (
      <div
        className={style.productAttr}
        tabIndex="0"
        data-locator="registry-quick-view-item-attribute"
      >
        <span title={ariaLabel}>{message}</span>
        <Button
          data-tooltip={tooltip}
          className="tooltip-bottom"
          theme="ghost"
          variation="noPadding"
          iconProps={{
            type: 'i-icon-info',
            height: '20px',
            width: '20px',
          }}
          aria-label={tooltip}
          isIconAfterContent
        />
      </div>
    );
  };
  const minimumQty = props.isMinimumQtyEnabled && renderMinimumQtyMessage();

  return (
    <React.Fragment>
      {limitedAvailability}
      {personalizationCode}
      {productSkuAttributesRLP}
      {ltlDetails}
      {intlRestrictedMessage}
      {minimumQty}
    </React.Fragment>
  );
};
