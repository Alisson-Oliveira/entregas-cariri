export const formatDate = (timestamp: number) => {
  var currenty = new Date(timestamp);

  var year = currenty.getFullYear();
  var month = currenty.getMonth() + 1;
  var day = currenty.getDate();
  var hour = currenty.getHours();
  var min = currenty.getMinutes();
  var sec = currenty.getSeconds();

  return `${formatDay(day)}${month}${year}${hour}${min}${sec}`;
}

export const formatDay = (day: number) => {
  if(day < 10) return `0${day}`

  return day;
}

export const generatePurchaseNumber = (id: number, timestamp: string) => {
  return `${id}-${timestamp}`;
}
