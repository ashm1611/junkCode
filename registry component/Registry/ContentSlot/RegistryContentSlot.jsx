import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { getWindowInnerWidth } from '@bbb-app/utils/viewPortUtils';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Img from '@bbb-app/core-ui/image/CoreImage';
import PrimaryLink from '@bbb-app/plp-primary-link/containers/PrimaryLink';
import {
  OWNER_CONTENT_EXPLORE_LBL,
  OWNER_CONTENT_EXPLORE_COLLEGE_LBL,
  OWNER_CONTENT_INFO_LBL,
  OWNER_CONTENT_BUTTON_LBL,
  COLLEGE_REGISTRY_URL_LBL,
} from '../constants';
import styles from './RegistryContentSlot.css';
import '../../../../assets/images/BBBStore.svg';
import {
  BABY_IMAGE_LBL,
  CONTENT_BUTTON_TEXT_MOB_LBL,
  CONTENT_BUTTON_TEXT_LBL,
  CONTENT_EXPLORE_LBL,
  CONTENT_INFO_LBL,
  CONTENT_HEADING_LBL,
  US_IMAGE_BABY_LBL,
  US_IMAGE_LBL,
  OTHER_REGISTRY_BABY_URL,
  OTHER_REGISTRY_CANADA_URL,
  OTHER_REGISTRY_URL,
  OTHER_TBS_REGISTRY_URL,
  BABY_REGISTRY_CANADA_URL,
  GIFT_GIVER_LBL,
} from './constants';

const VIEW_COLLECTION_LBL = 'view collections';
const NEED_PLACE_LBL = 'need a place to start your registry?';
/**
 * This component is responsible for rendering ContentSlot on Registrant and GifGiver Page.
 * @author Ashish Mishra | ashish.mishra@idc.bedbath.com
 */
const getGiftUrl = (labels, isGiftGiver, registryData, siteId) => {
  const URL = redirectURL(labels, isGiftGiver, registryData, siteId);
  const registryId = pathOr(
    '',
    'registryResVO.registrySummaryVO.registryId',
    registryData
  );
  return isGiftGiver ? `${URL}?registryId=${registryId}&isRegistry=true` : URL;
};
const redirectURL = (labels, isGiftGiver, registryData, siteId) => {
  const eventType = pathOr(
    '',
    'registryResVO.registrySummaryVO.eventType',
    registryData
  );
  let url = '';
  if (eventType === 'College/University' || eventType === 'University') {
    url = isGiftGiver ? GIFT_GIVER_LBL : COLLEGE_REGISTRY_URL_LBL;
  } else if (siteId && siteId.includes('BedBathUS')) {
    url = isGiftGiver ? GIFT_GIVER_LBL : OTHER_REGISTRY_URL;
  } else if (siteId && siteId.includes('BuyBuyBaby')) {
    url = isGiftGiver ? GIFT_GIVER_LBL : OTHER_REGISTRY_BABY_URL;
  } else if (siteId && siteId.includes('BedBathCanada')) {
    if (eventType === 'Baby') {
      url = isGiftGiver ? GIFT_GIVER_LBL : BABY_REGISTRY_CANADA_URL;
    } else {
      url = isGiftGiver ? GIFT_GIVER_LBL : OTHER_REGISTRY_CANADA_URL;
    }
  } else if (siteId && siteId.includes('TBS_BedBathUS')) {
    url = isGiftGiver ? GIFT_GIVER_LBL : OTHER_TBS_REGISTRY_URL;
  }
  return url;
};
const propTypes = {
  styleVariation: PropTypes.string,
  labels: PropTypes.object,
  isGiftGiver: PropTypes.bool,
  registryData: PropTypes.object,
  siteId: PropTypes.bool,
  enableNewRegDashboard: PropTypes.bool,
};

export const RegistryContentSlot = ({
  labels,
  isGiftGiver,
  registryData,
  siteId,
  styleVariation,
  enableNewRegDashboard,
}) => {
  let exploreResult = '';
  let GiftNeedMoreResult = '';
  const getUrl = getGiftUrl(labels, isGiftGiver, registryData, siteId);
  const eventType = pathOr(
    '',
    'registryResVO.registrySummaryVO.eventType',
    registryData
  );
  const isBabySite = siteId === 'BuyBuyBaby';
  const usImage = isBabySite ? US_IMAGE_BABY_LBL : US_IMAGE_LBL;
  const img = eventType === 'Baby' ? BABY_IMAGE_LBL : usImage;
  const heading = CONTENT_HEADING_LBL;
  const needInfo = isGiftGiver ? CONTENT_INFO_LBL : OWNER_CONTENT_INFO_LBL;
  // eslint-disable-next-line
  const explore = isGiftGiver
    ? CONTENT_EXPLORE_LBL
    : eventType === 'College/University' || eventType === 'University'
    ? OWNER_CONTENT_EXPLORE_COLLEGE_LBL
    : OWNER_CONTENT_EXPLORE_LBL;
  const shopNow = isGiftGiver
    ? CONTENT_BUTTON_TEXT_LBL
    : OWNER_CONTENT_BUTTON_LBL;
  const startAdding = CONTENT_BUTTON_TEXT_MOB_LBL;
  const siteIDBased = siteId === 'BuyBuyBaby' || siteId === 'TBS_BuyBuyBaby';
  if (siteIDBased) {
    exploreResult = classnames(styles.exploreBaby, 'pl15 pr15');
    GiftNeedMoreResult = styles.NeedMoreOptionsbaby;
  } else {
    exploreResult = classnames(styles.explore, 'pr2 pl2');
    GiftNeedMoreResult = classnames(styles.NeedMoreOptions, 'p1 pb2 pt2');
  }

  const linkDataLocators = `registry-${
    isGiftGiver ? 'guest' : 'owner'
  }-content-slot-link`;

  const isMobileScreen = getWindowInnerWidth() < 640;
  return (
    <GridX
      className={classnames(
        styleVariation === 'oos' && styles.oosCell,
        styles.article
      )}
      data-locator={`registry-${
        isGiftGiver ? 'guest' : 'owner'
      }-content-slot-complete-div`}
    >
      <Cell
        className={classnames(
          styles.imageContainer,
          'small-3 large-12 medium-12',
          styles.common
        )}
      >
        <Img src={img} alt="gift Image" className={styles.icon} />
      </Cell>
      <Cell className={classnames('small-9 large-12 medium-12', styles.common)}>
        <div
          tabIndex="0"
          className={siteIDBased ? styles.regBabyTitle : styles.regTitle}
        >
          {heading}
        </div>

        <div tabIndex="0" className={GiftNeedMoreResult}>
          {enableNewRegDashboard ? <span>{NEED_PLACE_LBL}</span> : needInfo}
        </div>
        {!enableNewRegDashboard && (
          <div
            tabIndex="0"
            className={classnames(styles.exploreCommon, exploreResult)}
          >
            {explore}
          </div>
        )}
        {!isMobileScreen ? (
          <div
            className={classnames(
              styles.buttonContainer,
              enableNewRegDashboard && styles.buttonContainerNew
            )}
          >
            <Cell>
              <Button
                href={getUrl}
                data-locator={linkDataLocators}
                theme="secondaryTransparent"
                className={!siteIDBased ? styles.showAllCTA : styles.babyCTA}
              >
                {enableNewRegDashboard ? VIEW_COLLECTION_LBL : shopNow}
              </Button>
            </Cell>
          </div>
        ) : (
          <div className={styles.primaryContainer}>
            <PrimaryLink
              type="bold"
              data-locator={linkDataLocators}
              className={!siteIDBased ? styles.primary : styles.babyCTA}
              href={getUrl || '/'}
            >
              {enableNewRegDashboard ? VIEW_COLLECTION_LBL : startAdding}
            </PrimaryLink>
          </div>
        )}
      </Cell>
    </GridX>
  );
};
RegistryContentSlot.propTypes = propTypes;
export default RegistryContentSlot;
