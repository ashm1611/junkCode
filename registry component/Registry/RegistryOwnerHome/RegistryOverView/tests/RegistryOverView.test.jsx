import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import RegistryOverView from '../RegistryOverView';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const contentStackSelectors = [
    {
      modules: [
        {
          registry_story: {
            item: [
              {
                title_cta: 'House Warming',
                _metadata: {
                  uid: 'cs771225b6468b0cbb',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/HWStory1?$content$',
                single_line: 'House Warming',
                story_tile: [],
              },
              {
                title_cta: 'Home decor',
                _metadata: {
                  uid: 'cs8c013289e706fa46',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/HWStory2?$content$',
                single_line: 'Home Decor',
                story_tile: [],
              },
              {
                title_cta: 'Kitchen tools & gadgets',
                _metadata: {
                  uid: 'csc23fadbc9fa2d547',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/US-BrandG-LP-C02-5-V2-CATEGORY-SQUARE-DSK-5-KitchenTools?$content$',
                single_line: 'Kitchen tools & gadgets',
                story_tile: [],
              },
              {
                title_cta: 'Dinnerware',
                _metadata: {
                  uid: 'cs55f37d3f4b6a2d17',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-US-FW32-BBB-1002-1008-Dining-C15-12-v3-1?$content$&wid=320',
                single_line: 'Dinnerware',
                story_tile: [],
              },
              {
                title_cta: 'great benefits',
                _metadata: {
                  uid: 'cs5030701c23bd51cc',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
                single_line: 'great benefits',
                story_tile: [],
              },
              {
                title_cta: 'Registry favorites',
                _metadata: {
                  uid: 'csa048b8ebfa0a01a3',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds2circle?$PNG$',
                single_line: 'Registry favorites',
                story_tile: [],
              },
              {
                title_cta: 'in-store app mode',
                _metadata: {
                  uid: 'cs3a30df1769d99239',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds8circle?$PNG$',
                single_line: 'in-store app mode',
                story_tile: [],
              },
              {
                title_cta: 'cash funds',
                _metadata: {
                  uid: 'cs03d63b442c66db09',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/registy_cash_funds_icon_10262022?$PNG$',
                single_line: 'cash funds',
                story_tile: [],
              },
              {
                title_cta: 'experience gifts',
                _metadata: {
                  uid: 'cs774e558bfabc0591',
                },
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds5circle?$PNG$',
                single_line: 'experience gifts',
                story_tile: [],
              },
            ],
            _metadata: {
              uid: 'cs298bbf13e63f1d2d',
            },
          },
        },
        {
          status_bar: {
            view_type: 'StatusBar',
          },
        },
        {
          story_title: {
            view_type: ['V1'],
            headline: 'like a checklist but better',
            background_color: 'REG_BUILDER',
            description:
              'our new registry builder is the easiest way to prep for getting married',
            description_text_color: '',
            heading_type: ['2'],
          },
        },
        {
          registry_builder: {
            item: [
              {
                scene7_image_id: '',
                _metadata: {
                  uid: 'cs13beeeb25657a612',
                },
                cta: {
                  title: 'Must Have',
                  href: '#',
                },
              },
              {
                scene7_image_id: '',
                _metadata: {
                  uid: 'csbe519ae50ef8673e',
                },
                cta: {
                  title: 'Nice-to-Have',
                  href: '#',
                },
              },
            ],
            _metadata: {
              uid: 'cs95e160e397566798',
            },
          },
        },
        {
          category_module: {
            view_type: ['V3'],
            headline: 'categories for you',
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
                  url:
                    '/store/category/storage-cleaning/storage-organization/10555',
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
                  url:
                    '/store/category/storage-cleaning/storage-organization/10555',
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
          },
        },
        {
          category_module: {
            view_type: ['V3'],
            headline: 'brands you may love',
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
                  uid: 'cs2ab6cec7b66ac7c7',
                },
                image_alt_atribute: 'NestWell',
                filter_name: 'NestWell',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/nestwell/9048',
                  link_text: 'NestWell',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/simplyessential_store?$contentNS$',
                _metadata: {
                  uid: 'csf4a5c5461ed9b3ae',
                },
                image_alt_atribute: 'Simply Essential',
                filter_name: 'Simply Essential',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/simply-essential/9068',
                  link_text: 'Simply Essential',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/haven_store?$contentNS$',
                _metadata: {
                  uid: 'cse85f5f16f20c4224',
                },
                image_alt_atribute: 'Haven',
                filter_name: 'Haven',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/haven/9052',
                  link_text: 'Haven',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/ourtable_store?$contentNS$',
                _metadata: {
                  uid: 'cs7c8d3ce5575fcf01',
                },
                image_alt_atribute: 'Our Table',
                filter_name: 'Our Table',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/our-table/9053',
                  link_text: 'Our Table',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/wildsage_store?$contentNS$',
                _metadata: {
                  uid: 'cs4bf551634945040a',
                },
                image_alt_atribute: 'Wild Sage',
                filter_name: 'Wild Sage',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/wild-sage/9069',
                  link_text: 'Wild Sage',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/beewillow_store?$contentNS$',
                _metadata: {
                  uid: 'cs8dfb087085f0c755',
                },
                image_alt_atribute: 'Bee & Willow Home',
                filter_name: 'Bee & Willow Home',
                cta_link_label: {
                  url:
                    'https://www.bedbathandbeyond.com/store/brand/bee-willow-home/7492',
                  link_text: 'Bee & Willow Home',
                },
                model_content_for_v8_variation: [],
              },
              {
                image:
                  'https://b3h2.scene7.com/is/image/BedBathandBeyond/beewillow_store?$contentNS$',
                _metadata: {
                  uid: 'cs4cd848fb9654905a',
                },
                image_alt_atribute: '',
                filter_name: '',
                cta_link_label: {
                  url: '',
                  link_text: '',
                },
                model_content_for_v8_variation: [],
              },
            ],
            product_categories: [],
          },
        },
        {
          product_carousel: {
            view_type: ['V3'],
            class_name: null,
            headline: '',
            cta: {
              title: '',
              href: '',
            },
            cta_type: null,
            is_blog_page: false,
            products_look_up: [
              {
                product_id: '5533303',
                _metadata: {
                  uid: 'csd5b83ade9b3d1b53',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'Chicco Corso&trade; LE Modular Travel System',
                  href:
                    '/product/chicco-corso-le-modular-travel-system/5533303',
                },
              },
              {
                product_id: '5658873',
                _metadata: {
                  uid: 'csdc452e5089647c4e',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'Baby Brezza&reg; One Step Sterilizer Dryer Advanced',
                  href:
                    '/product/baby-brezza-one-step-sterilizer-dryer-advanced/5493925',
                },
              },
              {
                product_id: '5561336',
                _metadata: {
                  uid: 'cs92de87e1a18c70b1',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'Maxi-Cosi&reg; Coral&trade; XP Infant Car Seat',
                  href: '/product/maxi-cosi-coral-xp-infant-car-seat/5515868',
                },
              },
              {
                product_id: '3289467',
                _metadata: {
                  uid: 'cs5ba483c0c298fb07',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'NUK&reg; Smooth Flow&trade; Anti-Colic Bottle Newborn Gift Set in Dots',
                  href:
                    '/product/nuk-smooth-flow-anti-colic-bottle-newborn-gift-set-in-dots/5443167',
                },
              },
              {
                product_id: '5561152',
                _metadata: {
                  uid: 'csd227e1f6a5ee13d8',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'Pipette 6-Piece Baby Essentials Kit',
                  href: '/product/pipette-6-piece-baby-essentials-kit/5411734',
                },
              },
              {
                product_id: '5559853',
                _metadata: {
                  uid: 'cs65f833da8a4bf328',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'Babyganics&reg; 100-Count Size 1 Ultra Absorbent Diapers',
                  href:
                    '/product/babyganics-100-count-size-1-ultra-absorbent-diapers/1020404987',
                },
              },
              {
                product_id: '5541084',
                _metadata: {
                  uid: 'cs357e00932b13e4fa',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: '',
                  href: '',
                },
              },
              {
                product_id: '1044115319',
                _metadata: {
                  uid: 'cs07f9214b26d23dfa',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'SKIP*HOP&reg; Sit-to-Step Convertible High Chair in Grey/White',
                  href:
                    '/product/skip-hop-sit-to-step-convertible-high-chair-in-grey-white/5398308',
                },
              },
              {
                product_id: '5666075',
                _metadata: {
                  uid: 'cs171c394f90399146',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'Babyganics&reg; Baby-Safe World&trade; Essentials Gift Set',
                  href:
                    '/product/babyganics-baby-safe-world-essentials-gift-set/1020341886',
                },
              },
              {
                product_id: '5704971',
                _metadata: {
                  uid: 'cs24015876fdb95bc1',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'Playtex&reg; Diaper Genie&reg; Complete Diaper Pail with Refill',
                  href:
                    '/product/playtex-diaper-genie-complete-diaper-pail-with-refill/3336548',
                },
              },
              {
                product_id: '5655559',
                _metadata: {
                  uid: 'csf93440ac2da243db',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'UGG&reg; Shaye Duvet Cover',
                  href: '/product/ugg-shaye-duvet-cover/5470657',
                },
              },
              {
                product_id: '5606936',
                _metadata: {
                  uid: 'csbc8895f808048e99',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title: 'KitchenAid&reg; Semi-Automatic Espresso Machine',
                  href:
                    '/product/kitchenaid-semi-automatic-espresso-machine/5591529',
                },
              },
              {
                product_id: '5415901',
                _metadata: {
                  uid: 'cs67bb49661f443fb3',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'Calphalon&reg; Premier&trade; Nonstick Hard-Anodized 11-Piece Cookware Set',
                  href:
                    '/product/calphalon-premier-nonstick-hard-anodized-11-piece-cookware-set/5718584',
                },
              },
              {
                product_id: '300084241',
                _metadata: {
                  uid: 'csc2a5988e11dafe1d',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'simplehuman&reg; Dual Compartment Rectangular 58-Liter Step Trash Can',
                  href:
                    '/product/simplehuman-dual-compartment-rectangular-58-liter-step-trash-can/3283794',
                },
              },
              {
                product_id: '5654662',
                _metadata: {
                  uid: 'cs8cf83855dfbb7b69',
                },
                default_sku: '{badgeDescription:null,recommendedQuantity:"1"}',
                cta_button: {
                  title:
                    'Calphalon&reg; Premier&trade; Nonstick Hard-Anodized 11-Piece Cookware Set',
                  href:
                    '/product/calphalon-premier-nonstick-hard-anodized-11-piece-cookware-set/5718584',
                },
              },
            ],
          },
        },
        {
          story_hero: {
            view_type: 'V1',
            background_color: 'MARKETING_BANNER',
            _metadata: {
              uid: 'csa57951b4c125ed9d',
            },
            class_name: ['mt-4', 'mb-4'],
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
              cta: {
                url:
                  'https://www.bedbathandbeyond.com/store/product/h-for-happy-christmas-countdown-tabletop-tree-figurine-in-green/5691833?icid=hp_homepage_gb_gift_of_day_us',
                link_text: 'click here',
              },
            },
          },
        },
        {
          story_hero: {
            view_type: 'V1',
            background_color: 'MY_ITEMS_ZERO_STATE',
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
              headline: 'you have no items on your registry',
              sub_title: 'build your registry with your favs',
              infobox_class_names: [],
              infobox_background_color: '',
              cta: {
                url:
                  'https://www.bedbathandbeyond.com/store/product/h-for-happy-christmas-countdown-tabletop-tree-figurine-in-green/5691833?icid=hp_homepage_gb_gift_of_day_us',
                link_text: 'shop registry favs',
              },
              cta_2: {
                url: '',
                link_text: '',
              },
              cta_variations: null,
              cta_class_names: [],
            },
          },
        },
      ],
    },
  ];
  it('should render correctly', () => {
    const tree = shallow(
      <RegistryOverView contentStackSelectors={contentStackSelectors} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('contentStackSelectors is empty', () => {
    const tree = shallow(<RegistryOverView contentStackSelectors={[]} />);
    // eslint-disable-next-line no-unused-expressions
    expect(tree).to.be.empty;
  });
});
