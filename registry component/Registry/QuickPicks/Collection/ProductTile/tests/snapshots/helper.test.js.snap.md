# `app/components/Pages/Registry/QuickPicks/Collection/ProductTile/tests/helper.test.js`

#### `should render correctly`

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId36",
      "role": "region",
    }
  }
  className="base"
  type="tight"
>
  <div
    className="headerSpacer"
  />
  <div
    className="wrapper"
  >
    <div
      className="thumbnailWrapper relative"
    >
      <PrimaryLink
        className="absolute top-0 right-0 bottom-0 left-0"
        href="undefinedundefined?categoryId=3"
      >
        <Thumbnail
          alt=""
          isScene7UrlPrefix={true}
          lazyLoad={false}
          lazyLoadOptions={
            Object {
              "offset": 1500,
              "placeholder": "/static/assets/images/product-image-placeholder.png",
            }
          }
        />
      </PrimaryLink>
      <div
        className="quickViewWrapper absolute bottom-0 mb1 xs-hide sm-hide md-hide fullWidth"
      >
        <n
          className="quickViewButton block mx-auto"
          label=""
          onClick={[Function]}
          theme="secondaryStrokeBasic"
        />
      </div>
    </div>
    <Price
      className="price mt2"
      maxChars={27}
      noWrap={true}
      priceLabels={
        Object {
          "customizePrice": "Customize to see Price",
          "discountedInCart": "See Discount Price in Cart",
          "fullPriceInCart": "See Full Price in Cart",
          "priceVariations": "* Price variations may have occurred",
          "pricetbd": "Personalize to See Price",
          "was": "Was",
        }
      }
    />
    <header
      className="title mt2"
      id="tileTitleId36"
    >
      <PrimaryLink
        href="undefinedundefined?categoryId=3"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "",
            }
          }
        />
      </PrimaryLink>
    </header>
  </div>
</Card>
```

#### `should render correctly with enableCSLabels`

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId37",
      "role": "region",
    }
  }
  className="base"
  type="tight"
>
  <div
    className="headerSpacer"
  />
  <div
    className="wrapper"
  >
    <div
      className="thumbnailWrapper relative"
    >
      <PrimaryLink
        className="absolute top-0 right-0 bottom-0 left-0"
        href="undefinedundefined?categoryId=3"
      >
        <Thumbnail
          alt=""
          isScene7UrlPrefix={true}
          lazyLoad={false}
          lazyLoadOptions={
            Object {
              "offset": 1500,
              "placeholder": "/static/assets/images/product-image-placeholder.png",
            }
          }
        />
      </PrimaryLink>
      <div
        className="quickViewWrapper absolute bottom-0 mb1 xs-hide sm-hide md-hide fullWidth"
      >
        <n
          className="quickViewButton block mx-auto"
          label=""
          onClick={[Function]}
          theme="secondaryStrokeBasic"
        />
      </div>
    </div>
    <Price
      className="price mt2"
      maxChars={27}
      noWrap={true}
      priceLabels={
        Object {
          "customizePrice": "Customize to see Price",
          "discountedInCart": "See Discount Price in Cart",
          "fullPriceInCart": "See Full Price in Cart",
          "priceVariations": "* Price variations may have occurred",
          "pricetbd": "Personalize to See Price",
          "was": "Was",
        }
      }
    />
    <header
      className="title mt2"
      id="tileTitleId37"
    >
      <PrimaryLink
        href="undefinedundefined?categoryId=3"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "",
            }
          }
        />
      </PrimaryLink>
    </header>
  </div>
</Card>
```

