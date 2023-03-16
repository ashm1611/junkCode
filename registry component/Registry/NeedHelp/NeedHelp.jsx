import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Heading from '@bbb-app/core-ui/heading';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import { triggerOpenAppModalEvent } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import Icon from '@bbb-app/core-ui/icon';
import '../../../../assets/icons/chat-icon-white.svg';
import styles from './NeedHelp.css';
import stylesRecom from '../../../../components/PureContent/NeedHelp/NeedHelp.css';
import LiveChat from '../../../../containers/LiveChat/LiveChat.async';

const NeedHelp = props => {
  const {
    getHelp,
    isMobile,
    liveChat,
    bookAppointment,
    isSocialRecommendationContent,
  } = props;
  const DangerousHTML = dangerousHTML(DangerousHTML);
  return isSocialRecommendationContent ? (
    <div className={classnames('flex', stylesRecom.needHelpBorder)}>
      <Fragment>
        <div
          className={classnames(
            stylesRecom.needHelpWrapper,
            'items-center px1'
          )}
        >
          <GridX
            className={classnames(
              stylesRecom.iconWrapper,
              'sm-mt3 md-mt15 mb1'
            )}
          >
            <Cell className={'small-12 center'}>{renderIcon(isMobile)}</Cell>
          </GridX>
          <GridX className={'sm-mb15 md-mb3'}>
            <Cell className={'small-12 center'}>
              {renderHeading(isMobile, getHelp.displayName)}
              {renderDescription(getHelp.description, isMobile, DangerousHTML)}
              {renderPhoneNo(getHelp.phoneNumber, isMobile, DangerousHTML)}
            </Cell>
          </GridX>
          <GridX
            className={classnames(stylesRecom.ctaWrapper, 'sm-mb3 md-mb15')}
          >
            <Cell className={classnames('small-12 center')}>
              <div className={classnames(stylesRecom.ctaContainer)}>
                {renderLiveChat(liveChat, isMobile, getHelp)}
              </div>
              <div className={classnames(stylesRecom.ctaContainer)}>
                {renderAppointment(
                  bookAppointment,
                  isMobile,
                  props.registryId,
                  props.eventDate,
                  props.fireTealiumAction,
                  getHelp,
                  isSocialRecommendationContent
                )}
              </div>
            </Cell>
          </GridX>
        </div>
      </Fragment>
    </div>
  ) : (
    <Fragment>
      <GridX
        className={classnames(
          styles.needHelpBorder,
          `items-center px15 border-box ${isMobile ? 'py25' : 'py15'}`
        )}
      >
        <Cell className={classnames('small-12 large-6')}>
          <GridX>
            {renderIcon(isMobile)}
            <Cell
              className={`large-9 border-box ${isMobile ? 'mb15' : 'mr-auto'}`}
            >
              <Cell
                className={`small-12 large-10 ${isMobile ? 'center' : 'left'}`}
              >
                {renderHeading(isMobile, getHelp.displayName)}
                {renderDescription(
                  getHelp.description,
                  isMobile,
                  DangerousHTML
                )}
                {renderPhoneNo(getHelp.phoneNumber, isMobile, DangerousHTML)}
              </Cell>
            </Cell>
          </GridX>
        </Cell>
        <Cell className="small-12 large-6">
          <GridX>
            {renderLiveChat(liveChat, isMobile, getHelp)}
            {renderAppointment(
              bookAppointment,
              isMobile,
              props.registryId,
              props.eventDate,
              props.fireTealiumAction,
              getHelp
            )}
          </GridX>
        </Cell>
      </GridX>
    </Fragment>
  );
};

const renderHeading = (isMobile, title) => {
  return (
    <Heading
      className={styles.heading}
      styleVariation="h3-serif"
      level={isMobile ? 3 : 1}
    >
      {title}
    </Heading>
  );
};

const renderIcon = isMobile => {
  return (
    <Cell
      className={`border-box large-2 ${isMobile ? 'center mb1' : 'left mr1'}`}
    >
      <Icon
        className="fit"
        type="chat-icon-white"
        focusable="false"
        height="88"
        width="88"
      />
    </Cell>
  );
};

const renderLiveChat = (liveChat, isMobile, getHelp) => {
  return (
    liveChat && (
      <ErrorBoundary>
        <Cell
          className={`small-12 large-6 border-box ${
            isMobile ? 'mb2 center' : 'right pr1'
          }`}
        >
          {/* the chatButton prop here renders a secondary button instead of a primary link with icon as the action trigger for LiveChat modal*/}
          <LiveChat
            chatButton
            displayName={
              getHelp.cta && getHelp.cta[0] ? getHelp.cta[0].linkText : ''
            }
          />
        </Cell>
      </ErrorBoundary>
    )
  );
};
const renderAppointment = (
  bookAppointment,
  isMobile,
  registryId,
  eventDate,
  fireTealiumAction,
  getHelp,
  isSocialRecommendationContent
) => {
  const cellClassName = `small-12 large-6 border-box ${
    isMobile ? 'center' : 'right pl1'
  }`;
  return (
    bookAppointment && (
      <ErrorBoundary>
        <Cell
          className={
            isSocialRecommendationContent
              ? stylesRecom.appointmentContainer
              : cellClassName
          }
        >
          <Button
            theme="secondary"
            variation="fullWidth"
            className={
              isSocialRecommendationContent
                ? stylesRecom.appointmentButton
                : null
            }
            onClick={event => {
              event.preventDefault();
              triggerOpenAppModalEvent('Appointments', {
                variation: 'large',
                sourceCTA: 'need help',
              });
              if (fireTealiumAction) {
                fireTealiumAction(
                  'book an appointment clicked',
                  {
                    appt_scheduler_entry: 'book an appointment : need help',
                    call_to_actiontype: 'book an appointment clicked',
                    page_name: 'book an appointment clicked',
                    registry_id: registryId || '',
                    registry_type: eventDate || '',
                    page_function: 'Registry',
                    navigation_path: 'Registry',
                    subnavigation_path: 'Registry',
                    page_type: 'Registry',
                    channel: 'Registry',
                    pagename_breadcrumb: 'Registry Book an Appointment',
                  },
                  ''
                );
              }
            }}
          >
            {getHelp.cta && getHelp.cta[1] ? getHelp.cta[1].linkText : ''}
          </Button>
        </Cell>
      </ErrorBoundary>
    )
  );
};

const renderDescription = (description, isMobile, DangerousHTML) => {
  return (
    description && (
      <div
        className={classnames(
          `large-10 ${isMobile ? 'small-12 center ' : 'small-10 left mr1'}`,
          styles.description
        )}
      >
        <DangerousHTML>{description}</DangerousHTML>
      </div>
    )
  );
};

const renderPhoneNo = (phoneNumber, isMobile, DangerousHTML) => {
  return (
    phoneNumber && (
      <div
        className={classnames(
          `small-12 large-2 ${isMobile ? 'center ' : 'left'}`,
          styles.description
        )}
      >
        <HyperLink
          type="bold"
          variation="phoneNumber"
          href={`tel:${phoneNumber.split('-').join('')}`}
          textDecoration=""
          className={styles.customerServiceNumber}
        >
          <DangerousHTML>{phoneNumber}</DangerousHTML>
        </HyperLink>
      </div>
    )
  );
};

NeedHelp.propTypes = {
  getHelp: PropTypes.object,
  isMobile: PropTypes.bool,
  liveChat: PropTypes.bool,
  bookAppointment: PropTypes.bool,
  registryId: PropTypes.string,
  eventDate: PropTypes.string,
  fireTealiumAction: PropTypes.func,
  isSocialRecommendationContent: PropTypes.bool,
};

export default NeedHelp;
