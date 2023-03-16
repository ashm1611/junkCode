/* eslint-disable max-lines */
import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import * as commonUtil from '@bbb-app/utils/common';
import * as utilsSetFocus from '@bbb-app/utils/setFocus';
import * as validator from '@bbb-app/forms/validations/validator';
import { EditRegistry, mapDispatchToProps } from '../EditRegistry';
import * as createRegistryUtils from '../../../../../components/Pages/Registry/CreateRegistry/CreateRegistryUtils';
import * as EditRegistryConfig from '../EditRegistryConfig';

configure({ adapter: new Adapter() });

const labels = { test: 'key' };
const data = {
  eventType: 'Wedding',
  id: 'DC1500002',
  public: true,
  CoRegistrantEmail: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantEmail',
    id: 'DC1400016',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  CoRegistrantFirstName: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantFirstName ',
    id: 'DC1200001',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  CoRegistrantLastName: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'CoRegistrantLastName',
    id: 'DC1400015',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  MobileNumber: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'MobileNumber',
    id: 'DC1500001',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  PhoneNumber: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'PhoneNumber',
    id: 'DC1300001',
    requiredInputCreate: false,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: false,
  },
  confirmPassword: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'confirmPassword',
    id: 'DC1500013',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: false,
  },
  eventDate: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'eventDate',
    id: 'Wedding_eventDate',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  favoriteStore: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'favoriteStore',
    id: 'DC1500012',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  futureShippingDate: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'futureShippingDate',
    id: 'DC1500011',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  networkAffiliation: {
    autoCheck: true,
    displayOnForm: true,
    fieldName: 'networkAffiliation',
    id: 'DC1300006',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  numberOfGuests: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'numberOfGuests',
    id: 'DC1500005',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showContactAddress: {
    autoCheck: false,
    displayOnForm: false,
    fieldName: 'showContactAddress',
    id: 'DC1500007',
    requiredInputCreate: false,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showFutureShippingAddr: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'showFutureShippingAddr',
    id: 'DC1500009',
    requiredInputCreate: true,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  showShippingAddress: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'showShippingAddress',
    id: 'DC1500008',
    requiredInputCreate: true,
    requiredInputUpdate: true,
    requiredToMakeRegPublic: true,
  },
  showerDate: {
    autoCheck: false,
    displayOnForm: false,
    fieldName: 'showerDate',
    id: 'DC1500006',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
  useContactAddrAsShippingAddr: {
    autoCheck: false,
    displayOnForm: true,
    fieldName: 'useContactAddrAsShippingAddr',
    id: 'DC1500010',
    requiredInputCreate: false,
    requiredInputUpdate: false,
    requiredToMakeRegPublic: false,
  },
};
const defaultState = {
  coRegProfileStatus: 'false',
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
  babyMaidenName: '',
  babyMaidenNameError: '',
  babyNurseryTheme: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  email: '',
  emailError: '',
  gender: '',
  babyGender: '',
  coFirstName: '',
  coFirstNameError: '',
  coLastName: '',
  coLastNameError: '',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  eventDate: '',
  showerDate: '',
  eventDateError: '',
  babyExpectedArivalDate: '',
  babyExpectedArivalDateError: '',
  guests: '',
  guestsError: '',
  primaryPh: '',
  primaryPhError: '',
  mobilePh: '',
  mobilePhError: '',
  street: '',
  streetError: '',
  apartment: '',
  apartmentError: '',
  zip: '',
  zipError: '',
  password: '',
  passwordError: true,
  confirmPassword: '',
  confirmPasswordError: true,
  addressOne: '',
  addressOneError: '',
  addressTwo: '',
  addressTwoError: '',
  city: '',
  cityError: '',
  state: '',
  stateError: '',
  showerDateError: '',
  showMoveInInfo: false,
  showShippingInfo: false,
  shippingPhone: '',
  shippingPhoneError: '',
  shippingStreet: '',
  shippingStreetError: '',
  shippingApartment: '',
  shippingApartmentError: '',
  moveInStreet: '',
  moveInStreetError: '',
  moveInApartment: '',
  moveInApartmentError: '',
  errorMessages: {
    message: 'test:test',
  },
};

const newState = {
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.com',
  gender: 'bride',
  coFirstName: 'Test',
  coLastName: 'Test',
  coEmail: 'test1@test.com',
  coGender: 'groom',
  eventDate: '12/12/2019',
  showerDate: '12/12/2019',
  guests: 120,
  primaryPh: '(915) 988-0516',
  mobilePh: '(915) 988-0516',
  street: '123',
  zip: '11003',
  password: 'abs@1234',
  passwordError: false,
  confirmPasswordError: false,
  showMoveInInfo: true,
  showShippingInfo: true,
  coRegProfileStatus: 'false',
  thirdPartySelected: true,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  babyMaidenName: 'abc',
  babyNurseryTheme: 'abcd',
  babyGender: 'B',
  babyExpectedArivalDate: '12/12/2019',
  apartment: 'sssa',
  addressOne: 'aaaa',
  addressTwo: 'bbb',
  city: 'CT',
  state: 'DEL',
  shippingPhone: '(915) 988-0516',
  shippingStreet: 'bbb',
  shippingApartment: 'sss',
  moveInStreet: 'aaa',
  moveInApartment: 'ccc',
};

const updateTymTabClickStatus = sinon.spy();

const getEditRegistryData = sinon.stub();

describe(__filename, () => {
  it('should render Wedding registry correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.WEDDING,
        },
      },
    };
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        registryDetails={registryDetails}
        signInDetails={signinDetails}
        registryID={'123456'}
        updateTymTabClickStatus={updateTymTabClickStatus}
        labels={labels}
        isPublic="1"
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.setState(defaultState);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render Baby registry correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.BABY,
        },
      },
    };
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        registryDetails={registryDetails}
        signInDetails={signinDetails}
        registryID={'123456'}
        isPublic="0"
        labels={labels}
        isFetchingEditRegistryDetails={false}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    expect(tree.find('div')).to.have.lengthOf(1);
  });

  it('should render skeleton correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.BABY,
        },
      },
    };
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        registryDetails={registryDetails}
        signInDetails={signinDetails}
        registryID={'123456'}
        isPublic="0"
        labels={labels}
        isFetchingEditRegistryDetails
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    expect(tree.find('div')).to.have.lengthOf(1);
  });

  it('should render the component when LearnMoreModal of GroupGift is clicked', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.WEDDING,
        },
      },
    };
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        registryDetails={registryDetails}
        signInDetails={signinDetails}
        registryID={'123456'}
        isPublic="0"
        labels={labels}
        isFetchingEditRegistryDetails
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
        LearnMoreModalGG
      />
    );
    expect(tree.find('div')).to.have.lengthOf(0);
  });

  it('should render Other registry correctly', () => {
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.COLLEGE,
        },
      },
    };
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        registryDetails={registryDetails}
        signInDetails={signinDetails}
        registryID={'123456'}
        isPublic="0"
        labels={labels}
        isFetchingEditRegistryDetails
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    expect(tree.find('div')).to.have.lengthOf(1);
  });

  it('should render blank when registryDetails are not present correctly', () => {
    const signinDetails = { editText: 'Edit' };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('componentWillReceiveProps: empty updatedState with registryDetails', () => {
    const signinDetails = { editText: 'Edit', isLoggedIn: true };
    const fetchStore = sinon.stub();
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.COLLEGE,
          groupGiftOptIn: true,
          shippingAddress: {
            addressLine1: 'some address',
            addressLine2: 'some address 2',
            city: '',
            state: '',
            postalCode: '',
          },
          futureShippingAddress: {
            addressLine1: 'future address',
            addressLine2: 'future address 2',
            city: 'NY',
            state: 'New york',
            postalCode: '2979237',
          },
        },
        registryVO: {
          networkAffiliation: 'thirdPartySelected',
        },
      },
    };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        fetchStore={fetchStore}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
        isTymTabClicked={false}
        setIsEditFetching={sinon.spy()}
        setPrivPubToggleClicked={sinon.spy()}
      />
    );
    tree.setState({ profileAddress: '', isPublic: '1', isFromToggle: true });
    tree.instance().getEditRegistryDataCalled = false;
    tree.instance().componentWillReceiveProps({
      registryDetails,
      getEditRegistryData,
      privPubToggleClicked: true,
    });
    expect(tree.state('groupGiftInitialStateOptIn')).to.be.equal(true);

    tree.setProps({
      registryDetails: {
        registryResVO: { registryVO: { networkAffiliation: 'Y' } },
      },
    });
  });
  it('componentWillReceiveProps: empty updatedState with registryDetails 2', () => {
    const signinDetails = { editText: 'Edit', isLoggedIn: true };
    const fetchStore = sinon.stub();
    const registryDetails = {
      test: 'value',
      registryResVO: {
        registrySummaryVO: {
          eventType: createRegistryUtils.eventTypeConst.COLLEGE,
          groupGiftOptIn: true,
          shippingAddress: {
            addressLine1: 'some address',
            addressLine2: 'some address 2',
            city: '',
            state: '',
            postalCode: '',
          },
          futureShippingAddress: {
            addressLine1: 'future address',
            addressLine2: 'future address 2',
            city: 'NY',
            state: 'New york',
            postalCode: '2979237',
          },
        },
        registryVO: {
          networkAffiliation: 'thirdPartySelected',
        },
      },
    };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        fetchStore={fetchStore}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
        isTymTabClicked={false}
        setIsEditFetching={sinon.spy()}
        setPrivPubToggleClicked={sinon.spy()}
      />
    );
    tree.setState({ profileAddress: '', isPublic: '0', isFromToggle: true });
    tree.instance().getEditRegistryDataCalled = false;
    tree.instance().componentWillReceiveProps({
      registryDetails,
      getEditRegistryData,
      privPubToggleClicked: true,
    });
    expect(tree.state('groupGiftInitialStateOptIn')).to.be.equal(true);

    tree.setProps({
      registryDetails: {
        registryResVO: { registryVO: { networkAffiliation: 'Y' } },
      },
    });
  });

  it('componentWillReceiveProps: empty updatedState with blank registryDetails', () => {
    const signinDetails = { editText: 'Edit', isLoggedIn: true };
    const registryDetails = {};
    const fetchStore = sinon.stub();
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        closeModalFlag={false}
        fetchStore={fetchStore}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
        setIsEditFetching={sinon.spy()}
        clearEditRegistryData={sinon.spy()}
        setPrivPubToggleClicked={sinon.spy()}
      />
    );
    tree.instance().componentWillReceiveProps({
      registryDetails,
      privPubToggleClicked: true,
    });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('onSelectSubscribe : Set state to selected state', () => {
    const signinDetails = { editText: 'Edit' };
    const selectedState = true;
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().onSelectSubscribe(selectedState);
    expect(tree.state('subscribeSelected')).to.equal(selectedState);
  });

  it('onSelectThirdPartyOption  : Set thirdPartySelected state to selected state', () => {
    const signinDetails = { editText: 'Edit' };
    const selectedState = true;
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().onSelectThirdPartyOption(selectedState);
    expect(tree.state('thirdPartySelected')).to.equal(selectedState);
  });

  it('showShippingInfo  : Set showShippingInfo state to true', () => {
    const signinDetails = { editText: 'Edit' };
    const e = { preventDefault: sinon.stub() };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().showShippingInfo(e);
    expect(tree.state('showShippingInfo')).to.equal(true);
  });

  it('hideShippingInfo  : Set showShippingInfo state to true', () => {
    const signinDetails = { editText: 'Edit' };
    const e = { preventDefault: sinon.stub() };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().hideShippingInfo(e);
    expect(tree.state('showShippingInfo')).to.equal(false);
  });

  it('showMoveInfo  : Set showMoveInfo state to true', () => {
    const signinDetails = { editText: 'Edit' };
    const e = { preventDefault: sinon.stub() };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().showMoveInfo(e);
    expect(tree.state('showMoveInInfo')).to.equal(true);
  });

  it('hideMoveInfo  : Set hideMoveInfo state to true', () => {
    const signinDetails = { editText: 'Edit' };
    const e = { preventDefault: sinon.stub() };
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().hideMoveInfo(e);
    expect(tree.state('showMoveInInfo')).to.equal(false);
  });

  it('updateState  : should update State', () => {
    const mockState = { mockStateKey: 'mockStateValue' };
    const signinDetails = { editText: 'Edit' };

    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().updateState(mockState);
    expect(tree.state('mockStateKey')).to.equal('mockStateValue');
  });

  it('toggleModalState  : should toggle modal State', () => {
    const signinDetails = { editText: 'Edit' };
    const clearEditRegistryData = sinon.stub();
    const editRegistryFromMoreInformationBtn = sinon.spy();
    const tree = shallow(
      <EditRegistry
        labels={labels}
        clearEditRegistryData={clearEditRegistryData}
        signInDetails={signinDetails}
        setEditRegistryModalStateFlag={sinon.spy()}
        getEditRegistryData={getEditRegistryData}
        editRegistryFromMoreInformationBtn={editRegistryFromMoreInformationBtn}
        openEditRegistryModal
        setIsChunkLoaded={sinon.stub()}
        setIsEditFetching={sinon.stub()}
      />
    );
    tree.instance().toggleModalState(false);
    expect(tree.state('modalMountedState')).to.equal(false);
  });

  it('toggleModalState  : should toggle modal State - output 2', () => {
    const signinDetails = { editText: 'Edit' };
    const clearEditRegistryData = sinon.stub();
    const setEditRegistryModalStateFlag = sinon.stub();
    const editRegistryFromMoreInformationBtn = sinon.stub();
    const tree = shallow(
      <EditRegistry
        labels={labels}
        clearEditRegistryData={clearEditRegistryData}
        signInDetails={signinDetails}
        setEditRegistryModalStateFlag={setEditRegistryModalStateFlag}
        editRegistryFromMoreInformationBtn={editRegistryFromMoreInformationBtn}
        getEditRegistryData={getEditRegistryData}
        setIsEditFetching={sinon.stub()}
        setIsChunkLoaded={sinon.stub()}
        registryID="454545"
      />
    );
    tree
      .find('EditRegistryComponent')
      .props()
      .onDeviceModalClose();

    tree
      .find('EditRegistryComponent')
      .props()
      .onDeviceVerificationModalOpen();
    tree.instance().toggleModalState(false);
    expect(setEditRegistryModalStateFlag.called).to.be.equal(false);
  });

  it('should call the componentdidUpdate of editRegistry', () => {
    const signinDetails = { editText: 'Edit' };
    const clearEditRegistryData = sinon.stub();
    const tree = shallow(
      <EditRegistry
        labels={labels}
        clearEditRegistryData={clearEditRegistryData}
        signInDetails={signinDetails}
        getEditRegistryData={getEditRegistryData}
        setIsChunkLoaded={sinon.stub()}
        setIsEditFetching={sinon.stub()}
      />
    );
    tree.setState({
      modalMountedState: false,
      isPublic: '1',
      isToggleClicked: true,
    });
    tree.setProps({ openEditRegistryModal: true });
    tree
      .instance()
      .componentDidUpdate(
        { openEditRegistryModal: false },
        { isPublic: '0', isToggleClicked: true }
      );
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('mapDispatchToProps should return a prop clearEditRegistryData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.clearEditRegistryData();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop emptyQasData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.emptyQasData();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getEditRegistryData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getEditRegistryData('12345');
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updateContactAddressModalQasVisibility when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updateContactAddressModalQasVisibility(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updateMovingAddressModalQasVisibility when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updateMovingAddressModalQasVisibility(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updateShippingAddressModalQasVisibility when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updateShippingAddressModalQasVisibility(true);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop setUserAddressData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.setUserAddressData({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchQasData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchQasData({});
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getUpdatedRegistryData when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getUpdatedRegistryData('12345', false);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop getRegistryOwnerFirstCategory when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getRegistryOwnerFirstCategory('12345', 'BRD', '12/08/1993', false);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop fetchRegistriesDetails when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.fetchRegistriesDetails('12345', 40);
    expect(dispatch.called).to.equal(true);
  });

  it('handleEditRegistryClick  : should open modal', () => {
    const signinDetails = { editText: 'Edit' };
    const getEditRegistryDatastub = sinon.stub();
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        updateTymTabClickStatus={updateTymTabClickStatus}
        getEditRegistryData={getEditRegistryDatastub}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    tree.instance().handleEditRegistryClick({ preventDefault: () => {} });
    expect(tree.state('modalMountedState')).to.equal(true);
  });

  it('submitData should call getItemsByPrice for priceView', async () => {
    const signinDetails = { editText: 'Edit' };
    const getEditRegistryDatastub = sinon.stub();
    const getItemsByPrice = sinon.stub();
    const getUpdatedRegistryData = sinon.stub();
    const replaceHistoryStub = sinon.stub(window.history, 'replaceState');
    const triggerServerRequest = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          resolve => {
            const result = {
              body: { serviceStatus: 'SUCCESS' },
            };
            resolve(result);
          },
          () => {}
        );
      });
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getItemsByPrice={getItemsByPrice}
        updateTymTabClickStatus={updateTymTabClickStatus}
        getEditRegistryData={getEditRegistryDatastub}
        setIsChunkLoaded={sinon.stub()}
        getUpdatedRegistryData={getUpdatedRegistryData}
        setIsEditFetching={sinon.stub()}
        clearEditRegistryData={sinon.spy()}
        setIsPublicState={sinon.spy()}
      />
    );
    tree.setProps({ variation: 'priceView' });
    tree.instance().toggleModalState = sinon.spy();
    await tree.instance().submitData();
    replaceHistoryStub.restore();
    expect(getItemsByPrice.called).to.equal(true);
    triggerServerRequest.restore();
  });

  it('submitData should call getRegistryOwnerFirstCategory for Date or Category', async () => {
    const signinDetails = { editText: 'Edit' };
    const getEditRegistryDatastub = sinon.stub();
    const getRegistryOwnerFirstCategory = sinon.stub();
    const getUpdatedRegistryData = sinon.stub();
    const replaceHistoryStub = sinon.stub(window.history, 'replaceState');
    const triggerServerRequest = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => {
        return new Promise(
          resolve => {
            const result = {
              body: { serviceStatus: 'SUCCESS' },
            };
            resolve(result);
          },
          () => {}
        );
      });
    const tree = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        getRegistryOwnerFirstCategory={getRegistryOwnerFirstCategory}
        updateTymTabClickStatus={updateTymTabClickStatus}
        getEditRegistryData={getEditRegistryDatastub}
        setIsChunkLoaded={sinon.stub()}
        getUpdatedRegistryData={getUpdatedRegistryData}
        setIsEditFetching={sinon.stub()}
        clearEditRegistryData={sinon.spy()}
        setIsPublicState={sinon.spy()}
        openEditRegistryModal
      />
    );
    tree.setProps({ variation: 'Date' });
    tree.instance().toggleModalState = sinon.spy();
    await tree.instance().submitData();
    replaceHistoryStub.restore();
    expect(getRegistryOwnerFirstCategory.called).to.equal(true);
    triggerServerRequest.restore();
  });

  it('mapUpdatedPropsToState should return correct state object', () => {
    const statePropMap = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      mobileNumber: 'mobilePh',
      phoneNumber: 'primaryPh',
      gender: 'gender',
      'shippingAddress.address1': 'street',
      'shippingAddress.address2': 'apartment',
      'shippingAddress.postalCode': 'zip',
    };
    const obj1 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobileNumber: '219789928',
      phoneNumber: '2323232323',
      gender: 'male',
      shippingAddress: {
        address1: 'some address',
        address2: 'some address 2',
        postalCode: '2979237',
      },
    };
    const obj2 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobileNumber: '219789928',
      phoneNumber: '2323232323',
    };
    const expectedResult1 = {
      firstName: 'Test',
      lastName: 'TestB',
      email: 'test@test',
      mobilePh: '219789928',
      primaryPh: '2323232323',
      gender: 'male',
      street: 'some address',
      apartment: 'some address 2',
      zip: '2979237',
    };
    const expectedResult2 = {
      gender: 'male',
      street: 'some address',
      apartment: 'some address 2',
      zip: '2979237',
    };
    const signinDetails = { editText: 'Edit' };
    const getRegistryDetails = sinon.stub();
    const wrapper = shallow(
      <EditRegistry
        signInDetails={signinDetails}
        getRegistryDetails={getRegistryDetails}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    expect(
      wrapper.instance().mapUpdatedPropsToState({}, obj1)(statePropMap)
    ).to.deep.equal(expectedResult1);
    expect(
      wrapper.instance().mapUpdatedPropsToState(obj2, obj1)(statePropMap)
    ).to.deep.equal(expectedResult2);
  });

  it('click on submit button', () => {
    const signinDetails = { editText: 'Edit' };
    const wrapper = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        isFetchingEditRegistryDetails={false}
        getEditRegistryData={sinon.spy()}
        setIsChunkLoaded={sinon.stub()}
        clearEditRegistryData={sinon.spy()}
        setIsEditFetching={sinon.spy()}
      />
    );
    wrapper.setState(defaultState);
    wrapper
      .instance()
      .checkFormSubmit(
        'Wedding',
        '12345',
        { data, preventDefault: () => {} },
        true
      );
    expect(wrapper.state('firstName')).to.equal('');
  });

  it('click on submit button for eventtype = HouseWarming', () => {
    const signinDetails = { editText: 'Edit' };
    const wrapper = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        isFetchingEditRegistryDetails={false}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    wrapper.setState(defaultState);
    wrapper.instance().checkFormSubmit('HouseWarming', '12345', {
      data,
      preventDefault: () => {},
    });
    expect(wrapper.state('firstName')).to.equal('');
  });

  it('click on submit button without any errors', () => {
    const signinDetails = { editText: 'Edit' };
    const getEditRegistryDataStub = sinon.stub();
    const initiateInactivityModal = sinon.stub();
    const wrapper = shallow(
      <EditRegistry
        labels={labels}
        signInDetails={signinDetails}
        isFetchingEditRegistryDetails={false}
        getEditRegistryData={getEditRegistryDataStub}
        openEditRegistryModal
        initiateInactivityModal={initiateInactivityModal}
        setIsChunkLoaded={sinon.stub()}
        clearEditRegistryData={sinon.spy()}
        setIsEditFetching={sinon.spy()}
      />
    );
    wrapper.setState(newState);
    /* eslint-disable */
    wrapper
      .instance()
      .checkFormSubmit('Baby', '12345', { data, preventDefault: () => {} });
    expect(wrapper.state('firstName')).to.equal('Test');
  });

  it('should call dispatch fetchCoRegistrantProfileStatus', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.fetchCoRegistrantProfileStatus();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch fetchReferredContent', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);
    props1.getContent();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch editRegistryFromMoreInformationBtn', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.editRegistryFromMoreInformationBtn();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch resetCoRegistrantProfileStatus', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.resetCoRegistrantProfileStatus();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch handleTealiumAction', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.handleTealiumAction();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch fetchOwnAndRecommendedRegistryDetails', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.fetchOwnAndRecommendedRegistryDetails();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch updateShippingAddressModalQasVisibility', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.updateShippingAddressModalQasVisibility();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch favoriteStoreId', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.favoriteStoreId();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch updateTymTabClickStatus', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.updateTymTabClickStatus();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should call dispatch getProfileData', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);

    props.getProfileData();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('mapUpdatedPropsToState should return correct state object', () => {
    /* eslint-disable no-underscore-dangle*/
    window.__SITE_ID__ = 'BedBathCanada';
    const expectedResult2 = { shippingState: { rule: 'qcState', value: 'QC' } };
    const registryInputs = { showShippingAddress: true };
    const wrapper = shallow(
      <EditRegistry
        enabledVendors={{ canadaShipRestrictionEnabled: true }}
        setIsChunkLoaded={sinon.stub()}
      />
    );
    wrapper.setState({ shippingState: 'QC', shippingStreet: 'some street' });
    expect(wrapper.instance().shippingValidation(registryInputs)).to.deep.equal(
      expectedResult2
    );
    /* eslint-disable no-underscore-dangle*/
    window.__SITE_ID__ = 'BedBathUS';
  });
  it('#onSelectRBYROption should update the state storedValueOptIn', () => {
    const wrapper = shallow(<EditRegistry setIsChunkLoaded={sinon.stub()} />);
    const instance = wrapper.instance();
    instance.onSelectRBYROption(true);
    expect(instance.state.storedValueOptIn).to.be.equal(true);
    instance.onSelectRBYROption(false);
    expect(instance.state.storedValueOptIn).to.be.equal(false);
  });
  it('#componentWillUnmount should unmount the component', () => {
    const updateTymTabClickStatus = sinon.spy();
    const props = {
      setIsEditFetching: sinon.spy(),
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
      openEditRegistryModal: true,
      getProfileData: sinon.spy(),
      favoriteStoreId: sinon.spy(),
      setEditRegistryModalStateFlag: sinon.spy(),
      getEditRegistryData: sinon.spy(),
      qasData: {
        isFetching: false,
      },
      isCYPTipsModule: true,
    };
    const clearEditRegistryData = sinon.stub();
    const wrapper = shallow(
      <EditRegistry
        updateTymTabClickStatus={updateTymTabClickStatus}
        setIsChunkLoaded={sinon.stub()}
        clearEditRegistryData={clearEditRegistryData}
        {...props}
      />
    );
    const instance = wrapper.instance();
    instance.componentWillUnmount();
    expect(updateTymTabClickStatus.called).to.be.equal(true);
  });
  it('should call shippingDateByRegion, zipRuleByRegion, stateRuleByRegion, parseDateByRegion and dateFormatByRegion for canada region', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(true);
    const wrapper = shallow(<EditRegistry {...props} />);
    const instance = wrapper.instance();
    // shippingDateByRegion call
    const region = instance.shippingDateByRegion();
    expect(region).to.be.equal('futureShippingDateCA');
    // zipRuleByRegion call
    const region1 = instance.zipRuleByRegion();
    expect(region1).to.be.equal('postalCodeCA');
    // stateRuleByRegion call
    const region2 = instance.stateRuleByRegion();
    expect(region2).to.be.equal('qcState');
    // parseDateByRegion call
    instance.parseDateByRegion();
    // dateFormatByRegion call
    const region4 = instance.dateFormatByRegion();
    expect(region4).to.be.equal('eventDateCanada');
    isBedBathCanadaStub.restore();
  });
  it('should call moveInValidation and return blank city and apartment ', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const stateObj = {
      showMoveInInfo: true,
    };
    const registryInputs = {
      showFutureShippingAddr: {
        requiredInputCreate: true,
      },
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    const region = instance.moveInValidation(registryInputs);
    expect(typeof region).to.be.equal('object');
    checkForRequiredStub.restore();
  });
  it('should call moveInValidation and return blank qcState', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const stateObj = {
      moveInAddressOne: 'some address',
      showMoveInInfo: true,
    };
    const registryInputs = {
      showFutureShippingAddr: {
        requiredInputCreate: true,
      },
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(false);
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    const region = instance.moveInValidation(registryInputs);
    expect(typeof region).to.be.equal('object');
    isBedBathCanadaStub.restore();
    checkForRequiredStub.restore();
  });
  it('should call shippingValidation and return same shippingState', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const stateObj = {
      shippingState: '',
    };
    const registryInputs = {
      showShippingAddress: '',
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(true);
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.shippingValidation(registryInputs);
    expect(wrapper.state('shippingState')).to.be.equal('');
    isBedBathCanadaStub.restore();
    checkForRequiredStub.restore();
  });
  it('should call eventInfoValidation and return college from state object', () => {
    const stateObj = {
      college: 'abc',
    };
    const registryInputs = {
      college: '',
    };
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    instance.eventInfoValidation(registryInputs);
    expect(wrapper.state('college')).to.be.equal('abc');
  });
  it('should call contactInfoValidation and return blank primaryPh in state', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const eventType = 'University';
    const stateObj = {
      primaryPh: '',
      mobilePh: '98959494',
    };
    const registryInputs = {
      PhoneNumber: '1234',
      showContactAddress: '',
      MobileNumber: { requiredInputCreate: true },
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(true);
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.contactInfoValidation(registryInputs, eventType);
    expect(wrapper.state('primaryPh')).to.be.equal('');
    isBedBathCanadaStub.restore();
    checkForRequiredStub.restore();
  });
  it('should call contactInfoValidation and handle phone no', () => {
    const props = {
      enabledVendors: {
        canadaShipRestrictionEnabled: true,
      },
    };
    const eventType = 'University';
    const stateObj = {
      primaryPh: '1234567890',
      mobilePh: '0998959494',
    };
    const registryInputs = {
      PhoneNumber: '1234',
      showContactAddress: '',
      MobileNumber: { requiredInputCreate: true },
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.contactInfoValidation(registryInputs, eventType);
    expect(wrapper.state('primaryPh')).to.be.equal('1234567890');
    checkForRequiredStub.restore();
  });
  it('should call dateValidation and return blank eventDate in state', () => {
    const stateObj = {
      eventDate: '',
    };
    const registryInputs = {
      eventDate: '',
      babyExpectedArivalDate: '',
    };
    const checkForRequiredStub = sinon
      .stub(createRegistryUtils, 'checkForRequired')
      .returns(false);
    const wrapper = shallow(<EditRegistry />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    instance.dateValidation(registryInputs);
    expect(wrapper.state('eventDate')).to.be.equal('');
    checkForRequiredStub.restore();
  });
  it('should call coRegEmailFlag and return true iscoRegEmailFlag in state', () => {
    const stateObj = {
      iscoRegEmailFlag: false,
    };
    const props = {
      LearnMoreModalGG: true,
    };
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    instance.coRegEmailFlag(true);
    expect(wrapper.state('iscoRegEmailFlag')).to.be.equal(true);
  });

  it('should call checkFormSubmit and gives error', () => {
    const props = {
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            futureShippingDate: '',
            eventDate: '',
          },
        },
      },
    };
    const stateObj = {
      eventDate: '12/12/2021',
    };
    const errorObj = {
      errors: {},
    };
    const date = 'Tue Jan 12 2021 08:04:57 GMT+0530 (India Standard Time)';
    document.body.innerHTML = '<input type="checkbox" id="genderBaby1Boy"/>';
    const setFocusStub = sinon.stub(utilsSetFocus, 'setFocus').returns(true);
    const validateBabyMultiplesStub = sinon
      .stub(createRegistryUtils, 'validateBabyMultiples')
      .returns(errorObj);
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    const evt = {
      type: '',
      preventDefault: sinon.spy(),
    };
    const parseDateStub = sinon
      .stub(instance, 'parseDateByRegion')
      .returns(date);
    instance.checkFormSubmit('WEDDING', '1234', evt);
    expect(wrapper.state('eventDate')).to.be.equal('12/12/2021');
    validateBabyMultiplesStub.restore();
    setFocusStub.restore();
    parseDateStub.restore();
  });

  it('should call checkFormSubmit and called submitData', () => {
    const props = {
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
    };
    const stateObj = {
      eventDate: '12/12/2021',
    };
    const formData = {};
    const submitRegistryDataStub = sinon
      .stub(EditRegistryConfig, 'submitRegistryData')
      .returns(formData);
    const validateAllStub = sinon
      .stub(validator, 'validateAll')
      .returns(undefined);
    const validateBabyMultiplesStub = sinon
      .stub(createRegistryUtils, 'validateBabyMultiples')
      .returns(undefined);
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    const evt = {
      type: '',
      preventDefault: sinon.spy(),
    };
    instance.checkFormSubmit('WEDDING', '1234', evt);
    expect(wrapper.state('eventDate')).to.be.equal('12/12/2021');
    validateBabyMultiplesStub.restore();
    submitRegistryDataStub.restore();
    validateAllStub.restore();
  });

  it('should call submitData and called setEditRegistryModalStateFlag', async () => {
    const props = {
      clearEditRegistryData: sinon.spy(),
      setIsEditFetching: sinon.spy(),
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
      openEditRegistryModal: true,
      getProfileData: sinon.spy(),
      favoriteStoreId: sinon.spy(),
      setEditRegistryModalStateFlag: sinon.spy(),
      getEditRegistryData: sinon.spy(),
      fetchOwnAndRecommendedRegistryDetails: sinon.spy(),
      qasData: {
        isFetching: false,
      },
    };
    const stateObj = {
      eventDate: '12/12/2021',
      errorMessages: null,
    };
    const data = {
      body: {
        serviceStatus: 'SUCCESS',
        response: {
          data: {
            errorMessages: [{ message: 'some error' }],
          },
        },
      },
    };
    let triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .resolves(data);
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    instance.submitData({}, '1234', 'WED', '12/12/2021');
    setImmediate(() => {
      // <-- that solves async setState in componentDidMount
      Promise.resolve();
      wrapper.update();
      expect(wrapper.state('errorMessages')).to.be.equal(null);
    });

    triggerServerRequestStub.restore();
  });

  it('should call submitData and gives error for catch of then', async () => {
    const props = {
      isNewRegDashboard: true,
      clearEditRegistryData: sinon.spy(),
      setIsEditFetching: sinon.spy(),
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
      openEditRegistryModal: true,
      getProfileData: sinon.spy(),
      favoriteStoreId: sinon.spy(),
      setEditRegistryModalStateFlag: sinon.spy(),
      getEditRegistryData: sinon.spy(),
      qasData: {
        isFetching: false,
      },
    };
    const stateObj = {
      eventDate: '12/12/2021',
      errorMessages: null,
    };
    const data = {
      body: {
        serviceStatus: 'ERROR',
        response: {
          data: {
            errorMessages: [{ message: 'some error' }],
          },
        },
      },
    };
    let triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .rejects(data);
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    const instance = wrapper.instance();
    instance.submitData({}, '1234', 'WED', '12/12/2021', false);
    setImmediate(() => {
      // <-- that solves async setState in componentDidMount
      Promise.resolve();
      wrapper.update();
      expect(wrapper.state('errorMessages')).to.be.equal({
        message: 'some error',
      });
    });
    triggerServerRequestStub.restore();
  });
  it('should call submitData and called emptyQasData', () => {
    const props = {
      clearEditRegistryData: sinon.spy(),
      setIsEditFetching: sinon.spy(),
      eventTypeCode: 'WED',
      labels: {
        createRegistry: 'Create Registry',
      },
      openEditRegistryModal: true,
      getProfileData: sinon.spy(),
      favoriteStoreId: sinon.spy(),
      setEditRegistryModalStateFlag: sinon.spy(),
      getEditRegistryData: sinon.spy(),
      qasData: {
        isFetching: true,
      },
    };
    const stateObj = {
      eventDate: '12/12/2021',
    };
    const wrapper = shallow(<EditRegistry {...props} />);
    wrapper.setState(stateObj);
    wrapper.setProps(props);
    const instance = wrapper.instance();
    instance.submitData({}, '1234', 'WED', '12/12/2021', true);
    expect(wrapper.state('eventDate')).to.be.equal('12/12/2021');
  });
});
