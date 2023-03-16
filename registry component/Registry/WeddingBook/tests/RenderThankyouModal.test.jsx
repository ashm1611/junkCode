import { configure, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Button from '@bbb-app/core-ui/button';
import RenderThankyouModal from '../RenderThankyouModal';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const labels = {
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const renderThankyou = true;
    const toggleModalState = sinon.spy();
    const onCancel = sinon.spy();
    const tree = shallow(
      <RenderThankyouModal
        labels={labels}
        toggleModalState={toggleModalState}
        mountedState={renderThankyou}
        onCancel={onCancel}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('on click of button', () => {
    const labels = {
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const renderThankyou = true;
    const toggleModalState = sinon.spy();
    const onCancel = sinon.spy();
    const tree = shallow(
      <RenderThankyouModal
        labels={labels}
        toggleModalState={toggleModalState}
        mountedState={renderThankyou}
        onCancel={onCancel}
      />
    );
    tree.find(Button).simulate('click', {});
    /* eslint no-unused-expressions: 0 */
    expect(toggleModalState).to.have.been.called;
  });
});
