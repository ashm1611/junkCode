import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegistryAnalyzer from '../index';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  describe('MyAnalyzer text and icon', () => {
    it('should render myAnalyzerTextandIcon when `hasRegAnalyzerBtnShown` is true', () => {
      const props = {
        hasRegAnalyzerBtnShown: true,
      };

      const tree = shallow(<RegistryAnalyzer {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });
  });

  describe('MyAnalyzer Modal', () => {
    it('should render skeleton when `isRegAnalyzerFetching` is true', () => {
      const props = {
        isRegAnalyzerFetching: true,
      };

      const tree = shallow(<RegistryAnalyzer {...props} />);
      expect(toJson(tree)).to.matchSnapshot();
    });

    it('should render ErrorView when `isRegAnalyzerFetching` is false and `regAnalyzerData` is null', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: null,
      };

      const tree = shallow(<RegistryAnalyzer {...props} />);
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
      const tree = shallow(<RegistryAnalyzer {...props} />);
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
      const tree = shallow(<RegistryAnalyzer {...props} />);
      tree.instance().handleAnalyzerClick({ preventDefault: () => {} });
      expect(getRegAnalyzerDetails.calledOnce).to.equal(true);
    });

    it('should set toggleModalState to false', () => {
      window.history.pushState({}, '', '/test?action=analyzer');
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzer {...props} />);
      tree.instance().toggleModalState(false);
      expect(tree.instance().state.modalMountedState).to.equal(false);
    });

    it('should set toggleModalState to false when action is empty', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzer {...props} />);
      tree.instance().toggleModalState(false);
      expect(tree.instance().state.modalMountedState).to.equal(false);
    });

    it('should set toggleModalState to true', () => {
      const props = {
        isRegAnalyzerFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };
      const tree = shallow(<RegistryAnalyzer {...props} />);
      tree.instance().toggleModalState(true);
      expect(tree.instance().state.modalMountedState).to.equal(true);
    });

    it('should call componentWillReceiveProps', () => {
      const getRegAnalyzerDetails = sinon.spy();
      const props = {
        isRegAnalyzerFetching: false,
        isItemsFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
        location: 'http://localhost:9879/context.html?action=analyzer',
      };
      const nextProps = {
        isRegAnalyzerFetching: false,
        isItemsFetching: false,
        isRemainingItemFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };

      const tree = shallow(
        <RegistryAnalyzer
          {...props}
          getRegAnalyzerDetails={getRegAnalyzerDetails}
        />
      );
      window.history.pushState({}, '', '/test?action=analyzer');
      tree.instance().componentWillReceiveProps(nextProps);
      expect(tree.instance().state.modalMountedState).to.equal(true);
    });

    it('should call componentWillReceiveProps when modalMountedState set to false', () => {
      const props = {
        isRegAnalyzerFetching: false,
        isItemsFetching: true,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
        location: 'http://localhost:9879/context.html?action=analyzer',
      };
      const nextProps = {
        isRegAnalyzerFetching: false,
        isItemsFetching: false,
        isRemainingItemFetching: false,
        regAnalyzerData: {
          defaultNumberOfGuest: 100,
          priceRangeList: null,
        },
      };

      const tree = shallow(<RegistryAnalyzer {...props} />);
      window.history.pushState({}, '', '/test?action=analyzer');
      tree.instance().componentWillReceiveProps(nextProps);
      expect(tree.instance().state.modalMountedState).to.equal(false);
    });
  });
});
