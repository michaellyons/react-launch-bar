import React from 'react';
import MotionBar from '../src/MotionBar';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) MotionBar', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<MotionBar height={100} />);
  })

  it('Should exist.', () => {
    expect(_component).to.exist
  })
  describe('(Props)', () => {
    it('Should have a height property.', () => {
      expect( _component.props().height ).to.be.defined;
    })
    it('Should could a title property.', () => {
      expect( _component.props().title ).to.be.defined;
    })
  })

})
