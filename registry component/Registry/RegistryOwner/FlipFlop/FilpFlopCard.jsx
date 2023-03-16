import React from 'react';
import PropTypes from 'prop-types';
import _merge from 'lodash/merge';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Hyperlink from '@bbb-app/core-ui/hyper-link';
import Button from '@bbb-app/core-ui/button';
import headerStyles from '@bbb-app/header/components/Header.inline.css';
import '@bbb-app/assets/icons/CloseIcon.svg';
import styles from './FlipFlopStyle.css';
import FlipFlopTile from './FlipFlopTile';
import '../../../../../assets/icons/flipFlopGift.svg';
import '../../../../../assets/icons/flipFlopWasteBin.svg';
import FlipFLopSwipeOverlay from './FlipFLopSwipeOverlay';
import {
  FLIP_FLOP_WANT_THIS_LBL,
  FLIP_FLOP_NO_THANKS_LBL,
  CLOSE_FLIP_FLOP_TUTORIAL_LBL,
  FLIP_FLOP_RIGHT_SWIPE_MSG,
  FLIP_FLOP_LEFT_SWIPE_MSG,
  FLIP_FLOP_TUTORIAL_LBL,
} from './constants';

const propTypes = {
  index: PropTypes.number,
  style: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.object,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  url: PropTypes.string,
  scene7imageID: PropTypes.string,
  displayBanner: PropTypes.bool,
  closeBanner: PropTypes.func,
  onOutScreenLeft: PropTypes.func,
  onOutScreenRight: PropTypes.func,
  image: PropTypes.string,
  opacity: PropTypes.number,
  fireTealiumAction: PropTypes.func,
  atrData: PropTypes.object,
};

export class TinderCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        x: 0,
        y: 0,
      },
    };
    this.setInitialPosition = this.setInitialPosition.bind(this);
  }

  componentDidMount() {
    this.setInitialPosition();

    window.addEventListener('resize', this.setInitialPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition);
  }

  /* istanbul ignore next */
  setInitialPosition() {
    const screen = document.getElementById('flipFlopRootContainer');
    const card = findDOMNode(this);

    if (card !== null) {
      const initialPosition = {
        x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
        y: Math.round((screen.offsetHeight - card.offsetHeight) / 2),
      };

      this.setState({
        initialPosition,
      });
    }
  }

  render() {
    const initialTranslate = ''.concat(
      'translate3d(',
      `${this.state.initialPosition.x}px,`,
      '0px,',
      '0px)'
    );

    const style = _merge(
      {
        msTransform: initialTranslate,
        WebkitTransform: initialTranslate,
        transform: initialTranslate,
        zIndex: this.props.index,
      },
      this.props.style
    );

    const {
      title,
      price,
      rating,
      reviews,
      url,
      scene7imageID,
      displayBanner,
      closeBanner,
      fireTealiumAction,
      atrData,
    } = this.props;
    return (
      <ErrorBoundary>
        {displayBanner ? (
          <div
            data-locator="hit-miss-default-block"
            id="flipFlopTutorial"
            className={styles.flipFLopTutorial}
          >
            <Button
              onClick={closeBanner}
              className={styles.closeButton}
              iconProps={{
                type: 'CloseIcon',
                height: '16px',
                width: '16px',
              }}
              aria-label={CLOSE_FLIP_FLOP_TUTORIAL_LBL}
              variation="skipLink"
              data-locator="hit-miss-default-block-cross-icon"
            />
            <div
              className={styles.TinderImage}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.props.image }}
            />
            <div className={styles.flipFLopLabel}>{FLIP_FLOP_TUTORIAL_LBL}</div>
          </div>
        ) : (
          <div
            style={style}
            className={classnames('mt4', styles.flipFlopCard)}
            data-locator="hit-miss-real-block"
          >
            <div className={classnames(styles.paper)}>
              <FlipFlopTile
                title={title}
                price={price}
                rating={rating}
                reviews={reviews}
                url={url}
                scene7imageID={scene7imageID}
                fireTealiumAction={fireTealiumAction}
                prodId={atrData.prodId}
                skuId={atrData.skuId}
              />
            </div>
            <Hyperlink
              className={headerStyles.skipLink}
              onClick={e => {
                e.preventDefault();
                this.props.onOutScreenLeft('left', this.props);
              }}
            >
              {FLIP_FLOP_NO_THANKS_LBL}
            </Hyperlink>

            <Hyperlink
              className={headerStyles.skipLink}
              onClick={e => {
                e.preventDefault();
                this.props.onOutScreenRight('right', this.props);
              }}
            >
              {FLIP_FLOP_WANT_THIS_LBL}
            </Hyperlink>
            <FlipFLopSwipeOverlay
              opacity={this.props.opacity}
              swipeClass={styles.flipFlopRightSwipe}
              iconType={'flipFlopGift'}
              labelMsg={FLIP_FLOP_RIGHT_SWIPE_MSG}
              width={150}
              height={150}
            />
            <FlipFLopSwipeOverlay
              opacity={-this.props.opacity}
              swipeClass={styles.flipFlopLeftSwipe}
              iconType={'flipFlopWasteBin'}
              labelMsg={FLIP_FLOP_LEFT_SWIPE_MSG}
              width={110}
              height={150}
            />
          </div>
        )}
      </ErrorBoundary>
    );
  }
}

TinderCard.propTypes = propTypes;

export default TinderCard;
