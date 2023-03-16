import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  COPY_REGISTRY,
  FETCH_COPY_REGISTRY_SUCCESS,
  RESET_COPY_REGISTRY_RESPONSE,
  FETCH_FIRST_CATEGORY,
  FETCH_FIRST_CATEGORY_SUCCESS,
  FETCH_FIRST_CATEGORY_ERROR,
  FETCH_OTHER_CATEGORIES,
  FETCH_OTHER_CATEGORIES_SUCCESS,
  FETCH_OTHER_CATEGORIES_ERROR,
  FETCH_OOS_CATEGORIES,
  FETCH_OOS_CATEGORIES_SUCCESS,
  FETCH_OOS_CATEGORIES_ERROR,
  SET_BUYOFF_CONTEXT,
  SET_BUYOFF_CONTEXT_VALUE,
  SET_BUYOFF_CONTEXT_ERROR,
  RESET_IS_ITEM_FETCHING,
  BOPIS_CHECK_BOX,
} from '../constants';

import {
  copyRegistry,
  fetchCopyRegistrySuccess,
  resetResponse,
  fetchRegistryFirstCategory,
  fetchFirstCategorySuccess,
  fetchFirstCategoryError,
  fetchRegistryOtherCategories,
  fetchRegistryOtherCategoriesSuccess,
  fetchRegistryOtherCategoriesError,
  fetchRegistryOosCategories,
  fetchRegistryOosCategoriesSuccess,
  fetchRegistryOosCategoriesError,
  setBuyOffContext,
  setBuyOffContextValue,
  setBuyOffContextError,
  resetIsItemsFetchingStatus,
  updateBopisCheckBoxState,
} from '../actions';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should return the correct type "SET_BUYOFF_CONTEXT"', () => {
    const registryId = '123456';
    const expectedResult = {
      type: SET_BUYOFF_CONTEXT,
      registryId,
    };
    expect(setBuyOffContext(registryId)).to.deep.equal(expectedResult);
  });

  it('should return the correct type "SET_BUYOFF_CONTEXT_VALUE"', () => {
    const data = true;
    const expectedResult = {
      type: SET_BUYOFF_CONTEXT_VALUE,
      data,
    };
    expect(setBuyOffContextValue(data)).to.deep.equal(expectedResult);
  });

  it('should return the error type "SET_BUYOFF_CONTEXT_ERROR" with actual error', () => {
    const error = new Error('some error');
    const expectedResult = {
      type: SET_BUYOFF_CONTEXT_ERROR,
      error,
    };
    expect(setBuyOffContextError(error)).to.deep.equal(expectedResult);
  });

  it('it should return the correct type "COPY_REGISTRY"', () => {
    const payload = {
      sourceId: '854626589',
      targetId: '789566621',
      regType: 'Housewarming',
      sortOption: '1',
    };
    const expectedResult = {
      type: COPY_REGISTRY,
      payload,
    };
    expect(copyRegistry(payload)).to.deep.equal(expectedResult);
  });

  it('it should return the correct type "FETCH_COPY_REGISTRY_SUCCESS"', () => {
    const data = {
      totalNumOfItemsCopied: '10',
    };
    const serviceStatus = 'SUCCESS';
    const expectedResult = {
      type: FETCH_COPY_REGISTRY_SUCCESS,
      data,
      serviceStatus,
    };
    expect(fetchCopyRegistrySuccess(data, serviceStatus)).to.deep.equal(
      expectedResult
    );
  });

  it('it should return the correct type "RESET_RESPONSE"', () => {
    const expectedResult = {
      type: RESET_COPY_REGISTRY_RESPONSE,
    };
    expect(resetResponse()).to.deep.equal(expectedResult);
  });

  it('it should return the error type with actual error', () => {
    const evtDate = '12/12/2018';
    const regId = '1234567';
    const regCode = 'HSW';
    const isDateSort = true;
    const wcref = 'yes';
    const wcsid = 708424371;
    const params = { storeId: 1 };
    const expectedResult = {
      type: FETCH_FIRST_CATEGORY,
      evtDate,
      regId,
      regCode,
      isDateSort,
      wcref,
      wcsid,
      ...params,
    };

    expect(
      fetchRegistryFirstCategory(
        evtDate,
        regId,
        regCode,
        isDateSort,
        wcref,
        wcsid,
        params
      )
    ).to.deep.equal(expectedResult);
  });

  it('it should return the correct type "FETCH_FIRST_CATEGORY_SUCCESS"', () => {
    const data = 'SUCCESS';
    const isDateSort = true;

    const expectedResult = {
      type: FETCH_FIRST_CATEGORY_SUCCESS,
      data,
      isDateSort,
    };
    expect(fetchFirstCategorySuccess(data, isDateSort)).to.deep.equal(
      expectedResult
    );
  });

  it('it should return the error type with actual error', () => {
    const error = new Error('some error');
    const expectedResult = {
      type: FETCH_FIRST_CATEGORY_ERROR,
      error,
    };

    expect(fetchFirstCategoryError(error)).to.deep.equal(expectedResult);
  });

  it('it should return the error type with actual error', () => {
    const evtDate = '12/12/2018';
    const regId = '1234567';
    const isDateSort = false;
    const params = undefined;

    const expectedResult = {
      type: FETCH_OTHER_CATEGORIES,
      evtDate,
      regId,
      isDateSort,
    };

    expect(
      fetchRegistryOtherCategories(evtDate, regId, isDateSort, params)
    ).to.deep.equal(expectedResult);
  });

  it('it should return the correct type "FETCH_OTHER_CATEGORIES_SUCCESS"', () => {
    const data = 'SUCCESS';
    const isDateSort = true;
    const expectedResult = {
      type: FETCH_OTHER_CATEGORIES_SUCCESS,
      data,
      isDateSort,
    };
    expect(fetchRegistryOtherCategoriesSuccess(data, isDateSort)).to.deep.equal(
      expectedResult
    );
  });

  it('it should return the error type with actual error', () => {
    const error = new Error('some error');
    const expectedResult = {
      type: FETCH_OTHER_CATEGORIES_ERROR,
      error,
    };

    expect(fetchRegistryOtherCategoriesError(error)).to.deep.equal(
      expectedResult
    );
  });

  it('it should return', () => {
    const evtDate = '12/12/2018';
    const regId = '1234567';

    const isDateSort = false;
    const expectedResult = {
      type: FETCH_OOS_CATEGORIES,
      evtDate,
      regId,
      isDateSort,
    };

    expect(
      fetchRegistryOosCategories(evtDate, regId, isDateSort)
    ).to.deep.equal(expectedResult);
  });

  it('it should return the correct type "FETCH_OTHER_CATEGORIES_SUCCESS"', () => {
    const data = 'SUCCESS';
    const isDateSort = true;
    const expectedResult = {
      type: FETCH_OOS_CATEGORIES_SUCCESS,
      data,
      isDateSort,
    };
    expect(fetchRegistryOosCategoriesSuccess(data, isDateSort)).to.deep.equal(
      expectedResult
    );
  });

  it('it should return the error type with actual error', () => {
    const error = new Error('some error');
    const expectedResult = {
      type: FETCH_OOS_CATEGORIES_ERROR,
      error,
    };

    expect(fetchRegistryOosCategoriesError(error)).to.deep.equal(
      expectedResult
    );
  });

  it('should reset the "isItemsFetching"', () => {
    const expectedResult = {
      type: RESET_IS_ITEM_FETCHING,
    };
    expect(resetIsItemsFetchingStatus()).to.deep.equal(expectedResult);
  });

  it('updateBopisCheckBoxState', () => {
    const expectedResult = {
      type: BOPIS_CHECK_BOX,
      data: undefined,
    };
    expect(updateBopisCheckBoxState()).to.deep.equal(expectedResult);
  });
});
