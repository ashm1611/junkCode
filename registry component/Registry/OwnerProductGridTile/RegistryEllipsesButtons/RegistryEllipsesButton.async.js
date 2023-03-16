/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryEllipsesButtons = universal(
  import(
    /* webpackChunkName: "async-registryEllipses" */ './RegistryEllipsesButtons'
  ),
  options
);

export default RegistryEllipsesButtons;

/* eslint-enable extra-rules/no-commented-out-code */
