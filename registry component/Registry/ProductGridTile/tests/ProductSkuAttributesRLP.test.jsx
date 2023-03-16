import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import ProductSkuAttributesRLP from '../ProductSkuAttributesRLP';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('Should render ProductSkuAttributesRLP with refNum null', () => {
    const sKUDetailVO = {
      skuAttributes: {
        RLP: [
          {
            actionURL: '/store/static/ItemShippedDirectlyFromVendor',
            attributeDescrip:
              '<span class="prod-attrib prod-attrib-vendor-ship">Vendor Shipping Details</span>',
            attributeId: '12_1',
            attributeName: '12_1',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PDPP,RLP,PDPC',
            priority: 13,
            skuAttributeId: null,
          },
          {
            actionURL: null,
            attributeDescrip:
              '<span class="personalizationAttr"><span>P</span><strong>Personalization Available</strong></span>',
            attributeId: '4_4',
            attributeName: '4_4',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PLSR,PDPT,CRSL,RLP,PDPC',
            priority: 89,
            skuAttributeId: null,
          },
          {
            actionURL: '/store/static/GiftPackagingUnavailable',
            attributeDescrip:
              '<span class="prod-attrib prod-attrib-nogift">Gift Packaging Unavailable</span>',
            attributeId: '1_85',
            attributeName: '1_85',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PDPP,RLP',
            priority: 14,
            skuAttributeId: null,
          },
        ],
      },
    };
    const refNum = null;
    const tree = shallow(
      <ProductSkuAttributesRLP sKUDetailVO={sKUDetailVO} refNum={refNum} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('Should render ProductSkuAttributesRLP with refNum not null', () => {
    const sKUDetailVO = {
      skuAttributes: {
        RLP: [
          {
            actionURL: '/store/static/ItemShippedDirectlyFromVendor',
            attributeDescrip:
              '<span class="prod-attrib prod-attrib-vendor-ship">Vendor Shipping Details</span>',
            attributeId: '12_1',
            attributeName: '12_1',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PDPP,RLP,PDPC',
            priority: 13,
            skuAttributeId: null,
          },
          {
            actionURL: null,
            attributeDescrip:
              '<span class="personalizationAttr"><span>P</span><strong>Personalization Available</strong></span>',
            attributeId: '4_4',
            attributeName: '4_4',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PLSR,PDPT,CRSL,RLP,PDPC',
            priority: 89,
            skuAttributeId: null,
          },
          {
            actionURL: '/store/static/GiftPackagingUnavailable',
            attributeDescrip:
              '<span class="prod-attrib prod-attrib-nogift">Gift Packaging Unavailable</span>',
            attributeId: '1_85',
            attributeName: '1_85',
            hideAttribute: false,
            imageURL: null,
            intlProdAttr: null,
            placeHolder: 'PDPP,RLP',
            priority: 14,
            skuAttributeId: null,
          },
        ],
      },
    };
    const refNum = 'abcdefghijklmn';
    const tree = shallow(
      <ProductSkuAttributesRLP sKUDetailVO={sKUDetailVO} refNum={refNum} />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it("should render correctly when RLP doesn'n have any item and displayShipMsg is false", () => {
    const sKUDetailVO = {
      skuAttributes: {
        RLP: [],
      },
    };
    const tree = shallow(<ProductSkuAttributesRLP sKUDetailVO={sKUDetailVO} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it("should render correctly when RLP doesn'n have any item  and displayShipMsg is true", () => {
    const sKUDetailVO = {
      displayShipMsg: true,
      skuAttributes: {
        RLP: [],
      },
    };
    const tree = shallow(<ProductSkuAttributesRLP sKUDetailVO={sKUDetailVO} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
