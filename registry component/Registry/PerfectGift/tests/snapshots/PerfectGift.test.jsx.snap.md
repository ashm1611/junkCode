# `app/components/Pages/Registry/PerfectGift/tests/PerfectGift.test.jsx`

#### `should render correctly when isMobile is true`

```
<Fragment>
  <div
    className="perfectGiftImageWrapper mb2"
    data-locator="registery-registery_startbrowsingbanner"
    href="#"
  >
    <div
      className="perfectGiftImageWrapper items-center py15 px2"
      style={
        Object {
          "backgroundImage": "url(//undefined)",
        }
      }
    >
      <Heading
        className="perfectGiftHead"
        level={6}
      >
        Dont see the perfect gift?
      </Heading>
      <PrimaryLink
        data-locator="registery-registery_startbrowsinglink"
        href="#"
        iconProps={
          Object {
            "type": "arrow",
          }
        }
        isIconAfterContent={true}
        onClick={[Function]}
        type="bold"
        variation="primaryWithArrow"
      >
        Start Browising
      </PrimaryLink>
    </div>
  </div>
</Fragment>
```

#### `should render correctly when isMobile is false`

```
<Fragment>
  <div
    className="perfectGiftImageWrapper mb2"
    data-locator="registery-registery_startbrowsingbanner"
    href="#"
  >
    <div
      className="perfectGiftImageWrapper items-center p35"
      style={
        Object {
          "backgroundImage": "url(//undefined)",
        }
      }
    >
      <Heading
        className="perfectGiftHead"
        level={3}
      >
        Dont see the perfect gift?
      </Heading>
      <PrimaryLink
        data-locator="registery-registery_startbrowsinglink"
        href="#"
        iconProps={
          Object {
            "type": "arrow",
          }
        }
        isIconAfterContent={true}
        onClick={[Function]}
        type="bold"
        variation="primaryWithArrow"
      >
        Start Browising
      </PrimaryLink>
    </div>
  </div>
</Fragment>
```

