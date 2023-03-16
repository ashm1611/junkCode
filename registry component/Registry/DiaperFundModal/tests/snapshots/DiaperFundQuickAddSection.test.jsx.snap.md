# `app/components/Pages/Registry/DiaperFundModal/tests/DiaperFundQuickAddSection.test.jsx`

#### `should render DiaperFundQuickAddSection component correctly`

```
<PureComponent(GridContainer)
  className="mb3"
>
  <PureComponent(GridX)
    className="quickViewStyle mt2"
  >
    <div
      className="inlineBlock"
    >
      <RegistryDFQuickAddProductTile
        addToRegistryLbl="Add To Registry"
        addedToRegistryLbl="Added to Registry"
        diaperFundProducts={
          Array [
            Object {
              "DISPLAY_NAME": "Diaper/Wipe Fund 4 Months",
              "IS_PRICE": "$250.00",
              "SKU_ID": "69638537",
            },
          ]
        }
        isFetching={false}
        isItemAlreadyAddedToRegistry={true}
        item={
          Object {
            "DISPLAY_NAME": "Diaper/Wipe Fund 4 Months",
            "IS_PRICE": "$250.00",
            "SKU_ID": "69638537",
          }
        }
        registryOwnerFirstCategoryList={
          Array [
            Object {
              "diaperFundSKUs": Array [
                "69638537",
              ],
              "registryItemList": Array [
                Object {
                  "deletedItem": true,
                  "formattedPrice": "$29.99",
                  "price": "29.99",
                  "sKUDetailVO": Object {
                    "displayName": "SCRABBLE&reg;: World of Harry Potter",
                    "skuId": "68399443",
                  },
                },
                Object {
                  "formattedPrice": "$250.00",
                  "price": "250.0",
                  "sKUDetailVO": Object {
                    "displayName": "Diaper/Wipe Fund 4 Months",
                    "skuId": "69638537",
                  },
                },
              ],
            },
          ]
        }
        variation="Date"
      />
    </div>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

