# `app/components/Pages/Registry/RegistryOwnerModal/RegistryOwnerModalLayout/tests/RegistryOwnerModalLayout.test.jsx`

#### `should render correctly`

```
<div>
  <div
    className="twoColumnLayout twoColumnLayoutNew"
  >
    <div
      className="imageWrapperNew imageWrapper"
    >
      <ImgSrcSet
        alt="Test"
        className="fol productImageNew"
        data-locator="quick-view-item-image"
        imageSrc={
          Object {
            "height": "114",
            "preset": "content",
            "width": "114",
          }
        }
        isScene7UrlPrefix={false}
        lazyLoad={true}
        lazyLoadOptions={
          Object {
            "offset": 1500,
            "placeholder": "/static/assets/images/product-image-placeholder.png",
          }
        }
        placeholder="/static/assets/images/product-default-image.png"
        srcSet={
          Array [
            Object {
              "height": "114",
              "preset": "content",
              "sourceWidth": "1x",
              "width": "114",
            },
            Object {
              "height": "114",
              "preset": "content",
              "sourceWidth": "1.5x",
              "width": "114",
            },
          ]
        }
      />
    </div>
    <div
      className="detailWrapper"
    >
      <div
        className="badgeStyle"
      >
        <div
          data-locator="registry-item-tile-purchased-badge"
          tabIndex="0"
        >
          <span
            className="purchasedButton"
          >
            <Icon
              className="checkboxPurchased"
              focusable="false"
              height="16px"
              type="checkmarkwhite"
              width="16px"
            />
             
            Funded
          </span>
        </div>
      </div>
      <div
        className="productTitle"
        data-locator="quick-view-item-title"
        tabindex="0"
      >
        abc
      </div>
      <div
        className="priceStyleCashFund"
      />
      <div
        data-locator="quick-view-item-attribute"
      >
        <div
          className="pt1 storeAvailabiliyMessage"
          tabIndex="0"
        >
          <span
            className="twoHoursMessage"
            data-locator="bopisAvailabilityLabel"
          >
            Ready in 1 hour 
          </span>
          at store, undefined
        </div>
        <div
          className="mt2 mb3 rlpMessage"
        />
      </div>
    </div>
  </div>
  <div>
    <div
      className="mt1 mb1"
    >
      <div
        className="greyLine"
      />
      <div
        className="mt1 pb1"
      />
    </div>
    <div
      className="toggleContainer"
    >
      <div
        className="relative"
      >
        <span
          className="toggleIcon"
        >
          <Icon
            focusable="false"
            type="bbb_must_have_white"
          />
          Must Have
        </span>
        <span
          className="toggleBtn absolute"
        >
          <Img
            alt="toggle-off"
            onClick={[Function]}
            reactImage={true}
            src="/static/assets/images/toggle_off.png"
          />
        </span>
      </div>
    </div>
    <div
      className="mt1"
    >
      <div
        className="mt1 mb15 staticSectionNew"
      />
    </div>
    <div />
    <div
      className="md-mb2 md-mt1 staticSectionNew"
    >
      <GroupGiftingTooltip
        commonStyle="commonAmount"
        description="Contribute any amount you'd like. Even if an item isn't fully funded, the registrant will still receive your contribution. And we'll let them know you contributed to their gift, so they can properly send thanks."
        enableNewRegDashboard={true}
        fromModal={false}
        heading="Cash Funds"
        isCashFund={true}
        showFulfilledAmount={true}
        title="Cash Funds"
        toolTipAlign="outerTooltipGG"
        toolTipOnMob="toolTipAlign"
      />
      <ContributionProgressBar
        RegistryDetails="RegistryDetailsModal"
        commonStyle="commonAmount"
        enableNewRegDashboard={true}
        isCashFund={true}
      />
    </div>
    <PureComponent(GridX)
      className="pickUpCtaCss"
    >
      <PureComponent(Cell)
        className="small-12  large-12"
      />
      <PureComponent(Cell)
        className="small-12 large-12"
      />
    </PureComponent(GridX)>
    <Button
      className="addToCart"
      data-locator="remove-CTA"
      theme="secondaryStrokeBasic"
      variation="fullWidth"
    >
      remove
    </Button>
    <Connect(wrapper)
      enableKatori={false}
      isBopisFeatureEnable={true}
      isPurchased={true}
      itemTypes="CSH"
      onModalHide={[Function]}
      productId=""
      refNum={null}
      registryId="121212"
      registryModalData={
        Object {
          "activeRegistry": Object {
            "groupGiftOptIn": true,
          },
          "deliverySurcharge": "deliverySurcharge",
          "enableNewRegDashboard": true,
          "getUpdatedCategoryData": [Function],
          "ggFundedBadge": [Function],
          "groupGiftView": [Function],
          "initiateInactivityModal": [Function],
          "isBelowLineItem": "false",
          "isBopisFeatureEnable": true,
          "itemType": "CSH",
          "labels": Object {
            "RBYR": Object {
              "buyItNow": "buyItNow",
            },
            "RegistryOwner": Object {
              "CurrentlySoldOut": "Currently Sold Out",
              "NoLongerCarry": "No Longer Carry",
              "discontinued": "Discontinued",
              "markAsPurchased": "markAsPurchased",
            },
            "createRegistry": Object {
              "addToCartLabel": "addToCartLabel",
              "alreadyPurchasedLabel": "alreadyPurchasedLabel",
              "favouriteRegistryOwnerLabel": "favouriteRegistryOwnerLabel",
              "purchasedLabel": "purchasedLabel",
              "wantLabel": "wantLabel",
              "writeReviewLabel": "writeReviewLabel",
            },
          },
          "ltlDeliveryServices": "ltlDeliveryServices",
          "ltlShipMethodDesc": "ltlShipMethodDesc",
          "personalizationDescription": "abc",
          "personalizationType": "",
          "personalizedMobImageUrls": Array [],
          "personlisedDoublePrice": "300",
          "purchased": "true",
          "qtyPurchased": "5",
          "qtyRequested": "1",
          "refNum": "1232",
          "sKUDetailVO": Object {
            "displayName": "Test",
            "upc": "upc",
          },
          "selectedCheckboxFilter": "store-pickup",
          "shipMethodUnsupported": "shipMethodUnsupported",
          "shipSwapView": [Function],
          "skuInStore": "1",
          "switchConfig": Object {
            "enableCashFund": true,
            "enableItemStatus": true,
            "enableRegOtherRecommendation": true,
          },
          "tealiumData": Object {
            "location": Object {
              "pathname": "viewRegistryOwner",
            },
          },
        }
      }
      sKUDetailVO={
        Object {
          "intlRestricted": "1212",
          "minimumQty": 1,
          "parentProdId": "1212",
          "size": "1212",
          "skuId": "1212",
          "skuImages": Object {
            "mediumImage": "//placehold.it/200",
          },
          "swatch": "1212",
        }
      }
      skuInStore="1"
      storeDetails={
        Object {
          "commonName": "store",
          "storeId": "1",
        }
      }
    />
    <Connect(wrapper)
      identifier="REGISTRY_MODAL_INFO"
      tealiumPageInfoNotAvailable={true}
      utagData={
        Object {
          "Reg_Product_View": true,
          "call_to_actiontype": "Registrant_ProductFlyout",
          "pagename_breadcrumb": "registry product flyout for registrants: Test",
          "product_id": Array [
            undefined,
          ],
          "registry_add_location": "Registry Owner",
        }
      }
    />
  </div>
</div>
```

