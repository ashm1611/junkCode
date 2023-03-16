import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import toJS from '@bbb-app/hoc/toJS';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { BabyMultiplesComponent } from '../../../../../components/Pages/Registry/CreateRegistry/Components/FormComponents/BabyMultiplesComponent';

export class BabyMultiples extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.object,
    referredContent: PropTypes.object,
    fetchContent: PropTypes.func,
    updateState: PropTypes.func,
    isMobile: PropTypes.bool,
    isCreateMode: PropTypes.bool,
    styles: PropTypes.object,
    stateObj: PropTypes.object,
    babyGender: PropTypes.string,
    eventType: PropTypes.string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { labels, fetchContent } = props;

    const referredContent = labels.referredContent;
    this.contentId = null;
    this.isContentAvaible = false;
    const referedContentKey = 'babyMultiplesPersonas';
    /* istanbul ignore else  */
    if (referredContent) {
      referredContent.forEach(obj => {
        /* istanbul ignore else  */
        if (obj.key === referedContentKey) {
          this.contentId = obj.id;
          this.isContentAvaible = true;
        }
      });
    }
    /* istanbul ignore else  */
    if (this.isContentAvaible) {
      fetchContent([this.contentId]);
    }
  }

  getSurveyComponentContent() {
    const { referredContent } = this.props;
    let surveyComponentContent;
    /* istanbul ignore else  */
    if (
      this.contentId &&
      referredContent.content &&
      referredContent.content[this.contentId]
    ) {
      surveyComponentContent = referredContent.content[this.contentId];
    }
    return surveyComponentContent || {};
  }

  render() {
    const {
      isMobile,
      styles,
      updateState,
      stateObj,
      isCreateMode,
      babyGender,
      eventType,
    } = this.props;
    /* istanbul ignore else  */
    if (!this.contentId) {
      return null;
    }
    return (
      <ErrorBoundary>
        <BabyMultiplesComponent
          surveyComponentContentObj={this.getSurveyComponentContent()}
          isContentAvaible={this.isContentAvaible}
          isMobile={isMobile}
          styles={styles}
          updateState={updateState}
          stateObj={stateObj}
          isCreateMode={isCreateMode}
          babyGender={babyGender}
          eventType={eventType}
        />
      </ErrorBoundary>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  referredContent: makeSelectContent(),
});

export const mapDispatchToProps = dispatch => ({
  fetchContent(contentId) {
    dispatch(fetchReferredContent(contentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(BabyMultiples));
