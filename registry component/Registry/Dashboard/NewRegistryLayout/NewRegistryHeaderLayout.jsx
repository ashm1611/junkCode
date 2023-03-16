import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import RenderEditRegistryLink from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryWrapper';
import RegistryActionButtons from '../../RegistryActionButtons/RegistryActionButtons';
import styles from './NewRegistryHeaderLayout.css';
import {
  TYM_EMAIL_MODAL_CTA_LBL,
  EMAIL_CHECKBOX_LBL,
  FROM_EMAIL_LBL,
  REG_MESSAGE_LBL,
  REG_SAVED_ITEMS_HEADING_LBL,
  SUBMIT_BTN_LBL,
  TO_EMAIL_LBL,
  REG_FORM_LBL,
} from '../../constants';

const NewRegistryHeaderLayout = props => {
  const {
    isPreviewYrReg,
    isMobile,
    signInDetails,
    registryDetails,
    eventType,
    labels,
    getUpdatedRegistryData,
    isFetchingEditRegistryDetails,
    registryConfig,
    fetchCoRegistrantProfileStatus,
    coRegProfileStatus,
    resetCoRegistrantProfileStatus,
    dynamicContentState,
    clearEditRegistryData,
    closeModalFlag,
    editModalError,
    accountAddress,
    openEditRegistryModal,
    eventTypeCode,
    loginLabels,
    handleCollaborationModal,
  } = props;

  const formLabels = {
    formLabel: REG_FORM_LBL,
    savedItemsHeadingLabel: REG_SAVED_ITEMS_HEADING_LBL,
    fromEmailLabel: FROM_EMAIL_LBL,
    toEmailLabel: TO_EMAIL_LBL,
    messageLabel: REG_MESSAGE_LBL,
    emailCheckboxLabel: EMAIL_CHECKBOX_LBL,
    submitButtonLabel: SUBMIT_BTN_LBL,
    cartContinueShopping: TYM_EMAIL_MODAL_CTA_LBL,
  };

  return (
    <div className={classnames(styles.newRegistryLayout)}>
      <div>
        <RenderEditRegistryLink
          signInDetails={signInDetails}
          registryDetails={registryDetails.editRegistryData}
          isPublic={
            registryDetails.registryVO
              ? registryDetails.registryVO.isPublic
              : false
          }
          registryID={registryDetails.registryId}
          getUpdatedRegistryData={getUpdatedRegistryData}
          isFetchingEditRegistryDetails={isFetchingEditRegistryDetails}
          registryConfig={registryConfig}
          fetchCoRegistrantProfileStatus={fetchCoRegistrantProfileStatus}
          coRegProfileStatus={coRegProfileStatus}
          resetCoRegistrantProfileStatus={resetCoRegistrantProfileStatus}
          dynamicContentState={dynamicContentState}
          clearEditRegistryData={clearEditRegistryData}
          closeModalFlag={closeModalFlag}
          editModalError={editModalError}
          eventType={eventType}
          accountAddress={accountAddress}
          openEditRegistryModal={openEditRegistryModal}
          eventTypeCode={eventTypeCode}
          loginLabels={loginLabels}
          {...props}
          key={1}
        />
      </div>
      <div>
        <RegistryActionButtons
          isPreviewYrReg={isPreviewYrReg}
          isMobile={isMobile}
          isLoggedIn={signInDetails.isLoggedIn}
          registryId={registryDetails && registryDetails.registryId}
          eventType={eventType}
          printregistry
          registryLabel={formLabels}
          labels={labels}
          gender={registryDetails.babyGender}
          giftGiver={registryDetails && registryDetails.giftGiver}
          {...props}
          handleCollaborationModal={handleCollaborationModal}
        />
      </div>
    </div>
  );
};

NewRegistryHeaderLayout.propTypes = {
  isPreviewYrReg: PropTypes.bool,
  signInDetails: PropTypes.object,
  registryDetails: PropTypes.object,
  labels: PropTypes.object,
  eventType: PropTypes.string,
  isMobile: PropTypes.bool,
  getUpdatedRegistryData: PropTypes.func,
  isFetchingEditRegistryDetails: PropTypes.bool,
  registryConfig: PropTypes.object,
  fetchCoRegistrantProfileStatus: PropTypes.func,
  coRegProfileStatus: PropTypes.object,
  resetCoRegistrantProfileStatus: PropTypes.func,
  dynamicContentState: PropTypes.object,
  clearEditRegistryData: PropTypes.func,
  closeModalFlag: PropTypes.bool,
  editModalError: PropTypes.bool,
  accountAddress: PropTypes.object,
  openEditRegistryModal: PropTypes.bool,
  eventTypeCode: PropTypes.string,
  loginLabels: PropTypes.object,
  handleCollaborationModal: PropTypes.func,
};

export default NewRegistryHeaderLayout;
