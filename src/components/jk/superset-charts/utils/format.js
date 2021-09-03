export const formatPixel = (val, num) => {
  if (typeof val === "number") {
    if (num) return `${val - num}px`;
    else return `${val}px`;
  } else {
    if (val.substr(-1, 1) === "%") {
      if (num) return `calc(${val} - ${num}px)`;
      else return val;
    }
    if (val.substr(-2, 2) === "px") {
      if (num) return `${Number(val.slice(0, -2)) - num}px`;
      else return val;
    }
    if (num) return `${Number(val) - num}px`;
    else return `${val}px`;
  }
};
