import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as utils from '@bbb-app/utils/common';
import { setCookie } from '@bbb-app/utils/universalCookie';
import ProfileExtendModal from '../ProfileExtendModal';

configure({ adapter: new Adapter() });
const referredContent = {
  content: {
    9278: {
      body: 'hello',
    },
    9279: {
      body: 'hello',
    },
    9280: {
      body: 'hello',
    },
    9281: {
      body: 'I Should Rendered',
    },
  },
};
const mockLabels = {
  createRegistry: {
    referredContent: [
      {
        id: '9278',
        key: 'coRegistrantProfileExist',
      },
      {
        id: '9279',
        key: 'coRegistrantExtendedProfile',
      },
      {
        id: '9280',
        key: 'coRegistrantProfileNotFound',
      },
      {
        id: '9281',
        key: 'RegistrantProfileExtend',
      },
    ],
  },
};
const mockLabelsCS = {
  referredContent: [
    {
      id: '9278',
      key: 'coRegistrantProfileExist',
    },
    {
      id: '9279',
      key: 'coRegistrantExtendedProfile',
    },
    {
      id: '9280',
      key: 'coRegistrantProfileNotFound',
    },
    {
      id: '9281',
      key: 'RegistrantProfileExtend',
    },
  ],
};
const enableCSLabels = 'true';
const props = { recaptchaActivationCount: '10' };
describe(__filename, () => {
  it('should render correctly', () => {
    sinon.stub(utils, 'getCurrentSiteIdAtBrowser').returns('BuyBuyBaby');
    const wrapper = shallow(
      <ProfileExtendModal
        labels={{}}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={{}}
        isModalOpen
        uniqueId={`RegistryForm`}
        hideAccountDetectedModal
        {...props}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render correct refereed content', () => {
    const wrapper = shallow(
      <ProfileExtendModal
        labels={{ createRegistry: { referredContent: {} } }}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={{}}
        isModalOpen
        uniqueId={`RegistryForm`}
      />
    );
    expect(wrapper.instance().getReferredContent()).to.equal('');
  });

  it('should render correct refereed content', () => {
    const wrapper = shallow(
      <ProfileExtendModal
        enableCSLabels={enableCSLabels}
        labels={mockLabelsCS}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
      />
    );
    expect(wrapper.instance().getReferredContent()).to.equal(
      'I Should Rendered'
    );
  });

  it('should set password preset field correctly', () => {
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
      />
    );
    wrapper.instance().passwordErrorPresent(true, 'password', true);
    expect(wrapper.state('changedPasswordError')).to.equal(true);
    expect(wrapper.state('changedPassword')).to.equal(true);
  });

  it('should set password preset field correctly when password field is empty', () => {
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
      />
    );
    wrapper.instance().passwordErrorPresent(true, '', true);
    expect(wrapper.state('changedPasswordError')).to.equal(true);
    expect(wrapper.state('changedPassword')).to.equal('');
  });

  it('should call closeModal', () => {
    const closeModal = sinon.stub();
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
        closeModal={closeModal}
      />
    );
    wrapper.instance().closeModal({ preventDefault: () => {} });
    expect(wrapper.state('signUp')).to.equal(false);
    expect(wrapper.state('changedPassword')).to.equal('');
    expect(wrapper.state('changedPasswordError')).to.equal(true);
  });

  it('should call handleSignUp', () => {
    const onSubmit = sinon.stub();
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
        onSubmit={onSubmit}
      />
    );
    wrapper.instance().handleSignUp(true);
    expect(wrapper.state('signUp')).to.equal(true);
  });

  it('should call extendPasswordHandler', () => {
    setCookie('FLACount', '100000');
    const onSubmit = sinon.stub();
    const fireTealiumAction = sinon.spy();
    const errorInfo = {
      response: {
        data: {
          errorMessages: [
            {
              message: 'error',
            },
          ],
        },
      },
    };
    const formWrapperData = {
      password: {
        value: 'test',
      },
    };
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
        onSubmit={onSubmit}
        formWrapperData={formWrapperData}
        deviceAutoLogin
        fireTealiumAction={fireTealiumAction}
        {...props}
      />
    );
    wrapper.instance().extendPasswordHandler({});
    wrapper.setProps({
      errorInfo,
    });
    /* eslint no-unused-expressions: 0 */
    expect(onSubmit.calledOnce);
  });
  it('should call extendPasswordHandler when cookie is set to false', () => {
    setCookie('FLACount', '9999');
    const onSubmit = sinon.stub();
    const fireTealiumAction = sinon.spy();
    const errorInfo = {
      response: {
        data: {
          errorMessages: [
            {
              message: undefined,
            },
          ],
        },
      },
    };
    const formWrapperData = {
      password: {
        value: 'test',
      },
    };
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        isModalOpen
        uniqueId={`RegistryForm`}
        onSubmit={onSubmit}
        formWrapperData={formWrapperData}
        deviceAutoLogin
        fireTealiumAction={fireTealiumAction}
        {...props}
      />
    );
    wrapper.instance().extendPasswordHandler({});
    wrapper.setProps({
      errorInfo,
    });
    /* eslint no-unused-expressions: 0 */
    expect(onSubmit.calledOnce);
  });
  it('should call onRecaptchaValidation and set false resetRecaptcha state', () => {
    const defaultState = {
      isChangePasswordModalOpen: false,
      resetRecaptcha: false,
      recaptchaError: '',
    };
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        state={defaultState}
      />
    );
    const args = { isValid: true };
    wrapper.instance().onRecaptchaValidation(args);
    expect(wrapper.state('isRecaptchaValidated')).to.equal(true);
    expect(wrapper.state('recaptchaError')).to.equal('');
  });
  it('should call onRecaptchaValidation and set false resetRecaptcha state', () => {
    const defaultState = {
      isChangePasswordModalOpen: false,
      resetRecaptcha: false,
      recaptchaError: '',
    };
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
        state={defaultState}
      />
    );
    const args = { isValid: false };
    wrapper.instance().onRecaptchaValidation(args);
    expect(wrapper.state('isRecaptchaValidated')).to.equal(false);
  });
  it('should call onResetRecaptcha and set false resetRecaptcha state', () => {
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        personalisedLables={{}}
        email={'test@test.com'}
        referredContent={referredContent.content}
      />
    );
    wrapper.instance().onResetRecaptcha();
    expect(wrapper.state('resetRecaptcha')).to.equal(false);
    utils.getCurrentSiteIdAtBrowser.restore();
  });
  it('should render captcha on account detected modal when global and page switch added for captcha.', () => {
    const recaptchaActivationCount = 3;
    const shouldReCaptchaRender = sinon.stub();
    shouldReCaptchaRender.returns(true);
    const wrapper = shallow(
      <ProfileExtendModal
        labels={mockLabels}
        referredContent={referredContent.content}
        recaptchaActivationCount={recaptchaActivationCount}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
