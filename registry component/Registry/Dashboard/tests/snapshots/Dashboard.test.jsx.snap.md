# `app/components/Pages/Registry/Dashboard/tests/Dashboard.test.jsx`

#### `should render correctly`

```
""
```

#### `should render correctly when accessPermitted is true`

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
      <UniversalComponent
        coRegistrantInitial={null}
        giftGiver={false}
        isLoggedIn={Object {}}
        isMobile={false}
        isSiteid="BedBathCanada"
        labels={
          Object {
            "registryDetails": Object {},
          }
        }
        numberOfDays={null}
        primaryRegistrantInitial="MP"
        registryData={
          Object {
            "registryResVO": Object {
              "registrySummaryVO": Object {
                "eventType": "Baby",
                "isPublic": "1",
                "primaryRegistrantFirstName": "Manjari",
                "primaryRegistrantLastName": "Prithani",
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
              "eventType": "Baby",
              "isPublic": "1",
              "primaryRegistrantFirstName": "Manjari",
              "primaryRegistrantLastName": "Prithani",
            },
            "registryVO": null,
            "userName": "Manjari",
            "visibility": "Public",
            "visibilitylabel": "Registry Privacy",
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
            "alignIcon": "alignIcon",
            "alignIconNewDashboard": "alignIconNewDashboard",
            "breakWord": "breakWord",
            "daysToGo": "daysToGo",
            "daysToGoLabel": "daysToGoLabel",
            "daysToGoNumber": "daysToGoNumber relative",
            "details": "details inline-block",
            "detailsValue": "detailsValue",
            "detailsWrapper": "detailsWrapper inline-block",
            "editLink": "editLink",
            "giftContainer": "giftContainer inline-block",
            "giftRegistered": "giftRegistered relative",
            "giftsLabel": "giftsLabel inline-block",
            "giftsNumber": "giftsNumber",
            "h2Serif": "h2Serif",
            "h3Serif": "h3Serif",
            "imageWrapper": "imageWrapper relative",
            "imgHold": "imgHold",
            "mobilePhotoGuestViewWrapper": "mobilePhotoGuestViewWrapper",
            "myFundGiftContainer": "myFundGiftContainer inline-block",
            "newImageWrapper": "newImageWrapper",
            "newRegistantImage": "newRegistantImage",
            "newRegistryLayout": "newRegistryLayout",
            "photoGuestViewWrapper": "photoGuestViewWrapper",
            "printStyle": "printStyle",
            "regDetailsDL": "regDetailsDL inline-block",
            "regWithFunds": "regWithFunds",
            "registrantImage": "registrantImage",
            "registryContainer": "registryContainer",
            "registryInfo": "registryInfo",
            "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
            "registryStats": "registryStats",
            "registryWrapper": "registryWrapper inline-block",
            "resetMargin": "resetMargin",
            "tnGiftsPurchased": "tnGiftsPurchased",
            "uploadPhotoRegistryOwner": "uploadPhotoRegistryOwner",
            "userName": "userName",
            "visibilityLink": "visibilityLink",
            "visibilityText": "visibilityText",
          }
        }
      />
    </PureComponent(GridX)>
  </PureComponent(Cell)>
  <ModalDialog
    closeDataLocator="checkout-crossicon"
    titleAriaLabel="SignInModal"
    titleClass="mt1 mb1"
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      inPage={false}
    />
  </ModalDialog>
  <PureComponent(Cell)
    className="giftContainer inline-block small-12 large-3 mt1 md-mb3 sm-mb3"
  >
    <UniversalComponent
      giftPurchasedLabel="Purchased"
      giftSwipSwapLabel="Ship or Swap"
      giftsAddedLabel="Gifts Added"
      isMobile={false}
      isRenderBookAnAppointment={false}
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
            "eventType": "Baby",
            "isPublic": "1",
            "primaryRegistrantFirstName": "Manjari",
            "primaryRegistrantLastName": "Prithani",
          },
          "registryVO": null,
          "userName": "Manjari",
          "visibility": "Public",
          "visibilitylabel": "Registry Privacy",
          "yourAccount": "Is this your account?",
        }
      }
      styles={
        Object {
          "accessDenied": "accessDenied",
          "alignIcon": "alignIcon",
          "alignIconNewDashboard": "alignIconNewDashboard",
          "breakWord": "breakWord",
          "daysToGo": "daysToGo",
          "daysToGoLabel": "daysToGoLabel",
          "daysToGoNumber": "daysToGoNumber relative",
          "details": "details inline-block",
          "detailsValue": "detailsValue",
          "detailsWrapper": "detailsWrapper inline-block",
          "editLink": "editLink",
          "giftContainer": "giftContainer inline-block",
          "giftRegistered": "giftRegistered relative",
          "giftsLabel": "giftsLabel inline-block",
          "giftsNumber": "giftsNumber",
          "h2Serif": "h2Serif",
          "h3Serif": "h3Serif",
          "imageWrapper": "imageWrapper relative",
          "imgHold": "imgHold",
          "mobilePhotoGuestViewWrapper": "mobilePhotoGuestViewWrapper",
          "myFundGiftContainer": "myFundGiftContainer inline-block",
          "newImageWrapper": "newImageWrapper",
          "newRegistantImage": "newRegistantImage",
          "newRegistryLayout": "newRegistryLayout",
          "photoGuestViewWrapper": "photoGuestViewWrapper",
          "printStyle": "printStyle",
          "regDetailsDL": "regDetailsDL inline-block",
          "regWithFunds": "regWithFunds",
          "registrantImage": "registrantImage",
          "registryContainer": "registryContainer",
          "registryInfo": "registryInfo",
          "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
          "registryStats": "registryStats",
          "registryWrapper": "registryWrapper inline-block",
          "resetMargin": "resetMargin",
          "tnGiftsPurchased": "tnGiftsPurchased",
          "uploadPhotoRegistryOwner": "uploadPhotoRegistryOwner",
          "userName": "userName",
          "visibilityLink": "visibilityLink",
          "visibilityText": "visibilityText",
        }
      }
      totalFunds={false}
    />
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

#### `should render correctly when accessPermitted is false`

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
      <UniversalComponent
        coRegistrantInitial={null}
        giftGiver={true}
        isLoggedIn={Object {}}
        isMobile={false}
        isSiteid="BedBathCanada"
        labels={
          Object {
            "registryDetails": Object {},
          }
        }
        numberOfDays={null}
        primaryRegistrantInitial="MP"
        registryData={
          Object {
            "registryResVO": Object {
              "registrySummaryVO": Object {
                "isPublic": "1",
                "primaryRegistrantFirstName": "Manjari",
                "primaryRegistrantLastName": "Prithani",
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
              "primaryRegistrantFirstName": "Manjari",
              "primaryRegistrantLastName": "Prithani",
            },
            "registryVO": null,
            "userName": "Manjari",
            "visibility": "Public",
            "visibilitylabel": "Registry Privacy",
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
            "alignIcon": "alignIcon",
            "alignIconNewDashboard": "alignIconNewDashboard",
            "breakWord": "breakWord",
            "daysToGo": "daysToGo",
            "daysToGoLabel": "daysToGoLabel",
            "daysToGoNumber": "daysToGoNumber relative",
            "details": "details inline-block",
            "detailsValue": "detailsValue",
            "detailsWrapper": "detailsWrapper inline-block",
            "editLink": "editLink",
            "giftContainer": "giftContainer inline-block",
            "giftRegistered": "giftRegistered relative",
            "giftsLabel": "giftsLabel inline-block",
            "giftsNumber": "giftsNumber",
            "h2Serif": "h2Serif",
            "h3Serif": "h3Serif",
            "imageWrapper": "imageWrapper relative",
            "imgHold": "imgHold",
            "mobilePhotoGuestViewWrapper": "mobilePhotoGuestViewWrapper",
            "myFundGiftContainer": "myFundGiftContainer inline-block",
            "newImageWrapper": "newImageWrapper",
            "newRegistantImage": "newRegistantImage",
            "newRegistryLayout": "newRegistryLayout",
            "photoGuestViewWrapper": "photoGuestViewWrapper",
            "printStyle": "printStyle",
            "regDetailsDL": "regDetailsDL inline-block",
            "regWithFunds": "regWithFunds",
            "registrantImage": "registrantImage",
            "registryContainer": "registryContainer",
            "registryInfo": "registryInfo",
            "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
            "registryStats": "registryStats",
            "registryWrapper": "registryWrapper inline-block",
            "resetMargin": "resetMargin",
            "tnGiftsPurchased": "tnGiftsPurchased",
            "uploadPhotoRegistryOwner": "uploadPhotoRegistryOwner",
            "userName": "userName",
            "visibilityLink": "visibilityLink",
            "visibilityText": "visibilityText",
          }
        }
      />
    </PureComponent(GridX)>
  </PureComponent(Cell)>
  <ModalDialog
    closeDataLocator="checkout-crossicon"
    titleAriaLabel="SignInModal"
    titleClass="mt1 mb1"
    underlayClickExits={false}
    variation="small"
    verticallyCenter={true}
  >
    <UniversalComponent
      inPage={false}
    />
  </ModalDialog>
  <PureComponent(Cell)
    className="giftContainer inline-block small-12 large-3 mt1 md-mb3 sm-mb3"
  >
    <UniversalComponent
      giftPurchasedLabel="Purchased"
      giftSwipSwapLabel="Ship or Swap"
      giftsAddedLabel="Gifts Added"
      isMobile={false}
      isRenderBookAnAppointment={false}
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
            "primaryRegistrantFirstName": "Manjari",
            "primaryRegistrantLastName": "Prithani",
          },
          "registryVO": null,
          "userName": "Manjari",
          "visibility": "Public",
          "visibilitylabel": "Registry Privacy",
          "yourAccount": "Is this your account?",
        }
      }
      styles={
        Object {
          "accessDenied": "accessDenied",
          "alignIcon": "alignIcon",
          "alignIconNewDashboard": "alignIconNewDashboard",
          "breakWord": "breakWord",
          "daysToGo": "daysToGo",
          "daysToGoLabel": "daysToGoLabel",
          "daysToGoNumber": "daysToGoNumber relative",
          "details": "details inline-block",
          "detailsValue": "detailsValue",
          "detailsWrapper": "detailsWrapper inline-block",
          "editLink": "editLink",
          "giftContainer": "giftContainer inline-block",
          "giftRegistered": "giftRegistered relative",
          "giftsLabel": "giftsLabel inline-block",
          "giftsNumber": "giftsNumber",
          "h2Serif": "h2Serif",
          "h3Serif": "h3Serif",
          "imageWrapper": "imageWrapper relative",
          "imgHold": "imgHold",
          "mobilePhotoGuestViewWrapper": "mobilePhotoGuestViewWrapper",
          "myFundGiftContainer": "myFundGiftContainer inline-block",
          "newImageWrapper": "newImageWrapper",
          "newRegistantImage": "newRegistantImage",
          "newRegistryLayout": "newRegistryLayout",
          "photoGuestViewWrapper": "photoGuestViewWrapper",
          "printStyle": "printStyle",
          "regDetailsDL": "regDetailsDL inline-block",
          "regWithFunds": "regWithFunds",
          "registrantImage": "registrantImage",
          "registryContainer": "registryContainer",
          "registryInfo": "registryInfo",
          "registryNames": "registryNames flex justify-center items-center flex-none nowrap overflow-hidden",
          "registryStats": "registryStats",
          "registryWrapper": "registryWrapper inline-block",
          "resetMargin": "resetMargin",
          "tnGiftsPurchased": "tnGiftsPurchased",
          "uploadPhotoRegistryOwner": "uploadPhotoRegistryOwner",
          "userName": "userName",
          "visibilityLink": "visibilityLink",
          "visibilityText": "visibilityText",
        }
      }
      totalFunds={false}
    />
  </PureComponent(Cell)>
</PureComponent(GridX)>
```

