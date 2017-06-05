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
          barPadding = props.barPadding,
          xData = props.xData,
          data = props.data;

      this.barScale = (0, _d3Scale.scaleBand)().rangeRound([0, width]).domain(data.map(function (d) {
        return d[xData];
      })).padding(barPadding);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          barWidth = _props.barWidth,
          width = _props.width,
          barPadding = _props.barPadding,
          wrapStyle = _props.wrapStyle,
          style = _props.style,
          title = _props.title,
          titleStyle = _props.titleStyle,
          titleClass = _props.titleClass,
          data = _props.data,
          xData = _props.xData,
          bkgColor = _props.bkgColor;

      this.createChart(this.props);

      var totalWidth = data.length * (barWidth + barPadding) + barPadding;

      var bars = data.map(function (datum, i) {
        return _react2.default.createElement(_MotionBar2.default, _extends({
          key: i,
          x: _this2.barScale(datum[xData]),
          y: barPadding
        }, datum, {
          bkgColor: bkgColor,
          barWidth: _this2.barScale.bandwidth() }));
      });
      var offset = barPadding * this.barScale.bandwidth() / 2;
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width }, wrapStyle), ref: 'wrap' },
        _react2.default.createElement(
          'div',
          {
            className: titleClass,
            style: Object.assign({}, !titleClass && { background: '#666', padding: '4px 12px', color: 'white', fontSize: 24 }, titleStyle) },
          title,
          ' ',
          this.barScale.bandwidth()
        ),
        _react2.default.createElement(
          'svg',
          {
            id: this.props.id,
            width: width,
            height: this.props.height,
            style: _extends({ background: '#333' }, style) },
          _react2.default.createElement(
            'g',
            { transform: 'translate(' + offset + ',' + offset + ')' },
            bars
          )
        )
      );
    }
  }]);

  return MotionBarChart;
}(_react2.default.Component);

MotionBarChart.propTypes = {
  height: _propTypes2.default.number,
  barWidth: _propTypes2.default.number,
  barPadding: _propTypes2.default.number,
  bkgColor: _propTypes2.default.string,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  xData: _propTypes2.default.string,
  data: _propTypes2.default.any,
  titleClass: _propTypes2.default.string,
  wrapStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string
};
MotionBarChart.defaultProps = {
  width: 400,
  barWidth: 40,
  barPadding: 0.05,
  height: 170,
  bkgColor: '',
  xData: 'key',
  max: 100,
  data: []
};
exports.default = MotionBarChart;