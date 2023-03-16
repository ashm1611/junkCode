import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryFindRegistry from '../RegistryFindRegistry';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render defaults', () => {
    const data = {
      title: 'title',
      subtitle_text: 'subtitle_text',
      question_text: 'question_text',
      CTA: {
        primary_button: {
          url: 'url1',
          displayName: 'd',
        },
        secondary_button: {
          url: 'url2',
          displayName: 'name',
        },
      },
    };

    const labels = {
      contactPhoneNumber: 'Call us at 1-800-462-3966',
    };

    const wrapper = shallow(
      <RegistryFindRegistry data={data} labels={labels} />
    );
    expect(wrapper.state('isRegistryTypeOpen')).to.equal(false);
    wrapper.setState({
      isRegistryTypeOpen: true,
    });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render url', () => {
    const data = {
      title: 'title',
      subtitle_text: 'subtitle_text',
      question_text: 'question_text',
      CTA: {
        primary_button: {
          url: '/store/giftregistry/createRegistryForm',
          displayName: 'd',
        },
        secondary_button: {
          url: 'url2',
          displayName: 'name',
        },
      },
    };
    const labels = {
      contactPhoneNumber: 'Call us at 1-800-462-3966',
    };
    const tree = shallow(<RegistryFindRegistry data={data} labels={labels} />);
    expect(tree).to.not.equal(null);
  });
  it('should render null when data is empty', () => {
    const tree = shallow(<RegistryFindRegistry data={{}} />);
    expect(tree).to.not.equal(null);
  });
  it('should call toggleRegistryModalState', () => {
    const event = { preventDefault: () => {} };
    const tree = shallow(<RegistryFindRegistry />);
    tree.instance().toggleRegistryModalState(event);
  });
  it('should call toggleRegistryModal', () => {
    const value = true;
    const tree = shallow(<RegistryFindRegistry />);
    tree.instance().toggleRegistryModal(value);
  });
});
