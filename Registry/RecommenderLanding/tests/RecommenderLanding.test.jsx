import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import * as commonUtil from '@bbb-app/utils/common';
import { RecommenderLanding, mapDispatchToProps } from '../RecommenderLanding';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  it('Should render the <RecommenderLanding/> component and should match the snapshot', () => {
    const location = {
      search: {
        registryId: '12345',
      },
    };
    const labels = {
      referredContent: [
        {
          id: '12345',
          key: 'heroImage',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('Should render the <RecommenderLanding/> component and should match the snapshot enablecslable is true', () => {
    const labelsRef = {
      referredContent: [
        {
          id: '12345',
          key: 'heroImage',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labelsRef={labelsRef}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
        enableCSLabels
      />
    );
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should check for loggedin or not for rl', () => {
    const location = {
      search: {
        registryId: '12345',
        eventType: 'wedding',
        token: '12345',
      },
    };
    const labels = {
      referredContent: [
        {
          id: '12345',
          key: 'heroImage',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentDidMount();
    wrapper.setState({ btnPress: true });
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
  });
  it('should check for hidden else', () => {
    sinon.stub(commonUtil, 'isGuestUser').returns(true);
    const location = {
      search: {
        registryId: '12345',
        eventType: 'wedding',
        token: '12345',
      },
    };
    const labels = {
      referredContent: [
        {
          id: '12345',
        },
      ],
    };

    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentDidMount();
    wrapper.setState({ btnPress: true });
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
    commonUtil.isGuestUser.restore();
  });
  it('should check for hidden else for referred content', () => {
    const location = {
      search: {
        registryId: '12345',
        eventType: 'wedding',
        token: '12345',
      },
    };

    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentDidMount();
    wrapper.setState({ btnPress: true });
    /* eslint no-unused-expressions: 0 */
    expect(wrapper).to.not.be.blank;
  });
  it('should check for loggedin or not for rl if regustry id is not provided', () => {
    const location = {
      search: {
        eventType: 'wedding',
        token: '12345',
      },
    };
    const labels = {
      referredContent: [
        {
          id: '12345',
          key: 'heroImage',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        regTypes={sinon.spy()}
        mapToRecommender={sinon.spy()}
        getContent={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().handleClick();
    expect(wrapper.state('btnPress')).to.equal(true);
  });

  it('should setState in componentWillReceiveProps for btnDisable and invalidMessage', () => {
    const nextProps = {
      validateTokenResult: {
        atgResponse: 1,
      },
      tokenValidationError: 'error',
    };
    const labels = {
      referredContent: [
        {
          12345: '12345',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        mapToRecommender={sinon.spy()}
        regTypes={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    const btnDisable = wrapper.instance().state.btnDisable;
    const invalidMessage = wrapper.instance().state.invalidMessage;
    expect(btnDisable).to.equal(true);
    expect(invalidMessage).to.equal(false);
  });

  it('should setState in componentWillReceiveProps for btnDisable and invalidMessage', () => {
    const nextProps = {
      validateTokenResult: {
        atgResponse: 3,
      },
    };
    const labels = {
      referredContent: [
        {
          12345: '12345',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        mapToRecommender={sinon.spy()}
        regTypes={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    const btnDisable = wrapper.instance().state.btnDisable;
    const privateRegistryMessage = wrapper.instance().state
      .privateRegistryMessage;
    expect(btnDisable).to.equal(true);
    expect(privateRegistryMessage).to.equal(true);
  });

  it('should setState in componentWillReceiveProps atgResponse return private registry else', () => {
    const nextProps = {
      validateTokenResult: {
        atgResponse: 4,
      },
    };
    const labels = {
      referredContent: [
        {
          12345: '12345',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        mapToRecommender={sinon.spy()}
        regTypes={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.instance().componentWillReceiveProps(nextProps);
    const btnDisable = wrapper.instance().state.btnDisable;
    const privateRegistryMessage = wrapper.instance().state
      .privateRegistryMessage;
    expect(btnDisable).to.equal(true);
    expect(privateRegistryMessage).to.equal(false);
  });

  it('should check the isFetching state for recommender landing', () => {
    const labels = {
      referredContent: [
        {
          12345: '12345',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        mapToRecommender={sinon.spy()}
        regTypes={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.setProps({ isFetching: false });
    expect(wrapper.state('showLoaderForButton')).to.be.equal(false);
    // setting the default state
    wrapper.setState({ showLoaderForButton: true });
    wrapper.setProps({
      isFetching: true,
      validateTokenResult: { atgResponse: 1 },
    });
    expect(wrapper.state('showLoaderForButton')).to.be.equal(true);
  });
  it('should check the tokenValidationError', () => {
    const labels = {
      referredContent: [
        {
          12345: '12345',
        },
      ],
    };
    const wrapper = shallow(
      <RecommenderLanding
        location={location}
        labels={labels}
        mapToRecommender={sinon.spy()}
        regTypes={sinon.spy()}
        validateToken={sinon.spy()}
      />
    );
    wrapper.setProps({ tokenValidationError: true });
    expect(wrapper.state('btnDisable')).to.be.equal(true);
    expect(wrapper.state('genericError')).to.be.equal(true);
  });
  it('mapDispatchToProps should return a prop getContent which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    dispatchedProps.getContent('12345');
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop validateToken which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    const token = '8989';
    const registryId = '5689890';
    dispatchedProps.validateToken(token, registryId);
    expect(dispatch.called).to.equal(true);
  });
  it('mapDispatchToProps should return a prop mapToRecommender which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const dispatchedProps = mapDispatchToProps(dispatch);
    const data = {};
    dispatchedProps.mapToRecommender(data);
    expect(dispatch.called).to.equal(true);
  });
});
