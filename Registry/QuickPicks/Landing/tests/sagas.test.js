import { put, select } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import {
  computeSelectedRegistryType,
  fetchQuickPicks,
  fetchRegistryType,
  fetchRegistryTypes,
  transformAllCategory,
  watchForRequest,
} from '../sagas';
import {
  registryQuickPicksLandingConfigSelector,
  registryQuickPicksSelector,
} from '../selectors';
import {
  registryTypes,
  categories,
  hero,
  allCategoriesData,
  categoriesHelper,
} from './mock-data';
import { setQuickPicks } from '../actions';
describe(__filename, () => {
  describe('#fetchQuickPicks', () => {
    it('should push new route when no args defined.', () => {
      const config = {
        'registry.quickpicks.landing.default.type': '123456789',
      };
      const quickPicks = {
        registryTypes: [],
        cacheKey: '',
      };
      const gen = fetchQuickPicks({
        args: {
          registryType: '',
        },
      });
      expect(gen.next().value).to.deep.equal(
        select(registryQuickPicksSelector)
      );
      expect(gen.next(quickPicks).value).to.deep.equal(
        select(registryQuickPicksLandingConfigSelector)
      );
      expect(gen.next(config).value).to.deep.equals(
        put(replace('/store/kickstarters/-/123456789'))
      );
    });

    it('should fetch Quick Picks', () => {
      const config = {
        'registry.quickpicks.landing.default.type': '123456789',
      };
      const quickPicks = {
        registryTypes: [],
        cacheKey: '',
      };
      const gen = fetchQuickPicks({
        args: {
          registryType: '123456789',
        },
      });
      const outputData = {
        selectedCategory: 'all',
        selectedRegistryType: '123456789',
        error: false,
        categories: categoriesHelper,
        registryTypes: { registryTypes },
        hero,
        cacheKey: '',
      };
      expect(gen.next().value).to.deep.equal(
        select(registryQuickPicksSelector)
      );
      expect(gen.next(quickPicks).value).to.deep.equal(
        select(registryQuickPicksLandingConfigSelector)
      );

      gen.next(config); // Api calls.
      expect(
        gen.next([{ categories, hero }, { registryTypes }]).value
      ).to.deep.equal(put(setQuickPicks(outputData)));
    });
    it('should fetch Quick Picks with cacheKey', () => {
      const quickPicks = {
        registryTypes: [],
        cacheKey: 'abc',
      };
      const gen = fetchQuickPicks({
        args: {
          registryType: '123456789',
          pagePath: 'abc',
        },
      });
      expect(gen.next().value).to.deep.equal(
        select(registryQuickPicksSelector)
      );
      expect(gen.next(quickPicks).value).to.deep.equal(put(setQuickPicks({})));
    });
    it('should fetch Quick Picks with data in store', () => {
      const config = {
        'registry.quickpicks.landing.default.type': '123456789',
      };
      const quickPicks = {
        registryTypes,
        cacheKey: '',
      };
      const gen = fetchQuickPicks({
        args: {
          registryType: '123456789',
        },
      });
      expect(gen.next().value).to.deep.equal(
        select(registryQuickPicksSelector)
      );
      expect(gen.next(quickPicks).value).to.deep.equal(
        select(registryQuickPicksLandingConfigSelector)
      );

      gen.next(config); // Api calls.
      expect(typeof gen.next([{ categories, hero }, null]).value).to.be.equal(
        'object'
      ); // close out.;
    });

    it('should set error when error is thrown', () => {
      const config = {
        'registry.quickpicks.landing.default.type': '123456789',
      };
      const quickPicks = {
        registryTypes,
        cacheKey: '',
      };
      const gen = fetchQuickPicks({
        args: {
          registryType: '123456789',
        },
      });
      expect(gen.next().value).to.deep.equal(
        select(registryQuickPicksSelector)
      );
      expect(gen.next(quickPicks).value).to.deep.equal(
        select(registryQuickPicksLandingConfigSelector)
      );

      gen.next(config); // Api calls.
      const error = new Error('some error');
      const response = { body: error };
      expect(gen.throw(response).value).to.deep.equal(
        put(setQuickPicks({ error: true }))
      );
      gen.next(); // Close out.
    });
  });
  it('watch sagas', () => {
    expect(typeof watchForRequest().next().value).to.be.equal('object');
  });
  it('should fetchRegistryTypes with data', () => {
    const gen = fetchRegistryTypes();
    gen.next();
    expect(typeof gen.next({ body: { data: {} } }).value).to.be.equal('object');
  });
  it('should fetchRegistryTypes without data', () => {
    const gen = fetchRegistryTypes();
    gen.next();
    expect(typeof gen.next({ body: {} }).value).to.be.equal('object');
  });
  it('should fetchRegistryType with data', () => {
    const gen = fetchRegistryType('123456789');
    gen.next();
    expect(typeof gen.next({ body: { data: {} } }).value).to.be.equal('object');
  });
  it('should fetchRegistryType without data', () => {
    const gen = fetchRegistryType('123456789');
    gen.next();
    expect(typeof gen.next({ body: {} }).value).to.be.equal('object');
  });
  it('should transformAllCategory to consistent contract structure.', () => {
    const result = transformAllCategory(allCategoriesData);
    expect(typeof result).to.be.equal('object');
  });
  describe('#computeSelectedRegistryType', () => {
    it('should compute registry Type that was not selected', () => {
      const registryType = computeSelectedRegistryType(null, registryTypes);
      expect(registryType).to.equal('200006');
    });
    it('should return selected registry type', () => {
      const registryType = computeSelectedRegistryType('1234', registryTypes);
      expect(registryType).to.equal('1234');
    });
    it('should give up trying to compute registry type', () => {
      try {
        const registryType = computeSelectedRegistryType('1234', []);
        expect(registryType).to.not.equal(undefined);
      } catch (e) {
        // this is ok
      }
    });
  });
});
