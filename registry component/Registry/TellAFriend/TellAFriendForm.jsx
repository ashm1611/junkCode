import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Checkbox from '@bbb-app/core-ui/checkbox';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Message from '@bbb-app/core-ui/message';
import Button from '@bbb-app/core-ui/button';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import focus from '@bbb-app/hoc/focus';
import FormWrapper from '@bbb-app/forms/containers/FormWrapper/FormWrapper';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import FormElement from '../WeddingBook/WeddingBookFormElement';
import {
  SENDER_FIRST_NAME_LBL,
  SENDER_LAST_NAME_LBL,
  SENDER_EMAIL_ADDRESS_LBL,
  RECIPIENT_FIRST_NAME_LBL,
  RECIPIENT_LAST_NAME_LBL,
  EMAIL_COPY_LBL,
  TELL_A_FRIEND_LBL,
  TELL_A_FRIEND_PARA_LBL,
  RECIPIENT_EMAIL_ADDRESS_LBL,
  TO_LBL,
  FROM_LBL,
  SUBMIT_LBL,
  CANCEL_LBL,
} from './constants';

const FocusableMessage = focus(Message);

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  formWrapperData: PropTypes.object,
  identifier: PropTypes.string,
  submitTellAFriend: PropTypes.func,
  error: PropTypes.string,
  toggleModalState: PropTypes.func,
};

/**
 * @property defaultProps
 * @description defining defaultProps of the component
 */
const defaultProps = {
  identifier: 'weddingBook',
  formWrapperData: {},
};

/**
 * Render Form of associate login
 * @param {Object} props
 */
class TellAFriendForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailCopyChecked: false,
    };
  }

  onCancel(e) {
    e.preventDefault();
    this.props.toggleModalState(false);
  }

  emailCopy = () => {
    const emailCopy = this.state.emailCopyChecked;
    this.setState({ emailCopyChecked: !emailCopy });
  };

  submitTellAFriendForm = obj => {
    const { submitTellAFriend, formWrapperData } = this.props;
    const formaData = {
      senderFirstName: formWrapperData && formWrapperData.senderFirstName.value,
      senderLastName: formWrapperData && formWrapperData.senderLastName.value,
      recipientFirstName:
        formWrapperData && formWrapperData.recipientFirstName.value,
      recipientLastName:
        formWrapperData && formWrapperData.recipientLastName.value,
      senderEmailAddr: formWrapperData && formWrapperData.senderEmailAddr.value,
      recipientEmailAddr:
        formWrapperData && formWrapperData.recipientEmailAddr.value,
      emailCopy: this.state.emailCopyChecked,
    };
    const hasFormErros = Object.keys(obj).length;
    if (!hasFormErros) {
      submitTellAFriend(formaData);
    }
  };

  focusAbleMessage = error => {
    const errorMessage = this.renderErrorMessage(error);

    return (
      <Cell className={'large-8 small-12 mx-auto'}>
        <FocusableMessage>{errorMessage}</FocusableMessage>
      </Cell>
    );
  };

  renderErrorMessage = error => {
    const lockErrorMessage = pathOr(
      '',
      'response.data.errorMessages[0].message',
      error
    );
    const message = lockErrorMessage.split(':');
    message.shift();
    const errorMessage = message.join();
    return (
      <Notification
        status={'error'}
        content={
          errorMessage && errorMessage.length ? errorMessage : lockErrorMessage
        }
        wrapperClass={'p1 mb2 large-8 small-12 mx-auto'}
      />
    );
  };

  /**
   * Render the form component of tell A friend
   */
  renderForm = () => {
    const { formWrapperData, identifier, error } = this.props;
    const isErrorPresent = !isEmpty(error);
    return (
      <div className={'large-12 small-12'}>
        {isErrorPresent && this.focusAbleMessage(error)}
        <FormWrapper
          id="tellAFriend"
          method="post"
          onSubmit={this.submitTellAFriendForm}
          name="tellAFriendForm"
          identifier={identifier}
          formWrapperData={formWrapperData}
        >
          <h2 className="mb2">{TELL_A_FRIEND_LBL} </h2>
          <p className="mb2">{TELL_A_FRIEND_PARA_LBL}</p>
          <h3 className="mb2">{FROM_LBL} </h3>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="senderFirstName"
              label={SENDER_FIRST_NAME_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              validation="firstName"
              data-locator="tellAFriend-senderFirstName"
              isRequired
            />
          </Cell>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="senderLastName"
              label={SENDER_LAST_NAME_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              validation="lastName"
              data-locator="tellAFriend-senderLastName"
              isRequired
            />
          </Cell>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="senderEmailAddr"
              label={SENDER_EMAIL_ADDRESS_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              data-locator="tellAFriend-senderEmailAddr"
              validation="email"
              type="email"
              isRequired
            />
          </Cell>
          <h3 className="mb2">{TO_LBL} </h3>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="recipientFirstName"
              label={RECIPIENT_FIRST_NAME_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              validation="firstName"
              data-locator="tellAFriend-recipientFirstName"
              isRequired
            />
          </Cell>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="recipientLastName"
              label={RECIPIENT_LAST_NAME_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              validation="lastName"
              data-locator="tellAFriend-recipientLastName"
              isRequired
            />
          </Cell>
          <Cell className={'mb2'}>
            <FormElement
              fieldName="recipientEmailAddr"
              label={RECIPIENT_EMAIL_ADDRESS_LBL}
              identifier={identifier}
              formWrapperData={formWrapperData}
              data-locator="tellAFriend-recipientEmailAddr"
              validation="email"
              type="email"
              isRequired
            />
          </Cell>
          <GridX className="mt2 mb2">
            <Checkbox
              id="emailCopy"
              name="emailCopy"
              type="checkbox"
              identifier={identifier}
              checked={this.state.emailCopyChecked}
              onSelect={this.emailCopy}
              label={EMAIL_COPY_LBL}
              data-locator="tellAFriend-emailCopy"
            />
          </GridX>
          <GridX>
            <Button
              id="tellAFriendSubmit"
              type="submit"
              theme="primary"
              className={'mb2 mr1 sm-mr0 large-5 small-12'}
              data-locator="tellAFriend-Submit"
            >
              {SUBMIT_LBL}
            </Button>
            <PrimaryLink
              variation="primary"
              type="bold"
              href="#"
              onClick={e => {
                this.onCancel(e);
              }}
            >
              {CANCEL_LBL}
            </PrimaryLink>
          </GridX>
        </FormWrapper>
      </div>
    );
  };

  /**
   * Render Form of associate login
   * @param {Object} props
   */
  render() {
    return (
      <ErrorBoundary>
        <GridX>{this.renderForm()}</GridX>
      </ErrorBoundary>
    );
  }
}

TellAFriendForm.propTypes = propTypes;
TellAFriendForm.defaultProps = defaultProps;
export default TellAFriendForm;
