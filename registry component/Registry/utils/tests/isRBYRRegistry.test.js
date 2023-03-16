import * as commonUtil from '@bbb-app/utils/common';
import sinon from 'sinon';
import isRBYRRegistry from '../isRBYRRegistry';

describe(__filename, () => {
  it('should return true when includedRegistries have regType', () => {
    const labels = { RBYR: { includedRegistries: 'BRD' } };
    const regType = 'BRD';
    const wrapper = isRBYRRegistry(labels, regType);
    expect(wrapper).to.be.equal(true);
  });
  it('should return true when includedRegistries have regType when BedBathUS is true', () => {
    sinon.stub(commonUtil, 'getSiteId').returns('BedBathUS');
    const labels = { RBYR: { includedRegistries: 'BRD' } };
    const regType = 'BRD';
    const wrapper = isRBYRRegistry(labels, regType);
    expect(wrapper).to.be.equal(true);
    commonUtil.getSiteId.restore();
  });
});
