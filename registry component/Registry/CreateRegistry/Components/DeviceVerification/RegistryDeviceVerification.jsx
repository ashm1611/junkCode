import React from 'react';
import pathOr from 'lodash/fp/pathOr';
import isEmpty from 'lodash/fp/isEmpty';
import DeviceVerification from '@bbb-app/device-verification/containers/DeviceVerification.async';
import { getMergedVerificationData } from '@bbb-app/utils/deviceVerificationUtil';

const RegistryDeviceVerification = props => {
  const {
    deviceVerificationData,
    deviceVerificationError,
    isExtendAccount,
    formWrapperData,
    onClose,
    onModalOpen,
    email,
    optForEmails,
    deviceAutoLogin,
  } = props;

  const verificationData = getMergedVerificationData(
    deviceVerificationData,
    deviceVerificationError
  );
  const verificationType = pathOr('', 'verificationType', verificationData);
  const password = pathOr('', 'password.value', formWrapperData);

  return (
    !isEmpty(verificationType) &&
    isExtendAccount && (
      <DeviceVerification
        verificationType={verificationType}
        password={password}
        deviceVerificationData={verificationData}
        onDeviceModalClose={onClose}
        isExtendAccountFlow={isExtendAccount}
        onClose={onClose}
        onModalOpen={onModalOpen}
        email={email}
        optForEmails={optForEmails}
        deviceAutoLogin={deviceAutoLogin}
      />
    )
  );
};

export default RegistryDeviceVerification;
