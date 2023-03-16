/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryIncentive = universal(
  import(/* webpackChunkName: "registry-incentive" */ './RegistryIncentive'),
  options
);

export default RegistryIncentive;

/* eslint-enable extra-rules/no-commented-out-code */
