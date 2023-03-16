import React from 'react';
import { func, string, bool } from 'prop-types';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading/Heading';
import Button from '@bbb-app/core-ui/button/Button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import { getGroupGiftingTealiumData } from '../../GroupGifting/GroupGiftingTealium';
import { ITEM_REMOVAL_CONFIRMATION } from '../constants';

const ConfirmationModal = props => {
  const {
    showDeleteModal,
    toggleDeleteModal,
    primaryCTAHandler,
    secondaryCTAHandler,
    title,
    description,
    primaryCTALabel,
    secondaryCTALabel,
  } = props;
  return (
    <React.Fragment>
      <ModalDialog
        mountedState={showDeleteModal}
        toggleModalState={toggleDeleteModal}
        titleAriaLabel="aria-label"
        verticallyCenter
        variation="medium"
      >
        <Heading level={2} className="pb2">
          {title}
        </Heading>
        <Paragraph className="pb3 mb1" theme="primary">
          {description}
        </Paragraph>
        <GridX className="deleteGroupGiftModalButtons">
          <Cell>
            <Button
              variation="whitelink"
              theme="primary"
              onClick={primaryCTAHandler}
              className="pb2 mb2 mr1 sm-fullWidth"
            >
              {primaryCTALabel}
            </Button>

            <Button
              variation="blueLink"
              theme="secondaryTransparent"
              onClick={secondaryCTAHandler}
              className="pb2 mb2 sm-fullWidth"
            >
              {secondaryCTALabel}
            </Button>
          </Cell>
        </GridX>
        <TealiumHandler
          identifier={ITEM_REMOVAL_CONFIRMATION}
          tealiumPageInfoNotAvailable
          utagData={getGroupGiftingTealiumData({
            page_name: ITEM_REMOVAL_CONFIRMATION,
            pagename_breadcrumb: ITEM_REMOVAL_CONFIRMATION,
          })}
        />
      </ModalDialog>
    </React.Fragment>
  );
};

ConfirmationModal.propTypes = {
  toggleDeleteModal: func,
  primaryCTAHandler: func,
  secondaryCTAHandler: func,
  showDeleteModal: bool,
  title: string,
  description: string,
  primaryCTALabel: string,
  secondaryCTALabel: string,
};

export default ConfirmationModal;
