import { configure, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeddingBook, { mapDispatchToProps } from '../WeddingBookContainer';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<WeddingBook />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('mapDispatchToProps should return a prop submitWeddingBook which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const formdata = { firstName: 'test', lastName: 'test' };
    const props = mapDispatchToProps(dispatch);
    props.submitWeddingBook(formdata);
    expect(dispatch.called).to.equal(true);
  });

  it('mapDispatchToProps should return a prop resetFormDataFields which when called call the dispatch the function passed', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    props.resetFormDataFields('weddingBook');
    expect(dispatch.called).to.equal(true);
  });
});
