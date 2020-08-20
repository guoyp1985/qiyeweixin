<template>
  <div class="padding10">
    <div class="upload-area">
        <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadApi"
        :headers="uploadHeaders"
        :multiple="1 == 1"
        name="photo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="afterUpload"
        :file-list="fileList"
        :auto-upload="false"
        >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
        </el-upload>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import {Token} from '#/storage'
export default {
  data () {
    return {
      query: {},
      uploadApi: ENV.BokaApi + '/api/upload/singleFile?field=photo',
      uploadHeaders: {},
      fileList: []
    };
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    handlePreview (file) {
    },
    afterUpload (res, file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (cur.response && cur.response.flag) {
          cur.name = cur.response.data
        }
      }
      this.fileList = fileList
    }
  },
  created () {
    this.query = this.$route.query
    let token = Token.get()
    this.uploadHeaders.Authorization = `Bearer ${token.token}`
  },
  activated () {},
  mounted () {},
  beforeMount () {}
};
</script>
<style lang="less">
.upload-area{
    display:inline-block;
    padding:10px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
}
</style>
