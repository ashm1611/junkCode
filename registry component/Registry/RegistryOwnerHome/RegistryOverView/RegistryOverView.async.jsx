/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const RegistryOverView = universal(
  import(/* webpackChunkName: "lazy-regsitry-overview" */ './RegistryOverView'),
  options
);

export default RegistryOverView;
/* eslint-enable extra-rules/no-commented-out-code */
