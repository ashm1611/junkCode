import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import BookAnAppointment from '../BookAnAppointment';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  it('should render correctly', () => {
    const tree = shallow(<BookAnAppointment />);
    expect(toJson(tree)).to.matchSnapshot();
  });

  it('should call handleBookAnApoointmentClick with track as function', () => {
    const track = sinon.spy();
    const tree = shallow(<BookAnAppointment track={track} />);
    tree.instance().handleBookAnApoointmentClick();
    expect(tree.instance().state.isBookAnAppointModalOpen).to.equal(true);
  });

  it('should call handleBookAnApoointmentClick with track as false', () => {
    const tree = shallow(<BookAnAppointment track={false} />);
    tree.instance().handleBookAnApoointmentClick();
    expect(tree.instance().state.isBookAnAppointModalOpen).to.equal(true);
  });

  it('should call toggleBookAnAppointModal', () => {
    const tree = shallow(<BookAnAppointment />);
    tree.instance().toggleBookAnAppointModal();
    expect(tree.instance().state.isBookAnAppointModalOpen).to.equal(true);
  });
});
