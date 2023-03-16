import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ContactInfo from '../ContactInfo';

configure({ adapter: new Adapter() });

const registryInputs = {
  registryInputMap: {
    eventType: 'Wedding',
    id: 'DC1500002',
    public: true,
    registryInputMap: {
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
        displayOnForm: false,
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
        requiredInputCreate: false,
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
    },
  },
};

const stateList = {
  states: {},
};

describe(__filename, () => {
  let wrapper;
  const updateState = sinon.stub();
  const stateObj = {
    showShippingInfo: true,
  };
  beforeEach(() => {
    wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputs.registryInputMap}
        eventType="test"
        labels={{}}
        stateObj={stateObj}
        updateState={updateState}
        stateList={stateList}
        addressQASModalState="true"
        isBabyRegistry
      />
    );
  });

  it('ContactInfo should be rendered correctly', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});

describe(__filename, () => {
  let wrapper;
  const updateState = sinon.stub();
  const stateObj = {
    showShippingInfo: false,
  };
  beforeEach(() => {
    wrapper = shallow(
      <ContactInfo
        registryInputFields={registryInputs.registryInputMap}
        eventType="test"
        labels={{}}
        stateObj={stateObj}
        updateState={updateState}
        stateList={stateList}
        addressQASModalState="false"
        isBabyRegistry
      />
    );
  });

  it('ContactInfo should be rendered correctly', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});

describe(__filename, () => {
  let wrapper;
  const updateState = sinon.stub();
  const stateObj = {
    showShippingInfo: false,
  };
  beforeEach(() => {
    wrapper = shallow(
      <mobileField
        registryInputFields={registryInputs.registryInputMap}
        labels={{}}
        stateObj={stateObj}
        updateState={updateState}
        dataLocator={{}}
      />
    );
  });

  it('mobileInfo should be rendered correctly', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  describe(__filename, () => {
    const updateStateBaby = sinon.stub();
    const stateObjForBaby = {
      showShippingInfo: false,
    };
    const wrapperNew = shallow(
      <ContactInfo
        registryInputFields={registryInputs.registryInputMap}
        eventType="Baby"
        labels={{}}
        stateObj={stateObjForBaby}
        updateState={updateStateBaby}
        stateList={stateList}
        addressQASModalState="false"
        isBabyRegistry
      />
    );

    it('ContactInfo class should be render correctly', () => {
      expect(toJson(wrapperNew)).to.matchSnapshot();
    });
  });
});
