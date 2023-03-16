import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import pathOr from 'lodash/fp/pathOr';

import { triggerTealiumEvent } from '@bbb-app/actions/tealium/triggerTealiumEvent';
import toJS from '@bbb-app/hoc/toJS';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { makeSelectRepos } from '@bbb-app/selectors/appSelectors';
import { setTealiumRegistryAnalyzer } from '@bbb-app/tealium/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import {
  makeSelectIsMobileScreen,
  makeSelectSiteConfig,
} from '@bbb-app/selectors/configSelector';

import RegistryAnalyzerComponent from '../../../../components/Pages/Registry/RegistryOwner/RegistryAnalyzer';
import { shownRegistryMyAnalyzerBtn } from '../RegistryOwner/RegistryDetailsSagaInjection';
import { fetchRegAnalyzerData } from './actions';
import { REGISTRY_ANALYZER_STATE_KEY } from './constants';
import {
  makeSelectRegAnalyzerShownBtn,
  makeSelectIsRegAnalyzerFetching,
  makeSelectRegAnalyzerError,
  makeSelectRegAnalyzerData,
} from './selectors';
import {
  selectCloseModalFlag,
  getItemsFetchingStatus,
  getRemainingItemFetchingStatus,
} from '../RegistryOwner/selectors';
import { getContextPath } from '../../../Search/selectors';
import reducer from './reducer';
import saga from './sagas';

/*
 * @param {func} disableMyAnalyzerBtn - function which will dispatch `shownRegistryMyAnalyzerBtn(false)` to set reduxt state to false.
 */
const propTypes = {
  disableMyAnalyzerBtn: PropTypes.func,
};

/**
 * RegistryAnalyzer Container
 *  A React Class which take care to dispatch `disableMyAnalyzerBtn` when component unmounts.
 *  This will also responsible to show 'Analyze My Registry' button and on click of it, a modal will be open
 *  to show the price ranges with recommended vs added items in the current registry.
 *
 * @author agoel36
 *
 * @see RegistryAnalyzerComponent
 *
 */
export class RegistryAnalyzer extends React.PureComponent {
  static getDerivedStateFromProps(props) {
    props.disableMyAnalyzerBtn(true);
  }
  componentWillUnmount() {
    this.props.disableMyAnalyzerBtn(false);
  }

  render() {
    return (
      <ErrorBoundary>
        <RegistryAnalyzerComponent {...this.props} />
      </ErrorBoundary>
    );
  }
}

RegistryAnalyzer.propTypes = propTypes;

/**
 * @param {bool} hasRegAnalyzerBtnShown - to show/hide registry analyzer text and icon on registry details of owner page
 * @param {bool} isRegAnalyzerFetching - while registry analyzer API fetching the data
 * @param {object || string} regAnalyzerError - error while fetching the registry analyzer data
 * @param {object} regAnalyzerData - registry analyzer data which contains the `priceRangeList` array of objects
 * @param {object} regSiteConfig - `registry` site config
 * @param {object} labels - `registryDetails` labels
 * @param {string} contextPath - context path i.e. `/store`
 */
export const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobileScreen,
  hasRegAnalyzerBtnShown: makeSelectRegAnalyzerShownBtn(),
  isRegAnalyzerFetching: makeSelectIsRegAnalyzerFetching(),
  regAnalyzerError: makeSelectRegAnalyzerError(),
  regAnalyzerData: makeSelectRegAnalyzerData(),
  regSiteConfig: makeSelectSiteConfig(['registry']),
  contextPath: getContextPath,
  closeModalFlag: selectCloseModalFlag(),
  location: makeSelectRepos(),
  isItemsFetching: getItemsFetchingStatus(),
  isRemainingItemFetching: getRemainingItemFetchingStatus(),
});

/**
 * @param {func} getRegAnalyzerDetails - function to dispatch `fetchRegAnalyzerData` action
 * @param {func} disableMyAnalyzerBtn - function to dispatch `shownRegistryMyAnalyzerBtn` action

 */
export const mapDispatchToProps = dispatch => {
  return {
    getRegAnalyzerDetails(registryDetails) {
      const regId = pathOr(null, 'registryVO.registryId', registryDetails);
      const regType = pathOr(
        null,
        'registryVO.registryType.registryTypeName',
        registryDetails
      );
      const numberOfGuests = pathOr(
        null,
        'registryVO.event.guestCount',
        registryDetails
      );
      dispatch(fetchRegAnalyzerData(regId, regType, numberOfGuests));
    },

    disableMyAnalyzerBtn(value) {
      dispatch(shownRegistryMyAnalyzerBtn(value));
    },
    handleTealiumAction(actionType, tealiumInfo, pageName) {
      dispatch(triggerTealiumEvent(actionType, tealiumInfo, pageName));
    },
    setFromAnalyzerTealium(value) {
      dispatch(setTealiumRegistryAnalyzer(value));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: REGISTRY_ANALYZER_STATE_KEY,
  reducer,
});
const withSaga = injectSaga({ key: REGISTRY_ANALYZER_STATE_KEY, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(toJS(RegistryAnalyzer));
