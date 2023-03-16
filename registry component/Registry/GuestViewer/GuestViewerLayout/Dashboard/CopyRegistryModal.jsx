import React from 'react';
import PropTypes from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import Paragraph from '@bbb-app/core-ui/paragraph';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import {
  ITEMS_WILL_BE_ADDED_TEXT_LBL,
  COPY_REGISTRY_LBL,
  BY_COPY_REGISTRY_TXT_LBL,
  MODAL_CANCEL_LBL,
  ITEM_ADDED_LBL,
  VIEW_MANAGE_REGISTRY_LBL,
  MODAL_CLOSE_LBL,
} from '../../../constants';
const renderConfirmationContent = (
  copyRegistryAct,
  registrySummaryVO,
  onClickLinkCancel,
  actionData
) => {
  return (
    <GridX className="grid-margin-x">
      <Cell className="small-12">
        <Heading level={2} className="mb3">
          {registrySummaryVO.giftRegistered} {ITEMS_WILL_BE_ADDED_TEXT_LBL}
        </Heading>
        <Paragraph theme="primary" className="mb35">
          {BY_COPY_REGISTRY_TXT_LBL}
        </Paragraph>
      </Cell>
      <Cell className="small-12 large-6">
        <Button
          theme="primary"
          variation="fullWidth"
          onClick={() => copyRegistryAct(actionData)}
        >
          {COPY_REGISTRY_LBL}
        </Button>
        <PrimaryLink
          href="/"
          type="bold"
          variation="primary"
          className="mt3"
          onClick={e => {
            e.preventDefault();
            onClickLinkCancel(false);
          }}
        >
          {MODAL_CANCEL_LBL}
        </PrimaryLink>
      </Cell>
    </GridX>
  );
};

const renderSuccessContent = (
  copiedProducts,
  onClickLinkCancel,
  redirectToMyRegistry
) => {
  const redirectToRegistry = () => {
    return redirectToMyRegistry();
  };
  return (
    <GridX className="grid-margin-x">
      <Cell className="small-12">
        <Heading level={2} className="mb3">
          {copiedProducts.totalNumOfItemsCopied} {ITEM_ADDED_LBL}
        </Heading>
      </Cell>
      <Cell className="small-12 large-8">
        <Button
          theme="primary"
          variation="fullWidth"
          onClick={() => {
            redirectToRegistry();
          }}
        >
          {VIEW_MANAGE_REGISTRY_LBL}
        </Button>
        <PrimaryLink
          href="/"
          type="bold"
          variation="primary"
          className="mt3"
          onClick={e => {
            e.preventDefault();
            onClickLinkCancel(false);
          }}
        >
          {MODAL_CLOSE_LBL}
        </PrimaryLink>
      </Cell>
    </GridX>
  );
};

const CopyRegistryModal = props => {
  const {
    registryData,
    copyRegistryAct,
    match,
    activeRegistry,
    isRegistryCopied,
    onClickLinkCancel,
    redirectToMyRegistry,
    copiedProducts,
    sortOption,
  } = props;

  const sourceId = match.params.id;
  const targetId = activeRegistry.registryId;
  const registryResVO = pathOr(null, 'registryResVO', registryData);
  const registrySummaryVO = pathOr(null, 'registrySummaryVO', registryResVO);
  const regType = activeRegistry.eventType;
  const eventTypeCode = pathOr(
    '',
    'registryType.registryTypeName',
    activeRegistry
  );
  return (
    <div>
      {isRegistryCopied === 'SUCCESS' && !isEmpty(copiedProducts)
        ? renderSuccessContent(
            copiedProducts,
            onClickLinkCancel,
            redirectToMyRegistry
          )
        : renderConfirmationContent(
            copyRegistryAct,
            registrySummaryVO,
            onClickLinkCancel,
            { sourceId, targetId, regType, sortOption, eventTypeCode }
          )}
    </div>
  );
};

CopyRegistryModal.propTypes = {
  registryData: PropTypes.object,
  activeRegistry: PropTypes.object,
  match: PropTypes.object,
  copyRegistryAct: PropTypes.func,
  isRegistryCopied: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClickLinkCancel: PropTypes.func,
  copiedProducts: PropTypes.object,
  redirectToMyRegistry: PropTypes.func,
  sortOption: PropTypes.string,
};

export default CopyRegistryModal;
