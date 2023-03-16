# `app/components/Pages/Registry/RegistryOwner/RegistryAnalyzer/tests/RegistryAnalyzer.test.jsx`

## `MyAnalyzer text and icon`

####   ``should render myAnalyzerTextandIcon when `hasRegAnalyzerBtnShown` is true``

```
<Fragment>
  <PureComponent(GridX)
    className="center hideOnPrint analyzeWrapper pt1 pb1"
    data-locator="registry-analyzebtn"
  >
    <PrimaryLink
      href="#"
      iconProps={
        Object {
          "height": "24px",
          "type": "analyzer",
          "width": "27px",
        }
      }
      onClick={[Function]}
      variation="primaryColoredIcon"
    >
      Analyze My Registry
    </PrimaryLink>
  </PureComponent(GridX)>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    onScrollCallback={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Add something for everyone."
    toggleModalState={[Function]}
    variation="large"
    verticallyCenter={true}
  >
    <UniversalComponent
      hasRegAnalyzerBtnShown={true}
    />
  </ModalDialog>
</Fragment>
```

## `MyAnalyzer Modal`

####   ``should render skeleton when `isRegAnalyzerFetching` is true``

```
<Fragment>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    onScrollCallback={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Add something for everyone."
    toggleModalState={[Function]}
    variation="large"
    verticallyCenter={true}
  >
    <UniversalComponent
      isRegAnalyzerFetching={true}
    />
  </ModalDialog>
</Fragment>
```

####   ``should render ErrorView when `isRegAnalyzerFetching` is false and `regAnalyzerData` is null``

```
<Fragment>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    onScrollCallback={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Add something for everyone."
    toggleModalState={[Function]}
    variation="large"
    verticallyCenter={true}
  >
    <UniversalComponent
      isRegAnalyzerFetching={false}
      regAnalyzerData={null}
    />
  </ModalDialog>
</Fragment>
```

####   ``should render ErrorView  when `isRegAnalyzerFetching` is false, `regAnalyzerData` is not null but `priceRangeList` is null``

```
<Fragment>
  <ModalDialog
    closeIconShow={true}
    mountedState={false}
    onScrollCallback={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Add something for everyone."
    toggleModalState={[Function]}
    variation="large"
    verticallyCenter={true}
  >
    <UniversalComponent
      isRegAnalyzerFetching={false}
      regAnalyzerData={
        Object {
          "defaultNumberOfGuest": 100,
          "priceRangeList": null,
        }
      }
    />
  </ModalDialog>
</Fragment>
```

