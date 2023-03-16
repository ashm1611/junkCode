/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const SortOptionsView = universal(
  import(
    /* webpackChunkName: "SortOptionsView" */ '../RenderSortOptionView/SortOptionsView'
  ),
  options
);

export default SortOptionsView;
/* eslint-enable extra-rules/no-commented-out-code */
