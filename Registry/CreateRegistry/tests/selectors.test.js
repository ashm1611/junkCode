import { fromJS } from 'immutable';
import {
  getRegistryId,
  makeSelectCoRegistrantProfileStatus,
  makeSelectQASContactModalState,
  makeSelectQASMovingModalState,
  makeSelectQASShippingModalState,
  makeSelectEmailVerReq,
  makeSelectRedirectParams,
  makeSelectQueryString,
  makeRegInputIsFetching,
  getcreateRegistryModalPopUpStatus,
  getRegTypeFormData,
  getScrollPositionForQuiz,
  makeSelectChannelType,
  makeRegInputError,
  makeRegInputData,
  getLoggedIn,
  makeSelectCoRegistrantProfileStatusError,
  makePassWordInputError,
  makeConfirmPassWordInputError,
  makeSubmitState,
  getTakeOurQuizStatus,
  getScrollPositionForSkip,
} from '../selectors';

describe(__filename, () => {
  const registryIdSelector = getRegistryId();

  const profileSelector = makeSelectCoRegistrantProfileStatus();
  const QASContactModalStateSelector = makeSelectQASContactModalState();
  const QASShippingModalStateSelector = makeSelectQASShippingModalState();
  const QASMovingModalStateSelector = makeSelectQASMovingModalState();
  it('should select the registry id', () => {
    const registryId = 'id';
    const mockedState = fromJS({
      createRegistry: {
        registryId,
      },
    });

    expect(registryIdSelector(mockedState)).to.deep.equal(fromJS(registryId));
  });

  it('should select co registrant profile status', () => {
    const coRegProfileStatus = {
      atgResponse: 'true',
    };
    const mockedState = fromJS({
      createRegistry: {
        coRegProfileStatus,
      },
    });

    expect(profileSelector(mockedState)).to.deep.equal(
      fromJS(coRegProfileStatus)
    );
  });

  it('should select the makeSelectQASContactModalState State', () => {
    const isContactAddressModalVisible = false;
    const mockedState = fromJS({
      createRegistry: {
        isContactAddressModalVisible: false,
      },
    });

    expect(QASContactModalStateSelector(mockedState)).to.deep.equal(
      fromJS(isContactAddressModalVisible)
    );
  });
  it('should select the makeSelectQASShippingModalState State', () => {
    const isShippingAddressModalVisible = false;
    const mockedState = fromJS({
      createRegistry: {
        isShippingAddressModalVisible: false,
      },
    });

    expect(QASShippingModalStateSelector(mockedState)).to.deep.equal(
      fromJS(isShippingAddressModalVisible)
    );
  });
  it('should select the makeSelectQASMovingModalState State', () => {
    const isMovingAddressModalVisible = false;
    const mockedState = fromJS({
      createRegistry: {
        isMovingAddressModalVisible: false,
      },
    });

    expect(QASMovingModalStateSelector(mockedState)).to.deep.equal(
      isMovingAddressModalVisible
    );
  });

  it('makeSelectEmailVerReq', () => {
    const state = fromJS({
      createRegistry: {
        emailVerReq: false,
      },
    });
    const result = false;
    const selector = makeSelectEmailVerReq();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });

  it('makeSelectRedirectParams ', () => {
    const state = fromJS({
      route: {
        previousLocationBeforeTransitions: {
          location: { path: 'https://www.buybuybaby.com/users' },
        },
      },
    });
    const result = { path: 'https://www.buybuybaby.com/users' };
    const selector = makeSelectRedirectParams();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('makeSelectRedirectParams when location is not present inside previousLocationBeforeTransitions ', () => {
    const state = fromJS({
      route: {
        previousLocationBeforeTransitions: {
          path: 'https://www.buybuybaby.com/users',
        },
      },
    });
    const result = { path: 'https://www.buybuybaby.com/users' };
    const selector = makeSelectRedirectParams();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('makeSelectRedirectParams when route not available', () => {
    const state = fromJS({
      route: null,
    });
    const result = '';
    const selector = makeSelectRedirectParams();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('makeSelectQueryString ', () => {
    const state = fromJS({
      route: {
        locationBeforeTransitions: {
          location: { path: 'https://www.buybuybaby.com/users' },
        },
      },
    });
    const result = { path: 'https://www.buybuybaby.com/users' };
    const selector = makeSelectQueryString();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('makeSelectQueryString when location is not present inside previousLocationBeforeTransitions ', () => {
    const state = fromJS({
      route: {
        locationBeforeTransitions: {
          path: 'https://www.buybuybaby.com/users',
        },
      },
    });
    const result = { path: 'https://www.buybuybaby.com/users' };
    const selector = makeSelectQueryString();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('makeSelectQueryString when route not available', () => {
    const state = fromJS({
      route: null,
    });
    const result = '';
    const selector = makeSelectQueryString();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select isFetching from createRegistry state', () => {
    const state = fromJS({
      createRegistry: { isFetching: true },
    });
    const result = true;
    const selector = makeRegInputIsFetching();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select createRegistryModalPopUp from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        createRegistryModalPopUp: true,
      },
    });
    const result = true;
    const selector = getcreateRegistryModalPopUpStatus();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select regTypeFormData from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        regTypeFormData: true,
      },
    });
    const result = true;
    const selector = getRegTypeFormData();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select getScrollPositionForQuiz from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        scrollPosition: 0,
      },
    });
    const result = 0;
    const selector = getScrollPositionForQuiz();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select getScrollPositionForSkip from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        skipRegistryPosition: 0,
      },
    });
    const result = 0;
    const selector = getScrollPositionForSkip();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select navigationViewportSize from viewportConfig state', () => {
    const state = fromJS({
      viewportConfig: {
        navigationViewportSize: 'desktop',
      },
    });
    const result = 'desktop';
    const selector = makeSelectChannelType();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select error from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        error: 'there is a error',
      },
    });
    const result = 'there is a error';
    const selector = makeRegInputError();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select regInputs  from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        regInputs: {},
      },
    });
    const result = {};
    const selector = makeRegInputData();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select isLoggedIn from accountSignIn state', () => {
    const state = fromJS({
      accountSignIn: {
        isLoggedIn: false,
      },
    });
    const result = false;
    const selector = getLoggedIn();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select profileStatusError from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        profileStatusError: null,
      },
    });
    const result = null;
    const selector = makeSelectCoRegistrantProfileStatusError();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select passwordError from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        passwordError: null,
      },
    });
    const result = null;
    const selector = makePassWordInputError();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select confirmPasswordError from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        confirmPasswordError: null,
      },
    });
    const result = null;
    const selector = makeConfirmPassWordInputError();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select submitCalled from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        submitCalled: false,
      },
    });
    const result = false;
    const selector = makeSubmitState();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
  it('make select takeOurQuiz from createRegistry state', () => {
    const state = fromJS({
      createRegistry: {
        takeOurQuiz: true,
      },
    });
    const result = true;
    const selector = getTakeOurQuizStatus();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
});
