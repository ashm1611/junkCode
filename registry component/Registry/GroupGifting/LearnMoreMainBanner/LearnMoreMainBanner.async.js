/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';

import { options } from '@bbb-app/universal-component/options';

export const LearnMoreMainBanner = universal(
  import(
    /* webpackChunkName: "groupGiftingLearnMoreModal" */ './LearnMoreMainBanner'
  ),
  options
);

export default LearnMoreMainBanner;
