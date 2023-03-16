import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NewCreateRegComplete from '../NewCreateRegComplete';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('expect start personalized questionnaire to be clicked', () => {
    const tree = shallow(<NewCreateRegComplete onCloseClick={() => {}} />);
    tree.find('#createRegistryNew-complete').simulate('click');
    expect(tree.find('onCloseClick')).to.not.equal(null);
  });

  it('should render quizExitPage with BBBUS content', () => {
    const tree = shallow(
      <NewCreateRegComplete onCloseClick={() => {}} ProfileName="test" />
    );
    tree.find('#createRegistryNew-complete').simulate('click');
    expect(tree.find('onCloseClick')).to.not.equal(null);
  });
});
