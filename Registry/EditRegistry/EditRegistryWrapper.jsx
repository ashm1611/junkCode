import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toJS from '@bbb-app/hoc/toJS';
import Button from '@bbb-app/core-ui/button';
import { getSiteId } from '@bbb-app/utils/common';
import Icon from '@bbb-app/core-ui/icon';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from '../../../../components/Pages/Registry/EditRegistry/EditRegistry.css';
import '../../../../assets/icons/baby-gear.svg';
import '../../../../assets/icons/bbb-gear.svg';
import EditRegistry from './EditRegistry.async';
import { makeSelectEditRegistryFromMoreInfoBtn } from '../RegistryOwner/selectors';
import {
  EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_LBL,
  EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_TBS_LBL,
  EDIT_REGISTRY_SHARE_WITH_FRIENDS_US_LBL,
  EDIT_REGISTRY_SHARE_WITH_FRIENDS_LBL,
} from '../../../../components/Pages/Registry/constants';

const isBabyTbs = getSiteId() === 'TBS_BuyBuyBaby';
const isBedBathUS = getSiteId() === 'BedBathUS';
const renderLinkToLoadChunk = (props, setShowModal) => {
  const {
    isPublic,
    customLabel,
    buttonTheme,
    signInDetails,
    LearnMoreModalGG,
    isBabyNewRegistryHeader,
    isBBBNewRegistryHeader,
    isMobile,
  } = props;
  const isBabyOrBBBNewHeader =
    isBabyNewRegistryHeader || isBBBNewRegistryHeader;
  const renderEditRegistryLink = () => {
    if (isPublic === '1' && !isBabyOrBBBNewHeader) {
      return (
        <PrimaryLink
          className={classnames(
            styles.editLink,
            styles.details,
            'mr3 sm-mr2 xs-mr2'
          )}
          textDecoration="textDecorationNone"
          variation="primary"
          data-locator="registry-editlink"
          href="#"
          onClick={() => setShowModal(true)}
        >
          {signInDetails.editText}
        </PrimaryLink>
      );
    }
    return (
      <button className="p0" title="Edit" onClick={() => setShowModal(true)}>
        {!LearnMoreModalGG && (
          <Icon
            height={isMobile ? '32px' : '42px'}
            width={isMobile ? '32px' : '42px'}
            type={`${
              isBabyNewRegistryHeader ? 'baby' : isBBBNewRegistryHeader && 'bbb'
            }-gear`}
          />
        )}
      </button>
    );
  };
  return (
    <React.Fragment>
      {!props.fromGiftTracker && renderEditRegistryLink()}
      {isPublic !== '1' && !customLabel && !isBabyOrBBBNewHeader ? (
        <div>
          <PrimaryLink
            className={classnames(styles.editLink, styles.details)}
            variation="primary"
            data-locator="registry-editlink"
            textDecoration="textDecorationNone"
            href="#"
            onClick={() => setShowModal(true)}
          >
            {isBabyTbs
              ? EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_TBS_LBL
              : EDIT_REGISTRY_COMPLETE_YOUR_PROFILE_LBL}
          </PrimaryLink>
          <span className={classnames(styles.editLink, styles.detailsValue)}>
            {isBedBathUS
              ? EDIT_REGISTRY_SHARE_WITH_FRIENDS_US_LBL
              : EDIT_REGISTRY_SHARE_WITH_FRIENDS_LBL}
          </span>
        </div>
      ) : null}
      {LearnMoreModalGG && customLabel !== undefined ? (
        <PrimaryLink
          className={classnames(styles.editLink, styles.details)}
          variation="primary"
          data-locator="registry-editlink"
          textDecoration="textDecorationNone"
          href="#"
          onClick={() => setShowModal(true)}
        >
          {customLabel}
        </PrimaryLink>
      ) : null}
      {isPublic !== '1' && customLabel !== undefined && !LearnMoreModalGG ? (
        <Button
          className={classnames(
            styles.editLink,
            styles.details,
            'mr3 sm-mr2 xs-mr2'
          )}
          theme={buttonTheme || ''}
          textDecoration="textDecorationNone"
          variation={buttonTheme ? '' : 'link'}
          data-locator="registry-editlink"
          onClick={() => setShowModal(true)}
        >
          {customLabel}
        </Button>
      ) : null}
    </React.Fragment>
  );
};
export const RenderEditRegistryLink = props => {
  const [showModal, setShowModal] = useState(false);
  const [isChunkLoaded, setIsChunkLoaded] = useState(false);
  useEffect(() => {
    if (props.isEditRegistry) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setIsChunkLoaded(false);
    }
  }, [props.isEditRegistry]);
  return (
    <React.Fragment>
      {!isChunkLoaded && renderLinkToLoadChunk({ ...props }, setShowModal)}
      {(showModal || props.isEditRegistry) && (
        <EditRegistry
          {...props}
          setIsChunkLoaded={setIsChunkLoaded}
          openEditRegistryModal
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isEditRegistry: makeSelectEditRegistryFromMoreInfoBtn(),
});

renderLinkToLoadChunk.propTypes = {
  isPublic: PropTypes.bool,
  customLabel: PropTypes.string,
  buttonTheme: PropTypes.string,
  signInDetails: PropTypes.object,
  LearnMoreModalGG: PropTypes.bool,
  isBBBNewRegistryHeader: PropTypes.bool,
  isBabyNewRegistryHeader: PropTypes.bool,
  isMobile: PropTypes.bool,
  fromGiftTracker: PropTypes.bool,
};

RenderEditRegistryLink.propTypes = {
  isEditRegistry: PropTypes.bool,
};

export default connect(mapStateToProps)(toJS(RenderEditRegistryLink));
