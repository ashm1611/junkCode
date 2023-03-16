import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CategoryAccordian } from '../CategoryAccordian';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const getNumberofRegistryItem = sinon.spy();
  const props = {
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          coRegistrantLastName: 'coownerlastname',
        },
      },
    },
    data: {
      displayName: 'categoryname',
      registryItemList: [],
      catSeoUrl: '/category/bedding/10001/',
    },
    deviceConfig: 'desktop',
    contextPath: 'store',
    expandAll: true,
    filter: '',
    getNumberofRegistryItem,
    enableNewRegDashboard: true,
  };

  it('should render correctly when expandAll is false', () => {
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe(__filename, () => {
  const getNumberofRegistryItem = sinon.spy();
  const props = {
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          coRegistrantLastName: 'coownerlastname',
        },
      },
    },
    data: {
      categoryName: 'categoryname',
      items: ['Purchased', 'Favorites', 'Remaining'],
      catSeoUrl: '/category/bedding/10001/',
      registryItemList: [],
    },
    deviceConfig: 'desktop',
    contextPath: 'store',
    expandAll: true,
    variation: 'priceView',
    filter: '',
    getNumberofRegistryItem,
  };

  it('should render correctly with the variation PriceView', () => {
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the filter Purchased', () => {
    props.filter = 'Purchased';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the filter Favorites', () => {
    props.filter = 'Favorites';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the filter Favourites', () => {
    props.filter = 'Favourites';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the filter Discontinued', () => {
    props.filter = 'Discontinued';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the filter Remaining', () => {
    props.filter = 'Remaining';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with the variation Date', () => {
    props.variation = 'Date';
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render with empty data', () => {
    const propsData = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            primaryRegistrantFirstName: 'firstname',
            coRegistrantLastName: 'coownerlastname',
          },
        },
      },
      data: {},
      deviceConfig: 'desktop',
      contextPath: 'store',
      expandAll: true,
      variation: 'priceView',
      filter: '',
      getNumberofRegistryItem,
    };
    const tree = shallow(<CategoryAccordian {...propsData} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render with no data', () => {
    const propsData = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            primaryRegistrantFirstName: 'firstname',
            coRegistrantLastName: 'coownerlastname',
          },
        },
      },
      deviceConfig: 'desktop',
      contextPath: 'store',
      expandAll: true,
      variation: 'priceView',
      filter: '',
      getNumberofRegistryItem,
    };
    const tree = shallow(<CategoryAccordian {...propsData} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render with data items null', () => {
    const propsData = {
      registryData: {
        registryResVO: {
          registrySummaryVO: {
            primaryRegistrantFirstName: 'firstname',
            coRegistrantLastName: 'coownerlastname',
          },
        },
      },
      data: {
        displayName: 'categoryname',
        registryItemList: null,
        items: null,
        catSeoUrl: '/category/bedding/10001',
      },
      deviceConfig: 'desktop',
      contextPath: 'store',
      expandAll: true,
      variation: 'priceView',
      filter: '',
      getNumberofRegistryItem,
    };
    const tree = shallow(<CategoryAccordian {...propsData} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});

describe(__filename, () => {
  const getNumberofRegistryItem = sinon.stub();
  getNumberofRegistryItem.returns(0);
  const props = {
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          coRegistrantLastName: 'coownerlastname',
        },
      },
    },
    data: {
      displayName: 'categoryname',
      registryItemList: [],
      catSeoUrl: '/category/bedding/10001/',
      recommandedLinks: [
        {
          bannerLink: '/category/kitchen/small-appliances/blenders/13138',
          bannerText: 'Blenders',
        },
        {
          bannerLink: '/category/kitchen/small-appliances/slow-cookers/12715',
          bannerText: 'Slow Cookers',
        },
      ],
      recommendedCatFlag: true,
    },
    deviceConfig: 'desktop',
    contextPath: 'store',
    expandAll: true,
    filter: '',
    variation: 'category',
    switchConfig: {
      enableEmptyCategoryRecommendation: true,
    },
    getNumberofRegistryItem,
    labels: {
      registryDetails: {
        showAllBtn: 'Show All',
      },
    },
  };

  it('should render empty category recommendation correctly when recommandedLinks is not blank', () => {
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should not render empty category recommendation tiles when recommandedLinks is null', () => {
    props.data.recommandedLinks = null;
    props.selectedCheckboxFilter = true;
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should not render empty category recommendation tiles when recommendedCatFlag is false', () => {
    props.data.recommendedCatFlag = false;
    const tree = shallow(<CategoryAccordian {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
