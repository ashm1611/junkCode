/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GridX from '@bbb-app/core-ui/grid-x';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import styles from './AddDFModal.css';
import DiaperFundQuickAddSection from './DiaperFundQuickAddSection';
import {
  DIAPER_FUND_MODAL_ITEMS_HEADING_LBL,
  DIAPER_FUND_IMAGE_SCENE_7URL_LBL,
} from '../constants';
import OpenContainer from '../../../../containers/PureContent/CMPending-OpenContainer/OpenContainer';

const DIAPER_FUND_MODAL_HEADING_LBL = `What's a Diaper Fund?`;
const DangerousHTMLWrapper = props => <span {...props} />;
const DangerousHTMLContainer = dangerousHTML(DangerousHTMLWrapper);
export class AddDFModal extends React.PureComponent {
  render() {
    const { diaperFundProducts, referredContentData } = this.props;
    return (
      <ErrorBoundary>
        <React.Fragment>
          <h1 className={classnames('pt2', styles.diaperFundHeading)}>
            {DIAPER_FUND_MODAL_HEADING_LBL}
          </h1>
          <GridX>
            <div
              className={classnames('large-6 small-12 pt2', styles.imageStyle)}
            >
              <img
                className={classnames(styles.imageContainer)}
                alt={'Diaper Fund name'}
                src={DIAPER_FUND_IMAGE_SCENE_7URL_LBL}
                data-locator="diaper_productImage"
              />
            </div>
            <div className={classnames('large-6')}>
              <p className={classnames(styles.description)}>
                <DangerousHTMLContainer>
                  {referredContentData && referredContentData.body}
                </DangerousHTMLContainer>
              </p>
            </div>
          </GridX>
          <section />
          <div>
            <h1 className={classnames('mb3 mt3', styles.diaperFundHeading)}>
              {DIAPER_FUND_MODAL_ITEMS_HEADING_LBL}
            </h1>
          </div>
          {diaperFundProducts && diaperFundProducts.length > 2 && (
            <DiaperFundQuickAddSection
              isFetching={false}
              isMobile={false}
              enableQuickAdd
              diaperFundProducts={diaperFundProducts}
              {...this.props}
            />
          )}
          <div className={classnames('')}>
            <OpenContainer
              params={{
                id: this.props.faqReferredContentID,
              }}
              isDpfclassName={styles.faqlabel}
              isfromDpf
              isAuthor
            />
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}
AddDFModal.propTypes = {
  diaperFundProducts: PropTypes.object,
  referredContentData: PropTypes.object,
  faqReferredContentID: PropTypes.string,
};
export default AddDFModal;
