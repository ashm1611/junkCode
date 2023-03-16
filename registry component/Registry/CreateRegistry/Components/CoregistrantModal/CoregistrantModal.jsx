import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import LabelsUtil from '@bbb-app/utils/labelsUtil';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import { ReferredContentModal } from '@bbb-app/referred-content-modal/ReferredContentModal';
import {
  profileStatusConstant,
  referredContentKeys,
} from '../../CreateRegistryUtils';
import styles from './CoregistrantModal.css';
import { COREGISTRANT_MODAL_ARIA_LBL } from '../../../../../Pages/CollegeChecklist/CoregistrantModal/constants';
import {
  COREGISTRANT_MODAL_HEADING_LBL,
  OK_BUTTON_LBL,
  CANCEL_LBL,
} from './constant';

const propTypes = {
  labels: PropTypes.object,
  profileStatus: PropTypes.string,
  isCoregistrantModalOpen: PropTypes.bool,
  coRegistrantEmail: PropTypes.string,
  toggleCoregistrantModalState: PropTypes.func,
  closeCoregistrantModal: PropTypes.func,
  handleOkButtonClick: PropTypes.func,
  referredContent: PropTypes.object,
  globalSwitchConfig: PropTypes.object,
};

/**
 * @param {String} profileStatus - status of the entered email
 * @param {Object} labels - labels
 * @param {bool} isCoregistrantModalOpen - state of the coregistrant modal
 * @param {String} coRegistrantEmail - value of the email entered
 * @param {func} toggleCoregistrantModalState - function to toggle modal state
 * @param {func} closeCoregistrantModal - function to close modal
 */

/**
 *This component displays the modal on the basis of the status of the existance of the profile
 *It uses the ReferredContentModal to display the referred content along with the other components.
 */

const CoregistrantModal = props => {
  const {
    profileStatus,
    isCoregistrantModalOpen,
    coRegistrantEmail,
    toggleCoregistrantModalState,
    closeCoregistrantModal,
    referredContent,
    handleOkButtonClick,
    globalSwitchConfig,
  } = props;
  let content = null;
  const getReferredContentId = key => {
    const enableCSLabels = pathOr(false, 'enableCSLabels', globalSwitchConfig);
    const referredContentArray = pathOr(
      [],
      enableCSLabels ? 'referredContent' : 'createRegistry.referredContent',
      props.labels
    );
    let contentId;
    if (!isEmpty(referredContentArray)) {
      referredContentArray.forEach(obj => {
        if (obj.key === key) contentId = obj.id;
      });
    }
    return contentId;
  };

  if (referredContent) {
    let key;
    switch (profileStatus) {
      case profileStatusConstant.EXISTS:
        key = referredContentKeys.ALREADY_EXISTS;
        break;
      case profileStatusConstant.NON_SISTER:
        key = referredContentKeys.NON_SISTER;
        break;
      default:
        key = referredContentKeys.NOT_EXISTS;
        break;
    }
    content = pathOr(null, getReferredContentId(key), referredContent.content);
  }

  const modalProps = {
    mountedState: isCoregistrantModalOpen,
    toggleModalState: toggleCoregistrantModalState,
    contentWrapperClass: styles.coRegistrantDialog,
    titleAriaLabel: COREGISTRANT_MODAL_ARIA_LBL,
    verticallyCenter: true,
    variation: 'small',
    underlayClickExits: false,
    scrollDisabled: false,
    closeDataLocator: 'registry-modalcloseicon',
    modalDataLocator: 'registry-modaloverlay',
  };
  let contentWithPlaceHolder = '';
  let contentBody = '';
  if (content)
    contentBody = Array.isArray(content.body) ? content.body[0] : content.body;
  if (!isEmpty(content) && !isEmpty(content.body)) {
    contentWithPlaceHolder = LabelsUtil.replacePlaceholderValues(contentBody, [
      coRegistrantEmail,
    ]);
  }

  return (
    <ReferredContentModal
      modalProps={modalProps}
      heading={COREGISTRANT_MODAL_HEADING_LBL}
      headingClassName={styles.heading}
      headingLevel={2}
      content={contentWithPlaceHolder}
      contentClassName={styles.content}
    >
      <GridX>
        <Cell className={classnames('large-6 small-12', styles.okButton)}>
          <Button
            variation="fullWidth"
            theme="primary"
            onClick={handleOkButtonClick}
          >
            {OK_BUTTON_LBL}
          </Button>
        </Cell>
      </GridX>
      <GridX>
        <Cell>
          <PrimaryLink
            href="#"
            onClick={closeCoregistrantModal}
            type={'bold'}
            variation={'primaryLinkBlue'}
          >
            {CANCEL_LBL}
          </PrimaryLink>
        </Cell>
      </GridX>
    </ReferredContentModal>
  );
};

CoregistrantModal.propTypes = propTypes;

export default CoregistrantModal;
