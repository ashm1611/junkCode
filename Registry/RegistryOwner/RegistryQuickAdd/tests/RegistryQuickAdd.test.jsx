import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import { RegistryQuickAdd, mapDispatchToProps } from '../RegistryQuickAdd';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    quickAddItems: null,
    contextPath: '',
    isFetching: false,
    labels: {},
    maxTileCount: 4,
    regType: 'BRD',
    quickAddItemsForRegType: 'BRD',
    fetchQuickAddItems: sinon.spy(),
    quickAddId: 'RM1001',
  };

  it('should render correctly', () => {
    const tree = shallow(<RegistryQuickAdd {...props} />);

    expect(props.fetchQuickAddItems.called).to.equal(true);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call fetchQuickAddItems if regType not same', () => {
    const tree = shallow(
      <RegistryQuickAdd {...props} quickAddItemsForRegType={'BA1'} />
    );

    expect(props.fetchQuickAddItems.called).to.equal(true);
    expect(tree).to.not.equal(null);
  });

  it('should call else of componentDidMount', () => {
    const tree = shallow(
      <RegistryQuickAdd
        {...props}
        quickAddItemsForRegType="BRD"
        regType="BRD"
        quickAddItems={{}}
      />
    );

    expect(tree).to.not.equal(null);
  });

  it('should call dispatch setInititalState', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.fetchQuickAddItems();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
});
