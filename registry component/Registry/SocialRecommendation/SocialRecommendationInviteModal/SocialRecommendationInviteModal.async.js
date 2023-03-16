/* eslint-disable extra-rules/no-commented-out-code */
import universal from 'react-universal-component';
import { options } from '@bbb-app/universal-component/options';

const SocialRecommendationInviteModal = universal(
  import(
    /* webpackChunkName: "SocialRecommendation-model" */ './SocialRecommendationInviteModal'
  ),
  options
);

export default SocialRecommendationInviteModal;

/* eslint-enable extra-rules/no-commented-out-code */
