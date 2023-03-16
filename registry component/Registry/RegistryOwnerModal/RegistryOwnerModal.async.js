/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryDetailModal = universal(
  import(
    /* webpackChunkName: "async-RegistryOwnerModal" */ './RegistryOwnerModalLayout/RegistryOwnerModalLayout'
  ),
  options
);

export default RegistryDetailModal;

/* eslint-enable extra-rules/no-commented-out-code */
