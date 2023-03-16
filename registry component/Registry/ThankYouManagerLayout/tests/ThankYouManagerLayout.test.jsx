import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import * as common from '@bbb-app/utils/common';
import ThankYouManagerLayout from '../ThankYouManagerLayout';
import TYMSignIn from '../../../../../containers/Pages/Registry/TYMSignIn/TYMSignIn';
import TymList from '../TYMList/TymList';
import ThankYouEmpty from '../../RegistryOwner/ThankYouEmpty/ThankYouEmpty';
configure({ adapter: new Adapter() });
describe(__filename, () => {
  const thankYouListSurpriseData = {
    content: { '9942': 'tymSurpriseContentHeading' },
  };
  const revealThankYouList = sinon.stub();
  const sortThankYouList = sinon.stub();
  const enableTymDynamicContent = 'true';
  const registryId = '12243343';
  const labels = {
    referredContent: [
      { id: '9942', key: 'tymSurpriseContentHeading' },
      { id: '9943', key: 'tymSurpriseContentSubHeading' },
    ],
  };

  const notLoggedIn = false;
  const loggedIn = true;
  const displayLoginModal = sinon.stub();

  it('should render correctly', () => {
    const tree = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
        previousRoute
      />
    );
    tree.setProps({ previousRoute: true });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('#componentDidUpdate', () => {
    const snapshot = true;
    const prevProps = { userLoggedIn: false };
    const prevState = {};

    const tree = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        displayLoginModal={displayLoginModal}
        mPulseEnabled
      />
    );
    tree.instance().componentDidUpdate(prevProps, prevState, snapshot);
    tree.setProps({ userLoggedIn: true });
    expect(tree.instance().props.displayLoginModal.called).to.be.equal(true);
  });

  it('#componentDidUpdate for else', () => {
    const snapshot = true;
    const prevProps = { userLoggedIn: true };
    const prevState = {};
    const tree = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        displayLoginModal={displayLoginModal}
      />
    );
    const getUserStateStub = sinon.stub(common, 'getUserState').returns('2');
    tree.instance().componentDidUpdate(prevProps, prevState, snapshot);
    tree.setProps({ userLoggedIn: false });
    expect(tree.instance().props.displayLoginModal.called).to.be.equal(true);
    getUserStateStub.restore();
  });

  it('#toggleLoginModalState', () => {
    const tree = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
      />
    );
    tree.instance().toggleLoginModalState();
    expect(tree.state('redirectToPreviousRoute')).to.be.equal(true);
  });

  it('#toggleLoginModalState 2', () => {
    const tree = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
        previousRoute
      />
    );
    tree.instance().toggleLoginModalState();
    expect(tree.state('redirectToPreviousRoute')).to.be.equal(true);
  });

  it('should render thank you manager modalDialog component', () => {
    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
      />
    );
    wrapper.setState({ hideLoginView: true });
    expect(wrapper.find(ModalDialog).length).to.equal(1);
  });

  it('should not render thank you manager modalDialog component if user is logged in', () => {
    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        displayLoginModal={displayLoginModal}
        userLoggedIn={loggedIn}
        registrySwitchConfig={{ enableNewRegDashboard: true }}
        eventType={'Wedding'}
        previousRoute
      />
    );
    wrapper.setProps({ previousRoute: true });
    expect(wrapper.find(ModalDialog).length).to.equal(0);
  });

  it('should render TymList when listDatatym returns data', () => {
    const listDatatym = ['mockItem'];

    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={'false'}
        listDatatym={listDatatym}
        userLoggedIn={loggedIn}
      />
    );

    expect(wrapper.find(TymList).length).to.equal(1);
  });

  it('should render ThankYouEmpty when listDatatym is empty', () => {
    const listDatatym = [];

    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={'false'}
        listDatatym={listDatatym}
        userLoggedIn={loggedIn}
      />
    );

    expect(wrapper.find(ThankYouEmpty).length).to.equal(1);
  });

  it('should render TYMSignIn component when userLoggedIn is false', () => {
    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
      />
    );

    expect(wrapper.find(TYMSignIn).length).to.equal(1);
  });

  it('should call updateView', () => {
    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
      />
    );

    wrapper.instance().updateView();
    expect(wrapper.state('sortDirection')).to.be.equal(undefined);
  });
  it('should call onDeviceVerificationModalOpen and onDeviceModalClose', () => {
    const wrapper = shallow(
      <ThankYouManagerLayout
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        labels={labels}
        enableTymDynamicContent={enableTymDynamicContent}
        userLoggedIn={notLoggedIn}
        displayLoginModal={displayLoginModal}
      />
    );
    wrapper.setState({ hideLoginView: false });
    wrapper.instance().onDeviceVerificationModalOpen();
    expect(wrapper.state('hideLoginView')).to.be.equal(true);
    wrapper.instance().onDeviceModalClose();
    expect(wrapper.state('hideLoginView')).to.be.equal(false);
  });
});
