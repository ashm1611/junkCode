# `app/components/Pages/Registry/ThankYouManagerLayout/TYMSurpriseView/tests/TYMSurpriseView.test.jsx`

#### `should render correctly`

```
<div
  className="surpriseBaseContainer pt0 px2 pb3"
>
  <Heading
    className="thankYouListText grid-container"
    level={2}
    styleVariation="h3-sans"
    tabindex="0"
  >
    Thank You List
  </Heading>
  <div
    className="surpriseContentContainer relative grid-x p3 pb2 sm-pt4 sm-pl1 sm-pr1"
  >
    <Icon
      className=""
      focusable="false"
      height={53}
      type="registry-lock"
      width={53}
    />
    <Heading
      className="cell mx-auto mt2 sm-mb1"
      level={2}
      styleVariation="h2-serif"
      tabindex="0"
    >
      <wrapper>
        dfdkbffnfjdbdbf
      </wrapper>
    </Heading>
    <Paragraph
      className="supriseDescription mb3 mt2 cell mx-auto"
      tabindex="0"
      theme="base"
      weight=""
    >
      <wrapper>
        dfdkbffrereeerenfjdbdbf
      </wrapper>
    </Paragraph>
    <div
      className="cell large-4 mt0"
    >
      <Button
        className="revealListBtn"
        data-locator="registry-createdregistry-landingpage-thankyoutab-reveallist"
        onClick={[Function]}
        theme="primary"
      >
        Reveal My List
      </Button>
    </div>
  </div>
</div>
```

#### `should render correctly for new gift tracker`

```
<div
  className="surpriseBaseContainer pt0 px2 pb3"
>
  <Heading
    className="giftTrackerText grid-container"
    level={3}
    tabindex="0"
  >
    gift tracker
  </Heading>
  <div
    className="center giftTrackerSuprise"
  >
    <Img
      alt=""
      className="gifttrackerImg"
      height="81px"
      src="https://b3h2.scene7.com/is/image/BedBathandBeyond/envelope_gifttracker"
      width="81px"
    />
    <Heading
      className="giftTrackerDescription my1 mx1"
      level={1}
      tabindex="0"
    >
      your list is hidden to save the surprise
    </Heading>
    <div
      className="giftTrackerSubDescription"
    >
      <Paragraph
        className="mb3 subDescriptionFont"
        theme="base"
        weight=""
      >
        When you’re ready to reveal, you can track of all your gifts right here on your dashboard
      </Paragraph>
      <Button
        className="revealListBtnGift"
        data-locator="registry-giftgivertab-reveallist"
        onClick={[Function]}
        theme="primary"
        variation="fullWidth"
      >
        Reveal My List
      </Button>
    </div>
  </div>
</div>
```

