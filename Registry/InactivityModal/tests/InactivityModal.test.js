import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';

import InactivityModal from '../InactivityModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const inactivityModalState = sinon.stub();
  beforeEach(() => {
    wrapper = shallow(
      <InactivityModal inactivityModalState={inactivityModalState} />
    );
  });

  it('should render RegistryAnalyzer correctly', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should change inactivityModalState state to true', () => {
    const wrapperInstance = wrapper.instance();
    wrapperInstance.openInactivityModal();

    expect(wrapperInstance.state.inactivityModalState).to.equal(true);
  });
  it('should change inactivityModalState state to true', () => {
    const timerInstance = '24';
    const openInactivityModal = sinon.stub();

    const tree = shallow(
      <InactivityModal
        inactivityModalTimeout={'20'}
        timerInstance={timerInstance}
      />
    ).instance();
    tree.startTimeOut();

    expect(openInactivityModal.called);
  });
  it('should call handelModalInactivity with securityStatus= 4', () => {
    const startTimeOut = sinon.stub();
    const cookies = new Cookies();
    cookies.set('securityStatus', '4');
    const tree = shallow(
      <InactivityModal startTimeOut={startTimeOut} />
    ).instance();
    tree.handelModalInactivity();

    expect(startTimeOut.called);
  });

  it('should call handelModalInactivity with securityStatus= ', () => {
    const startTimeOut = sinon.stub();
    const cookies = new Cookies();
    cookies.set('securityStatus', '');
    const tree = shallow(
      <InactivityModal startTimeOut={startTimeOut} />
    ).instance();
    tree.handelModalInactivity();

    expect(startTimeOut.called);
  });

  it('should call handelModalInactivity with securityStatus= 2', () => {
    const closeOtherOpenModaOnInactiveModal = sinon.stub();
    const getEditRegistryData = sinon.stub();
    const pathMatcher = sinon.stub();
    const cookies = new Cookies();
    cookies.set('securityStatus', '2');
    const location = {
      pathname: '/abc',
    };
    const tree = shallow(
      <InactivityModal
        isEditModalOpen
        closeOtherOpenModaOnInactiveModal={closeOtherOpenModaOnInactiveModal}
        getEditRegistryData={getEditRegistryData}
        pathMatcher={pathMatcher}
        location={location}
      />
    ).instance();
    tree.handelModalInactivity();

    expect(getEditRegistryData.called);
  });

  it('should call handelModalInactivity with securityStatus= 2 when isEditModalOpen is not true', () => {
    const pathMatcher = sinon.stub();
    const cookies = new Cookies();
    cookies.set('securityStatus', '2');
    const location = {
      pathname: '/abc',
    };
    const tree = shallow(
      <InactivityModal pathMatcher={pathMatcher} location={location} />
    ).instance();
    tree.handelModalInactivity();
  });

  it('should call if inactivityModalReset & initiateInactivityModal is true', () => {
    const startTimeOut = sinon.spy();
    const initiateInactivityModal = sinon.stub();
    const handelModalInactivity = sinon.stub();
    const closeOtherOpenModaOnInactiveModal = sinon.stub();
    const handleThankYouList = sinon.stub();
    const pathMatcher = sinon.stub();
    const nextProps = {
      activeRegistryCallFlag: false,
    };
    const location = {
      pathname: '/tym',
    };

    const tree = shallow(
      <InactivityModal
        startTimeOut={startTimeOut}
        initiateInactivityModal={initiateInactivityModal}
        handelModalInactivity={handelModalInactivity}
        clearTimeout={clearTimeout}
        inactivityModalReset
        timerInstance={'24'}
        recognizedFlag={false}
        activeRegistryCallFlag
        pathMatcher={pathMatcher}
        location={location}
        closeOtherOpenModaOnInactiveModal={closeOtherOpenModaOnInactiveModal}
        handleThankYouList={handleThankYouList}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.componentWillReceiveProps(nextProps);
    /* eslint no-unused-expressions: 0 */
    expect(initiateInactivityModal).to.have.been.called;
  });
});
