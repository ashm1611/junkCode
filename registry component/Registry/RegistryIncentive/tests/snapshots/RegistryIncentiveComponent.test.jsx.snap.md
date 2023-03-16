# `app/components/Pages/Registry/RegistryIncentive/tests/RegistryIncentiveComponent.test.jsx`

#### `should render correctly`

```
<div
  className=""
>
  <div
    className="grid-container "
  >
    <div
      className="pt4 pl4 pr4 grid-margin-x pb4 ownerPageIncentivesContainer incentivesContainer"
    >
      <PureComponent(GridX)>
        <PureComponent(Cell)
          className="large-3 small-12 medium-12 pr1 pl1 pb1 incentiveTile"
        >
          <div
            className="base relative"
          >
            <Heading
              className="incentiveHeading mr-auto"
              data-locator="registery-registerymyincentives-top-heading"
              level={2}
            >
              Bonus Gifts
            </Heading>
            <div
              className="pt2 pb1 subHead"
            >
              What are they?
            </div>
            <div
              className="incentiveText"
            >
              Many of the brands you love offer free gifts when family & friends make qualifying purchases from your registry. There’s no better feeling than receiving bonus gifts on top of getting gifts.
            </div>
            <Button
              className="mt4 viewDetails"
              onClick={[Function]}
              theme="secondaryStrokeBasic"
            >
              <span
                className=""
              >
                View All Incentives
              </span>
            </Button>
          </div>
        </PureComponent(Cell)>
        <RegistryIncentiveItem
          incentiveInfo={
            Object {
              "test": "test",
            }
          }
          pageName={
            Object {
              "RegistryIncentives": Object {
                "referredContent": Array [
                  Object {
                    "id": "16385",
                    "key": "createRegistryIncentiveBanner",
                  },
                ],
              },
              "allIncentives": "All Incentives",
            }
          }
        />
        <RegistryIncentiveItem
          incentiveInfo={
            Object {
              "test": "test",
            }
          }
          pageName={
            Object {
              "RegistryIncentives": Object {
                "referredContent": Array [
                  Object {
                    "id": "16385",
                    "key": "createRegistryIncentiveBanner",
                  },
                ],
              },
              "allIncentives": "All Incentives",
            }
          }
        />
      </PureComponent(GridX)>
    </div>
  </div>
</div>
```

#### `should render Loader when isFetching is true`

```
<div
  className=""
>
  <Skeleton
    className=""
    count={1}
    height="100"
  />
</div>
```

#### `should render correctly with One referredContent`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="mt3 sm-mt0"
  >
    <CreateRegistryWithUsBanner
      isRegistryIncentive={true}
    />
  </div>
</ErrorBoundary>
```

#### `should render correctly with referredContent when enableCSLabels is true`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="mt3 sm-mt0"
  />
</ErrorBoundary>
```

#### `should render correctly with One referredContent when enableCSLabels is true`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="mt3 sm-mt0"
  />
</ErrorBoundary>
```

