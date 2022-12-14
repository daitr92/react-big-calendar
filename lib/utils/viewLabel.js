'use strict';

exports.__esModule = true;

var _Formats;

exports.default = viewLabel;

var _constants = require('./constants');

var _formats = require('../formats');

var _formats2 = _interopRequireDefault(_formats);

var _localizer = require('../localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _Views = require('../Views');

var _Views2 = _interopRequireDefault(_Views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Formats = (_Formats = {}, _Formats[_constants.views.MONTH] = 'monthHeaderFormat', _Formats[_constants.views.WEEK] = 'dayRangeHeaderFormat', _Formats[_constants.views.WORK_WEEK] = 'dayRangeHeaderFormat', _Formats[_constants.views.DAY] = 'dayHeaderFormat', _Formats[_constants.views.GROUP] = 'dayHeaderFormat', _Formats[_constants.views.AGENDA] = 'agendaHeaderFormat', _Formats);

function getRangeBounds(range) {
  if (Array.isArray(range)) {
    var start = range[0];
    var end = range[range.length - 1];
    return { start: start, end: end };
  }
  return range;
}

function viewLabel(date, view, formats, culture) {
  var View = _Views2.default[view];
  var headerSingle = view === _constants.views.MONTH || view === _constants.views.DAY || view === _constants.views.GROUP;

  formats = (0, _formats2.default)(formats || {});

  var headerFormat = formats[Formats[view]];

  return headerSingle ? _localizer2.default.format(date, headerFormat, culture) : _localizer2.default.format(getRangeBounds(View.range(date, { culture: culture })), headerFormat, culture);
}
module.exports = exports['default'];