import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import WeddingBookForm from './WeddingBookForm';

/**
 * @property propTypes
 * @description Defined property types for component
 */
const propTypes = {
  formWrapperData: PropTypes.object,
  submitWeddingBook: PropTypes.func,
  error: PropTypes.string,
  result: PropTypes.bool,
  resetFormDataFields: PropTypes.func,
  isMobile: PropTypes.bool,
};

const WeddingBook = ({
  formWrapperData,
  submitWeddingBook,
  error,
  result,
  resetFormDataFields,
  isMobile,
}) => {
  return (
    <ErrorBoundary>
      <WeddingBookForm
        formWrapperData={formWrapperData}
        submitWeddingBook={submitWeddingBook}
        error={error}
        result={result}
        resetFormDataFields={resetFormDataFields}
        isMobile={isMobile}
      />
    </ErrorBoundary>
  );
};

WeddingBook.propTypes = propTypes;
export default WeddingBook;
