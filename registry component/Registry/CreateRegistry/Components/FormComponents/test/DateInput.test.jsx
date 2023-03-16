import React from 'react';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DatePicker from '@bbb-app/date-picker/components/DatePicker';
import DateInput from '../DateInput';

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

describe(__filename, () => {
  let wrapper;
  const updateState = sinon.stub();
  beforeEach(() => {
    wrapper = shallow(
      <DateInput
        id="eventDate"
        name="eventDate"
        labels={{}}
        value="12/04/2018"
        eventType="test"
        updateState={updateState}
        registryInputFields={registryInputs.registryInputMap}
        format="mm/dd/yyyy"
        dataLocator="registry-eventInfoEventDate"
        pastYearToDisplay={1}
        futureYearToDisplay={5}
        autocomplete="off"
        setFocusOnNextElement
      />
    );
  });

  it('Date Input should be rendered with error class', () => {
    wrapper.setProps({ eventDateError: true, isMobile: true });
    expect(typeof wrapper.find('.formError')).to.be.equal('object');
  });

  it('Date Input should be rendered correctly', () => {
    const input = wrapper.find(DatePicker);
    expect(input.prop('value')).to.equal('12/04/2018');
  });

  it('Date Input should be rendered correctly when atDateFlag is true', () => {
    wrapper.setProps({ atDateFlag: true });
    const input = wrapper.find(DatePicker);
    expect(input.prop('value')).to.equal('12/04/2018');
  });

  it('should render dd/mm/yyyy date correctly', () => {
    wrapper.setState({ dateInputError: false });
    const input = wrapper.find(DatePicker);
    expect(input.prop('value')).to.equal('12/04/2018');
  });

  it('should call onChange', () => {
    const e = {
      target: {
        name: 'dateEvent',
        value: '12/03/2017',
      },
    };
    wrapper.instance().handleChange(e);
    /* eslint no-unused-expressions: 0 */
    expect(updateState).to.have.been.called;

    const e1 = {
      target: {
        name: 'dateEvent',
        value: '12',
      },
    };
    wrapper.instance().handleChange(e1);
    /* eslint no-unused-expressions: 0 */
    expect(updateState).to.have.been.called;
  });

  it('should call onKeyDown', () => {
    const e = {
      keyCode: 9,
      shiftKey: false,
    };
    const eventDateElement = document.createElement('input');
    const mountedElement = document.createElement('div');
    mountedElement.setAttribute('name', 'editRegistry');
    mountedElement.appendChild(eventDateElement);
    document.body.appendChild(mountedElement);
    const focusNextElementStub = sinon.stub(
      wrapper.instance(),
      'focusNextElement'
    );
    wrapper.instance().onKeyDown(e);
    /* eslint no-unused-expressions: 0 */
    expect(focusNextElementStub).to.be.called;
    focusNextElementStub.restore();
  });
  it('should call onKeyDown with setFocusOnNextElement as false', () => {
    const e = {
      keyCode: 9,
      shiftKey: false,
    };
    const value1 = '12';
    const wrapper1 = shallow(
      <DateInput
        id="eventDate"
        name="eventDate"
        labels={{}}
        value="12/04/2018"
        eventType="test"
        updateState={updateState}
        registryInputFields={registryInputs.registryInputMap}
        format="mm/dd/yyyy"
        dataLocator="registry-eventInfoEventDate"
        pastYearToDisplay={1}
        futureYearToDisplay={5}
        autocomplete="off"
        setFocusOnNextElement={false}
      />
    );
    wrapper1.instance().onKeyDown(e);
    wrapper1.instance().handleDayChange(value1);
    expect(wrapper1).to.not.equal(null);
  });
  it('should call handleDateValidation and return set error flag in case of wrong value with mm/dd/yyyy', () => {
    wrapper.setState({ dateInputError: false });
    const format = 'mm/dd/yyyy';
    const e = {
      target: {
        name: 'dateEvent',
        value: '24/24/2024',
      },
    };
    wrapper.instance().handleDateValidation(e, format);

    expect(updateState).to.have.been.called;
  });

  it('should call handleDateValidation and return set error flag in case of wrong value with dd/mm/yyyy ', () => {
    wrapper.setState({ dateInputError: false });
    const format = 'dd/mm/yyyy';
    const e = {
      target: {
        name: 'dateEvent',
        value: '24/24/2024',
      },
    };
    wrapper.instance().handleDateValidation(e, format);

    expect(updateState).to.have.been.called;
  });

  it('should call handleDayChange', () => {
    const value = '12/12/2024';
    wrapper.instance().handleDayChange(value);
    expect(updateState).to.have.been.called;

    const value1 = '12';
    wrapper.instance().handleDayChange(value1);
    expect(updateState).to.have.been.called;
  });

  it('should call handleBlurEvent', () => {
    wrapper.setState({ dateInputError: false });
    const e = {
      target: {
        name: 'dateEvent',
        value: '24/24/20245',
      },
    };
    wrapper.instance().handleBlurEvent(e);
    expect(wrapper.state('eventDateError')).to.not.equal('');

    const e0 = {
      target: {
        name: 'dateEvent',
        value: '',
      },
    };
    wrapper.instance().handleBlurEvent(e0);
    expect(wrapper.state('eventDateError')).to.not.equal('');

    const e1 = 'hgdhd';
    wrapper.instance().handleBlurEvent(e1);
    expect(wrapper.state('eventDateError')).to.not.equal('');

    const e2 = true;
    wrapper.setProps({ required: true });
    wrapper.instance().handleBlurEvent(e2);
    expect(wrapper.state('eventDateError')).to.not.equal('');
  });
});
