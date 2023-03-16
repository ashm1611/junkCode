import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { noop } from '@bbb-app/utils/common';
import Cell from '@bbb-app/core-ui/cell';
import * as isInternationalUserUtil from '@bbb-app/utils/isInternationalUser';

import RecommendationRow from '../RecommendationRow';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  let wrapper;
  const isMobile = {
    isMobileScreen: false,
  };
  const scene7URL = {
    url: '',
  };
  let recommendationList = {
    firstName: 'mohit',
    lastName: 'kumar',
    comment: 'abcdesfg',
    skuDisplayName: 'PRoduct name',
    skuColor: 'red',
    skuSize: 'big',
    fullName: 'XYZ',
    fromAssociate: true,
    recommendedQuantity: 2,
    imageVO: { basicImage: '9291514310568p?$146$' },
    bvProductVO: {},
    sKUDetailVO: {
      skuId: 1122334455,
      parentProdId: 1122334455,
      ltlItem: false,
      displayName: 'test',
      customizableRequired: '',
      personalizationType: '',
    },
  };
  const readMore = sinon.spy();
  const extendedComment = sinon.spy();
  const mayBeLaterBtnCall = sinon.stub();
  const switchConfig = {
    enableRegistryCollaboration: true,
  };
  beforeEach(() => {
    wrapper = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        selectMayBeLaterFlag="true"
        tabId={1}
        registryId={111111111111111}
        registryEventType="Weeding"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        switchConfig={switchConfig}
      />
    );
  });

  it('should render correctly when tab id=1', () => {
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        selectMayBeLaterFlag="true"
        tabId={1}
        registryId={111111111111111}
        registryEventType="Weeding"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        switchConfig={switchConfig}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should render correctly when tab id=0', () => {
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        selectMayBeLaterFlag="true"
        tabId={0}
        registryId={111111111111111}
        registryEventType="Weeding"
        switchConfig={switchConfig}
      />
    );
    tree.find('Button').simulate('click', { target: {} });
    expect(tree).to.not.equal(null);
  });

  it('should render correctly when tab id=2', () => {
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        selectMayBeLaterFlag="true"
        tabId={2}
        registryId={111111111111111}
        registryEventType="Weeding"
        switchConfig={switchConfig}
      />
    );
    tree
      .find('AddToRegistry')
      .props()
      .onSuccess();
    expect(tree).to.not.equal(null);
  });

  it('should set selectedQuantity to 2', () => {
    const updatedQuantity = 2;
    wrapper.instance().changeQuantity(2, 0);
    expect(wrapper.state().selectedQuantity[0]).to.equal(updatedQuantity);
  });

  it('should set selectedQuantity to 1 if user selects 0', () => {
    wrapper.instance().changeQuantity('0', 0);
    expect(wrapper.state().selectedQuantity[0]).to.equal('1');
  });

  it('should set showSeeAllLink to true', () => {
    const showSeeAllLink = true;
    wrapper.instance().addToRegistryButton(2);
    expect(wrapper.state().showSeeAllLink).to.equal(showSeeAllLink);
  });

  it('should set readMoreFlag to false', () => {
    wrapper.instance().readMore();
    expect(wrapper.state().readMoreFlag).to.equal(true);
    wrapper.instance().readMore();
  });

  it('on quick view button click', () => {
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        selectMayBeLaterFlag="true"
        tabId={12}
        registryId={111111111111111}
        registryEventType="Weeding"
        switchConfig={switchConfig}
      />
    );
    tree
      .find('QuantitySelector')
      .props()
      .updateQuantity(2);
    tree
      .find('AddToRegistry')
      .props()
      .onSuccess();
    const event = {
      target: {
        name: 'hideDetail',
      },
    };
    tree.instance().mayBeLaterButton(event);
    tree.find(Cell).simulate('click', { preventDefault: noop });
    expect(mayBeLaterBtnCall.called);
  });

  it('should render correctly for other branches', () => {
    recommendationList = [
      {
        firstName: 'mohit',
        lastName: 'kumar',
        comment: 'abcdesfg',
        skuDisplayName: 'PRoduct name',
        skuColor: 'red',
        skuSize: 'big',
        fullName: 'XYZ',
        fromAssociate: true,
        recommendedQuantity: 2,
      },
    ];
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        selectMayBeLaterFlag="true"
        tabId={1}
        registryId={111111111111111}
        registryEventType="Weeding"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        isAssociate
        isRowCollection
        recommendationCommentLimitPageConfig={1}
        switchConfig={switchConfig}
      />
    );
    tree.find('PrimaryLink').simulate('click', { preventDefault: () => {} });
    expect(tree).to.not.equal(null);
  });

  it('should render for international user', () => {
    const isInternationalUserStub = sinon
      .stub(isInternationalUserUtil, 'default')
      .returns(true);
    expect(wrapper.instance().checkButtonTheme()).to.be.equal('deactivated');
    isInternationalUserStub.restore();
  });

  it('should call renderRowTitle and return jsx', () => {
    wrapper.setProps({ sortOptionApplied: 'recommender' });
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderRowTitle and return jsx for Associate', () => {
    wrapper.setProps({ sortOptionApplied: 'recommender', isAssociate: true });
    expect(wrapper).to.not.equal(null);
  });

  it('should call renderRegistryAddedBtn and return jsx', () => {
    recommendationList = [
      {
        firstName: 'mohit',
        lastName: 'kumar',
        comment: 'abcdesfg',
        skuDisplayName: 'PRoduct name',
        skuColor: 'red',
        skuSize: 'big',
        fullName: 'XYZ',
        fromAssociate: true,
        recommendedQuantity: 2,
      },
    ];
    wrapper.setProps({
      recommnedationItem: recommendationList,
    });
    wrapper.instance().renderRegistryAddedBtn(0);
  });

  it('should render QuickViewButton', () => {
    recommendationList = [
      {
        firstName: 'mohit',
        lastName: 'kumar',
        comment: 'abcdesfg',
        skuDisplayName: 'PRoduct name',
        skuColor: 'red',
        skuSize: 'big',
        fullName: 'XYZ',
        fromAssociate: true,
        recommendedQuantity: 2,
        imageVO: '123',
        bvProductVO: {},
        sKUDetailVO: {},
      },
    ];
    const tree = shallow(
      <RecommendationRow
        recommnedationItem={recommendationList}
        key={1}
        uniqueIndex={1}
        endPoints="test"
        scene7URL={scene7URL}
        isMobile={isMobile}
        mayBeLaterLabel="may be later"
        addtoRegistryLabel="add to registry"
        sizeLabel="size"
        colorLabel="color"
        showMore="Show More"
        showLess="Show Less"
        readMore={readMore}
        extendedComment={extendedComment}
        seeAllMyItemsLabel="SeeAll"
        moveToMyItemsLabel="move to my items"
        moveToMayBeLaterLabel="move to may be later"
        addedToRegistryFlag="true"
        selectMayBeLaterFlag="true"
        tabId={0}
        registryId={111111111111111}
        registryEventType="Weeding"
        mayBeLaterBtnCall={mayBeLaterBtnCall}
        isAssociate
        isRowCollection
        recommendationCommentLimitPageConfig={1}
        switchConfig={{ enableRecommendListQuickView: true }}
        onQuickViewButtonClick={sinon.stub()}
      />
    );
    tree.setState({ qtySelectError: 'hgfhgfv' });
    tree.find('QuickViewButton').simulate('click');
    tree
      .find('QuantitySelector')
      .props()
      .onChangeQuantity(1);
    tree
      .find('QuantitySelector')
      .props()
      .updateQuantity(2);
    tree
      .find('AddToRegistry')
      .props()
      .onSuccess();
    tree.instance().mayBeLaterButton({ target: {} }, 0);
  });

  it('should not render renderRecommendation', () => {
    wrapper.setState({ item_0: true });
    recommendationList = [
      {
        firstName: 'mohit',
        lastName: 'kumar',
        comment: 'abcdesfg',
        skuDisplayName: 'PRoduct name',
        skuColor: 'red',
        skuSize: 'big',
        fullName: 'XYZ',
        fromAssociate: true,
        recommendedQuantity: 2,
      },
    ];
    wrapper.setProps({
      recommnedationItem: recommendationList,
      isRowCollection: true,
    });
    expect(wrapper).to.not.equal(null);
  });
});
