import React from 'react';
import PropTypes from 'prop-types';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import { getCookie } from '@bbb-app/utils/universalCookie';
import InactivityModalComponent from '@bbb-app/registry-inactivity-modal/components/InactivityModal';

let timerInstance;

const DEFAULT_VALUE = {
  defaultInactivityModalTimeout: 19 * 60 * 1000,
};

class InactivityModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleInactivityFunctionality = this.handleInactivityFunctionality.bind(
      this
    );
    this.state = {
      inactivityModalState: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const ref = this.props;
    /* istanbul ignore else  */
    if (ref.inactivityModalReset && !this.props.recognizedFlag) {
      this.startTimeOut();
      ref.initiateInactivityModal(false);
    }
    /* istanbul ignore else  */
    if (
      this.props.activeRegistryCallFlag === true &&
      this.props.activeRegistryCallFlag !== nextProps.activeRegistryCallFlag
    ) {
      this.handelModalInactivity();
    }
  }

  /* istanbul ignore next  */
  handleInactivityFunctionality() {
    window.location.reload(true);
  }

  handelModalInactivity() {
    const ref = this.props;

    if (getCookie('securityStatus') === '4') {
      this.startTimeOut();
    } else if (getCookie('securityStatus') === '2') {
      if (this.props.location.pathname.indexOf('tym') > 0) {
        ref.closeOtherOpenModaOnInactiveModal(true);
        ref.handleThankYouList();
      } else if (ref.isEditModalOpen) {
        ref.closeOtherOpenModaOnInactiveModal(true);
        ref.getEditRegistryData();
      }
    }
    this.closeInactivityModal();
  }
  /*
   * This method calls  starts the clears timeOut and then sets timeout .
   */

  startTimeOut() {
    /* istanbul ignore next  */
    if (timerInstance) {
      clearTimeout(timerInstance);
    }

    /* istanbul ignore next  */
    timerInstance = setTimeoutCustom(() => {
      this.openInactivityModal();
    }, DEFAULT_VALUE.defaultInactivityModalTimeout);
  }

  /*
   * This method opens the inactivity modal .
   */

  openInactivityModal() {
    this.setState({
      inactivityModalState: true,
    });
  }

  /*
   * This method close the inactivity modal .
   */
  closeInactivityModal() {
    this.setState({
      inactivityModalState: false,
    });
  }

  render() {
    return (
      this.state.inactivityModalState && (
        <InactivityModalComponent
          inactivityModalState={this.state.inactivityModalState}
          handleInactivityFunctionality={this.handleInactivityFunctionality}
          closeIconShow={false}
          {...this.props}
        />
      )
    );
  }
  /*
   * This method render inactivity modal content .
   */
}
const propTypes = {
  activeRegistryCallFlag: PropTypes.bool,
  recognizedFlag: PropTypes.bool,
  location: PropTypes.object,
};
InactivityModal.propTypes = propTypes;
export default InactivityModal;
