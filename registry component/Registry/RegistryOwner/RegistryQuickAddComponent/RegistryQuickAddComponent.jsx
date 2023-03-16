import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty, flatten, map } from 'lodash';
import GridContainer from '@bbb-app/core-ui/grid-container';
import { getStoreRef } from '@bbb-app/utils/storeRefUtils';
import Heading from '@bbb-app/core-ui/heading';
import GridX from '@bbb-app/core-ui/grid-x';
import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import CustomCarousel from '@bbb-app/carousel/CustomCarousel';
import {
  ADDED_TO_REGISTRY_LBL,
  ADD_TO_REGISTRY_LBL,
} from '@bbb-app/constants/registryConstants';
import { RegistryQuickAddProductTile } from './RegistryQuickAddProductTile/RegistryQuickAddProductTile';
import styles from './RegistryQuickAddComponent.css';
import inlineStyles from './RegistryQuickAddComponent.inline.css';
import Skeleton from './Skeleton/Skeleton';
import { RegistryQuickAddItemTealiumHandler } from '../../../../../containers/ThirdParty/Tealium/Registry/RegistryQuickAddItemTealiumHandler/RegistryQuickAddItemTealiumHandler';

const propTypes = {
  quickAddItems: PropTypes.object,
  isFetching: PropTypes.bool,
  isMobile: PropTypes.bool,
  registryOwnerFirstCategoryList: PropTypes.array,
  setTrackFlag: PropTypes.func,
  trackFlag: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
};
export class RegistryQuickAddComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.heading_LBL = {
      NW_MOB_LBL: ', here are some of our most requested items',
      QUICKPICK_HEADING_LBL:
        'Need Help Getting Started? Our Experts Recommend These Items...',
    };
    // carousel settings
    const newLayout = this.props.enableNewRegDashboard ? 5 : 4;
    this.settings = {
      dots: false,
      infinite: false,
      slide: true,
      slidesToShow: this.props.isMobile ? 2 : newLayout,
      slidesToScroll: 1,
      arrows: !this.props.isMobile,
      lazyLoad: false,
      touchMove: this.props.isMobile,
      draggable: false,
      nextArrowClass:
        this.props.enableNewRegDashboard && classnames(styles.slickNextArrow),
      prevArrowClass:
        this.props.enableNewRegDashboard && classnames(styles.slickPrevArrow),
    };
    this.getScrollArrowsTealiumParams = this.getScrollArrowsTealiumParams.bind(
      this
    );
    this.dispatchTealiumObjRegistryArrow = this.dispatchTealiumObjRegistryArrow.bind(
      this
    );
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.variation === 'Category' &&
      nextProps.registryOwnerFirstCategoryList &&
      nextProps.registryOwnerFirstCategoryList.length > 1
    ) {
      return true;
    } else if (nextProps.variation === 'Date') {
      return true;
    }
    return false;
  }
  getScrollArrowsTealiumParams() {
    const tealiumTags = {
      reg_scroll_monetization: true,
    };
    return tealiumTags;
  }
  dispatchTealiumObjRegistryArrow = () => {
    const store = getStoreRef();
    const getScrollArrowsTealiumParams = this.getScrollArrowsTealiumParams();
    const CALL_TO_ACTION = '';
    if (typeof store.dispatch === 'function') {
      store.dispatch(
        triggerTealiumEvent(CALL_TO_ACTION, getScrollArrowsTealiumParams)
      );
    }
  };
  /**
   * Create a sku lookup map of items added to registry
   */
  createAddedItemLookUpMap() {
    const { registryOwnerFirstCategoryList } = this.props;
    const lookUpMap = {};
    const itemKey = 'registryItemList';
    const categoryBuckets = registryOwnerFirstCategoryList;
    if (!isEmpty(categoryBuckets)) {
      flatten(map(categoryBuckets, itemKey))
        .filter(item => item && !item.deletedItem)
        .forEach(item => {
          lookUpMap[pathOr('', 'sKUDetailVO.skuId', item).toString()] = true;
        });
    }
    return lookUpMap;
  }
  fireTealiumView() {
    if (this.props.trackFlag && this.props.setTrackFlag) {
      this.props.setTrackFlag(false);
      return <RegistryQuickAddItemTealiumHandler />;
    }
    return null;
  }
  renderProductTile = (quickAddItems, key, contextPath) => {
    return (
      <RegistryQuickAddProductTile
        item={quickAddItems[key]}
        isItemAlreadyAddedToRegistry={quickAddItems[key].SKU_ID.some(
          skuid => this.skuLookUpMap[skuid]
        )}
        key={key}
        contextPath={contextPath}
        addToRegistryLbl={ADD_TO_REGISTRY_LBL}
        addedToRegistryLbl={
          this.props.enableNewRegDashboard
            ? `${ADDED_TO_REGISTRY_LBL} ${'!'}`
            : ADDED_TO_REGISTRY_LBL
        }
        {...this.props}
      />
    );
  };
  renderVariationB = (
    maxTileCountVariationB,
    quickAddItems,
    contextPath,
    quickAddProductsData
  ) => {
    this.skuLookUpMap = this.createAddedItemLookUpMap();
    const itemsToRenderKeys = Object.keys(quickAddItems);
    const newArr = [];
    quickAddProductsData.map(key => {
      itemsToRenderKeys.map(item => {
        if (key.product_id === item) {
          newArr.push(key.product_id);
        }
        return newArr;
      });

      return null;
    });
    const itemsToRenderProductKeys = newArr.splice(0, maxTileCountVariationB);
    return this.props.isMobile ? (
      <div className={classnames('flex pb2', styles.variationBMainWrapper)}>
        {itemsToRenderProductKeys.map(key => {
          return (
            <div
              className={classnames(
                'inlineBlock',
                !this.props.enableNewRegDashboard && 'sm-mr3',
                this.props.enableNewRegDashboard
                  ? styles.newRegVariationBWrapper
                  : styles.variationBWrapper
              )}
            >
              {this.renderProductTile(quickAddItems, key, contextPath)}
            </div>
          );
        })}
      </div>
    ) : (
      <CustomCarousel
        className={classnames(styles.arrowButton, styles.arrowButtonposition)}
        ref={slider => (this.slider = slider)}
        {...this.settings}
      >
        {itemsToRenderProductKeys.map(key => {
          return (
            <div className="inlineBlock">
              {this.renderProductTile(quickAddItems, key, contextPath)}
            </div>
          );
        })}
      </CustomCarousel>
    );
  };
  renderHeadingIcon = () => {
    const heading = pathOr(
      'expert picks for you',
      'moduleData.headline',
      this.props
    );
    return this.props.enableNewRegDashboard ? (
      <div className="relative pl1 sm-pb2">
        <Heading level={3} className={styles.pageHeadingNew}>
          {heading}
        </Heading>
      </div>
    ) : (
      <GridX className="mb2 relative">
        <Heading
          level={2}
          styleVariation={'h3-serif'}
          className={classnames('mt1 mb1 ml-auto mr-auto sm-center sm-mr3')}
        >
          {this.heading_LBL.QUICKPICK_HEADING_LBL}
        </Heading>
        {/** cross icon button functionality has been suppresses as per requirement for REG-4930*/}
      </GridX>
    );
  };
  renderVariationComponent = ({
    quickAddItems,
    maxTileCountVariationB,
    contextPath,
    enableQuickAdd,
    quickAddProductsData,
    enableNewRegDashboard,
  }) => {
    const quickAddItem = quickAddItems;
    if (enableQuickAdd) {
      return (
        <GridContainer
          className={classnames(
            'mb2',
            styles.container,
            inlineStyles.container,
            enableNewRegDashboard && styles.pageContainerNew
          )}
        >
          {this.renderHeadingIcon()}
          {this.renderVariationB(
            maxTileCountVariationB,
            quickAddItem,
            contextPath,
            quickAddProductsData
          )}
          {this.fireTealiumView()}
        </GridContainer>
      );
    }
    return null;
  };
  render() {
    const { quickAddItems, isFetching } = this.props;
    if (isFetching) {
      return <Skeleton />;
    }
    if (!quickAddItems) {
      return null;
    }
    return this.renderVariationComponent(this.props);
  }
}
RegistryQuickAddComponent.propTypes = propTypes;
export default RegistryQuickAddComponent;
