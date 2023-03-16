# `app/components/Pages/Registry/SocialRecommendation/SocialRecommendationInviteModal/tests/SocialRecommendationInviteModal.test.jsx`

#### `should render SocialRecommendationInviteModal component correctly`

```
<Fragment>
  <section
    aria-labelledby="get-recommendations"
    className="recommendationContainer"
    role="region"
  >
    <PureComponent(GridX)
      className="grid-container"
    >
      <PureComponent(Cell)
        className="small-12 medium-10 medium-offset-1"
      >
        <ErrorBoundary
          fallback={null}
          routeToSystemErrorPage={false}
        >
          <RecommendationInviteModalCTA
            contentState={
              Object {
                "content": Object {
                  "1234": "this is demo content",
                },
              }
            }
            fireTealiumAction={[Function]}
            isSocialRecommedationInviteBanner={true}
            labels={
              Object {
                "inviteFriendEmailSentResponse": "Your invitation has been sent and now you can begin receiving recommendations from your friends and family.",
                "inviteFriendErrorMsg": "Something went wrong. Please try again later",
                "inviteFriendModalTitle": "Invite Friends & Family to Recommend Items",
                "recommenderLandingPageURL": "/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>",
                "referredContent": Array [
                  Object {
                    "id": "1234",
                    "key": "socialRecommendationRegistryBanner",
                  },
                  Object {
                    "id": "5678",
                    "key": "inviteFriendModalMessageContent",
                  },
                ],
                "registryDetails": Object {},
              }
            }
            modalOnclick={[Function]}
            referredContent={
              Object {
                "content": Object {
                  "1234": "this is demo content",
                },
              }
            }
            registryBannerLabel="Build the perfect registry with the help of others"
            registryData={
              Object {
                "registryResVO": Object {
                  "registrySummaryVO": Object {
                    "eventDate": "03/03/2050",
                    "eventType": "BRD",
                    "primaryRegistrantFirstName": "John",
                    "primaryRegistrantLastName": "Doe",
                    "registryId": "123456789",
                  },
                },
              }
            }
            renderInviteButton={true}
          />
        </ErrorBoundary>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </section>
  <div>
    <Button
      className="sm-mb2 lg-mb0"
      data-locator="rg-rl-cssSelector_recommendation_inviteanotercancelbtn"
      disabled={false}
      onClick={[Function]}
      theme="primary"
    />
  </div>
  <ModalDialog
    mountedState={false}
    onModalClose={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Registry Invite Success Modal"
    variation="small"
    verticallyCenter={true}
  >
    <Heading
      className="heading"
      level={2}
    >
      Invitation Sent!
    </Heading>
    <PureComponent(Cell)
      className="small-12 mt3"
    >
      <div
        className="formLabel"
      >
        <Component />
      </div>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="mt2"
    >
      <PrimaryLink
        href="/store/account/preferences"
        type="bold"
        variation="primary"
      >
        Manage your email notifications.
      </PrimaryLink>
    </PureComponent(Cell)>
    <Button
      className="mt3 mb2 pl4 pr4"
      data-locator="cssSelector_recommendation_inviteanoterbtn"
      onClick={[Function]}
      theme="primary"
    >
      Invite Another
    </Button>
    <PureComponent(Cell)
      className="mt2"
    >
      <PrimaryLink
        data-locator="cssSelector_recommendation_inviteanotercancelbtn"
        href="#"
        onClick={[Function]}
        type="bold"
        variation="primary"
      >
        Cancel
      </PrimaryLink>
    </PureComponent(Cell)>
  </ModalDialog>
</Fragment>
```

#### `should render renderFNFInviteModal correctly`

```
<Fragment>
  <section
    aria-labelledby="get-recommendations"
    className="recommendationContainer"
    role="region"
  >
    <PureComponent(GridX)
      className="grid-container"
    >
      <PureComponent(Cell)
        className="small-12 medium-10 medium-offset-1"
      >
        <ErrorBoundary
          fallback={null}
          routeToSystemErrorPage={false}
        >
          <RecommendationInviteModalCTA
            contentState={
              Object {
                "content": Object {
                  "1234": "this is demo content",
                },
              }
            }
            fireTealiumAction={[Function]}
            isSocialRecommedationInviteBanner={true}
            labels={
              Object {
                "inviteFriendEmailSentResponse": "Your invitation has been sent and now you can begin receiving recommendations from your friends and family.",
                "inviteFriendErrorMsg": "Something went wrong. Please try again later",
                "inviteFriendModalTitle": "Invite Friends & Family to Recommend Items",
                "recommenderLandingPageURL": "/store/giftregistry/recommender-page?eventType=<eventType>&registryId=<registryId>",
                "referredContent": Array [
                  Object {
                    "id": "1234",
                    "key": "socialRecommendationRegistryBanner",
                  },
                  Object {
                    "id": "5678",
                    "key": "inviteFriendModalMessageContent",
                  },
                ],
                "registryDetails": Object {},
              }
            }
            modalOnclick={[Function]}
            referredContent={
              Object {
                "content": Object {
                  "1234": "this is demo content",
                },
              }
            }
            registryData={
              Object {
                "registryResVO": Object {
                  "registrySummaryVO": Object {
                    "eventDate": "03/03/2050",
                    "eventType": "BRD",
                    "primaryRegistrantFirstName": "John",
                    "primaryRegistrantLastName": "Doe",
                    "registryId": "123456789",
                  },
                },
              }
            }
            renderInviteButton={true}
          />
        </ErrorBoundary>
      </PureComponent(Cell)>
    </PureComponent(GridX)>
  </section>
  <div>
    <Button
      className="sm-mb2 lg-mb0"
      data-locator="rg-rl-cssSelector_recommendation_inviteanotercancelbtn"
      disabled={true}
      onClick={[Function]}
      theme="disabled"
    />
  </div>
  <ModalDialog
    mountedState={false}
    onModalClose={[Function]}
    scrollDisabled={true}
    titleAriaLabel="Registry Invite Success Modal"
    variation="small"
    verticallyCenter={true}
  >
    <PureComponent(Cell)
      className="small-12 mt3"
    >
      <div
        className="formLabel"
      >
        <Component />
      </div>
    </PureComponent(Cell)>
    <PureComponent(Cell)
      className="mt2"
    >
      <PrimaryLink
        data-locator="cssSelector_recommendation_inviteanotercancelbtn"
        href="#"
        onClick={[Function]}
        type="bold"
        variation="primary"
      >
        cancelButtonLabel
      </PrimaryLink>
    </PureComponent(Cell)>
  </ModalDialog>
</Fragment>
```

