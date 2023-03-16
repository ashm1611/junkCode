import React from 'react';
import classnames from 'classnames';
import { getOr, isEmpty } from 'lodash/fp';
import Heading from '@bbb-app/core-ui/heading';
import { decodeHtmlEntities, getSiteId } from '@bbb-app/utils/common';
import Button from '@bbb-app/core-ui/button';
import Picture from '@bbb-app/core-ui/picture';
import Paragraph from '@bbb-app/core-ui/paragraph';
import AccountSignInButton from '../../../../../containers/AccountSignInButton/AccountSignInButton';
import styles from './ContentModules.css';
import NeedHelp from '../../../../PureContent/NeedHelp/NeedHelp';
import {
  BREAKPOINT_GRID_MIN_DESKTOP,
  BREAKPOINT_MD_HERO,
  BREAKPOINT_GRID_MIN_LG_PHONE,
  BREAKPOINT_GRID_MIN_PHONE,
} from '../../../../../constants/breakpoints';
import {
  WEDDING_REG_URL,
  BABY_REG_URL,
  FIND_STORE_URL,
  HAVE_REGISTRY_LBL,
  SIGN_IN_LBL,
} from '../../../../../constants/registryQuickPicks';
import {
  FIND_A_REGISTRY_LBL,
  START_YOUR_REGISTRY_BABY_LBL,
  START_YOUR_REGISTRY_LBL,
} from '../Collection/constants';
/**
 * Renders customer support CTA Panel
 *
 * @param {object} content Referred Content data
 * @return {node}
 *
 */
const renderCustomerSupportCTAPanel = contentData => {
  return (
    <div className="small-12 large-4 cell">
      <NeedHelp contentData={contentData} />
    </div>
  );
};
const isBabySite =
  getSiteId() === 'BuyBuyBaby' || getSiteId() === 'TBS_BuyBuyBaby';
/**
 * Renders build registry hero content
 *
 * @param {object} content Referred Content
 * @return {node}
 */
const renderRegistryBuildCTAPanel = (content, siteId) => {
  /* istanbul ignore else  */
  if (content) {
    const REG_URL =
      siteId === 'BuyBuyBaby' || siteId === 'TBS_BuyBuyBaby'
        ? BABY_REG_URL
        : WEDDING_REG_URL;
    return (
      <section
        className={classnames(
          styles.registryBuildCTAPanel,
          'large-8 small-12 cell sm-mb3'
        )}
      >
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <div className={styles.registryBuildCTAPanelButtonsWrapper}>
          <Button theme="secondary" href={REG_URL} className={styles.button}>
            {isBabySite
              ? START_YOUR_REGISTRY_BABY_LBL
              : START_YOUR_REGISTRY_LBL}
          </Button>
          <Button
            theme="secondary"
            href={FIND_STORE_URL}
            className={styles.button}
          >
            {FIND_A_REGISTRY_LBL}
          </Button>
        </div>
      </section>
    );
  }
  /* istanbul ignore next*/
  return null;
};
/**
 * Function that handles data from Labels API by way of Referred Content
 *
 * @return {node}
 */
export const renderContentModules = propsArg => {
  const { labels, content: contentData, loadContent, siteId } = propsArg;
  const { isFetching, content, error } = contentData;
  /* istanbul ignore if */
  if (error) {
    return null;
  } else if (
    isEmpty(content) &&
    !isFetching &&
    !isEmpty(labels.referredContent)
  ) {
    loadContent(labels.referredContent.map(v => v.id));
  } else if (!isEmpty(content)) {
    const referredCont = propsArg.enableCSLabels
      ? propsArg.labelsRef.referredContent
      : labels.referredContent;
    const customerSupportCTAContentId = referredCont.find(
      v => v.key === 'customerSupportCTAPanel'
    );
    const registryBuildCTAContentId = referredCont.find(
      v => v.key === 'registryBuildCTAPanel'
    );
    let customerSupportCTAPanel = null;
    let registryBuildCTAPanel = null;
    /* istanbul ignore else  */
    if (
      customerSupportCTAContentId &&
      content[customerSupportCTAContentId.id]
    ) {
      customerSupportCTAPanel = renderCustomerSupportCTAPanel(
        content[customerSupportCTAContentId.id]
      );
    }
    /* istanbul ignore else  */
    if (
      registryBuildCTAContentId &&
      content[registryBuildCTAContentId.id] &&
      content[registryBuildCTAContentId.id].body
    ) {
      registryBuildCTAPanel = renderRegistryBuildCTAPanel(
        content[registryBuildCTAContentId.id].body,
        siteId
      );
    }
    return (
      <div className="grid-x grid-margin-x componentWrapper">
        {registryBuildCTAPanel}
        {customerSupportCTAPanel}
      </div>
    );
  }
  return null;
};
/**
 * Renders Hero content module.
 *
 * @return {node}
 */
export const renderQuickPickHero = hero => {
  if (!isEmpty(hero)) {
    return (
      <section
        className={classnames(styles.heroWrapper, 'grid-x mt3 relative')}
      >
        <div className={styles.heroContentBg} />
        <div className={styles.heroImage}>
          <div className={styles.aspectRatio}>
            <div className={styles.wrapper}>
              <Picture
                className={styles.image}
                pixelRatio={1.5}
                isScene7UrlPrefix
                category={{
                  breakpoints: [
                    {
                      defaultFallback: true,
                      breakpoint: BREAKPOINT_GRID_MIN_DESKTOP,
                      mediaquery: 'min-width',
                      imageHeight: 440,
                      imageWidth: 768,
                      preset: false,
                      pixelRatios: [1, 1.5],
                    },
                    {
                      defaultFallback: true,
                      breakpoint: BREAKPOINT_MD_HERO,
                      mediaquery: 'min-width',
                      imageHeight: 520,
                      imageWidth: 907,
                      preset: false,
                      pixelRatios: [1, 1.5],
                    },
                    {
                      defaultFallback: false,
                      breakpoint: BREAKPOINT_GRID_MIN_LG_PHONE,
                      mediaquery: 'min-width',
                      imageHeight: 415,
                      imageWidth: 723,
                      preset: false,
                      pixelRatios: [1, 1.5],
                    },
                    {
                      defaultFallback: false,
                      breakpoint: BREAKPOINT_GRID_MIN_PHONE,
                      mediaquery: 'min-width',
                      imageHeight: 240,
                      imageWidth: 418,
                      preset: false,
                      pixelRatios: [1, 1.5],
                    },
                  ],
                }}
              >
                <img
                  alt={getOr('', 'components.0.image.alt', hero)}
                  className={styles.image}
                  src={getOr('', 'components.0.image.url', hero)}
                />
              </Picture>
            </div>
          </div>
        </div>
        <div className={styles.heroContentWrapper}>
          <Heading level={2} styleVariation="h2-sans">
            {decodeHtmlEntities(
              getOr('', 'components.0.title.displayName', hero)
            )}
          </Heading>
          <Paragraph>
            {decodeHtmlEntities(
              getOr('', 'components.0.description.displayName', hero)
            )}
          </Paragraph>
        </div>
      </section>
    );
  }
  return null;
};
export const renderSignInButton = propsArg => {
  return (
    <div>
      <AccountSignInButton
        renderBefore={HAVE_REGISTRY_LBL}
        location={propsArg.location}
        className="center"
      >
        {SIGN_IN_LBL}
      </AccountSignInButton>
    </div>
  );
};
