import React from 'react';
import { renderToString } from 'react-dom/server';
import { compose } from 'redux';
import classnames from 'classnames';
import { isEmpty, isArray, isEqual } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Icon from '@bbb-app/core-ui/icon';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import SEOUtil from '@bbb-app/utils/SEOUtil';
import { isNull, getSiteId } from '@bbb-app/utils/common';
import { withSiteSpectTracker } from '@bbb-app/site-spect/Experiment';
import getReferredContentForBrandExclusion from '@bbb-app/utils/getReferredContentForBrandExclusion';
import Skeleton from '../../PDP/ProductDetails/Skeleton';
import { propTypes } from '../../PDP/ProductDetails/ProductDetailsUtil';
import { getPreLoadImagePDP } from '../../PDP/ProductDetails/ExtendedProductDetailsUtil';
import removeRefNumForVendorPrice from '../../PDP/ProductDetails/Utils/removeRefNumForVendorPrice';
import { NO_SIZE, NO_SWATCH } from '../../../../constants/CallToAction';
import styles from './RegistryProductDetails.css';
import ProductBadging from '../../../../containers/ProductBadging/ProductBadging';
import ProductMediaCarousel from '../../PDP/ProductDetails/Components/ProductMediaCarousel';
import RegistryDetailModalLayout from './RegistryDetailModalLayout/RegistryDetailModalLayout';
import { getProductRating } from './RegistryDetailModalUtil/RegistryDetailModalUtil';
import truncateWithEllipses from '../../../../utils/truncateWithEllipses';
import {
  FAVORITE_REGISTRY_CANADA_LBL,
  FAVOURITE_REGISTRY_LBL,
} from '../ProductGridTile/constants';

const FavouriteButton = siteId => (
  <Icon
    height="30px"
    width="23px"
    type={siteId === 'BuyBuyBaby' ? 'star-double' : 'heart-double'}
  />
);
const isCanada = getSiteId() === 'BedBathCanada';
const defaultProps = {
  selectedProduct: null,
  isFetching: false,
  error: null,
  transitionData: null,
  enableCache: false,
};
const defaultState = {
  isFetching: true,
  hasError: false,
  checkOOS: false,
  swatchError: '',
  callToAction: {
    error: {
      NO_SWATCH: '',
      NO_SIZE: '',
      NO_LTL: '',
    },
  },
  callToActionValue: '',
  isClient: false,
  isPdpPersonalizeProduct: true,
  ux3Fired: false,
  isSubscriptionSelected: false,
  isRecQtyTrackTrigger: false,
};

export class RegistryProductDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    /**
     * Abtest Siteinspect: In the PDP page, presented info regarding the recommended quantity
     * to be added to registry as per IC. Only applicable when user navigate
     * from interactive checklist to PLP and then PDP.
     */
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ isClient: true });
    const labels = this.props.labels;
    const referredContent = pathOr([], 'referredContent', labels);
    this.contentId = [];

    const coverContent = referredContent.find(
      content => content.key === 'brandexclusionlist'
    );
    if (!isEmpty(coverContent)) {
      this.contentId.push(coverContent.id);
    }
    const brandExclusionListArray = getReferredContentForBrandExclusion(
      'brandexclusionlist',
      labels,
      this.props.referredContent
    );

    if (
      !isEmpty(this.contentId) &&
      isEmpty(brandExclusionListArray) &&
      typeof this.props.getContent === 'function'
    ) {
      this.props.getContent(this.contentId);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { selectedProduct, selectedSkuId } = this.props;
    if (
      selectedProduct !== nextProps.selectedProduct &&
      this.state.callToActionValue
    ) {
      const interimState = this.getUpdatedErrorState(nextProps);
      this.setState(interimState);
    }
    if (
      nextProps.selectedProduct &&
      nextProps.selectedSkuId &&
      nextProps.selectedProduct.LTL_FLAG === 'true' &&
      selectedSkuId !== nextProps.selectedSkuId
    ) {
      this.props.getLTLDetails(nextProps.selectedSkuId);
    }
    if (
      nextProps.selectedProduct.PRIMARY_CATEGORY &&
      nextProps.selectedProduct.PRIMARY_CATEGORY !==
        this.state.lastProductCategoryId
    ) {
      this.setState({
        lastProductCategoryId: nextProps.selectedProduct.PRIMARY_CATEGORY,
      });
      this.props.fetchRecommendedCategory(
        nextProps.selectedProduct.PRIMARY_CATEGORY
      );
    }

    if (isInternationalUser()) {
      const { vendorPriceDetails } = this.props;
      removeRefNumForVendorPrice(vendorPriceDetails);
      if (typeof this.props.resetVendorPriceDetails === 'function') {
        this.props.resetVendorPriceDetails();
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props, nextProps) || !isEqual(this.state, nextState)) {
      return true;
    }
    return false;
  }

  getUpdatedErrorState(nextProps) {
    const interimState = Object.assign({}, this.state);
    if (!isEmpty(nextProps.selectedSKU.colorVariation)) {
      interimState.callToAction.error[NO_SWATCH] = '';
    }
    if (nextProps.selectedSKU.sizeVariation) {
      interimState.callToAction.error[NO_SIZE] = '';
    }
    return interimState;
  }

  getImage(labels) {
    const {
      DISPLAY_NAME,
      ALT_IMG_SORTED,
      SCENE7_ALT_IMAGE_ID,
      MEDIA,
      SCENE7_URL,
      SKU_SCENE7_URL,
      IS_EVERLIVING,
      PRODUCT_ID,
      SKU_DISPLAY_NAME,
      SEO_URL,
      IS_PRICE,
      SKU_ID,
      DESCRIPTION,
    } = this.props.selectedProduct;
    const {
      vendorPriceDetails,
      fireTealiumAction,
      hideIdeaboardIcon,
      variation,
      registryProductInfo,
      noModeration,
      contextPath,
      redirectTo,
      isMobile,
      selectedIdeaboardItem,
      selectIdeaboardItemsData,
      getIdeaboardItems,
      closeModal,
      selectedSKU,
      selectedSkuId = '',
      registryId = '',
      isIdeaboardOwner,
      viewType,
    } = this.props;
    const customImageList = vendorPriceDetails
      ? vendorPriceDetails[0].images
      : undefined;
    const moderationStatus = vendorPriceDetails
      ? vendorPriceDetails[0]['moderation-status']
      : undefined;
    const altImagesList = SCENE7_ALT_IMAGE_ID || ALT_IMG_SORTED;
    const personalisedRefnum = vendorPriceDetails
      ? vendorPriceDetails[0].refnum
      : '';
    const { ltlSelection } = this.props.ltlData;
    const isCustomerImageAvailable =
      !isMobile &&
      pathOr(null, 'data.associate', this.props.socialAnnexData) === 'yes' &&
      pathOr(null, 'socialAnnex', this.props.switchConfig);

    let skuValue;
    if (SKU_ID && typeof SKU_ID === 'object') {
      skuValue = SKU_ID[0];
    } else {
      skuValue = SKU_ID;
    }
    const badgeData = () => {
      const { coOwner, owner } = registryProductInfo;
      const favouriteDispaly = coOwner ? `${owner} & ${coOwner}` : `${owner}`;
      return renderToString(
        <div data-locator={'registry-quick-view-item-fav-badge'}>
          {FavouriteButton(this.props.siteId)}
          <span className={styles.favText}>
            {`${truncateWithEllipses({
              str: LabelsUtil.replacePlaceholderValues(
                isCanada
                  ? FAVORITE_REGISTRY_CANADA_LBL
                  : FAVOURITE_REGISTRY_LBL,
                [favouriteDispaly]
              ),
              len: 30,
              isEllipses: true,
            })}`}
          </span>
        </div>
      );
    };

    return (
      <div
        className={styles.imageContainer}
        data-locator="productDetailImage"
        itemProp="description"
        content={DESCRIPTION}
      >
        <span className="hide" itemProp="sku" content={skuValue} />
        {registryProductInfo && registryProductInfo.markedAsFav && (
          <ProductBadging badge={badgeData()} />
        )}

        {!this.state.isClient && (
          <ProductMediaCarousel
            closeQuickViewModal={closeModal}
            selectedProduct={this.props.selectedProduct}
            selectedIdeaboardItem={selectedIdeaboardItem}
            selectIdeaboardItemsData={selectIdeaboardItemsData}
            getIdeaboardItems={getIdeaboardItems}
            altImages={altImagesList || []}
            media={MEDIA}
            viewportConfig={this.props.viewportConfig}
            scene7UrlConfig={this.props.scene7UrlConfig}
            tvPagesConfig={this.props.tvPagesConfig}
            mainImageId={SKU_SCENE7_URL || SCENE7_URL}
            labels={labels}
            imageDescription={DISPLAY_NAME}
            quickViewMode={this.props.quickViewMode}
            isEverliving={IS_EVERLIVING}
            productId={PRODUCT_ID}
            productPrice={IS_PRICE}
            productDisplayName={
              (isArray(SKU_DISPLAY_NAME) ? DISPLAY_NAME : SKU_DISPLAY_NAME) ||
              DISPLAY_NAME
            }
            skuId={pathOr(null, 'skuId', selectedSKU)}
            customImages={customImageList}
            isCustomerImageAvailable={isCustomerImageAvailable}
            personalisedRefnum={personalisedRefnum}
            ltlShippingMethod={ltlSelection}
            fireTealiumAction={fireTealiumAction}
            hideIdeaboardIcon={hideIdeaboardIcon}
            variation={variation}
            registryProductInfo={registryProductInfo}
            moderationStatus={moderationStatus}
            noModeration={noModeration}
            contextPath={contextPath}
            seoUrl={SEO_URL}
            redirectTo={redirectTo}
            isMobile={isMobile}
            selectedSKU={selectedSKU}
            selectedSkuId={selectedSkuId}
            registryId={registryId}
            ux3Fired={this.state.ux3Fired}
            viewType={viewType || 'PDP'}
          />
        )}
        {this.state.isClient && (
          <React.Fragment>
            <ProductMediaCarousel
              closeQuickViewModal={closeModal}
              selectedProduct={this.props.selectedProduct}
              selectedIdeaboardItem={selectedIdeaboardItem}
              selectIdeaboardItemsData={selectIdeaboardItemsData}
              getIdeaboardItems={getIdeaboardItems}
              altImages={altImagesList || []}
              media={MEDIA}
              viewportConfig={this.props.viewportConfig}
              scene7UrlConfig={this.props.scene7UrlConfig}
              tvPagesConfig={this.props.tvPagesConfig}
              mainImageId={SKU_SCENE7_URL || SCENE7_URL}
              labels={labels}
              imageDescription={DISPLAY_NAME}
              quickViewMode={this.props.quickViewMode}
              isEverliving
              productId={PRODUCT_ID}
              productPrice={IS_PRICE}
              productDisplayName={
                (isArray(SKU_DISPLAY_NAME) ? DISPLAY_NAME : SKU_DISPLAY_NAME) ||
                DISPLAY_NAME
              }
              skuId={pathOr(null, 'skuId', selectedSKU)}
              customImages={customImageList}
              isCustomerImageAvailable={isCustomerImageAvailable}
              personalisedRefnum={personalisedRefnum}
              ltlShippingMethod={ltlSelection}
              fireTealiumAction={fireTealiumAction}
              hideIdeaboardIcon={hideIdeaboardIcon}
              variation={variation}
              registryProductInfo={registryProductInfo}
              moderationStatus={moderationStatus}
              noModeration={noModeration}
              contextPath={contextPath}
              seoUrl={SEO_URL}
              redirectTo={redirectTo}
              isMobile={isMobile}
              selectedSKU={selectedSKU}
              selectedSkuId={selectedSkuId}
              registryId={registryId}
              isIdeaboardOwner={isIdeaboardOwner}
              ux3Fired={this.state.ux3Fired}
              viewType={viewType || 'PDP'}
            />
          </React.Fragment>
        )}
      </div>
    );
  }

  getRatingsandReviews(PRODUCT_ID, RATINGS, REVIEWS, labels) {
    const { AverageRatingMicroData } = SEOUtil;

    const {
      contextPath,
      selectedProduct,
      location,
      isMobile,
      switchConfig,
      fireTealiumAction,
      quickViewMode,
      variation,
      selectedSkuId,
      registryId,
      registryProductInfo,
      selectedSKU,
    } = this.props;
    this.hasReviews = REVIEWS > 0;
    const { SEO_URL, DISPLAY_NAME } = selectedProduct;
    const otherRatingProps = {
      AverageRatingMicroData,
    };

    return (
      <div className={classnames(styles.ratingsAndReview, 'mb1')}>
        {getProductRating({
          RATINGS,
          REVIEWS,
          labels,
          DISPLAY_NAME,
          otherRatingProps,
          location,
          isMobile,
          switchConfig,
          PRODUCT_ID,
          fireTealiumAction,
          quickViewMode,
          contextPath,
          SEO_URL,
          variation,
          selectedProduct,
          selectedSkuId,
          registryId,
          registryProductInfo,
          selectedSKU,
        })}
      </div>
    );
  }

  getProductLayout() {
    const { PRODUCT_ID, RATINGS, REVIEWS } = this.props.selectedProduct;
    const { labels, preLoadImage } = this.props;

    const ProductLayout = {
      Image: preLoadImage
        ? getPreLoadImagePDP(this.props)
        : this.getImage(labels),
      RatingsandReviews: this.getRatingsandReviews(
        PRODUCT_ID,
        RATINGS,
        REVIEWS,
        labels
      ),
    };
    return ProductLayout;
  }

  renderProductDetails() {
    const { ProductMicroData } = SEOUtil;
    return (
      <RegistryDetailModalLayout
        view={this.props.view}
        {...this.getProductLayout()}
        SEOMicroData={ProductMicroData}
        quickViewMode={this.props.quickViewMode}
        labels={this.props.labels}
        quickViewSwatchDetails={this.props.quickViewSwatchDetails}
        {...this.props.registryProductInfo}
        {...this.props}
      />
    );
  }
  render() {
    const {
      selectedProduct,
      quickViewMode,
      transitionData,
      productId,
      isFetching,
      enableCache,
    } = this.props;
    if (
      (isFetching && !enableCache) ||
      isNull(selectedProduct) ||
      isEmpty(selectedProduct)
    ) {
      return (
        <Skeleton
          view={this.props.view}
          transitionData={transitionData}
          productId={productId}
          quickViewMode={quickViewMode}
        />
      );
    }
    return <ErrorBoundary>{this.renderProductDetails()}</ErrorBoundary>;
  }
}

RegistryProductDetails.propTypes = propTypes;
RegistryProductDetails.defaultProps = defaultProps;

export default compose(withSiteSpectTracker)(RegistryProductDetails);
export { RegistryProductDetails as PureProductDetails };
