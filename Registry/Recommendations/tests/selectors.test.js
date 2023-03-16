import { fromJS } from 'immutable';
import {
  selectRecommendationList,
  isFetching,
  makeSelectRecommnedationData,
  getRegistryDetails,
  selectMayBeLaterFlag,
  getRegistryData,
  selectRecommenderSummary,
  selectBlockUnblockSuccess,
  selectBlockUnblockError,
} from '../selectors';

describe('RecommendationsSelector', () => {
  it('should select the recommendationMainData', () => {
    const registryRecommendations = fromJS({ recommendationList: {} });
    const state = fromJS({
      registryRecommendations: { recommendationList: {} },
    });

    expect(makeSelectRecommnedationData(state)).to.deep.equal(
      registryRecommendations
    );
  });

  it('should select the "registryDetails" state', () => {
    const mockedState = fromJS({
      registryDetails: {
        data: 'xyz',
        isFetching: 'xyz',
        closeOtherModal: true,
        inactivityModalReset: true,
        activeRegistryCallFlag: true,
      },
    });
    const registryDetails = fromJS({
      data: 'xyz',
      isFetching: 'xyz',
      closeOtherModal: true,
      inactivityModalReset: true,
      activeRegistryCallFlag: true,
    });
    expect(getRegistryDetails(mockedState)).to.deep.equal(registryDetails);
  });

  it('should select the getRegistryData when recommendationCount is present', () => {
    const getRegistryDataSelector = getRegistryData();
    let mockedState = fromJS({
      registryDetails: {
        data: null,
        isFetching: 'xyz',
        closeOtherModal: true,
        inactivityModalReset: true,
        activeRegistryCallFlag: true,
      },
    });
    const recommendationCountObj = { recommendationCount: 10 };
    mockedState = mockedState.setIn(
      ['registryDetails', 'data'],
      recommendationCountObj
    );
    expect(getRegistryDataSelector(mockedState)).to.deep.equal(
      recommendationCountObj
    );
  });

  it('should select the getRegistryData as false when recommendationCount is not present', () => {
    const getRegistryDataSelector = getRegistryData();
    const mockedState = fromJS({
      registryDetails: {
        data: null,
        isFetching: 'xyz',
        closeOtherModal: true,
        inactivityModalReset: true,
        activeRegistryCallFlag: true,
      },
    });
    expect(getRegistryDataSelector(mockedState)).to.deep.equal(false);
  });

  it('should select the recommendationList', () => {
    const recommendationList = selectRecommendationList();
    const recommendData = fromJS({});
    const mockedState = fromJS({
      registryRecommendations: { recommendationList: {} },
    });

    expect(recommendationList(mockedState)).to.deep.equal(recommendData);
  });

  it('should select the "isFetching" state', () => {
    const state = fromJS({
      registryRecommendations: { isFetching: true },
    });
    const result = isFetching()(state);
    expect(result).to.equal(true);
  });

  it('should select the "recommenderSummary" state', () => {
    const state = fromJS({
      registryRecommendations: { mayBeLaterFlag: true },
    });
    const result = selectMayBeLaterFlag()(state);
    expect(result).to.equal(true);
  });

  it('should select the "selectMayBeLaterFlag" state', () => {
    const state = fromJS({
      registryRecommendations: { recommenderSummary: {} },
    });
    const result = selectRecommenderSummary()(state);
    expect(result).to.deep.equal(fromJS({}));
  });

  it('should select the "recommendationBlockUnblockSuccess" state', () => {
    const state = fromJS({
      registryRecommendations: { recommendationBlockUnblockSuccess: {} },
    });
    const result = selectBlockUnblockSuccess()(state);
    expect(result).to.deep.equal(fromJS({}));
  });

  it('should select the "recommendationBlockUnblockError" state', () => {
    const state = fromJS({
      registryRecommendations: { recommendationBlockUnblockError: {} },
    });
    const result = selectBlockUnblockError()(state);
    expect(result).to.deep.equal(fromJS({}));
  });
});
