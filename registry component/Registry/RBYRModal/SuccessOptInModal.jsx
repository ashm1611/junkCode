import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import {
  RBYR_TEALIUM,
  getRBYRTealiumData,
} from '@bbb-app/tbs/containers/RBYRTealium';
import { SUCCESS_MODAL_BTN_LBL, SUCCESS_MODAL_LBL } from './constants';
import styles from './SuccessOptInModal.css';

class SuccessOptInModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showSuccessModal: true,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showSuccessModal: !this.state.showSuccessModal,
    });
  }

  render() {
    const { isMobile } = this.props;
    const btnClass = isMobile ? 'fullWidth' : classnames(styles.continue);

    return (
      <ModalDialog
        mountedState={this.state.showSuccessModal}
        toggleModalState={this.toggleModal}
        titleAriaLabel="aria-label"
        verticallyCenter
        variation="small"
      >
        <ErrorBoundary>
          <TealiumHandler
            identifier={RBYR_TEALIUM.IDENTIFIER}
            tealiumPageInfoNotAvailable
            utagData={getRBYRTealiumData({
              page_name: RBYR_TEALIUM.OPT_IN_MODAL_CONFIRMATION,
              pagename_breadcrumb: RBYR_TEALIUM.OPT_IN_MODAL_CONFIRMATION,
            })}
          />
        </ErrorBoundary>
        <div>
          <div className={classnames(styles.featureStyle)}>
            <Paragraph theme="primary" className={classnames(styles.text)}>
              {SUCCESS_MODAL_LBL}
            </Paragraph>
          </div>
          <div className="center mt3">
            <Button
              theme={'primary'}
              className={btnClass}
              onClick={this.toggleModal}
              variation="noTransition"
            >
              {SUCCESS_MODAL_BTN_LBL}
            </Button>
          </div>
        </div>
      </ModalDialog>
    );
  }
}

SuccessOptInModal.propTypes = {
  isMobile: PropTypes.bool,
};

export default SuccessOptInModal;
