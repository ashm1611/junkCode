# `app/components/Pages/Registry/RecommendationsLayout/Recommendations/RecommendationList/RecommendationRow/tests/RecommendationRow.test.jsx`

#### `should render correctly when tab id=1`

```
<Fragment>
  <li
    className="listContainer mb2"
  >
    <PureComponent(GridX)
      className="container"
    >
      <PureComponent(Cell)
        className="large-3 sm-center"
      >
        <PureComponent(GridX)
          className="fullHeight"
        >
          <PureComponent(Cell)
            className="sm-py2 sm-pb2 sm-pt3 md-p3 collabBorder"
          >
            <div>
              <div
                className="fromCollab from sm-pb2"
              />
              <div
                className="nameRecommender sm-pb15"
                data-locator="registry_recommenderName"
              >
                XYZ
              </div>
              <div
                className="comment show"
                data-locator="registry_recommendationNote"
              >
                <span>
                  abcdesfg
                </span>
              </div>
            </div>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-9"
      >
        <PureComponent(GridX)
          className="md-p3 sm-py3"
        >
          <PureComponent(Cell)
            className="large-3"
          >
            <PureComponent(GridX)>
              <PureComponent(Cell)
                className="relative large-12 small-10 mx-auto sm-center sm-pt2 sm-pb15 imageContainer"
              >
                <wrapper
                  data-locator="registry_recommenderProductImage"
                >
                  &lt;img
    alt="test"
    src="9291514310568p?$146$?$imagePLP$&wid=256&hei=256"
  /&gt;
                </wrapper>
              </PureComponent(Cell)>
            </PureComponent(GridX)>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="pl1 sm-py2 large-5"
          >
            <PureComponent(GridX)>
              <PureComponent(Cell)
                className="ml2 large-8 small-10"
              >
                <span
                  className="m0 price"
                  data-locator="registry_recommendationPrice"
                />
                <div>
                  <wrapper
                    data-locator="registry_recommendationSkuName"
                  >
                    PRoduct name
                  </wrapper>
                  <Paragraph
                    className="m0 pb1"
                    data-locator="registry_recommendationColor"
                    tabindex="0"
                    theme="mediumLight"
                    weight=""
                  >
                    <span
                      className="bold"
                    >
                      Color- 
                    </span>
                    <wrapper>
                      red
                    </wrapper>
                  </Paragraph>
                  <Paragraph
                    className="m0 pb1"
                    data-locator="registry_recommendationSize"
                    tabindex="0"
                    theme="mediumLight"
                    weight=""
                  >
                    <span
                      className="bold"
                    >
                      Size- 
                    </span>
                    <wrapper>
                      big
                    </wrapper>
                  </Paragraph>
                  <span
                    data-locator="registry_recommendationRating"
                  >
                    <Rating
                      displayPLPFilters={false}
                      isNavigable={true}
                      isReviewContainerReq={true}
                      reviewsLabel=""
                      value={NaN}
                    />
                  </span>
                </div>
              </PureComponent(Cell)>
            </PureComponent(GridX)>
          </PureComponent(Cell)>
          <PureComponent(Cell)
            className="large-4 md-pl1 buttonContainer"
          >
            <div>
              <Button
                appearance="rounded"
                className="addNotification"
                disabled={true}
                theme=""
                variation="fullWidth"
              >
                <Icon
                  focusable="false"
                  height="18px"
                  type="checkmarkwhite"
                  width="16px"
                />
                 
                 
                Added to Registry
              </Button>
            </div>
          </PureComponent(Cell)>
        </PureComponent(GridX)>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </li>
</Fragment>
```

