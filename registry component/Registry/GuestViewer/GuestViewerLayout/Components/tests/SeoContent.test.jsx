import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as getSiteIdObj from '@bbb-app/utils/getSiteId';
import SeoContent from '../SeoContent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const registryData = {
    registryResVO: {
      registrySummaryVO: {
        primaryRegistrantFirstName: 'Registrant FirstName',
        primaryRegistrantLastName: 'Registrant LastName',
        primaryRegistrantMaidenName: 'Maiden Name',
        coRegistrantFirstName: 'Co-Registrant FirstName',
        coRegistrantLastName: 'Co-Registrant LastName',
      },
    },
  };
  const labels = {
    seoContentRegLbl:
      "Welcome to {0}'s {1} Registry. {2}'s {3} gift registry has a wide range of products to choose from for the perfect gift. Help make {4}'s special day even more memorable.",
  };
  it('should not render component', () => {
    const wrapper = shallow(<SeoContent />);
    const instance = wrapper.instance();
    expect(instance).to.equal(null);
  });
  it('should render correctly', () => {
    const wrapper = shallow(
      <SeoContent
        eventType="wedding"
        labels={labels}
        registryData={registryData}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render correctly coRegistrantFirstName', () => {
    const registryDataa = {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'Registrant FirstName',
          primaryRegistrantLastName: 'masked',
          coRegistrantFirstName: 'Co-Registrant FirstName',
          coRegistrantLastName: 'Co-Registrant LastName',
        },
      },
    };
    const wrapper = shallow(
      <SeoContent
        eventType="wedding"
        labels={labels}
        registryData={registryDataa}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
  it('should render correctly for buybuybaby site', () => {
    const registryDatas = {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'Registrant FirstName',
          primaryRegistrantLastName: 'masked',
          coRegistrantFirstName: '',
          coRegistrantLastName: 'Co-Registrant LastName',
        },
      },
    };
    sinon.stub(getSiteIdObj, 'default').returns('BuyBuyBaby');
    const wrapper = shallow(
      <SeoContent
        eventType="wedding"
        labels={labels}
        registryData={registryDatas}
      />
    );
    expect(wrapper).to.not.equal(null);
    getSiteIdObj.default.restore();
  });
  it('should render correctly without Co-Registrant', () => {
    delete registryData.registryResVO.registrySummaryVO.coRegistrantFirstName;
    delete registryData.registryResVO.registrySummaryVO.coRegistrantLastName;
    const wrapper = shallow(
      <SeoContent
        eventType="Baby"
        labels={labels}
        registryData={registryData}
      />
    );
    expect(wrapper).to.not.equal(null);
  });
});
