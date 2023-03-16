import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import PrimaryLinkContainer from '@bbb-app/plp-primary-link/containers/PrimaryLink';

import FlipFlopTile from '../FlipFlopTile';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<FlipFlopTile />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call fireTealiumAction ', () => {
    const fireTealiumAction = sinon.stub();
    const tree = shallow(
      <FlipFlopTile fireTealiumAction={fireTealiumAction} />
    );
    tree
      .find(PrimaryLinkContainer)
      .at(1)
      .simulate('click');
    expect(fireTealiumAction.called).to.be.equal(true);
  });
});
