import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';

import Button from '@bbb-app/core-ui/button';
import { getStoreRef } from '@bbb-app/utils/storeRefUtils';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import ImgSrcSet from '@bbb-app/core-ui/image-src-set';
import isInternationalUser from '@bbb-app/utils/isInternationalUser';
import getConcatenatedScene7URLWithImageId from '@bbb-app/utils/getConcatenatedScene7URLWithImageId';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import {
  NON_SEARCH,
  NON_INTERNAL_CAMPAIGN,
  NON_BROWSE,
  NON_CROSSELL_PAGE,
} from '@bbb-app/tealium/constants';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import { PRODUCT_IMAGE_PLACEHOLDER } from '@bbb-app/constants/appConstants';
import PrimaryLinkContainer from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import Rating from '@bbb-app/rating/Rating';
import styles from './RegistryQuickAddProductTile.css';
import truncateWithEllipses from '../../../../../../utils/truncateWithEllipses';
import AddToRegistry from '../../../../../../containers/AddToRegistry/AddToRegistry.async';
import ChooseOptionWrapper from '../../../../../../containers/Pages/Registry/RegistryOwner/ChooseOptionWrapper.async';

const propTypes = {
  item: PropTypes.object,
  contextPath: PropTypes.string,
  hideATRFlag: PropTypes.bool,
  addToRegistryLbl: PropTypes.string,
  addedToRegistryLbl: PropTypes.string,
  isItemAlreadyAddedToRegistry: PropTypes.bool,
  labels: PropTypes.any,
  registryId: PropTypes.string,
  isAddToRegistryFetching: PropTypes.bool,
  isAddingQuickAddItemToList: PropTypes.bool,
  fromQuickAdd: PropTypes.bool,
  isQuickViewOpen: PropTypes.bool,
  quickAddATRState: PropTypes.bool,
  isPickupInStoreModalOpen: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
  enableCSLabels: PropTypes.bool,
};

export class RegistryQuickAddProductTile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isInternationalUser = isInternationalUser();
    this.handleProductClick = this.handleProductClick.bind(this);
    this.getClickProductTealiumParams = this.getClickProductTealiumParams.bind(
      this
    );
    this.toggleChooseOptionState = this.toggleChooseOptionState.bind(this);
    this.state = { toggleChooseOption: false };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isPickupInStoreModalOpen === false &&
      this.props.isPickupInStoreModalOpen === true
    ) {
      this.toggleChooseOptionState();
    }
  }

  getRole = () => {
    if (this.props.isItemAlreadyAddedToRegistry) {
      return 'text';
    }
    return null;
  };

  getClickProductTealiumParams() {
    const tealiumTags = {
      product_finding_method: 'Registry | Monetization',
      internal_search_term: NON_SEARCH,
      internal_campaign: NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PAGE,
      pdp_from_rm: true,
    };
    return tealiumTags;
  }

  getTheme() {
    if (this.props.isItemAlreadyAddedToRegistry) return 'primarySuccess';
    else if (
      ((this.props.isAddToRegistryFetching ||
        this.props.isAddingQuickAddItemToList) &&
        !this.props.quickAddATRState) ||
      this.isInternationalUser
    )
      return 'secondaryWhiteDeactivated';
    return 'secondaryStrokeBasic';
  }
  getChildren() {
    if (this.props.isItemAlreadyAddedToRegistry) {
      return this.props.addedToRegistryLbl;
    } else if (this.props.enableNewRegDashboard) {
      return null;
    }
    return this.props.addToRegistryLbl;
  }
  getClassName() {
    if (this.props.enableNewRegDashboard) {
      if (!this.props.isItemAlreadyAddedToRegistry) {
        return styles.plusIconAddedItem;
      }
      return styles.succColor;
    } else if (
      !this.props.enableNewRegDashboard &&
      !this.props.isItemAlreadyAddedToRegistry &&
      (this.props.isAddToRegistryFetching ||
        this.props.isAddingQuickAddItemToList)
    ) {
      return styles.quickAddToRegistryBtnDisabledState;
    }
    return `${styles.quickAddToRegistryBtn} ${
      this.props.isAddToRegistryFetching ? styles.quickAddToRegistryButton : ''
    }`;
  }
  getVariation() {
    if (this.props.isItemAlreadyAddedToRegistry) {
      return 'noTransition';
    } else if (this.props.enableNewRegDashboard) {
      return 'circle';
    }
    return 'inlineFlex';
  }
  openChooseOption = () => {
    this.setState({ toggleChooseOption: true });
  };
  toggleChooseOptionState = () => {
    if (this.state.toggleChooseOption)
      this.setState({ toggleChooseOption: false });
  };
  handleProductClick() {
    this.dispatchTealiumObjProductTealiumParams();
  }

  dispatchTealiumObjProductTealiumParams = () => {
    const store = getStoreRef();
    const getClickProductTealiumParams = this.getClickProductTealiumParams();
    const CALL_TO_ACTION = '';
    if (typeof store.dispatch === 'function') {
      store.dispatch(
        triggerTealiumEvent(CALL_TO_ACTION, getClickProductTealiumParams)
      );
    }
  };

  renderImage = () => {
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
      <ImgSrcSet
        className={this.props.enableNewRegDashboard && styles.imageProductTile}
        alt="displayTitle"
        srcSet={SRC_SET}
        imageSrc={IMAGE_SRC}
        scene7imageID={pathOr('', 'item.SCENE7_URL', this.props)}
        isScene7UrlPrefix
        lazyLoadOptions={{
          offset: 1500,
          placeholder: PRODUCT_IMAGE_PLACEHOLDER,
        }}
        lazyLoad
      />
    );
  };

  renderRating = (review, href, rating) => {
    return (
      <React.Fragment>
        {review > 0 && (
          <PrimaryLinkContainer
            href={`${href}${'#reviews'}`}
            elementClicked={'Reviews'}
            className={classnames(styles.ratingReview, 'fol')}
          >
            <Rating
              className={styles.rating}
              total={review}
              height={'11px'}
              value={parseFloat(rating) / 5}
              title={'rating'}
              dataLocator={'product_tile_rating'}
              isNavigable={false}
            />
          </PrimaryLinkContainer>
        )}
      </React.Fragment>
    );
  };

  renderChooseOption = () => {
    return (
      <div className={classnames(styles.marginTop, 'grid-x justify-center')}>
        <Button
          theme={this.getTheme()}
          className={styles.quickAddToRegistryBtn}
          onClick={this.openChooseOption}
        >
          {this.props.isItemAlreadyAddedToRegistry
            ? this.props.addedToRegistryLbl
            : 'Choose Option'}
        </Button>
      </div>
    );
  };
  renderChooseOptionModal = () => {
    return (
      this.state.toggleChooseOption && (
        <ChooseOptionWrapper
          registryId={this.props.registryId}
          fromQuickAdd={this.props.fromQuickAdd}
          isQuickViewOpen={this.props.isQuickViewOpen}
          productID={this.props.item.PRODUCT_ID}
          scene7Url={this.props.item.SCENE7_URL}
          toggleChooseOptionState={this.toggleChooseOptionState}
        />
      )
    );
  };

  render() {
    const {
      item,
      contextPath,
      hideATRFlag,
      enableNewRegDashboard,
    } = this.props;
    const DangerousHTML = dangerousHTML(DangerousHTML);
    const {
      DISPLAY_NAME: displayName,
      SEO_URL: pdpURL,
      IS_PRICE: price,
      PRODUCT_ID: productID,
      SKU_ID: skuID,
      RATINGS: rating,
      REVIEWS: review,
      SCENE7_URL,
      TYPE,
    } = item;
    const imageUrl = [getConcatenatedScene7URLWithImageId(SCENE7_URL)];
    const addToRegistryButton = (
      <div
        className={classnames(
          styles.marginTop,
          !enableNewRegDashboard && 'grid-x'
        )}
      >
        <AddToRegistry
          enableNewRegDashboard={enableNewRegDashboard}
          isLazyLoad={false}
          ltlFlag="false"
          registryId={this.props.registryId}
          registryLabels={
            this.props.enableCSLabels
              ? this.props.labels
              : this.props.labels && this.props.labels.createRegistry
          }
          skuId={skuID && skuID.toString()}
          prodId={productID ? productID.toString() : ''}
          isCustomizationRequired={false}
          price={price}
          imageUrl={imageUrl}
          ltlShipMethod={null}
          refNum={''}
          isATRRM
          disableATRModal
          selectedProduct={{
            SKU_SCENE7_URL: SCENE7_URL,
            DISPLAY_NAME: displayName,
            SKU_DISPLAY_NAME: displayName,
          }}
          calledFromRegistry
          addToRegistryState={{
            data: '',
            error: '',
            productId: '',
          }}
          qty={1}
          ctaType="button"
          quickAddToRegistry
          buttonProps={{
            disabled: !!this.isInternationalUser,
            attr: {
              iconProps: enableNewRegDashboard && {
                type: !this.props.isItemAlreadyAddedToRegistry && 'plus',
                height: '10',
                width: '10',
              },
              variation: this.getVariation(),
              theme: !enableNewRegDashboard && this.getTheme(),
              className: this.getClassName(),
              role: this.getRole(),
            },
            children: this.getChildren(),
          }}
          preventLabelOverride
        />
      </div>
    );
    const productDetails = (
      <Fragment>
        <div
          className={
            enableNewRegDashboard ? styles.productPrice : styles.productHeading
          }
        >
          {price}
        </div>
        <div className="pb1">
          <PrimaryLink
            href={`${contextPath}${pdpURL}`}
            onClick={this.handleProductClick}
            className={styles.productName}
          >
            <DangerousHTML>{`${truncateWithEllipses({
              str: displayName,
              len: enableNewRegDashboard ? 25 : 35,
              isEllipses: true,
            })}`}</DangerousHTML>
          </PrimaryLink>
          {enableNewRegDashboard &&
            this.renderRating(review, `${contextPath}${pdpURL}`, rating)}
        </div>
      </Fragment>
    );
    return enableNewRegDashboard ? (
      <div className={styles.tileContainer}>
        {this.renderImage()}
        {TYPE === 'MSWP' && !this.props.isItemAlreadyAddedToRegistry
          ? this.renderChooseOption()
          : !hideATRFlag &&
            !this.props.isItemAlreadyAddedToRegistry &&
            addToRegistryButton}
        {productDetails}
        {this.props.isItemAlreadyAddedToRegistry && (
          <div className={classnames(' py1', styles.succColor)}>
            {'Added to Registry'}
          </div>
        )}
        {this.renderChooseOptionModal()}
      </div>
    ) : (
      <GridX className={'fullHeight'}>
        <Cell className="large-5">{this.renderImage()}</Cell>
        <Cell
          className={classnames(
            styles.desc,
            'large-7 lg-pl2 lg-pr1 flex flex-column'
          )}
        >
          {productDetails}
          {TYPE === 'MSWP'
            ? this.renderChooseOption()
            : !hideATRFlag && addToRegistryButton}
          {this.renderChooseOptionModal()}
        </Cell>
      </GridX>
    );
  }
}

RegistryQuickAddProductTile.propTypes = propTypes;

export default RegistryQuickAddProductTile;
