import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import RegistryIncentiveItem from '../RegistryIncentiveItem';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(
      <RegistryIncentiveItem incentiveInfo={{}} labels={{}} />
    );
    tree
      .find('ModalDialog')
      .props()
      .onModalClose();

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with logged in user', () => {
    const tree = shallow(
      <RegistryIncentiveItem incentiveInfo={{}} labels={{}} isLoggedIn />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with logged in user and incentives', () => {
    const incentiveInfo = {
      incentiveRedeemPdfURL: true,
      incentivePurchasedTotal: 89,
      incentiveCompletionTotal: 33,
      brandURL: true,
    };
    const tree = shallow(
      <RegistryIncentiveItem
        labels={{}}
        isLoggedIn
        incentiveInfo={incentiveInfo}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should simulate click', () => {
    const incentiveInfo = {
      incentivePurchasedTotal: 89,
      incentiveCompletionTotal: 91,
      brandURL: true,
      incentiveRedeemPrimayURL: '/test',
    };
    const tree = shallow(
      <RegistryIncentiveItem
        labels={{}}
        isLoggedIn
        incentiveInfo={incentiveInfo}
        pageName="RegistryOwnerHome"
      />
    );
    tree
      .find('Button')
      .at(0)
      .simulate('click');
    tree.instance().toggleModalState();
  });
});
