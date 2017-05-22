import React from 'react'
import PropTypes from 'prop-types'
import Bar from './Bar'

export default class BarChart extends React.Component {
  static propTypes = {
    barWidth: PropTypes.number,
    barPadding: PropTypes.number,
    height: PropTypes.number,
    bkgColor: PropTypes.string,
    data: PropTypes.any,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    titleClass: PropTypes.string,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string
  };
  static defaultProps = {
    barWidth: 40,
    barPadding: 8,
    height: 170,
    bkgColor: '',
    max: 100,
    data: [],
    duration: 500
  };
  render () {
    let {
      height,
      barWidth,
      barPadding,
      wrapStyle,
      style,
      title,
      titleStyle,
      titleClass,
      data,
      bkgColor
    } = this.props

    let totalWidth = (data.length * (barWidth + barPadding)) + barPadding

    let bars = data.map((datum, i) => {
      return <Bar
        key={i}
        x={i * (barWidth + barPadding) + barPadding}
        y={barPadding}
        {...datum}
        bkgColor={bkgColor}
        barWidth={barWidth}
        barPadding={barPadding} />
    })
    return (
      <div style={{ width: totalWidth, ...wrapStyle }} ref={'wrap'}>
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
          width={totalWidth}
          height={height}
          style={{ background: '#333', ...style }}>
          {
            bars
          }
        </svg>
      </div>
    )
  }
}
