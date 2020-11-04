/*********************
 *     工具函数
 * 
**********************/


// 将选择的时间裁剪成合适的字符串作为选择时间的id
export function createTimeUnitId(Time) {
  let year = Time.getFullYear();
  let month = String(Number(Time.getMonth()) + 1);
  let date = String(Time.getDate());
  let time = Time.toString().substring(16, 24);
  let dayOfWeek = '';

  // 判断月份和日期是不是一位数，是就加上一个0
  if (month.length === 1) {
    month = '0' + month;
  }
  if (date.length === 1) {
    date = '0' + date;
  }
  // 判断星期：为了与组件内部保持一致，星期天用 0 表示
  switch (Time.toString().substring(0, 3)) {
    case 'Mon':
      dayOfWeek = '1';
      break;
    case 'Tue':
      dayOfWeek = '2';
      break;
    case 'Wed':
      dayOfWeek = '3';
      break;
    case 'Thu':
      dayOfWeek = '4';
      break;
    case 'Fri':
      dayOfWeek = '5';
      break;
    case 'Sat':
      dayOfWeek = '6';
      break;
    case 'Sun':
      dayOfWeek = '0';
      break;
  }

  // 拼接成返回的id
  let id = year + '-' + month + '-' + date + '-' + time + '-' + dayOfWeek;
  return id;
}

// 将传回来的字符串id解析为需要的时间格式 如 '2020-11-01T10:00:00'
export function timeUnitIdToTime(id) {
  let time = id.substring(0, 10) + 'T' + id.substring(11, 19);
  return time;
}