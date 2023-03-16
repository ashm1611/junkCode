import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import isUserLoggedIn from '@bbb-app/utils/isUserLoggedIn';
import * as commonUtil from '@bbb-app/utils/common';
import ShareRegistry from '../ShareRegistry';
import SocialShareLayout from '../../../../../common/SocialShareLayout';
import {
  FACEBOOK,
  TWITTER,
  PINTEREST,
  GOOGLEPLUS,
  MAIL,
} from '../../../../../../constants/socialShare';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  let props;
  let isUserLoggedInStub;
  beforeEach(() => {
    props = {
      labels: {
        registryDetails: {
          fromEmailLabel: 'Your Email',
          messageLabel: 'message',
          emailCheckBoxLabel: 'checkbox lbl',
          cancelButtonLabel: 'cancel lbl',
          formLabel: 'form lbl',
          savedItemsHeadingLabel: 'savedItemsHeadingLabel',
          toEmailLabel: 'toEmailLabel',
          submitButtonLabel: 'submitButtonLabel',
          emailCheckboxLabel: 'submitButtonLabel',
          emailSubject: '',
          emailTitle: '',
        },
      },
      registryData: {
        registryResVO: {
          registryVO: {
            isPublic: 1,
          },
        },
      },
      thankYouListSurpriseData: {
        content: {
          '9942': {
            body: 'dfdkbffnfjdbdbf',
          },
          '9943': {
            body: 'dfdkbffrereeerenfjdbdbf',
          },
        },
      },
      isMobile: false,
      isPreviewYrReg: true,
      enableRegistryCollaboration: true,
      handleTealiumEvent: sinon.spy(),
      isNewRegDashboard: true,
    };
    isUserLoggedInStub = sinon.stub(isUserLoggedIn, 'default').returns(true);
  });

  afterEach(() => {
    isUserLoggedInStub.restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const handleModalVisiblity = sinon.stub();
    const tree = shallow(<ShareRegistry {...props} />);
    window.history.pushState({}, '', '/test?action=share');
    const spy = sinon.spy(ShareRegistry.prototype, 'componentWillReceiveProps');
    tree.instance().componentWillReceiveProps(spy);
    tree.instance().handleModalVisiblity();
    expect(handleModalVisiblity.called);
    commonUtil.getSiteId.restore();
  });

  it('should call componentWillReceiveProps when handleModalVisiblity is called', () => {
    const handleModalVisiblity = sinon.stub();
    const tree = shallow(<ShareRegistry {...props} />);
    tree.setState({ shareModalVisiblity: true });
    tree.instance().componentWillReceiveProps();
    // eslint-disable-next-line no-unused-expressions
    expect(handleModalVisiblity).not.to.be.called;
  });

  it('should render thank you manager Modal', () => {
    const wrapper = shallow(
      <ShareRegistry
        labels={props.labels.registryDetails}
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        showLink
      />
    );

    expect(wrapper.find(ModalDialog).length).to.equal(1);
  });

  it('should render #shareLinkButton when showLink is true', () => {
    const wrapper = shallow(
      <ShareRegistry
        labels={props.labels.registryDetails}
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        showLink
        isNewRegDashboard={'true'}
      />
    );

    expect(wrapper.find('#shareLinkButton').length).to.equal(1);
  });
  it('should render renderShareRegistryText when showLink and isNewRegDashboard is true', () => {
    const track = sinon.stub();
    const renderShareRegistryText = sinon.spy();
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        showLink
        track={track}
        isNewRegDashboard={'true'}
        renderShareRegistryText={renderShareRegistryText}
        {...props}
      />
    );
    expect(wrapper.find('span').hasClass('menuOpt')).to.equal(true);
  });

  it('should not render #shareLinkButton when showLink is false', () => {
    const wrapper = shallow(
      <ShareRegistry
        labels={props.labels.registryDetails}
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        showLink={false}
        isMobile={props.isMobile}
      />
    );

    expect(wrapper.find('#shareLinkButton').length).to.equal(0);
  });

  it('should call handleModalVisiblity on click of Share Registry CTA', () => {
    const track = sinon.spy();
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        shareBtnTheme={'deactivated'}
        track={track}
        {...props}
      />
    );
    const wrapperInstance = wrapper.instance();
    const spyHandleModalVisiblity = sinon.spy(
      wrapperInstance,
      'handleModalVisiblity'
    );

    wrapper.find('#showShareModal').simulate('click', { preventDefault() {} });
    expect(spyHandleModalVisiblity.called).to.equal(true);
  });

  it('should call handleModalVisiblity on click of Share Registry link', () => {
    const track = sinon.stub();
    const renderShareRegistryText = sinon.spy();
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        showLink
        track={track}
        {...props}
      />
    );
    wrapper.find('#shareLinkButton').simulate('click', { preventDefault() {} });
    expect(renderShareRegistryText.called);
  });

  it('should call handleURLCopy on click of Copy Registry URL CTA', () => {
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    const wrapperInstance = wrapper.instance();
    // stubbing this as we didn't want invoke clipboard writeText method.
    const stubHandleURLCopy = sinon.stub(wrapperInstance, 'handleURLCopy');

    wrapper.find('#copyRegistryURL').simulate('click');
    wrapper
      .find('#registryURL')
      .first()
      .simulate('click', { target: { select: sinon.spy() } });
    wrapper
      .find('#registryURL')
      .first()
      .simulate('change', {});
    expect(stubHandleURLCopy.called).to.equal(true);
  });

  it('should toggleShareModalState', () => {
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    wrapper.setState({
      shareModalVisiblity: false,
    });
    wrapper.instance().toggleShareModalState(true);
    expect(wrapper.state('shareModalVisiblity')).to.equal(true);
  });

  it('should toggleShareModalState when false', () => {
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
        shareBtnTheme={'primary'}
      />
    );
    wrapper.setState({
      shareModalVisiblity: false,
    });
    wrapper.instance().toggleShareModalState(false);
    expect(wrapper.state('shareModalVisiblity')).to.equal(false);
  });

  it('should render 5 PrimaryLinks when MAIL option is included', () => {
    const services = [FACEBOOK, TWITTER, PINTEREST, GOOGLEPLUS, MAIL];
    const tree = shallow(<SocialShareLayout services={services} />);
    expect(tree.find(PrimaryLink)).to.have.length(5);
  });

  it('should render 4 PrimaryLinks when MAIL option is not included', () => {
    const services = [FACEBOOK, TWITTER, PINTEREST, GOOGLEPLUS];
    const tree = shallow(<SocialShareLayout services={services} />);
    expect(tree.find(PrimaryLink)).to.have.length(4);
  });

  it('should should contain a share modal heading', () => {
    const tree = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    expect(tree.find('#shareModallHeading')).to.have.length(1);
  });

  it('should call contain CTA', () => {
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    expect(wrapper.find('#copyRegistryURL')).to.have.length(1);
  });

  it('should render a prompt if registry is not set public if isNewRegDashboard is true', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 0,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
        isNewRegDashboard={'true'}
      />
    );
    expect(tree.find('.promptMessage')).to.have.length(1);
  });
  it('should render a prompt if registry is not set public if ', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 0,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    expect(tree.find('.promptMessage')).to.have.length(1);
  });

  it('should render a prompt if registry is not set public else', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 0,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    expect(tree.find('.promptMessage')).to.have.length(1);
    commonUtil.getSiteId.restore();
  });
  it('should not render a prompt if registry is set public', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    expect(tree.find('.promptMessage')).to.have.length(0);
  });
  it('should call clearSubmitResponse', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    tree.instance().clearSubmitResponse();
    expect(tree.state('isSuccess')).to.equal(null);
  });
  it('should call handleCheckBox', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    tree.setState({ checkBoxChecked: true });
    tree.instance().handleCheckBox();
    expect(tree.state('checkBoxChecked')).to.equal(false);
  });

  it('should call emailSubmitFormSuccess false', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const data = {
      savedEmailResponse: {
        data: {
          result: true,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
        {...props}
      />
    );
    tree.instance().emailSubmitFormError(data);
    expect(tree.state('isSuccess')).to.equal(false);
  });

  it('should call emailSubmitFormError', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const error = {
      body: {
        errorEmailResponse: {},
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
      />
    );
    tree.instance().emailSubmitFormError(error);
    expect(tree.state('isSuccess')).to.equal(false);
  });

  it('should call emailSubmitForm', () => {
    const registryData = {
      registryResVO: {
        registrySummaryVO: {
          eventType: 'abc',
          registryName: 'xyz',
          eventDate: 'date',
          primaryRegistrantFirstName: 'test',
          primaryRegistrantLastName: 'test',
          coRegistrantFirstName: 'test',
          coRegistrantLastName: 'test',
          daysToGo: 1,
          registryId: 123456,
        },
      },
    };
    const labels = {
      registryDetails: {
        emailSubject: 'test',
        emailTitle: 'test',
      },
    };
    const formData = {
      senderEmail: 'a@a.com',
      recipientEmail: 'b@b.com',
      message: 'Hello',
    };
    sinon.stub(ServiceUtil, 'triggerServerRequest').resolves(true);
    const tree = shallow(
      <ShareRegistry registryData={registryData} labels={labels} />
    );
    tree.instance().emailSubmitForm(formData);
    ServiceUtil.triggerServerRequest.restore();
  });

  it('should call emailRegistryTealium', () => {
    const emailRegistryTealium = sinon.stub();
    const tealiumTags = {
      registry_id: registryId,
      registry_type: registryType,
      pagename_breadcrumb: 'Registry View Page',
    };
    const registryType = 'wedding';
    const registryId = '123456';
    const tree = shallow(<ShareRegistry tealiumTags={tealiumTags} />);
    tree.setState({ shareModalVisiblity: false });
    // eslint-disable-next-line no-unused-expressions
    expect(emailRegistryTealium).not.to.be.called;
  });

  it('should call tealiumTagsOnClickOfRegEmail', () => {
    const tealiumTags = {
      registry_id: registryId,
      registry_type: registryType,
      pagename_breadcrumb: 'Registry View Page',
    };
    const handleTealiumEvent = sinon.spy();
    const registryType = 'wedding';
    const registryId = '123456';
    const tree = shallow(
      <ShareRegistry
        tealiumTags={tealiumTags}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    const registrySummaryVO = {
      eventType: 'abc',
      registryName: 'xyz',
      eventDate: 'date',
      primaryRegistrantFirstName: 'test',
      primaryRegistrantLastName: 'test',
      coRegistrantFirstName: 'test',
      coRegistrantLastName: 'test',
      daysToGo: 1,
      registryId: 123456,
    };
    tree.instance().tealiumTagsOnClickOfRegEmail(registrySummaryVO);
    expect(tree.instance().props.handleTealiumEvent.called).to.be.equal(true);
  });

  it('should call closeShareModal ', () => {
    const track = sinon.spy();
    const tree = shallow(<ShareRegistry {...props} track={track} />);
    tree.instance().closeShareModal();
    tree.setState({ shareModalVisiblity: false });
    tree
      .find({ id: 'closeShareModal' })
      .props()
      .onClick();
    // eslint-disable-next-line no-unused-expressions
    expect(track.called).to.be.true;
  });

  it('should call closeShareModal when tealium event is false', () => {
    const tree = shallow(<ShareRegistry {...props} />);
    tree.instance().closeShareModal();
    tree.setState({ shareModalVisiblity: false });
    expect(tree.state('shareModalVisiblity')).to.equal(false);
  });

  it('should call closeNotification  ', () => {
    const tree = shallow(<ShareRegistry {...props} />);
    tree.instance().closeNotification();
    tree.setState({ showNotification: false });
    expect(tree.state('showNotification')).to.equal(false);
  });

  it('should call hideShareRegistryModal  ', () => {
    const tree = shallow(<ShareRegistry {...props} />);
    tree.instance().hideShareRegistryModal();
    tree.setState({ shareContentVisiblity: false });
    expect(tree.state('shareContentVisiblity')).to.equal(false);
  });

  it('should call handleURLCopy', () => {
    const tree = shallow(<ShareRegistry {...props} />);
    expect(tree.instance().handleURLCopy()).to.be.equal(undefined);
  });

  it('should call emailSubmitFormSuccess', () => {
    const data = {
      savedEmailResponse: {
        data: {
          result: true,
        },
      },
    };
    const tree = shallow(<ShareRegistry {...props} />);
    tree.instance().emailSubmitFormSuccess(data);
    expect(tree.state('isSuccess')).to.equal(false);
  });

  it('should call emailSubmitFormSuccess when isSuccess is true', () => {
    const registryData = {
      registryResVO: {
        registryVO: {
          isPublic: 1,
        },
      },
    };
    const data = {
      body: {
        data: {
          result: true,
        },
      },
    };
    const tree = shallow(
      <ShareRegistry
        registryData={registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isMobile={props.isMobile}
        {...props}
      />
    );
    tree.instance().emailSubmitFormSuccess(data);
    expect(tree.state('isSuccess')).to.equal(true);
  });

  it('should render new share Registry Icon for BBB', () => {
    const shareModalVisiblity = sinon.spy();
    const handleTealiumEvent = sinon.spy();
    const tree = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isNewRegDashboard={'true'}
        isBBBNewRegistryHeader
        showLink
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    expect(tree.find('.clickable').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('bbb-share');
    tree.find('.clickable').simulate('click');
    expect(shareModalVisiblity.called);
  });

  it('should render new shareRegistry Icon for Baby', () => {
    const shareModalVisiblity = sinon.spy();
    const handleTealiumEvent = sinon.spy();
    const tree = shallow(
      <ShareRegistry
        registryData={props.registryData}
        thankYouListSurpriseData={props.thankYouListSurpriseData}
        isNewRegDashboard={'true'}
        isBabyNewRegistryHeader
        showLink
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    expect(tree.find('.clickable').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('baby-share');
    tree.find('.clickable').simulate('click');
    expect(shareModalVisiblity.called);
  });

  it('should render share and collaboration list', () => {
    const wrapper = shallow(
      <ShareRegistry registryData={props.registryData} />
    );
    wrapper.setState({
      ellipsesFlyout: true,
    });
    expect(wrapper.find(PrimaryLink)).to.have.length(2);
  });

  it('should render share and collaboration list links', () => {
    const handleTealiumEvent = sinon.spy();
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    wrapper.setState({
      ellipsesFlyout: true,
    });
    wrapper
      .find('PrimaryLink')
      .at(0)
      .simulate('click');
  });

  it('should render share and collaboration list links', () => {
    const handleTealiumEvent = sinon.spy();
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        handleTealiumEvent={handleTealiumEvent}
      />
    );
    wrapper.setState({
      ellipsesFlyout: true,
    });
    wrapper
      .find('PrimaryLink')
      .at(0)
      .simulate('click');
  });

  it('should render share and collaboration list links', () => {
    const wrapper = shallow(
      <ShareRegistry
        registryData={props.registryData}
        enableRegistryCollaboration={props.enableRegistryCollaboration}
        isBBBNewRegistryHeader
        showLink
      />
    );
    wrapper
      .find('div')
      .at(0)
      .simulate('click');
  });
});
