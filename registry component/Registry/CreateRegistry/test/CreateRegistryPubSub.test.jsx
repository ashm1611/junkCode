import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import { publish, subscribe } from '@bbb-app/utils/pubsub';
configure({ adapter: new Adapter() });

describe('#publish', () => {
  it('should call publish', () => {
    const name = 'aa{1}cc';
    const data = 'a{1}c';
    const value = publish(name, data);
    expect(value).to.equal(undefined);
  });
  it('should call publish if name is present in events', () => {
    const name = 'aa{1}cc';
    const data = 'a{1}c';
    const handler = sinon.stub();
    subscribe(name, handler);
    publish(name, data);
    expect(handler.called).to.equal(true);
  });
});

describe('#subscribe', () => {
  it('should call subscribe', () => {
    const name = 'aa{1}cc';
    const data = 'a{1}c';
    const value = subscribe(name, data);
    expect(value).to.equal(undefined);
  });
});
