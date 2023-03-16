import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { subscribe } from '@bbb-app/utils/pubsub';

import { PureProductGrid } from '../ProductGrid';
import ContentSlot from '../../ContentSlot/RegistryContentSlot';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const registryData = {
    favouriteCategoryIdList: ['10003', '10546', '13109', 'OtherCat-Id'],
    favouriteCategoryNameList: [
      'FINE DINING & GIFTWARE',
      'FURNITURE',
      'BASIC LINENS',
      'OTHER',
    ],
    registryResVO: {
      registrySummaryVO: {
        eventType: 'Wedding',
        eventDate: '06/01/2018',
        eventVO: {
          showerDateObject: {
            time: '06/01/2018',
          },
        },
        giftRegistered: 12,
        primaryRegistrantFirstName: 'Shivam',
        registryId: '520648448',
      },
    },
  };
  const location = {
    pathname: '//ggsgsg/viewGuestRegistry',
  };
  const interactiveCheckList = {
    averageC1Percentage: 30,
  };
  const akamaiData = {
    zip: '68046',
  };
  it('should render correctly', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          { productId: '1', title: 'Product 1', image: '', url: '' },
          { productId: '2', title: 'Product 2', image: '', url: '' },
          { productId: '3', title: 'Product 3', image: '', url: '' },
        ]}
        contextPath={'/store'}
        deviceConfig={{ DESKTOP: 1024 }}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
      />
    );
    tree.setState({ toggleModalState: true });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly as per new registry props', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          { productId: '1', title: 'Product 1', image: '', url: '' },
          { productId: '2', title: 'Product 2', image: '', url: '' },
          { productId: '3', title: 'Product 3', image: '', url: '' },
        ]}
        contextPath={'/store'}
        deviceConfig={{ DESKTOP: 1024 }}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        enableNewRegDashboard
      />
    );
    tree.setState({ toggleModalState: true });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly as per the props as per isLoading', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          { productId: '1', title: 'Product 1', image: '', url: '' },
          { productId: '2', title: 'Product 2', image: '', url: '' },
          {
            productId: '3',
            title: 'Product 3',
            image: '',
            url: '',
            itemType: 'DPF',
            amountFulfilled: 0,
          },
          { productId: '4', title: 'Product 4', image: '', url: '' },
        ]}
        contextPath={'/store'}
        deviceConfig={{ DESKTOP: 1024 }}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        productsCount={3}
        mPulseEnabled
        isRegistryContentSlotReq
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly as per the props ', () => {
    const labels = {};
    const siteId = 'BuyBuyBaby';
    const styleVariation = 'abcdtest';
    const tree = shallow(
      <ContentSlot
        siteId={siteId}
        labels={labels}
        registryData={registryData}
        styleVariation={styleVariation}
      />
    );
    expect(tree.find('div')).to.have.lengthOf(4);
  });
  it('should render owner producet tile correctly as per the props', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          { productId: '1', title: 'Product 1', image: '', url: '' },
          { productId: '2', title: 'Product 2', image: '', url: '' },
          { productId: '3', title: 'Product 3', image: '', url: '' },
        ]}
        contextPath={'/store'}
        deviceConfig={{ DESKTOP: 1024 }}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        isRegistryContentSlotReq
        isDiaperFundEnable
        productsCount={3}
        eventType="Baby"
      />
    );
    expect(tree).to.not.equal(null);
    tree.instance().toggeleNandDReplaceModal(true);
    tree.instance().hideReplaceModal();
  });
});
describe('#subscribe', () => {
  it('should call subscribe', () => {
    const name = 'closeReplaceModal';
    const toggeleNandDReplaceModal = sinon.stub();
    const value = subscribe(name, toggeleNandDReplaceModal);
    expect(value).to.equal(undefined);
  });
});
