<template>
  <div class="bg-page font14 user-list-page">
   <table class="add-make-list bg-white">
     <tr>
       <th colspan="4" class="align_center font20 padding15">制作需求单</th>
     </tr>
     <tr v-if="query.id">
       <td class="title">项目编号</td>
       <td colspan="3">
         <el-input readonly v-model="demandno"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">项目名称<span>*</span></td>
       <td colspan="3">
         <el-input v-if="(title&&title!='')||!isDisabled" :disabled="isDisabled" v-model="title" placeholder="请输入项目名称"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">品牌名称</td>
       <td>
         <el-input v-if="(brand&&brand!='')||!isDisabled" :disabled="isDisabled" v-model="brand" placeholder="请输入品牌名称"></el-input>
       </td>
       <td class="title">视频类型<span>*</span></td>
       <td>
         <el-select :disabled="isDisabled" v-model="videotype" placeholder="请选择视频类型">
           <el-option
              v-for="item in videotypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
       </td>
     </tr>
     <tr>
       <td class="title">产品名称</td>
       <td>
         <el-input v-if="(product&&product!='')||!isDisabled" :disabled="isDisabled" v-model="product" placeholder="请输入产品名称"></el-input>
       </td>
       <td class="title">效果目标</td>
       <td>
         <el-input v-if="!isDisabled||(target&&target!='')" :disabled="isDisabled" v-model="target" placeholder="请输入效果目标"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">视频时长<span>*</span></td>
       <td>
         <el-select :disabled="isDisabled" v-model="duration" placeholder="请选择视频时长">
           <el-option
              v-for="item in durationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
        </td>
        <td class="title">视频比例<span>*</span></td>
        <td>
          <el-select :disabled="isDisabled" v-model="ratio" placeholder="请选择视频比例">
            <el-option
              v-for="item in ratioOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
     </tr>
     <tr>
       <td class="title">视频数量</td>
       <td>
         <el-input v-if="(videocount&&videocount!='')||!isDisabled" :disabled="isDisabled" v-model="videocount" placeholder="请输入视频数量"></el-input>
       </td>
       <td class="title">视频分类<span>*</span></td>
       <td>
         <el-select :disabled="isDisabled" v-model="videoclass" placeholder="请选择视频分类">
            <el-option
              v-for="item in videoclassOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
     <tr>
       <td class="title">立项日期<span>*</span></td>
       <td>
         <el-date-picker
            :disabled="isDisabled"
            v-model="starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择立项日期">
          </el-date-picker>
        </td>
        <td class="title">交付日期<span>*</span></td>
        <td>
          <el-date-picker
            :disabled="isDisabled"
            v-model="endtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择交付日期">
          </el-date-picker>
        </td>
      </tr>
    <tr>
      <td class="title">全片LOGO<span>*</span></td>
      <td>
        <el-select :disabled="isDisabled" v-model="logo_all" placeholder="请选择全片LOGO">
          <el-option
            v-for="item in logo_allOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </td>
      <td class="title">片尾LOGO<span>*</span></td>
      <td>
        <el-select :disabled="isDisabled" v-model="logo_end" placeholder="请选择片尾LOGO">
          <el-option
            v-for="item in logo_endOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </td>
     </tr>
     <tr>
       <td class="title">上传附件</td>
       <td colspan="3" class="align_left">
         <div v-if="isDisabled" class="file-list">
           <div class="file-item" v-for="(item,index) in fileList" :key="index" :item="item">
             <a type="primary" :href="item.url" style="color: #409EFF;" target="_blank">{{item.name}}</a>
            </div>
         </div>
         <div v-else class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="afterUpload"
            :file-list="fileList"
            :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="disUploadBtn">上传文件</el-button>
            </el-upload>
        </div>
       </td>
     </tr>
     <tr>
       <td class="title">相关链接</td>
       <td colspan="3">
         <el-input v-if="(linkurl&&linkurl!='')||!isDisabled" :disabled="isDisabled" v-model="linkurl" placeholder="请输入相关链接"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">客户投诉</td>
       <td colspan="3">
         <el-input v-if="(customerdemand&&customerdemand!='')||!isDisabled" :disabled="isDisabled" v-model="customerdemand" placeholder="请输入投诉内容"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">客户信息</td>
       <td colspan="3">
         <el-input v-if="(customerinfo&&customerinfo!='')||!isDisabled" :disabled="isDisabled" v-model="customerinfo" placeholder="请输入客户信息"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">产品定位</td>
       <td colspan="3"><el-input v-if="(productorientation&&productorientation!='')||!isDisabled" :disabled="isDisabled" v-model="productorientation" placeholder="请输入产品定位"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">产品买点<span class="font12 color-gray5">（核心买点需标注）</span></td>
       <td colspan="3">
         <el-input v-if="(sellerpoint&&sellerpoint!='')||!isDisabled" :disabled="isDisabled" type="textarea" v-model="sellerpoint" placeholder="请输入产品买点"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">视频内必须展示的关键信息</td>
       <td colspan="3">
         <el-input v-if="(keyinfo&&keyinfo!='')||!isDisabled" :disabled="isDisabled" type="textarea" v-model="keyinfo" placeholder="请输入关键信息"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">创意思路</td>
       <td colspan="3">
         <el-input v-if="(customeridea&&customeridea!='')||!isDisabled" :disabled="isDisabled" type="textarea" v-model="customeridea" placeholder="请输入创意思路"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">特殊备注</td>
       <td :colspan="query.type ? 3 : ''">
         <el-input v-if="(otherdemand&&otherdemand!='')||!isDisabled" :disabled="isDisabled" v-model="otherdemand" placeholder="请输入特殊备注"></el-input>
       </td>
       <td v-if="!query.type">制作价格</td>
       <td v-if="!query.type">
         <el-input v-if="(price&&price!='')||!isDisabled" :disabled="isDisabled" v-model="price" placeholder="请输入制作价格"></el-input>
       </td>
     </tr>
     <tr v-if="status === 1">
       <td class="title">项目来源<span>*</span></td>
       <td>
         <el-select v-model="comefrom" placeholder="请选择项目来源">
           <el-option
              v-for="item in comefromOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
        </td>
        <td class="title">视频价格<span>*</span></td>
        <td>
          <el-select v-model="pricetype" placeholder="请选择视频价格">
            <el-option
              v-for="item in pricetypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
     </tr>
     <tr v-if="isDisabled">
       <td class="title">拍摄价格<span>*</span></td>
       <td :colspan="status !== 0 && status !== 1 ? 3 : ''">
         <el-input :disabled="status !== 1" v-model="price_out" placeholder="请输入拍摄价格"></el-input>
       </td>
       <td v-if="status === 1" class="title">分发用户<span>*</span></td>
       <td v-if="status === 1" @click="chooseUser">
         <el-input readonly v-model="users" placeholder="请输入选择分发用户"></el-input>
       </td>
     </tr>
     <tr v-if="query.type || status >= 4">
       <td class="title">创意梗概</td>
       <td colspan="3">
         <el-input :disabled="status >= 4" type="textarea" v-model="idea" placeholder="请输入创意梗概"></el-input>
       </td>
     </tr>
     <tr v-if="status === 5&&query.type">
       <td class="title">上传演员身份证及肖像权协议扫描件<span>（只能上传图片）</span></td>
       <td colspan="3" class="align_left">
         <div class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange1"
            :on-remove="handleRemove1"
            :on-success="afterUpload1"
            :file-list="photos"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="disUploadBtn">上传文件</el-button>
            </el-upload>
        </div>
       </td>
     </tr>
     <tr v-if="(status === 5 || status === 6)&&query.type">
       <td class="title">{{status === 5 ? '上传样片' : '上传成片'}}<span>（只能上传一项）</span></td>
       <td colspan="3" class="align_left">
         <div class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange1"
            :on-remove="handleRemove1"
            :on-success="afterUpload1"
            :file-list="samplePiece"
            :auto-upload="false"
            :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="disUploadBtn">上传文件</el-button>
            </el-upload>
        </div>
       </td>
     </tr>
     <tr v-if="(status === 5 || status === 6)&&query.type">
       <td class="title">{{status === 5 ? '样片备注' : '成片备注'}}</td>
       <td colspan="3">
         <el-input v-model="memo" placeholder="请输入备注"></el-input>
       </td>
     </tr>
     <tr v-if="query.type || (status !== 2 && status !== 3)">
       <td class="padding10" colspan="4">
         <el-button
           v-if="canedit === 1"
           type="primary"
           @click="onSubmit">修改</el-button>
         <el-button
           v-if="cancensor === 1"
           type="primary"
           @click="handleExamine(parseInt(query.id))">审批</el-button>
         <el-button
           v-if="status === 1"
           type="primary"
           @click="onInvite">分发</el-button>
         <el-button
           v-if="query.type === 'new' && status === 2"
           type="primary"
           @click="onInvite3(0)">确认订单</el-button>
         <el-button
           v-if="query.type === 'ongoing' && status === 3"
           type="primary"
           @click="onInvite3(1)">修改创意梗概</el-button>
         <el-button
           v-if="status === 4"
           type="primary"
           @click="toFenjing()">分镜脚本</el-button>
         <el-button
           v-if="query.type === 'ongoing' && status === 5"
           type="primary"
           @click="uploadSamplePiece()">上传样片</el-button>
         <el-button
           v-if="query.type === 'ongoing' && status === 6"
           type="primary"
           @click="uploadFinalVideo()">上传成片</el-button>
         <el-button
           v-if="!query.type && (status === 5 || status === 6)"
           type="primary"
           @click="toFenjing()">{{status === 5 ? '审核样片' : '审核成片'}}</el-button>
     </td>
     </tr>
   </table>
   <div class="scroll-container user-table" ref="scrollContainer2" @scroll="handleScroll2('scrollContainer2',0)">
     <template v-if="disTabData2">
       <el-table
         :data="tableData2"
         stripe
         style="width: 100%"
         highlight-current-row
         @current-change="handleCurrentChange"
         :header-cell-style="{'text-align':'center'}"
         :cell-style="{'text-align':'center'}">
           <el-table-column
             label="选择"
             min-width="60">
               <template slot-scope="scope">
                 <el-radio size="medium" v-model="ideaRadio" :label="scope.row.uid"><i></i></el-radio>
               </template>
           </el-table-column>
           <el-table-column
             prop="linkman"
             label="姓名"
             min-width="100">
           </el-table-column>
           <el-table-column
             label="手机号码"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.mobile || scope.row.mobile == ''">无</template>
                 <template v-else>{{scope.row.mobile}}</template>
               </template>
           </el-table-column>
           <el-table-column
             label="创意梗概"
             min-width="500">
             <template slot-scope="scope">
               <template v-if="!scope.row.idea || scope.row.idea == ''">无</template>
               <template v-else>{{scope.row.idea}}</template>
             </template>
           </el-table-column>
       </el-table>
        <div class="align_center mt20" v-if="status === 2">
          <el-button
            type="primary"
            @click="onSubmit2">提交选择</el-button>
          <el-button
            type="primary"
            @click="chooseUser">新增邀请</el-button>
        </div>
     </template>
   </div>
   <div class="scroll-container">
     <template v-if="disTabData3 && status === 3">
       <el-table
         :data="ideas"
         stripe
         style="width: 100%"
         :header-cell-style="{'text-align':'center'}"
         :cell-style="{'text-align':'center'}">
           <el-table-column
             prop="datetime"
             label="日期"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="version"
             label="版本号"
             min-width="100">
           </el-table-column>
           <el-table-column
             label="创意梗概"
             min-width="500">
             <template slot-scope="scope">
               <template v-if="!scope.row.content || scope.row.content == ''">无</template>
               <template v-else>{{scope.row.content}}</template>
             </template>
           </el-table-column>
           <el-table-column
             label="审核意见"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
                 <template v-else>{{scope.row.checkresult}}</template>
               </template>
           </el-table-column>
           <el-table-column
             label="审核状态"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.modstr || scope.row.modstr == ''">无</template>
                 <template v-else>{{scope.row.modstr}}</template>
               </template>
           </el-table-column>
           <el-table-column
             v-if="status === 3"
             label="操作"
             min-width="120">
             <template slot-scope="scope">
               <template v-if="scope.row.cancheck === 1"><el-button @click="handleExamine(scope.row.id)">审批</el-button></template>
             </template>
           </el-table-column>
       </el-table>
        <div class="align_center mt20" v-if="status === 2">
          <el-button
            type="primary"
            @click="onSubmit2">提交选择</el-button>
          <el-button
            type="primary"
            @click="chooseUser">新增邀请</el-button>
        </div>
     </template>
   </div>
   <div class="scroll-container mb20">
     <template v-if="disTabData4">
       <el-table
         :data="tableData4"
         stripe
         style="width: 100%"
         :header-cell-style="{'text-align':'center'}"
         :cell-style="{'text-align':'center'}">
         <el-table-column
           label="《制作需求单》附件："
           min-width="100">
           <el-table-column
             prop="id"
             label="镜号"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="daynight"
             label="日外/夜内"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="scene"
             label="场景"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="photography"
             label="拍摄手法"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="fieldofview"
             label="景别"
             min-width="100">
           </el-table-column>
         </el-table-column>
         <el-table-column
           :label="title"
           min-width="100">
           <el-table-column
             prop="seconds"
             label="时长"
             min-width="100">
           </el-table-column>
           <el-table-column
             prop="pictures"
             label="画面描述"
             min-width="200">
             <template slot-scope="scope">
               <div v-if="!scope.row.pictures || scope.row.pictures == ''">无</div>
               <div class="align_left pre-wrap" v-else>{{scope.row.pictures}}</div>
             </template>
           </el-table-column>
         </el-table-column>
         <el-table-column
           label="分镜脚本"
           min-width="100">
           <el-table-column
             label="台词/解说词"
             min-width="200">
             <template slot-scope="scope">
               <div v-if="!scope.row.actorsline || scope.row.actorsline == ''">无</div>
               <div class="align_left pre-wrap" v-else>{{scope.row.actorsline}}</div>
             </template>
           </el-table-column>
         </el-table-column>
         <el-table-column
           :label="ratios[ratio]"
           min-width="100">
           <el-table-column
             label="服装道具"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.costumes || scope.row.costumes == ''">无</template>
                 <template v-else>{{scope.row.costumes}}</template>
               </template>
           </el-table-column>
           <el-table-column
             label="后期制作"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.postproduction || scope.row.postproduction == ''">无</template>
                 <template v-else>{{scope.row.postproduction}}</template>
               </template>
           </el-table-column>
         </el-table-column>
         <el-table-column
           label="项目编号"
           min-width="100">
           <el-table-column
             label="备注"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="!scope.row.memo || scope.row.memo == ''">无</template>
                 <template v-else>{{scope.row.memo}}</template>
               </template>
           </el-table-column>
         </el-table-column>
         <el-table-column
           :label="demandno"
           min-width="100">
           <el-table-column
             label="审核意见"
             min-width="200">
               <template slot-scope="scope">
                 <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
                 <template v-else>{{scope.row.checkresult}}</template>
               </template>
           </el-table-column>
         </el-table-column>
       </el-table>
     </template>
   </div>
   <div class="auto-modal flex_center" style="position:fixed;" v-if="showExamine">
     <div class="modal-inner">
       <div class="modal-content padding20">
           <div class="modal-header mb20">
             <el-radio-group v-model="radio" @change="changeExamine">
               <el-radio :label= "1">审批通过</el-radio>
               <el-radio :label= "2">审批不通过</el-radio>
             </el-radio-group>
           </div>
           <div class="modal-body mb20">
             <div class="from-item-textarea">
               <el-input type="textarea" v-model="reason" :placeholder="showReason" size="50"></el-input>
             </div>
           </div>
           <div class="modal-footer flex_right">
             <el-button @click="closeModal">取消</el-button>
             <el-button class="" type="primary" @click="submitModal">提交</el-button>
           </div>
       </div>
     </div>
   </div>
   <div v-if="showChooseUser">
     <div class="auto-modal flex_center" style="position:fixed;">
       <div class="modal-inner">
         <div class="modal-content padding20">
             <div class="modal-header mb20 align_center">
               选择用户
             </div>
             <div class="modal-body mb20">
               <div class="mb20">
                 <el-input placeholder="请输入用户名称搜索" v-model="keyword" @keyup.enter.native="kwChange">
                   <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
                 </el-input>
               </div>
               <div class="users-box scroll-container" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
                 <template v-if="disTabData">
                   <div v-if="!tableData.length" class="rw-item flex_center">暂无数据</div>
                   <el-checkbox-group v-else v-model="checkList">
                     <div v-for="(item,index) in tableData" :key="index">
                       <div class="rw-item flex_left">
                         <el-checkbox :disabled="item.checked" :label="item.uid">{{item.linkman}}</el-checkbox>
                       </div>
                     </div>
                   </el-checkbox-group>
                 </template>
                 <div class="load-end-area loading" v-if="isLoading"></div>
               </div>
             </div>
             <div class="modal-footer flex_right">
               <el-button @click="closeUserModal">取消</el-button>
               <el-button class="" type="primary" @click="submitUserModal">提交</el-button>
             </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
import ENV from 'env'
import {User, Token} from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      loginUser: {},
      query: {},
      demandno: '',
      title: '',
      brand: '',
      videotype: '',
      product: '',
      target: '',
      videocount: '',
      linkurl: '',
      customerdemand: '',
      customerinfo: '',
      productorientation: '',
      sellerpoint: '',
      keyinfo: '',
      otherdemand: '',
      price: '',
      starttime: '',
      endtime: '',
      duration: '',
      ratio: '',
      videoclass: '',
      logo_all: '',
      logo_end: '',
      customeridea: '',
      comefrom: '',
      pricetype: '',
      price_out: '',
      idea: '',
      durationOptions: [],
      ratioOptions: [],
      videoclassOptions: [],
      logo_allOptions: [],
      logo_endOptions: [],
      videotypeOptions: [],
      comefromOptions: [],
      pricetypeOptions: [],
      issubmit: false,
      canedit: 0,
      cancensor: 0,
      limit: 20,
      tableData: [],
      pageStart: 0,
      disTabData: false,
      tableData2: [],
      pageStart2: 0,
      disTabData2: false,
      keyword: '',
      showExamine: false,
      showReason: '请输入审批通过原因',
      radio: 1,
      reason: '',
      examineIndex: '',
      showChooseUser: false,
      checkList: [],
      users: '',
      status: 0,
      isLoading: false,
      uids: [],
      id: '',
      isDisabled: false,
      ideaRadio: '',
      ideas: '',
      disTabData3: false,
      uploadApi: ENV.BokaApi + '/api/upload/singleFile?field=photo',
      uploadHeaders: {},
      fileList: [],
      disUploadBtn: false,
      samplePiece: [],
      memo: '',
      disTabData4: false,
      tableData4: [],
      ratios: '',
      photos: ''
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    toFenjing () {
      let params = {id: parseInt(this.query.id)}
      if (this.query.type) params.type = this.query.type
      this.$router.push({path: '/fenJing', query: params})
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/demands/fieldsList`).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          for (let i in retdata.duration) {
            let item = {value: parseInt(i), label: retdata.duration[i]}
            this.durationOptions.push(item)
          }
          for (let i in retdata.ratio) {
            let item = {value: parseInt(i), label: retdata.ratio[i]}
            this.ratioOptions.push(item)
          }
          for (let i in retdata.videoclass) {
            let item = {value: parseInt(i), label: retdata.videoclass[i]}
            this.videoclassOptions.push(item)
          }
          for (let i in retdata.logo_all) {
            let item = {value: parseInt(i), label: retdata.logo_all[i]}
            this.logo_allOptions.push(item)
          }
          for (let i in retdata.logo_end) {
            let item = {value: parseInt(i), label: retdata.logo_end[i]}
            this.logo_endOptions.push(item)
          }
          for (let i in retdata.videotype) {
            let item = {value: i, label: retdata.videotype[i]}
            this.videotypeOptions.push(item)
          }
          for (let i in retdata.comefrom) {
            let item = {value: i, label: retdata.comefrom[i]}
            this.comefromOptions.push(item)
          }
          for (let i in retdata.pricetype) {
            let item = {value: i, label: retdata.pricetype[i]}
            this.pricetypeOptions.push(item)
          }
          this.ratios = retdata.ratio
        }
      })
    },
    getInfo (id) {
      this.$http.post(`${ENV.BokaApi}/api/demands/info`, {id: id}).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        console.log('获取到信息后')
        console.log(retdata)
        this.title = retdata.title
        this.brand = retdata.brand
        this.videotype = retdata.videotype
        this.product = retdata.product
        this.target = retdata.target
        this.videocount = retdata.videocount
        this.linkurl = retdata.linkurl
        this.customerdemand = retdata.customerdemand
        this.customerinfo = retdata.customerinfo
        this.productorientation = retdata.productorientation
        this.sellerpoint = retdata.sellerpoint
        this.keyinfo = retdata.keyinfo
        this.otherdemand = retdata.otherdemand
        this.price = retdata.price
        this.starttime = new Date(retdata.starttime * 1000)
        this.endtime = new Date(retdata.endtime * 1000)
        this.duration = retdata.duration
        this.ratio = retdata.ratio
        this.videoclass = retdata.videoclass
        this.logo_all = retdata.logo_all
        this.logo_end = retdata.logo_end
        this.customeridea = retdata.customeridea
        this.demandno = retdata.demandno
        this.canedit = retdata.canedit
        this.cancensor = retdata.cancensor
        this.comefrom = retdata.comefrom
        this.pricetype = retdata.pricetype
        this.price_out = retdata.price_out
        this.status = retdata.status
        this.ideas = retdata.ideas
        if (retdata.ideas) {
          for (var i = 0; i < this.ideas.length; i++) {
            let curd = this.ideas[i]
            let startdate = new Date(curd.dateline * 1000)
            let startyear = startdate.getFullYear()
            let startmonth = startdate.getMonth() + 1
            let startday = startdate.getDate()
            curd.datetime = startyear + '/' + startmonth + '/' + startday
          }
          this.disTabData3 = true
        }
        if (retdata.confirmedidea) {
          this.idea = retdata.confirmedidea
        }
        if (retdata.status === 2 && !this.query.type) {
          this.getData3()
        }
        if (this.query.type || retdata.status !== 0) {
          console.log(retdata.status)
          this.isDisabled = true
        }
        if (retdata.attachment && retdata.attachment !== '') {
          let arr = retdata.attachment.split(',')
          for (let i = 0; i < arr.length; i++) {
            this.fileList.push({name: arr[i], issuccess: true, url: arr[i]})
          }
        }
        if (retdata.video && retdata.video !== '') {
          let arr = retdata.video.split(',')
          for (let i = 0; i < arr.length; i++) {
            this.samplePiece.push({name: arr[i], issuccess: true, url: arr[i]})
          }
        }
        if ((retdata.status === 5 || retdata.status === 6) && this.query.type) {
          this.getData4()
        }
      })
    },
    onSubmit () {
      let params = {title: this.title,
        starttime: this.starttime,
        endtime: this.endtime,
        duration: this.duration,
        ratio: this.ratio,
        videoclass: this.videoclass,
        logo_all: this.logo_all,
        logo_end: this.logo_end,
        price: this.price,
        videocount: this.videocount,
        videotype: this.videotype,
        attachment: []
      }
      if (this.brand !== '') params.brand = this.brand
      if (this.product !== '') params.product = this.product
      if (this.target !== '') params.target = this.target
      if (this.linkurl !== '') params.linkurl = this.linkurl
      if (this.customerdemand !== '') params.customerdemand = this.customerdemand
      if (this.customerinfo !== '') params.customerinfo = this.customerinfo
      if (this.productorientation !== '') params.productorientation = this.productorientation
      if (this.sellerpoint !== '') params.sellerpoint = this.sellerpoint
      if (this.keyinfo !== '') params.keyinfo = this.keyinfo
      if (this.otherdemand !== '') params.otherdemand = this.otherdemand
      if (this.customeridea !== '') params.customeridea = this.customeridea
      if (this.query.id) params.id = parseInt(this.query.id)
      let attachment = []
      for (let i = 0; i < this.fileList.length; i++) {
        let cur = this.fileList[i]
        if (cur.response && cur.response.flag) {
          attachment.push(cur.name)
        }
      }
      if (attachment.length) params.attachment = attachment.join(',')
      var rule1 = /^(0|[1-9][0-9]*)$/
      if (!this.issubmit) {
        if (this.title === '' || this.starttime === '' || this.endtime === '' || this.duration === '' || this.ratio === '' || this.videoclass === '' ||
            this.logo_all === '' || this.logo_end === '' || this.videotype === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else if (this.endtime <= this.starttime) {
          this.$vux.toast.text('交付日期必须大于立项日期', 'middle')
        } else if (this.price !== '' && (isNaN(this.price) || parseFloat(this.price) < 0 || parseFloat(this.price).length > 7)) {
          this.$vux.toast.text('请输入正确的制作价格', 'middle')
        } else if (this.videocount !== '' && (isNaN(this.videocount) || parseFloat(this.videocount) < 0 || !rule1.test(this.videocount))) {
          this.$vux.toast.text('请输入正确的视频数量', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/add`, params).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/makeList'})
            this.issubmit = false
          })
        }
      }
    },
    handleExamine (id) {
      this.showExamine = true
      if (id) this.id = id
    },
    changeExamine () {
      if (this.radio === 2) {
        this.showReason = '请输入审批不通过原因'
      } else {
        this.showReason = '请输入审批通过原因'
      }
      this.reason = ''
    },
    closeModal () {
      this.showExamine = false
      this.reason = ''
      this.radio = 1
      this.showReason = '请输入审批通过原因'
    },
    submitModal () {
      if (this.radio === 2 && this.reason === '') {
        this.$vux.toast.text('请填写审批不通过原因', 'middle')
        return false
      }
      let params = {id: this.id, agree: this.radio}
      if (this.reason) params.reason = this.reason
      if (this.status === 3) {
        params.module = 'ideas'
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/censor`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.closeModal()
          this.getInfo(this.query.id)
          if (this.status === 0) {
            this.$router.push({path: '/makeList', query: {status: 1}})
          } else {
            this.$router.push({path: '/makeList', query: {status: 4}})
          }
        }
      })
    },
    chooseUser () {
      this.showChooseUser = true
      if (!this.tableData.length) {
        this.isLoading = true
        this.getData2()
      }
    },
    kwChange () {
      if (event.keyCode === 13) {
        this.searchEvent()
      }
    },
    searchEvent () {
      this.pagestart = 0
      this.disTabData = false
      this.tableData = []
      this.isLoading = true
      this.getData2()
    },
    closeUserModal () {
      this.showChooseUser = false
      this.checkList = []
    },
    submitUserModal () {
      if (!this.checkList.length) {
        this.$vux.toast.text('请选择一个用户', 'middle')
        return false
      }
      this.users = ''
      for (let i = 0; i < this.tableData.length; i++) {
        for (let u = 0; u < this.checkList.length; u++) {
          if (this.tableData[i].uid === this.checkList[u]) {
            this.users = this.users + this.tableData[i].linkman
          }
        }
      }
      if (this.checkList.length === this.uids.length) {
        this.$vux.toast.text('请选一个新用户', 'middle')
        return false
      }
      if (this.checkList.length !== this.uids.length && status === 2) {
        this.onInvite2()
      }
      this.showChooseUser = false
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tableData.length === (self.pageStart + 1) * self.limit) {
            self.pageStart++
            self.isLoading = true
            self.getData2()
          }
        }
      })
    },
    getData2 () {
      let params = {pagestart: this.pageStart, limit: this.limit, groupid: 3}
      if (this.keyword && this.keyword !== '') {
        params.keyword = this.keyword
      }
      this.$http.post(`${ENV.BokaApi}/api/user/getList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.isLoading = false
          const data = res.data
          const retdata = data.data ? data.data : data
          for (let i = 0; i < retdata.length; i++) {
            let curd = retdata[i]
            for (let u = 0; u < this.checkList.length; u++) {
              if (curd.uid === this.checkList[u]) {
                curd.checked = true
              }
            }
          }
          this.tableData = this.tableData.concat(retdata)
          this.disTabData = true
        }
      })
    },
    handleScroll2 (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tableData2.length === (self.pageStart2 + 1) * self.limit) {
            self.pageStart2++
            self.$vux.loading.show()
            self.getData3()
          }
        }
      })
    },
    getData3 () {
      let params = {pagestart: this.pageStart2, limit: this.limit, id: parseInt(this.query.id)}
      this.$http.post(`${ENV.BokaApi}/api/demands/inviteInfo`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.checkList = data.uids
          this.uids = data.uids
          this.tableData2 = this.tableData2.concat(retdata)
          this.disTabData2 = true
        }
      })
    },
    getData4 () {
      let params = {demandid: parseInt(this.query.id)}
      this.$http.post(`${ENV.BokaApi}/api/demands/rushVideoCheckList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.tableData4 = retdata
          this.disTabData4 = true
        }
      })
    },
    onInvite () {
      let params = {
        comefrom: this.comefrom,
        pricetype: this.pricetype,
        price_out: this.price_out,
        uids: this.checkList,
        id: parseInt(this.query.id)
      }
      if (!this.issubmit) {
        if (this.pricetype === '' || this.comefrom === '' || this.users === '' || this.price_out === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else if (this.price_out !== '' && (isNaN(this.price_out) || parseFloat(this.price_out) < 0 || parseFloat(this.price_out).length > 7)) {
          this.$vux.toast.text('请输入正确的拍摄价格', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/invite`, params).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/makeList', query: {status: 2}})
            this.issubmit = false
          })
        }
      }
    },
    onInvite2 () {
      let params = {
        uids: this.checkList,
        id: parseInt(this.query.id)
      }
      if (!this.issubmit) {
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/invite`, params).then(res => {
          let data = res.data
          this.$vux.toast.text(data.error, 'middle')
          this.pagestart2 = 0
          this.disTabData2 = false
          this.tableData2 = []
          this.getData3()
          this.issubmit = false
        })
      }
    },
    onInvite3 (selectedIndex) {
      let params = {
        idea: this.idea,
        id: parseInt(this.query.id)
      }
      if (!this.issubmit) {
        if (this.idea === '' || !this.idea) {
          this.$vux.toast.text('请填写创意梗概', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/addIdea`, params).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/myOrder', query: {type: this.query.type, selectedIndex: selectedIndex}})
            this.issubmit = false
          })
        }
      }
    },
    handleCurrentChange (val) {
      this.ideaRadio = val.uid
    },
    onSubmit2 () {
      console.log(this.ideaRadio);
      let params = {
        suid: this.ideaRadio,
        id: parseInt(this.query.id)
      }
      if (!this.issubmit) {
        if (this.ideaRadio === '') {
          this.$vux.toast.text('请选择一条创意梗概', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/selectIdea`, params).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            if (data.flag === 1) {
              this.$router.push({path: '/makeList', query: {status: 2}})
            }
            this.issubmit = false
          })
        }
      }
    },
    handleUploadBtn (fileList) {
      let isDis = false
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (!cur.issuccess) {
          isDis = true
          break
        }
      }
      this.disUploadBtn = isDis
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    handleChange (file, fileList) {
      this.handleUploadBtn(fileList)
    },
    afterUpload (res, file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (cur.response && cur.response.flag) {
          cur.name = cur.response.data
          cur.issuccess = true
          cur.url = cur.response.data
        }
      }
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    handleRemove1 (file, fileList) {
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    handleChange1 (file, fileList) {
      this.handleUploadBtn(fileList)
    },
    afterUpload1 (res, file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (cur.response && cur.response.flag) {
          cur.name = cur.response.data
          cur.issuccess = true
          cur.url = cur.response.data
        }
      }
      this.samplePiece = fileList
      this.handleUploadBtn(fileList)
    },
    uploadSamplePiece () {
      if (!this.issubmit) {
        let params = {demandid: parseInt(this.query.id)}
        if (!this.photos.length) {
          this.$vux.toast.text('请选择上传演员身份证及肖像权协议扫描件', 'middle')
          return false
        }
        if (!this.samplePiece.length) {
          this.$vux.toast.text('请选择上传样片', 'middle')
          return false
        }
        let attachmentPhotos = []
        for (let i = 0; i < this.photos.length; i++) {
          let cur = this.photos[i]
          if (cur.response && cur.response.flag) {
            photos.push(cur.name)
          }
        }
        if (attachmentPhotos.length) params.photos = attachmentPhotos.join(',')
        let attachment = []
        for (let i = 0; i < this.samplePiece.length; i++) {
          let cur = this.samplePiece[i]
          if (cur.response && cur.response.flag) {
            attachment.push(cur.name)
          }
        }
        if (attachment.length) params.video = attachment.join(',')
        if (this.memo !== '') params.memo = this.memo
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/addRushVideo`, params).then(res => {
          let data = res.data
          this.$vux.toast.text(data.error, 'middle')
          this.issubmit = false
        })
      }
    },
    uploadFinalVideo () {
      if (!this.issubmit) {
        let params = {demandid: parseInt(this.query.id)}
        if (!this.samplePiece.length) {
          this.$vux.toast.text('请选择上传成片', 'middle')
          return false
        }
        let attachment = []
        for (let i = 0; i < this.samplePiece.length; i++) {
          let cur = this.samplePiece[i]
          if (cur.response && cur.response.flag) {
            attachment.push(cur.name)
          }
        }
        if (attachment.length) params.video = attachment.join(',')
        if (this.memo !== '') params.memo = this.memo
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/addFinalVideo`, params).then(res => {
          let data = res.data
          this.$vux.toast.text(data.error, 'middle')
          this.issubmit = false
        })
      }
    },
    refresh () {
      this.loginUser = User.get()
      let token = Token.get()
      this.uploadHeaders.Authorization = `Bearer ${token.token}`
      if (this.loginUser !== '') {
        this.query = this.$route.query
        this.pageStart = 0
        this.disTabData = false
        this.tableData = []
        this.pageStart2 = 0
        this.disTabData2 = false
        this.tableData2 = []
        this.disTabData3 = false
        this.ideas = []
        this.durationOptions = []
        this.ratioOptions = []
        this.videoclassOptions = []
        this.logo_allOptions = []
        this.logo_endOptions = []
        this.videotypeOptions = []
        this.comefromOptions = []
        this.pricetypeOptions = []
        this.fileList = []
        this.samplePiece = []
        this.title = ''
        this.brand = ''
        this.videotype = ''
        this.product = ''
        this.target = ''
        this.videocount = ''
        this.linkurl = ''
        this.customerdemand = ''
        this.customerinfo = ''
        this.productorientation = ''
        this.sellerpoint = ''
        this.keyinfo = ''
        this.otherdemand = ''
        this.price = ''
        this.starttime = ''
        this.endtime = ''
        this.duration = ''
        this.ratio = ''
        this.videoclass = ''
        this.logo_all = ''
        this.logo_end = ''
        this.customeridea = ''
        this.comefrom = ''
        this.pricetype = ''
        this.price_out = ''
        this.idea = ''
        this.ideaRadio = ''
        this.issubmit = false
        this.isDisabled = false
        this.tableData4 = []
        this.disTabData4 = false
        this.$vux.loading.show()
        this.getData()
        if (this.query.id) {
          this.getInfo(this.query.id)
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.user-list-page{
  .add-make-list{
    width: 99.9%;
    text-align: center;
    border-collapse:collapse;
    td{
      border: 1px solid #333;
    }
    .title{
      width: 10%;
      min-width: 80px;
      padding: 9px;
      span{
        color: red;
      }
    }
    .el-select,.el-input{
      width: 100%;
    }
    .el-textarea__inner{
      height: 80px;
    }
    .el-input__inner,.el-textarea__inner{
      border: none !important;
      min-width: 200px;
    }
    .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
      background-color: #fff !important;
      color: #606266 !important;
    }
  }
  .user-table{
    margin: 50px 0;
    .el-table__row{
      cursor: pointer;
    }
  }
}
.users-box{
  height: 200px;
  overflow-y: scroll;
}
@media (min-width: 768px) {
  .modal-inner{
    width: 400px !important;
  }
}
.from-item-textarea{
  height: 100px;
  border:1px solid #bcbcbc;
  border-radius: 4px;
  .el-textarea,.el-textarea__inner{
    height: 100%;
    border: none !important;
  }
}
.file-list{
  padding:10px;text-align:left;
  .file-item{display:block;}
}
</style>
