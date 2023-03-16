# `app/components/Pages/Registry/RegistryDetailModal/tests/RegistryDetailModal.test.jsx`

#### `should render QuickView Component`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div>
    <Connect(RegistryProductDetails)
      closeModalOnBackDrop={false}
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      disableNavToPDP={false}
      hideIdeaboardIcon={false}
      isIntlRestricted={false}
      isNeedToExcluded=""
      isRBYRItem={false}
      isRBYRRegistryEnabled={true}
      parentProductData={
        Object {
          "PRODUCT_VARIATION": "NORMAL",
        }
      }
      productAttributes={null}
      registryId=""
      registryProductInfo={
        Object {
          "activeRegistry": Object {
            "groupGiftOptIn": true,
          },
          "markedAsFav": true,
          "sKUDetailVO": Object {
            "displayName": "abc",
            "parentProdId": "676767",
          },
        }
      }
      registryUserName=""
      selectedProduct={
        Object {
          "ALT_IMG": "img1, img2",
          "ATTRIBUTES_JSON": Object {
            "PDPM": Array [
              Object {
                "ACTION_URL": "",
                "DISPLAY_DESCRIP": "<p class='sddMessage'>Same Day Delivery Eligible</p>",
                "IMAGE_URL": "",
                "INTL_FLAG": "N",
                "PLACE_HOLDER": "PLSR,PDPM,PDPC",
                "PRIORITY": "1",
                "SKU_ATTRIBUTE_ID": "13_2",
              },
            ],
            "PDPP": Array [
              Object {
                "ACTION_URL": "",
                "DISPLAY_DESCRIP": "<p class='sddMessage'>Same Day Delivery Eligible</p>",
                "IMAGE_URL": "",
                "INTL_FLAG": "N",
                "PLACE_HOLDER": "PLSR,PDPM,PDPC",
                "PRIORITY": "1",
                "SKU_ATTRIBUTE_ID": "13_2",
              },
            ],
            "PDPT": Array [
              Object {
                "ACTION_URL": "",
                "DISPLAY_DESCRIP": "<p class='sddMessage'>Same Day Delivery Eligible</p>",
                "IMAGE_URL": "",
                "INTL_FLAG": "N",
                "PLACE_HOLDER": "PLSR,PDPM,PDPC",
                "PRIORITY": "1",
                "SKU_ATTRIBUTE_ID": "13_2",
              },
            ],
          },
          "BRAND": "KITCHEN",
          "BRAND_ID": "67",
          "PRODUCT_VARIATION": "NORMAL",
          "RATINGS": "1.9",
          "REVIEWS": "12",
          "TYPE": "MSWP",
          "name": "Mesh Metal Wastebaskettt",
          "productId": "100712",
        }
      }
      selectedSkuId=""
      showError={[Function]}
      switchConfigGlobal={
        Object {
          "enableQVCertona": true,
        }
      }
      variation=""
      view="twoColumnLayout"
    />
  </div>
  <Connect(wrapper)
    identifier="REGISTRY_MODAL_INFO"
    tealiumPageInfoNotAvailable={true}
    utagData={
      Object {
        "Reg_Product_View": true,
        "call_to_actiontype": "GiftGiver_ProductFlyout",
        "pagename_breadcrumb": "registry product flyout for gift givers: abc",
        "product_id": Array [
          "676767",
        ],
        "registry_add_location": "Registry Owner",
      }
    }
  />
</ErrorBoundary>
```

