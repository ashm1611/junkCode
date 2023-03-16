import React from 'react';
import { string } from 'prop-types';
import GridContainer from '@bbb-app/core-ui/grid-container';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';

import styles from './ErrorMessage.css';

/**
 * Displays an error message specific to Registry pages
 */
const ErrorMessage = ({ type, title, description, buttonTitle, buttonUrl }) => {
  return (
    <GridContainer>
      <GridX>
        <section className={styles.ErrorMessage}>
          <header className={styles.header}>
            <Heading level={3} styleVariation="eyebrow">
              {type}
            </Heading>
            <Heading
              level={1}
              styleVariation="h1-serif"
              className={styles.title}
            >
              {title}
            </Heading>
          </header>
          <Paragraph type="primary" className={styles.description}>
            {description}
          </Paragraph>
          <Button theme="primary" href={buttonUrl}>
            {buttonTitle}
          </Button>
        </section>
      </GridX>
    </GridContainer>
  );
};

/**
 * Prop Types
 *
 * @param {string} type type of error 404, internal error, etc.
 * @param {string} title title of the error page.
 * @param {string} description description about the error.
 * @param {string} url link the button redirects to.
 */
ErrorMessage.propTypes = {
  type: string,
  title: string,
  description: string,
  buttonTitle: string,
  buttonUrl: string,
};

ErrorMessage.defaultProps = {
  type: '',
  title: '',
  description: '',
  buttonTitle: '',
  buttonUrl: '',
};

export default ErrorMessage;
