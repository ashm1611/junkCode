import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { ALT_PHONE_NUM_MODAL_ARIA_TITLE_LBL } from '@bbb-app/constants/registryConstants';
import styles from './ThankyouModal.css';
import {
  THANK_YOU_MESSAGE_LBL,
  THANK_YOU_PARA_LBL,
  TELL_ANOTHER_FRIEND_LBL,
  CANCEL_LBL,
} from './constants';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  mountedState: PropTypes.bool,
  toggleModalState: PropTypes.func,
  onModalDidClose: PropTypes.func,
  renderTellAFriendModal: PropTypes.func,
  onCancel: PropTypes.func,
};

const ThankyouModal = ({
  mountedState,
  toggleModalState,
  onModalDidClose,
  renderTellAFriendModal,
  onCancel,
}) => {
  return (
    <ErrorBoundary>
      <ModalDialog
        verticallyCenter
        mountedState={mountedState}
        toggleModalState={toggleModalState}
        onModalDidClose={onModalDidClose}
        titleAriaLabel={ALT_PHONE_NUM_MODAL_ARIA_TITLE_LBL}
        variation={'medium'}
        scrollDisabled={false}
        closeIconShow
        underlayClickExits={false}
        initialFocus=".rclCloseBtnWrapper"
      >
        <div className="center">
          <h2 className={classnames(styles.heading, 'mb2')}>
            {THANK_YOU_MESSAGE_LBL}
          </h2>
          <p className={classnames(styles.description, 'mb2')}>
            {THANK_YOU_PARA_LBL}
          </p>
          <Button
            id="tellAFriendSubmit"
            onClick={() => {
              renderTellAFriendModal();
            }}
            theme="primary"
            className={'mb2 mr1 sm-mr0 large-5 small-12'}
            data-locator="tellAFriend-Submit"
          >
            {TELL_ANOTHER_FRIEND_LBL}
          </Button>
          <PrimaryLink
            variation="primary"
            type="bold"
            href="#"
            onClick={e => {
              onCancel(e);
            }}
          >
            {CANCEL_LBL}
          </PrimaryLink>
        </div>
      </ModalDialog>
    </ErrorBoundary>
  );
};

ThankyouModal.propTypes = propTypes;
export default ThankyouModal;
