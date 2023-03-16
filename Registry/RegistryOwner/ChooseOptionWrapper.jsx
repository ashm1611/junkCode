import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import toJS from '@bbb-app/hoc/toJS';

import QuickViewModalWrapper from '../../../QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper.async';
import { fetchQuickViewProductDetails } from '../../../QuickViewModal/ActionWithSagaInjection';

export const ChooseOptionWrapper = ({
  fromQuickAdd,
  registryId,
  isQuickViewOpen,
  onQuickViewButtonClick,
  productID,
  scene7Url,
  toggleChooseOptionState,
}) => {
  useEffect(() => {
    const swatchDetails = {
      color: null,
      skuId: null,
      ltlMethod: null,
    };
    onQuickViewButtonClick(
      productID,
      'NORMAL',
      scene7Url,
      null,
      swatchDetails,
      1,
      '',
      undefined,
      true,
      ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const quickAddProps = {
    fromQuickAdd,
    ovRegistryId: registryId,
    toggleChooseOptionState,
  };

  return (
    fromQuickAdd &&
    isQuickViewOpen && <QuickViewModalWrapper quickAddProps={quickAddProps} />
  );
};

export const mapDispatchToProps = dispatch => ({
  onQuickViewButtonClick( //eslint-disable-line
    productId,
    productVariation,
    productUrl,
    registryProductInfo,
    swatchDetails,
    itemIndex,
    isCompare,
    nearestStoreAvailabilty,
    miniQuickViewMode,
    clickFromPLPTile,
    sponsored
  ) {
    dispatch(
      fetchQuickViewProductDetails(
        productId,
        productVariation,
        productUrl,
        registryProductInfo,
        swatchDetails,
        itemIndex,
        isCompare,
        nearestStoreAvailabilty,
        miniQuickViewMode,
        clickFromPLPTile,
        sponsored
      )
    );
  },
});

export default connect(null, mapDispatchToProps)(toJS(ChooseOptionWrapper));
