import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { MemoryRouter as Router } from 'react-router-dom';
import { RenderEditRegistryLink } from '../EditRegistryWrapper';

const mountWithRouter = node => <Router>{node}</Router>;

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<RenderEditRegistryLink labels={{}} />);
    tree.find('PrimaryLink').simulate('click');
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly for public', () => {
    const tree = shallow(
      <RenderEditRegistryLink labels={{}} isPublic="1" signInDetails={{}} />
    );
    tree.find('PrimaryLink').simulate('click');
    expect(tree.find('PrimaryLink')).to.have.lengthOf(1);
  });

  it('should render correctly with customLabel', () => {
    const tree = shallow(
      <RenderEditRegistryLink labels={{}} customLabel="test" />
    );
    tree.find('Button').simulate('click');
    expect(tree.find('Button')).to.have.lengthOf(1);
  });

  it('should render correctly with customLabel with buttonTheme', () => {
    const tree = shallow(
      <RenderEditRegistryLink
        labels={{}}
        customLabel="test"
        buttonTheme="primary"
      />
    );
    tree.find('Button').simulate('click');
    expect(tree.find('Button')).to.have.lengthOf(1);
  });

  it('should render correctly for Group Gift LearnMoreModal', () => {
    const tree = shallow(
      <RenderEditRegistryLink labels={{}} customLabel="test" LearnMoreModalGG />
    );
    tree.find('PrimaryLink').simulate('click');
    expect(tree.find('PrimaryLink')).to.have.lengthOf(1);
  });

  it('should Edit registry Modal open true', () => {
    const useEff = sinon.stub(React, 'useEffect');
    const props = {
      isEditRegistry: true,
      labels: {},
    };
    const node = mount(mountWithRouter(<RenderEditRegistryLink {...props} />));
    expect(useEff.calledOnce);
    useEff.restore();
    node.unmount();
  });

  it('should Edit registry Modal open false', () => {
    const useEff = sinon.stub(React, 'useEffect');
    const props = {
      isEditRegistry: false,
      labels: {},
    };
    const node = mount(mountWithRouter(<RenderEditRegistryLink {...props} />));
    expect(useEff.calledOnce);
    useEff.restore();
    node.unmount();
  });

  it('should render new Edit Registry Icon for BBB', () => {
    const setShowModal = sinon.spy();
    const tree = shallow(
      <RenderEditRegistryLink
        labels={{}}
        signInDetails={{}}
        isBBBNewRegistryHeader
        isMobile
        LearnMoreModalGG={false}
      />
    );
    expect(tree.find('button').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('bbb-gear');
    tree.find('button').simulate('click');
    expect(setShowModal.called);
  });

  it('should render new Edit Registry Icon for Baby', () => {
    const setShowModal = sinon.spy();
    const tree = shallow(
      <RenderEditRegistryLink
        labels={{}}
        signInDetails={{}}
        isBabyNewRegistryHeader
        isMobile
        LearnMoreModalGG={false}
      />
    );
    expect(tree.find('button').length).to.equal(1);
    expect(tree.find('Icon').props().type).to.equal('baby-gear');
    tree.find('button').simulate('click');
    expect(setShowModal.called);
  });
});
