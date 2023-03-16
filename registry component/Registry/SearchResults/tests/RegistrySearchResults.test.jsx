import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import * as common from '@bbb-app/utils/common';
import { SEARCH_MODE_BY_NAME } from '@bbb-app/constants/registryConstants';
import RegistrySearchResults from '../RegistrySearchResults';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const items = [
    {
      display_initials: 'JJ + JJ',
      is_searchable: 'Y',
      registry_num: '545403975',
      coreg_last_name: 'Johnson',
      display_name: 'Johnson Johnson & Johnson Johnson',
      display_event_date: 'January 11, 2018',
      reg_first_name: 'Johnson',
      coreg_first_name: 'Johnson',
      event_type: 'OTH',
      reg_last_name: 'Johnson',
      is_public: 'Y',
      display_state_code: 'IL',
      event_type_description: 'Other',
      score: 7.3058124,
    },
    {
      display_initials: 'JJ + JJ',
      is_searchable: 'Y',
      registry_num: '543829018',
      coreg_last_name: 'John',
      display_name: 'John John & John John',
      display_event_date: 'June 03, 2017',
      reg_first_name: 'John',
      coreg_first_name: 'John',
      event_type: 'BRD',
      reg_last_name: 'John',
      is_public: 'Y',
      display_state_code: 'WA',
      event_type_description: 'Wedding',
      score: 7.3058124,
    },
    {
      display_initials: 'CJ + CJ',
      is_searchable: 'Y',
      registry_num: '541845105',
      coreg_last_name: 'Johnson',
      display_name: 'Concelray Johnson & Concelray Johnson',
      display_event_date: 'June 03, 2015',
      reg_first_name: 'Concelray',
      coreg_first_name: 'Concelray',
      event_type: 'BA1',
      reg_last_name: 'Johnson',
      is_public: 'Y',
      display_state_code: 'NJ',
      event_type_description: 'Baby',
      score: 7.0923805,
    },
    {
      display_initials: 'JJ + JG',
      is_searchable: 'Y',
      registry_num: '544412747',
      coreg_last_name: '',
      display_name: 'Johnna Johncox & John Gentner',
      display_event_date: 'July 13, 2017',
      reg_first_name: 'Johnna',
      coreg_first_name: 'John',
      event_type: 'BA1',
      reg_last_name: 'Johncox',
      is_public: 'Y',
      display_state_code: 'NY',
      event_type_description: 'Baby',
      score: 7.0570307,
    },
    {
      display_initials: 'MJ + JJ',
      is_searchable: 'Y',
      registry_num: '545348031',
      coreg_last_name: 'Johnson',
      display_name: 'Mary Johnson & John Johnson',
      display_event_date: 'May 10, 2018',
      reg_first_name: 'Mary',
      coreg_first_name: 'John',
      event_type: 'BA1',
      reg_last_name: 'Johnson',
      is_public: 'Y',
      display_state_code: 'TN',
      event_type_description: 'Baby',
      score: 7.0570307,
    },
    {
      display_initials: 'AJ + JJ',
      is_searchable: 'Y',
      registry_num: '545480634',
      coreg_last_name: 'Johnson',
      display_name: 'Ashlee Johnson & John Johnson',
      display_event_date: 'June 02, 2018',
      reg_first_name: 'Ashlee',
      coreg_first_name: 'John',
      event_type: 'BA1',
      reg_last_name: 'Johnson',
      is_public: 'Y',
      display_state_code: 'AZ',
      event_type_description: 'Baby',
      score: 7.0570307,
    },
    {
      display_initials: 'KJ + JJ',
      is_searchable: 'Y',
      registry_num: '543025395',
      coreg_last_name: 'Johnson',
      display_name: 'Kayla Johnson & John Johnson',
      display_event_date: 'October 08, 2016',
      reg_first_name: 'Kayla',
      coreg_first_name: 'John',
      event_type: 'BRD',
      reg_last_name: 'Johnson',
      is_public: 'Y',
      display_state_code: 'TX',
      event_type_description: 'Wedding',
      score: 7.0570307,
    },
  ];

  const regions = {
    second: [
      {
        params: {
          id: '8591',
          style: '',
        },
        name: 'RegistryFindRegistry',
        data: {
          CTA: {
            primary_button: {
              displayName: 'Start a Registry',
              url: '/test',
            },
            secondary_button: {
              displayName: 'Start a Registry in Store',
              url: '/test1',
            },
          },
          subtitle_text:
            'Get started to build your registry online or with an expert in a store near you.',
          question_text: 'Got a question',
          title: "Let's build your perfect registry",
          statusCode: 200,
          Response: 'Success',
        },
      },
      {
        params: {
          id: '9252',
          style: '',
        },
        name: 'RegistryOccasions',
        data: {
          cta: {
            url: '/sign-in',
            displayName: 'Sign in',
          },
          field_visual: [
            {
              field_alt_attribute: 'Wedding',
              field_cta_url: '/test',
              field_cta_label: 'Wedding',
              field_image:
                "https://s7d2.scene7.com/is/image/BedBathandBeyond/63966716353795p'",
            },
            {
              field_alt_attribute: 'Shopping',
              field_cta_url: '/test2',
              field_cta_label: 'Shopping',
              field_image:
                "https://s7d2.scene7.com/is/image/BedBathandBeyond/63966716353795p'",
            },
          ],
          subtitle_text: 'Already have a registry?',
          title: 'The best registry around for every occassion',
          statusCode: 200,
          Response: 'Success',
        },
      },
    ],
    third: [
      {
        params: {
          id: '9232',
          style: '',
        },
        name: 'GoogleDFP',
        data: {
          adIds: ['PLP_1', 'PLP_2', 'PLP_3'],
          statusCode: 200,
          Response: 'Success',
        },
      },
    ],
  };
  const config = {
    registrySearchResultsConfig: fromJS({
      filters: {
        months: [
          { january: 'Jaunary' },
          { february: 'February' },
          { march: 'March' },
          { april: 'April' },
          { may: 'May' },
          { june: 'June' },
          { july: 'July' },
          { august: 'August' },
          { september: 'September' },
          { october: 'October' },
          { november: 'November' },
          { december: 'December' },
        ],
        types: [
          { brd: 'Wedding' },
          { ba1: 'Baby' },
          { hsw: 'Housewarming' },
          { col: 'College/University' },
          { oth: 'Other' },
          { com: 'Commitment Ceremony' },
          { bir: 'Birthday' },
          { ann: 'Anniversary' },
          { ret: 'Retirement' },
        ],
      },
      results: { defaultRowCount: 10, infiniteScrollOffset: 200 },
    }),
    socialAnnexPhotoRegistry: fromJS({
      baseUri:
        'https://s22.socialannex.com/v2/api/photoregistry/images/9411181',
    }),
    typeahead: fromJS({
      'typeahead.enable': 'true',
      'typeahead.disallowedSpecialCharacters': '',
    }),
  };
  const PageSpecificMarks = {
    'ux-destination-verified': ['ux-text-registry-search-title'],
    'ux-primary-content-displayed': [],
    'ux-primary-action-available': [
      'ux-content-registry-search-cta',
      'ux-content-registry-search-form',
    ],
    'ux-secondary-content-displayed': [],
  };
  let props = {
    labels: {},
    registryLabels: {
      referredContent: [
        {
          key: 'RegSearchMarketingBanner',
          id: '123456',
        },
      ],
    },
    referredContent: {
      content: {
        123456: {
          components: [
            {
              data: 'this is test data',
            },
          ],
        },
      },
    },
    filterLabels: {},
    registrySearchResults: {
      regions,
      items,
      params: {
        start: '10',
        perPage: '25',
      },
      numFound: 40,
      searchMode: 'byName',
    },
    mPulseSiteConfig: {
      PageSpecificMarks,
    },
    onChange: sinon.stub(),
    onChangeMode: sinon.stub(),
    onSubmit: sinon.stub(),
    onNextPage: sinon.stub(),
    resetSearchResultsForm: sinon.stub(),
    filtersData: {
      scrollFiltersTop: true,
      appliedFiltersOrderedSet: {
        size: 0,
      },
    },
    onUpdateSelectedFilters: sinon.stub(),
    fetchFacetResults: sinon.stub(),
    onAppliedFilters: sinon.stub(),
    onClearSelectedFilters: sinon.stub(),
    initializeRegistrySearchResults: sinon.stub(),
    setComponentMounted: sinon.stub(),
    channelType: '',
    config,
    isMPulseEnabled: true,
    location: {
      search: '?web3feo',
    },
    match: {
      params: {},
    },
    resetInitialResultsFlag: sinon.stub(),
    fetchReferredContent: sinon.stub(),
    staticPagesLabels: {
      referredContent: [
        {
          key: 'RegSearchMarketingBanner',
          id: '12345',
        },
      ],
    },
    makeReviewYourProductsConfig: {},
    resetFormInput: sinon.stub(),
  };

  const getTree = prop => shallow(<RegistrySearchResults {...prop} />);

  before(() => {
    window.instrumentation = {
      setPageMarks: sinon.stub(),
      removeConditionalMarksFlag: sinon.stub(),
    };
  });
  let tree;
  beforeEach(() => {
    tree = getTree(props);
  });

  it('should render RegistrySearchResults component correctly', () => {
    sinon.stub(common, 'isBrowser').returns(false);
    tree = getTree(props);
    expect(toJson(tree)).to.matchSnapshot();
    common.isBrowser.restore();
  });
  it('should not call fetchReferredContent when referredContent is not available', () => {
    props = {
      ...props,
      location: {
        search: '',
      },
      registrySearchResults: {
        items: [],
        regions,
        selectedFilters: {
          event_type: ['BA1'],
        },
      },
      staticPagesLabels: {},
    };
    tree = getTree(props);
    expect(tree.instance().props.fetchReferredContent.called).to.equal(false);
  });
  it('should call componentWillReceiveProps correctly', () => {
    props = {
      ...props,
      location: {
        search: '',
      },
    };
    tree = getTree(props);
    tree.setProps({
      isMPulseEnabled: true,
      registrySearchResults: {
        items,
        regions,
      },
    });
    expect(tree.instance().mPulseMarksPopulated).to.equal(true);
  });
  it('should call componentWillReceiveProps correctly if fetchedInitialResults is true', () => {
    props = {
      ...props,
      location: {
        search: '?web3feo',
      },
    };
    tree = getTree(props);
    tree.setProps({
      registrySearchResults: {
        ...props.registrySearchResults,
        items,
        fetchedInitialResults: true,
      },
    });
    expect(tree.instance().mPulseMarksPopulated).to.equal(true);
  });
  it('should call componentWillReceiveProps correctly incase of query param and fetchedInitialResults is false ', () => {
    props = {
      ...props,
      location: {
        search: '?web3feo',
      },
    };
    tree = getTree(props);
    tree.setProps({
      registrySearchResults: {
        ...props.registrySearchResults,
        items,
        fetchedInitialResults: false,
      },
    });
    expect(tree.instance().mPulseMarksPopulated).to.equal(false);
  });

  it('should call shouldComponentUpdate correctly', () => {
    tree.setProps({ ...props });
    const result = tree.instance().shouldComponentUpdate(props);
    expect(result).to.equal(false);
  });

  it('should call componentDidUpdate correctly', () => {
    props = {
      ...props,
      location: {
        search: '?web3feo',
      },
      registrySearchResults: {
        ...props.registrySearchResults,
        showNoResults: false,
        noResultsSearchTerm: '',
        params: {},
      },
      filtersData: {
        scrollFiltersTop: false,
      },
    };

    tree = getTree(props);
    tree.setState({
      holdScroll: true,
    });
    tree.setProps({
      ...props,
      registrySearchResults: {
        ...props.registrySearchResults,
        items: [],
        showNoResults: true,
        noResultsSearchTerm: 'Test',
        selectedFilters: {},
      },
      location: {
        search: '',
      },
    });

    expect(tree.instance().state.holdScroll).to.equal(false);
  });

  it('should call componentWillUnmount correctly', () => {
    const resetInitialResultsFlagStub = tree.instance().props
      .resetInitialResultsFlag;
    const setComponentMountedStub = tree.instance().props.setComponentMounted;
    tree.instance().componentWillUnmount();
    expect(resetInitialResultsFlagStub.called).to.equal(true);
    expect(setComponentMountedStub.calledWith(false)).to.equal(true);
  });

  it('should call preparePageViewMarks method correctly', () => {
    const expectedResult = {
      'ux-destination-verified': [],
      'ux-primary-content-displayed': ['ux-content-registry-search-results'],
      'ux-primary-action-available': [],
      'ux-secondary-content-displayed': [],
    };
    const result = tree.instance().preparePageViewMarks(0);
    expect(result).to.deep.equal(expectedResult);
  });

  it('should call handleInViewPortChange correctly', () => {
    const viewPort = {
      inView: true,
    };
    tree.instance().handleInViewPortChange(viewPort);
    expect(tree.instance().props.onNextPage.called).to.equal(false);
    props = {
      ...props,
      registrySearchResults: {
        ...props.registrySearchResults,
        params: {
          start: '10',
          perPage: '20',
        },
        numFound: 40,
        searchMode: SEARCH_MODE_BY_NAME,
      },
    };
    tree = getTree(props);
    tree.instance().handleInViewPortChange(viewPort);
    expect(tree.instance().props.onNextPage.called).to.equal(true);
  });

  it('should call checkGoogleDFP correctly', () => {
    const third = {
      third: [
        {
          name: 'GoogleDFP',
          params: {
            type: '3Pack',
          },
          data: {
            type: '3Pack',
          },
        },
      ],
    };
    const result = tree.instance().checkGoogleDFP({});
    expect(result).to.deep.equal({ ...third });
  });

  after(() => {
    delete window.instrumentation;
  });
});
