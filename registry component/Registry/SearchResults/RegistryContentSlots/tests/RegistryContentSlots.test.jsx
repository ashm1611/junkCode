import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import GoogleDfp from '@bbb-app/google-dfp/containers/GoogleDfp';
import { RegionBoundary, dynamicComponents } from '../RegistryContentSlots';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const components = [
    {
      name: 'RegistryOccasions',
      data: {
        field_visual: [
          {
            field_image: '/',
            cta_label: 'test',
          },
        ],
        title: 'test',
        subtitle_text: 'test',
        cta: {
          url: '/',
          displayName: 'test',
        },
      },
      params: {
        id: '1234',
      },
    },
    {
      name: 'RegistryFindRegistry',
      data: [],
      params: {
        id: '1235',
      },
    },
    {
      name: 'GoogleDFP',
      data: [],
      params: {
        id: '1235',
      },
    },
    {
      name: 'NeedHelp',
      data: [],
      params: {
        id: '1235',
      },
    },
  ];

  it('should render correctly when components are present', () => {
    const tree = shallow(
      <RegionBoundary components={components} id="test" labels={{}} />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly without components', () => {
    const tree = shallow(<RegionBoundary id="test" labels={{}} />);

    expect(tree).to.not.equal(null);
  });

  it('GoogleDfp should render correctly', () => {
    const GoogleDfpComponent = dynamicComponents.GoogleDFP;
    const wrapper = shallow(<GoogleDfpComponent item={{}} />);
    expect(wrapper.is(GoogleDfp)).to.equal(false);
  });
});
