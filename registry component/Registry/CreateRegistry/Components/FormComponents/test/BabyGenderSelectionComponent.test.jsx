import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import BabyGenderSelectionComponent from '../BabyGenderSelectionComponent';
import { genderConst } from '../../../CreateRegistryUtils';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    labels: {},
    styles: {
      formQuestion: 'formQuestion',
      radiowrapper: 'radiowrapper',
      genderStyle: 'genderStyle',
      labelButton: 'labelButton',
    },
    selectedGender: genderConst.BOY,
    idKey: 'Baby1',
    idx: 1,
    changeSelectedGender: sinon.spy(),
  };
  it('should render correctly', () => {
    const tree = shallow(<BabyGenderSelectionComponent {...props} />);

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should call changeSelectedGender when gender change to Boy', () => {
    const tree = shallow(<BabyGenderSelectionComponent {...props} />);
    tree
      .find('#Baby1Boy')
      .first()
      .simulate('click');
    expect(props.changeSelectedGender.called).to.equal(true);
  });
  it('should call changeSelectedGender when gender change to Girl', () => {
    const tree = shallow(<BabyGenderSelectionComponent {...props} />);
    tree
      .find('#Baby1Girl')
      .first()
      .simulate('click');
    expect(props.changeSelectedGender.called).to.equal(true);
  });
  it('should render correctly with error', () => {
    const tree = shallow(
      <BabyGenderSelectionComponent {...props} errorMessage={'errorMessage'} />
    );
    expect(tree).to.not.equal(null);
  });
});
