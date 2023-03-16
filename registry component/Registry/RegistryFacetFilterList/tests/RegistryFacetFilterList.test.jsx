import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { isMobileDevice } from '@bbb-app/utils/common';
import Checkbox from '@bbb-app/core-ui/checkbox';
import { getFacetDataByID } from '@bbb-app/utils/filterUtils';
import { RegistryFacetFilterList } from '../RegistryFacetFilterList';
import KEY from '../../../../../constants/keyEvents';

configure({ adapter: new Adapter() });
const getItemsObject = () => {
  return [
    {
      displayName: 'Status',
      id: 'status',
      items: [
        {
          id: 'GiftsWanted',
          key: 'GiftsWanted',
          label: 'Gifts Wanted',
          SKU_ID: ['63364576'],
        },
        {
          id: 'GiftsPurchased',
          key: 'GiftsPurchased',
          label: 'Gifts PurchasedN',
          SKU_ID: ['62238991', '65493120'],
        },
      ],
    },
    {
      displayName: 'Sort : Price: Low to High',
      id: 'sort',
      items: [
        {
          id: 'Recommended',
          key: 'Recommended',
          label: 'Recommended',
          type: 'single',
          SKU_ID: ['63364576'],
        },
        {
          id: 'PriceHightoLow',
          key: 'PriceHightoLow',
          label: 'Price: High to Low',
          type: 'single',
          SKU_ID: ['63364576'],
        },
        {
          id: 'PriceLowtoHigh',
          key: 'PriceLowtoHigh',
          label: 'Price: Low to High',
          type: 'single',
          SKU_ID: ['13612200'],
        },
      ],
    },
  ];
};
const facets = getItemsObject();
const items = getFacetDataByID(facets[0].id, facets[0]);
describe(__filename, () => {
  let tree;
  const facet = facets[0];
  const getTree = props =>
    mount(
      <RegistryFacetFilterList
        id={facet.id}
        label={facet.displayName}
        facetsData={items}
        data={items}
        key={`facet-${0}-${facet.id}`}
        type={'field'}
        onSelectionUpdate={() => {}}
        selectedItems={['Modern', 'Traditional', 'Contemporary']}
        isOwnerView
        {...props}
      />
    );
  before(() => {
    sinon.stub(Checkbox, 'incrementInstanceCounter').returns(0);
  });
  after(() => {
    Checkbox.incrementInstanceCounter.restore();
  });
  describe('Lifecycle methods', () => {
    it('should call componentDidMount method with filtersWrapper element', () => {
      const elem = document.createElement('div');
      elem.classList.add('filtersViewport');
      const elem2 = document.createElement('div');
      elem2.classList.add('filtersWrapper');
      elem.appendChild(elem2);
      document.body.appendChild(elem);
      const props = { collapseDropdown: true };
      const wrapper = getTree(props);
      const spy = sinon.spy(wrapper.instance(), 'closeDropDownOnBody');
      wrapper.instance().componentDidMount();
      expect(spy.called);
    });
    it('should call componentDidMount and method with no filtersWrapper element', () => {
      const elem = document.getElementsByClassName('filtersWrapper')[0];
      elem.remove();
      const props = { collapseDropdown: true };
      const wrapper = getTree(props);
      const spy = sinon.spy(wrapper.instance(), 'closeDropDownOnBody');
      wrapper.instance().componentDidMount();
      expect(spy.called).to.equal(false);
    });

    it('should call componentWillUnmount method with filtersWrapper element', () => {
      const elem = document.createElement('div');
      elem.classList.add('filtersViewport');
      const elem2 = document.createElement('div');
      elem2.classList.add('filtersWrapper');
      elem.appendChild(elem2);
      document.body.appendChild(elem);
      const spy = sinon.spy();
      tree = getTree();
      tree.instance().filterListContainer = { removeEventListener: spy };
      tree.instance().componentWillUnmount();
      expect(spy.called).to.equal(true);
    });
    it('should call componentWillUnmount method with filtersWrapper element', () => {
      const elem = document.getElementsByClassName('filtersWrapper')[0];
      elem.remove();
      const spy = sinon.spy();
      tree = getTree();
      tree.instance().filterListContainer = { removeEventListener: spy };
      tree.instance().componentWillUnmount();
      expect(spy.called).to.equal(true);
    });
    it('should call disableTabbingIfNotVisible method', () => {
      const wrapper = getTree();
      const elem = document.createElement('div');
      const elem2 = document.createElement('div');
      const elem3 = wrapper.instance().filterListContainer;
      elem2.appendChild(elem3);
      elem.appendChild(elem2);
      document.body.appendChild(elem);
      const spy = sinon.spy(wrapper.instance(), 'disableTabbingIfNotVisible');
      wrapper.instance().componentDidUpdate();
      expect(spy.called);
    });
  });
  describe('methods test cases', () => {
    const getFilterList = () => {
      const mountedElement = document.createElement('div');
      document.body.appendChild(mountedElement);
      return mount(
        <RegistryFacetFilterList
          id={facet.id}
          label={facet.displayName}
          data={facet.items}
          facetsData={items}
          key={`facet-${0}-${facet.id}`}
          type={facet.type}
          onSelectionUpdate={() => {}}
          selectedItems={['Modern', 'Traditional', 'Contemporary']}
          searchable
        />,
        { attachedTo: mountedElement }
      );
    };

    it('should handle key down events when drop down is open', () => {
      const mountedElement = document.createElement('div');
      document.body.appendChild(mountedElement);
      let localMount = getFilterList();
      const spy = sinon.spy(localMount.instance(), 'openDropdown');
      localMount.setState({ dropdownIsOpen: true });
      localMount = localMount.update();
      const preventDefault = sinon.stub();
      const event = {
        keyCode: KEY.KEY_DOWN,
        preventDefault,
      };
      localMount.instance().handleKeyDown(event);
      expect(spy.called).to.equal(false);
    });

    it('should handle key down events when drop down is collapsed', () => {
      const localMount = getFilterList();
      const preventDefault = sinon.stub();
      localMount.setState({ dropdownIsOpen: false });
      const event = {
        keyCode: KEY.KEY_DOWN,
        preventDefault,
        currentTarget: localMount.getDOMNode().querySelector('button'),
      };
      localMount.instance().handleKeyDown(event);
      expect(localMount.state().dropdownIsOpen).to.equal(true);
    });
    it('should close when any other key is pressed', () => {
      let localMount = getFilterList();
      localMount.setProps({ dropdownIsOpen: true });
      localMount = localMount.update();
      const preventDefault = sinon.stub();
      const event = {
        preventDefault,
        currentTarget: localMount.getDOMNode().querySelector('button'),
      };
      localMount.instance().handleKeyDown(event);
      expect(localMount.state().dropdownIsOpen).to.equal(false);
    });
    it('should close when escape key is pressed', () => {
      let localMount = getFilterList();
      localMount = localMount.update();
      const preventDefault = sinon.stub();
      const event = {
        keyCode: KEY.KEY_ESCAPE,
        preventDefault,
        currentTarget: localMount.getDOMNode().querySelector('button'),
      };
      localMount.instance().handleKeyDown(event);
      expect(localMount.state().dropdownIsOpen).to.equal(false);
    });
    it('should call toggleDropDown method for dropdownIsOpen as true ', () => {
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: true });
      const preventDefault = sinon.stub();
      const event = {
        keyCode: KEY.KEY_ESCAPE,
        preventDefault,
        currentTarget: wrapper.getDOMNode().querySelector('button'),
      };
      wrapper.instance().toggleDropDown(event);
      const spy = sinon.spy(tree.instance(), 'closeDropDown');
      expect(spy.called);
    });
    it('should call toggleDropDown method for dropdownIsOpen false ', () => {
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: false });
      const preventDefault = sinon.stub();
      const event = {
        keyCode: KEY.KEY_ESCAPE,
        preventDefault,
        currentTarget: wrapper.getDOMNode().querySelector('button'),
      };
      wrapper.instance().toggleDropDown(event);
      const spy = sinon.spy(tree.instance(), 'openDropdown');
      expect(spy.called);
    });
    it('should call handleInputsArrowEvent method for dropdownIsOpen false ', () => {
      const wrapper = getFilterList();
      const preventDefault = sinon.stub();
      const event = {
        keyCode: KEY.KEY_ESCAPE,
        preventDefault,
        currentTarget: wrapper.getDOMNode().querySelector('button'),
      };
      wrapper.instance().handleInputsArrowEvent(event);
      const spy = sinon.spy(wrapper.instance(), 'closeDropDownWithLocalState');
      expect(spy.called);
    });
    it('#closeDropDown should set dropdownIsOpen to false', () => {
      const wrapper = getFilterList();
      wrapper.instance().removeMobileModal = sinon.spy();
      wrapper.setState({
        modalSelectionView: true,
      });
      wrapper.setProps({
        handleMultipleSelection: () => {},
      });
      wrapper.instance().closeDropDown();
      expect(wrapper.instance().props.handleMultipleSelection.called);
    });
    it('#handleFocusOutEvent should set dropdownIsOpen state to false', () => {
      const wrapper = getFilterList();
      const mountedElement = document.createElement('div');
      document.body.appendChild(mountedElement);
      document.body.classList.add('modalSelectionOpened');
      wrapper.setState({
        dropdownIsOpen: true,
      });
      wrapper.instance().handleFocusOutEvent({
        relatedTarget: mountedElement,
      });
      const spy = sinon.spy(wrapper.instance(), 'closeDropDownWithLocalState');
      expect(spy.called);
    });

    it('should call closeDropDownOnbody method with dropdownIsOpen as true', () => {
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: true });
      wrapper.instance().closeDropDownOnbody();
      expect(wrapper.instance().state.dropdownIsOpen).to.equal(false);
    });
    it('should call closeDropdownWhenUserScrollHandle with dropdownIsOpen as true ', () => {
      const clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
      sinon.stub(isMobileDevice, 'any').returns(false);
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: true });
      wrapper.instance().delayCloseDD = 'abc';
      wrapper.instance().closeDropdownWhenUserScrollHandle();
      isMobileDevice.any.restore();
      clearTimeoutSpy.restore();
      expect(clearTimeoutSpy.called);
    });
    it('should call closeDropdownWhenUserScrollHandle with delayCloseDD as undefined ', () => {
      const clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
      sinon.stub(isMobileDevice, 'any').returns(false);
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: true });
      wrapper.instance().delayCloseDD = undefined;
      wrapper.instance().closeDropdownWhenUserScrollHandle();
      isMobileDevice.any.restore();
      clearTimeoutSpy.restore();
      expect(clearTimeoutSpy.called).to.equal(false);
    });
    it('should call closeDropdownWhenUserScrollHandle with dropdownIsOpen as false ', () => {
      const clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
      sinon.stub(isMobileDevice, 'any').returns(false);
      const wrapper = getFilterList();
      wrapper.setState({ dropdownIsOpen: false });
      wrapper.instance().closeDropdownWhenUserScrollHandle();
      isMobileDevice.any.restore();
      clearTimeoutSpy.restore();
      expect(clearTimeoutSpy.called).to.equal(false);
    });

    it('should update snapshot with selectedItems empty  ', () => {
      const getFilterLists = () => {
        const mountedElement = document.createElement('div');
        document.body.appendChild(mountedElement);
        return mount(
          <RegistryFacetFilterList
            id="sort"
            onSelectionUpdate={() => {}}
            selectedItems={''}
            searchable
            facetsData={items}
          />,
          { attachedTo: mountedElement }
        );
      };
      const treeWrapper = getFilterLists();
      treeWrapper.setState({ dropdownIsOpen: true });
      expect(toJson(treeWrapper)).to.matchSnapshot();
    });
  });
});
