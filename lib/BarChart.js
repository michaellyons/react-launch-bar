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

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _d3Ease = require('d3-ease');

var _d3Timer = require('d3-timer');

var _d3Interpolate = require('d3-interpolate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

    _this.componentWillMount = _this.componentWillMount.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(BarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          barWidth = _props.barWidth,
          barPadding = _props.barPadding,
          wrapStyle = _props.wrapStyle,
          style = _props.style,
          title = _props.title,
          titleStyle = _props.titleStyle,
          titleClass = _props.titleClass,
          textStyle = _props.textStyle,
          data = _props.data,
          progressStyle = _props.progressStyle,
          decimal = _props.decimal,
          bkgColor = _props.bkgColor,
          max = _props.max,
          high = _props.high;


      var totalWidth = data.length * (barWidth + barPadding) + barPadding;

      var bars = this.props.data.map(function (datum, i) {
        return _react2.default.createElement(_Bar2.default, _extends({
          key: i,
          x: i * (barWidth + barPadding) + barPadding,
          y: barPadding
        }, datum, {
          bkgColor: bkgColor,
          barWidth: barWidth,
          barPadding: barPadding }));
      });
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: totalWidth }, wrapStyle), ref: 'wrap' },
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
            width: totalWidth,
            height: this.props.height,
            style: _extends({ background: '#333' }, style) },
          bars
        )
      );
    }
  }]);

  return BarChart;
}(_react2.default.Component);

BarChart.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  max: _propTypes2.default.number,
  high: _propTypes2.default.number,
  value: _propTypes2.default.any,
  duration: _propTypes2.default.number,
  decimal: _propTypes2.default.number,
  unit: _propTypes2.default.string,
  title: _propTypes2.default.string,
  titleStyle: _propTypes2.default.object,
  titleClass: _propTypes2.default.string,
  textStyle: _propTypes2.default.object,
  progressStyle: _propTypes2.default.object,
  wrapStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  id: _propTypes2.default.string.isRequired
};
BarChart.defaultProps = {
  width: 60,
  barWidth: 40,
  barPadding: 8,
  height: 170,
  bkgColor: '',
  max: 100,
  data: [],
  decimal: 2,
  duration: 500,
  id: 'launch-gauge'
};
exports.default = BarChart;