import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { RedirectToRegistrySearch } from '../RedirectToRegistrySearch';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should redirect to new url when old site registry search is fired on new site', () => {
    const location = {
      path: '/store/gift-registry-search',
      hash: '#searchKeywordByName=irina+lee+lee',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should redirect to new url when old site registry search is fired on new site only first name', () => {
    const location = {
      path: '/store/gift-registry-search',
      hash: '#searchKeywordByName=irina',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should redirect to new url when old site registry search with registryID is fired on new site', () => {
    const location = {
      path: '/store/gift-registry-search',
      hash: '#searchKeywordById=544606605',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should not give error if hash is not provided', () => {
    const location = {
      path: '/store/gift-registry-search',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should not give error if hash provided but value is undefined when searchById', () => {
    const location = {
      path: '/store/gift-registry-search',
      hash: '#searchKeywordById=',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should not give error if hash provided but value is undefined when searchByName', () => {
    const location = {
      path: '/store/gift-registry-search',
      hash: '#searchKeywordByName=',
    };
    const tree = shallow(<RedirectToRegistrySearch location={location} />);
    expect(toJson(tree)).to.matchSnapshot();
  });
});
