import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import GiftWrapper from '../GiftWrapper';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const styles = {
      giftWrapper: '',
      giftRegistered: '',
      giftsNumber: '',
      giftsLabel: '',
      analyzeWrapper: '',
      tnGiftsPurchased: '',
    };
    const registryDetails = {
      registryId: '123456',
      tnGiftsPurchased: 1,
    };
    const tree = shallow(
      <GiftWrapper
        styles={styles}
        registryDetails={registryDetails}
        mPulseEnabled
        isInternationalUser
        isRenderBookAnAppointment
        paramEnableLoyalty
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render Instrumentation when mPulseEnabled', () => {
    const styles = {
      giftWrapper: '',
      giftRegistered: '',
      giftsNumber: '',
      giftsLabel: '',
      analyzeWrapper: '',
      tnGiftsPurchased: '',
    };
    const registryDetails = {
      registryId: '123456',
    };
    const tree = shallow(
      <GiftWrapper
        styles={styles}
        giftGiver
        registryDetails={registryDetails}
        mPulseEnabled
        isMobile
        isInternationalUser
        paramEnableLoyalty={false}
      />
    );
    expect(tree.find('Instrumentation')).to.have.lengthOf(2);
  });

  it('should render correctly for mobile', () => {
    const styles = {
      giftWrapper: '',
      giftRegistered: '',
      giftsNumber: '',
      giftsLabel: '',
      analyzeWrapper: '',
      tnGiftsPurchased: '',
    };
    const registryDetails = {
      registryId: '123456',
    };
    const tree = shallow(
      <GiftWrapper
        styles={styles}
        giftGiver={false}
        registryDetails={registryDetails}
        isMobile
        isInternationalUser
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
