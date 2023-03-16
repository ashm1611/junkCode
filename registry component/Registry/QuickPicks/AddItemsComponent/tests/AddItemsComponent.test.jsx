import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import AddItemsComponent from '../AddItemsComponent';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly with default props', () => {
    const tree = shallow(<AddItemsComponent />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with no selected items', () => {
    const tree = shallow(
      <AddItemsComponent
        selectedItemsCount={0}
        labels={{
          selectAll: 'Select all',
          addSelected: 'Add Selected to Registry ({0})',
          noSelectedItems: 'Add Selected to Registry',
        }}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly with selected items', () => {
    const tree = shallow(
      <AddItemsComponent
        selectedItemsCount={1}
        labels={{
          selectAll: 'Select all',
          addSelected: 'Add Selected to Registry ({0})',
          noSelectedItems: 'Add Selected to Registry',
        }}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render recSelectAllWrapper div when fromRecomendation props is true', () => {
    const tree = shallow(
      <AddItemsComponent
        selectedItemsCount={1}
        fromRecomendation
        labels={{
          selectAll: 'Select all',
          addSelected: 'Add Selected to Registry ({0})',
          noSelectedItems: 'Add Selected to Registry',
        }}
        quizLabels={{
          QUIZ_RESULTS_LBL: '{tk} label',
          RETAKE_QUIZ_SUBCOPY_LBL: 'test',
          RETAKE_QUIZ_LBL: 'test',
        }}
      />
    );
    expect(tree.find('.recSelectAllWrapper')).to.have.lengthOf(1);
  });

  it('should handle events', () => {
    const tree = shallow(
      <AddItemsComponent
        selectedItemsCount={1}
        labels={{
          selectAll: 'Select all',
          addSelected: 'Add Selected to Registry ({0})',
          noSelectedItems: 'Add Selected to Registry',
        }}
      />
    );
    tree.instance().handleViewPortChanges({ inView: true });
    tree.instance().handleSelectAllEvent(true);
    tree.instance().handleAddSelectedItemsEvent();
  });
  it('should render correctly Quiz Results Layout', () => {
    const tree = shallow(
      <AddItemsComponent
        selectedItemsCount={0}
        fromRecomendation
        quizLabels={{
          QUIZ_RESULTS_LBL: 'QUIZ_RESULTS_LBL',
          RETAKE_QUIZ_SUBCOPY_LBL: 'RETAKE_QUIZ_SUBCOPY_LBL',
          RETAKE_QUIZ_LBL: 'RETAKE_QUIZ_LBL',
        }}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render floating state', () => {
    const tree = shallow(<AddItemsComponent loading yThreshold={1} />);
    tree.instance().handleViewPortChanges({ inView: false, viewTop: 100 });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render static state', () => {
    const tree = shallow(<AddItemsComponent loading />);
    tree.instance().handleViewPortChanges({ inView: false });
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render change to floating state', () => {
    const tree = shallow(<AddItemsComponent isRegistryFooterOpen />);
    tree.setState({ fixed: true });
    tree.update();
    expect(toJson(tree)).to.matchSnapshot();
  });
});
