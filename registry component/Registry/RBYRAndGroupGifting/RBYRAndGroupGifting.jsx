import React, { useState } from 'react';
import classnames from 'classnames';
import { func, bool, object, string } from 'prop-types';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import InputRadio from '@bbb-app/core-ui/input-radio';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import AccordionWrapper from '../GroupGifting/AccordionWrapper';
import formStyles from '../CreateRegistry/CreateRegistryFormStyles.css';
import styles from '../EditRegistry/EditRegistry.css';
import RBYRModal from '../../../../containers/Pages/Registry/RBYRModal/RBYRModal.async';
import {
  EDIT_GROUP_GIFTING_ENABLE,
  EDIT_GROUP_GIFTING_DISABLE,
  EDIT_SHIP_OR_SWAP_ENABLE,
  EDIT_SHIP_OR_SWAP_DISABLE,
  EDIT_SHIP_OR_SWAP_ENABLE_LBL,
  EDIT_SHIP_OR_SWAP_DISABLE_LBL,
  SHIP_OR_SWAP_TITLE_LBL,
  SOS_TERM_AND_CONDITION_LBL,
  SHIP_OR_SWAP_LEARN_MORE_LBL,
  SHIP_OR_SWAP_SUB_HEADING_LBL,
  SHIP_OR_SWAP_HEADING_LBL,
  EDIT_GG_SETTING_TITLE_LBL,
  EDIT_GROUP_GIFTING_DISABLE_LBL,
  EDIT_GROUP_GIFTING_ENABLE_LBL,
  HELP_TEXT_LBL,
  HELP_TEXT_TITLE_LBL,
  SUBHEADING_TITLE_LBL,
} from './constants';

const DangerousPara = dangerousHTML(props => <p {...props} />);

const getReferredContent = (referredContentData, id) => {
  return (
    !isEmpty(referredContentData) &&
    referredContentData[id] &&
    referredContentData[id].body
  );
};

// doing export just for test case
export const ShowDescription = props => {
  const [showLearnMoreModal, setLearnMoreModal] = useState(false);
  const [showTermAndCondition, setTermAndCondition] = useState(false);
  const {
    dynamicContentState,
    rbyrDescriptionId,
    rbyrTermsAndConditionId,
    subHeading,
    description,
    shipOrSwap,
  } = props;
  const referredContentData = pathOr([], 'content', dynamicContentState);

  const rbyrDescription = getReferredContent(
    referredContentData,
    rbyrDescriptionId
  );
  const rbyrTermsAndConditions = getReferredContent(
    referredContentData,
    rbyrTermsAndConditionId
  );

  return (
    <React.Fragment>
      <Cell className={classnames('small-12 mt2 mb1')}>
        <Heading level={6} className={formStyles.privacySettingSubHeading}>
          {subHeading}
        </Heading>
      </Cell>
      <Cell
        className={classnames(
          'small-12',
          styles.deactivateRegistryMessageContainer
        )}
      >
        <DangerousPara
          className={classnames('mt0 mb0', formStyles.formText)}
          data-locator={'showDescription'}
        >
          {shipOrSwap ? rbyrDescription : description}
        </DangerousPara>
      </Cell>
      {shipOrSwap && (
        <React.Fragment>
          <Cell className={classnames('small-12 mt1')}>
            <PrimaryLink
              className={classnames(styles.editLink, styles.details)}
              variation="primary"
              data-locator="term-and-condition-link"
              textDecoration="textDecorationNone"
              href="#"
              onClick={() => setTermAndCondition(true)}
            >
              {SOS_TERM_AND_CONDITION_LBL}
            </PrimaryLink>
          </Cell>
          <Cell className={classnames('small-12 mt1')}>
            <PrimaryLink
              className={classnames(styles.editLink, styles.details)}
              variation="primary"
              data-locator="learn-more-and-faq-link"
              textDecoration="textDecorationNone"
              href="#"
              onClick={() => setLearnMoreModal(true)}
            >
              {SHIP_OR_SWAP_LEARN_MORE_LBL}
            </PrimaryLink>
          </Cell>
          {showTermAndCondition && (
            <ModalDialog
              mountedState={showTermAndCondition}
              toggleModalState={() => setTermAndCondition(false)}
              titleAriaLabel={SOS_TERM_AND_CONDITION_LBL}
              variation="medium"
              verticallyCenter
            >
              <DangerousPara>{rbyrTermsAndConditions}</DangerousPara>
            </ModalDialog>
          )}
          {showLearnMoreModal && (
            <RBYRModal
              showModal={showLearnMoreModal}
              handleLearnMoreClick={() => setLearnMoreModal(false)}
              fromEditForm
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// doing export just for test case
export const RBYRSettingLayout = props => {
  const {
    isEnable,
    onSelectRBYROption,
    heading,
    disableLabel,
    enableLabel,
    enableId,
    disableId,
    shipOrSwap,
    updateState,
  } = props;

  const handleChange = () => {
    if (shipOrSwap) onSelectRBYROption(!isEnable);
    else updateState({ groupGiftOptIn: !isEnable });
  };
  return (
    <div className={classnames(formStyles.editFormSection)}>
      {
        <GridX>
          <Cell className={classnames('small-12')}>
            <Heading level={6} className={formStyles.privacySettingSubHeading}>
              {heading}
            </Heading>
          </Cell>
          <Cell className={classnames('small-12 mb2')}>
            <ul className={formStyles.radiowrapper}>
              <li className={classnames(formStyles.radiowrapper, 'mr3')}>
                <InputRadio
                  id={enableId}
                  name={enableId}
                  labelContent={enableLabel}
                  value="private"
                  onClick={handleChange}
                  checked={isEnable}
                  data-locator={enableId}
                />
              </li>
              <li className={classnames(formStyles.radiowrapper, 'mr1')}>
                <InputRadio
                  id={disableId}
                  name={disableId}
                  labelContent={disableLabel}
                  value="public"
                  onClick={handleChange}
                  checked={!isEnable}
                  data-locator={disableId}
                />
              </li>
            </ul>
          </Cell>
          {<ShowDescription {...props} />}
        </GridX>
      }
    </div>
  );
};

const RBYRAndGroupGifting = props => {
  const { shipOrSwap } = props;
  let title;
  let heading;
  let subHeading;
  let enableLabel;
  let disableLabel;

  if (shipOrSwap) {
    title = SHIP_OR_SWAP_TITLE_LBL;
    heading = SHIP_OR_SWAP_HEADING_LBL;
    subHeading = SHIP_OR_SWAP_SUB_HEADING_LBL;
    enableLabel = EDIT_SHIP_OR_SWAP_ENABLE_LBL;
    disableLabel = EDIT_SHIP_OR_SWAP_DISABLE_LBL;
  } else {
    title = EDIT_GG_SETTING_TITLE_LBL;
    heading = SUBHEADING_TITLE_LBL;
    subHeading = HELP_TEXT_TITLE_LBL;
    enableLabel = EDIT_GROUP_GIFTING_ENABLE_LBL;
    disableLabel = EDIT_GROUP_GIFTING_DISABLE_LBL;
  }

  return (
    <AccordionWrapper title={title}>
      <RBYRSettingLayout
        {...props}
        heading={heading}
        subHeading={subHeading}
        description={HELP_TEXT_LBL}
        shipOrSwap={shipOrSwap}
        disableLabel={disableLabel}
        enableLabel={enableLabel}
        enableId={
          shipOrSwap ? EDIT_SHIP_OR_SWAP_ENABLE : EDIT_GROUP_GIFTING_ENABLE
        }
        disableId={
          shipOrSwap ? EDIT_SHIP_OR_SWAP_DISABLE : EDIT_GROUP_GIFTING_DISABLE
        }
      />
    </AccordionWrapper>
  );
};

RBYRAndGroupGifting.propTypes = {
  shipOrSwap: bool,
};

RBYRSettingLayout.propTypes = {
  isEnable: bool,
  onSelectRBYROption: func,
  heading: string,
  enableLabel: string,
  disableLabel: string,
  enableId: string,
  disableId: string,
  shipOrSwap: bool,
  updateState: func,
};

ShowDescription.propTypes = {
  dynamicContentState: object,
  rbyrDescriptionId: string,
  rbyrTermsAndConditionId: string,
  subHeading: string,
  description: string,
  shipOrSwap: bool,
};

export default RBYRAndGroupGifting;
