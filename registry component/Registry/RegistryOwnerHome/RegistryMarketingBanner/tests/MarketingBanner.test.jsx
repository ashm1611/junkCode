import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MarketingBanner from '../MarketingBanner';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const data = {
    view_type: 'V1',
    background_color: 'MARKETING_BANNER',
    _metadata: {
      uid: 'csa57951b4c125ed9d',
    },
    class_name: ['mt - 4', 'mb - 4'],
    image_alt_text: '',
    image: {
      image_scene7_id_dsk_:
        '08_18-NESP-Enhanced-BP-HeroBrand-SM-Video_C01_3_2-?$content$&wid=800',
      image_scene7_id_tab_:
        '08_18-NESP-Enhanced-BP-HeroBrand-SM-Video_C01_3_2-?$content$&wid=800',
      image_scene7_id_mob_:
        '08_18-NESP-Enhanced-BP-HeroBrand-SM-Video_C01_3_2-?$content$&wid=800',
    },
    infobox_properties: {
      eyebrow_title: '',
      eyebrow_url: '',
      text_color: '',
      headline: 'This is a dummy headline story hero module',
      sub_title: '',
      infobox_class_names: [],
      infobox_background_color: '',
      cta: {
        url:
          'https://www.bedbathandbeyond.com/store/product/h-for-happy-christmas-countdown-tabletop-tree-figurine-in-green/5691833?icid=hp_homepage_gb_gift_of_day_us',
        link_text: 'click here',
      },
      cta_2: {
        url: '',
        link_text: '',
      },
      cta_variations: null,
      cta_class_names: [],
    },
  };
  const registryOwnerData = {
    isMobile: false,
  };

  it('should render MarketingBanner component correctly', () => {
    const tree = shallow(
      <MarketingBanner data={data} registryOwnerData={registryOwnerData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render MarketingBanner component correctly for mobile', () => {
    const propsData = {
      isMobile: true,
    };
    const tree = shallow(
      <MarketingBanner data={data} registryOwnerData={propsData} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
