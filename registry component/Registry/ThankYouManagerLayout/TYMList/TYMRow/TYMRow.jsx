import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash/fp/get';
import moment from 'moment';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import truncate from '@bbb-app/utils/truncate';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import isEmpty from 'lodash/fp/isEmpty';
import Checkbox from '@bbb-app/core-ui/checkbox';
import LazyLoad from '@bbb-app/core-ui/lazy-load';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import consoleLog from '@bbb-app/utils/logger';
import ProductTitle from '@bbb-app/product-tile/components/ProductTitle';
import '@bbb-app/assets/icons/checkmarkwhite.svg';
import { getSiteId } from '@bbb-app/utils/common';
import styles from './TymRow.css';
import AddEditAddress from '../../../../../Pages/AddressBook/AddEditAddress';
import GiftGiverInfo from './GiftGiverInfo/GiftGiverInfo';
import { personalizationCodes, TRANSACTION_TYPE } from '../constants';
import AddToCart from '../../../../../../containers/AddToCart/AddToCart.async';
import { getTealiumData } from '../../../OwnerProductGridTile/OwnerProductTealiumEvent';
import { getTealiumVars } from '../../../OwnerProductGridTile/TealiumVar';
import { MARK_AS_SENT_LBL } from '../../../constants';
import {
  TYM_SHIP_IT_LBL,
  AVAIL_SHIPPING_LBL,
  NON_AVAIL_SHIPPING_LBL,
  FUNDED_LBL,
  GIFT_RECEIVED_US_LBL,
  GIFT_RECEIVED_CA_LBL,
  GIFT_RECEIVED_BABY_LBL,
  GIFT_RETURNED_US_LBL,
  GIFT_RETURNED_BABY_LBL,
  GIFT_RETURNED_TBS_LBL,
  TYM_RBYR_LBL,
  ON_LBL,
  LOGIN_TXT_LBL,
  FUND_SENT_VENMO_LBL,
} from './constants';
import { QUICK_VIEW_LBL } from '../../../../CollegeChecklist/OwnerProductGridTile/constants';

const Y_TEXT = 'Y';
const N_TEXT = 'N';

export const GG_CONTIRIBUTE_LBL = 'Group Gifting Contribution';
class TYMRow extends React.PureComponent {
  displayName() {
    const displayName = this.isCashFund
      ? pathOr('', 'listItem.cfDisplayName', this.props)
      : pathOr('', 'listItem.skuDetails.displayName', this.props);

    return displayName;
  }

  constructor(props) {
    super(props);
    const { thankYouSent, giftReceived, wasReturned } = props.listItem;

    this.state = {
      classToggle: 'show',
      giftSent: thankYouSent,
      giftReturned: wasReturned,
      greenBorder: thankYouSent ? styles.greenBorder : '',
      isModalVisible: false,
      thankYouSent,
      giftReceived,
      wasReturned,
      error: {
        key: null,
        message: null,
      },
      checkboxLabel: this.getCheckboxLabel(),
    };
    this.toggleShowHide = this.toggleShowHide.bind(this);
    this.handleTymCB = this.handleTymCB.bind(this);
    this.handleAddEditModal = this.handleAddEditModal.bind(this);
    this.toggleEditModalState = this.toggleEditModalState.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.setUpdatedState = this.setUpdatedState.bind(this);
    this.onQuickViewButtonClick = this.onQuickViewButtonClick.bind(this);
    this.displayFundAmount = this.displayFundAmount.bind(this);
    this.displayContribution = this.displayContribution.bind(this);
    this.displayName = this.displayName.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderQuantity = this.renderQuantity.bind(this);
    this.isPersonalizationApplicable = this.isPersonalizationApplicable.bind(
      this
    );
    this.renderQuickViewModal = this.renderQuickViewModal.bind(this);
    this.isCashFund =
      this.props.listItem.skuId === 69934769 &&
      this.props.listItem.referenceId !== null;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.listUpdated !== nextProps.listUpdated) {
      this.setUpdatedState(nextProps.listItem);
    }

    if (this.props.closeModalFlag !== nextProps.closeModalFlag) {
      this.setState({ isModalVisible: false });
    }
  }

  onQuickViewButtonClick(e) {
    const {
      skuId,
      referenceId,
      ltlDeliveryService,
      productURL,
      skuDetails: { parentProdId, personalizationType },
    } = this.props.listItem;
    if (!this.props.isMobile.isMobileScreen) {
      e.preventDefault();
      const productInfo = {
        refNum: referenceId,
        isPersonalised: this.isPersonalizationApplicable(),
        personalizationType,
        ltlMethod: ltlDeliveryService,
      };
      const swatchDetails = {
        color: null,
        skuId: skuId.toString(),
        ltlMethod: null,
      };
      this.props.onQuickViewButtonClick(
        parentProdId,
        skuId,
        productURL,
        productInfo,
        swatchDetails
      );
    }
  }
  getCheckboxLabel = () => {
    return `<span aria-hidden='true' class='markAsSent'>${MARK_AS_SENT_LBL}</span>`;
  };

  getURL() {
    const {
      productURL,
      skuId,
      registryId,
      ltlDeliveryServices,
    } = this.props.listItem;
    const queryDelimiter = '?';
    let PDP_URL = `${this.props.contextPath}${productURL}${queryDelimiter}skuId=${skuId}&registryId=${registryId}`;
    if (ltlDeliveryServices) {
      PDP_URL += `&sopt=${ltlDeliveryServices}`;
    }
    return PDP_URL;
  }
  setUpdatedState({ thankYouSent, giftReceived, wasReturned }) {
    this.setState({
      giftSent: thankYouSent,
      giftReturned: wasReturned,
      greenBorder: thankYouSent ? styles.greenBorder : '',
      thankYouSent,
      giftReceived,
      wasReturned,
      error: {
        key: null,
        message: null,
      },
      checkboxLabel: this.getCheckboxLabel(),
    });
  }
  getStateValueTym(stateValue) {
    if (stateValue !== null) {
      return stateValue.trim();
    }
    return stateValue;
  }

  getTealiumVariable() {
    const imageURL = this.isPersonalizationApplicable()
      ? this.props.personalizedMobImageUrls
      : getConcatenatedScene7URLWithImageId(
          pathOr('', 'skuDetails.skuImages.mediumImage', this.props.listItem),
          'largeImage'
        );
    return getTealiumVars(imageURL, this.displayTitle, this.props);
  }
  isPersonalizationApplicable() {
    const personalizationType = this.props.listItem.skuDetails
      .personalizationType;
    return (
      personalizationType === personalizationCodes.PB_CODE ||
      personalizationType === personalizationCodes.CR_CODE ||
      personalizationType === personalizationCodes.PY_CODE
    );
  }
  toggleShowHide(event) {
    event.preventDefault();
    if (event.target.name === 'hideDetail') {
      this.setState({ classToggle: 'hide' });
    } else {
      this.setState({ classToggle: 'show' });
    }
  }
  handleTymCB(value, name) {
    let { thankYouSent, giftReceived, wasReturned } = this.state;
    const {
      rowId,
      registryId,
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      state,
      zipCode,
      country,
      referenceId,
    } = this.props.listItem;
    const enableCashFund = this.props.enableCashFund;

    let errKey = null;
    if (name.indexOf('giftSent_') >= 0) {
      thankYouSent = value;
      errKey = 'giftSent_error';
    } else if (name.indexOf('giftReceived_') >= 0) {
      giftReceived = value;
      errKey = 'giftReceived_error';
    } else if (name.indexOf('giftReturned_') >= 0) {
      wasReturned = value;
      errKey = 'giftReturned_error';
    }
    this.props.initiateInactivityModal(true);
    /* istanbul ignore next */
    ServiceUtil.triggerServerRequest({
      url: getApiEndPointsFromStore('addEditTymGGAddress'),
      showLoader: true,
      variation: 'fullWidth',
      method: 'PUT',
      data: qs.stringify({
        thankYouSent: thankYouSent ? Y_TEXT : N_TEXT,
        giftReceived: giftReceived ? Y_TEXT : N_TEXT,
        wasReturned: wasReturned ? Y_TEXT : N_TEXT,
        rowId,
        'tymGifterAddress.registryId': registryId,
        'tymGifterAddress.firstName': firstName,
        'tymGifterAddress.lastName': lastName,
        'tymGifterAddress.email': email,
        'tymGifterAddress.address1': address1,
        'tymGifterAddress.address2': address2,
        'tymGifterAddress.city': city,
        'tymGifterAddress.state': state,
        'tymGifterAddress.postalCode': zipCode,
        'tymGifterAddress.country': country,
        updateTYMOption: true,
        referenceId: enableCashFund && this.isCashFund ? referenceId : '',
        skuId: enableCashFund && this.isCashFund ? 69934769 : '',
      }),
      headers: {
        'atg-rest-depth': 0,
      },
    })
      .then(response => {
        const { serviceStatus, data } = response.body;
        if (serviceStatus === 'SUCCESS' && data) {
          const thankYouSentResp = data.component.thankYouSent;
          this.props.handleCallback({
            rowID: data.component.rowID,
            thankYouSent: thankYouSentResp === Y_TEXT,
            wasReturned: data.component.wasReturned === Y_TEXT,
            giftReceived: data.component.giftReceived === Y_TEXT,
            referenceId: data.component.referenceId,
          });
          this.setState({
            giftSent: thankYouSentResp === Y_TEXT,
            giftReturned: data.component.wasReturned === Y_TEXT,
            thankYouSent: thankYouSentResp === Y_TEXT,
            giftReceived: data.component.giftReceived === Y_TEXT,
            wasReturned: data.component.wasReturned === Y_TEXT,
            greenBorder: thankYouSentResp === Y_TEXT ? styles.greenBorder : '',
            error: {
              key: null,
              message: null,
            },
            checkboxLabel: this.getCheckboxLabel(),
          });
        } else if (serviceStatus === 'ERROR') {
          consoleLog.error(response.body.errorMessages.message);
          this.setState({
            error: {
              key: errKey,
              message: response.body.errorMessages.message,
            },
          });
        }
      })
      .catch(error => {
        const errorMessage = get(
          error,
          ['body', 'response', 'data', 'errorMessages', '0', 'message'],
          ''
        );
        consoleLog.error(errorMessage);
        this.setState({
          error: {
            key: errKey,
            message: errorMessage,
          },
        });
      });
  }
  handleAddEditModal(e) {
    e.preventDefault();
    this.toggleEditModalState(true);
  }
  toggleEditModalState = state => {
    this.setState({ isModalVisible: state });
  };

  handleErrorMsg(key, isMobileCheck) {
    if (this.state.error.key === key) {
      return (
        <div
          className={classnames(
            'mt3',
            styles.errorMsg,
            isMobileCheck ? 'pb2' : 'pb1'
          )}
        >
          {this.state.error.message}
        </div>
      );
    }
    return null;
  }

  inMobileTextCenter() {
    return this.props.isMobile ? 'sm-center' : '';
  }
  get displayTitle() {
    return truncate(this.props.listItem.skuDetails.displayName, 70);
  }

  displayFundAmount({ transactionType }) {
    const { contributionPrice } = this.props.listItem;
    if (transactionType === TRANSACTION_TYPE.GROUP_GIFTING) {
      return (
        <div>
          <Paragraph
            className="m0 inline-block"
            theme="smallLight"
            tabindex="0"
          >
            <span className="bold">{contributionPrice}</span>{' '}
            {GG_CONTIRIBUTE_LBL}
          </Paragraph>
        </div>
      );
    }
    return '';
  }

  displayContribution({ transactionType, purchaseDate }) {
    const formattedPurchaseDate = moment(purchaseDate).format('MM/YY');
    if (transactionType === TRANSACTION_TYPE.GROUP_GIFTING)
      // for group gifting only date will be shown
      return `${purchaseDate}`;
    else if (this.isCashFund) return `${'Purchased'} ${formattedPurchaseDate}`;
    else if (transactionType === 'SV') return `${ON_LBL} ${purchaseDate}`;
    else if (transactionType !== 'SV') return 'Purchased';
    return '';
  }
  renderQuantity() {
    const { formattedPriceVal, price } = this.props.listItem;
    return this.isCashFund ? price && `$${price}` : ` ${formattedPriceVal}`;
  }
  renderImage() {
    const { listItem } = this.props;
    const smallImage = pathOr('', 'skuDetails.skuImages.smallImage', listItem);
    const imgUrl = this.props.scene7URL.url + smallImage;
    return imgUrl;
  }
  renderCfImage() {
    const { listItem } = this.props;
    const cfImage = !isEmpty(listItem.cfImage) && listItem.cfImage;
    return getRectifiedURLFromScene7URL(cfImage);
  }
  renderQuickViewButton() {
    const quickViewLabel = QUICK_VIEW_LBL;
    return this.props.isMobile.isMobileScreen ? (
      ''
    ) : (
      <div className={classnames('absolute', styles.quickViewButton)}>
        <Button
          className={styles.smallButtonQV}
          tooltip={quickViewLabel}
          onClick={this.onQuickViewButtonClick}
          theme="ghostSecondary"
        >
          {quickViewLabel}
        </Button>
      </div>
    );
  }

  renderQuickViewModal(displayName) {
    return (
      <LazyLoad threshold={100}>
        {this.isCashFund ? (
          <img alt={`${displayName}`} src={this.renderCfImage()} />
        ) : (
          <PrimaryLink
            className={styles.imgWrapper}
            href={this.getURL()}
            onClick={this.onQuickViewButtonClick}
          >
            <img alt={`${displayName}`} src={this.renderImage()} />
          </PrimaryLink>
        )}
        {!this.isCashFund && this.renderQuickViewButton()}
      </LazyLoad>
    );
  }
  renderAddToCartBtn = () => {
    const { location } = this.props;
    const { purchaseQty, registryId, skuDetails } = this.props.listItem;
    const { skuId, parentProdId, size, skuInStock } = skuDetails;
    const tealiumVariable = this.getTealiumVariable();
    const tealiumDataVars = getTealiumData(skuDetails, tealiumVariable);
    const pathName = location ? location.pathname : '';
    return (
      <AddToCart
        className={styles.addtocart}
        registryId={registryId}
        skuId={skuId}
        prodId={parentProdId}
        size={size}
        parentProductId={parentProdId || ''}
        qty={purchaseQty}
        buttonProps={{
          attr: {
            theme: skuInStock ? 'primary' : 'deactivated',
            className: 'fullWidth',
            'data-locator': 'addtocartbutton',
          },
          children: TYM_SHIP_IT_LBL,
          disabled: !skuInStock,
        }}
        fireTealiumAction={this.props.handleTealiumEvent}
        registryATCTealiumInfo={tealiumDataVars}
        tealiumLinkLocation={pathName}
      />
    );
  };
  renderCheckBoxLabelReceived = siteId => {
    if (siteId.includes('BedBathCanada') || siteId === 'BedBathUS') {
      return GIFT_RECEIVED_CA_LBL;
    } else if (siteId === 'TBS_BedBathUS' || siteId === 'TBS_BuyBuyBaby') {
      return GIFT_RECEIVED_US_LBL;
    }
    return GIFT_RECEIVED_BABY_LBL;
  };

  renderCheckBoxLabelReturn = siteId => {
    if (siteId.includes('BedBathCanada')) {
      return GIFT_RETURNED_US_LBL;
    } else if (
      siteId.includes('TBS_BedBathUS') ||
      siteId.includes('TBS_BuyBuyBaby')
    ) {
      return GIFT_RETURNED_TBS_LBL;
    }
    return GIFT_RETURNED_BABY_LBL;
  };
  renderShippingLabel = () => {
    const { skuDetails } = this.props.listItem;
    const { skuInStock } = skuDetails;

    const label = skuInStock ? AVAIL_SHIPPING_LBL : NON_AVAIL_SHIPPING_LBL;

    return (
      <span
        className={classnames(
          styles.shippingLabel,
          skuInStock ? '' : styles.disableLabel
        )}
      >
        {label}
      </span>
    );
  };
  render() {
    const isMobileCheck = this.props.isMobile.isMobileScreen;
    const classToggle = this.state.classToggle;
    const imgGrid = classToggle === 'hide' ? 'sm-center' : 'small-3';
    const textCenter = this.inMobileTextCenter();
    const {
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      zipCode,
      purchaseDate,
      purchaseQty,
      displayName,
      registryId,
      rowId,
      skuId,
      transactionType,
      cfCode,
      cfDisplayName,
    } = this.props.listItem;

    const { thankYouSent, giftReceived, wasReturned } = this.state;
    const siteId = getSiteId();
    const venmoUrl = `https://account.venmo.com/u/${cfCode}`;
    return (
      <React.Fragment>
        <li className="listContainer" data-sku={skuId}>
          <GridX
            className={classnames(
              'mb3 TymList',
              styles.container,
              this.state.greenBorder
            )}
          >
            <Cell
              className={classnames(
                textCenter,
                isMobileCheck ? '' : 'pt3 pb3',
                'large-1'
              )}
            >
              <div
                className={classnames(
                  isMobileCheck ? 'pt2 ml1 mt1 pb2 mb2' : 'pt3 pb1 mb2',
                  styles.customTymCB
                )}
              >
                <Checkbox
                  id={`giftSent_${this.props.uniqueKey}`}
                  className={styles.tymTickMarkAsSent}
                  name={`giftSent_${this.props.uniqueKey}`}
                  type="checkbox"
                  label={this.state.giftSent ? ' ' : this.state.checkboxLabel}
                  data-locator="registry-networkInfoCheck2"
                  variation="circular"
                  checked={this.state.giftSent}
                  onSelect={this.handleTymCB}
                  aria-label={MARK_AS_SENT_LBL}
                />
              </div>
            </Cell>
            <Cell className={classnames(textCenter, 'large-4')}>
              <GridX className={styles.fullHeight}>
                <Cell
                  className={classnames(
                    'large-11',
                    styles.giftGiverWrapper,
                    isMobileCheck ? 'pb2' : 'pt3 pb3 pl1 pr1',
                    classToggle === 'hide' ? 'pb0' : styles.showBorder
                  )}
                >
                  <GiftGiverInfo
                    listItem={this.props.listItem}
                    classToggle={this.state.classToggle}
                    handleAddEditModal={this.handleAddEditModal}
                    labels={this.props.labels}
                    isCashFund={this.isCashFund}
                  />
                  {this.handleErrorMsg('giftSent_error', isMobileCheck)}

                  <ModalDialog
                    mountedState={this.state.isModalVisible}
                    toggleModalState={this.toggleEditModalState}
                    titleAriaLabel="Edit Address"
                    verticallyCenter
                    className={styles.modalStyle}
                    rclModalClass={styles.rclModalContainer}
                    contentWrapperClass={styles.rclModalWrapper}
                    variation="medium"
                    initialFocus="#firstName"
                    escapeExits
                  >
                    <AddEditAddress
                      labels={this.props.accountLabels}
                      firstName={firstName}
                      lastName={lastName}
                      addressLine1={address1}
                      email={email}
                      apartment={address2}
                      city={city}
                      state={this.getStateValueTym(this.props.listItem.state)}
                      zip={zipCode}
                      registryId={registryId}
                      thankYouSent={thankYouSent}
                      wasReturned={wasReturned}
                      rowId={rowId}
                      giftReceived={giftReceived}
                      sortOrder={this.props.sortOrder}
                      sortDirection={this.props.sortDirection}
                      onCancelLinkClick={this.toggleEditModalState}
                      enableAutoFill
                      addEditTym
                      mode="edit"
                      addEditAddress={this.props.addEditAddress}
                      formWrapperData={this.props.formWrapperDataAddress}
                      identifier={'accountAddressBook'}
                      updateStateData={this.props.updateStateData}
                    />
                  </ModalDialog>
                </Cell>
              </GridX>
            </Cell>
            <Cell
              className={
                classToggle === 'hide'
                  ? 'pb1'
                  : `pt3 pb3 large-4 ${styles.showBorder}`
              }
            >
              <GridX>
                <Cell
                  className={classnames(
                    'large-3 sm-ml1',
                    styles.imageContainer,
                    imgGrid
                  )}
                >
                  {this.renderQuickViewModal(
                    !this.isCashFund ? displayName : cfDisplayName
                  )}
                </Cell>
                <Cell
                  className={classnames(
                    'ml2 large-8 small-8',
                    classToggle,
                    styles.printProductTitle
                  )}
                >
                  {transactionType === 'SV' && (
                    <span className={styles.fundedLabel}>
                      <Icon type="checkmarkwhite" width="11" height="9" />
                      {FUNDED_LBL}
                    </span>
                  )}
                  <ProductTitle
                    headingClass={styles.productTitle}
                    headingLevel={4}
                    theme={'mediumLight'}
                    tabindex="0"
                  >
                    {this.displayName()}
                  </ProductTitle>
                  {this.displayFundAmount({ transactionType })}
                  <div>
                    {// will hide for group gifting
                    transactionType !== TRANSACTION_TYPE.GROUP_GIFTING &&
                      !this.isCashFund && (
                        <Paragraph
                          className="m0 inline-block"
                          theme="smallLight"
                          tabindex="0"
                        >
                          <span>{`Qty ${purchaseQty}`}</span>
                        </Paragraph>
                      )}
                    {// will hide for group gifting
                    transactionType !== TRANSACTION_TYPE.GROUP_GIFTING && (
                      <Paragraph
                        theme={'smallLight'}
                        className={classnames(
                          this.isCashFund
                            ? styles.cashFundPrice
                            : 'm0 pl1 pr1 inline-block',
                          styles.price
                        )}
                        tabindex="0"
                      >
                        <span>{this.renderQuantity()}</span>
                      </Paragraph>
                    )}
                    {transactionType === 'SV' && (
                      <Paragraph
                        theme={'smallLight'}
                        className={classnames('m0', styles.listDisplay)}
                        tabindex="0"
                        weight="bold"
                      >
                        <span>{TYM_RBYR_LBL} </span>
                      </Paragraph>
                    )}
                    <Paragraph
                      theme={'smallLight'}
                      className={classnames(
                        'm0',
                        this.isCashFund ? styles.boldCf : styles.bold
                      )}
                      tabindex="0"
                    >
                      <span>
                        {this.displayContribution({
                          transactionType,
                          purchaseDate,
                        })}
                      </span>
                    </Paragraph>
                  </div>
                  <div>
                    {transactionType !== 'SV' &&
                      transactionType !== TRANSACTION_TYPE.GROUP_GIFTING &&
                      !this.isCashFund && (
                        <Paragraph
                          theme={'smallLight'}
                          className={classnames(
                            'm0 purchaseDate',
                            styles.listDisplay
                          )}
                          tabindex="0"
                        >
                          <span> {`${ON_LBL} ${purchaseDate}`}</span>
                        </Paragraph>
                      )}
                  </div>

                  {this.isCashFund && (
                    <div>
                      <Paragraph
                        theme={'smallLight'}
                        className={classnames('m0', styles.venmoText)}
                        tabindex="0"
                      >
                        {FUND_SENT_VENMO_LBL}
                        <PrimaryLink
                          href={venmoUrl}
                          variation={'primary'}
                          className={styles.venmoLogin}
                          target={'_blank'}
                          isHardSpaReq
                        >
                          {LOGIN_TXT_LBL}
                        </PrimaryLink>
                      </Paragraph>
                    </div>
                  )}
                </Cell>
              </GridX>
            </Cell>
            {transactionType === 'SV' && (
              <Cell
                className={classnames(
                  'pl3 pt3 pb1 large-3 medium-6 small-12',
                  styles.atcContainer
                )}
              >
                {this.renderAddToCartBtn()}
                {this.renderShippingLabel()}
              </Cell>
            )}
            {transactionType !== 'SV' && (
              <Cell
                className={classnames(
                  'pl3 pt3 pb1 large-3 medium-6 small-9',
                  classToggle
                )}
              >
                <div className={classnames('pb2 mr2', styles.giftCheckbox)}>
                  <Checkbox
                    id={`giftReceived_${this.props.uniqueKey}`}
                    name={`giftReceived_${this.props.uniqueKey}`}
                    type="checkbox"
                    variation="verticalCenter"
                    label={this.renderCheckBoxLabelReceived(siteId)}
                    data-locator="registry-networkInfoCheck1"
                    checked={this.state.giftReceived}
                    onSelect={this.handleTymCB}
                  />
                </div>
                {this.handleErrorMsg('giftReceived_error', isMobileCheck)}
                {// will hide for group gifting
                transactionType !== TRANSACTION_TYPE.GROUP_GIFTING &&
                  !this.isCashFund && (
                    <div className={classnames('pb2 mr2', styles.giftCheckbox)}>
                      <Checkbox
                        id={`giftReturned_${this.props.uniqueKey}`}
                        name={`giftReturned_${this.props.uniqueKey}`}
                        type="checkbox"
                        variation="verticalCenter"
                        label={this.renderCheckBoxLabelReturn(siteId)}
                        data-locator="registry-networkInfoCheck1"
                        checked={this.state.giftReturned}
                        onSelect={this.handleTymCB}
                      />
                    </div>
                  )}
                {this.handleErrorMsg('giftReturned_error', isMobileCheck)}
              </Cell>
            )}
            {isMobileCheck ? (
              <Cell
                className={classnames(
                  textCenter,
                  'pt2 pb2 large-2',
                  styles.showTopBorder
                )}
              >
                <PrimaryLink
                  href={'#'}
                  onClick={this.toggleShowHide}
                  variation={'primary'}
                  name="hideDetail"
                  type="bold"
                  className={
                    (classnames('hideDetail'),
                    classToggle === 'hide' ? 'hide' : 'show')
                  }
                >
                  Hide Details
                </PrimaryLink>
                <PrimaryLink
                  href={'#'}
                  onClick={this.toggleShowHide}
                  variation={'primary'}
                  name="seeDetail"
                  type="bold"
                  className={classnames(
                    'seeDetail',
                    classToggle === 'show' ? 'hide' : 'show'
                  )}
                >
                  See Details
                </PrimaryLink>
              </Cell>
            ) : (
              ''
            )}
          </GridX>
        </li>
      </React.Fragment>
    );
  }
}

TYMRow.propTypes = {
  isMobile: PropTypes.object.isRequired,
  uniqueKey: PropTypes.number.isRequired,
  listItem: PropTypes.object.isRequired,
  scene7URL: PropTypes.object,
  labels: PropTypes.object,
  registryId: PropTypes.string,
  accountLabels: PropTypes.object,
  addEditAddress: PropTypes.func,
  listUpdated: PropTypes.bool,
  sortOrder: PropTypes.string,
  sortDirection: PropTypes.string,
  onQuickViewButtonClick: PropTypes.func,
  contextPath: PropTypes.string,
  formWrapperDataAddress: PropTypes.object,
  updateStateData: PropTypes.func,
  initiateInactivityModal: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  skuDetails: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  personalizedMobImageUrls: PropTypes.bool,
  location: PropTypes.object,
  handleCallback: PropTypes.func,
  enableCashFund: PropTypes.bool,
  skuId: PropTypes.number,
};
export default TYMRow;
