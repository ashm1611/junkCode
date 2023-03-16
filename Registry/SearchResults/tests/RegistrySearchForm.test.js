import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import { mapDispatchToProps } from '@bbb-app/registry-search/containers/registry-search-form/RegistrySearchForm';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call dispatch', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    const event = { target: {}, preventDefault: () => {} };
    props.handleSubmit(event, { q: 'q', searchMode: true }, 'qq');
    props.handleSubmit(event, { q: 'q', searchMode: true }, 'q');
    /* eslint no-unused-expressions: 0 */
    expect(dispatch).to.have.been.called;
  });
});
