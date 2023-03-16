/* eslint max-lines: ["error", 1100]*/
import React from 'react';
import classnames from 'classnames';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import isEmpty from 'lodash/fp/isEmpty';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell/Cell';
import GridX from '@bbb-app/core-ui/grid-x/GridX';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import Button from '@bbb-app/core-ui/button';
import Icon from '@bbb-app/core-ui/icon';
import { getSiteId, isBedBathCanada } from '@bbb-app/utils/common';
import getCartQuatitySelectorOptions from '@bbb-app/utils/getCartQuantitySelectorOptions';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import ImageSrcSet from '@bbb-app/core-ui/image-src-set';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Image from '@bbb-app/core-ui/image';
import QuantitySelector from '@bbb-app/quantity-selector/QuantitySelector';
import { getShippingThresholdValue } from '@bbb-app/utils/abtests/shippingPromoTestUtil';
import {
  PRODUCT_IMAGE_PLACEHOLDER,
  PRODUCT_DEFAULT_IMAGE,
} from '@bbb-app/constants/appConstants';
import { personalizationApplicable } from '@bbb-app/utils/RegistryUtils';
import '@bbb-app/assets/icons/star-double.svg';
import '@bbb-app/assets/icons/bbb_must_have_white.svg';
import '@bbb-app/assets/icons/baby_must_have_white.svg';
import '@bbb-app/assets/icons/check_baby.svg';
import '@bbb-app/assets/icons/check_bbb.svg';
import styles from './RegistryOwnerModalLayout/RegistryOwnerModalLayout.css';
import style from '../RegistryDetailModal/RegistryDetailModalUtil/RegistryDetailModalUtil.css';
import AddToCart from '../../../../containers/AddToCart/AddToCart.async';
import { OwnerProductGridTileUtil } from '../OwnerProductGridTile/OwnerProductGridTileUtil';
import {
  getTealiumData,
  getWritereviewTealiumData,
} from '../OwnerProductGridTile/OwnerProductTealiumEvent';
import { getTealiumVars } from '../OwnerProductGridTile/TealiumVar';
import WriteAReviewWrapper from '../../../../containers/BazaarVoice/WriteAReview/WriteAReviewWrapper';
import '../../../../assets/icons/heart-double.svg';
import '../../../../assets/icons/bbby_icon_heart_fill.svg';
import '../../../../assets/icons/baby_icon_heart_fill.svg';
import '../../../../assets/icons/delete.svg';
import '../../../../assets/icons/outofstock.svg';
import {
  WANT_LBL,
  WRITE_REVIEW_LBL,
  ADD_TO_CART_CTA_LBL,
  FAVOURITE_REGISTRY_CANADA_LBL,
  FAVOURITE_REGISTRY_LBL,
  DF_SHOP_MORE_URL,
  DF_SHOP_MORE_BABY_URL,
  DF_SHOP_MORE_CANADA_URL,
  LTL_INSIDE_ENTRYWAY,
  LTL_ROOM_OF_CHOICE,
  LTL_WHITE_GLOVE_DELIVERY,
  LTL_WHITE_GLOVE_ASSEMBLY,
} from './constants';
import { BOPIS_PICK_IT_UP_CTA } from '../ProductGridTile/constants';
import {
  BOPUS_AVAIL_LBL,
  BOPUS_READY_LBL,
  OOS_MSG_LBL,
} from '../OwnerProductGridTile/constants';
import {
  NO_LONGER_CARRY_LBL,
  DF_SHOP_MORE_LBL,
  VIEW_PRODUCT_DETAILS_CTA_LBL,
  CURRENTLY_SOLD_OUT_LBL,
  REMOVE_REGISTRY_LBL,
  MARK_AS_PURCHASED_LBL,
  NO_SIZE_TEXT_LBL,
  UPC_TEXT_LBL,
  SIZE_TEXT_LBL,
  COLOR_TEXT_LBL,
  NO_COLOR_TEXT_LBL,
  MARK_AS_FAVORITE_LBL,
  DISCONTINUED_LBL,
  NO_UPC_TEXT_LBL,
} from '../../RegistryNotifications/constants';
import {
  ADDITIONAL_FEE_LBL,
  NO_ADDITIONAL_FEE_LBL,
  ITEM_PRICE_LBL,
  DELIVERY_CHARGE_TOOLTIP_LBL,
  FREE_SHIPPING_MESSAGE_LBL,
  PURCHASED_LBL,
} from './../../Registry/constants';

/* eslint-disable */
export const renderProductImage = ({
  personalizedImageUrls,
  displayTitle,
  basicImage,
  sKUDetailVO = {},
  refNum,
  items,
  enableNewRegDashboard,
}) => {
  const IMAGE_SRC = {
    preset: 'content',
    width: '114',
    height: '114',
  };
  const SRC_SET = [
    {
      preset: 'content',
      width: '114',
      height: '114',
      sourceWidth: '1x',
    },
    {
      preset: 'content',
      width: '114',
      height: '114',
      sourceWidth: '1.5x',
    },
  ];
  return personalizationApplicable(refNum, sKUDetailVO.personalizationType) ? (
    <LazyLoad
      threshold={1500}
      placeholder={<img alt={displayTitle} src={PRODUCT_IMAGE_PLACEHOLDER} />}
    >
      <img
        className={classnames('fol', styles.productImage)}
        alt={displayTitle}
        src={personalizedImageUrls}
        data-locator="quick-view-item-image"
      />
    </LazyLoad>
  ) : (
    <ImageSrcSet
      className={classnames(
        'fol',
        enableNewRegDashboard ? styles.productImageNew : styles.productImage
      )}
      alt={displayTitle}
      data-locator="quick-view-item-image"
      srcSet={SRC_SET}
      imageSrc={IMAGE_SRC}
      scene7imageID={basicImage}
      isScene7UrlPrefix={items ? false : true}
      lazyLoadOptions={{
        offset: 1500,
        placeholder: PRODUCT_IMAGE_PLACEHOLDER,
      }}
      lazyLoad
      placeholder={PRODUCT_DEFAULT_IMAGE}
    />
  );
};

export const getCharLength = () => {
  let charLength = 65;
  const screenWidth = getWindowInnerWidth();
  if (screenWidth >= 1024 && screenWidth <= 1190) {
    charLength = 48;
  } else if (screenWidth > 1190 && screenWidth <= 1400) {
    charLength = 55;
  }
  return charLength;
};

export const renderButton = props => {
  const { registryModalData, want } = props;

  const {
    skuInStore,
    selectedCheckboxFilter,
    isBopisFeatureEnable,
    ggEligibleItem,
    isBelowLineItem,
  } = registryModalData;

  const isPrimaryRequired = () => {
    return selectedCheckboxFilter === 'in-stock-online' || skuInStore !== '1';
  };

  const isPurchased = pathOr(false, 'purchased', registryModalData);
  const isAddToCartCtaRequired =
    ggEligibleItem ||
    (isBelowLineItem === 'false' &&
      (!selectedCheckboxFilter ||
        selectedCheckboxFilter === 'in-stock-online'));
  const isPickupCtaRequired =
    skuInStore === '1' &&
    (!selectedCheckboxFilter || selectedCheckboxFilter === 'store-pickup') &&
    !ggEligibleItem;

  let width = '12';
  let paddingRight = '';
  if (isAddToCartCtaRequired && isPickupCtaRequired) {
    width = '6';
    paddingRight = 'pr1';
  }
  const addToCartCSS = `small-${width} ${paddingRight} large-${width}`;
  const pickUpCtaCSS = `small-${width} large-${width}`;
  return isBopisFeatureEnable ? (
    <GridX className={styles.pickUpCtaCss}>
      <Cell className={addToCartCSS}>
        {isAddToCartCtaRequired &&
          renderAddToCartBtn({
            props: {
              ...props.registryModalData,
              theme:
                !isPurchased &&
                (ggEligibleItem
                  ? 'secondary'
                  : isPrimaryRequired()
                  ? 'primary'
                  : 'secondaryStrokeBasic'),
              want: want,
              hideParent: props.hideParent,
            },
          })}
      </Cell>
      <Cell className={pickUpCtaCSS}>
        {isPickupCtaRequired &&
          renderAddToCartBtn({
            props: {
              ...props.registryModalData,
              theme: !isPurchased && 'primary',
              pickupFilterSelected: true,
              want: want,
              hideParent: props.hideParent,
              storeDetails: props.storeDetails,
            },
          })}
      </Cell>
    </GridX>
  ) : (
    renderAddToCartBtn({
      props: {
        ...props.registryModalData,
        want: want,
        hideParent: props.hideParent,
      },
    })
  );
};

export const renderColorSizeUpc = ({ color, size, upc }) => {
  const block = (title, value) => {
    const dataLocator = `quick-view-item-${title}-block`;
    return (
      <div aria-label={title} tabindex="0" data-locator={dataLocator}>
        <span className={classnames([styles.section, styles.title])}>
          {title}
        </span>{' '}
        <div
          aria-label={value}
          className={classnames([styles.section, styles.value])}
        >
          {value}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.colorSection}>
      {block(COLOR_TEXT_LBL, color ? color : NO_COLOR_TEXT_LBL)}
      {block(SIZE_TEXT_LBL, size ? size : NO_SIZE_TEXT_LBL)}
      {block(UPC_TEXT_LBL, upc ? upc : NO_UPC_TEXT_LBL)}
    </div>
  );
};

export const getProductTitle = title => {
  return (
    <React.Fragment>
      <div
        tabindex="0"
        className={style.productTitle}
        data-locator="quick-view-item-title"
      >
        {title}
      </div>
    </React.Fragment>
  );
};

export const renderRemoveRegistryLink = (removeRegistry, isBabySite) => {
  return (
    <PrimaryLink
      className={styles.viewRemoveRegistryLink}
      aria-label={'remove Registry'}
      href="#"
    >
      <Icon
        aria-label={REMOVE_REGISTRY_LBL}
        type="delete"
        height="16px"
        width="15px"
        className={isBabySite ? styles.deletebabyIcon : styles.deleteIcon}
      />
      <span
        onClick={removeRegistry}
        className={style.viewProductDetails}
        data-locator="quick-view-item-remove-link"
      >
        {REMOVE_REGISTRY_LBL}
      </span>
    </PrimaryLink>
  );
};

export const renderRemoveCTA = removeRegistry => {
  return (
    <Button
      theme="secondaryStrokeBasic"
      variation="fullWidth"
      data-locator="remove-CTA"
      onClick={removeRegistry}
      className={style.addToCart}
    >
      {'remove'}
    </Button>
  );
};
export const renderReview = (
  { sKUDetailVO, config, contextPath, handleTealiumEvent, tealiumObject },
  getTealiumVariable,
  hideParent
) => {
  const writeReviewTealiumData = getWritereviewTealiumData(
    sKUDetailVO,
    getTealiumVariable
  );
  return (
    config &&
    config.writeReview && (
      <WriteAReviewWrapper
        label={WRITE_REVIEW_LBL}
        productDisplayName={pathOr('', 'displayName', sKUDetailVO)}
        SCENE7_URL={pathOr(null, 'skuImages.basicImage', sKUDetailVO)}
        className={classnames(
          styles.viewRemoveRegistryLink,
          styles.writeAReview
        )}
        productId={pathOr(null, 'parentProdId', sKUDetailVO)}
        contextPath={contextPath}
        buttonTheme="link"
        buttonVariation="noPadding"
        fireTealiumAction={handleTealiumEvent}
        page_type="Registry"
        tealiumData={writeReviewTealiumData}
        contentVariation="wrap"
        tealiumObject={tealiumObject}
        dataLocator="registry-writereviewlink"
        fromRegistryModal
        hideParent={hideParent}
      />
    )
  );
};
export const getDFShopMoreUrl = siteId => {
  if (siteId.includes('BedBathUS')) {
    return DF_SHOP_MORE_URL;
  } else if (siteId.includes('BuyBuyBaby')) {
    return DF_SHOP_MORE_BABY_URL;
  }
  return DF_SHOP_MORE_CANADA_URL;
};
export const renderPDPLinkText = (
  props,
  isPurchased,
  getTealiumVariable,
  hideParent
) => {
  const siteId = getSiteId();
  return (
    <div className={styles.pdpLink}>
      {isPurchased
        ? renderReview(props, getTealiumVariable, hideParent)
        : props.ggRegItemStatus !== 'funded' &&
          renderRemoveRegistryLink(props.removeRegistry, props.isBabySite)}
      {props.itemType !== 'CSH' && (
        <PrimaryLink
          className={styles.viewProductDetailsLink}
          href={
            props.itemType === 'DPF' ? getDFShopMoreUrl(siteId) : props.pdpUrl
          }
        >
          <span
            className={style.viewProductDetails}
            data-locator="quick-view-item-vpd-link"
          >
            {props.itemType === 'DPF'
              ? DF_SHOP_MORE_LBL
              : VIEW_PRODUCT_DETAILS_CTA_LBL}
          </span>
        </PrimaryLink>
      )}
    </div>
  );
};

export const renderWantPurchased = ({
  qtyRequested,
  accordianKey,
  index,
  want,
  changeQuantity,
  purchased,
  enableNewRegDashboard,
}) => {
  const optionStart = qtyRequested === 0 ? 0 : 1;
  return (
    <GridX
      className={classnames(
        'mt3',
        enableNewRegDashboard ? styles.staticSectionNew : styles.staticSection
      )}
    >
      <Cell className="small-6 pr1 mb2 large-6">
        <QuantitySelector
          isRegistryOwner
          txtAriaLabel={`select_the_quantity_from_${WANT_LBL}_dropdown`}
          disabled={optionStart === 0}
          fieldName={`wantSelect_${index}_${accordianKey}`}
          labelName={WANT_LBL}
          labelStyle={'inlineLabel'}
          selectedQuantity={want}
          optionSet={getCartQuatitySelectorOptions(optionStart)}
          minQuantity={optionStart}
          updateQuantity={(value, error, type, field) => {
            changeQuantity('want', value, type, field);
          }}
          buttonProps={{
            theme: 'ghostPrimary',
            variation: 'noHorizontalPadding',
          }}
          showUpdateButton={false}
          dataLocatorSelectBox="registry-createdregistry-landingpage-productwant-dropdown"
          description={WANT_LBL}
        />
      </Cell>
      <Cell className="small-6 mb2">
        <QuantitySelector
          isRegistryOwner
          txtAriaLabel={`select_the_quantity_from_${PURCHASED_LBL}_dropdown`}
          fieldName={`purchasedSelect_${index}_${accordianKey}`}
          labelName={PURCHASED_LBL}
          labelStyle={'inlineLabel'}
          selectedQuantity={purchased}
          optionSet={getCartQuatitySelectorOptions(0)}
          updateQuantity={(value, error, type, field) => {
            changeQuantity('purchased', value, type, field);
          }}
          buttonProps={{
            theme: 'ghostPrimary',
            variation: 'noHorizontalPadding',
          }}
          updateButtonName=""
          showUpdateButton={false}
          dataLocatorSelectBox="registry-createdregistry-landingpage-productpurchased-dropdown"
          description={PURCHASED_LBL}
        />
      </Cell>
    </GridX>
  );
};

export const renderBar = styleProp => {
  return <div className={classnames(styles.greyLine, styleProp)} />;
};

export const renderShipSwap = ({ shipSwapView, isPurchased }) => {
  return (
    <div className="mt1 mb1">
      {renderBar()}
      <div className="mt1 pb1">{shipSwapView(true, isPurchased)}</div>
    </div>
  );
};

// TODO need to work on this in another story
export const renderGroupGift = ({ groupGiftView, enableNewRegDashboard }) => {
  return (
    <div className="mt1">
      {!enableNewRegDashboard && renderBar()}
      <div
        className={classnames(
          'mt1 mb15',
          enableNewRegDashboard && styles.staticSectionNew
        )}
      >
        {groupGiftView(true)}
      </div>
    </div>
  );
};
export const getStoreAvailabilityMessage = filterProps => {
  const { storeDetails, selectedCheckboxFilter, skuInStore } = filterProps;
  const { commonName, state } = storeDetails || {};
  const lblBopusAvail = BOPUS_AVAIL_LBL;
  const lblBopusReady = BOPUS_READY_LBL;
  const availabilityMessage =
    selectedCheckboxFilter === 'store-pickup' ? lblBopusReady : lblBopusAvail;
  const storeName = commonName ? commonName.trim() : '';
  if (skuInStore === '1') {
    return (
      <div
        className={classnames('pt1', styles.storeAvailabiliyMessage)}
        tabIndex="0"
      >
        <span
          className={styles.twoHoursMessage}
          data-locator="bopisAvailabilityLabel"
        >{`${availabilityMessage} `}</span>
        {`at ${storeName}, ${state}`}
      </div>
    );
  }
};
// TODO code refactor and optimize
export const ProductSkuAttributesRLP = props => {
  const sortInPriorityOrder = () => {
    const result = RLP.sort((a, b) => {
      const t = parseInt(a.priority, 10);
      const x = parseInt(b.priority, 10);
      return t - x;
    });

    return result;
  };

  const RLP = pathOr([], 'skuAttributes.RLP', props.sKUDetailVO);
  const MessageContainer = propsMessage => (
    <span className={styles.specialMessage} {...propsMessage} />
  );

  const MessageWithDangerousHTML = dangerousHTML(MessageContainer);

  const isLtlItem = props.sKUDetailVO && props.sKUDetailVO.ltlItem;

  if (
    isLtlItem &&
    (props.shipMethodUnsupported || props.totalDeliveryCharges === 0)
  ) {
    return (
      <React.Fragment>
        {props.shipMethodUnsupported
          ? props.dslUpdateableMessage(props.hideParent, style.rlpMessage)
          : props.ltlDeliveryServices && (
              <div
                data-locator="quick-view-ltl-item-dsl"
                className={classnames(style.rlpMessage, 'pt1 pb1')}
              >
                {LabelsUtil.replacePlaceholderValues(NO_ADDITIONAL_FEE_LBL, [
                  props.ltlShipMethodDesc,
                ])}
              </div>
            )}
        {RLP.length > 0 ? (
          <React.Fragment>
            <div className={classnames(style.rlpMessage, 'pb1')}>
              <MessageWithDangerousHTML>
                {sortInPriorityOrder()[0] &&
                  sortInPriorityOrder()[0].attributeDescrip}
              </MessageWithDangerousHTML>
            </div>
            <div className={style.rlpMessage}>
              <MessageWithDangerousHTML>
                {sortInPriorityOrder()[1] &&
                  sortInPriorityOrder()[1].attributeDescrip}
              </MessageWithDangerousHTML>
            </div>
          </React.Fragment>
        ) : (
          <div className={classnames('pt1', style.rlpMessage)}>
            {props.sKUDetailVO.displayShipMsg &&
              LabelsUtil.replacePlaceholderValues(FREE_SHIPPING_MESSAGE_LBL, [
                getShippingThresholdValue(),
              ])}
          </div>
        )}
      </React.Fragment>
    );
  }
  if (isLtlItem && props.totalDeliveryCharges > 0) {
    return (
      <React.Fragment>
        <React.Fragment>
          <div
            className={classnames(style.rlpMessage, style.paddingTop, 'pb1')}
            data-locator="quick-view-ltl-item-price"
          >
            {!(
              props.refNum && props.sKUDetailVO.personalizationType === 'CR'
            ) &&
              LabelsUtil.replacePlaceholderValues(ITEM_PRICE_LBL, [
                props.formattedPrice,
              ])}
          </div>
          <div
            className={classnames(style.rlpMessage, 'pb1')}
            data-locator="quick-view-ltl-item-dsl"
          >
            {LabelsUtil.replacePlaceholderValues(ADDITIONAL_FEE_LBL, [
              props.ltlShipMethodDesc,
              props.formattedTotalDeliveryCharges || props.totalDeliveryCharges,
            ])}
            <Button
              className="ml1 tooltip-bottom"
              data-tooltip={getToolTipText(props.ltlShipMethodDesc)}
              theme="ghost"
              variation="noPadding"
              iconProps={{
                type: 'helpIcon',
                height: '12px',
                width: '12px',
              }}
              aria-label={DELIVERY_CHARGE_TOOLTIP_LBL}
            />
          </div>
        </React.Fragment>
        {RLP.length > 0 ? (
          <div className={style.rlpMessage}>
            <MessageWithDangerousHTML>
              {sortInPriorityOrder()[0] &&
                sortInPriorityOrder()[0].attributeDescrip}
            </MessageWithDangerousHTML>
          </div>
        ) : (
          <div className={classnames('pt1', style.rlpMessage)}>
            {props.sKUDetailVO.displayShipMsg &&
              LabelsUtil.replacePlaceholderValues(FREE_SHIPPING_MESSAGE_LBL, [
                getShippingThresholdValue(),
              ])}
          </div>
        )}
      </React.Fragment>
    );
  }

  return RLP.length > 0 ? (
    <React.Fragment>
      <div className={classnames(style.rlpMessage, style.paddingTop, 'pb1')}>
        <MessageWithDangerousHTML>
          {sortInPriorityOrder()[0] &&
            sortInPriorityOrder()[0].attributeDescrip}
        </MessageWithDangerousHTML>
      </div>
      <div className={classnames(style.rlpMessage, 'pb1')}>
        <MessageWithDangerousHTML>
          {sortInPriorityOrder()[1] &&
            sortInPriorityOrder()[1].attributeDescrip}
        </MessageWithDangerousHTML>
      </div>
      <div className={style.rlpMessage}>
        <MessageWithDangerousHTML>
          {sortInPriorityOrder()[2] &&
            sortInPriorityOrder()[2].attributeDescrip}
        </MessageWithDangerousHTML>
      </div>
    </React.Fragment>
  ) : (
    <div className={classnames('mt2 mb3', style.rlpMessage)}>
      {props.sKUDetailVO.displayShipMsg &&
        LabelsUtil.replacePlaceholderValues(FREE_SHIPPING_MESSAGE_LBL, [
          getShippingThresholdValue(),
        ])}
    </div>
  );
};

export const getToolTipText = ltlShipMethodDesc => {
  let text = '';
  switch (ltlShipMethodDesc) {
    case 'Inside Entryway':
      text = LTL_INSIDE_ENTRYWAY;
      break;
    case 'Room of Choice':
      text = LTL_ROOM_OF_CHOICE;
      break;
    case 'White Glove Delivery':
      text = LTL_WHITE_GLOVE_DELIVERY;
      break;
    case 'White Glove with Assembly':
      text = LTL_WHITE_GLOVE_ASSEMBLY;
      break;
  }
  return text;
};

const getButtonAttribute = ({ props }) => {
  const {
    sKUDetailVO,
    enableKatori,
    refNum,
    isInternationalUser,
    isBelowLineItem,
    pickupFilterSelected,
    ggEligibleItem,
    theme,
    enableNewRegDashboard,
  } = props;
  const { intlRestricted } = sKUDetailVO;
  const isDisabled = OwnerProductGridTileUtil.isAddToCartDisable(
    intlRestricted,
    refNum,
    enableKatori,
    isInternationalUser
  );
  const getATCLabel = () => {
    if (pickupFilterSelected && !ggEligibleItem) {
      return BOPIS_PICK_IT_UP_CTA;
    }
    return ADD_TO_CART_CTA_LBL;
  };
  return {
    attr: {
      theme: theme,
      variation: 'fullWidth',
      tooltip: getATCLabel(),
      'data-locator':
        pickupFilterSelected && !ggEligibleItem
          ? 'registryowner-pickitupbutton'
          : 'registryowner-addtocartbutton',
      disabled: isDisabled,
      iconProps: !enableNewRegDashboard &&
        isBelowLineItem !== 'true' && {
          type: 'cart',
        },
      className: 'fol',
    },
    contentVariation: 'wrap',
    children: getATCLabel(),
  };
};

const renderToggleFields = (
  renderIcons,
  label,
  toggle,
  clickHandler,
  isBabySite
) => {
  let imgPath;
  const theme = isBabySite ? 'baby' : 'bbb';
  if (toggle) {
    imgPath = `/static/assets/images/toggle_on_${theme}.png`;
  } else {
    imgPath = `/static/assets/images/toggle_off.png`;
  }
  return (
    <div className={styles.toggleContainer}>
      <div className="relative">
        <span className={styles.toggleIcon}>
          <Icon type={renderIcons} />
          {label}
        </span>
        <span className={classnames(styles.toggleBtn, 'absolute')}>
          <Image
            src={imgPath}
            key={toggle}
            alt={`toggle-${toggle ? 'on' : 'off'}`}
            onClick={clickHandler}
          />
        </span>
      </div>
    </div>
  );
};

export const renderMarkAsPurchased = (
  want,
  changeQuantity,
  isPurchased,
  enableNewRegDashboard,
  isBabySite
) => {
  const theme = isBabySite ? 'baby' : 'bbb';
  return enableNewRegDashboard ? (
    renderToggleFields(
      `check_${theme}`,
      'Mark as purchased',
      isPurchased,
      () => changeQuantity('purchased', isPurchased ? 0 : want),
      isBabySite
    )
  ) : (
    <Button
      theme="secondaryStrokeBasic"
      variation="fullWidth"
      data-locator="Mark-as-Purchased-CTA"
      onClick={() => changeQuantity('purchased', want)}
      className={style.addToCart}
    >
      {MARK_AS_PURCHASED_LBL}
    </Button>
  );
};
export const renderFavoriteBadge = (
  isBabySite,
  markAsFavHandler,
  markedAsFav
) => {
  let favIcon = '';
  if (isBabySite) {
    favIcon = markedAsFav ? styles.babyFavIcon : styles.babyFavWhiteIcon;
  }
  return (
    <div className={styles.favWrapper}>
      <Button
        theme=""
        variation="circle"
        marked={`${markedAsFav}`}
        data-locator="quick-view-item-favorite-icon"
        className={
          markedAsFav
            ? classnames(styles.favIconBlack, favIcon)
            : classnames(styles.favIconWhite, favIcon)
        }
        onClick={markAsFavHandler}
        iconProps={{
          type: isBabySite ? 'star-double' : 'heart-double',
          width: '22px',
          height: '22px',
        }}
        aria-label={markedAsFav ? `marked as favorite` : `favorite`}
      />
    </div>
  );
};
export const renderFavouriteBtn = (
  isBabySite,
  markAsFavHandler,
  markedAsFav,
  enableNewRegDashboard
) => {
  const favouriteLbl = isBedBathCanada()
    ? FAVOURITE_REGISTRY_CANADA_LBL
    : FAVOURITE_REGISTRY_LBL;
  const badge = markedAsFav ? favouriteLbl : MARK_AS_FAVORITE_LBL;
  const theme = isBabySite ? 'baby' : 'bbb';
  return enableNewRegDashboard ? (
    renderToggleFields(
      `${theme}_must_have_white`,
      'Must Have',
      markedAsFav,
      markAsFavHandler,
      isBabySite
    )
  ) : (
    <div className={styles.favContainer}>
      <Button
        theme="secondary"
        variation="fullWidth"
        contentVariation="wrap"
        marked={`${markedAsFav}`}
        data-locator="quick-view-item-favorite-cta"
        onClick={markAsFavHandler}
        className={styles.favBBBbutton}
        iconProps={{
          type: markedAsFav
            ? isBabySite
              ? 'baby_icon_heart_fill'
              : 'bbby_icon_heart_fill'
            : isBabySite
            ? 'star-double'
            : 'heart-double',
          width: '24px',
          height: '24px',
          className: markedAsFav ? styles.favSvg : styles.unfavSvg,
        }}
      >
        {badge}
      </Button>
    </div>
  );
};
export const renderAddToCartBtn = ({ props }) => {
  const {
    registryId,
    sKUDetailVO,
    closeQuickViewModal,
    refNum,
    onModalHide,
    tealiumData,
    handleTealiumEvent,
    initiateInactivityModal,
    want,
    ltlDeliveryServices,
    personalizedMobImageUrls,
    hideParent,
    displayNotifyRegistrantMsg,
    storeDetails,
    pickupFilterSelected,
    ggEligibleItem,
  } = props;
  const {
    skuId,
    parentProdId,
    size,
    swatch,
    displayTitle,
    skuInStock,
  } = sKUDetailVO;
  let noCarryItem = true;
  if (displayNotifyRegistrantMsg && !skuInStock) {
    noCarryItem = false;
  }
  const getTealiumVariable = () => {
    const imageURL = personalizationApplicable(
      props.refNum,
      props.sKUDetailVO.personalizationType
    )
      ? personalizedMobImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr('', 'sKUDetailVO.skuImages.mediumImage', props),
          'largeImage'
        );
    return getTealiumVars(imageURL, displayTitle, props);
  };
  const tealiumVariable = getTealiumVariable();
  const tealiumDataVars = getTealiumData(sKUDetailVO, tealiumVariable);
  const pathName = tealiumData.location ? tealiumData.location.pathname : '';
  const getPayload = () => {
    if (
      pickupFilterSelected &&
      !ggEligibleItem &&
      storeDetails &&
      storeDetails.storeId
    ) {
      return {
        reserveNow: 'true',
        storeId: storeDetails.storeId,
      };
    }
    return {};
  };
  return (
    noCarryItem &&
    props.itemType !== 'CSH' && (
      <LazyLoad threshold={1500}>
        <AddToCart
          className={style.addToCart}
          skuId={skuId}
          prodId={parentProdId}
          qty={want}
          registryId={registryId}
          size={size}
          swatch={swatch}
          ltlShipMethod={ltlDeliveryServices}
          ltlFlag={!isEmpty(ltlDeliveryServices)}
          refnum={refNum || ''}
          buttonProps={getButtonAttribute({ props })}
          onError={hideParent}
          parentProductId={parentProdId || ''}
          calledFromRegistry
          closeQuickViewModal={closeQuickViewModal}
          onModalHide={onModalHide}
          fireTealiumAction={handleTealiumEvent}
          registryATCTealiumInfo={tealiumDataVars}
          tealiumLinkLocation={pathName}
          initiateInactivityModal={initiateInactivityModal}
          isCollegePage={false}
          onSuccess={hideParent}
          ignoreEmptyStoreDataOnUnmount
          {...getPayload()}
        />
      </LazyLoad>
    )
  );
};
export const renderPurchasedBadge = ({ babysiteId, itemType }) => {
  const purchaseborderVariation = babysiteId ? styles.purchasebabycolor : '';
  return (
    <div data-locator={'registry-item-tile-purchased-badge'} tabIndex="0">
      <span
        className={classnames(styles.purchasedButton, purchaseborderVariation)}
      >
        <Icon
          type="checkmarkwhite"
          width="16px"
          height="16px"
          className={styles.checkboxPurchased}
        />{' '}
        {itemType === 'CSH' ? 'Funded' : PURCHASED_LBL}
      </span>
    </div>
  );
};
export const renderFundedBadge = ({ ggFundedBadge }) =>
  ggFundedBadge(styles.fundedoverlay, styles.checkboxPurchased, true);
export const renderOOSMsg = ({ props }) => {
  const {
    isBelowLineItem,
    ggRegItemStatus,
    purchased,
    displayNotifyRegistrantMsg,
  } = props;
  const OOSMsgItemTile = OOS_MSG_LBL;
  if (
    isBelowLineItem &&
    isBelowLineItem === 'true' &&
    !displayNotifyRegistrantMsg &&
    !purchased &&
    ggRegItemStatus !== 'funded'
  ) {
    return (
      <div className={classnames(styles.oosMsgItemTile)}>
        <Icon
          height="17"
          width="17"
          type="outofstock"
          className={classnames('mr1', styles.oosIcon)}
        />
        <span className={classnames(styles.oosMsg)}>{OOSMsgItemTile}</span>
      </div>
    );
  }
  return '';
};
export const renderItemStatusBadge = ({ props, babysiteId }) => {
  const {
    isBelowLineItem,
    displayNotifyRegistrantMsg,
    sKUDetailVO,
    ggRegItemStatus,
    enableNewRegDashboard,
  } = props;
  const skuInStock = pathOr(null, 'skuInStock', sKUDetailVO);
  const ItemStatusbabyBadge = babysiteId ? styles.ItemStatusbabyBadge : '';
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
    ggRegItemStatus !== 'funded'
  ) {
    return (
      <span
        className={classnames(
          enableNewRegDashboard
            ? styles.newItemStatusBadge
            : classnames(styles.ItemStatusBadge, ItemStatusbabyBadge)
        )}
        data-locator={'registry-item-tile-sold-out-badge'}
        tabIndex="0"
      >
        {!enableNewRegDashboard && (
          <Icon
            type="alert"
            width="12px"
            height="12px"
            className={classnames('mb1', styles.alerticon)}
          />
        )}
        {enableNewRegDashboard ? OOS_MSG_LBL : CURRENTLY_SOLD_OUT_LBL}
      </span>
    );
  } else if (
    displayNotifyRegistrantMsg &&
    (displayNotifyRegistrantMsg === 'D' ||
      displayNotifyRegistrantMsg === 'N') &&
    ggRegItemStatus !== 'funded'
  ) {
    return (
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
            width="12px"
            height="12px"
            className={classnames('mb1', styles.alerticon)}
          />
        )}
        {skuInStock === true ? discontinuedLbl : itemUnavailableLbl}
      </span>
    );
  }
  return null;
};
