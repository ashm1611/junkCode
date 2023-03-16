# `app/components/Pages/Registry/RBYRAndGroupGifting/tests/RBYRAndGroupGifting.test.jsx`

## `#RBYRAndGroupGifting`

####   `should render RBYRAndGroupGifting component correctly`

```
<AccordionWrapper
  title="Group Gifting Settings"
>
  <RBYRSettingLayout
    description="Valid on items $100 or more. Once you disable the Group Gifting feature your friends & family will no longer have the option to contribute towards your gift(s). All the contributions will then be added into your rewards account."
    disableId="editGroupGiftingDisable"
    disableLabel="Disable"
    enableId="editGroupGiftingEnable"
    enableLabel="Enable"
    heading="Group Gifting:"
    subHeading="Group Gifting Information"
  />
</AccordionWrapper>
```

####   `should render RBYRAndGroupGifting component correctly for rbyr`

```
<AccordionWrapper
  title="Ship or Swap Settings"
>
  <RBYRSettingLayout
    description="Valid on items $100 or more. Once you disable the Group Gifting feature your friends & family will no longer have the option to contribute towards your gift(s). All the contributions will then be added into your rewards account."
    disableId="editShipOrSwapDisable"
    disableLabel="Disable"
    enableId="editShipOrSwapEnable"
    enableLabel="Enable"
    heading="Ship Or Swap with My Funds credit:"
    shipOrSwap={true}
    subHeading="Ship or Swap Information"
  />
</AccordionWrapper>
```

## `#RBYRSettingLayout`

####   `should render RBYRSettingLayout component correctly`

```
<div
  className="editFormSection"
>
  <PureComponent(GridX)>
    <PureComponent(Cell)
      className="small-12"
    >
      <Heading
        className="privacySettingSubHeading"
        level={6}
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 mb2"
    >
      <ul
        className="radiowrapper inline-block"
      >
        <li
          className="radiowrapper inline-block mr3"
        >
          <InputRadio
            labelProps={Object {}}
            onClick={[Function]}
            sendLabelProps={true}
            value="private"
            wrapperProps={Object {}}
          />
        </li>
        <li
          className="radiowrapper inline-block mr1"
        >
          <InputRadio
            checked={true}
            labelProps={Object {}}
            onClick={[Function]}
            sendLabelProps={true}
            value="public"
            wrapperProps={Object {}}
          />
        </li>
      </ul>
    </PureComponent(Cell)>
    <ShowDescription />
  </PureComponent(GridX)>
</div>
```

## `#ShowDescription`

####   `should render ShowDescription component correctly`

```
<Fragment>
  <PureComponent(Cell)
    className="small-12 mt2 mb1"
  >
    <Heading
      className="privacySettingSubHeading"
      level={6}
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-12 deactivateRegistryMessageContainer"
  >
    <wrapper
      className="mt0 mb0 formText"
      data-locator="showDescription"
    />
  </PureComponent(Cell)>
</Fragment>
```

####   `should render ShowDescription component correctly for rbyr`

```
<Fragment>
  <PureComponent(Cell)
    className="small-12 mt2 mb1"
  >
    <Heading
      className="privacySettingSubHeading"
      level={6}
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-12 deactivateRegistryMessageContainer"
  >
    <wrapper
      className="mt0 mb0 formText"
      data-locator="showDescription"
    />
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-12 mt1"
  >
    <PrimaryLink
      className="details inline-block"
      data-locator="term-and-condition-link"
      href="#"
      onClick={[Function]}
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Ship or Swap Terms & Conditions
    </PrimaryLink>
  </PureComponent(Cell)>
  <PureComponent(Cell)
    className="small-12 mt1"
  >
    <PrimaryLink
      className="details inline-block"
      data-locator="learn-more-and-faq-link"
      href="#"
      onClick={[Function]}
      textDecoration="textDecorationNone"
      variation="primary"
    >
      Learn More & FAQs
    </PrimaryLink>
  </PureComponent(Cell)>
</Fragment>
```

