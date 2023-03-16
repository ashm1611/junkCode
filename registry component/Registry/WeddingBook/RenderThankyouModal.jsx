import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Icon from '@bbb-app/core-ui/icon/Icon';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from '../ThankyouModal/ThankyouModal.css';
import {
  THANK_YOU_MESSAGE_LBL,
  THANK_YOU_MODAL_MESSAGE_LBL,
  CANCEL_LBL,
} from './constants';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  mountedState: PropTypes.bool,
  toggleModalState: PropTypes.func,
  onCancel: PropTypes.onCancel,
};

const RenderThankyouModal = ({ mountedState, toggleModalState, onCancel }) => {
  return (
    <ErrorBoundary>
      <ModalDialog
        mountedState={mountedState}
        toggleModalState={toggleModalState}
        onModalDidClose={onCancel}
        titleAriaLabel={THANK_YOU_MESSAGE_LBL}
        variation={'medium'}
        closeIconShow
        scrollDisabled
        verticallyCenter
        underlayClickExits={false}
        customCloseIcon={<Icon height="16px" width="16px" type="close-icon" />}
        initialFocus=".rclCloseBtnWrapper"
      >
        <div>
          <h2 className={classnames(styles.heading, 'mb2')}>
            {THANK_YOU_MESSAGE_LBL}
          </h2>
          <p className={classnames(styles.description, 'mb2')}>
            {THANK_YOU_MODAL_MESSAGE_LBL}
          </p>
          <Button
            onClick={() => {
              toggleModalState(false);
            }}
            theme="primary"
            className={'mb2 mr1 sm-mr0 large-5 small-12'}
            data-locator="thankyoumodal-cancel"
          >
            {CANCEL_LBL}
          </Button>
        </div>
      </ModalDialog>
    </ErrorBoundary>
  );
};
RenderThankyouModal.propTypes = propTypes;
export default RenderThankyouModal;
