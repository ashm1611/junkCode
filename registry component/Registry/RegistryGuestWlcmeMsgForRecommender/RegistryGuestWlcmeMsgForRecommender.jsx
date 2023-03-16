import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import Gridx from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Image from '@bbb-app/core-ui/image/Image';
import Icon from '@bbb-app/core-ui/icon/Icon';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from './RegistryGuestWlcmeMsgForRecommender.css';
import {
  STEP_THREE_MSG_LBL,
  WELCOME_MSG_CTA_LBL,
  WELCOME_MSG_HEADING_LBL,
  STEP_ONE_MSG_LBL,
  STEP_TWO_MSG_LBL,
} from '../constants';

const GIFT_FLOWER_SRC = '/static/assets/images/gift-flower.svg';
const ONE_SRC = '/static/assets/images/one.svg';
const TWO_SRC = '/static/assets/images/two.svg';
const THREE_SRC = '/static/assets/images/three.svg';

export const RegistryGuestWlcmeMsgForRecommender = props => {
  const rendercontent = () => {
    return (
      <Gridx className={classnames('grid-margin-x')}>
        <Cell
          className={classnames(styles.alignCenter, 'lg-mb3 sm-mb3')}
          data-locator="rg-bcImg"
        >
          <Image
            itemProp="gift-flower"
            src={GIFT_FLOWER_SRC}
            height="70px"
            width="300px"
          />
        </Cell>
        <Cell
          className={classnames(
            styles.alignCenter,
            styles.heading,
            'lg-mb3 sm-mb3'
          )}
          data-locator="rg-heading"
        >
          {WELCOME_MSG_HEADING_LBL}
        </Cell>
        <Cell
          className={classnames('large-4 lg-mb3 sm-mb3', styles.alignCenter)}
          data-locator="rg-stepOneImg"
        >
          <Image
            className={classnames('mb125')}
            src={ONE_SRC}
            height="55px"
            width="55px"
          />
          <div
            className={classnames(styles.description, 'marginZeroAuto')}
            data-locator="rg-stepOne"
          >
            {STEP_ONE_MSG_LBL}
          </div>
        </Cell>
        <Cell
          className={classnames('large-4 lg-mb3 sm-mb3', styles.alignCenter)}
          data-locator="rg-stepTwoImg"
        >
          <Image
            className={classnames('mb125')}
            src={TWO_SRC}
            height="55px"
            width="55px"
          />
          <div
            className={classnames(styles.description, 'marginZeroAuto')}
            data-locator="rg-stepTwo"
          >
            {STEP_TWO_MSG_LBL}
          </div>
        </Cell>
        <Cell
          className={classnames('large-4 lg-mb3 sm-mb3', styles.alignCenter)}
          data-locator="rg-stepThreeImg"
        >
          <Image
            className={classnames('mb125')}
            src={THREE_SRC}
            height="55px"
            width="55px"
          />
          <div
            className={classnames(styles.description, 'marginZeroAuto')}
            data-locator="rg-stepThree"
          >
            {STEP_THREE_MSG_LBL}
          </div>
        </Cell>
        <div className={classnames(styles.alignCenter, 'marginZeroAuto')}>
          <Button
            theme="primary"
            variation="fullWidth"
            onClick={props.closeModal}
            data-locator="rg-rl-wlcmemsgmodalcta"
          >
            {WELCOME_MSG_CTA_LBL}
          </Button>
        </div>
      </Gridx>
    );
  };

  return (
    <div>
      <ModalDialog
        mountedState={props.mountedState}
        toggleModalState={props.closeModal}
        titleAriaLabel={'Recommender Welcome Message Modal dialog'}
        variation={'large'}
        closeIconShow
        scrollDisabled
        customCloseIcon={<Icon height="16px" width="16px" type="close-icon" />}
        closeDataLocator="rg-rl-closecta"
        verticallyCenter
      >
        {rendercontent()}
      </ModalDialog>
    </div>
  );
};

RegistryGuestWlcmeMsgForRecommender.propTypes = {
  mountedState: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default RegistryGuestWlcmeMsgForRecommender;
