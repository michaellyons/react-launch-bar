import React from 'react'
import PropTypes from 'prop-types'

import Axis from './Axis'
import Bar from './Bar'
import Grid from './Grid'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

export default class BarChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    barPadding: PropTypes.number,
    height: PropTypes.number,
    bkgColor: PropTypes.string,
    data: PropTypes.any,
    margin: PropTypes.object,
    xData: PropTypes.string,
    yData: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    titleClass: PropTypes.string,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string
  };
  static defaultProps = {
    barPadding: 0.05,
    height: 170,
    width: 400,
    bkgColor: '#333',
    id: 'bar-chart',
    xData: 'key',
    yData: 'value',
    data: [],
    margin: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 26
    },
    duration: 500
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
      xData,
      yData,
      margin,
      data
    } = props
    let chartWidth = this.w = width - margin.left - margin.right
    let chartHeight = this.h = height - margin.top - margin.bottom

    this.barScale = scaleBand()
                    .rangeRound([0, chartWidth])
                    .domain(data.map(d => d[xData]))
                    .paddingInner(barPadding)
                    .paddingOuter(barPadding)

    this.yScale = scaleLinear()
                    .domain([0, max(data, d => d[yData])])
                    .range([chartHeight, 0])
  }
  render () {
    let {
      width,
      height,
      margin,
      barPadding,
      wrapStyle,
      id,
      style,
      title,
      titleStyle,
      xData,
      yData,
      titleClass,
      data,
      bkgColor
    } = this.props
    this.createChart(this.props)
    let bars = data.map((datum, i) => {
      let dScale = this.yScale(datum[yData])
      return <Bar
        key={i}
        id={id + '_bar_' + i}
        x={this.barScale(datum[xData])}
        y={barPadding}
        {...datum}
        value={this.h - dScale}
        height={this.h}
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
          height={height}
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
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
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
