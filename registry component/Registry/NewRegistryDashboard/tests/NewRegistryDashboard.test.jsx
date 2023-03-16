import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EditRegistry from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistry.async';
import NewRegistryDashboard, {
  RouteWithSubRoutes,
} from '../NewRegistryDashboard';
import RegistryTabs from '../utils/RegistryTabs';

configure({ adapter: new Adapter() });
const mountWithRouter = node => <Router>{node}</Router>;
const props1 = {
  giftGiver: false,
  registryData: {
    registryResVO: {
      registrySummaryVO: {
        eventYetToCome: true,
        daysToGo: 90,
        isPublic: '1',
        primaryRegistrantFirstName: 'Anne',
        primaryRegistrantLastName: 'Park',
        coRegistrantLastName: 'Allen',
        coRegistrantFirstName: 'Walker',
      },
    },
  },
  isMobile: false,
  renderNewRegistryLayout: sinon.spy(),
  labels: {
    registryDetails: {},
  },
  isLoggedIn: {},
  route: { routes: [{ path: 'abc' }, {}] },
  profileData: {
    repositoryId: 'DC58005974',
    email: 'test.us@yopmail.com',
  },
  stateObjMain: {
    discontinuedItemCount: 0,
    filteredItemsCount: 0,
    getRecommendationPos: 0,
    isStoreAvailable: false,
    registryId: '520747097',
    selectedFilterOption: 'View All',
  },
  match: {
    params: {
      id: '123',
    },
    path: 'store/giftRegistry/viewRegistryOwner/myItems/',
  },
  isSocialAnnexReady: true,
  makeReviewYourProductsConfig: {},
  isMPulseEnabled: false,
  registryId: '520747097',
  eventTypeCode: 'BRD',
  changeFilter: {},
  updateFilterItemCount: {},
  resetFilter: {},
  returnFilteredItemsCount: {},
  updateParam: {},
  saveStoreInfo: {},
  isSiteid: 'BedBathUS',
};
const props2 = {
  giftGiver: false,
  registryData: {
    registryResVO: {
      registrySummaryVO: {
        eventYetToCome: false,
        isPublic: '0',
        primaryRegistrantFirstName: 'Anne',
        primaryRegistrantLastName: 'Park',
        coRegistrantLastName: '',
        coRegistrantFirstName: '',
      },
    },
  },
  renderNewRegistryLayout: sinon.spy(),
  isMobile: true,
  labels: {
    registryDetails: {},
  },
  isLoggedIn: {},
  route: { routes: [{ path: 'abc' }, {}] },
  profileData: {
    repositoryId: 'DC58005974',
    email: 'test.us@yopmail.com',
  },
  stateObjMain: {
    discontinuedItemCount: 0,
    filteredItemsCount: 0,
    getRecommendationPos: 0,
    isStoreAvailable: false,
    registryId: '520747097',
    selectedFilterOption: 'View All',
    setCYPModalState: true,
  },
  isSocialAnnexReady: false,
  myFundsData: { balance: 100 },
  makeReviewYourProductsConfig: {},
  isMPulseEnabled: false,
  registryId: '520747097',
  eventTypeCode: 'BRD',
  changeFilter: {},
  updateFilterItemCount: {},
  resetFilter: {},
  returnFilteredItemsCount: {},
  updateParam: {},
  saveStoreInfo: {},
};
describe(__filename, () => {
  it('should render NewRegistryDashboard', () => {
    const tree = shallow(<NewRegistryDashboard {...props1} />);
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render NewRegistryDashboard for props2', () => {
    const tree = shallow(
      <NewRegistryDashboard
        {...props2}
        handleCollaborationModal={sinon.stub()}
      />
    );
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render registry builder page', () => {
    const tree = shallow(<NewRegistryDashboard {...props1} />);
    tree.find(RegistryTabs).prop('setShowRegBuilder')('default');
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render NewRegistryDashboard Loader', () => {
    const tree = shallow(
      <NewRegistryDashboard
        {...props1}
        isPublic={'0'}
        handleCollaborationModal={sinon.stub()}
      />
    );
    tree.find('#publicBtn').simulate('click');
    tree.find('#privBtn').simulate('click');
    tree.find(EditRegistry).prop('setIsEditFetching')(true);
    expect(toJson(tree)).to.not.equal(null);
  });
  it('should render RouteWithSubRoutes correctly', () => {
    const Test = () => {
      return <h1>Test</h1>;
    };
    const routes = { path: '', component: Test };
    const tree = mount(
      <Router>
        <RouteWithSubRoutes route={routes} />
      </Router>
    );
    expect(tree).to.have.lengthOf(1);
    tree.unmount();
  });
  it('should render RegistryTabs home', () => {
    const useEffect = sinon.stub(React, 'useEffect');
    const node = mountWithRouter(
      <RegistryTabs
        registryId={'1222345'}
        location={{
          pathname: 'store/giftRegistry/viewRegistryOwner/home/',
        }}
        isMobile={false}
      />
    );
    const node2 = mount(node);
    useEffect.restore();
    expect(useEffect.calledOnce);
    node2.unmount();
  });
  it('should render RegistryTabs myItems', () => {
    const useEffect = sinon.stub(React, 'useEffect');
    const node = mountWithRouter(
      <RegistryTabs
        registryId={'1222345'}
        location={{
          pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
        }}
        openEditModal
        isMobile
        setOpenEditModal={sinon.spy()}
      />
    );
    const node2 = mount(node);
    useEffect.restore();
    expect(useEffect.calledOnce);
    node2.unmount();
  });
  it('should render RegistryTabs registry builder', () => {
    const useEffect = sinon.stub(React, 'useEffect');
    const node = mountWithRouter(
      <RegistryTabs
        registryId={'1222345'}
        location={{
          pathname: 'store/giftRegistry/viewRegistryOwner/myItems/',
        }}
        setShowRegBuilder={sinon.spy()}
        showRegBuilder={'default'}
        isMobile
        setOpenEditModal={sinon.spy()}
      />
    );
    const node2 = mount(node);
    useEffect.restore();
    expect(useEffect.calledOnce);
    node2.unmount();
  });
  it('should render RegistryTabs onClick', () => {
    const tree = shallow(
      <RegistryTabs
        registryId={'1222345'}
        setOpenEditModal={sinon.spy()}
        setShowRegBuilder={sinon.spy()}
        isMobile={false}
      />
    );
    tree.find('#registry-tab-2').simulate('click');
    tree.find('#registry-tab-1').simulate('click');
    tree.find('#registry-tab-0').simulate('click');
    expect(toJson(tree)).to.not.equal(null);
  });
});
