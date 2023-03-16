import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import GridX from '@bbb-app/core-ui/grid-x';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { noop } from '@bbb-app/utils/common';
import '@bbb-app/assets/icons/calendar.svg';
import style from '../BookAnAppointment/BookAnAppointment.css';
import Appointment from '../../../../../containers/Appointment/Appointment.async';
import { BOOK_AN_APPOINTMENT_LBL } from '../../../../Appointment/constants';

const propTypes = {
  track: PropTypes.func,
};

class BookAnAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBookAnAppointModal = this.toggleBookAnAppointModal.bind(this);
    this.handleBookAnApoointmentClick = this.handleBookAnApoointmentClick.bind(
      this
    );
    this.state = {
      isBookAnAppointModalOpen: false,
    };
  }
  toggleBookAnAppointModal = () => {
    this.setState({
      isBookAnAppointModalOpen: !this.state.isBookAnAppointModalOpen,
    });
  };

  handleBookAnApoointmentClick() {
    const { track } = this.props;
    this.setState({
      isBookAnAppointModalOpen: true,
    });
    if (track) track('clickAppointment');
  }

  renderBookAnAppointmentModal() {
    return (
      <ModalDialog
        mountedState={this.state.isBookAnAppointModalOpen}
        toggleModalState={this.toggleBookAnAppointModal}
        titleAriaLabel="Modal"
        closeIconShow
        verticallyCenter
        onModalDidClose={noop}
        variation="large"
      >
        <Appointment />
      </ModalDialog>
    );
  }

  renderBookAnAppointmentWithIcon() {
    return (
      <GridX
        className={classnames(style.bookAnAppointmentWrapper, 'pt1 pb1')}
        data-locator="registry-bookAnAppointment_link"
      >
        <PrimaryLink
          onClick={this.handleBookAnApoointmentClick}
          href="#"
          iconProps={{
            type: 'calendar',
            width: '27px',
            height: '24px',
          }}
          variation="primaryColoredIcon"
        >
          {BOOK_AN_APPOINTMENT_LBL}
        </PrimaryLink>
      </GridX>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBookAnAppointmentWithIcon()}
        {this.renderBookAnAppointmentModal()}
      </React.Fragment>
    );
  }
}

BookAnAppointment.propTypes = propTypes;

export default BookAnAppointment;
