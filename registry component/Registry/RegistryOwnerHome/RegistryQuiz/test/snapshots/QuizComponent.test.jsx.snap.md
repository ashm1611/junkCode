# `app/components/Pages/Registry/RegistryOwnerHome/RegistryQuiz/test/QuizComponent.test.jsx`

#### `should match snapshot for quiz component`

```
<div
  className="grid-container"
>
  <div
    className="getAdd csContentWrapper"
  >
    <center
      dangerouslySetInnerHTML={
        Object {
          "__html": "",
        }
      }
    />
  </div>
  <div
    className="quizButtonContainer"
  >
    <Button
      className="quiz quizButton"
      data-locator="startQuizCTA"
      onClick={[Function]}
      theme="primary"
      variation="large"
    >
      start quiz
    </Button>
  </div>
  <div
    className="quizButtonContainer"
  >
    <PrimaryLink
      className="quiz quizButton quizPrimaryLink"
      href="#"
      onClick={[Function]}
      textDecoration="textDecorationNone"
      variation="primary"
    >
      skip to registry home
    </PrimaryLink>
  </div>
</div>
```

#### `should match snapshot for quiz component when ContentStackData is Null`

```
<SectionLoader />
```

#### `should match snapshot for quiz component when isQuizFetching is true`

```
""
```

