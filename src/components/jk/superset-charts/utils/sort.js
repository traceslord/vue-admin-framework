export const sort = (arr, id, order) => {
  if (typeof arr[0][id] === "number") {
    if (order === "升序") arr.sort((a, b) => a[id] - b[id]);
    else arr.sort((a, b) => b[id] - a[id]);
  } else if (order === "升序") arr.sort((a, b) => a[id].localeCompare(b[id]));
  else arr.sort((a, b) => b[id].localeCompare(a[id]));
};
