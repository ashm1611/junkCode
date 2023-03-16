import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import GridX from '@bbb-app/core-ui/grid-x';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Cell from '@bbb-app/core-ui/cell';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import Checkbox from '@bbb-app/core-ui/checkbox';
import Heading from '@bbb-app/core-ui/heading/Heading';
import styles from './ManageNotificationModal.css';
import {
  NOTIFICATION_MODAL_HEADING_LBL,
  NOTIFICATION_MODAL_TITLE_LBL,
  NOTIFICATION_MODAL_CHECKBOX_LBL,
  NOTIFICATION_MODAL_CTA_LBL,
  NOTIFICATION_MODAL_MOB_CTA_LBL,
} from './constants';
const BREAKPOINT = 767;
const initiateFetching = (e, props) => {
  e.preventDefault();
  props.handleGiftOptinButton(true);
};
const renderLayout = props => {
  const { isChecked, handleGiftCheck, isCheckBoxClicked } = props;
  const isMobileScreen = getWindowInnerWidth() < BREAKPOINT;
  return (
    <React.Fragment>
      <Cell className={classnames('mt2', isMobileScreen ? 'ml2' : '')}>
        <Heading
          level={3}
          className={classnames(styles.notificationModalHeading, 'mb2 sm-mb2')}
        >
          {NOTIFICATION_MODAL_HEADING_LBL}
        </Heading>
        <Paragraph
          className={classnames(styles.notificationModalText, 'mb2 sm-mb2')}
        >
          {NOTIFICATION_MODAL_TITLE_LBL}
        </Paragraph>
        <div
          className={classnames(
            styles.notificationModalCheckboxText,
            'mb4 mt1 pr4 pb2'
          )}
        >
          <Checkbox
            type="checkbox"
            label={' '}
            checked={isChecked}
            onSelect={handleGiftCheck}
            name="giftalerts"
          />{' '}
          {'gift alerts'}
          <span
            className={classnames(
              styles.notificationModalcheckbox,
              'mb2 sm-mb2'
            )}
          >
            {NOTIFICATION_MODAL_CHECKBOX_LBL}
          </span>
        </div>
      </Cell>
      <Cell
        className={classnames(
          isMobileScreen && styles.saveButtonContainer,
          'pb1'
        )}
      >
        <Button
          className={styles.saveButton}
          theme="primary"
          disabled={!isCheckBoxClicked}
          data-locator="registryNotifications-manageNotifications"
          onClick={e => initiateFetching(e, props)}
        >
          {isMobileScreen
            ? NOTIFICATION_MODAL_MOB_CTA_LBL
            : NOTIFICATION_MODAL_CTA_LBL}
        </Button>
      </Cell>
    </React.Fragment>
  );
};

export const ManageNotificationModal = props => {
  return (
    <GridX className={classnames('large-12 small-12', 'pl1', 'pr2')}>
      {renderLayout(props)}
    </GridX>
  );
};
ManageNotificationModal.propTypes = {
  mountedState: PropTypes.bool,
  toggleModalState: PropTypes.func,
};
renderLayout.propTypes = {
  isChecked: PropTypes.bool,
  handleGiftCheck: PropTypes.func,
  isCheckBoxClicked: PropTypes.bool,
};

export default ManageNotificationModal;
