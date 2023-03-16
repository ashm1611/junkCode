import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReplaceModalComponent from '../ReplaceModalComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render ReplaceModalComponent correctly', () => {
    const tree = shallow(
      <ReplaceModalComponent toggleModalState isQuickViewOpen />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
