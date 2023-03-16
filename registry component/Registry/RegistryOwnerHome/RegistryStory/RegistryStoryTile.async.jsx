/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const RegistryStoryTile = universal(
  import(/* webpackChunkName: "registry-Story" */ './RegistryStoryTile'),
  options
);

export default RegistryStoryTile;
/* eslint-enable extra-rules/no-commented-out-code */
