import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import ProductTileLTLDetail from '../ProductTileLTLDetail';

configure({ adapter: new Adapter() });

const labels = {
  itemsUnavailableOnlineHeading: 'Registry Items Unavailable Online',
  requestedLabel: 'Requested:',
  neededLabels: 'Needed:',
  qtyLabel: 'Qty',
  addToCartCTALabel: 'Add to Cart',
  findInStoreLabel: 'Find in Store',
  favouriteRegistryLabel: "{0} & {1}'s Favourite",
  purchasedLabel: 'Purchased',
  alreadyPurchasedLabel: 'Already Purchased',
  quickViewLabel: 'Quickview',
  limitedAvailabilityLabel: 'Limited Availability',
  additionalFeeLabel: '{0} Applied: {1}',
  noAdditionalFeeLabel: 'Inc. {0}',
  ltlPOBoxRegistryLabel: ' LTL items cannot be shipped to a PO Box.',
  ltlDSLNoLongerOfferedLabel: 'Selected service level no longer offered',
  additionalServiceLabel: 'Additional Delivery Charges Might Apply',
  itemPriceLabel: 'Item Price {0}',
};

const activeRegistry = { activeRegistryHasPoBoxAddress: true };
const isPOBoxAddress = 'true';

describe(__filename, () => {
  it('Should render LTL info : free', () => {
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        ltlDeliveryServices={'LW'}
        totalDeliveryCharges={0}
        ltlShipMethodDesc={'White Glove Delivery'}
        shipMethodUnsupported
        activeRegistry={activeRegistry}
        formattedTotalDeliveryCharges={'$0'}
        formattedPrice={'$20'}
        isPOBoxAddress={isPOBoxAddress}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('Should render LTL info : Delivery charges applied', () => {
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        ltlDeliveryServices={'LW'}
        totalDeliveryCharges={100}
        ltlShipMethodDesc={'White Glove Delivery'}
        shipMethodUnsupported
        activeRegistry={activeRegistry}
        formattedTotalDeliveryCharges={'$100'}
        formattedPrice={'$20'}
        isPOBoxAddress={isPOBoxAddress}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('Should render LTL info : No active registry and POBox address', () => {
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        ltlDeliveryServices={'LW'}
        totalDeliveryCharges={100}
        ltlShipMethodDesc={'White Glove Delivery'}
        shipMethodUnsupported
        formattedTotalDeliveryCharges={'$100'}
        formattedPrice={'$20'}
        isPOBoxAddress={'false'}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('Should render LTL info : Additional fees might apply', () => {
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        totalDeliveryCharges={100}
        ltlShipMethodDesc={'White Glove Delivery'}
        shipMethodUnsupported
        formattedTotalDeliveryCharges={'$100'}
        formattedPrice={'$20'}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('Should render LTL info : Additional fees might apply 2', () => {
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        totalDeliveryCharges={100}
        ltlDeliveryServices={'LW'}
        ltlShipMethodDesc={'White Glove Delivery'}
        formattedTotalDeliveryCharges={'$100'}
        activeRegistry={activeRegistry}
        formattedPrice={'$20'}
        isPOBoxAddress={'false'}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('Should render LTL info : when no delivery charges', () => {
    const sKUDetailVO = {};
    const tree = shallow(
      <ProductTileLTLDetail
        labels={labels}
        ltlDeliveryServices={'LW'}
        ltlShipMethodDesc={'White Glove Delivery'}
        activeRegistry={activeRegistry}
        formattedPrice={'$20'}
        isPOBoxAddress={'false'}
        refNum
        sKUDetailVO={sKUDetailVO}
      />
    );
    expect(tree).to.not.equal(null);
  });
});
