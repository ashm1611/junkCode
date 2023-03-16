import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Button from '@bbb-app/core-ui/button';
import SortOptionsView from '../RenderSortOptionView/SortOptionsView';
import RenderSortListItems from '../RenderSortListItems/RenderSortListItems';

const mockData = [
  { label: 'Option 1', props: { value: 'option-1' } },
  { label: 'Option 2', props: { value: 'option-2' } },
  { label: 'Option 3', props: { value: 'option-3' } },
];

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(
      <SortOptionsView
        data={mockData}
        onClose={() => {}}
        onSelectionUpdate={() => {}}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe(`${__filename} events`, () => {
  let wrapper;
  let spyOnClose;
  let spyOnSelection;
  const selectedItems = ['LOW_PRICE asc'];

  beforeEach(() => {
    spyOnClose = sinon.spy();
    spyOnSelection = sinon.spy();

    wrapper = shallow(
      <SortOptionsView
        data={mockData}
        onClose={spyOnClose}
        onSelectionUpdate={spyOnSelection}
        selectedItems={selectedItems}
      />
    );
  });

  it('should trigger close when close button is clicked', () => {
    wrapper
      .find(Button)
      .first()
      .simulate('click');

    // eslint-disable-next-line no-unused-expressions
    expect(spyOnClose).to.have.been.called;
  });

  it('should trigger close when view results button is clicked', () => {
    wrapper.setProps({ selectedItems: ['-1'] });
    wrapper
      .find('footer')
      .find(Button)
      .first()
      .simulate('click');

    // eslint-disable-next-line no-unused-expressions
    expect(spyOnClose).to.have.been.called;
  });

  it('should trigger selection updates', () => {
    wrapper.find(RenderSortListItems).prop('onSelectionUpdate')(
      'test',
      'test',
      0
    );

    // eslint-disable-next-line no-unused-expressions
    expect(spyOnSelection).to.have.been.called;
  });
});
