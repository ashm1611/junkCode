import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import InputRadio from '@bbb-app/core-ui/input-radio';
import RecommendEmailFrequency from '../RecommendEmailFrequency';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const getContent = sinon.spy();
  const contentId = '5151';
  it('should render correctly with default props', () => {
    const registryData = {
      registryResVO: { registrySummaryVO: { registryId: '2342' } },
    };
    const emailOptIn = 1;
    const labels = { registryDetails: 'ab' };
    const contentState = {
      content: {
        '5151': [
          {
            abc: 'test',
          },
        ],
      },
    };
    const tree = shallow(
      <RecommendEmailFrequency
        labels={labels}
        registryData={registryData}
        recommendationList={{ emailOptIn }}
        contentState={contentState}
        getContent={getContent}
        contentId={contentId}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('#Componentdidmount', () => {
    const registryData = {
      registryResVO: { registrySummaryVO: { registryId: '2342' } },
    };

    const emailOptIn = 1;
    const labels = { registryDetails: 'ab' };
    const tree = shallow(
      <RecommendEmailFrequency
        labels={labels}
        registryData={registryData}
        recommendationList={{ emailOptIn }}
        getContent={getContent}
        contentId={contentId}
        contentState={{ content: {} }}
      />
    );

    tree.instance().componentDidMount();
    expect(tree).to.not.equal(null);
  });
});

describe('when getEmailFrequency is invoked', () => {
  it('should set registry ID and emailOptionValue', () => {
    const getEmailFrequency = sinon.spy();
    const registryData = {
      registryResVO: { registrySummaryVO: { registryId: '2342' } },
    };
    const emailOptIn = 1;
    const labels = { registryDetails: 'ab' };
    const wrapper = shallow(
      <RecommendEmailFrequency
        labels={labels}
        states={[]}
        getEmailFrequency={getEmailFrequency}
        registryData={registryData}
        recommendationList={{ emailOptIn }}
        contentState={{ content: {} }}
      />
    );

    const tree = wrapper.instance();
    tree.frequencySave();

    expect(getEmailFrequency.called);
  });
});

describe('when emailOptionValue is invoked', () => {
  it('should set emailOptionValue from InputRadio', () => {
    const emailOptIn = 1;
    const wrapper = shallow(
      <RecommendEmailFrequency
        labels={{}}
        states={[]}
        recommendationList={{ emailOptIn }}
        emailOptionValue="1"
        contentState={{ content: {} }}
      />
    );
    wrapper
      .find(InputRadio)
      .first()
      .simulate('change', {
        target: { name: 'frequencyOption', value: '0' },
      });
    expect(wrapper)
      .to.have.state('emailOptionValue')
      .equal('0');
  });
});
