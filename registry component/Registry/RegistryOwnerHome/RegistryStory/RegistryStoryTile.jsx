/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { isEmpty } from 'lodash/fp';
import { WithSeeMore } from 'react-insta-stories';
import PropTypes from 'prop-types';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import Img from '@bbb-app/core-ui/image';
import HyperLink from '@bbb-app/core-ui/hyper-link';
import styles from './RegistryStory.css';
import StoryComponent from './StoryModuleComponent';

export const CustomWithSeeMoreTileOne = props => {
  const { story, action, arrowFunc, stories, storyIndex } = props;
  return (
    <WithSeeMore story={story} action={action} customCollapsed={arrowFunc}>
      <div
        style={{
          background: 'white',
          padding: '4px',
          height: '100%',
        }}
      >
        <p
          style={{
            marginTop: '40px',
            fontFamily: 'Termina',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '21px',
            lineHeight: '27px',
            textAlign: 'center',
            color: '#1A4E8A',
            marginBottom: '1px',
          }}
        >
          {stories[storyIndex].story_tile_2.title}
        </p>
        <p
          style={{
            fontFamily: 'Abhaya Libre',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '19px',
            textAlign: 'center',
            color: ' #000000',
            marginTop: '0px',
          }}
        >
          {stories[storyIndex].story_tile_2.sub_title}
        </p>
        <p>{stories[storyIndex].story_tile_2.description}</p>

        <div style={{ display: 'flex' }}>
          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              margin: '0px 30px 31px 52px',
              width: '97px',
              height: '97px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[0].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[0].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[0].cta.title}
          </a>

          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              width: '97px',
              height: '97px',
              margin: '0px 17px 48px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[1].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[1].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[1].cta.title}
          </a>
        </div>
        <div style={{ display: 'flex' }}>
          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              margin: '0px 30px 31px 52px',
              width: '97px',
              height: '97px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[2].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[2].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[2].cta.title}
          </a>
          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              width: '97px',
              height: '97px',
              margin: '0px 17px 9px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[3].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[3].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[3].cta.title}
          </a>
        </div>
        <div style={{ display: 'flex', margin: '33px 0px 0px 0px' }}>
          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              margin: '0px 30px 31px 52px',
              width: '97px',
              height: '97px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[4].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[4].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[4].cta.title}
          </a>
          <a
            style={{
              fontFamily: 'Abhaya Libre',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgb(0, 0, 0)',
              width: '97px',
              height: '97px',
              margin: '0px 17px 48px',
              zIndex: '99999',
            }}
            href={stories[storyIndex].story_tile_2.item[5].cta.href}
            target={'_blank'}
          >
            <img
              src={stories[storyIndex].story_tile_2.item[5].scene7_url}
              alt="abc"
            />
            {stories[storyIndex].story_tile_2.item[5].cta.title}
          </a>
        </div>
      </div>
    </WithSeeMore>
  );
};
export const CustomWithSeeMoreTileTwo = props => {
  const { story, action, arrowFunc, stories, storyIndex } = props;
  return (
    <WithSeeMore story={story} action={action} customCollapsed={arrowFunc}>
      <div style={{ background: 'white', width: '100%', height: '100%' }}>
        <h1
          style={{
            fontFamily: 'Termina',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '21px',
            lineHeight: '27px',
            textAlign: 'center',
            color: '#1A4E8A',
            marginBottom: '50px 50px 5px 50px',
            marginTop: '55px',
          }}
        >
          {stories[storyIndex].story_tile_1.header}
        </h1>
        <p
          style={{
            fontFamily: 'Effra',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '19px',
            textAlign: 'center',
            color: ' #000000',
            padding: '0px',
            marginTop: '0px',
            marginLeft: '50px',
            marginRight: '50px',
          }}
        >
          {stories[storyIndex].story_tile_1.description}
        </p>
        <a
          href={stories[storyIndex].story_tile_1.cta.href}
          onClick={() => {
            action('pause');
          }}
          style={{
            zIndex: '9999999',
            position: 'absolute',
            background: '#006FCB',
            height: '55px',
            width: '80%',
            color: '#fff',
            borderRadius: '30px',
            cursor: 'pointer',
            margin: '0 0 20px 40px',
            textAlign: 'center',
            paddingTop: '10px',
          }}
          target={'_blank'}
        >
          {stories[storyIndex].story_tile_1.cta.title}
        </a>
        <img
          src={stories[storyIndex].story_tile_1.scene7_url}
          alt="img"
          className="card--image"
          style={{
            marginTop: '78px',
            width: '100%',
          }}
        />
      </div>
    </WithSeeMore>
  );
};
export const CustomSeeMore = props => {
  const { close } = props;
  return (
    <div
      style={{
        maxWidth: '100%',
        height: '100%',
        padding: 40,
        background: 'white',
      }}
    >
      <p style={{ textDecoration: 'underline' }} onClick={close}>
        Go on, close this popup.
      </p>
    </div>
  );
};

export const StoryTileOne = (stories, storyIndex, arrowFunc) => [
  {
    content: ({ action, story }) => {
      action('play');
      return (
        <CustomWithSeeMoreTileOne
          story={story}
          action={action}
          arrowFunc={arrowFunc}
          stories={stories}
          storyIndex={storyIndex}
        />
      );
    },

    seeMore: ({ close }) => {
      return <CustomSeeMore close={close} />;
    },
    duration: 5000,
  },
];
export const StoryTileTwo = (stories, storyIndex, arrowFunc) => [
  {
    content: ({ action, story }) => {
      action('play');
      return (
        <CustomWithSeeMoreTileTwo
          story={story}
          action={action}
          arrowFunc={arrowFunc}
          stories={stories}
          storyIndex={storyIndex}
        />
      );
    },

    seeMore: ({ close }) => {
      return <CustomSeeMore close={close} />;
    },
    duration: 5000,
  },
];

export const RegistryStoryTile = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(props.index);
  const handleCashFundsModal = () => {
    setModalIsOpen(false);
  };
  const nextStory = () => {
    if (storyIndex === props.data.length - 1) {
      setModalIsOpen(false);
      return false;
    }
    setStoryIndex(value => value + 1);
    return renderStory(props.data);
  };
  const prevStory = () => {
    setStoryIndex(value => value - 1);
    return renderStory(props.data);
  };
  function arrowFunc() {
    return (
      <div className={styles.arrowBtnClass}>
        <div style={{ width: '50%' }}>
          {storyIndex > 0 && (
            <button
              onClick={() => {
                prevStory();
              }}
              style={{
                borderRadius: '100%',
                backgroundColor: '#f4eded',
                width: '40px',
                height: '40px',
                color: '#595959',
                float: 'left',
                cursor: 'pointer',
              }}
            >
              {'<'}
            </button>
          )}
        </div>

        {storyIndex < data.length && (
          <div
            style={{
              width: '50%',
            }}
          >
            <button
              onClick={() => {
                nextStory();
              }}
              style={{
                borderRadius: '100%',
                backgroundColor: '#f4eded',
                width: '40px',
                height: '40px',
                color: '#595959',
                float: 'right',
                cursor: 'pointer',
              }}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    );
  }
  const renderStory = stories => {
    let storyObject = [];
    if (stories[storyIndex].story_tile_2.item.length > 0) {
      storyObject = StoryTileOne(stories, storyIndex, arrowFunc);
    } else if (!isEmpty(stories[storyIndex].story_tile_1.scene7_url)) {
      storyObject = StoryTileTwo(stories, storyIndex, arrowFunc);
    } else {
      return null;
    }
    return (
      <StoryComponent
        {...props}
        storyObject={storyObject}
        modalIsOpen={modalIsOpen}
        nextStory={nextStory}
        handleCashFundsModal={handleCashFundsModal}
      />
    );
  };

  const { registryStoryTileData, isMobile, data } = props;
  const storyTileData = registryStoryTileData;

  return (
    <React.Fragment>
      {modalIsOpen && renderStory(data)}
      <HyperLink
        textDecoration="textDecorationNone"
        type="noUnderline"
        onClick={() => setModalIsOpen(true)}
      >
        <div>
          <Img
            src={getRectifiedURLFromScene7URL(storyTileData.image)}
            alt={storyTileData.title_cta}
            title={storyTileData.title_cta}
            height={isMobile ? '68px' : '100px'}
            width={isMobile ? '68px' : '100px'}
            reactImage={false}
            className={styles.imgDefault}
          />
        </div>

        <p className={styles.storyTitle}>{storyTileData.title_cta}</p>
      </HyperLink>
    </React.Fragment>
  );
};

RegistryStoryTile.propTypes = {
  registryStoryTileData: PropTypes.object,
  data: PropTypes.array,
  index: PropTypes.number,
  isMobile: PropTypes.bool,
};

export default RegistryStoryTile;
