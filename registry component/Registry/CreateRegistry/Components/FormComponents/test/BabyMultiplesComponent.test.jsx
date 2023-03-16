import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import BabyMultiplesComponent from '../BabyMultiplesComponent';
import { genderConst } from '../../../CreateRegistryUtils';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const props = {
    labels: {},
    surveyComponentContentObj: {
      displayName: 'How many babies are you expecting?',
      personas: [
        {
          autoCheck: true,
          personaValue: '1',
          personaDescription: 'One',
        },
        {
          autoCheck: false,
          personaValue: '2',
          personaDescription: 'Two',
        },
        {
          autoCheck: false,
          personaValue: '3',
          personaDescription: 'Three',
        },
      ],
    },
    styles: {
      formQuestion: 'formQuestion',
      radiowrapper: 'radiowrapper',
      genderStyle: 'genderStyle',
      labelButton: 'labelButton',
    },
    isContentAvaible: true,
    isCreateMode: true,
    isMobile: false,
    updateState: sinon.spy(),
    babyGender: 'G~||B~',
    stateObj: {},
  };
  it('should render correctly', () => {
    const tree = shallow(<BabyMultiplesComponent {...props} />);

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should set correct value for changeSelectedGender', () => {
    const e = {
      target: {
        value: genderConst.BOY,
      },
    };
    const key = 'genderBaby1';
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    tree.instance().changeSelectedGender(e, key);
    const state = tree.instance().state[`${key}`];
    expect(state).to.equal(genderConst.BOY);
    expect(props.updateState.called).to.equal(true);
  });

  it('should set correct value for changeRevealGenderValue', () => {
    const e = {
      target: {
        value: true,
      },
    };
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    tree.instance().changeRevealGenderValue(e);
    const state = tree.instance().state.revealGender;
    expect(state).to.equal(true);
  });
  it('should set correct value of NO for changeRevealGenderValue', () => {
    const e = {
      target: {
        value: false,
      },
    };
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    tree.instance().changeRevealGenderValue(e);
    const state = tree.instance().state.revealGender;
    expect(state).to.equal(false);
  });
  it('should set correct selectedbabyCount', () => {
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    tree.instance().setSurveyOptionRadio('', '1');
    const state = tree.instance().state.selectedbabyCount;
    expect(state).to.equal(1);
  });
  it('should render correctly if not createMode', () => {
    const tree = shallow(
      <BabyMultiplesComponent {...props} isCreateMode={false} />
    );

    const state = tree.instance().state.selectedbabyCount;
    expect(state).to.equal(2);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render set error state correctly from parent stateobj', () => {
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    const nextProps = Object.assign({}, props);
    const genderBaby1Error = 'some error';
    nextProps.stateObj = { genderBaby1Error };
    tree.instance().componentWillReceiveProps(nextProps);
    const state = tree.instance().state.genderBaby1Error;
    expect(state).to.equal(genderBaby1Error);
  });
  it('should render correctly with no baby gender selected', () => {
    const newProps = {
      labels: {},
      surveyComponentContentObj: {
        displayName: 'How many babies are you expecting?',
        personas: [
          {
            autoCheck: true,
            personaValue: '1',
            personaDescription: 'One',
          },
          {
            autoCheck: false,
            personaValue: '2',
            personaDescription: 'Two',
          },
          {
            autoCheck: false,
            personaValue: '3',
            personaDescription: 'Three',
          },
        ],
      },
      styles: {
        formQuestion: 'formQuestion',
        radiowrapper: 'radiowrapper',
        genderStyle: 'genderStyle',
        labelButton: 'labelButton',
      },
      isContentAvaible: true,
      isCreateMode: true,
      isMobile: false,
      updateState: sinon.spy(),
      babyGender: 'G~||B~',
      stateObj: {},
    };

    const tree = shallow(<BabyMultiplesComponent {...newProps} />);

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly with twins', () => {
    const newProps = {
      labels: {},
      surveyComponentContentObj: {
        displayName: 'How many babies are you expecting?',
        personas: [
          {
            autoCheck: true,
            personaValue: '1',
            personaDescription: 'One',
          },
          {
            autoCheck: false,
            personaValue: '2',
            personaDescription: 'Two',
          },
          {
            autoCheck: false,
            personaValue: '3',
            personaDescription: 'Three',
          },
        ],
      },
      styles: {
        formQuestion: 'formQuestion',
        radiowrapper: 'radiowrapper',
        genderStyle: 'genderStyle',
        labelButton: 'labelButton',
      },
      isContentAvaible: true,
      isCreateMode: true,
      isMobile: false,
      updateState: sinon.spy(),
      babyGender: 'T',
      stateObj: {},
    };

    const tree = shallow(<BabyMultiplesComponent {...newProps} />);

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render setGenderDecorObj correctly', () => {
    const tree = shallow(<BabyMultiplesComponent {...props} />);
    const nextProps = {
      labels: {},
      surveyComponentContentObj: {
        displayName: 'How many babies are you expecting?',
        personas: [
          {
            autoCheck: true,
            personaValue: '2',
            personaDescription: 'One',
          },
          {
            autoCheck: false,
            personaValue: '3',
            personaDescription: 'Two',
          },
          {
            autoCheck: false,
            personaValue: '4',
            personaDescription: 'Three',
          },
        ],
      },
      styles: {
        formQuestion: 'formQuestion',
        radiowrapper: 'radiowrapper',
        genderStyle: 'genderStyle',
        labelButton: 'labelButton',
      },
      isContentAvaible: true,
      isCreateMode: true,
      isMobile: false,
      updateState: sinon.spy(),
      babyGender: 'G~||B~',
      stateObj: {},
    };
    tree.instance().componentWillReceiveProps(nextProps);
    const state = tree.instance().state.genderBaby1Error;
    expect(state).to.equal('');
  });
});
