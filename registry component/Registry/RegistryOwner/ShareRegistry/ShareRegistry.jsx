import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import qs from 'qs';
import * as clipboard from 'clipboard-polyfill/text';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import Heading from '@bbb-app/core-ui/heading';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import isUserRecognized from '@bbb-app/utils/isUserRecognized';
import { getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import isTbs from '@bbb-app/utils/isTbs';
import FormInput from '@bbb-app/forms/components/FormInput';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import '@bbb-app/assets/icons/CloseIcon.svg';
import '@bbb-app/assets/icons/notificationAlert.svg';
import FlyoutClickOutside from '../../../../../components/common/FlyoutClickOutside';
import SocialShare from '../../../../../containers/common/SocialShare/SocialShare';
import styles from './ShareRegistry.css';
import '../../../../../assets/icons/baby-share.svg';
import '../../../../../assets/icons/bbb-share.svg';
import '../../../../../assets/icons/collab-invite.svg';
import '../../../../../assets/icons/collab-share.svg';
import EmailRegistry from '../../RegistryActionButtons/EmailRegistry';

import {
  FACEBOOK,
  TWITTER,
  PINTEREST,
  GOOGLEPLUS,
  MAIL,
  TEALIUM_PAGE_INFO,
  TEALIUM_PAGE_SHARE,
} from '../../../../../constants/socialShare';
import '../../../../../assets/icons/share-registry.svg';
import RenderEditRegistryLink from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryWrapper';
import {
  CLOSE_EDIT_REGISTRY_DETAILS_LBL,
  EDIT_REGISTRY_DETAILS_LBL,
  PREVIEW_REGISTRY_LINK_TXT_LBL,
  SHARE_LABEL_AFTERWARD_LBL,
  SHARE_REGISTRY_LINK_TXT_LBL,
  TYM_EMAIL_MODAL_CTA_LBL,
  CANCEL_BTN_LBL,
  FROM_EMAIL_LBL,
  TO_EMAIL_LBL,
  EMAIL_CHECKBOX_LBL,
  REG_FORM_LBL,
  REG_MESSAGE_LBL,
  REG_SAVED_ITEMS_HEADING_LBL,
  SUBMIT_BTN_LBL,
  EMAIL_SUBJECT_LBL,
  EMAIL_TITLE_LBL,
  SHARE_DIALOG_HEADING_LBL,
  TYM_COPY_REGISTRY_LBL,
  SHARE_REGISTRY_CTA_LBL,
  EMAIL_SENT_RESPONSE_LBL,
  SHARE_REGISTRY_LBL,
  SHARE_DIALOG_HEADING_NEW_LBL,
  EDIT_REGISTRY_DETAILS_DASHBOARD_LBL,
} from '../../constants';
import {
  SHARE_DIALOG_SUBHEADING_BABY_LBL,
  SHARE_DIALOG_SUBHEADING_LBL,
  SHARE_REGISTRY_PROMOPT_LBL,
  SHARE_REGISTRY_PROMOPT_BABY_LBL,
} from './constants';

const PREVIEW_CTA_LBL = 'Preview Registry';
const SHARE_REGISTRY_PROMOPT_DASHBOARD_LBL =
  'change your privacy setting to public to share your profile with friends and family on the dashboard or';
export class ShareRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sentEmail = '';
    this.emailSubmitForm = this.emailSubmitForm.bind(this);
    this.emailSubmitFormSuccess = this.emailSubmitFormSuccess.bind(this);
    this.emailSubmitFormError = this.emailSubmitFormError.bind(this);
    this.clearSubmitResponse = this.clearSubmitResponse.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.toggleShareModalState = this.toggleShareModalState.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.hideShareRegistryModal = this.hideShareRegistryModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.renderShareRegistryText = this.renderShareRegistryText.bind();
    this.state = {
      shareModalVisiblity: false,
      clearSubmitResponse: null,
      isSuccess: null,
      submitInProgress: false,
      checkBoxChecked: false,
      emailSentResponse: null,
      shareContentVisiblity: styles.showContent,
      showNotification: true,
      scrollPositionY: 0,
      ellipsesFlyout: false,
    };
    this.enablePreYrReg = props.isPreviewYrReg && !isTbs();
  }

  componentWillReceiveProps() {
    const query = this.getQueryparmas();
    if (query.action === 'share' && !this.state.shareModalVisiblity) {
      this.handleModalVisiblity();
    }
  }

  onModalClose = () => {
    /* istanbul ignore next */
    setTimeoutCustom(
      () =>
        typeof window !== 'undefined' &&
        window.scroll(0, this.state.scrollPositionY),
      10
    );
  };

  getQueryparmas() {
    const locationSearch = pathOr('', 'search', location);
    const queryParams = qs.parse(locationSearch, { ignoreQueryPrefix: true });
    return queryParams;
  }

  closeShareModal = () => {
    const { track } = this.props;
    if (this.enablePreYrReg && track) track('ClickViewGG');
    this.setState({
      shareModalVisiblity: false,
    });
  };

  handleModalVisiblity = e => {
    const { track, handleTealiumEvent } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (this.enablePreYrReg && track) track('ClickPreviewCTA');
    this.setState({
      shareModalVisiblity: true,
      shareContentVisiblity: styles.showContent,
    });
    /* istanbul ignore else  */
    if (typeof window !== 'undefined') {
      const scrollPositionY = window.scrollY || window.pageYOffset;
      this.setState({ scrollPositionY });
      window.scroll(0, 0);
    }
    this.hideCollaborationFlyout();
    const tealiumTags = {
      link_name: 'Registry Share',
      link_location_name: 'Registry View Page',
    };
    const shareTealiumData = Object.assign({}, tealiumTags);
    handleTealiumEvent('registry share', shareTealiumData, TEALIUM_PAGE_SHARE);
  };

  toggleShareModalState = state => {
    if (!state) {
      const queryParams = this.getQueryparmas();
      /* istanbul ignore else  */
      if (!isEmpty(queryParams) && typeof window !== 'undefined') {
        delete queryParams.action;
        const toLocation = `${location.pathname}?${qs.stringify(queryParams)}${
          location.hash
        }`;
        window.history.replaceState(null, null, toLocation);
      }
    }
    this.setState({
      shareModalVisiblity: state,
    });
    this.onModalClose();
  };

  hideShareRegistryModal = () => {
    this.setState({
      shareContentVisiblity: styles.hideContent,
    });
  };

  /**
   * submitForm Success handler
   */
  emailSubmitFormSuccess(data) {
    const { body: savedEmailResponse } = data;
    const result = pathOr('', 'data.result', savedEmailResponse);
    const emailResponse = pathOr(
      '',
      'data.component.emailResponse',
      savedEmailResponse
    );

    if (result) {
      this.setState({
        isSuccess: true,
        emailSentResponse: `${EMAIL_SENT_RESPONSE_LBL}
        ${this.sentEmail}`,
        submitInProgress: false,
      });
    } else {
      this.setState({
        isSuccess: false,
        emailSentResponse: emailResponse,
        submitInProgress: false,
      });
    }
  }

  /**
   * submitForm Error handler.
   */
  emailSubmitFormError(error) {
    const { body: errorEmailResponse } = error;
    const errorMessage = pathOr(
      '',
      'response.data.errorMessages[0].message',
      errorEmailResponse
    );
    this.sentEmail = '';
    this.setState({
      isSuccess: false,
      emailSentResponse: errorMessage,
      submitInProgress: false,
    });
  }

  clearSubmitResponse() {
    this.setState({
      isSuccess: null,
      emailSentResponse: null,
      submitInProgress: false,
      checkBoxChecked: false,
    });
  }

  /**
   * This will handle checkbox selection.
   */
  handleCheckBox = () => {
    this.setState({
      checkBoxChecked: !this.state.checkBoxChecked,
    });
  };

  emailRegistryTealium = (registryId, registryType) => {
    const tealiumTags = {
      registry_id: registryId,
      registry_type: registryType,
      pagename_breadcrumb: 'Registry View Page',
    };
    return Object.assign({}, tealiumTags);
  };

  tealiumTagsOnClickOfRegEmail(registrySummaryVO) {
    const emailRegistryData = this.emailRegistryTealium(
      registrySummaryVO && registrySummaryVO.registryId,
      registrySummaryVO && registrySummaryVO.eventType
    );
    if (this.props.handleTealiumEvent) {
      this.props.handleTealiumEvent(
        'email registry',
        emailRegistryData,
        TEALIUM_PAGE_INFO
      );
    }
  }

  emailSubmitForm(formData) {
    const registryResVO = pathOr(
      null,
      'registryResVO',
      this.props.registryData
    );
    const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
    const endPoint = getApiEndPointsFromStore('emailRegistry');
    const { checkBoxChecked } = this.state;
    const apiData = {
      senderEmail: formData.senderEmail,
      recipientEmail: formData.recipientEmail,
      eventType: registrySummaryVO.eventType,
      message: formData.message,
      registryEventDate: registrySummaryVO.eventDate,
      subject: EMAIL_SUBJECT_LBL,
      regFirstName: registrySummaryVO.primaryRegistrantFirstName,
      regLastName: registrySummaryVO.primaryRegistrantLastName,
      title: EMAIL_TITLE_LBL,
      coRegFirstName: registrySummaryVO.coRegistrantFirstName,
      coRegLastName: registrySummaryVO.coRegistrantLastName,
      registryName: registrySummaryVO.eventType,
      daysToGo: registrySummaryVO.daysToGo,
      registryId: registrySummaryVO.registryId,
      ccFlag: checkBoxChecked,
    };
    this.sentEmail = formData.recipientEmail;
    this.setState({
      submitInProgress: true,
    });
    this.tealiumTagsOnClickOfRegEmail(registrySummaryVO);
    ServiceUtil.triggerServerRequest({
      url: endPoint,
      method: 'POST',
      data: qs.stringify(apiData),
      headers: {
        'atg-rest-depth': 0,
      },
    })
      .then(this.emailSubmitFormSuccess)
      .catch(this.emailSubmitFormError);
  }

  handleURLCopy = shareURL => {
    // Copies URL to the clipboard
    /* istanbul ignore next */
    if (typeof window !== 'undefined') {
      clipboard.writeText(
        `${window.location.protocol}//${window.location.host}/${shareURL}`
      );
    }
  };

  closeNotification = () => {
    this.setState({
      showNotification: false,
    });
  };

  showCollaborationFlyout = () => {
    this.setState({ ellipsesFlyout: true });
  };

  hideCollaborationFlyout = () => {
    this.setState({ ellipsesFlyout: false });
  };

  renderShareandCollaboration = () => {
    this.showCollaborationFlyout();
  };

  renderShareRegistryText = () => {
    if (this.props.isNewRegDashboard)
      return <span className={styles.menuOpt}>{SHARE_REGISTRY_LBL}</span>;
    const shareCtaText = this.enablePreYrReg
      ? PREVIEW_REGISTRY_LINK_TXT_LBL
      : SHARE_REGISTRY_LINK_TXT_LBL;
    return shareCtaText;
  };

  // eslint-disable-next-line consistent-return
  renderCollaborationBody = () => {
    if (this.state.ellipsesFlyout) {
      return (
        <div className={classnames(styles.CombinedLayout)}>
          <ul>
            <PrimaryLink
              href="#"
              className={classnames(styles.shareRegText)}
              onClick={e => this.handleModalVisiblity(e)}
              type="noUnderline"
              id="shareReg"
            >
              <li>
                <Icon
                  type={'collab-share'}
                  width="21px"
                  height="20px"
                  className={classnames(styles.shareRegIcon)}
                  tabIndex={-1}
                />
                {/* change to labels */}
                <span className={classnames(styles.labelText)}>
                  share registry
                </span>
              </li>
            </PrimaryLink>
            <PrimaryLink
              href="#"
              className={classnames(styles.invitetoCollaborate)}
              onClick={() => {
                this.props.handleCollaborationModal();
              }}
              type="noUnderline"
              id="invitetoCollaborate"
            >
              <li>
                <Icon
                  type={'collab-invite'}
                  width="21px"
                  height="20px"
                  className={classnames(styles.collaborateIcon)}
                  tabIndex={-1}
                />
                {/* change to labels */}
                <span className={classnames(styles.labelText)}>
                  invite to collaborate
                </span>
              </li>
            </PrimaryLink>
          </ul>
        </div>
      );
    }
  };

  render() {
    const services = [FACEBOOK, TWITTER, PINTEREST, GOOGLEPLUS, MAIL];
    const {
      showLink,
      registryId,
      formWrapperData,
      switchConfig,
      eventType,
      emailId,
      eventTypeCode,
      labelData,
      registryConfig,
      isBabyNewRegistryHeader,
      isBBBNewRegistryHeader,
      isMobile,
    } = this.props;
    const { showNotification } = this.state;
    const registryResVO = pathOr(
      null,
      'registryResVO',
      this.props.registryData
    );

    const isPublic =
      this.props.isPublicState ||
      parseInt(pathOr(1, 'registryVO.isPublic', registryResVO), 10) === 1;

    let fromEmailIdValue;
    if (isUserLoggedIn() || isUserRecognized()) {
      fromEmailIdValue = emailId;
    } else {
      fromEmailIdValue = pathOr(
        '',
        'registrySummaryVO.primaryRegistrantEmail',
        registryResVO
      );
    }

    const formLabels = {
      fromEmailLabel: FROM_EMAIL_LBL,
      messageLabel: REG_MESSAGE_LBL,
      emailCheckboxLabel: EMAIL_CHECKBOX_LBL,
      cancelButtonLabel: CANCEL_BTN_LBL,
      formLabel: REG_FORM_LBL,
      savedItemsHeadingLabel: REG_SAVED_ITEMS_HEADING_LBL,
      toEmailLabel: TO_EMAIL_LBL,
      submitButtonLabel: SUBMIT_BTN_LBL,
      cartContinueShopping: TYM_EMAIL_MODAL_CTA_LBL,
    };

    const renderEmailRegistry = (
      <EmailRegistry
        registryLabel={formLabels}
        clearSubmitResponse={this.clearSubmitResponse}
        checkBoxChecked={this.state.checkBoxChecked}
        handleCheckBox={this.handleCheckBox}
        submitForm={this.emailSubmitForm}
        emailSentResponse={this.state.emailSentResponse}
        iconType="email-registry-black"
        globalSwitchConfig={this.props.globalSwitchConfig}
        toggleShareModalState={this.toggleShareModalState}
        hideShareRegistryModal={this.hideShareRegistryModal}
        formWrapperData={formWrapperData}
        linkVariation="iconOnly"
        switchConfig={switchConfig}
        fromEmail={fromEmailIdValue}
      />
    );

    const isBabySiteId = getSiteId() === 'BuyBuyBaby';
    const registryEventType = pathOr(
      '',
      'registryResVO.registrySummaryVO.eventType',
      this.props.registryData
    );

    const shareURL = `store/giftregistry/viewregistryguest/${this.props.registryId}?eventType=${registryEventType}`;

    const signInDetails = {
      editText: SHARE_LABEL_AFTERWARD_LBL,
    };
    const eventDate = pathOr(
      '',
      'registryResVO.registrySummaryVO.eventDate',
      this.props.registryData
    );

    const registryUrl =
      typeof window !== 'undefined' &&
      `${window.location.protocol}//${window.location.host}/${shareURL}`;

    const renderEditRegistry = () => {
      return (
        <RenderEditRegistryLink
          key={2}
          registryID={registryId}
          labels={this.props.labels}
          loginLabels={this.props.loginLabels}
          signInDetails={signInDetails}
          customLabel={
            this.props.isNewRegDashboard
              ? EDIT_REGISTRY_DETAILS_DASHBOARD_LBL
              : EDIT_REGISTRY_DETAILS_LBL
          }
          isPublic={isPublic ? '1' : '0'}
          eventType={eventType}
          registryConfig={registryConfig}
          eventTypeCode={eventTypeCode}
          eventDate={eventDate}
          dynamicContentState={labelData}
        />
      );
    };

    // eslint-disable-next-line complexity
    const renderShareBtn = () => {
      const { shareBtnTheme } = this.props;
      const isBabyOrBBBNewHeader =
        isBBBNewRegistryHeader || isBabyNewRegistryHeader;
      if (isBabyOrBBBNewHeader && showLink) {
        return (
          <div
            className={classnames(styles.clickable)}
            aria-hidden="true"
            onClick={e => {
              // eslint-disable-next-line no-unused-expressions
              this.props.enableRegistryCollaboration
                ? this.renderShareandCollaboration()
                : this.handleModalVisiblity(e);
            }}
          >
            <Icon
              height={isMobile ? '32px' : '42px'}
              width={isMobile ? '32px' : '42px'}
              type={`${
                isBabyNewRegistryHeader
                  ? 'baby'
                  : isBBBNewRegistryHeader && 'bbb'
              }-share`}
            />
          </div>
        );
      } else if (showLink) {
        return (
          <PrimaryLink
            href="/"
            type={'bold'}
            className={styles.showLink}
            iconProps={{
              type: 'share-registry',
              width: '21px',
              height: '20px',
            }}
            variation={'primaryColoredIcon'}
            isIconAfterContent={false}
            onClick={e => {
              this.handleModalVisiblity(e);
            }}
            id="shareLinkButton"
          >
            {this.renderShareRegistryText()}
          </PrimaryLink>
        );
      }
      return (
        <Button
          onClick={e => {
            this.handleModalVisiblity(e);
          }}
          id="showShareModal"
          aria-label={SHARE_REGISTRY_CTA_LBL}
          className={classnames('mt0 sm-mb0 mb3', styles.showShareModalCTA)}
          theme={shareBtnTheme || 'secondary'}
          variation={
            !!shareBtnTheme && shareBtnTheme !== 'deactivated' && 'fullWidth'
          }
          data-locator={'registry-shareyourregistry-button'}
        >
          {SHARE_REGISTRY_CTA_LBL}
        </Button>
      );
    };
    const shareLbl = () => {
      if (this.props.isNewRegDashboard) {
        return SHARE_REGISTRY_PROMOPT_DASHBOARD_LBL;
      } else if (isBabySiteId) {
        return SHARE_REGISTRY_PROMOPT_BABY_LBL;
      }
      return SHARE_REGISTRY_PROMOPT_LBL;
    };
    return (
      <React.Fragment>
        {this.props.isNewRegDashboard && !isMobile && renderShareBtn()}
        <ModalDialog
          mountedState={this.state.shareModalVisiblity}
          toggleModalState={this.toggleShareModalState}
          titleAriaLabel="ShareThisRegistry"
          underlayClickExits={false}
          titleClass="mt1 mb1"
          verticallyCenter
          variation="medium"
          closeDataLocator="checkout-crossicon"
          onModalClose={this.onModalClose}
          dialogClass={this.state.shareContentVisiblity}
        >
          <Cell className={classnames(styles.shareModalWrapper)}>
            <Heading
              className={classnames(
                styles.heading,
                this.props.isNewRegDashboard && styles.headingNew,
                this.props.isNewRegDashboard &&
                  isBabySiteId &&
                  styles.headingBaby,
                isPublic ? '' : 'mt3 sm-mt0'
              )}
              styleVariation={!this.props.isNewRegDashboard && 'h2-serif'}
              level={2}
              id="shareModallHeading"
            >
              {this.props.isNewRegDashboard
                ? SHARE_DIALOG_HEADING_NEW_LBL
                : SHARE_DIALOG_HEADING_LBL}
            </Heading>
            <Paragraph
              theme="primary"
              className={classnames(
                styles.shareCopy,
                'mt2',
                this.props.isNewRegDashboard && styles.subHeading
              )}
            >
              {isBabySiteId
                ? SHARE_DIALOG_SUBHEADING_BABY_LBL
                : SHARE_DIALOG_SUBHEADING_LBL}
            </Paragraph>
            {!isPublic && (
              <Paragraph
                className={classnames(
                  styles.errorPrompt,
                  styles[`showNotification${showNotification}`],
                  'promptMessage'
                )}
              >
                <Icon type="notificationAlert" height="20px" width="20px" />
                <span className={classnames(styles.messageWrapper)}>
                  {shareLbl()}
                  {renderEditRegistry()}
                </span>
                <Button
                  onClick={this.closeNotification}
                  className={styles.closeButton}
                  iconProps={{
                    type: 'CloseIcon',
                    height: '16px',
                    width: '16px',
                  }}
                  aria-label={CLOSE_EDIT_REGISTRY_DETAILS_LBL}
                  variation="skipLink"
                />
              </Paragraph>
            )}
            <SocialShare
              renderEmailProps={renderEmailRegistry}
              services={services}
              enabled={isPublic}
              shareMode="newTab"
              sharePath={shareURL}
            />
            <Cell
              className={classnames(
                styles.copyURLSection,
                'mt2',
                isPublic ? '' : styles.socialShareDisabled
              )}
            >
              <div
                className={classnames(
                  styles.copyURLInputField,
                  this.enablePreYrReg && styles.inputProWidth,
                  'sm-mb2'
                )}
              >
                <FormInput
                  type="text"
                  name="registryUrl"
                  id="registryURL"
                  className={classnames(styles.registryURLInput)}
                  value={registryUrl}
                  labelPosition="append"
                  onClick={e => {
                    e.target.select();
                  }}
                  aria-label="registry url"
                  onChange={() => {}}
                />
              </div>
              <div className={classnames(styles.copyURLButton, 'sm-mb2')}>
                <Button
                  onClick={() => {
                    this.handleURLCopy(shareURL);
                  }}
                  className={classnames(styles.copyRegistryBtn)}
                  id="copyRegistryURL"
                  aria-label={TYM_COPY_REGISTRY_LBL}
                  theme={this.enablePreYrReg ? 'secondary' : 'primary'}
                  variation="fullWidth"
                  data-locator="copy_yourRegistry"
                >
                  {TYM_COPY_REGISTRY_LBL}
                </Button>
              </div>
              {this.enablePreYrReg && (
                <Button
                  theme="primary"
                  target="_blank"
                  id="closeShareModal"
                  className={classnames(styles.shareRegistryBtn)}
                  onClick={() => this.closeShareModal()}
                  href={`/store/giftregistry/viewregistryguest/${registryId}`}
                  data-locator="preview_yourRegistry"
                >
                  {PREVIEW_CTA_LBL}
                </Button>
              )}
            </Cell>
          </Cell>
        </ModalDialog>
        {!this.props.isNewRegDashboard && (
          <div
            className={classnames(styles.collaborationFlyout, styles.flyout)}
          >
            <FlyoutClickOutside
              arrowPosition="up"
              arrowOffset={isMobile ? `90%` : `88%`}
              onClickOutside={this.hideCollaborationFlyout}
            >
              {this.renderCollaborationBody()}
            </FlyoutClickOutside>
          </div>
        )}
      </React.Fragment>
    );
  }
}
ShareRegistry.propTypes = {
  registryData: PropTypes.object,
  labels: PropTypes.object,
  showLink: PropTypes.bool,
  registryId: PropTypes.string.isRequired,
  globalSwitchConfig: PropTypes.object,
  formWrapperData: PropTypes.object,
  switchConfig: PropTypes.object,
  eventType: PropTypes.string,
  registryConfig: PropTypes.object,
  handleTealiumEvent: PropTypes.func,
  eventTypeCode: PropTypes.string,
  emailId: PropTypes.string,
  labelData: PropTypes.object,
  loginLabels: PropTypes.object,
  isPreviewYrReg: PropTypes.bool,
  track: PropTypes.func,
  isBabyNewRegistryHeader: PropTypes.bool,
  isBBBNewRegistryHeader: PropTypes.bool,
  isMobile: PropTypes.bool,
  enableRegistryCollaboration: PropTypes.bool,
  handleCollaborationModal: PropTypes.func,
  shareBtnTheme: PropTypes.string,
  isNewRegDashboard: PropTypes.bool,
  isPublicState: PropTypes.bool,
};

export default ShareRegistry;
