import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import EmailRegistry from '../EmailRegistry';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('should render correctly', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const registryLabel = {
      emailRegistry: 'Copy registry',
    };
    const submitForm = () => {};
    const emailSentResponse = () => {};
    const clearSubmitResponse = () => {};
    const tree = shallow(
      <EmailRegistry
        registryLabel={registryLabel}
        submitForm={submitForm}
        emailSentResponse={emailSentResponse}
        clearSubmitResponse={clearSubmitResponse}
        isMobile
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    commonUtil.getSiteId.restore();
  });

  it('handleButtonClick  : should toggle modal State', () => {
    const preventDefault = sinon.stub();
    const submitForm = sinon.stub();
    const emailSentResponse = sinon.stub();
    const clearSubmitResponse = sinon.stub();
    const toggleShareModalState = sinon.stub();
    const props = {
      registryLabel: {
        emailRegistry: 'Email registry',
      },
      submitForm,
      emailSentResponse,
      clearSubmitResponse,
      toggleShareModalState,
    };
    const event = {
      preventDefault,
    };
    const state = {
      modalMountedState: false,
    };
    const tree = shallow(<EmailRegistry {...props} state={state} />);
    tree.instance().handleButtonClick(event);
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('toggleModalState : should toggle modal State', () => {
    const submitForm = sinon.stub();
    const emailSentResponse = sinon.stub();
    const handleTealiumEvent = sinon.stub();
    const clearSubmitResponse = sinon.stub();
    const hideShareRegistryModal = sinon.stub();
    const props = {
      registryLabel: {
        emailRegistry: 'Email registry',
      },
      handleTealiumEvent,
      submitForm,
      emailSentResponse,
      clearSubmitResponse,
      hideShareRegistryModal,
    };
    const state = {
      modalMountedState: false,
    };
    const tree = shallow(<EmailRegistry {...props} state={state} />);
    tree.instance().toggleModalState(true);
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('openModal : should toggle modal State', () => {
    const preventDefault = sinon.stub();
    const submitForm = sinon.stub();
    const emailSentResponse = sinon.stub();
    const clearSubmitResponse = sinon.stub();
    const toggleModalState = sinon.stub();
    const handleTealiumEvent = sinon.stub();
    const props = {
      registryLabel: {
        emailRegistry: 'Email registry',
      },
      submitForm,
      emailSentResponse,
      clearSubmitResponse,
      handleTealiumEvent,
      registrySummaryVO: {
        registryId: 'REG1234',
        eventType: 'Wedding',
      },
      linkVariation: 'iconOnly',
    };
    const state = {
      modalMountedState: false,
    };
    const e = {
      preventDefault,
    };
    const tree = shallow(
      <EmailRegistry
        {...props}
        state={state}
        toggleModalState={toggleModalState}
      />
    );
    tree.instance().openModal(e);
    expect(tree.state('modalMountedState')).to.equal(true);
  });
});
