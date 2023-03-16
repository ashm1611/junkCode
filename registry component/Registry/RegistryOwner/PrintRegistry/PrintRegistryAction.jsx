/* eslint max-lines: ["error", 1015]*/
import React from 'react';
import { PropTypes } from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { parse } from 'qs';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import Address from '@bbb-app/core-ui/address/Address';
import {
  isBedBathCanada,
  decodeHtmlEntities,
  isGuestUser,
} from '@bbb-app/utils/common';
import getCurrentSiteId from '@bbb-app/utils/getCurrentSiteId';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import { isTbs } from '@bbb-app/utils/isTbs';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Image from '@bbb-app/core-ui/image';
import Icon from '@bbb-app/core-ui/icon';
import {
  BBB_SITE_KEY,
  BBBABAY_SITE_KEY,
  TBS_BBB_SITE_KEY,
  TBS_BBBCA_SITE_KEY,
  TBS_BBBABAY_SITE_KEY,
} from '@bbb-app/header/components/constants';
import BBBLogo from '@bbb-app/assets/logos/bbb-logo.svg';
import BBBabyLogo from '@bbb-app/assets/logos/bbbaby-logo.svg';
import BBBCALogo from '@bbb-app/assets/logos/bbbca-logo.svg';
import BBBabyCALogo from '@bbb-app/assets/logos/bbbabyca-logo.svg';
import TbsBBBLogo from '@bbb-app/assets/logos/bbby-logo-tbs.svg';
import TbsBBBabyLogo from '@bbb-app/assets/logos/bbbaby-logo-tbs.svg';
import TbsBBBCALogo from '@bbb-app/assets/logos/bbbyca-logo-tbs.svg';
import StoreTimings from '@bbb-app/store-timing/StoreTimings';
import { personalizationApplicable } from '@bbb-app/utils/RegistryUtils';
import styles from './PrintRegistryAction.css';
import GiftWrapper from '../../Dashboard/GiftWrapper/GiftWrapper';
import {
  genderConst,
  BABY_GENDER_COUNT_DELIMETER,
  BABY_GENDER_AND_DECOR_DELIMETER,
} from './../../CreateRegistry/CreateRegistryUtils';
import { EVENT_TYPE_PNH, PNH_CHECKLIST_LBL, BABYGENDER } from './constants';
import {
  BABY_GENDER_GIRL_LBL,
  BABY_GENDER_BOY_LBL,
  BABY_GENDER_SURPRISE_LBL,
} from '../../../Registry/CreateRegistry/Components/FormComponents/constants';
import { getFormatedDateIfItsCanada } from '../../../../../containers/Pages/PNHChecklist/Utils/Utils';
import { getPickUpOrderSubmitDate } from '../../../PNHChecklist/PNHDashboard/PNHDashboard';
import {
  INCLUDING_DELIVERY_LBL,
  ITEM_PRICE_LBL,
  DISCOUNTED_IN_CART_LBL,
  REG_GENDER_LBL,
  GIFTS_ADDED_LBL,
  PRICE_SOCIAL_SORT_LBL,
  SIZE_DASS_LBL,
  COLOR_DASS_LBL,
  BABY_EVENT_LBL,
  OTHER_EVENT_LBL,
  PNH_EVENT_LBL,
  REGISTRY_ID_TEXT_LBL,
  PURCHASED_LBL,
} from '../../constants';

const propTypes = {
  getRegistryOwnerFirstCategory: PropTypes.func,
  registryOwnerFirstCategoryList: PropTypes.array,
  labels: PropTypes.object,
  location: PropTypes.object.isRequired,
  pickUpDateThreshold: PropTypes.string,
  isFrozen: PropTypes.bool,
  onComponentMount: PropTypes.func,
  registryData: PropTypes.object,
  fetchPickUpStore: PropTypes.func,
  pickUpStore: PropTypes.object,
  isRemainingItemFetching: PropTypes.bool,
};

const iconLogosTbs = {
  [TBS_BBBCA_SITE_KEY]: TbsBBBCALogo,
  [TBS_BBB_SITE_KEY]: TbsBBBLogo,
  [TBS_BBBABAY_SITE_KEY]: TbsBBBabyLogo,
};

/* Labels */
const PRINT_OUT_OF_STOCK_LBL = 'OUT OF STOCK';
const PRINT_PERSONALIZED_LBL = 'ITEM IS PERSONALIZED';
const PRINT_DISCONTINUED_LBL = 'DISCONTINUED';
const PRINT_FAVORITE_LBL = 'FAVORITE';
const PRINT_PRODUCT_LBL = 'Product';
const PRINT_WANTS_LBL = 'Wants';
const PRINT_UPC = 'UPC';
const PNHID_TEXT_LBL = 'Pack & Hold ID';
const MUST_SUBMIT_LBL = 'Must submit your order before';
const PRE_TAX_LBL = 'Pre-Tax Total';
const TOTAL_ITEMS_LBL = 'Total Items';
const PICKUP_STORE_LBL = 'Pick up store';
const AND_LBL = '&';
const GROUP_GIFT_LBL = 'GROUP GIFTING';
const LIST_ID_LBL = 'List ID';
const SUBMITTED_LBL = 'Submitted';
export class PrintRegistryAction extends React.PureComponent {
  constructor(props) {
    super(props);

    this.hasFirstCategoryCallFired = false;
    const query = parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const today = new Date();
    this.state = {
      prtWinOpen: false, // boolean flag for checking the window.print is trigger
      eventDate: pathOr(null, 'eventDate', query),
      babyGender: pathOr(null, 'babyGender', query),
      gender: pathOr(null, 'gender', query),
      registryID: pathOr('', 'registryID', query),
      eventType: pathOr(null, 'eventType', query),
      primaryRegistrantFirstName: pathOr(
        null,
        'primaryRegistrantFirstName',
        query
      ),
      pickUpStoreId: pathOr(null, 'pickUpStoreId', query),

      coRegistrantFirstName: pathOr(null, 'coRegistrantFirstName', query),
      giftRegistered: pathOr(null, 'giftRegistered', query),
      giftPurchased: pathOr(null, 'giftPurchased', query),
      date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      time: `${today.getHours()}:${today.getMinutes()}`,
      printView: true,
    };

    this.imgLoadCount = 0; // total number of image in the registry/checklist (product count)
    this.getRegistryId = this.getRegistryId.bind(this);
    this.triggerWindowPrint = this.triggerWindowPrint.bind(this);
    this.onLoadHandlerForImg = this.onLoadHandlerForImg.bind(this); // image onload event bind
    this.isComponentMount = false;
    this.isRemainingAPISuccess = false;
    this.options = { width: 150, height: 150 };
  }

  componentDidMount() {
    const isDateSort = true;
    const { onComponentMount, getRegistryOwnerFirstCategory } = this.props;

    if (this.isPackAndHoldList()) {
      onComponentMount(this.state.registryID, false, false);
    }

    getRegistryOwnerFirstCategory(
      this.state.registryID,
      this.state.eventType,
      this.state.eventDate,
      isDateSort,
      '',
      this.state.printView
    );

    this.isComponentMount = true;
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPickUpStore } = this.props;
    const pickUpStoreId = pathOr(
      0,
      'registryResVO.registrySummaryVO.pickUpStoreId',
      this.props.registryData
    );

    if (pickUpStoreId && isEmpty(nextProps.pickUpStore)) {
      fetchPickUpStore(pickUpStoreId);
    }

    // Start Logic for triggering the print.window()
    if (
      this.props.isRemainingItemFetching === true &&
      nextProps.isRemainingItemFetching === false
    ) {
      this.isRemainingAPISuccess = true;
    }

    if (this.isDataLoaded(nextProps) && !this.timer) {
      /**
       * Set threshold timer for 2 sec
       * if image will not load on time(2 sec)
       * then after the window.print will trigger
       *
       **/
      this.timer = setTimeoutCustom(
        /* istanbul ignore next */ () => {
          clearTimeout(this.timer);
          if (this.isDataLoaded(nextProps)) {
            this.setState({
              prtWinOpen: true,
            });
            this.triggerWindowPrint();
          }
        },
        2000
      );
    }
    // End Logic for triggering the print.window()
  }

  /**
   * Calculate the total number of loaded image in the page
   */
  onLoadHandlerForImg() {
    this.imgLoadCount += 1;

    // Start Logic for triggering the print.window()
    const { registryOwnerFirstCategoryList } = this.props;
    const productCount = pathOr(
      null,
      '[0].registryItemList',
      registryOwnerFirstCategoryList
    );

    if (
      this.isDataLoaded(this.props) &&
      this.imgLoadCount === productCount.length
    ) {
      /**
       * clear timer which set earlier
       * if total product count is equal to imgLoadCount
       * then trigger window.print
       *
       **/
      clearTimeout(this.timer);
      this.setState({
        prtWinOpen: true,
      });
      this.triggerWindowPrint();
    }
    // End Logic for triggering the print.window()
  }

  getRegistryId() {
    let id = this.state.registryID.toString();
    for (let count = 1; count <= 10; count += 1) {
      if (id.length === 10) {
        break;
      }
      id = `0${id}`;
    }
    return id;
  }

  isPackAndHoldList() {
    const { eventType } = this.state;
    return eventType === EVENT_TYPE_PNH;
  }

  printProductMessageName(itemsList) {
    let productMessage = decodeHtmlEntities(itemsList.sKUDetailVO.displayName);
    if (productMessage.length > 45) {
      productMessage = productMessage.substring(0, 40).concat('...');
    }
    return productMessage;
  }

  groupGiftLabel(itemsList) {
    const space = ' ';
    const groupGiftLabel = AND_LBL + space + GROUP_GIFT_LBL;

    if (
      !itemsList.displayNotifyRegistrantMsg &&
      itemsList.ggEligibleItem &&
      !itemsList.personalizationOptionsDisplay
    ) {
      if (itemsList.isBelowLineItem === 'true') return GROUP_GIFT_LBL;
      else if (itemsList.markedAsFav) return groupGiftLabel;
      return GROUP_GIFT_LBL;
    }
    return null;
  }

  triggerWindowPrint() {
    const timer = setTimeoutCustom(
      /* istanbul ignore next */ () => {
        clearTimeout(timer);
        window.print();
      },
      10
    );
  }

  isDataLoaded(nextProps) {
    const { registryOwnerFirstCategoryList } = nextProps;
    const { prtWinOpen } = this.state;

    let isPickUpStoreLoaded =
      !isEmpty(nextProps.pickUpStore) && this.isPackAndHoldList(); // Pack and Hold checklist check for pickup store data
    if (!this.isPackAndHoldList()) isPickUpStoreLoaded = true; // All the Registry should set isPickUpStoreLoaded = true

    return (
      isPickUpStoreLoaded &&
      !prtWinOpen &&
      !isEmpty(registryOwnerFirstCategoryList) &&
      this.isRemainingAPISuccess
    );
  }

  priceProduct(itemsList) {
    let displayPrice = itemsList.formattedPrice;
    const ltlDeliveryServices = itemsList.ltlDeliveryServices;
    const personalizationType = itemsList.sKUDetailVO.personalizationType;
    const refNum = itemsList.refNum;
    const personalizedPrice = itemsList.formattedPersonalizedPrice;
    const totalPrice = itemsList.formattedTotalPrice;
    const isCartFlag = itemsList.sKUDetailVO.inCartFlag;
    const isUserLogged = isUserLoggedIn();
    const isGuest = isGuestUser();
    displayPrice =
      isUserLogged && isCartFlag
        ? itemsList.formattedInCartPriceVal
        : displayPrice;
    displayPrice =
      isGuest && isCartFlag ? (
        <div>
          {DISCOUNTED_IN_CART_LBL}
          <span> : {itemsList.formattedPrice}</span>
        </div>
      ) : (
        displayPrice
      );
    displayPrice = personalizationApplicable(refNum, personalizationType)
      ? personalizedPrice
      : displayPrice;
    displayPrice = ltlDeliveryServices
      ? `${totalPrice} ${INCLUDING_DELIVERY_LBL}`
      : displayPrice;
    return displayPrice;
  }

  Icons = (logo, siteId) => {
    let Logo = BBBLogo;
    const logoClass = logo.className;
    if (isTbs()) {
      Logo = iconLogosTbs[siteId];
    } else if (siteId === BBB_SITE_KEY) {
      Logo = BBBLogo;
    } else if (
      logoClass &&
      isBedBathCanada() &&
      logoClass.indexOf('bbbca-logo') !== -1
    ) {
      Logo = BBBCALogo;
    } else if (isBedBathCanada()) {
      Logo = BBBabyCALogo;
    } else if (siteId === BBBABAY_SITE_KEY) {
      Logo = BBBabyLogo;
    }
    return <Logo className={styles.logo} alt={logo.alt} />;
  };

  returnGender = gender => {
    let babyGender = '';
    switch (gender) {
      case genderConst.BOY:
        babyGender = BABY_GENDER_BOY_LBL;
        break;
      case genderConst.GIRL:
        babyGender = BABY_GENDER_GIRL_LBL;
        break;
      default:
        babyGender = BABY_GENDER_SURPRISE_LBL;
    }
    return babyGender;
  };

  returnMultiplesGender = gender => {
    let babyGender = '';
    let babyGenderKey = '';
    if (gender.charAt(0) === genderConst.SURPRISE) {
      babyGender = BABY_GENDER_SURPRISE_LBL;
      return babyGender;
    }
    const babyGenderArr = gender.split(BABY_GENDER_COUNT_DELIMETER);
    const babyCount = babyGenderArr.length;
    let boyCount = 0;
    let girlCount = 0;
    let genderDecorArr;
    for (let i = 0; i < babyCount; i += 1) {
      genderDecorArr = babyGenderArr[i].split(BABY_GENDER_AND_DECOR_DELIMETER);
      if (genderDecorArr[0] === genderConst.BOY) {
        boyCount += 1;
      } else if (genderDecorArr[0] === genderConst.GIRL) {
        girlCount += 1;
      }
    }
    babyGenderKey = `Boy${boyCount}Girl${girlCount}`;
    babyGender = pathOr('', `${babyGenderKey}`, BABYGENDER);
    return babyGender;
  };
  checkTitleString() {
    const { eventType, eventDate } = this.state;
    let title = 'Registry';
    if (eventType === EVENT_TYPE_PNH) {
      title = PNH_CHECKLIST_LBL;
    } else if (eventDate === 'null') {
      title = 'List';
    }
    return title;
  }

  checkEventType() {
    if (this.isPackAndHoldList()) {
      return null;
    }
    return this.renderBarCodeTextWithIcon();
  }
  generateUrlWithAttribute(baseUrl, options) {
    return `${baseUrl}?wid=${options.width}&hei=${options.height}`;
  }
  renderPickUpStore() {
    const { pickUpStore } = this.props;
    const renderaddress = !isEmpty(pickUpStore) && this.isPackAndHoldList();
    return renderaddress ? (
      <React.Fragment>
        <div
          className={classnames(styles.pickUpStore, 'mt2')}
          data-locator="pickupstore-detail"
        >
          {PICKUP_STORE_LBL}
        </div>
        <div className={classnames(styles.pickUpAddressTimings, 'mb2 mt2 mr2')}>
          <Address
            data-locator="trackorder-address"
            address1={pickUpStore.address}
            state={pickUpStore.state}
            city={pickUpStore.city}
            postalCode={pickUpStore.postalCode}
            phoneNumber={pickUpStore.phone}
            showFullCountryName
          />{' '}
        </div>
        <div className={classnames(styles.pickUpAddressTimings, 'ml2 mb2 mt2')}>
          <StoreTimings storeDetail={pickUpStore} />
        </div>
      </React.Fragment>
    ) : null;
  }

  renderGiftwrapper() {
    const { giftRegistered, giftPurchased } = this.state;
    if (this.isPackAndHoldList()) {
      const { registryData, registryOwnerFirstCategoryList } = this.props;
      const totalItemCount = pathOr(
        0,
        'registryResVO.registrySummaryVO.giftRegistered',
        registryData
      );
      let itemsTotalPrice = pathOr(
        null,
        'registryResVO.registrySummaryVO.itemsTotalPrice',
        registryData
      );
      if (!itemsTotalPrice) {
        itemsTotalPrice = pathOr(
          null,
          '[0].itemsTotalPrice',
          registryOwnerFirstCategoryList
        );
      }

      return (
        <div
          className={classnames(
            styles.giftContainer,
            styles.giftspace,
            styles.giftWrapper,
            'small-12 large-3 mt1'
          )}
        >
          <GridX className={classnames(styles.totalItem, 'mb2 mt2')}>
            <Cell
              className={classnames(
                styles.itemsheading,
                'medium-6 large-7 pl1'
              )}
            >
              {TOTAL_ITEMS_LBL}
            </Cell>
            <Cell className="medium-6 large-5 pl1">{totalItemCount}</Cell>
          </GridX>
          <GridX className={classnames(styles.totalPrice, 'mb2')}>
            <Cell
              className={classnames(
                styles.itemsheading,
                'medium-6 large-7  pl1'
              )}
            >
              {PRE_TAX_LBL}
            </Cell>
            <Cell className="medium-6 large-5 pl1">{itemsTotalPrice}</Cell>
          </GridX>
        </div>
      );
    }
    return (
      <div
        className={classnames(
          styles.giftContainer,
          styles.giftspace,
          'small-12 large-3 mt1'
        )}
      >
        <GiftWrapper
          giftRegistered={giftRegistered}
          giftsAddedLabel={GIFTS_ADDED_LBL}
          giftPurchased={giftPurchased}
          giftPurchasedLabel={PURCHASED_LBL}
          styles={styles}
          isInternationalUser
        />
      </div>
    );
  }

  renderSubmissionStatus() {
    const { isFrozen, pickUpDateThreshold } = this.props;
    let submissionLabel = MUST_SUBMIT_LBL;

    if (isFrozen) {
      submissionLabel = SUBMITTED_LBL;
    }

    const pickUpDateInUSFormat = getFormatedDateIfItsCanada(
      this.state.eventDate
    );
    const pickUpOrderSubmitDate = getPickUpOrderSubmitDate(
      pickUpDateInUSFormat,
      parseInt(pickUpDateThreshold, 10)
    );

    if (this.isPackAndHoldList()) {
      return (
        <dl className={styles.regDetailsDL}>
          <div
            className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
            data-locator="registry-submittedon"
          >
            <dt>{submissionLabel}</dt>
            <dd className={styles.detailsValue}>
              {!isFrozen && pickUpOrderSubmitDate}
            </dd>
          </div>
        </dl>
      );
    }
    return null;
  }

  renderEventDate() {
    const { eventType, eventDate } = this.state;
    let eventLabel = '';
    if (eventType === 'BA1') {
      eventLabel = BABY_EVENT_LBL;
    } else if (this.isPackAndHoldList()) {
      eventLabel = PNH_EVENT_LBL;
    } else if (eventDate === 'null') {
      return null;
    } else {
      eventLabel = OTHER_EVENT_LBL;
    }
    return (
      <div
        className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
        data-locator="registry-datelink"
      >
        <dt>{eventLabel}</dt>
        <dd className={styles.detailsValue}>{this.state.eventDate}</dd>
      </div>
    );
  }

  renderMainHeading(userName) {
    return (
      <Heading
        level={4}
        data-locator="registry-namelabel"
        styleVariation="h1-serif"
        aria-hidden="true"
        className={classnames(styles.userName, styles.breakWord, 'pt2')}
      >
        {userName}&#39;s {this.checkTitleString()}
      </Heading>
    );
  }

  renderBarCodeTextWithIcon() {
    const barCodeRegistryId = this.getRegistryId();
    return (
      <GridX
        className={classnames(styles.barcodeWrapper, 'pt2', 'pb2')}
        data-locator="registry-barcode"
      >
        <Icon type="barcode" width="200px" height="55px" />

        <div className={styles.detailsValue}>{barCodeRegistryId}</div>
      </GridX>
    );
  }

  renderLayout = () => {
    const { labels, registryOwnerFirstCategoryList } = this.props;
    const siteId = getCurrentSiteId();
    const logos = pathOr('', 'header.navigation.content.logo', this.props);
    let registryIDText = REGISTRY_ID_TEXT_LBL;
    if (this.isPackAndHoldList()) {
      registryIDText = PNHID_TEXT_LBL;
    } else if (this.state.eventDate === 'null') {
      registryIDText = LIST_ID_LBL;
    }
    const userName =
      this.state.coRegistrantFirstName === 'null'
        ? this.state.primaryRegistrantFirstName
        : `${this.state.primaryRegistrantFirstName} & ${this.state.coRegistrantFirstName}`;
    const registryCategoryList = pathOr(
      '',
      '[0].registryItemList',
      registryOwnerFirstCategoryList
    );
    const inStockItemList =
      registryCategoryList &&
      registryCategoryList.length &&
      registryCategoryList.filter(item => {
        if (this.isPackAndHoldList()) {
          return item.sKUDetailVO.skuInStoreInventory === true;
        }
        return item.isBelowLineItem === 'false';
      });
    const outStockItemList =
      registryCategoryList &&
      registryCategoryList.length &&
      registryCategoryList.filter(item => {
        if (this.isPackAndHoldList()) {
          return item.sKUDetailVO.skuInStoreInventory === false;
        }
        return item.isBelowLineItem === 'true';
      });
    const returnOldGender = this.state.babyGender
      ? this.returnMultiplesGender(this.state.babyGender, labels)
      : this.returnGender(this.state.babyGender, labels);
    return (
      <ErrorBoundary>
        <div className={styles.maincontainer}>
          <div className={styles.flexcontainer}>
            <div>
              <div>
                {logos.length > 0
                  ? logos.map(logo => {
                      return this.Icons(logo, siteId);
                    })
                  : null}
              </div>

              {this.renderMainHeading(userName)}
              <dl className={styles.regDetailsDL}>
                <div
                  className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
                  data-locator="registry-idlink"
                >
                  <dt>{registryIDText}</dt>
                  <dd className={styles.detailsValue}>
                    {this.state.registryID}
                  </dd>
                </div>
                {this.renderEventDate()}
                {this.renderSubmissionStatus()}
                {this.state.eventType === 'BA1' ? (
                  <div
                    className={classnames(styles.details, 'mr2 sm-mr2 xs-mr2')}
                    data-locator="registry-idlink"
                  >
                    <dt>{REG_GENDER_LBL}</dt>
                    <dd className={styles.detailsValue}>
                      {this.state.gender !== 'undefined'
                        ? this.state.gender
                        : returnOldGender}
                    </dd>
                  </div>
                ) : (
                  ''
                )}
              </dl>
              <div className={styles.detailsValueOn}>
                Printed on {this.state.date} at {this.state.time}
              </div>
              {this.renderPickUpStore()}
            </div>
            {this.renderGiftwrapper()}
            <div>{this.checkEventType()}</div>
          </div>
          <div className={styles.divspace}>
            <table className={styles.table}>
              <thead className={styles.tableheadborder}>
                <th
                  colSpan="2"
                  className={classnames(
                    styles.tableHeaders,
                    styles.productalign,
                    'pt1 pb1'
                  )}
                >
                  {PRINT_PRODUCT_LBL}
                </th>
                <th className={classnames(styles.tableHeaders, 'pt1 pb1')}>
                  {PRICE_SOCIAL_SORT_LBL}
                </th>
                <th className={classnames(styles.tableHeaders, 'pt1 pb1')}>
                  {COLOR_DASS_LBL.replace('-', '')}
                </th>
                <th className={classnames(styles.tableHeaders, 'pt1 pb1')}>
                  {SIZE_DASS_LBL.replace('-', '')}
                </th>
                <th className={classnames(styles.tableHeaders, 'pt1 pb1')}>
                  {PRINT_WANTS_LBL}
                </th>
                {!this.isPackAndHoldList() && (
                  <th
                    className={classnames(styles.tableHeaders, 'pt1 pb1 pl2')}
                  >
                    {PURCHASED_LBL}
                  </th>
                )}
                <th className={classnames(styles.tableHeaders, 'pt1 pb1')}>
                  {PRINT_UPC}
                </th>
              </thead>
              <tbody>
                {inStockItemList && inStockItemList.length
                  ? inStockItemList.map((itemsList, i) => (
                      <tr key={i}>
                        <td className={styles.productImage}>
                          <Image
                            alt={'itemList.productName'}
                            src={
                              itemsList.itemType === 'CSH'
                                ? itemsList.personalizedImageUrls
                                : this.generateUrlWithAttribute(
                                    getConcatenatedScene7URLWithImageId(
                                      itemsList.sKUDetailVO.skuImages
                                        .thumbnailImage
                                    ),
                                    this.options
                                  )
                            }
                            onLoad={this.onLoadHandlerForImg}
                          />
                        </td>
                        <td className={styles.productname}>
                          <div className={styles.divheading}>
                            {itemsList.markedAsFav && PRINT_FAVORITE_LBL}{' '}
                            {this.groupGiftLabel(itemsList)}
                          </div>
                          <div className={styles.divheading}>
                            {!itemsList.markedAsFav &&
                              itemsList.displayNotifyRegistrantMsg &&
                              PRINT_DISCONTINUED_LBL}
                          </div>
                          <div className={styles.divheading}>
                            {!itemsList.markedAsFav &&
                              !itemsList.displayNotifyRegistrantMsg &&
                              itemsList.personalizationOptionsDisplay &&
                              PRINT_PERSONALIZED_LBL}
                          </div>
                          {itemsList.itemType === 'CSH'
                            ? itemsList.personalizationDescription
                            : this.printProductMessageName(itemsList)}
                          <div>
                            {itemsList.ltlShipMethodDesc &&
                              itemsList.formattedTotalDeliveryCharges &&
                              itemsList.formattedTotalDeliveryCharges !==
                                '$0.00' && (
                                <div>
                                  {itemsList.ltlShipMethodDesc} :{' '}
                                  {itemsList.formattedTotalDeliveryCharges}
                                  <div>
                                    {ITEM_PRICE_LBL.replace(`{${0}}.`, ':')}{' '}
                                    {itemsList.formattedPrice}
                                  </div>
                                </div>
                              )}
                          </div>
                        </td>
                        <td>{this.priceProduct(itemsList)}</td>
                        <td>{itemsList.sKUDetailVO.color}</td>
                        <td>
                          {decodeHtmlEntities(itemsList.sKUDetailVO.size)}
                        </td>
                        <td>{itemsList.qtyRequested}</td>
                        {!this.isPackAndHoldList() && (
                          <td>{itemsList.qtyPurchased}</td>
                        )}
                        <td>{itemsList.sKUDetailVO.upc}</td>
                      </tr>
                    ))
                  : ''}
                {outStockItemList && outStockItemList.length > 0 && (
                  <tr>
                    <td
                      colSpan="2"
                      className={classnames(
                        styles.tableHeaders,
                        styles.productalign,
                        'pt1 pb1'
                      )}
                    >
                      <div className={styles.divheading}>
                        {PRINT_OUT_OF_STOCK_LBL}
                      </div>
                    </td>
                  </tr>
                )}
                {outStockItemList && outStockItemList.length
                  ? outStockItemList.map((itemsList, i) => (
                      <tr key={i}>
                        <td className={styles.productImage}>
                          <Image
                            alt={'itemList.productName'}
                            src={
                              itemsList.itemType === 'CSH'
                                ? itemsList.personalizedImageUrls
                                : this.generateUrlWithAttribute(
                                    getConcatenatedScene7URLWithImageId(
                                      itemsList.sKUDetailVO.skuImages
                                        .thumbnailImage
                                    ),
                                    this.options
                                  )
                            }
                            onLoad={this.onLoadHandlerForImg}
                          />
                        </td>
                        <td className={styles.productname}>
                          <div className={styles.divheading}>
                            {itemsList.markedAsFav && PRINT_FAVORITE_LBL}
                            {this.groupGiftLabel(itemsList)}
                          </div>
                          <div className={styles.divheading}>
                            {!itemsList.markedAsFav &&
                              itemsList.displayNotifyRegistrantMsg &&
                              PRINT_DISCONTINUED_LBL}
                          </div>
                          <div className={styles.divheading}>
                            {!itemsList.markedAsFav &&
                              !itemsList.displayNotifyRegistrantMsg &&
                              itemsList.personalizationOptionsDisplay &&
                              PRINT_PERSONALIZED_LBL}
                          </div>
                          {itemsList.itemType === 'CSH'
                            ? itemsList.personalizationDescription
                            : this.printProductMessageName(itemsList)}
                          <div>
                            {itemsList.ltlShipMethodDesc &&
                              itemsList.formattedTotalDeliveryCharges &&
                              itemsList.formattedTotalDeliveryCharges !==
                                '$0.00' && (
                                <div>
                                  {itemsList.ltlShipMethodDesc} :{' '}
                                  {itemsList.formattedTotalDeliveryCharges}
                                  <div>
                                    {ITEM_PRICE_LBL.replace(`{${0}}.`, ':')}{' '}
                                    {itemsList.formattedPrice}
                                  </div>
                                </div>
                              )}
                          </div>
                        </td>
                        <td>{this.priceProduct(itemsList)}</td>
                        <td>{itemsList.sKUDetailVO.color}</td>
                        <td>
                          {decodeHtmlEntities(itemsList.sKUDetailVO.size)}
                        </td>
                        <td>{itemsList.qtyRequested}</td>
                        {!this.isPackAndHoldList() && (
                          <td>{itemsList.qtyPurchased}</td>
                        )}
                        <td>{itemsList.sKUDetailVO.upc}</td>
                      </tr>
                    ))
                  : ''}
              </tbody>
            </table>
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.isComponentMount && this.renderLayout()}
      </React.Fragment>
    );
  }
}
PrintRegistryAction.propTypes = propTypes;
export default PrintRegistryAction;
