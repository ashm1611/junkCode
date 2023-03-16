import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import Button from '@bbb-app/core-ui/button';
import calculateOffset from '@bbb-app/utils/calculateOffset';
import RecommendationRow from './RecommendationRow/RecommendationRow';
import styles from './RecommendationRow/Recommendation.css';
import {
  RECOMMENDATION_SORT_RECOMMENDER,
  VIEW_MORE_LBL,
  VIEW_LESS_LBL,
} from '../../constants';
import QuickViewModalWrapper from '../../../../../../containers/QuickViewModal/QuickViewModalWrapper/QuickViewModalWrapper';

class RecommendationList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      showMoreRecommendationsList: false,
    };
  }

  toggleMoreLessRecommendationList = () => {
    const { showMoreRecommendationsList } = this.state;
    this.setState(
      {
        showMoreRecommendationsList: !showMoreRecommendationsList,
      },
      () => {
        if (showMoreRecommendationsList) {
          const viewAllOffsetY = document.getElementById('viewAllRecButton');
          const offset = calculateOffset(viewAllOffsetY);
          window.scrollTo(0, offset.top - 550);
        }
      }
    );
  };

  renderRows = (rowData, index) => {
    const isRowCollection =
      this.props.sortOptionApplied === RECOMMENDATION_SORT_RECOMMENDER;
    const isAssociate =
      isRowCollection && rowData[0] && rowData[0].fromAssociate;
    return [
      isAssociate ? (
        <RecommendationRow
          key={'associate'}
          uniqueIndex={[`${index}_associate`]}
          recommnedationItem={rowData}
          isRowCollection
          isAssociate
          {...this.props}
        />
      ) : (
        rowData.map((recommnedationItem, key) => (
          <RecommendationRow
            key={key}
            uniqueIndex={[`${index}_${key}`]}
            recommnedationItem={recommnedationItem}
            isAssociate={recommnedationItem.fromAssociate}
            {...this.props}
          />
        ))
      ),
    ];
  };

  render() {
    const recommendationList = pathOr({}, 'recommendationList', this.props);
    const { showMoreRecommendationsList } = this.state;
    const enableRecommendListQuickView = pathOr(
      false,
      'switchConfig.enableRecommendListQuickView',
      this.props
    );
    const enableRegistryCollaboration = pathOr(
      false,
      'switchConfig.enableRegistryCollaboration',
      this.props
    );
    let showViewMoreBtn;
    return (
      <React.Fragment>
        <ul className={classnames('grid-container pb15')}>
          {Object.keys(recommendationList).map((listItem, index) => {
            if (recommendationList[listItem]) {
              let recommendationsListData = recommendationList[listItem];
              if (recommendationsListData.length > 3) {
                showViewMoreBtn = true;
              }
              if (enableRegistryCollaboration && !showMoreRecommendationsList) {
                recommendationsListData = recommendationsListData.slice(0, 3);
              }
              return this.renderRows(recommendationsListData, index);
            }
            return null;
          })}
        </ul>
        {enableRegistryCollaboration && showViewMoreBtn && (
          <div
            id="viewAllRecButton"
            className={classnames(styles.viewMoreContainer, 'pb2')}
          >
            <Button
              className={classnames(styles.viewMoreBtn, 'fullWidth fol')}
              dataLocator="registery-recommendation-see-all-cta"
              onClick={this.toggleMoreLessRecommendationList}
            >
              {showMoreRecommendationsList ? VIEW_LESS_LBL : VIEW_MORE_LBL}
            </Button>
          </div>
        )}
        {enableRecommendListQuickView && (
          <QuickViewModalWrapper
            variation="registryQuickView"
            registryId={this.props.registryId}
          />
        )}
      </React.Fragment>
    );
  }
}

RecommendationList.propTypes = {
  registryId: PropTypes.string,
  sortOptionApplied: PropTypes.string,
};

export default RecommendationList;
