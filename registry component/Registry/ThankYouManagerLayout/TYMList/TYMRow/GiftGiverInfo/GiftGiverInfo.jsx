import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Heading from '@bbb-app/core-ui/heading';
import Paragraph from '@bbb-app/core-ui/paragraph';
import PrimaryLink from '@bbb-app/core-ui/primary-link';

import {
  MMP_LBL,
  ANONYMOUS_TEXT_LBL,
  GIFT_GIVER_ANONYMOUS_LBL,
  PURCHASED_IN_STORE_LBL,
  GIFT_GIVER_BAUGHT_LBL,
  ADD_GIFT_GIVER_INFO_LBL,
  MMP_GIFT_LBL,
  KNOW_WHO_LBL,
  KNOW_WHO_PURCHAGED_LBL,
  ADD_CONTACT_INFORMATION_LBL,
} from '../../../../constants';

import styles from './GiftGiverInfo.css';
class GiftGiverInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.labels = this.props.labels;
  }
  renderOutAndSoutContent() {
    return this.props.listItem.addressSelection === 'OUT' ? (
      <React.Fragment>
        <Heading
          className={classnames('m0', 'pb1', styles.giftGiverName)}
          level={3}
          styleVariation={'h4-serif'}
          tabindex="0"
        >
          {ANONYMOUS_TEXT_LBL}
        </Heading>
        <Paragraph
          className={classnames('m0', this.props.classToggle)}
          theme={'mediumLight'}
          tabindex="0"
        >
          {GIFT_GIVER_ANONYMOUS_LBL}
          <br />
          {KNOW_WHO_LBL}
        </Paragraph>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Heading
          className={'m0'}
          level={3}
          styleVariation={'h4-serif'}
          tabindex="0"
        >
          {PURCHASED_IN_STORE_LBL}
        </Heading>
        <Paragraph
          className={classnames('m0', this.props.classToggle)}
          theme={'mediumLight'}
          tabindex="0"
        >
          {GIFT_GIVER_BAUGHT_LBL}
          <br /> {KNOW_WHO_LBL}
        </Paragraph>
      </React.Fragment>
    );
  }
  render() {
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      email,
      state,
      zipCode,
      addressSelection,
    } = this.props.listItem;
    const classToggle = this.props.classToggle;
    return (
      <React.Fragment>
        {firstName !== null && lastName !== null ? (
          <React.Fragment>
            <Heading
              className={classnames('m0', 'pb1', styles.giftGiverName)}
              level={3}
              styleVariation={'h4-serif'}
              tabindex="0"
            >
              {firstName} {lastName}
            </Heading>
            <Paragraph
              className={classnames('m0', classToggle)}
              theme={'mediumLight'}
              tabindex="0"
            >
              {address1} {address2} {city && `${city}, `}
              {state} {zipCode}
              {!this.props.isCashFund && <br />}
              {email}
              <br />
              {addressSelection === 'MMP' ? MMP_LBL : ''}
            </Paragraph>
            {!this.props.isCashFund && (
              <PrimaryLink
                href={'#'}
                variation={'primary'}
                className={classnames('hideOnPrint', classToggle)}
                onClick={this.props.handleAddEditModal}
                type="bold"
              >
                Edit
              </PrimaryLink>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {addressSelection === 'MMP' ? (
              <React.Fragment>
                <Heading
                  className={classnames('m0', 'pb1', styles.giftGiverName)}
                  level={3}
                  styleVariation={'h4-serif'}
                  tabindex="0"
                >
                  {ADD_GIFT_GIVER_INFO_LBL}
                </Heading>
                <Paragraph
                  className={classnames('m0', classToggle)}
                  theme={'mediumLight'}
                  tabindex="0"
                >
                  {MMP_GIFT_LBL}
                  <br />
                  {KNOW_WHO_PURCHAGED_LBL}
                </Paragraph>
              </React.Fragment>
            ) : (
              this.renderOutAndSoutContent()
            )}

            <PrimaryLink
              href={'#'}
              variation={'primary'}
              className={classnames('hideOnPrint', classToggle)}
              onClick={this.props.handleAddEditModal}
              type="bold"
            >
              {ADD_CONTACT_INFORMATION_LBL}
            </PrimaryLink>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
GiftGiverInfo.propTypes = {
  listItem: PropTypes.object.isRequired,
  classToggle: PropTypes.string.isRequired,
  handleAddEditModal: PropTypes.func,
  labels: PropTypes.object,
  isCashFund: PropTypes.bool,
};
export default GiftGiverInfo;
