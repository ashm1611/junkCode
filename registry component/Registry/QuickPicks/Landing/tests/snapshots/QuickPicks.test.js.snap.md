# `app/components/Pages/Registry/QuickPicks/Landing/tests/QuickPicks.test.js`

#### `should render correctly with default props`

```
<section
  className="js-quickpicks-landing-top"
>
  <ErrorBoundary
    fallback={<InternalServerErrorPage />}
    routeToSystemErrorPage={false}
  >
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell)>
          <div>
            <Connect(wrapper)
              className="center"
              renderBefore="Already have a registry?"
            >
              Sign in
            </Connect(wrapper)>
          </div>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
    <PureComponent(GridContainer)>
      <PureComponent(GridX)>
        <PureComponent(Cell) />
      </PureComponent(GridX)>
    </PureComponent(GridContainer)>
  </ErrorBoundary>
  <Connect(wrapper) />
</section>
```

