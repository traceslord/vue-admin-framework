const aggregateMethod = (aggregate, arr) => {
  const sum = arr.reduce((x, y) => x + y);
  const len = arr.length;
  const list = [];
  arr.forEach(data => {
    if (list.indexOf(data) === -1) list.push(data);
  });
  switch (aggregate) {
    case "AVG":
      return len === 0 ? null : sum / len;
    case "COUNT":
      return len;
    case "COUNT_DISTINCT":
      return list.length;
    case "MAX":
      return Math.max.apply(null, arr);
    case "MIN":
      return Math.min.apply(null, arr);
    case "SUM":
      return sum;
    default:
      return sum;
  }
};

export const groupby = (arr, gId, aggregate, id1, id2) => {
  const gIdList = [];
  arr.forEach(data => {
    if (gIdList.indexOf(data[gId]) === -1) {
      gIdList.push(data[gId]);
    }
  });

  const groupbyList = gIdList.map(data => ({
    [gId]: data,
    list: arr.filter(d => d[gId] === data)
  }));

  const aggregateList = [];
  Object.keys(arr[0]).forEach(data => {
    if (data !== gId && data !== id1 && data !== id2) aggregateList.push(data);
  });

  groupbyList.forEach(data => {
    aggregateList.forEach(item => {
      data[item] = aggregateMethod(
        aggregate,
        data.list.map(d => d[item])
      );
    });
  });

  return groupbyList;
};
