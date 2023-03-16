import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as windorWidth from '@bbb-app/utils/viewPortUtils';
import {
  OTHER_REGISTRY_BABY_URL,
  OTHER_REGISTRY_CANADA_URL,
  BABY_REGISTRY_CANADA_URL,
} from '../constants';
import RegistryContentSlot from '../RegistryContentSlot';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    barCodeModalText: 'barCodeModalText',
    barCodeModalRegistryId: 'barCodeModalRegistryId',
    barCodeModalTitle: 'barCodeModalTitle',
    barCodeId: 'barCodeId',
  };
  const styleVariation = 'oos';

  it('should render correctly', () => {
    const siteId = 'BuyBuyBaby' || 'TBS_BuyBuyBaby';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        isGiftGiver
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly for new registry', () => {
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        isGiftGiver
        styleVariation={styleVariation}
        registryData={registryData}
        enableNewRegDashboard
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render correctly in case of registrant and registry type College/University with isGiftGiver', () => {
    const siteId = 'BedBathUS' || 'TBS_BedBathUS';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'College/University' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        isGiftGiver
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree.find('PrimaryLink').length).to.equal(0);
  });
  it('should render correctly in case of registrant and registry type College/University with isGiftGiver & eventType is not baby', () => {
    const siteId = 'TBS_BedBathUS';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Wedding' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        isGiftGiver
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree.find('PrimaryLink').length).to.equal(0);
  });

  it('should render correctly in case of registrant and registry type College/University without isGiftGiver', () => {
    const siteId = 'BedBathUS' || 'TBS_BedBathUS';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'College/University' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree.find('PrimaryLink').length).to.equal(0);
  });

  it('should render correctly in case of registrant and registry type Baby', () => {
    const siteId = 'BedBathUS' || 'TBS_BedBathUS';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly in case of registrant and registry type TBS_BedBathUS', () => {
    const siteId = 'TBS_BedBathUS';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly in case of registrant and registry type Buybuybaby', () => {
    const siteId = 'Buybuybaby';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly in case of registrant and registry type BedbathCanada', () => {
    const siteId = 'BedbathCanada';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        registryData={registryData}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly in case of mobile', () => {
    const windowObj = sinon
      .stub(windorWidth, 'getWindowInnerWidth')
      .returns(400);
    const tree = shallow(
      <RegistryContentSlot labels={labels} styleVariation={styleVariation} />
    );
    expect(tree).to.not.equal(null);

    tree.setProps({ siteId: 'BuyBuyBaby' });
    expect(tree).to.not.equal(null);

    windowObj.restore();
  });

  it('should render correctly without props', () => {
    const tree = shallow(<RegistryContentSlot isGiftGiver />);
    expect(tree).to.not.equal(null);
  });
  it('should call giftGiverLabel when siteId is BuyBuyBaby', () => {
    const siteId = 'BuyBuyBaby';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        isGiftGiver
        giftGiverLabel={OTHER_REGISTRY_BABY_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call giftGiverLabel when siteId is BedBathCanada', () => {
    const siteId = 'BedBathCanada';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        isGiftGiver
        giftGiverLabel={OTHER_REGISTRY_CANADA_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call giftGiverLabel when siteId is BedBathCanada When eventType is not baby', () => {
    const siteId = 'BedBathCanada';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Wedding' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        isGiftGiver
        giftGiverLabel={OTHER_REGISTRY_CANADA_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('giftgiver is false ,when siteId is BedBathCanada', () => {
    const siteId = 'BedBathCanada';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Wedding' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        giftGiverLabel={OTHER_REGISTRY_CANADA_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call GetBabyRegistryUrl when siteId is BuyBuyBaby', () => {
    const siteId = 'BuyBuyBaby';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        isGiftGiver={false}
        GetBabyRegistryUrl={OTHER_REGISTRY_CANADA_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call GetBabyRegistryUrl when siteId is BedBathCanada', () => {
    const siteId = 'BedBathCanada';
    const registryData = {
      registryResVO: { registrySummaryVO: { eventType: 'Baby' } },
    };
    const tree = shallow(
      <RegistryContentSlot
        labels={labels}
        siteId={siteId}
        registryData={registryData}
        isGiftGiver={false}
        GetBabyRegistryUrl={BABY_REGISTRY_CANADA_URL}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
