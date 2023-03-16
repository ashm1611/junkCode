import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import getSiteId from '@bbb-app/utils/getSiteId';
import { GGProductGrid as PureProductGrid } from '../GGProductGrid';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  let siteIdStub;
  before(() => {
    siteIdStub = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
  });
  after(() => {
    siteIdStub.restore();
  });
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
        siteId={'BuyBuyBaby'}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly as per the props as per isLoading', () => {
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
        variation="Date"
        siteId={'BuyBuyBaby'}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render owner product tile correctly as per the props for Desktop', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          {
            productId: '1',
            title: 'Product 1',
            image: '',
            url: '',
            itemType: 'DPF',
          },
          {
            productId: '2',
            title: 'Product 2',
            image: '',
            url: '',
            deletedItem: true,
          },
          {
            productId: '3',
            title: 'Product 3',
            image: '',
            url: '',
          },
          {
            productId: '4',
            title: 'Product 4',
            image: '',
            url: '',
          },
        ]}
        contextPath={'/store'}
        deviceConfig={{ DESKTOP: 1024 }}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        isGiftGiverLayout
        selectedFilterOption="View All"
        variation="Date"
        isRegistryContentSlotReq
        mPulseEnabled
        siteId={'BuyBuyBaby'}
        showWelcomeMsg
        enableRegistryCollaboration
        isMobile={false}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render owner product tile correctly as per the props for Mobile and siteId is not BuyBuyBaby', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          {
            productId: '1',
            title: 'Product 1',
            image: '',
            url: '',
            itemType: 'DPF',
          },
          {
            productId: '2',
            title: 'Product 2',
            image: '',
            url: '',
            deletedItem: true,
          },
          {
            productId: '3',
            title: 'Product 3',
            image: '',
            url: '',
          },
        ]}
        contextPath={'/store'}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        isGiftGiverLayout
        selectedFilterOption="View All"
        variation="Date"
        isRegistryContentSlotReq
        mPulseEnabled
        siteId={'BedBathUs'}
        showWelcomeMsg
        enableRegistryCollaboration
        isMobile
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render owner product tile correctly as per the props for Mobile', () => {
    const tree = shallow(
      <PureProductGrid
        items={[
          {
            productId: '1',
            title: 'Product 1',
            image: '',
            url: '',
            itemType: 'DPF',
          },
          {
            productId: '2',
            title: 'Product 2',
            image: '',
            url: '',
            deletedItem: true,
          },
          {
            productId: '3',
            title: 'Product 3',
            image: '',
            url: '',
          },
        ]}
        contextPath={'/store'}
        categoryId={['3/213234_page']}
        interactiveCheckList={interactiveCheckList}
        akamaiData={akamaiData}
        location={location}
        registryData={registryData}
        isGiftGiverLayout
        selectedFilterOption="View All"
        variation="Date"
        isRegistryContentSlotReq
        mPulseEnabled
        siteId={'BuyBuyBaby'}
        showWelcomeMsg
        enableRegistryCollaboration
        isMobile
      />
    );
    expect(tree).to.not.equal(null);
  });
});
