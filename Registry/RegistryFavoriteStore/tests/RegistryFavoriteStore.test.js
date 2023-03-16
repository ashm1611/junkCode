import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';

import {
  RegistryFavoriteStore,
  matchDispatchToProps,
} from '../RegistryFavoriteStore';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const storeInfo = [
    {
      country: 'USA',
      Lng: -74.0113388,
      WED_CLOSE: 2200,
      HBC: 0,
      FRI_OPEN: 900,
      SAT_OPEN: 900,
      SUN_CLOSE: 2100,
      TUES_CLOSE: 2200,
      SUN_OPEN: 900,
      address_phonetic: '270 Greenwich Street between Warren and Murray Street',
      VERDI: 0,
      name_phonetic: '',
      THURS_CLOSE: 2200,
      state: 'NY',
      mqap_quality: 'U1XXX',
      row_xng_usr: 'STOREOPS',
      store_type: 10,
      FTG: 0,
      postal: '10007',
      provinceName: 'New York',
      STUDIO: 0,
      specialty_shops_cd: 4,
      city: 'New York',
      SAT_CLOSE: 2200,
      rollingStoreHours:
        '{ "rolling_store_hours": [ { "day": "Sun", "date": "Apr 29", "hours": "9:00 AM - 9:00 PM", "msg": "" }, { "day": "Mon", "date": "Apr 30", "hours": "9:00 AM - 10:00 PM", "msg": "" }, { "day": "Tue", "date": "May 01", "hours": "9:00 AM - 10:00 PM", "msg": "" }, { "day": "Wed", "date": "May 02", "hours": "9:00 AM - 10:00 PM", "msg": "" }, { "day": "Thu", "date": "May 03", "hours": "9:00 AM - 10:00 PM", "msg": "" }, { "day": "Fri", "date": "May 04", "hours": "9:00 AM - 10:00 PM", "msg": "" }, { "day": "Sat", "date": "May 05", "hours": "9:00 AM - 10:00 PM", "msg": ""} ] }',
      city_phonetic: '',
      N: 'TriBeca',
      WED_OPEN: 900,
      TUES_OPEN: 900,
      T: '3100',
      BW: 0,
      Phone: '(212) 233-8450',
      WM: 0,
      THURS_OPEN: 900,
      RecordId: '1194',
      SPECIAL_MSG: '',
      mqap_geography: {
        latLng: {
          lng: -74.011339,
          lat: 40.715415,
        },
      },
      display_online: 'Y',
      mqap_id: 'ac1b45bd-da2d-4cea-b6c7-591f16ec2ff2',
      hours:
        'Monday-Friday: 9:00am-10:00pm, Saturday: 9:00am-10:00pm, Sunday: 9:00am-9:00pm',
      address: '270 Greenwich St btw Warren & Murray St',
      row_xng_dt: '04/04/2018',
      GeoCodeQuality: '',
      MON_CLOSE: 2200,
      facade_store_type: 10,
      latlong_src: 4,
      lc: '0',
      hiring_ind: 'N',
      FRI_CLOSE: 2200,
      HD: 1,
      MON_OPEN: 900,
      Lat: 40.7154146,
    },
  ];

  const storesConfig = [
    {
      label: 'Bed Bath & Beyond',
      selected: true,
      key: 'store-10',
      iconCircleClass: 'darkBlue',
      color: '003BDE',
      storeDomain: 'https://stores.bedbathandbeyond.com',
      siteId: 'BedBathUS',
    },
    {
      label: 'buy buy Baby',
      selected: false,
      key: 'store-40',
      iconCircleClass: 'lightBlue',
      color: '2ABBF3',
      storeDomain: 'https://stores.buybuybaby.com',
      siteId: 'BuyBuyBaby',
    },
    {
      label: 'Harmon',
      selected: false,
      key: 'store-30',
      iconCircleClass: 'pink',
      color: 'E20177',
      storeDomain: '',
      siteId: null,
    },
  ];

  const profileFavStore = {
    userSiteItems: {
      bpMembershipId: null,
      directMailOptin: null,
      emailId: null,
      emailoptin: 0,
      errorCode: null,
      ipaddress: null,
      lastModifiedDate: { time: '04/28/2018 19:55:09' },
      memberId: null,
      newOrderId: null,
      orderProcessedDate: null,
      renewalDate: null,
      repositoryId: 'DC2bbUSA1823246',
      site: null,
      siteId: 'BedBathUS',
      status: null,
      timeStamp: null,
      token: null,
      favouriteStoreId: '1194',
    },
  };

  const noop = () => {};
  it('should render correctly without any props', () => {
    const tree = shallow(<RegistryFavoriteStore />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for profile favorite store', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        profileFavoriteStore={profileFavStore}
        fetchStore={noop}
        onStoreUpdate={noop}
        clearProfileStoreData={noop}
        storeDetails={{}}
      />
    );
    tree.setProps({ storeListById: storeInfo });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for profile favorite store address', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        profileAddress={'Fulton Street, New York, NY, 12345'}
        searchStore={noop}
        onStoreUpdate={noop}
        clearStoreData={noop}
        storesConfig={storesConfig}
        siteId="BuyBuyBaby"
        storeDetails={{}}
      />
    );
    tree.setProps({ storeListByAddress: storeInfo });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly on address change', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={noop}
        clearStoreData={noop}
        onStoreUpdate={noop}
        storesConfig={storesConfig}
        siteId="BuyBuyBaby"
        storeDetails={{}}
      />
    );
    tree.setProps({
      storeListByAddress: storeInfo,
      currentAddress: 'Fulton Street, New York, NY, 12345',
    });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly on user store change', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        userPickedStoreId={'1194'}
        clearProfileStoreData={noop}
        fetchStore={noop}
        onStoreUpdate={noop}
        storesConfig={storesConfig}
        siteId="BuyBuyBaby"
      />
    );
    tree.setProps({ storeListById: storeInfo });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call prePopulateStore when no userPickedStoreId and currentAddress', () => {
    const tree = shallow(<RegistryFavoriteStore storeDetails={{}} />);
    const prePopulateStoreSpy = sinon.spy(tree.instance(), 'prePopulateStore');
    tree.setProps({ storeListById: [] });
    expect(prePopulateStoreSpy.called).to.equal(true);
  });

  it('should call getProfileData when no profileFavouriteStoreId and profileAddress', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        profileData={{ repositoryId: '1234' }}
        getProfile={noop}
        storeDetails={{}}
      />
    );
    const getProfileDataSpy = sinon.spy(tree.instance(), 'getProfileData');
    tree.setProps({ storeListById: [] });
    expect(getProfileDataSpy.called).to.equal(true);
  });

  it('getProfileData should be called', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        profileData={{ repositoryId: '1234' }}
        getProfile={noop}
        storeDetails={{}}
      />
    );
    const getProfileDataSpy = sinon.spy(tree.instance(), 'getProfileData');
    tree.setProps({ storeListById: [] });
    tree.setProps({ storeListByAddress: [] });
    expect(getProfileDataSpy.called).to.equal(true);
  });

  it('should dispatch getProfile with correct profile id', () => {
    const getProfileSpy = sinon.spy();
    const tree = shallow(
      <RegistryFavoriteStore
        profileData={{ repositoryId: '1234' }}
        getProfile={getProfileSpy}
        storeDetails={{}}
      />
    );
    const isUserLoggedInStub = sinon
      .stub(isUserLoggedIn, 'default')
      .returns(true);
    tree.setProps({ storeListById: [] });
    expect(getProfileSpy.calledWith('1234')).to.equal(true);
    isUserLoggedInStub.restore();
  });

  it('should called openStoreModalOnNoResult', () => {
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        storesConfig={storesConfig}
        siteId="BuyBuyBaby"
        storeDetails={{}}
      />
    );
    const openStoreModalOnNoResultSpy = sinon.spy(
      tree.instance(),
      'openStoreModalOnNoResult'
    );
    tree.instance().searchStoreAction('11101');
    tree.setProps({ storeResults: { resultsCount: 5 } });

    expect(openStoreModalOnNoResultSpy.called).to.equal(true);
  });

  it('should called clearStoreData and updatePickupinStoreModal', () => {
    const clearStoreDataStub = sinon.stub();
    const updatePickupinStoreModalStub = sinon.stub();
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        clearStoreData={clearStoreDataStub}
        updatePickupinStoreModal={updatePickupinStoreModalStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        storeDetails={{}}
      />
    );
    tree.instance().searchStoreAction('11101');
    tree.setProps({ storeResults: { resultsCount: 0 } });
    expect(updatePickupinStoreModalStub.called).to.equal(true);
  });
  it('should call componentWillReceiveProps', () => {
    const clearStoreDataStub = sinon.stub();
    const fetchStore = sinon.spy();
    const nextProps = {
      userPickedStoreId: ['234', '245'],
      isPickupInStoreOpen: true,
      isStoreFetching: false,
      storeDetails: { storeId: '123' },
    };
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        clearStoreData={clearStoreDataStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        fetchStore={fetchStore}
        storeDetails={{}}
      />
    );
    tree.setProps({ isStoreFetching: true });
    tree.setState({ favoriteStoreId: 'asd' });
    const getFavoriteStoreByIdStub = sinon.stub(
      tree.instance(),
      'getFavoriteStoreById'
    );
    tree.instance().componentWillReceiveProps(nextProps);
    expect(getFavoriteStoreByIdStub.called).to.equal(true);

    const nextProps1 = {
      userPickedStoreId: [],
      defaultStoreId: ['1123', '456'],
      storeDetails: {},
    };
    tree.instance().componentWillReceiveProps(nextProps1);
    expect(getFavoriteStoreByIdStub.called).to.equal(true);
    getFavoriteStoreByIdStub.restore();

    const nextProps2 = {
      userPickedStoreId: [],
      defaultStoreId: ['1123', '456'],
      storeDetails: { storeId: '123' },
    };
    tree.instance().componentWillReceiveProps(nextProps2);
    expect(getFavoriteStoreByIdStub.called).to.equal(true);
    getFavoriteStoreByIdStub.restore();
  });
  it('should call changeStoreAction', () => {
    const updatePickupinStoreModalStub = sinon.stub();
    const fetchStore = sinon.spy();
    const args = {};
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        updatePickupinStoreModal={updatePickupinStoreModalStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        fetchStore={fetchStore}
      />
    );
    tree.instance().changeStoreAction(args);
    expect(tree.instance().props.updatePickupinStoreModal.called).to.be.equal(
      true
    );
  });
  it('should call setFavoriteStoreByAddress', () => {
    const updatePickupinStoreModalStub = sinon.stub();
    const fetchStore = sinon.spy();
    const storeListByAddress = [];
    const storeResults = {
      resultsCount: 0,
    };
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        updatePickupinStoreModal={updatePickupinStoreModalStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        fetchStore={fetchStore}
        clearStoreData={sinon.spy()}
        onStoreUpdate={sinon.spy()}
      />
    );
    tree
      .instance()
      .setFavoriteStoreByAddress(storeListByAddress, storeResults, false);
    expect(tree.state('favoriteStoreId')).to.be.equal(null);
  });

  it('should call getFavoriteStoreById', () => {
    const updatePickupinStoreModalStub = sinon.stub();
    const fetchStore = sinon.spy();
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        updatePickupinStoreModal={updatePickupinStoreModalStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        fetchStore={fetchStore}
        clearStoreData={sinon.spy()}
        onStoreUpdate={sinon.spy()}
      />
    );
    tree.setState({ favoriteStoreId: '111' });
    tree.instance().getFavoriteStoreById('111', {});
    expect(tree.state('favoriteStoreId')).to.be.equal('111');
  });

  it('should call setFavoriteStoreById', () => {
    const updatePickupinStoreModalStub = sinon.stub();
    const fetchStore = sinon.spy();
    const storeListById = [{ storeId: '111' }];
    const tree = shallow(
      <RegistryFavoriteStore
        searchStore={() => {}}
        updatePickupinStoreModal={updatePickupinStoreModalStub}
        storesConfig={storesConfig}
        siteId="BedBathUS"
        fetchStore={fetchStore}
        clearStoreData={sinon.spy()}
        onStoreUpdate={sinon.spy()}
        clearProfileStoreData={sinon.spy()}
      />
    );
    tree.setState({ storeInfo: { RecordId: '111' } });
    tree.instance().setFavoriteStoreById(storeListById, {});
    expect(typeof tree.state('storeInfo')).to.be.equal('object');

    tree.instance().setFavoriteStoreById([], {});
  });
});

describe('#RegistryFavoriteStore.matchDispatchToProps', () => {
  const dispatch = sinon.spy();

  it('should call dispatch and trigger "getProfile"', () => {
    const props = matchDispatchToProps(dispatch);
    props.getProfile('111');
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "fetchStore"', () => {
    const props = matchDispatchToProps(dispatch);
    props.fetchStore('2233');
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "searchStore"', () => {
    const props = matchDispatchToProps(dispatch);
    props.searchStore({ storeId: '111', customerId: '111' });
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "updatePickupinStoreModal"', () => {
    const props = matchDispatchToProps(dispatch);
    props.updatePickupinStoreModal({});
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "clearStoreData"', () => {
    const props = matchDispatchToProps(dispatch);
    props.clearStoreData();
    expect(dispatch.called).to.equal(true);
  });

  it('should call dispatch and trigger "clearProfileStoreData"', () => {
    const props = matchDispatchToProps(dispatch);
    props.clearProfileStoreData();
    expect(dispatch.called).to.equal(true);
  });
});
