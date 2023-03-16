/* eslint-disable extra-rules/no-commented-out-code */

import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const CopyRegistry = universal(
  import(
    /* webpackChunkName: "lazy-CopyRegistry-component" */ './CopyRegistryModal'
  ),
  options
);

export default CopyRegistry;
/* eslint-enable extra-rules/no-commented-out-code */
