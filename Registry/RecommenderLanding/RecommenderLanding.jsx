import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import qs from 'qs';
import pathOr from 'lodash/fp/pathOr';
import { isGuestUser } from '@bbb-app/utils/common';
import toJS from '@bbb-app/hoc/toJS';
import { registryLabelsSelector } from '@bbb-app/get-registry-details/containers/selectors';
import AuthValidator from '@bbb-app/hoc/AuthValidator';
import { makeSelectContent } from '@bbb-app/selectors/pageSelectors';
import { fetchReferredContent } from '@bbb-app/referred-content/actions';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import { ROUTE_REGISTRY_GUEST } from '@bbb-app/constants/route/route';
import { makeSelectGlobalSwitchConfig } from '@bbb-app/selectors/configSelector';
import {
  makeSelectRecommederLandingPage,
  makeSelectValidateTokenResult,
  makeSelectIsFetching,
  makeSelectIsError,
} from './selectors';
import RecommenderLandingComponent from '../../../../components/Pages/Registry/RecommenderLanding/RecommenderLanding';
import {
  QUERY_SEARCH_PARAM,
  VALID_TOKEN,
  PRIVATE_REGISTRY,
  RECOMMENDER_LANDING_STATEKEY,
  RecommenderVar,
} from './constants';
import { checkToken, mapRecommender } from './actions';
import reducer from './reducer';
import saga from './sagas';
export class RecommenderLanding extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      btnPress: false,
      btnDisable: false,
      privateRegistryMessage: false,
      invalidMessage: false,
      showLoaderForButton: true,
      genericError: false,
    };
    this.checkUserState = this.checkUserState.bind(this);
    const { location } = this.props;
    const locationSearch = pathOr('', 'search', location);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    this.registryId = pathOr(null, 'registryId', query);
    this.eventType = pathOr(null, 'eventType', query);
    this.token = pathOr(null, 'token', query);
    this.referredContentId = '';
    this.handleClick = this.handleClick.bind(this);
    RecommenderVar.registryId = this.registryId;
    RecommenderVar.token = this.token;
  }

  componentDidMount() {
    const { labels, enableCSLabels, labelsRef } = this.props;
    const contentId = [];
    let referredContent = '';
    if (!enableCSLabels) {
      referredContent = pathOr(null, 'referredContent', labels);
      this.referredContentId = referredContent && referredContent[0].id;
    } else {
      referredContent = pathOr('', 'referredContent', labelsRef);
      const referredContentIdNew = referredContent.filter(
        item => item.key === 'heroImage'
      );
      this.referredContentId =
        referredContentIdNew && referredContentIdNew[0].id;
    }
    if (referredContent) {
      referredContent.forEach(obj => {
        if (obj.key) {
          contentId.push(obj.id);
        }
      });
    }
    if (contentId.length) {
      this.props.getContent(contentId);
    }

    if (this.token) {
      this.props.validateToken(this.token, this.registryId);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { tokenValidationError, isFetching } = nextProps;
    if (
      (nextProps.validateTokenResult !== this.props.validateTokenResult &&
        nextProps.validateTokenResult) ||
      tokenValidationError
    ) {
      const atgResponse = pathOr(
        '',
        'validateTokenResult.atgResponse',
        nextProps
      );
      if (atgResponse !== VALID_TOKEN || tokenValidationError) {
        this.setState({ btnDisable: true });
        if (tokenValidationError) {
          this.setState({ genericError: true });
        } else if (atgResponse === PRIVATE_REGISTRY) {
          this.setState({ privateRegistryMessage: true });
        } else {
          this.setState({ invalidMessage: true });
        }
      }
    }

    if (!isFetching) {
      this.setState({
        showLoaderForButton: isFetching,
      });
    }
  }
  checkUserState() {
    const isUserGuest = isGuestUser();
    let pathName = '';
    const search = QUERY_SEARCH_PARAM;
    if (this.registryId) {
      pathName = ROUTE_REGISTRY_GUEST.replace(':registryId', this.registryId);
    } else {
      return false;
    }
    if (isUserGuest) {
      return (
        <AuthValidator
          noReplaceState
          location={this.props.location}
          pathName={pathName}
          search={search}
          loginRule={'recommenderLandingPage'}
        />
      );
    }
    /**
     * Explicitly redirecting to Registry guest as we can not
     * wrap guest registry page with auth validator
     * this type of functionality will be very less
     * so not updating AuthValidtor
     */
    return <Redirect to={`${pathName}${search}`} />;
  }
  handleClick() {
    this.setState({ btnPress: true });
  }
  render() {
    const { referredContent, isMobile } = this.props;
    const {
      btnDisable,
      privateRegistryMessage,
      invalidMessage,
      btnPress,
    } = this.state;

    const imageUrl = pathOr(
      '',
      `content.${this.referredContentId}.components[0].image.url`,
      referredContent
    );

    return (
      <div>
        <RecommenderLandingComponent
          referredContent={referredContent}
          eventType={this.eventType}
          imageUrl={imageUrl}
          handleClick={this.handleClick}
          isMobile={isMobile}
          isBtnDisable={btnDisable}
          privateRegistryMessage={privateRegistryMessage}
          invalidMessage={invalidMessage}
          showLoaderForButton={this.state.showLoaderForButton}
          genericError={this.state.genericError}
        />
        {btnPress && this.checkUserState()}
      </div>
    );
  }
}

RecommenderLanding.propTypes = {
  location: PropTypes.object,
  getContent: PropTypes.func,
  referredContent: PropTypes.object,
  isMobile: PropTypes.bool,
  validateToken: PropTypes.func,
  validateTokenResult: PropTypes.bool,
  enableCSLabels: PropTypes.bool,
  labels: PropTypes.object,
  labelsRef: PropTypes.object,
  tokenValidationError: PropTypes.any,
  isFetching: PropTypes.bool,
};

export const mapStateToProps = createStructuredSelector({
  labels: makeSelectRecommederLandingPage(),
  labelsRef: registryLabelsSelector,
  referredContent: makeSelectContent(),
  isMobile: state => state.getIn(['mobileScreen', 'isMobileScreen']),
  validateTokenResult: makeSelectValidateTokenResult(),
  isFetching: makeSelectIsFetching(),
  enableCSLabels: makeSelectGlobalSwitchConfig('enableCSLabels'),
  tokenValidationError: makeSelectIsError(),
});

export const mapDispatchToProps = dispatch => ({
  getContent(contentIdCollection) {
    dispatch(fetchReferredContent(contentIdCollection));
  },
  validateToken: (token, registryID) => {
    dispatch(checkToken(token, registryID));
  },
  mapToRecommender: data => {
    dispatch(mapRecommender(data));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: RECOMMENDER_LANDING_STATEKEY,
  reducer,
});
const withSaga = injectSaga({ key: RECOMMENDER_LANDING_STATEKEY, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter
)(toJS(RecommenderLanding));
