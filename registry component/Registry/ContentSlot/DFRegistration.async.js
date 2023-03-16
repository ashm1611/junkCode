/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const DFRegistration = universal(
  import(/* webpackChunkName: "lazy-DiaperFund-Modal" */ './DFRegistration'),
  options
);

export default DFRegistration;
/* eslint-enable extra-rules/no-commented-out-code */
