import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import * as isTbs from '@bbb-app/utils/isTbs';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryCollaborationModal from '../RegistryCollaborationModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
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
            content_body: '<div>Hello</div>',
            field_title: '',
            single_line: '',
            title: 'How does it work - mobile',
          },
        },
        {
          support_page: {
            content_body: '<div>Hello</div>',
            field_title: '',
            single_line: '',
            title: 'How does it work - mobile',
          },
        },
      ],
    },
  ];
  const closeCollaborationModal = sinon.stub();
  const props = {
    isMobile: false,
    contentStackSelectors: contentStack,
    closeCollaborationModal,
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          primaryRegistrantFirstName: 'firstname',
          primaryRegistrantLastName: 'laststname',
          coRegistrantLastName: 'coownerlastname',
          registryId: '120096269',
          eventType: 'Wedding',
          eventDate: '06/01/2021',
        },
      },
    },
    fireTealiumAction: sinon.spy(),
    formWrapperData: {},
    label: {
      formLabel: null,
      messageLabel: 'Message',
      savedItemsHeadingLabel: 'Send an email invite',
      submitButtonLabel: 'Send Invite',
      toEmailLabel: 'Email addresses, comma separated',
      recommenderLandingPageURL:
        '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
      inviteFriendEmailSentResponse:
        'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
      inviteFriendErrorMsg: 'test',
    },
  };
  it('should render component with bedbath Registry Collaboration Modal', () => {
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    expect(tree.find('.collaborationContentWrapper')).to.have.lengthOf(1);
  });
  it('should render component with US Registry Collaboration Modal', () => {
    const propsUS = {
      siteId: 'BedBathUS',
      isMobile: false,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...propsUS} />);
    expect(tree.find('.regHelp')).to.have.lengthOf(1);
  });
  it('should render component with baby Registry Collaboration Modal', () => {
    const propsBaby = {
      siteId: 'BuyBuyBaby',
      isMobile: false,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...propsBaby} />);
    expect(tree.find('.regHelpBaby')).to.have.lengthOf(1);
  });
  it('should render component with canada Registry Collaboration Modal', () => {
    const propsCanada = {
      siteId: 'BedBathCanada',
      isMobile: false,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...propsCanada} />);
    tree.setState({
      isMailSent: true,
    });
    expect(tree.find('.regHelp')).to.have.lengthOf(1);
  });
  it('should render component with Registry Collaboration Modal in mobile', () => {
    const propsMob = {
      siteId: 'BedBathCanada',
      isMobile: true,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...propsMob} />);
    expect(tree.find('.regHelp')).to.have.lengthOf(1);
  });
  it('should render close button', () => {
    const data = {
      siteId: 'BedBathUS',
      isMobile: false,
      closeCollaborationModal,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...data} />);
    tree
      .find('Button')
      .at(0)
      .simulate('click');
    expect(closeCollaborationModal.called);
  });
  it('should render component with Registry Collaboration Modal in mobile', () => {
    const toggleModalState = sinon.stub();
    const propsMob = {
      siteId: 'BedBathUS',
      isMobile: true,
      contentStackSelectors: contentStack,
      closeCollaborationModal,
      toggleModalState,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...propsMob} />);
    tree
      .find(ModalDialog)
      .first()
      .props()
      .toggleModalState();
    expect(tree.find('.invite')).to.have.lengthOf(1);
  });

  it('should call helpModal', () => {
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    tree.setState({
      isHelpModal: true,
    });
    tree.instance().helpModal();
    expect(tree.instance().state.isHelpModal).to.be.equal(true);
  });
  it('should call returntoInvite', () => {
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    tree.setState({
      isHelpModal: false,
    });
    tree.instance().returntoInvite();
    expect(tree.instance().state.isHelpModal).to.be.equal(false);
  });
  it('should call how does it work Model correctly', () => {
    const newProps = { ...props, isMobile: true };
    const tree = shallow(<RegistryCollaborationModal {...newProps} />);
    tree.setState({
      isHelpModal: true,
    });
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call emailSubmitForm correctly when api successfully call', () => {
    const tree = shallow(<RegistryCollaborationModal {...props} />);
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
    });
  });
  it('should call emailSubmitFormSuccess correctly if data has no result', () => {
    const fireTealiumActionSpy = sinon.spy();
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    const data = {
      body: {
        data: {},
      },
    };
    tree.instance().emailSubmitFormSuccess(data);
    expect(fireTealiumActionSpy.called).to.equal(false);
  });
  it('should call emailSubmitFormSuccess false', () => {
    const data = {
      savedEmailResponse: {
        data: {
          result: true,
        },
      },
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...data} />);
    tree.instance().emailSubmitFormError(data);
    expect(tree.state('isSuccess')).to.equal(false);
  });

  it('should call emailSubmitFormError', () => {
    const error = {
      body: {
        errorEmailResponse: {},
      },
    };
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    tree.instance().emailSubmitFormError(error);
    expect(tree.state('isSuccess')).to.equal(false);
  });
  it('should render invite friends Modal', () => {
    const toggleModalState = sinon.stub();
    const data = {
      siteId: 'BedBathUS',
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(
      <RegistryCollaborationModal
        {...data}
        isMobile
        toggleModalState={toggleModalState}
        closeCollaborationModal={closeCollaborationModal}
      />
    );
    expect(tree.find(ModalDialog).length).to.equal(1);
    tree.find(ModalDialog).prop('toggleModalState')();
  });
  it('should render invite more button', () => {
    const inviteMore = sinon.spy();
    const data = {
      siteId: 'BedBathUS',
      isMobile: false,
      contentStackSelectors: contentStack,
      label: {
        formLabel: null,
        messageLabel: 'Message',
        savedItemsHeadingLabel: 'Send an email invite',
        submitButtonLabel: 'Send Invite',
        toEmailLabel: 'Email addresses, comma separated',
        recommenderLandingPageURL:
          '/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>',
        inviteFriendEmailSentResponse:
          'Your invitation has been sent and now you can begin receiving recommendations from your friends and family.',
        inviteFriendErrorMsg: 'test',
      },
    };
    const tree = shallow(
      <RegistryCollaborationModal
        {...data}
        closeCollaborationModal={closeCollaborationModal}
        inviteMore={inviteMore}
      />
    );
    tree
      .find('Button')
      .at(0)
      .simulate('click');
    tree.instance().inviteMore();
    expect(inviteMore.called);
  });
  it('should call close modal correctly', () => {
    const handleClose = sinon.spy();
    const tree = shallow(<RegistryCollaborationModal {...props} />);
    tree.instance().handleClose();
    expect(handleClose.called).to.equal(false);
  });
});
