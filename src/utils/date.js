const formatNumber = num => {
  const n = num.toString();
  return n[1] ? n : `0${n}`;
};

const formatTime = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatDay = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join("-");
};

const formatMonth = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return [year, month].map(formatNumber).join("-");
};

const formatSeason = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month < 4) return `${year}年一季度`;
  if (month < 7) return `${year}年二季度`;
  if (month < 10) return `${year}年三季度`;
  return `${year}年四季度`;
};

const formatYear = timestamp => new Date(timestamp).getFullYear();

const formatBox = (type, val) => {
  switch (type) {
    case "day":
      return formatDay(val);
    case "month":
      return formatMonth(val);
    case "season":
      return formatSeason(val);
    case "year":
      return formatYear(val);
    default:
      return formatTime(val);
  }
};

export const formatDate = {
  formatTime,
  formatDay,
  formatMonth,
  formatSeason,
  formatYear,
  formatBox
};
