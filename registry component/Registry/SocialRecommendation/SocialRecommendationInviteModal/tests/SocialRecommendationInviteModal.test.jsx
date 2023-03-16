import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import * as isTbs from '@bbb-app/utils/isTbs';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import Button from '@bbb-app/core-ui/button';
import SocialRecommendationInviteModal from '../SocialRecommendationInviteModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    inviteFriendModalTitle: 'Invite Friends & Family to Recommend Items',
    recommenderLandingPageURL:
      '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
    inviteFriendErrorMsg: 'Something went wrong. Please try again later',
    inviteFriendEmailSentResponse:
      'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
    registryDetails: {},
    referredContent: [
      {
        key: 'socialRecommendationRegistryBanner',
        id: '1234',
      },
      {
        key: 'inviteFriendModalMessageContent',
        id: '5678',
      },
    ],
  };
  const registryData = {
    registryResVO: {
      registrySummaryVO: {
        eventType: 'BRD',
        primaryRegistrantFirstName: 'John',
        primaryRegistrantLastName: 'Doe',
        registryId: '123456789',
        eventDate: '03/03/2050',
      },
    },
  };
  let props = {
    labels,
    registryData,
    renderInviteButton: true,
    ctaObject: {},
    bannerid: 'socialRecommendationRegistryBanner',
    referredContent: {
      content: {
        1234: 'this is demo content',
      },
    },
    eventYetToCome: true,
    privateRegistry: '1',
    contentState: {
      content: {
        1234: 'this is demo content',
      },
    },
    switchConfig: { enableRegistryCollaboration: true },
    contentStackSelectors: [
      {
        modules: [
          {},
          {},
          {},
          {
            story_title: {
              background_color: 'abc',
              description: 'xyz',
              image_properties: {
                field_image: 'asd',
                field_image_alt_text: 'abc',
              },
            },
          },
        ],
      },
    ],
  };

  const getTree = prop =>
    shallow(<SocialRecommendationInviteModal {...prop} />);
  let tree;
  before(() => {
    tree = getTree(props);
  });
  it('should render SocialRecommendationInviteModal component correctly', () => {
    tree.setProps({ switchConfig: { enableRegistryCollaboration: false } });
    tree.setState({ emailSentResponse: true, isSuccess: true });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should not render InviteModal if eventYetToCome is false', () => {
    tree.setProps({ eventYetToCome: false });
    tree.setState({ isSuccess: false });

    tree
      .find(Button)
      .at(0)
      .simulate('click');
    expect(tree.find(ModalDialog).prop('mountedState')).to.equal(false);
  });
  it('should render renderFNFInviteModal correctly', () => {
    const contentStack = props.contentStackSelectors[0].modules[3].story_title;
    tree.instance().renderFNFInviteModal(contentStack);
    expect(tree.find('.recommendationContainer')).to.have.lengthOf(1);
  });
  it('should call getReferredContentBody correctly', () => {
    props = {
      ...props,
      referredContent: null,
      labels: {
        ...props.labels,
        referredContent: [],
      },
    };
    tree = getTree(props);
    const result = tree
      .instance()
      .getReferredContentBody('socialRecommendationRegistryBanner');
    expect(result).to.equal(null);
  });
  it('should call getContentID correctly', () => {
    const result = tree
      .instance()
      .getContentID(labels, 'inviteFriendModalMessageContent');
    expect(result).to.equal('5678');
  });
  it('should call revealInviteModal correctly', () => {
    const e = {
      preventDefault: sinon.stub(),
    };
    tree.instance().revealInviteModal(e);
    expect(tree.instance().state.isInviteModalMounted).to.equal(true);
    expect(tree.instance().state.emailSentResponse).to.equal(null);
    expect(tree.instance().state.isSubmitInProgress).to.equal(false);
  });
  it('should call closeInviteModal correctly', () => {
    tree.instance().closeInviteModal();
    expect(tree.instance().state.isInviteModalMounted).to.equal(false);
    expect(tree.instance().state.emailSentResponse).to.equal(null);
    expect(tree.instance().state.isSubmitInProgress).to.equal(false);
  });
  it('should call emailSubmitForm correctly when api successfully call', () => {
    sinon.stub(isTbs, 'default').returns(true);
    const formData = {
      recipientEmail: 'asd@wer.com,test@user.edu',
      message: 'Hello',
    };
    const apiResponse = {
      body: {
        serviceStatus: 'Success',
        data: {
          result: {},
        },
      },
    };

    const promise = Promise.resolve(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    tree.instance().emailSubmitForm(formData);
    isTbs.default.restore();

    return promise.then(response => {
      triggerServerRequestStub.restore();
      expect(response.body.serviceStatus).to.equal('Success');
      expect(tree.instance().state.isSuccess).to.equal(true);
    });
  });
  it('should call emailSubmitFormSuccess correctly if data has no result', () => {
    const data = {
      body: {
        data: {},
      },
    };
    tree.instance().emailSubmitFormSuccess(data);
    expect(tree.instance().state.isSuccess).to.equal(false);
    expect(tree.instance().state.emailSentResponse).to.equal(
      labels.inviteFriendErrorMsg
    );
    expect(tree.instance().state.isSubmitInProgress).to.equal(false);
  });
  it('should call emailSubmitForm correctly', () => {
    props = {
      ...props,
      registryData: {
        registryResVO: {
          registrySummaryVO: {},
        },
      },
    };
    tree = getTree(props);
    const formData = {};
    const apiResponse = {
      body: { serviceStatus: 'ERROR' },
    };
    const promise = Promise.reject(apiResponse);
    const triggerServerRequestStub = sinon
      .stub(ServiceUtil, 'triggerServerRequest')
      .callsFake(() => promise);
    tree.instance().emailSubmitForm(formData);
    expect(tree.instance().state.isSubmitInProgress).to.equal(true);
    return promise.catch(error => {
      triggerServerRequestStub.restore();
      expect(error.body.serviceStatus).to.equal('ERROR');
      expect(tree.instance().state.isSuccess).to.equal(false);
    });
  });
});
