import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cloneDeep, isEmpty } from 'lodash';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import { getCurrentSiteIdAtBrowser } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import Image from '@bbb-app/core-ui/image';
import '@bbb-app/styles/thirdparty/toast.css';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import HideOnTbs from '@bbb-app/core-ui/hide-on-tbs/HideOnTbs';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import Spinner from '@bbb-app/core-ui/spinner/Spinner';
import { saveIsBackButtonPressed } from '@bbb-app/utils/RegistryUtils';
import CategoryAccordian from '../../../../Pages/Registry/CategoryAccordian';
import styles from './RegistryOwnerLayout.css';
import NeedHelp from '../../NeedHelp/NeedHelp.async';
import {
  WARRANTY_INFO_REFERRED_CONTENT_KEY,
  NEED_HELP_REFERRED_CONTENT_KEY,
  REGISTRY_QUICK_VIEW,
  REPLACE_PRODUCT_PRODUCT_IMAGE_SIZE,
} from './constants';
import RegistryContentSlot from '../../../Registry/ContentSlot/RegistryContentSlot';
import DFContentSlot from '../../../Registry/ContentSlot/DFContentSlot';
import RegistryFacetFilter from '../../../../../containers/Pages/Registry/RegistryFacetFilter/RegistryFacetFilter';
import RegistryOwnerModalWrapper from '../../RegistryOwnerModal/RegistryOwnerModalWrapper';
import MyItemNotification from '../MyItemNotification/MyItemNotification.async';
import {
  BEEN_REMOVED_LBL,
  ERROR_API_TIMEOUT_LBL,
  ERROR_MSG_ON_API_FAIL_LBL,
  UNDO_DELETED_LBL,
} from '../../constants';

/* Labels */
const REPLACED_ITEM_LBL = 'Item replaced!';
const VIEW_ITEM_BTN_LBL = 'View Item';
/** RegistryOwnerLayout returns the layout for registry Owner view.
 * @param (boolean) isMobile
 * @param {object} labels
 */
export class RegistryOwnerLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getReferredContentId = this.getReferredContentId.bind(this);
    this.renderLayout = this.renderLayout.bind(this);
    this.compareSkuId = this.compareSkuId.bind(this);
    this.pathMatcher = this.pathMatcher.bind(this);
    this.renderUndoButton = this.renderUndoButton.bind(this);
    this.undoDeletedItem = this.undoDeletedItem.bind(this);
    this.resetToViewAllFilter = this.resetToViewAllFilter.bind(this);
    this.enableCSLabels = pathOr(
      false,
      'globalSwitchConfig.enableCSLabels',
      this.props
    );
    this.referredContent = pathOr(
      [],
      this.enableCSLabels
        ? 'referredContent'
        : 'registryDetails.referredContent',
      this.props.labels
    );
    this.SITE_ID = getCurrentSiteIdAtBrowser();
    this.displayDiscountedKey = pathOr(
      false,
      'switchConfig.displayDiscountedPrice',
      props
    );
    this.state = {
      loginLabels: '',
      skuScene7Url: '',
      productName: '',
      skuId: '',
    };
  }
  componentWillMount() {
    this.setState({
      loginLabels: this.props.loginLabels,
    });
  }
  componentDidMount() {
    /** Below function will save a param in session If Browser back button is pressed */
    saveIsBackButtonPressed();
    if (this.enableCSLabels) {
      const { labels } = this.props;
      const referredContentIds = LabelsUtil.getReferredContentIds(labels);
      if (referredContentIds.length) {
        this.props.getContent(referredContentIds);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isFromReplace, isItemDeleted, updatedSkuId } = nextProps;
    /* istanbul ignore else  */
    const ref = this.props;
    if (ref.closeModalFlag) {
      ref.closeOtherOpenModaOnInactiveModal(false);
    }
    if (
      isFromReplace &&
      this.getisRemainingItemFetching(
        nextProps.isRemainingItemFetching,
        nextProps.isPriceItemFetching
      )
    ) {
      if (this.state.skuId) {
        this.handleViewItemMessage(
          this.state.skuScene7Url,
          this.state.productName
        );
        const discontinuedLabel = pathOr(
          null,
          'registryDetails.discontinuedLabel',
          this.props.labels
        );
        this.props.changeFilter(discontinuedLabel, true, discontinuedLabel);
      }
    }
    if (updatedSkuId && ref.isItemDeleted !== isItemDeleted && isItemDeleted) {
      this.checkDeletedItem(
        nextProps.registryOwnerFirstCategoryList,
        updatedSkuId
      );
    }
    if (
      this.props.isRegistrantDetailModalOpen &&
      nextProps.isRegistrantDetailModalOpen === false
    ) {
      this.setState({ hideParentModal: false });
    }
  }
  getisRemainingItemFetching(isRemainingItemFetching, isPriceItemFetching) {
    return (
      (this.props.isRemainingItemFetching && !isRemainingItemFetching) ||
      (this.props.isPriceItemFetching && !isPriceItemFetching)
    );
  }
  getReferredContentId(key) {
    let contentId;
    if (this.referredContent) {
      this.referredContent.forEach(obj => {
        if (obj.key === key) contentId = obj.id;
      });
    }

    return contentId;
  }
  getIsTimeOutError() {
    const { registryOnwerFirstCategoryError } = this.props;
    let errorObj = null;
    if (!isEmpty(registryOnwerFirstCategoryError)) {
      errorObj = registryOnwerFirstCategoryError;
    } else if (!isEmpty(this.props.remainingCategoryError)) {
      errorObj = this.props.remainingCategoryError;
    }
    if (errorObj) {
      const msg = pathOr('', 'response.axiosErrorMessage', errorObj);
      const timeOutErrorRegex = /timeout/gi;
      return timeOutErrorRegex.test(msg);
    }
    return false;
  }
  getReplacedItemData = (skuScene7Url, productName, skuId) => {
    this.setState({ skuScene7Url, productName, skuId });
  };
  checkDeletedItem = (updatedData, skuId) => {
    let productName = '';
    let itemType = null;
    const productData = cloneDeep(updatedData);
    productData.map(category => {
      const currentCategory = category;
      currentCategory.registryItemList.map(product => {
        const currentProduct = product;
        if (product.sKUDetailVO.skuId === skuId && currentProduct.deletedItem) {
          productName = product.sKUDetailVO.displayName;
          itemType = product.itemType;
        }
        return currentProduct;
      });
      return currentCategory;
    });
    /* istanbul ignore next */
    if (productName && itemType !== 'CSH') {
      const message = `${productName} ${BEEN_REMOVED_LBL}`;
      const UndoDeletedMessage = () => {
        return (
          <GridX className={classnames(styles.undoDeletedMessage, 'pb1 pt1')}>
            <Cell
              className="large-11 small-12" // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: message }}
            />
            <Cell className="large-1 small-12 sm-mt1">
              {this.renderUndoButton(skuId)}
            </Cell>
          </GridX>
        );
      };
      toast(<UndoDeletedMessage />, {
        autoClose: 5000,
        position: 'bottom-center',
        closeOnClick: true,
        toastStyles: 'mt1',
      });
    }
  };
  undoDeletedItem = e => {
    /* istanbul ignore next */
    const skuId = e.target.getAttribute('data-skuId');
    let productInfo;
    let productData = cloneDeep(this.props.registryOwnerFirstCategoryList);
    productData = productData.map(category => {
      const currentCategory = category;
      currentCategory.registryItemList.map(product => {
        const currentProduct = product;
        if (product.sKUDetailVO.skuId === skuId && currentProduct.deletedItem) {
          currentProduct.deletedItem = false;
          productInfo = currentProduct;
        }
        return currentProduct;
      });
      return currentCategory;
    });
    this.props.undoRemoveRegistryItem(productInfo, productData, skuId);
  };
  toggleLoginModalState = state => {
    this.props.displayLoginModal(state);
  };
  pathMatcher(path) {
    return this.props.matchPath.includes(path);
  }
  compareSkuId(products, query) {
    let value = false;
    products.forEach(elm => {
      if (elm.sku === Number(query.skuAdded)) {
        value = true;
      }
    });
    return value;
  }
  handleViewItemMessage(skuScene7Url, productName) {
    const prodImageUrl = getConcatenatedScene7URLWithImageId(
      skuScene7Url,
      'largeImage',
      REPLACE_PRODUCT_PRODUCT_IMAGE_SIZE
    );
    const ViewItemMessage = () => {
      return (
        <div>
          <Image
            className={styles.smallActiveImage}
            alt={productName}
            src={prodImageUrl}
          />
          <span className="mt1 ml1">{REPLACED_ITEM_LBL}</span>
          <Button
            className="md-ml3"
            variation="whitelinkUnderline"
            theme="link"
            data-locator="registry-item-view"
            onClick={this.resetToViewAllFilter}
          >
            {VIEW_ITEM_BTN_LBL}
          </Button>
        </div>
      );
    };
    toast(<ViewItemMessage />, {
      autoClose: 5000,
      position: 'bottom-center',
      closeOnClick: true,
      toastStyles: 'mt1',
    });
  }
  resetToViewAllFilter() {
    this.props.onResetFiltersAndSort();
    setTimeoutCustom(
      () => this.props.anchorToItem({ skuAdded: this.state.skuId }, false),
      100
    );
  }
  showMyItemNotification = () => {
    let msgLabel = '';
    let isOOS = false;
    let isDiscontinued = false;
    const { siteId = '', registryFacetsFilter = [] } = this.props;
    const enableNotification =
      !siteId.includes('TBS') &&
      registryFacetsFilter.map(
        facets =>
          facets.id === 'status' &&
          facets.items.filter(items => {
            if (items.key === 'Discontinued') isDiscontinued = true;
            if (items.key === 'Currently Sold Out') isOOS = true;
            return (
              items.key === 'Currently Sold Out' || items.key === 'Discontinued'
            );
          })
      );
    if (isOOS && isDiscontinued) msgLabel = 'out of stock and discontinued';
    else if (isOOS && !isDiscontinued) msgLabel = 'out of stock';
    else if (!isOOS && isDiscontinued) msgLabel = 'discontinued';
    msgLabel =
      msgLabel !== '' &&
      `Oh, no! Products on your my items page are ${msgLabel}. Please take action to replace.`;
    const itemAvailabilityStatus =
      enableNotification &&
      !isEmpty(enableNotification) &&
      enableNotification[0].length >= 1;

    return {
      isItemAvailability: itemAvailabilityStatus,
      msg: msgLabel,
    };
  };
  renderUndoButton = skuId => {
    /* istanbul ignore next */
    return (
      <Button
        variation="whitelinkUnderline"
        theme="link"
        className="md-ml3"
        data-locator="registry-item-undo"
        data-skuId={skuId}
        onClick={e => {
          this.undoDeletedItem(e);
        }}
      >
        {UNDO_DELETED_LBL}
      </Button>
    );
  };
  renderCategoryAccordian(item) {
    return (
      <CategoryAccordian
        accordianKey={1}
        data={item}
        getReplacedItemData={this.getReplacedItemData}
        displayDiscountedPrice={this.displayDiscountedKey}
        {...this.props}
      />
    );
  }
  renderFacets() {
    const { registryFacetsFilter } = this.props;
    this.itemCount = pathOr(
      0,
      'registryResVO.registrySummaryVO.giftRegistered',
      this.props.registryData
    );
    if (this.props.enableNewRegDashboard && this.itemCount <= 2) return null;
    return (
      <div>
        {registryFacetsFilter &&
          registryFacetsFilter.length > 0 &&
          this.itemCount !== 0 && (
            <div
              className={
                this.props.enableNewRegDashboard
                  ? styles.accordianContainerNew
                  : styles.accordianContainer
              }
            >
              <RegistryFacetFilter
                isOwnerView
                {...this.props}
                facetsData={registryFacetsFilter}
              />
            </div>
          )}
      </div>
    );
  }
  renderError(isTimeOutError = false) {
    const errorMessage = isTimeOutError
      ? ERROR_API_TIMEOUT_LBL
      : ERROR_MSG_ON_API_FAIL_LBL;
    return (
      <ErrorBoundary>
        <div
          className={styles.accordianContainer}
          id="errorMsgOnFirstCategoryItemFail"
        >
          <div className="grid-container pb3 pt3">
            <Notification
              status={'error'}
              wrapperClass="mb3 small-mb3"
              content={errorMessage}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
  renderRegistryOwnerItems(isError) {
    const { filteredFirstCategoryItems, labels } = this.props;
    this.openCount = this.props.showOpenCount;
    const registryItemList = pathOr(
      [],
      '[0].registryItemList',
      this.props.registryOwnerFirstCategoryList
    );
    const firstItemsArrDeleted =
      registryItemList &&
      registryItemList.filter(item => item.deletedItem === true);
    const filterItemsArrDeleted =
      filteredFirstCategoryItems &&
      filteredFirstCategoryItems.filter(item => item.deletedItem === true);
    /* istanbul ignore next */
    if (this.props.isItemsFetching) {
      return (
        <div
          className={classnames(
            this.props.enableNewRegDashboard
              ? styles.accordianContainerNew
              : styles.accordianContainer,
            'center mx-auto pt4 pb4'
          )}
        >
          <Spinner type={this.SITE_ID} />
        </div>
      );
    }
    if (
      (registryItemList.length === 0 ||
        (firstItemsArrDeleted &&
          firstItemsArrDeleted.length === registryItemList.length)) &&
      !isError &&
      isEmpty(this.props.remainingCategoryError)
    ) {
      const layout = this.props.enableNewRegDashboard ? 'large-4' : 'large-3';
      return (
        <ErrorBoundary>
          <GridX
            className={classnames(
              styles.accordianContainer,
              'grid-container pb3 pt3'
            )}
          >
            {this.props.eventType === 'Baby' && this.props.isDiaperFundEnable && (
              <Cell
                className={classnames(
                  layout,
                  'small-12 medium-6 sm-mb2',
                  styles.cell
                )}
              >
                <DFContentSlot labels={labels} siteId={this.props.siteId} />
              </Cell>
            )}
            <Cell
              className={classnames(layout, 'small-12 medium-6', styles.cell)}
            >
              <RegistryContentSlot
                labels={labels}
                styleVariation={this.props.styleVariation}
                siteId={this.props.siteId}
                registryData={this.props.registryData}
                enableNewRegDashboard={this.props.enableNewRegDashboard}
              />
            </Cell>
          </GridX>
        </ErrorBoundary>
      );
    }
    if (
      (filteredFirstCategoryItems && filteredFirstCategoryItems.length === 0) ||
      (filterItemsArrDeleted &&
        filterItemsArrDeleted.length === filteredFirstCategoryItems.length)
    ) {
      return (
        <div className={styles.containerForNoResult}>
          <div className={styles.noResultFilter}>
            {pathOr(
              'No Result For',
              'registryDetails.noResultForFilterMessage',
              labels
            )}
          </div>
          <div className={classnames(styles.noSelectedFilter, 'mt1')}>
            {pathOr(
              '“The Selected Filters”',
              'registryDetails.selectedFilterMessage',
              labels
            )}
          </div>
        </div>
      );
    }
    const isTimeoutError = this.getIsTimeOutError();
    return (
      <React.Fragment>
        {(isError || !isEmpty(this.props.remainingCategoryError)) &&
          this.renderError(isTimeoutError)}
        <ErrorBoundary>
          <div
            className={classnames(
              this.props.enableNewRegDashboard
                ? styles.accordianContainerNew
                : styles.accordianContainer,
              'mb3 pt2'
            )}
            data-locator="ownerViewItemsSection"
          >
            {this.props.filteredFirstCategoryItems &&
              this.props.filteredFirstCategoryItems.length > 0 &&
              this.renderCategoryAccordian({
                registryItemList: this.props.filteredFirstCategoryItems,
              })}
            {this.props.isRemainingItemFetching && null}
          </div>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
  renderMyItemNotification = () => {
    const { labels, isItemsFetching } = this.props;
    const showMyItemNotification = this.showMyItemNotification();
    return (
      !isItemsFetching &&
      showMyItemNotification.isItemAvailability && (
        <MyItemNotification
          labels={labels && labels.RegistryOwner}
          updateSelectedFilters={this.props.updateSelectedFilters}
          registryFacetsFilter={this.props.registryFacetsFilter}
          registryId={this.props.registryId}
          selectedFilters={this.props.selectedFilters}
          notificationMsg={showMyItemNotification.msg}
        />
      )
    );
  };
  /** Render Layouy for access allowed user */
  renderLayout(isError) {
    return [
      !this.props.enableNewRegDashboard && this.renderMyItemNotification(),
      this.renderFacets(),
      this.renderRegistryOwnerItems(isError),
    ];
  }
  render() {
    const { dynamicContentState, isMobile } = this.props;
    const isError = !isEmpty(this.props.registryOnwerFirstCategoryError);
    const Container = props => <div {...props} />;
    const ContentWitDangerousHtml = dangerousHTML(Container);
    const getWarrantyInfo = pathOr(
      null,
      this.getReferredContentId(WARRANTY_INFO_REFERRED_CONTENT_KEY),
      dynamicContentState.content
    );
    let getHelp = pathOr(
      null,
      this.getReferredContentId(NEED_HELP_REFERRED_CONTENT_KEY),
      dynamicContentState.content
    );
    if (getHelp !== null) {
      getHelp = getHelp.components && getHelp.components[0];
    }
    return (
      <React.Fragment>
        {this.props.mPulseEnabled && (
          <Instrumentation
            zoneName={'ux-primary-content-displayed'}
            markName={'ux-text-registry-home-content'}
          />
        )}
        <ErrorBoundary>{this.renderLayout(isError)}</ErrorBoundary>
        {!this.props.enableNewRegDashboard && (
          <GridX className="grid-container">
            {getWarrantyInfo !== null && (
              <ErrorBoundary>
                <Cell className="small-12 large-12 mb2 grid-container">
                  <ContentWitDangerousHtml
                    className={classnames(
                      'small-12 large-10 mx-auto mb3 mt1',
                      styles.warrantyInfo
                    )}
                  >
                    {getWarrantyInfo.body}
                  </ContentWitDangerousHtml>
                </Cell>
              </ErrorBoundary>
            )}
            {getHelp !== null && (
              <HideOnTbs>
                <Cell className="small-12 large-12 mb3 mt1">
                  <NeedHelp
                    isMobile={isMobile}
                    bookAppointment={this.props.bookAppointment}
                    liveChat={this.props.liveChat}
                    getHelp={getHelp}
                    registryId={this.props.registryId}
                    eventType={this.props.eventType}
                    fireTealiumAction={this.props.fireTealiumAction}
                  />
                </Cell>
              </HideOnTbs>
            )}
          </GridX>
        )}
        {this.props.isRegistrantDetailModalOpen && (
          <RegistryOwnerModalWrapper
            pageType="Registry Owner"
            variation={REGISTRY_QUICK_VIEW}
            noModeration
            registryId={this.props.registryId}
            isRegistryOwnerModal
            qvModalRegistry={styles.qvModalRegistry}
            hideParent={() => {
              this.setState({ hideParentModal: true });
            }}
            hideParentModal={this.state.hideParentModal}
            qvModalContentRegistry={styles.qvModalContentRegistry}
            isBopisFeatureEnable={this.props.isBopisFeatureEnable}
          />
        )}
      </React.Fragment>
    );
  }
}
RegistryOwnerLayout.propTypes = {
  labels: PropTypes.object,
  filteredFirstCategoryItems: PropTypes.array,
  isMobile: PropTypes.bool,
  eventType: PropTypes.string,
  dynamicContentState: PropTypes.object,
  displayLoginModal: PropTypes.func,
  loginLabels: PropTypes.object,
  registryOwnerFirstCategoryList: PropTypes.array,
  registryId: PropTypes.string,
  bookAppointment: PropTypes.bool,
  liveChat: PropTypes.bool,
  isItemsFetching: PropTypes.bool,
  registryData: PropTypes.object,
  matchPath: PropTypes.string,
  anchorToItem: PropTypes.func,
  isRemainingItemFetching: PropTypes.bool,
  registryOnwerFirstCategoryError: PropTypes.any,
  remainingCategoryError: PropTypes.any,
  mPulseEnabled: PropTypes.bool,
  showOpenCount: PropTypes.number,
  fireTealiumAction: PropTypes.func,
  undoRemoveRegistryItem: PropTypes.func,
  changeFilter: PropTypes.func,
  isPriceItemFetching: PropTypes.bool,
  registryFacetsFilter: PropTypes.array,
  onResetFiltersAndSort: PropTypes.func,
  siteId: PropTypes.string,
  styleVariation: PropTypes.string,
  isBopisFeatureEnable: PropTypes.bool,
  isDiaperFundEnable: PropTypes.bool,
  isRegistrantDetailModalOpen: PropTypes.bool,
  updateSelectedFilters: PropTypes.func,
  selectedFilters: PropTypes.object,
  getContent: PropTypes.func,
  enableNewRegDashboard: PropTypes.bool,
  isFromReplace: PropTypes.bool,
  isItemDeleted: PropTypes.bool,
  updatedSkuId: PropTypes.string,
};
export default withRouter(RegistryOwnerLayout);
