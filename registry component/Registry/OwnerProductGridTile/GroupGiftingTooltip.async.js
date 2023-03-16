/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const AsyncGroupGiftingTooltip = universal(
  import(
    /* webpackChunkName: "lazy-GroupGifting-Tooltip" */ './GroupGiftingTooltip'
  ),
  options
);

export default AsyncGroupGiftingTooltip;
/* eslint-enable extra-rules/no-commented-out-code */
