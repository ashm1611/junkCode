# `app/containers/Pages/Registry/GuestViewer/tests/GuestViewer.test.jsx`

#### `should render correctly`

```
<Fragment>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <Connect(wrapper) />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <GuestViewerLayout
      akamaiData={
        Object {
          "zip": "68046",
        }
      }
      anchoredSkuCategoryId={null}
      barcodeModalText={null}
      buyOffContext="abc"
      changeFilter={[Function]}
      checkBoxChecked={false}
      clearSubmitResponse={[Function]}
      collaborationGiftHelpContent={[Function]}
      dynamicContentState={
        Object {
          "content": Object {
            "11329": Object {
              "components": Array [
                Object {
                  "foo": "bar",
                },
              ],
            },
          },
        }
      }
      emailSentResponse={null}
      enableCashFund={true}
      enableSearchFlag={[Function]}
      eventType={null}
      favoriteStore={
        Object {
          "userSiteItems": Object {
            "favouriteStoreId": "",
          },
        }
      }
      fetchSiteSpectDateSort={[Function]}
      filter=""
      getHelp={null}
      getPerfectGift={null}
      getProfile={[Function]}
      getRefContent={[Function]}
      getRegistryFirstCategory={[Function]}
      getRegistryGuestData={[Function]}
      getWarrantyInfo={null}
      globalSwitchConfig={
        Object {
          "enableCSLabels": true,
          "globalMPulseEnable": true,
        }
      }
      handleBopisCheckboxChange={[Function]}
      handleChangePickupInStore={[Function]}
      handleCheckBox={[Function]}
      handleFirstCategoryCall={[Function]}
      interactiveCheckList={
        Object {
          "averageC1Percentage": 30,
        }
      }
      isBackButtonPressed="true"
      isBopisFeatureEnable={true}
      isDiaperFundEnable={false}
      isFiltered={false}
      isItemsFetching={false}
      isMPulseEnabled="true"
      isPOBoxAddress={null}
      isPickupInStoreModalOpen={true}
      isRegistryContentSlotReq={true}
      labels={
        Object {
          "registryDetails": Object {
            "referredContent": Array [
              Object {
                "id": "11329",
                "key": "needHelp",
              },
              Object {
                "id": "9942",
                "key": "tymSurpriseContentHeading",
              },
              Object {
                "id": "9943",
                "key": "tymSurpriseContentSubHeading",
              },
            ],
          },
        }
      }
      location={
        Object {
          "search": "?sorting=2",
        }
      }
      mPulseEnabled="true"
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
      profileData={
        Object {
          "repositoryId": "1111",
        }
      }
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
      registryCode="BIR"
      registryData={
        Object {
          "dataFromSolrCall": true,
          "registryResVO": Object {
            "registrySummaryVO": Object {
              "diaperFundEnabled": undefined,
              "giftRegistered": undefined,
              "giftTotalPurchased": undefined,
              "registryType": Object {
                "registryTypeName": undefined,
              },
              "storedValueOptIn": undefined,
            },
            "registryVO": Object {
              "tnGiftsPurchased": undefined,
            },
          },
        }
      }
      registryFirstCategoryList={
        Object {
          "categoryBuckets": Object {
            "catSeoUrl": null,
            "categoryId": "10003_FINEDININGGIFTWARE",
            "displayName": "FINE DINING & GIFTWARE",
            "recommandedLinks": null,
          },
        }
      }
      registryId="12345"
      searchRegistryUrl="/test"
      selectedDropdownOption="Date"
      selectedFilterOption="View All"
      setBuyOffContextValue={[Function]}
      submitForm={[Function]}
      switchConfig={
        Object {
          "enableMPulse": true,
        }
      }
      tilesView="3"
      updateBopisCheckBoxState={[Function]}
      updateSkuIdForAnchoring={[Function]}
    />
  </ErrorBoundary>
  <ErrorBoundary
    fallback={null}
    routeToSystemErrorPage={false}
  >
    <UniversalComponent
      changeStore={true}
      enableSearchFlag={[Function]}
      registryId="12345"
      showSearchFlag={false}
    />
    <withRouter(Connect(RegistryGuestWlcmeMsgForRecommender))
      labels={
        Object {
          "registryDetails": Object {
            "referredContent": Array [
              Object {
                "id": "11329",
                "key": "needHelp",
              },
              Object {
                "id": "9942",
                "key": "tymSurpriseContentHeading",
              },
              Object {
                "id": "9943",
                "key": "tymSurpriseContentSubHeading",
              },
            ],
          },
        }
      }
    />
  </ErrorBoundary>
</Fragment>
```

