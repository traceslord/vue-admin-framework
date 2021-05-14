<template>
  <div>
    <jk-table
      :chart-title="chartTitle"
      :chart-data="chartData"
      :chart-colnames="chartColnames"
      :pagination-page-size="pagination.pageSize"
      :pagination-total="pagination.total"
      v-loading="loading"
    ></jk-table>
  </div>
</template>

<script>
import supersetService from "@/components/jk/superset-charts/service";
import { JkTable } from "@/components/jk/superset-charts/components";

export default {
  components: {
    JkTable
  },
  data() {
    return {
      loading: true,
      chartTitle: "",
      chartConfig: null,
      chartColnames: [],
      chartData: [],
      pagination: {
        pageSize: 20,
        total: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = 7;
      this.loading = true;
      supersetService
        .TableData(id)
        .then(res => {
          this.chartTitle = res[0];
          this.chartColnames = res[2].result[0].colnames;
          this.chartData = res[2].result[0].data;
          this.pagination.pageSize = res[1].page_length;
          this.pagination.total = res[2].result[0].rowcount;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
