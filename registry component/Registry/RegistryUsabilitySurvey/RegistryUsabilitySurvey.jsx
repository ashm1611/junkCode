import React, { useState } from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';
import Heading from '@bbb-app/core-ui/heading';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import IconButton from '@bbb-app/core-ui/icon-button';
import { isBrowser, getCurrentSiteIdAtBrowser } from '@bbb-app/utils/common';
import { LocalStorageUtil } from '@bbb-app/utils/localStorage';
import Icon from '@bbb-app/core-ui/icon/Icon';
import '../../../../assets/icons/thumbs-down.svg';
import styles from './RegistryUsabilitySurvey.css';

/**
 * RegistryUsabilitySurvey: This component is for display registry survey modal on registry owner
 * @param {string} registryId props is passed for survey link and storing the value in local storage
 * @param {string} surveyHeading prop is passed for survey modal heading label
 */

const RegistryUsabilitySurvey = ({ registryId, surveyHeading }) => {
  const [showSurvey, handleSurveyModal] = useState(true);
  /**
   * Used LocalStorageUtil common function to store and retrive the value from local storage
   */
  const localStorageUtil = new LocalStorageUtil(isBrowser());

  /**
   * Below we added the baby site check because there was a change in requirements for baby site
   * Note: We will have to add check for Baby TBS site if we decided to launch this on baby TBS site
   * Currently we are not addding baby TBS check as this is not in requirment
   */
  const isBabySite = getCurrentSiteIdAtBrowser() === 'BuyBuyBaby';

  const closeSurveyModal = () => {
    localStorageUtil.saveItem(`surveyPresentedFor_${registryId}`, true);
    handleSurveyModal(false);
  };

  const thumbsUpDownOnClick = event => {
    if (isBrowser()) window.OOo.inlineFeedbackShow(event);
    closeSurveyModal();
  };

  const surveyPresented = localStorageUtil.getItem(
    `surveyPresentedFor_${registryId}`
  );

  return surveyPresented !== 'true' && showSurvey ? (
    <div
      className={classnames(
        styles.surveyContainer,
        isBabySite && styles.surveyContainerBaby
      )}
    >
      <IconButton
        className={styles.closeSurveyCTA}
        onClick={closeSurveyModal}
        data-locator={'registry-survey-close-button'}
        aria-label={'close-registry-survey'}
      >
        <Icon height="16px" width="16px" type="close-icon" />
      </IconButton>
      <Heading
        className={classnames(
          styles.surveyHeading,
          isBabySite && styles.surveyHeadingBaby
        )}
        level={1}
      >
        {surveyHeading}
      </Heading>

      <HyperLink
        href="#"
        className={classnames(
          styles.surveyButtons,
          isBabySite && styles.babySurveyButtons,
          styles.thumbsUpSurveyButton
        )}
        id="thumbsUpLink"
        onClick={thumbsUpDownOnClick}
        target={'_blank'}
        aria-label={'thumbs-up-survey-button'}
        data-locator={'thumbs-up-survey-button-link'}
      >
        <Icon height="110px" width="110px" type={'thumbs-down'} />
      </HyperLink>
      <HyperLink
        href="#"
        className={classnames(
          styles.surveyButtons,
          isBabySite && styles.babySurveyButtons
        )}
        id="thumbsDownLink"
        onClick={thumbsUpDownOnClick}
        target={'_blank'}
        aria-label={'thumbs-down-survey-button'}
        data-locator={'thumbs-down-survey-button-link'}
      >
        <Icon height="110px" width="110px" type={'thumbs-down'} />
      </HyperLink>
    </div>
  ) : null;
};

RegistryUsabilitySurvey.propTypes = {
  registryId: string,
  surveyHeading: string,
};

export default RegistryUsabilitySurvey;
