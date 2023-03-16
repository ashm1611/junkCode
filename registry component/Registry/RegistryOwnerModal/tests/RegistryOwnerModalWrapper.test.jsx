import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import {
  RegistryOwnerModalWrapper,
  mapDispatchToProps,
} from '../RegistryOwnerModalWrapper';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with registryNotFound true', () => {
    const tree = shallow(
      <RegistryOwnerModalWrapper
        isRegistryDetailModalOpen
        openRegistrantDetailModal={() => {}}
        qvModalRegistry={() => {}}
        qvModalContentRegistry={() => {}}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call dispatch "onResetAllFilters', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.openRegistrantDetailModal();
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch).to.have.been.called;
  });
});
