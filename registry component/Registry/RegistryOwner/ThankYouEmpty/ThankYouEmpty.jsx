import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import { getSiteId } from '@bbb-app/utils/common';
import Icon from '@bbb-app/core-ui/icon';
import Img from '@bbb-app/core-ui/image/CoreImage';
import styles from './ThankYouEmpty.css';
import ShareRegistry from '../ShareRegistry/ShareRegistry.async';
import '../../../../../assets/icons/curved-arrow.svg';
import RenderEditRegistryLink from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryWrapper';
import {
  THANK_YOU_LIST_LBL,
  SHARE_LABEL_FOREWARD_LBL,
  SHARE_LABEL_AFTERWARD_LBL,
  SHARE_DIALOG_HEADING_LBL,
} from '../../constants';
import {
  SHARE_DIALOG_SUBHEADING_BABY_LBL,
  SHARE_DIALOG_SUBHEADING_LBL,
} from './constants';
class ThankYouEmpty extends React.PureComponent {
  static propTypes = {
    registryId: PropTypes.string.isRequired,
    registryData: PropTypes.object,
    isMobile: PropTypes.bool,
    headingId: PropTypes.string,
    descriptionId: PropTypes.string,
    eventType: PropTypes.string,
    eventTypeCode: PropTypes.string,
    labelData: PropTypes.object,
    registryConfig: PropTypes.object,
    isNewDashboard: PropTypes.bool,
  };

  renderGiftTrackerEmpty = (renderEditRegistry, isPublic) => {
    const shareBtnTheme = isPublic ? 'primary' : 'deactivated';
    return (
      <React.Fragment>
        {!this.props.isMobile.isMobileScreen && (
          <Heading
            className={classnames(styles.giftTrackerText, 'grid-container')}
            level={3}
            tabindex="0"
            id="giftTrackerHeading"
          >
            {'gift tracker'}
          </Heading>
        )}
        <div className={classnames('center', styles.giftTrackerSuprise)}>
          <Img
            className={styles.gifttrackerImg}
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/envelope_gifttracker"
            width="81px"
            height="81px"
          />
          <Heading
            className={classnames(styles.giftTrackerDescription, 'my2 mx35')}
            level={1}
            tabindex="0"
          >
            {'no thank yous to send just yet!'}
          </Heading>
          <Paragraph className={styles.giftTrackerSubDescription}>
            <div className="mb3">
              {
                'Check back once some of your gifts have been bought. In the meantime, share your registry to remind them.'
              }
            </div>
            <div className={styles.shareBtn}>
              <ShareRegistry {...this.props} shareBtnTheme={shareBtnTheme} />
            </div>
          </Paragraph>
          {!isPublic && (
            <Paragraph
              className={classnames(
                'mx-auto',
                styles.makeRegistryPublic,
                'mt0 sm-mt0 sm-mb0'
              )}
            >
              <Icon
                type={'curved-arrow'}
                className={styles.curvedArrow}
                height="44px"
                width="44px"
              />
              {SHARE_LABEL_FOREWARD_LBL}
              {renderEditRegistry()}
            </Paragraph>
          )}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      registryId,
      registryData,
      isMobile,
      headingId,
      descriptionId,
      eventType,
      eventTypeCode,
      labelData,
      registryConfig,
    } = this.props;

    const shareDialogSubHeading =
      getSiteId() === 'BuyBuyBaby'
        ? SHARE_DIALOG_SUBHEADING_BABY_LBL
        : SHARE_DIALOG_SUBHEADING_LBL;
    const referredContentData = pathOr(
      null,
      'thankYouListSurpriseData.content',
      this.props
    );

    const registryResVO = pathOr(null, 'registryResVO', registryData);

    const isPublic =
      parseInt(pathOr(1, 'registryVO.isPublic', registryResVO), 10) === 1;

    const signInDetails = {
      editText: SHARE_LABEL_AFTERWARD_LBL,
    };

    const renderEditRegistry = () => {
      return (
        <RenderEditRegistryLink
          key={3}
          registryID={registryId}
          signInDetails={signInDetails}
          isPublic="0"
          fromGiftTracker
          customLabel={SHARE_LABEL_AFTERWARD_LBL}
          eventType={eventType}
          eventTypeCode={eventTypeCode}
          dynamicContentState={labelData}
          registryConfig={registryConfig}
        />
      );
    };

    if (!registryData) {
      return false;
    }

    const DangerousHTML = dangerousHTML(DangerousHTML);

    return this.props.isNewDashboard ? (
      this.renderGiftTrackerEmpty(renderEditRegistry, isPublic)
    ) : (
      <React.Fragment>
        {!isMobile.isMobileScreen && (
          <Cell className={classnames(styles.thankYouListText, 'px4')}>
            <Heading
              level={3}
              className="grid-container"
              data-locator={
                'registry-createdregistry-landingpage-thankyoutab-header'
              }
            >
              {THANK_YOU_LIST_LBL}
            </Heading>
          </Cell>
        )}
        <div className={classnames(styles.sendThankYouWrapper, 'px3')}>
          <Heading
            level={2}
            styleVariation={'h2-serif'}
            id="thankYouHeading"
            className={
              ('sm-mb0 sm-pt0 sm-pb2 sm-pl4 sm-pr4 mb3', styles.headingText)
            }
          >
            <DangerousHTML>
              {(referredContentData &&
                referredContentData[headingId] &&
                referredContentData[headingId].body) ||
                SHARE_DIALOG_HEADING_LBL}
            </DangerousHTML>
          </Heading>
          <Paragraph
            className={classnames(
              'cell mx-auto mt0 mb3 sm-pl3 sm-pr3',
              styles.subtitle
            )}
          >
            <DangerousHTML>
              {(referredContentData &&
                referredContentData[descriptionId] &&
                referredContentData[descriptionId].body) ||
                shareDialogSubHeading}
            </DangerousHTML>
          </Paragraph>
          <ShareRegistry {...this.props} />
          {!isPublic ? (
            <Paragraph
              className={classnames(
                'mx-auto',
                styles.makeRegistryPublic,
                'mt0 sm-mt0 sm-mb0'
              )}
            >
              <Icon
                type={'curved-arrow'}
                className={styles.curvedArrow}
                height="44px"
                width="44px"
              />
              {SHARE_LABEL_FOREWARD_LBL}
              {renderEditRegistry()}
            </Paragraph>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default ThankYouEmpty;
