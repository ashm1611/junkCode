import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import classnames from 'classnames';

import Cell from '@bbb-app/core-ui/cell/Cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import InputRadio from '@bbb-app/core-ui/input-radio';
import BuildYourRegistry from '../../../../components/PureContent/BuildYourRegistry/BuildYourRegistry';
import formStyles from '../../../../components/Pages/Registry/CreateRegistry/CreateRegistryFormStyles.css';
import styles from './RecommendEmailFrequency.css';

/* Labels */
const EMAIL_FREQUENCY_TITLE_LBL = 'Stay in the Loop';
const EMAIL_FREQUENCY_TEXT_LBL =
  'How often would you like an email outlining your recommended items?';
const EMAIL_FREQUENCY_DAILY_LBL = 'Daily';
const EMAIL_FREQUENCY_WEEKLY_LBL = 'Weekly';
const EMAIL_FREQUENCY_MONTHLY_LBL = 'Monthly';
const EMAIL_FREQUENCY_NEVER_LBL = 'Never';
const EMAIL_FREQUENCY_SAVE_LBL = 'Save';

class RecommendEmailFrequency extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailOptionValue: this.props.recommendationList.emailOptIn.toString(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.frequencySave = this.frequencySave.bind(this);
  }
  componentDidMount() {
    const { contentId } = this.props;
    if (contentId) {
      this.props.getContent([contentId]);
    }
  }

  /* creating a object for user frequency options*/
  emailFrequency = {
    Daily: '0',
    Weekly: '1',
    Monthly: '2',
    Never: '-1',
  };

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      emailOptionValue: target.value,
    });
  }

  frequencySave() {
    const registryId = pathOr(
      null,
      'registryData.registryResVO.registrySummaryVO.registryId',
      this.props
    );
    this.props.getEmailFrequency(registryId, this.state.emailOptionValue);
  }

  render() {
    const { contentState, contentId } = this.props;
    return (
      <div className={classnames(styles.container, 'pt03')}>
        <div className="grid-container">
          <GridX className="grid-margin-x">
            <Cell className={classnames('large-8 small-12')}>
              {contentState.content[contentId] && (
                <BuildYourRegistry
                  contentData={contentState.content[contentId]}
                  inviteMoreFriendsModal
                  {...this.props}
                />
              )}
            </Cell>
            <Cell
              className={classnames(
                'large-4 small-12 mb35',
                styles.mainContainer
              )}
            >
              <GridX className="grid-container">
                <Cell className={classnames('small-12')}>
                  <Heading
                    level={2}
                    className={classnames('heading', styles.headingContainer)}
                  >
                    {EMAIL_FREQUENCY_TITLE_LBL}{' '}
                  </Heading>
                </Cell>
                <Cell className={classnames('small-12 mb2')}>
                  <Paragraph className={classnames(styles.description)}>
                    {EMAIL_FREQUENCY_TEXT_LBL}
                  </Paragraph>
                </Cell>
                <Cell className={classnames('small-12 mb2')}>
                  <ul className={(formStyles.radiowrapper, 'fullWidth')}>
                    <GridX>
                      <li
                        className={classnames(
                          formStyles.radiowrapper,
                          'small-6'
                        )}
                      >
                        <InputRadio
                          id="frequencyDaily"
                          name="frequencyOption"
                          labelContent={EMAIL_FREQUENCY_DAILY_LBL}
                          onChange={this.handleInputChange}
                          value={this.emailFrequency.Daily}
                          locator=""
                          checked={
                            this.state.emailOptionValue ===
                            this.emailFrequency.Daily
                          }
                        />
                      </li>
                      <li
                        className={classnames(
                          formStyles.radiowrapper,
                          'small-6'
                        )}
                      >
                        <InputRadio
                          id="frequencyWeekly"
                          name="frequencyOption"
                          labelContent={EMAIL_FREQUENCY_WEEKLY_LBL}
                          onChange={this.handleInputChange}
                          value={this.emailFrequency.Weekly}
                          locator=""
                          checked={
                            this.state.emailOptionValue ===
                            this.emailFrequency.Weekly
                          }
                        />
                      </li>
                    </GridX>
                  </ul>
                </Cell>
                <Cell className={classnames('small-12 mb3')}>
                  <ul className={(formStyles.radiowrapper, 'fullWidth')}>
                    <GridX>
                      <li
                        className={classnames(
                          formStyles.radiowrapper,
                          'small-6'
                        )}
                      >
                        <InputRadio
                          id="frequencyMonthly"
                          name="frequencyOption"
                          labelContent={EMAIL_FREQUENCY_MONTHLY_LBL}
                          onChange={this.handleInputChange}
                          value={this.emailFrequency.Monthly}
                          checked={
                            this.state.emailOptionValue ===
                            this.emailFrequency.Monthly
                          }
                        />
                      </li>
                      <li
                        className={classnames(
                          formStyles.radiowrapper,
                          'small-6'
                        )}
                      >
                        <InputRadio
                          id="frequencyNever"
                          name="frequencyOption"
                          labelContent={EMAIL_FREQUENCY_NEVER_LBL}
                          onChange={this.handleInputChange}
                          value={this.emailFrequency.Never}
                          checked={
                            this.state.emailOptionValue ===
                            this.emailFrequency.Never
                          }
                        />
                      </li>
                    </GridX>
                  </ul>
                </Cell>
                <Button
                  theme="secondary"
                  type="button"
                  aria-label="Save"
                  variation="fullWidth"
                  onClick={this.frequencySave}
                >
                  {EMAIL_FREQUENCY_SAVE_LBL}
                </Button>
              </GridX>
            </Cell>
          </GridX>
        </div>
      </div>
    );
  }
}

RecommendEmailFrequency.propTypes = {
  getEmailFrequency: PropTypes.func,
  contentState: PropTypes.object,
  recommendationList: PropTypes.object,
  getContent: PropTypes.func,
  contentId: PropTypes.string,
};

export default RecommendEmailFrequency;
