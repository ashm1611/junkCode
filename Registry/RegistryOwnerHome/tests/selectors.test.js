import { fromJS } from 'immutable';
import {
  selectRegistryTemplateId,
  showLoginModal,
  selectRegistryTemplate,
  makeSelectPhoneNumberRegistry,
  makeSelectDeviceVerificationType,
  makeSelectUserCreated,
} from '../selectors';

describe('RegistryOwnerHome', () => {
  it('should select the experience in RegistryOwnerhome', () => {
    const registryTemplate = selectRegistryTemplateId();
    const mockedState = fromJS({
      experience: {
        routeURL: '/RegistryOwnerhome/787678',
        mapping: {
          staticPages: {
            '/RegistryOwnerhome': {
              templateId: '9874',
            },
          },
        },
      },
      router: { location: { pathName: undefined } },
      route: {
        locationBeforeTransitions: { location: { pathname: undefined } },
      },
    });

    expect(registryTemplate(mockedState)).to.deep.equal('9874');
  });
  it('should select the tip Module experience in group Pages', () => {
    const registryTemplate = selectRegistryTemplateId();
    const mockedState = fromJS({
      experience: {
        routeURL: '/store/giftRegistry/viewRegistryOwner/home/787678',
        mapping: {
          staticPages: {
            '/store/giftRegistry/viewRegistryOwner/home': {
              templateId: undefined,
            },
          },
          groupPages: {
            '/store/giftRegistry/': {
              templateId: '9874',
            },
          },
        },
      },
      router: { location: { pathName: undefined } },
      route: {
        locationBeforeTransitions: { location: { pathname: undefined } },
      },
    });

    expect(registryTemplate(mockedState)).to.deep.equal('9874');
  });
  it('should select the tip Module experience and unable to find', () => {
    const registryTemplate = selectRegistryTemplateId();
    const mockedState = fromJS({
      experience: {
        routeURL: '/store/giftRegistry/viewRegistryOwner/home/787678',
        mapping: {
          staticPages: {
            '/store/giftRegistry/viewRegistryOwner/home': {
              templateId: undefined,
            },
          },
          groupPages: {
            '/store/giftRegistry/': {
              templateId: undefined,
            },
          },
        },
      },
      router: { location: { pathName: undefined } },
      route: {
        locationBeforeTransitions: { location: { pathname: undefined } },
      },
    });

    expect(registryTemplate(mockedState)).to.deep.equal(false);
  });
  it('should select selectRegistryTemplate', () => {
    const registryTemplate = selectRegistryTemplate();
    const mockedState = fromJS({
      experience: {
        routeURL: '/store/giftRegistry/viewRegistryOwner/home/787678',
        mapping: {
          staticPages: {
            '/store/giftRegistry/viewRegistryOwner/home': {
              templateId: '9874',
            },
          },
          groupPages: {
            '/store/giftRegistry/': {
              templateId: undefined,
            },
          },
        },
        templates: {
          '9874': {
            tipsModule: {
              displayName: 'Tip #1',
            },
          },
        },
      },
      router: { location: { pathName: undefined } },
      route: {
        locationBeforeTransitions: { location: { pathname: undefined } },
      },
    });

    expect(registryTemplate(mockedState)).to.deep.equal(
      mockedState.toJS().experience.templates['9874']
    );
  });
  it('should select selectRegistryTemplate as null', () => {
    const registryTemplate = selectRegistryTemplate();
    const mockedState = fromJS({
      experience: {
        routeURL: '/store/giftRegistry/viewRegistryOwner/home/787678',
        mapping: {
          staticPages: {
            '/store/giftRegistry/viewRegistryOwner/home': {
              templateId: undefined,
            },
          },
          groupPages: {
            '/store/giftRegistry/': {
              templateId: undefined,
            },
          },
        },
        templates: {
          '9874': {
            tipsModule: {
              displayName: 'Tip #1',
            },
          },
        },
      },
      router: { location: { pathName: undefined } },
      route: {
        locationBeforeTransitions: { location: { pathname: undefined } },
      },
    });

    expect(registryTemplate(mockedState)).to.equal(null);
  });
  it('should select the showLoginModal in RegistryOwner', () => {
    const selectProfile = showLoginModal();
    const loginModalVisibility = true;
    const mockedState = fromJS({
      RegistryOwnerHome: {
        loginModalVisibility: true,
      },
    });

    expect(selectProfile(mockedState)).to.deep.equal(loginModalVisibility);
  });

  it('makeSelectPhoneNumberRegistry ', () => {
    const state = fromJS({
      createRegistry: {
        phoneLast4Digits: 'x000',
      },
    });
    const result = 'x000';
    const selector = makeSelectPhoneNumberRegistry();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });

  it('makeSelectDeviceVerificationType ', () => {
    const state = fromJS({
      createRegistry: {
        verificationType: 'pin',
      },
    });
    const result = 'pin';
    const selector = makeSelectDeviceVerificationType();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });

  it('makeSelectUserCreated ', () => {
    const state = fromJS({
      createRegistry: {
        userCreated: false,
      },
    });
    const result = false;
    const selector = makeSelectUserCreated();
    expect(selector(state)).to.deep.equal(fromJS(result));
  });
});
