import React from 'react';
import ModalDialog from '@bbb-app/modal-dialog/containers/ModalDialog';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Stories from 'react-insta-stories';
import styles from './RegistryStory.css';
const StoryComponent = props => {
  return (
    <React.Fragment>
      <ModalDialog
        mountedState
        titleAriaLabel="aria-label"
        verticallyCenter
        scrollDisabled={false}
        onModalClose={props.handleCashFundsModal}
        contentWrapperClass={styles.verySmall}
        closeIconPos={styles.stickyBackBtnPos}
      >
        <div className={classnames('storyMod', styles.storyContent)}>
          <Stories
            stories={props.storyObject}
            defaultInterval={10000}
            width={'100%'}
            height={'600px'}
            loop={false}
            onStoryEnd={props.nextStory}
          />
        </div>
      </ModalDialog>
    </React.Fragment>
  );
};
StoryComponent.propTypes = {
  storyObject: PropTypes.object,
  handleCashFundsModal: PropTypes.func,
  nextStory: PropTypes.func,
};
export default StoryComponent;
