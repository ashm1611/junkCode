import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isArray } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Image from '@bbb-app/core-ui/image';
import BarChart from '@bbb-app/core-ui/bar-chart';
import Skeleton from './Skeleton';
import {
  REGISTRY_ANALYZER_DATA_LOCATOR,
  BAR_COLOR_PALETTE,
  BAR_TRACK_COLOR,
  ACTION_TYPE,
  TEALIUM_PAGE_INFO,
  REG_ANALYZER_HEADING_LBL,
  REG_ANALYZER_ERROR_MSZ_LBL,
  REG_ANALYZER_ERROR_BTN_LBL,
  REG_ANALYZER_ADD_MORE_BTN_LBL,
  REG_ANALYZER_TOOLTIP_ADDED_TXT_LBL,
  REG_ANALYZER_TOOLTIP_LEFT_TO_ADD_TXT_LBL,
  REG_ANALYZER_INTRO_STATEMENT_LBL,
  REG_ANALYZER_TOOLTIP_RECOMMENDED_TXT_LBL,
} from './constants';
import Styles from './RegistryAnalyzerModal.css';
import RegistryAnalyzerTealiumHandler from '../../../../../containers/ThirdParty/Tealium/Registry/RegistryAnalyzerTealiumHandler';
import '../../../../../assets/icons/analyzer.svg';

/**
 * @param {bool} isMobile - isMobile or not
 * @param {object} registryDetails - registry details data
 * @param {func} getRegAnalyzerDetails - function to dispatch `fetchRegAnalyzerData` action
 * @param {bool} isRegAnalyzerFetching - while registry analyzer API fetching the data
 * @param {bool} hasRegAnalyzerBtnShown - to show/hide registry analyzer text and icon on registry details of owner page
 * @param {object} regAnalyzerData - registry analyzer data which contains the `priceRangeList` array of objects
 * @param {string} contextPath - context path i.e. `/store`
 */
const propTypes = {
  isMobile: PropTypes.bool,
  registryDetails: PropTypes.object.isRequired,
  getRegAnalyzerDetails: PropTypes.func,
  isRegAnalyzerFetching: PropTypes.bool,
  regAnalyzerData: PropTypes.any,
  contextPath: PropTypes.string,
  handleTealiumAction: PropTypes.func,
  setFromAnalyzerTealium: PropTypes.func,
  callTooltipHide: PropTypes.bool,
};

/**
 * RegistryAnalyzer Component
 *  A React Class which take care to show 'Analyze My Registry' button and on click of it, a modal will be open
 *  to show the price ranges with recommended vs added items in the current registry.
 *
 * @author agoel36
 *
 */
class RegistryAnalyzerModal extends React.Component {
  constructor(props) {
    super(props);
    this.fetchRegAnalyzerData = this.fetchRegAnalyzerData.bind(this);
    this.handleTealiumEvent = this.handleTealiumEvent.bind(this);
  }

  /**
   * fetchRegAnalyzerData
   *  will dispatch a function `getRegAnalyzerDetails` to fetch registry analyzer data based on the current regId, regType and numberOdGuests
   */
  fetchRegAnalyzerData() {
    this.props.getRegAnalyzerDetails(this.props.registryDetails);
  }

  /**
   * barChart
   *  to dispay the bar chart with tooltip
   */
  barChart(score, index) {
    let currentBarColor = BAR_COLOR_PALETTE[index];
    let CLASS_NAME;
    let PERCENTAGE;
    let CAL_PERCENTAGE;

    if (score.recommendedNoOfGifts === 0) {
      PERCENTAGE = 0;
    } else {
      /* eslint-disable extra-rules/no-commented-out-code */
      PERCENTAGE = (score.addedNoOfGifts / score.recommendedNoOfGifts) * 100;
      // PERCENTAGE = 60;
    }

    if (PERCENTAGE >= 100) {
      // if 'percentage' calculation is greater then or equal to 100, then set to '100'
      CAL_PERCENTAGE = 100;
      CLASS_NAME = Styles.barFull;
    } else if (PERCENTAGE > 95 && PERCENTAGE < 100) {
      // if 'percentage' calculation is less then 100 and greater then 95, then set to '96'
      // (reason being that the info-icon in mobile on edge of the bar is not proper if bar width is greater than 95%)
      CAL_PERCENTAGE = 96;
      CLASS_NAME = Styles.barFill;
    } else if (PERCENTAGE > 0 && PERCENTAGE < 10) {
      // if 'percentage' calculation is less then 10 and greater then 0, then set to '9'
      // (reason being that the info-icon in mobile on edge of the bar is not proper if bar width is less than 10%)
      CAL_PERCENTAGE = 9;
      CLASS_NAME = Styles.barFill;
    } else if (PERCENTAGE === 0) {
      // if 'percentage' calculation is equal to 0, then set `CAL_PERCENTAGE` to 100% and also change the color similar to track color
      // (reason being that we need to show the info-icon in mobile to the center of the bar)
      CAL_PERCENTAGE = 100;
      currentBarColor = BAR_TRACK_COLOR;
      CLASS_NAME = Styles.barEmpty;
    } else {
      // if 'percentage' calculation is between 10 to 95, then set `CAL_PERCENTAGE` equal to `PERCENTAGE` calculated
      CAL_PERCENTAGE = PERCENTAGE;
      CLASS_NAME = Styles.barFill;
    }

    // bar tooltip information
    const dataToolTip = {
      dataTip: this.toolTipContainer(score, index),
      dataFor: `scorecard-${index}`,
      dataType: 'info',
      dataPlace: 'bottom',
    };

    return (
      <React.Fragment>
        <BarChart
          barChartWrapperClassName={classnames(Styles.barChartWrapper)}
          progressFillClassName={classnames(CLASS_NAME, Styles.progressFill)}
          toolTipIconClassName={classnames(Styles.toolTipIcon)}
          barWidth={`${CAL_PERCENTAGE}%`}
          barColor={currentBarColor}
          displayToolTip
          displayToolTipIcon
          dataToolTip={dataToolTip}
          isMobile={this.props.isMobile}
          callTooltipHide={this.props.callTooltipHide}
        >
          {PERCENTAGE >= 100 && (
            <Image
              className={classnames(Styles.imgGoodJob)}
              src="/static/assets/images/good-job.png"
            />
          )}
        </BarChart>
      </React.Fragment>
    );
  }

  /**
   * toolTipContainer
   *  to dispay the tooltip information (Recommended items, added so far, left to added)
   *  when user hovers over the bar in DESKTOP
   *  and when user clicks on the info-icon in MOBILE
   */
  toolTipContainer(score, index) {
    const DL_TOOLTIP = `${REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerToolTip}-${index}`;
    const IS_LESS_OR_EQUAL_ZERO = score.remainingItems <= 0;

    return (
      <div data-locator={DL_TOOLTIP} className={Styles.innerWidthTooltip}>
        <div className={classnames(Styles.rowWrapperTooltip, 'table')}>
          <div
            className={classnames(
              Styles.leftContentTooltip,
              'table-cell small-9'
            )}
          >
            <span>{REG_ANALYZER_TOOLTIP_RECOMMENDED_TXT_LBL}</span>
          </div>
          <div
            className={classnames(
              Styles.rightContentTooltip,
              'table-cell small-3 right-align'
            )}
          >
            <strong>{score.recommendedNoOfGifts}</strong>
          </div>
        </div>
        <div className={classnames(Styles.rowWrapperTooltip, 'table')}>
          <div
            className={classnames(
              Styles.leftContentTooltip,
              'table-cell small-9'
            )}
          >
            <span>{REG_ANALYZER_TOOLTIP_ADDED_TXT_LBL}</span>
          </div>
          <div
            className={classnames(
              Styles.rightContentTooltip,
              'table-cell small-3 right-align'
            )}
          >
            <strong>{score.addedNoOfGifts}</strong>
          </div>
        </div>
        {!IS_LESS_OR_EQUAL_ZERO && (
          <div
            className={classnames(
              Styles.rowWrapperTooltip,
              Styles.remainingItemsTooltip,
              'table pt1 mt1'
            )}
          >
            <div
              className={classnames(
                Styles.leftContentTooltip,
                'table-cell small-9 align-middle'
              )}
            >
              <span>{REG_ANALYZER_TOOLTIP_LEFT_TO_ADD_TXT_LBL}</span>
            </div>
            <div
              className={classnames(
                Styles.rightContentTooltip,
                'table-cell small-3 right-align'
              )}
            >
              <strong>{score.remainingItems}</strong>
            </div>
          </div>
        )}
      </div>
    );
  }

  handleTealiumEvent() {
    const { handleTealiumAction, setFromAnalyzerTealium } = this.props;
    const NON_CROSS_SELL = 'non-cross sell';
    const NON_BROWSE = 'non-browse';
    const REGISTRY_ANALYZER = 'Registry Analyzer';
    const NON_SEARCH = 'non-search';
    const INTERNAL_CAMPAIGN = 'non-internal campaign';
    const tealiumVariable = {
      crossell_page: NON_CROSS_SELL,
      crossell_product: NON_CROSS_SELL,
      internal_search_term: NON_SEARCH,
      merchandising_category: NON_BROWSE,
      merchandising_main_level: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
      navigation_path: '',
      pagename_breadcrumb: REGISTRY_ANALYZER,
      product_finding_method: REGISTRY_ANALYZER,
      internal_campaign: INTERNAL_CAMPAIGN,
    };
    if (handleTealiumAction) {
      handleTealiumAction(
        ACTION_TYPE,
        tealiumVariable,
        TEALIUM_PAGE_INFO.page_name
      );
    }
    if (typeof setFromAnalyzerTealium === 'function') {
      setFromAnalyzerTealium(true);
    }
  }

  /**
   * renderHeaderView
   *  to dispay the heading and info statement in Modal popup
   */
  renderHeaderView() {
    return (
      <div className="mb3">
        <Heading
          data-locator={REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerHeading}
          level={2}
          styleVariation="h2-serif"
          className={classnames('sm-center mb1')}
        >
          {REG_ANALYZER_HEADING_LBL}
        </Heading>
        <p
          data-locator={
            REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerIntroStatement
          }
          className={classnames(Styles.introWrapper, 'sm-center mt0')}
        >
          {REG_ANALYZER_INTRO_STATEMENT_LBL}
        </p>
      </div>
    );
  }

  /**
   * renderLoadingView
   *  to dispay the registry analyzer skeleton view
   */
  renderLoadingView() {
    return (
      <div className={classnames(Styles.loadingWrapper, 'center')}>
        <Skeleton />
      </div>
    );
  }

  /**
   * renderErrorView
   *  to dispaly the error message if API fails or when unexpected errron occurs
   */
  renderErrorView() {
    return (
      <div className={classnames(Styles.errorMszWrapper, 'center')}>
        <span className="mr1">{REG_ANALYZER_ERROR_MSZ_LBL}</span>
        <Button
          theme="ghost"
          variation="noHorizontalPadding"
          onClick={this.fetchRegAnalyzerData}
        >
          <span>{REG_ANALYZER_ERROR_BTN_LBL}</span>
        </Button>
      </div>
    );
  }

  /**
   * renderScorecardView
   *  to diaplay the pricerangelist with button to navigate to the particular search/category page coming from the API response
   *  to display the horizontal bar-chart of recommended vs added items in the registry
   */
  renderScorecardView() {
    const scorecardPriceList = pathOr(
      null,
      'priceRangeList',
      this.props.regAnalyzerData
    );
    // if `priceRangeList` is null or undefined or not an array
    if (!scorecardPriceList && !isArray(scorecardPriceList)) {
      return this.renderErrorView();
    }

    const scorecard = scorecardPriceList.map((score, index) => {
      const PAGE_URL = `${this.props.contextPath}${score.addMoreLink}`;
      const DL_PRICE_RANGE = `${REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerPriceRange}-${index}`;
      const DL_BAR = `${REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerProgressBar}-${index}`;
      const DL_BUTTON = `${REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerAddMoreBtn}-${index}`;

      return (
        <GridX key={index} className={classnames(Styles.scorecardWrapper)}>
          <Cell className={classnames('large-2 small-12 sm-mb2')}>
            <Heading
              level={3}
              data-locator={DL_PRICE_RANGE}
              className={classnames(Styles.scorecardPrice)}
            >
              {score.displayString}
            </Heading>
          </Cell>
          <Cell
            data-locator={DL_BAR}
            className={classnames(
              Styles.scorecardBarWrapper,
              'large-8 small-12 sm-mb2 md-pr4 md-pl3'
            )}
          >
            {this.barChart(score, index)}
          </Cell>
          <Cell
            className={classnames(
              Styles.scorecardBtnWrapper,
              'large-2 small-12'
            )}
          >
            <Button
              data-locator={DL_BUTTON}
              theme="ghost"
              textDecoration="textDecorationNone"
              variation="noHorizontalPadding"
              href={PAGE_URL}
              className={classnames(Styles.addMoreBtnMob, 'md-hide lg-hide')}
              onClick={() => this.handleTealiumEvent()}
            >
              {REG_ANALYZER_ADD_MORE_BTN_LBL}
            </Button>
            <Button
              data-locator={DL_BUTTON}
              theme="secondaryStrokeBasic"
              textDecoration="textDecorationNone"
              variation="fullWidth"
              href={PAGE_URL}
              className={classnames(Styles.addMoreBtn, 'xs-hide sm-hide')}
              onClick={() => this.handleTealiumEvent()}
            >
              {REG_ANALYZER_ADD_MORE_BTN_LBL}
            </Button>
          </Cell>
        </GridX>
      );
    });

    return (
      <div
        data-locator={
          REGISTRY_ANALYZER_DATA_LOCATOR.regAnalyzerScoreCardSection
        }
      >
        {scorecard}
      </div>
    );
  }

  /**
   * renderRegistryAnalyzerModal
   *  renders modal for registry analyzer
   *
   *  1. render Heading and Intro statement always
   *  2. if `isRegAnalyzerFetching` is true then show the loading state i.e. skeleton
   *  3. if `isRegAnalyzerFetching` is false and `regAnalyzerData` is available then show the scorecard
   *  4. if `isRegAnalyzerFetching` is false and `regAnalyzerData` is not available then show the error view
   */
  render() {
    return (
      <React.Fragment>
        {this.renderHeaderView()}
        {this.props.isRegAnalyzerFetching && this.renderLoadingView()}
        {!this.props.isRegAnalyzerFetching &&
          this.props.regAnalyzerData &&
          this.renderScorecardView()}
        {!this.props.isRegAnalyzerFetching &&
          !this.props.regAnalyzerData &&
          this.renderErrorView()}
        {this.props.isRegAnalyzerFetching ? (
          <RegistryAnalyzerTealiumHandler />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

RegistryAnalyzerModal.propTypes = propTypes;

export default RegistryAnalyzerModal;
