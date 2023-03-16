import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as toastify from 'react-toastify';
import { RegistryOwnerLayout } from '../RegistryOwnerLayout';
import MyItemNotification from '../../MyItemNotification/MyItemNotification.async';
import { mapDispatchToProps } from '../../../../../../containers/Pages/Registry/RegistryOwner';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render component with registryData', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      registryID: 520646528,
      labels: {
        registryDetails: {},
      },
      pageType: 'Registry Owner',
      switchConfig: {},
      registryFacetsFilter: [{ items: ['recommended'] }],
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 2 } },
      },
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.find('.accordianContainer')).to.have.lengthOf(2);
  });
  it('should render correctly when enableNewRegDashboard  is true and isMobile  is false', () => {
    const props = {
      isMobile: false,
      enableNewRegDashboard: true,
      maxItemInRegToShowQuickAdd: 15,
      dynamicContentState: {
        content: 'sxyz',
      },
      registryID: 520646528,
      labels: {
        registryDetails: {},
      },
      pageType: 'Registry Owner',
      switchConfig: {},
      registryFacetsFilter: [{ items: ['recommended'] }],
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 2 } },
      },
    };

    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree).to.not.equal(null);
  });
  it('should render correctly when enableNewRegDashboard and isMobile are true', () => {
    const props = {
      isMobile: true,
      enableNewRegDashboard: true,
      maxItemInRegToShowQuickAdd: 15,
      dynamicContentState: {
        content: 'sxyz',
      },
      registryID: 520646528,
      labels: {
        registryDetails: {},
      },
      pageType: 'Registry Owner',
      switchConfig: {},
      registryFacetsFilter: [{ items: ['recommended'] }],
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 3 } },
      },
    };

    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree).to.not.equal(null);
  });
  it('should render component with registryData in new registry flow', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      registryID: 520646528,
      labels: {
        registryDetails: {},
      },

      pageType: 'Registry Owner',
      switchConfig: {},
      registryFacetsFilter: [{ items: ['recommended'] }],
      registryData: {
        registryResVO: { registrySummaryVO: { giftRegistered: 2 } },
      },
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.find('.accordianContainer')).to.have.lengthOf(2);
  });
  it('should render component with warrantyInfo and needhelp', () => {
    const getContent = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: {
          id_4: {
            components: [{ component1: 'div' }],
          },
          id_5: {
            components: [{ component1: 'div' }],
          },
        },
      },
      globalSwitchConfig: { enableCSLabels: true },
      labels: {
        referredContent: [
          { key: 'needHelp', id: 'id_4' },
          { key: 'warrantyInfo', id: 'id_5' },
        ],
      },

      registryID: 520646528,
      pageType: 'Registry Owner',
    };
    const tree = shallow(
      <RegistryOwnerLayout {...props} getContent={getContent} />
    );
    expect(tree.find('.warrantyInfo')).to.have.lengthOf(1);
  });
  it('should call getReplacedItemData correctly', () => {
    const props = {
      dynamicContentState: {
        content: 'sxyz',
      },
    };
    const skuScene7Url = '/test';
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    tree.instance().getReplacedItemData(skuScene7Url);
    expect(tree.state('skuScene7Url')).to.be.equal('/test');
  });
  it('should call pathMatcher correctly', () => {
    const path = 'www.abc.com';
    const props = {
      dynamicContentState: {
        content: 'sxyz',
      },
      matchPath: path,
    };

    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.instance().pathMatcher(path)).to.be.equal(true);
  });
  it('should call handleViewItemMessage correctly', () => {
    const skuScene7Url = 'www.abc.com';
    const productName = 'abc';
    const props = {
      dynamicContentState: {
        content: 'sxyz',
      },
      labels: {
        registryDetails: {
          replacedItemLabel: 'replace Item',
          viewItemBtnLabel: 'View Item',
        },
      },
    };
    const toast = sinon.stub(toastify, 'toast');
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    tree.instance().handleViewItemMessage(skuScene7Url, productName);
    expect(toast).to.be.called;
  });
  it('should call renderUndoButton correctly', () => {
    const skuid = '12334234';
    const props = {
      dynamicContentState: {
        content: 'sxyz',
      },
      labels: {
        registryDetails: {
          undoDeletedItem: 'Undo',
        },
      },
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    const undoDeletedItemUI = tree.instance().renderUndoButton(skuid);
    expect(undoDeletedItemUI.props.variation).to.be.equal('whitelinkUnderline');
  });
  it('should call resetToViewAllFilter correctly', () => {
    const skuid = '12334234';
    const props = {
      dynamicContentState: {
        content: 'sxyz',
      },
      labels: {
        registryDetails: {
          undoDeletedItem: 'Undo',
        },
      },
      onResetFiltersAndSort: sinon.stub(),
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    tree.instance().resetToViewAllFilter(skuid);
    expect(tree.instance().props.onResetFiltersAndSort).to.be.called;
  });
});

describe('getReferredContentId for known key', () => {
  it('should return the correct id for a key', () => {
    const resetGlobalNotification = sinon.stub();
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      labels: {
        registryDetails: {},
      },

      registryID: 520646528,
      resetGlobalNotification,
    };
    const wrapper = shallow(<RegistryOwnerLayout {...props} />);
    const layoutInstance = wrapper.instance();
    layoutInstance.referredContent = [
      { key: 'key_1', id: 'id_1' },
      { key: 'key_2', id: 'id_2' },
      { key: 'key_3', id: 'id_3' },
    ];
    expect(layoutInstance.getReferredContentId('key_1')).to.equal('id_1');
  });
});

describe('getReferredContentId for unknown key', () => {
  it('should return undefined for unknown key', () => {
    const props = {
      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
      labels: {
        registryDetails: {},
      },

      registryID: 520646528,
    };
    const wrapper = shallow(<RegistryOwnerLayout {...props} />);
    const layoutInstance = wrapper.instance();
    layoutInstance.referredContent = [
      { key: 'key_1', id: 'id_1' },
      { key: 'key_2', id: 'id_2' },
      { key: 'key_3', id: 'id_3' },
    ];
    expect(layoutInstance.getReferredContentId('key_4')).to.equal(undefined);
  });
});

describe(__filename, () => {
  const resetGlobalNotification = sinon.stub();
  const props = {
    labels: {
      registryDetails: {},
    },
    dynamicContentState: {
      content: 'sxyz',
    },

    registryID: 520646528,
    resetGlobalNotification,
  };
  describe('#Category Accordian', () => {
    const propsData = {
      location: {
        pathname: '/path-to-something',
      },

      isMobile: false,
      regBanner: 'banner-path',
      eventType: '',
      enableTab: false,
      labels: {},
      dynamicContentState: {
        content: 'sxyz',
      },
    };
    it('should call toggleLoginModalState', () => {
      const displayLoginModal = sinon.stub();
      const registryOwnerFirstCategoryList = [
        {
          registryItemList: [
            {
              item: {},
            },
          ],
        },
      ];
      const wrapper = shallow(
        <RegistryOwnerLayout
          isItemsFetching={false}
          registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
          displayLoginModal={displayLoginModal}
          {...propsData}
          mPulseEnabled
        />
      );
      wrapper.instance().toggleLoginModalState();
      /* eslint no-unused-expressions: 0 */
      expect(displayLoginModal).to.have.been.called;
    });
    it('should call compareSkuId', () => {
      const registryOwnerFirstCategoryList = [
        {
          registryItemList: [
            {
              item: {},
            },
          ],
        },
      ];
      const products = [
        {
          sku: 123452,
        },
      ];
      const query = {
        skuAdded: '123452',
      };
      const wrapper = shallow(
        <RegistryOwnerLayout
          isItemsFetching={false}
          registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
          {...propsData}
          mPulseEnabled
        />
      );
      expect(wrapper.instance().compareSkuId(products, query)).to.equal(true);
    });
    it('should show notification bar if list is filtered and there are no filtered items in the items list', () => {
      const wrapper = shallow(
        <RegistryOwnerLayout
          isItemsFetching={false}
          isFiltered
          {...props}
          {...propsData}
          mPulseEnabled
        />
      );
      expect(wrapper.find('.accordianContainer')).to.have.lengthOf(1);
    });
    it('should show notification bar for error if firstcategory item call fails', () => {
      const error = { error: { errorMsg: 'error' } };
      const wrapper = shallow(
        <RegistryOwnerLayout
          isItemsFetching={false}
          registryOnwerFirstCategoryError={error}
          remainingCategoryError={error}
          {...props}
          {...propsData}
          mPulseEnabled
          enableNewRegDashboard
          isMobile
        />
      );
      wrapper.setProps({ getHeaderLayout: false });
      wrapper.instance().renderLayout(false, true);
      wrapper.instance().renderRegistryOwnerItems(true);
      expect(wrapper.find('#errorMsgOnFirstCategoryItemFail')).to.have.length(
        1
      );
    });
    it('should show notification bar for error if remainingCategory item call fails', () => {
      const error = { error: { errorMsg: 'error' } };
      const wrapper = shallow(
        <RegistryOwnerLayout
          isItemsFetching={false}
          remainingCategoryError={error}
          {...props}
          {...propsData}
          mPulseEnabled
          enableNewRegDashboard
        />
      );
      wrapper.setProps({ getHeaderLayout: false });
      wrapper.instance().renderLayout(false, true);
      wrapper.instance().renderRegistryOwnerItems(true);
      expect(wrapper.find('#errorMsgOnFirstCategoryItemFail')).to.have.length(
        1
      );
    });
  });
});

describe(__filename, () => {
  describe('#RegistryOwner.mapDispatchToProps', () => {
    const dispatch = sinon.stub();

    it('should call dispatch', () => {
      const prop = mapDispatchToProps(dispatch);
      prop.getThankYouList();
      /* eslint no-unused-expressions: 0 */
      expect(dispatch).to.have.been.called;
    });
  });
});

describe(__filename, () => {
  let props;
  let wrapper;
  let wrapperInstance;
  let checkDeletedItem;
  props = {
    isMobile: false,
    dynamicContentState: {
      content: 'sxyz',
    },
    labels: {
      registryDetails: {},
    },
    registryID: 520646528,
    isItemDeleted: false,
    updatedSkuId: '123',
    filteredFirstCategoryItems: [{ sku: 212 }, { sku: 2123 }, { sku: 2124 }],
    registryOwnerFirstCategoryList: [
      {
        registryItemList: [
          {
            sKUDetailVO: {
              skuId: '123',
            },
            itemType: 'DPF',
          },
        ],
      },
    ],
    undoRemoveRegistryItem: sinon.stub(),
  };
  it('componentWillReceiveProps should call checkDeletedItem when isItemDeleted is true', () => {
    wrapper = shallow(<RegistryOwnerLayout {...props} />);
    wrapperInstance = wrapper.instance();
    checkDeletedItem = sinon.stub(wrapperInstance, 'checkDeletedItem');
    wrapper.setProps({ isItemDeleted: true });
    expect(checkDeletedItem).to.have.been.called;
  });

  it('componentWillReceiveProps should call checkDeletedItem when isItemDeleted is false', () => {
    wrapper = shallow(<RegistryOwnerLayout {...props} />);
    wrapperInstance = wrapper.instance();
    checkDeletedItem = sinon.stub(wrapperInstance, 'checkDeletedItem');
    wrapper.setProps({ switchConfig: { enableRegistryUndoDelete: false } });
    expect(checkDeletedItem).to.have.been.not.called;
  });

  it('should call componentWillReceiveProps for making hideParentModal as false', () => {
    const registryOwnerFirstCategoryList = [
      {
        catSeoUrl: '/kitchen/',
        categoryId: '10518_COOKWARE',
        displayName: 'COOKWARE',
        recommendedCatFlag: false,
        registryItemList: [
          {
            promoDesc: null,
            deletedItem: true,
            sKUDetailVO: {
              skuId: '123',
            },
            productName: 'test',
          },
        ],
      },
    ];
    const nextProps = {
      isFromReplace: true,
      isRemainingItemFetching: true,
      isPriceItemFetching: false,
      updatedSkuId: '123',
      isItemDeleted: true,
      registryOwnerFirstCategoryList,
      isRegistrantDetailModalOpen: false,
    };
    const closeOtherOpenModaOnInactiveModal = sinon.stub(
      wrapperInstance,
      'closeOtherOpenModaOnInactiveModal'
    );
    const changeFilter = sinon.stub(wrapperInstance, 'changeFilter');
    wrapper = shallow(
      <RegistryOwnerLayout
        {...props}
        closeOtherOpenModaOnInactiveModal={closeOtherOpenModaOnInactiveModal}
        closeModalFlag
        changeFilter={changeFilter}
      />
    );
    wrapper.setState({ skuId: '3456' });
    wrapper.setProps({
      isRemainingItemFetching: true,
      isPriceItemFetching: true,
      isRegistrantDetailModalOpen: true,
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('hideParentModal')).to.be.equal(false);
  });

  it('should call undoDeletedItem method', () => {
    const e = {
      target: {
        getAttribute: () => {},
      },
    };
    wrapper = shallow(<RegistryOwnerLayout {...props} />);
    wrapperInstance = wrapper.instance();
    wrapperInstance.undoDeletedItem(e);
    expect(wrapperInstance.props.undoRemoveRegistryItem).to.be.called;
  });
  it('should call undoDeletedItem method and mark deletedItem as false', () => {
    const registryOwnerFirstCategoryList = [
      {
        catSeoUrl: '/kitchen/',
        categoryId: '10518_COOKWARE',
        displayName: 'COOKWARE',
        recommendedCatFlag: false,
        registryItemList: [
          {
            promoDesc: null,
            deletedItem: true,
            sKUDetailVO: {
              skuId: '123',
            },
            productName: 'test',
          },
        ],
      },
    ];
    const event = {
      target: {
        getAttribute: sinon.stub().returns('123'),
      },
    };
    const tree = shallow(
      <RegistryOwnerLayout
        {...props}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
      />
    );
    expect(tree.instance().undoDeletedItem(event)).to.be.equal(undefined);
  });
  it('should call renderCategoryAccordian method with zero showOpenCount', () => {
    const registryOwnerFirstCategoryList = [
      {
        catSeoUrl: '/kitchen/',
        categoryId: '10518_COOKWARE',
        displayName: 'COOKWARE',
        recommendedCatFlag: false,
        registryItemList: [
          {
            promoDesc: null,
            deletedItem: true,
            sKUDetailVO: {
              skuId: '123',
            },
            productName: 'test',
          },
        ],
      },
    ];
    const item = {
      catgoryName: 'toy',
      categoryId: '111',
    };
    const conditionItem = [{ deletedItem: false }, { deletedItem: true }];
    const tree = shallow(
      <RegistryOwnerLayout
        {...props}
        showOpenCount={0}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
      />
    );
    wrapperInstance = tree.instance();
    tree.setState({ isShowAllAndHideAll: false });
    const compareSkuIdStub = sinon
      .stub(wrapperInstance, 'compareSkuId')
      .returns(true);
    wrapperInstance.renderCategoryAccordian(item, conditionItem, 1);
    expect(tree.find('.grid-container')).to.have.lengthOf(2);
    compareSkuIdStub.restore();
  });
  it('should call renderCategoryAccordian method with valid showOpenCount', () => {
    const registryOwnerFirstCategoryList = [
      {
        catSeoUrl: '/kitchen/',
        categoryId: '10518_COOKWARE',
        displayName: 'COOKWARE',
        recommendedCatFlag: false,
        registryItemList: [
          {
            promoDesc: null,
            deletedItem: true,
            sKUDetailVO: {
              skuId: '123',
            },
            productName: 'test',
          },
        ],
      },
    ];
    const item = {
      catgoryName: 'toy',
      categoryId: '111',
    };
    const conditionItem = [{ deletedItem: false }, { deletedItem: true }];
    const tree = shallow(
      <RegistryOwnerLayout
        {...props}
        expandAll
        showOpenCount={4}
        registryOwnerFirstCategoryList={registryOwnerFirstCategoryList}
      />
    );
    wrapperInstance = tree.instance();
    tree.setState({ isShowAllAndHideAll: true });
    const compareSkuIdStub = sinon
      .stub(wrapperInstance, 'compareSkuId')
      .returns(true);
    wrapperInstance.renderCategoryAccordian(item, conditionItem, 1);
    expect(tree.find('.grid-container')).to.have.lengthOf(2);
    compareSkuIdStub.restore();
  });
  it('should call renderError with true value', () => {
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    wrapperInstance = tree.instance();
    wrapperInstance.renderError(true);
    expect(tree.find('.grid-container')).to.have.lengthOf(1);
  });
  it('should call renderError with empty param', () => {
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    wrapperInstance = tree.instance();
    wrapperInstance.renderError();
    expect(tree.find('.grid-container')).to.have.lengthOf(1);
  });
  it('should call renderRegistryOwnerItems for Baby', () => {
    const newProps = {
      eventType: 'Baby',
      isDiaperFundEnable: true,

      isMobile: false,
      dynamicContentState: {
        content: 'sxyz',
      },
    };
    const tree = shallow(<RegistryOwnerLayout {...newProps} />);
    wrapperInstance = tree.instance();
    wrapperInstance.renderRegistryOwnerItems(true);
    expect(tree.find('.large-3')).to.have.lengthOf(2);
  });
  it('should show container with no result', () => {
    const error = { error: { errorMsg: 'error' } };
    const filteredFirstCategoryItems = [];
    wrapper = shallow(
      <RegistryOwnerLayout
        isItemsFetching={false}
        registryOnwerFirstCategoryError={error}
        remainingCategoryError={error}
        {...props}
        mPulseEnabled
        filteredFirstCategoryItems={filteredFirstCategoryItems}
        enableNewRegDashboard
      />
    );
    wrapper.setProps({ getHeaderLayout: false });
    wrapper.instance().renderLayout(false, true);
    wrapper.instance().renderRegistryOwnerItems(true);
    expect(wrapper.find('.containerForNoResult')).to.have.length(1);
  });
  it('should render MyItemNotification correctly', () => {
    props = {
      ...props,
      registryFacetsFilter: [
        {
          id: 'status',
          items: [
            {
              key: 'Discontinued',
              labels: 'Discontinued',
            },
          ],
        },
      ],
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.find(MyItemNotification)).to.have.lengthOf(1);
  });
  it('should render MyItemNotification correctly when item is both discontinued and out of stock', () => {
    props = {
      ...props,
      registryFacetsFilter: [
        {
          id: 'status',
          items: [
            {
              key: 'Discontinued',
              labels: 'Discontinued',
            },
            {
              key: 'Currently Sold Out',
              labels: 'Currently Sold Out',
            },
          ],
        },
      ],
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.find(MyItemNotification)).to.have.lengthOf(1);
  });
  it('should render MyItemNotification correctly when item is just Currently Sold Out', () => {
    props = {
      ...props,
      registryFacetsFilter: [
        {
          id: 'status',
          items: [
            {
              key: 'Currently Sold Out',
              labels: 'Currently Sold Out',
            },
          ],
        },
      ],
    };
    const tree = shallow(<RegistryOwnerLayout {...props} />);
    expect(tree.find(MyItemNotification)).to.have.lengthOf(1);
  });
});
