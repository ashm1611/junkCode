/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryUsabilitySurvey = universal(
  import(
    /* webpackChunkName: "async-registry-usability-survey" */ './RegistryUsabilitySurvey'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default RegistryUsabilitySurvey;
