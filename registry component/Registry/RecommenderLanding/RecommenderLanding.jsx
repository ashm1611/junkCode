/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import { getSiteId } from '@bbb-app/utils/common';
import GridX from '@bbb-app/core-ui/grid-x';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Button from '@bbb-app/core-ui/button';
import Picture from '@bbb-app/core-ui/picture';
import Image from '@bbb-app/core-ui/image/Image';
import styles from './RecommenderLanding.css';
import CtaSkeleton from './Skeleton/Skeleton';
import {
  EYE_BROW_LBL,
  HEADING_LBL,
  DESCRIPTION_LBL,
  PRIVATE_REGISTRY_MESSAGE_LBL,
  INVALID_MESSAGE_LBL,
  GENERIC_ERROR_LBL,
  CTA_TEXT_LBL,
  CTA_TEXT_US_LBL,
} from './constants';

export const RecommenderLanding = props => {
  const {
    imageUrl,
    handleClick,
    isBtnDisable,
    isMobile,
    privateRegistryMessage,
    invalidMessage,
    showLoaderForButton,
    genericError,
  } = props;
  const isBabyCanada =
    getSiteId() === 'BuyBuyBaby' || getSiteId() === 'BedBathCanada';
  const theme = isBtnDisable ? 'deactivated' : 'primary';
  const variation = isMobile ? 'fullWidth' : '';
  const genericErrorMsg = genericError ? GENERIC_ERROR_LBL : '';
  const tokenErrorMsg = privateRegistryMessage
    ? PRIVATE_REGISTRY_MESSAGE_LBL
    : INVALID_MESSAGE_LBL;
  return (
    <GridX className={classNames('mb3 grid-container')}>
      {(privateRegistryMessage || invalidMessage || genericError) && (
        <Cell className={classNames('mt3')}>
          <Notification
            status={'error'}
            content={genericError ? genericErrorMsg : tokenErrorMsg}
            data-locator={'rg-rl-errorMsg'}
          />
        </Cell>
      )}
      <Cell
        className={classNames(
          'large-5 sm-mb3',
          styles.setPaddingForContent,
          styles.alignCenter
        )}
      >
        <GridX>
          <Cell
            className={classNames(styles.eyebrowText, 'mb2')}
            data-locator={'rg-rl-eyebrow'}
          >
            {EYE_BROW_LBL}
          </Cell>
          <Cell
            className={classNames(styles.heading, 'mb1')}
            data-locator={'rg-rl-heading'}
          >
            {HEADING_LBL}
          </Cell>
          <Cell
            className={classNames(styles.description, 'mb2')}
            data-locator={'rg-rl-desc'}
          >
            {DESCRIPTION_LBL}
          </Cell>
          <Cell className="large-5">
            {showLoaderForButton ? (
              <CtaSkeleton />
            ) : (
              <Button
                theme={theme}
                variation={variation}
                onClick={isBtnDisable ? () => {} : handleClick}
                data-locator="rl-gotocta"
                id="rl-gotocta"
              >
                {isBabyCanada ? CTA_TEXT_LBL : CTA_TEXT_US_LBL}
              </Button>
            )}
          </Cell>
        </GridX>
      </Cell>
      <Cell
        className={classNames(
          'large-6',
          styles.setAlignMentForImg,
          styles.alignRight
        )}
      >
        <Picture>
          <Image
            className={classNames(styles.imageWidth)}
            src={imageUrl}
            data-locator={'rg-rl-img'}
          />
        </Picture>
      </Cell>
    </GridX>
  );
};

RecommenderLanding.propTypes = {
  imageUrl: PropTypes.string,
  handleClick: PropTypes.func,
  isBtnDisable: PropTypes.bool,
  isMobile: PropTypes.bool,
  invalidMessage: PropTypes.bool,
  privateRegistryMessage: PropTypes.bool,
  showLoaderForButton: PropTypes.bool,
  genericError: PropTypes.bool,
};

export default RecommenderLanding;
