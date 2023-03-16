import React from 'react';
import PropTypes from 'prop-types';
import Img from '@bbb-app/core-ui/image';
import GridX from '@bbb-app/core-ui/grid-x';
import Cell from '@bbb-app/core-ui/cell';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import Heading from '@bbb-app/core-ui/heading';
import pathOr from 'lodash/fp/pathOr';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import styles from './ThankYouScreenComponent.css';
const propTypes = {
  dynamicData: PropTypes.object,
};
const ThankYouScreenComponent = props => {
  const imgPath = pathOr('', 'ggSuccessImg.src', props.dynamicData);
  const PAGENAME_BREADCRUMB = 'Registry>Cash Fund>Cash Create Success Page';
  const TEALIUM_PAGE_INFO = {
    page_name: PAGENAME_BREADCRUMB,
    page_type: 'Registry',
  };
  const pageData = {
    pagename_breadcrumb: PAGENAME_BREADCRUMB,
    page_name: PAGENAME_BREADCRUMB,
    channel: 'Registry',
    navigation_path: 'Cash Fund',
    subnavigation_path: 'Cash Fund',
  };
  const ggSuccessHeading = pathOr('', 'ggSuccessHeading', props.dynamicData);
  const ggSuccessSubcopy = pathOr('', 'ggSuccessSubcopy', props.dynamicData);
  return (
    <React.Fragment>
      <TealiumHandler
        identifier="Cash Create Success Page"
        tealiumPageInfo={TEALIUM_PAGE_INFO}
        utagData={pageData}
      />
      <div className={styles.mainContainer}>
        <div className={styles.main}>
          <GridX>
            <Cell className={styles.image}>
              <Img
                src={getRectifiedURLFromScene7URL(imgPath)}
                height={'100px'}
                width={'100px'}
              />
            </Cell>
            <Cell>
              <Heading level={6} className={styles.heading}>
                {ggSuccessHeading}
              </Heading>
              <div className={styles.subDiv}>{ggSuccessSubcopy}</div>
            </Cell>
          </GridX>
        </div>
      </div>
    </React.Fragment>
  );
};

ThankYouScreenComponent.propTypes = propTypes;
export default ThankYouScreenComponent;
