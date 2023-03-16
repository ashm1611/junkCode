import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import { isEqual } from 'lodash';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import TinderCard from './FilpFlopCard';
const Manager =
  typeof window === 'undefined' || typeof document === 'undefined'
    ? ManagerMock
    : require('hammerjs').Manager;
const Pan =
  typeof window === 'undefined' || typeof document === 'undefined'
    ? ManagerMock
    : require('hammerjs').Pan;

const propTypes = {
  onOutScreenLeft: PropTypes.func,
  onOutScreenRight: PropTypes.func,
  cardId: PropTypes.string,
  isFlipFlopEnabled: PropTypes.object,
  fireTealiumAction: PropTypes.func,
};

export class DraggableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      initialPosition: {
        x: 0,
        y: 0,
      },
      startPosition: {
        x: 0,
        y: 0,
      },
      rotateDegree: 0,
      animation: null,
    };
    this.resetPosition = this.resetPosition.bind(this);
    this.panstart = this.panstart.bind(this);
    this.panend = this.panend.bind(this);
    this.panmove = this.panmove.bind(this);
    this.pancancel = this.pancancel.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.configureHammer = this.configureHammer.bind(this);
  }

  componentDidMount() {
    this.configureHammer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.cardId !== nextProps.cardId ||
      !isEqual(this.state, nextState)
    ) {
      return true;
    }
    return false;
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    this.hammer.stop();
    this.hammer.destroy();
    this.hammer = null;
    ReactDOM.unmountComponentAtNode(findDOMNode(this));
    window.removeEventListener('resize', this.resetPosition);
  }

  /* istanbul ignore next */
  configureHammer() {
    this.hammer = new Manager(findDOMNode(this));
    this.hammer.add(new Pan({ threshold: 0 }));

    const events = [
      ['panstart panend pancancel panmove', this.handlePan],
      ['swipestart swipeend swipecancel swipemove', this.handleSwipe],
    ];

    events.forEach(data => {
      if (data[0] && data[1]) {
        this.hammer.on(data[0], data[1]);
      }
    }, this);

    this.resetPosition();
    window.addEventListener('resize', this.resetPosition);
  }

  resetPosition() {
    const screen = document.getElementById('flipFlopRootContainer');
    const card = document.querySelector('#flipFlopDragCard .absolute');

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2),
    };

    const initialState = this.state;
    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition,
      startPosition: initialState.startPosition,
      rotateDegree: 0,
      myOpacity: 0,
    });
  }

  panstart() {
    this.setState({
      animation: false,
      startPosition: {
        x: this.state.x,
        y: this.state.y,
      },
    });
  }
  panend() {
    const screen = document.getElementById('flipFlopRootContainer');
    const card = document.querySelector('#flipFlopDragCard .absolute');

    if (this.state.x < -50) {
      this.props.onOutScreenLeft('left', this.props);
    } else if (this.state.x + (card.offsetWidth - 50) > screen.offsetWidth) {
      this.props.onOutScreenRight('right', this.props);
    } else {
      this.resetPosition();
      this.setState({
        animation: true,
      });
    }
  }
  panmove(ev) {
    const deltaX = ev.deltaX;
    this.setState(this.calculatePosition(deltaX, ev.deltaY));

    const isFlipFlopEnabled = this.props.isFlipFlopEnabled;
    if (isFlipFlopEnabled) {
      // Using range -170 to 170 to keep 85% opacity on extreme ends.
      if (deltaX % 2 === 0 && deltaX <= 170 && deltaX >= -170) {
        this.setState({
          myOpacity: deltaX / 200,
        });
      }
    }
  }
  pancancel() {}

  handlePan(ev) {
    ev.preventDefault();
    switch (ev.type) {
      case 'panstart':
        this.panstart();
        break;
      case 'panend':
        this.panend();
        break;
      case 'panmove':
        this.panmove(ev);
        break;
      case 'pancancel':
        this.pancancel();
        break;
      default:
        return false;
    }
    return false;
  }

  handleSwipe() {}

  calculatePosition(deltaX, deltaY) {
    return {
      x: this.state.initialPosition.x + deltaX,
      y: this.state.initialPosition.y + deltaY,
      rotateDegree: deltaX / 10,
    };
  }

  render() {
    const translate = ''.concat(
      'translate3d(',
      `${this.state.x}px,`,
      '0px,',
      `0px) rotate(${this.state.rotateDegree}deg)`
    );

    const style = {
      msTransform: translate,
      WebkitTransform: translate,
      transform: translate,
    };

    const classes = {
      animate: this.state.animation,
    };

    return (
      <ErrorBoundary>
        <TinderCard
          style={style}
          opacity={this.state.myOpacity}
          className={classes}
          fireTealiumAction={this.props.fireTealiumAction}
          {...this.props}
        />
      </ErrorBoundary>
    );
  }
}

function ManagerMock() {
  const noop = () => {};
  return {
    on: noop,
    off: noop,
    destroy: noop,
    emit: noop,
  };
}

DraggableCard.propTypes = propTypes;

export default DraggableCard;
