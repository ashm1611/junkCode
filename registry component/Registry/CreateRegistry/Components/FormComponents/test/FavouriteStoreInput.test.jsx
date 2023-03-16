import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import FavouriteStoreInput from '../FavouriteStoreInput';

configure({ adapter: new Adapter() });

const props = {
  onSearchStore: sinon.stub(),
  isStoreFetching: true,
  storeError: '',
  showFavStoreInputErr: false,
  dataLocator: {
    registryEnterZipCodeTextField: 'registryEnterZipCodeTextField',
    registryZipCodeSearchButton: 'registryZipCodeSearchButton',
  },
};
const wrapper = shallow(<FavouriteStoreInput {...props} />);
const wrapperInstance = wrapper.instance();
describe(__filename, () => {
  it('should render correctly', () => {
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});

describe('FavouriteStoreInput events', () => {
  it('should set error', () => {
    wrapperInstance.handleStoreSearch({ preventDefault: () => {} });
    /* eslint no-unused-expressions: 0 */
    expect(wrapperInstance.state.favStoreSearchError).to.not.be.same;
  });
  it('should call onSearchStore', () => {
    wrapperInstance.setState({
      favStoreSearch: 'abc',
    });
    wrapperInstance.handleStoreSearch({ preventDefault: () => {} });
    /* eslint no-unused-expressions: 0 */
    expect(props.onSearchStore).to.have.been.called;
  });
  it('should call updateComponentState', () => {
    wrapperInstance.updateComponentState({ favStoreSearch: 'abc' });
    /* eslint no-unused-expressions: 0 */
    expect(wrapperInstance.state.favStoreSearch).to.not.be.same;
  });
  it('should call componentWillReceiveProps', () => {
    const PROPS = {
      isStoreFetching: false,
      showFavStoreInputErr: 'error',
      storeError: ['error'],
      labels: {
        storeAPIError: 'avc',
      },
    };
    wrapperInstance.componentWillReceiveProps(PROPS);
    expect(wrapperInstance.state.favStoreSearchError).to.not.be.same;
  });
  it('should call componentWillReceiveProps else', () => {
    const PROPS = {
      isStoreFetching: false,
      showFavStoreInputErr: 'error',
      storeError: ['error'],
      labels: {},
    };
    wrapperInstance.componentWillReceiveProps(PROPS);
    expect(wrapperInstance.state.favStoreSearchError).to.not.be.same;
  });
});
