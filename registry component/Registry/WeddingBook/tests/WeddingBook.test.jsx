import { configure, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeddingBook from '../WeddingBook';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const formWrapperData = {
      firstName: { value: 'abc', firstNameError: '' },
      lastName: { value: 'bcc', firstNameError: '' },
    };
    const labels = {
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const submitWeddingBook = sinon.spy();
    const resetFormDataFields = sinon.spy();
    const stateList = ['a'];
    const error = {};
    const result = true;
    const tree = shallow(
      <WeddingBook
        formWrapperData={formWrapperData}
        stateList={stateList}
        labels={labels}
        submitWeddingBook={submitWeddingBook}
        error={error}
        result={result}
        resetFormDataFields={resetFormDataFields}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when isMoile is passed', () => {
    const formWrapperData = {
      firstName: { value: 'abc', firstNameError: '' },
      lastName: { value: 'bcc', firstNameError: '' },
    };
    const labels = {
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const submitWeddingBook = sinon.spy();
    const resetFormDataFields = sinon.spy();
    const stateList = ['a'];
    const error = {};
    const result = true;
    const tree = shallow(
      <WeddingBook
        formWrapperData={formWrapperData}
        stateList={stateList}
        labels={labels}
        submitWeddingBook={submitWeddingBook}
        error={error}
        result={result}
        isMobile
        resetFormDataFields={resetFormDataFields}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
