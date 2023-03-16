import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import TYMSurpriseView from '../TYMSurpriseView';
configure({ adapter: new Adapter() });
describe(__filename, () => {
  const labels = {
    ThankYouListLbl: 'Thank You List',
    RevealListLbl: 'Reveal List',
  };
  const revealThankYouList = sinon.stub();
  const registryId = '12243343';
  const headingId = '9942';
  const subHeadingId = '9943';

  const thankYouListSurpriseData = {
    content: {
      '9942': {
        body: 'dfdkbffnfjdbdbf',
      },
      '9943': {
        body: 'dfdkbffrereeerenfjdbdbf',
      },
      '1234': {
        body: '',
      },
    },
  };

  const isMobile = {
    isMobileScreen: false,
  };

  it('should render correctly', () => {
    const tree = shallow(
      <TYMSurpriseView
        revealThankYouList={revealThankYouList}
        labels={labels}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        headingId={headingId}
        subHeadingId={subHeadingId}
        isMobile={isMobile}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for new gift tracker', () => {
    const tree = shallow(
      <TYMSurpriseView
        revealThankYouList={revealThankYouList}
        labels={labels}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        headingId={headingId}
        subHeadingId={subHeadingId}
        isMobile={isMobile}
        isNewDashboard
        registryData={{
          registryResVO: { registrySummaryVO: { eventType: 'Wedding' } },
        }}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should click handle reveal thank you list button', () => {
    const wrapper = mount(
      <TYMSurpriseView
        revealThankYouList={revealThankYouList}
        labels={labels}
        thankYouListSurpriseData={thankYouListSurpriseData}
        registryId={registryId}
        headingId={'1234'}
        subHeadingId={'1234'}
        isMobile={isMobile}
      />
    );
    const handleRevealClickSpy = sinon.spy(
      wrapper.instance(),
      'handleRevealClick'
    );

    wrapper.find('button.revealListBtn').simulate('click');
    expect(handleRevealClickSpy.called);
  });
});
