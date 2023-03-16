import { isEmpty } from 'lodash';
import qs from 'qs';
import ServiceUtil from '@bbb-app/utils/serviceUtil';
import getApiEndPointsFromStore from '@bbb-app/utils/getApiEndPointsFromStore';
import consoleLog from '@bbb-app/utils/logger';
import { submitRegistryData } from '../../../../../containers/Pages/Registry/EditRegistry/EditRegistryConfig';
import { registryState } from './../../../../../containers/Pages/Registry/RegistryStateDataUtils';

// eslint-disable-next-line max-params
export function setToggleEdit(
  attributeName,
  registryData,
  eventType,
  registryId,
  eventTypeCode,
  toggledValue,
  setShowChecklist
) {
  const regState = registryState(registryData);
  const formData = submitRegistryData(
    regState,
    eventType,
    registryId,
    eventTypeCode
  );
  if (!isEmpty(formData)) {
    formData[attributeName] = toggledValue;
    ServiceUtil.triggerServerRequest({
      url: getApiEndPointsFromStore('editRegistry'),
      method: 'PUT',
      showLoader: true,
      data: qs.stringify(formData),
    })
      .then(data => {
        const { serviceStatus } = data && data.body;
        if (serviceStatus) {
          setShowChecklist(toggledValue);
        }
      })
      .catch(err => {
        consoleLog.error(err);
      });
  }
}
