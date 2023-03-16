/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const GoodyBoxModal = universal(
  import(/* webpackChunkName: "async-GoodyBoxModal" */ './GoodyBoxModal'),
  options
);

export default GoodyBoxModal;
