import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import Icon from '@bbb-app/core-ui/icon';
import Img from '@bbb-app/core-ui/image/CoreImage';
import styles from './TYMSurpriseView.css';
import '../../../../../assets/icons/registry-lock.svg';
import { THANK_YOU_LIST_LBL, REVEAL_YOU_LIST_LBL } from '../../constants';

class TYMSurpriseView extends React.PureComponent {
  static propTypes = {
    thankYouListSurpriseData: PropTypes.object,
    revealThankYouList: PropTypes.func.isRequired,
    registryId: PropTypes.string.isRequired,
    isNewDashboard: PropTypes.bool,
    headingId: PropTypes.string,
    subHeadingId: PropTypes.string,
    isMobile: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleRevealClick = this.handleRevealClick.bind(this);
  }

  getReferredContent() {
    const referredContentData = this.props.thankYouListSurpriseData.content;
    const DangerousHTML = dangerousHTML(DangerousHTML);
    return (
      <React.Fragment>
        {!this.props.isMobile.isMobileScreen && (
          <Heading
            className={classnames(styles.thankYouListText, 'grid-container')}
            level={2}
            styleVariation={'h3-sans'}
            tabindex="0"
          >
            {THANK_YOU_LIST_LBL}
          </Heading>
        )}
        <div
          className={classnames(
            styles.surpriseContentContainer,
            'grid-x p3 pb2 sm-pt4 sm-pl1 sm-pr1'
          )}
        >
          <Icon
            className={classnames(styles.tymLock)}
            type="registry-lock"
            height={53}
            width={53}
          />
          <Heading
            className={classnames('cell mx-auto mt2 sm-mb1')}
            level={2}
            styleVariation={'h2-serif'}
            tabindex={
              referredContentData[this.props.headingId].body === '' ? '' : '0'
            }
          >
            <DangerousHTML>
              {referredContentData[this.props.headingId].body}
            </DangerousHTML>
          </Heading>

          <Paragraph
            className={classnames(
              styles.supriseDescription,
              'mb3 mt2 cell mx-auto'
            )}
            tabindex={
              referredContentData[this.props.subHeadingId].body === ''
                ? ''
                : '0'
            }
          >
            <DangerousHTML>
              {referredContentData[this.props.subHeadingId].body}
            </DangerousHTML>
          </Paragraph>

          <div className={classnames('cell large-4 mt0')}>
            <Button
              className={classnames(styles.revealListBtn)}
              onClick={this.handleRevealClick}
              data-locator={
                'registry-createdregistry-landingpage-thankyoutab-reveallist'
              }
            >
              {REVEAL_YOU_LIST_LBL}
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  newSupriseView = () => {
    return (
      <React.Fragment>
        {!this.props.isMobile.isMobileScreen && (
          <Heading
            className={classnames(styles.giftTrackerText, 'grid-container')}
            level={3}
            tabindex="0"
          >
            {'gift tracker'}
          </Heading>
        )}
        <div className={classnames('center', styles.giftTrackerSuprise)}>
          <Img
            className={styles.gifttrackerImg}
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/envelope_gifttracker"
            width="81px"
            height="81px"
          />
          <Heading
            className={classnames(styles.giftTrackerDescription, 'my1 mx1')}
            level={1}
            tabindex="0"
          >
            {'your list is hidden to save the surprise'}
          </Heading>
          <div className={styles.giftTrackerSubDescription}>
            <Paragraph className={classnames('mb3', styles.subDescriptionFont)}>
              {
                'When you’re ready to reveal, you can track of all your gifts right here on your dashboard'
              }
            </Paragraph>
            <Button
              className={styles.revealListBtnGift}
              onClick={this.handleRevealClick}
              data-locator={'registry-giftgivertab-reveallist'}
              variation="fullWidth"
            >
              {REVEAL_YOU_LIST_LBL}
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleRevealClick() {
    this.props.revealThankYouList(this.props.registryId);
  }

  render() {
    return (
      <div className={classnames(styles.surpriseBaseContainer, 'pt0 px2 pb3')}>
        {this.props.isNewDashboard
          ? this.newSupriseView()
          : this.getReferredContent()}
      </div>
    );
  }
}

export default TYMSurpriseView;
