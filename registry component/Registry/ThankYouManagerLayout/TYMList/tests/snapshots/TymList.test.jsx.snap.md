# `app/components/Pages/Registry/ThankYouManagerLayout/TYMList/tests/TymList.test.jsx`

#### `should render correctly for Mobile`

```
<Fragment>
  <PureComponent(Cell)
    className="listsWrapper"
  >
    <div
      className="grid-container pt3"
    >
      <div
        className="grid-x headingUnderline"
      >
        <ul
          className="mb3 sm-mb2 hideOnPrint TymList grid-x"
        >
          <li
            className="pr3"
          >
            <TymEmail
              labels={
                Object {
                  "giftReceivedLbl": "Gift received",
                  "giftReturnedLbl": "Gift returned",
                  "markAsSentLbl": "MARK AS SENT",
                  "printTylLbl": "Print",
                }
              }
            />
          </li>
        </ul>
      </div>
    </div>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="listsWrapper"
  >
    <TYMFilters
      isMobile={
        Object {
          "isMobileScreen": true,
        }
      }
      labels={
        Object {
          "giftReceivedLbl": "Gift received",
          "giftReturnedLbl": "Gift returned",
          "markAsSentLbl": "MARK AS SENT",
          "printTylLbl": "Print",
        }
      }
      location={
        Object {
          "search": "?skuAdded=67742813",
        }
      }
      scene7URL={
        Object {
          "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
        }
      }
      tymListItems={
        Array [
          Object {},
          Object {},
          Object {},
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="listsWrapper pb3"
  >
    <ul
      className="grid-container"
    >
      <TYMRow
        handleCallback={[Function]}
        isMobile={
          Object {
            "isMobileScreen": true,
          }
        }
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        location={
          Object {
            "search": "?skuAdded=67742813",
          }
        }
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={0}
      />
      <TYMRow
        handleCallback={[Function]}
        isMobile={
          Object {
            "isMobileScreen": true,
          }
        }
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        location={
          Object {
            "search": "?skuAdded=67742813",
          }
        }
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={1}
      />
      <TYMRow
        handleCallback={[Function]}
        isMobile={
          Object {
            "isMobileScreen": true,
          }
        }
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        location={
          Object {
            "search": "?skuAdded=67742813",
          }
        }
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={2}
      />
      <withReducer(Connect(wrapper))
        variation="registryQuickView"
      />
    </ul>
  </PureComponent(Cell)>
</Fragment>
```

#### `should render correctly`

```
<Fragment>
  <PureComponent(Cell)
    className="listsWrapper"
  >
    <div
      className="grid-container pt3"
    >
      <div
        className="grid-x headingUnderline"
      >
        <Heading
          className="heading mr-auto"
          level={2}
          styleVariation="h3-sans"
        >
          ThankYouListLbl
        </Heading>
        <ul
          className="mb3 sm-mb2 hideOnPrint TymList grid-x"
        >
          <HideOnTbs>
            <li
              className="pl3"
            >
              <PrimaryLink
                className="downloadTYM"
                href="/apis/stateful/v1.0/thankyoumanager/downloadtymlist?registryId=undefined"
                iconProps={
                  Object {
                    "height": 20,
                    "type": "download",
                    "width": 20,
                  }
                }
                isIconAfterContent={false}
                name="hideDetail"
                onClick={[Function]}
                target="_blank"
                type="bold"
              >
                downloadTylLbl
              </PrimaryLink>
            </li>
          </HideOnTbs>
          <li
            className="pl3"
          >
            <TymEmail
              labels={
                Object {
                  "giftReceivedLbl": "Gift received",
                  "giftReturnedLbl": "Gift returned",
                  "markAsSentLbl": "MARK AS SENT",
                  "printTylLbl": "Print",
                }
              }
            />
          </li>
          <li
            className="pl3"
          >
            <PrimaryLink
              className="downloadTYM"
              href="#"
              iconProps={
                Object {
                  "height": 20,
                  "type": "print-registry",
                  "width": 20,
                }
              }
              isIconAfterContent={false}
              onClick={[Function]}
              type="bold"
            >
              Print
            </PrimaryLink>
          </li>
        </ul>
      </div>
    </div>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="listsWrapper"
  >
    <TYMFilters
      isMobile={
        Object {
          "isMobileScreen": false,
        }
      }
      isQuickViewOpen={true}
      labels={
        Object {
          "giftReceivedLbl": "Gift received",
          "giftReturnedLbl": "Gift returned",
          "markAsSentLbl": "MARK AS SENT",
          "printTylLbl": "Print",
        }
      }
      scene7URL={
        Object {
          "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
        }
      }
      tymListItems={
        Array [
          Object {},
          Object {},
          Object {},
        ]
      }
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="listsWrapper pb3"
  >
    <ul
      className="grid-container"
    >
      <TYMRow
        isMobile={
          Object {
            "isMobileScreen": false,
          }
        }
        isQuickViewOpen={true}
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={0}
      />
      <TYMRow
        isMobile={
          Object {
            "isMobileScreen": false,
          }
        }
        isQuickViewOpen={true}
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={1}
      />
      <TYMRow
        isMobile={
          Object {
            "isMobileScreen": false,
          }
        }
        isQuickViewOpen={true}
        key="undefined"
        labels={
          Object {
            "giftReceivedLbl": "Gift received",
            "giftReturnedLbl": "Gift returned",
            "markAsSentLbl": "MARK AS SENT",
            "printTylLbl": "Print",
          }
        }
        listItem={Object {}}
        scene7URL={
          Object {
            "url": "\"https://s7d2.scene7.com/is/image/BedBathandBeyond/",
          }
        }
        tealiumData={
          Object {
            "registryData": Object {
              "favouriteCategoryIdList": Array [],
              "favouriteCategoryNameList": Array [],
              "registrySummaryVO": "",
            },
          }
        }
        tymListItems={
          Array [
            Object {},
            Object {},
            Object {},
          ]
        }
        uniqueKey={2}
      />
      <withReducer(Connect(wrapper))
        variation="registryQuickView"
      />
    </ul>
  </PureComponent(Cell)>
</Fragment>
```

