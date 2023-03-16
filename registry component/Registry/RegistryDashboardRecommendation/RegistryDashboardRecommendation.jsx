import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import Heading from '@bbb-app/core-ui/heading';
import CertonaProductGrid from '../../../CertonaProductGrid/CertonaProductGrid.async';
import styles from './RegistryDashboardRecommendation.css';
import { TOP_REGISTRY_ITEMS_LBL } from '../constants';
import {
  CHOOSE_OPT_CTA_LBL,
  ADD_TO_REG_CTA_LBL,
  ADDED_TO_REG_CTA_LBL,
} from '../../../PureContent/ProductCarousel/ProductCarouselConstant';

export default class RegistryDashboardRecommendation extends React.PureComponent {
  static propTypes = {
    certonaLabels: PropTypes.object,
    contextPath: PropTypes.string,
    deviceConfig: PropTypes.object,
    viewType: PropTypes.string,
    minimizeATCHandler: PropTypes.func,
    toggleATCHandler: PropTypes.func,
    onAddToCartFromCertona: PropTypes.func,
    tealiumATCInfo: PropTypes.object,
    fireTealiumAction: PropTypes.func,
    routeData: PropTypes.object,
    isATRRecommendations: PropTypes.bool,
    isWarrantyEnabled: PropTypes.bool,
    isPdpPersonalizeProduct: PropTypes.bool,
  };
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      isItemAddedToRegistry: false,
      isAddingQuickAddItemToList: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.quickItemAddedTS !== nextProps.quickItemAddedTS) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
    const {
      registryOwnerFirstCategoryList: currentData,
      variation,
    } = this.props;
    const { registryOwnerFirstCategoryList: newData } = nextProps;
    if (
      nextProps.isAddToRegistryFetching &&
      !this.props.isAddToRegistryFetching
    ) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
    if (
      !this.props.isAddToRegistryFetching &&
      this.isDataChanged(currentData, newData, variation)
    ) {
      this.setState({ isAddingQuickAddItemToList: false });
    }
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

  isDataChanged = (data, newData) => {
    return (
      JSON.stringify(pathOr([], '[0].registryItemList', data)) !==
      JSON.stringify(pathOr([], '[0].registryItemList', newData))
    );
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

  render() {
    const {
      content,
      certonaLabels,
      contextPath,
      deviceConfig,
      certonaConfig,
      atcRecommendationLabels,
      viewType,
      minimizeATCHandler,
      toggleATCHandler,
      onAddToCartFromCertona,
      fireTealiumAction,
      tealiumATCInfo,
      cartData,
      routeData,
      parentProductId,
      isATRRecommendations,
      isWarrantyEnabled,
      isPdpPersonalizeProduct,
      prodId,
    } = this.props;
    /* eslint react/prop-types: 0 */

    const recoExp = pathOr('', `recoExp`, content);
    const ctaLabels = {
      addToRegistry: ADD_TO_REG_CTA_LBL,
      chooseOptions: CHOOSE_OPT_CTA_LBL,
      addedToRegistry: ADDED_TO_REG_CTA_LBL,
    };
    const skuLookUpMap = this.createAddedItemLookUpMap();
    if (content && content.length) {
      return (
        <section className={classnames('pb3', styles.nextarrowAlignment)}>
          <Heading
            className={classnames('cell pb3', styles.topRegistryItems)}
            level={3}
            styleVariation="h3-sans"
          >
            {TOP_REGISTRY_ITEMS_LBL}
          </Heading>

          <CertonaProductGrid
            ctaLabels={ctaLabels}
            className={classnames('grid-container')}
            items={content}
            isItemAlreadyAddedToRegistry
            contextPath={contextPath}
            deviceConfig={deviceConfig}
            slidesToShow={6}
            atcRecommendationLabels={atcRecommendationLabels}
            certonaIdentifier={certonaConfig.scheme.ATC_Recommendation}
            viewType={viewType}
            minimizeATCHandler={minimizeATCHandler}
            toggleATCHandler={toggleATCHandler}
            onAddToCartFromCertona={onAddToCartFromCertona}
            certonaLabels={certonaLabels}
            fireTealiumAction={fireTealiumAction}
            tealiumATCInfo={tealiumATCInfo}
            cartData={cartData}
            routeData={routeData}
            parentProductId={parentProductId}
            isATRRecommendations={isATRRecommendations}
            isWarrantyEnabled={isWarrantyEnabled}
            isPdpPersonalizeProduct={isPdpPersonalizeProduct}
            contextProdId={prodId}
            recoExp={recoExp}
            hideIdeaboardIcon
            buttonLayout={'addToRegistry'}
            renderATCButtons
            isRegistryButton
            preventLabelOverride
            skuLookUpMap={skuLookUpMap}
            disableATRModal
            hideLoader
            isNeedToShowTotalItem
            isQuickItemAddingToRegistry={this.state.isAddingQuickAddItemToList}
          />
        </section>
      );
    }
    return null;
  }
}
