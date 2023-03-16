/* eslint max-lines: ["error", 1329]*/
import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import { isEmpty } from 'lodash';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getSiteId } from '@bbb-app/utils/common';
import SEOUtil from '@bbb-app/utils/SEOUtil';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
// import isBrowser from '@bbb-app/utils/isBrowser';
import HideOnTbs from '@bbb-app/core-ui/hide-on-tbs/HideOnTbs';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import getLatLongFromCookie from '@bbb-app/utils/getLatLongFromCookie';
import { LAT_LONG_COOKIE } from '@bbb-app/constants/cookies';
import {
  getDataFromSessionStorage,
  deleteFromSessionStorage,
  getTimeDifference,
} from '@bbb-app/utils/RegistryUtils';
import Dashboard from './Dashboard/GuestViewerDashboard';
import NeedHelp from '../../NeedHelp/NeedHelp.async';
import PerfectGift from '../../PerfectGift';
import styles from './GuestViewerLayout.inline.css';
import QuickViewModalWrapper from '../../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper.async';
import { REGISTRY_QUICK_VIEW } from '../../RegistryOwner/RegistryOwnerLayout/constants';
import Skeleton from '../../../../../containers/Pages/Registry/RegistryOwnerMain/Skeleton/Skeleton';
import ProductTileSkeleton from './ProductTileSkeleton';
import {
  bopisFilterItemCount,
  renderFacetsSortedView,
  renderNoResultView,
} from './GuestViewerLayoutUtill';
import { propTypes } from './props';
import RegistryFacetFilter from '../../../../../containers/Pages/Registry/RegistryFacetFilter/RegistryFacetFilter';
import RegistryDetailModal from '../../RegistryDetailModal/RegistryDetailModal.async';
import SeoContent from './Components/SeoContent';
import CollaborationGiftBanner from '../CollaborationGiftBanner/CollaborationGiftBanner';
import {
  BACK_TO_SEARCH_RESULT_LBL,
  REGISTRY_MODAL_HEAD_LBL,
  REGISTRY_MODAL_HEAD_TBS_LBL,
  REGISTRY_MODAL_BODY_TBS_LBL,
  REGISTRY_MODAL_BODY_LBL,
  REG_LANDING_URL,
} from './constants';
import { ERROR_API_TIMEOUT_LBL } from '../../constants';

const Container = props => <div {...props} />;
const ContentWitDangerousHtml = dangerousHTML(Container);

export const renderBackToSearch = searchRegistryUrl => {
  return (
    !isEmpty(searchRegistryUrl) && (
      <div
        className={classnames('grid-container', styles.backToSearch, 'pb2 pt2')}
      >
        <Icon type="caret" width="18" height="8" />
        <PrimaryLink
          variation="primary"
          href={searchRegistryUrl}
          type="bold"
          className={classnames('mr3 sm-mr1 xs-mr1', styles.backToSearchText)}
        >
          {BACK_TO_SEARCH_RESULT_LBL}
        </PrimaryLink>
      </div>
    )
  );
};
export const renderTimeoutError = otherProps => {
  const { categoryErrorStatus, oosErrorStatus } = otherProps;
  let errorObj = null;
  let isTimeoutError = false;
  if (!isEmpty(categoryErrorStatus)) {
    errorObj = categoryErrorStatus;
  } else if (!isEmpty(oosErrorStatus)) {
    errorObj = oosErrorStatus;
  }
  if (errorObj) {
    const msg = pathOr('', 'response.axiosErrorMessage', errorObj);
    const timeOutErrorRegex = /timeout/gi;
    isTimeoutError = timeOutErrorRegex.test(msg);
  }
  return isTimeoutError ? (
    <ErrorBoundary>
      <div
        className={styles.accordianContainer}
        id="errorMsgOnFirstCategoryItemFail"
      >
        <div className="grid-container pb3 pt3">
          <Notification
            status={'error'}
            wrapperClass={'mb3 small-mb3'}
            content={ERROR_API_TIMEOUT_LBL}
          />
        </div>
      </div>
    </ErrorBoundary>
  ) : null;
};

export class GuestViewerLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      giftGiverModalVisiblity: false,
      isShowAllAndHideAll: true,
      checkboxState: false,
    };
    this.isVisible = this.isVisible.bind(this);
    this.renderDialogBoxOnGiftGiver = this.renderDialogBoxOnGiftGiver.bind(
      this
    );
    this.giftGiverModalTealiumHandler = this.giftGiverModalTealiumHandler.bind(
      this
    );
    this.isOosItemsFiltered = false;
    this.getShowWelcomeMsgParam = this.getShowWelcomeMsgParam.bind(this);
  }
  componentDidMount() {
    const akamaiData = pathOr('', 'akamaiHeader.data', this.props);
    if (
      this.props.akamaiHeader &&
      this.props.akamaiHeader.isFetching === false // To avoid undefined
    ) {
      this.setLandingZip(akamaiData.data, this.props.saveLandingZip);
    }
    this.renderDialogBoxOnGiftGiver();
  }

  componentWillReceiveProps(nextProps) {
    const akamaiData = pathOr('', 'akamaiHeader.data', nextProps);
    if (
      nextProps.akamaiHeader &&
      !nextProps.akamaiHeader.isFetching &&
      this.props.akamaiHeader.data !== nextProps.akamaiHeader.data
    ) {
      this.setLandingZip(akamaiData.data, nextProps.saveLandingZip);
    }

    if (this.props.isQuickViewOpen && nextProps.isQuickViewOpen === false) {
      this.setState({ hideParentModal: false });
    }
  }
  getShowWelcomeMsgParam = () => {
    const { location } = this.props;
    const locationSearch = pathOr('', 'search', location);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    return pathOr('', 'showWelcomeMsg', query);
  };
  setLandingZip(akamaiData, saveZip) {
    const existingLatLong = getLatLongFromCookie(LAT_LONG_COOKIE);
    const zip = postalCode => postalCode.split(/[-,+]/)[0];
    let landingZip;
    if (existingLatLong) {
      landingZip = zip(existingLatLong.postalCode);
    } else {
      landingZip = akamaiData && akamaiData.zip ? zip(akamaiData.zip) : null;
    }
    saveZip(landingZip);
  }

  getRegistryTags(registryData) {
    const registryTags = {
      page_type: 'Registry',
      content_pagetype: '',
      product_pagetype: '',
      navigation_path: 'Registry',
      subnavigation_path: 'Registry',
      channel: 'Registry',
      interactive_checklist_detail: '',
      registrants_name: `${pathOr(
        '',
        'registryResVO.registrySummaryVO.primaryRegistrantFirstName',
        registryData
      )}  ${pathOr(
        '',
        'registryResVO.registrySummaryVO.primaryRegistrantLastName',
        registryData
      )}`,
      registry_event_date: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventDate',
        registryData
      ),
      registry_id: pathOr(
        '',
        'registryResVO.registrySummaryVO.registryId',
        registryData
      ),
      registry_type: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventType',
        registryData
      ),
      registry_favorite_categories_id: pathOr(
        [],
        'favouriteCategoryIdList',
        registryData
      ),
      registry_favorite_categories_name: pathOr(
        [],
        'favouriteCategoryNameList',
        registryData
      ),
      registry_product_name_count_purchased: pathOr(
        '',
        'registryResVO.registrySummaryVO.giftPurchased',
        registryData
      ),
      registry_product_name_count_requested: [
        pathOr(
          '',
          'registryResVO.registrySummaryVO.giftRegistered',
          registryData
        ),
      ],
      registry_total_items: pathOr(
        '',
        'registryResVO.registrySummaryVO.giftRegistered',
        registryData
      ),
      shower_celebration_date: pathOr(
        '',
        'registryResVO.registrySummaryVO.eventVO.showerDateObject.time',
        registryData
      ),
      crossell_page: 'non-cross sell',
      crossell_product: 'non-cross sell',
      product_finding_method: 'Registry',
      internal_search_term: 'non-search',
      internal_campaign: 'non-internal campaign',
      merchandising_category: 'non-browse',
      merchandising_main_level: 'non-browse',
      merchandising_subcategory: 'non-browse',
      product_sku_id: [],
      product_sku_name: [],
      product_id: [],
      product_category: [],
      product_subcategory: [],
      product_sub_sub_category: [],
    };
    return registryTags;
  }

  getBopisItemCount(filteredCategoryItems) {
    return filteredCategoryItems
      ? filteredCategoryItems.filter(item => {
          return item.skuInStore === '1';
        })
      : [];
  }
  checkBOPISFilterCount(
    filteredFirstCategoryItems,
    filteredSortedOosCategoryItems,
    selectedCheckboxFilter
  ) {
    if (selectedCheckboxFilter) {
      if (selectedCheckboxFilter === 'in-stock-online') {
        return (
          filteredFirstCategoryItems && filteredFirstCategoryItems.length === 0
        );
      } else if (selectedCheckboxFilter === 'store-pickup') {
        return (
          this.getBopisItemCount(filteredFirstCategoryItems).length +
            this.getBopisItemCount(filteredSortedOosCategoryItems).length ===
          0
        );
      }
    }
    return false;
  }
  giftGiverModalTealiumHandler(visible) {
    const { registryData } = this.props;
    if (!visible) {
      return null;
    }
    const utagData = this.getRegistryTags(registryData);
    utagData.pagename_breadcrumb = 'attention gift giver';
    utagData.page_name = 'attention gift giver';
    const TEALIUM_PAGE_INFO = {
      page_name: 'RegistryGuest',
      page_type: 'Registry',
    };
    return (
      <ErrorBoundary>
        <TealiumHandler
          utagData={utagData}
          identifier="Registry_Gift_Giver"
          tealiumPageInfo={TEALIUM_PAGE_INFO}
        />
      </ErrorBoundary>
    );
  }
  isVisible = state => {
    this.setState({
      giftGiverModalVisiblity: state,
    });
  };

  renderDialogBoxOnGiftGiver() {
    const key = `${'registryItemThresholdTime'}${this.props.registryId}`;
    if (getDataFromSessionStorage(key)) {
      const min = getTimeDifference(key);
      if (min <= 0) {
        this.isVisible(true);
        deleteFromSessionStorage(key);
      } else {
        deleteFromSessionStorage(key);
      }
    }
  }

  renderBreadCrumbs() {
    const { eventType, endPoints } = this.props;
    const { BreadcrumbListMicroData, ItemListMicroData } = SEOUtil;
    const breadCrumbList = [
      {
        name: 'Home',
        url: endPoints.home,
      },
    ];
    if (
      eventType === 'Wedding' ||
      eventType === 'Baby' ||
      eventType === 'Housewarming' ||
      eventType === 'College/University'
    ) {
      breadCrumbList.push({
        name: `${eventType} Registry`,
        url: REG_LANDING_URL[eventType],
      });
    }
    const breadCrumbs = breadCrumbList.map((item, index) => {
      const { name, url } = item;
      const TitleContainer = props => <span {...props} />;
      const TitleWithDangerousHTML = dangerousHTML(TitleContainer);
      return (
        <li {...ItemListMicroData} key={index}>
          <meta itemProp="position" content={index + 1} />
          <PrimaryLink itemProp="item" title={name} href={url}>
            <TitleWithDangerousHTML
              itemProp="name"
              className={styles.breadCrumb}
            >
              {name}
            </TitleWithDangerousHTML>
          </PrimaryLink>
        </li>
      );
    });
    const TitleContainer = props => <li {...props} />;
    const TitleWithDangerousHTML = dangerousHTML(TitleContainer);
    return (
      <ul
        ref={ref => (this.breadcrumbData = ref)}
        className={styles.list}
        {...BreadcrumbListMicroData}
        data-locator="Breadcrumbs"
      >
        {breadCrumbs}
        <TitleWithDangerousHTML>{'view registry'}</TitleWithDangerousHTML>
      </ul>
    );
  }
  // eslint-disable-next-line complexity
  render() {
    const {
      getWarrantyInfo,
      // searchRegistryUrl,
      registryFacetsFilter,
      filteredFirstCategoryItems,
      filteredSortedOosCategoryItems,
    } = this.props;
    const firstCategoryList = pathOr(
      [],
      '[0].registryItemList',
      this.props.dateSortedfirstCategoryList
    );
    const oosCategoryList = pathOr(
      [],
      'atgResponse[0].registryItemList',
      this.props.dateSortedOosCategoryList
    );
    const email = pathOr(null, 'profileData.email', this.props);
    const getNumberofRegistryItem = list => {
      const refinedList = list.filter(
        item => !isEmpty(item) && !item.deletedItem
      );
      return refinedList.length;
    };
    const dateSortedListItemsCount = this.props.dateSortedfirstCategoryList
      ? bopisFilterItemCount(
          this.props.dateSortedfirstCategoryList,
          this.props.selectedCheckboxFilter,
          this.props.filter
        )
      : 0;
    const totalItemsCount = pathOr(
      0,
      'registryResVO.registrySummaryVO.giftRegistered',
      this.props.registryData
    );
    const siteId = getSiteId();
    const isTbsId =
      siteId === 'TBS_BuyBuyBaby' || siteId === 'TBS_BedBathCanada';

    const registryModalHeadText = isTbsId
      ? REGISTRY_MODAL_HEAD_TBS_LBL
      : REGISTRY_MODAL_HEAD_LBL;

    const showWelcomeMsg = this.getShowWelcomeMsgParam();

    return (
      <div className="mb2">
        {this.giftGiverModalTealiumHandler(this.state.giftGiverModalVisiblity)}
        <ModalDialog
          mountedState={this.state.giftGiverModalVisiblity}
          toggleModalState={this.isVisible}
          titleAriaLabel={registryModalHeadText}
          underlayClickExits={false}
          titleClass="mt1 mb1"
          verticallyCenter
          variation="medium"
          closeDataLocator="checkout-crossicon"
        >
          <Cell>
            <Heading
              className={styles.heading}
              styleVariation="h2-serif"
              level={2}
              id="giftViewerModallHeading"
            >
              {registryModalHeadText}
            </Heading>
            <Paragraph
              theme="primary"
              className={classnames(styles.modalText, 'mt2')}
            >
              {isTbsId ? REGISTRY_MODAL_BODY_TBS_LBL : REGISTRY_MODAL_BODY_LBL}
            </Paragraph>
          </Cell>
        </ModalDialog>
        <ErrorBoundary>
          {/* <div>{isBrowser() && renderBackToSearch(searchRegistryUrl)}</div> */}
          <div className="grid-container">{this.renderBreadCrumbs()}</div>
          {this.props.isFetching ? (
            <Skeleton />
          ) : (
            <Dashboard
              eventType={this.props.eventType}
              {...this.props}
              email={email}
            />
          )}
        </ErrorBoundary>
        <ErrorBoundary>
          <div className={styles.registryActionButtonContainer}>
            {this.props.enableRegistryCollaboration && showWelcomeMsg && (
              <CollaborationGiftBanner
                registryData={this.props.registryData}
                profileData={this.props.profileData}
                contentStackSelectors={this.props.contentStackSelectors}
                siteId={this.props.siteId}
                isMobile={this.props.isMobile}
                collaborationGiftHelpContent={
                  this.props.collaborationGiftHelpContent
                }
              />
            )}
            {registryFacetsFilter &&
              registryFacetsFilter.length > 0 &&
              parseInt(totalItemsCount, 10) !== 0 && (
                <RegistryFacetFilter
                  eventType={this.props.eventType}
                  registryData={this.props.registryData}
                  filtersTopSpacing={styles.filtersTopSpacing}
                  fireTealiumAction={this.props.fireTealiumAction}
                  showFilters
                  setLandingZip={() =>
                    this.setLandingZip(
                      pathOr('', 'akamaiHeader.data', this.props),
                      this.props.saveLandingZip
                    )
                  }
                  {...this.props}
                  facetsData={registryFacetsFilter}
                />
              )}
          </div>
        </ErrorBoundary>
        {// eslint-disable-next-line
        this.props.isItemsFetching || this.props.isSortedFetching ? (
          <ProductTileSkeleton />
        ) : (filteredSortedOosCategoryItems &&
            filteredSortedOosCategoryItems.length === 0 &&
            filteredFirstCategoryItems &&
            filteredFirstCategoryItems.length === 0 &&
            (firstCategoryList.length !== 0 || oosCategoryList.length !== 0)) ||
          this.checkBOPISFilterCount(
            filteredFirstCategoryItems,
            filteredSortedOosCategoryItems,
            this.props.selectedCheckboxFilter
          ) ? (
          renderNoResultView()
        ) : (
          <ErrorBoundary>
            {renderTimeoutError(this.props)}
            {renderFacetsSortedView(
              this.props,
              dateSortedListItemsCount,
              getNumberofRegistryItem,
              this.props.displayDiscountedPriceKey,
              showWelcomeMsg
            )}
          </ErrorBoundary>
        )}
        <GridX className="grid-container">
          <SeoContent
            registryData={this.props.registryData}
            eventType={this.props.eventType}
          />
          {getWarrantyInfo && (
            <ErrorBoundary>
              <Cell className="mb2 grid-container">
                <ContentWitDangerousHtml className="small-12 large-10 mx-auto my2">
                  {getWarrantyInfo && getWarrantyInfo.body}
                </ContentWitDangerousHtml>
              </Cell>
            </ErrorBoundary>
          )}
          <HideOnTbs>
            {this.props.getPerfectGift && (
              <ErrorBoundary>
                <Cell className="mb2">
                  <PerfectGift
                    isMobile={this.props.isMobile}
                    {...this.props.getPerfectGift}
                    setBuyOffContext={this.props.setBuyOffContext}
                    registryId={this.props.registryId}
                  />
                </Cell>
              </ErrorBoundary>
            )}
          </HideOnTbs>
          {this.props.getHelp && (
            <ErrorBoundary>
              <Cell className="mb2">
                <NeedHelp
                  isMobile={this.props.isMobile}
                  bookAppointment={this.props.bookAppointment}
                  liveChat={this.props.liveChat}
                  getHelp={this.props.getHelp}
                  registryId={this.props.registryId}
                  eventType={this.props.eventType}
                  fireTealiumAction={this.props.fireTealiumAction}
                />
              </Cell>
            </ErrorBoundary>
          )}
        </GridX>
        {this.props.isQuickViewOpen && (
          <QuickViewModalWrapper
            registryData={this.props.registryData}
            variation={REGISTRY_QUICK_VIEW}
            registryId={this.props.registryId}
            giftGiver
            guestViewerLabels={this.props.labels}
            modalComponent={RegistryDetailModal}
            selectedCheckboxFilter={this.props.selectedCheckboxFilter}
            hideParent={() => {
              this.setState({ hideParentModal: true });
            }}
            hideParentModal={this.state.hideParentModal}
            isQuickViewHidden
          />
        )}
      </div>
    );
  }
}
GuestViewerLayout.propTypes = propTypes;
export default GuestViewerLayout;
