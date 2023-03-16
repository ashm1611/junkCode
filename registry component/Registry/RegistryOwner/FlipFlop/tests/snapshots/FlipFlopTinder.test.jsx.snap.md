# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FlipFlopTinder.test.jsx`

#### `should render with mock data`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    id="flipFlopRootContainer"
  >
    <div
      className="flipFlopCardsContainer relative"
      id="cards"
    >
      <div>
        <div
          className="mx1 flipFlopTinderCategories"
        >
          <CustomSelect
            buttonClassName="btnClass"
            dropdownDescription=""
            iconClassName=""
            modalIconProps={
              Object {
                "height": "15px",
                "type": "close",
                "width": "15px",
              }
            }
            optionSet={
              Array [
                Object {
                  "key": "flipFlopAllCategories",
                  "label": "All Categories",
                  "props": Object {
                    "value": "flipFlopAllCategories",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:12961)",
                  "label": "Strollers",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:12961)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:12970)",
                  "label": "Car Seats",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:12970)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10565)",
                  "label": "Baby Nursery",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10565)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10563)",
                  "label": "Gear & Travel",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10563)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10566)",
                  "label": "Bath & Potty",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10566)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10567)",
                  "label": "Clothing",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10567)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10570)",
                  "label": "Feeding",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10570)",
                  },
                },
                Object {
                  "key": "(L1_ID:10006 AND L2_ID:10569)",
                  "label": "Health & Safety",
                  "props": Object {
                    "value": "(L1_ID:10006 AND L2_ID:10569)",
                  },
                },
              ]
            }
            selectOption={[Function]}
            variationName="selectBreadcrumbNoUnderline"
            wrapperClassName="mt2 tinderCategoryDropdown"
          />
        </div>
        <div
          id="flipFlopDragCard"
        >
          <Connect(wrapper)
            identifier="cardExposure"
            tealiumPageInfoNotAvailable={true}
            utagData={
              Object {
                "Audience_Segment": "",
                "content_pagetype": "Registry Hit/Miss page",
                "favorite_store_id": "",
                "navigation_path": "Registry Hit/Miss page",
                "page_function": "Registry Hit/Miss page",
                "page_name": "Registry Hit/Miss page",
                "page_type": "Registry Hit/Miss page",
                "pagename_breadcrumb": "",
                "product_category": Array [
                  undefined,
                ],
                "product_has_personalization": "",
                "product_id": Array [
                  "1043233533",
                ],
                "product_image_name": Array [],
                "product_image_url": Array [
                  "56518543233533p",
                ],
                "product_name": Array [
                  "B. Smith&reg; Multi-Purpose Server with Tray",
                ],
                "product_pagetype": "Registry Hit/Miss page",
                "product_price": Array [
                  "$39.99",
                ],
                "product_quantity": Array [
                  1,
                ],
                "product_sku_id": Array [
                  "43233533",
                ],
                "product_sku_name": Array [
                  "B. Smith&reg; Multi-Purpose Server with Tray",
                ],
                "product_sub_sub_category": Array [],
                "product_subcategory": Array [],
                "reg_hitmiss_prodimpression": "true",
                "subnavigation_path": "Registry Hit/Miss page",
              }
            }
          />
          <DraggableCard
            atrData={
              Object {
                "activeRegistryId": "520589269",
                "activeRegistryName": "Baby",
                "brand_name": "B. Smith",
                "isCustomizationRequired": false,
                "isList": false,
                "ltlFlag": "false",
                "price": "$39.99",
                "prodId": "1043233533",
                "qty": 1,
                "scene7imageID": "56518543233533p",
                "skipNotifyFlag": "false",
                "skuId": "43233533",
                "skuName": "B. Smith&reg; Multi-Purpose Server with Tray",
                "tinderATRShowLoader": false,
              }
            }
            cardId="BedBathUS_1043233533"
            collectionFlag="0"
            index={0}
            key="BedBathUS_1043233533"
            labels={
              Object {
                "errorApiTimeout": "We're sorry, we experienced an issue while loading the registry. Please refresh the page.",
                "referredContent": Array [
                  Object {
                    "id": "12440",
                    "key": "flipFlopBanner",
                  },
                  Object {
                    "id": "12441",
                    "key": "tinderLandscapeModeMessage",
                  },
                ],
              }
            }
            onOutScreenLeft={[Function]}
            onOutScreenRight={[Function]}
            previousUrl=""
            price={
              Object {
                "highPriceValueMX": undefined,
                "low": undefined,
                "lowPriceValueMX": 939,
                "lowValue": 39.99,
                "normal": "$39.99",
                "normalValue": undefined,
                "priceLabelCodeMX": undefined,
                "priceLabels": Object {
                  "was": undefined,
                },
                "priceRangeDescription": "$%L",
                "pricingLabelCode": undefined,
                "wasLowPriceMX": undefined,
              }
            }
            rating={4.8}
            reviews={52}
            rollupTypeCode="0"
            scene7imageID="56518543233533p"
            showMSWPModal={false}
            swatchFlag="0"
            title="B. Smith&reg; Multi-Purpose Server with Tray"
            toggleMSWPModalState={[Function]}
            url="/product/b-smith-reg-multi-purpose-server-with-tray/1043233533"
          />
        </div>
      </div>
    </div>
  </div>
  <FlipFlopModal
    ariaLabel="Error while adding item to registry"
    closeIconShow={true}
    imgURL="flipFlopATRError"
    labelToShow="Something went wrong when adding your item. Try again."
    mountedState={false}
    toggleErrorModalState={[Function]}
  />
</ErrorBoundary>
```

#### `should render with mock data and in landscape mode`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    id="flipFlopRootContainer"
  >
    <div
      className="flipFlopCardsContainer relative"
      id="cards"
    >
      <div
        className="pt3"
      >
        <Icon
          className="landscapeMessageIcon absolute"
          focusable="false"
          height={64}
          type="smartphone"
          width={64}
        />
        <wrapper
          className="mt4 landscapeMessageContainer absolute"
          data-locator="tinder-landscape-mode-message"
          theme="mediumLight"
        >
          test body data
        </wrapper>
      </div>
    </div>
  </div>
  <FlipFlopModal
    ariaLabel="Error while adding item to registry"
    closeIconShow={true}
    imgURL="flipFlopATRError"
    labelToShow="Something went wrong when adding your item. Try again."
    mountedState={false}
    toggleErrorModalState={[Function]}
  />
</ErrorBoundary>
```

#### `should render with mock data and isFlipFlopEnabled true`

```
<Tinderable
  activeRegistryId="520589269"
  activeRegistryName="Baby"
  addToRegistry={[Function]}
  addToRegistryState={
    Object {
      "addedSkuAttrs": Object {
        "DISPLAY_NAME": "TOY",
        "SKU_SCENE7_URL": "$abc123",
      },
      "contextTheme": "regular",
      "data": null,
      "error": null,
      "isFetching": false,
      "productId": "10771122",
      "qty": 2,
      "skuId": "771122",
    }
  }
  dynamicContent={
    Object {
      "content": Object {
        "12440": Object {
          "body": "<img alt=\"FLipFLop Banner Tutorial\" data-align=\"center\" data-entity-type=\"file\" data-entity-uuid=\"b9358d78-00fc-481c-90ec-3c635978e6c7\" height=\"67\" src=\"http://s7d9.scene7.com/is/image/BedBathandBeyond/flip-flop-onboarding?$content$\" />",
        },
        "12441": Object {
          "body": "test body data",
        },
      },
    }
  }
  fireTealiumAction={[Function]}
  isFetchingItemsList={false}
  isFlipFlopEnabled={true}
  isItemsCountLow={false}
  items={
    Array [
      Object {
        "ATTRIBUTES_JSON": Array [
          "{\"SKU_ATTRIBUTE_ID\":\"13_5\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_2\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"1_357\",\"DISPLAY_DESCRIP\":\"<span class='prod-attrib prod-attrib-exclusive0'>Wedding Registry Favorite</span>\",\"PLACE_HOLDER\":\"PLSR,PDPT,CRSL,PDPC,PRINFO\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"Y\",\"PRIORITY\":\"999\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_17\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_4\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_3\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_12\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_6\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_8\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_7\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
          "{\"SKU_ATTRIBUTE_ID\":\"13_11\",\"DISPLAY_DESCRIP\":\"<p class='sddMessage prod-attrib-feo'>Same Day Delivery Eligible</p>\",\"PLACE_HOLDER\":\"PLSR,PDPM,PDPC,SHALL\",\"IMAGE_URL\":\"\",\"ACTION_URL\":\"\",\"INTL_FLAG\":\"N\",\"PRIORITY\":\"1\"}",
        ],
        "BRAND": "B. Smith",
        "COLLECTION_FLAG": "0",
        "CUSTOMIZATION_OFFERED_FLAG": Array [
          "No",
        ],
        "DISPLAY_NAME": "B. Smith&reg; Multi-Purpose Server with Tray",
        "INCART_FLAG": "0",
        "INTL_RESTRICTED": "N",
        "L3_ID": Array [
          "13811",
          "13178",
          "13882",
          "14155",
          "13719",
          "13245",
        ],
        "LOW_PRICE": 39.99,
        "LOW_PRICE_MX": 939,
        "LTL_FLAG": Array [
          "0",
        ],
        "MEDIUM_IMAGE_ID": "56518543233533p?$146$",
        "MX_INCART_FLAG": "0",
        "PERSONALIZATION_TYPE": Array [
          "N",
        ],
        "PRICE_RANGE_DESCRIP": "$%L",
        "PRICE_RANGE_STRING": "$39.99",
        "PRICE_RANGE_STRING_MX": "MXN 939.00",
        "PRODUCT_ID": "1043233533",
        "RATINGS": 4.8,
        "REVIEWS": 52,
        "ROLLUP_TYPE_CODE": "0",
        "SCENE7_URL": "56518543233533p",
        "SEO_URL": "/product/b-smith-reg-multi-purpose-server-with-tray/1043233533",
        "SITE_ID": Array [
          "BedBathUS",
        ],
        "SKU_ID": Array [
          "43233533",
        ],
        "SWATCH_FLAG": "0",
        "VERT_IMAGE_ID": "56518543233533p?$146v$",
        "id": "BedBathUS_1043233533",
      },
    ]
  }
  labels={
    Object {
      "errorApiTimeout": "We're sorry, we experienced an issue while loading the registry. Please refresh the page.",
      "referredContent": Array [
        Object {
          "id": "12440",
          "key": "flipFlopBanner",
        },
        Object {
          "id": "12441",
          "key": "tinderLandscapeModeMessage",
        },
      ],
    }
  }
  match={
    Object {
      "params": Object {
        "regType": "COL",
      },
    }
  }
  mswpProductDetails={
    Object {
      "color": "red",
      "error": Object {
        "message": "test error",
      },
      "skuError": Object {
        "message": "test skuError",
      },
    }
  }
  registryTinderAllCategories={
    Object {
      "BRD": Array [
        Object {
          "category_text": "All Categories",
          "url_param": "",
        },
      ],
      "fqParam": "{!prefix f=CATEGORY_HIERARCHY v=$dep_clicked}",
    }
  }
  resetFlipFlopData={[Function]}
  setIsItemsCountLow={[Function]}
  store={
    Object {
      "clearActions": [Function],
      "dispatch": [Function],
      "getActions": [Function],
      "getState": [Function],
      "replaceReducer": [Function],
      "subscribe": [Function],
    }
  }
  switchConfigGlobal={Object {}}
  toggleMSWPModalState={[Function]}
  track={[Function]}
  triggerNextAPICall={[Function]}
/>
```

