/* eslint-disable extra-rules/no-commented-out-code */

import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const ConfirmationModal = universal(
  import(
    /* webpackChunkName: "lazy-ConfirmationModal" */ './ConfirmationModal'
  ),
  options
);

export default ConfirmationModal;
/* eslint-enable extra-rules/no-commented-out-code */
