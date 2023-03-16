import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as utils from '@bbb-app/utils/common';
import * as LocalStorageUtil from '@bbb-app/utils/localStorage';
import RegistryUsabilitySurvey from '../RegistryUsabilitySurvey';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const registryId = '527312376';
  const surveyHeading = 'How would you rate your registry experience?';

  it('should render RegistryUsabilitySurvey component correctly', () => {
    const tree = shallow(
      <RegistryUsabilitySurvey
        registryId={registryId}
        surveyHeading={surveyHeading}
      />
    );
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should not render RegistryUsabilitySurvey component on click of close button', () => {
    const getItemStub = sinon.stub().returns(false);
    const saveItemStub = sinon.stub();
    const stub = sinon.stub(LocalStorageUtil, 'LocalStorageUtil').returns({
      getItem: getItemStub,
      saveItem: saveItemStub,
    });
    sinon.stub(utils, 'getCurrentSiteIdAtBrowser').returns('BuyBuyBaby');
    const tree = shallow(
      <RegistryUsabilitySurvey
        registryId={registryId}
        surveyHeading={surveyHeading}
      />
    );
    expect(getItemStub.called).to.be.equal(true);
    tree.find('IconButton').simulate('click');
    expect(saveItemStub.called).to.be.equal(true);
    stub.restore();
    expect(toJson(tree)).to.matchSnapshot();
    expect(tree.find(RegistryUsabilitySurvey)).to.have.length(0);
    utils.getCurrentSiteIdAtBrowser.restore();
  });
  it('should not render RegistryUsabilitySurvey component on click of close button', () => {
    window.OOo = {
      inlineFeedbackShow: () => {},
    };
    const tree = shallow(
      <RegistryUsabilitySurvey
        registryId={registryId}
        surveyHeading={surveyHeading}
      />
    );
    tree.find('#thumbsUpLink').simulate('click');
    expect(tree.find(RegistryUsabilitySurvey)).to.have.length(0);
  });
  it('should not render RegistryUsabilitySurvey component on click of close button', () => {
    window.OOo = {
      inlineFeedbackShow: () => {},
    };
    const isBrowserStub = sinon.stub(utils, 'isBrowser').returns(false);
    const tree = shallow(
      <RegistryUsabilitySurvey
        registryId={registryId}
        surveyHeading={surveyHeading}
      />
    );
    tree.find('#thumbsUpLink').simulate('click');
    expect(tree.find(RegistryUsabilitySurvey)).to.have.length(0);
    isBrowserStub.restore();
  });
});
