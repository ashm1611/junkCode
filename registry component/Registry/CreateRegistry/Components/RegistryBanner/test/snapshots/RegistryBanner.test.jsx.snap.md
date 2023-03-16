# `app/components/Pages/Registry/CreateRegistry/Components/RegistryBanner/test/RegistryBanner.test.jsx`

#### `should render correctly`

```
<PureComponent(GridContainer)>
  <PureComponent(GridX)
    className="center content-margin-top pb3 sm-pb1  bannerContainer relative"
  >
    <div
      className="bannerTextContainer"
    >
      <PureComponent(Cell)
        className="small-12 large-12 sm-center"
      >
        <Paragraph
          className="mt0 lg-mb3 md-mb3 sm-mb0 sm-pb1 bannerText"
          theme="base"
          weight=""
        >
          START YOUR REGISTRY
        </Paragraph>
        <Heading
          className="bannerHeading lg-mb1 md-mb1 sm-mb0 sm-pb1"
          data-locator="registry-registrytypeheadinglabel"
          level={1}
        >
          [object Object] Registry
        </Heading>
        <Button
          className={null}
          data-locator="registry-selectadifferenttypelink"
          onClick={[Function]}
          theme="link"
          variation="beaconBlue"
        >
          Select a different type
        </Button>
      </PureComponent(Cell)>
    </div>
    <div
      className="homeButton absolute"
    >
      <Icon
        className="homeCaret"
        focusable="false"
        height="8"
        type="caret"
        width="16"
      />
      <PrimaryLink
        className="ml1"
        data-locator="registry-registryhomelink"
        href="/store/account/my_registries"
      >
        My Registries
      </PrimaryLink>
    </div>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

#### `should render styles based on config key`

```
<PureComponent(GridContainer)
  className="mainContainer"
>
  <PureComponent(GridX)
    className="center content-margin-top pb3 sm-pb1  weddingRegBannerContainer relative relative"
  >
    <div
      className="confettiLeft"
    >
      <Img
        alt=""
        height="188"
        src="/static/assets/images/weddingRegBgLeft.png"
        width="180"
      />
    </div>
    <div
      className="bannerTextContainer"
    >
      <PureComponent(Cell)
        className="weddingRegSection small-12 large-12 sm-center"
      >
        <Heading
          className="weddingRegBannerHeading lg-mb1 md-mb1 sm-mb0 sm-pb1"
          data-locator="registry-registrytypeheadinglabel"
          level={1}
        >
          let's create your wedding registry
        </Heading>
        <Heading
          className="weddingRegistrySmallTextHeading"
          level={4}
        >
          Don't worry, you can add more or edit info later.
        </Heading>
      </PureComponent(Cell)>
    </div>
    <div
      className="wedRegHomeBtn absolute"
    >
      <Icon
        className="homeCaret"
        focusable="false"
        height="8"
        type="caret"
        width="16"
      />
      <PrimaryLink
        className="ml1"
        data-locator="registry-registryhomelink"
        href="/store/account/my_registries"
      >
        My Registries
      </PrimaryLink>
    </div>
    <div
      className="confettiRight"
    >
      <Img
        alt=""
        height="188"
        src="/static/assets/images/weddingRegBgRight.png"
        width="180"
      />
    </div>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

#### `should render styles based on config key for baby registry`

```
<PureComponent(GridContainer)
  className="mainContainer"
>
  <PureComponent(GridX)
    className="center content-margin-top pb3 sm-pb1  babyregbannerContainer relative"
  >
    <div
      className="confettiLeft confettiLeftBaby"
    >
      <Img
        alt=""
        height="188"
        src="/static/assets/images/babyRegBgLeft.png"
        width="180"
      />
    </div>
    <div
      className="bannerTextContainer bannerTextContainerBaby"
    >
      <PureComponent(Cell)
        className="small-12 large-12 sm-center"
      >
        <Paragraph
          className="mt0 lg-mb3 md-mb3 sm-mb0 sm-pb1 babyRegbannerText"
          theme="base"
          weight=""
        />
        <Heading
          className="babyRegBannerHeading lg-mb1 md-mb1 sm-mb0 sm-pb1"
          data-locator="registry-registrytypeheadinglabel"
          level={1}
        >
          Let's create your baby registry
        </Heading>
        <Heading
          className="registrySmallTextHeading"
          level={4}
        >
          Start your registry in less than a minute! You can always add more
              info later.
        </Heading>
      </PureComponent(Cell)>
    </div>
    <div
      className="absolute extraButtonCls"
    >
      <Icon
        className="homeCaret"
        focusable="false"
        height="8"
        type="caret"
        width="16"
      />
      <PrimaryLink
        className="ml1"
        data-locator="registry-registryhomelink"
        href="/store/account/my_registries"
      >
        Registry Home
      </PrimaryLink>
    </div>
    <div
      className="confettiRight confettiRightBaby"
    >
      <Img
        alt=""
        height="188"
        src="/static/assets/images/babyRegBgRight.png"
        width="180"
      />
    </div>
  </PureComponent(GridX)>
</PureComponent(GridContainer)>
```

