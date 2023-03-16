import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { ThankYouManager, mapDispatchToProps } from '../ThankYouManager';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const propsData = {
    location: {},
    regTypes: {
      popular: [
        {
          registryCode: 'BRD',
          registryIndex: '1',
          registryName: 'Wedding',
          registryTypeId: '200001',
          registryImg: '/wedding/image',
        },
      ],
      other: [
        {
          registryCode: 'BIR',
          registryIndex: '7',
          registryName: 'Birthday',
          registryTypeId: '200006',
          registryImg: '',
        },
      ],
    },
    match: {
      params: {
        id: 1,
      },
    },
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Wedding',
          eventDate: '11/11/11',
          registryId: '12345',
        },
      },
    },
    labels: {
      referredContent: [
        {
          id: '9942',
          key: 'tymSurpriseContentHeading',
        },
        {
          id: '9943',
          key: 'tymSurpriseContentSubHeading',
        },
        {
          id: '10228',
          key: 'sendThankYouHeading',
        },
        {
          id: '10229',
          key: 'sendThankYouDescription',
        },
      ],
    },
  };
  const revealThankYouList = sinon.spy();
  const sortThankYouList = sinon.spy();
  const getThankYouList = sinon.spy();
  const resetFirstCategoryCallFired = sinon.spy();
  const updateTymTabClickStatus = sinon.spy();
  const resetIsItemsFetchingStatus = sinon.spy();

  it('should render ThankYouManager correctly', () => {
    const wrapper = shallow(
      <ThankYouManager
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        getThankYouList={getThankYouList}
        updateTymTabClickStatus={updateTymTabClickStatus}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        eventType={'Wedding'}
        {...propsData}
        registrySwitchConfig={{
          enableMPulse: true,
          enableNewRegDashboard: true,
        }}
        globalSwitchConfig={{ globalMPulseEnable: true }}
      />
    );

    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('mapDispatchToProps should load initial thank you list Data', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getThankYouList('520647703', [], '1', '1');
    props.revealThankYouListCB();
    props.addEditAddress({});
    props.sortThankYouList('520647703', [], '1', '1');
    props.displayLoginModal(true);
    props.fireTealiumAction();
    props.changeListUpdatedStatus();
    props.updateStateData({});
    props.onQuickViewButtonClick();
    props.initiateInactivityModal();
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop updateTymTabClickStatus which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.updateTymTabClickStatus({});
    expect(dispatch.called).to.equal(true);
  });

  it('should called handleThankYouList', () => {
    const wrapper = shallow(
      <ThankYouManager
        getThankYouList={getThankYouList}
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        updateTymTabClickStatus={updateTymTabClickStatus}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registrySwitchConfig={{ enableMPulse: false }}
        globalSwitchConfig={{ globalMPulseEnable: true }}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        {...propsData}
      />
    );
    wrapper.instance().handleThankYouList();
    expect(getThankYouList.calledWith('520647703', [], '1', '1'));
  });

  it('should render with empty referredContent', () => {
    propsData.labels.referredContent = [{}];
    const wrapper = shallow(
      <ThankYouManager
        getThankYouList={getThankYouList}
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        updateTymTabClickStatus={updateTymTabClickStatus}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registrySwitchConfig={{ enableMPulse: false }}
        globalSwitchConfig={{ globalMPulseEnable: true }}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        {...propsData}
      />
    );
    expect(wrapper.find('ThankYouManagerLayout')).to.have.lengthOf(1);
  });

  it('should render without referredContent', () => {
    propsData.labels.referredContent = undefined;
    const wrapper = shallow(
      <ThankYouManager
        getThankYouList={getThankYouList}
        revealThankYouList={revealThankYouList}
        sortThankYouList={sortThankYouList}
        updateTymTabClickStatus={updateTymTabClickStatus}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        registrySwitchConfig={{ enableMPulse: false }}
        globalSwitchConfig={{ globalMPulseEnable: true }}
        resetIsItemsFetchingStatus={resetIsItemsFetchingStatus}
        {...propsData}
      />
    );
    expect(wrapper.find('ThankYouManagerLayout')).to.have.lengthOf(1);
  });
});
