import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Heading from '@bbb-app/core-ui/heading';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import '@bbb-app/assets/icons/arrow.svg';
import styles from './PerfectGift.css';

const PerfectGift = props => {
  const {
    cta,
    image,
    subTitle,
    isMobile,
    setBuyOffContext,
    registryId,
  } = props;
  const backgroundImgSrc =
    image && image.url && `//${image.url.split('//')[1]}`;
  return (
    <Fragment>
      {cta && cta.url ? (
        <div
          className={classnames(styles.perfectGiftImageWrapper, 'mb2')}
          href={cta.url}
          data-locator="registery-registery_startbrowsingbanner"
        >
          <div
            className={classnames(
              styles.perfectGiftImageWrapper,
              'items-center',
              isMobile ? 'py15 px2' : 'p35'
            )}
            style={
              backgroundImgSrc
                ? { backgroundImage: `url(${backgroundImgSrc})` }
                : {}
            }
          >
            <Heading
              className={classnames(styles.perfectGiftHead)}
              level={isMobile ? 6 : 3}
            >
              {subTitle}
            </Heading>

            <PrimaryLink
              href={cta.url}
              iconProps={{ type: 'arrow' }}
              isIconAfterContent
              variation="primaryWithArrow"
              type="bold"
              onClick={e => setBuyOffContext(registryId, e)}
              data-locator="registery-registery_startbrowsinglink"
            >
              {cta.displayName}
            </PrimaryLink>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

PerfectGift.propTypes = {
  cta: PropTypes.object,
  image: PropTypes.object,
  subTitle: PropTypes.string,
  isMobile: PropTypes.bool,
  setBuyOffContext: PropTypes.func,
  registryId: PropTypes.string,
};

export default PerfectGift;
