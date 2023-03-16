import React from 'react';
import { bool, object, string } from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Icon from '@bbb-app/core-ui/icon';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import { ScriptInjector } from '@bbb-app/hoc/ThirdPartyLib';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import generateBarcodeImage from '../../../../utils/generateBarCodeImage';
import {
  BAR_CODE_MODAL_REGISTRY_ID_LBL,
  BAR_CODE_ID_LBL,
  BAR_CODE_MODAL_TITLE_LBL,
} from '../constants';

import styles from './BarCodeComponent.css';
import '../../../../assets/icons/barcode.svg';

const propTypes = {
  registryId: string.isRequired,
  barCodeConfig: object.isRequired,
  PDFConfig: object.isRequired,
  barcodeModalText: object,
  isFromNewDashboard: bool,
};

const TextWithDangerousHTML = dangerousHTML(Paragraph);
class BarCodeComponent extends React.PureComponent {
  static barCodeScriptLoaded = false;
  static pdfScriptLoaded = false;
  constructor(props) {
    super(props);

    this.handleBarCodeClick = this.handleBarCodeClick.bind(this);
    this.scriptLoaded = this.scriptLoaded.bind(this);
    this.state = {
      modalMountedState: false,
    };
  }

  getRegistryId(registryId) {
    let id = registryId.toString();
    for (let count = 1; count <= 10; count += 1) {
      if (id.length === 10) {
        break;
      }
      id = `0${id}`;
    }
    return id;
  }

  handleBarCodeClick = () => {
    this.setState({ modalMountedState: true });
  };

  toggleModalState = state => {
    this.setState({ modalMountedState: state });
  };

  scriptLoaded(type) {
    BarCodeComponent[type] = true;
  }

  injectScript(barCodeConfig, PDFConfig) {
    /* istanbul ignore else */
    if (!barCodeConfig || !PDFConfig) {
      return '';
    }
    return (
      <React.Fragment>
        <ScriptInjector
          isAsync
          loadOnce
          isEnabled
          selector="head"
          scriptId={barCodeConfig.scriptId}
          src={barCodeConfig.src}
          loadedCallback={() => this.scriptLoaded('barCodeScriptLoaded')}
        />
        <ScriptInjector
          isAsync
          loadOnce
          isEnabled
          selector="head"
          scriptId={PDFConfig.scriptId}
          src={PDFConfig.src}
          loadedCallback={() => this.scriptLoaded('pdfScriptLoaded')}
        />
      </React.Fragment>
    );
  }

  renderBarCodeTextWithIcon() {
    return (
      <GridX
        className={classnames(
          'hideOnPrint center',
          styles.barcodeWrapper,
          'pt2',
          'pb2'
        )}
        data-locator="registry-barcode"
      >
        <PrimaryLink
          onClick={this.handleBarCodeClick}
          href="#"
          type="bold"
          iconProps={{
            type: 'barcode',
            width: '30px',
            height: '18px',
          }}
        >
          {BAR_CODE_ID_LBL}
        </PrimaryLink>
      </GridX>
    );
  }

  renderBarCodeIcon = () => (
    <div>
      <button className={styles.barcodeIcon} onClick={this.handleBarCodeClick}>
        <Icon type="barcode" height="20px" width="20px" />
      </button>
    </div>
  );

  /* istanbul ignore next */
  renderBarCodeModal(registryId) {
    const barCodeRegistryId = this.getRegistryId(registryId);
    return (
      <ModalDialog
        mountedState={this.state.modalMountedState}
        toggleModalState={this.toggleModalState}
        titleAriaLabel={BAR_CODE_MODAL_TITLE_LBL}
        variation="medium"
        closeIconShow
        scrollDisabled
        verticallyCenter
        closeDataLocator="registry-barcode-modalcloseicon"
        modalDataLocator="registry-barcode-modaloverlay"
      >
        <Heading
          data-locator={'registry-barCodeModal-heading'}
          level={2}
          className={classnames('mb1', styles.modalTitle)}
        >
          {BAR_CODE_MODAL_TITLE_LBL}
        </Heading>
        <div className="center mb1">
          <img
            className="mt2"
            alt="barcode"
            src={generateBarcodeImage(this.getRegistryId(registryId))}
            height="120px"
            width="300px"
          />
          <div className={classnames(styles.imageText, 'mt1')}>
            {LabelsUtil.replacePlaceholderValues(
              BAR_CODE_MODAL_REGISTRY_ID_LBL,
              [barCodeRegistryId]
            )}
          </div>
        </div>
        {this.props.barcodeModalText && (
          <TextWithDangerousHTML className={classnames(styles.modalText)}>
            {this.props.barcodeModalText.body}
          </TextWithDangerousHTML>
        )}
      </ModalDialog>
    );
  }

  render() {
    const { barCodeConfig, PDFConfig, isFromNewDashboard } = this.props;

    return (
      <ErrorBoundary>
        {barCodeConfig &&
          PDFConfig &&
          this.injectScript(barCodeConfig, PDFConfig)}
        {isFromNewDashboard
          ? this.renderBarCodeIcon()
          : this.renderBarCodeTextWithIcon()}
        {BarCodeComponent.barCodeScriptLoaded &&
          BarCodeComponent.pdfScriptLoaded &&
          this.renderBarCodeModal(this.props.registryId)}
      </ErrorBoundary>
    );
  }
}
BarCodeComponent.propTypes = propTypes;

export default BarCodeComponent;
