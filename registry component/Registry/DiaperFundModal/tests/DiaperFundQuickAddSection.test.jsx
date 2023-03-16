import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DiaperFundQuickAddSection from '../DiaperFundQuickAddSection';
import Skeleton from '../../RegistryOwner/RegistryQuickAddComponent/Skeleton/Skeleton';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let props = {
    isFetching: false,
    variation: 'Date',
    registryOwnerFirstCategoryList: [
      {
        diaperFundSKUs: ['69638537'],
        registryItemList: [
          {
            price: '29.99',
            formattedPrice: '$29.99',
            deletedItem: true,
            sKUDetailVO: {
              skuId: '68399443',
              displayName: 'SCRABBLE&reg;: World of Harry Potter',
            },
          },
          {
            price: '250.0',
            formattedPrice: '$250.00',
            sKUDetailVO: {
              skuId: '69638537',
              displayName: 'Diaper/Wipe Fund 4 Months',
            },
          },
        ],
      },
    ],
    diaperFundProducts: [
      {
        SKU_ID: '69638537',
        IS_PRICE: '$250.00',
        DISPLAY_NAME: 'Diaper/Wipe Fund 4 Months',
      },
    ],
  };

  let tree;

  before(() => {
    tree = shallow(<DiaperFundQuickAddSection {...props} />);
  });

  it('should render DiaperFundQuickAddSection component correctly', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render component for mobile correctly', () => {
    props = {
      ...props,
      isMobile: true,
    };
    tree = shallow(<DiaperFundQuickAddSection {...props} />);
    tree.setProps({
      variation: 'Date',
    });
    const result = tree.instance().shouldComponentUpdate({});
    expect(result).to.equal(false);
  });

  it('should render null if product api did not return any product', () => {
    tree.setProps({ diaperFundProducts: undefined });
    expect(tree.find('div')).to.have.lengthOf(0);
  });
  it('should render Skeleton if isFetching is true', () => {
    tree.setProps({ isFetching: true });
    expect(tree.find(Skeleton)).to.have.lengthOf(1);
  });
});
