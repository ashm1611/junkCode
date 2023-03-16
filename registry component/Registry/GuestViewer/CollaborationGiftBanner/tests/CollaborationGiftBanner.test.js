import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CollaborationGiftBanner from '../CollaborationGiftBanner';

configure({ adapter: new Adapter() });

const contentStack = [
  {
    modules: [
      {
        support_page: {
          content_body:
            'https://b3h2.scene7.com/is/image/BedBathandBeyond/Chirmas_2?$content$',
          field_title:
            'Only you (and your co-registrant) will be able to see their recommendations. From there, you can choose which to add to your registry.',
          single_line: '',
          title: 'Invite friends & family to recommend products',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
      {
        support_page: {
          content_body: '<div></div>',
        },
      },
    ],
  },
];

const props = {
  contentStackSelectors: contentStack,
  registryData: {
    registryResVO: {
      registrySummaryVO: {},
      registryVO: {
        event: {},
        coRegistrant: {},
        primaryRegistrant: {
          contactAddress: {},
        },
        shipping: {
          shippingAddress: {},
          futureshippingAddress: {},
        },
      },
    },
  },
  profileData: { user: 'test', firstName: 'test1', lastName: 'test2' },
};

describe(__filename, () => {
  const collaborationGiftHelpContent = sinon.spy();
  const redirectTo = sinon.spy();
  it('should render component with collaboration gift banner', () => {
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        isMobile={false}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        redirectTo={redirectTo}
      />
    );
    expect(tree.find('.collaborationGiftBanner')).to.have.lengthOf(1);
  });

  it('should render component with collaboration gift banner for mobile', () => {
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        isMobile
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        redirectTo={redirectTo}
      />
    );
    expect(tree.find('.collaborationGiftBannerSSection')).to.have.lengthOf(1);
  });

  it('should render component with collaboration gift banner for baby', () => {
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        redirectTo={redirectTo}
        siteId="BuyBuyBaby"
      />
    );
    expect(tree.find('.collaborationGiftBannerReccImageBaby')).to.have.lengthOf(
      1
    );
  });

  it('should render recommend gifts click in mobile', () => {
    const onClickSpy = sinon.spy();
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        redirectTo={redirectTo}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        isMobile
      />
    );
    tree
      .find('HyperLink')
      .at(0)
      .simulate('click');
    expect(onClickSpy.calledOnce);
  });

  it('should render recommend gifts click in mobile for hyperlink', () => {
    const onClickSpy = sinon.spy();
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        redirectTo={redirectTo}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        isMobile
      />
    );
    tree
      .find('HyperLink')
      .at(1)
      .simulate('click');
    expect(onClickSpy.calledOnce);
  });

  it('should render recommend gifts click in web', () => {
    const onClickSpy = sinon.spy();
    const tree = shallow(
      <CollaborationGiftBanner
        isMobile={false}
        {...props}
        redirectTo={redirectTo}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
      />
    );
    tree
      .find('HyperLink')
      .at(0)
      .simulate('click');
    expect(onClickSpy.called);
  });

  it('should render recommend gifts click in web for hyperlink', () => {
    const onClickSpy = sinon.spy();
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        redirectTo={redirectTo}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        isMobile={false}
      />
    );
    tree
      .find('HyperLink')
      .at(1)
      .simulate('click');
    expect(onClickSpy.called);
  });

  it('should render recommend gifts help content click', () => {
    const tree = shallow(
      <CollaborationGiftBanner
        {...props}
        collaborationGiftHelpContent={collaborationGiftHelpContent}
        redirectTo={redirectTo}
      />
    );
    tree
      .find('HyperLink')
      .at(0)
      .simulate('click');
    expect(collaborationGiftHelpContent.called);
  });
});
