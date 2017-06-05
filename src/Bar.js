import React from 'react'
import PropTypes from 'prop-types'
import { easeLinear } from 'd3-ease'
import { timer } from 'd3-timer'
import { interpolate } from 'd3-interpolate'
Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max))
}
export default class Bar extends React.Component {
  static propTypes = {
    barWidth: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.any,
    duration: PropTypes.number,
    color: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = {
    barWidth: 60,
    height: 170,
    duration: 500,
    id: 'launch-gauge'
  };
  constructor (props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this._updateStateValue = this._updateStateValue.bind(this)
    this.goTween = this.goTween.bind(this)
    this.tweenUp = this.tweenUp.bind(this)
    this.tweenDown = this.tweenDown.bind(this)
    this.state = {
      val: props.value
    }
  }
  componentDidMount () {
  }
  componentWillUnmount () {
  }
  componentWillUpdate (nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      var parsedVal = parseFloat(this.props.value)
      var parsedNext = parseFloat(nextProps.value)
      // console.log("Will Change Value!");
      // If we're growing, tween in the positive direction
      var func
      if (parsedNext > parsedVal) {
        func = this.tweenUp
      } else {
        func = this.tweenDown
      }
      this.tween = func('val', this.state.val, parsedNext, this.props.duration).then((timer) => {
        // console.log("Tween End!");
        timer.stop()
      })
    }
  }
  componentWillMount () {

  }
  _updateStateValue (prop, v) {
    if (typeof v !== 'number') {
      return false
    }
    if (this.state && this.state[prop] !== undefined) {
      let state = {}
      state[prop] = v
      this.setState(state)
    } else {
      let { ...state } = this.state
      state[prop] = v
      this.setState(state)
    }
  }
  tweenUp (prop, start, end, duration = 500, easing = 'Linear') {
    return this.goTween(prop, start, end, duration, 1, easing)
  }
  tweenDown (prop, start, end, duration = 500, easing = 'Linear') {
    return this.goTween(prop, start, end, duration, -1, easing)
  }
  goTween (prop, start, end, duration = 500, direction = 1, easing = 'Linear') {
    // console.log("Tween with Duration ", duration)
    return new Promise((resolve, reject) => {
      let i = interpolate(start, end)
      let easeFun = easeLinear

      /* The timer stops when the callback retuns a truthy value */
      var time = timer((elapsed, d) => {
        if (this._setStopped) { return true }
        // return true;

        let progress = easeFun(elapsed / duration)

        let value = i(progress)

        // num = value;
        if (direction > 0) {
          if (value >= end) {
            // console.log("Hit the Step Point!")
            this._updateStateValue(prop, end)
            resolve(time)
            return true
          }
        } else {
          if (value <= end) {
            // console.log("Hit the Step Point!")
            this._updateStateValue(prop, end)
            resolve(time)
            return true
          }
        }

        this._updateStateValue(prop, value)

        // _self.setState({width: value})
        if (elapsed > duration) {
          this._updateStateValue(prop, end)
          resolve(time)
          return true
        }
      })
    })
  }
  render () {
    let {
      height,
      x,
      y,
      id,
      barWidth,
      color
    } = this.props

    let {
      val
    } = this.state

    let coverHeight = height - val
    let rad = 4
    return (
      <g ref={'wrap'}>
        <svg
          x={x}
          y={y}
          width={barWidth}
          height={height}>
          <defs>
            <clipPath id={id}>
              <rect x={0} y={coverHeight} width={barWidth} height={val} />
            </clipPath>
          </defs>
          <rect
            width={barWidth}
            height={height}
            fill={color}
            rx={rad}
            ry={rad}
            clipPath={'url(#' + id + ')'}
            x={0}
            y={0} />
        </svg>
      </g>
    )
  }
}
