import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '@bbb-app/core-ui/cell';
import Button from '@bbb-app/core-ui/button';
import Heading from '@bbb-app/core-ui/heading';
import GridX from '@bbb-app/core-ui/grid-x';
import Img from '@bbb-app/core-ui/image/CoreImage';
import styles from './NewCreateRegComplete.css';

const propTypes = {
  onCloseClick: PropTypes.func,
  ProfileName: PropTypes.string,
};

const REG_COMPLETE_BODY_LBL =
  'Planning a wedding can give you all the feels (good, overwhelming and everything in between). Not to worry, our registry experts are here to help!';

const NewCreateRegComplete = ({ onCloseClick, ProfileName }) => {
  const renderRegistryCreatedPage = () => {
    const HEAD_LBL = ProfileName ? `congrats, ${ProfileName}!` : 'congrats!';
    return (
      <Cell>
        <Heading level={3} className={classnames(styles.heading, 'mb1 mt15')}>
          {HEAD_LBL}
        </Heading>
        <Heading level={6} className={styles.subHeading}>
          {REG_COMPLETE_BODY_LBL}
        </Heading>
        <Img
          src={
            'https://b3h2.scene7.com/is/content/BedBathandBeyond/FEO/L1/Baby/Scene7/Champagne.gif'
          }
          width="325"
          height="323"
        />
        <br />
        <Button
          id="createRegistryNew-complete"
          variation="fullWidth"
          className={'mb3'}
          theme="primary"
          aria-label="createRegistryNew-complete"
          data-locator="registryNew-completeBtn"
          onClick={() => onCloseClick(true)}
        >
          {'Let’s get started!'}
        </Button>
      </Cell>
    );
  };
  return (
    <div className={classnames('grid-container')}>
      <GridX>
        <Cell className={classnames('center small-11 large-5 mx-auto my3')}>
          {renderRegistryCreatedPage()}
        </Cell>
      </GridX>
    </div>
  );
};

NewCreateRegComplete.propTypes = propTypes;
export default NewCreateRegComplete;
