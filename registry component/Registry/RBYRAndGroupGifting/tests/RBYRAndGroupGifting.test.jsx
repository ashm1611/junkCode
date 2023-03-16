import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RBYRAndGroupGifting, {
  RBYRSettingLayout,
  ShowDescription,
} from '../RBYRAndGroupGifting';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const dynamicContentState = {
    content: {
      12345: { body: 'This is Term & Condition Message' },
      23456: { body: 'This is ship or swap information message' },
    },
  };

  const props = {
    dynamicContentState,
    rbyrDescriptionId: '12345',
    rbyrTermsAndConditionId: '23456',
    labels: {},
  };
  describe('#RBYRAndGroupGifting', () => {
    it('should render RBYRAndGroupGifting component correctly', () => {
      const tree = shallow(<RBYRAndGroupGifting />);
      expect(toJson(tree)).to.matchSnapshot();
    });
    it('should render RBYRAndGroupGifting component correctly for rbyr', () => {
      const tree = shallow(<RBYRAndGroupGifting shipOrSwap />);
      expect(toJson(tree)).to.matchSnapshot();
    });
  });
  describe('#RBYRSettingLayout', () => {
    it('should render RBYRSettingLayout component correctly', () => {
      const tree = shallow(<RBYRSettingLayout />);
      expect(toJson(tree)).to.matchSnapshot();
    });
    it('should render RBYRSettingLayout component correctly when click on radio button', () => {
      const updateState = sinon.stub();
      const tree = shallow(<RBYRSettingLayout updateState={updateState} />);
      tree
        .find('InputRadio')
        .at(1)
        .simulate('click');
      expect(updateState.called).to.equal(true);
    });
    it('should render RBYRSettingLayout component correctly for rbyr', () => {
      const onSelectRBYROption = sinon.stub();
      const tree = shallow(
        <RBYRSettingLayout shipOrSwap onSelectRBYROption={onSelectRBYROption} />
      );
      tree
        .find('InputRadio')
        .at(1)
        .simulate('click');
      expect(onSelectRBYROption.called).to.equal(true);
    });
  });
  describe('#ShowDescription', () => {
    it('should render ShowDescription component correctly', () => {
      const tree = shallow(<ShowDescription {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
    it('should render ShowDescription component correctly for rbyr', () => {
      const tree = shallow(<ShowDescription shipOrSwap labels={{}} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
    it('should called setTermAndCondition on click of term & condition link', () => {
      const tree = shallow(<ShowDescription shipOrSwap labels={{}} />);
      tree
        .find('PrimaryLink')
        .at(0)
        .simulate('click');
      expect(tree.find('ModalDialog')).to.have.lengthOf(1);
    });
    it('should close term & condition', () => {
      const tree = shallow(<ShowDescription shipOrSwap labels={{}} />);
      tree
        .find('PrimaryLink')
        .at(0)
        .simulate('click');
      tree.find('ModalDialog').prop('toggleModalState')();
      expect(tree.find('ModalDialog')).to.have.lengthOf(0);
    });
    it('should called setLearnMoreModal on click of learn more link', () => {
      const tree = shallow(<ShowDescription shipOrSwap labels={{}} />);
      tree
        .find('PrimaryLink')
        .at(1)
        .simulate('click');
      expect(tree.find('ModalDialog')).to.have.lengthOf(0);
    });
  });
});
