import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pathOr from 'lodash/fp/pathOr';
import { isEmpty } from 'lodash';
import Cell from '@bbb-app/core-ui/cell';
import GridX from '@bbb-app/core-ui/grid-x';
import Heading from '@bbb-app/core-ui/heading';
import Button from '@bbb-app/core-ui/button';
import dangerousHTML from '@bbb-app/hoc/dangerousHTML';
import InputRadio from '@bbb-app/core-ui/input-radio';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import '@bbb-app/assets/icons/infoIcon.svg';
import formStyles from './../../CreateRegistry/CreateRegistryFormStyles.css';
import styles from '../EditRegistry.css';
import DeactivateRegistryModal from '../../../../../containers/Pages/Registry/DeactivateRegistryModal/DeactivateRegistryModal';
import {
  EDIT_REG_PRIVACY_PRIVATE_LBL,
  EDIT_REG_PRIVACY_PUBLIC_LBL,
  EDIT_REG_PRIVACY_SETTINGS_SUBHEADING_LBL,
  REGISTRY_DEACTIVATION_LBL,
} from '../constants';
import {
  PRIVACY_SETTINGS_HEADING_TOOLTIP_LBL,
  DEACTIVATE_MY_REGISTRY_LBL,
} from './constants';

/**
 * @param {object} labels
 * @param {object} stateObj
 */

class PrivacySettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      deactivateRegModalState: false,
    };
  }

  openDeactivateRegModal = () => {
    this.toggleDeactivateRegModal(true);
  };

  toggleDeactivateRegModal = state => {
    this.setState({ deactivateRegModalState: state });
  };

  handleChange = () => {
    const { updateState, stateObj } = this.props;
    updateState({ isPublic: stateObj.isPublic === '1' ? '0' : '1' });
  };

  deactivateMyRegistry = () => {
    const {
      labels,
      deactivateRegistryContentId,
      dynamicContentState,
    } = this.props;

    let deActivationMessage = '';

    const referredContentData = pathOr([], 'content', dynamicContentState);

    if (
      !isEmpty(referredContentData) &&
      referredContentData[deactivateRegistryContentId]
    ) {
      deActivationMessage =
        referredContentData[deactivateRegistryContentId].body;
    }
    const DangerousPara = dangerousHTML(props => <p {...props} />);

    return (
      <React.Fragment>
        <Cell className={classnames('small-12 mt2 mb1')}>
          <Heading level={6} className={formStyles.privacySettingSubHeading}>
            {REGISTRY_DEACTIVATION_LBL}{' '}
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
            data-locator={'deactivate-registry-message'}
          >
            {deActivationMessage}
          </DangerousPara>
        </Cell>
        <Cell className={classnames('small-12 mt1')}>
          <PrimaryLink
            className={classnames(styles.editLink, styles.details)}
            variation="primary"
            data-locator="deactivate-registry-link"
            textDecoration="textDecorationNone"
            href="#"
            onClick={this.openDeactivateRegModal}
          >
            {DEACTIVATE_MY_REGISTRY_LBL}
          </PrimaryLink>
        </Cell>
        {this.state.deactivateRegModalState && (
          <DeactivateRegistryModal
            modalMountedState={this.state.deactivateRegModalState}
            toggleModalState={this.toggleDeactivateRegModal}
            toggleModalDeactivateRegistry={this.props.toggleModalState}
            labels={labels}
          />
        )}
      </React.Fragment>
    );
  };

  render() {
    const { stateObj, dataLocator } = this.props;
    return (
      <div className={classnames(formStyles.editFormSection)}>
        {
          <GridX>
            <Cell className={classnames('small-12')}>
              <Heading
                level={6}
                className={formStyles.privacySettingSubHeading}
              >
                {EDIT_REG_PRIVACY_SETTINGS_SUBHEADING_LBL}{' '}
                <Button
                  data-tooltip={PRIVACY_SETTINGS_HEADING_TOOLTIP_LBL}
                  className="tooltip-bottom"
                  theme="ghost"
                  variation="noPadding"
                  iconProps={{
                    type: 'infoIcon',
                    height: '12px',
                    width: '12px',
                  }}
                  aria-label={PRIVACY_SETTINGS_HEADING_TOOLTIP_LBL}
                />
              </Heading>
            </Cell>
            <Cell className={classnames('small-12 mb2')}>
              <ul className={formStyles.radiowrapper}>
                <li className={classnames(formStyles.radiowrapper, 'mr3')}>
                  <InputRadio
                    id="privacyPrivate"
                    name="privacyOption"
                    labelContent={EDIT_REG_PRIVACY_PRIVATE_LBL}
                    value="private"
                    onClick={this.handleChange}
                    checked={stateObj.isPublic !== '1'}
                    data-locator={dataLocator.registryRegTypePrivate}
                  />
                </li>
                <li className={classnames(formStyles.radiowrapper, 'mr1')}>
                  <InputRadio
                    id="privacyPublic"
                    name="privacyOption"
                    labelContent={EDIT_REG_PRIVACY_PUBLIC_LBL}
                    value="public"
                    onClick={this.handleChange}
                    checked={stateObj.isPublic === '1'}
                    data-locator={dataLocator.registryRegTypePublic}
                  />
                </li>
              </ul>
            </Cell>
            {this.deactivateMyRegistry()}
          </GridX>
        }
      </div>
    );
  }
}

/**
 * @param {object} labels [Renders labels and strings on view ]
 * @param {object} stateObj [Renders state of input]
 */
PrivacySettings.propTypes = {
  labels: PropTypes.object,
  stateObj: PropTypes.object,
  updateState: PropTypes.func,
  dataLocator: PropTypes.object,
  deactivateRegistryContentId: PropTypes.any,
  dynamicContentState: PropTypes.object,
  toggleModalState: PropTypes.func,
};

export default PrivacySettings;
