/* eslint-disable no-nested-ternary */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import GridContainer from '@bbb-app/core-ui/grid-container';
import Heading from '@bbb-app/core-ui/heading';
import { isBedBathCanada, getSiteId } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import Icon from '@bbb-app/core-ui/icon';
import Img from '@bbb-app/core-ui/image/CoreImage';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from './RegistryBanner.css';
import {
  MyRegistryPath,
  RegistryLandingPage,
  BabyRegistryLandingPage,
} from '../../../../../../containers/Pages/MyRegistries/constants';
import '../../../../../../assets/images/weddingRegBgLeft.png';
import '../../../../../../assets/images/weddingRegBgRight.png';
import '../../../../../../assets/images/babyRegBgLeft.png';
import '../../../../../../assets/images/babyRegBgRight.png';
import { eventTypeConst } from '../../CreateRegistryUtils';
import {
  BANNER_TEXT_LBL,
  BANNER_SELECT_TYPE_LBL,
  BANNER_HEADING_TEXT_LBL,
  REGISTRY_HOME_LBL,
  MY_REGISTRY_LBL,
} from './constants';

const weddingRegBgLeft = `/static/assets/images/weddingRegBgLeft.png`;
const weddingRegBgRight = `/static/assets/images/weddingRegBgRight.png`;
const babyRegBgLeft = `/static/assets/images/babyRegBgLeft.png`;
const babyRegBgRight = `/static/assets/images/babyRegBgRight.png`;

// eslint-disable-next-line complexity
const RegistryBanner = ({
  eventType,
  eventCode,
  labels,
  toggleRegistryModalState,
  isLoggedIn,
  enableNewSignUp,
  isBabyRegistry,
  isCABabyRegistry,
}) => {
  const isWeddingRegistry = eventType === eventTypeConst.WEDDING;
  const modifedRegistries =
    isWeddingRegistry || isBabyRegistry || isCABabyRegistry;
  const bbbyThemeRegistry = isWeddingRegistry || isCABabyRegistry;
  const eType =
    isBedBathCanada() && eventCode === 'COL'
      ? pathOr('University', 'eventTypeCOL', labels)
      : eventType;
  return (
    <GridContainer
      className={modifedRegistries && classnames(styles.mainContainer)}
    >
      <GridX
        className={classnames(
          'center content-margin-top pb3 sm-pb1 ',
          // eslint-disable-next-line no-nested-ternary
          isBabyRegistry
            ? styles.babyregbannerContainer
            : bbbyThemeRegistry
            ? styles.weddingRegBannerContainer
            : styles.bannerContainer
        )}
      >
        {modifedRegistries && (
          <div
            className={
              bbbyThemeRegistry
                ? classnames(styles.confettiLeft)
                : classnames(styles.confettiLeft, styles.confettiLeftBaby)
            }
          >
            <Img
              src={bbbyThemeRegistry ? weddingRegBgLeft : babyRegBgLeft}
              width={'180'}
              height={'188'}
            />
          </div>
        )}
        <div
          className={
            isBabyRegistry
              ? classnames(
                  styles.bannerTextContainer,
                  styles.bannerTextContainerBaby
                )
              : styles.bannerTextContainer
          }
        >
          <Cell
            className={classnames(
              bbbyThemeRegistry && styles.weddingRegSection,
              'small-12 large-12 sm-center'
            )}
          >
            {!isWeddingRegistry && (
              <Paragraph
                className={classnames('mt0 lg-mb3 md-mb3 sm-mb0 sm-pb1', {
                  [styles.babyRegbannerText]: isBabyRegistry,
                  [styles.babyCARegBannerText]: isCABabyRegistry,
                  [styles.bannerText]: !isBabyRegistry && !isCABabyRegistry,
                })}
              >
                {!isBabyRegistry && !isCABabyRegistry && BANNER_TEXT_LBL}
              </Paragraph>
            )}
            <Heading
              level={1}
              className={classnames(
                bbbyThemeRegistry
                  ? styles.weddingRegBannerHeading
                  : isBabyRegistry
                  ? styles.babyRegBannerHeading
                  : styles.bannerHeading,
                'lg-mb1 md-mb1 sm-mb0 sm-pb1'
              )}
              data-locator="registry-registrytypeheadinglabel"
            >
              {isWeddingRegistry
                ? `let's create your wedding registry`
                : isBabyRegistry || isCABabyRegistry
                ? "Let's create your baby registry"
                : `${eType} ${BANNER_HEADING_TEXT_LBL}`}
            </Heading>
            {!enableNewSignUp && (isBabyRegistry || isWeddingRegistry) ? (
              <Heading
                level={4}
                className={
                  isWeddingRegistry
                    ? styles.weddingRegistrySmallTextHeading
                    : styles.registrySmallTextHeading
                }
              >
                {isWeddingRegistry
                  ? `Don't worry, you can add more or edit info later.`
                  : `Start your registry in less than a minute! You can always add more
              info later.`}
              </Heading>
            ) : (
              <Button
                onClick={e => {
                  e.preventDefault();
                  toggleRegistryModalState(true);
                }}
                data-locator="registry-selectadifferenttypelink"
                theme="link"
                variation="beaconBlue"
              >
                {BANNER_SELECT_TYPE_LBL}
              </Button>
            )}
          </Cell>
        </div>
        <div
          className={
            bbbyThemeRegistry
              ? styles.wedRegHomeBtn
              : isBabyRegistry
              ? classnames('absolute', styles.extraButtonCls)
              : styles.homeButton
          }
        >
          <Icon
            type="caret"
            width="16"
            height="8"
            className={styles.homeCaret}
          />
          {isLoggedIn ? (
            <PrimaryLink
              href={MyRegistryPath}
              className="ml1"
              data-locator="registry-registryhomelink"
            >
              {isBabyRegistry ? 'Registry Home' : MY_REGISTRY_LBL}
            </PrimaryLink>
          ) : (
            <PrimaryLink
              href={
                getSiteId() === 'BuyBuyBaby'
                  ? BabyRegistryLandingPage
                  : RegistryLandingPage
              }
              className="ml1"
              data-locator="registry-registryhomelink"
            >
              {REGISTRY_HOME_LBL}
            </PrimaryLink>
          )}
        </div>
        {modifedRegistries && (
          <div
            className={
              bbbyThemeRegistry
                ? classnames(styles.confettiRight)
                : classnames(styles.confettiRight, styles.confettiRightBaby)
            }
          >
            <Img
              src={bbbyThemeRegistry ? weddingRegBgRight : babyRegBgRight}
              width={'180'}
              height={'188'}
            />
          </div>
        )}
      </GridX>
    </GridContainer>
  );
};

RegistryBanner.propTypes = {
  eventType: PropTypes.string,
  eventCode: PropTypes.string,
  labels: PropTypes.object,
  toggleRegistryModalState: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isBabyRegistry: PropTypes.bool,
  enableNewSignUp: PropTypes.bool,
  isCABabyRegistry: PropTypes.bool,
};

export default RegistryBanner;
