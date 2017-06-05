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
    color: PropTypes.string,
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.any
  };
  static defaultProps = {
    barWidth: 60,
    barPadding: 8,
    height: 170,
    id: 'launch-gauge'
  };
  render () {
    let {
      height,
      x,
      y,
      barWidth,
      value,
      id,
      color
    } = this.props

    let totalHeight = height
    let coverValue = height - value
    let rad = 4
    let fixedY = y
    return (
      <g ref={'wrap'}>
        <svg
          x={x}
          y={fixedY}
          width={barWidth}
          height={height}>
          <Motion defaultStyle={{ height: 0 }} style={{ height: spring(coverValue) }}>
            {interpolatingStyle =>
              <defs>
                <clipPath id={id}>
                  <rect
                    x={0}
                    y={interpolatingStyle.height}
                    width={barWidth}
                    height={height - interpolatingStyle.height} />
                </clipPath>
              </defs>
          }
          </Motion>
          <rect
            width={barWidth}
            height={totalHeight}
            fill={color || '#0288d1'}
            clipPath={'url(#' + id + ')'}
            rx={rad}
            ry={rad}
            x={0}
            y={0} />
        </svg>
      </g>
    )
  }
}
