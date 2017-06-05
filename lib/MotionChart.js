'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MotionBar = require('./MotionBar');

var _MotionBar2 = _interopRequireDefault(_MotionBar);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _d3Array = require('d3-array');

var _d3Scale = require('d3-scale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MotionBarChart = function (_React$Component) {
  _inherits(MotionBarChart, _React$Component);

  function MotionBarChart(props) {
    _classCallCheck(this, MotionBarChart);

    var _this = _possibleConstructorReturn(this, (MotionBarChart.__proto__ || Object.getPrototypeOf(MotionBarChart)).call(this, props));

    _this.createChart = _this.createChart.bind(_this);
    return _this;
  }

  _createClass(MotionBarChart, [{
    key: 'createChart',
    value: function createChart(props) {
      var width = props.width,
          height = props.height,
          barPadding = props.barPadding,
          margin = props.margin,
          xData = props.xData,
          yData = props.yData,
          data = props.data;

      var chartWidth = this.w = width - margin.left - margin.right;
      var chartHeight = this.h = height - margin.top - margin.bottom;
      this.barScale = (0, _d3Scale.scaleBand)().rangeRound([0, chartWidth]).domain(data.map(function (d) {
        return d[xData];
      })).padding(barPadding);
      this.yScale = (0, _d3Scale.scaleLinear)().domain([0, (0, _d3Array.max)(data, function (d) {
        return d[yData];
      })]).range([chartHeight, 0]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          barPadding = _props.barPadding,
          wrapStyle = _props.wrapStyle,
          style = _props.style,
          title = _props.title,
          id = _props.id,
          titleStyle = _props.titleStyle,
          titleClass = _props.titleClass,
          margin = _props.margin,
          data = _props.data,
          xData = _props.xData,
          yData = _props.yData,
          bkgColor = _props.bkgColor;


      this.createChart(this.props);

      var chartHeight = height - margin.top - margin.bottom;

      var bars = data.map(function (datum, i) {
        return _react2.default.createElement(_MotionBar2.default, _extends({
          key: i,
          x: _this2.barScale(datum[xData]),
          y: barPadding
        }, datum, {
          id: id + '_bar' + i,
          value: chartHeight - _this2.yScale(datum[yData]),
          height: chartHeight,
          bkgColor: bkgColor,
          barWidth: _this2.barScale.bandwidth() }));
      });
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width }, wrapStyle, { backgroundColor: bkgColor }), ref: 'wrap' },
        _react2.default.createElement(
          'div',
          {
            className: titleClass,
            style: Object.assign({}, !titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }, titleStyle) },
          title
        ),
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: width,
            height: this.props.height,
            style: _extends({ background: '#333' }, style) },
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: '#FFF' },
            orient: 'bottom',
            scale: this.barScale,
            h: height,
            axisType: 'x',
            className: 'axis',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(_Axis2.default, _extends({
            style: { stroke: '#FFF' },
            orient: 'left',
            scale: this.yScale,
            h: height,
            axisType: 'y',
            className: 'axis',
            ticks: 5
          }, this.props)),
          _react2.default.createElement(
            'g',
            { transform: 'translate(' + margin.left + ',' + margin.right + ')' },
            _react2.default.createElement(_Grid2.default, _extends({
              h: this.h,
              len: this.w,
              ticks: 5,
              scale: this.yScale,
              className: 'grid',
              gridType: 'y'
            }, this.props)),
            bars
          )
        )
      );
    }
  }]);

  return MotionBarChart;
}(_react2.default.Component);

MotionBarChart.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  barPadding: _propTypes2.default.number,
  bkgColor: _propTypes2.default.string,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  xData: _propTypes2.default.string,
  yData: _propTypes2.default.string,
  data: _propTypes2.default.any,
  titleClass: _propTypes2.default.string,
  margin: _propTypes2.default.object,
  wrapStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string
};
MotionBarChart.defaultProps = {
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
exports.default = MotionBarChart;