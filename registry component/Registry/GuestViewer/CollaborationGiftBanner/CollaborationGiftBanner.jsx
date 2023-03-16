import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import Img from '@bbb-app/core-ui/image/CoreImage';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import '../../../../../assets/images/iconGift.png';
import {
  iconGift,
  url,
  LEARN_MORE_LBL,
  RECC_GIFT_LBL,
  GIFT_BANNER_LBL,
  GIFT_SECTION_LBL,
  GIFT_SEC_LBL,
} from './constants';
import styles from './CollaborationGiftBanner.css';

const CollaborationGiftBanner = props => {
  const {
    registryData,
    profileData,
    contentStackSelectors,
    isMobile,
    collaborationGiftHelpContent,
    siteId,
  } = props;
  const [isOpenModal, openModal] = useState(false);
  const name = profileData && profileData.firstName && profileData.firstName;
  const coFName = pathOr(
    '',
    'registryResVO.registrySummaryVO.primaryRegistrantFirstName',
    registryData
  );
  let contentStackSupportData;
  if (contentStackSelectors && contentStackSelectors.length) {
    contentStackSupportData =
      contentStackSelectors && contentStackSelectors[0].modules;
  }
  const helpContentWeb = pathOr(
    '',
    'content_body',
    contentStackSupportData && contentStackSupportData[4].support_page
  );
  const helpContentMob = pathOr(
    '',
    'content_body',
    contentStackSupportData && contentStackSupportData[5].support_page
  );
  const learnMoreModal = () => {
    openModal(true);
    collaborationGiftHelpContent();
  };

  const closeModal = () => {
    openModal(false);
  };
  const learnMoreLink = (
    <HyperLink
      className={styles.collaborationGiftBannerLink}
      href="#"
      title={LEARN_MORE_LBL}
      onClick={() => learnMoreModal()}
    >
      {LEARN_MORE_LBL}
    </HyperLink>
  );

  const reccoGifts = (
    <span className={styles.collaborationGiftBannerReccText}>
      {RECC_GIFT_LBL}
    </span>
  );

  const helpContent = isMobile ? (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: helpContentMob,
      }}
    />
  ) : (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: helpContentWeb,
      }}
    />
  );

  return (
    <React.Fragment>
      <GridX
        className={classnames('grid-container', styles.collaborationGiftBanner)}
      >
        <GridX
          className={classnames(
            'fullWidth grid-container py2',
            styles.collaborationGiftBannerContainer
          )}
        >
          <Cell
            className="large-9 small-10"
            key={'GGBanner-header'}
            data-locator="GGBanner-header"
          >
            <div className={styles.GGBannerLeftContainer}>
              {!isMobile && (
                <span>
                  <Img src={iconGift} width={'36.2'} height={'44'} />
                </span>
              )}
              <div className={styles.GGBannerText}>
                <div className={styles.collaborationGiftBannerFSection}>
                  {`${name}${GIFT_BANNER_LBL}`}
                </div>
                {!isMobile ? (
                  <div className={styles.collaborationGiftBannerSSection}>
                    {`${GIFT_SECTION_LBL} ${coFName} ${GIFT_SEC_LBL}`}
                    {learnMoreLink}
                  </div>
                ) : (
                  <div className={styles.collaborationGiftBannerSSection}>
                    {learnMoreLink}{' '}
                    <HyperLink
                      href={url}
                      data-locator="giftnotonregistry-link"
                      textDecoration="textDecorationFocusHoverNone"
                    >
                      {reccoGifts}
                    </HyperLink>
                  </div>
                )}
              </div>
            </div>
          </Cell>
          <Cell
            className="large-3 small-2"
            key={'GGBanner-subheader'}
            data-locator="GGBanner-subheader"
          >
            <HyperLink
              href={url}
              className={classnames(
                'sm-my2 mt1',
                styles.collaborationGiftBannerReccomended
              )}
              data-locator="giftnotonregistry-link"
              textDecoration="textDecorationFocusHoverNone"
            >
              <span
                className={classnames(
                  'sm-ml2',
                  styles.collaborationGiftBannerReccImage,
                  siteId === 'BuyBuyBaby'
                    ? styles.collaborationGiftBannerReccImageBaby
                    : styles.collaborationGiftBannerReccImageOther
                )}
              >
                +
              </span>
              {!isMobile && reccoGifts}
            </HyperLink>
          </Cell>
        </GridX>
      </GridX>
      {isOpenModal && (
        <ModalDialog
          className={styles.collaborationContentModal}
          mountedState={isOpenModal}
          toggleModalState={closeModal}
          titleAriaLabel="Collaboration help content modal"
          verticallyCenter
          variation="medium"
        >
          {helpContent}
        </ModalDialog>
      )}
    </React.Fragment>
  );
};

CollaborationGiftBanner.propTypes = {
  registryData: PropTypes.object,
  profileData: PropTypes.object,
  contentStackSelectors: PropTypes.array,
  isMobile: PropTypes.bool,
  collaborationGiftHelpContent: PropTypes.func,
  siteId: PropTypes.string,
};

export default CollaborationGiftBanner;
