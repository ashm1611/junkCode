import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@bbb-app/core-ui/button';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import Loader from '@bbb-app/core-ui/section-loader';
import TealiumHandler from '@bbb-app/tealium/TealiumHandler';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import pathOr from 'lodash/fp/pathOr';
import { ROUTE_REGISTRY_OWNER_RECOMMENDATION } from '@bbb-app/constants/route/route';
import styles from './QuizStyle.css';
import {
  START_QUIZ_LBL,
  SEE_RESULTS_LBL,
  SKIP_REGISTRY_HOME_LBL,
  LOCATOR_START_QUIZ,
  LOCATOR_SEE_RESULTS,
} from '../../../../../containers/Pages/Registry/RegistryOwnerHome/constants';
import {
  TEALIUM_QUIZ_NAME,
  TEALIUM_QUIZ_END_PAGE_NAME,
  TEALIUM_QUIZ_REGISTRY,
} from '../../../../../containers/Pages/Registry/RegistryOwner/constants';

// eslint-disable-next-line react/prefer-stateless-function
class QuizComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  getTealiumUtag() {
    return Object.assign(
      {},
      {
        page_type: TEALIUM_QUIZ_NAME,
        page_name: TEALIUM_QUIZ_NAME,
        registry_type: this.props.activeRegistry.eventType,
        registry_id: this.props.activeRegistry.registryId,
        persona_type_cdp: this.props.selectedCDP,
        quiz_persona_value: this.props.personaType,
        call_to_actiontype: TEALIUM_QUIZ_NAME,
        channel: TEALIUM_QUIZ_REGISTRY,
        page_function: TEALIUM_QUIZ_REGISTRY,
        navigation_path: TEALIUM_QUIZ_NAME,
        subnavigation_path: TEALIUM_QUIZ_NAME,
        pagename_breadcrumb: TEALIUM_QUIZ_END_PAGE_NAME,
      }
    );
  }
  handleButtonClick() {
    if (this.props.isQuizCompleted) {
      this.props.setQuizOpenStatus(true);
      this.props.redirectTo(
        ROUTE_REGISTRY_OWNER_RECOMMENDATION.replace(
          ':id?',
          this.props.registryId
        )
      );
    } else {
      this.props.handleStartQuiz();
    }
  }
  render() {
    if (
      this.props.contentStackData === null ||
      this.props.contentStackData === ''
    )
      return <Loader />;
    if (this.props.isQuizFetching) return null;
    const contentStackQuizDataIndex = this.props.isQuizCompleted ? 2 : 1;
    const contentStackDataBody = pathOr(
      '',
      `modules[${contentStackQuizDataIndex}].support_page.content_body`,
      this.props.contentStackData && this.props.contentStackData[0]
    );

    let newContentStackData = contentStackDataBody.replace(
      '{0}',
      this.props.primaryRegistrantFirstName
    );

    newContentStackData = this.props.isQuizCompleted
      ? newContentStackData.replace('{1}', this.props.personaType)
      : newContentStackData;

    const buttonText = this.props.isQuizCompleted
      ? SEE_RESULTS_LBL
      : START_QUIZ_LBL;
    const utag = this.props.isQuizCompleted ? this.getTealiumUtag() : '';
    const identifier = 'Quiz_Complete_Page';
    return (
      <div className={classnames('grid-container', styles.quizContainer)}>
        {this.props.isQuizCompleted && (
          <ErrorBoundary>
            <TealiumHandler
              utagData={utag}
              identifier={identifier}
              tealiumPageInfoNotAvailable
            />
          </ErrorBoundary>
        )}
        <div
          className={classnames(
            !this.props.isMobile && styles.getAdd,
            styles.csContentWrapper
          )}
        >
          <center
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: newContentStackData,
            }}
          />
        </div>
        <div className={classnames(styles.quizButtonContainer)}>
          <Button
            className={classnames(styles.quiz, styles.quizButton)}
            theme="primary"
            variation="large"
            data-locator={
              this.props.isQuizCompleted
                ? LOCATOR_SEE_RESULTS
                : LOCATOR_START_QUIZ
            }
            onClick={this.handleButtonClick}
          >
            {buttonText}
          </Button>
        </div>
        <div className={classnames(styles.quizButtonContainer)}>
          <PrimaryLink
            className={classnames(
              styles.quiz,
              styles.quizButton,
              styles.quizPrimaryLink
            )}
            textDecoration="textDecorationNone"
            variation="primary"
            href="#"
            onClick={() => this.props.setQuizOpenStatus(false, true)}
          >
            {SKIP_REGISTRY_HOME_LBL}
          </PrimaryLink>
        </div>
      </div>
    );
  }
}

QuizComponent.propTypes = {
  contentStackData: PropTypes.object,
  handleStartQuiz: PropTypes.func,
  setQuizOpenStatus: PropTypes.func,
  primaryRegistrantFirstName: PropTypes.string,
  isQuizCompleted: PropTypes.bool,
  registryId: PropTypes.string,
  personaType: PropTypes.string,
  isMobile: PropTypes.bool,
  isQuizFetching: PropTypes.bool,
  activeRegistry: PropTypes.object,
  selectedCDP: PropTypes.object,
  redirectTo: PropTypes.func,
};

export default QuizComponent;
