# `app/components/Pages/Registry/QuickPicks/Collection/ProductTile/tests/ProductTile.test.jsx`

#### `should render in its simplest form without throwing`

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId14",
      "role": "region",
    }
  }
  className="base js-product-id-123"
  type="tight"
>
  <RQPProductTileHeader
    tooltip="abc"
    tooltipButtonLabel="?"
  />
  <div
    className="wrapper"
  >
    <div
      className="thumbnailWrapper relative"
    >
      <PrimaryLink
        className="absolute top-0 right-0 bottom-0 left-0"
        href="undefined#?categoryId=10002"
      >
        <Thumbnail
          alt="Product title"
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
    />
    <header
      className="title mt2"
      id="tileTitleId14"
      title="Product title"
    >
      <PrimaryLink
        href="undefined#?categoryId=10002"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "Product title",
            }
          }
        />
      </PrimaryLink>
    </header>
    <div
      className="variantsGroup flex flex-column items-start mt2"
    >
      <section
        className="colorGroup flex justify-between items-start content-center"
      >
        <div
          className="attributeGroupWrapper flex items-start"
        >
          <SwatchMenu
            chooseOptionsLabel=""
            className="swatches mt2"
            doRenderSwatchCount={false}
            items={
              Array [
                Object {
                  "image": "https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p",
                  "label": "Black",
                  "size": "5",
                  "skuId": "18828715",
                  "swatchImage": "https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$",
                  "swatchScene7ID": "53759918828715p",
                  "title": "Bugaboo Seat Liner in Black",
                },
                Object {
                  "image": "https://s7d2.scene7.com/is/image/BedBathandBeyond/53759918828715p",
                  "label": "Black",
                  "size": "4",
                  "skuId": "18828715",
                  "swatchImage": "https://s7d2.scene7.com/is/image/BedBathandBeyond/2961713240357s?$48$",
                  "swatchScene7ID": "53759918828715p",
                  "title": "Bugaboo Seat Liner in Black",
                },
              ]
            }
            name="product_123_swatches"
            onChange={[Function]}
            selectedIndex={-1}
            showLabel={false}
            squared={false}
          />
        </div>
      </section>
    </div>
  </div>
  <footer
    className="footer flex items-center"
  >
    <span
      className="weRecommend mx-auto"
    >
      We Recommend 2
    </span>
  </footer>
</Card>
```

#### `should render with no category`

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId25",
      "role": "region",
    }
  }
  className="base js-product-id-123"
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
        href="undefined#?keyword=bar"
      >
        <Thumbnail
          alt="Product title"
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
    />
    <header
      className="title mt2"
      id="tileTitleId25"
      title="Product title"
    >
      <PrimaryLink
        href="undefined#?keyword=bar"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "Product title",
            }
          }
        />
      </PrimaryLink>
    </header>
  </div>
</Card>
```

#### `should render with no category on Mobile`

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId27",
      "role": "region",
    }
  }
  className="base js-product-id-123"
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
        href="undefined#?keyword=bar"
      >
        <Thumbnail
          alt="Product title"
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
    />
    <header
      className="title mt2"
      id="tileTitleId27"
      title="Product title"
    >
      <PrimaryLink
        href="undefined#?keyword=bar"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "Product title",
            }
          }
        />
      </PrimaryLink>
    </header>
  </div>
</Card>
```

```
<Card
  ariaAttributes={
    Object {
      "aria-describedby": "tileTitleId28",
      "role": "region",
    }
  }
  className="base js-product-id-123"
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
        href="undefined#?keyword=bar&color=Black&skuId=18828715"
      >
        <Thumbnail
          alt="Product title"
          isScene7UrlPrefix={true}
          lazyLoad={false}
          lazyLoadOptions={
            Object {
              "offset": 1500,
              "placeholder": "/static/assets/images/product-image-placeholder.png",
            }
          }
          scene7imageID="53759918828715p"
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
    />
    <header
      className="title mt2"
      id="tileTitleId28"
      title="Product title"
    >
      <PrimaryLink
        href="undefined#?keyword=bar&color=Black&skuId=18828715"
      >
        <span
          dangerouslySetInnerHTML={
            Object {
              "__html": "Bugaboo Seat Liner in Black",
            }
          }
        />
      </PrimaryLink>
    </header>
  </div>
</Card>
```

