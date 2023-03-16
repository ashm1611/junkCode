# `app/components/Pages/Registry/CreateRegistry/Components/FormComponents/test/NetworkInfo.test.jsx`

#### `networkAffiliation should be rendered correctly with all the props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="large-9 small-11"
    >
      <Checkbox
        checked={false}
        data-locator="datalocator-thirdpartycheckbox"
        id="check2"
        islablevisible={true}
        label="Yes, please include my registry in search results on 3rd party sites such as TheKnot.com or TheBump.com."
        name="check2"
        onSelect={[Function]}
        pointer={false}
        type="checkbox"
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</ErrorBoundary>
```

#### `EnableEmailOptIn checkbox should be rendered correctly with all the props`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(Cell)
    className="mt1 mb2"
  >
    <Checkbox
      checked={false}
      islablevisible={true}
      label="Yes, add me to the buybuyBABY email list."
      name="signUpSisterSite"
      onSelect={[Function]}
      pointer={false}
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="mt1 mb2"
  >
    <Checkbox
      checked={false}
      islablevisible={true}
      label="Yes, add me to the Harmon email list."
      name="signUpSisterSite2"
      onSelect={[Function]}
      pointer={false}
    />
  </PureComponent(Cell)>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="large-9 small-11 pb15 flexCell"
    >
      <Checkbox
        aria-label="check1"
        checked={false}
        className="checkboxDisclaimer"
        data-locator="datalocator-unsubscribecheckbox"
        id="check1"
        islablevisible={false}
        name="check1"
        onSelect={[Function]}
        pointer={false}
        type="checkbox"
      />
      <div
        className="renderContent"
      >
        <div>
          Yes, I want to receive exclusive offers (like a registry completion coupon), expert advice, and registry specific updates. Sign me up for Bed Bath & Beyond registry emails! For information on our privacy practices, please visit our
          <PrimaryLink
            className="privacyPolicy"
            href="/store/static/PrivacyPolicy"
            isHardSpaReq={true}
            target="_blank"
            variation="primary"
          >
            Privacy Policy.
          </PrimaryLink>
          California residents: view our Notice of Financial Incentive
          <PrimaryLink
            className="privacyPolicy"
            href="/store/static/PrivacyPolicy#Notice-of-Financial"
            isHardSpaReq={true}
            target="_blank"
            variation="primary"
          >
            here.
          </PrimaryLink>
        </div>
      </div>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <PureComponent(GridX) />
</ErrorBoundary>
```

