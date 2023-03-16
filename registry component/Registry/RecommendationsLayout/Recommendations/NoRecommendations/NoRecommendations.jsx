import React from 'react';
import classnames from 'classnames';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import styles from './NoRecommendation.css';
import {
  NO_NEW_RECOMMENDATION_LBL,
  NO_NEW_RECOMMENDATION_TXT_LBL,
} from '../../../constants';

const NoRecommendation = () => ({
  render() {
    return (
      <div className={classnames('py4', styles.emptyRecommendation)}>
        <Heading level={1} className={classnames('center')}>
          {NO_NEW_RECOMMENDATION_LBL}
        </Heading>
        <Paragraph className={classnames('center', styles.socRecContent)}>
          {NO_NEW_RECOMMENDATION_TXT_LBL}
        </Paragraph>
      </div>
    );
  },
});

export default NoRecommendation;
