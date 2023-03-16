import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';

import { RegistryIncentive, mapDispatchToProps } from '../RegistryIncentive';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    location: {
      search: 'RegistryIncentive',
    },
    labels: {
      allIncentives: 'All Incentives',
      referredContent: [
        {
          id: '16385',
          key: 'createRegistryIncentiveBanner',
        },
        {
          id: '123',
        },
      ],
    },
    registryIncentivesSwitchConfig: { enableRegistryIncentives: true },
    getContent: sinon.stub(),
    onComponentMount: sinon.stub(),
    regId: '12345',
  };

  it('RegistryIncentive should render correctly with regType equal to registryIncentiveEventType', () => {
    const isUserLoggedInStub = sinon
      .stub(isUserLoggedIn, 'default')
      .returns(true);

    const tree = shallow(
      <RegistryIncentive
        {...props}
        regType="wedding"
        pageName="RegistryOwnerHome"
      />
    );
    expect(tree.props().regType).to.equal(undefined);
    isUserLoggedInStub.restore();
  });
  it('RegistryIncentive should render correctly with different regType', () => {
    props.labels.referredContent = undefined;
    const otherProps = {
      regType: 'baby',
      pageName: 'RegistryOwnerHome',
      location: { pathname: '/store/registryIncentives' },
    };
    const tree = shallow(<RegistryIncentive {...props} {...otherProps} />);

    expect(tree.props().regType).to.not.equal('wedding');
  });
  it('RegistryIncentive should render correctly without regType', () => {
    props.registryIncentivesSwitchConfig.enableRegistryIncentives = false;
    const tree = shallow(<RegistryIncentive {...props} />);
    expect(tree.props().regType).to.equal(undefined);
  });
  it('RegistryIncentive should render correctly when enableCSLabels is true ', () => {
    props.registryIncentivesSwitchConfig.enableRegistryIncentives = false;
    const tree = shallow(<RegistryIncentive {...props} enableCSLabels />);
    expect(tree.props().regType).to.equal(undefined);
  });

  it('mapDispatchToProps should return a prop fetchRegistryIncentivesInfo which when called call the dispatch function passed', () => {
    const dispatch = sinon.spy();
    const prop = mapDispatchToProps(dispatch);
    prop.onComponentMount('1111');
    prop.getContent();
    prop.redirectTo();
    expect(dispatch.called).to.equal(true);
  });
});
