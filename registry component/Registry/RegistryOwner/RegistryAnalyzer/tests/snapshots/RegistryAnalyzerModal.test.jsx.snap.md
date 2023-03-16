# `app/components/Pages/Registry/RegistryOwner/RegistryAnalyzer/tests/RegistryAnalyzerModal.test.jsx`

## `MyAnalyzer text and icon`

####   ``should render myAnalyzerTextandIcon when `hasRegAnalyzerBtnShown` is true``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      Add something for everyone.
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      Balance your registry with items at a variety of prices, so your friends and family can find you the perfect gift.
    </p>
  </div>
  <div
    className="errorMszWrapper center"
  >
    <span
      className="mr1"
    >
      Hmm... we couldn't load it that time.
    </span>
    <Button
      className={null}
      onClick={[Function]}
      theme="ghost"
      variation="noHorizontalPadding"
    >
      <span>
        Try again
      </span>
    </Button>
  </div>
</Fragment>
```

## `app,components,Pages,Registry,RegistryOwner,RegistryAnalyzer,tests,RegistryAnalyzerModal.test.jsx - MyAnalyzer Modal`

####   ``should render skeleton when `isRegAnalyzerFetching` is true``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      Add something for everyone.
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      Balance your registry with items at a variety of prices, so your friends and family can find you the perfect gift.
    </p>
  </div>
  <div
    className="loadingWrapper center"
  >
    <Skeleton />
  </div>
  <Connect(wrapper) />
</Fragment>
```

####   ``should render ErrorView when `isRegAnalyzerFetching` is false and `regAnalyzerData` is null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      Add something for everyone.
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      Balance your registry with items at a variety of prices, so your friends and family can find you the perfect gift.
    </p>
  </div>
  <div
    className="errorMszWrapper center"
  >
    <span
      className="mr1"
    >
      Hmm... we couldn't load it that time.
    </span>
    <Button
      className={null}
      onClick={[Function]}
      theme="ghost"
      variation="noHorizontalPadding"
    >
      <span>
        Try again
      </span>
    </Button>
  </div>
</Fragment>
```

####   ``should render ScorecardView  when `isRegAnalyzerFetching` is false and `regAnalyzerData` is not null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      Add something for everyone.
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      Balance your registry with items at a variety of prices, so your friends and family can find you the perfect gift.
    </p>
  </div>
  <div
    data-locator="registry-analyzer-scorecard-section"
  >
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="0"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-0"
          level={3}
        >
          Under $25
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-0"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#f7f7f7"
          barHeight=""
          barWidth="100%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-0",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-0"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Recommended:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      0
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Added so far:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      0
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      Left to add:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="barEmpty progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-0"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          Add More
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-0"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          Add More
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="1"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-1"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-1"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#f7c15c"
          barHeight=""
          barWidth="100%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-1",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-1"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Recommended:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Added so far:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      Left to add:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="barFull progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        >
          <Img
            alt=""
            className="imgGoodJob"
            reactImage={true}
            src="/static/assets/images/good-job.png"
          />
        </BarChart>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-1"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          Add More
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-1"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          Add More
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="2"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-2"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-2"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#25689d"
          barHeight=""
          barWidth="96%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-2",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-2"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Recommended:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      100
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Added so far:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      96
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      Left to add:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-2"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          Add More
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-2"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          Add More
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="3"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-3"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-3"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#e0544f"
          barHeight=""
          barWidth="50%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-3",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-3"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Recommended:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Added so far:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      1
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      Left to add:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-3"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          Add More
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-3"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          Add More
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="4"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-4"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-4"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#10838b"
          barHeight=""
          barWidth="9%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-4",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-4"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Recommended:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      100
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      Added so far:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      8
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      Left to add:
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-4"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          Add More
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-4"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          Add More
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </div>
</Fragment>
```

####   ``should render ErrorView  when `isRegAnalyzerFetching` is false, `regAnalyzerData` is not null but `priceRangeList` is null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      Add something for everyone.
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      Balance your registry with items at a variety of prices, so your friends and family can find you the perfect gift.
    </p>
  </div>
  <div
    className="errorMszWrapper center"
  >
    <span
      className="mr1"
    >
      Hmm... we couldn't load it that time.
    </span>
    <Button
      className={null}
      onClick={[Function]}
      theme="ghost"
      variation="noHorizontalPadding"
    >
      <span>
        Try again
      </span>
    </Button>
  </div>
</Fragment>
```

## `app,components,Pages,Registry,RegistryOwner,RegistryAnalyzer,tests,RegistryAnalyzerModal.test.jsx - MyAnalyzer Modal`

####   ``should render skeleton when `isRegAnalyzerFetching` is true``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      regAnalyzerHeading
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      regAnalyzerIntroStatement
    </p>
  </div>
  <div
    className="loadingWrapper center"
  >
    <Skeleton />
  </div>
  <Connect(wrapper) />
</Fragment>
```

####   ``should render ErrorView when `isRegAnalyzerFetching` is false and `regAnalyzerData` is null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      regAnalyzerHeading
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      regAnalyzerIntroStatement
    </p>
  </div>
  <div
    className="errorMszWrapper center"
  >
    <span
      className="mr1"
    >
      regAnalyzerErrorMsz
    </span>
    <Button
      className={null}
      onClick={[Function]}
      theme="ghost"
      variation="noHorizontalPadding"
    >
      <span>
        regAnalyzerErrorBtn
      </span>
    </Button>
  </div>
</Fragment>
```

####   ``should render ScorecardView  when `isRegAnalyzerFetching` is false and `regAnalyzerData` is not null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      regAnalyzerHeading
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      regAnalyzerIntroStatement
    </p>
  </div>
  <div
    data-locator="registry-analyzer-scorecard-section"
  >
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="0"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-0"
          level={3}
        >
          Under $25
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-0"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#f7f7f7"
          barHeight=""
          barWidth="100%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-0",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-0"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipRecommendedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      0
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipAddedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      0
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      regAnalyzerTooltipLeftToAddTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="barEmpty progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-0"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          regAnalyzerAddMoreBtn
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-0"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          regAnalyzerAddMoreBtn
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="1"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-1"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-1"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#f7c15c"
          barHeight=""
          barWidth="100%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-1",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-1"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipRecommendedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipAddedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      regAnalyzerTooltipLeftToAddTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="barFull progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        >
          <Img
            alt=""
            className="imgGoodJob"
            reactImage={true}
            src="/static/assets/images/good-job.png"
          />
        </BarChart>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-1"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          regAnalyzerAddMoreBtn
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-1"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          regAnalyzerAddMoreBtn
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="2"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-2"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-2"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#25689d"
          barHeight=""
          barWidth="96%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-2",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-2"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipRecommendedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      100
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipAddedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      96
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      regAnalyzerTooltipLeftToAddTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-2"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          regAnalyzerAddMoreBtn
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-2"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          regAnalyzerAddMoreBtn
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="3"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-3"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-3"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#e0544f"
          barHeight=""
          barWidth="50%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-3",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-3"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipRecommendedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      2
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipAddedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      1
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      regAnalyzerTooltipLeftToAddTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-3"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          regAnalyzerAddMoreBtn
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-3"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          regAnalyzerAddMoreBtn
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
    <PureComponent(GridX)
      className="scorecardWrapper"
      key="4"
    >
      <PureComponent(Cell)
        className="large-2 small-12 sm-mb2"
      >
        <Heading
          className="scorecardPrice"
          data-locator="registry-analyzer-scorecard-price-range-4"
          level={3}
        >
          $25 - $50
        </Heading>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-8 small-12 sm-mb2 md-pr4 md-pl3"
        data-locator="registry-analyzer-scorecard-progress-bar-4"
      >
        <BarChart
          barChartWrapperClassName="barChartWrapper"
          barColor="#10838b"
          barHeight=""
          barWidth="9%"
          dataToolTip={
            Object {
              "dataFor": "scorecard-4",
              "dataPlace": "bottom",
              "dataTip": <div
                className="innerWidthTooltip"
                data-locator="registry-analyzer-scorecard-tooltip-4"
              >
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipRecommendedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      100
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip table"
                >
                  <div
                    className="leftContentTooltip table-cell small-9"
                  >
                    <span>
                      regAnalyzerTooltipAddedTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong>
                      8
                    </strong>
                  </div>
                </div>
                <div
                  className="rowWrapperTooltip remainingItemsTooltip table pt1 mt1"
                >
                  <div
                    className="leftContentTooltip table-cell small-9 align-middle"
                  >
                    <span>
                      regAnalyzerTooltipLeftToAddTxt
                    </span>
                  </div>
                  <div
                    className="rightContentTooltip table-cell small-3 right-align"
                  >
                    <strong />
                  </div>
                </div>
              </div>,
              "dataType": "info",
            }
          }
          displayCustomHTMLTooltip={true}
          displayToolTip={true}
          displayToolTipIcon={true}
          displayToolTipOnIconClick={true}
          iconProps={
            Object {
              "height": "18px",
              "type": "i-icon",
              "width": "18px",
            }
          }
          progressBarClassName={null}
          progressFillClassName="progressFill"
          progressTrackClassName={null}
          toolTipIconClassName="toolTipIcon"
          trackColor="#f7f7f7"
          type="horizontal"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-2 small-12"
      >
        <Button
          className="addMoreBtnMob md-hide lg-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-4"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="ghost"
          variation="noHorizontalPadding"
        >
          regAnalyzerAddMoreBtn
        </Button>
        <Button
          className="addMoreBtn xs-hide sm-hide"
          data-locator="registry-analyzer-scorecard-add-more-btn-4"
          href="undefined/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2"
          onClick={[Function]}
          textDecoration="textDecorationNone"
          theme="secondaryStrokeBasic"
          variation="fullWidth"
        >
          regAnalyzerAddMoreBtn
        </Button>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </div>
</Fragment>
```

####   ``should render ErrorView  when `isRegAnalyzerFetching` is false, `regAnalyzerData` is not null but `priceRangeList` is null``

```
<Fragment>
  <div
    className="mb3"
  >
    <Heading
      className="sm-center mb1"
      data-locator="registry-analyzer-heading"
      level={2}
      styleVariation="h2-serif"
    >
      regAnalyzerHeading
    </Heading>
    <p
      className="introWrapper sm-center mt0"
      data-locator="registry-analyzer-intro-statement"
    >
      regAnalyzerIntroStatement
    </p>
  </div>
  <div
    className="errorMszWrapper center"
  >
    <span
      className="mr1"
    >
      regAnalyzerErrorMsz
    </span>
    <Button
      className={null}
      onClick={[Function]}
      theme="ghost"
      variation="noHorizontalPadding"
    >
      <span>
        regAnalyzerErrorBtn
      </span>
    </Button>
  </div>
</Fragment>
```

