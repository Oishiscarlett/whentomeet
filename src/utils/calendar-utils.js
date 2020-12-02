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

// 将传回来的timeUnit解析为字符串数组
export function timeUnitSplit(timeUnit) {
  let timeStr = timeUnit.toString().split(",");
  return timeStr;
}

// 适应日历最大时间不包含的问题
export function calendarMaxTime(time, duration) {
  let secondDuration = 0;
  let secondTime = 0;
  if (duration === '00:15') {
    secondDuration = 15 * 60;
  } else if (duration === '00:30'){
    secondDuration = 30 * 60;
  } else {
    secondDuration = 60 * 60;
  }

  secondTime = Number(time.substring(0, 2)) * 3600 + Number(time.substring(3, 5)) * 60;
  
  secondTime += secondDuration
  let hour = String(Math.floor(secondTime / 3600));
  let min = (secondTime % 3600) / 60;
  if (min === 0) {
    min = '00';
  } else {
    min = String(min);
  }
  return hour + ':' + min;
}

// 将后端传回来的最大数据进行格式调整并显示在日历格式的表格中
export function calendarFormMaxTime(time, duration) {
  let secondDuration = 0;
  let secondTime = 0;
  if (duration === '00:15') {
    secondDuration = 15 * 60;
  } else if (duration === '00:30'){
    secondDuration = 30 * 60;
  } else {
    secondDuration = 60 * 60;
  }

  secondTime = Number(time.substring(0, 2)) * 3600 + Number(time.substring(3, 5)) * 60;
  
  secondTime -= secondDuration
  let hour = String(Math.floor(secondTime / 3600));
  let min = (secondTime % 3600) / 60;
  if (min === 0) {
    min = '00';
  } else {
    min = String(min);
  }
  return hour + ':' + min;
}

// 将date转换为2020-11-01格式
export function dateToString(time) {
  if(typeof(time) != 'string') {
    let year = time.getFullYear();
    let month = String(Number(time.getMonth()) + 1);
    let date = String(time.getDate());
    if (month.length === 1) {
      month = '0' + month;
    }
    if (date.length === 1) {
      date = '0' + date;
    }
    return year + '-' + month + '-' + date;
  } else {
    return time;
  }
}

// 将2020-11-01格式转换为Date
export function stringToDate(time) {
  if (typeof (time) === 'string') {
    let newTime = new Date(Date.parse(time.replace(/-/g,  "/")));
    return newTime;
  } else {
    return time;
  }
}