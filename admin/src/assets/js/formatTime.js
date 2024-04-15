import moment from 'moment/moment';
moment.locale('zh-cn');
// llll

const formatTime = data => {
  return moment(data).format('YYYY/MM/DD');
};

export default formatTime;
