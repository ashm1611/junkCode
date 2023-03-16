import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import RegistryDashboardRecommendation from '../RegistryDashboardRecommendation';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let labels;

  beforeEach(() => {
    labels = {
      noOfItems: '30',
      topRegistryItems: 'Top Registry Items',
    };
  });
  it('should render correctly', () => {
    const content = [
      {
        PRODUCT_ID: '3300744',
        SITE_ID: ['BedBathUS'],
        DISPLAY_NAME:
          'Butterie&trade; Flip-Top Butter Dish with Spreader in Red',
        PRICE_RANGE_DESCRIP: '$%L Each',
        INTL_RESTRICTED: 'false',
        SCENE7_URL: '93611546424396p',
        SEO_URL:
          '/product/butterie-trade-flip-top-butter-dish-with-spreader/3300744?skuId=46424396',
        RATINGS: 4.7,
        REVIEWS: 312.0,
        INCART_FLAG: 'false',
        PRODUCT_LTL_FLAG: 'false',
        PRIMARY_CATEGORY: '12619',
        SKU_ID: [
          '46424402',
          '60473141',
          '60473134',
          '46424389',
          '46424396',
          '46424372',
        ],
        CUSTOMIZATION_OFFERED_FLAG: 'false',
        LTL_FLAG: 'false',
        PRODUCT_VARIATION: 'NORMAL',
        IS_PRICE: '$12.99',
        TYPE: 'MSWP',
        RANK: 'ct',
      },
    ];
    const certonaConfig = {
      scheme: { ATC_Recommendation: 'ATC_Recommendation' },
    };
    const props = {
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
    };
    const tree = shallow(
      <RegistryDashboardRecommendation
        labels={labels}
        content={content}
        certonaConfig={certonaConfig}
        {...props}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should not render when data is null', () => {
    const content = null;
    const tree = shallow(
      <RegistryDashboardRecommendation labels={labels} content={content} />
    );

    expect(tree.find('section')).to.have.length(0);
  });
  it('componentWillReceiveProps should set isAddingQuickAddItemToList true when quickItemAddedTS changed', () => {
    const quickItemAddedTS = 1579189674;
    const tree = shallow(
      <RegistryDashboardRecommendation
        labels={labels}
        quickItemAddedTS={quickItemAddedTS}
      />
    );
    const nextProps = { quickItemAddedTS: 1579189675 };
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree.instance().state.isAddingQuickAddItemToList).to.equal(true);
  });
  it('componentWillReceiveProps should set isAddToRegistryFetching true when isAddToRegistryFetching changed', () => {
    const isAddToRegistryFetching = false;
    const tree = shallow(
      <RegistryDashboardRecommendation
        labels={labels}
        isAddToRegistryFetching={isAddToRegistryFetching}
      />
    );
    const nextProps = { isAddToRegistryFetching: true };
    tree.instance().componentWillReceiveProps(nextProps);
    expect(tree.instance().state.isAddingQuickAddItemToList).to.equal(true);
  });
  it('shouldComponentUpdate should return true with Category', () => {
    const variation = 'priceView';
    const nextProps = {
      variation: 'Category',

      registryOwnerFirstCategoryList: [
        { sku: 123 },
        { sku: 124 },
        { sku: 125 },
      ],
    };
    const tree = shallow(
      <RegistryDashboardRecommendation labels={labels} variation={variation} />
    );
    expect(tree.instance().shouldComponentUpdate(nextProps)).to.equals(true);
  });
  it('shouldComponentUpdate should return true with Date', () => {
    const nextProps = {
      variation: 'Date',
    };
    const tree = shallow(<RegistryDashboardRecommendation labels={labels} />);
    expect(tree.instance().shouldComponentUpdate(nextProps)).to.equals(true);
  });
});
