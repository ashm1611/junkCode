import { fromJS } from 'immutable';

import {
  selectRegistryAnalyzerState,
  selectRegistryDetailsState,
  makeSelectIsRegAnalyzerFetching,
  makeSelectRegAnalyzerError,
  makeSelectRegAnalyzerData,
  makeSelectRegAnalyzerShownBtn,
} from '../selectors';

describe('RegistryAnalyzer Selectors', () => {
  it('should select the "registryAnalyzer" state', () => {
    const registryAnalyzer = fromJS({
      isAnalyzerDataFetching: false,
    });
    const mockedState = fromJS({
      registryAnalyzer,
    });
    expect(selectRegistryAnalyzerState(mockedState)).to.deep.equal(
      registryAnalyzer
    );
  });

  it('should select the "isAnalyzerDataFetching" state', () => {
    const state = fromJS({
      registryAnalyzer: { isAnalyzerDataFetching: false },
    });
    const result = makeSelectIsRegAnalyzerFetching()(state);
    expect(result).to.equal(false);
  });

  it('should select the "error" state', () => {
    const state = fromJS({ registryAnalyzer: { error: '' } });
    const result = makeSelectRegAnalyzerError()(state);
    expect(result).to.equal('');
  });

  it('should select the "storeDetails" state', () => {
    const state = fromJS({ registryAnalyzer: { analyzerData: null } });
    const result = makeSelectRegAnalyzerData()(state);
    expect(result).to.equal(null);
  });

  it('should select the "registryDetails" state', () => {
    const registryDetails = fromJS({
      hasShownAnalyzerBtn: false,
    });
    const mockedState = fromJS({
      registryDetails,
    });
    expect(selectRegistryDetailsState(mockedState)).to.deep.equal(
      registryDetails
    );
  });

  it('should select the "registryDetails" state with regAnalyzerShownBtn key', () => {
    const registryDetails = fromJS({
      hasShownAnalyzerBtn: false,
    });
    const mockedState = fromJS({
      registryDetails,
    });
    const result = makeSelectRegAnalyzerShownBtn()(mockedState);
    expect(result).to.equal(false);
  });
});
