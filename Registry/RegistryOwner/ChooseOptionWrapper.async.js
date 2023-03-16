/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const ChooseOptionWrapper = universal(
  import(/* webpackChunkName: "ChooseOptionWrapper" */ './ChooseOptionWrapper'),
  options
);

export default ChooseOptionWrapper;
/* eslint-enable extra-rules/no-commented-out-code */
