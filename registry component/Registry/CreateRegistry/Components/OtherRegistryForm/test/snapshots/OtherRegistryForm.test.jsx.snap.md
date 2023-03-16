# `app/components/Pages/Registry/CreateRegistry/Components/OtherRegistryForm/test/OtherRegistryForm.test.jsx`

#### `ComponentWillRecieveProps with networkAffiliation`

```
<div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <div
            className="iconContainer relative"
          >
            <Heading
              className="fieldsHeading inline-block"
              data-locator="registry-luckycouplelabel"
              level={2}
            >
              Tell us about yourself
              <Button
                aria-label="Your names will help gift givers identify your registry."
                className="iconStyle tooltip-bottom"
                data-tooltip="Your names will help gift givers identify your registry."
                iconProps={
                  Object {
                    "height": "14px",
                    "type": "infoIcon",
                    "width": "14px",
                  }
                }
                theme="ghost"
                variation="noPadding"
              />
            </Heading>
          </div>
          <div
            className="socialBtn"
          >
            <UniversalComponent
              dividerIsBelow={true}
            />
          </div>
        </legend>
      </PureComponent(GridX)>
      <PersonalInfo
        fromCreateRegistryUtil={true}
        labels={Object {}}
        listenProfileStatusChange={[Function]}
        passwordErrorPresent={[Function]}
        referredContent={
          Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          }
        }
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            When is the big day?
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <EventInfo
        isCreateMode={true}
        labels={Object {}}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            Your contact address
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <ContactInfo
        checkProfileStatus={[Function]}
        handleCoGenderChange={[Function]}
        handleGenderChange={[Function]}
        labels={Object {}}
        passwordErrorPresent={[Function]}
        profileStatus={
          Object {
            "atgResponse": "Profile not found",
          }
        }
        referredContent={
          Object {
            "9278": Object {
              "body": "hello",
            },
            "9279": Object {
              "body": "hello",
            },
            "9280": Object {
              "body": "hello",
            },
          }
        }
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        registryInputs={
          Object {
            "registryInputMap": Object {
              "eventType": "Wedding",
              "id": "DC1500002",
              "networkAffiliation": Object {
                "autoCheck": true,
              },
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
                  "requiredInputCreate": true,
                  "requiredInputUpdate": true,
                  "requiredToMakeRegPublic": true,
                },
                "CoRegistrantLastName": Object {
                  "autoCheck": false,
                  "displayOnForm": true,
                  "fieldName": "CoRegistrantLastName",
                  "id": "DC1400015",
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": true,
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
                  "displayOnForm": false,
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
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": false,
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
            },
          }
        }
        resetProfileStatus={[Function]}
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  />
</div>
```

#### `ComponentWillRecieveProps with null data`

```
""
```

#### `OtherRegistryForm should be rendered correctly with all the props`

```
""
```

#### `OtherRegistryForm should be return null if  registryInputs is not defined`

```
""
```

#### `should render favoriteStore`

```
<div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <div
            className="iconContainer relative"
          >
            <Heading
              className="fieldsHeading inline-block"
              data-locator="registry-luckycouplelabel"
              level={2}
            >
              Tell us about yourself
              <Button
                aria-label="Your names will help gift givers identify your registry."
                className="iconStyle tooltip-bottom"
                data-tooltip="Your names will help gift givers identify your registry."
                iconProps={
                  Object {
                    "height": "14px",
                    "type": "infoIcon",
                    "width": "14px",
                  }
                }
                theme="ghost"
                variation="noPadding"
              />
            </Heading>
          </div>
          <div
            className="socialBtn"
          >
            <UniversalComponent
              dividerIsBelow={true}
            />
          </div>
        </legend>
      </PureComponent(GridX)>
      <PersonalInfo
        fromCreateRegistryUtil={true}
        labels={Object {}}
        listenProfileStatusChange={[Function]}
        passwordErrorPresent={[Function]}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            When is the big day?
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <EventInfo
        isCreateMode={true}
        labels={Object {}}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            Your contact address
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <ContactInfo
        handleCoGenderChange={[Function]}
        handleGenderChange={[Function]}
        labels={Object {}}
        passwordErrorPresent={[Function]}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        registryInputs={
          Object {
            "registryInputMap": Object {
              "eventType": "Wedding",
              "favoriteStore": Object {
                "displayOnForm": true,
              },
              "id": "DC1500002",
              "networkAffiliation": Object {
                "autoCheck": true,
              },
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
                  "requiredInputCreate": true,
                  "requiredInputUpdate": true,
                  "requiredToMakeRegPublic": true,
                },
                "CoRegistrantLastName": Object {
                  "autoCheck": false,
                  "displayOnForm": true,
                  "fieldName": "CoRegistrantLastName",
                  "id": "DC1400015",
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": true,
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
                  "displayOnForm": false,
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
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": false,
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
            },
          }
        }
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="pb2"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            Your Favourite Store
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <Connect(withReducer(wrapper))
        onStoreUpdate={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  />
</div>
```

#### `should render optional data`

```
<div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <div
            className="iconContainer relative"
          >
            <Heading
              className="fieldsHeading inline-block"
              data-locator="registry-luckycouplelabel"
              level={2}
            >
              Tell us about yourself
              <Button
                aria-label="Your names will help gift givers identify your registry."
                className="iconStyle tooltip-bottom"
                data-tooltip="Your names will help gift givers identify your registry."
                iconProps={
                  Object {
                    "height": "14px",
                    "type": "infoIcon",
                    "width": "14px",
                  }
                }
                theme="ghost"
                variation="noPadding"
              />
            </Heading>
          </div>
          <div
            className="socialBtn"
          >
            <UniversalComponent
              dividerIsBelow={true}
            />
          </div>
        </legend>
      </PureComponent(GridX)>
      <PersonalInfo
        flagOptional={true}
        fromCreateRegistryUtil={true}
        labels={Object {}}
        listenProfileStatusChange={[Function]}
        passwordErrorPresent={[Function]}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            When is the big day?
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <EventInfo
        flagOptional={true}
        isCreateMode={true}
        labels={Object {}}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <fieldset>
      <PureComponent(GridX)>
        <legend
          className="formLegend relative"
        >
          <Heading
            className="fieldsHeading inline-block"
            level={2}
          >
            Your contact address
          </Heading>
        </legend>
      </PureComponent(GridX)>
      <ContactInfo
        flagOptional={true}
        handleCoGenderChange={[Function]}
        handleGenderChange={[Function]}
        labels={Object {}}
        passwordErrorPresent={[Function]}
        registryInputFields={
          Object {
            "eventType": "Wedding",
            "favoriteStore": Object {
              "displayOnForm": true,
            },
            "id": "DC1500002",
            "networkAffiliation": Object {
              "autoCheck": true,
            },
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
                "requiredInputCreate": true,
                "requiredInputUpdate": true,
                "requiredToMakeRegPublic": true,
              },
              "CoRegistrantLastName": Object {
                "autoCheck": false,
                "displayOnForm": true,
                "fieldName": "CoRegistrantLastName",
                "id": "DC1400015",
                "requiredInputCreate": true,
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
                "requiredInputCreate": true,
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
                "displayOnForm": false,
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
                "requiredInputCreate": true,
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
                "requiredInputCreate": false,
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
        registryInputs={
          Object {
            "registryInputMap": Object {
              "eventType": "Wedding",
              "favoriteStore": Object {
                "displayOnForm": true,
              },
              "id": "DC1500002",
              "networkAffiliation": Object {
                "autoCheck": true,
              },
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
                  "requiredInputCreate": true,
                  "requiredInputUpdate": true,
                  "requiredToMakeRegPublic": true,
                },
                "CoRegistrantLastName": Object {
                  "autoCheck": false,
                  "displayOnForm": true,
                  "fieldName": "CoRegistrantLastName",
                  "id": "DC1400015",
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": true,
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
                  "displayOnForm": false,
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
                  "requiredInputCreate": true,
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
                  "requiredInputCreate": false,
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
            },
          }
        }
        stateObj={
          Object {
            "apartment": "",
            "apartmentError": "",
            "coEmail": "",
            "coEmailError": "",
            "coFirstName": "",
            "coFirstNameError": "",
            "coGender": "",
            "coLastName": "",
            "coLastNameError": "",
            "confirmPassword": "",
            "confirmPasswordError": true,
            "email": "",
            "emailError": "",
            "eventDate": "",
            "eventDateError": "",
            "firstName": "",
            "firstNameError": "",
            "gender": "",
            "guests": "",
            "guestsError": "",
            "isRegistryTypeOpen": false,
            "lastName": "",
            "lastNameError": "",
            "mobilePh": "",
            "mobilePhError": "",
            "password": "",
            "passwordError": true,
            "primaryPh": "",
            "primaryPhError": "",
            "street": "",
            "streetError": "",
            "subscribeSelected": false,
            "thirdPartySelected": false,
            "zip": "",
            "zipError": "",
          }
        }
        updatePasswordData={[Function]}
        updateState={[Function]}
      />
    </fieldset>
  </div>
  <div
    className="fieldsContainer"
  >
    <Accordion
      accordion={true}
      data={
        Array [
          Object {
            "body": <OptionalInfo
              atDateFlag={undefined}
              channelType={undefined}
              coRegProfileStatus={undefined}
              currentAddress={undefined}
              dataLocator={undefined}
              eventType={undefined}
              fetchCoRegistrantProfileStatus={undefined}
              globalSwitchConfig={undefined}
              isMobile={undefined}
              labels={Object {}}
              pageConfigGlobal={undefined}
              paragraphStyle={undefined}
              profileAddress={undefined}
              referredContent={undefined}
              registryInputFields={
                Object {
                  "eventType": "Wedding",
                  "favoriteStore": Object {
                    "displayOnForm": true,
                  },
                  "id": "DC1500002",
                  "networkAffiliation": Object {
                    "autoCheck": true,
                  },
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
                      "requiredInputCreate": true,
                      "requiredInputUpdate": true,
                      "requiredToMakeRegPublic": true,
                    },
                    "CoRegistrantLastName": Object {
                      "autoCheck": false,
                      "displayOnForm": true,
                      "fieldName": "CoRegistrantLastName",
                      "id": "DC1400015",
                      "requiredInputCreate": true,
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
                      "requiredInputCreate": true,
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
                      "displayOnForm": false,
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
                      "requiredInputCreate": true,
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
                      "requiredInputCreate": false,
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
              resetCoRegistrantProfileStatus={undefined}
              stateObj={
                Object {
                  "apartment": "",
                  "apartmentError": "",
                  "coEmail": "",
                  "coEmailError": "",
                  "coFirstName": "",
                  "coFirstNameError": "",
                  "coGender": "",
                  "coLastName": "",
                  "coLastNameError": "",
                  "confirmPassword": "",
                  "confirmPasswordError": true,
                  "email": "",
                  "emailError": "",
                  "eventDate": "",
                  "eventDateError": "",
                  "firstName": "",
                  "firstNameError": "",
                  "gender": "",
                  "guests": "",
                  "guestsError": "",
                  "isRegistryTypeOpen": false,
                  "lastName": "",
                  "lastNameError": "",
                  "mobilePh": "",
                  "mobilePhError": "",
                  "password": "",
                  "passwordError": true,
                  "primaryPh": "",
                  "primaryPhError": "",
                  "street": "",
                  "streetError": "",
                  "subscribeSelected": false,
                  "thirdPartySelected": false,
                  "zip": "",
                  "zipError": "",
                }
              }
              updateState={[Function]}
            />,
            "title": <div
              className={undefined}
            >
              Optional Information
            </div>,
          },
        ]
      }
      expandCollapseIconPos="right"
      expandCollapseIcons={
        Object {
          "collapse": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="minus"
            width="16px"
          />,
          "expand": <Icon
            className="accordianIconStyle"
            focusable="false"
            height="16px"
            type="plus"
            width="16px"
          />,
        }
      }
      showExpandCollapseIcon={false}
    />
  </div>
  <div
    className="fieldsContainer"
  />
</div>
```

