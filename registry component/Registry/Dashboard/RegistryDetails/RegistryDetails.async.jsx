/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryDetails = universal(
  import(/* webpackChunkName: "lazy-registry-details" */ './RegistryDetails'),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default RegistryDetails;
