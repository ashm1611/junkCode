import {
  FETCH_TYM_DATA,
  FETCH_TYM_DATA_SUCCESS,
  FETCH_TYM_DATA_ERROR,
  REVEAL_THANK_YOU_LIST,
  REVEAL_THANK_YOU_LIST_SUCCESS,
  ADD_EDIT_TYM_ADDRESS,
  CHANGE_LIST_UPDATED_STATUS,
} from '../constants';

import {
  fetchTymDataSuccess,
  fetchTymDataError,
  revealThankYouList,
  revealThankYouListSuccess,
  revealThankYouListError,
  changeListUpdatedStatus,
} from '../actions';

import { fetchTymData } from '../ActionsWithSagaInjection';
import { addEditAddress } from '../ActionToInjectEditSaga';

describe('#fetchTymData', () => {
  it('should return the thank you list with surprise flag', () => {
    const registryId = '520647703';
    const contentIdArgs = ['9942', '9943'];
    const sortOrder = '1';
    const sortDirection = '1';

    const expectedResult = {
      type: FETCH_TYM_DATA,
      registryId,
      contentIdArgs,
      sortOrder,
      sortDirection,
    };
    expect(
      fetchTymData(registryId, contentIdArgs, sortOrder, sortDirection)
    ).to.deep.equal(expectedResult);
  });
});

describe('#fetchTymDataSuccess', () => {
  it('should return the success callback of after getting thank you list data', () => {
    const data = 'Object for thank you list';
    const registryId = '520647703';
    const expectedResult = {
      type: FETCH_TYM_DATA_SUCCESS,
      data,
      registryId,
    };
    expect(fetchTymDataSuccess(data, registryId)).to.deep.equal(expectedResult);
  });
});

describe('#fetchTymDataError', () => {
  it('should return the error callback of after getting any error in getting thank you list data', () => {
    const error = 'thank you list error';
    const expectedResult = {
      type: FETCH_TYM_DATA_ERROR,
      error,
    };
    expect(fetchTymDataError(error)).to.deep.equal(expectedResult);
  });
});

describe('#revealThankYouList', () => {
  it('should reveal the thank you list', () => {
    const registryId = '520647703';
    const expectedResult = {
      type: REVEAL_THANK_YOU_LIST,
      registryId,
    };
    expect(revealThankYouList(registryId)).to.deep.equal(expectedResult);
  });
});

describe('#revealThankYouListSuccess', () => {
  it('should return the success callback of after getting thank you list data', () => {
    const data = 'success callback for revealing thank you list';
    const expectedResult = {
      type: REVEAL_THANK_YOU_LIST_SUCCESS,
      data,
    };
    expect(revealThankYouListSuccess(data)).to.deep.equal(expectedResult);
  });
});

describe('#revealThankYouListError', () => {
  it('should return the error callback of after getting error in revealing thank you list data', () => {
    const error = 'revealing thank you list error';
    const expectedResult = {
      type: FETCH_TYM_DATA_ERROR,
      error,
    };
    expect(revealThankYouListError(error)).to.deep.equal(expectedResult);
  });
});

describe('#addEditAddress', () => {
  it('should Add OR Edit the Thank You List GG Address', () => {
    const args = {
      data: {
        addressLine1: '765 Massachusetts Avenue',
        rowId: 'AAAQfjAAMAAE2iSAAC',
      },
    };
    const expectedResult = {
      type: ADD_EDIT_TYM_ADDRESS,
      args,
    };
    expect(addEditAddress(args)).to.deep.equal(expectedResult);
  });
});

describe('#changeListUpdatedStatus', () => {
  it('should change the Updated status flag of the TYMList', () => {
    const expectedResult = {
      type: CHANGE_LIST_UPDATED_STATUS,
    };
    expect(changeListUpdatedStatus()).to.deep.equal(expectedResult);
  });
});
