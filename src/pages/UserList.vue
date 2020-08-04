<template>
  <div class="bg-page font14 user-list-page">
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
    </el-table>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
export default {
  components: {
  },
  data () {
    return {
      query: {},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/getList`).then(res => {
        if (!res) return
        this.loginUser = res.data
      })
    },
    refresh () {
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.user-list-page{

}
</style>
