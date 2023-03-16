# `app/components/Pages/Registry/RegistryOwner/RegistryQuickAddComponent/RegistryQuickAddProductTile/tests/RegistryQuickAddProductTile.test.jsx`

#### `should render correctly without added item into registry`

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID="179129964858814p"
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6>
      $39.99
    </h6>
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/store/product/fridababy-reg-baby-basics-kit/5174122"
        onClick={[Function]}
      >
        <wrapper>
          DISPLAY_NAME
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "quickAddToRegistryBtn ",
              "iconProps": undefined,
              "role": null,
              "theme": "secondaryStrokeBasic",
              "variation": "inlineFlex",
            },
            "children": "Add TO Registry",
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        imageUrl={
          Array [
            "",
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        price="$39.99"
        prodId="5174122"
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryId="12345678"
        registryLabels="createRegistry"
        selectedProduct={
          Object {
            "DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_SCENE7_URL": "179129964858814p",
          }
        }
        skuId="64858814"
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render when isItemAlreadyAddedToRegistry is false and enableNewRegDashboard is true`

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID=""
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6 />
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/storeundefined"
        onClick={[Function]}
      >
        <wrapper>
          undefined
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "plusIconAddedItem",
              "iconProps": Object {
                "className": false,
                "height": "10",
                "type": "plus",
                "width": "10",
              },
              "role": null,
              "theme": "ghost",
              "variation": "circle",
            },
            "children": null,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={true}
        imageUrl={
          Array [
            null,
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        prodId=""
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels="createRegistry"
        selectedProduct={
          Object {
            "DISPLAY_NAME": undefined,
            "SKU_DISPLAY_NAME": undefined,
            "SKU_SCENE7_URL": undefined,
          }
        }
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render when enableCSLabels is true`

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID="179129964858814p"
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6>
      $39.99
    </h6>
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/store/product/fridababy-reg-baby-basics-kit/5174122"
        onClick={[Function]}
      >
        <wrapper>
          DISPLAY_NAME
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "plusIconAddedItem plusIcon",
              "iconProps": Object {
                "className": false,
                "height": "10",
                "type": "plus",
                "width": "10",
              },
              "role": null,
              "theme": "ghost",
              "variation": "circle",
            },
            "children": null,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={true}
        imageUrl={
          Array [
            "",
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        price="$39.99"
        prodId="5174122"
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels={
          Object {
            "createRegistry": "createRegistry",
          }
        }
        selectedProduct={
          Object {
            "DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_SCENE7_URL": "179129964858814p",
          }
        }
        skuId="64858814"
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render when isItemAlreadyAddedToRegistry and enableNewRegDashboard is true `

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID="179129964858814p"
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6>
      $39.99
    </h6>
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/store/product/fridababy-reg-baby-basics-kit/5174122"
        onClick={[Function]}
      >
        <wrapper>
          DISPLAY_NAME
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "succColor",
              "iconProps": Object {
                "className": false,
                "height": "10",
                "type": false,
                "width": "10",
              },
              "role": "text",
              "theme": "ghost",
              "variation": "noTransition",
            },
            "children": undefined,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={true}
        imageUrl={
          Array [
            "",
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        price="$39.99"
        prodId="5174122"
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels={
          Object {
            "createRegistry": "createRegistry",
          }
        }
        selectedProduct={
          Object {
            "DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_SCENE7_URL": "179129964858814p",
          }
        }
        skuId="64858814"
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render when isMobile is false and enableNewRegDashboard is true `

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID="179129964858814p"
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6>
      $39.99
    </h6>
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/store/product/fridababy-reg-baby-basics-kit/5174122"
        onClick={[Function]}
      >
        <wrapper>
          DISPLAY_NAME
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "quickAddToRegistryBtn ",
              "iconProps": Object {
                "className": "disabledIcon",
                "height": "10",
                "type": false,
                "width": "10",
              },
              "role": "text",
              "theme": "primarySuccess",
              "variation": "inlineFlex",
            },
            "children": undefined,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={false}
        imageUrl={
          Array [
            "",
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        price="$39.99"
        prodId="5174122"
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels="createRegistry"
        selectedProduct={
          Object {
            "DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_SCENE7_URL": "179129964858814p",
          }
        }
        skuId="64858814"
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render`

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID=""
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6 />
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/storeundefined"
        onClick={[Function]}
      >
        <wrapper>
          undefined
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "plusIconAddedItem",
              "iconProps": Object {
                "height": "10",
                "type": "plus",
                "width": "10",
              },
              "role": null,
              "theme": "secondaryWhiteDeactivated",
              "variation": null,
            },
            "children": null,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={true}
        imageUrl={
          Array [
            null,
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        prodId=""
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels="createRegistry"
        selectedProduct={
          Object {
            "DISPLAY_NAME": undefined,
            "SKU_DISPLAY_NAME": undefined,
            "SKU_SCENE7_URL": undefined,
          }
        }
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render 1`

```
<PureComponent(GridX)
  className="fullHeight"
>
  <PureComponent(Cell)
    className="large-5"
  >
    <ImgSrcSet
      imageSrc={
        Object {
          "height": "272",
          "preset": "content",
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
      scene7imageID="179129964858814p"
      srcSet={
        Array [
          Object {
            "height": "272",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "272",
          },
          Object {
            "height": "408",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "408",
          },
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="desc large-7 lg-pl2 lg-pr1 flex flex-column"
  >
    <h6>
      $39.99
    </h6>
    <div
      className="pb1"
    >
      <PrimaryLink
        href="/store/product/fridababy-reg-baby-basics-kit/5174122"
        onClick={[Function]}
      >
        <wrapper>
          DISPLAY_NAME
        </wrapper>
      </PrimaryLink>
    </div>
    <div
      className="marginTop grid-x"
    >
      <AddToRegistry
        addToRegistryState={
          Object {
            "data": "",
            "error": "",
            "productId": "",
          }
        }
        buttonProps={
          Object {
            "attr": Object {
              "className": "succColor",
              "iconProps": Object {
                "height": "10",
                "type": null,
                "width": "10",
              },
              "role": "text",
              "theme": "primarySuccess",
              "variation": "noTransition",
            },
            "children": undefined,
            "disabled": false,
          }
        }
        calledFromRegistry={true}
        ctaType="button"
        disableATRModal={true}
        enableNewRegDashboard={true}
        imageUrl={
          Array [
            "",
          ]
        }
        isATRRM={true}
        isCustomizationRequired={false}
        isLazyLoad={false}
        ltlFlag="false"
        ltlShipMethod={null}
        preventLabelOverride={true}
        price="$39.99"
        prodId="5174122"
        qty={1}
        quickAddToRegistry={true}
        refNum=""
        registryLabels="createRegistry"
        selectedProduct={
          Object {
            "DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_DISPLAY_NAME": "DISPLAY_NAME",
            "SKU_SCENE7_URL": "179129964858814p",
          }
        }
        skuId="64858814"
      />
    </div>
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

