# `app/containers/Pages/Registry/RegistryOwnerHome/tests/QuizContainer.test.jsx`

#### `should render ShowAll QuizContainer correctly`

```
<ContextProvider
  value={
    Object {
      "store": Object {
        "getState": [Function],
      },
      "subscription": Object {
        "addNestedSub": [Function],
        "getListeners": [Function],
        "handleChangeWrapper": [Function],
        "isSubscribed": [Function],
        "notifyNestedSubs": [Function],
        "onStateChange": [Function],
        "trySubscribe": [Function],
        "tryUnsubscribe": [Function],
      },
    }
  }
>
  <Connect(withReducer(withSaga(wrapper))) />
</ContextProvider>
```

#### `should render PureQuizContainer correctly`

```
<Fragment>
  <div
    className="closeBtn"
  >
    <Button
      aria-label="close-modal"
      className="closeBtnColor"
      onClick={[Function]}
      theme="ghost"
      variation="noPadding"
    >
      <Icon
        focusable="false"
        height="16px"
        type="close"
        width="16px"
      />
    </Button>
  </div>
  <QuizComponent
    contentStackData=""
    handleStartQuiz={[Function]}
    isQuizCompleted={false}
    primaryRegistrantFirstName=""
    redirectTo={[Function]}
  />
  <PureComponent(GridX)
    className="grid-margin-x confPosition"
  >
    <PureComponent(Cell)
      className="large-6 small-6"
    >
      <Img
        alt="babyConfLeft"
        reactImage={true}
        src="/static/assets/images/babyConfLeft.png"
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="rightImage large-6  small-6"
    >
      <Img
        alt="babyConfRight"
        reactImage={true}
        src="/static/assets/images/babyConfRight.png"
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</Fragment>
```

#### `should render PureQuizContainer correctly for Mobile`

```
<Connect(wrapper)
  closeIconShow={true}
  contentWrapperClass="confQnAPosition"
  mountedState={true}
  onModalClose={[Function]}
  scrollDisabled={true}
  titleAriaLabel="Quiz-Modal"
  verticallyCenter={true}
>
  <QuizQnAComponent
    contentStackData={Object {}}
    quizCompletedCallBack={[Function]}
  />
  <PureComponent(GridX)
    className="grid-margin-x confPosition"
  >
    <PureComponent(Cell)
      className="large-6 small-6"
    >
      <Img
        alt="babyConfLeft"
        reactImage={true}
        src="/static/assets/images/babyConfLeft.png"
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="rightImage large-6  small-6"
    >
      <Img
        alt="babyConfRight"
        reactImage={true}
        src="/static/assets/images/babyConfRight.png"
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</Connect(wrapper)>
```

#### `should render PureQuizContainer correctly for else`

```
<Connect(wrapper)
  closeIconShow={true}
  contentWrapperClass={false}
  mountedState={true}
  onModalClose={[Function]}
  scrollDisabled={true}
  titleAriaLabel="Quiz-Modal"
  verticallyCenter={true}
>
  <QuizComponent
    contentStackData=""
    handleStartQuiz={[Function]}
    primaryRegistrantFirstName=""
  />
  <PureComponent(GridX)
    className="grid-margin-x confPosition"
  >
    <PureComponent(Cell)
      className="large-6 small-6"
    >
      <Img
        alt="babyConfLeft"
        reactImage={true}
        src="/static/assets/images/babyConfLeft.png"
      />
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="rightImage large-6  small-6"
    >
      <Img
        alt="babyConfRight"
        reactImage={true}
        src="/static/assets/images/babyConfRight.png"
      />
    </PureComponent(Cell)>
  </PureComponent(GridX)>
</Connect(wrapper)>
```

