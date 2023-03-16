import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import Icon from '@bbb-app/core-ui/icon';
import styles from './FlipFlopStyle.css';

const propTypes = {
  opacity: PropTypes.number,
  swipeClass: PropTypes.object,
  iconType: PropTypes.string,
  labelMsg: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
export class FlipFLopSwipeOverlay extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.opacity !== nextProps.opacity && this.props.opacity >= 0) {
      return true;
    }
    return false;
  }

  render() {
    const {
      opacity,
      swipeClass,
      iconType,
      width,
      height,
      labelMsg,
    } = this.props;
    let flipflopClasses = styles.flipFLopCSSDisplayNone;
    if (opacity > 0.01)
      flipflopClasses = classnames(styles.flipFlopChoice, swipeClass);
    return (
      <ErrorBoundary>
        <div style={{ opacity }} className={flipflopClasses}>
          <div className={classnames(styles.flipFlopSwipeTile, 'pt03')}>
            <Icon
              type={iconType}
              className={classnames(
                iconType === 'flipFlopWasteBin'
                  ? styles.flipFlopLeft
                  : styles.flipFlopRight,
                'pt03'
              )}
              focusable="false"
              width={width || 200}
              height={height || 200}
            />
            <div className={classnames(styles.flipFlopSwipeTileMsg, 'pt3')}>
              {labelMsg}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
FlipFLopSwipeOverlay.propTypes = propTypes;

export default FlipFLopSwipeOverlay;
