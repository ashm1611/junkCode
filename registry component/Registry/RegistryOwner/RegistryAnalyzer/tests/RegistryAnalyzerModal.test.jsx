import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryAnalyzerModal from '../RegistryAnalyzerModal';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  describe('MyAnalyzer text and icon', () => {
    it('should render myAnalyzerTextandIcon when `hasRegAnalyzerBtnShown` is true', () => {
      const props = {
        hasRegAnalyzerBtnShown: true,
      };

      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
  });

  describe(`${__filename} - MyAnalyzer Modal`, () => {
    it('should render skeleton when `isRegAnalyzerFetching` is true', () => {
      const fetchRegAnalyzerData = sinon.spy();
      const handleTealiumEvent = sinon.spy();
      const setFromAnalyzerTealium = sinon.spy();
      const props = {
        isRegAnalyzerFetching: true,
        fetchRegAnalyzerData,
        handleTealiumEvent,
        setFromAnalyzerTealium,
      };

      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });

    it('should render ErrorView when `isRegAnalyzerFetching` is false and `regAnalyzerData` is null', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: null,
      };

      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
    it('should call getRegAnalyzerDetails', () => {
      const getRegAnalyzerDetails = sinon.spy();
      const props = {
        getRegAnalyzerDetails,
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      tree.instance().fetchRegAnalyzerData();
      expect(getRegAnalyzerDetails.calledOnce).to.equal(true);
    });
    it('should call handleTealiumEvent', () => {
      const setFromAnalyzerTealium = sinon.spy();
      const props = {
        setFromAnalyzerTealium,
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      tree.instance().handleTealiumEvent();
      expect(setFromAnalyzerTealium.calledOnce).to.equal(true);
    });
    it('should render ScorecardView  when `isRegAnalyzerFetching` is false and `regAnalyzerData` is not null', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: [
            {
              addMoreLink:
                '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMCwyNS45OV0i?pstate=pv_view:grid||&ta=typeahead&ml=v2',
              addedNoOfGifts: 0,
              displayString: 'Under $25',
              distributionPercent: 10,
              priceRangeMax: 25,
              priceRangeMin: 1,
              recommendedNoOfGifts: 0,
            },
            {
              addMoreLink:
                '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
              addedNoOfGifts: 2,
              displayString: '$25 - $50',
              distributionPercent: 25,
              priceRangeMax: 50,
              priceRangeMin: 25,
              recommendedNoOfGifts: 2,
            },
            {
              addMoreLink:
                '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
              addedNoOfGifts: 96,
              displayString: '$25 - $50',
              distributionPercent: 25,
              priceRangeMax: 50,
              priceRangeMin: 25,
              recommendedNoOfGifts: 100,
            },
            {
              addMoreLink:
                '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
              addedNoOfGifts: 1,
              displayString: '$25 - $50',
              distributionPercent: 25,
              priceRangeMax: 50,
              priceRangeMin: 25,
              recommendedNoOfGifts: 2,
            },
            {
              addMoreLink:
                '/s/_wedding-registry-favorite_/TE9XX1BSSUNFOiJbMjYsNTAuOTldIg==?pstate=pv_view:grid||&ta=typeahead&ml=v2',
              addedNoOfGifts: 8,
              displayString: '$25 - $50',
              distributionPercent: 25,
              priceRangeMax: 50,
              priceRangeMin: 25,
              recommendedNoOfGifts: 100,
            },
          ],
        },
      };
      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });

    it('should render ErrorView  when `isRegAnalyzerFetching` is false, `regAnalyzerData` is not null but `priceRangeList` is null', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzerModal {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
  });
});
