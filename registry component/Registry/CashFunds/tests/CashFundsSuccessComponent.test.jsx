import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CashFundsSuccessComponent from '../CashFundsSuccessComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    registryId: '123',
  };
  const handleCashFundsModalClose = sinon.spy();
  const redirectTo = sinon.spy();
  const handleViewFund = sinon.spy();
  const dynamicData = {
    SuccessHeading: 'your cash fund has been added to your registry!',
    SuccessImg: {
      src:
        '//b3h2.scene7.com/is/image/BedBathandBeyond/3Mask_group-20220825-062456?$contentFlat$',
    },
    SuccessSubcopy:
      'Log in to your registry and click the “My Items” tab to track your progress.',
  };

  const getTree = () =>
    shallow(
      <CashFundsSuccessComponent
        handleCashFundsModalClose={handleCashFundsModalClose}
        redirectTo={redirectTo}
        handleViewFund={handleViewFund}
        fireCashFundLoadTelium={sinon.spy()}
        fireTealiumAction={sinon.spy()}
        dynamicData={dynamicData}
        {...props}
      />
    );
  it('should render CashFundsSuccessComponent component correctly', () => {
    const tree = getTree();
    tree.find('Button').simulate('click');
    expect(toJson(tree)).to.matchSnapshot();
  });
});
