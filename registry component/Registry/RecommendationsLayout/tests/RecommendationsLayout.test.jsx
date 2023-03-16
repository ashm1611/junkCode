import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import Icon from '@bbb-app/core-ui/icon';
import { RecommendationsLayout, getCurrentTab } from '../RecommendationsLayout';
import SocialRecommendationContent from '../../../../../containers/Pages/Registry/SocialRecommendationContent/SocialRecommendationContent';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  let siteIdStub;
  before(() => {
    siteIdStub = sinon.stub(getSiteId, 'default').returns('BuyBuyBaby');
  });
  after(() => {
    siteIdStub.restore();
  });
  const renderRecommendationContent = sinon.spy();
  const renderRecommendationsEmptyView = sinon.spy();
  const renderQuizRecommendationContent = sinon.spy();
  const fetchContentStack = sinon.spy();
  const fetchQuizModal = sinon.spy();
  const fireTealiumQuiz = sinon.spy();
  const redirectTo = sinon.spy();
  const sortRecommendationList = sinon.spy();
  const getRecommendations = sinon.spy();
  const getContent = sinon.spy();
  const getRecommenderSummary = sinon.spy();
  const fireTealiumAction = sinon.spy();
  const resetBlockUnblockData = sinon.spy();
  const socialRecommendUserBlockUnblock = sinon.spy();
  const handleCollaborationModal = sinon.spy();
  const setQuizFromRecommendation = sinon.spy();
  let switchConfig = {
    enableRecommendationsView: true,
    enableRecommendationsPublicEmptyView: true,
    enableRegistryQuiz: true,
  };

  let registryData = {
    recommendationCount: [0, 0],
  };
  const match = {
    params: {
      id: '123',
    },
  };
  const labels = {
    registryDetails: {},
    referredContent: [
      { key: 'registryGuidesAndToolsContent', id: '123' },
      { key: 'guideAndTools', id: '124' },
    ],
  };
  const props = {
    contentState: { content: { '123': { key1: 'val1' } } },
    fetchContentStack,
    siteId: 'BedBathUS',
    deviceConfig: 'config',
    recommendationList: {
      categoryBucketsForRecommendation: {
        'DC158375785:Szs Sdsz': [
          {
            acceptedQuantity: 0,
            declinedQuantity: 0,
            fullName: 'Karan M',
            profileActive: true,
            recommendedQuantity: 1,
          },
        ],
        associate: [
          {
            acceptedQuantity: 0,
            declinedQuantity: 0,
            fullName: 'Karan M',
            profileActive: true,
            recommendedQuantity: 1,
          },
        ],
      },
    },
    switchConfig,
    recommenderSummary: {
      0: { abc: 'data' },
    },
    activeRegistry: {
      registryId: '123',
      eventType: 'Baby',
    },
    quickPickId: '123',
    isFromRecommendation: true,
  };
  const globalSwitchConfig = {};
  const recommendationSortConfig = { id: { tabId: 0 } };
  it('should render correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        sortRecommendationList={sortRecommendationList}
        props={props}
        labels={labels}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        {...props}
        isBabySite
      />
    );
    tree.instance().renderRecommendationsEmptyView();
    expect(tree.find(SocialRecommendationContent)).to.have.lengthOf(1);
  });

  it('should call componentWillReceiveProps method', () => {
    const tree = shallow(
      <RecommendationsLayout
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        sortRecommendationList={sortRecommendationList}
        props={props}
        labels={labels}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        setQuizFromRecommendation={setQuizFromRecommendation}
        personaType={'Modern'}
        {...props}
      />
    );
    tree.instance().componentWillReceiveProps();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should renderQuizRecommendationContent  correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        renderQuizRecommendationContent={renderQuizRecommendationContent}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        sortRecommendationList={sortRecommendationList}
        props={props}
        labels={labels}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        {...props}
      />
    );
    tree.instance().renderQuizRecommendationContent();
    expect(tree.find('.containerGrey')).to.have.lengthOf(2);
  });

  it('should renderQuizNotTakenRecommendation  correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        renderQuizRecommendationContent={renderQuizRecommendationContent}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        sortRecommendationList={sortRecommendationList}
        props={props}
        labels={labels}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        personaType={''}
        registryResVO={{ registrySummaryVO: { personaName: 'Modern' } }}
        {...props}
      />
    );
    expect(tree.find('.quizNotTakenHeader')).to.have.lengthOf(1);
  });

  it('should call renderQuizQnALayout', () => {
    const wrapper = shallow(
      <RecommendationsLayout
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        sortRecommendationList={sortRecommendationList}
        props={props}
        labels={labels}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        fetchQuizModal={fetchQuizModal}
        fireTealiumQuiz={fireTealiumQuiz}
        redirectTo={redirectTo}
        {...props}
      />
    );
    wrapper.instance().renderQuizQnALayout();
    // eslint-disable-next-line no-unused-expressions
    expect(fetchQuizModal).to.be.called;
  });

  it('should render null for RecommendationsLayout', () => {
    switchConfig = {
      enableRecommendationsView: false,
      enableRecommendationsPublicEmptyView: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
      />
    );
    expect(tree.type()).to.equal(null);
  });
  it('should render QuickPicksRecommendation for RecommendationsLayout', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        renderQuizRecommendationContent={renderQuizRecommendationContent}
        registryData={registryData}
        match={match}
        switchConfig={switchConfig}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        getContent={getContent}
        contentState={{ content: { '123': { key1: 'val1' } } }}
        globalSwitchConfig={globalSwitchConfig}
        recommendationSortConfig={recommendationSortConfig}
        personaType={'Modern'}
        {...props}
      />
    );
    expect(tree.find('.quizNotTakenHeader')).to.have.lengthOf(0);
  });

  it('should render only static content when enableRecommendationsView is off', () => {
    switchConfig = {
      enableRecommendationsView: false,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should call updateView function correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.updateView();
    expect(wrapperInstance.state.selectedDropdownOption).to.equal(undefined);
    wrapperInstance.updateView('newView');
    expect(wrapperInstance.state.selectedDropdownOption).to.equal('newView');
    wrapperInstance.updateView('testthisdefault', true);
    expect(wrapperInstance.state.defaultDropdownOption).to.equal(
      'testthisdefault'
    );
  });
  it('should check getCurrentTab functioanllity', () => {
    const NEW_FILTER_TAB = getCurrentTab(0);
    const ADDED_TO_REGISTRY = getCurrentTab(1);
    const MAYBELATER_TAB = getCurrentTab(2);
    const RECOMMENDER_TAB = getCurrentTab(3);
    const defaultC = getCurrentTab(4);
    expect(NEW_FILTER_TAB).to.equal('New');
    expect(ADDED_TO_REGISTRY).to.equal('Added to Registry');
    expect(MAYBELATER_TAB).to.equal('Maybe Later');
    expect(RECOMMENDER_TAB).to.equal('Recommenders');
    expect(defaultC).to.equal('New');
  });

  it('should call fetchRecommendationData function correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.fetchRecommendationData(0, 1, 1);
    expect(getRecommenderSummary.called);
    wrapperInstance.fetchRecommendationData(3, 1, 1);
    expect(getRecommenderSummary.called);
    wrapperInstance.fetchRecommendationData(2, 1, 1);
    expect(sortRecommendationList.called);
    wrapperInstance.fetchRecommendationData(1, 1, 1);
    expect(sortRecommendationList.called);
    wrapperInstance.fetchRecommendationData(0, 1, 1);
    expect(sortRecommendationList.called);
  });
  it('should call isListOrNoNewComponent function correctly', () => {
    registryData = {
      recommendationCount: [0, 1],
    };
    const recommenderSummary = {
      0: {},
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        isLoading
        recommendationList={'abc'}
      />
    );
    tree.setState({ tabId: 3 });
    tree.setProps({ recommenderSummary });
    tree.instance().isListOrNoNewComponent();
    const wrapperInstance = tree.instance();
    wrapperInstance.closeModalAndResetData();
    expect(resetBlockUnblockData.called);

    tree.setProps({ isLoading: false });
    tree.instance().isListOrNoNewComponent();
    expect(resetBlockUnblockData.called);
  });
  it('should call toggleModalState function correctly', () => {
    const recommenderSummary = {
      0: {},
    };
    const recommendationList = [];
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
      />
    );
    tree.setState({ tabId: 3 });
    tree.setProps({ recommenderSummary });
    tree.setProps({ recommendationList });
    tree.instance().isListOrNoNewComponent();
    const e = { preventDefault: () => {} };
    tree.instance().submitBlockOrUnblockRecommender(e);
    const wrapperInstance = tree.instance();
    wrapperInstance.toggleModalState(true);
    expect(wrapperInstance.state.isConfirmationModalMounted).to.equal(false);
  });
  it('should call submitBlockOrUnblockRecommender function correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
      />
    );
    const e = { preventDefault: () => {} };
    tree.setState({ formValues: { data: {} } });
    const wrapperInstance = tree.instance();
    wrapperInstance.submitBlockOrUnblockRecommender(e);
    expect(socialRecommendUserBlockUnblock.called);
  });
  it('should call revealBlockUnblockModal function correctly', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
      />
    );
    const e = {
      preventDefault: () => {},
      target: {
        getAttribute: sinon.spy(),
      },
    };
    const wrapperInstance = tree.instance();
    wrapperInstance.revealBlockUnblockModal(e);
    expect(wrapperInstance.state.isConfirmationModalMounted).to.equal(true);
  });
  it('should render properly without recommendationSortConfig-1', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={null}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
      />
    );
    tree.instance().getSortConfigForTab();
    expect(tree).to.not.equal(null);
  });
  it('should render properly without recommendationSortConfig-2', () => {
    const label = { referredContent: [] };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={label}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={null}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.setState({
      isConfirmationModalMounted: true,
      formValues: { requestedFlag: 'block' },
    });
    tree.instance().closeModalAndResetData();
    tree.instance().renderRecommendarConfirmationModal();
    tree.instance().renderConfirmationModalContent();
    expect(tree).to.not.equal(null);
  });
  it('should render properly without recommendationSortConfig-3', () => {
    const recommendationList = {
      categoryBucketsForRecommendation: {
        id: '12',
      },
    };
    const isMobile = {
      isMobileScreen: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={{
          recommendationCount: [0, 1],
        }}
        switchConfig={{ ...switchConfig, enableRecommendationsView: true }}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={null}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
        contentState={{}}
        blockUnblockError={{}}
        recommendationList={recommendationList}
        isMobile={isMobile}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.setState({
      isConfirmationModalMounted: true,
      formValues: { requestedFlag: 'abc' },
    });
    tree.instance().renderConfirmationModalContent();
    expect(tree).to.not.equal(null);
  });
  it('should render properly without recommendationSortConfig-4', () => {
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={{
          recommendationCount: [0, 0],
        }}
        switchConfig={{ ...switchConfig, enableRecommendationsView: true }}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={null}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        socialRecommendUserBlockUnblock={socialRecommendUserBlockUnblock}
        contentState={{}}
        blockUnblockError={{}}
      />
    );
    const wrapperInstance = tree.instance();
    wrapperInstance.setState({
      isConfirmationModalMounted: true,
      formValues: { requestedFlag: 'block' },
    });
    tree.instance().renderConfirmationModalContent();
    expect(tree).to.not.equal(null);
  });
  it('should call isListOrNoNewComponent function with valid categoryBucketsForRecommendation correctly', () => {
    registryData = {
      recommendationCount: [0, 1],
    };
    const recommendationList = {
      categoryBucketsForRecommendation: {
        id: '12',
      },
    };
    const isMobile = {
      isMobileScreen: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        recommendationList={recommendationList}
        isMobile={isMobile}
      />
    );
    tree.setState({ tabId: 2 });
    tree.instance().isListOrNoNewComponent();
    expect(resetBlockUnblockData.called);
  });
  it('should call isListOrNoNewComponent function with  blank categoryBucketsForRecommendation correctly', () => {
    registryData = {
      recommendationCount: [0, 1],
    };
    const recommendationList = {
      categoryBucketsForRecommendation: {},
    };
    const isMobile = {
      isMobileScreen: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfig}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        recommendationList={recommendationList}
        isMobile={isMobile}
      />
    );
    tree.setState({ tabId: 2 });
    tree.instance().isListOrNoNewComponent();
    expect(resetBlockUnblockData.called);
  });
  it('should render collaboration icon', () => {
    registryData = {
      recommendationCount: [0, 1],
    };
    getSiteId.default.restore();
    sinon.stub(getSiteId, 'default').returns('BedBathUS');
    const recommendationList = {
      categoryBucketsForRecommendation: {
        id: '12',
      },
    };
    const isMobile = {
      isMobileScreen: true,
    };
    const switchConfigData = {
      enableRecommendationsView: true,
      enableRecommendationsPublicEmptyView: true,
      enableRegistryCollaboration: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfigData}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        recommendationList={recommendationList}
        isMobile={isMobile}
        handleCollaborationModal={handleCollaborationModal}
        contentState={{}}
      />
    );
    expect(tree.find(Icon)).to.have.lengthOf(1);
    getSiteId.default.restore();
  });

  it('should call handleCollaborationModal props when click on icon', () => {
    registryData = {
      recommendationCount: [0, 1],
    };
    sinon.stub(getSiteId, 'default').returns('BedBathUS');
    const recommendationList = {
      categoryBucketsForRecommendation: {
        id: '12',
      },
    };
    const isMobile = {
      isMobileScreen: false,
    };
    const switchConfigData = {
      enableRecommendationsView: true,
      enableRecommendationsPublicEmptyView: true,
      enableRegistryCollaboration: true,
    };
    const tree = shallow(
      <RecommendationsLayout
        sortRecommendationList={sortRecommendationList}
        renderRecommendationContent={renderRecommendationContent}
        renderRecommendationsEmptyView={renderRecommendationsEmptyView}
        registryData={registryData}
        switchConfig={switchConfigData}
        match={match}
        getRecommendations={getRecommendations}
        props={props}
        labels={labels}
        globalSwitchConfig={globalSwitchConfig}
        getContent={getContent}
        recommendationSortConfig={recommendationSortConfig}
        getRecommenderSummary={getRecommenderSummary}
        fireTealiumAction={fireTealiumAction}
        resetBlockUnblockData={resetBlockUnblockData}
        blockUnblockSuccess
        recommendationList={recommendationList}
        isMobile={isMobile}
        handleCollaborationModal={handleCollaborationModal}
        contentState={{}}
      />
    );
    tree.setState({ tabId: 2 });
    tree.find('#invitetoCollaborateFromRecommendation').simulate('click');
    expect(handleCollaborationModal.called);
    getSiteId.default.restore();
  });
});
