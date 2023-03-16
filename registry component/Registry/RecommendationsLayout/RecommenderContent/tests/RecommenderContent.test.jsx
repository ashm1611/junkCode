import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import {
  RecommenderContent,
  renderRows,
  callEvent,
} from '../RecommenderContent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const recommenderData = {
    'DC158375785:Szs Sdsz': [
      {
        acceptedQuantity: 0,
        fullName: 'Karan M',
        declinedQuantity: 10,
        recommendedQuantity: 1,
        profileActive: false,
      },
    ],
    associate: [
      {
        acceptedQuantity: 0,
        fullName: 'Karan M',
        declinedQuantity: 10,
        recommendedQuantity: 1,
        profileActive: true,
      },
    ],
  };

  const labels = {
    registryDetails: {
      manageYourRecommenders: 'Manage Your Recommenders',
      recommenderNameText: 'Name',
      recommendedQuantityText: 'recommended',
      acceptedQuantitytext: 'accepted',
      declinedQuantitytext: 'declined',
      blocktext: 'block',
      unblocktext: 'unblock',
    },
  };

  const isMobile = {
    isMobileScreen: true,
  };

  const isDesktop = {
    isMobileScreen: false,
  };

  it('should render mobile view with default props', () => {
    const tree = shallow(
      <RecommenderContent
        recommenderData={recommenderData}
        isMobile={isMobile}
        labels={labels}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render desktop view with default props', () => {
    const tree = shallow(
      <RecommenderContent
        recommenderData={recommenderData}
        isMobile={isDesktop}
        labels={labels}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call  renderRows with first argument as empty array ', () => {
    const result = renderRows([], { recommenderName: 'abc' });
    expect(result).to.equal(null);
  });

  it('should call  renderRows with first argument as undefined ', () => {
    const result = renderRows(undefined, { recommenderName: 'abc' });
    expect(result).to.equal(null);
  });

  it('should call callEvent', () => {
    const revealBlockUnblockModalSpy = sinon.spy();
    const tree = shallow(
      <RecommenderContent
        recommenderData={{ 'DC158375785:Szs Sdsz': [] }}
        isMobile={isDesktop}
        labels={labels}
        revealBlockUnblockModal={revealBlockUnblockModalSpy}
      />
    );
    const e = {
      preventDefault: sinon.spy(),
    };
    callEvent(e);
    // eslint-disable-next-line no-unused-expressions
    expect(revealBlockUnblockModalSpy.called).to.be.true;
    expect(tree).to.not.equal(null);
  });
});
