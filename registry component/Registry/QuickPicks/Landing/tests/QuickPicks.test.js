import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { CHANNELTYPE_DESKTOP } from '@bbb-app/constants/appConstants';
import * as common from '@bbb-app/utils/common';
import QuickPicksLanding from '../QuickPicksLanding';
import {
  hero,
  registryTypes,
} from '../../../../../../containers/Pages/Registry/QuickPicks/Landing/tests/mock-data';
import { renderContentModules } from '../../ContentModules';

configure({ adapter: new Adapter() });
const categories = [
  {
    label: 'Top Registry Picks',
    image: {
      url:
        'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/DKNYPure_Comfy_white_duvet_side_02.jpg$other$,?$478$',
    },
    collections: [
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Top%2DRegPicks%5FC05.5ProductStyleModule?$content$',
        label: 'Top Registry Picks',
        quickPickID: 'cs11182019006',
        url: 'quickpicks/top-registry-picks/top-registry-picks/cs11182019006',
      },
    ],
  },
  {
    label: 'Wedding',
    image: {
      url:
        'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/DKNYPure_Comfy_white_duvet_side_02.jpg$other$,?$478$',
    },

    collections: [
      {
        label: 'Wedding',
        image:
          'https://s7d9.scene7.com/is/image/BedBathandBeyond/Dining_1024x300_6?$1024x300$&',
        url: '/hello',
      },
      {
        label: 'Keep it Tidy 2',
        image:
          'https://s7d9.scene7.com/is/image/BedBathandBeyond/Dining_1024x300_6?$1024x300$&',
        url: '/hello',
      },
    ],
  },
];

const fetchQuickPicks = () => {};
describe(__filename, () => {
  it('should render correctly with default props', () => {
    const prevProps = {
      match: {
        params: {
          category: 'top-registry-picks',
        },
      },
      labels: {
        registry: 'registry',
      },
    };
    const props = {
      match: {
        params: {
          category: 'top-registry-picks',
        },
      },
      labels: {
        registry: 'registry',
        referredContent: [{ id: '123', key: 'abc' }],
      },
      loadContent: sinon.spy(),
      content: {
        isFetching: false,
      },
    };
    const tree = shallow(
      <QuickPicksLanding fetchQuickPicks={fetchQuickPicks} {...props} />
    );
    tree.instance().componentDidUpdate(prevProps);
    renderContentModules(props);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with quick picks data', () => {
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
      selectedCategory: 'top-registry-picks',
    };
    const prevProps = {
      match: {
        params: {
          category: 'college-university',
        },
      },
    };
    const props = {
      match: {
        params: {
          category: 'top-registry-picks',
        },
      },
    };
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        fetchQuickPicks={fetchQuickPicks}
        {...props}
      />
    );
    tree.instance().componentDidUpdate(prevProps);
  });

  it('should render correctly with quick picks and content data', () => {
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
      selectedCategory: 'All',
    };
    const content = {
      '10038': {
        body: 'Content',
        field_assigned_on: '',
        field_assigned_to: '',
        field_due_date: '',
        field_event_type: null,
        field_publish_on: '1519805140',
        statusCode: 200,
        Response: 'Success',
      },
      '10041': {
        body: 'Content',
        field_assigned_on: '',
        field_assigned_to: '',
        field_due_date: '',
        field_event_type: null,
        field_publish_on: '1519805140',
        statusCode: 200,
        Response: 'Success',
      },
    };

    const labels = {
      referredContent: [
        {
          id: '10038',
          key: 'customerSupportCTAPanel',
        },
        {
          id: '10041',
          key: 'registryBuildCTAPanel',
        },
        {
          id: '10029',
          key: 'testHero',
        },
      ],
    };
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        content={{ content }}
        labels={labels}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    expect(tree.find('section')).to.have.lengthOf(6);
  });

  it('should render correctly with quick picks and content data on desktop', () => {
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
      selectedCategory: 'All',
    };
    const content = {
      '10038': {
        body: 'Content',
        field_assigned_on: '',
        field_assigned_to: '',
        field_due_date: '',
        field_event_type: null,
        field_publish_on: '1519805140',
        statusCode: 200,
        Response: 'Success',
      },
      '10041': {
        body: 'Content',
        field_assigned_on: '',
        field_assigned_to: '',
        field_due_date: '',
        field_event_type: null,
        field_publish_on: '1519805140',
        statusCode: 200,
        Response: 'Success',
      },
    };

    const labels = {
      referredContent: [
        {
          id: '10038',
          key: 'customerSupportCTAPanel',
        },
        {
          id: '10041',
          key: 'registryBuildCTAPanel',
        },
        {
          id: '10029',
          key: 'testHero',
        },
      ],
    };
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        content={{ content }}
        labels={labels}
        channelType={CHANNELTYPE_DESKTOP}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    expect(tree.find('VisualFacets')).to.have.lengthOf(1);
  });

  it('should render skeleton styles mobile', () => {
    const tree = shallow(<QuickPicksLanding quickPicks={{ fetching: true }} />);
    expect(tree.find('section')).to.have.lengthOf(2);
  });

  it('should render skeleton styles desktop', () => {
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={{ fetching: true }}
        channelType={CHANNELTYPE_DESKTOP}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    expect(tree.find('VisualFacets')).to.have.lengthOf(0);
  });

  it('should render error', () => {
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={{ error: true }}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    expect(tree.find('ErrorBoundary')).to.have.lengthOf(0);
  });

  it('should updateSelectedFilters', () => {
    const stubPushState = sinon
      .stub(window.history, 'pushState')
      .callsFake(() => {});
    const setQuickPicks = sinon.spy();
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
      selectedCategory: 'All',
    };

    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        setQuickPicks={setQuickPicks}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    tree.instance().updateSelectedFilters({ selectedCategory: ['bar', 'foo'] });
    expect(setQuickPicks.called).to.equal(true);
    stubPushState.restore();
  });
  it('should isBrowser return else', () => {
    const isBrowserStub = sinon.stub(common, 'isBrowser').returns(false);
    const setQuickPicks = sinon.spy();
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
      selectedCategory: 'All',
    };

    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        setQuickPicks={setQuickPicks}
        fetchQuickPicks={fetchQuickPicks}
      />
    );
    tree.instance().updateSelectedFilters({ selectedCategory: ['bar', 'foo'] });
    expect(setQuickPicks.called).to.equal(true);
    isBrowserStub.restore();
  });
  it('should changeRegistryType', () => {
    const quickPicks = {
      categories,
      hero,
      registryTypes,
      selectedRegistryType: '200006',
    };
    const changeRegistryType = sinon.spy();
    const tree = shallow(
      <QuickPicksLanding
        quickPicks={quickPicks}
        changeRegistryType={changeRegistryType}
        pageConfig={{
          'bestRegistry.cta1URL': 'foo',
          'bestRegistry.cta2URL': 'bar',
        }}
        fetchQuickPicks={fetchQuickPicks}
        isCrossBannerEnabled
        siteId="BuyBuyBaby"
      />
    );
    tree.instance().changeRegistryType('200006');
    expect(changeRegistryType.called).to.equal(true);
  });
});
