import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateRegistryRedirection from '../CreateRegistryRedirection';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should call CreateRegistryRedirection', () => {
    const props = {
      isRegistryID: '123',
      globalSwitchConfig: { hoorayModal: true },
    };
    const wrapper = shallow(<CreateRegistryRedirection {...props} />);
    expect(wrapper.find('Redirect')).to.have.lengthOf(1);
  });
  it('should call CreateRegistryRedirection else', () => {
    const props = {
      isRegistryID: '123',
      globalSwitchConfig: { hoorayModal: false },
    };
    const wrapper = shallow(<CreateRegistryRedirection {...props} />);
    expect(wrapper.find('Redirect')).to.have.lengthOf(1);
  });
  it('should render Redirect, if location contains redirect url', () => {
    const props = {
      isRegistryID: '123',
      enableNewSignUp: true,
      globalSwitchConfig: { hoorayModal: false },
      location: {
        state: {
          from: {
            params: {
              redirect:
                'store/product/instant-pot-9-in-1-duo-plus-programmable-electric-pressure-cooker/5230177',
            },
          },
        },
      },
    };
    const wrapper = shallow(<CreateRegistryRedirection {...props} />);
    expect(wrapper.find('Redirect')).to.have.lengthOf(1);
  });
  it('should redirect to AMP page when addtoRegistry as url param', () => {
    const windowURL = window.location.href;
    const url = `${windowURL}?addtoRegistry=true`;
    const props = {
      isRegistryID: '123',
      enableNewSignUp: true,
      globalSwitchConfig: { hoorayModal: false },
      location: {
        state: {
          from: {
            params: {
              redirect: url,
            },
          },
        },
      },
    };
    const wrapper = shallow(<CreateRegistryRedirection {...props} />);
    expect(wrapper.find('Redirect')).to.have.lengthOf(1);
  });
});
