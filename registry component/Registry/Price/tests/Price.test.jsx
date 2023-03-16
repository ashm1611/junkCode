import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as utils from '@bbb-app/utils/RegistryUtils';
import Price from '../Price';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    includingDeliveryLabel: '(Inc. delivery)',
  };
  it('should render correctly', () => {
    const tree = shallow(
      <Price
        itemPrice={'$10'}
        totalPrice={'$15'}
        personalizedPrice={'$10'}
        ltlFlag
        refNum={1234}
        personalizationType={'N'}
        personalisedCode={null}
        labels={labels}
        displayDiscountedPrice
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render ltl price inclusive deliver correctly', () => {
    const tree = shallow(
      <Price
        itemPrice={'$10'}
        totalPrice={'$15'}
        personalizedPrice={'$10'}
        ltlFlag={false}
        refNum={1234}
        personalizationType={'N'}
        personalisedCode={null}
        labels={labels}
        registryView
        totalDeliveryCharges={20}
        enableNewRegDashboard
        displayDiscountedPrice
      />
    );

    expect(tree).to.not.equal(null);
  });
  it('should render correctly with other props', () => {
    const personalizationApplicableStub = sinon
      .stub(utils, 'personalizationApplicable')
      .returns(true);
    const tree = shallow(
      <Price
        itemPrice={'$10'}
        totalPrice={'$15'}
        personalizedPrice={'$10'}
        ltlFlag={false}
        refNum={1234}
        personalizationType={'N'}
        personalisedCode={null}
        labels={labels}
        registryView
        inCart
        displayDiscountedPrice
        ltlDeliveryServices={'test'}
      />
    );

    expect(tree).to.have.lengthOf(1);
    personalizationApplicableStub.restore();
  });
});
