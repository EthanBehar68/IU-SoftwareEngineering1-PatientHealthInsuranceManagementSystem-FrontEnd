import moment from 'moment';
const getTime = mins => {
  if (mins >= 24 * 60 || mins < 0) {
    return "";
  }
  var h = mins / 60 | 0,
      m = mins % 60 | 0;
  return moment.utc().hours(h).minutes(m).format("hh:mm A");
};
export default getTime;