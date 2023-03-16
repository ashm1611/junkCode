import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import * as common from '@bbb-app/utils/common';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import RegistryResultsGrid from '../RegistryResultsGrid';

configure({ adapter: new Adapter() });

export const items = [
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

const labels = {
  itemRegistryId: 'Registry ID:',
  btnViewRegistry: 'View Registry',
};

describe(__filename, () => {
  global.window.instrumentation = {
    pageSource: 'browser',
    setPageMarks: () => {},
  };
  const mPulseSiteConfig = {
    pageLevelConfig: {
      RegistrySearchResults: {
        enabled: true,
        PageViewMarks: {
          'ux-destination-verified': ['ux-image-inline-logo'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
        PageSpecificMarks: {
          'ux-destination-verified': ['ux-text-registry-search-title'],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [
            'ux-content-registry-search-cta',
            'ux-content-registry-search-form',
          ],
          'ux-secondary-content-displayed': [],
        },
        ConditionalMarksFlag: {
          'ux-destination-verified': [],
          'ux-primary-content-displayed': [],
          'ux-primary-action-available': [],
          'ux-secondary-content-displayed': [],
        },
      },
    },
  };
  it('should render correctly default props', () => {
    const tree = shallow(
      <RegistryResultsGrid
        labels={labels}
        onNextPage={() => {}}
        mPulseSiteConfig={mPulseSiteConfig}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with items', () => {
    const tree = shallow(
      <RegistryResultsGrid
        labels={labels}
        onNextPage={() => {}}
        items={items}
        mPulseSiteConfig={mPulseSiteConfig}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render correctly when loading', () => {
    const tree = shallow(
      <RegistryResultsGrid
        labels={labels}
        onNextPage={() => {}}
        items={items}
        isFetchingResults
        mPulseSiteConfig={mPulseSiteConfig}
        channelType="desktop"
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should renderRegistry saveSearchUrl correctly', () => {
    const data = [
      { id: '1', display_initials: 'JJ + JJ' },
      { id: '2', display_initials: 'JJ + JJ' },
    ];
    const currentUrl = '';
    const tree = shallow(
      <RegistryResultsGrid
        labels={labels}
        onNextPage={() => {}}
        items={data}
        isFetchingResults
        mPulseSiteConfig={mPulseSiteConfig}
        channelType=""
        currentUrl={currentUrl}
      />
    );
    tree.instance().saveSearchUrl();
    expect(tree).to.not.equal(null);
  });

  it('should return null when isBrowser returns false', () => {
    const data = [
      { id: '1', display_initials: 'JJ + JJ' },
      { id: '2', display_initials: 'JJ + JJ' },
    ];
    sinon.stub(common, 'isBrowser').returns(false);
    const tree = shallow(
      <RegistryResultsGrid
        labels={labels}
        onNextPage={() => {}}
        items={data}
        isFetchingResults
        mPulseSiteConfig={mPulseSiteConfig}
        channelType=""
      />
    );
    expect(tree.instance().saveSearchUrl()).to.equal(undefined);
    common.isBrowser.restore();
  });
});
