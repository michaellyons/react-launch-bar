import React from 'react';
import MotionChart from '../src/MotionChart';
import { mount, shallow, render } from 'enzyme';
import PropTypes from 'prop-types';

describe('(Component) Bar Chart', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(<MotionChart height={100} barWidth={40} title="Graph" />);
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
