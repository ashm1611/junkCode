import { fromJS } from 'immutable';

import {
  fetchTymDataSuccess,
  fetchTymDataError,
  revealThankYouListSuccess,
  revealThankYouListError,
  displayLoginModalVisibility,
  changeListUpdatedStatus,
} from '../actions';

import { fetchTymData } from '../ActionsWithSagaInjection';

import RegistryTymDetailReducer from '../reducer';

describe('RegistryTymDetailReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      isFetching: true,
      loginModalVisibility: false,
      data: {},
      listUpdated: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;

    expect(RegistryTymDetailReducer(undefined, {})).to.deep.equal(
      expectedResult
    );
  });

  it('should handle the thank you list success callback correctly', () => {
    const isFetching = false;
    const registryId = '1111';
    const error = null;
    const data = {
      giftSurpriseEnabled: '',
    };

    const expectedResult = state
      .set('isFetching', isFetching)
      .set('thankYouListDynamicContent', data.giftSurpriseEnabled)
      .set('registryId', registryId)
      .set('error', error)
      .set('data', data)
      .set('listUpdated', true);

    expect(
      RegistryTymDetailReducer(state, fetchTymDataSuccess(data, registryId))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the thank you list call correctly', () => {
    const isFetching = true;
    const expectedResult = state.set('isFetching', isFetching);
    const registryId = '1111';
    const contentIdArgs = '';
    const sortOrder = '1';
    const sortDirection = '1';
    expect(
      RegistryTymDetailReducer(
        state,
        fetchTymData(registryId, contentIdArgs, sortOrder, sortDirection)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the thank you list Error callback correctly', () => {
    const error = {
      message: 'some error',
    };
    const isFetching = false;
    const data = null;

    const expectedResult = state
      .set('isFetching', isFetching)
      .set('data', data)
      .set('error', error);

    expect(
      RegistryTymDetailReducer(state, fetchTymDataError(error))
    ).to.deep.equal(expectedResult);
  });
  it('should handle the Reveal My thank you list success callback correctly', () => {
    const isFetching = false;
    const error = null;
    const data = {
      giftSurpriseEnabled: '',
    };

    const expectedResult = state
      .set('isFetching', isFetching)
      .set('thankYouListDynamicContent', data.giftSurpriseEnabled)
      .set('error', error)
      .set('data', data);

    expect(
      RegistryTymDetailReducer(state, revealThankYouListSuccess(data))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the Reveal my thank you list Error callback correctly', () => {
    const error = {
      message: 'some error',
    };
    const isFetching = false;
    const data = null;

    const expectedResult = state
      .set('isFetching', isFetching)
      .set('data', data)
      .set('error', error);

    expect(
      RegistryTymDetailReducer(state, revealThankYouListError(error))
    ).to.deep.equal(expectedResult);
  });

  it('should handle the login modal visibility Error callback correctly', () => {
    const loginModalVisibility = true;

    const expectedResult = state.set(
      'loginModalVisibility',
      loginModalVisibility
    );

    expect(
      RegistryTymDetailReducer(
        state,
        displayLoginModalVisibility(loginModalVisibility)
      )
    ).to.deep.equal(expectedResult);
  });

  it('should handle the change list updated status Error callback correctly', () => {
    const listUpdated = false;

    const expectedResult = state.set('listUpdated', listUpdated);

    expect(
      RegistryTymDetailReducer(state, changeListUpdatedStatus(listUpdated))
    ).to.deep.equal(expectedResult);
  });
});
