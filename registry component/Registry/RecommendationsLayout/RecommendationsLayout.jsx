import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import pathOr from 'lodash/fp/pathOr';
import isEqual from 'lodash/fp/isEqual';
import isEmpty from 'lodash/fp/isEmpty';
import { isArray, debounce } from 'lodash';
import classnames from 'classnames';
import Icon from '@bbb-app/core-ui/icon';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import { getErrorCodeFromResponseErrorMessages } from '@bbb-app/utils/getErrorMessage';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import {
  NON_CROSSELL_PAGE,
  NON_CROSSELL_PRODUCT,
  FEO_SITE_INDICATOR,
  NON_SEARCH,
  NON_INTERNAL_CAMPAIGN,
  NON_BROWSE,
} from '@bbb-app/tealium/constants';
import Image from '@bbb-app/core-ui/image';
import getSiteId from '@bbb-app/utils/getSiteId';
import calculateOffset from '@bbb-app/utils/calculateOffset';
import SocialRecommendationContent from '../../../../containers/Pages/Registry/SocialRecommendationContent/SocialRecommendationContent';
import RecommendationFilters from './Recommendations/RecommendationFilters';
import NoRecommendation from './Recommendations/NoRecommendations';
import { recommendationSortConfig } from './RecommendationLayout';
import {
  NEW_FILTER_TAB,
  MAYBELATER_TAB,
  ADDED_TO_REGISTRY,
  GUIDES_AND_TOOLS,
  RECOMMENDER_TAB,
  DEFAULT_SORT_OPTION,
  TAKE_OUR_QUIZ_LBL,
  TAKE_OUR_QUIZ_SUBCOPY_LBL,
  PERSONALIZED_RECS_LBL,
  RECOMMENDATIONS_LBL,
  COLLABORATION_LBL,
  SHOW_MORE_LBL,
  SHOW_LESS_LBL,
  YOUR_REGISTRY_AGENT_NAME_LBL,
  YOUR_REGISTRY_AGENT_NAME_TBS_LBL,
} from './constants';

import { INVITE_MORE_FRIENDS_FAMILY } from '../../../../containers/Pages/Registry/Recommendations/constants';

import LoadingIndicator from './Skeleton';
import RecommendationList from './Recommendations/RecommendationList/RecommendationList';
import RegistryGuidesAndTools from '../../../../containers/PureContent/RegistryGuidesAndTools/RegistryGuidesAndTools';
import { RecommenderContent } from './RecommenderContent/RecommenderContent';
import RecommendEmailFrequency from '../EmailFrequency/RecommendEmailFrequency';
import styles from './Recommendations/RecommendationList/RecommendationRow/Recommendation.css';
import QuickPicksRecommendation from './QuickPicksRecommendation.async';
import {
  BLOCKED_TXT_LBL,
  NEW_SOCIAL_REC_LBL,
  NO_NEW_RECOMMENDATION_ATR_TXT_LBL,
  NO_NEW_RECOMMENDATION_MAY_BE_TXT_LBL,
  NO_NEW_RECOMMENDATION_TXT_LBL,
  UNBLOCKED_TXT_LBL,
  CANCEL_BTN_LBL,
} from '../constants';

/* Labels */
const RECOMMENDER_MODAL_TITLE_BLOCK_LBL =
  'Are you sure you want to block this recommender?';
const RECOMMENDER_MODAL_TITLE_UN_BLOCK_LBL =
  'Are you sure you want to unblock this recommender?';
const RECOMMENDER_MODAL_TITLE_UN_BLOCK_CONTENT_LBL =
  'You will see all future recommendations and the recommender will not be notified of this change.';
const RECOMMENDER_MODAL_TITLE_BLOCK_CONTENT_LBL =
  'You will no longer see any recomendations from this recommender and the recommender will not be notified of this change.';
const RECOMMENDER_BLOCKED_LBL = 'This recommender has been blocked.';
const RECOMMENDER_UN_BLOCKED_LBL = 'This recommender has been unblocked.';
const SEE_ALL_MY_ITEMS_LBL = 'See All My Items';
const ADD_TO_REGISTRY_LBL = 'Add to Registry';
const MOVE_TO_MY_ITEMS_LBL = 'has been moved to My Items.';
const MOVE_TO_MAY_BE_LATER_LBL = 'has been moved to May be later.';
const YOUR_REGISTRANT_AGENT_TITLE_LBL = 'Your Registry Consultant';
const RECOMMENDATION_FROM_LBL = 'From';
const QUICK_VIEW_LBL = 'Quick View';
const RECOMMENDER_MODAL_OK_BTN_LBL = 'OK';
const REGISTRY_DETAILS_ERROR_LBL = {
  registryDetails_ECB00001:
    'Invalid or Missing _dynSessConf in request Header.',
  registryDetails_genericError: 'Something went wrong, please try later.',
};
const MOVE_TO_NEW_LBL = 'Move To New';

export class RecommendationsLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.registryId = props.match.params.id;

    this.state = {
      filterOption: NEW_SOCIAL_REC_LBL,
      tabId: 0,
      selectedDropdownOption: undefined,
      defaultDropdownOption: DEFAULT_SORT_OPTION,
      isConfirmationModalMounted: false,
      formValues: null,
    };
    this.guidesAndToolsContentId = null;
    this.fetchRecommendationData = this.fetchRecommendationData.bind(this);
    this.getSortConfigForTab = this.getSortConfigForTab.bind(this);
    this.updateView = this.updateView.bind(this);
    this.renderGuideAndTools = this.renderGuideAndTools.bind(this);
    this.closeBlockUnblockModal = this.closeBlockUnblockModal.bind(this);
    this.revealBlockUnblockModal = this.revealBlockUnblockModal.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.closeModalAndResetData = this.closeModalAndResetData.bind(this);
    this.submitBlockOrUnblockRecommender = this.submitBlockOrUnblockRecommender.bind(
      this
    );
    this.getTealiumObj = this.getTealiumObj.bind(this);
    this.renderQuizQnALayout = this.renderQuizQnALayout.bind(this);
    this.getContentStackData = this.getContentStackData.bind(this);
  }

  /*
   *function getRecommendations
   *passing default second and third parameter for first time as per config
   *If the user clicks on the Recommendations tab for the first time, a call to the
   *recommendations API is performed to fetch recommendations list
   */
  componentDidMount() {
    const tabSortConfig = this.getSortConfigForTab(this.state.tabId);
    const registryEventType = pathOr(null, 'eventTypeCode', this.props);
    this.props.sortRecommendationList(
      this.registryId,
      this.state.tabId,
      tabSortConfig.default || DEFAULT_SORT_OPTION,
      registryEventType
    );
    this.guidesAndToolsContentId = this.getContentID(
      this.props.labels,
      GUIDES_AND_TOOLS
    );
    if (this.guidesAndToolsContentId) {
      this.props.getContent([this.guidesAndToolsContentId]);
    }
  }

  componentWillReceiveProps() {
    if (
      this.props.personaType &&
      this.props.isFromRecommendation &&
      this.props.switchConfig.enableRegistryQuiz
    ) {
      this.props.setQuizFromRecommendation();
      const getRecommendationsOffsetY = document.getElementById(
        'getRecommendations'
      );
      const offset = calculateOffset(getRecommendationsOffsetY);
      debounce(() => window.scrollTo(0, offset.top - 250), 0)();
    }
  }

  getSortConfigForTab(tabId) {
    const config = {};
    let tabSortConfig = {};
    let selectedIndex = -1;
    const tabs =
      recommendationSortConfig && Object.keys(recommendationSortConfig);

    if (isArray(tabs) && tabs.length > 0) {
      for (let index = 0; index < tabs.length; index += 1) {
        if (
          recommendationSortConfig[tabs[index]] &&
          recommendationSortConfig[tabs[index]].tabId === tabId
        ) {
          tabSortConfig = recommendationSortConfig[tabs[index]];
          selectedIndex = index;
          break;
        }
      }
    }
    config.tabSortConfig = tabSortConfig;
    config.selectedIndex = selectedIndex;
    const updateDefaultConfig = true;
    this.updateView(tabSortConfig.default, updateDefaultConfig);
    return config;
  }

  /**
   * Function returning the id with which to identify the referred content data.
   * @param {[object]} labels [Labels object]
   * @returns {[string]} id [Content ID from labels to match with data returned from dynamic content api call]
   */
  getContentID(labels, key) {
    const { referredContent } = labels;
    let id = null;
    referredContent.forEach(obj => {
      /* istanbul ignore else  */
      if (isEqual(obj.key, key)) {
        id = obj.id;
      }
    });
    return id;
  }

  getTealiumObj(tabId) {
    const CHANNEL = 'Registry';
    const PAGENAME_BREADCRUMB = 'Registry View Page';
    const CALL_TO_ACTIONTYPE = 'registry tab click';
    const REGISTRY = 'Registry';
    const updatedValue = 'Recommendations';
    const registryId = this.registryId;
    const eventType = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.eventType',
      this.props
    );
    const pageType = getCurrentTab(tabId);
    const tealiumObj = {
      content_pagetype: '',
      product_pagetype: '',
      pagename_breadcrumb: PAGENAME_BREADCRUMB,
      channel: CHANNEL,
      call_to_actiontype: CALL_TO_ACTIONTYPE,
      crossell_page: NON_CROSSELL_PAGE,
      crossell_product: NON_CROSSELL_PRODUCT,
      feo_site_indicator: FEO_SITE_INDICATOR,
      internal_search_term: NON_SEARCH,
      registry_id: registryId,
      registry_type: eventType,
      registry_tab_name: pageType,
      product_finding_method: `${REGISTRY} ${updatedValue}:${pageType}`,
      internal_campaign: NON_INTERNAL_CAMPAIGN,
      merchandising_main_level: NON_BROWSE,
      merchandising_category: NON_BROWSE,
      merchandising_subcategory: NON_BROWSE,
    };
    return tealiumObj;
  }

  getContentStackData() {
    this.props.fetchContentStack(
      false,
      '/store/static/registry-quiz-success-modal'
    );
  }

  updateView(view, updateDefaultConfig) {
    if (updateDefaultConfig && this.state.defaultDropdownOption !== view) {
      this.setState({
        defaultDropdownOption: view,
      });
    } else if (
      !updateDefaultConfig &&
      this.state.selectedDropdownOption !== view
    ) {
      this.setState({
        selectedDropdownOption: view,
      });
    }
  }

  yourRegistryAgentNameLabel =
    getSiteId() === 'TBS_BedBathUS'
      ? YOUR_REGISTRY_AGENT_NAME_TBS_LBL
      : YOUR_REGISTRY_AGENT_NAME_LBL;

  fetchRecommendationData(tabId, sortOption, filterOptionVal) {
    const registryEventType = pathOr(null, 'eventTypeCode', this.props);
    if (tabId === RECOMMENDER_TAB) {
      this.props.getRecommenderSummary(this.registryId, tabId);
    } else {
      this.props.sortRecommendationList(
        this.registryId,
        tabId,
        sortOption,
        registryEventType
      );
    }

    if (tabId !== this.state.tabId) {
      const tealiumObj = this.getTealiumObj(tabId);
      const TEALIUM_PAGE_INFO = {
        page_type: 'Registry',
        page_name: 'registry tab click',
      };
      this.props.fireTealiumAction(
        'registry tab click',
        tealiumObj,
        TEALIUM_PAGE_INFO
      );
    }
    this.setState({
      label: this.tabContentView(tabId),
      filterOption: filterOptionVal,
      tabId,
      selectedDropdownOption: undefined,
    });
  }

  tabContentView(tabId) {
    let emptyView = '';
    if (tabId === NEW_FILTER_TAB) {
      emptyView = NO_NEW_RECOMMENDATION_TXT_LBL;
    } else if (tabId === MAYBELATER_TAB) {
      emptyView = NO_NEW_RECOMMENDATION_MAY_BE_TXT_LBL;
    } else if (tabId === ADDED_TO_REGISTRY) {
      emptyView = NO_NEW_RECOMMENDATION_ATR_TXT_LBL;
    }
    return emptyView;
  }

  isListOrNoNewComponent() {
    const ref = this.props.recommendationList;
    const recommenderSummary = this.props.recommenderSummary;
    const friendFamilyId = this.getContentID(
      this.props.labels,
      INVITE_MORE_FRIENDS_FAMILY
    );
    let returnedComp = null;
    if (this.props.isLoading) {
      returnedComp = <LoadingIndicator />;
    } else if (typeof ref !== 'object') {
      returnedComp = null;
    } else if (
      this.state.tabId === RECOMMENDER_TAB &&
      recommenderSummary &&
      Object.keys(recommenderSummary).length > 0
    ) {
      returnedComp = (
        <React.Fragment>
          <RecommenderContent
            recommenderData={recommenderSummary}
            isMobile={this.props.isMobile}
            socialRecommendUserBlockUnblock={
              this.props.socialRecommendUserBlockUnblock
            }
            registryId={pathOr(
              null,
              'registryData.registryResVO.registrySummaryVO.registryId',
              this.props
            )}
            revealBlockUnblockModal={this.revealBlockUnblockModal}
          />
          <RecommendEmailFrequency
            contentId={friendFamilyId}
            eventYetToCome={pathOr(
              true,
              'registryData.registryResVO.registrySummaryVO.eventYetToCome',
              this.props
            )}
            privateRegistry={pathOr(
              '0',
              'registryData.registryResVO.registrySummaryVO.isPublic',
              this.props
            )}
            {...this.props}
          />
        </React.Fragment>
      );
    } else if (Object.keys(ref.categoryBucketsForRecommendation).length > 0) {
      returnedComp = (
        <div className={styles.containerGrey}>
          <RecommendationList
            recommendationList={ref.categoryBucketsForRecommendation}
            sortOptionApplied={ref.groupByFlag}
            scene7URL={this.props.scene7UrlConfig}
            isMobile={this.props.isMobile.isMobileScreen}
            addtoRegistryLabel={ADD_TO_REGISTRY_LBL}
            moveToNewLabel={MOVE_TO_NEW_LBL}
            tabId={this.state.tabId}
            showMore={SHOW_MORE_LBL}
            showLess={SHOW_LESS_LBL}
            seeAllMyItemsLabel={SEE_ALL_MY_ITEMS_LBL}
            moveToMyItemsLabel={MOVE_TO_MY_ITEMS_LBL}
            yourRegistryAgentTitleLabel={YOUR_REGISTRANT_AGENT_TITLE_LBL}
            yourRegistryAgentNameLabel={this.yourRegistryAgentNameLabel}
            recommendationFromLabel={RECOMMENDATION_FROM_LBL}
            quickViewLabel={QUICK_VIEW_LBL}
            isQuickViewOpen={this.props.isQuickViewOpen}
            moveToMayBeLaterLabel={MOVE_TO_MAY_BE_LATER_LBL}
            endPoints={this.props.endPoints}
            addedToRegistryFlag={this.props.addedToRegistryFlag}
            mayBeLaterBtnCall={this.props.mayBeLaterBtnCall}
            selectMayBeLaterFlag={this.props.selectMayBeLaterFlag}
            onQuickViewButtonClick={this.props.onQuickViewButtonClick}
            switchConfig={this.props.switchConfig}
            recommendationCommentLimitPageConfig={
              this.props.recommendationCommentLimitPageConfig
            }
            registryId={pathOr(
              null,
              'registryData.registryResVO.registrySummaryVO.registryId',
              this.props
            )}
            registryEventType={pathOr(
              null,
              'registryData.registryResVO.registrySummaryVO.eventType',
              this.props
            )}
          />
        </div>
      );
    } else if (Object.keys(ref.categoryBucketsForRecommendation).length === 0) {
      returnedComp = <NoRecommendation />;
    }
    return [
      <RecommendationFilters
        {...this.props}
        fetchRecommendationData={this.fetchRecommendationData}
        selectedFilterOption={this.state.filterOption}
        registryId={this.registryId}
        updateView={this.updateView}
        selectedDropdownOption={this.state.selectedDropdownOption}
        getSortConfigForTab={this.getSortConfigForTab}
        registryEventType={pathOr(
          null,
          'registryData.registryResVO.registryVO.registryType.registryTypeName',
          this.props
        )}
        tabId={this.state.tabId}
      />,
      returnedComp,
    ];
  }
  /* getAttribute for IE */
  revealBlockUnblockModal(e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      isConfirmationModalMounted: true,
      formValues: {
        registryId: target.getAttribute('data-registryId'),
        recommenderProfileId: target.getAttribute('data-recommenderProfileId'),
        requestedFlag: target.getAttribute('data-requestedFlag'),
        fromAssociate: target.getAttribute('data-fromAssociate'),
      },
    });
  }

  closeBlockUnblockModal() {
    this.setState({
      isConfirmationModalMounted: false,
    });
  }

  toggleModalState(state) {
    this.setState({
      isConfirmationModalMounted: !state,
    });
  }

  submitBlockOrUnblockRecommender(e) {
    e.preventDefault();
    if (!isEmpty(this.state.formValues)) {
      this.props.socialRecommendUserBlockUnblock(this.state.formValues);
    }
  }

  closeModalAndResetData() {
    const { resetBlockUnblockData, blockUnblockSuccess } = this.props;
    this.closeBlockUnblockModal();
    if (blockUnblockSuccess) {
      resetBlockUnblockData();
    }
  }

  recommendationHeader() {
    const { handleCollaborationModal, switchConfig } = this.props;
    const siteId = getSiteId();
    const isBedbath = siteId.indexOf('BedBath') > -1;
    const isMobile = pathOr(true, 'isMobile.isMobileScreen', this.props);
    return (
      <div className={styles.containerGrey}>
        <section
          role="region"
          aria-labelledby="get-recommendations"
          id="getRecommendations"
          className="grid-container"
        >
          <GridX
            className={classnames(
              'pt3 pb2',
              styles.recommendationHeadingBorder
            )}
          >
            <Cell className="large-10 small-9">
              <Heading level={2} className={styles.recommendationsHeading}>
                {RECOMMENDATIONS_LBL}
              </Heading>
            </Cell>
            {switchConfig.enableRegistryCollaboration && (
              <Cell className="large-2 small-3 lg-right-align md-right-align sm-right-align">
                <PrimaryLink
                  href="#"
                  className={classnames(styles.invitetoCollaborate)}
                  onClick={() => handleCollaborationModal()}
                  type="noUnderline"
                  id="invitetoCollaborateFromRecommendation"
                >
                  <span className={classnames(styles.collaborateIconContainer)}>
                    <Icon
                      type={'collab-invite'}
                      width="20px"
                      height="22px"
                      tabIndex={-1}
                    />
                  </span>
                  {!isMobile && (
                    <span
                      className={classnames(
                        isBedbath
                          ? styles.collaborationTxtBedbath
                          : styles.collaborationTxt
                      )}
                    >
                      {COLLABORATION_LBL}
                    </span>
                  )}
                </PrimaryLink>
              </Cell>
            )}
          </GridX>
        </section>
      </div>
    );
  }

  renderRecommendarConfirmationModal() {
    const { formValues } = this.state;
    return (
      <ModalDialog
        mountedState={this.state.isConfirmationModalMounted}
        toggleModalState={this.toggleModalState}
        titleAriaLabel={`Recommendation user ${formValues &&
          formValues.requestedFlag} confirmation modal`}
        verticallyCenter
        variation="small"
        scrollDisabled
        onModalClose={this.closeModalAndResetData}
      >
        {this.props.blockUnblockSuccess
          ? this.renderBlockUnblockSuccess()
          : this.renderConfirmationModalContent()}
      </ModalDialog>
    );
  }

  renderConfirmationModalContent() {
    const { formValues } = this.state;
    const { blockUnblockError } = this.props;
    const shouldRenderBlockContent = formValues.requestedFlag === 'block';
    let errorCode = null;
    if (blockUnblockError) {
      errorCode =
        getErrorCodeFromResponseErrorMessages(blockUnblockError) ||
        'genericError';
    }
    return shouldRenderBlockContent ? (
      <GridX>
        <Cell>
          <Heading level="3" styleVariation="h3-sans" className="mb3">
            {RECOMMENDER_MODAL_TITLE_BLOCK_LBL}
          </Heading>
          <Paragraph theme="primary" className="mb3">
            {RECOMMENDER_MODAL_TITLE_BLOCK_CONTENT_LBL}
          </Paragraph>
          <Button
            className="mb1"
            variation="Primary"
            onClick={this.submitBlockOrUnblockRecommender}
            data-locator="rg-rl-block-unblock"
          >
            {BLOCKED_TXT_LBL}
          </Button>
          {blockUnblockError && (
            <Paragraph theme="primary" variation="errorMessage" className="mt1">
              {pathOr(
                'Something went wrong, please try later.',
                `registryDetails_${errorCode}`,
                REGISTRY_DETAILS_ERROR_LBL
              )}
            </Paragraph>
          )}
        </Cell>
        <Cell>
          <PrimaryLink
            href="#"
            variation="primary"
            onClick={this.closeBlockUnblockModal}
            type="bold"
            data-locator="rg-rl-block-close"
          >
            {CANCEL_BTN_LBL}
          </PrimaryLink>
        </Cell>
      </GridX>
    ) : (
      <GridX>
        <Cell>
          <Heading level="3" styleVariation="h3-sans" className="mb3">
            {RECOMMENDER_MODAL_TITLE_UN_BLOCK_LBL}
          </Heading>
          <Paragraph theme="primary" className="mb3">
            {RECOMMENDER_MODAL_TITLE_UN_BLOCK_CONTENT_LBL}
          </Paragraph>
          <Button
            className="mb1"
            variation="Primary"
            onClick={this.submitBlockOrUnblockRecommender}
            data-locator="rg-rl-block-unblock"
          >
            {UNBLOCKED_TXT_LBL}
          </Button>
          {blockUnblockError && (
            <Paragraph theme="primary" variation="errorMessage" className="mt1">
              {pathOr(
                'Something went wrong, please try later.',
                `registryDetails_${errorCode}`,
                REGISTRY_DETAILS_ERROR_LBL
              )}
            </Paragraph>
          )}
        </Cell>
        <Cell>
          <PrimaryLink
            href="#"
            variation="primary"
            onClick={this.closeBlockUnblockModal}
            type="bold"
            data-locator="rg-rl-block-close"
          >
            {CANCEL_BTN_LBL}
          </PrimaryLink>
        </Cell>
      </GridX>
    );
  }

  renderBlockUnblockSuccess() {
    const { formValues } = this.state;
    const shouldRenderBlockContent = formValues.requestedFlag === 'block';
    return shouldRenderBlockContent ? (
      <GridX>
        <Cell className="large-10 small-12">
          <Heading styleVariation="h3-sans" level="3" className="mb4">
            {RECOMMENDER_BLOCKED_LBL}
          </Heading>
          <Button
            variation="Primary"
            onClick={this.closeModalAndResetData}
            data-locator="rg-rl-closemodal"
          >
            {RECOMMENDER_MODAL_OK_BTN_LBL}
          </Button>
        </Cell>
      </GridX>
    ) : (
      <GridX>
        <Cell className="large-10 small-12">
          <Heading level="3" styleVariation="h3-sans" className="mb4">
            {RECOMMENDER_UN_BLOCKED_LBL}
          </Heading>
          <Button
            variation="Primary"
            onClick={this.closeModalAndResetData}
            data-locator="rg-rl-closemodal"
          >
            {RECOMMENDER_MODAL_OK_BTN_LBL}
          </Button>
        </Cell>
      </GridX>
    );
  }
  /**
   * returns the Empty view for Recommendations tab
   */

  renderRecommendationsEmptyView(isBabySite) {
    return (
      this.props.switchConfig.enableRecommendationsPublicEmptyView && (
        <ErrorBoundary>
          <SocialRecommendationContent
            {...this.props}
            isRegistryPublic={pathOr(
              null,
              'registryData.registryResVO.registrySummaryVO.isPublic',
              this.props
            )}
            isBabySite={isBabySite}
            renderGuideAndTools={this.renderGuideAndTools}
          />
        </ErrorBoundary>
      )
    );
  }

  renderGuideAndTools(contentState, id) {
    return (
      <RegistryGuidesAndTools
        contentData={contentState.content}
        contentId={id}
        inputProps={{ className: 'grid-container pt4' }}
        {...this.props}
      />
    );
  }

  renderQuizQnALayout() {
    const scrollPosition = window.scrollY;
    this.getContentStackData();
    this.props.fetchQuizModal(scrollPosition);
    this.props.fireTealiumQuiz();
  }

  renderQuizNotTakenRecommendation() {
    return (
      <div className="fullWidth grid-container">
        <GridX
          className={classnames(
            'grid-container mt3',
            styles.quizNotTakenHeader
          )}
        >
          <Cell className="large-10">
            <Heading level={1} className={classnames('pt15 pb1', styles.title)}>
              {PERSONALIZED_RECS_LBL}
            </Heading>

            <Cell className="pb15">{TAKE_OUR_QUIZ_SUBCOPY_LBL}</Cell>

            <Button
              theme="secondary"
              data-locator="recommendation-takeQuiz"
              className={classnames('mb15', styles.btnWidth)}
              onClick={this.renderQuizQnALayout}
            >
              {TAKE_OUR_QUIZ_LBL}
            </Button>
          </Cell>

          <Cell className={classnames(styles.rightImage, 'large-2')}>
            <Image
              alt="babyConfRight"
              src="/static/assets/images/babyConfRight.png"
            />
          </Cell>
        </GridX>
      </div>
    );
  }

  renderQuizRecommendationContent() {
    const { personaType, quickPickId } = this.props;
    const match = { params: { collectionId: quickPickId } };
    return (
      <section
        role="region"
        aria-labelledby="quiz-recommendations"
        className={styles.containerGrey}
      >
        <GridX>
          {personaType ? (
            <QuickPicksRecommendation
              fromRecomendation
              match={match}
              personaType={personaType}
              renderQuizQnALayout={this.renderQuizQnALayout}
              isResponsive={this.props.isMobile}
            />
          ) : (
            this.renderQuizNotTakenRecommendation()
          )}
        </GridX>
      </section>
    );
  }

  /**
   * Renders Recommendations Tab Content
   */

  renderRecommendationContent() {
    const { switchConfig, contentState, labels, childrens } = this.props;
    const recommendationCount = pathOr(
      null,
      'registryData.recommendationCount[1]',
      this.props
    );
    const registryType = pathOr('', 'eventType', this.props.activeRegistry);
    const id = this.getContentID(labels, GUIDES_AND_TOOLS);
    const isBabySite =
      getSiteId().includes('BuyBuyBaby') && registryType === 'Baby';
    if (switchConfig.enableRecommendationsView) {
      return (
        <React.Fragment>
          <div>
            {((isBabySite && switchConfig.enableRegistryQuiz) ||
              switchConfig.enableRegistryCollaboration) &&
              this.recommendationHeader()}
            {isBabySite &&
              switchConfig.enableRegistryQuiz &&
              this.renderQuizRecommendationContent()}
            <div className={styles.recommendationGrey}>{childrens}</div>
            {this.props.registryData &&
              recommendationCount === 0 &&
              this.renderRecommendationsEmptyView(isBabySite)}
            {this.props.registryData &&
              recommendationCount !== 0 &&
              this.isListOrNoNewComponent()}
            {this.props.registryData &&
              recommendationCount !== 0 &&
              this.renderGuideAndTools(contentState, id)}
            {this.state.isConfirmationModalMounted &&
              this.renderRecommendarConfirmationModal()}
          </div>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    return this.renderRecommendationContent();
  }
}

RecommendationsLayout.propTypes = {
  sortRecommendationList: PropTypes.func,
  onQuickViewButtonClick: PropTypes.func,
  registryData: PropTypes.any,
  match: PropTypes.object,
  switchConfig: PropTypes.object,
  recommendationList: PropTypes.object,
  scene7UrlConfig: PropTypes.string,
  isMobile: PropTypes.object,
  isLoading: PropTypes.bool,
  labels: PropTypes.object,
  contentState: PropTypes.object,
  endPoints: PropTypes.object,
  addedToRegistryFlag: PropTypes.bool,
  mayBeLaterBtnCall: PropTypes.func,
  socialRecommendUserBlockUnblock: PropTypes.func,
  getContent: PropTypes.func,
  selectMayBeLaterFlag: PropTypes.bool,
  recommendationCommentLimitPageConfig: PropTypes.number,
  blockUnblockSuccess: PropTypes.bool,
  resetBlockUnblockData: PropTypes.func,
  blockUnblockError: PropTypes.object,
  recommenderSummary: PropTypes.object,
  fireTealiumAction: PropTypes.func,
  fireTealiumQuiz: PropTypes.func,
  getRecommenderSummary: PropTypes.func,
  isQuickViewOpen: PropTypes.bool,
  childrens: PropTypes.object,
  fetchQuizModal: PropTypes.func,
  personaType: PropTypes.string,
  fetchContentStack: PropTypes.func,
  activeRegistry: PropTypes.object,
  quickPickId: PropTypes.string,
  handleCollaborationModal: PropTypes.func,
  isFromRecommendation: PropTypes.bool,
  setQuizFromRecommendation: PropTypes.func,
};

export function getCurrentTab(tabId) {
  switch (tabId) {
    case NEW_FILTER_TAB:
      return 'New';
    case ADDED_TO_REGISTRY:
      return 'Added to Registry';
    case MAYBELATER_TAB:
      return 'Maybe Later';
    case RECOMMENDER_TAB:
      return 'Recommenders';
    default:
      return 'New';
  }
}
export default withRouter(RecommendationsLayout);
