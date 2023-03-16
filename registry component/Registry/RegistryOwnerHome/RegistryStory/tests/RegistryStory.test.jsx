import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import RegistryStory from '../RegistryStory';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const storyData = [
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
    {
      title_cta: 'great benefits',
      image:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/Weds1circle?$PNG$',
    },
  ];
  it('should render correctly', () => {
    const tree = shallow(<RegistryStory storyData={storyData} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly for Mobile', () => {
    const tree = shallow(<RegistryStory storyData={storyData} isMobile />);
    expect(tree.find('.storyMobContainer')).to.have.lengthOf(1);
  });
  it('storyData is empty', () => {
    const tree = shallow(<RegistryStory storyData={[]} isMobile />);
    // eslint-disable-next-line no-unused-expressions
    expect(tree).to.be.empty;
  });
});
