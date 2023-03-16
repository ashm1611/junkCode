import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './GoodyBoxModal.css';
import OpenContainer from '../../../../containers/PureContent/CMPending-OpenContainer/OpenContainer.async';
import getReferredContentId from '../../../../utils/getReferredContentId';
import GoodyBoxProgressBar from './GoodyBoxProgressBar';
import {
  HEADING_LBL,
  SUBHEADING_LBL,
  TEXT_LBL,
  IMAGE_SCENE_7URL_LBL,
} from './constants';

function GoodyBoxModalComponent(props) {
  const { labels, labelsRef, enableCSLabels } = props;
  return (
    <React.Fragment>
      <div
        className={classnames(styles.heading, 'center')}
        data-locator="goodybox-status-model-heading"
      >
        {HEADING_LBL}
      </div>
      <div
        className={styles.twoColumnLayout}
        data-locator="goodybox-status-model-desc"
      >
        <img
          className={classnames('fol', styles.goodyBoxImage)}
          alt={'Goody Box'}
          src={IMAGE_SCENE_7URL_LBL}
          data-locator="Goody-Box-image"
        />
        <div
          className={styles.detailWrapper}
          data-locator="goodybox-status-model-desc-box"
        >
          <div
            className={styles.subHeading}
            data-locator="goodybox-status-model-desc-title"
          >
            {SUBHEADING_LBL}
          </div>
          <div
            className={styles.text}
            data-locator="goodybox-status-model-desc-text"
          >
            {TEXT_LBL}
          </div>
        </div>
      </div>

      <GoodyBoxProgressBar {...props} />

      <div
        className={styles.faqContent}
        data-locator="goodybox-status-model-faq"
      >
        <OpenContainer
          params={{
            id: getReferredContentId(
              enableCSLabels
                ? labelsRef.referredContent
                : labels.referredContent,
              'faqReferredContentID'
            ),
          }}
          isAuthor
        />
      </div>
    </React.Fragment>
  );
}

GoodyBoxModalComponent.propTypes = {
  labels: PropTypes.string,
  labelsRef: PropTypes.object,
  enableCSLabels: PropTypes.bool,
};

export default GoodyBoxModalComponent;
