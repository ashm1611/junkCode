import React from 'react';
import PropTypes from 'prop-types';

import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';

import { DEACTIVATE_REG_CANCEL_CTA_LBL } from '../../constants';

const DangerousText = dangerousHTML(DangerousText);
const DeactivateRegistryModalComponent = ({
  modalMountedState,
  toggleModalState,
  deactivateReg,
  modalContent,
  buttonLabel,
}) => {
  return (
    <ModalDialog
      mountedState={modalMountedState}
      toggleModalState={toggleModalState}
      titleAriaLabel={'deactivate-registry-modal'}
      variation="small"
      closeIconShow
      scrollDisabled
      verticallyCenter
      closeDataLocator={'deactivate-registry-modal-close'}
      modalDataLocator={'deactivate-registry-modal'}
    >
      <GridX>
        <DangerousText data-locator="deactivate-registry-modal-heading">
          {modalContent}
        </DangerousText>
      </GridX>
      <GridX>
        <Button
          id="deactivate-registry-submit"
          type="submit"
          theme={'primary'}
          aria-label="deactivate-registry"
          onClick={deactivateReg}
          data-locator={'deactivate-registry-modal-cta'}
          className={'mr2 sm-mb2'}
        >
          {buttonLabel}
        </Button>
        <Button
          id="deactivate-registry-submit"
          type="submit"
          theme={'secondary'}
          aria-label="cancel"
          onClick={() => {
            toggleModalState(false);
          }}
          data-locator={'deactivate-registry-modal-cancel'}
        >
          {DEACTIVATE_REG_CANCEL_CTA_LBL}
        </Button>
      </GridX>
    </ModalDialog>
  );
};

DeactivateRegistryModalComponent.propTypes = {
  modalMountedState: PropTypes.bool,
  toggleModalState: PropTypes.func,
  deactivateReg: PropTypes.func,
  modalContent: PropTypes.string,
  buttonLabel: PropTypes.func,
};

export default DeactivateRegistryModalComponent;
