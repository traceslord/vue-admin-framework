<template>
  <div :id="`export_${Date.now()}`" @click="generate">
    <el-tooltip content="导出" placement="top">
      <slot><div class="download-btn"></div></slot>
    </el-tooltip>
  </div>
</template>

<script>
import download from "downloadjs";
import { formatExport } from "../../utils/dates";

export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    // 导出的文件名
    name: {
      type: String,
      default: "data.csv"
    },
    // 当行没有字段值时用作回退
    defaultValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    generate() {
      if (!this.data || !this.data.length) return;
      const json = this.getProcessedJson(this.data);
      const data = this.jsonToCSV(json);
      const filename = this.name.replace(
        ".csv",
        `_${formatExport(Date.now())}.csv`
      );
      const blob = this.base64ToBlob(data, "application/csv");
      return download(blob, filename, "application/csv");
    },
    jsonToCSV(data) {
      const csvData = [];
      for (let key in data[0]) {
        csvData.push(key);
        csvData.push(",");
      }
      csvData.pop();
      csvData.push("\r\n");
      data.map(function(item) {
        for (let key in item) {
          let escapedCSV = '="' + item[key] + '"';
          if (escapedCSV.match(/[,"\n]/))
            escapedCSV = '"' + escapedCSV.replace(/"/g, '""') + '"';
          csvData.push(escapedCSV);
          csvData.push(",");
        }
        csvData.pop();
        csvData.push("\r\n");
      });
      return csvData.join("");
    },
    getProcessedJson(data) {
      const keys = this.getKeys(data);
      const newData = [];
      const _self = this;
      data.map(function(item) {
        const newItem = {};
        for (let label in keys) {
          const property = keys[label];
          newItem[label] = _self.getValue(property, item);
        }
        newData.push(newItem);
      });
      return newData;
    },
    getKeys(data) {
      const keys = {};
      for (let key in data[0]) {
        keys[key] = key;
      }
      return keys;
    },
    getValue(key, item) {
      const field = typeof key !== "object" ? key : key.field;
      const indexes = typeof field !== "string" ? [] : field.split(".");
      let value = this.defaultValue;

      if (!field) value = item;
      else if (indexes.length > 1)
        value = this.getValueFromNestedItem(item, indexes);
      else value = this.parseValue(item[field]);

      if (Object.prototype.hasOwnProperty.call(key, "callback"))
        value = this.getValueFromCallback(value, key.callback);

      return value;
    },
    getValueFromNestedItem(item, indexes) {
      let nestedItem = item;
      for (let index of indexes) {
        if (nestedItem) nestedItem = nestedItem[index];
      }
      return this.parseValue(nestedItem);
    },
    getValueFromCallback(item, callback) {
      if (typeof callback !== "function") return this.defaultValue;
      const value = callback(item);
      return this.parseValue(value);
    },
    parseValue(value) {
      return value || value === 0 || typeof value === "boolean"
        ? value
        : this.defaultValue;
    },
    base64ToBlob(data, mime) {
      let base64 = window.btoa(window.unescape(encodeURIComponent(data)));
      let bstr = atob(base64);
      let n = bstr.length;
      let u8arr = new Uint8ClampedArray(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  }
};
</script>

<style lang="less" scoped>
.download-btn {
  position: absolute;
  top: 15px;
  right: 42px;
  width: 20px;
  height: 20px;
  background-color: #909399;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #409eff;
  }
  &::after {
    content: "\279C";
    position: absolute;
    top: 2px;
    left: 4px;
    font-size: 12px;
    color: #fff;
    transform: rotate(90deg);
  }
}
</style>
