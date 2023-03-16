import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as getSiteId from '@bbb-app/utils/getSiteId';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EditRegistryComponent from '../EditRegistryComponent';
import { eventTypeConst } from '../../CreateRegistry/CreateRegistryUtils';

configure({ adapter: new Adapter() });

const labels = {
  test: 'key',
  referredContent: [{ key: 'davidBridalEditModalContent', id: '123' }],
};
const createRegistryLabels = {
  test: 'key',
  referredContent: [{ key: 'deleteRegistry', id: '123' }],
};
const contentStackSelectors = [
  {
    modules: [
      {
        registry_story: {
          item: [
            {
              title_cta: 'great benefits',
              _metadata: {
                uid: 'cs771225b6468b0cbb',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
              single_line: 'great benefits',
              story_tile_1: {
                header: 'test',
                subtitle: '',
                description: '',
                cta: {
                  title: '',
                  href: '',
                },
                cta_type: null,
                scene7_url: '',
              },
              story_tile_2: {
                title: 'get more (and better) benefits',
                sub_title:
                  'Register with us and earn rewards, get 20% off, special deals – and so much more!',
                item: [
                  {
                    title: 'test',
                    _metadata: {
                      uid: 'cs3fcf0da28c61df86',
                    },
                    sub_title: '',
                    cta: {
                      title: 'Welcome Rewards',
                      href: '/welcomerewards',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/babystory1circle?$content$',
                  },
                  {
                    title: '',
                    _metadata: {
                      uid: 'cs2308d3b76322bdb6',
                    },
                    sub_title: '',
                    cta: {
                      title: '20% Completion Offer',
                      href: '/store/static/WeddingRegistryAmazingPerks',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle2',
                  },
                  {
                    title: '',
                    _metadata: {
                      uid: 'csae98f6c40c0b932f',
                    },
                    sub_title: '',
                    cta: {
                      title: 'Group Gifting',
                      href: '/store/static/GroupGifting',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle3',
                  },
                  {
                    title: '',
                    _metadata: {
                      uid: 'cs93acf2ca49dd3d3c',
                    },
                    sub_title: '',
                    cta: {
                      title: '365-Day Returns & Exchanges',
                      href: '/store/static/EasyReturns',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle4',
                  },
                  {
                    title: '',
                    _metadata: {
                      uid: 'csd86ccd0090caf273',
                    },
                    sub_title: '',
                    cta: {
                      title: 'Price match promise',
                      href: '/store/static/pricematch',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle5',
                  },
                  {
                    title: '',
                    _metadata: {
                      uid: 'cs6df0390007b0379a',
                    },
                    sub_title: '',
                    cta: {
                      title: 'Ship or Swap',
                      href: '/store/static/ShiporSwap',
                    },
                    cta_type: 'ctaLink',
                    scene7_url:
                      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle6',
                  },
                ],
              },
            },
            {
              title_cta: 'Registry favorites',
              _metadata: {
                uid: 'cs8c013289e706fa46',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
              single_line: 'Registry favorites',
              story_tile_1: {
                header: 'get registry favorites',
                subtitle: '',
                description:
                  'See what gifts other couples are loving right now.',
                cta: {
                  title: 'see registry favorites',
                  href:
                    '/store/category/registry-favorites/all-registry-favorites/16589',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story1wedding?$content$',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'in-store app mode',
              _metadata: {
                uid: 'csc23fadbc9fa2d547',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds8circle?$PNG$',
              single_line: 'in-store app mode',
              story_tile_1: {
                header: 'get in-store mode',
                subtitle: '',
                description:
                  'Shop on our app for easier, faster shopping in store.',
                cta: {
                  title: 'see how it works',
                  href:
                    'https://b3h2.scene7.com/is/content/BedBathandBeyond/FEO/Loverly-BBB_Final_375_667.mp4',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story8wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'cash funds',
              _metadata: {
                uid: 'cs55f37d3f4b6a2d17',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/registy_cash_funds_icon_10262022?$PNG$',
              single_line: 'cash funds',
              story_tile_1: {
                header: 'cash funds',
                subtitle: '',
                description:
                  'Add a cash fund to your registry with Venmo and buy whatever you want! View the video to learn more.',
                cta: {
                  title: 'learn about cash funds',
                  href:
                    'https://b3h2.scene7.com/is/content/BedBathandBeyond/FEO/MobileLandingPage/045407_BBB_CashFunds-Pin_2022-09-23.mp4',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story3wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'create cash funds',
              _metadata: {
                uid: 'cs5030701c23bd51cc',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds3circle?$PNG$',
              single_line: 'create cash funds',
              story_tile_1: {
                header: 'get the gift of cash',
                subtitle: 'with Venmo',
                description:
                  'Add a cash fund to your registry with Venmo and buy whatever you want!',
                cta: {
                  title: 'create a cash fund',
                  href: '#cashfund',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story3wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'Top Brands',
              _metadata: {
                uid: 'csa048b8ebfa0a01a3',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds4circle?$PNG$',
              single_line: 'Top Brands',
              story_tile_1: {
                header: 'get all the top brands',
                subtitle: '',
                description:
                  'Stock up on the best brands, from Dyson to KitchenAid, UGG to Casper, and more.',
                cta: {
                  title: 'see top brands',
                  href: '/store/static/top-registry-brands',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story4wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'experience gifts',
              _metadata: {
                uid: 'cs3a30df1769d99239',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds5circle?$PNG$',
              single_line: 'in-store app mode',
              story_tile_1: {
                header: 'get amazing experience gifts',
                subtitle: '',
                description:
                  'Choose from hundreds of unforgettable activities to add to your registry.',
                cta: {
                  title: 'explore experiences',
                  href: '/store/category/experiences-registry-gifts/16087',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story5wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'great deals',
              _metadata: {
                uid: 'cs03d63b442c66db09',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds6circle?$PNG$',
              single_line: 'cash funds',
              story_tile_1: {
                header: 'get so many great deals',
                subtitle: '',
                description:
                  'Save on everything you need for every room of your home.',
                cta: {
                  title: 'see all deals',
                  href: 'store/category/deals-and-steals/shop-all-deals/16423',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story6wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'bonus gifts',
              _metadata: {
                uid: 'cs774e558bfabc0591',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds7circle?$PNG$',
              single_line: 'experience gifts',
              story_tile_1: {
                header: 'get bonus gifts',
                subtitle: '',
                description:
                  'Register for top brands and receive a bonus gift when they’re purchased.',
                cta: {
                  title: 'see details',
                  href: '/store/static/vendor-bonus-program',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story7wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
            {
              title_cta: 'product guide',
              _metadata: {
                uid: 'cs8bbaa09f93ebc7fd',
              },
              image:
                'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds9circle?$PNG$',
              single_line: '',
              story_tile_1: {
                header: 'get help choosing products',
                subtitle: '',
                description:
                  'From sheets to sauté pans, we can help you find all the best stuff.',
                cta: {
                  title: 'see registry guide',
                  href: '/store/static/wedding-registry-guide',
                },
                cta_type: 'ctaButton',
                scene7_url:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story9wedding',
              },
              story_tile_2: {
                title: '',
                sub_title: '',
                item: [],
              },
            },
          ],
          _metadata: {
            uid: 'cs298bbf13e63f1d2d',
          },
        },
      },
      {
        status_bar: {
          view_type: 'StatusBar',
          tile: [
            {
              heading: 'cash funds',
              _metadata: {
                uid: 'cs4fc527ece2667e36',
              },
              subheading: 'Looks like no cash funds were added,',
              cta: {
                title: 'click here to add.',
                href: '#cashfund',
              },
            },
            {
              heading: 'guests',
              _metadata: {
                uid: 'cs7f671d05263c52e7',
              },
              subheading:
                'Update the number of guests attending your wedding here.',
              cta: {
                title: 'Save Changes',
                href: '',
              },
            },
          ],
          _metadata: {
            uid: 'cse8b5d2c36d9076ea',
          },
        },
      },
    ],
  },
];
const stateObj = {
  coRegProfileStatus: 'false',
  thirdPartySelected: false,
  subscribeSelected: false,
  isRegistryTypeOpen: false,
  firstName: '',
  babyMaidenName: '',
  babyMaidenNameError: '',
  babyNurseryTheme: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  email: '',
  emailError: '',
  gender: '',
  babyGender: '',
  coFirstName: '',
  coFirstNameError: '',
  coLastName: '',
  coLastNameError: '',
  coEmail: '',
  coEmailError: '',
  coGender: '',
  eventDate: '',
  showerDate: '',
  eventDateError: '',
  babyExpectedArivalDate: '',
  babyExpectedArivalDateError: '',
  guests: '',
  guestsError: '',
  primaryPh: '',
  primaryPhError: '',
  mobilePh: '',
  mobilePhError: '',
  street: '',
  streetError: '',
  apartment: '',
  apartmentError: '',
  zip: '',
  zipError: '',
  password: '',
  passwordError: true,
  confirmPassword: '',
  confirmPasswordError: true,
  addressOne: '',
  addressOneError: '',
  addressTwo: '',
  addressTwoError: '',
  city: '',
  cityError: '',
  state: '',
  stateError: '',
  showerDateError: '',
  showMoveInInfo: false,
  showShippingInfo: false,
  shippingPhone: '',
  shippingPhoneError: '',
  shippingStreet: '',
  shippingStreetError: '',
  shippingApartment: '',
  shippingApartmentError: '',
  moveInStreet: '',
  moveInStreetError: '',
  moveInApartment: '',
  moveInApartmentError: '',
  modalMountedState: true,
};
const registryDetails = {
  test: 'value',
  registryResVO: {
    registrySummaryVO: { eventType: eventTypeConst.WEDDING },
  },
};

const signInDetails = { editText: 'Edit' };

const propObj = {
  stateObj,
  labels,
  createRegistryLabels,
  signInDetails,
  registryID: '123456',
  babyRecommendations: 'Baby',
  dynamicContentState: {
    content: {
      id: '12441',
      body: 'test body data',
    },
  },
  editModalError: true,
  switchConfigGlobal: { enableCSLabels: true },
};

const props = {
  LearnMoreModalGG: true,
  hideLoginView: true,
  isMobile: true,
  editModalError: true,
};
const getContent = sinon.stub();
describe(__filename, () => {
  it('renderBabyOrOtherForm: should render Baby registry correctly', () => {
    stateObj.errorMessages = { message: 'An error occurred : Some message' };
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        registryDetails={registryDetails}
        stateObj={stateObj}
        getContent={getContent}
      />
    );
    tree.instance().renderBabyOrOtherForm(eventTypeConst.BABY);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('when isbabytbs is true ', () => {
    stateObj.errorMessages = { message: 'An error occurred : Some message' };
    sinon.stub(getSiteId, 'default').returns('TBS_BuyBuyBaby');
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        registryDetails={registryDetails}
        stateObj={stateObj}
        getContent={getContent}
      />
    );
    tree.instance().renderBabyOrOtherForm(eventTypeConst.BABY);
    expect(toJson(tree)).to.matchSnapshot();
    getSiteId.default.restore();
  });
  it('renderBabyOrOtherForm: should render Other registry correctly', () => {
    const tree = shallow(
      <EditRegistryComponent
        getContent={getContent}
        {...propObj}
        switchConfigGlobal={{ enableCSLabels: false }}
        dynamicContentState
      />
    );
    tree.instance().renderBabyOrOtherForm(eventTypeConst.HOUSEWARMING);
    expect(tree).to.not.equal(null);
  });

  it('renderBabyOrOtherForm: should render NO registry correctly', () => {
    const tree = shallow(
      <EditRegistryComponent {...propObj} getContent={getContent} />
    );
    tree.instance().renderBabyOrOtherForm();
    expect(tree).to.not.equal(null);
  });

  it('isRecognized: true', () => {
    const setEditRegistryFlag = sinon.spy();
    const tree = shallow(
      <EditRegistryComponent
        isRecognized
        setEditRegistryFlag={setEditRegistryFlag}
        {...propObj}
        {...props}
        customLabel="sdsd"
        isPublic="0"
        buttonTheme=""
        getContent={getContent}
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('should render modal when guestModalOpen is true', () => {
    const guestModalOpen = sinon.spy();
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        customLabel="sdsd"
        getContent={getContent}
        guestModalOpen={guestModalOpen}
        contentStackSelectors={contentStackSelectors}
        isNewRegDashboard
      />
    );
    expect(tree).to.not.equal(null);
  });
  it('isFetchingEditRegistryDetails: true', () => {
    const tree = shallow(
      <EditRegistryComponent
        isFetchingEditRegistryDetails
        {...propObj}
        customLabel="sdsd"
        buttonTheme="Primary"
        getContent={getContent}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when buttonTheme is null', () => {
    const tree = shallow(
      <EditRegistryComponent
        isFetchingEditRegistryDetails
        {...propObj}
        customLabel="sdsd"
        buttonTheme=""
        getContent={getContent}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render when errorMessages values are null', () => {
    stateObj.errorMessages = { message: '' };
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        registryDetails={registryDetails}
        stateObj={stateObj}
        getContent={getContent}
      />
    );
    tree.instance().renderBabyOrOtherForm(eventTypeConst.BABY);
    expect(tree).to.not.equal(null);
  });

  it('should render Wedding registry correctly', () => {
    const tree = shallow(
      <EditRegistryComponent
        isPublic="1"
        {...propObj}
        signInDetails={signInDetails}
        getContent={getContent}
      />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render new Edit Registry Icon for BBB', () => {
    const handleEditRegistryClick = sinon.spy();
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        signInDetails={signInDetails}
        isBBBNewRegistryHeader
        isMobile
        getContent={getContent}
      />
    );
    expect(tree.find('.clickable').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('bbb-gear');
    tree.find('.clickable').simulate('click');
    expect(handleEditRegistryClick.called);
  });

  it('should render new Edit Registry Icon for Baby', () => {
    const handleEditRegistryClick = sinon.spy();
    const tree = shallow(
      <EditRegistryComponent
        {...propObj}
        signInDetails={signInDetails}
        isBabyNewRegistryHeader
        isMobile
        getContent={getContent}
      />
    );
    expect(tree.find('.clickable').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('baby-gear');
    tree.find('.clickable').simulate('click');
    expect(handleEditRegistryClick.called);
  });
});
