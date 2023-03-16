import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './RecommenderLandingWelcomeMsg.css';

export const ShowRecommenderWelcomMessage = props => {
  const { eyebrowText, heading, description } = props;
  return (
    <div className={classnames(styles.landingMsgLayout)}>
      <div
        className={classnames(
          styles.eyebrowText,
          'lg-mb1 sm-mt3 md-mb1 sm-mb3'
        )}
        data-locator={'rg-rl-lg-eyebrow'}
      >{`${eyebrowText} `}</div>
      <div
        className={classnames(styles.heading, 'lg-mb1 sm-mb2 md-mb2')}
        data-locator={'rg-rl-lg-heading'}
      >{`${heading} `}</div>
      <div
        className={classnames(
          styles.description,
          'lg-mb4 sm-mb3 sm-pl1 sm-pr1 md-mb2'
        )}
        data-locator={'rg-rl-lg-desc'}
      >{`${description}`}</div>
    </div>
  );
};

ShowRecommenderWelcomMessage.propTypes = {
  eyebrowText: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default ShowRecommenderWelcomMessage;
