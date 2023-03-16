import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  BUYOFF_CONTEXT_STATE_KEY,
  COPY_SUCCESS_STATE_KEY,
  GIFT_GIVER_STATE_KEY,
} from './constants';

export const getBuyOffContext = state => state.get(BUYOFF_CONTEXT_STATE_KEY);
export const getGiftGiver = state => state.get(GIFT_GIVER_STATE_KEY, Map());
export const selectSiteConfig = state => {
  const siteConfig = state.get('viewportConfig');
  return siteConfig;
};

export const getBuyOffContextData = () =>
  createSelector(getBuyOffContext, context => context.get('buyOffContext'));

export const makeSelectBarcode = () => {
  return createSelector(selectSiteConfig, config => {
    const showBarcode = config.getIn([
      'siteConfig',
      'registry',
      'registryGuestLayout',
      'showBarcode',
    ]);
    return showBarcode === undefined ? true : showBarcode;
  });
};

export const makeAkamaiInfo = () => {
  const akamaiSelector = state => state.getIn(['akamaiHeader', 'data']);
  return createSelector(akamaiSelector, akamaiData => {
    return akamaiData;
  });
};

export const registryIsCopied = state => state.get(COPY_SUCCESS_STATE_KEY);

export const getCopyRegistryStatus = () => {
  return createSelector(registryIsCopied, registryCopied => {
    return registryCopied.get('serviceStatus');
  });
};

export const getCopyProductCount = () => {
  return createSelector(registryIsCopied, registryCopied => {
    return registryCopied.get('data');
  });
};

export const getItemsFetchingStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isFetchingFirst');
  });
};

export const isFilterItemReady = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isFilterItemReady');
  });
};

export const getSelectedCheckBoxFilter = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('checkBoxState');
  });
};

export const getFacetsData = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('facetsData');
  });
};

export const getRemainingItemsFetchingStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isFetchingRemaining');
  });
};

export const makeSelectFromFirstCategory = (pathArray, defaultVal = '0') =>
  createSelector(getGiftGiver, registryCopied =>
    registryCopied.get(pathArray, defaultVal)
  );

export const isSocialAnnexReady = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isSocialAnnexReady');
  });
};

export const getOosItemsFetchingStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isFetchingOos');
  });
};

export const getOosErrorStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('errorOos');
  });
};

export const getCategoryErrorStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('error');
  });
};

export const getSortedItemsFetchingStatus = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('isFetching');
  });
};

export const makeSelectFirstCategoryList = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('firstCategorydata');
  });
};

export const makeSelectOtherCategoryList = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('otherCategoriesData');
  });
};

export const makeSelectOosCategoryList = () => {
  return createSelector(getGiftGiver, registryCopied => {
    return registryCopied.get('oosCategoryData');
  });
};

export const selectSitespect = state => {
  const sitespect = state.get('sitespect');
  return sitespect;
};

export const makeSelectSitespectCampaigns = isClient =>
  createSelector(selectSitespect, state =>
    state.get(isClient ? 'assignedClientCampaigns' : 'assignedCampaigns')
  );

export const miniCartState = state => {
  return state.get('miniCartData', Map());
};

export const getMiniCart = () =>
  createSelector(miniCartState, miniCartData => miniCartData.get('data'));
