/* eslint max-lines: ["error", 1050]*/
import React, { Fragment, PureComponent } from 'react';
import {
  func,
  object,
  shape,
  bool,
  string,
  arrayOf,
  array,
  any,
} from 'prop-types';
import { isEmpty, pick, capitalize } from 'lodash/fp';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import { compile } from 'path-to-regexp';
import { Redirect, matchPath } from 'react-router';
import { toast } from 'react-toastify';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary/ErrorBoundary';
import truncate from '@bbb-app/utils/truncate';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import CommonUtil from '@bbb-app/utils/commonUtil';
import parseSanitizedSearchTerm from '@bbb-app/utils/parseSanitizedSearchTerm';
import { noop, decodeHtmlEntities } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Icon from '@bbb-app/core-ui/icon';
import '@bbb-app/styles/thirdparty/toast.css';
import sanitizeSearchTerm from '@bbb-app/utils/sanitizeSearchTerm';
import GridContainer from '@bbb-app/core-ui/grid-container';
import SkeletonWrapper from '@bbb-app/core-ui/skeleton-wrapper';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { HOSTNAMES } from '@bbb-app/seo/components/constants';
import TitleTags from '@bbb-app/seo/components/TitleTags';
import { InternalServerErrorPage } from '@bbb-app/error-pages/containers/http-error-pages/InternalServerErrorPage';
import {
  CHANNELTYPE_DESKTOP,
  CHANNELTYPE_MOBILE,
} from '@bbb-app/constants/appConstants';
import {
  ROUTE_REGISTRY_OWNNER,
  ROUTE_REGISTRY_QUICK_PICKS_COLLECTION,
  NotFoundHttpErrorPath,
} from '@bbb-app/constants/route/route';
import Button from '@bbb-app/core-ui/button';
import calculateOffset from '@bbb-app/utils/calculateOffset';
import Breadcrumbs from '../../../../common/Breadcrumbs/Breadcrumbs';
import styles from './QuickPicksCollection.css';
import ProductGrid from '../../../../ProductGrid';
import { renderProductTile } from './ProductTile/helper';
import QuickViewModalWrapper from '../../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper';
import PickupInStoreModalWrapper from '../../../../../containers/PickupInStoreModal/PickupInStoreModalWrapper';
import ProductCategories from '../../../../../components/PureContent/ProductCategories';
import { toPath as toQuickPicksLanding } from '../Landing/QuickPicksLanding.async';
import { ERROR_QUICK_PICKS_COLLECTION_NOT_FOUND } from '../../../../../constants/registryQuickPicks';
import {
  renderContentModules,
  renderQuickPickHero,
  renderSignInButton,
} from '../ContentModules';
import AddItemsComponent from '../AddItemsComponent';
import LeavePageConfirmationModal from '../LeavePageConfirmationModal';
import '../../../../../assets/icons/curved-arrow.svg';
import { pickProductProps } from '../../../../../utils/quickPicks';
import QuickPickCollectionTealiumHandler from '../../../../../containers/ThirdParty/Tealium/QuickPickCollectionTealiumHandler/QuickPickCollectionTealiumHandler';
import { scrollToPreviouslySelectedProduct } from '../../../../Filters/FiltersHelper';
import UrlTags from '../../../../Seo/UrlTags';
import { addToRegistryQuickPicks } from '../../../../../containers/Pages/Registry/QuickPicks/Collection/util';
import {
  ADD_TO_CART_LBL,
  ADD_TO_REGISTRY_LBL,
  CHOOSE_OPTN_LBL,
  QUICKVIEW_LBL,
  TOAST_SINGLE_MSG_LBL,
  TOAST_MULTIPLES_MSG_LBL,
  VIEW_REGISTRY_LBL,
  ADD_MUL_ITEMS_HEADING_LBL,
  LEAVE_PAGE_CONF_MSG_LBL,
  PRODUCT_TILE_MORE_OPTIONS_LBL,
  QUICK_PICKS_COLLECTION_LBL,
  ATR_CONF_MAX_CHAR_LENGTH_LBL,
  VIEW_MORE_LBL,
  VIEW_LESS_LBL,
  RETAKE_QUIZ_LBL,
  RETAKE_QUIZ_SUBCOPY_LBL,
  QUIZ_RESULTS_LBL,
} from './constants';
const wrapInGrid = component => (
  <GridContainer>
    <GridX>
      <Cell>{component}</Cell>
    </GridX>
  </GridContainer>
);
export const toPath = compile(ROUTE_REGISTRY_QUICK_PICKS_COLLECTION);
/** * This class renders the Quick Pick Landing page. */
class QuickPicksCollection extends PureComponent {
  constructor(props) {
    super(props);
    this.gridHeader = null;
    this.state = {
      nextLocation: '', // Let's not use Redux store for this.
      showLeavePageModal: false,
      fireTealium: false,
      showMoreQuickPicks: false,
    };
    this.unblock = null;
    this.isInternationalUser = isInternationalUser();
  }
  componentDidMount = () => {
    window.addEventListener('beforeunload', this.onUnload, { capture: true });
    this.unblock = this.props.history.block(this.handleHistoryBlockEvent);
    const {
      quickPicksCollection: {
        previousSelectedProducts = {},
        cacheHit,
        collections = [],
      },
    } = this.props;
    if (collections && !collections.length) {
      this.getQuickPicksData(this.props);
    }
    if (!isEmpty(previousSelectedProducts) && cacheHit) {
      const keys = Object.keys(previousSelectedProducts);
      const selectedProduct = previousSelectedProducts[keys[0]];
      const productId = selectedProduct.productId;
      const element = document.querySelector(`.js-product-id-${productId}`);
      if (element) {
        scrollToPreviouslySelectedProduct(element);
      }
    } else {
      window.scrollTo(0, 0);
    }
  };
  componentWillReceiveProps(newProps) {
    const newPropsCollectionId = pathOr(
      '',
      'quickPicksCollection.selectedCollection.collectionId',
      newProps
    );
    const propsCollectionId = pathOr(
      '',
      'quickPicksCollection.selectedCollection.collectionId',
      this.props
    );
    const newShowToast = pathOr(
      '',
      'quickPicksCollection.toastNotification.show',
      newProps
    );
    const showToast = pathOr(
      '',
      'quickPicksCollection.toastNotification.show',
      this.props
    );
    const renderItem = pathOr('', 'renderItem', this.props);
    if (newPropsCollectionId !== propsCollectionId || renderItem) {
      this.state.fireTealium = true;
    }
    // If show prop for toastNotification is set to true, render the toastNotification with an autoClose delay. Will render in the ToastContainer of main App container.
    if (newShowToast && !showToast) {
      toast(this.renderToastNotification, { autoClose: 5000 });
    }
  }
  componentDidUpdate(prevProps) {
    const prevRegistry = pathOr('', 'match.params.collectionName', prevProps);
    const currentRegistry = pathOr(
      '',
      'match.params.collectionName',
      this.props
    );
    if (currentRegistry !== prevRegistry) {
      this.getQuickPicksData(this.props);
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.onUnload);
    /* istanbul ignore else */
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    } // Must reset this!
    this.resetLeavePageModal();
    this.props.resetQuickPicksCollection();
  };
  onUnload = e => {
    const {
      quickPicksCollection: { selectedProducts },
    } = this.props;
    if (!isEmpty(selectedProducts)) {
      const refCopy = e;
      refCopy.returnValue = LEAVE_PAGE_CONF_MSG_LBL;
    }
  };
  /**
   * Handles on leave page events from the LeavePageConfirmationModal component.
   * @param {bool} leavePageSelected Indicates whether user wants to leave the page. If true, de-select products, close LeavePageConfirmationModal, and route to the next location, If false, close LeavePageConfirmationModal.
   */
  onLeavePageSelected = leavePageSelected => {
    if (leavePageSelected) {
      /* istanbul ignore else */
      if (this.unblock) {
        this.unblock();
        this.unblock = null;
      } // Must reset this!
      this.props.setQuickPicksCollection({ selectedProducts: {} });
      const nextLocation = this.state.nextLocation;
      this.resetLeavePageModal();
      this.props.leavePage(nextLocation);
    }
    this.setState({ showLeavePageModal: false });
  };
  /**
   * Changes collection
   * @param registryType
   */
  onSwitchQuickPicksCollection = url => {
    const { params } = matchPath(url, ROUTE_REGISTRY_QUICK_PICKS_COLLECTION, {
      exact: true,
    });
    this.props.changeQuickPicksCollection(toPath(params));
  };
  getProducts = () => {
    let { products } = this.props.quickPicksCollection;
    const { showMoreQuickPicks } = this.state;
    if (this.props.fromRecomendation && !showMoreQuickPicks) {
      const isMobile = CommonUtil.isMobileScreen(767);
      products = isMobile ? products.slice(0, 6) : products.slice(0, 12);
    }
    return products;
  };
  getQuickPicksData = propObj => {
    const { match = { url: {}, params: {} }, siteId } = propObj;
    const { url, params: args } = match;
    const pageName = pathOr('', 'route.routeData.pageName', propObj);
    args.pagePath = url;
    propObj.fetchQuickPicksCollection(args, pageName, '', {}, siteId);
  };
  setGridHeader = target => {
    this.gridHeader = target;
  };
  toggleMoreLessQuickPickItem = () => {
    const { showMoreQuickPicks } = this.state;
    this.setState({ showMoreQuickPicks: !showMoreQuickPicks }, () => {
      if (showMoreQuickPicks) {
        const viewAllOffsetY = document.getElementById('viewAllButton');
        const offset = calculateOffset(viewAllOffsetY);
        window.scrollTo(0, offset.top - 550);
      }
    });
  };
  handleHistoryBlockEvent = nextLocation => {
    const {
      quickPicksCollection: { selectedProducts },
    } = this.props;
    if (!isEmpty(selectedProducts)) {
      this.setState({ nextLocation, showLeavePageModal: true });
      return false; // Block using modal.  Reset function to true when done.
    }
    return true;
  };
  resetLeavePageModal = () => {
    this.setState({ showLeavePageModal: false, nextLocation: '' });
  };
  toggleSelectAllItems = selected => {
    const selectedProducts = {};
    const products = this.getProducts();
    this.props.setQuickPicksCollection({ selectedProducts }); // Clear out selected items
    if (selected) {
      products.forEach(item => {
        if (selectedProducts[item.defaultSkuCMS]) {
          selectedProducts[item.defaultSkuCMS].qty += item.qty;
        } else {
          selectedProducts[item.defaultSkuCMS] = {
            ...pickProductProps(item),
          };
        }
      });
      this.props.setQuickPicksCollection({ selectedProducts });
    }
  };
  variationSortAlphabetically = (a, b) => {
    const aLabel = a.label;
    const bLabel = b.label;
    let c = 0;
    if (aLabel > bLabel) c = 1;
    else if (aLabel < bLabel) c = -1;
    return c;
  };
  handleUpdateProductQty = payload => {
    this.props.updateProductQty(payload);
  };
  /**
   * Renders product categories - Explore the room
   * @param {object} content Referred Content
   * @return {node}
   */
  renderProductCategories = () => {
    const { categories } = this.props.quickPicksCollection;
    const productCategoriesProps = pick(['components', 'title'], categories);
    return (
      <ProductCategories {...productCategoriesProps} justifyContent="left" />
    );
  };
  renderCollectionProductsHeader = () => {
    const {
      labels: propLabels,
      quickPicksCollection: { selectedProducts, isLoading },
      fromRecomendation,
    } = this.props;
    const products = this.getProducts();
    if (isLoading) {
      return null;
    }
    const TopRule = () => (
      <div className={classnames(styles.topRule, 'small-hide large-12')} />
    );
    const isMobile = CommonUtil.isMobileScreen(767);
    return (
      <GridContainer
        className={fromRecomendation && styles.quickPicksRecommendationHeader}
      >
        <GridX className={styles.collectionHeader}>
          <Fragment>
            {!fromRecomendation && (
              <div
                className={classnames(
                  !fromRecomendation && styles.quickPicksItemsHeader,
                  'large-6 small-12 cell'
                )}
              >
                {QUICK_PICKS_COLLECTION_LBL}
              </div>
            )}
            {!this.props.customerRegistryInfo.hasActiveRegistry &&
              !fromRecomendation && <TopRule />}
            {this.props.customerRegistryInfo.hasActiveRegistry && (
              <Fragment>
                <section
                  ref={this.setGridHeader}
                  className={classnames(
                    'justify-end small-12 cell',
                    fromRecomendation ? 'large-12' : 'flex large-6'
                  )}
                >
                  <AddItemsComponent
                    labels={propLabels}
                    quizLabels={{
                      RETAKE_QUIZ_LBL,
                      RETAKE_QUIZ_SUBCOPY_LBL,
                      QUIZ_RESULTS_LBL,
                    }}
                    addSelectedItems={this.props.addSelectedItemsToRegistry}
                    allItemsSelected={this.toggleSelectAllItems}
                    selectedItemsCount={Object.keys(selectedProducts).reduce(
                      (selectedCount, key) =>
                        selectedCount + selectedProducts[key].qty,
                      0
                    )}
                    totalItems={Object.keys(products).reduce(
                      (selectedCount, key) => selectedCount + products[key].qty,
                      0
                    )}
                    yThreshold={
                      this.gridHeader && !isMobile
                        ? this.gridHeader.offsetTop -
                          this.gridHeader.parentElement.offsetHeight
                        : 0
                    }
                    isRegistryFooterOpen={this.props.isRegistryFooterOpen}
                    isInternationalUser={this.isInternationalUser}
                    fromRecomendation={fromRecomendation}
                    personaType={this.props.personaType}
                    renderQuizQnALayout={this.props.renderQuizQnALayout}
                    isResponsive={this.props.isResponsive}
                  />
                </section>
                {!fromRecomendation && (
                  <Fragment>
                    <TopRule />
                    <Icon
                      className={
                        styles.addMultipleItemsRegistryCurvedArrowMobile
                      }
                      type="curved-arrow"
                    />
                    <div
                      className={classnames(
                        styles.addMultipleItemsRegistry,
                        'large-12 small-12'
                      )}
                    >
                      {ADD_MUL_ITEMS_HEADING_LBL}
                      <Icon
                        className={styles.addMultipleItemsRegistryCurvedArrow}
                        type="curved-arrow"
                      />
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        </GridX>
      </GridContainer>
    );
  };
  /**
   * Renders the Collection Tiles
   * @return {node}
   */
  renderCollectionProducts = () => {
    const {
      contextPath,
      channelType,
      dynamicPricing,
      customerRegistryInfo,
      labels,
      writeReview,
      reviews,
      onQuickViewButtonClick,
      addItemToActiveRegistry,
      quickPicksCollection: { selectedProducts, isLoading },
      selectProducts,
      setProductGridRender,
      renderItem,
    } = this.props;
    // Helper for managing tileActions
    const tileActions = () => ({
      addToCart: {
        label: ADD_TO_CART_LBL,
        handler: noop,
      },
      addToRegistry: {
        label: ADD_TO_REGISTRY_LBL,
        handler: addItemToActiveRegistry,
      },
      chooseOptions: {
        label: CHOOSE_OPTN_LBL,
        handler: onQuickViewButtonClick,
      },
      moreOptions: {
        label: PRODUCT_TILE_MORE_OPTIONS_LBL,
        handler: onQuickViewButtonClick,
      },
      quickView: {
        label: QUICKVIEW_LBL,
        handler: onQuickViewButtonClick,
      },
      selectProduct: {
        label: '',
        handler: selectProducts,
        selectedProducts,
      },
      updateProductQty: {
        label: '',
        handler: this.handleUpdateProductQty,
      },
    });
    const products = this.getProducts();
    return (
      <section className={classnames(styles.collectionViewport, 'mt2')}>
        {this.renderCollectionProductsHeader()}
        <ProductGrid
          className="mt0 py2"
          items={products}
          itemRenderer={renderProductTile}
          isLoading={isLoading}
          contextPath={contextPath}
          categoryId=""
          labels={labels}
          dynamicPrice={dynamicPricing && dynamicPricing.dynamicPricingFlag}
          tileActions={tileActions()}
          writeReview={writeReview}
          reviews={reviews}
          channelType={channelType}
          profileHasRegistries={customerRegistryInfo.hasActiveRegistry}
          switchConfig={null}
          sddOptions={null}
          isInternationalUser={this.isInternationalUser}
          setProductGridRender={setProductGridRender}
          renderItems={renderItem}
        />
      </section>
    );
  };
  /**
   * Remders a combo box of Quick Picks Registry Types
   *
   * @return {node}
   */
  renderQuickPickCollectionSwitcher = () => {
    const { quickPicksCollection, siteId } = this.props;
    const {
      category,
      registryType,
      collections,
      selectedCollection,
      cacheKey: canonicalUrl,
    } = quickPicksCollection;
    if (
      !isEmpty(collections) &&
      !isEmpty(selectedCollection) &&
      !isEmpty(registryType) &&
      !isEmpty(category)
    ) {
      // Category -> Registry Type -> Collection
      const links = [
        {
          text: decodeHtmlEntities(registryType.label).replace(
            /\w+/g,
            capitalize
          ),
          url: toQuickPicksLanding({
            registryType: registryType.id,
            registryName: sanitizeSearchTerm(registryType.label),
          }),
        },
        {
          text:
            decodeHtmlEntities(category.label).replace(/\w+/g, capitalize) ||
            parseSanitizedSearchTerm(category.id),
          url: toQuickPicksLanding({
            registryType: registryType.id,
            registryName: sanitizeSearchTerm(registryType.label),
            category: sanitizeSearchTerm(
              category.label || parseSanitizedSearchTerm(category.id)
            ),
          }),
        },
        {
          text: decodeHtmlEntities(selectedCollection.label).replace(
            /\w+/g,
            capitalize
          ),
          url: `/store/${selectedCollection.url}`,
        },
      ];
      const subCategories = collections.map(({ label, url }) => ({
        text: decodeHtmlEntities(label).replace(/\w+/g, capitalize),
        url: `/store/${url}`,
      }));
      const hostname = HOSTNAMES.get(siteId) || '';
      return (
        <section className="center mb2 mt3">
          {selectedCollection && (
            <Fragment>
              <TitleTags>
                {decodeHtmlEntities(selectedCollection.label).replace(
                  /\w+/g,
                  capitalize
                )}
              </TitleTags>
              <UrlTags>{`${hostname}${canonicalUrl}`}</UrlTags>
            </Fragment>
          )}
          <Breadcrumbs
            links={links}
            subCategories={subCategories}
            toNewUrl={this.onSwitchQuickPicksCollection}
            type="dropdown"
            displayH1Option
          />
        </section>
      );
    }
    return null;
  };
  renderError = () => <InternalServerErrorPage />;
  renderToastNotification = () => {
    const {
      quickPicksCollection: {
        toastNotification: { content },
      },
      customerRegistryInfo: { registry },
    } = this.props;
    /* Looping through the selected products array to fetch the actual quantity added for each product.
    These quantities are summated and returned to display the totalItems in toast notification. */
    const totalItems =
      content !== null ? content.reduce((acc, curr) => acc + curr.qty, 0) : 0;
    let renderableContent = null;
    if (!isEmpty(content)) {
      const id = addToRegistryQuickPicks(registry).registryId;
      const eventType = addToRegistryQuickPicks(registry).eventType;
      const toRegistryPath = compile(ROUTE_REGISTRY_OWNNER);
      const viewlink = toRegistryPath({ id });
      let skuAdded = '';
      if (content.length === 1) {
        skuAdded =
          content[0].selectedVariant > -1
            ? `?skuAdded=${
                content[0].variants
                  .slice()
                  .sort(this.variationSortAlphabetically)[
                  content[0].selectedVariant
                ].skuId
              }`
            : `?skuAdded=${content[0].defaultSkuCMS}`;
      }
      const title = decodeHtmlEntities(content[0].title);
      renderableContent = (
        <div className={styles.toastContentWrapper}>
          {totalItems === 1 ? (
            // The following div is required to address the white space between link and content Without the div, the content and text is joined without a space in between
            <div>
              <PrimaryLink
                variation="secondaryWhite"
                className={styles.toastItemsLink}
                href={`${viewlink}${skuAdded}`}
              >
                {truncate(title, ATR_CONF_MAX_CHAR_LENGTH_LBL)}
              </PrimaryLink>{' '}
              <span>{TOAST_SINGLE_MSG_LBL}</span>
            </div>
          ) : (
            <span>
              {LabelsUtil.replacePlaceholderValues(TOAST_MULTIPLES_MSG_LBL, [
                totalItems,
                eventType,
              ])}
            </span>
          )}
          <div className={styles.toastViewRegistryLinkWrapper}>
            <PrimaryLink
              variation="secondaryWhite"
              className={styles.toastViewRegistryLink}
              href={`${viewlink}${skuAdded}`}
            >
              {VIEW_REGISTRY_LBL}
            </PrimaryLink>
          </div>
        </div>
      );
    }
    return renderableContent;
  };
  renderHeroSkeleton = () => {
    const { channelType } = this.props;
    const height = channelType === CHANNELTYPE_DESKTOP ? 446 : 220;
    return (
      <section className="center">
        <div className="pt2">
          <SkeletonWrapper
            viewPort={{ height, width: '100%' }}
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            <rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width="100%"
              height={`${
                channelType === CHANNELTYPE_DESKTOP ? height : '166'
              }px`}
            />
            {channelType === CHANNELTYPE_MOBILE && (
              <rect x="20%" y="190" rx="11" ry="11" width="60%" height="22px" />
            )}
          </SkeletonWrapper>
        </div>
      </section>
    );
  };
  renderSkeletonGridheader = () => {
    const height = 200;
    const { channelType } = this.props;
    if (channelType === CHANNELTYPE_DESKTOP) {
      return wrapInGrid(
        <section className="mx-auto fullWidth mt1">
          <SkeletonWrapper
            viewPort={{ height, width: '100%' }}
            className="pt2"
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            <Fragment>
              <rect x="0" y="0" rx="4" ry="4" width="100%" height="4px" />
              <rect x="0" y="42" rx="10" ry="10" width="205px" height="28px" />
              <rect
                x="63.5%"
                y="38"
                rx="10"
                ry="10"
                width="37px"
                height="36px"
              />
              <rect x="68%" y="48" rx="10" ry="10" width="64px" height="16px" />
              <rect
                x="77.2%"
                y="30"
                rx="10"
                ry="10"
                width="22.8%"
                height="50px"
              />
              <rect x="0" y="90" rx="4" ry="4" width="100%" height="4px" />
              <rect
                x="60%"
                y="130"
                rx="14"
                ry="14"
                width="40%"
                height="28px"
              />{' '}
            </Fragment>
          </SkeletonWrapper>
        </section>
      );
    }
    return (
      <section className="mx-auto fullWidth">
        <SkeletonWrapper
          viewPort={{ height: 6, width: '100%' }}
          className="pt2"
          rectContainerHeight="100%"
          rectContainerWidth="100%"
          preserveAspectRatio="xMaxYMin meet"
          svgProps={{ viewBox: null }}
        >
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="20px" />
        </SkeletonWrapper>
        {wrapInGrid(
          <SkeletonWrapper
            viewPort={{ height: 300, width: '100%' }}
            className="pt2"
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            <Fragment>
              <rect x="0" y="0" rx="10" ry="10" width="205px" height="20px" />
              <rect x="0" y="36" rx="4" ry="4" width="100%" height="4px" />
              <rect x="0" y="56" rx="10" ry="10" width="37px" height="36px" />
              <rect x="48" y="65" rx="10" ry="10" width="64px" height="16px" />
              <rect x="0" y="110" rx="10" ry="10" width="100%" height="50px" />
              <rect x="20%" y="210" rx="11" ry="11" width="60%" height="22px" />
              <rect
                x="20%"
                y="240"
                rx="11"
                ry="11"
                width="60%"
                height="22px"
              />{' '}
            </Fragment>
          </SkeletonWrapper>
        )}
      </section>
    );
  };
  renderSkeletonStyles = () => {
    const { channelType } = this.props;
    return (
      <section className="center">
        <div className="pt4">
          <SkeletonWrapper
            viewPort={{ height: 120, width: '100%' }}
            rectContainerHeight="100%"
            rectContainerWidth="100%"
            preserveAspectRatio="xMaxYMin meet"
            svgProps={{ viewBox: null }}
          >
            {channelType === CHANNELTYPE_DESKTOP && (
              <Fragment>
                <rect x="46%" y="0" rx="8" ry="8" width="8%" height="16px" />
                <rect
                  x="40%"
                  y="36"
                  rx="19"
                  ry="19"
                  width="20%"
                  height="38px"
                />
              </Fragment>
            )}
            {channelType === CHANNELTYPE_MOBILE && (
              <Fragment>
                <rect x="30%" y="0" rx="8" ry="8" width="40%" height="16px" />
                <rect x="30%" y="22" rx="8" ry="8" width="40%" height="16px" />
                <rect
                  x="20%"
                  y="54"
                  rx="11"
                  ry="11"
                  width="60%"
                  height="20px"
                />
              </Fragment>
            )}
          </SkeletonWrapper>
        </div>
        {wrapInGrid(this.renderHeroSkeleton())}
        {this.renderSkeletonGridheader()}
      </section>
    );
  };
  render = () => {
    const {
      quickPicksCollection: { isLoading, error, hero, selectedCollection },
      labels,
      channelType,
      content,
      isLoggedIn,
      loadContent,
      isPickupInStoreModalOpen,
      siteId,
      fromRecomendation,
      labelsRef,
      enableCSLabels,
    } = this.props;
    let loader = null;
    if (isLoading) {
      loader = this.renderSkeletonStyles();
    }
    if (!isEmpty(error)) {
      switch (error.type) {
        case ERROR_QUICK_PICKS_COLLECTION_NOT_FOUND:
          return <Redirect to={NotFoundHttpErrorPath} />;
        default:
          return this.renderError();
      }
    }
    if (fromRecomendation) {
      return (
        <ErrorBoundary fallback={this.renderError()}>
          <div className="cell">{this.renderCollectionProducts()}</div>
          <div
            id="viewAllButton"
            className={classnames(
              styles.collectionViewport,
              styles.collectionViewAll,
              'px15'
            )}
          >
            <div className={styles.viewAllBtnContainer}>
              <Button
                className="fullWidth fol"
                dataLocator="registery-recommendation-see-all-cta"
                onClick={this.toggleMoreLessQuickPickItem}
              >
                {this.state.showMoreQuickPicks ? VIEW_LESS_LBL : VIEW_MORE_LBL}
              </Button>
            </div>
          </div>
          <QuickViewModalWrapper />
        </ErrorBoundary>
      );
    }
    return (
      <section>
        <ErrorBoundary fallback={this.renderError()}>
          {loader}
          {!isLoading && wrapInGrid(this.renderQuickPickCollectionSwitcher())}
          {!isLoading && wrapInGrid(renderSignInButton(this.props))}
          {!isLoading && wrapInGrid(renderQuickPickHero(hero))}
          {this.renderCollectionProducts()}
          {wrapInGrid(this.renderProductCategories())}
          {wrapInGrid(
            renderContentModules({
              labels,
              content,
              isLoggedIn,
              loadContent,
              siteId,
              labelsRef,
              enableCSLabels,
            })
          )}
          <QuickViewModalWrapper />
          <PickupInStoreModalWrapper
            findAStoreModal={!isPickupInStoreModalOpen}
            changeStore
          />
          <LeavePageConfirmationModal
            labels={labels}
            show={this.state.showLeavePageModal}
            onLeavePageSelected={this.onLeavePageSelected}
            channelType={channelType}
          />
        </ErrorBoundary>
        <QuickPickCollectionTealiumHandler
          collection={selectedCollection.label}
          fireTealium={this.state.fireTealium}
        />
      </section>
    );
  };
}
/**
 * @param {func} changeQuickPicksCollection Pushes a route change based on the selected registry type
 * @param {func} loadContent Loads content data from referred content / labels api
 * @param {bool} isLoggedIn Indicates is current user is authenticated
 * @param {array} quickPicksCollection.categories Contains categories data
 * @param {bool} quickPicksCollection.fetching Indicates that data is being fetched from endpoint
 * @param {array} quickPicksCollection.collections An array of available registry types
 * @param {string} quickPicksCollection.selectedCollection The currently selected registry type
 * @param {bool} quickPicksCollection.error Indicates if an error occurred when fetching data.
 * @param {array} quickPicksCollection.hero Contains hero data
 * @param {object} labels Contains label data.
 * @param {object} content Contains Referred Content data
 */
QuickPicksCollection.propTypes = {
  resetQuickPicksCollection: func,
  changeQuickPicksCollection: func,
  addItemToActiveRegistry: func,
  addSelectedItemsToRegistry: func,
  selectProducts: func,
  loadContent: func,
  setQuickPicksCollection: func,
  leavePage: func,
  updateProductQty: func,
  isLoggedIn: bool,
  quickPicksCollection: shape({
    categories: arrayOf(
      shape({
        label: string,
        image: string,
        collections: arrayOf(
          shape({
            label: string,
            image: string,
            url: string,
          })
        ),
      })
    ),
    fetching: bool,
    collections: arrayOf(
      shape({
        id: string,
        label: string,
        url: string,
      })
    ),
    selectedCollection: object,
    error: bool,
    selectedProducts: object, // TODO: Need shape
    hero: arrayOf(
      shape({
        title: object,
        description: object,
        image: shape({
          url: string,
          alt: string,
        }),
      })
    ),
    toastNotification: shape({
      content: any,
      show: bool,
    }),
  }),
  labels: object,
  content: object,
  contextPath: string,
  channelType: object,
  dynamicPricing: object,
  writeReview: object,
  reviews: object,
  onQuickViewButtonClick: func,
  customerRegistryInfo: shape({
    isLoggedIn: bool,
    customerId: string,
    registry: array,
    hasActiveRegistry: bool,
  }),
  history: shape({
    block: func,
  }),
  isPickupInStoreModalOpen: bool,
  isRegistryFooterOpen: bool,
  siteId: string,
  setProductGridRender: func,
  renderItem: bool,
  fromRecomendation: bool,
  personaType: string,
  renderQuizQnALayout: func,
  isResponsive: bool,
  labelsRef: object,
  enableCSLabels: bool,
};
QuickPicksCollection.defaultProps = {
  changeQuickPicksCollection: noop,
  resetQuickPicksCollection: noop,
  addItemToActiveRegistry: noop,
  loadContent: noop,
  addSelectedItemsToRegistry: noop,
  selectProducts: noop,
  setQuickPicksCollection: noop,
  updateProductQty: noop,
  isLoggedIn: false,
  siteId: '',
  content: {
    isFetching: false,
  },
  customerRegistryInfo: {
    isLoggedIn: false,
    customerId: '',
    registry: [],
    hasActiveRegistry: false,
  },
  quickPicksCollection: {
    collections: [],
    products: [],
    configuration: {},
    isLoading: false,
    selectedCollection: {},
    hero: [],
    categories: {},
    error: null,
    selectedProducts: {},
    previouselectedProducts: {},
    toastNotification: {
      content: null,
      show: false,
    },
    cacheHit: false,
  },
  labels: {
    alreadyLoggedIn: '_Log__ged in_',
    signIn: '__Sign_In__',
    startYourRegistry: '_Start Your Registry_',
    findARegistry: '_Find a Registry_',
    liveChat: '_Live Chat_',
    bookAppointment: '_Book Appointment_',
    customerSupportCTAHeader: '_Need Help?_',
    referredContent: [],
  },
  history: {
    block: noop,
  },
};
export default QuickPicksCollection;
