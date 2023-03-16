# `app/components/Pages/Registry/Dashboard/MyFundGiftWrapper/tests/GiftWrapper.test.jsx`

#### `should render correctly`

```
<PureComponent(GridY)>
  <PureComponent(GridX)
    className="registryStats"
  >
    <PureComponent(Cell)
      className="center hideOnPrint pt1 pb1 purchasedbtn"
      data-locator="registry-purchasedbtn"
      id="myFundCell"
    >
      <Paragraph
        className="fundInfoTile"
        theme="base"
        weight=""
      >
        <div
          className="giftsFundStyle h3Serif mb0 xs-mr2 pt1 pb1"
        />
        <div
          className="giftsFundLabel relative inline-block"
        >
          My Reward Balance
        </div>
      </Paragraph>
      <Instrumentation
        markName="ux-text-item-purchased"
        zoneName="ux-secondary-content-displayed"
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-6 large-6 center"
      data-locator="registry-addedbtn"
    >
      <Paragraph
        className="giftAddedCount"
        theme="base"
        weight=""
      >
        <span
          className="mb0 xs-mr2 center mt2"
        />
        <span
          className="center"
        />
      </Paragraph>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-6 large-6 center"
    >
      <Paragraph
        className="giftAddedCount"
        theme="base"
        weight=""
      >
        <span
          className="mb0 xs-mr2 center mt2"
        />
        <span
          className="center"
        />
      </Paragraph>
      <Instrumentation
        markName="ux-text-item-requested"
        zoneName="ux-secondary-content-displayed"
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <UniversalComponent />
</PureComponent(GridY)>
```

#### `should render correctly for mobile`

```
<PureComponent(GridY)>
  <PureComponent(GridX)
    className="registryStats"
  >
    <PureComponent(Cell)
      className="center hideOnPrint pt1 pb1 purchasedbtn"
      data-locator="registry-purchasedbtn"
      id="myFundCell"
    >
      <Paragraph
        className="fundInfoTile"
        theme="base"
        weight=""
      >
        <div
          className="giftsFundStyle h3Serif mb0 xs-mr2 pt1 pb1"
        />
        <div
          className="giftsFundLabel relative inline-block"
        >
          My Fund Balance
        </div>
      </Paragraph>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-6 large-6 center"
      data-locator="registry-addedbtn"
    >
      <Paragraph
        className="giftAddedCount"
        theme="base"
        weight=""
      >
        <span
          className="mb0 xs-mr2 center mt2"
        />
        <span
          className="center"
        />
      </Paragraph>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-6 large-6 center"
    >
      <Paragraph
        className="giftAddedCount"
        theme="base"
        weight=""
      >
        <span
          className="mb0 xs-mr2 center mt2"
        />
        <span
          className="center"
        />
      </Paragraph>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
  <Component />
</PureComponent(GridY)>
```

