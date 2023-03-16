import React, { useState } from 'react';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Cell from '@bbb-app/core-ui/cell';
import Paragraph from '@bbb-app/core-ui/paragraph';
import IconButton from '@bbb-app/core-ui/icon-button';
import Icon from '@bbb-app/core-ui/icon';
import PrimaryLink from '@bbb-app/core-ui/primary-link/PrimaryLink';
import styles from './LearnMoreMainBanner.css';
import LearnMoreModal from '../../GroupGifting/LearnMoreModal/LearnMoreModal';
import RenderEditRegistryLink from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryWrapper';
import {
  MARKETING_BANNER_DESCRIPTION1_LBL,
  MARKETING_BANNER_LEARNLINK_LBL,
  MARKETING_BANNER_DESCRIPTION2_LBL,
  MARKETING_BANNER_EDIT_LINK_LBL,
} from './constants';

const LearnMoreMainBanner = props => {
  const [mountedState, setMountedState] = useState(false);
  const toggleModalState = () => {
    setMountedState(!mountedState);
  };
  const customLabel = MARKETING_BANNER_EDIT_LINK_LBL;
  const eventDate = pathOr('', 'activeRegistry.eventDate', props);
  const signInDetails = {
    isLoggedIn: props.isLoggedIn,
  };

  return (
    <React.Fragment>
      <GridContainer>
        <Cell
          className={classnames('mb1', props.isCongratsMessage && 'md-pt03')}
        >
          <div className={styles.blueWidget}>
            <Paragraph theme="mediumLight" className="mb0">
              {MARKETING_BANNER_DESCRIPTION1_LBL}{' '}
              <PrimaryLink
                variation="primary"
                type="bold"
                href="#"
                className="mb1"
                onClick={toggleModalState}
              >
                {MARKETING_BANNER_LEARNLINK_LBL}
              </PrimaryLink>{' '}
              <LearnMoreModal
                mountedState={mountedState}
                toggleModalState={toggleModalState}
                isMobile={props.isMobile}
              />{' '}
              <span>{MARKETING_BANNER_DESCRIPTION2_LBL}</span>{' '}
              <RenderEditRegistryLink
                registryID={props.registryID}
                loginLabels={props.loginLabels}
                customLabel={customLabel}
                registryConfig={props.registryConfig}
                dynamicContentState={props.dynamicContentState}
                isMobile={props.isMobile}
                eventType={props.eventType}
                eventTypeCode={props.eventTypeCode}
                eventDate={eventDate}
                signInDetails={signInDetails}
                LearnMoreModalGG
              />
            </Paragraph>
            <IconButton
              size="small"
              aria-label={'close'}
              className={classnames(styles.closeBtn)}
              onClick={props.toggleSuggestionFlyout}
              title="close"
            >
              <Icon height="16px" width="16px" type="close-icon" />
            </IconButton>
          </div>
        </Cell>
      </GridContainer>
    </React.Fragment>
  );
};

LearnMoreMainBanner.propTypes = {
  isMobile: PropTypes.bool,
  toggleSuggestionFlyout: PropTypes.func,
  registryID: PropTypes.any,
  registryConfig: PropTypes.any,
  dynamicContentState: PropTypes.any,
  eventTypeCode: PropTypes.string,
  loginLabels: PropTypes.object,
  isLoggedIn: PropTypes.any,
  eventType: PropTypes.string,
  isCongratsMessage: PropTypes.bool,
};

export default LearnMoreMainBanner;
