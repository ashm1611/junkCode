# `app/components/Pages/Registry/EmailFrequency/tests/RecommendEmailFrequency.test.jsx`

#### `should render correctly with default props`

```
<div
  className="container pt03"
>
  <div
    className="grid-container"
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="large-8 small-12"
      >
        <BuildYourRegistry
          contentData={
            Array [
              Object {
                "abc": "test",
              },
            ]
          }
          contentId="5151"
          contentState={
            Object {
              "content": Object {
                "5151": Array [
                  Object {
                    "abc": "test",
                  },
                ],
              },
            }
          }
          getContent={[Function]}
          inviteMoreFriendsModal={true}
          labels={
            Object {
              "registryDetails": "ab",
            }
          }
          recommendationList={
            Object {
              "emailOptIn": 1,
            }
          }
          registryData={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "registryId": "2342",
                },
              },
            }
          }
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4 small-12 mb35 mainContainer"
      >
        <PureComponent(GridX)
          className="grid-container"
        >
          <PureComponent(Cell)
            className="small-12"
          >
            <Heading
              className="heading headingContainer"
              level={2}
            >
              Stay in the Loop
               
            </Heading>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="small-12 mb2"
          >
            <Paragraph
              className="description"
              theme="base"
              weight=""
            >
              How often would you like an email outlining your recommended items?
            </Paragraph>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="small-12 mb2"
          >
            <ul
              className="fullWidth"
            >
              <PureComponent(GridX)>
                <li
                  className="radiowrapper inline-block small-6"
                >
                  <InputRadio
                    checked={false}
                    id="frequencyDaily"
                    labelContent="Daily"
                    labelProps={Object {}}
                    locator=""
                    name="frequencyOption"
                    onChange={[Function]}
                    sendLabelProps={true}
                    value="0"
                    wrapperProps={Object {}}
                  />
                </li>
                <li
                  className="radiowrapper inline-block small-6"
                >
                  <InputRadio
                    checked={true}
                    id="frequencyWeekly"
                    labelContent="Weekly"
                    labelProps={Object {}}
                    locator=""
                    name="frequencyOption"
                    onChange={[Function]}
                    sendLabelProps={true}
                    value="1"
                    wrapperProps={Object {}}
                  />
                </li>
              </PureComponent(GridX)>
            </ul>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="small-12 mb3"
          >
            <ul
              className="fullWidth"
            >
              <PureComponent(GridX)>
                <li
                  className="radiowrapper inline-block small-6"
                >
                  <InputRadio
                    checked={false}
                    id="frequencyMonthly"
                    labelContent="Monthly"
                    labelProps={Object {}}
                    name="frequencyOption"
                    onChange={[Function]}
                    sendLabelProps={true}
                    value="2"
                    wrapperProps={Object {}}
                  />
                </li>
                <li
                  className="radiowrapper inline-block small-6"
                >
                  <InputRadio
                    checked={false}
                    id="frequencyNever"
                    labelContent="Never"
                    labelProps={Object {}}
                    name="frequencyOption"
                    onChange={[Function]}
                    sendLabelProps={true}
                    value="-1"
                    wrapperProps={Object {}}
                  />
                </li>
              </PureComponent(GridX)>
            </ul>
          </PureComponent(Cell)>
          <Button
            aria-label="Save"
            className={null}
            onClick={[Function]}
            theme="secondary"
            type="button"
            variation="fullWidth"
          >
            Save
          </Button>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </div>
</div>
```

