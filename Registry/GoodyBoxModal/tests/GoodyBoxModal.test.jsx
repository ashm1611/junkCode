import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import { GoodyBoxModal, mapDispatchToProps } from '../GoodyBoxModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;

  it('should render GoodyBoxModal Properly', () => {
    wrapper = shallow(<GoodyBoxModal />);
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render GoodyBoxModal Properly with other props', () => {
    wrapper = shallow(<GoodyBoxModal hideParentModal />);
    expect(wrapper).to.not.equal(null);
  });

  describe('#GoodyBoxModal.mapDispatchToProps', () => {
    const dispatch = sinon.stub();

    it('should call dispatch initiateInactivityModal', () => {
      const props = mapDispatchToProps(dispatch);
      props.initiateInactivityModal();
      /* eslint no-unused-expressions: 0 */
      expect(dispatch).to.have.been.called;
    });
  });
});
