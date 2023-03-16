import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import TymEmail from '../TymEmail';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  let triggerServerRequestStub;
  const activeRegistryData = {};
  const labels = {
    registryDetails: {
      tymSavedItemsHeadingLabel: 'tym list',
      emailSubject: 'tese',
      emailTitle: 'sent mail',
      tymToEmailLabel: 'to email',
    },
  };
  beforeEach(() => {
    wrapper = shallow(
      <TymEmail labels={labels} activeRegistryData={activeRegistryData} />
    );
    triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves({ body: { data: { result: true } } });
  });
  afterEach(() => {
    triggerServerRequestStub.restore();
  });
  it('tym email should render correctly', () => {
    const tree = shallow(
      <TymEmail labels={labels} activeRegistryData={activeRegistryData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('tym list email modal checkbox checked state true', () => {
    const checked = true;
    wrapper.instance().onUserAcceptance();
    expect(wrapper.state().checkBoxChecked).to.equal(checked);
  });
  it('tym list email success', () => {
    const isSuccess = true;
    const data = {
      body: {
        data: { result: true, component: { emailResponse: 'done' } },
      },
    };
    wrapper.instance().emailSubmitFormSuccess(data);
    expect(wrapper.state().isSuccess).to.equal(isSuccess);
  });
  it('tym list email error', () => {
    const isSuccess = false;
    const data = {
      body: {
        data: { result: false, component: { emailResponse: 'fail' } },
      },
    };
    wrapper.instance().emailSubmitFormSuccess(data);
    expect(wrapper.state().isSuccess).to.equal(isSuccess);
  });
  it('tym list email clear submit response', () => {
    const isSuccess = null;
    wrapper.instance().clearSubmitResponse();
    expect(wrapper.state().isSuccess).to.equal(isSuccess);
  });
  it('tym list email togglemodal state', () => {
    const state = true;
    wrapper.instance().toggleModalState(state);
    expect(wrapper.state().modalMountedState).to.equal(state);
  });
  it('tym list email handleButtonClick state', () => {
    const event = {
      preventDefault: function named() {},
    };
    const modalMountedState = true;
    wrapper.instance().handleButtonClick(event);
    expect(wrapper.state().modalMountedState).to.equal(modalMountedState);
  });
  it('tym list email submit error func', () => {
    const errorInfo = {
      body: { response: { data: { errorMessages: [{ message: 'hello' }] } } },
    };

    wrapper.instance().emailSubmitFormError(errorInfo);
    expect(wrapper.state().emailSentResponse).to.equal('hello');
  });

  it('tym list email submit call func', () => {
    const formData = {
      email: { value: 'test.test@test.test' },
      message: 'test1',
    };

    wrapper.instance().emailSubmitForm(formData);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should call openModal func', () => {
    const preventDefault = sinon.stub();
    const e = {
      preventDefault,
    };
    wrapper.instance().openModal(e);
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
