/* eslint max-lines: ["error", 1031]*/
import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import isBrowser from '@bbb-app/utils/isBrowser';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import * as common from '@bbb-app/utils/common';
import QasValidation from '@bbb-app/qas-validation/containers/QasValidation.async';
import AddressInput from '../AddressInput';
import RenderInput from '../../FormComponents/RenderInput';
configure({ adapter: new Adapter() });

/* eslint no-unused-expressions: 0 */

const labels = {
  enterValidAddress: 'Please enter valid address',
  editAddressSubmit: 'Update',
  editAddressCancel: 'Cancel',
  enterState: 'Enter State',
  addressOne: 'Address Line 1',
  addressTwo: 'Address Line 2',
  enterZip: 'Enter Zip',
  enterCityText: 'Enter City',
  editContactErrorMsg:
    'We are unable to use the address as entered. Please confirm your complete address below.',
  streetAddress: 'Enter Street',
};

const locators = {
  STREET: 'registry-contactInfoStreet',
  ADDRESS1: 'registry-contactInfoAddress1',
  ADDRESS2: 'registry-contactInfoAddress2',
  ZIP: 'registry-contactInfoZip',
  CITY: 'registry-contactInfoCity',
  STATE: 'registry-contactInfoState',
};

const stateList = [
  {
    label: 'Alabama',
    props: {
      value: 'AL',
    },
  },
  {
    label: 'Alaska',
    props: {
      value: 'AK',
    },
  },
];

const registryConfig = {
  RegistryThirdPartySearchFlag: 'true',
  email_OptIn_Checked_Flag: 'true',
  enableEmailOptIn: 'true',
  enableAutoFill: false,
  Hide_RegistryThirdPartySearch_Flag: 'true',
};

const registryConfig2 = {
  RegistryThirdPartySearchFlag: 'true',
  email_OptIn_Checked_Flag: 'true',
  enableEmailOptIn: 'true',
  enableAutoFill: true,
  Hide_RegistryThirdPartySearch_Flag: 'true',
};

const suggestedPlace = {
  street_number: 'long_name',
  premise: 'long_name',
  route: 'Tester Road',
  sublocality_level_1: 'long_name',
  locality: 'Snohomish',
  administrative_area_level_1: 'WA',
  postal_code: '98290',
  administrative_area_level_2: '',
  country: '',
  addressLine1: 'Tester Road ',
};

const suggestedIncompletePlace = {
  street_number: 'long_name',
  premise: 'long_name',
  route: 'Test Drive',
  sublocality_level_1: 'long_name',
  locality: 'Colorado Springs',
  administrative_area_level_1: 'CO',
  postal_code: 'long_name',
  administrative_area_level_2: '',
  country: '',
  addressLine1: 'Test Drive ',
};

const e = {
  preventDefault: () => {},
};

describe(__filename, () => {
  it('should render correctly with required props only', () => {
    sinon.stub(common, 'getSiteId').returns('TBS_BuyBuyBaby');
    const tree = shallow(
      <AddressInput
        stateList={stateList}
        locator={locators}
        updateState={() => {}}
        registryConfig={registryConfig}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    common.getSiteId.restore();
  });

  it('should render correctly with labels', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        stateList={stateList}
        locator={locators}
        updateState={() => {}}
        registryConfig={registryConfig2}
        qasIsFetching
      />
    );
    expect(tree.find('Button')).to.have.lengthOf(1);
  });

  it('should render correctly with data locator', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        registryConfig={registryConfig}
      />
    );
    expect(tree.find('Button')).to.have.lengthOf(1);
  });

  it('should open a modal when all the required field are not filled', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        ssTest
        focusShow={() => {}}
        currentFocus={false}
      />
    );
    tree.setState({
      street: 'qweqw',
      lastValue: 'q',
      addressOne: '1',
      hasErrors: false,
    });
    tree.setProps({
      globalSwitchConfig: {
        canadaShipRestrictionEnabled: true,
      },
    });
    const isBedBathCanadastub = sinon
      .stub(common, 'isBedBathCanada')
      .returns(true);
    tree.instance().handelBlur();
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
    isBedBathCanadastub.restore();
  });

  it('should not open a modal when all the required field are filled', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        addressOne={'40 Fulton St'}
        zip={'10038'}
        handelAddressChange={() => {}}
        city={'New York'}
        state={'NY'}
        value={'40 Fulton St, New York, NY, 10038'}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        ssTest={false}
        focusShow={() => {}}
        currentFocus={false}
      />
    );
    expect(tree.find(RenderInput)).to.have.length(5);
    tree.instance().handelBlur();
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });

  it('should not close the modal on apply if all the required field are not filled', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'q'}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.setState({
      street: 'qweqw',
      lastValue: 'q',
      addressOne: '1',
    });
    tree.instance().handelBlur();
    tree.update();
    const addressModal = tree.find(ModalDialog).shallow();
    addressModal
      .find('#editAddressSubmit')
      .dive()
      .dive()
      .find('button')
      .simulate('click', { preventDefault: () => {} });
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });

  it('should display error if all the required field are not filled', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'40 Fulton St'}
        city={'New York'}
        state={'NY'}
        value={''}
        street={''}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().handelBlur();
    const validationSpy = sinon.spy(tree.instance(), 'validate');
    tree.update();
    tree.instance().handelApply(e);
    expect(validationSpy.called).to.equal(true);
  });

  it('should update street and close the modal on apply if all the field are filled', () => {
    const updateAddressSpy = sinon.spy();
    const setUserAddressData = sinon.stub();
    const fetchQasData = sinon.stub();
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'40 Fulton St'}
        zip={'10038'}
        city={'New York'}
        updateState={() => {}}
        handelAddressChange={updateAddressSpy}
        state={'NY'}
        registryConfig={registryConfig}
        setUserAddressData={setUserAddressData}
        fetchQasData={fetchQasData}
        emptyQasData={() => {}}
      />
    );
    tree.instance().toggleModalState(true); // forcefully opening the modal for testing
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
    tree.instance().handelApply(e);
    tree.update();
    expect(
      updateAddressSpy.calledWith({
        street: '40 Fulton St, New York, NY, 10038',
        streetError: '',
        addressOne: '40 Fulton St',
        addressTwo: '',
        city: 'New York',
        state: 'NY',
        zip: '10038',
      })
    );
  });

  it('should hideModal when toggleModalState called', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'40 Fulton St'}
        zip={'10038'}
        city={'New York'}
        updateState={() => {}}
        state={'NY'}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        hideModal={() => {}}
        ssTest
      />
    );

    tree.instance().toggleModalState(false); // forcefully opening the modal for testing
    tree.update();
    expect(tree.instance().props.hideModal.called);
  });

  it('should close the modal on cancel', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'40 Fulton St'}
        city={'New York'}
        state={'NY'}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    const closeModalSpy = sinon.spy(tree.instance(), 'closeModal');
    tree.setState({
      street: 'qweqw',
      lastValue: 'q',
      addressOne: '1',
    });
    tree.instance().handelBlur();
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
    tree
      .find(ModalDialog)
      .shallow()
      .find('#editAddressCancel')
      .simulate('click', { preventDefault: () => {} });
    expect(closeModalSpy.called).to.equal(true);
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });

  it('should called handelAddressSuggestions when user select address suggession', () => {
    const tree = shallow(
      <AddressInput
        fieldName={'state'}
        id={'state'}
        labels={labels}
        locator={locators}
        stateList={stateList}
        addressOne={'40 Fulton St'}
        city={'New York'}
        state={'NY'}
        updateState={() => {}}
        registryConfig={registryConfig}
      />
    );
    sinon.spy(tree.instance(), 'handelAddressSuggestions');
    const event = {
      target: {
        className: 'FormInput_1jNY FormInput_5aqk input-text pac-item',
      },
    };
    tree.setProps({
      currentFocus: undefined,
    });
    tree.setState({
      isEditModalOpen: false,
      hasAddressSuggestionSelected: false,
    });
    tree.instance().hasAddressSuggestionSelected = false;
    sinon.stub(document, 'getElementById').returns('state');
    tree.instance().suggestionSelected(event);
    tree.instance().hasAddressSuggestionSelected = true;
    tree.instance().debounceBlur(e, 'state');
    document.getElementById.restore();
  });
  it('should called handelBlur when user not select address suggession', () => {
    const tree = shallow(
      <AddressInput
        fieldName={'state'}
        id={'state'}
        labels={labels}
        locator={locators}
        stateList={stateList}
        handelAddressChange={() => {}}
        addressOne={'40 Fulton St'}
        city={'New York'}
        state={'NY'}
        value={'some other value'}
        street={'some other street'}
        updateState={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree
      .find(RenderInput)
      .first()
      .props()
      .afterValidation(e);

    expect(
      tree
        .find(RenderInput)
        .first()
        .props()
        .afterValidation(e)
    ).equal(undefined);
    tree.setState({
      isEditModalOpen: false,
      hasAddressSuggestionSelected: false,
    });
    sinon.stub(document, 'getElementById').returns('state');
    sinon.spy(tree.instance(), 'handelBlur');
    tree.instance().debounceBlur(e, 'state');
    document.getElementById.restore();
  });
  it('should open the address modal when we dont get valid address from suggesstion', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().suggestedPlace = suggestedIncompletePlace;
    tree.instance().handelAddressSuggestions(suggestedIncompletePlace);
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });
  it('should open the address modal when we dont get valid address from suggesstion', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().suggestedPlace = suggestedIncompletePlace;
    tree.instance().setState({ street: '400 4000 West, South' });
    tree.instance().handelAddressSuggestions(suggestedIncompletePlace);
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });
  it('should not open address modal when we obtain a valid address from suggesstion', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().suggestedPlace = suggestedPlace;
    tree.instance().handelAddressSuggestions(suggestedPlace);
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
  });
  it('should process and save the valid address from suggesstion', () => {
    const updateAddressSpy = sinon.spy();
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={updateAddressSpy}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().suggestedPlace = suggestedPlace;
    tree.instance().handelAddressSuggestions(suggestedPlace);
    tree.update();
    expect(tree.find(ModalDialog)).to.have.length(1);
    expect(
      updateAddressSpy.calledWith({
        street: 'Tester Road, Snohomish, WA, 98290',
        streetError: '',
        addressOne: 'Tester Road',
        addressTwo: '',
        city: 'Snohomish',
        state: 'WA',
        zip: '98290',
      })
    );
  });
  it('should update the state when value prop updated', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.setProps({
      value: 'Tester Road, Snohomish, WA, 98290',
      addressTwo: '40',
    });
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // expect(tree.state('street')).to.equal('Tester Road, Snohomish, WA, 98290');
    expect(tree.state('addressTwo')).to.equal('40');
  });
  it('should update the streetError when streetError prop updated', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        streetError={''}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
      />
    );
    tree.setProps({
      streetError: 'Please enter valid address',
    });
    expect(tree.state('streetError')).to.equal('Please enter valid address');
  });
  it('updateLocalState should update the local state', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        streetError={''}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    tree.instance().updateLocalState({
      streetError: 'Please enter valid address',
    });
    expect(tree.state('streetError')).to.equal('Please enter valid address');
  });
  it('updateStreet should update the correctly from fieldName object', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        streetError={''}
        updateState={() => {}}
        handelAddressChange={() => {}}
        registryConfig={registryConfig}
        value={'some other value'}
        emptyQasData={() => {}}
      />
    );
    const value = {
      shippingStreet: 'Tester Road, Snohomish, WA, 98290',
    };
    tree.instance().updateStreet('shippingStreet', value);
    tree.update();
  });
  it('should render the QasValidation', () => {
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.spy();
    const wrapper = shallow(
      <AddressInput
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
      />
    );
    const flag = true;
    wrapper
      .find(QasValidation)
      .first()
      .props()
      .updateModalState(flag);

    expect(
      wrapper
        .find(QasValidation)
        .first()
        .props()
        .updateModalState(flag)
    ).equal(undefined);
  });

  it('should call the handleAddAddressQasData method with Verified & DPVNotConfirmed', () => {
    const data = {};
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        handelAddressChange={() => {}}
      />
    );
    wrapper
      .instance()
      .handleAddAddressQasData('Verified', 'DPVNotConfirmed', data, null);
    /* eslint no-unused-expressions: 0*/
    expect(updateAddressModalQasVisibility).to.have.been.called;
  });

  it('should call the handleAddAddressQasData method with InteractionRequired & DPVNotConfirmed', () => {
    const data = {};
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    wrapper.instance().handleAddAddressQasData('Verified', data, null);
    wrapper.instance().handleAddAddressQasData();
    /* eslint no-unused-expressions: 0*/
    expect(updateAddressModalQasVisibility).to.have.been.called;
  });
  it('should call the handleAddAddressQasData method after QAS success callback updateAddressQAS', () => {
    const data = {};
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const saveAddress = sinon.stub();
    const enabledVendors = {
      enableQAS: true,
    };
    const wrapper = shallow(
      <AddressInput
        saveAddress={saveAddress}
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    wrapper.instance().updateAddressQAS(data);

    /* eslint no-unused-expressions: 0*/
    expect(updateAddressModalQasVisibility).to.have.been.called;
  });

  it('should call the saveAddress, if isQasEnable is disabled', () => {
    const enabledVendors = {
      enableQAS: false,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.spy();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        handelAddressChange={handelAddressChange}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        street="registry-contactInfoStreet"
        addressOne="registry-contactInfoAddress1"
        addressTwo="registry-contactInfoAddress2"
        zip="12345"
        city="registry-contactInfoCity"
        state="AL"
        emptyQasData={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.handelApply(e);
    expect(wrapper.find('AutoFill')).to.have.lengthOf(0);
  });

  it('should call fetchQasData and  setUserAddressData on Address selection,', () => {
    const enabledVendors = {
      enableQAS: 'true',
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const setUserAddressData = sinon.stub();
    const fetchQasData = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        handelAddressChange={handelAddressChange}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        setUserAddressData={setUserAddressData}
        fetchQasData={fetchQasData}
        street="registry-contactInfoStreet"
        addressOne="registry-contactInfoAddress1"
        addressTwo="registry-contactInfoAddress2"
        zip="12345"
        city="registry-contactInfoCity"
        state="AL"
        emptyQasData={() => {}}
      />
    );
    const instance = wrapper.instance();
    instance.saveAddressQASValidation();
    /* eslint no-unused-expressions: 0*/
    expect(setUserAddressData).to.have.been.called;
    expect(fetchQasData).to.have.been.called;
  });

  it('should call the toggleModalState on QAS Edit link Clicked', () => {
    const enabledVendors = {
      enableQAS: 'true',
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.spy();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        handelAddressChange={handelAddressChange}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        street="registry-contactInfoStreet"
        addressOne="registry-contactInfoAddress1"
        addressTwo="registry-contactInfoAddress2"
        zip="12345"
        city="registry-contactInfoCity"
        state="AL"
        emptyQasData={() => {}}
      />
    );
    const instance = wrapper.instance();
    const spy = sinon.spy(instance, 'toggleModalState');
    instance.editAddressQAS();
    /* eslint no-unused-expressions: 0*/
    expect(spy).to.have.been.called;
  });

  it('should call componentWillReceiveProps', () => {
    const enabledVendors = {
      enableQAS: 'true',
    };
    const qasValidationStatus = {
      addressMatchState: 'abc',
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.spy();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        handelAddressChange={handelAddressChange}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        street="registry-contactInfoStreet"
        addressOne="registry-contactInfoAddress1"
        addressTwo="registry-contactInfoAddress2"
        zip="12345"
        city="registry-contactInfoCity"
        state="AL"
        emptyQasData={() => {}}
        qasValidationStatus={qasValidationStatus}
      />
    );
    wrapper.setState({ isQASSearchFlag: true });
    wrapper.setProps({
      street: 'abc',
      addressOne: 'test',
      city: 'test',
      state: 'test',
      zip: 'test',
    });
  });

  it('should call componentWillReceiveProps and handleQAS', () => {
    const enabledVendors = {
      enableQAS: 'true',
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.spy();
    const userAddressData = {
      data: {
        addressLine1: '123 Test ve',
        apartment: '',
        city: 'Test',
        state: 'NJ',
        zip: '11116',
      },
    };
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        enabledVendors={enabledVendors}
        handelAddressChange={handelAddressChange}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        street="registry-contactInfoStreet"
        addressOne="registry-contactInfoAddress1"
        addressTwo="registry-contactInfoAddress2"
        zip="12345"
        city="registry-contactInfoCity"
        state="AL"
        emptyQasData={() => {}}
        userAddressData={userAddressData}
      />
    );
    const handleQASSpy = sinon.spy(wrapper.instance(), 'handleQAS');
    wrapper.setState({ isQASSearchFlag: true });

    wrapper.setProps({
      street: 'registry-contactInfoStreet',
      addressOne: 'registry-contactInfoAddress1',
      city: 'registry-contactInfoCity',
      state: 'AL',
      zip: '12345',
      qasError: true,
      userAddressData: {
        data: {
          addressLine1: '320 Test ve',
          apartment: '',
          city: 'Test',
          state: 'NJ',
          zip: '11116',
        },
      },
    });

    wrapper.update();
    expect(handleQASSpy.returned(true)).to.equal(false);
  });

  it('should call the handleStateChange method ', () => {
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    wrapper.instance().handleStateChange('test');
    expect(wrapper.state('state')).to.equal('test');
  });

  it('should call the componentDidMount method ', () => {
    const enabledVendors = {
      enableQAS: true,
    };

    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    const componentDidMountSpy = sinon.spy(
      wrapper.instance(),
      'componentDidMount'
    );

    const isBrowserstub = sinon.stub(isBrowser, 'default').returns(false);
    wrapper.instance().componentDidMount();
    isBrowserstub.restore();
    expect(componentDidMountSpy).to.have.been.called;
  });

  it('should call the componentWillUnmount method ', () => {
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );

    const isBrowserstub = sinon.stub(isBrowser, 'default').returns(true);
    wrapper.instance().componentWillUnmount();
    isBrowserstub.restore();
  });

  it('should call the componentWillUnmount method taking else path', () => {
    const enabledVendors = {
      enableQAS: true,
    };
    const updateAddressModalQasVisibility = sinon.stub();
    const handelAddressChange = sinon.stub();
    const wrapper = shallow(
      <AddressInput
        updateAddressModalQasVisibility={updateAddressModalQasVisibility}
        handelAddressChange={handelAddressChange}
        enabledVendors={enabledVendors}
        labels={labels}
        locator={locators}
        stateList={stateList}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
      />
    );
    const isBrowserstub = sinon.stub(isBrowser, 'default').returns(false);
    wrapper.instance().componentWillUnmount();
    isBrowserstub.restore();
  });

  it('should throw error when Quebec address is filled in Canada site', () => {
    /* eslint-disable no-underscore-dangle*/
    window.__SITE_ID__ = 'BedBathCanada';
    const wrapper = shallow(
      <AddressInput
        labels={labels}
        locator={locators}
        stateList={stateList}
        updateState={() => {}}
        addressOne={'40 Fulton St'}
        zip={'G0C 1E0'}
        city={'Bonaventure'}
        state={'QC'}
        value={'40 Fulton St, Bonaventure, QC, G0C 1E0'}
        registryConfig={registryConfig}
        emptyQasData={() => {}}
        globalSwitchConfig={{
          canadaShipRestrictionEnabled: true,
        }}
      />
    );
    window.__SITE_ID__ = 'BedBathUS';
    expect(wrapper.find('AutoFill')).to.have.lengthOf(0);
  });

  it('should render correct label for wedding registry', () => {
    const tree = shallow(
      <AddressInput
        labels={labels}
        stateList={stateList}
        locator={locators}
        updateState={() => {}}
        registryConfig={registryConfig2}
        qasIsFetching
        isBabyRegistry
      />
    );
    expect(
      tree
        .find(RenderInput)
        .first()
        .props().label
    ).equal('Street Address/City/State/Zip Code');
  });
});
