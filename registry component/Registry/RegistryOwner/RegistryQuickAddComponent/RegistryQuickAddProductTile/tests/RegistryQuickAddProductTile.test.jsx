import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as storeUtils from '@bbb-app/utils/storeRefUtils';

import RegistryQuickAddProductTile from '../RegistryQuickAddProductTile';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const contextPath = '/store';
  const item = {
    DISPLAY_NAME: 'DISPLAY_NAME',
    PRODUCT_ID: '5174122',
    SEO_URL: '/product/fridababy-reg-baby-basics-kit/5174122',
    IS_PRICE: '$39.99',
    SKU_ID: ['64858814'],
    SCENE7_URL: '179129964858814p',
    RATINGS: '4',
    REVIEWS: '98',
  };
  let props = {
    registryId: '123456781',
    labels: {
      createRegistry: 'createRegistry',
    },
    addToRegistryLbl: 'Add TO Registry',
    isItemAlreadyAddedToRegistry: false,
    enableCSLabels: false,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RegistryQuickAddProductTile
        item={item}
        contextPath={contextPath}
        {...props}
      />
    );
  });

  it('should render correctly without added item into registry', () => {
    props = {
      registryId: '12345678',
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add TO Registry',
      isItemAlreadyAddedToRegistry: false,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });

  it('should render correctly with added item into registry only mode', () => {
    props = {
      registryId: '12345678',
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add TO Registry',
      isItemAlreadyAddedToRegistry: true,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });

  it('should render correctly with added item into registry with conditon mode', () => {
    props = {
      registryId: '12345678',
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add TO Registry',
      isItemAlreadyAddedToRegistry: true,
      isAddToRegistryFetching: true,
      isAddingQuickAddItemToList: true,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });

  it('should render correctly with added item into registry for internation user', () => {
    props = {
      registryId: '12345678',
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add TO Registry',
      isItemAlreadyAddedToRegistry: true,
      isAddToRegistryFetching: true,
      isAddingQuickAddItemToList: true,
    };
    wrapper.setProps({
      ...props,
    });
    const instance = wrapper.instance();
    instance.isInternationalUser = true;
    expect(wrapper).to.not.equal(null);
  });

  it('should simulate onClick', () => {
    props = {
      registryId: '12345678',
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add TO Registry',
      isItemAlreadyAddedToRegistry: true,
      isAddToRegistryFetching: true,
      isAddingQuickAddItemToList: true,
    };
    wrapper.setProps({
      ...props,
    });
    wrapper.find('PrimaryLink').simulate('click');
  });

  it('should render correctly for MSWP item when it is already added to registry', () => {
    const mswpItem = {
      DISPLAY_NAME: 'test',
      SEO_URL: '',
      IS_PRICE: '',
      PRODUCT_ID: '',
      SKU_ID: '',
      SCENE7_URL: '',
      TYPE: 'MSWP',
      RATINGS: '',
      REVIEWS: '',
    };
    wrapper.setProps({
      enableNewRegDashboard: true,
      isItemAlreadyAddedToRegistry: false,
    });
    wrapper.setProps({ item: mswpItem });
    wrapper.find('Button').simulate('click');
  });

  it('should render correctly for MSWP item', () => {
    sinon.stub(storeUtils, 'getStoreRef').returns({});

    const mswpItem = {
      DISPLAY_NAME: 'test',
      SEO_URL: '',
      IS_PRICE: '',
      PRODUCT_ID: '',
      SKU_ID: '',
      SCENE7_URL: '',
      TYPE: 'MSWP',
      RATINGS: '',
      REVIEWS: '',
    };

    wrapper.setProps({ item: mswpItem, isItemAlreadyAddedToRegistry: false });
    wrapper.instance().dispatchTealiumObjProductTealiumParams();
    storeUtils.getStoreRef.restore();

    wrapper.find('Button').simulate('click');
  });
  it('should render correctly when props isPickupInStoreModalOpen is true', () => {
    const toggleChooseOptionState = sinon.spy();
    props = {
      isPickupInStoreModalOpen: true,
      isItemAlreadyAddedToRegistry: false,
      isAddingQuickAddItemToList: true,
      item: {},
    };
    const nextProps = {
      isPickupInStoreModalOpen: false,
    };
    wrapper.setProps({
      ...props,
    });
    const instance = wrapper.instance();

    wrapper.setState({ toggleChooseOption: true });
    instance.componentWillReceiveProps(nextProps);
    expect(toggleChooseOptionState.called);

    wrapper.setState({ toggleChooseOption: false });
    instance.componentWillReceiveProps(nextProps);
    expect(toggleChooseOptionState.called);
  });
  it('should render when enableNewRegDashboard is true', () => {
    props = {
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add To Registry',
      isItemAlreadyAddedToRegistry: false,
      enableNewRegDashboard: true,
      isMobile: true,
      hideATRFlag: false,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });
  it('should render when enableCSLabels is true', () => {
    props = {
      labels: {
        createRegistry: 'createRegistry',
      },

      addToRegistryLbl: 'Add To Registry',
      isItemAlreadyAddedToRegistry: false,
      enableNewRegDashboard: true,
      isMobile: true,
      hideATRFlag: false,
      enableCSLabels: true,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });
  it('should render when isItemAlreadyAddedToRegistry and enableNewRegDashboard is true ', () => {
    props = {
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add To Registry',
      isItemAlreadyAddedToRegistry: true,
      enableNewRegDashboard: true,
      isMobile: true,
      hideATRFlag: false,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });
  it('should render when isMobile,isItemAlreadyAddedToRegistry are false and enableNewRegDashboard is true ', () => {
    props = {
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add To Registry',
      enableNewRegDashboard: true,
      isMobile: false,
      hideATRFlag: false,
      isItemAlreadyAddedToRegistry: false,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });
  it('should render when isMobile is false and enableNewRegDashboard, isItemAlreadyAddedToRegistry are true ', () => {
    props = {
      labels: {
        createRegistry: 'createRegistry',
      },
      addToRegistryLbl: 'Add To Registry',
      enableNewRegDashboard: true,
      isMobile: false,
      hideATRFlag: false,
      isItemAlreadyAddedToRegistry: true,
    };
    wrapper.setProps({
      ...props,
    });
    expect(wrapper).to.not.equal(null);
  });
});
