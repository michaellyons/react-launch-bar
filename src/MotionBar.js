import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max))
}

export default class MotionBar extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    barWidth: PropTypes.number,
    barPadding: PropTypes.number,
    bkgColor: PropTypes.string,
    color: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.any
  };
  static defaultProps = {
    barWidth: 60,
    barPadding: 8,
    height: 170,
    max: 100,
    id: 'launch-gauge'
  };
  render () {
    let {
      height,
      x,
      y,
      bkgColor,
      barWidth,
      value,
      barPadding,
      color,
      max
    } = this.props

    let totalHeight = height - (barPadding * 2)
    let percent = Math.clip((value / max), 0.01, 1)
    let rad = 4
    let fixedY = y + 2
    return (
      <g ref={'wrap'}>
        <svg
          x={x}
          y={fixedY}
          style={{ background: 'yellow', borderRadius: 4 }}
          height={totalHeight}
          width={barWidth}>
          <rect
            width={barWidth}
            height={totalHeight}
            fill={color || '#0288d1'}
            rx={rad}
            ry={rad}
            x={0}
            y={0} />
        </svg>
        <Motion defaultStyle={{ height: 0 }} style={{ height: spring(totalHeight * (1 - percent)) }}>
          {interpolatingStyle =>
            <svg
              x={x}
              y={fixedY}
              width={barWidth}
              height={interpolatingStyle.height}>
              <rect
                width={barWidth}
                height={totalHeight}
                fill={bkgColor}
                rx={rad}
                ry={rad}
                x={0}
                y={0} />
            </svg>
          }
        </Motion>
      </g>
    )
  }
}
