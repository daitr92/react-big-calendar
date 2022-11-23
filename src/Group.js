import PropTypes from 'prop-types';
import React from 'react';
import dates from './utils/dates';
import GroupTimeGrid from './GroupTimeGrid';
import { navigate } from './utils/constants';
import moment from 'moment';

class Group extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    let { date, events, ...props } = this.props;
    let range = Group.range(date);
    const fromTime = moment(range[0]).startOf('d');
    const toTime = moment(range[0]).endOf('d');
    // console.log (`from time ${fromTime.calendar()} to time ${toTime.calendar()}`);
    const eventFiltered = events
    .filter(item => item.end > fromTime && item.start < toTime)
    .map(item => {
      // console.log (`event ${item.title} from time ${moment(item.start).calendar()} to time ${moment(item.end).calendar()}`);
      const newItem = { ...item };
      if (newItem.start < fromTime) {
        newItem.start = moment(fromTime).toDate();
      }
      if (newItem.end > toTime.endOf('d')) {
        newItem.end = moment(toTime).toDate();
      }
      return newItem;
    });
    return (
      <GroupTimeGrid {...props} range={range} events={eventFiltered} eventOffset={15} />
    );
  }
}

Group.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}

Group.range = (date)=> {
  return [dates.startOf(date, 'day')]
}


export default Group
