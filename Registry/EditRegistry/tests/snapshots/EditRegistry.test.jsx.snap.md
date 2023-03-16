# `app/containers/Pages/Registry/EditRegistry/tests/EditRegistry.test.jsx`

#### `should render Wedding registry correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <div
    className="details inline-block mr0 xs-mr2"
  >
    <EditRegistryComponent
      atDateFlag={false}
      checkFormSubmit={[Function]}
      coRegEmailFlag={[Function]}
      editStoredValueOptIn={false}
      enableRBYRFeatureConfig={false}
      getEditRegistryData={[Function]}
      handleEditRegistryClick={[Function]}
      hideMoveInfo={[Function]}
      hideShippingInfo={[Function]}
      isFetchingEditRegistryDetails={true}
      isPublic="1"
      isRegistryRBYRIncluded={true}
      isRegistryRBYRSelected={false}
      isTymTabClicked={false}
      labels={
        Object {
          "test": "key",
        }
      }
      onDeviceModalClose={[Function]}
      onDeviceVerificationModalOpen={[Function]}
      onSelectRBYROption={[Function]}
      onSelectSubscribe={[Function]}
      onSelectThirdPartyOption={[Function]}
      registryDetails={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "Wedding",
            },
          },
          "test": "value",
        }
      }
      registryID="123456"
      setEditRegistryFlag={[Function]}
      setIsChunkLoaded={[Function]}
      showMoveInfo={[Function]}
      showShippingInfo={[Function]}
      signInDetails={
        Object {
          "editText": "Edit",
        }
      }
      stateObj={
        Object {
          "addressOne": "",
          "addressOneError": "",
          "addressTwo": "",
          "addressTwoError": "",
          "apartment": "",
          "apartmentError": "",
          "babyExpectedArivalDate": "",
          "babyExpectedArivalDateError": "",
          "babyGender": "",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyNurseryTheme": "",
          "city": "",
          "cityError": "",
          "coEmail": "",
          "coEmailError": "",
          "coFirstName": "",
          "coFirstNameError": "",
          "coGender": "",
          "coLastName": "",
          "coLastNameError": "",
          "coRegProfileStatus": "false",
          "college": "",
          "collegeError": "",
          "confirmPassword": "",
          "confirmPasswordError": true,
          "email": "",
          "emailError": "",
          "emailInfo": "",
          "errorMessages": Object {
            "message": "test:test",
          },
          "eventDate": "",
          "eventDateError": "",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "",
          "futureShippingDate": "",
          "gender": "",
          "groupGiftInitialStateOptIn": false,
          "groupGiftOptIn": false,
          "guests": "",
          "guestsError": "",
          "isContactAddressChanged": false,
          "isEditModalOpen": false,
          "isMovingSoonChanged": false,
          "isProfileExist": false,
          "isPublic": "",
          "isRegistryTypeOpen": false,
          "isShippingAddressChanged": false,
          "iscoRegEmailFlag": false,
          "lastName": "",
          "lastNameError": "",
          "mobilePh": "",
          "mobilePhError": "",
          "modalMountedState": false,
          "moveInAddressOne": "",
          "moveInAddressTwo": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInCity": "",
          "moveInCountry": "",
          "moveInState": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "moveInZip": "",
          "password": "",
          "passwordError": true,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "shippingApartment": "",
          "shippingApartmentError": "",
          "shippingCity": "",
          "shippingCityError": "",
          "shippingPhone": "",
          "shippingPhoneError": "",
          "shippingState": "",
          "shippingStateError": "",
          "shippingStreet": "",
          "shippingStreetError": "",
          "shippingZip": "",
          "shippingZipError": "",
          "showMoveInInfo": false,
          "showShippingInfo": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "storedValueOptIn": false,
          "street": "",
          "streetError": "",
          "subscribeSelected": false,
          "thirdPartySelected": false,
          "zip": "",
          "zipError": "",
        }
      }
      toggleModalState={[Function]}
      updateState={[Function]}
      updateTymTabClickStatus={[Function]}
    />
  </div>
</ErrorBoundary>
```

#### `should render blank when registryDetails are not present correctly`

```
""
```

#### `componentWillReceiveProps: empty updatedState with blank registryDetails`

```
""
```

