import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import {
  ChooseOptionWrapper,
  mapDispatchToProps,
} from '../ChooseOptionWrapper';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ChooseOptionWrapper fromQuickAdd isQuickViewOpen />
    );
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should call dispatch "onQuickViewButtonClick"', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.onQuickViewButtonClick();
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch).to.have.been.called;
  });
});
