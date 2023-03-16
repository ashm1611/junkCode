import React from 'react';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import ProductTile from './ProductTile';
import { LAZY_LOAD_SKIP } from '../../../../../ProductTile/constants';
import {
  CHOOSE_OPTN_LBL,
  CUSTOMIZE_PRICE_LBL,
  DISCOUNTED_CART_LBL,
  FULL_PRICE_CART_LBL,
  MORE_OPTIONS_LBL,
  PRICE_TBD_LBL,
  PRICE_VARIATION_LBL,
} from '../constants';
import { PRICE_WAS_LBL } from '../../../../../Pages/Compare/ComparePage/CompareProductTile/constants';
export const renderProductTile = (item, index, itemProps) => {
  const { categoryId, labels, switchConfig, enableCSLabels } = itemProps;
  return (
    <ProductTile
      {...item}
      actions={itemProps.tileActions}
      contextPath={itemProps.contextPath}
      categoryId={categoryId && categoryId[categoryId.length - 1]}
      searchTerm={itemProps.searchTerm}
      writeReview={itemProps.writeReview}
      profileHasRegistries={itemProps.profileHasRegistries}
      channelType={itemProps.channelType}
      switchConfig={switchConfig}
      sddOptions={itemProps.sddOptions}
      labels={labels}
      swatchOptions={MORE_OPTIONS_LBL}
      newOption_PreOrder={LabelsUtil.getLabel(
        labels,
        enableCSLabels ? 'newOption_PreOrder' : 'productTile.newOption_PreOrder'
      )}
      preorder={LabelsUtil.getLabel(
        labels,
        enableCSLabels ? 'preorder' : 'productTile.preorder'
      )}
      preOrder_EstimatedDate={LabelsUtil.getLabel(
        labels,
        enableCSLabels
          ? 'preOrder_EstimatedDate'
          : 'productTile.preOrder_EstimatedDate'
      )}
      shippingLabels={{
        someSkusFreeShippingMessage: LabelsUtil.getLabel(
          labels,
          enableCSLabels
            ? 'someSkusFreeShippingMessage'
            : 'productTile.someSkusFreeShippingMessage'
        ),
        freeShippingMessage: LabelsUtil.getLabel(
          labels,
          enableCSLabels
            ? 'freeShippingMessage'
            : 'productTile.freeShippingMessage'
        ),
      }}
      chooseOptionsLabel={CHOOSE_OPTN_LBL}
      priceLabels={{
        priceVariations: PRICE_VARIATION_LBL,
        was: PRICE_WAS_LBL,
        discountedInCart: DISCOUNTED_CART_LBL,
        fullPriceInCart: FULL_PRICE_CART_LBL,
        pricetbd: PRICE_TBD_LBL,
        customizePrice: CUSTOMIZE_PRICE_LBL,
      }}
      lazyLoad={itemProps.lazyLoad || index >= LAZY_LOAD_SKIP}
      dynamicPrice={itemProps.dynamicPrice}
      selected={false}
      header={LabelsUtil.getLabel(labels, 'productTileHeader')}
      headerTooltip={itemProps.badgeDescription}
      isInternationalUser={itemProps.isInternationalUser}
    />
  );
};
