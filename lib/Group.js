'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _GroupTimeGrid = require('./GroupTimeGrid');

var _GroupTimeGrid2 = _interopRequireDefault(_GroupTimeGrid);

var _constants = require('./utils/constants');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_React$Component) {
  _inherits(Group, _React$Component);

  function Group() {
    _classCallCheck(this, Group);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Group.prototype.render = function render() {
    var _props = this.props,
        date = _props.date,
        events = _props.events,
        props = _objectWithoutProperties(_props, ['date', 'events']);

    var range = Group.range(date);
    var fromTime = (0, _moment2.default)(range[0]).startOf('d');
    var toTime = (0, _moment2.default)(range[0]).endOf('d');
    // console.log (`from time ${fromTime.calendar()} to time ${toTime.calendar()}`);
    var eventFiltered = events.filter(function (item) {
      return item.end > fromTime && item.start < toTime;
    }).map(function (item) {
      // console.log (`event ${item.title} from time ${moment(item.start).calendar()} to time ${moment(item.end).calendar()}`);
      var newItem = _extends({}, item);
      if (newItem.start < fromTime) {
        newItem.start = (0, _moment2.default)(fromTime).toDate();
      }
      if (newItem.end > toTime.endOf('d')) {
        newItem.end = (0, _moment2.default)(toTime).toDate();
      }
      return newItem;
    });
    return _react2.default.createElement(_GroupTimeGrid2.default, _extends({}, props, { range: range, events: eventFiltered, eventOffset: 15 }));
  };

  return Group;
}(_react2.default.Component);

Group.propTypes = {
  date: _propTypes2.default.instanceOf(Date).isRequired,
  events: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  groups: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
};


Group.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'day');

    default:
      return date;
  }
};

Group.range = function (date) {
  return [_dates2.default.startOf(date, 'day')];
};

exports.default = Group;
module.exports = exports['default'];