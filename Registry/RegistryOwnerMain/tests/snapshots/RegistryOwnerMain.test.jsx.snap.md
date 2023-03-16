# `app/containers/Pages/Registry/RegistryOwnerMain/tests/RegistryOwnerMain.test.jsx`

#### `should call clearDeactivatedReg `

```
<Route
  component={[Function]}
/>
```

#### `should call componentWillReceiveProps`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <Connect(AuthValidator)
    byPassLogin={true}
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    search="?skuAdded=67742813"
  />
  <div
    className="registryOwnerMainThreeCells"
  >
    <Dashboard
      activeRegistry={Object {}}
      clearCreateRegistry={[Function]}
      clearDeactivatedReg={[Function]}
      clearQuizModal={[Function]}
      contentStackSelectors={
        Array [
          Object {
            "modules": Object {},
          },
        ]
      }
      deactivatedRegId="543211734"
      disableCollaboration={[Function]}
      dynamicContentState={
        Object {
          "content": Array [
            Object {
              "1234": Object {
                "Response": "Success",
                "body": "this is demo content",
                "statusCode": 200,
              },
            },
          ],
        }
      }
      email={null}
      enableCollaboration={[Function]}
      errorStatus={
        Array [
          Object {
            "code": "78",
            "message": "error",
          },
        ]
      }
      eventType="Birthday"
      eventTypeCode="BIR"
      fetchContentStack={[Function]}
      fetchQuizPersona={[Function]}
      fetchSiteSpectDateSort={[Function]}
      fireTealiumAction={[Function]}
      getRegistryOwnerFirstCategory={[Function]}
      getThankYouList={[Function]}
      handleCollaborationModal={[Function]}
      isInternationalUser={false}
      isMPulseEnabled={true}
      isPreviewYrReg={false}
      isRemainingItemFetching={true}
      labels={Object {}}
      location={
        Object {
          "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
          "search": "?skuAdded=67742813",
        }
      }
      mPulseEnabled={true}
      mPulseSiteConfig={
        Object {
          "pageLevelConfig": Object {
            "RegistryGuest": Object {
              "ConditionalMarksFlag": Object {
                "ux-destination-verified": Array [
                  "ux-action-before-load",
                ],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [],
              },
              "PageViewMarks": Object {
                "ux-destination-verified": Array [
                  "ux-image-inline-logo",
                ],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [],
              },
            },
          },
        }
      }
      match={
        Object {
          "params": Object {
            "id": "123",
          },
          "path": "store/giftRegistry/viewRegistryOwner/myItems/",
        }
      }
      myFundGiftTooltipLink="/store/account/myfunds"
      onComponentMount={[Function]}
      onModalClose={[Function]}
      openEditRegistryModal={false}
      pageConfig={
        Object {
          "registrySurveyItemThreshold": "5",
        }
      }
      quizRegistryId="123"
      redirectMyFundPage={[Function]}
      redirectTo={[Function]}
      regTypes={
        Object {
          "other": Array [
            Object {
              "registryCode": "BIR",
              "registryImg": "",
              "registryIndex": "7",
              "registryName": "Birthday",
              "registryTypeId": "200006",
            },
          ],
          "popular": Array [
            Object {
              "registryCode": "BRD",
              "registryImg": "/wedding/image",
              "registryIndex": "1",
              "registryName": "Wedding",
              "registryTypeId": "200001",
            },
          ],
        }
      }
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventDate": "11/11/11",
              "eventType": "Birthday",
              "giftRegistered": "5",
              "registryId": "12345",
              "storedValueOptIn": false,
            },
            "registryVO": Object {
              "tnGiftsPurchased": "5",
            },
          },
        }
      }
      registryId="520747097"
      registryListFetched={true}
      registryOwnerFirstCategoryList={Object {}}
      registrylist={
        Array [
          Object {
            "0": Object {
              "registryId": "56272872",
            },
            "1": Object {
              "registryId": "56272878",
            },
          },
        ]
      }
      resetIsItemsFetchingStatus={[Function]}
      resetQuizPersona={[Function]}
      route={
        Object {
          "routes": Array [
            Object {
              "id": "5347878",
              "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
            },
          ],
        }
      }
      setEditRegistryModalStateFlag={[Function]}
      setQuizFromRecommendation={[Function]}
      setQuizPersona={[Function]}
      setShowChecklist={[Function]}
      showTakeOurQuiz={true}
      switchConfig={
        Object {
          "enableMPulse": true,
          "enableRecommendationTab": true,
          "enableRegistrySurvey": true,
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      updateFilterCount={[Function]}
      viewPortConfigGlobal={
        Object {
          "pageConfig": Object {
            "foo": "bar",
          },
        }
      }
    />
  </div>
  <Tab
    activeRegistry={Object {}}
    clearCreateRegistry={[Function]}
    clearDeactivatedReg={[Function]}
    clearQuizModal={[Function]}
    contentStackSelectors={
      Array [
        Object {
          "modules": Object {},
        },
      ]
    }
    deactivatedRegId="543211734"
    disableCollaboration={[Function]}
    dynamicContentState={
      Object {
        "content": Array [
          Object {
            "1234": Object {
              "Response": "Success",
              "body": "this is demo content",
              "statusCode": 200,
            },
          },
        ],
      }
    }
    enableCollaboration={[Function]}
    enableRecommendationTab={true}
    errorStatus={
      Array [
        Object {
          "code": "78",
          "message": "error",
        },
      ]
    }
    eventType="Birthday"
    eventTypeName={null}
    fetchContentStack={[Function]}
    fetchQuizPersona={[Function]}
    fetchSiteSpectDateSort={[Function]}
    fireTealiumAction={[Function]}
    getRegistryOwnerFirstCategory={[Function]}
    getThankYouList={[Function]}
    handleTabClickCallback={[Function]}
    isMPulseEnabled={true}
    isRemainingItemFetching={true}
    labels={Object {}}
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    mPulseEnabled={true}
    mPulseSiteConfig={
      Object {
        "pageLevelConfig": Object {
          "RegistryGuest": Object {
            "ConditionalMarksFlag": Object {
              "ux-destination-verified": Array [
                "ux-action-before-load",
              ],
              "ux-primary-action-available": Array [],
              "ux-primary-content-displayed": Array [],
              "ux-secondary-content-displayed": Array [],
            },
            "PageViewMarks": Object {
              "ux-destination-verified": Array [
                "ux-image-inline-logo",
              ],
              "ux-primary-action-available": Array [],
              "ux-primary-content-displayed": Array [],
              "ux-secondary-content-displayed": Array [],
            },
          },
        },
      }
    }
    match={
      Object {
        "params": Object {
          "id": "123",
        },
        "path": "store/giftRegistry/viewRegistryOwner/myItems/",
      }
    }
    onComponentMount={[Function]}
    pageConfig={
      Object {
        "registrySurveyItemThreshold": "5",
      }
    }
    quizRegistryId="123"
    redirectTo={[Function]}
    regTypes={
      Object {
        "other": Array [
          Object {
            "registryCode": "BIR",
            "registryImg": "",
            "registryIndex": "7",
            "registryName": "Birthday",
            "registryTypeId": "200006",
          },
        ],
        "popular": Array [
          Object {
            "registryCode": "BRD",
            "registryImg": "/wedding/image",
            "registryIndex": "1",
            "registryName": "Wedding",
            "registryTypeId": "200001",
          },
        ],
      }
    }
    registryData={
      Object {
        "registryResVO": Object {
          "registrySummaryVO": Object {
            "eventDate": "11/11/11",
            "eventType": "Birthday",
            "giftRegistered": "5",
            "registryId": "12345",
            "storedValueOptIn": false,
          },
          "registryVO": Object {
            "tnGiftsPurchased": "5",
          },
        },
      }
    }
    registryId="520747097"
    registryListFetched={true}
    registryOwnerFirstCategoryList={Object {}}
    registrylist={
      Array [
        Object {
          "0": Object {
            "registryId": "56272872",
          },
          "1": Object {
            "registryId": "56272878",
          },
        },
      ]
    }
    resetIsItemsFetchingStatus={[Function]}
    resetQuizPersona={[Function]}
    route={
      Object {
        "routes": Array [
          Object {
            "id": "5347878",
            "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
          },
        ],
      }
    }
    setQuizFromRecommendation={[Function]}
    setQuizPersona={[Function]}
    setShowChecklist={[Function]}
    showTakeOurQuiz={true}
    switchConfig={
      Object {
        "enableMPulse": true,
        "enableRecommendationTab": true,
        "enableRegistrySurvey": true,
      }
    }
    switchConfigGlobal={
      Object {
        "globalMPulseEnable": true,
      }
    }
    updateFilterCount={[Function]}
    viewPortConfigGlobal={
      Object {
        "pageConfig": Object {
          "foo": "bar",
        },
      }
    }
  />
  <InactivityModal
    handleThankYouList={[Function]}
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    mPulseEnabled={true}
    pathMatcher={[Function]}
    recognizedFlag={true}
  />
  <Instrumentation
    markName="ux-link-registry-tabs"
    zoneName="ux-primary-action-available"
  />
  <RouteWithSubRoutes
    changeFilter={[Function]}
    contentStackSelectors={
      Array [
        Object {
          "modules": Object {},
        },
      ]
    }
    discontinuedItemCount={0}
    eventType="Birthday"
    eventTypeCode="BIR"
    fetchContentStack={[Function]}
    fireTealiumQuiz={[Function]}
    handleCollaborationModal={[Function]}
    key="0"
    mPulseEnabled={true}
    resetFilter={[Function]}
    returnFilteredItemsCount={[Function]}
    route={
      Object {
        "id": "5347878",
        "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
      }
    }
    saveStoreInfo={[Function]}
    setQuizFromRecommendation={[Function]}
    stateObj={
      Object {
        "accessDenied": false,
        "discontinuedItemCount": 0,
        "enableInviteFriendRecomModal": false,
        "enableRegistryCollaborationModal": false,
        "filter": "",
        "filteredItemsCount": 0,
        "fireTealiumMyItems": false,
        "getRecommendationPos": 0,
        "isFiltered": false,
        "modalMounteState": undefined,
        "openEditRegistryModal": false,
        "registryId": "520747097",
        "selectedCDP": "",
        "selectedFilterOption": "View All",
        "showChecklist": null,
        "startQuiz": false,
        "syncAccessDenied": undefined,
      }
    }
    updateFilterItemCount={[Function]}
    updateParam={[Function]}
  />
  <UniversalComponent
    registryId="520747097"
    surveyHeading="How would you rate your registry experience?"
  />
</ErrorBoundary>
```

#### `should render RegistryOwnerMain`

```
<Fragment>
  <Connect(AuthValidator)
    byPassLogin={true}
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    pathName="store/giftRegistry/viewRegistryOwner/myItems/"
    route="store/giftRegistry/viewRegistryOwner/myItems/"
    search="?skuAdded=67742813"
  />
  <div
    className="registryOwnerMain"
  >
    <Dashboard
      clearDeactivatedReg={[Function]}
      email={null}
      eventType={null}
      eventTypeCode={false}
      fetchSiteSpectDateSort={[Function]}
      getRegistryOwnerFirstCategory={[Function]}
      giftGiver={false}
      isInternationalUser={false}
      isPreviewYrReg={false}
      labels={
        Object {
          "referredContent": Array [
            Object {
              "id": "123",
              "key": "123",
            },
            Object {
              "id": "123",
              "key": "RegOwnerMarketingBanner",
            },
          ],
        }
      }
      location={
        Object {
          "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
          "search": "?skuAdded=67742813",
        }
      }
      match={
        Object {
          "params": Object {
            "id": "123",
          },
          "path": "store/giftRegistry/viewRegistryOwner/myItems/",
        }
      }
      onComponentMount={[Function]}
      onModalClose={[Function]}
      openEditRegistryModal={false}
      redirectMyFundPage={[Function]}
      redirectTo={[Function]}
      registryId=""
      resetIsItemsFetchingStatus={[Function]}
      route={
        Object {
          "routes": Array [
            Object {
              "id": "5347878",
              "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
            },
          ],
        }
      }
      setEditRegistryModalStateFlag={[Function]}
      switchConfig={
        Object {
          "enableInactivityModal": true,
          "enableMPulse": true,
          "enableRegistrySurvey": true,
        }
      }
      switchConfigGlobal={
        Object {
          "globalMPulseEnable": true,
        }
      }
      updateFilterCount={[Function]}
      viewPortConfigGlobal={
        Object {
          "pageConfig": Object {
            "foo": "bar",
          },
        }
      }
    />
  </div>
  <Tab
    clearDeactivatedReg={[Function]}
    eventType={null}
    eventTypeName={null}
    fetchSiteSpectDateSort={[Function]}
    getRegistryOwnerFirstCategory={[Function]}
    labels={
      Object {
        "referredContent": Array [
          Object {
            "id": "123",
            "key": "123",
          },
          Object {
            "id": "123",
            "key": "RegOwnerMarketingBanner",
          },
        ],
      }
    }
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    match={
      Object {
        "params": Object {
          "id": "123",
        },
        "path": "store/giftRegistry/viewRegistryOwner/myItems/",
      }
    }
    onComponentMount={[Function]}
    redirectTo={[Function]}
    registryId=""
    resetIsItemsFetchingStatus={[Function]}
    route={
      Object {
        "routes": Array [
          Object {
            "id": "5347878",
            "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
          },
        ],
      }
    }
    switchConfig={
      Object {
        "enableInactivityModal": true,
        "enableMPulse": true,
        "enableRegistrySurvey": true,
      }
    }
    switchConfigGlobal={
      Object {
        "globalMPulseEnable": true,
      }
    }
    updateFilterCount={[Function]}
    viewPortConfigGlobal={
      Object {
        "pageConfig": Object {
          "foo": "bar",
        },
      }
    }
  />
  <InactivityModal
    handleThankYouList={[Function]}
    labels={
      Object {
        "referredContent": Array [
          Object {
            "id": "123",
            "key": "123",
          },
          Object {
            "id": "123",
            "key": "RegOwnerMarketingBanner",
          },
        ],
      }
    }
    location={
      Object {
        "pathname": "store/giftRegistry/viewRegistryOwner/myItems/",
        "search": "?skuAdded=67742813",
      }
    }
    pathMatcher={[Function]}
    recognizedFlag={true}
  />
  <RouteWithSubRoutes
    changeFilter={[Function]}
    discontinuedItemCount={0}
    eventType={null}
    eventTypeCode={false}
    key="0"
    resetFilter={[Function]}
    returnFilteredItemsCount={[Function]}
    route={
      Object {
        "id": "5347878",
        "path": "/store/giftRegistry/viewRegistryOwner/myItems/:5347878?",
      }
    }
    stateObj={
      Object {
        "accessDenied": false,
        "discontinuedItemCount": 0,
        "filter": "",
        "filteredItemsCount": 0,
        "fireTealiumMyItems": true,
        "isFiltered": false,
        "openEditRegistryModal": false,
        "registryId": "",
        "selectedFilterOption": "View All",
        "syncAccessDenied": false,
      }
    }
    updateFilterItemCount={[Function]}
    updateParam={[Function]}
  />
</Fragment>
```

