# `app/containers/Pages/Registry/CreateRegistry/tests/CreateRegistry.test.jsx`

#### `should render CreateRegistry correctly`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <CreateRegistryComponent
      accountAddress=""
      atDateFlag={false}
      changePhoneNo={[Function]}
      changeRegistryType={[Function]}
      enableRBYRFeature={false}
      flagToSetProps="hi"
      formWrapperIdentifier="createRegistryExtendProfileFormData"
      formWrapperIdentifierRegisterOrLogin="createRegistryRegisterOrLoginFormData"
      getCurrentRegistryType={[Function]}
      getProfile={[Function]}
      getRegistryInputs={[Function]}
      globalSwitchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isBabyRegistry={false}
      isFetching={false}
      isFromPDP={false}
      isLoggedIn={true}
      isRegistryTypeModalOpen={false}
      location={
        Object {
          "hash": "",
          "key": "ac5dnr",
          "pathname": "/store/giftregistry/createRegistryForm",
          "search": "?regType=BRD",
        }
      }
      onComponentMount={[Function]}
      phoneChangeState={true}
      profileData={
        Object {
          "repositoryId": "1234",
        }
      }
      regTypes={[Function]}
      signInClicked={[Function]}
      switchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      verifyClicked={[Function]}
      verifyPhoneState={false}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <withReducer(Connect(wrapper))
      changeStore={true}
      createPickUpInStore={true}
      findAStoreModal={true}
      isScrollable={true}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <Connect(wrapper)
      isRegistryTypeModalOpen={false}
    />
  </ErrorBoundary>
</Fragment>
```

#### `should render CreateRegistry correctly with Regtype data and enable tutorial true`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <CreateRegistryComponent
      atDateFlag={false}
      changePhoneNo={[Function]}
      changeRegistryType={[Function]}
      clearIdentifierStateData={[Function]}
      enableRBYRFeature={false}
      flagToSetProps="hi"
      formWrapperIdentifier="createRegistryExtendProfileFormData"
      formWrapperIdentifierRegisterOrLogin="createRegistryRegisterOrLoginFormData"
      getCurrentRegistryType={[Function]}
      getRegistryInputs={[Function]}
      globalSwitchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isBabyRegistry={false}
      isFromPDP={false}
      isRegistryTypeModalOpen={false}
      location={
        Object {
          "hash": "",
          "key": "ac5dnr",
          "pathname": "/store/giftregistry/createRegistryForm",
          "search": "?regType=BRD",
        }
      }
      onComponentMount={[Function]}
      phoneChangeState={true}
      regTypes={[Function]}
      regTypesData={
        Object {
          "other": Array [
            Object {
              "enableICTutorial": true,
              "registryCode": "RET",
              "registryDescription": "Retirement",
              "registryIndex": 8,
              "registryName": "Retirement",
              "registryTypeId": "200008",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "OTH",
              "registryDescription": "Other",
              "registryIndex": 9,
              "registryName": "Other",
              "registryTypeId": "200009",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "ANN",
              "registryDescription": "Anniversary",
              "registryIndex": 5,
              "registryName": "Anniversary",
              "registryTypeId": "200003",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "COL",
              "registryDescription": "College/University",
              "registryIndex": 6,
              "registryName": "College/University",
              "registryTypeId": "200005",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "BIR",
              "registryDescription": "Birthday",
              "registryIndex": 7,
              "registryName": "Birthday",
              "registryTypeId": "200006",
            },
          ],
          "popular": Array [
            Object {
              "enableICTutorial": true,
              "registryCode": "BRD",
              "registryDescription": "Wedding",
              "registryImg": "https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$",
              "registryIndex": 1,
              "registryName": "Wedding",
              "registryTypeId": "200001",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "COM",
              "registryDescription": "Commitment Ceremony",
              "registryImg": "https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$",
              "registryIndex": 2,
              "registryName": "Commitment Ceremony",
              "registryTypeId": "200002",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "BA1",
              "registryDescription": "Baby",
              "registryImg": "https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$",
              "registryIndex": 3,
              "registryName": "Baby",
              "registryTypeId": "200007",
            },
            Object {
              "enableICTutorial": true,
              "registryCode": "HSW",
              "registryDescription": "Housewarming",
              "registryImg": "https://s7d2.scene7.com/is/image/BedBathandBeyond//images/home/popcat_coffee_q3.JPG$other$",
              "registryIndex": 4,
              "registryName": "Housewarming",
              "registryTypeId": "200004",
            },
          ],
        }
      }
      resetStoreData={[Function]}
      setPassWordComError={[Function]}
      signInClicked={[Function]}
      switchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      updateSubmitStateData={[Function]}
      verifyClicked={[Function]}
      verifyPhoneState={false}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <withReducer(Connect(wrapper))
      changeStore={true}
      createPickUpInStore={true}
      findAStoreModal={true}
      isScrollable={true}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <Connect(wrapper)
      isRegistryTypeModalOpen={false}
    />
  </ErrorBoundary>
</Fragment>
```

#### `should call mapDispatchToProps correctly`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <CreateRegistryComponent
      addFormField={[Function]}
      atDateFlag={false}
      changePhoneNo={[Function]}
      changeRegistryType={[Function]}
      checkProfileStatus={[Function]}
      clearIdentifierStateData={[Function]}
      createRegistry={[Function]}
      emptyQasData={[Function]}
      enableRBYRFeature={false}
      fetchCoRegistrantProfileStatus={[Function]}
      fetchContentStack={[Function]}
      fetchModalData={[Function]}
      fetchQasData={[Function]}
      fireTealiumAction={[Function]}
      flagToSetProps=""
      formWrapperIdentifier="createRegistryExtendProfileFormData"
      formWrapperIdentifierRegisterOrLogin="createRegistryRegisterOrLoginFormData"
      getCurrentRegistryType={[Function]}
      getProfile={[Function]}
      getRegistryInputs={[Function]}
      globalSwitchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      guestDefault={100}
      history={
        Object {
          "push": [Function],
        }
      }
      isBabyRegistry={false}
      isFromPDP={false}
      isRegistryTypeModalOpen={false}
      location={
        Object {
          "hash": "",
          "key": "ac5dnr",
          "pathname": "/store/giftregistry/createRegistryForm",
          "search": "?regType=BRD",
        }
      }
      onComponentMount={[Function]}
      onExtendProfileSubmitClick={[Function]}
      phoneChangeState={true}
      regTypes={[Function]}
      resetCoRegistrantProfileStatus={[Function]}
      resetProfileStatus={[Function]}
      resetStoreData={[Function]}
      resetVerType={[Function]}
      resetWelcomeScreenData={[Function]}
      setPassWordComError={[Function]}
      setUserAddressData={[Function]}
      signInClicked={[Function]}
      switchConfig={
        Object {
          "Global": Object {
            "enableICTutorialCMS": false,
          },
          "PDP": Object {
            "interactiveCheckList": true,
          },
        }
      }
      updateContactAddressModalQasVisibility={[Function]}
      updateMovingAddressModalQasVisibility={[Function]}
      updateShippingAddressModalQasVisibility={[Function]}
      updateSubmitStateData={[Function]}
      verifyClicked={[Function]}
      verifyPhoneState={false}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <withReducer(Connect(wrapper))
      changeStore={true}
      createPickUpInStore={true}
      findAStoreModal={true}
      isScrollable={true}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <Connect(wrapper)
      isRegistryTypeModalOpen={false}
    />
  </ErrorBoundary>
</Fragment>
```

