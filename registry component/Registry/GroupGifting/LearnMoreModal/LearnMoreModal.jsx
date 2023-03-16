import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from './LearnMoreModal.css';
import {
  INFORMATION_MODAL,
  getGroupGiftingTealiumData,
} from '../GroupGiftingTealium';
import {
  LEARN_MORE_BTN_LBL,
  LEARN_MORE_DESCRIPTION1_LBL,
  LEARN_MORE_DESCRIPTION2_LBL,
  LEARN_MORE_HEADING_LBL,
} from './constants';

const LearnMoreModal = props => {
  const { isMobile } = props;
  const btnClass = isMobile ? 'fullWidth' : classnames(styles.doneBtn);

  return (
    <ModalDialog
      mountedState={props.mountedState}
      toggleModalState={props.toggleModalState}
      titleAriaLabel="aria-label"
      verticallyCenter
      variation="small"
    >
      <div>
        <div className={classnames(styles.featureStyle)}>
          <Paragraph theme="primary" className={classnames('mb3', styles.text)}>
            {LEARN_MORE_HEADING_LBL}
          </Paragraph>

          <Paragraph theme="primary" className={classnames('mb2', styles.desc)}>
            {LEARN_MORE_DESCRIPTION1_LBL}
          </Paragraph>

          <Paragraph
            theme="primary"
            className={classnames('mb2', styles.desc && styles.newCopy)}
          >
            {LEARN_MORE_DESCRIPTION2_LBL}
          </Paragraph>

          <div className="mt3">
            <Button
              theme={'primary'}
              className={btnClass}
              onClick={props.toggleModalState}
              variation="noTransition"
            >
              {LEARN_MORE_BTN_LBL}
            </Button>
          </div>
        </div>
      </div>
      <TealiumHandler
        identifier={INFORMATION_MODAL}
        tealiumPageInfoNotAvailable
        utagData={getGroupGiftingTealiumData({
          page_name: INFORMATION_MODAL,
          pagename_breadcrumb: INFORMATION_MODAL,
        })}
      />
    </ModalDialog>
  );
};

LearnMoreModal.propTypes = {
  isMobile: PropTypes.bool,
  mountedState: PropTypes.any,
  toggleModalState: PropTypes.func,
};

export default LearnMoreModal;
