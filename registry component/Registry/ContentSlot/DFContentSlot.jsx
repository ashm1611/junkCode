import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Img from '@bbb-app/core-ui/image/CoreImage';
import PrimaryLink from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import { publish } from '@bbb-app/utils/pubsub';
import { CONTENT_HEADING_LBL } from './constants';
import {
  DFCS_SUB_TEXT_LBL,
  DFCS_HEADING_LBL,
  DFCS_START_ADDING_LBL,
  DFCS_IMAGE_LBL,
} from '../constants';
import styles from './RegistryContentSlot.css';

const propTypes = {
  siteId: PropTypes.bool,
};

export const DFContentSlot = props => {
  const { siteId } = props;

  const isBabySite = siteId === 'BuyBuyBaby' || siteId === 'TBS_BuyBuyBaby';

  let GiftNeedMoreResult = '';
  let exploreResult = '';
  if (isBabySite) {
    GiftNeedMoreResult = styles.NeedMoreOptionsbaby;
    exploreResult = styles.exploreBaby;
  } else {
    GiftNeedMoreResult = classnames(styles.NeedMoreOptions, 'p1 pb2 pt2');
    exploreResult = styles.explore;
  }
  const isMobileScreen = getWindowInnerWidth() < 640;

  function handleStartAddingClick(e) {
    if (e) e.preventDefault();
    publish('DFStartAdding', true);
  }

  return (
    <GridX className={styles.article} data-locator="diaper-fund-content-slot">
      <Cell
        className={classnames(
          styles.imageContainer,
          'small-3 large-12 medium-12',
          styles.common
        )}
      >
        <Img src={DFCS_IMAGE_LBL} alt="gift Image" className={styles.icon} />
      </Cell>
      <Cell className={classnames('small-9 large-12 medium-12', styles.common)}>
        <div
          tabIndex="0"
          className={isBabySite ? styles.regBabyTitle : styles.regTitle}
        >
          {CONTENT_HEADING_LBL}
        </div>

        <div tabIndex="0" className={GiftNeedMoreResult}>
          {DFCS_HEADING_LBL}
        </div>
        <div
          tabIndex="0"
          className={classnames(styles.exploreCommon, exploreResult, 'pr2 pl2')}
        >
          {DFCS_SUB_TEXT_LBL}
        </div>
        {isMobileScreen ? (
          <div className={styles.primaryContainer}>
            <PrimaryLink
              type="bold"
              data-locator="diaper-fund-content-slot-link"
              className={isBabySite ? styles.babyCTA : styles.primary}
              onClick={handleStartAddingClick}
              href="#"
            >
              {DFCS_START_ADDING_LBL}
            </PrimaryLink>
          </div>
        ) : (
          <Cell className={styles.buttonContainer}>
            <Button
              data-locator="diaper-fund-content-slot-link"
              theme="secondaryTransparent"
              className={isBabySite ? styles.babyCTA : styles.showAllCTA}
              onClick={handleStartAddingClick}
            >
              {DFCS_START_ADDING_LBL}
            </Button>
          </Cell>
        )}
      </Cell>
    </GridX>
  );
};

DFContentSlot.propTypes = propTypes;
export default DFContentSlot;
