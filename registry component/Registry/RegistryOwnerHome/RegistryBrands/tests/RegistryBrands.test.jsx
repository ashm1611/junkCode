import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryBrands from '../RegistryBrands';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const data = {
    view_type: ['V3'],
    headline: 'brands you may love',
    _metadata: {
      uid: 'cs563cf46727af6952',
    },
    subtitle_text: '',
    cta: {
      title: '',
      href: '',
    },
    background_color: 'BRANDS',
    cta_type: null,
    curated_facets: [
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/nestwell_store?$contentNS$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'NestWell',
        filter_name: 'NestWell',
        cta_link_label: {
          url: 'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
          link_text: 'NestWell',
        },
        model_content_for_v8_variation: [],
      },
    ],
    product_categories: [],
  };

  const registryOwnerData = {
    isMobile: false,
  };
  it('should render RegistryBrands component correctly', () => {
    const tree = shallow(
      <RegistryBrands brandsData={data} propsData={registryOwnerData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render RegistryBrands component correctly for mobile', () => {
    const propsData = {
      isMobile: true,
    };
    const tree = shallow(
      <RegistryBrands brandsData={data} propsData={propsData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render when showmore clicked', () => {
    const useStateStub = sinon.stub(React, 'useState').returns({ show: true });
    const tree = shallow(
      <RegistryBrands brandsData={data} propsData={registryOwnerData} />
    );
    tree.find('.seemore').prop('onClick')();
    useStateStub.restore();
  });
});
