import { fromJS } from 'immutable';
import {
  selectMyRegistries,
  makeSelectIsFetching,
  makeSelectRegistriesInfo,
  makeSelectRegIncentivesSwitchConfig,
  makeSelectLabels,
  makeSelectError,
} from '../selectors';

describe('myRegistriesSelectors', () => {
  it('should select the myRegistries state', () => {
    const myRegistriesInfo = fromJS({});
    const mockedState = fromJS({
      account: {
        myRegistriesInfo,
      },
    });

    expect(selectMyRegistries(mockedState)).to.deep.equal(myRegistriesInfo);
  });

  it('should select the fetching state', () => {
    const fetchingSelector = makeSelectIsFetching();

    const isFetching = false;
    const mockedState = fromJS({
      myRegistriesInfo: {
        isFetching,
      },
    });

    expect(fetchingSelector(mockedState)).to.deep.equal(isFetching);
  });

  it('should select the my registries info', () => {
    const myRegistriesSelector = makeSelectRegistriesInfo();

    const incentiveInfo = fromJS({
      incentiveInfo: [],
    });
    const mockedState = fromJS({
      myRegistriesIncentiveInfo: {
        incentiveInfo,
      },
    });

    expect(myRegistriesSelector(mockedState)).to.deep.equal(incentiveInfo);
  });

  it('should select SwitchConfig of RegistryIncentives state', () => {
    const RegistryIncentives = {
      enableHoverOver: true,
      enableRegistryIncentives: true,
    };
    const viewportConfig = {
      switchConfig: {
        RegistryIncentives,
      },
    };
    const mockedState = fromJS({
      viewportConfig,
    });
    const result = makeSelectRegIncentivesSwitchConfig()(mockedState);
    expect(result.toJS()).to.deep.equal(RegistryIncentives);
  });

  it('should select blank object if RegistryIncentives state not present', () => {
    const viewportConfig = {
      switchConfig: {},
    };
    const mockedState = fromJS({
      viewportConfig,
    });
    const result = makeSelectRegIncentivesSwitchConfig()(mockedState);
    expect(result).to.deep.equal({});
  });

  it('should select the error state', () => {
    const error = fromJS({});
    const mockedState = fromJS({
      account: {
        error,
      },
    });

    expect(selectMyRegistries(mockedState)).to.deep.equal(error);
  });

  it('should select RegistryIncentives labels', () => {
    const mockedState = fromJS({
      labels: {
        Registry: { RegistryIncentives: {} },
      },
    });

    expect(makeSelectLabels()(mockedState)).to.deep.equal(fromJS({}));
  });

  it('should select error', () => {
    const mockedState = fromJS({
      myRegistriesIncentiveInfo: { error: {} },
    });

    expect(makeSelectError()(mockedState)).to.deep.equal(fromJS({}));
  });
});
