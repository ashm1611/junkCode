import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import QuickViewButton from '../QuickViewButton';

describe(__filename, () => {
  it('should match snapshot correctly', () => {
    const tree = shallow(
      <QuickViewButton
        label={'Quick View'}
        className={'quickViewButton'}
        onClick={() => {}}
        theme="secondaryStrokeBasic"
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should match snapshot correctly with iconType', () => {
    const tree = shallow(
      <QuickViewButton
        label={'Quick View'}
        className={'quickViewButton'}
        onClick={() => {}}
        theme="secondaryStrokeBasic"
        iconType="icon"
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
});
