import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Accordion from '@bbb-app/core-ui/accordion/Accordion';
import Icon from '@bbb-app/core-ui/icon/Icon';
import CertonaProductGrid from '../../../CertonaProductGrid/CertonaProductGrid.async';
import styles from './RegistryDetailModalRecommendation.css';
import { renderBar } from '../RegistryOwnerModal/RegistryOwnerModalUtil';
import {
  CHOOSE_OPT_CTA_LBL,
  ADD_TO_REG_CTA_LBL,
  OTHER_RECOMM_LBL,
} from '../../../PureContent/ProductCarousel/ProductCarouselConstant';
export default class RegistryDetailModalRecommendation extends React.PureComponent {
  static propTypes = {
    certonaLabels: PropTypes.object,
    contextPath: PropTypes.string,
    deviceConfig: PropTypes.object,
    viewType: PropTypes.string,
    minimizeATCHandler: PropTypes.func,
    toggleATCHandler: PropTypes.func,
    onAddToCartFromCertona: PropTypes.func,
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
    const { registryOwnerFirstCategoryList: currentData } = this.props;
    const { registryOwnerFirstCategoryList: newData } = nextProps;
    if (
      nextProps.isAddToRegistryFetching &&
      !this.props.isAddToRegistryFetching
    ) {
      this.setState({ isAddingQuickAddItemToList: true });
    }
    if (
      !this.props.isAddToRegistryFetching &&
      this.isDataChanged(currentData, newData)
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
      cartData,
      routeData,
      parentProductId,
      isATRRecommendations,
      isWarrantyEnabled,
      isPdpPersonalizeProduct,
      prodId,
    } = this.props;
    /* eslint react/prop-types: 0 */
    const enableNewRegDashboard = pathOr(
      false,
      'enableNewRegDashboard',
      this.props.registryModalData
    );
    const recoExp = pathOr('', `recoExp`, content);
    const ctaLabels = {
      addToRegistry: ADD_TO_REG_CTA_LBL,
      chooseOptions: CHOOSE_OPT_CTA_LBL,
      addedToRegistry: LabelsUtil.getLabel(certonaLabels, 'addedToRegistryCTA'),
    };
    const skuLookUpMap = this.createAddedItemLookUpMap();
    if (
      content &&
      content.length &&
      this.props.registryModalData.itemType !== 'CSH'
    ) {
      return (
        <React.Fragment>
          {!enableNewRegDashboard && renderBar(styles.barStyle)}
          <Accordion
            accordion={false}
            noBorder
            showExpanded
            className={styles.editFormAccordion}
            showExpandCollapseIcon={false}
            expandCollapseIconPos="right"
            expandCollapseIcons={{
              expand: (
                <Icon
                  type={enableNewRegDashboard ? 'caret' : 'plus'}
                  width="16px"
                  height="16px"
                  className={
                    !enableNewRegDashboard && styles.accordianIconStyle
                  }
                />
              ),
              collapse: (
                <Icon
                  type={enableNewRegDashboard ? 'caret' : 'minus'}
                  width="16px"
                  height="16px"
                  className={
                    enableNewRegDashboard
                      ? styles.collapseStyle
                      : styles.accordianIconStyle
                  }
                />
              ),
            }}
            data={[
              {
                title: (
                  <div className={styles.nextarrowAlignment}>
                    <div
                      className={classnames('cell', styles.topRegistryItems)}
                    >
                      {OTHER_RECOMM_LBL}
                    </div>
                  </div>
                ),
                body: (
                  <div
                    className={classnames(
                      styles.editFormSection,
                      styles.fieldStyle,
                      'pb1'
                    )}
                  >
                    <CertonaProductGrid
                      ctaLabels={ctaLabels}
                      className={styles.registryOwnerModalRecomm}
                      items={content}
                      isItemAlreadyAddedToRegistry
                      contextPath={contextPath}
                      deviceConfig={deviceConfig}
                      slidesToShow={3}
                      atcRecommendationLabels={atcRecommendationLabels}
                      certonaIdentifier={
                        certonaConfig.scheme.ATC_Recommendation
                      }
                      viewType={viewType}
                      minimizeATCHandler={minimizeATCHandler}
                      toggleATCHandler={toggleATCHandler}
                      onAddToCartFromCertona={onAddToCartFromCertona}
                      certonaLabels={certonaLabels}
                      labels={certonaLabels}
                      fireTealiumAction={fireTealiumAction}
                      cartData={cartData}
                      routeData={routeData}
                      parentProductId={parentProductId}
                      isATRRecommendations={isATRRecommendations}
                      isWarrantyEnabled={isWarrantyEnabled}
                      isPdpPersonalizeProduct={isPdpPersonalizeProduct}
                      contextProdId={prodId}
                      recoExp={recoExp}
                      hideIdeaboardIcon
                      buttonLayout="addToRegistry"
                      renderATCButtons
                      isRegistryButton
                      preventLabelOverride
                      skuLookUpMap={skuLookUpMap}
                      disableATRModal
                      hideLoader
                      isNeedToShowTotalItem
                      slide={false}
                      isQuickItemAddingToRegistry={
                        this.state.isAddingQuickAddItemToList
                      }
                      isLazyLoad={false}
                      enableGroupByRecommendation
                      enableNewRegDashboard={enableNewRegDashboard}
                    />
                  </div>
                ),
                expanded: true,
              },
            ]}
          />
        </React.Fragment>
      );
    }
    return null;
  }
}
