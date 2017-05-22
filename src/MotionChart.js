import React from 'react'
import PropTypes from 'prop-types'
import MotionBar from './MotionBar'
export default class MotionBarChart extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    barWidth: PropTypes.number,
    barPadding: PropTypes.number,
    bkgColor: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    data: PropTypes.any,
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
    data: []
  };
  render () {
    let {
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
      return <MotionBar
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
          height={this.props.height}
          style={{ background: '#333', ...style }}>
          {
            bars
          }
        </svg>
      </div>
    )
  }
}
