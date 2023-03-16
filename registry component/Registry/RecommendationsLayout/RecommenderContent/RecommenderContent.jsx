import React from 'react';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import PropTypes from 'prop-types';
import GridContainer from '@bbb-app/core-ui/grid-container';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import styles from './RecommenderContent.css';
import {
  ACCEPTED_QUANTITY_TXT_LBL,
  BLOCKED_TXT_LBL,
  DECLINED_QUANTITY_TXT_LBL,
  MANAGE_YOUR_RECOMMENDERS_LBL,
  RECOMMENDER_NAME_TXT_LBL,
  RECOMMENDER_QUANTITY_TXT_LBL,
  UNBLOCKED_TXT_LBL,
} from '../../constants';

export const renderRows = (array, theads) => {
  const rowkeys = array ? Object.keys(array) : [];
  if (rowkeys.length === 0) {
    return null;
  }
  return rowkeys.map((value, index) => {
    const arrValue = pathOr([], [value], array);
    if (arrValue.length === 0) return null;
    return arrValue.map(val => {
      return (
        <tr key={index} className={styles.tableRows}>
          <td
            column={theads.recommenderName}
            className={classnames(styles.recommenders, 'py1')}
          >
            {val.fullName}
          </td>
          <td
            column={theads.recommendedQuantity}
            className={classnames(
              !val.profileActive ? styles.blocked : '',
              'py1'
            )}
          >
            {val.recommendedQuantity}
          </td>
          <td
            column={theads.acceptedQuantity}
            className={classnames(
              !val.profileActive ? styles.blocked : '',
              'py1'
            )}
          >
            {val.acceptedQuantity}
          </td>
          <td
            column={theads.declinedQuantity}
            className={classnames(
              !val.profileActive ? styles.blocked : '',
              'py1'
            )}
          >
            {val.declinedQuantity}
          </td>
          <td column={theads.block} className={styles.blockedContent}>
            <PrimaryLink
              onClick={callEvent}
              data-registryId={theads.registryId}
              data-recommenderProfileId={val.recommenderProfileId}
              data-requestedFlag={val.profileActive ? 'block' : 'unblock'}
              data-fromAssociate={val.fromAssociate}
              href={'#'}
              className={styles.link}
              data-locator="rg-rl-blck-unblck-link"
            >
              {val.profileActive ? theads.block : theads.unBlock}
            </PrimaryLink>
          </td>
        </tr>
      );
    });
  });
};

let blockOrUnblockFn = null;

export const callEvent = e => {
  e.preventDefault();
  blockOrUnblockFn(e);
};

export const RecommenderContent = props => {
  const recommenderData = props.recommenderData;
  const isMobile = pathOr(true, 'isMobileScreen', props.isMobile);
  const manageYourRecommenders = MANAGE_YOUR_RECOMMENDERS_LBL;
  const recommenderName = RECOMMENDER_NAME_TXT_LBL;
  const recommendedQuantity = RECOMMENDER_QUANTITY_TXT_LBL;
  const acceptedQuantity = ACCEPTED_QUANTITY_TXT_LBL;
  const declinedQuantity = DECLINED_QUANTITY_TXT_LBL;
  const block = BLOCKED_TXT_LBL;

  const unBlock = UNBLOCKED_TXT_LBL;
  blockOrUnblockFn = props.revealBlockUnblockModal;
  return (
    <div className={classnames(styles.container, 'pt03')}>
      {Object.keys(recommenderData).length > 0 && (
        <GridContainer>
          {!isMobile && (
            <div className={classnames('p03', styles.recommenderContent)}>
              <h3 className={styles.header}>{manageYourRecommenders}</h3>

              <table className={styles.table} id="table">
                <thead>
                  <th
                    className={classnames(styles.tableHeaders, 'pt15 pb1')}
                    column={recommenderName}
                  >
                    {recommenderName}
                  </th>
                  <th
                    className={classnames(styles.tableHeaders, 'pt15 pb1')}
                    column={recommendedQuantity}
                  >
                    {recommendedQuantity}
                  </th>
                  <th
                    className={classnames(styles.tableHeaders, 'pt15 pb1')}
                    column={acceptedQuantity}
                  >
                    {acceptedQuantity}
                  </th>
                  <th
                    className={classnames(styles.tableHeaders, 'pt15 pb1')}
                    column={declinedQuantity}
                  >
                    {declinedQuantity}
                  </th>
                  <th
                    className={classnames(styles.tableHeaders, 'pt15 pb1')}
                    column={block}
                  >
                    {''}
                  </th>
                </thead>
                {renderRows(recommenderData, {
                  manageYourRecommenders,
                  recommenderName,
                  acceptedQuantity,
                  recommendedQuantity,
                  declinedQuantity,
                  block,
                  unBlock,
                  registryId: props.registryId,
                })}
              </table>
            </div>
          )}

          {isMobile && (
            <div className={styles.recommenderContentMob}>
              <h3 className={styles.heading}>{manageYourRecommenders}</h3>

              {Object.keys(recommenderData).map((value, index) => {
                return recommenderData[value].map(val => {
                  return (
                    <ul
                      key={index}
                      className={classnames(styles.content, 'p15')}
                    >
                      <li className={styles.name}>{val.fullName}</li>
                      <li className={styles.list}>
                        {recommendedQuantity}
                        <span
                          className={classnames(
                            styles.values,
                            !val.profileActive ? styles.blocked : ''
                          )}
                        >
                          {val.recommendedQuantity}
                        </span>
                      </li>
                      <li className={styles.list}>
                        {acceptedQuantity}
                        <span
                          className={classnames(
                            styles.values,
                            !val.profileActive ? styles.blocked : ''
                          )}
                        >
                          {val.acceptedQuantity}
                        </span>
                      </li>
                      <li className={styles.list}>
                        {declinedQuantity}
                        <span
                          className={classnames(
                            styles.values,
                            !val.profileActive ? styles.blocked : ''
                          )}
                        >
                          {val.declinedQuantity}
                        </span>
                      </li>
                      <li className={classnames(styles.list, styles.block)}>
                        <PrimaryLink
                          onClick={callEvent}
                          data-registryId={props.registryId}
                          data-recommenderProfileId={val.recommenderProfileId}
                          data-requestedFlag={
                            val.profileActive ? 'block' : 'unblock'
                          }
                          data-fromAssociate={val.fromAssociate}
                          href={'#'}
                          className={styles.link}
                        >
                          {val.profileActive ? block : unBlock}
                        </PrimaryLink>
                      </li>
                    </ul>
                  );
                });
              })}
            </div>
          )}
        </GridContainer>
      )}
    </div>
  );
};

RecommenderContent.propTypes = {
  recommenderData: PropTypes.object,
  isMobile: PropTypes.object,
  revealBlockUnblockModal: PropTypes.func,
  registryId: PropTypes.string,
};

export default RecommenderContent;
