import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import { renderProductTile as RenderProductTile } from '../helper';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const itemProps = { categoryId: '123', iconType: {} };

    const wrapper = shallow(RenderProductTile({}, '', itemProps));
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should render correctly with enableCSLabels', () => {
    const itemProps = { categoryId: '123', iconType: {}, enableCSLabels: true };

    const wrapper = shallow(RenderProductTile({}, '', itemProps));
    expect(toJson(wrapper)).to.matchSnapshot();
  });
});
