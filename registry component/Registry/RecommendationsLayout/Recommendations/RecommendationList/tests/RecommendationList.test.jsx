import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import RecommendationList from '../RecommendationList';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const isMobile = {
      isMobileScreen: false,
    };
    const scene7URL = {
      url: '',
    };
    let recommendationList = {
      'DC158375785:Szs Sdsz': [
        {
          bvProductVO: {
            averageOverallRating: 0,
            externalId: null,
            id: null,
            name: null,
            overallRatingRange: null,
            ratingAvailable: false,
            ratingsOnlyReviewCount: null,
            ratingsTitle: 'Not yet rated',
            siteId: null,
            source: null,
            totalReviewCount: 0,
          },
          comment: 'store ',
          firstName: 'Szs',
          fullName: null,
          imageVO: {
            altImageList: [],
            anywhereZoomAvailable: false,
            basicImage: '7759211802087p',
            collectionThumbnailImage: null,
            largeImage: '7759211802087p?$478$',
            mediumImage: '7759211802087p?$146$',
            regularImage: null,
            smallImage: '7759211802087p?$146$',
            swatchImage: null,
            thumbnailImage: '7759211802087p?$83$',
            zoomImage: null,
            zoomImageIndex: 0,
          },
          recommendedQuantity: 1,
          repositoryId: 'DC113600001',
          sKUDetailVO: {
            activeFlag: true,
            altImageList: [],
            assemblyOffered: false,
            assemblyTime: '0',
            bopusAllowed: false,
            bopusExcludedForMinimalSku: false,
            color: 'STAINLESS STEEL',
            commaSepNonShipableStates: null,
            customizableCodes: null,
            customizableRequired: false,
            customizationOffered: false,
            customizeCTAFlag: null,
            displayURL: null,
            dynPriceInfoAlreadyFetched: false,
            ecomFulfillment: 'E',
            eligibleRebates: [],
            eligibleShipMethods: [],
            emailStockAlertsEnabled: true,
            freeShipMethods: [],
            giftWrapEligible: true,
            hasRebate: false,
            hasSddAttribute: false,
            inCartFlag: false,
            intlRestricted: false,
            isEcoFeeEligible: false,
            ltlItem: false,
            nonShippableStates: [],
            onSale: false,
            orderToShipSla: '0',
            parentProdId: '1011802087',
            personalizationType: 'N',
            pricingLabelCode: null,
            productSpecs: null,
            restrictedForBopusAllowed: false,
            restrictedForIntShip: false,
            shipMsgFlag: true,
            shippingRestricted: false,
            shippingSurcharge: 0,
            size: '6 CUP',
            skuAttributes: {
              PDPC: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
              PDPT: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
              PLSR: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
            },
            skuBelowLine: false,
            skuGiftCard: false,
            skuId: '11802087',
            skuImages: {
              altImageList: [],
              anywhereZoomAvailable: false,
              basicImage: '7759211802087p',
              collectionThumbnailImage: null,
              largeImage: '7759211802087p?$478$',
              mediumImage: '7759211802087p?$146$',
              regularImage: null,
              smallImage: '7759211802087p?$146$',
              swatchImage: null,
              thumbnailImage: '7759211802087p?$83$',
              zoomImage: null,
              zoomImageIndex: 0,
            },
            skuInStock: false,
            skuSoldOnline: false,
            storeSKU: false,
            taxStatus: '01',
            upc: '70896998071',
            vdcOffsetMessage: null,
            vdcSKUShipMesage: null,
            vdcSku: false,
            webOfferedFlag: true,
            zoomAvailable: false,
          },
          selectRegVO: null,
          shipMethodUnsupported: false,
          skuAttributes: {
            PDPC: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
            PDPT: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
            PLSR: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
          },
          skuColor: 'STAINLESS STEEL',
          skuDisplayName:
            'Copco&reg; Brushed Stainless Steel 6-Cup Stovetop Percolator',
          skuId: '11802087',
          skuIncartPrice: 0,
          skuListPrice: 24.99,
          skuPrice: 0,
          skuSalePrice: 0,
          skuSize: '6 CUP',
          socialSkuUpcMap: null,
          upc: '70896998071',
        },
      ],
    };
    let tree = shallow(
      <RecommendationList
        recommendationList={recommendationList}
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        isQuickViewOpen
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    tree = shallow(
      <RecommendationList
        recommendationList={recommendationList}
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        sortOptionApplied="recommender"
        switchConfig={{ enableRecommendListQuickView: true }}
        isQuickViewOpen
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
    tree = shallow(
      <RecommendationList
        recommendationList={{ data: null }}
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        sortOptionApplied="recommender"
        switchConfig={{ enableRecommendListQuickView: true }}
        isQuickViewOpen
      />
    );
    expect(tree.find('li').length).to.be.equal(0);
    tree = shallow(
      <RecommendationList
        recommendationList={{ data: [{}, {}, {}, {}] }}
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        sortOptionApplied="recommender"
        switchConfig={{
          enableRecommendListQuickView: true,
          enableRegistryCollaboration: true,
        }}
        isQuickViewOpen
      />
    );
    tree.instance().setState({ showMoreRecommendationsList: true });
    tree.instance().toggleMoreLessRecommendationList();
    expect(tree.instance().state.showMoreRecommendationsList).to.be.equal(
      false
    );
    tree.instance().toggleMoreLessRecommendationList();
    expect(tree.instance().state.showMoreRecommendationsList).to.be.equal(true);
    recommendationList = {
      'DC158375785:Szs Sdsz': [
        {
          fromAssociate: true,
          bvProductVO: {
            averageOverallRating: 0,
            externalId: null,
            id: null,
            name: null,
            overallRatingRange: null,
            ratingAvailable: false,
            ratingsOnlyReviewCount: null,
            ratingsTitle: 'Not yet rated',
            siteId: null,
            source: null,
            totalReviewCount: 0,
          },
          comment: 'store ',
          firstName: 'Szs',
          fullName: null,
          imageVO: {
            altImageList: [],
            anywhereZoomAvailable: false,
            basicImage: '7759211802087p',
            collectionThumbnailImage: null,
            largeImage: '7759211802087p?$478$',
            mediumImage: '7759211802087p?$146$',
            regularImage: null,
            smallImage: '7759211802087p?$146$',
            swatchImage: null,
            thumbnailImage: '7759211802087p?$83$',
            zoomImage: null,
            zoomImageIndex: 0,
          },
          recommendedQuantity: 1,
          repositoryId: 'DC113600001',
          sKUDetailVO: {
            activeFlag: true,
            altImageList: [],
            assemblyOffered: false,
            assemblyTime: '0',
            bopusAllowed: false,
            bopusExcludedForMinimalSku: false,
            color: 'STAINLESS STEEL',
            commaSepNonShipableStates: null,
            customizableCodes: null,
            customizableRequired: false,
            customizationOffered: false,
            customizeCTAFlag: null,
            displayURL: null,
            dynPriceInfoAlreadyFetched: false,
            ecomFulfillment: 'E',
            eligibleRebates: [],
            eligibleShipMethods: [],
            emailStockAlertsEnabled: true,
            freeShipMethods: [],
            giftWrapEligible: true,
            hasRebate: false,
            hasSddAttribute: false,
            inCartFlag: false,
            intlRestricted: false,
            isEcoFeeEligible: false,
            ltlItem: false,
            nonShippableStates: [],
            onSale: false,
            orderToShipSla: '0',
            parentProdId: '1011802087',
            personalizationType: 'N',
            pricingLabelCode: null,
            productSpecs: null,
            restrictedForBopusAllowed: false,
            restrictedForIntShip: false,
            shipMsgFlag: true,
            shippingRestricted: false,
            shippingSurcharge: 0,
            size: '6 CUP',
            skuAttributes: {
              PDPC: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
              PDPT: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
              PLSR: [
                {
                  actionURL: null,
                  attributeDescrip:
                    '<p class="sddMessage">Same Day Delivery Eligible</p>',
                  attributeId: '13_3',
                  attributeName: '13_3',
                  hideAttribute: false,
                  imageURL: null,
                  intlProdAttr: null,
                  placeHolder: 'PLSR,PDPT,PDPC',
                  priority: 1,
                  skuAttributeId: null,
                },
              ],
            },
            skuBelowLine: false,
            skuGiftCard: false,
            skuId: '11802087',
            skuImages: {
              altImageList: [],
              anywhereZoomAvailable: false,
              basicImage: '7759211802087p',
              collectionThumbnailImage: null,
              largeImage: '7759211802087p?$478$',
              mediumImage: '7759211802087p?$146$',
              regularImage: null,
              smallImage: '7759211802087p?$146$',
              swatchImage: null,
              thumbnailImage: '7759211802087p?$83$',
              zoomImage: null,
              zoomImageIndex: 0,
            },
            skuInStock: false,
            skuSoldOnline: false,
            storeSKU: false,
            taxStatus: '01',
            upc: '70896998071',
            vdcOffsetMessage: null,
            vdcSKUShipMesage: null,
            vdcSku: false,
            webOfferedFlag: true,
            zoomAvailable: false,
          },
          selectRegVO: null,
          shipMethodUnsupported: false,
          skuAttributes: {
            PDPC: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
            PDPT: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
            PLSR: [
              {
                actionURL: null,
                attributeDescrip:
                  '<p class="sddMessage">Same Day Delivery Eligible</p>',
                attributeId: '13_3',
                attributeName: '13_3',
                hideAttribute: false,
                imageURL: null,
                intlProdAttr: null,
                placeHolder: 'PLSR,PDPT,PDPC',
                priority: 1,
                skuAttributeId: null,
              },
            ],
          },
          skuColor: 'STAINLESS STEEL',
          skuDisplayName:
            'Copco&reg; Brushed Stainless Steel 6-Cup Stovetop Percolator',
          skuId: '11802087',
          skuIncartPrice: 0,
          skuListPrice: 24.99,
          skuPrice: 0,
          skuSalePrice: 0,
          skuSize: '6 CUP',
          socialSkuUpcMap: null,
          upc: '70896998071',
        },
      ],
    };
    tree = shallow(
      <RecommendationList
        recommendationList={recommendationList}
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        sortOptionApplied="recommender"
        switchConfig={{ enableRecommendListQuickView: true }}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
});
