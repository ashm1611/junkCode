# `app/components/Pages/Registry/RegistryGuestWlcmeMsgForRecommender/tests/RegistryGuestWlmeMsgForRecommender.test.jsx`

#### `Should render the <RegistryGuestWlcmeMsgForRecommender/> component and should match the snapshot`

```
<div>
  <ModalDialog
    closeDataLocator="rg-rl-closecta"
    closeIconShow={true}
    customCloseIcon={
      <Icon
        focusable="false"
        height="16px"
        type="close-icon"
        width="16px"
      />
    }
    scrollDisabled={true}
    titleAriaLabel="Recommender Welcome Message Modal dialog"
    variation="large"
    verticallyCenter={true}
  >
    <PureComponent(GridX)
      className="grid-margin-x"
    >
      <PureComponent(Cell)
        className="alignCenter lg-mb3 sm-mb3"
        data-locator="rg-bcImg"
      >
        <Img
          alt=""
          height="70px"
          itemProp="gift-flower"
          reactImage={true}
          src="/static/assets/images/gift-flower.svg"
          width="300px"
        />
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="alignCenter heading lg-mb3 sm-mb3"
        data-locator="rg-heading"
      >
        Great! You’re all set to start recommending items!
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4 lg-mb3 sm-mb3 alignCenter"
        data-locator="rg-stepOneImg"
      >
        <Img
          alt=""
          className="mb125"
          height="55px"
          reactImage={true}
          src="/static/assets/images/one.svg"
          width="55px"
        />
        <div
          className="description marginZeroAuto"
          data-locator="rg-stepOne"
        >
          First, take a look below at what your friend has added to their registry so far.
        </div>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4 lg-mb3 sm-mb3 alignCenter"
        data-locator="rg-stepTwoImg"
      >
        <Img
          alt=""
          className="mb125"
          height="55px"
          reactImage={true}
          src="/static/assets/images/two.svg"
          width="55px"
        />
        <div
          className="description marginZeroAuto"
          data-locator="rg-stepTwo"
        >
          Start browsing the site for over 10,000 great items to recommend!
        </div>
      </PureComponent(Cell)>
      <PureComponent(Cell)
        className="large-4 lg-mb3 sm-mb3 alignCenter"
        data-locator="rg-stepThreeImg"
      >
        <Img
          alt=""
          className="mb125"
          height="55px"
          reactImage={true}
          src="/static/assets/images/three.svg"
          width="55px"
        />
        <div
          className="description marginZeroAuto"
          data-locator="rg-stepThree"
        >
          Once you find the perfect piece, click on ‘Add to Registry” and choose your friend’s registry.
        </div>
      </PureComponent(Cell)>
      <div
        className="alignCenter marginZeroAuto"
      >
        <Button
          className={null}
          data-locator="rg-rl-wlcmemsgmodalcta"
          theme="primary"
          variation="fullWidth"
        >
          Go to Registry
        </Button>
      </div>
    </PureComponent(GridX)>
  </ModalDialog>
</div>
```

