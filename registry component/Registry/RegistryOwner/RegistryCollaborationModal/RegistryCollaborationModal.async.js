/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryCollaborationModal = universal(
  import(
    /* webpackChunkName: "async-registry-collaboration-modal" */ './RegistryCollaborationModal'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default RegistryCollaborationModal;
