import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Paragraph from '@bbb-app/core-ui/paragraph';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import SocialAnnex from '../../../../../containers/ThirdParty/SocialAnnex/SocialAnnex';
import RegistryImageStyles from '../Dashboard.inline.css';
import { DAYS_TO_GO_LBL } from './../../constants';

class ImageWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      transformX: 0,
      transformY: 0,
      transformScale: 1,
      photoWrapperWidth: 140,
      wrapperWidth: 0,
    };
    this.isSocialAnnexCalled = false;
    this.getGuestPhotoWrapperWidth = debounce(
      this.getGuestPhotoWrapperWidth,
      100
    );
  }

  // to apply css dynamically in image wrapper
  getGuestViewStyle() {
    const transformXtemp =
      (this.state.transformX * this.state.photoWrapperWidth) /
      this.state.wrapperWidth;
    const transformYtemp =
      (this.state.transformY * this.state.photoWrapperWidth) /
      this.state.wrapperWidth;
    const transformScaleTemp =
      (this.state.transformScale * this.state.photoWrapperWidth) /
      this.state.wrapperWidth;

    // then apply new style to image

    return {
      transformOrigin: `left top 0`,
      transform: `translate(${1 * transformXtemp}px, ${1 *
        transformYtemp}px) scale(${1 * transformScaleTemp}) rotate(0deg) `,
    };
  }

  getSocialAnnexImage(registryId) {
    const url = `https://s22.socialannex.com/v2/api/photoregistry/images/9411181/${registryId}/0`;

    axios.get(url).then(response => {
      const { data } = response;
      /* istanbul ignore else */
      if (data) {
        const photoData = data[0];
        if (photoData && photoData.status === '1') {
          const {
            photo_thumbnail,
            transform_x,
            transform_y,
            transform_scale,
            wrapperWidth,
          } = photoData;
          this.setState({
            photoUrl: photo_thumbnail,
            transformX: transform_x,
            transformY: transform_y,
            transformScale: transform_scale,
            wrapperWidth,
          });
        }
      }
    });
  }

  // to calculate width of image wrapper
  getGuestPhotoWrapperWidth() {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
      const photoWrapper = document.getElementById('photoGuestViewWrapper');
      if (photoWrapper) {
        this.setState({ photoWrapperWidth: photoWrapper.clientWidth });
      }
    }
  }

  renderGuestImage() {
    const { photoUrl } = this.state;
    const { primaryRegistrantInitial, coRegistrantInitial } = this.props;
    if (!photoUrl && !this.isSocialAnnexCalled) {
      this.getSocialAnnexImage(this.props.registryId);
      this.isSocialAnnexCalled = true;
    }
    const displayName = coRegistrantInitial
      ? `${primaryRegistrantInitial} + ${coRegistrantInitial}`
      : primaryRegistrantInitial;

    return photoUrl ? (
      <div className={RegistryImageStyles.registrantImage}>
        {!this.props.isMobile && (
          <div
            className={RegistryImageStyles.photoGuestViewWrapper}
            id="photoGuestViewWrapper"
            style={{ maxHeight: `${this.state.photoWrapperWidth}px` }}
          >
            <img style={this.getGuestViewStyle()} alt="" src={photoUrl} />
          </div>
        )}
        {this.props.isMobile && (
          <div className={RegistryImageStyles.mobilePhotoGuestViewWrapper}>
            <img alt="" src={photoUrl} />
          </div>
        )}
      </div>
    ) : (
      <div className={this.props.styles.registryNames}>
        <h3>{displayName}</h3>
      </div>
    );
  }

  renderOwnerImage() {
    const {
      registryId,
      makeReviewYourProductsConfig,
      email,
      styles,
      isFromNewDashboard,
    } = this.props;

    const uploadConfig =
      makeReviewYourProductsConfig &&
      makeReviewYourProductsConfig.uploadPhoto &&
      email;
    return uploadConfig ? (
      <SocialAnnex
        pageName="REGISTRYDASHBOARD"
        dataID="socialannex"
        reviewProductId={registryId}
        isAsync
        sa_instagram_registry_id={registryId}
        sa_instagram_registry_type={this.props.eventType}
        sa_instagram_registry_is_owner_view="1"
        selector="head"
        sa_id="sa_s22_instagram"
        sa_instagram_user_email={email}
        reInjectOnUpdate
        isEnabled
        nonExperience
        socialAnnex
      />
    ) : (
      <img
        className={
          isFromNewDashboard ? styles.newRegistantImage : styles.registrantImage
        }
        alt=""
        src="https://via.placeholder.com/150x150"
      />
    );
  }

  render() {
    const { styles, isFromNewDashboard } = this.props;
    this.getGuestPhotoWrapperWidth();
    return (
      <div
        className={classnames(
          isFromNewDashboard ? styles.newImageWrapper : styles.imageWrapper,
          'large-2'
        )}
      >
        <ErrorBoundary>
          <div className={styles.uploadPhotoRegistryOwner}>
            {this.props.giftGiver
              ? this.renderGuestImage()
              : this.renderOwnerImage()}
          </div>
          {this.props.numberOfDays > 0 && (
            <Paragraph
              className={classnames(
                styles.daysToGo,
                this.props.giftGiver ? styles.guestDaysToGo : ''
              )}
            >
              <span
                className={classnames(
                  styles.daysToGoNumber,
                  styles.h3Serif,
                  'mb0'
                )}
              >
                {this.props.numberOfDays}
              </span>
              <span className={classnames(styles.daysToGoLabel)}>
                {DAYS_TO_GO_LBL}
              </span>
            </Paragraph>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

ImageWrapper.propTypes = {
  numberOfDays: PropTypes.number,
  styles: PropTypes.object,
  registryId: PropTypes.string,
  eventType: PropTypes.string,
  giftGiver: PropTypes.bool,
  makeReviewYourProductsConfig: PropTypes.object,
  email: PropTypes.string,
  primaryRegistrantInitial: PropTypes.string,
  coRegistrantInitial: PropTypes.string,
  isMobile: PropTypes.bool,
  isFromNewDashboard: PropTypes.bool,
};

export default ImageWrapper;
