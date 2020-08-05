<template>
  <div class="bg-page font14 user-list-page">
    <el-table
    :data="tableData"
    style="width: 100%">
        <el-table-column
            prop="id"
            label="ID"
            width="80">
        </el-table-column>
        <el-table-column
            prop="title"
            label="姓名">
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
      tableData: []
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/clues/getList`).then(res => {
        const data = res.data
        if (data.flag) {
          this.tableData = data.data
        }
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
