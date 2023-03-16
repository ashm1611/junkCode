# `app/components/Pages/Registry/TellAFriend/tests/TellAFriendFrom.test.jsx`

#### `should render the "TellAFriendFormForm" component`

```
<ErrorBoundary
  fallback={null}
  routeToSystemErrorPage={false}
>
  <PureComponent(GridX)>
    <div
      className="large-12 small-12"
    >
      <PureComponent(Cell)
        className="large-8 small-12 mx-auto"
      >
        <FocusableComponent
          keyForTriggeringFocus={0}
          wrapperClassName=""
        >
          <Notification
            content=""
            height="18px"
            iconPosition="mr2"
            spaceClass="py1 px2"
            status="error"
            theme=""
            width="18px"
            wrapperClass="p1 mb2 large-8 small-12 mx-auto"
          />
        </FocusableComponent>
      </PureComponent(Cell)>
      <Connect(wrapper)
        formWrapperData={
          Object {
            "firstName": Object {
              "firstNameError": "",
              "value": "abc",
            },
            "lastName": Object {
              "lastNameError": "",
              "value": "bcc",
            },
          }
        }
        id="tellAFriend"
        identifier="tellAFried"
        method="post"
        name="tellAFriendForm"
        onSubmit={[Function]}
      >
        <h2
          className="mb2"
        >
          Tell A Friend
           
        </h2>
        <p
          className="mb2"
        >
          Tell a friend how to receive a free copy of our howbook.
        </p>
        <h3
          className="mb2"
        >
          From
           
        </h3>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-senderFirstName"
            fieldName="senderFirstName"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="First Name"
            type="text"
            validation="firstName"
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-senderLastName"
            fieldName="senderLastName"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="Last Name"
            type="text"
            validation="lastName"
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-senderEmailAddr"
            fieldName="senderEmailAddr"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="Email"
            type="email"
            validation="email"
          />
        </PureComponent(Cell)>
        <h3
          className="mb2"
        >
          To
           
        </h3>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-recipientFirstName"
            fieldName="recipientFirstName"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="First Name"
            type="text"
            validation="firstName"
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-recipientLastName"
            fieldName="recipientLastName"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="Last Name"
            type="text"
            validation="lastName"
          />
        </PureComponent(Cell)>
        <PureComponent(Cell)
          className="mb2"
        >
          <WeddingBookFormElement
            data-locator="tellAFriend-recipientEmailAddr"
            fieldName="recipientEmailAddr"
            formWrapperData={
              Object {
                "firstName": Object {
                  "firstNameError": "",
                  "value": "abc",
                },
                "lastName": Object {
                  "lastNameError": "",
                  "value": "bcc",
                },
              }
            }
            identifier="tellAFried"
            isRequired={true}
            label="Email"
            type="email"
            validation="email"
          />
        </PureComponent(Cell)>
        <PureComponent(GridX)
          className="mt2 mb2"
        >
          <Checkbox
            checked={false}
            data-locator="tellAFriend-emailCopy"
            id="emailCopy"
            identifier="tellAFried"
            islablevisible={true}
            label="Send me a copy of the email sent to my friend."
            name="emailCopy"
            onSelect={[Function]}
            pointer={false}
            type="checkbox"
          />
        </PureComponent(GridX)>
        <PureComponent(GridX)>
          <Button
            className="mb2 mr1 sm-mr0 large-5 small-12"
            data-locator="tellAFriend-Submit"
            id="tellAFriendSubmit"
            theme="primary"
            type="submit"
          >
            Submit
          </Button>
          <PrimaryLink
            href="#"
            onClick={[Function]}
            type="bold"
            variation="primary"
          >
            Cancel
          </PrimaryLink>
        </PureComponent(GridX)>
      </Connect(wrapper)>
    </div>
  </PureComponent(GridX)>
</ErrorBoundary>
```

