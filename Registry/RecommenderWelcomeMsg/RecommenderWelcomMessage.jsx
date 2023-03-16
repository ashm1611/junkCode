import React from 'react';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import ShowRecommenderWelcomMessageComponent from '../../../../components/Pages/Registry/RecommenderLandingWelcomeMsg/RecommenderLandingWelcomeMsg';
import {
  EYEBROW_TEXT_FOR_LOGIN_LBL,
  HEADING_FOR_LOGIN_LBL,
  DESCRIPTION_FOR_LOGIN_LBL,
} from './constants';

export const ShowRecommenderWelcomMessage = () => {
  const eyebrowText = EYEBROW_TEXT_FOR_LOGIN_LBL;
  const heading = HEADING_FOR_LOGIN_LBL;
  const details = DESCRIPTION_FOR_LOGIN_LBL;
  return (
    <ErrorBoundary>
      <ShowRecommenderWelcomMessageComponent
        eyebrowText={eyebrowText}
        heading={heading}
        description={details}
      />
    </ErrorBoundary>
  );
};

export default ShowRecommenderWelcomMessage;
