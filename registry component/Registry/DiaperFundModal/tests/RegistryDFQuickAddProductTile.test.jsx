import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryDFQuickAddProductTile from '../RegistryDFQuickAddProductTile';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    item: {
      DISPLAY_NAME: 'Diaper Fund',
      SEO_URL: '',
      IS_PRICE: 400,
      PRODUCT_ID: '123',
      SKU_ID: '123',
      SCENE7_URL: '',
    },
    labels: {
      createRegistry: {
        referredContent: [],
      },
    },
  };
  it('should render correctly', () => {
    const tree = shallow(<RegistryDFQuickAddProductTile {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with isItemAlreadyAddedToRegistry', () => {
    const tree = shallow(
      <RegistryDFQuickAddProductTile
        {...props}
        isItemAlreadyAddedToRegistry
        isInternationalUser
        isAddToRegistryFetching
        isAddingQuickAddItemToList
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly with isItemAlreadyAddedToRegistry else', () => {
    const tree = shallow(
      <RegistryDFQuickAddProductTile
        {...props}
        isItemAlreadyAddedToRegistry={false}
        isInternationalUser
        isAddToRegistryFetching
        isAddingQuickAddItemToList
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly with prodid null', () => {
    const newprops = {
      item: {
        DISPLAY_NAME: 'Diaper Fund',
        SEO_URL: '',
        IS_PRICE: 400,
        PRODUCT_ID: null,
        SKU_ID: '123',
        SCENE7_URL: '',
      },
      labels: {
        createRegistry: {
          referredContent: [],
        },
      },
    };
    const tree = shallow(<RegistryDFQuickAddProductTile {...newprops} />);
    expect(tree).to.not.equal(null);
  });
});
