# `app/components/Pages/Registry/RegistryDetailModal/RegistryDetailModalLayout/tests/RegistryDetailModalLayout.test.jsx`

#### `should render correctly`

```
<div
  className="productDetails"
>
  <div
    className="imageWrapper"
  >
    <div>
      <div
        data-locator="registry-quick-view-item-price"
        tabIndex="0"
      >
        <div
          className="productPrice isPrice"
        />
      </div>
      <Component />
      <div
        className="productTitle"
        data-locator="registry-quick-view-item-title"
        tabIndex="0"
      >
        Test
      </div>
      <div
        className="upcText"
        data-locator="registry-quick-view-item-UPC"
        tabIndex="0"
      >
        UPC 
        <span>
          upc
        </span>
      </div>
    </div>
  </div>
  <div
    className="detailWrapper"
  >
    <div
      data-locator="registry-quick-view-item-purchased-symbol"
      tabIndex="0"
    >
      <span
        className="purchasedTextStyle"
      >
        <Icon
          className="purchasedCheckMarkStyle"
          focusable="false"
          height="12px"
          type="checkmarkwhite"
          width="12px"
        />
         
        Purchased
      </span>
    </div>
    <div
      className="productDetailWrapper"
    >
      <div
        className="requestedPurchased"
        data-locator="registry-quick-view-item-quantity-rp"
        tabIndex="0"
      >
        <span>
          1
        </span>
         Requested | 
        <span>
          5
        </span>
         Purchased
      </div>
      <div
        className="productAttr"
        data-locator="registry-quick-view-item-attribute"
      >
        <span />
      </div>
      <ProductSkuAttributesRLP
        sKUDetailVO={
          Object {
            "displayName": "Test",
            "upc": "upc",
          }
        }
      />
      <div
        className="availableStatus"
        tabIndex="0"
      >
         
        <span
          data-locator="bopisAvailabilityLabel"
        >
          Available
        </span>
         
        at store, undefined
      </div>
      <div
        className="qtyDropDown"
      >
        <QuantitySelector
          buttonClassName="qtySelectorStyle"
          buttonProps={
            Object {
              "theme": "ghostPrimary",
              "variation": "noHorizontalPadding",
            }
          }
          data-locator="RLV_qtydropdown"
          dataLocatorSelectBox="cart-qtydropdown"
          fieldName="qtySelect"
          labelName="Qty"
          labelPosition="append"
          labelStyle="inlineLabel"
          optionSet={
            Array [
              Object {
                "id": "1",
                "label": "1",
                "props": Object {
                  "value": 1,
                },
              },
              Object {
                "id": "2",
                "label": "2",
                "props": Object {
                  "value": 2,
                },
              },
              Object {
                "id": "3",
                "label": "3",
                "props": Object {
                  "value": 3,
                },
              },
              Object {
                "id": "4",
                "label": "4",
                "props": Object {
                  "value": 4,
                },
              },
              Object {
                "id": "5",
                "label": "5",
                "props": Object {
                  "value": 5,
                },
              },
              Object {
                "id": "6",
                "label": "6",
                "props": Object {
                  "value": 6,
                },
              },
              Object {
                "id": "7",
                "label": "7",
                "props": Object {
                  "value": 7,
                },
              },
              Object {
                "id": "8",
                "label": "8",
                "props": Object {
                  "value": 8,
                },
              },
              Object {
                "id": "9",
                "label": "9",
                "props": Object {
                  "value": 9,
                },
              },
              Object {
                "id": "10",
                "label": "10+",
                "props": Object {
                  "value": 10,
                },
              },
            ]
          }
          priceOverride={false}
          restrictedQuantityError={false}
          selectInputClassName=""
          selectedQuantity={1}
          showUpdateButton={false}
          textInputClassName=""
          updateButtonName=""
          updateQuantity={[Function]}
        />
      </div>
      <div>
        <UniversalComponent
          buttonProps={
            Object {
              "attr": Object {
                "className": "mobCtaHeight staticSection addToCart",
                "data-locator": "registryguest-addtocartbutton",
                "iconProps": undefined,
                "theme": "primary",
                "tooltip": "Add to Cart",
                "variation": "fullWidth",
              },
              "children": "Add to Cart",
            }
          }
          calledFromRegistry={true}
          isCollegePage={false}
          isNeedToExcluded=""
          isRBYRItem={false}
          ltlFlag={false}
          onModalHide={[Function]}
          parentProductId=""
          prodId="1212"
          qty={1}
          refnum=""
          registryId="121212"
          size="1212"
          skuId="1212"
          swatch="1212"
        />
      </div>
      <div
        className="commonTop"
        styles={
          Object {
            "width": "670px",
          }
        }
      />
    </div>
    <PrimaryLink
      ariaLabel="View Product Details"
      className="viewProductDetailsLink"
      data-locator="registry-quick-view-item-view-detail-cta"
      isHardSpaReq={true}
    >
      <Icon
        focusable="false"
        height="20px"
        type="bbb-detail"
        width="15px"
      />
      <span
        className="viewProductDetails"
      >
        View Product Details
      </span>
    </PrimaryLink>
  </div>
</div>
```

#### `should render with given props value  `

```
<div
  className="productDetails"
>
  <div
    className="imageWrapper"
  >
    <div>
      <div
        data-locator="registry-quick-view-item-price"
        tabIndex="0"
      >
        <div
          className="productPrice isPrice"
        />
      </div>
      <div
        className="productTitle"
        data-locator="registry-quick-view-item-title"
        tabIndex="0"
      >
        Test
      </div>
      <div
        className="upcText"
        data-locator="registry-quick-view-item-UPC"
        tabIndex="0"
      >
        UPC 
        <span>
          upc
        </span>
      </div>
    </div>
  </div>
  <div
    className="detailWrapper"
  >
    <div
      data-locator="registry-quick-view-item-purchased-symbol"
      tabIndex="0"
    >
      <span
        className="purchasedTextStyle"
      >
        <Icon
          className="purchasedCheckMarkStyle"
          focusable="false"
          height="12px"
          type="checkmarkwhite"
          width="12px"
        />
         
        Purchased
      </span>
    </div>
    <div
      className="productDetailWrapper"
    >
      <div
        className="requestedPurchased"
        data-locator="registry-quick-view-item-quantity-rp"
        tabIndex="0"
      >
        <span>
          1
        </span>
         Requested | 
        <span>
          5
        </span>
         Purchased
      </div>
      <div>
        <UniversalComponent
          buttonProps={
            Object {
              "attr": Object {
                "className": "mobCtaHeight staticSection addToCart",
                "data-locator": "registryguest-addtocartbutton",
                "iconProps": undefined,
                "theme": "secondary",
                "tooltip": "Add to Cart",
                "variation": "fullWidth",
              },
              "children": "Add to Cart",
            }
          }
          calledFromRegistry={true}
          isCollegePage={false}
          isNeedToExcluded=""
          isRBYRItem={false}
          ltlFlag={false}
          onModalHide={[Function]}
          parentProductId=""
          prodId="1212"
          qty={1}
          refnum=""
          registryId="121212"
          size="1212"
          skuId="1212"
          swatch="1212"
        />
      </div>
      <div
        className="commonTop"
        styles={
          Object {
            "width": "670px",
          }
        }
      >
        <div
          className={false}
        />
        <div
          className="md-mb2 md-mt1"
        >
          <GroupGiftingTooltip
            commonStyle="commonAmount"
            description="Contribute any amount you'd like. Even if an item isn't fully funded, the registrant will still receive your contribution. And we'll let them know you contributed to their gift, so they can properly send thanks."
            diaperFundLabel="Diaper Fund"
            diaperdescription="A diaper fund is a benefit to our registrants which allow friends & family to contribute any dollar amount for future purchases of diapers or wipes."
            diapertitle="What is a Diaper Fund?"
            fromModal={false}
            ggItemContributionNeeded={0}
            giftGiver={true}
            heading="Group Gifting"
            iconProps={
              Object {
                "height": "12px",
                "width": "12px",
              }
            }
            isDiaperFundSku={true}
            showFulfilledAmount={true}
            title="How it Works"
            toolTipAlign="outerTooltipGG"
            toolTipOnMob="toolTipAlign"
          />
          <ContributionProgressBar
            RegistryDetails="RegistryDetailsModal"
            commonStyle="commonAmount"
            ggItemContributionNeeded={0}
          />
          <div
            className="pb1"
          />
        </div>
        <div
          className="justifyEnd"
        >
          <PureComponent(Cell)
            className="small-12 large-6 mb1 groupGiftFund commonWidth"
          >
            <FormInput
              blurHandler={[Function]}
              className=""
              data-locator="groupGiftTile"
              disabled={false}
              groupGiftFundError={true}
              hideAriaLabelText={false}
              hideFieldLevelErrorMessage={false}
              id="groupGiftFundRLV"
              identifier="RegistrygroupGiftFund"
              isChangedOnce={false}
              isRequired={true}
              labelPosition="prepend"
              name="groupGiftFund"
              onBlur={[Function]}
              onChange={[Function]}
              onClick={[Function]}
              onFocus={[Function]}
              placeholder="$100"
              selectOption={null}
              showNumericKeypadOnMobile={false}
              tilesLength={-1}
              type="text"
              validation="required"
              value="$100"
              wrapperProps={Object {}}
            />
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="small-12 large-6 commonWidth"
          >
            <UniversalComponent
              Image=""
              RatingsandReviews={
                Object {
                  "RATINGS": "1.9",
                  "REVIEWS": "12",
                }
              }
              buttonProps={
                Object {
                  "attr": Object {
                    "className": "fullWidth mb1",
                    "data-locator": "contribute-addtocartbuttontile",
                    "id": "ContributeCtaTile",
                    "theme": "primary",
                  },
                  "children": "Contribute",
                  "disabled": false,
                }
              }
              config={
                Object {
                  "pageConfig": Object {
                    "RegistryGroupGifting": Object {
                      "GGContiFundThreshold": "1",
                    },
                  },
                }
              }
              contributionAmount="$100"
              deviceConfig={
                Object {
                  "DESKTOP": 1024,
                }
              }
              enableKatori={false}
              ggEligibleItem={true}
              ggItemContributionNeeded={0}
              groupGiftItemStatus={[Function]}
              isBopisFeatureEnable={true}
              labels={
                Object {
                  "RegistryGroupGifting": Object {},
                  "giftGiver": Object {
                    "minimumQuantityAriaLabel": "minimumQuantityAriaLabel",
                    "minimumQuantityMessage": "minimumQuantityMessage",
                    "minimumQuantityTooltip": "minimumQuantityTooltip",
                    "qtyLabel": "Qty",
                  },
                  "intlRestrictedMessage": "intlRestrictedMessage",
                  "limitedAvailability": "limitedAvailability",
                  "limitedAvailabilityMsg": "limitedAvailabilityMsg",
                }
              }
              onClientError={[Function]}
              onModalHide={[Function]}
              onSuccess={[Function]}
              prodId=""
              productId=""
              quickViewSwatchDetails={
                Object {
                  "skuId": "12345",
                }
              }
              refNum={null}
              refnum={null}
              registryId="121212"
              registryProductInfo={
                Object {
                  "ggRegItemStatus": true,
                  "purchased": false,
                  "qtyPurchased": "5",
                  "qtyRequested": "1",
                  "sKUDetailVO": Object {
                    "displayName": "Test",
                    "upc": "upc",
                  },
                  "skuInStore": "1",
                }
              }
              sKUDetailVO={
                Object {
                  "intlRestricted": "1212",
                  "ltlItem": "1212",
                  "minimumQty": 1,
                  "parentProdId": "1212",
                  "size": "1212",
                  "skuId": "1212",
                  "swatch": "1212",
                }
              }
              selectedCheckboxFilter="store-pickup"
              siteId="BedBathUS"
              skuId="12345"
              skuIdentifier="GG"
              skuInStore="1"
              storeDetails={
                Object {
                  "commonName": "store",
                  "storeId": "1",
                }
              }
            />
          </PureComponent(Cell)>
        </div>
      </div>
    </div>
  </div>
</div>
```

