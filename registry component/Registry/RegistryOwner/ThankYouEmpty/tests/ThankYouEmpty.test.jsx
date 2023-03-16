import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import ThankYouEmpty from '../ThankYouEmpty';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
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
        shareDialogHeading: 'shareDialogHeading',
      },
    },
    isNewDashboard: false,
    registryData: {
      registryResVO: {
        registryVO: {
          isPublic: 0,
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
    headingId: '9942',
    descriptionId: '9943',
    isMobile: {
      isMobileScreen: false,
    },
  };

  it('should  render ThankyouEmpty with isPublic is 0', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BuyBuyBaby');
    const tree = shallow(<ThankYouEmpty {...props} />);
    expect(tree.find('#thankYouHeading')).to.have.length(1);
    commonUtil.getSiteId.restore();
  });
  it('should  render ThankyouEmpty with isPublic is 1', () => {
    const prop = {
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
          shareDialogHeading: 'shareDialogHeading',
        },
      },
      registryData: {
        registryResVO: {
          registryVO: {
            isPublic: 1,
          },
        },
      },
      isMobile: {
        isMobileScreen: false,
      },
      isNewDashboard: false,
    };
    const tree = shallow(<ThankYouEmpty {...prop} />);
    expect(tree).to.have.length(1);
  });
  it('should render without registry Data Info', () => {
    const prop = {
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
          shareDialogHeading: 'shareDialogHeading',
        },
      },

      isMobile: {
        isMobileScreen: false,
      },
      isNewDashboard: false,
    };
    const tree = shallow(<ThankYouEmpty {...prop} />);
    expect(tree).to.have.length(1);
  });
  it('should  render Gift Tracker with isPublic is 0', () => {
    const prop = {
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
          shareDialogHeading: 'shareDialogHeading',
        },
      },
      registryData: {
        registryResVO: {
          registryVO: {
            isPublic: 0,
          },
        },
      },
      isMobile: {
        isMobileScreen: false,
      },
      isNewDashboard: true,
      eventType: 'Wedding',
    };
    const tree = shallow(<ThankYouEmpty {...prop} />);
    expect(tree.find('#giftTrackerHeading')).to.have.length(1);
  });
  it('should  render Gift Tracker with isPublic is 1', () => {
    const prop = {
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
          shareDialogHeading: 'shareDialogHeading',
        },
      },
      registryData: {
        registryResVO: {
          registryVO: {
            isPublic: 1,
          },
        },
      },
      isMobile: {
        isMobileScreen: false,
      },
      isNewDashboard: true,
      eventType: 'Wedding',
    };
    const tree = shallow(<ThankYouEmpty {...prop} />);
    expect(tree).to.have.length(1);
  });
});
