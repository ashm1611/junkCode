import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import qs from 'qs';
import { isEmpty, debounce } from 'lodash';
import GridX from '@bbb-app/core-ui/grid-x';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import Styles from './RegistryAnalyzer.css';
import '../../../../../assets/icons/analyzer.svg';
import RegistryAnalyzerModal from './RegistryAnalyzerModal.lazy.async';
import { REG_ANALYZER_HEADING_LBL, ANALYZE_REGISTRY_LBL } from './constants';

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
  registryDetails: PropTypes.object.isRequired,
  getRegAnalyzerDetails: PropTypes.func,
  hasRegAnalyzerBtnShown: PropTypes.bool,
  isItemsFetching: PropTypes.bool,
  isRemainingItemFetching: PropTypes.bool,
};

/**
 * RegistryAnalyzer Component
 *  A React Class which take care to show 'Analyze My Registry' button and on click of it, a modal will be open
 *  to show the price ranges with recommended vs added items in the current registry.
 *
 * @author agoel36
 *
 */
class RegistryAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnalyzerClick = this.handleAnalyzerClick.bind(this);
    this.fetchRegAnalyzerData = this.fetchRegAnalyzerData.bind(this);
    this.scrollEvent = debounce(this.scrollEventhandler, 150);
    this.scrollEvent = this.scrollEvent.bind(this);
    this.state = {
      modalMountedState: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const query = this.getQueryparmas();
    const { isItemsFetching, isRemainingItemFetching } = nextProps;
    if (
      query.action === 'analyzer' &&
      !this.state.modalMountedState &&
      !(this.props.isItemsFetching && !isItemsFetching) &&
      !isItemsFetching &&
      !isRemainingItemFetching
    ) {
      this.setModalMountedState();
    }
  }

  getQueryparmas() {
    const locationSearch = pathOr('', 'search', location);
    const queryParams = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    return queryParams;
  }

  setModalMountedState = () => {
    this.fetchRegAnalyzerData();
    this.setState({ modalMountedState: true });
  };

  /**
   * fetchRegAnalyzerData
   *  will dispatch a function `getRegAnalyzerDetails` to fetch registry analyzer data based on the current regId, regType and numberOdGuests
   */
  fetchRegAnalyzerData() {
    this.props.getRegAnalyzerDetails(this.props.registryDetails);
  }

  /**
   * handleAnalyzerClick
   *  trigger `fetchRegAnalyzerData` method
   *  Sets modal mounted state to true.
   */
  handleAnalyzerClick = e => {
    e.preventDefault();
    this.setModalMountedState();
  };

  scrollEventhandler() {
    this.setState({
      callTooltipHide: true,
    });
  }

  /**
   * toggleModalState
   *  Toggles the state of analyzer modal
   *
   * @param {boolean} state State of modal
   */
  toggleModalState = state => {
    if (!state) {
      const queryParams = this.getQueryparmas();
      if (!isEmpty(queryParams)) {
        delete queryParams.action;
        const toLocation = `${location.pathname}?${qs.stringify(queryParams)}${
          location.hash
        }`;
        window.history.replaceState(null, null, toLocation);
      }
    }
    this.setState({ modalMountedState: state });
  };

  /**
   * renderRegistryAnalyzerModal
   *  renders modal for registry analyzer
   *
   *  1. render Heading and Intro statement always
   *  2. if `isRegAnalyzerFetching` is true then show the loading state i.e. skeleton
   *  3. if `isRegAnalyzerFetching` is false and `regAnalyzerData` is available then show the scorecard
   *  4. if `isRegAnalyzerFetching` is false and `regAnalyzerData` is not available then show the error view
   */
  renderRegistryAnalyzerModal() {
    return (
      <ModalDialog
        mountedState={this.state.modalMountedState}
        toggleModalState={this.toggleModalState}
        titleAriaLabel={REG_ANALYZER_HEADING_LBL}
        variation="large"
        closeIconShow
        scrollDisabled
        verticallyCenter
        onScrollCallback={this.scrollEvent}
      >
        <RegistryAnalyzerModal
          {...this.props}
          callTooltipHide={this.state.callTooltipHide}
        />
      </ModalDialog>
    );
  }

  /**
   * renderMyAnalyzrTextWithIcon
   *  analyzer icon and text will display and on click of it, a modal will open to display the scorecard
   *  if an API call is succesfull.
   */
  renderMyAnalyzrTextWithIcon() {
    return (
      <GridX
        className={classnames(
          'center hideOnPrint',
          Styles.analyzeWrapper,
          'pt1',
          'pb1'
        )}
        data-locator="registry-analyzebtn"
      >
        <PrimaryLink
          onClick={this.handleAnalyzerClick}
          href="#"
          iconProps={{
            type: 'analyzer',
            width: '27px',
            height: '24px',
          }}
          variation="primaryColoredIcon"
        >
          {ANALYZE_REGISTRY_LBL}
        </PrimaryLink>
      </GridX>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.hasRegAnalyzerBtnShown &&
          this.renderMyAnalyzrTextWithIcon()}
        {this.renderRegistryAnalyzerModal()}
      </React.Fragment>
    );
  }
}

RegistryAnalyzer.propTypes = propTypes;

export default RegistryAnalyzer;
