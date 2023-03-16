/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

const CashFunds = universal(
  import(/* webpackChunkName: "async-cash-funds" */ './CashFunds'),
  options
);

/* eslint-enable extra-rules/no-commented-out-code */

export default CashFunds;
