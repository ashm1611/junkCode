import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryCategory from '../RegistryCategory';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const data = {
    view_type: ['V3'],
    headline: 'categories for you',
    _metadata: {
      uid: 'cs563cf46727af6952',
    },
    subtitle_text: '',
    cta: {
      title: '',
      href: '',
    },
    background_color: 'CATEGORY',
    cta_type: null,
    curated_facets: [
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/US-BrandG-LP-C02-5-V2-CATEGORY-SQUARE-DSK-1-Cookware?$content$',
        _metadata: {
          uid: 'csf2f42d463a2f9815',
        },
        image_alt_atribute: 'Cookware',
        filter_name: 'Cookware',
        cta_link_label: {
          url: '/store/category/kitchen/cookware/10518',
          link_text: 'Cookware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-US-FW24-BBB-0807-0813-Web-Kitchen-C15-12-v3-2?$content$&wid=320',
        _metadata: {
          uid: 'cs5aa4bb75db9db1d1',
        },
        image_alt_atribute: 'Bakeware',
        filter_name: 'Bakeware',
        cta_link_label: {
          url: '/store/category/kitchen/bakeware-baking-tools/10514',
          link_text: 'Bakeware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/US-BrandG-LP-C02-5-V2-CATEGORY-SQUARE-DSK-5-KitchenTools?$content$',
        _metadata: {
          uid: 'cs79e19427a3d40c94',
        },
        image_alt_atribute: 'Kitchen tools & gadgets',
        filter_name: 'Kitchen tools & gadgets',
        cta_link_label: {
          url: '/store/category/kitchen/kitchen-tools-gadgets/10617',
          link_text: 'Kitchen tools & gadgets',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-US-FW32-BBB-1002-1008-Dining-C15-12-v3-1?$content$&wid=320',
        _metadata: {
          uid: 'cs61871e43a8d39ed0',
        },
        image_alt_atribute: 'Dinnerware',
        filter_name: 'Dinnerware',
        cta_link_label: {
          url: '/store/category/dining/dinnerware/10532',
          link_text: 'Dinnerware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/RegistryFavorites_C15.12%20v3_Drinkware%20DSK?$content$&wid=320',
        _metadata: {
          uid: 'cs52f14307d00c5819',
        },
        image_alt_atribute: 'Drinkware',
        filter_name: 'Drinkware',
        cta_link_label: {
          url: '/store/category/dining/glasses-drinkware/10533',
          link_text: 'Drinkware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/RegistryFavorites_C15.12%20v3_Serveware%20DSK?$content$&wid=320',
        _metadata: {
          uid: 'cs58467fa832df52e1',
        },
        image_alt_atribute: 'Serveware',
        filter_name: 'Serveware',
        cta_link_label: {
          url: '/store/category/dining/serveware/10535',
          link_text: 'Serveware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/CollectionStarters_C025_bed_and_bath?$202$',
        _metadata: {
          uid: 'cs100375c349348fb0',
        },
        image_alt_atribute: 'Comforters',
        filter_name: 'Comforters',
        cta_link_label: {
          url: '/store/category/bedding/comforter-sets/15502',
          link_text: 'Comforters',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Dashboard_Reg%20Recs_M1_IMG3?$202$',
        _metadata: {
          uid: 'cs172d3010e62f7b68',
        },
        image_alt_atribute: 'Bath & Towel Rugs',
        filter_name: 'Bath & Towel Rugs',
        cta_link_label: {
          url: '/store/category/bath/bath-towels-rugs/13433',
          link_text: 'Bath & Towel Rugs',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/CollectionStarters_C025_closet_office_and_more?$202$',
        _metadata: {
          uid: 'cs33e7c71093880d17',
        },
        image_alt_atribute: 'Storage Cleaning',
        filter_name: 'Storage Cleaning',
        cta_link_label: {
          url: '/store/category/storage-cleaning/storage-organization/10555',
          link_text: 'Storage Cleaning',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/CollectionStarters_C025_bed_and_bath?$202$',
        _metadata: {
          uid: 'cs093e453629d6ed12',
        },
        image_alt_atribute: 'Comforters',
        filter_name: 'Comforters',
        cta_link_label: {
          url: '/store/category/bedding/comforter-sets/15502',
          link_text: 'Comforters',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/Dashboard_Reg%20Recs_M1_IMG3?$202$',
        _metadata: {
          uid: 'cs5d5fa5c74881d21c',
        },
        image_alt_atribute: 'Bath Towels & Rugs',
        filter_name: 'Bath Towels & Rugs',
        cta_link_label: {
          url: '/store/category/bath/bath-towels-rugs/13433',
          link_text: 'Bath Towels & Rugs',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/CollectionStarters_C025_closet_office_and_more?$202$',
        _metadata: {
          uid: 'cs393aa5824296e390',
        },
        image_alt_atribute: 'Storage Cleaning',
        filter_name: 'Storage Cleaning',
        cta_link_label: {
          url: '/store/category/storage-cleaning/storage-organization/10555',
          link_text: 'Storage Cleaning',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/US-BrandG-LP-C02-5-V2-CATEGORY-SQUARE-DSK-1-Cookware?$content$',
        _metadata: {
          uid: 'cs09ac7a5185c79a5c',
        },
        image_alt_atribute: 'Cookware',
        filter_name: 'Cookware',
        cta_link_label: {
          url: '/store/category/kitchen/cookware/10518',
          link_text: 'Cookware',
        },
        model_content_for_v8_variation: [],
      },
      {
        image:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-US-FW24-BBB-0807-0813-Web-Kitchen-C15-12-v3-2?$content$&wid=320',
        _metadata: {
          uid: 'csfeb04e5199e3daa6',
        },
        image_alt_atribute: 'Bakeware',
        filter_name: 'Bakeware',
        cta_link_label: {
          url: '/store/category/kitchen/bakeware-baking-tools/10514',
          link_text: 'Bakeware',
        },
        model_content_for_v8_variation: [],
      },
    ],
    product_categories: [],
  };

  const registryOwnerData = {
    isMobile: false,
  };

  it('should render RegistryCategory component correctly', () => {
    const tree = shallow(
      <RegistryCategory categoryData={data} propsData={registryOwnerData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render RegistryCategory component correctly for mobile', () => {
    const propsData = {
      isMobile: true,
    };
    const tree = shallow(
      <RegistryCategory categoryData={data} propsData={propsData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render when showmore clicked', () => {
    const useStateStub = sinon
      .stub(React, 'useState')
      .returns({ categoryShow: true });
    const propsData = {
      isMobile: true,
    };
    const tree = shallow(
      <RegistryCategory categoryData={data} propsData={propsData} />
    );
    tree.find('.seemore').prop('onClick')();
    useStateStub.restore();
  });
});
