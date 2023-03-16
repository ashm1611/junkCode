import { getSiteId } from '@bbb-app/utils/common';
import pathOr from 'lodash/fp/pathOr';
/**
 * @labels All registry types needs to be included
 * @regType current Registry
 */
const isRBYRRegistry = (labels, regType) => {
  const isBedBathUS = getSiteId() === 'BedBathUS';
  const isRegType = isBedBathUS ? 'BRD' : 'BIR';
  const includedRegistries = pathOr(
    isRegType,
    'RBYR.includedRegistries',
    labels
  );
  return includedRegistries && includedRegistries.includes(regType);
};
export default isRBYRRegistry;
