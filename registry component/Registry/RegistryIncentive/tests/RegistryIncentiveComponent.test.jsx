import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import RegistryIncentiveComponent from '../RegistryIncentiveComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let labels;
  let isFetching;
  let incentiveInfo;
  let activeRegistry;
  let isLoggedIn;
  let isRecognizedUser;

  labels = {
    allIncentives: 'All Incentives',
    RegistryIncentives: {
      referredContent: [
        {
          id: '16385',
          key: 'createRegistryIncentiveBanner',
        },
      ],
    },
  };
  incentiveInfo = [{ test: 'test' }, { test: 'test' }];
  const bannerData = {
    content: {
      16385: { test: 'test' },
    },
  };
  isFetching = false;

  it('should render correctly', () => {
    const data = {
      components: null,
      cta: 'CTA',
    };
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        isFetching={isFetching}
        bannerData={bannerData}
        data={data}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        pageName="RegistryOwnerHome"
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render Loader when isFetching is true', () => {
    isFetching = true;
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        isFetching={isFetching}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render Heading Component', () => {
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        incentiveInfo={incentiveInfo}
        redirectTo={sinon.stub()}
      />
    );
    expect(tree.find('Heading')).to.have.lengthOf(1);
  });

  it('should render correctly for RegistryOwnerHome page', () => {
    incentiveInfo = [
      { test: 'test' },
      { test1: 'test1' },
      { test2: 'test2' },
      { test3: 'test3' },
    ];
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        incentiveInfo={incentiveInfo}
        pageName="RegistryOwnerHome"
        redirectTo={sinon.stub()}
      />
    );
    expect(tree.find('Button')).to.have.lengthOf(1);
    tree.find('Button').simulate('click');
  });

  it('should not render when data is incentiveInfo is null', () => {
    incentiveInfo = null;
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        isFetching={isFetching}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
      />
    );

    expect(tree.find('Skeleton')).to.have.lengthOf(1);
  });

  it('should not render banner when data is null', () => {
    labels = {
      allIncentives: 'All Incentives',
      RegistryIncentives: {
        referredContent: [],
      },
    };
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        isFetching={isFetching}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
      />
    );

    expect(tree.find('CreateRegistryWithUsBanner')).to.have.lengthOf(0);
  });

  it('should render correctly with One referredContent', () => {
    labels = {
      allIncentives: 'All Incentives',
      referredContent: [
        {
          id: '16385',
          key: 'createRegistryIncentiveBanner',
        },
      ],
    };
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with referredContent when enableCSLabels is true', () => {
    const tree = shallow(<RegistryIncentiveComponent enableCSLabels />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with referredContent other than createRegistry', () => {
    labels = {
      allIncentives: 'All Incentives',
      referredContent: [
        {
          id: '16385',
          key: 'Registry',
        },
      ],
    };
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        pageName="RegistryOwnerHome"
      />
    );
    expect(tree.find('div')).to.have.lengthOf(0);
  });

  it('should render correctly incentiveInfo is empty', () => {
    incentiveInfo = [''];

    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        pageName="RegistryOwnerHome"
      />
    );
    expect(tree.find('div')).to.have.lengthOf(0);
  });

  it('should call renderFirstTile method   ', () => {
    labels = {
      incentiveText: 'incentive',
      allIncentives: 'All Incentives',
      createRegistryBannerTitle: 'abc',
      subHead: 'abc',
      referredContent: [
        {
          id: '16385',
          key: 'createRegistryIncentiveBanner',
        },
      ],
    };
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        bannerData={bannerData}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        pageName="RegistryOwnerHome"
      />
    );
    tree.instance().renderFirstTile(labels);
    expect(tree.find('Heading')).to.have.length(0);
  });

  it('should render Notification component in case of error', () => {
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        bannerData={{}}
        activeRegistry={activeRegistry}
        error={{ error: 'error' }}
      />
    );

    expect(tree.find('Notification')).to.have.length(1);
  });

  it('should render Notification component in case of error on RegistryOwnerHome page', () => {
    const tree = shallow(
      <RegistryIncentiveComponent
        labels={labels}
        incentiveInfo={incentiveInfo}
        bannerData={{}}
        activeRegistry={activeRegistry}
        isLoggedIn={isLoggedIn}
        isRecognizedUser={isRecognizedUser}
        pageName="RegistryOwnerHome"
        error={{ error: 'error' }}
      />
    );

    expect(tree.find('Notification')).to.have.length(1);
  });
});
