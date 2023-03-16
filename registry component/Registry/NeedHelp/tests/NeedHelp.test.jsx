import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import * as util from '@bbb-app/utils/common';
import NeedHelp from '../NeedHelp';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    getHelp: {
      cta: [
        { url: '#', displayName: 'Live Chat' },
        { url: '#', displayName: 'Book Appointment' },
      ],
      ctaType: '',
      description: '<p>Our customer service is available 24/7.</p>',
      displayName: "Have Questions or just wanna chat baby?  Let's talk!",
      phoneNumber: '1-800-462-3966',
    },
    isMobile: true,
    labels: {},
    isSocialRecommendationContent: false,
  };

  it('should render correctly when isMobile is true', () => {
    const tree = shallow(<NeedHelp {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when isMobile is false', () => {
    const tree = shallow(<NeedHelp {...props} isMobile={false} />);
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when isMobile true and liveChat true', () => {
    const tree = shallow(<NeedHelp {...props} liveChat />);
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when isMobile true and bookAppointment true', () => {
    sinon.stub(util, 'triggerOpenAppModalEvent').callsFake(() => {});
    const tree = shallow(<NeedHelp {...props} bookAppointment />);
    expect(tree).to.not.equal(null);
    tree.find('Button').simulate('click', { preventDefault: () => {} });
    util.triggerOpenAppModalEvent.restore();
  });

  it('should render correctly when isMobile false and liveChat true', () => {
    const tree = shallow(
      <NeedHelp labels={{}} getHelp={{}} isMobile={false} liveChat />
    );
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when isMobile false and bookAppointment true', () => {
    sinon.stub(util, 'triggerOpenAppModalEvent').callsFake(() => {});
    const fireTealiumAction = sinon.stub();
    const tree = shallow(
      <NeedHelp
        isMobile={false}
        bookAppointment
        fireTealiumAction={fireTealiumAction}
        getHelp={{}}
        labels={{}}
      />
    );
    expect(tree).to.not.equal(null);
    tree.find('Button').simulate('click', { preventDefault: () => {} });
    util.triggerOpenAppModalEvent.restore();
  });
  it('should render correctly when isSocialRecommendationContent is true', () => {
    const tree = shallow(<NeedHelp {...props} isSocialRecommendationContent />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly when isSocialRecommendationContent true and bookAppointment true', () => {
    sinon.stub(util, 'triggerOpenAppModalEvent').callsFake(() => {});
    const fireTealiumAction = sinon.stub();
    const tree = shallow(
      <NeedHelp
        isMobile={false}
        bookAppointment
        fireTealiumAction={fireTealiumAction}
        getHelp={{}}
        labels={{}}
        isSocialRecommendationContent
      />
    );
    expect(tree).to.not.equal(null);
    tree.find('Button').simulate('click', { preventDefault: () => {} });
    util.triggerOpenAppModalEvent.restore();
  });
});
