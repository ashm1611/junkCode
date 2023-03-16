import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import toJS from '@bbb-app/hoc/toJS';
import { formWrapperSelector } from '@bbb-app/forms/containers/FormWrapper/selectors';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import injectReducer from '@bbb-app/hoc/injectReducer';
import injectSaga from '@bbb-app/hoc/injectSaga';
import TellAFriendComponent from '../../../../components/Pages/Registry/TellAFriend/TellAFriendComponent';
import { maketellAFriendError, maketellAFriendSuccess } from './selectors';
import { tellAFriend } from './actions';
import ThankyouModal from '../../../../components/Pages/Registry/ThankyouModal/ThankyouModal';

import reducer from './reducer';
import saga from './sagas';
import {
  TELL_A_FRIEND_STATE_KEY,
  TELL_A_FRIEND_LBL,
  TELL_A_FRIEND_TEXT_LBL,
} from './constants';

const propTypes = {
  formWrapperData: PropTypes.object,
  submitTellAFriend: PropTypes.func,
  error: PropTypes.string,
  result: PropTypes.bool,
};

export class TellAFriend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mountedState: false,
      thankyouModalState: false,
    };
    this.toggleModalState = this.toggleModalState.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.renderTellAFriendModal = this.renderTellAFriendModal.bind(this);
    this.thankyoumodalClose = this.thankyoumodalClose.bind(this);
    this.toggleThankyouModateState = this.toggleThankyouModateState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.result && this.props.result !== nextProps.result) {
      this.toggleThankyouModateState(true);
      this.toggleModalState(false);
    }
  }

  onCancel = () => {
    this.toggleThankyouModateState(false);
    this.toggleModalState(false);
  };

  toggleModalState(value) {
    this.setState({ mountedState: value });
  }

  thankyoumodalClose() {
    this.setState({ thankyouModalState: false });
  }

  toggleThankyouModateState(value) {
    this.setState({ thankyouModalState: value });
  }

  modalClose = () => {
    this.setState({ mountedState: false });
  };

  renderTellAFriendModal() {
    this.toggleThankyouModateState(false);
    this.toggleModalState(true);
  }

  render() {
    const { formWrapperData, error, result, submitTellAFriend } = this.props;
    const identifier = 'tellAFriend';

    return (
      <div>
        <PrimaryLink
          variation="primary"
          type="bold"
          href="#"
          id="tellafrndlink"
          data-locator="rgbook-tellafriendlink"
          className="b1FontLight"
          onClick={() => {
            this.renderTellAFriendModal();
          }}
        >
          {TELL_A_FRIEND_LBL}
        </PrimaryLink>
        <span className="b1FontLight ml1">{TELL_A_FRIEND_TEXT_LBL}</span>

        {this.state.mountedState && (
          <TellAFriendComponent
            mountedState={this.state.mountedState}
            toggleModalState={this.toggleModalState}
            identifier={identifier}
            formWrapperData={formWrapperData}
            result={result}
            error={error}
            submitTellAFriend={submitTellAFriend}
          />
        )}
        {this.state.thankyouModalState && (
          <ThankyouModal
            mountedState={this.state.thankyouModalState}
            toggleModalState={this.toggleThankyouModateState}
            onModalDidClose={this.thankyoumodalClose}
            renderTellAFriendModal={this.renderTellAFriendModal}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}

TellAFriend.propTypes = propTypes;

export const mapStateToProps = createStructuredSelector({
  formWrapperData: formWrapperSelector('tellAFriend'),
  error: maketellAFriendError(),
  result: maketellAFriendSuccess(),
});

export const mapDispatchToProps = dispatch => ({
  submitTellAFriend: formdata => {
    dispatch(tellAFriend(formdata));
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: TELL_A_FRIEND_STATE_KEY,
  reducer,
});
const withSaga = injectSaga({ key: TELL_A_FRIEND_STATE_KEY, saga });

export default compose(withSaga, withReducer, withConnect)(toJS(TellAFriend));
