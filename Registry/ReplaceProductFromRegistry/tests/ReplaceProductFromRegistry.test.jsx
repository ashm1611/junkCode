import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  ReplaceProductFromRegistryContainer,
  mapDispatchToProps,
} from '../ReplaceProductFromRegistry';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render ReplaceProductFromRegistryContainer correctly', () => {
    const replaceProductFromRegistry = sinon.spy();
    const props = {
      closeModalState: false,
      endPoints: {},
      isRemainingItemFetching: false,
      replaceProductFromRegistry,
    };

    const tree = shallow(<ReplaceProductFromRegistryContainer {...props} />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should dispatch replaceProductFromRegistry', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.replaceProductFromRegistry();
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });

  it('should dispatch onQuickViewButtonClick', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.onQuickViewButtonClick();
    expect(dispatch).to.have.been.called;
  });
});
