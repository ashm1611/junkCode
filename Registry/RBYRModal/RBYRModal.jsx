/* eslint max-lines: ["error", 270]*/
import PropTypes from 'prop-types';
import qs from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import pathOr from 'lodash/fp/pathOr';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import toJS from '@bbb-app/hoc/toJS';
import RBRYModalComponent from '../../../../components/Pages/Registry/RBYRModal/RBYRModal';
import { submitRegistryData } from '../../../Pages/Registry/EditRegistry/EditRegistryConfig';
import { updateRBYROptInInfo } from '../../../../containers/Pages/Registry/RegistryOwner/RegistryDetailsSagaInjection';
import { registryState } from '../RegistryStateDataUtils';
import { makeSelectLabelsRegistry } from './selectors';
import { getRegistryEditData } from '../../../Pages/Registry/RegistryOwner/selectors';
import { clearEditRegistryData } from '../../../Pages/Registry/EditRegistry/actions';

export class RBYRModal extends React.PureComponent {
  static propTypes = {
    registryDetailsData: PropTypes.object,
    eventTypeCode: PropTypes.string,
    eventType: PropTypes.string,
    registryId: PropTypes.any,
    handleLearnMoreClick: PropTypes.func,
    updateRBYR: PropTypes.func,
    registryDetails: PropTypes.object,
    clearEditRegistryData: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      SuccessOptInMod: false,
    };
    this.saveOptInDetailsFromTipsModule = this.saveOptInDetailsFromTipsModule.bind(
      this
    );
  }

  componentWillMount() {
    this.setState({ SuccessOptInMod: false });
  }

  saveOptInDetailsFromTipsModule(storedValueOptIn) {
    const {
      registryDetailsData,
      eventTypeCode,
      registryId,
      eventType,
      registryDetails,
    } = this.props;
    const regState = registryState(registryDetails || registryDetailsData);
    const formData = submitRegistryData(
      regState,
      eventType,
      registryId,
      eventTypeCode
    );

    try {
      const payload = Object.assign(formData, {
        storedValueOptIn,
      });
      ServiceUtil.triggerServerRequest({
        url: getApiEndPointsFromStore('editRegistry'),
        method: 'PUT',
        showLoader: true,
        data: qs.stringify(payload),
      })
        .then(data => {
          const { serviceStatus } = data && data.body;
          /* istanbul ignore else */
          if (serviceStatus === 'SUCCESS') {
            this.props.clearEditRegistryData();
            this.props.updateRBYR(storedValueOptIn);
            this.props.handleLearnMoreClick();
            this.setState({ SuccessOptInMod: true });
          }
        })
        .catch(e => {
          const errorMessages = pathOr(
            null,
            'body.response.data.errorMessages[0]',
            e
          );
          this.setState({
            errorMessages,
          });
        });
    } catch (e) {
      const errorMessages = pathOr(
        null,
        'body.response.data.errorMessages[0]',
        e
      );
      this.setState({
        errorMessages,
      });
    }
  }
  render() {
    return (
      <RBRYModalComponent
        saveOptInDetailsFromTipsModule={this.saveOptInDetailsFromTipsModule}
        SuccessOptInMod={this.state.SuccessOptInMod}
        {...this.props}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  updateRBYR: isOptIn => {
    dispatch(updateRBYROptInInfo(isOptIn));
  },
  clearEditRegistryData: () => {
    dispatch(clearEditRegistryData());
  },
});
export const mapStateToProps = createStructuredSelector({
  registryLabels: makeSelectLabelsRegistry(),
  registryDetails: getRegistryEditData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(toJS(RBYRModal));
