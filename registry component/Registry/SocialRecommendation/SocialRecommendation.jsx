import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Instrumentation from '@bbb-app/core-ui/instrumentation';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import BabyRecommendations from '../../AccountRegistries/CreateRegistryWithUsBanner';
import styles from './SocialRecommendation.css';
import { GET_RECOMMENDATIONS_TITLE_LBL } from '../constants';
import { FNF_RECOMMENDATIONS_LBL } from './SocialRecommendationInviteModal/constants';

const SocialRecommendation = ({
  labels,
  data,
  deviceConfig,
  mPulseEnabled,
  switchConfig,
}) => {
  const enableRegistryCollaboration = pathOr(
    false,
    'enableRegistryCollaboration',
    switchConfig
  );
  return (
    <React.Fragment>
      {mPulseEnabled && (
        <Instrumentation
          zoneName={'ux-primary-content-displayed'}
          markName={'ux-text-registry-home-content'}
        />
      )}
      <section
        role="region"
        aria-labelledby="get-recommendations"
        className={styles.recommendationContainer}
      >
        <GridX className={classnames('grid-container')}>
          <Cell className={classnames('pt3 pb2', styles.recommendationHeading)}>
            {enableRegistryCollaboration ? (
              <Heading
                level={1}
                className={classnames(
                  'sm-mb0',
                  styles.FNFRecommendationHeading
                )}
              >
                {FNF_RECOMMENDATIONS_LBL}
              </Heading>
            ) : (
              <Heading level={2}>{GET_RECOMMENDATIONS_TITLE_LBL}</Heading>
            )}
          </Cell>
          <ErrorBoundary>
            {!isEmpty(data) ? (
              <Cell className="small-12 medium-12 large-8 mx-auto my3">
                <BabyRecommendations
                  data={data.components}
                  labels={labels}
                  deviceConfig={deviceConfig}
                  babyRecommendations
                />
              </Cell>
            ) : null}
          </ErrorBoundary>
        </GridX>
      </section>
    </React.Fragment>
  );
};

SocialRecommendation.propTypes = {
  labels: PropTypes.object,
  data: PropTypes.object,
  deviceConfig: PropTypes.object,
  mPulseEnabled: PropTypes.bool,
  switchConfig: PropTypes.object,
};

export default SocialRecommendation;
