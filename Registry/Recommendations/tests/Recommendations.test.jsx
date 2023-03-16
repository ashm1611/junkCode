import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import { fetchContent } from '@bbb-app/actions/experienceActions';

import * as PreviewEnvUtil from '../../../../../utils/isPreviewEnv';
import { Recommendations, mapDispatchToProps } from '../Recommendations';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let tree;
  let registryData;
  let template;
  let route;
  const fetchDynamicContent = sinon.spy();
  const activeRegistry = {
    registryId: '1234',
    primaryRegistrantFirstName: 'abc',
    primaryRegistrantLastName: 'xyz',
    primaryRegistrantEmail: 'email',
    primaryRegistrantPrimaryPhoneNum: '1234567890',
    coRegistrantFirstName: 'asd',
    coRegistrantLastName: 'asd',
    coRegEmail: 'mail',
    eventDate: 'data',
    favStoreId: 'asd',
  };
  beforeEach(() => {
    global.window.instrumentation = {
      pageSource: 'browser',
      addPerfMarkForZones: sinon.stub().callsFake(() => {}),
      removeConditionalMarksFlag: sinon.stub().callsFake(() => {}),
      setPageMarks: sinon.stub().callsFake(() => {}),
    };
    registryData = {
      'registryResVO.registrySummaryVO.registryState': 'inprogress',
    };
    template = { regions: {}, layout: {} };
    route = { routeData: { pageName: 'RecommendationsTab Page' } };
    const resetFirstCategoryCallFired = sinon.spy();
    const router = {
      location: {
        search: '',
        pathname: '',
      },
    };
    tree = shallow(
      <Recommendations
        registryData={registryData}
        regTemplate={template}
        router={router}
        route={route}
        resetFirstCategoryCallFired={resetFirstCategoryCallFired}
        activeRegistry={activeRegistry}
        matchParamId={'1234'}
        isLoggedIn
        fetchDynamicContent={fetchDynamicContent}
      />
    );
  });
  it('should render the Recommendations', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should setstate on componentWillReceiveProps', () => {
    const nextProps = {
      match: {
        params: {
          id: '1234',
          categoryId: 'cat01',
        },
      },
      registryDetailsData: {
        registryResVO: {
          registrySummaryVO: {
            registryState: 'registryState',
            registryType: {
              registryTypeName: 'registryTypeName',
            },
          },
        },
      },
    };

    tree.setProps({ location: { search: '' } });
    tree.instance().componentWillReceiveProps(nextProps);

    expect(tree.instance().state.called).to.deep.equal(true);
  });

  it('should render correctly when template available after mount', () => {
    tree.setState({ registryId: '1234' });
    tree.setProps({
      regTemplate: {
        layout: 'LayoutSingleWhiteRegion',
        'experience-type': 'StaticPages',
        regions: {
          first: {
            components: [
              { params: { id: '16403' }, name: 'ContentFullWidthContentBlock' },
            ],
          },
        },
      },
      registryData: {
        registryResVO: {
          registrySummaryVO: {},
        },
      },
    });
    expect(tree.find('regTemplate')).to.be.a('object');
  });

  it('should render correctly when template exists before mount', () => {
    const wrapper = shallow(
      <Recommendations
        fetchDynamicContent={fetchDynamicContent}
        registryData={{
          registryResVO: {
            registrySummaryVO: {},
          },
        }}
        regTemplate={{
          layout: 'LayoutSingleWhiteRegion',
          'experience-type': 'StaticPages',
          regions: {
            first: {
              components: [
                {
                  params: { id: '16403' },
                  name: 'ContentFullWidthContentBlock',
                },
              ],
            },
          },
        }}
        route={route}
        location={{
          search: '',
        }}
        match={{
          params: {
            id: '1111',
          },
        }}
        getPageExperience={() => {}}
      />
    );
    expect(wrapper.find('regTemplate')).to.be.a('object');
  });

  it('should render correctly without region', () => {
    const wrapper = shallow(
      <Recommendations
        fetchDynamicContent={fetchDynamicContent}
        registryData={{
          registryResVO: {
            registrySummaryVO: {},
          },
        }}
        regTemplate={{
          layout: 'LayoutSingleWhiteRegion',
          'experience-type': 'StaticPages',
        }}
        route={route}
        location={{
          search: '',
        }}
        match={{
          params: {
            id: '1111',
          },
        }}
        getPageExperience={() => {}}
      />
    );
    expect(wrapper.find('regTemplate')).to.be.a('object');
  });

  it('should render correctly without regTemplate', () => {
    const isPreviewEnvStub = sinon
      .stub(PreviewEnvUtil, 'default')
      .returns(true);
    const getPageExperience = sinon.stub();
    const wrapper = shallow(
      <Recommendations
        fetchDynamicContent={fetchDynamicContent}
        route={route}
        location={{
          search: '',
        }}
        match={{
          params: {
            id: '1111',
          },
        }}
        getPageExperience={getPageExperience}
      />
    );
    wrapper.setProps({});
    isPreviewEnvStub.restore();
    expect(getPageExperience.called).to.be.equal(true);
  });
});

describe('Recommendations mapDispatchToProps', () => {
  it('test mapDispatchToProps for sortRecommendationList', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.sortRecommendationList('test', 'test', 'date');
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "getPageExperience"', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.getPageExperience({});
    expect(dispatch.called).to.equal(true);
  });

  it('should return a function prop which dispatch the fetchTeaser Action', () => {
    const dispatch = sinon.spy();
    const contentParams = { id: 16850 };
    const mainParams = {};
    const props = mapDispatchToProps(dispatch);
    props.fetchDynamicContent(contentParams, mainParams, false);
    expect(dispatch).to.have.been.calledWith(
      fetchContent(contentParams, mainParams, false)
    );
  });

  it('Recommendations mapDispatchToProps', () => {
    const mapDispatchToPropsMethods = [
      'getRecommendations',
      'getRecommenderSummary',
      'getEditRegistryData',
      'getEmailFrequency',
      'sortRecommendationList',
      'mayBeLaterBtnCall',
      'socialRecommendUserBlockUnblock',
      'getContent',
      'resetBlockUnblockData',
      'fireTealiumAction',
      'onQuickViewButtonClick',
      'fetchQuizModal',
      'redirectTo',
      'fetchContentStack',
    ];
    let index = 0;
    while (index < mapDispatchToPropsMethods.length) {
      const dispatch = sinon.spy();
      const props = mapDispatchToProps(dispatch);
      props[mapDispatchToPropsMethods[index]]('test', 'test', 'test');
      index += 1;
      expect(dispatch.called).to.equal(true);
    }
  });
});
