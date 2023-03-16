import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Sinon from 'sinon';

import QuizComponent from '../QuizComponent';
configure({ adapter: new Adapter() });
describe(__filename, () => {
  const setQuizOpenStatus = Sinon.spy();
  const registryDetailsData = {
    registryResVO: {
      registrySummaryVO: { primaryRegistrantFirstName: 'test' },
    },
  };

  it('should match snapshot for quiz component', () => {
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        contentStackData={'{0} test'}
      />
    );
    wrapper.setState({
      openQuizStatus: true,
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should match snapshot for quiz component when ContentStackData is Null', () => {
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        contentStackData={''}
      />
    );
    wrapper.setState({
      openQuizStatus: true,
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should match snapshot for quiz component when isQuizFetching is true', () => {
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        isQuizFetching={'true'}
      />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should call setQuizOpenStatus when PrimaryLink is Clicked', () => {
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        contentStackData={'{0} test'}
        setQuizOpenStatus={setQuizOpenStatus}
        isMobile="true"
      />
    );
    wrapper.find('PrimaryLink').simulate('click');
    // eslint-disable-next-line no-unused-expressions
    expect(setQuizOpenStatus).to.be.called;
  });
  it('should call handleStartQuiz when button is clicked', () => {
    const handleStartQuiz = Sinon.spy();
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        contentStackData={'{0} test'}
        handleStartQuiz={handleStartQuiz}
        isQuizCompleted={false}
      />
    );
    wrapper.find('Button').simulate('click');
    // eslint-disable-next-line no-unused-expressions
    expect(handleStartQuiz).to.be.called;
  });

  it('should  redirectTo  Recommendation when button is clicked', () => {
    const redirectTo = Sinon.spy();
    const wrapper = shallow(
      <QuizComponent
        registryDetailsData={registryDetailsData}
        contentStackData={'{0} test'}
        setQuizOpenStatus={setQuizOpenStatus}
        isQuizCompleted
        activeRegistry={{
          eventType: 'Baby',
          registryId: '1234',
        }}
        selectedCDP={['Active', 'Active', 'Active', 'Active', 'Active']}
        personaType={'Practical Parent'}
        redirectTo={redirectTo}
      />
    );
    wrapper.find('Button').simulate('click');
    // eslint-disable-next-line no-unused-expressions
    expect(redirectTo).to.be.called;
  });
});
