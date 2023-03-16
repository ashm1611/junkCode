import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { setCookie, removeCookie } from '@bbb-app/utils/universalCookie';
import RegistryDetailModalLayout from '../RegistryDetailModalLayout';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const ProductLayout = {
    labels: {
      giftGiver: {
        qtyLabel: 'Qty',
        minimumQuantityMessage: 'minimumQuantityMessage',
        minimumQuantityTooltip: 'minimumQuantityTooltip',
        minimumQuantityAriaLabel: 'minimumQuantityAriaLabel',
      },
      RegistryGroupGifting: {},
      limitedAvailability: 'limitedAvailability',
      limitedAvailabilityMsg: 'limitedAvailabilityMsg',
      intlRestrictedMessage: 'intlRestrictedMessage',
    },
    config: {
      pageConfig: {
        RegistryGroupGifting: {
          GGContiFundThreshold: '1',
        },
      },
    },
    Image: '',
    RatingsandReviews: {
      RATINGS: '1.9',
      REVIEWS: '12',
    },
    quickViewSwatchDetails: {
      skuId: '12345',
    },
    registryProductInfo: {
      ggRegItemStatus: true,
      purchased: false,
      sKUDetailVO: {
        displayName: 'Test',
        upc: 'upc',
      },
      qtyRequested: '1',
      qtyPurchased: '5',
      skuInStore: '1',
    },
    deviceConfig: {
      DESKTOP: 1024,
    },
    productId: '',
    registryId: '121212',
    sKUDetailVO: {
      skuId: '1212',
      intlRestricted: '1212',
      parentProdId: '1212',
      ltlItem: '1212',
      size: '1212',
      swatch: '1212',
      minimumQty: 1,
    },
    refNum: null,
    onModalHide: () => {},
    enableKatori: false,
    isBopisFeatureEnable: true,
    skuInStore: '1',
    storeDetails: {
      storeId: '1',
      commonName: 'store',
    },
  };

  let wrapper;
  const props = {
    showModal: true,
    sKUDetailVO: {
      displayName: 'abc',
    },
    ggItemContributionNeeded: 0,
    ggEligibleItem: false,
    registryProductInfo: { purchased: true },
    selectedCheckboxFilter: false,
    isBelowLineItem: 'false',
  };

  it('should render correctly', () => {
    setCookie('cartCount', '0');
    Object.defineProperty(window.screen, 'width', {
      writable: true,
      configurable: true,
      value: 700,
    });
    const tree = shallow(
      <RegistryDetailModalLayout {...props} {...ProductLayout} />
    );
    tree.instance().isGroupGiftEligible = false;
    tree.instance().isDiaperFundSku = false;
    tree.setProps({ selectedCheckboxFilter: 'in-stock-online' });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should handle handleChange properly', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout {...props} {...ProductLayout} />
    );
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(undefined);
  });

  it('should call  submitContibutionfund  event', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout {...props} {...ProductLayout} />
    );
    const e = {
      preventDefault: () => false,
    };
    wrapper.instance().submitContibutionfund(e);
    expect(wrapper).to.not.equal(null);
  });

  it('should call hideParent function correctly', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout {...props} {...ProductLayout} />
    );
    wrapper.instance().hideParent();
    expect(wrapper.instance().hideParentModal).to.equal('display-none');
  });

  it('should call  handleBlur event -GREATER_THAN_FUND_ERROR_LBL', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={50}
        ggFundContriThreshold={100}
        amountFulfilled={60}
      />
    );
    const e = {
      target: {
        value: '$ 100',
      },
    };
    wrapper.instance().handleBlur(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(
      'Amount should not be greater than the remaining fund i.e. $-10.00'
    );
  });
  it('should call  handleBlur event lessthanFundError', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={40.5}
        ggFundContriThreshold={100}
        amountFulfilled={40}
      />
    );
    const e = {
      target: {
        value: '$ 0.2',
      },
    };
    wrapper.instance().handleBlur(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(
      'Amount should not be less than the remaining fund i.e. $0.50'
    );
  });
  it('should call  handleBlur event lessthanThresholdFundError', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
        amountFulfilled={10}
      />
    );
    const e = {
      target: {
        value: '$ 0.1',
      },
    };
    wrapper.instance().handleBlur(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(
      'Minimum Contribution amount should be $1'
    );
  });
  it('should not return lessthanFundError when inputFund is euqal to required Fund', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={90}
        ggFundContriThreshold={100}
      />
    );
    const e = {
      target: {
        value: '$ 90',
      },
    };
    wrapper.instance().handleBlur(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(undefined);
  });
  it('should not return lessthanFundError when inputFund is greater than required Fund', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={90}
        ggFundContriThreshold={100}
      />
    );
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleBlur(e);
    expect(wrapper.state('groupGiftFundError')).to.equal(undefined);
  });
  it('should call  handleChange with $ 25', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
      />
    );
    const e = {
      target: {
        value: '$ 25.1212',
      },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('inputFund')).to.equal('$ 25.12');
  });
  it('should call  handleChange with $ 25. decimal', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
      />
    );
    const e = {
      target: {
        value: '$ 25.',
      },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.state('inputFund')).to.equal('$ 25.');
  });
  it('should call  groupGiftItemStatus correctly when commerceItemId matched', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
      />
    );
    const atcData = {
      store: {
        data: {
          data: {
            component: {
              order: {
                commerceItemVOList: [
                  { commerceItemId: 'DC5ci1274001016', groupGiftingItem: true },
                ],
              },
              commerceItemId: 'DC5ci1274001016',
            },
          },
        },
      },
    };
    const result = wrapper.instance().groupGiftItemStatus(atcData);
    expect(result).to.equal(true);
  });
  it('should call  groupGiftItemStatus correctly when store.data is empty', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
      />
    );
    const atcData = {
      store: {
        data: '',
      },
    };
    const result = wrapper.instance().groupGiftItemStatus(atcData);
    expect(result).to.equal('');
  });
  it('should call  groupGiftItemStatus correctly when commerceItemId does not matched', () => {
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
      />
    );
    const atcData = {
      store: {
        data: {
          data: {
            component: {
              order: {
                commerceItemVOList: [{ commerceItemId: 'DC5ci1274001016' }],
              },
              commerceItemId: 'DC5ci12hdhj74001016',
            },
          },
        },
      },
    };
    const result = wrapper.instance().groupGiftItemStatus(atcData);
    expect(result).to.equal('');
  });
  it('should call  handleChange correctly on change', () => {
    const spy = sinon.stub();
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
        amountFulfilled={10}
        ggEligibleItem={{ eligiblity: true }}
      />
    );
    wrapper.setState({
      inputFund: '$10',
    });
    wrapper
      .find('FormInput#groupGiftFundRLV')
      .simulate('change', { preventDefault: spy });
    expect(spy.called);
  });
  it('should call  handleChange correctly on blur', () => {
    const spy = sinon.stub();
    wrapper = shallow(
      <RegistryDetailModalLayout
        {...props}
        {...ProductLayout}
        ggItemContributionNeeded={150}
        ggFundContriThreshold={100}
        amountFulfilled={10}
        ggEligibleItem={{ eligiblity: true }}
      />
    );
    wrapper.setState({
      inputFund: '$10',
    });
    wrapper
      .find('FormInput#groupGiftFundRLV')
      .simulate('blur', { preventDefault: spy });
    expect(spy.called);
  });

  it('should render with given props value  ', () => {
    const tree = shallow(
      <RegistryDetailModalLayout
        ggEligibleItem
        ggItemContributionNeeded={0}
        siteId="BedBathUS"
        {...ProductLayout}
      />
    );
    tree.instance().isDiaperFundSku = true;
    tree.instance().isMobileScreen = true;
    tree.instance().isGroupGiftEligible = true;
    tree.setState({
      groupGiftFundError: true,
      isButtonDisable: false,
      inputFund: '$100',
    });
    tree.setProps({ selectedCheckboxFilter: 'store-pickup' });
    removeCookie('cartCount');
    expect(toJson(tree)).to.matchSnapshot();
  });
});
