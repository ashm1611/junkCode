import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as common from '@bbb-app/utils/common';

import { CreateRegistry, mapDispatchToProps } from '../CreateRegistry';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let location = {
    hash: '',
    key: 'ac5dnr',
    pathname: '/store/giftregistry/createRegistryForm',
    search: '?regType=BRD',
  };

  const history = {
    push: sinon.spy(),
  };
  it('should render CreateRegistry correctly', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const flagToSetProps = 'hi';
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const otherProps = {
      isLoggedIn: true,
      accountAddress: '',
      profileData: { repositoryId: '1234' },
      getProfile: sinon.stub(),
      isFetching: false,
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        globalSwitchConfig={switchConfig}
        {...otherProps}
      />
    );
    tree.setProps({
      flagToSetProps,
    });
    tree.instance().changeRegistryType();
    tree.instance().getRegistryTypeFromSearchParam('');
    tree.instance().getRegistryTypeFromSearchParam('hello');
    tree.instance().getRegTypeModalStateFromSearchParam('');
    tree.instance().getDefaultRegistryType();
    tree.instance().getCurrentRegistryType({});
    tree.instance().getAddressData({});
    tree.instance().redirectToNotFound();
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should createRegistryComponent contains location prop', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const flagToSetProps = 'hi';
    const locationProps = {
      search:
        'pwaRedirectUrl=https://www.bedbathandbeyond.com/store/product/instant-pot-9-in-1-duo-plus-programmable-electric-pressure-cooker/5230177?keyword=rice-cooker',
    };
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const otherProps = {
      isLoggedIn: true,
      accountAddress: '',
      profileData: { repositoryId: '1234' },
      getProfile: sinon.stub(),
      isFetching: false,
    };
    const tree = shallow(
      <CreateRegistry
        location={locationProps}
        history={history}
        enableNewSignUp
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        globalSwitchConfig={switchConfig}
        {...otherProps}
      />
    );
    tree.setProps({
      flagToSetProps,
    });
    tree.instance().changeRegistryType();
    tree.instance().getRegistryTypeFromSearchParam('');
    tree.instance().getRegistryTypeFromSearchParam('hello');
    tree.instance().getRegTypeModalStateFromSearchParam('');
    tree.instance().getDefaultRegistryType();
    tree.instance().getCurrentRegistryType({});
    tree.instance().getAddressData({});
    tree.instance().redirectToNotFound();
    expect(tree.find('CreateRegistryComponent').props().location).to.not.equal(
      null
    );
  });

  it('should render CreateRegistry correctly with Regtype data and enable tutorial true', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const flagToSetProps = 'hi';
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const regTypeData = {
      popular: [
        {
          registryCode: 'BRD',
          enableICTutorial: true,
          registryDescription: 'Wedding',
          registryIndex: 1,
          registryName: 'Wedding',
          registryTypeId: '200001',
          registryImg:
            'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$',
        },
        {
          registryCode: 'COM',
          enableICTutorial: true,
          registryDescription: 'Commitment Ceremony',
          registryIndex: 2,
          registryName: 'Commitment Ceremony',
          registryTypeId: '200002',
          registryImg:
            'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$',
        },
        {
          registryCode: 'BA1',
          enableICTutorial: true,
          registryDescription: 'Baby',
          registryIndex: 3,
          registryName: 'Baby',
          registryTypeId: '200007',
          registryImg:
            'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$',
        },
        {
          registryCode: 'HSW',
          enableICTutorial: true,
          registryDescription: 'Housewarming',
          registryIndex: 4,
          registryName: 'Housewarming',
          registryTypeId: '200004',
          registryImg:
            'https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$',
        },
      ],
      other: [
        {
          registryCode: 'RET',
          enableICTutorial: true,
          registryDescription: 'Retirement',
          registryIndex: 8,
          registryName: 'Retirement',
          registryTypeId: '200008',
        },
        {
          registryCode: 'OTH',
          enableICTutorial: true,
          registryDescription: 'Other',
          registryIndex: 9,
          registryName: 'Other',
          registryTypeId: '200009',
        },
        {
          registryCode: 'ANN',
          enableICTutorial: true,
          registryDescription: 'Anniversary',
          registryIndex: 5,
          registryName: 'Anniversary',
          registryTypeId: '200003',
        },
        {
          registryCode: 'COL',
          enableICTutorial: true,
          registryDescription: 'College/University',
          registryIndex: 6,
          registryName: 'College/University',
          registryTypeId: '200005',
        },
        {
          registryCode: 'BIR',
          enableICTutorial: true,
          registryDescription: 'Birthday',
          registryIndex: 7,
          registryName: 'Birthday',
          registryTypeId: '200006',
        },
      ],
    };
    const otherProps = {
      updateSubmitStateData: sinon.stub(),
      setPassWordComError: sinon.stub(),
      clearIdentifierStateData: sinon.stub(),
      resetStoreData: sinon.stub(),
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        regTypesData={regTypeData}
        globalSwitchConfig={switchConfig}
        {...otherProps}
      />
    );
    tree.setProps({
      flagToSetProps,
    });
    tree.instance().changeRegistryType();
    tree.instance().getRegistryTypeFromSearchParam('');
    tree.instance().getRegistryTypeFromSearchParam('hello');
    tree.instance().componentWillUnmount();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call mapDispatchToProps correctly', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const props = {
      getRegistryInputs: sinon.stub(),
      checkProfileStatus: sinon.stub(),
      resetProfileStatus: sinon.stub(),
      fetchModalData: sinon.stub(),
      createRegistry: sinon.stub(),
      regTypes: sinon.stub(),
      getProfile: sinon.stub(),
      onExtendProfileSubmitClick: sinon.stub(),
      fetchCoRegistrantProfileStatus: sinon.stub(),
      resetCoRegistrantProfileStatus: sinon.stub(),
      fetchQasData: sinon.stub(),
      setUserAddressData: sinon.stub(),
      emptyQasData: sinon.stub(),
      setPassWordComError: sinon.stub(),
      updateSubmitStateData: sinon.stub(),
      updateContactAddressModalQasVisibility: sinon.stub(),
      updateMovingAddressModalQasVisibility: sinon.stub(),
      updateShippingAddressModalQasVisibility: sinon.stub(),
      addFormField: sinon.stub(),
      clearIdentifierStateData: sinon.stub(),
      resetWelcomeScreenData: sinon.stub(),
      resetStoreData: sinon.stub(),
      resetVerType: sinon.stub(),
      fireTealiumAction: sinon.stub(),
      fetchContentStack: sinon.stub(),
    };
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        globalSwitchConfig={switchConfig}
        {...props}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    const dispatch = sinon.stub();
    const prop = mapDispatchToProps(dispatch);
    prop.getRegistryInputs();
    prop.checkProfileStatus();
    prop.resetProfileStatus();
    prop.fetchModalData();
    prop.createRegistry();
    prop.getProfile();
    prop.onExtendProfileSubmitClick();
    prop.fetchCoRegistrantProfileStatus();
    prop.resetCoRegistrantProfileStatus();
    prop.fetchQasData();
    prop.setUserAddressData();
    prop.emptyQasData();
    prop.setPassWordComError();
    prop.updateSubmitStateData();
    prop.updateContactAddressModalQasVisibility();
    prop.updateMovingAddressModalQasVisibility();
    prop.resetWelcomeScreenData();
    prop.updateShippingAddressModalQasVisibility();
    prop.addFormField();
    prop.clearIdentifierStateData();
    prop.resetStoreData();
    prop.resetVerType();
    prop.fireTealiumAction();
    prop.clearErrorState();
    prop.fetchContentStack();
  });

  it('should call fetchModalData on componentDidMount if uniqueIds array of objects', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '1234', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const referredContent = {
      content: [
        {
          1234: {
            Response: 'Success',
            body: 'this is demo content',
            statusCode: 200,
          },
        },
      ],
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        referredContent={referredContent}
        fetchModalData={fetchModalData}
        isMobile={false}
      />
    );
    const spy = sinon.spy(tree.instance(), 'componentDidMount');
    tree.instance().componentDidMount();
    expect(spy.called).to.equal(true);
    expect(fetchModalData.called).to.equal(true);
  });
  it('should call getRegistryInputs when regType chnages in URL', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '123', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        fetchModalData={fetchModalData}
        isMobile={false}
      />
    );
    tree.setProps({ location: { search: '' } });
    expect(getRegistryInputs.called).to.equal(true);
  });
  it('should redirect to redirectLocation if we have addToRegistry param in url', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '123', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const registryID = { component: { 'registryVO.registryId': '53264732' } };
    const profileData = { email: 'abc@xyz.com' };
    const activeRegistry = { firstName: 'test', lastName: 'last name' };
    const ownAndRecommendedRegistries = {
      profileRegistryList: [{ registryId: '556263', firstName: 'test' }],
    };
    location = {
      hash: '',
      key: 'ac5dnr',
      pathname: '/store/giftregistry/createRegistryForm',
      search: '?addToRegistry=true',
    };
    const prevLocationBeforeTransition = { params: { redirect: 'PDP' } };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        registryID={registryID}
        activeRegistry={activeRegistry}
        prevLocationBeforeTransition={prevLocationBeforeTransition}
        profileData={profileData}
        fetchModalData={fetchModalData}
        isMobile={false}
        ownAndRecommendedRegistries={ownAndRecommendedRegistries}
      />
    );
    expect(tree.find('Redirect').length).to.equal(1);
  });
  it('should redirect to registry owner if there is no addToRegistry param in url', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '123', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const registryID = { component: { 'registryVO.registryId': '53264732' } };
    const profileData = { email: 'abc@xyz.com' };
    const activeRegistry = { firstName: 'test', lastName: 'last name' };
    const ownAndRecommendedRegistries = {
      profileRegistryList: [{ registryId: '556263', firstName: 'test' }],
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        registryID={registryID}
        activeRegistry={activeRegistry}
        profileData={profileData}
        fetchModalData={fetchModalData}
        isMobile={false}
        ownAndRecommendedRegistries={ownAndRecommendedRegistries}
      />
    );
    expect(tree.find('CreateRegistryRedirection').length).to.equal(1);
  });
  it('should redirect to redirectLocation if we have addToRegistry & ideaboard param in url', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '123', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const registryID = { component: { 'registryVO.registryId': '53264732' } };
    const profileData = { email: 'abc@xyz.com' };
    const activeRegistry = { firstName: 'test', lastName: 'last name' };
    const ownAndRecommendedRegistries = {
      profileRegistryList: [{ registryId: '556263', firstName: 'test' }],
    };
    location = {
      hash: '',
      key: 'ac5dnr',
      pathname: '/store/giftregistry/createRegistryForm',
      search: '?addToRegistry=true&ideaboard=true',
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        registryID={registryID}
        activeRegistry={activeRegistry}
        profileData={profileData}
        fetchModalData={fetchModalData}
        isMobile={false}
        ownAndRecommendedRegistries={ownAndRecommendedRegistries}
      />
    );
    expect(tree.find('Route').length).to.equal(1);
  });
  it('should return BA1 from getDefaultRegistryType if site id is buybuybaby', () => {
    const labels = {
      createRegistry: { referredContent: [{ id: '123', key: 'abc' }] },
    };
    const getRegistryInputs = sinon.spy();
    const fetchModalData = sinon.spy();
    const registryID = { component: { 'registryVO.registryId': '53264732' } };
    const getSiteIdUtils = sinon
      .stub(common, 'getSiteId')
      .returns('BuyBuyBaby');
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        labels={labels}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        registryID={registryID}
        isFetching={false}
        error={{ error: 'no error' }}
        fetchModalData={fetchModalData}
        isMobile={false}
      />
    );
    const spy = sinon.spy(tree.instance(), 'getDefaultRegistryType');
    const result = tree.instance().getDefaultRegistryType();
    expect(spy.called).to.equal(true);
    expect(result).to.equal('BA1');

    getSiteIdUtils.restore();
  });
  it('should render CreateRegistry Component & also having prop of isCABabyRegistry as true', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const flagToSetProps = 'hi';
    const registryInputs = {
      eventType: 'Baby',
    };
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const getSiteIdUtils = sinon
      .stub(common, 'getSiteId')
      .returns('BedBathCanada');
    const otherProps = {
      isLoggedIn: true,
      accountAddress: '',
      profileData: { repositoryId: '1234' },
      getProfile: sinon.stub(),
      isFetching: false,
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        registryInputs={registryInputs}
        enableRegBabyCreate
        globalSwitchConfig={switchConfig}
        {...otherProps}
      />
    );
    tree.setProps({
      flagToSetProps,
    });
    expect(tree.find('CreateRegistryComponent')).to.not.equal(null);
    expect(
      tree.find('CreateRegistryComponent').prop('isCABabyRegistry')
    ).to.equal(true);
    getSiteIdUtils.restore();
  });

  it('should render CreateRegistry Component & also having prop of isBabyRegistry as true', () => {
    const onComponentMount = sinon.spy();
    const changeRegistryType = sinon.spy();
    const regTypes = sinon.spy();
    const getRegistryInputs = sinon.spy();
    const flagToSetProps = 'hi';
    const registryInputs = {
      eventType: 'Baby',
    };
    const switchConfig = {
      PDP: {
        interactiveCheckList: true,
      },
      Global: {
        enableICTutorialCMS: false,
      },
    };
    const getSiteIdUtils = sinon
      .stub(common, 'getSiteId')
      .returns('BuyBuyBaby');
    const otherProps = {
      isLoggedIn: true,
      accountAddress: '',
      profileData: { repositoryId: '1234' },
      getProfile: sinon.stub(),
      isFetching: false,
    };
    const tree = shallow(
      <CreateRegistry
        location={location}
        history={history}
        onComponentMount={onComponentMount}
        changeRegistryType={changeRegistryType}
        regTypes={regTypes}
        getRegistryInputs={getRegistryInputs}
        flagToSetProps=""
        switchConfig={switchConfig}
        registryInputs={registryInputs}
        enableRegBabyCreate
        globalSwitchConfig={switchConfig}
        {...otherProps}
      />
    );
    tree.setProps({
      flagToSetProps,
    });
    expect(tree.find('CreateRegistryComponent')).to.not.equal(null);
    expect(
      tree.find('CreateRegistryComponent').prop('isBabyRegistry')
    ).to.equal(true);
    getSiteIdUtils.restore();
  });
});
