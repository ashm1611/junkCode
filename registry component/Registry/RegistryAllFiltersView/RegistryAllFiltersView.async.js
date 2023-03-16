/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryAllFiltersView = universal(
  import(
    /* webpackChunkName: "async-RegistryAllFiltersView" */ './RegistryAllFiltersView'
  ),
  options
);

export default RegistryAllFiltersView;
