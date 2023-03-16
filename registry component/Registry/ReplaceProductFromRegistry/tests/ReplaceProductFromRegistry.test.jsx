import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReplaceProductFromRegistry from '../ReplaceProductFromRegistry';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  let props;

  beforeEach(() => {
    props = {
      atrWrapperClass: '',
      buttonProps: '',
      href: '',
      childern: 'label',
    };

    tree = shallow(
      <ReplaceProductFromRegistry {...props} replace intlUser={false} />
    );
  });

  afterEach(() => {
    tree = null;
  });

  it('should render the ReplaceProductFromRegistry for choose option', () => {
    const selectedProduct = { SKU_SCENE7_URL: '', DISPLAY_NAME: '' };
    const getReplacedItemData = sinon.stub();
    const replaceProductFromRegistry = sinon.stub();
    const track = sinon.stub();
    const discontinuedProductDetails = {
      eventType: '',
      qtyRemaining: '',
      registryId: '',
    };
    tree = shallow(
      <ReplaceProductFromRegistry
        {...props}
        replace={false}
        intlUser={false}
        selectedProduct={selectedProduct}
        getReplacedItemData={getReplacedItemData}
        discontinuedProductDetails={discontinuedProductDetails}
        replaceProductFromRegistry={replaceProductFromRegistry}
        track={track}
      />
    );
    tree
      .instance()
      .handleReplaceProductFromRegistry({ preventDefault: () => {} });
  });

  it('should render the ReplaceProductFromRegistry for international user with replace button', () => {
    tree = shallow(<ReplaceProductFromRegistry {...props} replace intlUser />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render the ReplaceProductFromRegistry for international user with choose button', () => {
    tree = shallow(
      <ReplaceProductFromRegistry {...props} replace={false} intlUser />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call onChooseOptionClick', () => {
    props.onQuickViewButtonClick = sinon.stub();
    tree.setProps({
      hideParent: sinon.stub(),
      onQuickViewButtonClick: sinon.stub(),
      selectedProduct: { SKU_SCENE7_URL: '', DISPLAY_NAME: '' },
    });
    const event = { preventDefault: sinon.stub() };
    tree.instance().onChooseOptionClick(event);
    expect(props.onQuickViewButtonClick.called);
  });

  describe('should call componentWilllRecieveProps based on conditions', () => {
    const toggleModalState = sinon.spy();
    const closeModalState = true;
    const sortDataByDate = sinon.spy();
    const variation = 'Date';

    it('should call componentwillRecieveProps for date', () => {
      const nextProps = {
        closeModalState: false,
        variation: 'Date',
        toggleModalState,
      };
      tree = shallow(
        <ReplaceProductFromRegistry
          {...props}
          closeModalState={closeModalState}
          sortDataByDate={sortDataByDate}
          variation={variation}
        />
      );
      tree.instance().componentWillReceiveProps(nextProps);
      expect(ReplaceProductFromRegistry.calledOnce).to.not.equal('');
    });

    it('should call ReplaceProductFromRegistry componentwillRecieveProps for priceView', () => {
      const nextProps = {
        closeModalState: false,
        variation: 'priceView',
        toggleModalState,
      };
      tree = shallow(
        <ReplaceProductFromRegistry
          {...props}
          closeModalState={closeModalState}
          sortDataByDate={sortDataByDate}
          variation={variation}
        />
      );
      tree.instance().componentWillReceiveProps(nextProps);
      expect(ReplaceProductFromRegistry.calledOnce).to.not.equal('');
    });

    it('should call ReplaceProductFromRegistry componentwillRecieveProps for Category', () => {
      const nextProps = {
        closeModalState: false,
        variation: 'Category',
        toggleModalState,
      };
      tree = shallow(
        <ReplaceProductFromRegistry
          {...props}
          closeModalState={closeModalState}
          sortDataByDate={sortDataByDate}
          variation={variation}
        />
      );
      tree.instance().componentWillReceiveProps(nextProps);
      expect(ReplaceProductFromRegistry.calledOnce).to.not.equal('');
    });
  });
});
