# `app/components/Pages/Registry/RegistryOwner/RegistryQuickAddComponent/tests/RegistryQuickAddComponent.test.jsx`

#### `should render skeleton`

```
<Skeleton />
```

#### `should render skeleton in new registry flow`

```
<Skeleton />
```

#### `should render null if no item`

```
<PureComponent(GridContainer)
  className="mb2 container container"
>
  <PureComponent(GridX)
    className="mb2 relative"
  >
    <Heading
      className="mt1 mb1 ml-auto mr-auto sm-center sm-mr3"
      level={2}
      styleVariation="h3-serif"
    >
      Need Help Getting Started? Our Experts Recommend These Items...
    </Heading>
    <IconButton
      aria-label="close"
      className="closeBtn absolute"
      onClick={[Function]}
      size="small"
      title="close"
    >
      <Icon
        focusable="false"
        height="16px"
        type="close-icon"
        width="16px"
      />
    </IconButton>
  </PureComponent(GridX)>
  <CustomCarousel
    arrows={true}
    className="arrowButton arrowButtonposition"
    dots={false}
    draggable={false}
    inViewEvent={false}
    infinite={false}
    lazyLoad={false}
    slide={true}
    slidesToScroll={1}
    slidesToShow={4}
  />
  <RegistryQuickAddItemTealiumHandler />
</PureComponent(GridContainer)>
```

#### `should call renderProductTile for mobile when enableNewRegDashboard is true`

```
<PureComponent(GridContainer)
  className="mb2 container container pageContainerNew"
>
  <PureComponent(GridX)
    className="mb2 relative"
  >
    <Heading
      className="mt1 mb1 ml-auto mr-auto sm-center sm-mr3 headingNew"
      level={2}
      styleVariation="h3-serif"
    >
       , here are some of our most requested items to get you started
    </Heading>
  </PureComponent(GridX)>
  <CustomCarousel
    arrows={true}
    className="arrowButton arrowButtonposition"
    dots={false}
    draggable={false}
    inViewEvent={false}
    infinite={false}
    lazyLoad={false}
    slide={true}
    slidesToScroll={1}
    slidesToShow={3}
  />
  <RegistryQuickAddItemTealiumHandler />
</PureComponent(GridContainer)>
```

#### `should call renderProductTile for mobile`

```
<PureComponent(GridContainer)
  className="mb2 container container pageContainerNew"
>
  <PureComponent(GridX)
    className="mb2 relative"
  >
    <Heading
      className="mt1 mb1 ml-auto mr-auto sm-center sm-mr3 headingNew"
      level={2}
      styleVariation="h3-serif"
    >
       , here are some of our most requested items to get you started
    </Heading>
  </PureComponent(GridX)>
  <CustomCarousel
    arrows={true}
    className="arrowButton arrowButtonposition"
    dots={false}
    draggable={false}
    inViewEvent={false}
    infinite={false}
    lazyLoad={false}
    slide={true}
    slidesToScroll={1}
    slidesToShow={3}
  />
  <RegistryQuickAddItemTealiumHandler />
</PureComponent(GridContainer)>
```

