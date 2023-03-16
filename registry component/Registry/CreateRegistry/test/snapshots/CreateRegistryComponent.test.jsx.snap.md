# `app/components/Pages/Registry/CreateRegistry/test/CreateRegistryComponent.test.jsx`

#### `form with event type Wedding`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <RegistryBanner
    eventType="Wedding"
    isLoggedIn={true}
    toggleRegistryModalState={[Function]}
  />
  <div
    className="formContainer"
  >
    <RenderCreateRegistryForm
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      currentAddress=""
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      flagOptional={false}
      getCurrentRegistryType={[Function]}
      getRegistryInputs={[Function]}
      guestDefault={100}
      handleSignSisterSite={[Function]}
      hideMoveInfo={[Function]}
      hideShippingInfo={[Function]}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      isModalOpen={false}
      isNewCreateRegForm={false}
      isRegistryRBYRSelected={false}
      labels={Object {}}
      listenProfileStatusChange={[Function]}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      onSelectRBYROption={[Function]}
      onSelectSubscribe={[Function]}
      onSelectThirdPartyOption={[Function]}
      passwordErrorPresent={[Function]}
      profileAddress=""
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "Wedding",
          "id": "DC1500002",
          "public": true,
          "registryInputList": Array [
            Object {
              "fieldName": "eventDate",
            },
            Object {
              "fieldName": "eventType",
            },
          ],
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileHardLockedState={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
      showMoveInfo={[Function]}
      showShippingInfo={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
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
          "coRegistrantName": "",
          "coRegistrantNameError": "",
          "college": "",
          "collegeError": "",
          "confirmPassword": "",
          "confirmPasswordError": false,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "",
          "emailError": "",
          "emailInfo": "",
          "emailOptInSharedSite1": true,
          "emailOptInSharedSite2": true,
          "eventCode": undefined,
          "eventDate": "",
          "eventDateError": "",
          "eventType": "Wedding",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "",
          "futureShippingDate": "",
          "gender": "",
          "guests": "100",
          "guestsError": "",
          "hideAccountDetectedModal": false,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": false,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": undefined,
          "isShippingAddressChanged": false,
          "isV2FormSubmit": false,
          "isV2SignUpFlow": false,
          "lastName": "",
          "lastNameError": "",
          "mobilePh": "",
          "mobilePhError": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "",
          "passwordError": false,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showVerMsg": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "",
          "zipError": "",
        }
      }
      updatePasswordData={[Function]}
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email=""
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

#### `should call clearConfirmPasswordField`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <RegistryBanner
    eventType="Wedding"
    isLoggedIn={true}
    toggleRegistryModalState={[Function]}
  />
  <div
    className="formContainer"
  >
    <RenderCreateRegistryForm
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      currentAddress=""
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      flagOptional={false}
      getCurrentRegistryType={[Function]}
      getRegistryInputs={[Function]}
      guestDefault={100}
      handleSignSisterSite={[Function]}
      hideMoveInfo={[Function]}
      hideShippingInfo={[Function]}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      isModalOpen={false}
      isNewCreateRegForm={false}
      isRegistryRBYRSelected={false}
      labels={Object {}}
      listenProfileStatusChange={[Function]}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      onSelectRBYROption={[Function]}
      onSelectSubscribe={[Function]}
      onSelectThirdPartyOption={[Function]}
      passwordErrorPresent={[Function]}
      profileAddress=""
      profileData={
        Object {
          "email": "",
        }
      }
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "Wedding",
          "id": "DC1500002",
          "public": true,
          "registryInputList": Array [
            Object {
              "fieldName": "eventDate",
            },
            Object {
              "fieldName": "eventType",
            },
          ],
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileHardLockedState={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
      showMoveInfo={[Function]}
      showShippingInfo={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
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
          "coRegistrantName": "",
          "coRegistrantNameError": "",
          "college": "",
          "collegeError": "",
          "confirmPassword": "",
          "confirmPasswordError": false,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "",
          "emailError": "",
          "emailInfo": "",
          "emailOptInSharedSite1": true,
          "emailOptInSharedSite2": true,
          "eventCode": undefined,
          "eventDate": "",
          "eventDateError": "",
          "eventType": "Wedding",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "",
          "futureShippingDate": "",
          "gender": "",
          "guests": "100",
          "guestsError": "",
          "hideAccountDetectedModal": false,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": false,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": undefined,
          "isShippingAddressChanged": false,
          "isV2FormSubmit": false,
          "isV2SignUpFlow": false,
          "lastName": "",
          "lastNameError": "",
          "mobilePh": "",
          "mobilePhError": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "",
          "passwordError": false,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showVerMsg": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "",
          "zipError": "",
        }
      }
      updatePasswordData={[Function]}
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email=""
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

#### `should render for isEmailVerRequired`

```
<Redirect
  push={false}
  to={
    Object {
      "pathname": "/store/account/verifyEmail",
      "state": Object {
        "emailId": "abc@yopmail.com",
        "isLifeStage": true,
      },
    }
  }
/>
```

## `Should Render`

####   `should render skeleton`

```
<Skeleton />
```

####   `form once fetching is done with BABY registry type`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <RegistryBanner
    eventType="Baby"
    isLoggedIn={true}
    toggleRegistryModalState={[Function]}
  />
  <div
    className="formContainer"
  >
    <RenderCreateRegistryForm
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      currentAddress=""
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      flagOptional={false}
      formWrapperData={
        Object {
          "password": Object {
            "value": "test",
          },
        }
      }
      getCurrentRegistryType={[Function]}
      getRegistryInputs={[Function]}
      guestDefault={100}
      handleSignSisterSite={[Function]}
      hideMoveInfo={[Function]}
      hideShippingInfo={[Function]}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      isModalOpen={false}
      isNewCreateRegForm={false}
      isRegistryRBYRSelected={false}
      labels={Object {}}
      listenProfileStatusChange={[Function]}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      onSelectRBYROption={[Function]}
      onSelectSubscribe={[Function]}
      onSelectThirdPartyOption={[Function]}
      passwordErrorPresent={[Function]}
      profileAddress=""
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "Baby",
          "id": "DC1500002",
          "public": true,
          "registryInputList": Array [
            Object {
              "fieldName": "eventDate",
            },
            Object {
              "fieldName": "eventType",
            },
          ],
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileHardLockedState={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
      showMoveInfo={[Function]}
      showShippingInfo={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
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
          "coRegistrantName": "",
          "coRegistrantNameError": "",
          "college": "",
          "collegeError": "",
          "confirmPassword": "",
          "confirmPasswordError": false,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "",
          "emailError": "",
          "emailInfo": "",
          "emailOptInSharedSite1": true,
          "emailOptInSharedSite2": true,
          "eventCode": undefined,
          "eventDate": "",
          "eventDateError": "",
          "eventType": "Baby",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "",
          "futureShippingDate": "",
          "gender": "",
          "guests": "100",
          "guestsError": "",
          "hideAccountDetectedModal": true,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": false,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": false,
          "isShippingAddressChanged": false,
          "isV2FormSubmit": false,
          "isV2SignUpFlow": false,
          "lastName": "",
          "lastNameError": "",
          "mobilePh": "",
          "mobilePhError": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "",
          "passwordError": false,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showVerMsg": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "",
          "zipError": "",
        }
      }
      updatePasswordData={[Function]}
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email=""
    formWrapperData={
      Object {
        "password": Object {
          "value": "test",
        },
      }
    }
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

####   `call errorValidationFields  correctly when event type is not Baby or Wedding`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <div
    className="mainContainer formStyle"
  >
    <RenderCreateRegistryFormV2
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      enableNewCreateReg={true}
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      labels={Object {}}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "University",
          "id": "DC1500002",
          "public": true,
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
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
          "confirmPasswordError": false,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "",
          "emailError": "Please enter a valid email address.",
          "emailInfo": "",
          "eventCode": undefined,
          "eventCode1": "BRD",
          "eventDate": "",
          "eventDateError": "",
          "eventType": "University",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "Please enter first name.",
          "futureShippingDate": "",
          "gender": "",
          "guests": "100",
          "guestsError": "",
          "hideAccountDetectedModal": false,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": false,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": undefined,
          "isShippingAddressChanged": false,
          "lastName": "",
          "lastNameError": "Please enter last name.",
          "mobilePh": "",
          "mobilePhError": "Please enter 10-digits phone number.",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "",
          "passwordError": false,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showVerMsg": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "",
          "zipError": "",
        }
      }
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email=""
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

####   `call errorValidationFields  correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <div
    className="mainContainer formStyle"
  >
    <RenderCreateRegistryFormV2
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      enableNewCreateReg={true}
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      formWrapperDataRegisterOrLogin={
        Object {
          "password": Object {
            "value": "Test1234",
          },
        }
      }
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      labels={Object {}}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "Baby",
          "id": "DC1500002",
          "public": true,
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
          "city": "",
          "cityError": "",
          "coEmail": "test1@test.com",
          "coEmailError": "",
          "coFirstName": "Test1",
          "coFirstNameError": "",
          "coGender": "groom",
          "coLastName": "Test1",
          "coLastNameError": "",
          "coRegProfileStatus": "false",
          "college": "",
          "collegeError": "",
          "confirmPassword": "",
          "confirmPasswordError": true,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "test@test.com",
          "emailError": "",
          "emailInfo": "",
          "eventCode": undefined,
          "eventCode1": "BRD",
          "eventDate": "12/12/2019",
          "eventDateError": "",
          "eventType": "Baby",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "Test",
          "firstNameError": "",
          "futureShippingDate": "",
          "gender": "bride",
          "guests": 120,
          "guestsError": "",
          "hideAccountDetectedModal": false,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": true,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": undefined,
          "isShippingAddressChanged": false,
          "lastName": "Test",
          "lastNameError": "",
          "mobilePh": "(915) 988-0516",
          "mobilePhError": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "abs@1234",
          "passwordError": true,
          "prefStoreNum": "",
          "primaryPh": "(915) 988-0516",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showMoveInInfo": true,
          "showShippingInfo": true,
          "showVerMsg": false,
          "showerDate": "12/12/2019",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "123",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "11003",
          "zipError": "",
        }
      }
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email="test@test.com"
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

####   `call thirdPartySelected function 44444444444444`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <ShowOnTbs>
    <UniversalComponent />
  </ShowOnTbs>
  <div
    className="mainContainer formStyle"
  >
    <RenderCreateRegistryFormV2
      addFormField={[Function]}
      changeRegistryType={[Function]}
      checkFormSubmit={[Function]}
      checkProfileStatus={[Function]}
      coRegProfileStatus={
        Object {
          "atgResponse": "true",
        }
      }
      createRegistry={[Function]}
      dataLocator={
        Object {
          "registryAdditionalThirdPartyCheckBox": "registry-additionalthirdpartycheckbox",
          "registryAptNo": "registry-floortextfield",
          "registryBabyMaidenName": "registry-maidanName",
          "registryBrideOption": "registry-bridelink",
          "registryCollegeField": "registry-collegetextfield",
          "registryContactInfoMobile": "registry-contactInfoMobile",
          "registryDifferentAddLink": "registry-adddeifferentaddresslink",
          "registryEmail": "registry-emailtextfield",
          "registryEnterZipCodeTextField": "registry-enterzipcodetextfield",
          "registryEventInfoDate": "registry-eventInfoEventDate",
          "registryFavStoreChange": "registry-favstore-section-changerefresh",
          "registryFavStoreCity": "registry-favstore-section-city",
          "registryFavStoreDirection": "registry-favstore-section-directions",
          "registryFavStoreSection": "registry-favstore-section-header",
          "registryFavStoreTimings": "registry-favstore-section-address-store-timings",
          "registryFirstName": "registry-firstnametextfield",
          "registryGroomOption": "registry-groomlink",
          "registryGuestsField": "registry-numberofguesttextfield",
          "registryHeading": "registery-editregistery-heading",
          "registryLastName": "registry-lastnametextfield",
          "registryMovingSoonLink": "registry-movingsoonlink",
          "registryNurseryDecorTheme": "registery-decortheme",
          "registryOptionalLink": "registry-optionallink",
          "registryPasswordTextField": "registry-passwordtextfield",
          "registryPhoneNumber": "registry-phonenumbertextfield",
          "registryRBYRLearnMore": "registry-rbyr-learnmore",
          "registryRBYROption": "registry-rbyr-checkbox",
          "registryRegBigDayDate": "registery-editregistery-regbigdaydate",
          "registryRegFavStore": "registery-editregistery-regfavstore",
          "registryRegSaveBtn": "registery-editregistery-regsavechangebtn",
          "registryRegTypePrivate": "registery-editregistery-regtypeprivate",
          "registryRegTypePublic": "registery-editregistery-regtypepublic",
          "registryShowerDateLink": "registry-addshowerdatelink",
          "registryStreetAddress": "registery-editregistery-streetaddress",
          "registryUnsubscribeCheckBox": "registry-unsubscribecheckbox",
          "registryWeddingDateTextField": "registry-weddingdatetextfield",
          "registryZipCodeSearchButton": "registry-zipcodesearchbtn",
          "registrycoBrideOption": "registry-bridelink",
          "registrycoEmail": "registry-coregisterantemailtextfield",
          "registrycoFirstName": "registry-coregisterantfirstnametextfield",
          "registrycoGroomOption": "registry-groomlink",
          "registrycoLastName": "registry-coregisterantlastnametextfield",
        }
      }
      enableNewCreateReg={true}
      error={null}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchStore={[Function]}
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isFetching={false}
      isLoggedIn={true}
      labels={Object {}}
      location={
        Object {
          "search": "/store",
        }
      }
      onExtendProfileSubmitClick={[Function]}
      profileStatus={
        Object {
          "atgResponse": "profile_available_for_extenstion",
        }
      }
      profileStatusUserType="registrant"
      referredContent={
        Object {
          "content": Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          },
        }
      }
      registryConfig={
        Object {
          "Hide_RegistryThirdPartySearch_Flag": "true",
          "RegistryThirdPartySearchFlag": "true",
          "email_OptIn_Checked_Flag": "true",
          "enableEmailOptIn": "true",
        }
      }
      registryInputs={
        Object {
          "eventType": "Baby",
          "id": "DC1500002",
          "public": true,
          "registryInputMap": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
        }
      }
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileStatus={[Function]}
      resetVerType={[Function]}
      setPassWordComError={[Function]}
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
          "babyGender": "S",
          "babyMaidenName": "",
          "babyMaidenNameError": "",
          "babyMultiplesCount": 1,
          "babyMultiplesRevealGender": false,
          "babyNurseryTheme": "",
          "checkBoxSet": true,
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
          "confirmPasswordError": false,
          "currentAddress": "",
          "deviceAutoLogin": true,
          "email": "",
          "emailError": "Please enter a valid email address.",
          "emailInfo": "",
          "eventCode": undefined,
          "eventCode1": "BRD",
          "eventDate": "",
          "eventDateError": "",
          "eventType": "Baby",
          "favStoreid": "",
          "favStoreidError": "",
          "firstName": "",
          "firstNameError": "Please enter first name.",
          "futureShippingDate": "",
          "gender": "",
          "guests": "100",
          "guestsError": "",
          "hideAccountDetectedModal": false,
          "isConfirmPasswordEmpty": false,
          "isContactAddressChanged": false,
          "isLoggedIn": true,
          "isOtherCountryProfile": false,
          "isPassWordEmpty": false,
          "isProfileExist": false,
          "isProfileExtendModalOpen": false,
          "isProfileStatusFlag": false,
          "isRecaptchaEnabled": false,
          "isRecaptchaValidated": false,
          "isRecognized": false,
          "isRegistryRBYRSelected": false,
          "isRegistryTypeOpen": undefined,
          "isShippingAddressChanged": false,
          "lastName": "",
          "lastNameError": "Please enter last name.",
          "mobilePh": "",
          "mobilePhError": "",
          "moveInApartment": "",
          "moveInApartmentError": "",
          "moveInStreet": "",
          "moveInStreetError": "",
          "password": "",
          "passwordError": false,
          "prefStoreNum": "",
          "primaryPh": "",
          "primaryPhError": "",
          "profileAddress": "",
          "profileHardLocked": false,
          "qasContactValidated": false,
          "qasMovingValidated": false,
          "qasShippingValidated": false,
          "recaptchaError": "",
          "registryInputFields": Object {
            "CoRegistrantEmail": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantEmail",
              "id": "DC1400016",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "CoRegistrantFirstName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantFirstName ",
              "id": "DC1200001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "CoRegistrantLastName": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "CoRegistrantLastName",
              "id": "DC1400015",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "MobileNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "MobileNumber",
              "id": "DC1500001",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "PhoneNumber": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "PhoneNumber",
              "id": "DC1300001",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "confirmPassword": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "confirmPassword",
              "id": "DC1500013",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": false,
            },
            "eventDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "eventDate",
              "id": "Wedding_eventDate",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "favoriteStore": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "favoriteStore",
              "id": "DC1500012",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "futureShippingDate": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "futureShippingDate",
              "id": "DC1500011",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "networkAffiliation": Object {
              "autoCheck": true,
              "displayOnForm": true,
              "fieldName": "networkAffiliation",
              "id": "DC1300006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "numberOfGuests": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "numberOfGuests",
              "id": "DC1500005",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showContactAddress": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showContactAddress",
              "id": "DC1500007",
              "requiredInputCreate": false,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showFutureShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showFutureShippingAddr",
              "id": "DC1500009",
              "requiredInputCreate": true,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "showShippingAddress": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "showShippingAddress",
              "id": "DC1500008",
              "requiredInputCreate": true,
              "requiredInputUpdate": true,
              "requiredToMakeRegPublic": true,
            },
            "showerDate": Object {
              "autoCheck": false,
              "displayOnForm": false,
              "fieldName": "showerDate",
              "id": "DC1500006",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
            "useContactAddrAsShippingAddr": Object {
              "autoCheck": false,
              "displayOnForm": true,
              "fieldName": "useContactAddrAsShippingAddr",
              "id": "DC1500010",
              "requiredInputCreate": false,
              "requiredInputUpdate": false,
              "requiredToMakeRegPublic": false,
            },
          },
          "shippingAddressOne": "",
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
          "showVerMsg": false,
          "showerDate": "",
          "showerDateError": "",
          "state": "",
          "stateError": "",
          "street": "",
          "streetError": "",
          "subscribeSelected": true,
          "thirdPartySelected": true,
          "zip": "",
          "zipError": "",
        }
      }
      updateState={[Function]}
      updateSubmitStateData={[Function]}
    />
  </div>
  <RegistryDeviceVerification
    deviceAutoLogin={true}
    email=""
    isExtendAccount={false}
    onClose={[Function]}
    onModalOpen={[Function]}
  />
</ErrorBoundary>
```

