import { takeLatest, put, select, call, all } from 'redux-saga/effects';
import { isEmpty, has, getOr } from 'lodash/fp';
import { compile } from 'path-to-regexp';
import { replace } from 'connected-react-router';
import { isBrowser } from '@bbb-app/utils/common';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import sanitizeSearchTerm from '@bbb-app/utils/sanitizeSearchTerm';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { ROUTE_REGISTRY_QUICK_PICKS_LANDING } from '@bbb-app/constants/route/route';
import { FETCH_QUICK_PICKS } from './constants';
import { setQuickPicks } from './actions';
import {
  registryQuickPicksLandingConfigSelector,
  registryQuickPicksSelector,
} from './selectors';
import { scrollSelectorUnderNavigation } from '../../../../../utils/quickPicks';

const isPreviewEnv = isPreview => {
  /* eslint-disable no-underscore-dangle */
  /* istanbul ignore next */
  const isPreviewMode =
    !isPreview && typeof window !== 'undefined'
      ? window.__IS_PREVIEW__
      : isPreview === true;

  return isPreviewMode;
};

/**
 * Fetches registry types from Quicks Picks API
 *
 * @return {object}
 */
export function* fetchRegistryTypes(siteId) {
  const { body: results } = yield call(ServiceUtil.triggerServerRequest, {
    siteId,
    url: getApiEndPointsFromStore('registryQuickPicks'),
    ignoreDynSession: !isBrowser(),
    showLoader: false,
  });
  return yield results && results.data ? results.data : [];
}

/**
 * Fetches registry type details data.
 *
 * @param registryType
 * @return {object}
 */
export function* fetchRegistryType(registryType, siteId) {
  const isPreviewMode = isPreviewEnv();
  const { body: results } = yield call(ServiceUtil.triggerServerRequest, {
    siteId,
    url: `${getApiEndPointsFromStore(
      !isPreviewMode
        ? 'registryQuickPicks'
        : /* istanbul ignore next */ 'registryQuickPicksPreview'
    )}/registry-type/${registryType}`,
    ignoreDynSession: !isBrowser(),
    showLoader: true,
  });
  return yield results && results.data ? results.data : {};
}

const computeSelectedCategory = categories =>
  !isEmpty(categories)
    ? sanitizeSearchTerm(categories[0].label)
    : /* istanbul ignore next */ '';

/**
 * Computes the selectedRegistry Type.
 *
 * @param selectedRegistryType
 * @param registryTypes
 * @return {*}
 */
export const computeSelectedRegistryType = (
  selectedRegistryType,
  registryTypes
) => {
  if (!isEmpty(selectedRegistryType) && !isEmpty(registryTypes)) {
    return selectedRegistryType;
  } else if (!isEmpty(registryTypes)) {
    return registryTypes[0].id;
  }
  throw Error('Cannot compute a default selected registry type');
};

const appendRegistryTypes = (registryTypes, siteId) => {
  const apiCalls = [];
  if (isEmpty(registryTypes)) {
    // We need to fetch registry types into store.
    apiCalls.push(fetchRegistryTypes(siteId));
  }
  return apiCalls;
};

const setQuickPicksHelper = ({
  selectedCategory,
  categories,
  selectedRegistryType,
  registryTypes,
  hero,
  cacheKey,
}) => ({
  selectedCategory: selectedCategory || computeSelectedCategory(categories),
  error: false,
  selectedRegistryType: computeSelectedRegistryType(
    selectedRegistryType,
    registryTypes
  ),
  categories,
  registryTypes,
  hero,
  cacheKey,
});

export const transformAllCategory = categories =>
  categories
    .map(v =>
      v && has('allCatTitle', v) // Odd that CMS team elected to do something special with the all selection.
        ? {
            collections: v.collections.reduce((acc, c) => {
              [].push.apply(acc, c); // appends elements in source array in lieu of the array itself.
              return acc;
            }, []),
            label: v.allCatTitle,
            image: v.allCatImage,
          }
        : {
            collections: v.collections,
            label: v.label,
            image: v.image.url,
          }
    )
    .filter(v => v.label);

/**
 * Saga for fetching data from upstream Quick Picks endpoints.
 *
 * @param args
 * @return {*}
 */
export function* fetchQuickPicks({ args, siteId }) {
  try {
    let {
      registryTypes,
      selectedRegistryType,
      cacheKey: currentCacheKey,
    } = yield select(registryQuickPicksSelector);
    const pagePath = getOr('', 'pagePath', args);
    const cacheKey = pagePath;
    /* istanbul ignore else  */
    if (!isEmpty(cacheKey) && cacheKey === currentCacheKey) {
      return yield put(setQuickPicks({}));
    } else if (isBrowser()) {
      scrollSelectorUnderNavigation('.js-quickpicks-landing-top');
    }
    currentCacheKey = cacheKey;
    const config = yield select(registryQuickPicksLandingConfigSelector);
    const { registryType, category: selectedCategory } = args;
    if (isEmpty(registryType)) {
      const toPath = compile(ROUTE_REGISTRY_QUICK_PICKS_LANDING);
      // We need to get value from configuation
      selectedRegistryType = config['registry.quickpicks.landing.default.type'];
      /* istanbul ignore else  */
      if (!isEmpty(selectedRegistryType) && isBrowser()) {
        return yield put(
          replace(
            toPath({ registryType: selectedRegistryType, registryName: '-' })
          )
        );
      }
    } else {
      selectedRegistryType = registryType;
    }
    const apiCalls = appendRegistryTypes(registryTypes, siteId);
    apiCalls.unshift(fetchRegistryType(selectedRegistryType, siteId));
    const [registryTypeResponse, registryTypesResponse] = yield all(apiCalls);
    const { categories: categoriesResponse, hero } = registryTypeResponse;
    if (registryTypesResponse) {
      registryTypes = registryTypesResponse;
    }
    const categories = transformAllCategory(categoriesResponse);
    yield put(
      setQuickPicks(
        setQuickPicksHelper({
          selectedCategory,
          categories,
          selectedRegistryType,
          registryTypes,
          hero,
          cacheKey: currentCacheKey,
        })
      )
    );
  } catch (e) {
    yield put(setQuickPicks({ error: true }));
  }
  return yield;
}

export function* watchForRequest() {
  yield takeLatest(FETCH_QUICK_PICKS, fetchQuickPicks);
}

export default [watchForRequest];
