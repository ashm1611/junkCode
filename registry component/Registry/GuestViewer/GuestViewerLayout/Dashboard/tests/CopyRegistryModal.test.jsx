import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { noop } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import CopyRegistryModal from '../CopyRegistryModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const registryData = {
    registryResVO: {
      registrySummaryVO: {},
    },
  };
  const registryLabel = {};
  const copyRegistryAct = sinon.spy();
  const redirectToMyRegistry = sinon.spy();
  const match = {
    params: {
      id: '457896542',
    },
  };
  const copiedProducts = {
    name: 'test',
  };
  const activeRegistry = {
    registryId: '896575489',
    eventType: 'Housewarming',
  };
  const onClickLinkCancel = sinon.spy();
  const props = {
    registryData,
    registryLabel,
    copyRegistryAct,
    match,
    activeRegistry,
    onClickLinkCancel,
    copiedProducts,
    redirectToMyRegistry,
  };

  it('should render correctly', () => {
    const isRegistryCopied = 'SUCCESS';
    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call redirectToMyRegistry on click of button for isRegistryCopied SUCCESS', () => {
    const isRegistryCopied = 'SUCCESS';
    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    tree
      .find(Button)
      .first()
      .simulate('click');
    expect(redirectToMyRegistry.called).to.be.equal(true);
  });

  it('should call onClickLinkCancel on click of primarylink for isRegistryCopied SUCCESS', () => {
    const isRegistryCopied = 'SUCCESS';
    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    tree
      .find(PrimaryLink)
      .first()
      .simulate('click', { preventDefault: noop });
    expect(onClickLinkCancel.called).to.be.equal(true);
  });

  it('should render correctly on NOSUCCESS', () => {
    const isRegistryCopied = 'NOSUCCESS';

    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call redirectToMyRegistry on click of button for isRegistryCopied NOSUCCESS', () => {
    const isRegistryCopied = 'NOSUCCESS';
    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    tree
      .find(Button)
      .first()
      .simulate('click');
    expect(redirectToMyRegistry.called).to.be.equal(true);
  });

  it('should call onClickLinkCancel on click of primarylink for isRegistryCopied NOSUCCESS', () => {
    const isRegistryCopied = 'NOSUCCESS';
    const tree = shallow(
      <CopyRegistryModal {...props} isRegistryCopied={isRegistryCopied} />
    );
    tree
      .find(PrimaryLink)
      .first()
      .simulate('click', { preventDefault: noop });
    expect(onClickLinkCancel.called).to.be.equal(true);
  });
});
