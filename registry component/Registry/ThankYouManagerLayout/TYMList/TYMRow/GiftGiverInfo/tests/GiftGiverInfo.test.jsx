import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Paragraph from '@bbb-app/core-ui/paragraph';
import GiftGiverInfo from '../GiftGiverInfo';
configure({ adapter: new Adapter() });

describe(__filename, () => {
  const labels = {
    anonymousTextLbl: 'Anonymous',
    giftGiverAnonymouLbl: 'This gift giver is anonymous.',
    knowWhoLbl: 'Know who it is???',
    purchasedInStoreLbl: 'Purchased In Store',
    giftGiverBoughtLbl: 'This gift giver bought your gifts in store.',
    addGiftGiverInfoLbl: 'Add Gift Giver Info',
    mmpGiftLbl: 'You marked this gift as purchased.',
    knowWhoPurchasedLbl: 'Know who purchased it?',
    addContactInformationLbl: 'Add Contact Information',
  };
  const props = {
    listItem: {
      firstName: 'John',
      lastName: 'Doe',
      address1: 'New York',
      address2: '',
      city: 'New York',
      email: 'johndoe@yopmail.com',
      state: 'NY',
      zipCode: '10011',
      addressSelection: 'MMP',
      skuId: 60934769,
    },
    labels,
  };
  const getTree = prop => shallow(<GiftGiverInfo {...prop} />);
  let tree;

  before(() => {
    tree = getTree(props);
  });

  it('should render GiftGiverInfo component correctly', () => {
    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render GiftGiverInfo component correctly when addressSelection is not MMP', () => {
    tree.setProps({
      ...props,
      listItem: {
        ...props.listItem,
        addressSelection: 'OUT',
      },
    });
    const expectedResult =
      '<p class="mediumLight paragraph m0" tabindex="0">New York  New York, NY 10011<br/>johndoe@yopmail.com<br/></p>';
    expect(tree.find(Paragraph).html()).to.equal(expectedResult);
  });
  it('should render GiftGiverInfo component correctly if firstName is null', () => {
    tree.setProps({
      ...props,
      listItem: {
        ...props.listItem,
        firstName: null,
      },
    });
    const expectedResult =
      '<p class="mediumLight paragraph m0" tabindex="0">You marked this gift as purchased.<br/>Know who purchased it?</p>';
    expect(tree.find(Paragraph).html()).to.equal(expectedResult);
  });
  it('should render GiftGiverInfo component correctly when sku is not cashfund', () => {
    const propsCf = {
      listItem: {
        firstName: 'John',
        lastName: 'Doe',
        address1: '',
        address2: '',
        city: '',
        email: 'sd@gmail.com',
        state: '',
        zipCode: '',
        addressSelection: 'MMP',
        skuId: 60934769,
      },
      labels,
    };
    tree.setProps({
      ...propsCf,
      listItem: {
        ...propsCf.listItem,
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render GiftGiverInfo component correctly for cashfund sku', () => {
    const propsCf = {
      listItem: {
        firstName: 'John',
        lastName: 'Doe',
        address1: '',
        address2: '',
        city: '',
        email: 'sd@gmail.com',
        state: '',
        zipCode: '',
        addressSelection: 'MMP',
        skuId: 69934769,
      },
      labels,
    };
    tree.setProps({
      ...propsCf,
      listItem: {
        ...propsCf.listItem,
      },
    });
    expect(tree).to.not.equal(null);
  });

  it('should render GiftGiverInfo component correctly if addressSelection is OUT', () => {
    tree.setProps({
      ...props,
      listItem: {
        ...props.listItem,
        firstName: null,
        addressSelection: 'OUT',
      },
    });
    const expectedResult =
      '<p class="mediumLight paragraph m0" tabindex="0">This gift giver is anonymous.<br/>Know who it is???</p>';
    expect(tree.find(Paragraph).html()).to.equal(expectedResult);
  });
  it('should render GiftGiverInfo component correctly if addressSelection is not OUT and MMP', () => {
    tree.setProps({
      ...props,
      listItem: {
        ...props.listItem,
        firstName: null,
        addressSelection: '',
      },
    });
    const expectedResult =
      '<p class="mediumLight paragraph m0" tabindex="0">This gift giver bought your gifts in store.<br/> Know who it is???</p>';
    expect(tree.find(Paragraph).html()).to.equal(expectedResult);
  });
});
