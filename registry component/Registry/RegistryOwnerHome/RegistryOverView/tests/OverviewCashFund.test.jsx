import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import OverviewCashFund from '../OverviewCashFund';
configure({ adapter: new Adapter() });
describe(__filename, () => {
  const statusBar = {
    view_type: 'StatusBar',
    tile: [
      {
        heading: 'cash funds',
        _metadata: {
          uid: 'cs4fc527ece2667e36',
        },
        subheading: 'Looks like no cash funds were added,',
        cta: {
          title: 'click here to add.',
          href: '#cashfund',
        },
      },
      {
        heading: 'guests',
        _metadata: {
          uid: 'cs7f671d05263c52e7',
        },
        subheading: 'Update the number of guests attending your wedding here.',
        cta: {
          title: 'Save Changes',
          href: '',
        },
      },
    ],
    _metadata: {
      uid: 'cse8b5d2c36d9076ea',
    },
  };

  it('should render correctly', () => {
    const tree = shallow(<OverviewCashFund statusBar={statusBar} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render when status bar is empty ', () => {
    const tree = shallow(<OverviewCashFund />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
