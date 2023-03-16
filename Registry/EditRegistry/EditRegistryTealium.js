import pathOr from 'lodash/fp/pathOr';
import {
  RBYR_TEALIUM,
  getRBYRTealiumData,
} from '@bbb-app/tbs/containers/RBYRTealium';
import { TEALIUM_PAGE_INFO, EDIT_MODAL } from './constants';

export const fireTealium = (handleTealiumAction, registryData) => {
  const tealiumVariable = {
    registry_id: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryId',
      registryData
    ),
    registry_type: pathOr(
      '',
      'registryResVO.registrySummaryVO.registryType.registryTypeDesc',
      registryData
    ),
    pagename_breadcrumb: 'Registry View Page',
    product_id: ' ',
  };
  if (handleTealiumAction) {
    handleTealiumAction('edit registry', tealiumVariable, TEALIUM_PAGE_INFO);
  }
};

export const fireOptInTealium = (
  handleTealiumAction,
  storedOptInChange,
  ggOptInChange,
  storedValueOptIn,
  groupGiftOptIn
) => {
  const actionType = storedValueOptIn
    ? RBYR_TEALIUM.OPT_IN_ACTION
    : RBYR_TEALIUM.OPT_OUT_ACTION;
  const storedOptInTealiumVars = {
    cta_pagetype: actionType,
    call_to_actiontype: actionType,
    rbyr_call_to_actiontype: actionType,
  };

  const ggOptInTealiumVars = {};
  if (groupGiftOptIn) {
    ggOptInTealiumVars.reg_groupgift_optin = true;
  } else {
    ggOptInTealiumVars.reg_groupgift_optout = true;
  }

  let tealiumVars;
  if (storedOptInChange && !ggOptInChange) {
    tealiumVars = {
      ...storedOptInTealiumVars,
      page_name: RBYR_TEALIUM.EDIT_REGISTRY,
      pagename_breadcrumb: RBYR_TEALIUM.EDIT_REGISTRY,
    };
  } else if (ggOptInChange && !storedOptInChange) {
    tealiumVars = {
      ...ggOptInTealiumVars,
      page_name: EDIT_MODAL,
      pagename_breadcrumb: EDIT_MODAL,
    };
  } else {
    tealiumVars = {
      cta_pagetype: actionType,
      call_to_actiontype: actionType,
      rbyr_call_to_actiontype: actionType,
      ...ggOptInTealiumVars,
      page_name: RBYR_TEALIUM.EDIT_REGISTRY,
      pagename_breadcrumb: RBYR_TEALIUM.EDIT_REGISTRY,
    };
  }

  handleTealiumAction(
    storedOptInChange ? actionType : '',
    getRBYRTealiumData(tealiumVars),
    storedOptInChange ? actionType : ''
  );
};
