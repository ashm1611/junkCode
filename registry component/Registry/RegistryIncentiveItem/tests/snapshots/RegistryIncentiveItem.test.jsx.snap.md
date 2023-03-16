# `app/components/Pages/Registry/RegistryIncentiveItem/tests/RegistryIncentiveItem.test.jsx`

#### `should render correctly`

```
<PureComponent(Cell)
  className="large-3 small-12 medium-12 pr1 pl1 pt2 pb1  incentiveTile"
>
  <div
    className="base relative"
  >
    <ImgSrcSet
      alt="Image undefined"
      imageSrc={
        Object {
          "height": "138",
          "preset": "content",
          "width": "268",
        }
      }
      isScene7UrlPrefix={false}
      lazyLoad={false}
      srcSet={
        Array [
          Object {
            "height": "138",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "268",
          },
          Object {
            "height": "207",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "402",
          },
        ]
      }
    />
    <span
      className="incentiveName mt1"
    />
    <Button
      className="viewDetails"
      id="link"
      onClick={[Function]}
      theme="secondaryStrokeBasic"
    >
      <span
        className=""
      >
        View Details
      </span>
    </Button>
    <ModalDialog
      closeIconShow={true}
      mountedState={false}
      onModalClose={[Function]}
      onModalDidClose={[Function]}
      titleId="IncentivesId"
      titleText="Incentives"
      variation="small"
      verticallyCenter={true}
    >
      <PureComponent(GridX)
        className="grid-margin-x"
      >
        <PureComponent(Cell)
          className="large-12"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          >
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Img
                alt="Incentive Image"
                reactImage={true}
              />
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Paragraph
                className="incentiveModalTitle"
                theme="base"
                weight=""
              />
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12"
        >
          <Paragraph
            className="incentiveSubHeader"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <Paragraph
            className="incentiveText"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          />
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </ModalDialog>
  </div>
</PureComponent(Cell)>
```

#### `should render correctly with logged in user`

```
<PureComponent(Cell)
  className="large-3 small-12 medium-12 pr1 pl1 pt2 pb1  incentiveTile"
>
  <div
    className="base relative"
  >
    <ImgSrcSet
      alt="Image undefined"
      imageSrc={
        Object {
          "height": "138",
          "preset": "content",
          "width": "268",
        }
      }
      isScene7UrlPrefix={false}
      lazyLoad={false}
      srcSet={
        Array [
          Object {
            "height": "138",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "268",
          },
          Object {
            "height": "207",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "402",
          },
        ]
      }
    />
    <span
      className="incentiveName mt1"
    />
    <div
      className="incentiveContainer"
      data-locator="incentive_Container"
    />
    <Button
      className="viewDetails"
      id="link"
      onClick={[Function]}
      theme="secondaryStrokeBasic"
    >
      <span
        className=""
      >
        View Details
      </span>
    </Button>
    <ModalDialog
      closeIconShow={true}
      mountedState={false}
      onModalClose={[Function]}
      onModalDidClose={[Function]}
      titleId="IncentivesId"
      titleText="Incentives"
      variation="small"
      verticallyCenter={true}
    >
      <PureComponent(GridX)
        className="grid-margin-x"
      >
        <PureComponent(Cell)
          className="large-12"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          >
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Img
                alt="Incentive Image"
                reactImage={true}
              />
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Paragraph
                className="incentiveModalTitle"
                theme="base"
                weight=""
              />
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12"
        >
          <Paragraph
            className="incentiveSubHeader"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <Paragraph
            className="incentiveText"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          />
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </ModalDialog>
  </div>
</PureComponent(Cell)>
```

#### `should render correctly with logged in user and incentives`

```
<PureComponent(Cell)
  className="large-3 small-12 medium-12 pr1 pl1 pt2 pb1  incentiveTile"
>
  <div
    className="base relative"
  >
    <ImgSrcSet
      alt="Image undefined"
      imageSrc={
        Object {
          "height": "138",
          "preset": "content",
          "width": "268",
        }
      }
      isScene7UrlPrefix={false}
      lazyLoad={false}
      srcSet={
        Array [
          Object {
            "height": "138",
            "preset": "content",
            "sourceWidth": "1x",
            "width": "268",
          },
          Object {
            "height": "207",
            "preset": "content",
            "sourceWidth": "1.5x",
            "width": "402",
          },
        ]
      }
    />
    <span
      className="incentiveName mt1"
    />
    <div
      className="incentiveContainer"
      data-locator="incentive_Container"
    >
      <div
        className="center relative pb1"
      >
        <span
          className="startPoint align-top"
        >
          $0
        </span>
        <span
          className="graphContainer relative align-top mx1"
        >
          <CustomHTMLTooltip
            className="showToolTip"
            innerClass="customTooltipIncentives"
          >
            <p
              className="toolTip"
            >
              Congratulations! Claim your free gift by filling out the redemption form.
            </p>
          </CustomHTMLTooltip>
          <span
            className="graphStatus"
            style={
              Object {
                "width": "NaN%",
              }
            }
          />
          <span
            className="graphStatusBlue"
            style={
              Object {
                "width": "100%",
              }
            }
          />
        </span>
        <span
          className="startPoint align-top"
        >
          $
          33
        </span>
      </div>
    </div>
    <Button
      className="viewDetails"
      id="link"
      onClick={[Function]}
      theme="secondaryStrokeBasic"
    >
      <span
        className=""
      >
        Redeem Offer
      </span>
    </Button>
    <ModalDialog
      closeIconShow={true}
      mountedState={false}
      onModalClose={[Function]}
      onModalDidClose={[Function]}
      titleId="IncentivesId"
      titleText="Incentives"
      variation="small"
      verticallyCenter={true}
    >
      <PureComponent(GridX)
        className="grid-margin-x"
      >
        <PureComponent(Cell)
          className="large-12"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          >
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Img
                alt="Incentive Image"
                reactImage={true}
              />
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="small-12 large-6"
            >
              <Paragraph
                className="incentiveModalTitle"
                theme="base"
                weight=""
              />
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12"
        >
          <Paragraph
            className="incentiveSubHeader"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <Paragraph
            className="incentiveText"
            theme="base"
            weight=""
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="large-12 mb2"
        >
          <PureComponent(GridX)
            className="grid-margin-x mb2"
          >
            <PureComponent(Cell)
              className="small-12 large-6 mt2"
            >
              <Button
                className="incentiveCTA"
                data-locator="redeemBtn"
                href={true}
                target="_blank"
                theme="primary"
              >
                <div>
                  Claim Offer
                </div>
              </Button>
            </PureComponent(Cell)>
            <PureComponent(Cell)
              className="small-12 large-6 mt2"
            >
              <Button
                className="incentiveCTA"
                data-locator="shopBtn"
                href={true}
                theme="secondary"
              >
                <div>
                  Shop Now
                </div>
              </Button>
            </PureComponent(Cell)>
          </PureComponent(GridX)>
        </PureComponent(Cell)>
      </PureComponent(GridX)>
    </ModalDialog>
  </div>
</PureComponent(Cell)>
```

