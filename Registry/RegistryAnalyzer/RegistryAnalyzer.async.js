/* eslint-disable extra-rules/no-commented-out-code */

import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const RegistryAnalyzer = universal(
  import(
    /* webpackChunkName: "lazy-RegistryAnalyzer-component" */ './RegistryAnalyzer'
  ),
  options
);

export default RegistryAnalyzer;
/* eslint-enable extra-rules/no-commented-out-code */
