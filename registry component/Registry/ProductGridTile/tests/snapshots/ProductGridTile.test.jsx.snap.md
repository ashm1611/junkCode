# `app/components/Pages/Registry/ProductGridTile/tests/ProductGridTile.test.jsx`

#### `should render in its simplest form without throwing`

```
<Fragment>
  <UniversalComponent
    actions={
      Object {
        "ideaBoard": "Idea Board",
        "quickView": "Quick View",
      }
    }
    activeRegistry={
      Object {
        "rehistryId": "12345678",
      }
    }
    attributes={Array []}
    cashfundsModalState={false}
    deviceConfig={
      Object {
        "DESKTOP": 1024,
        "TABLET": 768,
      }
    }
    displayNotifyRegistrantMsg=""
    handleCashFundsModal={[Function]}
    image="//placehold.it/200"
    isMinimumQtyEnabled={true}
    labels={
      Object {
        "createRegistry": Object {},
      }
    }
    markedAsFav={true}
    productId="123"
    purchased={false}
    refNum="123"
    registryList={Array []}
    reviews={0}
    sKUDetailVO={
      Object {
        "activeFlag": true,
        "minimumQty": 2,
        "personalizationType": null,
        "skuImages": Object {
          "mediumImage": Object {},
        },
      }
    }
    title="Product title"
    url="#"
  />
  <Connect(wrapper)
    minWidth={640}
  >
    <div
      className="base wrapper"
    >
      <div
        className="relative"
      >
        <div>
          <span
            className="favText UScolor"
            data-locator="registry-item-tile-fav-badge"
          >
            <Button
              aria-label="FavoriteItemBadge"
              className="favButton"
              iconProps={
                Object {
                  "height": "18px",
                  "type": "heart-double",
                  "width": "18px",
                }
              }
              theme="link"
              variation="noPadding"
            />
            undefined's Favourite
          </span>
        </div>
      </div>
      <div
        className="relative mb2 imageMainContainer"
      >
        <div
          className="imageContainer"
        >
          <PrimaryLink
            className="mobWasPrice imgWrapperDisabled"
            disabledLink={false}
            href="#"
          >
            <ImgSrcSet
              alt=""
              className="thumbnail thumbnail"
              imageSrc={
                Object {
                  "height": "272",
                  "preset": "140",
                  "width": "272",
                }
              }
              isScene7UrlPrefix={true}
              lazyLoad={true}
              lazyLoadOptions={
                Object {
                  "offset": 1500,
                  "placeholder": "/static/assets/images/product-image-placeholder.png",
                }
              }
              placeholder="/static/assets/images/product-default-image.png"
              scene7imageID={Object {}}
              srcSet={
                Array [
                  Object {
                    "height": "272",
                    "preset": "140",
                    "sourceWidth": "1x",
                    "width": "272",
                  },
                  Object {
                    "height": "408",
                    "preset": "140",
                    "sourceWidth": "1.5x",
                    "width": "408",
                  },
                ]
              }
            />
          </PrimaryLink>
        </div>
      </div>
      <Price
        displayDiscountedPrice={false}
        inCart={false}
        mobWasPrice="mobWasPrice"
        personalizationType={null}
        priceColor={false}
        priceStyle="priceStyle"
        refNum="123"
        type="noUnderline"
      />
      <header>
        <wrapper />
      </header>
      <div
        className="productDetailSection"
      >
        <div
          className="qtyAndCtaSection pt2"
        >
          <PureComponent(GridX)
            className="grid-margin-x"
          >
            <PureComponent(Cell)
              className="small-4 large-4"
              tabIndex="0"
            >
              <QuantitySelector
                buttonProps={
                  Object {
                    "theme": "ghostPrimary",
                    "variation": "noHorizontalPadding",
                  }
                }
                data-locator="saveditems_qtydropdown"
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
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="small-8 large-8"
            >
              <LazyLoad
                onInViewPortChange={[Function]}
                placeholder={<div />}
                shouldCallbackonInit={false}
                threshold={1500}
                useDebounce={false}
                useEvent={false}
                waitValue={80}
              >
                <UniversalComponent
                  buttonProps={
                    Object {
                      "attr": Object {
                        "className": "mobCtaHeight staticSection",
                        "data-locator": "registryguest-addtocartdisablebutton",
                        "disabled": true,
                        "iconProps": undefined,
                        "theme": "deactivated",
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
                  onClientError={[Function]}
                  onSuccess={[Function]}
                  parentProductId="123"
                  qty={1}
                  refnum="123"
                  registryUserName=""
                />
              </LazyLoad>
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </div>
        <PureComponent(GridX)
          className="pb2 pt2"
        >
          <PureComponent(Cell)
            className="large-5 small-6"
          >
            <div
              className="requested"
              data-locator="neededQuantity"
              tabIndex="0"
            >
              0 Needed
            </div>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="large-7 small-6"
          >
            <LazyLoad
              onInViewPortChange={[Function]}
              placeholder={<div />}
              shouldCallbackonInit={false}
              threshold={1500}
              useDebounce={false}
              useEvent={false}
              waitValue={80}
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </div>
    </div>
  </Connect(wrapper)>
  <Connect(wrapper)
    maxWidth={639}
  >
    <div
      className="p1 pr2 mobileBase mobAlign"
    >
      <div
        className="imageBase"
      >
        <div
          className="imageContainer"
        >
          <PrimaryLink
            className="mobWasPrice imgWrapperDisabled"
            disabledLink={false}
            href="#"
          >
            <ImgSrcSet
              alt=""
              className="thumbnail thumbnail"
              imageSrc={
                Object {
                  "height": "272",
                  "preset": "140",
                  "width": "272",
                }
              }
              isScene7UrlPrefix={true}
              lazyLoad={true}
              lazyLoadOptions={
                Object {
                  "offset": 1500,
                  "placeholder": "/static/assets/images/product-image-placeholder.png",
                }
              }
              placeholder="/static/assets/images/product-default-image.png"
              scene7imageID={Object {}}
              srcSet={
                Array [
                  Object {
                    "height": "272",
                    "preset": "140",
                    "sourceWidth": "1x",
                    "width": "272",
                  },
                  Object {
                    "height": "408",
                    "preset": "140",
                    "sourceWidth": "1.5x",
                    "width": "408",
                  },
                ]
              }
            />
          </PrimaryLink>
        </div>
        <div
          className="relative"
        >
          <div>
            <span
              className="favText UScolor"
              data-locator="registry-item-tile-fav-badge"
            >
              <Button
                aria-label="FavoriteItemBadge"
                className="favButton"
                iconProps={
                  Object {
                    "height": "18px",
                    "type": "heart-double",
                    "width": "18px",
                  }
                }
                theme="link"
                variation="noPadding"
              />
              undefined's Favourite
            </span>
          </div>
        </div>
        <div
          className="requested"
          data-locator="neededQuantity"
          tabIndex="0"
        >
          0 Needed
        </div>
      </div>
      <div
        className="pl1 imageBase contentBase"
      >
        <header>
          <wrapper />
        </header>
        <Price
          displayDiscountedPrice={false}
          inCart={false}
          mobWasPrice="mobWasPrice"
          personalizationType={null}
          priceColor={false}
          priceStyle="priceStyle"
          refNum="123"
          type="noUnderline"
        />
        <div
          className="productDetailSection"
        >
          <div
            className="productDetailSection"
          >
            <div
              className="qtyAndCtaSection pt2"
            >
              <PureComponent(GridX)
                className="grid-margin-x"
              >
                <PureComponent(Cell)
                  className="small-4 large-4"
                  tabIndex="0"
                >
                  <QuantitySelector
                    buttonProps={
                      Object {
                        "theme": "ghostPrimary",
                        "variation": "noHorizontalPadding",
                      }
                    }
                    data-locator="saveditems_qtydropdown"
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
                </PureComponent(Cell)>
                <PureComponent(Cell)
                  className="small-8 large-8"
                >
                  <LazyLoad
                    onInViewPortChange={[Function]}
                    placeholder={<div />}
                    shouldCallbackonInit={false}
                    threshold={1500}
                    useDebounce={false}
                    useEvent={false}
                    waitValue={80}
                  >
                    <UniversalComponent
                      buttonProps={
                        Object {
                          "attr": Object {
                            "className": "mobCtaHeight staticSection",
                            "data-locator": "registryguest-addtocartdisablebutton",
                            "disabled": true,
                            "iconProps": undefined,
                            "theme": "deactivated",
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
                      onClientError={[Function]}
                      onSuccess={[Function]}
                      parentProductId="123"
                      qty={1}
                      refnum="123"
                      registryUserName=""
                    />
                  </LazyLoad>
                </PureComponent(Cell)>
              </PureComponent(GridX)>
            </div>
            <LazyLoad
              onInViewPortChange={[Function]}
              placeholder={<div />}
              shouldCallbackonInit={false}
              threshold={1500}
              useDebounce={false}
              useEvent={false}
              waitValue={80}
            />
          </div>
        </div>
      </div>
    </div>
  </Connect(wrapper)>
</Fragment>
```

