/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const ContributeModalComponent = universal(
  import(
    /* webpackChunkName: "async-contribute-cash-funds" */ './ContributeModalComponent'
  ),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default ContributeModalComponent;
