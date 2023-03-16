import React from 'react';
import { PropTypes } from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Icon from '@bbb-app/core-ui/icon/Icon';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import TellAFriendForm from './TellAFriendForm';
import { EDIT_REGISTRY_MODAL_TITLE_LBL } from './constants';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  mountedState: PropTypes.bool,
  toggleModalState: PropTypes.func,
  formWrapperData: PropTypes.object,
  identifier: PropTypes.string,
  submitTellAFriend: PropTypes.func,
  error: PropTypes.string,
};

const TellAFriendComponent = ({
  mountedState,
  toggleModalState,
  formWrapperData,
  identifier,
  submitTellAFriend,
  error,
}) => {
  return (
    <ErrorBoundary>
      <ModalDialog
        mountedState={mountedState}
        toggleModalState={toggleModalState}
        titleAriaLabel={EDIT_REGISTRY_MODAL_TITLE_LBL}
        variation={'large'}
        closeIconShow
        scrollDisabled
        verticallyCenter
        underlayClickExits={false}
        customCloseIcon={<Icon height="16px" width="16px" type="close-icon" />}
        initialFocus=".rclCloseBtnWrapper"
      >
        <TellAFriendForm
          formWrapperData={formWrapperData}
          identifier={identifier}
          submitTellAFriend={submitTellAFriend}
          error={error}
          toggleModalState={toggleModalState}
        />
      </ModalDialog>
    </ErrorBoundary>
  );
};
TellAFriendComponent.propTypes = propTypes;
export default TellAFriendComponent;
