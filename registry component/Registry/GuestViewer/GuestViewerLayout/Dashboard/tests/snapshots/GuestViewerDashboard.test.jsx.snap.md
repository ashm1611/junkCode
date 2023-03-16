# `app/components/Pages/Registry/GuestViewer/GuestViewerLayout/Dashboard/tests/GuestViewerDashboard.test.jsx`

#### `should render correctly`

```
<PureComponent(GridX)
  className="printStyle align-items-center grid-container"
>
  <PureComponent(Cell)
    className="registryWrapper inline-block small-12 large-9"
  >
    <PureComponent(GridX)
      className="grid-margin-x registryContainer"
    >
      <div
        className="imgHold"
      />
      <RegistryDetails
        coRegistrantInitial={null}
        isLoggedIn={Object {}}
        isMobile={false}
        labels={
          Object {
            "registryDetails": Object {},
          }
        }
        numberOfDays={null}
        primaryRegistrantInitial="tt"
        registryData={
          Object {
            "registryResVO": Object {
              "registrySummaryVO": Object {
                "isPublic": "1",
                "primaryRegistrantFirstName": "test",
                "primaryRegistrantLastName": "test",
              },
            },
          }
        }
        registryDetails={
          Object {
            "babyGender": undefined,
            "dashboardTooltip": "Click \"Edit\" to change this setting. (NOTE: Only Public registries are visible to guests)",
            "editRegistryData": undefined,
            "eventDate": undefined,
            "eventLabel": "Event Date",
            "gender": null,
            "genderLabel": "Gender",
            "registryId": undefined,
            "registryIdText": "Registry ID",
            "registrySummaryVO": Object {
              "isPublic": "1",
              "primaryRegistrantFirstName": "test",
              "primaryRegistrantLastName": "test",
            },
            "registryVO": null,
            "userName": "test",
            "visibility": "Public",
            "visibilitylabel": "Registry Visibility",
            "yourAccount": "Is this your account?",
          }
        }
        signInDetails={
          Object {
            "editText": "Edit",
            "isLoggedIn": Object {},
            "signInLabel": "Sign In",
            "signInURL": null,
          }
        }
        styles={
          Object {
            "accessDenied": "accessDenied",
            "breakWord": "breakWord",
            "daysToGo": "daysToGo",
            "daysToGoLabel": "daysToGoLabel",
            "daysToGoNumber": "daysToGoNumber relative",
            "details": "details inline-block",
            "detailsValue": "detailsValue",
            "detailsWrapper": "detailsWrapper inline-block",
            "editLink": "editLink",
            "giftContainer": "giftContainer inline-block",
            "giftGiverRegistered": "giftGiverRegistered relative",
            "giftRegistered": "giftRegistered relative",
            "giftsLabel": "giftsLabel inline-block",
            "giftsNumber": "giftsNumber",
            "h2Serif": "h2Serif",
            "h3Serif": "h3Serif",
            "imageWrapper": "imageWrapper relative",
            "imgHold": "imgHold",
            "photoGuestViewWrapper": "photoGuestViewWrapper",
            "printStyle": "printStyle",
            "regDetailsDL": "regDetailsDL inline-block",
            "registrantImage": "registrantImage",
            "registryContainer": "registryContainer",
            "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
            "registryStats": "registryStats",
            "registryWrapper": "registryWrapper inline-block",
            "tnGiftsPurchased": "tnGiftsPurchased",
            "userName": "userName",
            "userNameStyle": "userNameStyle",
            "visibilityLink": "visibilityLink",
            "visibilityText": "visibilityText",
          }
        }
      />
    </PureComponent(GridX)>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="giftContainer inline-block small-12 large-3 mt1 md-mb3 sm-mb3"
  >
    <GiftWrapper
      giftPurchasedLabel="Purchased"
      giftsAddedLabel="Gifts Added"
      isMobile={false}
      registryDetails={
        Object {
          "babyGender": undefined,
          "dashboardTooltip": "Click \"Edit\" to change this setting. (NOTE: Only Public registries are visible to guests)",
          "editRegistryData": undefined,
          "eventDate": undefined,
          "eventLabel": "Event Date",
          "gender": null,
          "genderLabel": "Gender",
          "registryId": undefined,
          "registryIdText": "Registry ID",
          "registrySummaryVO": Object {
            "isPublic": "1",
            "primaryRegistrantFirstName": "test",
            "primaryRegistrantLastName": "test",
          },
          "registryVO": null,
          "userName": "test",
          "visibility": "Public",
          "visibilitylabel": "Registry Visibility",
          "yourAccount": "Is this your account?",
        }
      }
      styles={
        Object {
          "accessDenied": "accessDenied",
          "breakWord": "breakWord",
          "daysToGo": "daysToGo",
          "daysToGoLabel": "daysToGoLabel",
          "daysToGoNumber": "daysToGoNumber relative",
          "details": "details inline-block",
          "detailsValue": "detailsValue",
          "detailsWrapper": "detailsWrapper inline-block",
          "editLink": "editLink",
          "giftContainer": "giftContainer inline-block",
          "giftGiverRegistered": "giftGiverRegistered relative",
          "giftRegistered": "giftRegistered relative",
          "giftsLabel": "giftsLabel inline-block",
          "giftsNumber": "giftsNumber",
          "h2Serif": "h2Serif",
          "h3Serif": "h3Serif",
          "imageWrapper": "imageWrapper relative",
          "imgHold": "imgHold",
          "photoGuestViewWrapper": "photoGuestViewWrapper",
          "printStyle": "printStyle",
          "regDetailsDL": "regDetailsDL inline-block",
          "registrantImage": "registrantImage",
          "registryContainer": "registryContainer",
          "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
          "registryStats": "registryStats",
          "registryWrapper": "registryWrapper inline-block",
          "tnGiftsPurchased": "tnGiftsPurchased",
          "userName": "userName",
          "userNameStyle": "userNameStyle",
          "visibilityLink": "visibilityLink",
          "visibilityText": "visibilityText",
        }
      }
    />
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render without props`

```
""
```

