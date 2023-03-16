import sinon from 'sinon';
import { mapDispatchToProps } from '../ReplaceModalForNandD';

describe(__filename, () => {
  it('should call mapDispatchToProps', () => {
    const dispatch = sinon.stub();
    const props = mapDispatchToProps(dispatch);
    props.fireTealiumAction();
  });
});
