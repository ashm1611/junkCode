# `app/components/Pages/Registry/SearchResults/tests/RegistrySearchResults.test.jsx`

#### `should render RegistrySearchResults component correctly`

```
<Fragment>
  <script
    dangerouslySetInnerHTML={
      Object {
        "__html": "window.instrumentation.setPageMarks({
      \"PageViewMarks\":{\"ux-destination-verified\":[\"ux-text-registry-search-title\"],\"ux-primary-content-displayed\":[],\"ux-primary-action-available\":[\"ux-content-registry-search-cta\",\"ux-content-registry-search-form\"],\"ux-secondary-content-displayed\":[]}});
      window.instrumentation.removeConditionalMarksFlag(
        'ux-destination-verified',
        'ux-action-before-load'
      );
  ",
      }
    }
  />
  <section>
    <ErrorBoundary
      fallback={<PureComponent(InternalServerErrorPage) />}
      routeToSystemErrorPage={false}
    >
      <SearchHeader
        allowFormSubmit={false}
        channelType=""
        correctedSpelling=""
        disallowedSpecialCharacters=""
        isBusy={false}
        items={
          Array [
            Object {
              "coreg_first_name": "Johnson",
              "coreg_last_name": "Johnson",
              "display_event_date": "January 11, 2018",
              "display_initials": "JJ + JJ",
              "display_name": "Johnson Johnson & Johnson Johnson",
              "display_state_code": "IL",
              "event_type": "OTH",
              "event_type_description": "Other",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Johnson",
              "reg_last_name": "Johnson",
              "registry_num": "545403975",
              "score": 7.3058124,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "John",
              "display_event_date": "June 03, 2017",
              "display_initials": "JJ + JJ",
              "display_name": "John John & John John",
              "display_state_code": "WA",
              "event_type": "BRD",
              "event_type_description": "Wedding",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "John",
              "reg_last_name": "John",
              "registry_num": "543829018",
              "score": 7.3058124,
            },
            Object {
              "coreg_first_name": "Concelray",
              "coreg_last_name": "Johnson",
              "display_event_date": "June 03, 2015",
              "display_initials": "CJ + CJ",
              "display_name": "Concelray Johnson & Concelray Johnson",
              "display_state_code": "NJ",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Concelray",
              "reg_last_name": "Johnson",
              "registry_num": "541845105",
              "score": 7.0923805,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "",
              "display_event_date": "July 13, 2017",
              "display_initials": "JJ + JG",
              "display_name": "Johnna Johncox & John Gentner",
              "display_state_code": "NY",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Johnna",
              "reg_last_name": "Johncox",
              "registry_num": "544412747",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "May 10, 2018",
              "display_initials": "MJ + JJ",
              "display_name": "Mary Johnson & John Johnson",
              "display_state_code": "TN",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Mary",
              "reg_last_name": "Johnson",
              "registry_num": "545348031",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "June 02, 2018",
              "display_initials": "AJ + JJ",
              "display_name": "Ashlee Johnson & John Johnson",
              "display_state_code": "AZ",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Ashlee",
              "reg_last_name": "Johnson",
              "registry_num": "545480634",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "October 08, 2016",
              "display_initials": "KJ + JJ",
              "display_name": "Kayla Johnson & John Johnson",
              "display_state_code": "TX",
              "event_type": "BRD",
              "event_type_description": "Wedding",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Kayla",
              "reg_last_name": "Johnson",
              "registry_num": "543025395",
              "score": 7.0570307,
            },
          ]
        }
        labels={Object {}}
        mPulseEnabled={true}
        noResultsSearchTerm=""
        numFound={40}
        onChange={[Function]}
        onChangeMode={[Function]}
        onSubmit={[Function]}
        params={
          Object {
            "perPage": "25",
            "start": "10",
          }
        }
        regions={
          Object {
            "second": Array [
              Object {
                "data": Object {
                  "CTA": Object {
                    "primary_button": Object {
                      "displayName": "Start a Registry",
                      "url": "/test",
                    },
                    "secondary_button": Object {
                      "displayName": "Start a Registry in Store",
                      "url": "/test1",
                    },
                  },
                  "Response": "Success",
                  "question_text": "Got a question",
                  "statusCode": 200,
                  "subtitle_text": "Get started to build your registry online or with an expert in a store near you.",
                  "title": "Let's build your perfect registry",
                },
                "name": "RegistryFindRegistry",
                "params": Object {
                  "id": "8591",
                  "style": "",
                },
              },
              Object {
                "data": Object {
                  "Response": "Success",
                  "cta": Object {
                    "displayName": "Sign in",
                    "url": "/sign-in",
                  },
                  "field_visual": Array [
                    Object {
                      "field_alt_attribute": "Wedding",
                      "field_cta_label": "Wedding",
                      "field_cta_url": "/test",
                      "field_image": "https://s7d2.scene7.com/is/image/BedBathandBeyond/63966716353795p'",
                    },
                    Object {
                      "field_alt_attribute": "Shopping",
                      "field_cta_label": "Shopping",
                      "field_cta_url": "/test2",
                      "field_image": "https://s7d2.scene7.com/is/image/BedBathandBeyond/63966716353795p'",
                    },
                  ],
                  "statusCode": 200,
                  "subtitle_text": "Already have a registry?",
                  "title": "The best registry around for every occassion",
                },
                "name": "RegistryOccasions",
                "params": Object {
                  "id": "9252",
                  "style": "",
                },
              },
            ],
            "third": Array [
              Object {
                "data": Object {
                  "Response": "Success",
                  "adIds": Array [
                    "PLP_1",
                    "PLP_2",
                    "PLP_3",
                  ],
                  "statusCode": 200,
                },
                "name": "GoogleDFP",
                "params": Object {
                  "id": "9232",
                  "style": "",
                },
              },
            ],
          }
        }
        registryId=""
        resetFormInput={[Function]}
        searchMode="byName"
        searchTerm=""
        selectedFilters={Object {}}
        showNoResults={false}
      />
    </ErrorBoundary>
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <RegistryFilters
        appliedFilters={[Function]}
        appliedFiltersOrderedSet={
          Object {
            "size": 0,
          }
        }
        className="registryFilter"
        clearSelectedFilters={[Function]}
        fetchFacetResults={[Function]}
        labels={Object {}}
        mPulseEnabled={true}
        scrollFiltersTop={true}
        showNarrowSearchResults={false}
        updateSelectedFilters={[Function]}
      />
    </ErrorBoundary>
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <RegistryResultsGrid
        channelType=""
        items={
          Array [
            Object {
              "coreg_first_name": "Johnson",
              "coreg_last_name": "Johnson",
              "display_event_date": "January 11, 2018",
              "display_initials": "JJ + JJ",
              "display_name": "Johnson Johnson & Johnson Johnson",
              "display_state_code": "IL",
              "event_type": "OTH",
              "event_type_description": "Other",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Johnson",
              "reg_last_name": "Johnson",
              "registry_num": "545403975",
              "score": 7.3058124,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "John",
              "display_event_date": "June 03, 2017",
              "display_initials": "JJ + JJ",
              "display_name": "John John & John John",
              "display_state_code": "WA",
              "event_type": "BRD",
              "event_type_description": "Wedding",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "John",
              "reg_last_name": "John",
              "registry_num": "543829018",
              "score": 7.3058124,
            },
            Object {
              "coreg_first_name": "Concelray",
              "coreg_last_name": "Johnson",
              "display_event_date": "June 03, 2015",
              "display_initials": "CJ + CJ",
              "display_name": "Concelray Johnson & Concelray Johnson",
              "display_state_code": "NJ",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Concelray",
              "reg_last_name": "Johnson",
              "registry_num": "541845105",
              "score": 7.0923805,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "",
              "display_event_date": "July 13, 2017",
              "display_initials": "JJ + JG",
              "display_name": "Johnna Johncox & John Gentner",
              "display_state_code": "NY",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Johnna",
              "reg_last_name": "Johncox",
              "registry_num": "544412747",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "May 10, 2018",
              "display_initials": "MJ + JJ",
              "display_name": "Mary Johnson & John Johnson",
              "display_state_code": "TN",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Mary",
              "reg_last_name": "Johnson",
              "registry_num": "545348031",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "June 02, 2018",
              "display_initials": "AJ + JJ",
              "display_name": "Ashlee Johnson & John Johnson",
              "display_state_code": "AZ",
              "event_type": "BA1",
              "event_type_description": "Baby",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Ashlee",
              "reg_last_name": "Johnson",
              "registry_num": "545480634",
              "score": 7.0570307,
            },
            Object {
              "coreg_first_name": "John",
              "coreg_last_name": "Johnson",
              "display_event_date": "October 08, 2016",
              "display_initials": "KJ + JJ",
              "display_name": "Kayla Johnson & John Johnson",
              "display_state_code": "TX",
              "event_type": "BRD",
              "event_type_description": "Wedding",
              "is_public": "Y",
              "is_searchable": "Y",
              "reg_first_name": "Kayla",
              "reg_last_name": "Johnson",
              "registry_num": "543025395",
              "score": 7.0570307,
            },
          ]
        }
        labels={Object {}}
        mPulseEnabled={true}
        makeReviewYourProductsConfig={Object {}}
        onNextPage={[Function]}
        onSubmit={[Function]}
        photoEndpoint="https://s22.socialannex.com/v2/api/photoregistry/images/9411181"
        threshold={200}
      />
    </ErrorBoundary>
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <PureComponent(GridContainer)>
        <PureComponent(GridX)>
          <PureComponent(Cell)>
            <div
              className="my0"
              id="region1"
            />
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(GridContainer)>
    </ErrorBoundary>
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <PureComponent(GridContainer)>
        <PureComponent(GridX)>
          <PureComponent(Cell)>
            <div
              className="my0"
              id="region2"
            >
              <GoogleDFP
                item={
                  Object {
                    "data": Object {
                      "Response": "Success",
                      "adIds": Array [
                        "PLP_1",
                        "PLP_2",
                        "PLP_3",
                      ],
                      "statusCode": 200,
                    },
                    "name": "GoogleDFP",
                    "params": Object {
                      "id": "9232",
                      "style": "",
                    },
                  }
                }
                key="0"
                labels={Object {}}
                wrapperId="region2"
              />
            </div>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(GridContainer)>
    </ErrorBoundary>
  </section>
</Fragment>
```

