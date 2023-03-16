import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryTypeDropdown from '../RegistryTypeDropdown';
configure({ adapter: new Adapter() });

const overwriteData = {
  baby: '/store/page/BabyRegistry',
  wedding: '/store/page/Registry',
};
const isFetching = false;
const changeRegistryType = sinon.spy();

describe(__filename, () => {
  it('should render correctly with data', () => {
    const data = [
      {
        key: 'BA1',
        label: 'Baby',
        props: {
          value: '/store/gift-registry/baby',
        },
      },
      {
        key: 'BRD',
        label: 'Wedding',
        props: {
          value: '/store/gift-registry/wedding',
        },
      },
      {
        key: 'HWM',
        label: 'Housewarming',
        props: {
          value: '/store/gift-registry/housewarming',
        },
      },
    ];
    const requestPath = '/store/page/Registry';
    const tree = shallow(
      <RegistryTypeDropdown
        data={data}
        isFetching={isFetching}
        changeRegistryType={changeRegistryType}
        requestPath={requestPath}
        onComponentMount={() => null}
        overwrites={overwriteData}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should invoked selectOption ', () => {
    const data = [
      {
        key: 'BA1',
        label: 'Baby',
        props: {
          value: '/store/gift-registry/baby',
        },
      },
      {
        key: 'BRD',
        label: 'Wedding',
        props: {
          value: '/store/gift-registry/wedding',
        },
      },
      {
        key: 'HWM',
        label: 'Housewarming',
        props: {
          value: '/store/gift-registry/housewarming',
        },
      },
    ];
    const requestPath = '/store/page/Registry';
    const tree = shallow(
      <RegistryTypeDropdown
        data={data}
        isFetching={isFetching}
        changeRegistryType={changeRegistryType}
        requestPath={requestPath}
        onComponentMount={() => null}
        overwrites={overwriteData}
      />
    );
    tree.instance().selectOption(requestPath);
    tree.setState({ selected: requestPath });
    expect(tree).to.not.equal(null);
  });
  it('should invoked selectOption else ', () => {
    const requestPath = '/store/page/Registry';
    const data = [];
    const overwriteDatas = {};
    const tree = shallow(
      <RegistryTypeDropdown
        data={data}
        isFetching={isFetching}
        requestPath={requestPath}
        onComponentMount={() => null}
        overwrites={overwriteDatas}
      />
    );
    tree.instance().data = null;
    tree.instance().selectOption(requestPath);
    tree.setState({ selected: requestPath });
    expect(tree).to.not.equal(null);
  });
  it('should invoked selectOption requestpath with empty string ', () => {
    const requestPath = null;
    const data = [];
    const overwriteDatas = {};
    const tree = shallow(
      <RegistryTypeDropdown
        data={data}
        isFetching={isFetching}
        requestPath={requestPath}
        onComponentMount={() => null}
        overwrites={overwriteDatas}
      />
    );
    tree.instance().data = null;
    expect(tree).to.not.equal(null);
  });
});
