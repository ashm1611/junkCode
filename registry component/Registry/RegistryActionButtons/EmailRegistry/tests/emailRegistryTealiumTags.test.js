import { emailRegistryTealiumTags } from '../emailRegistryTealiumTags';

describe('#emailRegistryTealiumInfo', () => {
  it('should return email Registry tealium tags having registry_id ', () => {
    const registrySummaryVO = {
      registryId: '520648448',
      eventType: 'Wedding',
    };

    const obj = emailRegistryTealiumTags(registrySummaryVO);
    expect(obj.registry_id).equal('520648448');
  });
});
