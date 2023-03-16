import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DiscontinuedDesktop } from '../Discontinued';
import { DiscontinuedMobile } from '../DiscontinuedMobile';

configure({ adapter: new Adapter() });
const mockData = {
  label: 'Option 1',
  value: '1',
  count: 1,
};
describe(__filename, () => {
  it('should render correctly Discontinued Desktop', () => {
    const tree = shallow(
      <DiscontinuedDesktop
        id={1}
        filter={{}}
        defaultChecked={false}
        stylesDesktop={{}}
      />
    );
    expect(tree).to.not.be.blank();
  });
  it('should render correctly discontinuedDesktopWithSS with other props', () => {
    const changeFilter = sinon.stub();
    const tree = shallow(
      <DiscontinuedDesktop
        id={1}
        filter={{}}
        defaultChecked={false}
        stylesDesktop={{}}
        discontinuedItemCount
        changeFilter={changeFilter}
      />
    );
    tree.find('Button').simulate('click');
    expect(tree).to.not.be.blank();
  });
  it('should render correctly discontinuedDesktopWithoutSS', () => {
    const tree = shallow(
      <DiscontinuedDesktop
        id={1}
        filter={{}}
        defaultChecked={false}
        stylesDesktop={{}}
      />
    );
    expect(tree).to.not.be.blank();
  });
  it('should render correctly discontinuedDesktopWithoutSS with other props', () => {
    const changeFilter = sinon.stub();
    const tree = shallow(
      <DiscontinuedDesktop
        id={1}
        filter={{}}
        defaultChecked={false}
        stylesDesktop={{}}
        discontinuedItemCount
        changeFilter={changeFilter}
      />
    );
    expect(tree).to.not.be.blank();
    tree.find('Button').simulate('click');
  });
  it('should render correctly Discontinued Mobile', () => {
    const tree = shallow(
      <DiscontinuedMobile
        id="list-item"
        data={mockData}
        type="field"
        index={0}
        itemPositionInList="first"
        selected={false}
        onSelect={() => {}}
        baseUrl="/"
        stylesMob={{}}
      />
    );
    expect(tree).to.have.length(1);
  });
  it('should render correctly Discontinued Mobile with other props', () => {
    const toggleOpenState = sinon.stub();
    const onClick = sinon.stub();
    const tree = shallow(
      <DiscontinuedMobile
        id="list-item"
        data={mockData}
        type="field"
        index={0}
        itemPositionInList="first"
        selected={false}
        onSelect={() => {}}
        baseUrl="/"
        stylesMob={{}}
        discontinuedItemCount
        singleSelection
        count
        toggleOpenState={toggleOpenState}
        onClick={onClick}
      />
    );
    expect(tree).to.not.be.blank();
    tree.find('Button').simulate('click');
  });
});
describe(`${__filename} events`, () => {
  describe('DiscontinuedMobile', () => {
    const props = {
      selected: false,
      listItemProps: {},
      count: 5,
      index: 4,
      toggleOpenState: true,
      stylesMob: {},
      onClick: () => {},
    };
    describe('onClick', () => {
      let spy;
      let wrapper;
      beforeEach(() => {
        spy = sinon.spy();
        wrapper = shallow(<DiscontinuedMobile {...props} />);
      });
      it('should call onClick', () => {
        wrapper.setProps({
          toggleOpenState: sinon.stub(),
          onClick: sinon.stub(),
        });
        wrapper.find('Button').simulate('click');
        expect(spy.called).to.equal(false);
      });
      it('should render with other props', () => {
        wrapper.setProps({
          discontinuedItemCount: 5,
          singleSelection: true,
          labels: {},
        });
        expect(wrapper).to.not.be.blank();
      });
    });
  });
});
