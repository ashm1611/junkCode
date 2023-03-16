import React from 'react';
import Sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import RegistryBuilderPage from '../RegistryBuilderPage';

configure({ adapter: new Adapter() });
describe(__filename, () => {
  const interactiveCheckListData = {
    categoryListVO: [
      {
        addedQuantity: 0,
        categoryId: 'DC12350000',
        categoryName: 'Essentials Wedding',
        categoryURL: '/checklist/wedding/essentials/dc12350000/dc31',
        childCategoryVO: [
          {
            addedQuantity: 0,
            categoryId: 'DC3185',
            categoryName: 'Bedding',
            categoryURL: '/checklist/wedding/essentials/bedding/dc3185/dc31',
            childCategoryVO: [
              {
                addedQuantity: 0,
                categoryId: 'DC3192',
                categoryName: 'Comforter Sets',
                categoryURL: '/category/bedding/comforter-sets/15502/',
                childCategoryVO: null,
                displayName: 'Comforter Sets',
                suggestedQuantity: 2,
              },
            ],
            displayName: 'Bedding',
            imageURL:
              'https://s7d9.scene7.com/is/image/BedBathandBeyond/College_Bedding_03-15-17?$PNG$',
            suggestedQuantity: 1,
          },
        ],
        displayName: 'Essentials',
        imageURL:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/bedding?$content$',
        suggestedQuantity: 0,
      },
      {
        addedQuantity: 0,
        categoryId: 'DC12350001',
        categoryName: 'Essentials & Beyond',
        categoryURL: '/checklist/wedding/essentials-beyond/dc12350001/dc31',
        childCategoryVO: [
          {
            categoryId: 'DC11550005',
            categoryName: 'Small Appliances',
            categoryURL:
              '/checklist/wedding/essentials-beyond/small-appliances/dc11550005/dc31',
            childCategoryVO: [
              {
                addedQuantity: 1,
                categoryId: 'DC397',
                categoryName: 'Stand Mixer',
                categoryURL:
                  '/category/kitchen/small-appliances/mixers-attachments/12078/',
                suggestedQuantity: 1,
              },
            ],
            displayName: 'Small Appliances',
            imageURL:
              'https://b3h2.scene7.com/is/image/BedBathandBeyond/ic%5Fsmall%2Dapps2x5.3.19?$PNG$',
          },
        ],
        displayName: 'Essentials & Beyond',
        imageURL:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/ic%2Ddining2x5.3.19?$PNG$',
      },
      {
        addedQuantity: 0,
        categoryId: 'DC12350000',
        categoryName: 'Essentials Wedding 2',
        categoryURL: '/checklist/wedding/essentials/dc12350000/dc31',
        childCategoryVO: [
          {
            addedQuantity: 0,
            categoryId: 'DC3185',
            categoryName: 'Bedding',
            categoryURL: '/checklist/wedding/essentials/bedding/dc3185/dc31',
            childCategoryVO: [
              {
                addedQuantity: 1,
                categoryId: 'DC3192',
                categoryName: 'Comforter Sets',
                categoryURL: '/category/bedding/comforter-sets/15502/',
                childCategoryVO: null,
                displayName: 'Comforter Sets',
                suggestedQuantity: 2,
              },
            ],
            displayName: 'Bedding 2',
            imageURL:
              'https://s7d9.scene7.com/is/image/BedBathandBeyond/College_Bedding_03-15-17?$PNG$',
            suggestedQuantity: 1,
          },
        ],
        displayName: 'Essentials 2',
        imageURL:
          'https://b3h2.scene7.com/is/image/BedBathandBeyond/bedding?$content$',
        suggestedQuantity: 0,
      },
    ],
    registryId: '521070015',
  };
  it('should render correctly', () => {
    const tree = shallow(
      <RegistryBuilderPage
        interactiveCheckListData={interactiveCheckListData}
        isMobile={false}
        showRegBuilder={'default'}
        setShowRegBuilder={Sinon.spy()}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly for mobile', () => {
    const tree = shallow(
      <RegistryBuilderPage
        interactiveCheckListData={interactiveCheckListData}
        isMobile
        showRegBuilder={'Essentials & Beyond'}
        setShowRegBuilder={Sinon.spy()}
      />
    );
    tree.find('ModalDialog').prop('toggleModalState')();
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('interactiveCheckListData is empty', () => {
    const tree = shallow(<RegistryBuilderPage interactiveCheckListData={{}} />);
    /* eslint no-unused-expressions: 0 */
    expect(tree).to.be.empty;
  });
  it('categoryListVO is empty', () => {
    const tree = shallow(
      <RegistryBuilderPage
        interactiveCheckListData={{ categoryListVO: null }}
      />
    );
    expect(tree).to.be.empty;
  });
});
