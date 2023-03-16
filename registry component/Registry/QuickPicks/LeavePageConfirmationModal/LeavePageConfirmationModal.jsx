import React, { Fragment, PureComponent } from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import { noop } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from './LeavePageConfirmationModal.css';
import {
  BTN_LEAVE_PAGE_LBL,
  BTN_STAY_ON_PAGE_LBL,
  LEAVE_PAGE_ARIA_TITLE_LBL,
  LEAVE_PAGE_CONF_MSG_LBL,
  BTN_LEAVE_PAGE_MOB_LBL,
} from '../Collection/constants';
/**
 * @class
 * Renders a Leave Page Confirmation modal
 */
class LeavePageConfirmationModal extends PureComponent {
  onModalClose = () => {
    this.onStayOnPage(false);
  };
  onStayOnPage = () => {
    this.props.onLeavePageSelected(false);
  };
  onLeavePage = () => {
    this.props.onLeavePageSelected(true);
  };
  renderButtonPanel = () => {
    return (
      <Fragment>
        <Button
          variation="primary"
          className={classnames(styles.button, styles.buttonStayPage)}
          onClick={this.onStayOnPage}
        >
          {BTN_STAY_ON_PAGE_LBL}
        </Button>
        <Button
          variation="secondary"
          className={classnames(styles.button, styles.buttonLeavePage)}
          onClick={this.onLeavePage}
        >
          {this.props.channelType === 'MobileWeb'
            ? BTN_LEAVE_PAGE_MOB_LBL
            : BTN_LEAVE_PAGE_LBL}
        </Button>
      </Fragment>
    );
  };
  render = () => {
    return (
      <ModalDialog
        scrollDisabled
        verticallyCenter
        mountedState={this.props.show}
        variation="small"
        toggleModalState={this.props.onShowChanged}
        titleAriaLabel={LEAVE_PAGE_ARIA_TITLE_LBL}
        onModalClose={this.onModalClose}
        underlayStyle={{ zIndex: 10100 }}
      >
        <section className={styles.base}>
          <div className={styles.leavePageConfirmationMessage}>
            {LEAVE_PAGE_CONF_MSG_LBL}
          </div>
          <div className={styles.buttonPanel}>{this.renderButtonPanel()}</div>
        </section>
      </ModalDialog>
    );
  };
}
/**
 * @param {func} onLeavePageSelected Callback for when a user leaves a
 * @param {bool} show Used to display or hide the modal
 * @param {Object} labels
 * @param {func} onShowChanged Callback for when the show prop is changed.
 */
LeavePageConfirmationModal.propTypes = {
  onLeavePageSelected: func.isRequired,
  show: bool.isRequired,
  channelType: string,
  onShowChanged: func,
};
LeavePageConfirmationModal.defaultProps = {
  labels: {},
  onShowChanged: noop,
  channelType: 'MobileWeb',
};

export default LeavePageConfirmationModal;
