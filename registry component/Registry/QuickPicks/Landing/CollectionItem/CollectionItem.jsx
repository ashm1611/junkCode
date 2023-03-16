import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { func, number, string } from 'prop-types';
import { noop, decodeHtmlEntities } from '@bbb-app/utils/common';
import Image from '@bbb-app/core-ui/image/CoreImage';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from './CollectionItem.css';

class CollectionItem extends PureComponent {
  onClick = () => {
    const { productPositionClicked, position, collectionName } = this.props;
    productPositionClicked(position, collectionName);
  };
  render() {
    return (
      <div className={styles.collectionItem}>
        <PrimaryLink className={styles.item} href={`/store/${this.props.url}`}>
          <div className={styles.aspectRatio}>
            <div className={styles.wrapper}>
              <Image src={this.props.imageUrl} alt="" />
            </div>
          </div>
          <div className={classnames(styles.collectionItemLabel, 'center')}>
            {decodeHtmlEntities(this.props.collectionName)}
          </div>
        </PrimaryLink>
      </div>
    );
  }
}
CollectionItem.propTypes = {
  productPositionClicked: func.isRequired,
  position: number,
  collectionName: string.isRequired,
  imageUrl: string.isRequired,
  url: string.isRequired,
};
CollectionItem.defaultProps = {
  productPositionClicked: noop,
  position: 0,
  collectionName: '',
  imageUrl: '',
  url: '',
};
export default CollectionItem;
