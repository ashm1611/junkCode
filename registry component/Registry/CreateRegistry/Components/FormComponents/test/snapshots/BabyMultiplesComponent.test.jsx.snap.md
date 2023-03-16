# `app/components/Pages/Registry/CreateRegistry/Components/FormComponents/test/BabyMultiplesComponent.test.jsx`

#### `should render correctly`

```
<Fragment>
  <SurveyComponent
    alwaysRenderErrorDiv={false}
    displayName="How many babies are you expecting?"
    isContentAvaible={true}
    isMobile={false}
    multiSelect={false}
    personas={
      Array [
        Object {
          "autoCheck": true,
          "personaDescription": "One",
          "personaValue": "1",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Two",
          "personaValue": "2",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Three",
          "personaValue": "3",
        },
      ]
    }
    selectedKey={0}
    setSurveyOptionRadio={[Function]}
  />
  <Heading
    className="mb2"
    level={3}
    styleVariation="h4-sans"
  >
    Do you want to reveal the gender?
  </Heading>
  <ul
    className="radiowrapper pb2 mb1"
  >
    <li
      className="sm-mb1 radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={false}
        id="babyRevealGenderYes"
        labelClass="labelButton"
        labelContent="Yes"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={true}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
    <li
      className="radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={true}
        id="babyRevealGenderNo"
        labelClass="labelButton"
        labelContent="No"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={false}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
  </ul>
</Fragment>
```

#### `should render correctly if not createMode`

```
<Fragment>
  <SurveyComponent
    alwaysRenderErrorDiv={false}
    displayName="How many babies are you expecting?"
    isContentAvaible={true}
    isMobile={false}
    multiSelect={false}
    personas={
      Array [
        Object {
          "autoCheck": true,
          "personaDescription": "One",
          "personaValue": "1",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Two",
          "personaValue": "2",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Three",
          "personaValue": "3",
        },
      ]
    }
    selectedKey={1}
    setSurveyOptionRadio={[Function]}
  />
  <Heading
    className="mb2"
    level={3}
    styleVariation="h4-sans"
  >
    Do you want to reveal the gender?
  </Heading>
  <ul
    className="radiowrapper pb2 mb1"
  >
    <li
      className="sm-mb1 radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={true}
        id="babyRevealGenderYes"
        labelClass="labelButton"
        labelContent="Yes"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={true}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
    <li
      className="radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={false}
        id="babyRevealGenderNo"
        labelClass="labelButton"
        labelContent="No"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={false}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
  </ul>
  <BabyGenderSelectionComponent
    changeSelectedGender={[Function]}
    errorMessage=""
    idKey="genderBaby1"
    idx={1}
    selectedGender="G"
    styles={
      Object {
        "formQuestion": "formQuestion",
        "genderStyle": "genderStyle",
        "labelButton": "labelButton",
        "radiowrapper": "radiowrapper",
      }
    }
  />
  <BabyGenderSelectionComponent
    changeSelectedGender={[Function]}
    errorMessage=""
    idKey="genderBaby2"
    idx={2}
    selectedGender="B"
    styles={
      Object {
        "formQuestion": "formQuestion",
        "genderStyle": "genderStyle",
        "labelButton": "labelButton",
        "radiowrapper": "radiowrapper",
      }
    }
  />
</Fragment>
```

#### `should render correctly with no baby gender selected`

```
<Fragment>
  <SurveyComponent
    alwaysRenderErrorDiv={false}
    displayName="How many babies are you expecting?"
    isContentAvaible={true}
    isMobile={false}
    multiSelect={false}
    personas={
      Array [
        Object {
          "autoCheck": true,
          "personaDescription": "One",
          "personaValue": "1",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Two",
          "personaValue": "2",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Three",
          "personaValue": "3",
        },
      ]
    }
    selectedKey={0}
    setSurveyOptionRadio={[Function]}
  />
  <Heading
    className="mb2"
    level={3}
    styleVariation="h4-sans"
  >
    Do you want to reveal the gender?
  </Heading>
  <ul
    className="radiowrapper pb2 mb1"
  >
    <li
      className="sm-mb1 radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={false}
        id="babyRevealGenderYes"
        labelClass="labelButton"
        labelContent="Yes"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={true}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
    <li
      className="radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={true}
        id="babyRevealGenderNo"
        labelClass="labelButton"
        labelContent="No"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={false}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
  </ul>
</Fragment>
```

#### `should render correctly with twins`

```
<Fragment>
  <SurveyComponent
    alwaysRenderErrorDiv={false}
    displayName="How many babies are you expecting?"
    isContentAvaible={true}
    isMobile={false}
    multiSelect={false}
    personas={
      Array [
        Object {
          "autoCheck": true,
          "personaDescription": "One",
          "personaValue": "1",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Two",
          "personaValue": "2",
        },
        Object {
          "autoCheck": false,
          "personaDescription": "Three",
          "personaValue": "3",
        },
      ]
    }
    selectedKey={1}
    setSurveyOptionRadio={[Function]}
  />
  <Heading
    className="mb2"
    level={3}
    styleVariation="h4-sans"
  >
    Do you want to reveal the gender?
  </Heading>
  <ul
    className="radiowrapper pb2 mb1"
  >
    <li
      className="sm-mb1 radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={false}
        id="babyRevealGenderYes"
        labelClass="labelButton"
        labelContent="Yes"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={true}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
    <li
      className="radiowrapper"
    >
      <InputRadio
        className="genderStyle"
        defaultChecked={true}
        id="babyRevealGenderNo"
        labelClass="labelButton"
        labelContent="No"
        labelProps={Object {}}
        name="revealGenderOption"
        onClick={[Function]}
        sendLabelProps={true}
        value={false}
        variation="button"
        wrapperProps={Object {}}
      />
    </li>
  </ul>
</Fragment>
```

