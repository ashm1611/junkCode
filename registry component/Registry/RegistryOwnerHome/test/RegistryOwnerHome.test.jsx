import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryOwnerHome from '../RegistryOwnerHome';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render component with congrats message', () => {
    const props = {
      registryDetailsData: {
        'registryResVO.registrySummaryVO.registryState': 'post',
      },

      children: {},
      eventType: 'Wedding',
      isNewRegDashboard: true,
    };
    const tree = shallow(<RegistryOwnerHome {...props} />);
    expect(tree.find('.md-pt03')).to.have.lengthOf(1);
  });
  it('should render correctly for regType Baby', () => {
    const props = {
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            eventType: 'Baby',
          },
        },
      },

      children: {},
      eventType: 'Baby',
    };
    const tree = shallow(<RegistryOwnerHome {...props} />);
    expect(tree.find('.grid-margin-x')).to.have.lengthOf(1);
  });
  it('should render correctly for BaseWidget', () => {
    const props = {
      groupGiftingEnable: true,
      groupGiftOptIn: false,
      notClosedOnce: null,
      children: {},
    };
    const tree = shallow(<RegistryOwnerHome {...props} />);
    expect(tree.find('.tipsSetBG')).to.have.lengthOf(1);
  });
  it('should not render congrats message if in babyRegistry', () => {
    sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
    const props = {
      groupGiftingEnable: true,
      groupGiftOptIn: false,
      eventType: 'Baby',
      notClosedOnce: null,
      children: {},
    };
    const tree = shallow(<RegistryOwnerHome {...props} />);
    expect(tree.find('.tipsSetBG')).to.not.equal(null);
    getSiteId.default.restore();
  });
  it('should render correctly for BaseWidget with for baby registry ', () => {
    const registryDetailsData = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'Baby',
        },
      },
    };
    const props = {
      groupGiftingEnable: false,
      groupGiftOptIn: false,
      notClosedOnce: null,
      children: {},
      mPulseEnabled: true,
      registryDetailsData: { registryDetailsData },
    };
    const tree = shallow(<RegistryOwnerHome {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
