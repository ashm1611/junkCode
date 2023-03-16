# `app/components/Pages/Registry/RecommendationsLayout/tests/RecommendationsLayout.test.jsx`

#### `should call componentWillReceiveProps method`

```
<Fragment>
  <div>
    <div
      className="containerGrey"
    >
      <section
        aria-labelledby="get-recommendations"
        className="grid-container"
        id="getRecommendations"
        role="region"
      >
        <PureComponent(GridX)
          className="pt3 pb2 recommendationHeadingBorder"
        >
          <PureComponent(Cell)
            className="large-10 small-9"
          >
            <Heading
              className="recommendationsHeading"
              level={2}
            >
              recommendations
            </Heading>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </section>
    </div>
    <section
      aria-labelledby="quiz-recommendations"
      className="containerGrey"
      role="region"
    >
      <PureComponent(GridX)>
        <UniversalComponent
          fromRecomendation={true}
          match={
            Object {
              "params": Object {
                "collectionId": "123",
              },
            }
          }
          personaType="Modern"
          renderQuizQnALayout={[Function]}
        />
      </PureComponent(GridX)>
    </section>
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        activeRegistry={
          Object {
            "eventType": "Baby",
            "registryId": "123",
          }
        }
        contentState={
          Object {
            "content": Object {
              "123": Object {
                "key1": "val1",
              },
            },
          }
        }
        deviceConfig="config"
        fetchContentStack={[Function]}
        getContent={[Function]}
        getRecommendations={[Function]}
        globalSwitchConfig={Object {}}
        isBabySite={true}
        isFromRecommendation={true}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        personaType="Modern"
        props={
          Object {
            "activeRegistry": Object {
              "eventType": "Baby",
              "registryId": "123",
            },
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "isFromRecommendation": true,
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationList={
          Object {
            "categoryBucketsForRecommendation": Object {
              "DC158375785:Szs Sdsz": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
              "associate": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
            },
          }
        }
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        recommenderSummary={
          Object {
            "0": Object {
              "abc": "data",
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        renderGuideAndTools={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        setQuizFromRecommendation={[Function]}
        siteId="BedBathUS"
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

#### `should render correctly`

```
<Fragment>
  <div>
    <section
      aria-labelledby="get-recommendations"
      className="grid-container recommendationContainer"
      id="getRecommendations"
      role="region"
    >
      <PureComponent(GridX)
        className="pt3 pb2 recommendationHeadingBorder"
      >
        <PureComponent(Cell)
          className="large-10 small-9"
        >
          <Heading
            className=""
            level={2}
          >
            Recommendations
          </Heading>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </section>
    <section
      aria-labelledby="quiz-recommendations"
      className="containerGrey"
      role="region"
    >
      <PureComponent(GridX)
        className="grid-container"
      >
        <div
          className="fullWidth"
        >
          <PureComponent(GridX)
            className="grid-container mt3 quizNotTakenHeader"
          >
            <PureComponent(Cell)
              className="large-10"
            >
              <Heading
                className="pt15 pb1 title"
                level={1}
              >
                Looking for personalized recs?
              </Heading>
              <PureComponent(Cell)
                className="pb15"
              >
                View the recommendations based on your most recent quiz, or take it again for new recs!
              </PureComponent(Cell)>
              <Button
                className="mb15 btnWidth"
                data-locator="recommendation-takeQuiz"
                onClick={[Function]}
                theme="secondary"
              >
                take our quiz
              </Button>
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="rightImage large-2"
            >
              <Img
                alt="babyConfRight"
                reactImage={true}
                src="/static/assets/images/babyConfRight.png"
              />
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </div>
      </PureComponent(GridX)>
    </section>
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        activeRegistry={
          Object {
            "eventType": "Baby",
            "registryId": "123",
          }
        }
        contentState={
          Object {
            "content": Object {
              "123": Object {
                "key1": "val1",
              },
            },
          }
        }
        deviceConfig="config"
        fetchContentStack={[Function]}
        getContent={[Function]}
        getRecommendations={[Function]}
        globalSwitchConfig={Object {}}
        history={
          Object {
            "location": Object {
              "search": "isFromSeeResults=true",
            },
          }
        }
        isBabySite={true}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        props={
          Object {
            "activeRegistry": Object {
              "eventType": "Baby",
              "registryId": "123",
            },
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "history": Object {
              "location": Object {
                "search": "isFromSeeResults=true",
              },
            },
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationList={
          Object {
            "categoryBucketsForRecommendation": Object {
              "DC158375785:Szs Sdsz": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
              "associate": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
            },
          }
        }
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        recommenderSummary={
          Object {
            "0": Object {
              "abc": "data",
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        renderGuideAndTools={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        siteId="BedBathUS"
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

#### `should renderQuizRecommendationContent  correctly`

```
<Fragment>
  <div>
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        activeRegistry={
          Object {
            "registryId": "123",
          }
        }
        contentState={
          Object {
            "content": Object {
              "123": Object {
                "key1": "val1",
              },
            },
          }
        }
        deviceConfig="config"
        fetchContentStack={[Function]}
        getContent={[Function]}
        getRecommendations={[Function]}
        globalSwitchConfig={Object {}}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        props={
          Object {
            "activeRegistry": Object {
              "registryId": "123",
            },
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationList={
          Object {
            "categoryBucketsForRecommendation": Object {
              "DC158375785:Szs Sdsz": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
              "associate": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
            },
          }
        }
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        recommenderSummary={
          Object {
            "0": Object {
              "abc": "data",
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        renderGuideAndTools={[Function]}
        renderQuizRecommendationContent={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        siteId="BedBathUS"
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

#### `should renderQuizNotTakenRecommendation  correctly`

```
<Fragment>
  <div>
    <section
      aria-labelledby="quiz-recommendations"
      className="containerGrey"
      role="region"
    >
      <PureComponent(GridX)
        className="grid-container"
      >
        <PureComponent(Cell)>
          <Heading
            className="pt3 pb2 sm-mb125 quizRecommendationHeading"
            level={1}
          >
            Your Recommendations
          </Heading>
        </PureComponent(Cell)>
        <div
          className="fullWidth"
        >
          <PureComponent(GridX)
            className="grid-container mt3 quizNotTakenHeader"
          >
            <PureComponent(Cell)
              className="large-10"
            >
              <Heading
                className="pt15 pb1 title"
                level={1}
              >
                Looking for personalized recs?
              </Heading>
              <PureComponent(Cell)
                className="pb15"
              >
                View the recommendations based on your most recent quiz, or take it again for new recs!
              </PureComponent(Cell)>
              <Button
                className="mb15 btnWidth"
                data-locator="recommendation-takeQuiz"
                onClick={[Function]}
                theme="secondary"
              >
                take our quiz
              </Button>
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="rightImage large-2"
            >
              <Img
                alt="babyConfRight"
                reactImage={true}
                src="/static/assets/images/babyConfRight.png"
              />
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </div>
      </PureComponent(GridX)>
    </section>
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        activeRegistry={
          Object {
            "registryId": "123",
          }
        }
        contentState={
          Object {
            "content": Object {
              "123": Object {
                "key1": "val1",
              },
            },
          }
        }
        deviceConfig="config"
        fetchContentStack={[Function]}
        getContent={[Function]}
        getRecommendations={[Function]}
        globalSwitchConfig={Object {}}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        personaType=""
        props={
          Object {
            "activeRegistry": Object {
              "registryId": "123",
            },
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationList={
          Object {
            "categoryBucketsForRecommendation": Object {
              "DC158375785:Szs Sdsz": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
              "associate": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
            },
          }
        }
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        recommenderSummary={
          Object {
            "0": Object {
              "abc": "data",
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        registryResVO={
          Object {
            "registrySummaryVO": Object {
              "personaName": "Modern",
            },
          }
        }
        renderGuideAndTools={[Function]}
        renderQuizRecommendationContent={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        siteId="BedBathUS"
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

#### `should render QuickPicksRecommendation for RecommendationsLayout`

```
<Fragment>
  <div>
    <section
      aria-labelledby="quiz-recommendations"
      className="containerGrey"
      role="region"
    >
      <PureComponent(GridX)
        className="grid-container"
      >
        <PureComponent(Cell)>
          <Heading
            className="pt3 pb2 sm-mb125 quizRecommendationHeading"
            level={1}
          >
            Your Recommendations
          </Heading>
        </PureComponent(Cell)>
        <UniversalComponent
          fromRecomendation={true}
          match={
            Object {
              "params": Object {
                "collectionId": "123",
              },
            }
          }
          personaType="Modern"
          renderQuizQnALayout={[Function]}
        />
      </PureComponent(GridX)>
    </section>
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        activeRegistry={
          Object {
            "registryId": "123",
          }
        }
        contentState={
          Object {
            "content": Object {
              "123": Object {
                "key1": "val1",
              },
            },
          }
        }
        deviceConfig="config"
        fetchContentStack={[Function]}
        getContent={[Function]}
        getRecommendations={[Function]}
        globalSwitchConfig={Object {}}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        personaType="Modern"
        props={
          Object {
            "activeRegistry": Object {
              "registryId": "123",
            },
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationList={
          Object {
            "categoryBucketsForRecommendation": Object {
              "DC158375785:Szs Sdsz": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
              "associate": Array [
                Object {
                  "acceptedQuantity": 0,
                  "declinedQuantity": 0,
                  "fullName": "Karan M",
                  "profileActive": true,
                  "recommendedQuantity": 1,
                },
              ],
            },
          }
        }
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        recommenderSummary={
          Object {
            "0": Object {
              "abc": "data",
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        renderGuideAndTools={[Function]}
        renderQuizRecommendationContent={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        siteId="BedBathUS"
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

#### `should render Loader`

```
<Fragment>
  <div>
    <SectionLoader />
    <div
      className="recommendationGrey"
    />
    <ErrorBoundary
      fallback={null}
      routeToSystemErrorPage={false}
    >
      <Connect(wrapper)
        getContent={[Function]}
        getRecommendations={[Function]}
        isRegistryPublic={null}
        labels={
          Object {
            "referredContent": Array [
              Object {
                "id": "123",
                "key": "registryGuidesAndToolsContent",
              },
              Object {
                "id": "124",
                "key": "guideAndTools",
              },
            ],
            "registryDetails": Object {},
          }
        }
        match={
          Object {
            "params": Object {
              "id": "123",
            },
          }
        }
        personaType="Modern"
        props={
          Object {
            "activeRegistry": "",
            "contentState": Object {
              "content": Object {
                "123": Object {
                  "key1": "val1",
                },
              },
            },
            "deviceConfig": "config",
            "fetchContentStack": [Function],
            "quickPickId": "123",
            "recommendationList": Object {
              "categoryBucketsForRecommendation": Object {
                "DC158375785:Szs Sdsz": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
                "associate": Array [
                  Object {
                    "acceptedQuantity": 0,
                    "declinedQuantity": 0,
                    "fullName": "Karan M",
                    "profileActive": true,
                    "recommendedQuantity": 1,
                  },
                ],
              },
            },
            "recommenderSummary": Object {
              "0": Object {
                "abc": "data",
              },
            },
            "siteId": "BedBathUS",
            "switchConfig": Object {
              "enableRecommendationsPublicEmptyView": true,
              "enableRecommendationsView": true,
              "enableRegistryQuiz": true,
            },
          }
        }
        quickPickId="123"
        recommendationSortConfig={
          Object {
            "id": Object {
              "tabId": 0,
            },
          }
        }
        registryData={
          Object {
            "recommendationCount": Array [
              0,
              0,
            ],
          }
        }
        renderGuideAndTools={[Function]}
        renderRecommendationContent={[Function]}
        renderRecommendationsEmptyView={[Function]}
        sortRecommendationList={[Function]}
        switchConfig={
          Object {
            "enableRecommendationsPublicEmptyView": true,
            "enableRecommendationsView": true,
            "enableRegistryQuiz": true,
          }
        }
      />
    </ErrorBoundary>
  </div>
</Fragment>
```

