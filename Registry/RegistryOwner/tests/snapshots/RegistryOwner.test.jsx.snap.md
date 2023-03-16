# `app/containers/Pages/Registry/RegistryOwner/tests/RegistryOwner.test.jsx`

#### `should render correctly`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <Suspense
    fallback={
      <div>
        Loading...
      </div>
    }
  >
    <lazy
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      enableCSLabels={false}
      enableQuickAdd={true}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredItemsCount={0}
      fromQuickAdd={true}
      getEditRegistryData={[Function]}
      getThankYouList={[Function]}
      isAddingQuickAddItemToList={false}
      isFiltered={false}
      isMPulseEnabled={true}
      isPickupInStoreModalOpen={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      maxItemInRegToShowQuickAdd={10}
      onComponentMount={[Function]}
      onPickupInStoreButtonClick={[Function]}
      quickAddConfig={
        Object {
          "BRD": "RM1001",
        }
      }
      quickAddId="RM1001"
      regType="BRD"
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId={1}
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "registryItemList": Array [
              Object {
                "sku": 123,
              },
            ],
            "sku": 123,
          },
          Object {
            "sku": 124,
          },
          Object {
            "sku": 125,
          },
        ]
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveLandingZip={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption="View All"
      selectedFilters={Object {}}
      showExpertPicks={true}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      updateBopisCheckBoxState={[Function]}
    />
  </Suspense>
</ErrorBoundary>
```

#### `#nearestStoreApiResolvedCall `

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <Suspense
    fallback={
      <div>
        Loading...
      </div>
    }
  >
    <lazy
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      enableCSLabels={false}
      enableQuickAdd={true}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredItemsCount={0}
      fromQuickAdd={true}
      getEditRegistryData={[Function]}
      getThankYouList={[Function]}
      isAddingQuickAddItemToList={false}
      isFiltered={false}
      isMPulseEnabled={true}
      isPickupInStoreModalOpen={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      maxItemInRegToShowQuickAdd={10}
      onComponentMount={[Function]}
      onPickupInStoreButtonClick={[Function]}
      quickAddConfig={
        Object {
          "BRD": "RM1001",
        }
      }
      quickAddId="RM1001"
      regType="BRD"
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId={1}
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "registryItemList": Array [
              Object {
                "sku": 123,
              },
            ],
            "sku": 123,
          },
          Object {
            "sku": 124,
          },
          Object {
            "sku": 125,
          },
        ]
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveLandingZip={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption="View All"
      selectedFilters={Object {}}
      showExpertPicks={true}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      updateBopisCheckBoxState={[Function]}
    />
  </Suspense>
</ErrorBoundary>
```

#### `#handleBopisCheckboxChange `

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Suspense
        fallback={
          <div>
            Loading...
          </div>
        }
      >
        <lazy
          deviceConfig={
            Object {
              "DESKTOP": 1024,
            }
          }
          emptyStoreData={[Function]}
          enableCSLabels={false}
          enableQuickAdd={true}
          fetchSiteSpectDateSort={[Function]}
          filter=""
          filteredItemsCount={0}
          fromQuickAdd={true}
          getEditRegistryData={[Function]}
          getHeaderLayout={false}
          getRegistryOwnerFirstCategory={[Function]}
          getThankYouList={[Function]}
          isAddToRegistryFetching={false}
          isAddingQuickAddItemToList={true}
          isFetching={true}
          isFiltered={false}
          isMPulseEnabled={true}
          labels={
            Object {
              "QuickPicksCollection": Object {
                "BA1": "",
                "BRD": "",
              },
              "referredContent": Array [
                Object {
                  "id": "9942",
                  "key": "tymSurpriseContentHeading",
                },
                Object {
                  "id": "9943",
                  "key": "tymSurpriseContentSubHeading",
                },
                Object {
                  "id": "9944",
                  "key": "sendThankYouHeading",
                },
                Object {
                  "id": "9945",
                  "key": "sendThankYouDescription",
                },
              ],
            }
          }
          mPulseSiteConfig={
            Object {
              "PageSpecificMarks": Object {
                "ux-destination-verified": Array [
                  "ux-text-registrant-name",
                  "ux-text-event-date",
                ],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [
                  "ux-text-item-requested",
                  "ux-text-item-purchased",
                ],
              },
            }
          }
          matchParamId={1}
          maxItemInRegToShowQuickAdd={10}
          onComponentMount={[Function]}
          quickAddId="RM1001"
          quickItemAddedTS="InitialValue"
          regType="BRD"
          registryData={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "a",
                  "giftRegistered": 0,
                  "registryType": Object {
                    "registryTypeName": "BRD",
                  },
                },
              },
            }
          }
          registryId={1}
          registryOwnerFirstCategoryList={
            Array [
              Object {
                "sku": 123,
              },
            ]
          }
          registrylist={
            Array [
              Object {
                "registryId": "12345",
              },
              Object {
                "registryId": "22222",
              },
              Object {
                "registryId": "33333",
              },
            ]
          }
          resetFirstCategoryCallFired={[Function]}
          resetGlobalNotification={[Function]}
          resetIsItemsFetchingStatus={[Function]}
          saveStoreInfo={[Function]}
          selectedFilterOption="View All"
          selectedFilters={Object {}}
          switchConfig={
            Object {
              "enableQuickAdd": true,
            }
          }
          updateFilterItemCount={[Function]}
          variation="Date"
        />
      </Suspense>
    </ErrorBoundary>
    <withRouter(RegistryOwnerLayout)
      anchorToItem={[Function]}
      appliedFilters={
        Object {
          "selectedCheckboxFilter": undefined,
          "selectedFilters": Object {},
        }
      }
      contentIdArgs={
        Array [
          "9942",
          "9943",
          "9944",
          "9945",
        ]
      }
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      emptyStoreData={[Function]}
      eventObject={Array []}
      eventType="a"
      eventTypeCode={false}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredFirstCategoryItems={Array []}
      filteredItemsCount={0}
      getEditRegistryData={[Function]}
      getHeaderLayout={false}
      getRegistryOwnerFirstCategory={[Function]}
      getThankYouList={[Function]}
      handleBopisCheckboxChange={[Function]}
      handleChangePickupInStore={[Function]}
      hasDiaperFund={false}
      isAddToRegistryFetching={false}
      isAddingQuickAddItemToList={true}
      isDiaperFundEnable={false}
      isFetching={true}
      isFiltered={false}
      isMPulseEnabled={true}
      isPreviewYrReg={false}
      isRegistryContentSlotReq={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseEnabled={true}
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      maxItemInRegToShowQuickAdd={10}
      onComponentMount={[Function]}
      productsCount={0}
      quickItemAddedTS="InitialValue"
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "a",
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId="213"
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "sku": 123,
          },
        ]
      }
      registrySummary={
        Object {
          "eventType": "a",
          "giftRegistered": 0,
          "registryType": Object {
            "registryTypeName": "BRD",
          },
        }
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption={Object {}}
      selectedFilters={Object {}}
      sortDataByDate={[Function]}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      updateFilterItemCount={[Function]}
      updateSkuIdForAnchoring={[Function]}
      variation="Date"
    />
  </ErrorBoundary>
</Fragment>
```

#### `#handleChangePickupInStore `

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Suspense
        fallback={
          <div>
            Loading...
          </div>
        }
      >
        <lazy
          deviceConfig={
            Object {
              "DESKTOP": 1024,
            }
          }
          emptyStoreData={[Function]}
          enableCSLabels={false}
          enableQuickAdd={true}
          fetchSiteSpectDateSort={[Function]}
          filter=""
          filteredItemsCount={0}
          fromQuickAdd={true}
          getEditRegistryData={[Function]}
          getHeaderLayout={false}
          getRegistryOwnerFirstCategory={[Function]}
          getThankYouList={[Function]}
          isAddToRegistryFetching={false}
          isAddingQuickAddItemToList={true}
          isFetching={true}
          isFiltered={false}
          isMPulseEnabled={true}
          labels={
            Object {
              "QuickPicksCollection": Object {
                "BA1": "",
                "BRD": "",
              },
              "referredContent": Array [
                Object {
                  "id": "9942",
                  "key": "tymSurpriseContentHeading",
                },
                Object {
                  "id": "9943",
                  "key": "tymSurpriseContentSubHeading",
                },
                Object {
                  "id": "9944",
                  "key": "sendThankYouHeading",
                },
                Object {
                  "id": "9945",
                  "key": "sendThankYouDescription",
                },
              ],
            }
          }
          mPulseSiteConfig={
            Object {
              "PageSpecificMarks": Object {
                "ux-destination-verified": Array [
                  "ux-text-registrant-name",
                  "ux-text-event-date",
                ],
                "ux-primary-action-available": Array [],
                "ux-primary-content-displayed": Array [],
                "ux-secondary-content-displayed": Array [
                  "ux-text-item-requested",
                  "ux-text-item-purchased",
                ],
              },
            }
          }
          matchParamId={1}
          maxItemInRegToShowQuickAdd={10}
          onComponentMount={[Function]}
          quickAddId="RM1001"
          quickItemAddedTS="InitialValue"
          regType="BRD"
          registryData={
            Object {
              "registryResVO": Object {
                "registrySummaryVO": Object {
                  "eventType": "a",
                  "giftRegistered": 0,
                  "registryType": Object {
                    "registryTypeName": "BRD",
                  },
                },
              },
            }
          }
          registryId={1}
          registryOwnerFirstCategoryList={
            Array [
              Object {
                "sku": 123,
              },
            ]
          }
          registrylist={
            Array [
              Object {
                "registryId": "12345",
              },
              Object {
                "registryId": "22222",
              },
              Object {
                "registryId": "33333",
              },
            ]
          }
          resetFirstCategoryCallFired={[Function]}
          resetGlobalNotification={[Function]}
          resetIsItemsFetchingStatus={[Function]}
          saveStoreInfo={[Function]}
          selectedFilterOption="View All"
          selectedFilters={Object {}}
          switchConfig={
            Object {
              "enableQuickAdd": true,
            }
          }
          updateFilterItemCount={[Function]}
          variation="Date"
        />
      </Suspense>
    </ErrorBoundary>
    <withRouter(RegistryOwnerLayout)
      anchorToItem={[Function]}
      appliedFilters={
        Object {
          "selectedCheckboxFilter": undefined,
          "selectedFilters": Object {},
        }
      }
      contentIdArgs={
        Array [
          "9942",
          "9943",
          "9944",
          "9945",
        ]
      }
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      emptyStoreData={[Function]}
      eventObject={Array []}
      eventType="a"
      eventTypeCode={false}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredFirstCategoryItems={Array []}
      filteredItemsCount={0}
      getEditRegistryData={[Function]}
      getHeaderLayout={false}
      getRegistryOwnerFirstCategory={[Function]}
      getThankYouList={[Function]}
      handleBopisCheckboxChange={[Function]}
      handleChangePickupInStore={[Function]}
      hasDiaperFund={false}
      isAddToRegistryFetching={false}
      isAddingQuickAddItemToList={true}
      isDiaperFundEnable={false}
      isFetching={true}
      isFiltered={false}
      isMPulseEnabled={true}
      isPreviewYrReg={false}
      isRegistryContentSlotReq={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseEnabled={true}
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      maxItemInRegToShowQuickAdd={10}
      onComponentMount={[Function]}
      productsCount={0}
      quickItemAddedTS="InitialValue"
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "a",
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId="213"
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "sku": 123,
          },
        ]
      }
      registrySummary={
        Object {
          "eventType": "a",
          "giftRegistered": 0,
          "registryType": Object {
            "registryTypeName": "BRD",
          },
        }
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption={Object {}}
      selectedFilters={Object {}}
      sortDataByDate={[Function]}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      updateFilterItemCount={[Function]}
      updateSkuIdForAnchoring={[Function]}
      variation="Date"
    />
  </ErrorBoundary>
</Fragment>
```

#### `should render correctly in new registry flow`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <withRouter(RegistryOwnerLayout)
      anchorToItem={[Function]}
      contentIdArgs={
        Array [
          "9942",
          "9943",
          "9944",
          "9945",
        ]
      }
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      enableNewRegDashboard={false}
      eventObject={Array []}
      eventType={null}
      eventTypeCode={false}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredFirstCategoryItems={
        Array [
          Object {
            "sku": 123,
          },
        ]
      }
      filteredItemsCount={0}
      getEditRegistryData={[Function]}
      getThankYouList={[Function]}
      handleBopisCheckboxChange={[Function]}
      handleChangePickupInStore={[Function]}
      hasDiaperFund={false}
      isDiaperFundEnable={false}
      isFiltered={false}
      isMPulseEnabled={true}
      isPickupInStoreModalOpen={true}
      isPreviewYrReg={false}
      isRegistryContentSlotReq={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseEnabled={true}
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      maxItemInRegToShowQuickAdd={10}
      newReg={true}
      onComponentMount={[Function]}
      onPickupInStoreButtonClick={[Function]}
      productsCount={0}
      quickAddConfig={
        Object {
          "BRD": "RM1001",
        }
      }
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId={1}
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "registryItemList": Array [
              Object {
                "sku": 123,
              },
            ],
            "sku": 123,
          },
          Object {
            "sku": 124,
          },
          Object {
            "sku": 125,
          },
        ]
      }
      registrySummary={
        Object {
          "giftRegistered": 0,
          "registryType": Object {
            "registryTypeName": "BRD",
          },
        }
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveLandingZip={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption={Object {}}
      selectedFilters={Object {}}
      siteId="BuyBuyBaby"
      sortDataByDate={[Function]}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      switchConfigGlobal={
        Object {
          "enableCSLabels": true,
        }
      }
      updateBopisCheckBoxState={[Function]}
      updateSkuIdForAnchoring={[Function]}
    />
    <UniversalComponent
      changeStore={true}
      findAStoreModal={true}
      fromRegistry={true}
      registryId={1}
      showSearchFlag={true}
    />
  </ErrorBoundary>
</Fragment>
```

#### `renderRegistryQuickAdd should return null if quickAddId exists`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <withReducer(withSaga(withSaga(withReducer(Connect(wrapper)))))
        deviceConfig={
          Object {
            "DESKTOP": 1024,
          }
        }
        emptyStoreData={[Function]}
        enableQuickAdd={true}
        fetchSiteSpectDateSort={[Function]}
        filter=""
        filteredItemsCount={0}
        fromQuickAdd={true}
        getEditRegistryData={[Function]}
        getHeaderLayout={false}
        getRegistryOwnerFirstCategory={[Function]}
        getThankYouList={[Function]}
        isAddToRegistryFetching={false}
        isAddingQuickAddItemToList={true}
        isFetching={true}
        isFiltered={false}
        isMPulseEnabled={true}
        labels={
          Object {
            "QuickPicksCollection": Object {
              "BA1": "",
              "BRD": "",
            },
            "referredContent": Array [
              Object {
                "id": "9942",
                "key": "tymSurpriseContentHeading",
              },
              Object {
                "id": "9943",
                "key": "tymSurpriseContentSubHeading",
              },
              Object {
                "id": "9944",
                "key": "sendThankYouHeading",
              },
              Object {
                "id": "9945",
                "key": "sendThankYouDescription",
              },
            ],
          }
        }
        mPulseSiteConfig={
          Object {
            "PageSpecificMarks": Object {
              "ux-destination-verified": Array [
                "ux-text-registrant-name",
                "ux-text-event-date",
              ],
              "ux-primary-action-available": Array [],
              "ux-primary-content-displayed": Array [],
              "ux-secondary-content-displayed": Array [
                "ux-text-item-requested",
                "ux-text-item-purchased",
              ],
            },
          }
        }
        matchParamId={1}
        onComponentMount={[Function]}
        quickAddId="RM1001"
        quickItemAddedTS="InitialValue"
        regType="BRD"
        registryData={
          Object {
            "registryResVO": Object {
              "registrySummaryVO": Object {
                "eventType": "a",
                "giftRegistered": 0,
                "registryType": Object {
                  "registryTypeName": "BRD",
                },
              },
            },
          }
        }
        registryId={1}
        registryOwnerFirstCategoryList={
          Array [
            Object {
              "sku": 123,
            },
          ]
        }
        registrylist={
          Array [
            Object {
              "registryId": "12345",
            },
            Object {
              "registryId": "22222",
            },
            Object {
              "registryId": "33333",
            },
          ]
        }
        resetFirstCategoryCallFired={[Function]}
        resetGlobalNotification={[Function]}
        resetIsItemsFetchingStatus={[Function]}
        saveStoreInfo={[Function]}
        selectedFilterOption="View All"
        selectedFilters={Object {}}
        switchConfig={
          Object {
            "enableQuickAdd": true,
          }
        }
        updateFilterItemCount={[Function]}
        updateParam={[Function]}
        variation="Category"
      />
    </ErrorBoundary>
    <withRouter(RegistryOwnerLayout)
      anchorToItem={[Function]}
      contentIdArgs={
        Array [
          "9942",
          "9943",
          "9944",
          "9945",
        ]
      }
      deviceConfig={
        Object {
          "DESKTOP": 1024,
        }
      }
      emptyStoreData={[Function]}
      eventObject={
        Array [
          Object {
            "registryCode": 1,
          },
        ]
      }
      eventType="a"
      eventTypeCode={1}
      fetchSiteSpectDateSort={[Function]}
      filter=""
      filteredFirstCategoryItems={
        Array [
          Object {
            "sku": 125,
          },
        ]
      }
      filteredItemsCount={0}
      getEditRegistryData={[Function]}
      getHeaderLayout={false}
      getRegistryOwnerFirstCategory={[Function]}
      getThankYouList={[Function]}
      handleBopisCheckboxChange={[Function]}
      handleChangePickupInStore={[Function]}
      hasDiaperFund={false}
      isAddToRegistryFetching={false}
      isAddingQuickAddItemToList={true}
      isDiaperFundEnable={false}
      isFetching={true}
      isFiltered={false}
      isMPulseEnabled={true}
      isPreviewYrReg={false}
      isRegistryContentSlotReq={true}
      labels={
        Object {
          "QuickPicksCollection": Object {
            "BA1": "",
            "BRD": "",
          },
          "referredContent": Array [
            Object {
              "id": "9942",
              "key": "tymSurpriseContentHeading",
            },
            Object {
              "id": "9943",
              "key": "tymSurpriseContentSubHeading",
            },
            Object {
              "id": "9944",
              "key": "sendThankYouHeading",
            },
            Object {
              "id": "9945",
              "key": "sendThankYouDescription",
            },
          ],
        }
      }
      mPulseEnabled={true}
      mPulseSiteConfig={
        Object {
          "PageSpecificMarks": Object {
            "ux-destination-verified": Array [
              "ux-text-registrant-name",
              "ux-text-event-date",
            ],
            "ux-primary-action-available": Array [],
            "ux-primary-content-displayed": Array [],
            "ux-secondary-content-displayed": Array [
              "ux-text-item-requested",
              "ux-text-item-purchased",
            ],
          },
        }
      }
      matchParamId={1}
      onComponentMount={[Function]}
      productsCount={0}
      quickItemAddedTS="InitialValue"
      registryData={
        Object {
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "eventType": "a",
              "giftRegistered": 0,
              "registryType": Object {
                "registryTypeName": "BRD",
              },
            },
          },
        }
      }
      registryId={1}
      registryOwnerFirstCategoryList={
        Array [
          Object {
            "sku": 123,
          },
        ]
      }
      registrySummary={
        Object {
          "eventType": "a",
          "giftRegistered": 0,
          "registryType": Object {
            "registryTypeName": "BRD",
          },
        }
      }
      registrylist={
        Array [
          Object {
            "registryId": "12345",
          },
          Object {
            "registryId": "22222",
          },
          Object {
            "registryId": "33333",
          },
        ]
      }
      resetFirstCategoryCallFired={[Function]}
      resetGlobalNotification={[Function]}
      resetIsItemsFetchingStatus={[Function]}
      saveStoreInfo={[Function]}
      selectedFilterOption={Object {}}
      selectedFilters={Object {}}
      sortDataByDate={[Function]}
      switchConfig={
        Object {
          "enableQuickAdd": true,
        }
      }
      updateFilterItemCount={[Function]}
      updateParam={[Function]}
      updateSkuIdForAnchoring={[Function]}
      variation="Category"
    />
  </ErrorBoundary>
</Fragment>
```

