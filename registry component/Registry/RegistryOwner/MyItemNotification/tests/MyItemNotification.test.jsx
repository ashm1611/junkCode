import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import { SessionStorageUtil } from '@bbb-app/utils/sessionStorage';
import Notification from '@bbb-app/core-ui/notification';
import MyItemNotification from '../MyItemNotification';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const updateSelectedFilters = sinon.stub();
  const registryFacetsFilter = [
    {
      id: 'status',
      items: [
        {
          key: 'Gift Wanted',
          labels: 'Gift Wanted',
        },
        {
          key: 'Currently Sold Out',
          labels: 'Currently Sold Out',
        },
        {
          key: 'Discontinued',
          labels: 'Discontinued',
        },
      ],
    },
  ];

  const selectedFilters = {
    sort: 'recommended',
  };
  let props = {
    labels: {
      outOfStockMessage:
        'Oh, no! Products on your my items page registry need your attention.',
      viewProducts: 'View Products',
    },
    updateSelectedFilters,
    registryFacetsFilter,
    registryId: '987654321',
    selectedFilters,
  };

  const getTree = prop => shallow(<MyItemNotification {...prop} />);
  const sessionUtil = new SessionStorageUtil(true);
  let tree;
  before(() => {
    tree = getTree(props);
  });

  it('should render MyItemNotification component correctly', () => {
    tree.setProps({ registryId: '987654322' });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should hide MyItemNotification component if we user manually select all outofstock filter', () => {
    const statusFacets = ['Currently Sold Out', 'Discontinued'];
    tree.setProps({
      selectedFilters: {
        ...selectedFilters,
        status: statusFacets,
      },
    });
    expect(tree.find(Notification)).to.have.lengthOf(0);
    expect(tree.instance().state.showNotification).to.equal(false);
  });
  it('should render MyItemNotification again if selected filter does not match with available outofstock filter', () => {
    tree.setProps({
      selectedFilters: {
        ...selectedFilters,
        status: ['Gift Wanted'],
      },
    });
    expect(tree.find(Notification)).to.have.lengthOf(1);
  });
  it('should not render component if use closeed the notification for same registry', () => {
    sessionUtil.saveItem('hideMyItemNotification_987654321', true);
    tree = getTree(props);
    const spy = sinon.spy(tree.instance(), 'checkForOutStockItem');

    tree.setProps({
      selectedFilters: {
        status: undefined,
      },
    });
    sessionUtil.removeItem('hideMyItemNotification_987654321');
    expect(tree.find(Notification)).to.have.lengthOf(0);
    expect(spy.called).to.equal(false);
  });
  it('should not render component if user does not have outofstock and discontinued items in registry', () => {
    props = {
      ...props,
      registryFacetsFilter: [
        {
          id: 'status',
          items: [
            {
              key: 'Gift Wanted',
              labels: 'Gift Wanted',
            },
          ],
        },
      ],
    };
    tree = getTree(props);
    const spy = sinon.spy(tree.instance(), 'checkForOutStockItem');
    tree.setProps({
      selectedFilters: {
        status: undefined,
      },
    });
    expect(tree.find(Notification)).to.have.lengthOf(0);
    expect(spy.called).to.equal(true);
  });

  it('should call closeNotificationHandler correctly', () => {
    tree.instance().closeNotificationHandler();
    const result = sessionUtil.getItem(
      `hideMyItemNotification_${props.registryId}`
    );
    sessionUtil.removeItem(`hideMyItemNotification_${props.registryId}`);
    expect(tree.instance().state.showNotification).to.equal(false);
    expect(result).to.equal('true');
  });
});
