# `app/components/Pages/Registry/CashFunds/tests/CashFundsComponent.test.jsx`

#### `should render CashFundsComponent component correctly`

```
<Fragment>
  <Img
    alt=""
    className="CFContentImg"
    reactImage={true}
    src=""
  />
  <div
    className="cfSignInContainer"
  >
    <Heading
      className="header"
      level={3}
    >
      Cash fund
    </Heading>
    <Heading
      className="subHeader"
      level={6}
    >
      with Venmo
    </Heading>
    <p
      className="venmoCopy"
    >
      Connect to your Venmo account so guests can easily send cash to you. Don't forget to double check your username.
    </p>
    <div>
      <div
        className="inputfield"
      >
        <FormInput
          aria-label="fundName_fieldName"
          blurHandler={[Function]}
          className="cashfundInput"
          data-locator="cashFundsForm_fundName"
          hideAriaLabelText={false}
          hideFieldLevelErrorMessage={false}
          id="fundName_fieldName"
          isChangedOnce={false}
          isRequired={true}
          label="* Name your fund"
          labelPosition="append"
          maxLength={30}
          name="fundName"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          placeholder="* Name your fund"
          selectOption={null}
          shouldShowAsterisk={true}
          showNumericKeypadOnMobile={false}
          tilesLength={-1}
          type="text"
          value=""
          wrapperProps={Object {}}
        />
      </div>
      <div
        className="inputfield"
      >
        <FormInput
          aria-label="venmoUsername_fieldName"
          blurHandler={[Function]}
          className="cashfundInput"
          data-locator="cashFundsForm_venmoUsername"
          hideAriaLabelText={false}
          hideFieldLevelErrorMessage={false}
          id="venmoUsername_fieldName"
          isChangedOnce={false}
          isRequired={true}
          label="* Venmo username"
          labelPosition="append"
          maxLength={31}
          name="venmoUsername"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          placeholder="* Venmo username"
          selectOption={null}
          shouldShowAsterisk={true}
          showNumericKeypadOnMobile={false}
          tilesLength={-1}
          type="text"
          value="@"
          wrapperProps={Object {}}
        />
      </div>
      <div
        className="inputfield"
      >
        <FormInput
          aria-label="last4DigitPhNo_fieldName"
          blurHandler={[Function]}
          className="cashfundInput"
          data-locator="cashFundsForm_last4DigitPhNo"
          hideAriaLabelText={false}
          hideFieldLevelErrorMessage={false}
          id="last4DigitPhNo_fieldName"
          isChangedOnce={false}
          isRequired={true}
          label="Last 4 digits of your phone number"
          labelPosition="append"
          maxLength={4}
          name="last4DigitPhNo"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          placeholder="Last 4 digits of your phone number"
          selectOption={null}
          shouldShowAsterisk={true}
          showNumericKeypadOnMobile={false}
          tilesLength={-1}
          type="text"
          value=""
          wrapperProps={Object {}}
        />
      </div>
      <div
        className="inputfield"
      >
        <FormInput
          aria-label="totalGoal_fieldName"
          blurHandler={[Function]}
          className="cashfundInput"
          data-locator="cashFundsForm_totalGoal"
          hideAriaLabelText={false}
          hideFieldLevelErrorMessage={false}
          id="totalGoal_fieldName"
          isChangedOnce={false}
          isRequired={true}
          label="* Total goal"
          labelPosition="append"
          maxLength={7}
          name="totalGoal"
          onBlur={[Function]}
          onChange={[Function]}
          onFocus={[Function]}
          placeholder="* Total goal"
          selectOption={null}
          shouldShowAsterisk={true}
          showNumericKeypadOnMobile={false}
          tilesLength={-1}
          type="text"
          value="$"
          wrapperProps={Object {}}
        />
      </div>
    </div>
    <div
      className="pt1"
    >
      <PrimaryLink
        className="dntKnow"
        href="https://account.venmo.com/signup"
        isHardSpaReq={true}
        onClick={[Function]}
        target="_blank"
        variation="primary"
      >
        Don't have a Venmo account?
      </PrimaryLink>
    </div>
    <div
      className="flexCell"
    >
      <div
        className="small-12"
      >
        <Checkbox
          checked={false}
          islablevisible={false}
          name="cftncCheckbox"
          onSelect={[Function]}
          pointer={false}
          type="checkbox"
        />
      </div>
      <div
        className="renderContent"
      >
        I acknowledge cash funds are not governed by Bed Bath & Beyond and solely subject to
        <PrimaryLink
          className="bold"
          href="https://venmo.com/legal/us-user-agreement/"
          id="tncVenmo"
          isHardSpaReq={true}
          target="_blank"
          variation="primary"
        >
          Venmo's Terms & Conditions.
        </PrimaryLink>
        To learn more
        <PrimaryLink
          className="bold"
          href="/store/static/registry_cash_funds"
          id="tncLandingPage"
          isHardSpaReq={true}
          target="_blank"
          variation="primary"
        >
          click here
        </PrimaryLink>
      </div>
    </div>
    <Button
      aria-label="cashFunds-continue"
      className={null}
      data-locator="cashFunds-continueFormBtn"
      id="cashFunds-continueBtn"
      onClick={[Function]}
      theme="deactivated"
      type="continue"
      variation="fullWidth"
    >
      create a cash fund
    </Button>
  </div>
</Fragment>
```

