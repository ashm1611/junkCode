import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Button from '@bbb-app/core-ui/button/CoreButton';
import RenderSortListItem from '../RenderSortListItem/RenderSortListItem';

configure({ adapter: new Adapter() });

const mockData = {
  label: 'Option 1',
  value: '1',
  count: 1,
  key: 'Discontinued',
};

const mockDataKey = {
  label: 'Option 1',
  value: '1',
  count: 1,
  key: 'Unavailable',
};

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(
      <RenderSortListItem
        id="list-item"
        data={mockData}
        type="field"
        index={0}
        itemPositionInList="first"
        selected={false}
        onSelect={() => {}}
        baseUrl="/"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render different with different types', () => {
    const tree = shallow(
      <RenderSortListItem
        id="list-item"
        data={mockData}
        type="range"
        index={0}
        itemPositionInList="first"
        selected={false}
        onSelect={() => {}}
        baseUrl="/"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render a button when no type is available', () => {
    const wrapper = shallow(
      <RenderSortListItem
        id="list-item"
        data={mockDataKey}
        type=""
        index={0}
        itemPositionInList="last"
        selected
        onSelect={() => {}}
        unavailableItemCount="1"
      />
    );
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('should render null when count is zero', () => {
    const wrapper = shallow(
      <RenderSortListItem
        id="list-item"
        data={{ ...mockData, count: 0 }}
        type=""
        index={0}
        itemPositionInList="last"
        selected
        onSelect={() => {}}
      />
    );
    expect(toJson(wrapper)).to.equal('');
  });
});

describe(`${__filename} events`, () => {
  let wrapper;
  let spyOnSelect;

  beforeEach(() => {
    spyOnSelect = sinon.spy();
  });

  it('should respond to user clicks', () => {
    wrapper = mount(
      <RenderSortListItem
        id="list-item"
        data={mockData}
        index={0}
        itemPositionInList="first"
        selected={false}
        onSelect={spyOnSelect}
        type=""
        toggleOpenState={() => {}}
        facetClick={() => {}}
      />
    );
    wrapper.find('button').simulate('click');

    expect(spyOnSelect.calledOnce).to.equal(true);
  });

  describe('methods', () => {
    const getTree = props =>
      shallow(
        <RenderSortListItem
          id="list-item"
          data={mockData}
          type="field"
          index={0}
          itemPositionInList="first"
          selected={false}
          onSelect={() => {}}
          baseUrl="/"
          {...props}
        />
      );
    describe('onClick', () => {
      it('should call onClick', () => {
        const spy = sinon.spy();
        const tree = getTree({
          onSelect: spy,
          facetClick: spy,
        });
        tree.instance().onClick();
        expect(spy.called).to.equal(true);
      });
    });
  });
});
