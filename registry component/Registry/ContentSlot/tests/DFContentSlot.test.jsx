import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import * as RegistryPubSub from '@bbb-app/utils/pubsub';
import DFContentSlot from '../DFContentSlot';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    barCodeModalText: 'barCodeModalText',
    barCodeModalRegistryId: 'barCodeModalRegistryId',
    barCodeModalTitle: 'barCodeModalTitle',
    barCodeId: 'barCodeId',
  };
  const styleVariation = 'oos';
  const eventType = 'Baby';

  it('should render correctly', () => {
    const siteId = 'BuyBuyBaby' || 'TBS_BuyBuyBaby';
    const tree = shallow(
      <DFContentSlot
        labels={labels}
        siteId={siteId}
        styleVariation={styleVariation}
        eventType={eventType}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly in case of registrant', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(800);
    const tree = shallow(
      <DFContentSlot
        labels={labels}
        styleVariation={styleVariation}
        eventType={eventType}
      />
    );
    windowObj.restore();
    expect(tree).to.not.equal(null);
    const pubSubStub = sinon.stub(RegistryPubSub, 'publish');

    tree
      .find('Button')
      .at(0)
      .simulate('click');

    tree
      .find('Button')
      .at(0)
      .simulate('click', { preventDefault: () => {} });

    pubSubStub.restore();
    expect(pubSubStub.called).to.be.equal(true);
  });
  it('should render correctly in case of mobile', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(400);
    const tree = shallow(
      <DFContentSlot
        labels={labels}
        styleVariation={styleVariation}
        eventType={eventType}
      />
    );
    expect(tree).to.not.equal(null);

    tree.setProps({ siteId: 'BuyBuyBaby' });
    expect(tree).to.not.equal(null);

    windowObj.restore();
  });
});
