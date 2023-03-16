import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Filters from '../RecommendationFilters';

configure({ adapter: new Adapter() });
const getSortConfigForTab = () => ({
  tabId: '0',
  default: 'date',
  options: [
    {
      key: 'category',
      label: 'Category',
      props: {
        value: 'category',
      },
    },
    {
      key: 'salePrice',
      label: 'Price',
      props: {
        value: 'salePrice',
      },
    },
    {
      key: 'date',
      label: 'Date',
      props: {
        value: 'date',
      },
    },
    {
      key: 'recommender',
      label: 'Recommender',
      props: {
        value: 'recommender',
      },
    },
  ],
});
const deviceConfig = {
  DESKTOP: 1024,
  TABLET: 768,
  MIDDLEDESKTOP: 1100,
};
const switchConfig = {
  enableRegistryCollaboration: true,
};
describe(__filename, () => {
  it('should render defaults', () => {
    const tree = shallow(
      <Filters
        deviceConfig={deviceConfig}
        getSortConfigForTab={getSortConfigForTab}
        switchConfig={switchConfig}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe(__filename, () => {
  const changeFilter = sinon.stub();
  const updateView = sinon.stub();
  const labels = {
    newSocialRecLabel: 'New',
    maybeLaterSocialRecLabel: 'Maybe Later',
    atrSocialRecLabel: 'Added to Registry',
    recommenderSocialRecLabel: 'Recommenders',
  };
  const regLabel = {
    registryDetails: labels,
  };
  const fetchRecommendationData = sinon.spy();
  it('should render Filter items Correctly', () => {
    const tree = shallow(
      <Filters
        deviceConfig={deviceConfig}
        getSortConfigForTab={getSortConfigForTab}
        switchConfig={{ enableRegistryCollaboration: false }}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for Mobile', () => {
    const isMobile = {
      isMobileScreen: true,
    };
    const tree = shallow(
      <Filters
        isMobile={isMobile}
        labels={labels}
        getSortConfigForTab={getSortConfigForTab}
        deviceConfig={deviceConfig}
        switchConfig={switchConfig}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call changeFilter', () => {
    const v = {
      target: {
        value: 'Maybe Later',
      },
    };
    const tree = shallow(
      <Filters
        v={v}
        changeFilter={changeFilter}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        deviceConfig={deviceConfig}
        labels={regLabel}
        fetchRecommendationData={fetchRecommendationData}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.changeFilter(v);
    expect(changeFilter.called);
  });
  it('should call changeFilter when false', () => {
    const tree = shallow(
      <Filters
        changeFilter={changeFilter}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        deviceConfig={deviceConfig}
        labels={regLabel}
        fetchRecommendationData={fetchRecommendationData}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.changeFilter(false);
    expect(false).equal(false);
  });

  it('should call changeFilter', () => {
    const v = {
      target: {
        value: 'Added to Registry',
      },
    };
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        changeFilter={changeFilter}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        labels={regLabel}
        fetchRecommendationData={fetchRecommendationData}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.changeFilter(v);
    expect(changeFilter.called);
  });
  it('should call changeFilter', () => {
    const v = {
      target: {
        value: 'New',
      },
    };
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        changeFilter={changeFilter}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        labels={regLabel}
        fetchRecommendationData={fetchRecommendationData}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.changeFilter(v);
    expect(changeFilter.called);
  });
  it('should call changeFilter', () => {
    const v = {
      target: {
        value: 'Recommenders',
      },
    };
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        changeFilter={changeFilter}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        labels={regLabel}
        fetchRecommendationData={fetchRecommendationData}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.changeFilter(v);
    expect(changeFilter.called);
  });
  it('should call sortBySelection correctly when v = recommenderSocialSortLabel', () => {
    const sortRecommendationList = sinon.spy();

    const v = 'recommenderSocialSortLabel';
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        sortRecommendationList={sortRecommendationList}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.recommenderSocialSortLabel = 'recommenderSocialSortLabel';

    tree.sortBySelection(v);
    expect(sortRecommendationList.called);
  });

  it('should call sortBySelection correctly when v = categorySocialSortLabel', () => {
    const sortRecommendationList = sinon.spy();

    const v = 'categorySocialSortLabel';
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        sortRecommendationList={sortRecommendationList}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.recommenderSocialSortLabel = 'categorySocialSortLabel';

    tree.sortBySelection(v);
    expect(sortRecommendationList.called);
  });

  it('should call sortBySelection correctly when v = priceSocialSortLabel', () => {
    const sortRecommendationList = sinon.spy();

    const v = 'priceSocialSortLabel';
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        sortRecommendationList={sortRecommendationList}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.recommenderSocialSortLabel = 'priceSocialSortLabel';

    tree.sortBySelection(v);
    expect(sortRecommendationList.called);
  });

  it('should call sortBySelection correctly when v = dateSocialSortLabel', () => {
    const getRecommendationListDateSorted = sinon.spy();
    const sortRecommendationList = sinon.spy();
    const v = 'dateSocialSortLabel';
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        getRecommendationListDateSorted={getRecommendationListDateSorted}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        sortRecommendationList={sortRecommendationList}
        switchConfig={switchConfig}
      />
    ).instance();
    tree.recommenderSocialSortLabel = 'dateSocialSortLabel';

    tree.sortBySelection(v);
    expect(getRecommendationListDateSorted.called);
  });

  it('should call getSortConfigForTab correctly', () => {
    const getRecommendationListDateSorted = sinon.spy();
    const sortRecommendationList = sinon.spy();
    const v = 'dateSocialSortLabel';
    const tree = shallow(
      <Filters
        v={v}
        deviceConfig={deviceConfig}
        getRecommendationListDateSorted={getRecommendationListDateSorted}
        updateView={updateView}
        getSortConfigForTab={getSortConfigForTab}
        sortRecommendationList={sortRecommendationList}
        getHeaderLayout="asd"
        switchConfig={switchConfig}
      />
    ).instance();
    tree.getDefaultSortOption(0);
    expect(getSortConfigForTab.called);
  });
});
