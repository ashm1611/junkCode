import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'qs';
import pathOr from 'lodash/fp/pathOr';
import { connect } from 'react-redux';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import RegistryGuestWlcmeMsgForRecommenderComponent from '../../../../components/Pages/Registry/RegistryGuestWlcmeMsgForRecommender/RegistryGuestWlcmeMsgForRecommender';
import { mapRecommender } from '../RecommenderLanding/actions';
import { RecommenderVar } from '../RecommenderLanding/constants';

export class RegistryGuestWlcmeMsgForRecommender extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mountedState: true,
    };
    this.closeModal = this.closeModal.bind(this);
    this.getShowWelcomeMsgParam = this.getShowWelcomeMsgParam.bind(this);
  }

  componentDidMount() {
    const { mapToRecommender } = this.props;
    const showWelcomeMsg = this.getShowWelcomeMsgParam();
    if (showWelcomeMsg === 'true') {
      const data = {
        registryId: RecommenderVar.registryId,
        token: RecommenderVar.token,
      };
      mapToRecommender(data);
    }
  }

  getShowWelcomeMsgParam() {
    const { location } = this.props;
    const locationSearch = pathOr('', 'search', location);
    const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    return pathOr('', 'showWelcomeMsg', query);
  }

  closeModal() {
    this.setState({
      mountedState: false,
    });
  }

  render() {
    const { enableRegistryCollaboration } = this.props;
    if (enableRegistryCollaboration) return null;
    const showWelcomeMsg = this.getShowWelcomeMsgParam();
    if (showWelcomeMsg === 'true') {
      return (
        <ErrorBoundary>
          <RegistryGuestWlcmeMsgForRecommenderComponent
            closeModal={this.closeModal}
            mountedState={this.state.mountedState}
          />
        </ErrorBoundary>
      );
    }
    return null;
  }
}

RegistryGuestWlcmeMsgForRecommender.propTypes = {
  location: PropTypes.object,
  mapToRecommender: PropTypes.func,
  enableRegistryCollaboration: PropTypes.bool,
};
const mapDispatchToProps = dispatch => ({
  mapToRecommender: data => {
    dispatch(mapRecommender(data));
  },
});
export default withRouter(
  connect(null, mapDispatchToProps)(RegistryGuestWlcmeMsgForRecommender)
);
