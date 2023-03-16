import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as windowWidth from '@bbb-app/utils/viewPortUtils';
import { noop } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import DFOptInModal from '../DFOptInModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const handleOptInClick = sinon.stub();
  const handleOptInButton = sinon.spy();
  const labels = {
    RegistryOwner: {
      disclaimertxt: 'Disclamir',
      paragraphTextdesc: 'Paragraph',
      paragraphTextTitle: 'Title',
      groupGiftOptInBtn: 'GroupGifting',
      referredContent: [
        { key: '123', id: '123' },
        { key: 'diaperFundModalDescription', id: '123' },
      ],
    },
  };
  const referredContentData = {
    body: '<div>&lt;p&gt;hello world&lt;/p&gt;</div>',
  };
  const diaperFundProducts = [{}, {}, {}];
  const props = {
    referredContentData,
    diaperFundProducts,
    labels,
    handleOptInClick,
    handleOptInButton,
  };

  it('should render correctly', () => {
    const tree = shallow(<DFOptInModal {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('on click call handleOptInClick', () => {
    const tree = shallow(<DFOptInModal {...props} />);
    tree
      .find(Button)
      .first()
      .simulate('click', { preventDefault: noop, props });
    expect(handleOptInClick.called);
  });
  it('should render getWindowInnerWidth true', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(400);
    const tree = shallow(<DFOptInModal {...props} />);
    windowObj.restore();
    expect(tree).to.not.equal(null);
  });
  it('should render getWindowInnerWidth false ', () => {
    const windowObj = sinon
      .stub(windowWidth, 'getWindowInnerWidth')
      .returns(800);
    const tree = shallow(<DFOptInModal {...props} />);
    windowObj.restore();
    expect(tree).to.not.equal(null);
  });
});
