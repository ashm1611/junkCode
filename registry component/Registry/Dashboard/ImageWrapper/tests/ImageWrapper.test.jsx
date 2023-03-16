import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ImageWrapper from '../ImageWrapper';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  let mockAdapter;

  beforeEach(() => {
    const endpoint =
      'https://s22.socialannex.com/v2/api/photoregistry/images/9411181';
    mockAdapter = new MockAdapter(axios);
    const matchUrl = new RegExp(`${endpoint}/[a-z\\d]+/0`);
    mockAdapter.onGet(matchUrl).reply(200, { data: null });
    // `https://s22.socialannex.com/v2/api/photoregistry/images/9411181s/543149855/0`
  });
  afterEach(() => {
    mockAdapter.restore();
  });
  it('should render correctly', () => {
    const styles = {
      imageWrapper: '',
    };
    const tree = shallow(<ImageWrapper styles={styles} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render days left displayed when >=0 ', () => {
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      makeReviewYourProductsConfig: {
        uploadPhoto: true,
      },
      giftGiver: true,
      numberOfDays: 10,
    };
    const tree = shallow(<ImageWrapper styles={styles} {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render days left hidden when <0 ', () => {
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      makeReviewYourProductsConfig: {
        uploadPhoto: true,
      },
      email: 'test@test.com',
      numberOfDays: null,
    };
    const tree = shallow(<ImageWrapper styles={styles} {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render SocialAnnex component with email prop as true', () => {
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const tree = shallow(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        giftGiver
        primaryRegistrantInitial="MP"
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render SocialAnnex component renderImage', () => {
    const renderImage = sinon.stub();
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: true,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const wrapper = shallow(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        renderImage={renderImage}
        primaryRegistrantInitial="MP"
        coRegistrantInitial="TT"
        giftGiver
      />
    );
    expect(wrapper.find('div')).to.have.lengthOf(3);
  });

  it('should render SocialAnnex component renderGuestImage', () => {
    const renderGuestImage = sinon.stub();
    const getGuestViewWrapperHeight = sinon.stub();
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: true,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const wrapper = shallow(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        renderGuestImage={renderGuestImage}
        getGuestViewWrapperHeight={getGuestViewWrapperHeight}
      />
    );
    wrapper.instance().renderGuestImage();
    wrapper.instance().getGuestViewStyle();
    expect(wrapper.find('img')).to.have.lengthOf(1);
  });

  it('should render SocialAnnex component renderOwnerImage', () => {
    const renderOwnerImage = sinon.stub();
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: false,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const wrapper = shallow(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        renderOwnerImage={renderOwnerImage}
      />
    );
    wrapper.instance().renderOwnerImage();
    expect(wrapper.find('img')).to.have.lengthOf(1);
  });
});

const getMockData = () => [
  {
    unique_id: '543149855',
    photo_thumbnail:
      'https://socialannexprod.blob.core.windows.net/9411181/registryimage_29171.jpeg',
    image_poistion: '0',
    photo_url:
      'https://socialannexprod.blob.core.windows.net/9411181/registryimage_29171.jpeg',
    status: '1',
    photo_large: '',
    transform_x: '0.00',
    transform_y: '0.00',
    transform_scale: '0.0000',
  },
];
describe(__filename, () => {
  let endpoint;
  let mockAdapter;

  beforeEach(() => {
    endpoint =
      'https://s22.socialannex.com/v2/api/photoregistry/images/9411181';
    mockAdapter = new MockAdapter(axios);
    const matchUrl = new RegExp(`${endpoint}/[a-z\\d]+/0`);
    mockAdapter.onGet(matchUrl).reply(200, getMockData());
    // `https://s22.socialannex.com/v2/api/photoregistry/images/9411181s/543149855/0`
  });
  afterEach(() => {
    mockAdapter.restore();
  });
  it('should render correctly for default 1', done => {
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: true,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const tree = mount(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        giftGiver
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    done();
    tree.unmount();
  });
  it('should render correctly for Thumb 2', done => {
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: false,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const tree = mount(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        giftGiver
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    done();
    tree.unmount();
  });
  it('should render SocialAnnex component getSocialAnnexImage', () => {
    const getSocialAnnexImage = sinon.stub();
    const styles = {
      imageWrapper: '',
      daysToGo: 'daysToGo',
    };
    const props = {
      styles: {
        daysToGo: 'daysToGo',
      },
      numberOfDays: null,
      giftGiver: false,
    };
    const makeReviewYourProductsConfig = { uploadPhoto: true };
    const wrapper = mount(
      <ImageWrapper
        styles={styles}
        props={props}
        makeReviewYourProductsConfig={makeReviewYourProductsConfig}
        giftGiver
        getSocialAnnexImag={getSocialAnnexImage}
      />
    );

    // const imagePath = wrapper.instance().getSocialAnnexImage('545545');
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
