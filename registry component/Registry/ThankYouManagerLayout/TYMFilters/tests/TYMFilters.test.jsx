import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Filters from '../TYMFilters';
configure({ adapter: new Adapter() });
const deviceConfig = {
  DESKTOP: 1024,
  TABLET: 768,
  MIDDLEDESKTOP: 1100,
};
const switchConfig = { enableRegistryCollaboration: true };
describe(__filename, () => {
  it('should render defaults', () => {
    const tree = shallow(
      <Filters
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
        isNewDashboard
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe('TYMFilters functions', () => {
  let value;
  let instance;
  const sortThankYouList = sinon.spy();
  const updateView = sinon.spy();
  const props = {
    sortThankYouList,
    registryId: '123456',
    updateView,
  };
  beforeEach(() => {
    const tree = shallow(
      <Filters
        {...props}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
      />
    );
    instance = tree.instance();
  });

  it('should call sortThankYouList for selected sort value with args registryId, sort order and sort direction', () => {
    value = 'Date Purchased (new-old)';
    instance.datePurchasedNewLabel = 'Date Purchased (new-old)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '1', '1')).to.equal(
      true
    );
    value = 'Date Purchased (old-new)';
    instance.datePurchasedOldLabel = 'Date Purchased (old-new)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '1', '0')).to.equal(
      true
    );
    value = 'Gift Purchased (A-Z)';
    instance.giftPurchasedAscendingLabel = 'Gift Purchased (A-Z)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '2', '0')).to.equal(
      true
    );
    value = 'Gift Purchased (Z-A)';
    instance.giftPurchasedDescendingLabel = 'Gift Purchased (Z-A)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '2', '1')).to.equal(
      true
    );
    value = 'Gift Giver (A-Z)';
    instance.giftGiverAscendingLabel = 'Gift Giver (A-Z)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '0', '0')).to.equal(
      true
    );
    value = '';
    instance.giftGiverDescendingLabel = '';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    value = 'Gift Giver (Z-A)';
    instance.giftGiverDescendingLabel = 'Gift Giver (Z-A)';
    instance.sortBySelection(value);
    expect(sortThankYouList.called).to.equal(true);
    expect(sortThankYouList.calledWith(props.registryId, '0', '1')).to.equal(
      true
    );
  });

  it('should call updateView for selected sort value as arg', () => {
    instance.sortBySelection(value);
    expect(updateView.called).to.equal(true);
    expect(updateView.calledWith(value)).to.equal(true);
  });
});
