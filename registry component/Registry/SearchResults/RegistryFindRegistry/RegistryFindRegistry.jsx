import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import classNames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import RegistryTypeModalWrapper from '@bbb-app/registry-type/containers/registry-type-modal/RegistryTypeModalWrapper';
import styles from './RegistryFindRegistry.css';
const PHONE_NUMBER_LBL = '';
const CREATE_REGISTRY_FORM_URL = '/store/giftregistry/createRegistryForm';
class RegistryFindRegistry extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRegistryTypeOpen: false,
    };
  }

  getMainComponent() {
    const { data } = this.props;
    const primaryUrl = pathOr('#', 'CTA.primary_button.url', data);
    const primaryDisplayName = pathOr(
      '',
      'CTA.primary_button.displayName',
      data
    );
    const secondaryUrl = pathOr('#', 'CTA.secondary_button.url', data);
    const secondaryDisplayName = pathOr(
      '',
      'CTA.secondary_button.displayName',
      data
    );
    if (Object.keys(data).length === 0) {
      return null;
    }
    return (
      <GridX className={classNames(styles.mainContainer)}>
        <Cell className={classNames(styles.headingContainer)}>
          <Heading level={2} styleVariation="h2-serif">
            {data.title}
          </Heading>
          <Paragraph className={classNames(styles.registryContentSubHeading)}>
            {data.subtitle_text}
          </Paragraph>
          <div className={classNames(styles.buttonWrapper)}>
            {primaryUrl === CREATE_REGISTRY_FORM_URL ? (
              <Button
                variation="fullWidth"
                type="submit"
                theme="primary"
                onClick={this.toggleRegistryModalState}
                href="#"
              >
                {primaryDisplayName}
              </Button>
            ) : (
              <Button
                variation="fullWidth"
                type="submit"
                theme="primary"
                href={primaryUrl}
              >
                {primaryDisplayName}
              </Button>
            )}
            <Button
              variation="fullWidth"
              type="submit"
              theme="secondary"
              href={secondaryUrl}
            >
              {secondaryDisplayName}
            </Button>
          </div>
          {this.state.isRegistryTypeOpen && (
            <RegistryTypeModalWrapper
              isRegistryTypeOpen={this.state.isRegistryTypeOpen}
              toggleRegistryModalState={this.toggleRegistryModal}
            />
          )}
          <Paragraph className={classNames(styles.registryContentSubHeading)}>
            {data.question_text}{' '}
            <span className={styles.callUs}>{PHONE_NUMBER_LBL}</span>
          </Paragraph>
        </Cell>
      </GridX>
    );
  }
  toggleRegistryModalState = e => {
    e.preventDefault();
    this.setState({ isRegistryTypeOpen: true });
  };
  toggleRegistryModal = value => {
    this.setState({ isRegistryTypeOpen: !!value });
  };

  render() {
    return this.props.data ? this.getMainComponent() : null;
  }
}

export default RegistryFindRegistry;

/**
 * @param {object} data Component content from CMS
 */

RegistryFindRegistry.propTypes = {
  data: object.isRequired,
};
