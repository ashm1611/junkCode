# `app/components/Pages/Registry/Dashboard/ImageWrapper/tests/ImageWrapper.test.jsx`

#### `should render correctly`

```
<div
  className="large-2"
>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div>
      <img
        alt=""
        src="https://via.placeholder.com/150x150"
      />
    </div>
  </ErrorBoundary>
</div>
```

#### `should render days left displayed when >=0 `

```
<div
  className="large-2"
>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div>
      <div>
        <h3 />
      </div>
    </div>
    <Paragraph
      className="daysToGo"
      theme="base"
      weight=""
    >
      <span
        className="mb0"
      >
        10
      </span>
      <span
        className=""
      >
        Days
      </span>
    </Paragraph>
  </ErrorBoundary>
</div>
```

#### `should render days left hidden when <0 `

```
<div
  className="large-2"
>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div>
      <withReducer(Connect(wrapper))
        dataID="socialannex"
        isAsync={true}
        isEnabled={true}
        nonExperience={true}
        pageName="REGISTRYDASHBOARD"
        reInjectOnUpdate={true}
        sa_id="sa_s22_instagram"
        sa_instagram_registry_is_owner_view="1"
        sa_instagram_user_email="test@test.com"
        selector="head"
        socialAnnex={true}
      />
    </div>
  </ErrorBoundary>
</div>
```

#### `should render SocialAnnex component with email prop as true`

```
<div
  className="large-2"
>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <div>
      <div>
        <h3>
          MP
        </h3>
      </div>
    </div>
  </ErrorBoundary>
</div>
```

#### `should render correctly for default 1`

```
<ImageWrapper
  giftGiver={true}
  makeReviewYourProductsConfig={
    Object {
      "uploadPhoto": true,
    }
  }
  props={
    Object {
      "giftGiver": true,
      "numberOfDays": null,
      "styles": Object {
        "daysToGo": "daysToGo",
      },
    }
  }
  styles={
    Object {
      "daysToGo": "daysToGo",
      "imageWrapper": "",
    }
  }
>
  <div
    className="large-2"
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <div>
        <div>
          <h3 />
        </div>
      </div>
    </ErrorBoundary>
  </div>
</ImageWrapper>
```

#### `should render correctly for Thumb 2`

```
<ImageWrapper
  giftGiver={true}
  makeReviewYourProductsConfig={
    Object {
      "uploadPhoto": true,
    }
  }
  props={
    Object {
      "giftGiver": false,
      "numberOfDays": null,
      "styles": Object {
        "daysToGo": "daysToGo",
      },
    }
  }
  styles={
    Object {
      "daysToGo": "daysToGo",
      "imageWrapper": "",
    }
  }
>
  <div
    className="large-2"
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <div>
        <div>
          <h3 />
        </div>
      </div>
    </ErrorBoundary>
  </div>
</ImageWrapper>
```

#### `should render SocialAnnex component getSocialAnnexImage`

```
<ImageWrapper
  getSocialAnnexImag={[Function]}
  giftGiver={true}
  makeReviewYourProductsConfig={
    Object {
      "uploadPhoto": true,
    }
  }
  props={
    Object {
      "giftGiver": false,
      "numberOfDays": null,
      "styles": Object {
        "daysToGo": "daysToGo",
      },
    }
  }
  styles={
    Object {
      "daysToGo": "daysToGo",
      "imageWrapper": "",
    }
  }
>
  <div
    className="large-2"
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <div>
        <div>
          <h3 />
        </div>
      </div>
    </ErrorBoundary>
  </div>
</ImageWrapper>
```

