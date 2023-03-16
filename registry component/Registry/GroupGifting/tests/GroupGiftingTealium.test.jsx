import { getGroupGiftingTealiumData } from '../GroupGiftingTealium';

describe(__filename, () => {
  const utag = {
    channel: 'Registry',
    page_function: 'Registry',
    page_type: 'Registry',
    navigation_path: 'Registry',
    category: 'Registry',
    sub_category: 'Registry',
    subnavigation_path: 'Registry',
  };
  it('Group Gifting on present utag data', () => {
    const expected = getGroupGiftingTealiumData(utag);
    expect(expected).to.deep.equal({
      channel: 'Registry',
      page_function: 'Registry',
      page_type: 'Registry',
      navigation_path: 'Registry',
      category: 'Registry',
      sub_category: 'Registry',
      subnavigation_path: 'Registry',
    });
  });
  it('Group Gifting without utag data', () => {
    const expected = getGroupGiftingTealiumData();
    expect(expected).to.deep.equal({
      category: 'Registry',
      channel: 'Registry',
      navigation_path: 'Registry',
      page_function: 'Registry',
      page_type: 'Registry',
      sub_category: 'Registry',
      subnavigation_path: 'Registry',
    });
  });
});
