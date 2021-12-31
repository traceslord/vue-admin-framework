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
    // 支持的类型 csv、xls
    type: {
      type: String,
      default: "csv"
    },
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
      if (this.type === "xls") {
        const data = this.jsonToXLS(json);
        const filename = this.name.replace(
          ".csv",
          `_${formatExport(Date.now())}.xls`
        );
        const blob = this.base64ToBlob(data, "application/vnd.ms-excel");
        return download(blob, filename, "application/vnd.ms-excel");
      } else {
        const data = this.jsonToCSV(json);
        const filename = this.name.replace(
          ".csv",
          `_${formatExport(Date.now())}.csv`
        );
        const blob = this.base64ToBlob(data, "application/csv");
        return download(blob, filename, "application/csv");
      }
    },
    jsonToXLS(data) {
      const xlsTemp =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>';
      let xlsData = "<thead><tr>";
      for (let key in data[0]) {
        xlsData += `<th>${key}</th>`;
      }
      xlsData += "</tr></thead><tbody>";
      data.map(item => {
        xlsData += "<tr>";
        for (let key in item) {
          xlsData += `<td>${
            typeof item[key] == "string"
              ? item[key].replace(/\n/gi, "<br/>")
              : item[key]
          }</td>`;
        }
        xlsData += "</tr>";
      });
      xlsData += "</tbody>";
      return xlsTemp.replace("${table}", xlsData);
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
