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
    };
    const barCodeConfig = {};
    const PDFConfig = {};
    const tree = shallow(
      <GiftWrapper
        styles={styles}
        registryDetails={registryDetails}
        PDFConfig={PDFConfig}
        barCodeConfig={barCodeConfig}
        mPulseEnabled
        isRenderBookAnAppointment
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render Instrumentation when mPulseEnabled', () => {
    const registryDetails = {
      registryId: '123456',
      registryVO: { tnGiftsPurchased: 1 },
    };
    const barCodeConfig = {};
    const PDFConfig = {};
    const giftRegistered = '100';
    const tree = shallow(
      <GiftWrapper
        styles={{}}
        registryDetails={registryDetails}
        PDFConfig={PDFConfig}
        barCodeConfig={barCodeConfig}
        mPulseEnabled
        isRenderBookAnAppointment={false}
        giftRegistered={giftRegistered}
      />
    );
    expect(tree.find('Instrumentation')).to.have.lengthOf(1);
  });

  it('should render barcode on mobile', () => {
    const registryDetails = {
      registryId: '123456',
    };
    const barCodeConfig = {};
    const PDFConfig = {};
    const barcodeModalText = {};
    const tree = shallow(
      <GiftWrapper
        styles={{}}
        registryDetails={registryDetails}
        PDFConfig={PDFConfig}
        barCodeConfig={barCodeConfig}
        barcodeModalText={barcodeModalText}
        isMobile
        isBarcodeEnabled
      />
    );
    expect(tree.find('BarCodeComponent')).to.have.lengthOf(1);
  });
});
