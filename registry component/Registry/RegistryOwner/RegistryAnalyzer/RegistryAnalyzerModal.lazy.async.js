/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const RegistryAnalyzerModal = universal(
  import(
    /* webpackChunkName: "lazy-registry-analyzer" */ './RegistryAnalyzerModal'
  ),
  options
);

export default RegistryAnalyzerModal;

/* eslint-enable extra-rules/no-commented-out-code */
