import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import toJson from 'enzyme-to-json';
import RegistryStoryTile, {
  CustomWithSeeMoreTileOne,
  CustomWithSeeMoreTileTwo,
  CustomSeeMore,
} from '../RegistryStoryTile';
import StoryComponent from '../StoryModuleComponent';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const registryStoryTileData = {
    title_cta: 'great benefits',
    image:
      'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    story_tile_1: {
      header: '',
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
          title: '',
          _metadata: {
            uid: 'csa7831d7f170cdea7',
          },
          sub_title: '',
          cta: {
            title: 'Welcome Rewards',
            href: '/welcomerewards',
          },
          cta_type: 'ctaLink',
          scene7_url:
            'https://b3h2.scene7.com/is/image/BedBathandBeyond/Wstory1circle1',
        },
        {
          title: '',
          _metadata: {
            uid: 'cs40abde1ab7646e92',
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
            uid: 'cs3330d83594833322',
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
            uid: 'cs9737e0b6da81259f',
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
            uid: 'cs4134de878dc8a8a6',
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
            uid: 'cs2d2f52fd70c15c68',
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
  };

  const stories = [
    {
      title_cta: 'great benefits',
      _metadata: {
        uid: 'cs3353a48525b5307f',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
      story_tile_1: {
        header: '',
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
            title: '',
            _metadata: {
              uid: 'csa6c6653812de4662',
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
              uid: 'cs53e79d54f7a6362d',
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
              uid: 'cs359c41931086d7a7',
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
              uid: 'cs45e62d5defa9128a',
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
              uid: 'cs41833a9a11f949d9',
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
              uid: 'cs433ec26ef3bebe45',
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
        uid: 'cse744f18aec8b1869',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
      story_tile_1: {
        header: 'get registry favorites',
        subtitle: '',
        description: 'See what gifts other couples are loving right now.',
        cta: {
          title: 'see registry favorites',
          href:
            '/store/category/registry-favorites/all-registry-favorites/16589',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story1wedding',
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
        uid: 'cs390a50dd9e63cb21',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds8circle?$PNG$',
      story_tile_1: {
        header: 'get in-store mode',
        subtitle: '',
        description: 'Shop on our app for easier, faster shopping in store.',
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
        uid: 'cs3a125f354aff0c2e',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/registy_cash_funds_icon_10262022?$PNG$',
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
        uid: 'cscd5aa60a541359ed',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds3circle?$PNG$',
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
        uid: 'cs874e1888ab7a5df5',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds4circle?$PNG$',
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
        uid: 'cs9ce214f1202e96e2',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds5circle?$PNG$',
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
        uid: 'csb11ab4a36b4be77c',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds6circle?$PNG$',
      story_tile_1: {
        header: 'get so many great deals',
        subtitle: '',
        description: 'Save on everything you need for every room of your home.',
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
        uid: 'cs2ddf5c97439597d8',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds7circle?$PNG$',
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
        uid: 'cs6401477c94ba9e7c',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds9circle?$PNG$',
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
    {
      title_cta: 'ideas & inspiration',
      _metadata: {
        uid: 'cs63dc07122d222411',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds10circle?$PNG$',
      story_tile_1: {
        header: 'get ideas & inspiration',
        subtitle: '',
        description:
          'Expert tips on wedding planning, showers, themes, trends, and more.',
        cta: {
          title: 'read more',
          href: '/idea-inspiration/tag/topic/registry',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story10wedding',
      },
      story_tile_2: {
        title: '',
        sub_title: '',
        item: [],
      },
    },
    {
      title_cta: 'advice from loverly',
      _metadata: {
        uid: 'csafb9a7ffac2b4f5e',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds11circle?$PNG$',
      story_tile_1: {
        header: 'get expert help from Loverly',
        subtitle: '',
        description:
          'Find advice, tools, and classes from our partners at Loverly, the wedding planning pros!',
        cta: {
          title: 'meet Loverly',
          href: 'https://www.bedbathandbeyond.com/store/static/loverly',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story11wedding',
      },
      story_tile_2: {
        title: '',
        sub_title: '',
        item: [],
      },
    },
    {
      title_cta: 'video guestbook',
      _metadata: {
        uid: 'cs54562d5c34ae6f65',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds12circle?$PNG$',
      story_tile_1: {
        header: 'get a video guestbook',
        subtitle: '',
        description:
          'Invite friends and family to create a personalized keepsake you’ll love.',
        cta: {
          title: 'see video guestbook',
          href: '/store/static/video-guest-book',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story12wedding',
      },
      story_tile_2: {
        title: '',
        sub_title: '',
        item: [],
      },
    },
  ];

  const newStories = [
    {
      title_cta: 'Registry favorites',
      _metadata: {
        uid: 'cse744f18aec8b1869',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
      story_tile_1: {
        header: 'get registry favorites',
        subtitle: '',
        description: 'See what gifts other couples are loving right now.',
        cta: {
          title: 'see registry favorites',
          href:
            '/store/category/registry-favorites/all-registry-favorites/16589',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story1wedding',
      },
      story_tile_2: {
        item: '',
      },
    },
  ];

  const newData = [
    {
      title_cta: 'Registry favorites',
      _metadata: {
        uid: 'cse744f18aec8b1869',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
      story_tile_1: {
        header: 'get registry favorites',
        subtitle: '',
        description: 'See what gifts other couples are loving right now.',
        cta: {
          title: 'see registry favorites',
          href:
            '/store/category/registry-favorites/all-registry-favorites/16589',
        },
        cta_type: 'ctaButton',
        scene7_url:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Story1wedding',
      },
      story_tile_2: {
        item: 'klpp',
      },
    },
  ];

  const emptyStories = [
    {
      title_cta: 'Registry favorites',
      _metadata: {
        uid: 'cse744f18aec8b1869',
      },
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
      story_tile_1: {
        header: 'get registry favorites',
        subtitle: '',
        description: 'See what gifts other couples are loving right now.',
        cta: {
          title: 'see registry favorites',
          href:
            '/store/category/registry-favorites/all-registry-favorites/16589',
        },
        cta_type: 'ctaButton',
        scene7_url: '',
      },
      story_tile_2: {
        item: '',
      },
    },
  ];
  it('should render correctly', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: false });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        stories={stories}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    useStateStub.restore();
  });
  it('should render correctly for Mobile', () => {
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        isMobile
      />
    );
    expect(tree.find('Img')).to.have.lengthOf(1);
  });
  it('should render renderStory', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: true, storyIndex: 1 });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        stories={stories}
        data={stories}
        index={0}
        isMobile
      />
    );
    tree.find(HyperLink).prop('onClick')();
    useStateStub.restore();
  });

  it('should render renderStory when storyTile2[item].length is 0', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: true, storyIndex: 1 });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        newStories={newStories}
        data={newStories}
        index={0}
        isMobile
      />
    );
    tree.find(HyperLink).prop('onClick')();
    useStateStub.restore();
  });
  it('should render renderStory when storyTile2[item] & storyTile1length is 0', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: true, storyIndex: 0 });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        emptyStories={emptyStories}
        data={emptyStories}
        index={0}
      />
    );
    tree.find(HyperLink).prop('onClick')();
    useStateStub.restore();
  });
  it('should render nextStory', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: true, storyIndex: 0 });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        newData={newData}
        data={newData}
        index={0}
      />
    );
    tree.find(HyperLink).prop('onClick')();
    tree.find(StoryComponent).prop('nextStory')();
    useStateStub.restore();
  });
  it('should render  nextStory when handleCashFundsModal is true', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ modalIsOpen: true, storyIndex: 0 });
    const tree = shallow(
      <RegistryStoryTile
        registryStoryTileData={registryStoryTileData}
        newData={newData}
        data={newData}
        index={0}
      />
    );
    tree.find(HyperLink).prop('onClick')();
    tree.find(StoryComponent).prop('handleCashFundsModal')();
    useStateStub.restore();
  });

  it('should render CustomWithSeeMoreTileOne ', () => {
    const arrowFunc = sinon.spy();
    const tree1 = shallow(
      <CustomWithSeeMoreTileOne
        arrowFunc={arrowFunc}
        stories={stories}
        storyIndex={0}
      />
    );
    expect(tree1).to.not.equal(null);
  });

  it('should render CustomWithSeeMoreTileTwo ', () => {
    const arrowFunc = sinon.spy();
    const tree2 = shallow(
      <CustomWithSeeMoreTileTwo
        arrowFunc={arrowFunc}
        stories={stories}
        storyIndex={1}
      />
    );
    expect(tree2).to.not.equal(null);
  });

  it('should render CustomSeeMore ', () => {
    const close = sinon.spy();
    const tree3 = shallow(<CustomSeeMore close={close} />);
    expect(tree3).to.not.equal(null);
  });
});
