/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const RegistryOwnerHome = universal(
  import(
    /* webpackChunkName: "lazy-regsitry-owner-home" */ './RegistryOwnerHome'
  ),
  options
);

export default RegistryOwnerHome;
/* eslint-enable extra-rules/no-commented-out-code */
