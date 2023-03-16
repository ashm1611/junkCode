# `app/components/Pages/Registry/QuickPicks/Collection/ProductTile/RQPProductTileHeader/tests/RQPProductTileHeader.test.jsx`

#### `should render default`

```
<span
  className="base inline-block"
>
  Why We Love This
  <a
    className="tooltipIcon inline-block relative ml1"
  >
    ?
  </a>
  <CustomHTMLTooltip
    className="showToolTip"
    id="RQPProductTileHeader"
    innerClass="tooltipInnerClass"
  >
    <span
      className="tooltip"
    >
      This is awesome!
    </span>
  </CustomHTMLTooltip>
</span>
```

#### `should render without tooltip`

```
<span
  className="base inline-block"
>
  Why We Love This
  <CustomHTMLTooltip
    className="showToolTip"
    id="RQPProductTileHeader"
    innerClass="tooltipInnerClass"
  >
    <span
      className="tooltip"
    />
  </CustomHTMLTooltip>
</span>
```

