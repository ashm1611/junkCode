import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import * as isUserRecognizedUtil from '@bbb-app/utils/isUserRecognized';
import {
  checkForDisplay,
  replacePlaceholderValues,
  getformattedStreet,
  submitRegistryData,
  getShippingValidation,
  getMoveInValidation,
  shippingValidation,
  validateBabyMultiples,
} from '../CreateRegistryUtils';
import * as isRBYRRegistryUtil from '../../utils/isRBYRRegistry';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call checkForDisplay for displayOnForm as false', () => {
    const props = {
      labels: {
        createRegistry: {
          personalInfoHeadingWedding: '',
        },
      },
      displayOnForm: '',
    };
    const validationDescriptor = checkForDisplay(props);

    expect(validationDescriptor).to.equal(false);
  });

  it('should call checkForDisplay for displayOnForm as true', () => {
    const props = {
      labels: {
        createRegistry: {
          personalInfoHeadingWedding: '',
        },
      },
      displayOnForm: true,
    };
    const validationDescriptor = checkForDisplay(props);

    expect(validationDescriptor).to.equal(true);
  });

  it('should call replacePlaceholderValues', () => {
    const labelStrNew = 'aa{1}cc';
    const str = 'a{1}c';
    const placeholderValues = ['111', 'a{1}c', 'cde'];
    const validationDescriptor = replacePlaceholderValues(
      str,
      placeholderValues
    );
    expect(validationDescriptor).to.equal(labelStrNew);
  });

  it('#getformattedStreet: should call getformattedStreet for valid address', () => {
    const addressOne = '123';
    const city = 'Williaum';
    const state = 'NY';
    const zip = '11058';
    const addressArr = '123, Williaum, NY, 11058';
    const validationDescriptor = getformattedStreet(
      addressOne,
      city,
      state,
      zip
    );
    expect(validationDescriptor).to.equal(addressArr);
  });

  it('should call getformattedStreet for inValid address', () => {
    const addressOne = '';
    const city = '';
    const state = '';
    const zip = '';
    const addressArr = '';
    const validationDescriptor = getformattedStreet(
      addressOne,
      city,
      state,
      zip
    );
    expect(validationDescriptor).to.equal(addressArr);
  });

  it('#submitRegistryData: should call submitRegistryData for true value', () => {
    const regState = {
      showMoveInInfo: true,
      isContactAddressChanged: true,
      isRecognized: true,
      showShippingInfo: true,
      coRegProfileStatus: true,
    };
    const props = {
      isLoggedIn: true,
      registryInputs: {
        eventCode: '123',
      },
      globalSwitchConfig: {
        enableRBYRFeature: true,
      },
    };
    const password = 'Password1';
    const validationDescriptor = submitRegistryData(regState, props, password);
    expect(validationDescriptor.called).to.equal(undefined);
  });

  it('#submitRegistryData: when enableRBYRFeature is enabled', () => {
    const isUserRecognizedStub = sinon
      .stub(isUserRecognizedUtil, 'default')
      .returns(true);
    const isRBYRRegistryStub = sinon
      .stub(isRBYRRegistryUtil, 'default')
      .returns(true);

    const regState = {
      showMoveInInfo: true,
      isContactAddressChanged: true,
      isRecognized: true,
      showShippingInfo: true,
      coRegProfileStatus: 'true',
      eventCode1: 'BRD',
    };
    const props = {
      isLoggedIn: true,
      registryInputs: {
        eventCode: 'BRD',
      },
      getCurrentRegistryType: () => {},
      globalSwitchConfig: {
        enableRBYRFeature: true,
      },
      isNewCreateRegForm: true,
    };

    const expectedResult = {
      'registryVO.coRegistrant.firstName': undefined,
      registryEventType: 'BRD',
      'registryVO.primaryRegistrant.cellPhone': undefined,
      'registryVO.primaryRegistrant.firstName': undefined,
      'registryVO.primaryRegistrant.lastName': undefined,
      'registryVO.primaryRegistrant.babyMaidenName': undefined,
      'registryVO.primaryRegistrant.contactAddress.firstName': undefined,
      'registryVO.primaryRegistrant.contactAddress.lastName': undefined,
      'registryVO.primaryRegistrant.primaryPhone': undefined,
      'value.mobileNumber': undefined,
      'registryVO.refStoreContactMethod': ' ',
      'registryVO.registryType.registryTypeName': undefined,
      createSimplified: true,
      'registryVO.prefStoreNum': undefined,
      'registryVO.primaryRegistrant.contactAddress.addressLine1':
        regState.addressOne,
      'registryVO.primaryRegistrant.contactAddress.addressLine2':
        regState.apartment,
      'registryVO.primaryRegistrant.contactAddress.city': undefined,
      'registryVO.primaryRegistrant.contactAddress.state': undefined,
      'registryVO.primaryRegistrant.contactAddress.zip': undefined,
      'registryVO.primaryRegistrant.contactAddress.qasValidated': undefined,
      'registryVO.shipping.shippingAddress.addressLine1':
        regState.shippingAddressOne,
      'registryVO.shipping.shippingAddress.addressLine2':
        regState.shippingApartment,
      'registryVO.shipping.shippingAddress.city': regState.shippingCity,
      'registryVO.shipping.shippingAddress.firstName': undefined,
      'registryVO.shipping.shippingAddress.lastName': undefined,
      'registryVO.shipping.shippingAddress.state': regState.shippingState,
      'registryVO.shipping.shippingAddress.country': regState.shippingCountry,
      'registryVO.shipping.shippingAddress.qasValidated': undefined,
      regContactAddress: 'newPrimaryRegAddress',
      shippingAddress: 'newShippingAddress',
      futureShippingAddress:
        regState.showMoveInInfo && 'newFutureShippingAddress',
      'registryVO.shipping.shippingAddress.zip': regState.shippingZip,
      'registryVO.shipping.futureShippingAddress.addressLine1': undefined,
      'registryVO.shipping.futureShippingAddress.addressLine2': undefined,
      'registryVO.shipping.futureShippingAddress.city': undefined,
      'registryVO.shipping.futureShippingAddress.firstName': undefined,
      'registryVO.shipping.futureShippingAddress.lastName': undefined,
      'registryVO.shipping.futureShippingAddress.state': undefined,
      'registryVO.shipping.futureShippingAddress.country': undefined,
      'registryVO.shipping.futureShippingAddress.qasValidated': undefined,
      'registryVO.shipping.futureShippingAddress.zip': undefined,
      'registryVO.shipping.futureShippingDate': undefined,
      futureShippingDateSelected: regState.showMoveInInfo,
      'registryVO.coRegistrant.email': 'undefined',
      'registryVO.primaryRegistrant.email': null,
      'registryVO.networkAffiliation': 'N',
      'registryVO.event.guestCount': regState.guests,
      'registryVO.event.college': regState.college,
      'registryVO.event.babyGender': regState.babyGender,
      'registryVO.coRegistrant.lastName': undefined,
      'registryVO.event.eventDate': undefined,
      'registryVO.event.showerDate': undefined,
      'registryVO.regBG': regState.gender,
      'registryVO.coRegBG': regState.coGender,
      'registryVO.event.babyNurseryTheme': undefined,
      'registryVO.optInWeddingOrBump': '',
      coRegEmailFoundPopupStatus: 'true',
      coRegEmailNotFoundPopupStatus: 'false',
      password: 'Password1',
      emailOptIn: undefined,
      rbyrCheckbox: false,
      storedValueOptIn: false,
      emailOptInSharedSite1: undefined,
      emailOptInSharedSite2: undefined,
    };

    const password = 'Password1';
    const validationDescriptor = submitRegistryData(regState, props, password);
    isUserRecognizedStub.restore();
    isRBYRRegistryStub.restore();
    expect(validationDescriptor).to.deep.equal(expectedResult);
  });

  it('#getShippingValidation: should call shippingValidation', () => {
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(true);
    const registryInputs = {
      registryInputMap: { showShippingAddress: { requiredInputCreate: false } },
    };
    const tempState = {
      shippingCity: 'NY',
      shippingState: '',
      shippingZip: '',
    };
    const globalSwitchConfig = {
      canadaShipRestrictionEnabled: true,
    };
    const validationDescriptor = shippingValidation(
      registryInputs,
      tempState,
      globalSwitchConfig
    );
    isBedBathCanadaStub.restore();
    expect(validationDescriptor.called).to.equal(undefined);
  });

  it('should call getShippingValidation', () => {
    const registryInputs = {
      registryInputMap: { showShippingAddress: { requiredInputCreate: false } },
    };
    const tempState = {
      shippingAddressOne: '',
      shippingCity: '',
      shippingStreet: '',
      showShippingInfo: true,
    };
    const labels = {};
    const globalSwitchConfig = {};
    const validationDescriptor = getShippingValidation(
      registryInputs,
      tempState,
      labels,
      globalSwitchConfig
    );
    expect(validationDescriptor.called).to.equal(undefined);
  });

  it('#getMoveInValidation: should call getMoveInValidation', () => {
    const isBedBathCanadaStub = sinon
      .stub(commonUtil, 'isBedBathCanada')
      .returns(true);
    const registryInputs = {
      registryInputMap: { showShippingAddress: { requiredInputCreate: false } },
    };
    const tempState = {
      showMoveInInfo: true,
      moveInAddressOne: '',
      moveInCity: '',
      moveInStreet: '',
      futureShippingDate: '',
    };
    const labels = {};
    const globalSwitchConfig = {};
    const validationDescriptor = getMoveInValidation(
      registryInputs,
      tempState,
      labels,
      globalSwitchConfig
    );
    isBedBathCanadaStub.restore();
    expect(validationDescriptor.called).to.equal(undefined);
  });
  it('#validateBabyMultiples: should call validateBabyMultiples for BBB', () => {
    const enableBabyMultiples = true;
    const eventType = 'BBB';
    const stateObj = {
      babyMultiplesCount: 3,
      babyMultiplesRevealGender: true,
      babyGender: 'Male || Female',
    };
    const labels = {};
    const validationDescriptor = validateBabyMultiples(
      enableBabyMultiples,
      eventType,
      stateObj,
      labels
    );
    expect(validationDescriptor.called).to.equal(undefined);
  });

  it('#validateBabyMultiples: should call validateBabyMultiples for BABY', () => {
    const enableBabyMultiples = true;
    const eventType = 'Baby';
    const stateObj = {
      babyMultiplesCount: 3,
      babyMultiplesRevealGender: true,
      babyGender: 'Male||Female||Male',
    };
    const labels = {};
    const validationDescriptor = validateBabyMultiples(
      enableBabyMultiples,
      eventType,
      stateObj,
      labels
    );
    expect(validationDescriptor.called).to.equal(undefined);
  });
  it('#validateBabyMultiples: should return empty object', () => {
    const enableBabyMultiples = true;
    const eventType = 'Baby';
    const stateObj = {
      babyMultiplesCount: 3,
      babyGender: 'Male||Female||Male',
    };
    const labels = {};
    const validationDescriptor = validateBabyMultiples(
      enableBabyMultiples,
      eventType,
      stateObj,
      labels
    );
    expect(validationDescriptor).to.deep.equal({});
  });
});
