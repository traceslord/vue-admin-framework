import { formatDate } from "./dates";

export const scenelegendData = (arr, scene, yAxis) => {
  if (scene === "scene_1") {
    const yAxisList = [];
    arr.forEach(data => {
      if (yAxisList.indexOf(data[yAxis]) === -1) yAxisList.push(data[yAxis]);
    });
    return yAxisList.map(data => String(data));
  }
  return [];
};

export const sceneby = (arr, scene, yAxis, xAxis, type) => {
  if (scene === "scene_1") {
    const xAxisList = [];
    arr.forEach(data => {
      if (xAxisList.indexOf(formatDate.formatBox(type, data[xAxis])) === -1) {
        xAxisList.push(formatDate.formatBox(type, data[xAxis]));
      }
    });
    const scenebyList = [];
    xAxisList.forEach((data, index) => {
      scenebyList[index] = {};
      scenebyList[index][xAxis] = data;
      scenelegendData(arr, scene, yAxis).forEach(item => {
        scenebyList[index][item] = {
          new_count: 0,
          delete_count: 0,
          level_1_count: 0,
          level_2_count: 0,
          level_3_count: 0
        };
      });
      const filterList = arr.filter(
        d => formatDate.formatBox(type, d[xAxis]) === data
      );
      const yAxisList = [];
      filterList.forEach(item => {
        if (yAxisList.indexOf(item[yAxis]) === -1) yAxisList.push(item[yAxis]);
      });
      yAxisList.forEach(item => {
        const list = filterList.filter(d => d[yAxis] === item);
        scenebyList[index][item] = {
          new_count: list.length,
          delete_count: list.filter(d => d.deleted_at).length,
          level_1_count: list.filter(d => d.level === 1 && !d.deleted_at)
            .length,
          level_2_count: list.filter(d => d.level === 2 && !d.deleted_at)
            .length,
          level_3_count: list.filter(d => d.level === 3 && !d.deleted_at).length
        };
      });
    });
    scenebyList.forEach((data, index, self) => {
      Object.keys(data).forEach(subdata => {
        if (typeof data[subdata] === "string") return;
        if (!index) {
          data[subdata].level_1_sum = data[subdata].level_1_count;
          data[subdata].level_2_sum = data[subdata].level_2_count;
          data[subdata].level_3_sum = data[subdata].level_3_count;
          data[subdata].sum =
            data[subdata].level_1_count +
            data[subdata].level_2_count +
            data[subdata].level_3_count;
        } else {
          data[subdata].level_1_sum =
            data[subdata].level_1_count + self[index - 1][subdata].level_1_sum;
          data[subdata].level_2_sum =
            data[subdata].level_2_count + self[index - 1][subdata].level_2_sum;
          data[subdata].level_3_sum =
            data[subdata].level_3_count + self[index - 1][subdata].level_3_sum;
          data[subdata].sum =
            data[subdata].level_1_count +
            data[subdata].level_2_count +
            data[subdata].level_3_count +
            self[index - 1][subdata].sum;
        }
      });
    });
    return scenebyList;
  }
  return arr;
};
