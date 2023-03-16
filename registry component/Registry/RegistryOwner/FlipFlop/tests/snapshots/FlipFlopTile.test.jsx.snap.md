# `app/components/Pages/Registry/RegistryOwner/FlipFlop/tests/FlipFlopTile.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <Card
    className="tile"
  >
    <div
      className="imageWrapper pt2"
      data-locator="hit-miss-item-image"
    >
      <div
        className="thumbnailWrapper relative flipFlopProductImage"
      >
        <Connect(wrapper)
          className="absolute top-0 right-0 bottom-0 left-0 activeAnchorHeight"
          href="#"
        >
          <Img
            alt=""
            className="activeAnchorImage"
            reactImage={true}
            src="null&op_sharpen=1"
          />
        </Connect(wrapper)>
      </div>
    </div>
    <Price
      className="price"
      dataLocator="hit-miss-item-price"
      maxChars={27}
    />
    <header
      className="title mt2 heading"
      data-locator="hit-miss-item-title"
    >
      <span
        dangerouslySetInnerHTML={
          Object {
            "__html": "",
          }
        }
      />
    </header>
    <Rating
      className="rating"
      dataLocator="hit-miss-item-rating"
      displayPLPFilters={false}
      isNavigable={true}
      isReviewContainerReq={true}
      reviewsLabel=""
      value={0}
    />
    <Connect(wrapper)
      data-locator="hit-miss-item-more-info-link"
      href="/storeundefined"
      onClick={[Function]}
      variation="primary"
    >
      More Info
    </Connect(wrapper)>
  </Card>
</ErrorBoundary>
```

