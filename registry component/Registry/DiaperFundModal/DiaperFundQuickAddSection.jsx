import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty, flatten, map } from 'lodash';
import GridContainer from '@bbb-app/core-ui/grid-container';
import GridX from '@bbb-app/core-ui/grid-x';
import {
  ADDED_TO_REGISTRY_LBL,
  ADD_TO_REGISTRY_LBL,
} from '@bbb-app/constants/registryConstants';
import RegistryDFQuickAddProductTile from './RegistryDFQuickAddProductTile';
import styles from '../RegistryOwner/RegistryQuickAddComponent/RegistryQuickAddComponent.css';
import Skeleton from '../RegistryOwner/RegistryQuickAddComponent/Skeleton/Skeleton';
const propTypes = {
  diaperFundProducts: PropTypes.array,
  isFetching: PropTypes.bool,
  isMobile: PropTypes.bool,
  registryOwnerFirstCategoryList: PropTypes.array,
  isAddingQuickAddItemToList: PropTypes.bool,
};

export class DiaperFundQuickAddSection extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.variation === 'Date' ||
      (!nextProps.isAddingQuickAddItemToList &&
        this.props.isAddingQuickAddItemToList)
    ) {
      return true;
    }
    return false;
  }

  /**
   * Create a sku lookup map of items added to registry
   */
  createAddedItemLookUpMap() {
    const { registryOwnerFirstCategoryList } = this.props;
    let lookUpMap = [];
    const itemKey = 'registryItemList';
    const categoryBuckets = registryOwnerFirstCategoryList;
    /* istanbul ignore else */
    if (!isEmpty(categoryBuckets)) {
      flatten(map(categoryBuckets, itemKey))
        .filter(item => item && item.deletedItem)
        .forEach(item => {
          lookUpMap = [
            ...lookUpMap,
            pathOr('', 'sKUDetailVO.skuId', item).toString(),
          ];
        });
    }
    return lookUpMap;
  }

  renderProductTile = (item, contextPath) => {
    const { registryOwnerFirstCategoryList: categoryBuckets } = this.props;
    const diaperFundSKUs =
      !isEmpty(categoryBuckets) && categoryBuckets[0].diaperFundSKUs;
    return (
      <RegistryDFQuickAddProductTile
        item={item}
        isItemAlreadyAddedToRegistry={
          !isEmpty(diaperFundSKUs) &&
          diaperFundSKUs.includes(item.SKU_ID) &&
          !this.skuLookUpMap.includes(item.SKU_ID)
        }
        contextPath={contextPath}
        addToRegistryLbl={ADD_TO_REGISTRY_LBL}
        addedToRegistryLbl={ADDED_TO_REGISTRY_LBL}
        {...this.props}
      />
    );
  };

  renderSection = (diaperFundProducts, contextPath) => {
    this.skuLookUpMap = this.createAddedItemLookUpMap();
    return this.props.isMobile ? (
      <div className={classnames('flex', styles.variationBMainWrapper)}>
        {diaperFundProducts &&
          diaperFundProducts.map(item => {
            return (
              <div
                className={classnames(
                  'inlineBlock',
                  'sm-mr1',
                  'sm-ml1',
                  styles.variationBWrapper
                )}
              >
                {this.renderProductTile(item, contextPath)}
              </div>
            );
          })}
      </div>
    ) : (
      <GridX className={classnames(styles.quickViewStyle, 'mt2')}>
        {diaperFundProducts &&
          diaperFundProducts.map(item => {
            return (
              <div className="inlineBlock">
                {this.renderProductTile(item, contextPath)}
              </div>
            );
          })}
      </GridX>
    );
  };

  renderQuickAddSection = ({ contextPath, diaperFundProducts }) => {
    return (
      <GridContainer className={classnames('mb3')}>
        {this.renderSection(diaperFundProducts, contextPath)}
      </GridContainer>
    );
  };
  render() {
    const { diaperFundProducts, isFetching } = this.props;
    if (isFetching) {
      return <Skeleton />;
    }

    if (!diaperFundProducts) {
      return null;
    }

    return this.renderQuickAddSection(this.props);
  }
}
DiaperFundQuickAddSection.propTypes = propTypes;
export default DiaperFundQuickAddSection;
