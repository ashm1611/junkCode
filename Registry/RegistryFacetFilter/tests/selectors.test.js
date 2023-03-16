import { fromJS } from 'immutable';
import {
  selectRegsitryFacetFilter,
  makeSelectFirstCategoryDateSortedList,
  makeSelectOosCategoryDateSortedList,
} from '../selectors';

describe(__filename, () => {
  it('selectRegsitryFacetFilter', () => {
    const test = {
      registryFacetFilter: {
        selectedFilters: { status: [] },
      },
    };
    const mockedState = fromJS(test);
    expect(selectRegsitryFacetFilter()(mockedState)).to.deep.equal(
      fromJS(test.registryFacetFilter.selectedFilters)
    );
  });

  it('should select dateSortedfirstCategorydata from state', () => {
    const selector = makeSelectFirstCategoryDateSortedList();
    const data = { test: 'test' };

    const mockedstate = fromJS({
      giftGiver: {
        dateSortedfirstCategorydata: {
          test: 'test',
        },
      },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });

  it('should select dateSortedOosCategorydata from state', () => {
    const selector = makeSelectOosCategoryDateSortedList();
    const data = { test: 'test' };

    const mockedstate = fromJS({
      giftGiver: {
        dateSortedOosCategorydata: {
          test: 'test',
        },
      },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });

  it('should select dateSortedfirstCategorydata from state', () => {
    const selector = makeSelectFirstCategoryDateSortedList();
    const data = { test: 'test' };

    const mockedstate = fromJS({
      giftGiver: {
        dateSortedfirstCategorydata: {
          test: 'test',
        },
      },
    });

    expect(selector(mockedstate).toJS()).to.deep.equal(data);
  });
});
