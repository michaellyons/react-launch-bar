import React from 'react'
import PropTypes from 'prop-types'

import MotionBar from './MotionBar'
import Axis from './Axis'
import Grid from './Grid'

import { max } from 'd3-array'
import { scaleLinear, scaleBand } from 'd3-scale'

export default class MotionBarChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    barPadding: PropTypes.number,
    bkgColor: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    xData: PropTypes.string,
    yData: PropTypes.string,
    data: PropTypes.any,
    titleClass: PropTypes.string,
    margin: PropTypes.object,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string
  };

  static defaultProps = {
    width: 400,
    barPadding: 0.05,
    height: 170,
    bkgColor: '#333',
    xData: 'key',
    yData: 'value',
    id: 'motion-bar',
    margin: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 26
    },
    max: 100,
    data: []
  };
  constructor (props) {
    super(props)
    this.createChart = this.createChart.bind(this)
  }
  createChart (props) {
    let {
      width,
      height,
      barPadding,
      margin,
      xData,
      yData,
      data
    } = props
    let chartWidth = this.w = width - margin.left - margin.right
    let chartHeight = this.h = height - margin.top - margin.bottom
    this.barScale = scaleBand()
                    .rangeRound([0, chartWidth])
                    .domain(data.map(d => d[xData]))
                    .padding(barPadding)
    this.yScale = scaleLinear()
                    .domain([0, max(data, d => d[yData])])
                    .range([chartHeight, 0])
  }
  render () {
    let {
      width,
      height,
      barPadding,
      wrapStyle,
      style,
      title,
      id,
      titleStyle,
      titleClass,
      margin,
      data,
      xData,
      yData,
      bkgColor
    } = this.props

    this.createChart(this.props)

    let chartHeight = height - margin.top - margin.bottom

    let bars = data.map((datum, i) => {
      return <MotionBar
        key={i}
        x={this.barScale(datum[xData])}
        y={barPadding}
        {...datum}
        id={id + '_bar' + i}
        value={chartHeight - this.yScale(datum[yData])}
        height={chartHeight}
        bkgColor={bkgColor}
        barWidth={this.barScale.bandwidth()} />
    })
    return (
      <div style={{ width: width, ...wrapStyle, backgroundColor: bkgColor }} ref={'wrap'}>
        <div
          className={titleClass}
          style={
           Object.assign(
             {},
             (!titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }),
             titleStyle)}>
          {title}
        </div>
        <svg
          id={this.props.id}
          width={width}
          height={this.props.height}
          style={{ background: '#333', ...style }}>
          <Axis
            style={{ stroke: '#FFF' }}
            orient='bottom'
            scale={this.barScale}
            h={height}
            axisType='x'
            className='axis'
            ticks={5}
            {...this.props} />
          <Axis
            style={{ stroke: '#FFF' }}
            orient='left'
            scale={this.yScale}
            h={height}
            axisType='y'
            className='axis'
            ticks={5}
            {...this.props} />
          <g transform={'translate(' + margin.left + ',' + margin.right + ')'}>
            <Grid
              h={this.h}
              len={this.w}
              ticks={5}
              scale={this.yScale}
              className='grid'
              gridType='y'
              {...this.props} />
            {
            bars
          }
          </g>
        </svg>
      </div>
    )
  }
}
