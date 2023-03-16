import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Image from '@bbb-app/core-ui/image';
import Icon from '@bbb-app/core-ui/icon';
import Notification from '@bbb-app/core-ui/notification/Notification';
import PrimaryLink from '@bbb-app/core-ui/primary-link/PrimaryLink';
import { setTimeoutCustom } from '@bbb-app/utils/timers';
import Loader from '@bbb-app/core-ui/section-loader';
import styles from './QuizQnAComponent.css';
import '../../../../../assets/icons/babyQuizCheck.svg';
import { TEALIUM_QUIZ_RESULT_NAME } from '../../../../../containers/Pages/Registry/RegistryOwner/constants';
class QuizQnAComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setBackClick = this.setBackClick.bind(this);
    this.state = {
      selectedQnAIndex: 0,
      allAnswerSet: [],
    };
  }

  getContentStackOptionData(currentQnAData) {
    const contentStackOptionData = [];
    let contentStackRowData = [];
    let cellNumber = 0;

    const selectedAnswer = this.state.allAnswerSet.filter(eachAnswer => {
      return eachAnswer.questionIndex === this.state.selectedQnAIndex;
    });
    let selectedAnswerObj;
    if (selectedAnswer[0]) {
      selectedAnswerObj = selectedAnswer[0];
    }
    currentQnAData.story_tiles.story_tiles.forEach((answerSet, index) => {
      cellNumber += 1;
      const isSelected =
        selectedAnswerObj && selectedAnswerObj.answerIndex === index;
      contentStackRowData.push(
        <Cell className="large-3 small-6">
          <PrimaryLink
            className={classnames(
              styles.OptionContainer,
              index % 2 === 0 && styles.OptionMargin,
              isSelected && styles.selectedAnswer
            )}
            onClick={this.handleAnswerClicked(
              index,
              answerSet.background_colors
            )}
            href="#"
          >
            {isSelected && (
              <div className={styles.optionChecked}>
                <Icon type="babyQuizCheck" width="34px" height="34px" />
              </div>
            )}
            <Image
              alt="option"
              src={answerSet.image_scene7.field_image}
              className={classnames(styles.Option)}
            />
          </PrimaryLink>
        </Cell>
      );
      if (cellNumber === 2) {
        contentStackOptionData.push(
          <GridX>
            <Cell className="large-3 small-0" />
            {contentStackRowData}
            <Cell className="large-3 small-0" />
          </GridX>
        );
        contentStackRowData = [];
        cellNumber = 0;
      }
    });
    return contentStackOptionData;
  }

  setBackClick() {
    const { selectedQnAIndex } = this.state;
    this.setState({ selectedQnAIndex: selectedQnAIndex - 1 });
  }

  handleTealiumAction(selectedCDP) {
    const tealiumData = {
      registry_type: this.props.activeRegistry.eventType,
      registry_id: this.props.activeRegistry.registryId,
      persona_type_cdp: selectedCDP,
      call_to_actiontype: TEALIUM_QUIZ_RESULT_NAME,
      pagename_breadcrumb: TEALIUM_QUIZ_RESULT_NAME,
    };
    const pageInfo = {
      page_name: TEALIUM_QUIZ_RESULT_NAME,
      page_type: TEALIUM_QUIZ_RESULT_NAME,
    };
    this.props.fireTealiumAction('', tealiumData, pageInfo);
  }
  submitQuizData(allAnswerSet) {
    const selectedAnswerArr = [];
    const selectedCDP = [];
    const { registryId, customerId } = this.props;
    allAnswerSet.forEach(eachAnswer => {
      selectedAnswerArr.push({ Answer: eachAnswer.answerValue });
      selectedCDP.push(eachAnswer.persona);
    });
    const payload = {
      registryId,
      selection: selectedAnswerArr,
    };
    this.handleTealiumAction(selectedCDP);
    this.props.quizCompletedCallBack(payload, customerId, selectedCDP);
  }

  handleAnswerClicked = (index, answerValue) => () => {
    const { selectedQnAIndex } = this.state;
    const resultSet = Object.assign([], this.state.allAnswerSet);
    let isQuestionDonePreviously = false;
    const moduleData =
      this.props.contentStackData &&
      this.props.contentStackData[0] &&
      this.props.contentStackData[0].modules;
    const currentQnAData = moduleData[selectedQnAIndex];
    resultSet.map(eachResultSet => {
      const resultSetObj = eachResultSet;
      if (resultSetObj.questionIndex === selectedQnAIndex) {
        resultSetObj.answerIndex = index;
        resultSetObj.answerValue = answerValue;
        resultSetObj.persona =
          currentQnAData.story_tiles.story_tiles[index].eyebrow_title;
        isQuestionDonePreviously = true;
      }
      return resultSetObj;
    });
    if (!isQuestionDonePreviously) {
      const questionNAnswerObj = {
        questionIndex: selectedQnAIndex,
        answerIndex: index,
        answerValue,
        persona: currentQnAData.story_tiles.story_tiles[index].eyebrow_title,
      };
      resultSet.push(questionNAnswerObj);
    }
    this.setState({
      allAnswerSet: resultSet,
    });
    if (selectedQnAIndex < moduleData.length - 1) {
      setTimeoutCustom(() => {
        this.setState({ selectedQnAIndex: selectedQnAIndex + 1 });
        window.scrollTo(0, 0);
      }, 500);
    } else {
      this.submitQuizData(resultSet);
    }
  };

  render() {
    if (
      this.props.contentStackData === '' ||
      this.props.contentStackData === null
    )
      return <Loader />;

    const { selectedQnAIndex } = this.state;
    const moduleData =
      this.props.contentStackData &&
      this.props.contentStackData[0] &&
      this.props.contentStackData[0].modules;
    const currentQnAData = moduleData ? moduleData[selectedQnAIndex] : {};

    const questionLabel =
      currentQnAData.story_tiles && currentQnAData.story_tiles.background_color;
    return questionLabel ? (
      <div className={styles.quizMainContainer}>
        {this.props.getQuizErrorMessage && (
          <div className="ml3 mr3">
            <Notification
              status={'error'}
              wrapperClass={'grid-container criticalError'}
              content={this.props.getQuizErrorMessage}
            />
          </div>
        )}
        <GridX>
          <Cell className="large-12 small-12">
            <div
              className={classnames(
                styles.progressBarNumber,
                styles.progressHeader
              )}
            >
              <div
                className={classnames(
                  styles.progressHeaderChild,
                  styles.backContainer
                )}
              >
                {selectedQnAIndex > 0 && (
                  <PrimaryLink href="#" onClick={this.setBackClick}>
                    <Icon type="caret" width="18" height="7" />
                  </PrimaryLink>
                )}
              </div>
              <div className={styles.progressHeaderChild}>
                <span>{`${selectedQnAIndex + 1} of 5`}</span>
              </div>
              <div className={styles.progressHeaderChild} />
            </div>
            <div
              className={classnames(
                styles.progressHeader,
                styles.progressBarContainer
              )}
            >
              {moduleData &&
                moduleData.map((eachQnA, index) => {
                  return (
                    <span>
                      <hr
                        className={classnames(
                          styles.progressBar,
                          selectedQnAIndex >= index &&
                            styles.progressBarSelected
                        )}
                      />
                    </span>
                  );
                })}
            </div>
          </Cell>
        </GridX>
        <div className={classnames('grid-container', styles.quizContainer)}>
          <div className={classnames(styles.QuizHeader)}>
            <span>{questionLabel}</span>
          </div>
          {this.getContentStackOptionData(currentQnAData)}
        </div>
      </div>
    ) : null;
  }
}
QuizQnAComponent.propTypes = {
  contentStackData: PropTypes.object,
  quizCompletedCallBack: PropTypes.func,
  registryId: PropTypes.string,
  customerId: PropTypes.string,
  getQuizErrorMessage: PropTypes.string,
  activeRegistry: PropTypes.object,
  fireTealiumAction: PropTypes.func,
};
export default QuizQnAComponent;
