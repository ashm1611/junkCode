import React from 'react';
import toJson from 'enzyme-to-json';
import Checkbox from '@bbb-app/core-ui/checkbox/Checkbox';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ContributeModalComponent from '../ContributeModalComponent';
configure({ adapter: new Adapter() });
describe(__filename, () => {
  const dynamicData = {
    ggHeading: 'please confirm your contribution',
    CreateImg: {
      src: '//b3h2.scene7.com/is/image/BedBathandBeyond/gift?$contentFlat$',
    },
    ggSubcopy:
      'This helps the registrant keep track of gifts and send their thanks!',
    createSubHeading: 'test',
  };
  const handleCashFundsModal = sinon.spy();
  const getTree = () =>
    shallow(
      <ContributeModalComponent
        handleCashFundsModal={handleCashFundsModal}
        dynamicData={dynamicData}
        cashfundsModalState
        siteId={'BedBathUS'}
        activeRegistry={{
          registryType: {
            registryTypeName: 'OTH',
          },
        }}
        regCashFundEventTypes={{
          BBBYOTH: {},
        }}
      />
    );
  it('should render ContributeModalComponent component correctly', () => {
    const popupWindowStub = sinon.stub(window, 'open');
    const tree = getTree();
    tree
      .find(Checkbox)
      .at(0)
      .prop('onClick')();
    tree
      .find('Button')
      .at(0)
      .prop('onClick')();
    expect(toJson(tree)).to.matchSnapshot();
    popupWindowStub.restore();
  });
  it('should render ContributeModalComponent null for cashfundsModalState false', () => {
    const tree = shallow(
      <ContributeModalComponent
        handleCashFundsModal={handleCashFundsModal}
        dynamicData={dynamicData}
        cashfundsModalState={false}
        siteId={'BedBathUS'}
        activeRegistry={{
          registryType: {
            registryTypeName: 'OTH',
          },
        }}
        regCashFundEventTypes={{
          BBBYOTH: {},
        }}
      />
    );
    expect(tree).to.not.equal(null);
  });
});
