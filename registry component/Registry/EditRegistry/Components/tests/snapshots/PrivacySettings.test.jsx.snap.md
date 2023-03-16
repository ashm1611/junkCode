# `app/components/Pages/Registry/EditRegistry/Components/tests/PrivacySettings.test.jsx`

#### `should render correctly`

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
      >
        Registry Privacy:
         
        <Button
          aria-label="Public vs. Private: \"Public - Anyone searching for your registry will be able to view or make purchases both in-store or online. \"Private\" - Anyone searching for your registry will NOT be able to view or make purchases either in-store or online."
          className="tooltip-bottom"
          data-tooltip="Public vs. Private: \"Public - Anyone searching for your registry will be able to view or make purchases both in-store or online. \"Private\" - Anyone searching for your registry will NOT be able to view or make purchases either in-store or online."
          iconProps={
            Object {
              "height": "12px",
              "type": "infoIcon",
              "width": "12px",
            }
          }
          theme="ghost"
          variation="noPadding"
        />
      </Heading>
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
            checked={true}
            data-locator="registry-editregistry-private-radiobutton"
            id="privacyPrivate"
            labelContent="Private"
            labelProps={Object {}}
            name="privacyOption"
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
            checked={false}
            data-locator="registry-editregistry-public-radiobutton"
            id="privacyPublic"
            labelContent="Public"
            labelProps={Object {}}
            name="privacyOption"
            onClick={[Function]}
            sendLabelProps={true}
            value="public"
            wrapperProps={Object {}}
          />
        </li>
      </ul>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 mt2 mb1"
    >
      <Heading
        className="privacySettingSubHeading"
        level={6}
      >
        Registry Deactivation
         
      </Heading>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 deactivateRegistryMessageContainer"
    >
      <wrapper
        className="mt0 mb0 formText"
        data-locator="deactivate-registry-message"
      >
        This is test data
      </wrapper>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="small-12 mt1"
    >
      <PrimaryLink
        className="details inline-block"
        data-locator="deactivate-registry-link"
        href="#"
        onClick={[Function]}
        textDecoration="textDecorationNone"
        variation="primary"
      >
        Deactivate My Registry
      </PrimaryLink>
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</div>
```

