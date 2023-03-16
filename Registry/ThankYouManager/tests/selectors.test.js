import { fromJS } from 'immutable';

import {
  getTymDynamicDataFlag,
  makeSelectRegistryId,
  isMobile,
  getListDataTYM,
  showLoginModal,
  getIsMobile,
  getRegistryDetails,
  selectActiveRegistryObject,
  getListUpdatedStatus,
  makeSelectPreviousRoute,
  makeSelectisFetching,
  makeSelectQueryString,
  getListData,
  getLoggedInStatus,
} from '../selectors';

describe('ThankYouManagerSelector', () => {
  it('should select isMobile state', () => {
    const isMobileScreen = false;
    const mockedState = fromJS({
      mobileScreen: {
        isMobileScreen,
      },
    });
    expect(isMobile(mockedState)).to.deep.equal(
      fromJS({ isMobileScreen: false })
    );
  });

  it('should select getListDataTYM', () => {
    const data = { key: 'value' };
    const mockedState = fromJS({
      thankYouList: {
        data,
      },
    });
    expect(getListDataTYM(mockedState)).to.deep.equal(fromJS(data));
  });

  it('should select getListUpdatedStatus', () => {
    const listUpdated = false;
    const mockedState = fromJS({
      thankYouList: {
        listUpdated,
      },
    });
    expect(getListUpdatedStatus()(mockedState)).to.deep.equal(listUpdated);
  });

  it('should select showLoginModal', () => {
    const loginModalVisibility = false;
    const mockedState = fromJS({
      thankYouList: {
        loginModalVisibility,
      },
    });
    expect(showLoginModal()(mockedState)).to.deep.equal(loginModalVisibility);
  });

  it('should select getIsMobile', () => {
    const isMobileScreen = false;
    const mockedState = fromJS({
      mobileScreen: {
        isMobileScreen,
      },
    });
    expect(getIsMobile()(mockedState)).to.deep.equal(
      fromJS({ isMobileScreen: false })
    );
  });

  it('should select getRegistryDetails', () => {
    const activeRegistry = fromJS({});
    const Registry = fromJS({ activeRegistry });
    const mockedState = fromJS({
      Registry,
    });
    expect(getRegistryDetails(mockedState)).to.deep.equal(Registry);
  });

  it('should select selectActiveRegistryObject', () => {
    const activeRegistry = fromJS({});
    const Registry = fromJS({ activeRegistry });
    const mockedState = fromJS({
      Registry,
    });
    expect(selectActiveRegistryObject()(mockedState)).to.deep.equal(
      activeRegistry
    );
  });

  it('should select the dynamic data flag', () => {
    const dynamicDataFlag = getTymDynamicDataFlag();
    const thankYouListDynamicContent = fromJS({});
    const mockedState = fromJS({
      thankYouList: {
        thankYouListDynamicContent,
      },
    });

    expect(dynamicDataFlag(mockedState)).to.deep.equal(
      thankYouListDynamicContent
    );
  });

  it('should select the registry Id', () => {
    const selectRegistryId = makeSelectRegistryId();
    const registryId = fromJS({});
    const mockedState = fromJS({
      thankYouList: {
        registryId,
      },
    });

    expect(selectRegistryId(mockedState)).to.deep.equal(registryId);
  });

  it('should select the showLoginModal', () => {
    const selectRegistryId = showLoginModal();
    const loginModalVisibility = fromJS({ visibility: true });
    const mockedState = fromJS({
      thankYouList: {
        loginModalVisibility,
      },
    });

    expect(selectRegistryId(mockedState)).to.deep.equal(loginModalVisibility);
  });

  it('should select the listUpdated', () => {
    const selectRegistryId = getListUpdatedStatus();
    const listUpdated = fromJS({});
    const mockedState = fromJS({
      thankYouList: {
        listUpdated,
      },
    });

    expect(selectRegistryId(mockedState)).to.deep.equal(listUpdated);
  });

  it('should select the listUpdated', () => {
    const selectRegistryId = makeSelectisFetching();
    const isFetchingReg = fromJS({});
    const mockedState = fromJS({
      thankYouList: {
        isFetching: isFetchingReg,
      },
    });

    expect(selectRegistryId(mockedState)).to.deep.equal(isFetchingReg);
  });

  it('should select the "previousLocationBeforeTransitions" state', () => {
    const previousURLselector = selectActiveRegistryObject();
    const Registry = fromJS({
      activeRegistry: '12345666',
      domain: 'www.buybuybaby.com',
    });
    const activeRegistry = '12345666';
    const mockedState = fromJS({
      Registry,
    });
    expect(previousURLselector(mockedState)).to.deep.equal(activeRegistry);
  });

  it('should select the "previousLocationBeforeTransitions" state', () => {
    const previousURLselector = makeSelectPreviousRoute();
    const route = fromJS({
      previousLocationBeforeTransitions: {
        pathname: '/store/giftregistry/viewRegistryGuest/543238762',
      },
      domain: 'www.buybuybaby.com',
    });
    const previousURL = '/store/giftregistry/viewRegistryGuest/543238762';
    const mockedState = fromJS({
      route,
    });
    expect(previousURLselector(mockedState)).to.deep.equal(previousURL);
  });

  it('should select previousLocationBeforeTransitions', () => {
    const mockedState = fromJS({
      router: {
        locationBeforeTransitions: {
          location: '/store/registry',
        },
      },
    });
    const selector = makeSelectQueryString();
    expect(selector(mockedState)).to.deep.equal('');
    const mockedStates = fromJS({
      route: {
        locationBeforeTransitions: undefined,
      },
    });
    expect(selector(mockedStates)).to.deep.equal(undefined);
  });

  it('should select getListData', () => {
    const selector = getListData();
    const mockedStates = fromJS({
      thankYouList: {
        data: { tymGifterList: [{}] },
      },
    });
    expect(selector(mockedStates)).to.deep.equal(undefined);
  });

  it('should select getListData and return null', () => {
    const selector = getListData();
    const mockedStates = fromJS({
      thankYouList: {},
    });
    expect(selector(mockedStates)).to.deep.equal(null);
  });

  it('should select getLoggedInStatus', () => {
    const selector = getLoggedInStatus();
    const mockedStates = fromJS({
      thankYouList: {
        data: { userLoggedIn: true },
      },
    });
    expect(selector(mockedStates)).to.deep.equal(undefined);
  });

  it('should select getLoggedInStatus and return false', () => {
    const selector = getLoggedInStatus();
    const mockedStates = fromJS({
      thankYouList: {},
    });
    expect(selector(mockedStates)).to.deep.equal(false);
  });
});
