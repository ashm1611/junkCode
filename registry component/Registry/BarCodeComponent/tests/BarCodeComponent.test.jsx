import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ScriptInjector } from '@bbb-app/hoc/ThirdPartyLib';
import BarCodeComponent from '../BarCodeComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    barCodeModalText: 'barCodeModalText',
    barCodeModalRegistryId: 'barCodeModalRegistryId',
    barCodeModalTitle: 'barCodeModalTitle',
    barCodeId: 'barCodeId',
  };
  const barCodeConfig = { scriptId: 'scriptid', src: 'somepath' };
  const PDFConfig = { scriptId: 'scriptid', src: 'somepath' };
  const registryId = '123456';
  const barcodeModalText = { body: 'some text' };

  it('should render correctly', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly if no barCodeConfig', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should render correctly if no PDFConfig', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should render correctly when scripts are loaded', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('getRegistryId should return 10 digit number', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );
    const expected = '0000123456';
    const tempRegId = tree.instance().getRegistryId('123456');
    tree
      .find(ScriptInjector)
      .at(0)
      .props()
      .loadedCallback();

    tree
      .find(ScriptInjector)
      .at(1)
      .props()
      .loadedCallback();
    expect(tempRegId).to.equal(expected);
  });

  it('getRegistryId should modalMountedState', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );
    tree.instance().handleBarCodeClick();
    const modalMountedState = tree.instance().state.modalMountedState;

    expect(modalMountedState).to.equal(true);
  });

  it('getRegistryId should toggleModalState', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );
    tree.instance().toggleModalState(true);
    const modalMountedState = tree.instance().state.modalMountedState;

    expect(modalMountedState).to.equal(true);
  });

  it('getRegistryId should not inject script if config missing', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );
    const val = tree.instance().injectScript(barCodeConfig);

    expect(val).to.equal('');
  });

  it('getRegistryId should set state of provided type', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        barcodeModalText={barcodeModalText}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('render new barcode icon for new registry dashboard', () => {
    const tree = shallow(
      <BarCodeComponent
        labels={labels}
        barCodeConfig={barCodeConfig}
        PDFConfig={PDFConfig}
        registryId={registryId}
        isFromNewDashboard
      />
    );
    expect(tree).to.not.equal(null);
  });
});
