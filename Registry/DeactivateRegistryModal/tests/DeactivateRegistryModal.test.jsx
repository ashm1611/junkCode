import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import {
  DeactivateRegistryModal,
  mapDispatchToProps,
} from '../DeactivateRegistryModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    isFetching: false,
    error: null,
    registryData: {
      registryResVO: {
        registrySummaryVO: {
          registryId: '1111',
          registryType: {
            registryTypeName: 'BRD',
          },
        },
      },
    },
    customerId: '123',
    referredContent: {
      content: {
        '1234': {
          body: 'text',
        },
      },
    },
    registryListFetched: true,
    labels: {
      referredContent: [{ key: 'deactivateRegContentBRD', id: '1234' }],
    },
    modalMountedState: false,
    fetchContent: sinon.spy(),
    toggleModalState: sinon.spy(),
    deactivateReg: sinon.spy(),
    redirectTo: sinon.spy(),
    fetchRegistries: sinon.spy(),
    handleTealiumAction: sinon.spy(),
    getOwnAndRecommendedRegistryDetails: sinon.spy(),
    toggleModalDeactivateRegistry: sinon.spy(),
  };
  it('should render correctly', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} />);

    expect(props.fetchContent.called).to.equal(true);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render for else part', () => {
    const fetchContent = sinon.spy();
    const deactivateReg = sinon.spy();
    const referredContent = {
      content: {
        '1234': {
          body: 'text',
        },
      },
    };
    const tree = shallow(
      <DeactivateRegistryModal
        fetchContent={fetchContent}
        referredContent={referredContent}
        deactivateReg={deactivateReg}
      />
    );
    tree.instance().getReferredContentBody();
    tree.instance().doDeactivateReg();
    expect(tree.instance().props.handleTealiumAction).to.be.equal(undefined);
  });

  it('should call deactivateReg', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} />);

    tree.instance().doDeactivateReg();
    expect(props.deactivateReg.called).to.equal(true);
  });

  it('should call toggleModalState', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} />);

    tree.instance().toggleModalState(false);
    expect(props.toggleModalState.called).to.equal(true);
  });

  it('should call redirectTo if error in delete registry', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} isFetching />);
    const props1 = Object.assign({}, props);
    props1.isFetching = false;
    props1.error = 'some error';
    tree.instance().componentWillReceiveProps(props1);
    expect(props.redirectTo.called).to.equal(true);
  });

  it('should call fetchRegistries if no error in delete registry', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} isFetching />);
    const props1 = Object.assign({}, props);
    props1.isFetching = false;
    tree.instance().componentWillReceiveProps(props1);
    expect(props.fetchRegistries.called).to.equal(true);
  });

  it('should call redirectTo if registryListFetched', () => {
    const tree = shallow(
      <DeactivateRegistryModal {...props} registryListFetched={false} />
    );
    const props1 = Object.assign({}, props);
    props1.registryListFetched = true;
    tree.instance().componentWillReceiveProps(props1);
    expect(props.redirectTo.called).to.equal(true);
  });
  it('should call dispatch deactivateReg', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.deactivateReg();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch redirectTo', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.redirectTo();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch fetchRegistries', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.fetchRegistries();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch getOwnAndRecommendedRegistryDetails', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.getOwnAndRecommendedRegistryDetails();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch fetchContent', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.fetchContent();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call dispatch handleTealiumAction', () => {
    const dispatch = sinon.stub();
    const props1 = mapDispatchToProps(dispatch);

    props1.handleTealiumAction();

    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
  it('should call tealiumHandler without params', () => {
    const tree = shallow(<DeactivateRegistryModal {...props} isFetching />);
    tree.instance().tealiumHandler(true);
    expect(tree.instance().getRegistryTags.called).to.equal(undefined);
  });
});
