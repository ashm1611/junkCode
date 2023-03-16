import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { items as data } from '@bbb-app/filters/tests/mockFilterData';
import RenderSortListItems from '../RenderSortListItems/RenderSortListItems';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with defaults', () => {
    const tree = shallow(
      <RenderSortListItems
        data={data}
        modalSelectionHeading={false}
        modalSelectionView
      />
    );
    tree.instance().setState({ items: [{ type: 'header' }] });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call componentWillReceiveProps method ', () => {
    const nextProps = {
      data: 'test',
    };
    const wrapper = shallow(
      <RenderSortListItems
        data={data}
        modalSelectionHeading="test"
        modalSelectionView
      />
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().state.items).to.equal(nextProps.data);
  });

  it('should run onItemSelect width data1 ', () => {
    const data1 = [{ key: 'test', singleSelection: true }];
    const spyOnSelectionUpdate = sinon.spy();
    const id = 'test';
    const selected = 'test';
    const index = 0;
    const tree = shallow(
      <RenderSortListItems
        data={data1}
        onSelectionUpdate={spyOnSelectionUpdate}
      />
    );

    tree.instance().onItemSelect(id, selected, index);
    // eslint-disable-next-line no-unused-expressions
    expect(spyOnSelectionUpdate.called).to.be.true;
  });

  it('should run onItemSelect width data2 ', () => {
    const data2 = [{ key: 'test', singleSelection: false }];
    const spyOnSelectionUpdate = sinon.spy();
    const id = 'test';
    const index = 0;
    const tree = shallow(
      <RenderSortListItems
        data={data2}
        onSelectionUpdate={spyOnSelectionUpdate}
      />
    );

    tree.instance().onItemSelect(id, undefined, index);
    // eslint-disable-next-line no-unused-expressions
    expect(spyOnSelectionUpdate.called).to.be.true;
  });

  it('should call toggleOpenState on button click', () => {
    const toggleOpenStateSpy = sinon.spy();
    const tree = shallow(
      <RenderSortListItems
        data={data}
        modalSelectionView
        toggleOpenState={toggleOpenStateSpy}
      />
    );
    tree.find('Button').simulate('click');
    // eslint-disable-next-line no-unused-expressions
    expect(toggleOpenStateSpy.called).to.be.true;
  });

  it('should have defaultprops method ', () => {
    expect(RenderSortListItems.defaultProps.onSelectionUpdate).to.not.throw();
    expect(RenderSortListItems.defaultProps.closeContainer).to.not.throw();
    expect(
      RenderSortListItems.defaultProps.accessibilityEventHandler
    ).to.not.throw();
  });
});
