<template>
  <div class="bg-white font14 make-detail-page">
    <div v-if="showSos" class="sos-area">
      <div class="flex_left">
        <el-button @click="toBack" type="info" size="small" icon="el-icon-arrow-left">返回</el-button>
      </div>
      <div class="sos-txt">{{sosTxt}}</div>
    </div>
   <table class="add-make-list bg-white" v-if="!query.id || viewData.id">
     <tr>
       <th colspan="4" class="align_center font20 padding15" style="position:relative;">
         <span>制作需求单</span>
         <div style="position:absolute;left:0;top:0;bottom:0;" class="flex_left">
           <el-button @click="toBack" type="info" size="small" icon="el-icon-arrow-left">返回</el-button>
         </div>
       </th>
     </tr>
     <tr v-if="query.id">
       <td class="title">项目编号</td>
       <td colspan="3" class="txt-css">{{viewData.demandno}}</td>
     </tr>
     <tr>
       <td class="title">项目名称<span v-if="allowEdit">*</span></td>
       <td colspan="3">
         <el-input v-if="allowEdit" v-model="viewData.title" placeholder="请输入项目名称"></el-input>
         <div class="txt-css" v-else>{{viewData.title}}</div>
         <div class="diff-css" v-if="historyData && historyData.title && historyData.title != '' && viewData.title != historyData.title">{{historyData.title}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">品牌名称</td>
       <td>
         <el-input v-if="allowEdit" v-model="viewData.brand" placeholder="请输入品牌名称"></el-input>
         <div class="txt-css" v-else>{{viewData.brand}}</div>
         <div class="diff-css" v-if="historyData && historyData.brand && historyData.brand != '' && viewData.brand != historyData.brand">{{historyData.brand}}</div>
       </td>
       <td class="title">视频类型<span v-if="allowEdit">*</span></td>
       <td>
         <el-select v-if="allowEdit" v-model="viewData.videotype" placeholder="请选择视频类型">
           <el-option
              v-for="item in videotypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
         <div class="txt-css" v-else>{{fieldsData.videotype[viewData.videotype]}}</div>
         <div class="diff-css" v-if="historyData && historyData.videotype && historyData.videotype != '' && viewData.videotype != historyData.videotype">{{fieldsData.videotype[historyData.videotype]}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">产品名称</td>
       <td>
         <el-input v-if="allowEdit" v-model="viewData.product" placeholder="请输入产品名称"></el-input>
         <div class="txt-css" v-else>{{viewData.product}}</div>
         <div class="diff-css" v-if="historyData && historyData.product && historyData.product != '' && viewData.product != historyData.product">{{historyData.product}}</div>
       </td>
       <td class="title">效果目标</td>
       <td>
         <el-input v-if="allowEdit" v-model="viewData.target" placeholder="请输入效果目标"></el-input>
         <div class="txt-css" v-else>{{viewData.target}}</div>
         <div class="diff-css" v-if="historyData && historyData.target && historyData.target != '' && viewData.target != historyData.target">{{historyData.target}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">视频时长<span v-if="allowEdit">*</span></td>
       <td>
         <el-select v-if="allowEdit" v-model="viewData.duration" placeholder="请选择视频时长">
           <el-option
              v-for="item in durationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
         </el-select>
         <div class="txt-css" v-else>{{fieldsData.duration[viewData.duration]}}</div>
         <div class="diff-css" v-if="historyData && historyData.duration && historyData.duration != '' && viewData.duration != historyData.duration">{{fieldsData.videotype[historyData.duration]}}</div>
        </td>
        <td class="title">视频比例<span v-if="allowEdit">*</span></td>
        <td>
          <el-select v-if="allowEdit" v-model="viewData.ratio" placeholder="请选择视频比例">
            <el-option
              v-for="item in ratioOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="txt-css" v-else>{{fieldsData.ratio[viewData.ratio]}}</div>
          <div class="diff-css" v-if="historyData && historyData.ratio && historyData.ratio != '' && viewData.ratio != historyData.ratio">{{fieldsData.videotype[historyData.ratio]}}</div>
        </td>
     </tr>
     <tr>
       <td class="title">视频数量</td>
       <td>
         <el-input v-if="allowEdit" v-model="viewData.videocount" placeholder="请输入视频数量"></el-input>
         <div class="txt-css" v-else>{{viewData.videocount}}</div>
         <div class="diff-css" v-if="historyData && historyData.videocount && historyData.videocount != '' && viewData.videocount != historyData.videocount">{{historyData.videocount}}</div>
       </td>
       <td class="title">视频分类<span v-if="allowEdit">*</span></td>
       <td>
         <el-select v-if="allowEdit" v-model="viewData.videoclass" placeholder="请选择视频分类">
           <el-option
              v-for="item in videoclassOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
         </el-select>
         <div class="txt-css" v-else>{{fieldsData.videoclass[viewData.videoclass]}}</div>
         <div class="diff-css" v-if="historyData && historyData.videoclass && historyData.videoclass != '' && viewData.videoclass != historyData.videoclass">{{fieldsData.videotype[historyData.videoclass]}}</div>
        </td>
      </tr>
     <tr>
       <td class="title">立项日期<span v-if="allowEdit">*</span></td>
       <td>
         <el-date-picker
            v-if="allowEdit"
            v-model="viewData.v_starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择立项日期">
          </el-date-picker>
         <div class="txt-css" v-else>{{viewData.starttime_str}}</div>
         <div class="diff-css" v-if="historyData && historyData.starttime && historyData.starttime != '' && viewData.starttime != historyData.starttime">{{historyData.starttime_str}}</div>
        </td>
        <td class="title">交付日期<span v-if="allowEdit">*</span></td>
        <td>
          <el-date-picker
             v-if="allowEdit"
             v-model="viewData.v_endtime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择交付日期">
           </el-date-picker>
          <div class="txt-css" v-else>{{viewData.endtime_str}}</div>
          <div class="diff-css" v-if="historyData && historyData.endtime && historyData.endtime != '' && viewData.endtime != historyData.endtime">{{historyData.endtime_str}}</div>
        </td>
      </tr>
    <tr>
      <td class="title">全片LOGO<span v-if="allowEdit">*</span></td>
      <td>
        <el-select v-if="allowEdit" v-model="viewData.logo_all" placeholder="请选择全片LOGO">
          <el-option
            v-for="item in logo_allOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="txt-css" v-else>{{fieldsData.logo_all[viewData.logo_all]}}</div>
        <div class="diff-css" v-if="historyData && historyData.logo_all && historyData.logo_all != '' && viewData.logo_all != historyData.logo_all">{{fieldsData.videotype[historyData.logo_all]}}</div>
      </td>
      <td class="title">片尾LOGO<span v-if="allowEdit">*</span></td>
      <td>
        <el-select v-if="allowEdit" v-model="viewData.logo_end" placeholder="请选择片尾LOGO">
          <el-option
            v-for="item in logo_endOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="txt-css" v-else>{{fieldsData.logo_end[viewData.logo_end]}}</div>
        <div class="diff-css" v-if="historyData && historyData.logo_end && historyData.logo_end != '' && viewData.logo_end != historyData.logo_end">{{fieldsData.videotype[historyData.logo_end]}}</div>
      </td>
     </tr>
     <tr>
       <td class="title"><template v-if="allowEdit">上传附件</template><template v-else>附件</template></td>
       <td colspan="3" class="align_left">
         <div v-if="allowEdit" class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo upload-new"
            ref="upload1"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="afterUpload"
            :on-error="uploadError"
            :file-list="fileList"
            :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="success">上传文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload1')" v-if="disUploadBtn">上传文件</el-button> -->
            </el-upload>
        </div>
        <div v-else class="file-list">
          <div class="file-item" v-for="(item,index) in fileList" :key="index" :item="item">
            <a type="primary" :href="item.url" style="color: #409EFF;" :download="item.url" target="_blank">{{item.name}}</a>
           </div>
        </div>
       </td>
     </tr>
     <tr>
       <td class="title">相关链接</td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.linkurl" placeholder="请输入相关链接"></el-input>
         <div class="txt-css" v-else>{{viewData.linkurl}}</div>
         <div class="diff-css" v-if="historyData && historyData.linkurl && historyData.linkurl != '' && viewData.linkurl != historyData.linkurl">{{historyData.linkurl}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">客户诉求</td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.customerdemand" placeholder="请输入投诉内容"></el-input>
         <div class="txt-css" v-else>{{viewData.customerdemand}}</div>
         <div class="diff-css" v-if="historyData && historyData.customerdemand && historyData.customerdemand != '' && viewData.customerdemand != historyData.customerdemand">{{historyData.customerdemand}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">客户信息</td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.customerinfo" placeholder="请输入客户信息"></el-input>
         <div class="txt-css" v-else>{{viewData.customerinfo}}</div>
         <div class="diff-css" v-if="historyData && historyData.customerinfo && historyData.customerinfo != '' && viewData.customerinfo != historyData.customerinfo">{{historyData.customerinfo}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">产品定位</td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.productorientation" placeholder="请输入产品定位"></el-input>
         <div class="txt-css" v-else>{{viewData.productorientation}}</div>
         <div class="diff-css" v-if="historyData && historyData.productorientation && historyData.productorientation != '' && viewData.productorientation != historyData.productorientation">{{historyData.productorientation}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">
         <div>产品卖点</div>
         <div class="font12 color-gray5">（核心卖点需标注）</div>
       </td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.sellerpoint" placeholder="请输入产品卖点"></el-input>
         <div class="txt-css" v-else>{{viewData.sellerpoint}}</div>
         <div class="diff-css" v-if="historyData && historyData.sellerpoint && historyData.sellerpoint != '' && viewData.sellerpoint != historyData.sellerpoint">{{historyData.sellerpoint}}</div>
       </td>
     </tr>
     <tr>
       <td class="title">
         <div>视频内必须展示的</div>
         <div>关键信息<span v-if="allowEdit">*</span></div>
       </td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.keyinfo" placeholder="请输入关键信息"></el-input>
         <div class="txt-css" v-else>{{viewData.keyinfo}}</div>
         <div class="diff-css" v-if="historyData && historyData.keyinfo && historyData.keyinfo != '' && viewData.keyinfo != historyData.keyinfo">{{historyData.keyinfo}}</div>
       </td>
     </tr>
     <tr v-if="viewData.status >= 2 && !isCustomer">
       <td class="title">拍摄价格</td>
       <td colspan="3" class="txt-css">{{viewData.price_out}}</td>
     </tr>
     <tr>
       <td class="title">创意思路</td>
       <td colspan="3">
         <el-input v-if="allowEdit" type="textarea" v-model="viewData.customeridea" placeholder="请输入创意思路"></el-input>
         <div class="txt-css" v-else>{{viewData.customeridea}}</div>
         <div class="diff-css" v-if="historyData && historyData.customeridea && historyData.customeridea != '' && viewData.customeridea != historyData.customeridea">{{historyData.customeridea}}</div>
       </td>
     </tr>
     <tr v-if="isManager || isSale">
       <td class="title">客户资料</td>
       <td colspan="3" class="txt-css">{{viewData.customerdata}}</td>
     </tr>
     <tr>
       <td class="title">特殊备注</td>
       <td :colspan="`${(isManager || isSale) ? 1 : 3}`">
         <el-input v-if="allowEdit" v-model="viewData.otherdemand" placeholder="请输入特殊备注"></el-input>
         <div class="txt-css" v-else>{{viewData.otherdemand}}</div>
         <div class="diff-css" v-if="historyData && historyData.otherdemand && historyData.otherdemand != '' && viewData.otherdemand != historyData.otherdemand">{{historyData.otherdemand}}</div>
       </td>
       <td class="title" v-if="isManager || isSale">制作价格</td>
       <td v-if="isManager || isSale">
         <el-input v-if="allowEdit" v-model="viewData.price" placeholder="请输入制作价格"></el-input>
         <div class="txt-css" v-else>{{viewData.price}}</div>
         <div class="diff-css" v-if="historyData && historyData.price && historyData.price != '' && viewData.price != historyData.price">{{historyData.price}}</div>
       </td>
     </tr>
     <!-- <tr v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">
       <td class="title">创意梗概</td>
       <td colspan="3">
         <el-input type="textarea" v-model="viewData.myidea" placeholder="请输入创意梗概"></el-input>
         <div class="diff-css" v-if="historyData && historyData.myidea && historyData.myidea != '' && viewData.myidea != historyData.myidea">{{historyData.myidea}}</div>
       </td>
     </tr> -->
     <tr v-if="viewData.status >= 3">
       <td class="title">创意梗概</td>
       <td colspan="3" class="txt-css">
         <div class="pt10 pb10" v-if="viewData.confirmedideaObject">
           <div class="w_100" style="border:#ccc 1px solid;">
             <div class="flex_left w_100 b_bottom_after pt5 pb5">
               <div style="width:100px;text-align:center;">场景</div>
               <div class="flex_cell align_left pl5 pr5">{{viewData.confirmedideaObject.changjing}}</div>
             </div>
             <div class="flex_left w_100 b_bottom_after pt5 pb5">
               <div style="width:100px;text-align:center;">人物和关系</div>
               <div class="flex_cell align_left pl5 pr5">{{viewData.confirmedideaObject.rwgx}}</div>
             </div>
             <div class="flex_left w_100 b_bottom_after pt5 pb5">
               <div style="width:100px;text-align:center;">剧情概括</div>
               <div class="flex_cell align_left pl5 pr5">{{viewData.confirmedideaObject.juqing}}</div>
             </div>
             <div class="flex_left w_100 b_bottom_after pt5 pb5">
               <div style="width:100px;text-align:center;">重点部分</div>
               <div class="flex_cell align_left pl5 pr5">{{viewData.confirmedideaObject.zhongdian}}</div>
             </div>
             <div class="flex_left w_100 pt5 pb5">
               <div style="width:100px;text-align:center;">视频风格</div>
               <div class="flex_cell align_left pl5 pr5">{{viewData.confirmedideaObject.fengge}}</div>
             </div>
           </div>
         </div>
       </td>
     </tr>
     <tr v-if="viewData.status === 5 && query.type">
       <td class="title">上传演员身份证及肖像权协议扫描件<span>（只能上传图片）</span></td>
       <td colspan="3" class="align_left">
         <div class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo upload-new"
            ref="upload2"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange1"
            :on-remove="handleRemove1"
            :on-success="afterUpload1"
            :on-error="uploadError"
            :file-list="photos"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            >
              <el-button slot="trigger" size="small" type="success">上传文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload2')" v-if="disUploadBtn1">上传文件</el-button> -->
            </el-upload>
        </div>
       </td>
     </tr>
     <tr v-if="(viewData.status === 5 || viewData.status === 6)&&query.type">
       <td class="title">{{viewData.status === 5 ? '上传样片' : '上传成片'}}<span>（只能上传一项）</span></td>
       <td colspan="3" class="align_left">
         <div class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo upload-new"
            ref="upload3"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange2"
            :on-remove="handleRemove2"
            :on-success="afterUpload2"
            :on-error="uploadError"
            :file-list="samplePiece"
            :auto-upload="false"
            :limit="1"
            >
              <el-button slot="trigger" size="small" type="success">上传文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload3')" v-if="disUploadBtn2">上传文件</el-button> -->
            </el-upload>
        </div>
       </td>
     </tr>
     <tr v-if="(viewData.status === 5 || viewData.status === 6)&&query.type">
       <td class="title">{{viewData.status === 5 ? '样片备注' : '成片备注'}}</td>
       <td colspan="3">
         <el-input v-model="memo" placeholder="请输入备注"></el-input>
       </td>
     </tr>
     <tr v-if="controlBtn.length">
       <td class="padding10 align_center" colspan="4">
         <el-button v-for="(item,index) in controlBtn" :key="index" :type="item.type" @click="buttonEvent(item.id)">{{item.title}}</el-button>
       </td>
     </tr>
   </table>
   <div v-if="viewData.status == 2 && viewData.caninviteinfo" class="scroll-container user-table" ref="scrollContainer2" @scroll="handleScroll2('scrollContainer2',0)">
     <template v-if="disTabData2">
       <el-table
         :data="tableData2"
         stripe
         style="width: 100%"
         highlight-current-row
         @current-change="handleCurrentChange"
         :header-cell-style="{'text-align':'center'}"
         :cell-style="{'text-align':'center'}">
           <!-- <el-table-column
             label="选择"
             min-width="60">
               <template slot-scope="scope">
                 <el-radio size="medium" v-model="ideaRadio" :label="scope.row.uid"><i></i></el-radio>
               </template>
           </el-table-column> -->
           <el-table-column
             prop="version"
             v-if="isInvitor"
             label="版本号"
             min-width="80">
           </el-table-column>
           <el-table-column
            v-if="isManager || isSale"
             prop="linkman"
             label="供应商"
             min-width="100">
           </el-table-column>
           <el-table-column
            v-if="isManager || isSale"
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
               <!-- <template v-if="viewData.status == 3">
                 <template v-if="!scope.row.confirmedidea || scope.row.confirmedidea == ''">无</template>
                 <template v-else>{{scope.row.confirmedidea}}</template>
               </template>
               <template v-else> -->
                 <template v-if="!scope.row.idea || scope.row.idea == ''">无</template>
                 <template v-else>
                   <div class="w_100" style="border:#ccc 1px solid;">
                     <div class="flex_left w_100 b_bottom_after pt5 pb5">
                       <div style="width:100px;text-align:center;">场景</div>
                       <div class="flex_cell align_left pl5 pr5">{{scope.row.ideaObject.changjing}}</div>
                     </div>
                     <div class="flex_left w_100 b_bottom_after pt5 pb5">
                       <div style="width:100px;text-align:center;">人物和关系</div>
                       <div class="flex_cell align_left pl5 pr5">{{scope.row.ideaObject.rwgx}}</div>
                     </div>
                     <div class="flex_left w_100 b_bottom_after pt5 pb5">
                       <div style="width:100px;text-align:center;">剧情概括</div>
                       <div class="flex_cell align_left pl5 pr5">{{scope.row.ideaObject.juqing}}</div>
                     </div>
                     <div class="flex_left w_100 b_bottom_after pt5 pb5">
                       <div style="width:100px;text-align:center;">重点部分</div>
                       <div class="flex_cell align_left pl5 pr5">{{scope.row.ideaObject.zhongdian}}</div>
                     </div>
                     <div class="flex_left w_100 pt5 pb5">
                       <div style="width:100px;text-align:center;">视频风格</div>
                       <div class="flex_cell align_left pl5 pr5">{{scope.row.ideaObject.fengge}}</div>
                     </div>
                   </div>
                 </template>
               <!-- </template> -->
             </template>
           </el-table-column>
           <el-table-column
             v-if="!isCustomer"
             label="审核意见"
             min-width="120">
             <template slot-scope="scope">
               <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
               <template v-else>{{scope.row.checkresult}}</template>
             </template>
           </el-table-column>
           <el-table-column
             v-if="!isCustomer"
             label="审核状态"
             min-width="120">
             <template slot-scope="scope">{{scope.row.statusdesc}}</template>
           </el-table-column>
           <el-table-column
             v-if="isManager || isSale"
             label="客户意见"
             min-width="120">
             <template slot-scope="scope">
               <template v-if="!scope.row.customeradvice || scope.row.customeradvice == ''">无</template>
               <template v-else>{{scope.row.customeradvice}}</template>
             </template>
           </el-table-column>
           <el-table-column
             label="操作"
             class="align_center"
             min-width="120">
               <template slot-scope="scope">
                 <template v-if="isCustomer">
                   <div>
                     <el-button size="mini" type="primary" @click="clickIdeaCustomer(scope.row)">确认</el-button>
                   </div>
                   <div class="mt10">
                     <el-button size="mini" type="primary" @click="clickBack(scope.row)">驳回</el-button>
                   </div>
                 </template>
                 <template v-else>
                   <!-- <div v-if="scope.row.canedit">
                     <el-button size="mini" type="primary" @click="changeIdea(scope.row)">修改</el-button>
                   </div>
                   <div v-if="scope.row.cancheck" :class="`${scope.row.canedit ? 'mt10' : ''}`">
                     <el-button size="mini" type="primary" @click="clickIdeaCustomer(scope.row)">提交客户</el-button>
                   </div> -->
                   <div v-if="scope.row.canedit">
                     <el-button size="mini" type="primary" @click="changeIdea(scope.row)">修改并送审</el-button>
                   </div>
                   <div v-if="scope.row.cancheck" :class="`${scope.row.canedit ? 'mt10' : ''}`">
                     <el-button size="mini" type="primary" @click="clickBack(scope.row)">驳回重新创意</el-button>
                   </div>
                 </template>
               </template>
           </el-table-column>
       </el-table>
      <div class="align_center mt20" v-if="viewData.status == 2 && (isManager || isSale)">
        <el-button
          type="primary"
          @click="chooseUser">新增邀请</el-button>
      </div>
     </template>
   </div>
   <div class="scroll-container" v-if="viewData.ideas && viewData.ideas.length && viewData.status === 3">
     <el-table
       :data="viewData.ideas"
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
          v-if="!isCustomer && !isSupplier"
           label="客户意见"
           min-width="120">
           <template slot-scope="scope">
             <template v-if="!scope.row.customeradvice || scope.row.customeradvice == ''">无</template>
             <template v-else>{{scope.row.customeradvice}}</template>
           </template>
         </el-table-column>
         <el-table-column
           :label="isCustomer ? '我的意见' : '审核意见'"
           min-width="120">
             <template slot-scope="scope">
               <template v-if="isCustomer">
                 <template v-if="!scope.row.customeradvice || scope.row.customeradvice == ''">无</template>
                 <template v-else>{{scope.row.customeradvice}}</template>
               </template>
               <template v-else>
                 <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
                 <template v-else>{{scope.row.checkresult}}</template>
               </template>
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
           v-if="viewData.status === 3"
           label="操作"
           min-width="120">
           <template slot-scope="scope">
             <template v-if="scope.row.cancheck === 1">
               <el-button v-if="scope.row.moderate == 4" type="primary" @click="handleExamine(scope.row.id, 'trans', scope.row)">转交供应商</el-button>
               <el-button v-else type="primary" @click="handleExamine(scope.row.id, 'censor')">审批</el-button>
             </template>
           </template>
         </el-table-column>
     </el-table>
      <div class="align_center mt20" v-if="viewData.status === 2">
        <el-button type="primary" @click="onSubmit2">提交选择</el-button>
        <el-button type="primary" @click="chooseUser">新增邀请</el-button>
      </div>
   </div>
   <div class="scroll-container mb20" v-if="disTabData4">
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
           type="index"
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
         :label="viewData.title"
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
         :label="fieldsData.ratio[viewData.ratio]"
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
         :label="viewData.demandno"
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
   </div>
   <div class="auto-modal flex_center" style="position:fixed;" v-if="showExamine">
     <div class="modal-inner">
       <div class="modal-content padding20">
           <div class="modal-header mb20" v-if="modalType != 'trans'">
             <el-radio-group v-model="radio" @change="changeExamine">
               <template v-if="modalType == 'censor'">
                 <el-radio :label= "1">创意通过</el-radio>
                 <el-radio :label= "2">创意不通过</el-radio>
               </template>
               <template v-else>
                 <el-radio :label= "1">需求确认</el-radio>
                 <el-radio :label= "2">需求驳回</el-radio>
               </template>
             </el-radio-group>
           </div>
           <div class="modal-body mb20">
             <div class="from-item-textarea">
               <el-input type="textarea" v-model="reason" placeholder="请输入原因" size="50"></el-input>
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
             <div class="modal-header mb20 align_center">选择用户</div>
             <div class="modal-body mb20">
               <template v-if="viewData.status == 1 && (isManager || isSale)">
                 <div class="flex_left">
                   <div class="pr10">项目来源</div>
                   <el-select class="flex_cell" v-model="viewData.comefrom" placeholder="请选择项目来源">
                     <el-option
                        v-for="item in comefromOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                     </el-option>
                    </el-select>
                 </div>
                 <div class="flex_left mt10">
                   <div class="pr10">视频价格</div>
                   <el-select v-model="viewData.pricetype" placeholder="请选择视频价格">
                     <el-option
                       v-for="item in pricetypeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                 </div>
                 <div class="flex_left mt10 mb10">
                   <div class="pr10">拍摄价格</div>
                   <el-input class="flex_cell" v-model="viewData.price_out" placeholder="请输入拍摄价格"></el-input>
                 </div>
               </template>
               <div>
                 <el-input placeholder="请输入用户名称搜索" v-model="keyword" @keyup.enter.native="kwChange">
                   <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
                 </el-input>
               </div>
               <el-card class="box-card users-box scroll-container mt10" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
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
               </el-card>
               <!-- <div class="users-box scroll-container" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
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
               </div> -->
             </div>
             <div class="modal-footer flex_right">
               <el-button @click="closeUserModal">取消</el-button>
               <el-button class="" type="primary" @click="submitUserModal">分发</el-button>
             </div>
         </div>
       </div>
     </div>
   </div>
   <el-dialog
     class="inviteDialog"
     :title="dialogTitle"
     :visible.sync="showUserDialog"
     width="60%"
     :before-close="closeUserDialog">
     <div>
       <el-input placeholder="手机号" v-model="uPhone" type="tel">
         <template slot="prepend">手机号</template>
         <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
       </el-input>
     </div>
     <div class="mt10">
       <el-input v-model="uName" :disabled="true">
         <template slot="prepend">姓名</template>
       </el-input>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="showUserDialog = false">取 消</el-button>
       <el-button type="primary" @click="submitUserEvent">确 定</el-button>
     </span>
   </el-dialog>
   <el-dialog
     class="inviteDialog"
     title="驳回"
     :visible.sync="showBackDialog"
     width="60%">
     <div class="pb10" style="color:#f56c6c;">此行为将导致本创意梗概失效，请谨慎驳回。</div>
     <div>
       <el-input placeholder="请输入驳回原因" v-model="backReason" type="textarea" :rows="10"></el-input>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="showBackDialog = false">取 消</el-button>
       <el-button type="primary" @click="submitBack">确 定</el-button>
     </span>
   </el-dialog>
   <el-dialog
     title="创意梗概"
     :visible.sync="showIdeaDialog"
     width="80%">
     <div>
      <table :class="`idea-table ${(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier) ? 'three-col' : ''}`">
        <tr>
          <td>项目</td>
          <td>请按照如下格式编写创意梗概，注意控制字数</td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">举例</td>
        </tr>
        <tr>
          <td>场景</td>
          <td>
            <el-input v-model="ideaObject.changjing" maxlength="30" placeholder="交代场景(一两组词)【30字以内】"></el-input>
          </td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">办公室内</td>
        </tr>
        <tr>
          <td>人物和关系</td>
          <td>
            <el-input v-model="ideaObject.rwgx" maxlength="30" placeholder="交代人物(含性别年龄)和关系【30字以内】"></el-input>
          </td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">男女两位同事</td>
        </tr>
        <tr>
          <td>剧情概括</td>
          <td>
            <el-input
              v-model="ideaObject.juqing"
              maxlength="150"
              type="textarea"
              :rows="10"
              placeholder="剧情的简单描述，不需要体现台词，不需要画面感，仅提供创意方向和剧情梗概【150字以内】">
            </el-input>
          </td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">男主朋友亲属患重疾呼吁捐款，一边给朋友捐款转账一边跟身旁的女主议论，说如果家里亲属患重疾真的对家庭压力大，朋友们捐这点儿估计也帮不上大忙，女主很同意男主观点，说自己一直想给家人申请重疾险，最近看了个比较好的产品，拿出手机跟男主一起研究产品和服务内容，最后双双提出了申请，还招呼镜头前的观众一起申请。</td>
        </tr>
        <tr>
          <td>重点部分</td>
          <td>
            <el-input v-model="ideaObject.zhongdian" maxlength="30" placeholder="例如如何引出广告产品（服务）【30字以内】"></el-input>
          </td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">女同事拿出手机，录屏出产品介绍。</td>
        </tr>
        <tr>
          <td>视频风格</td>
          <td>
            <el-input v-model="ideaObject.fengge" maxlength="30" placeholder="描述视频风格【30字以内】"></el-input>
          </td>
          <td v-if="(viewData.status == 2 && isInvitor) || (viewData.status == 3 && isSupplier)">从凝重到轻松。</td>
        </tr>
      </table>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="showIdeaDialog = false">取 消</el-button>
       <el-button type="primary" @click="submitIdeaEvent">提交审核</el-button>
     </span>
   </el-dialog>
   <el-dialog
     title="选择供应商"
     :visible.sync="showSupplyDialog"
     width="80%">
     <div v-if="disSupplyList">
       <div v-if="!supplyData.length">暂无可选供应商</div>
       <template v-else>
         <el-radio-group v-model="selectedSuid">
          <el-radio v-for="(item,index) in supplyData" :key="index" :label="item.uid">{{item.linkman}}</el-radio>
        </el-radio-group>
      </template>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="showBackDialog = false">取 消</el-button>
       <el-button type="primary" @click="submitSupply">确 定</el-button>
     </span>
   </el-dialog>
  </div>
</template>
<script>
import ENV from 'env'
import Reg from '#/reg'
import Time from '#/time'
import {User, Token} from '#/storage'
export default {
  components: {},
  data () {
    return {
      loginUser: {},
      query: {},
      durationOptions: [],
      ratioOptions: [],
      videoclassOptions: [],
      logo_allOptions: [],
      logo_endOptions: [],
      videotypeOptions: [],
      comefromOptions: [],
      pricetypeOptions: [],
      issubmit: false,
      limit: 20,
      tableData: [],
      pageStart: 0,
      disTabData: false,
      tableData2: [],
      pageStart2: 0,
      disTabData2: false,
      keyword: '',
      showExamine: false,
      radio: 1,
      reason: '',
      examineIndex: '',
      showChooseUser: false,
      checkList: [],
      isLoading: false,
      censorid: 0,
      ideaRadio: '',
      uploadApi: ENV.BokaApi + '/api/upload/singleFile?field=photo',
      uploadHeaders: {},
      fileList: [],
      disUploadBtn: false,
      samplePiece: [],
      memo: '',
      disTabData4: false,
      tableData4: [],
      photos: [],
      viewData: {},
      historyData: {},
      allowEdit: true,
      fieldsData: {},
      isManager: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false, // 3:供应商
      isInvitor: false, // 被邀请者
      controlBtn: [],
      inviteObject: {},
      modalType: '',
      disUploadBtn1: false,
      disUploadBtn2: false,
      showSos: false,
      sosTxt: '',
      showUserDialog: false,
      uName: '',
      uPhone: '',
      submitUser: null,
      dialogTitle: '',
      selectedIdeaData: null,
      ideaObject: {},
      backReason: '',
      showBackDialog: false,
      showIdeaDialog: false,
      supplyData: [],
      disSupplyList: false,
      selectedSuid: 0,
      showSupplyDialog: false
    }
  },
  methods: {
    toBack () {
      window.history.go(-1)
    },
    submitSupply () {
      if (this.issubmit) return false
      if (!this.selectedSuid) {
        this.$vux.toast.text('请选择供应商', 'middle')
        return false
      }
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/selectIdea?id=$demandid&suid=`, {
        id: this.query.id, suid: this.selectedSuid
      }).then(res => {
        this.$vux.loading.hide()
        this.issubmit = false
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
      })
    },
    changeIdea (itemdata) {
      this.selectedIdeaData = itemdata
      this.ideaObject = itemdata.ideaObject
      this.showIdeaDialog = true
    },
    clickIdeaCustomer (itemdata) {
      this.selectedIdeaData = itemdata
      let tip = '确定要提交客户吗？'
      if (this.isCustomer) tip = '确定要确认这个创意吗？'
      this.$vux.confirm.show({
        content: tip,
        onConfirm: () => {
          this.issubmit = true
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/demands/censor`, {
            module: 'ideas', id: this.selectedIdeaData.ideaid, agree: 1
          }).then(res => {
            this.$vux.loading.hide()
            this.issubmit = false
            let data = res.data
            this.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  this.refresh()
                }
              }
            })
          })
        }
      })
    },
    clickBack (itemdata) {
      this.selectedIdeaData = itemdata
      this.backReason = ''
      this.showBackDialog = true
    },
    submitBack () {
      if (this.issubmit) return false
      if (this.backReason === '') {
        this.$vux.toast.text('请输入驳回原因', 'middle')
        return false
      }
      this.issubmit = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/censor`, {
        module: 'ideas', id: this.selectedIdeaData.ideaid, agree: 0, reason: this.backReason
      }).then(res => {
        this.issubmit = false
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              this.refresh()
            }
          }
        })
      })
    },
    submitIdeaEvent () {
      if (this.issubmit) return false
      let ideaParams = {...this.ideaObject}
      let changjing = this.$util.trim(ideaParams.changjing)
      let rwgx = this.$util.trim(ideaParams.rwgx)
      let juqing = this.$util.trim(ideaParams.juqing)
      let zhongdian = this.$util.trim(ideaParams.zhongdian)
      let fengge = this.$util.trim(ideaParams.fengge)
      if (changjing === '' || rwgx === '' || juqing === '' || zhongdian === '' || fengge === '') {
        this.$vux.toast.text('请补全创意信息', 'middle')
        return false
      }
      this.issubmit = true
      let postData = {id: this.query.id, idea: JSON.stringify(ideaParams)}
      if (this.selectedIdeaData && this.selectedIdeaData.ideaid) {
        postData.ideaid = this.selectedIdeaData.ideaid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/addIdea`, postData).then(res => {
        this.issubmit = false
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              this.refresh()
            }
          }
        })
      })
    },
    closeUserDialog () {
      this.showUserDialog = false
      this.uName = ''
      this.uPhone = ''
    },
    searchUser () {
      if (this.issubmit) return false
      this.uName = ''
      this.submitUser = null
      if (this.uPhone === '') {
        this.$vux.toast.text('请输入手机号', 'middle')
        return false
      }
      if (!Reg.rPhone.test(this.uPhone)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
        return false
      }
      this.$http.post(`${ENV.BokaApi}/api/user/getList`, {
        keyword: this.uPhone
      }).then(res => {
        this.$vux.loading.hide()
        this.issubmit = false
        const data = res.data
        if (data.flag) {
          const retdata = data.data
          if (!retdata.length) {
            this.$vux.toast.text('暂无搜索结果', 'middle')
            return false
          }
          this.uName = retdata[0].linkman
          this.submitUser = retdata[0]
        } else {
          this.$vux.toast.text(data.error, 'middle')
        }
      })
    },
    submitUserEvent () {
      if (this.issubmit) return false
      if (!this.submitUser || !this.submitUser.uid) {
        this.$vux.toast.text('请先搜索用户', 'middle')
        return false
      }
      this.issubmit = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/addCustomer`, {
        demandid: this.query.id, name: this.submitUser.linkman, mobile: this.submitUser.mobile
      }).then(res => {
        this.$vux.loading.hide()
        this.issubmit = false
        const data = res.data
        this.$vux.toast.text(data.error, 'middle')
        if (data.flag) {
          this.showUserDialog = false
        }
      })
    },
    toFenjing () {
      let params = {id: parseInt(this.query.id)}
      if (this.query.type) params.type = this.query.type
      this.$router.push({path: '/fenjing', query: params})
    },
    handleBtn () {
      this.controlBtn = []
      if (this.viewData.status >= 0 && this.viewData.status < 100 && this.isManager) {
        this.controlBtn.push({id: 1, title: '指派业务员', type: 'warning'})
      }
      if (this.viewData.status > 0 && (this.isCustomer)) {
        this.controlBtn.push({id: 12, title: '邀请共审', type: 'warning'})
      }
      if (this.viewData.canedit) {
        this.controlBtn.push({id: 2, title: '保存修改', type: 'success'})
        this.controlBtn.push({id: 15, title: '确认修改并退出', type: 'success'})
      }
      if (this.viewData.cancensor) {
        this.controlBtn.push({id: 3, title: '需求确认', type: 'danger'})
      }
      if (this.viewData.status === 1 && (this.isManager || this.isSale)) {
        this.controlBtn.push({id: 4, title: '分发', type: 'primary'})
      }
      if (this.viewData.status === 4 && !this.isInvitor) {
        this.controlBtn.push({id: 5, title: '分镜脚本', type: 'primary'})
      }
      if ((this.viewData.status === 2 && this.isInvitor) || (this.viewData.status === 3 && this.isSupplier)) {
        this.controlBtn.push({id: 6, title: '编写创意梗概', type: 'success'})
      }
      // 修改创意梗概
      // if ((this.viewData.status === 2 && this.isInvitor) || (this.viewData.status === 3 && this.isSupplier)) {
      //   this.controlBtn.push({id: 7, title: '修改创意', type: 'success'})
      // }
      if (this.query.type) {
        if (this.query.type === 'ongoing') {
          if (this.viewData.status === 5) {
            this.controlBtn.push({id: 8, title: '上传样片', type: 'primary'})
          }
          if (this.viewData.status === 6) {
            this.controlBtn.push({id: 9, title: '上传成片', type: 'primary'})
          }
        }
      }
      if (this.viewData.cancheckrush) {
        this.controlBtn.push({id: 10, title: '审核样片', type: 'success'})
      }
      if (this.viewData.cancheckfinal) {
        this.controlBtn.push({id: 11, title: '审核成片', type: 'success'})
      }
      if (this.viewData.canaddcustomer && this.viewData.status === 0) {
        this.controlBtn.push({id: 13, title: '添加客户', type: 'primary'})
      }
      if (this.viewData.status === 3 && (this.isManager || this.isSale)) {
        this.controlBtn.push({id: 14, title: '选择供应商', type: 'warning'})
      }
    },
    buttonEvent (id) {
      switch (id) {
        case 1:
          // 指派业务员 viewData.status < 100 && (isManager || isSale)
          this.$router.push({path: '/assignSale', query: {id: this.query.id}})
          break
        case 2:
          // 保存修改 viewData.canedit === 1
          this.onSubmit()
          break
        case 15:
          // 确认修改并退出 viewData.canedit === 1
          this.onSubmit(true)
          break
        case 3:
          // 需求确认 viewData.cancensor === 1
          this.handleExamine(parseInt(this.query.id))
          break
        case 4:
          // 分发 viewData.status === 1 && !isCustomer
          this.chooseUser()
          break
        case 5:
          // 分镜脚本 viewData.status === 4 && !isInvitor
          this.toFenjing()
          break
        case 6:
          // 提交创意 编写创意梗概 (this.viewData.status === 2 && this.isInvitor) || (this.viewData.status === 3 && this.isSupplier)
          this.showIdeaDialog = true
          break
        case 7:
          // 修改创意梗概 (this.viewData.status === 2 && this.isInvitor) || (this.viewData.status === 3 && this.isSupplier)
          this.showIdeaDialog = true
          break
        case 8:
          // 上传样片 query.type === 'ongoing' && viewData.status === 5
          this.uploadSamplePiece()
          break
        case 9:
          // 上传成片 query.type === 'ongoing' && viewData.status === 6
          this.uploadFinalVideo()
          break
        case 10:
          // 审核样片 this.viewData.cancheckrush
          this.toFenjing()
          break
        case 11:
          // 审核成片 !query.type && viewData.status === 6
          this.toFenjing()
          break
        case 12:
          // 邀请共审 viewData.status > 0 && isCustomer
          this.dialogTitle = '邀请共审'
          this.showUserDialog = true
          break
        case 13:
          // 添加客户 this.viewData.canedit && (this.isManager || this.isSale)
          this.dialogTitle = '添加客户'
          this.showUserDialog = true
          break
        case 14:
          // 选择供应商 this.viewData.status === 3 && (this.isManager || this.isSale)
          this.showSupplyDialog = true
          break
      }
    },
    onSubmit (isExit) {
      if (this.issubmit) return false
      let params = {
        title: this.viewData.title,
        starttime: this.viewData.v_starttime,
        endtime: this.viewData.v_endtime,
        duration: this.viewData.duration,
        ratio: this.viewData.ratio,
        videoclass: this.viewData.videoclass,
        logo_all: this.viewData.logo_all,
        logo_end: this.viewData.logo_end,
        price: this.viewData.price,
        videocount: this.viewData.videocount,
        videotype: this.viewData.videotype,
        attachment: '',
        brand: this.viewData.brand,
        product: this.viewData.product,
        target: this.viewData.target,
        linkurl: this.viewData.linkurl,
        customerdemand: this.viewData.customerdemand,
        customerinfo: this.viewData.customerinfo,
        productorientation: this.viewData.productorientation,
        sellerpoint: this.viewData.sellerpoint,
        keyinfo: this.viewData.keyinfo,
        otherdemand: this.viewData.otherdemand,
        customeridea: this.viewData.customeridea
      }
      if (this.query.id) params.id = parseInt(this.query.id)
      let attachment = []
      for (let i = 0; i < this.fileList.length; i++) {
        let cur = this.fileList[i]
        if (cur.issuccess) {
          attachment.push(cur.name)
        }
      }
      if (attachment.length) params.attachment = attachment.join(',')
      let iscontinue = true
      let requiredData = ['title', 'starttime', 'endtime', 'duration', 'ratio', 'videoclass', 'logo_all', 'logo_end', 'videotype', 'keyinfo']
      for (let i = 0; i < requiredData.length; i++) {
        let curName = requiredData[i]
        if (this.$util.trim(params[curName]) === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      if (params.endtime <= params.starttime) {
        this.$vux.toast.text('交付日期必须大于立项日期', 'middle')
        return false
      }
      if (params.price !== '' && (isNaN(params.price) || parseFloat(params.price) <= 0 || parseFloat(params.price).length > 7)) {
        this.$vux.toast.text('请输入正确的制作价格', 'middle')
        return false
      }
      var rule1 = /^(0|[1-9][0-9]*)$/
      if (params.videocount !== '' && (isNaN(params.videocount) || parseFloat(params.videocount) <= 0 || !rule1.test(params.videocount))) {
        this.$vux.toast.text('请输入正确的视频数量', 'middle')
        return false
      }
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/add`, params).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              if (isExit) {
                window.history.go(-1)
              } else {
                this.issubmit = false
                this.refresh()
              }
            } else {
              this.issubmit = false
            }
          }
        })
      })
    },
    handleExamine (id, type, item) {
      if (type && type !== '') {
        this.modalType = type
        if (type === 'trans' && item) {
          this.reason = `【客户意见】${item.customeradvice}`
        }
      } else {
        this.modalType = ''
      }
      this.showExamine = true
      if (id) this.censorid = id
    },
    changeExamine () {
      this.reason = ''
    },
    closeModal () {
      this.showExamine = false
      this.reason = ''
      this.radio = 1
    },
    submitModal () {
      if (this.radio === 2 && this.reason === '') {
        this.$vux.toast.text('请填写原因', 'middle')
        return false
      }
      let params = {id: this.censorid, agree: this.radio}
      if (this.reason) params.reason = this.reason
      if (this.modalType && this.modalType !== '') {
        params.module = 'ideas'
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/censor`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.closeModal()
          this.getInfo()
          if (this.isManager || this.isSale) {
            this.$router.push({path: '/makeList', query: {status: data.status}})
          } else {
            this.$router.push({path: '/makeUserList', query: {status: data.status}})
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
      if (this.issubmit) return false
      let params = {
        uids: this.checkList,
        id: parseInt(this.query.id)
      }
      if (this.viewData.status === 1 && (this.isManager || this.isSale)) {
        params = {
          ...params,
          comefrom: this.viewData.comefrom,
          pricetype: this.viewData.pricetype,
          price_out: this.viewData.price_out
        }
        if (params.comefrom === '' || params.pricetype === '' || params.price_out === '') {
          this.$vux.toast.text('请补全信息', 'middle')
          return false
        }
        if ((isNaN(params.price_out) || parseFloat(params.price_out) <= 0 || parseFloat(params.price_out).length > 7)) {
          this.$vux.toast.text('请输入正确的拍摄价格', 'middle')
          return false
        }
      }
      if (!this.checkList.length) {
        this.$vux.toast.text('请选择一个用户', 'middle')
        return false
      }
      let unameArr = []
      for (let i = 0; i < this.checkList.length; i++) {
        unameArr.push(this.checkList[i].linkman)
      }
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/invite`, params).then(res => {
        let data = res.data
        this.issubmit = false
        this.$vux.toast.text(data.error, 'middle')
        if (data.flag) {
          this.showChooseUser = false
          this.refresh()
        }
      })
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
          for (let i = 0; i < retdata.length; i++) {
            retdata[i].ideaObject = {}
            if (retdata[i].idea && retdata[i].idea !== '') {
              retdata[i].ideaObject = JSON.parse(retdata[i].idea)
            }
            this.inviteObject[retdata[i].uid] = retdata[i]
          }
          this.checkList = data.uids
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
    handleCurrentChange (val) {
      this.ideaRadio = val.uid
    },
    onSubmit2 () {
      if (this.issubmit) return false
      let params = {
        suid: this.ideaRadio,
        id: parseInt(this.query.id)
      }
      if (!this.ideaRadio || this.ideaRadio === '') {
        this.$vux.toast.text('请选择一条创意梗概', 'middle')
        return false
      }
      let selectedInvite = this.inviteObject[this.ideaRadio]
      this.$vux.confirm.show({
        content: `您确定选择${selectedInvite.linkman}为该订单的供应商吗？`,
        onConfirm: () => {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/selectIdea`, params).then(res => {
            let data = res.data
            this.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  if (this.isManager || this.isSale) {
                    this.$router.push({path: '/makeList', query: {status: 2}})
                  } else {
                    this.$router.push({path: '/makeUserList', query: {status: 2}})
                  }
                } else {
                  this.issubmit = false
                  this.refresh()
                }
              }
            })
          })
        }
      })
    },
    submitUpload (refname) {
      console.log('in upload')
      this.$refs[refname].submit()
    },
    handleUploadBtn (fileList) {
      console.log('in handleUploadBtn')
      console.log(fileList)
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
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    handleChange (file, fileList) {
      this.handleUploadBtn(fileList)
      this.$refs.upload1.submit()
    },
    uploadError () {
      this.$vux.toast.text('上传失败，请检查上传文件的格式是否正确', 'middle')
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
    handleUploadBtn1 (fileList) {
      let isDis = false
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (!cur.issuccess) {
          isDis = true
          break
        }
      }
      this.disUploadBtn1 = isDis
    },
    handleRemove1 (file, fileList) {
      this.photos = fileList
      this.handleUploadBtn1(fileList)
      this.$refs.upload2.submit()
    },
    handleChange1 (file, fileList) {
      this.handleUploadBtn1(fileList)
      this.$refs.upload.submit()
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
      this.photos = fileList
      this.handleUploadBtn1(fileList)
    },
    handleUploadBtn2 (fileList) {
      let isDis = false
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (!cur.issuccess) {
          isDis = true
          break
        }
      }
      this.disUploadBtn2 = isDis
    },
    handleRemove2 (file, fileList) {
      this.samplePiece = fileList
      this.handleUploadBtn2(fileList)
    },
    handleChange2 (file, fileList) {
      this.handleUploadBtn2(fileList)
      this.$refs.upload3.submit()
    },
    afterUpload2 (res, file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (cur.response && cur.response.flag) {
          cur.name = cur.response.data
          cur.issuccess = true
          cur.url = cur.response.data
        }
      }
      this.samplePiece = fileList
      this.handleUploadBtn2(fileList)
    },
    uploadSamplePiece () {
      if (!this.issubmit) {
        let params = {demandid: parseInt(this.query.id)}
        if (!this.tableData4.length) {
          if (!this.photos.length) {
            this.$vux.toast.text('请选择上传演员身份证及肖像权协议扫描件', 'middle')
            return false
          }
        }
        if (!this.samplePiece.length) {
          this.$vux.toast.text('请选择上传样片', 'middle')
          return false
        }
        let attachmentPhotos = []
        for (let i = 0; i < this.photos.length; i++) {
          let cur = this.photos[i]
          if (cur.issuccess) {
            attachmentPhotos.push(cur.name)
          }
        }
        if (attachmentPhotos.length) params.photos = attachmentPhotos.join(',')
        let attachment = []
        for (let i = 0; i < this.samplePiece.length; i++) {
          let cur = this.samplePiece[i]
          if (cur.issuccess) {
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
          if (cur.issuccess) {
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
    getInfo () {
      // [0=>'新发布','1'=>'需求已确认','2'=>'需求已分发','3'=>'确认供应商','4'=>'创意已确认',5=>'分镜脚本已确认','6'=>'样片已确认'];
      // 新发布的可以编辑，其它状态都不可以编辑
      if (!this.query.id) return false
      this.$http.post(`${ENV.BokaApi}/api/demands/info`, {id: this.query.id}).then(res => {
        const data = res.data
        if (!data.flag) {
          this.showSos = true
          this.sosTxt = data.error
          return false
        }
        const retdata = data.data ? data.data : data
        this.$util.infoSetRole(data.identity, this)
        this.handleBtn()
        if (retdata.canedit) {
          this.allowEdit = true
        } else {
          this.allowEdit = false
        }
        if (retdata.confirmedidea && retdata.confirmedidea !== '') {
          retdata.confirmedideaObject = JSON.parse(retdata.confirmedidea)
        }
        this.viewData = retdata
        if (retdata.invitors) {
          this.supplyData = retdata.invitors
          this.disSupplyList = true
        }
        if ((this.viewData.status === 2 && this.isInvitor) || (this.viewData.status === 3 && this.isSupplier)) {
          if (retdata.myidea && retdata.myidea !== '') {
            this.ideaObject = JSON.parse(retdata.myidea)
          }
        }
        if (this.viewData.status >= 4) {
          if (retdata.confirmedidea && retdata.confirmedidea !== '') {
            this.ideaObject = JSON.parse(retdata.confirmedidea)
          }
        }
        this.historyData = data.historydata
        if (this.viewData.starttime) {
          this.viewData.starttime_str = new Time(this.viewData.starttime * 1000).dateFormat('yyyy-MM-dd')
        } else {
          this.viewData.starttime_str = ''
        }
        if (this.viewData.endtime) {
          this.viewData.endtime_str = new Time(this.viewData.endtime * 1000).dateFormat('yyyy-MM-dd')
        } else {
          this.viewData.endtime_str = ''
        }
        if (this.historyData) {
          if (this.historyData.starttime) {
            this.historyData.starttime_str = new Time(this.historyData.starttime * 1000).dateFormat('yyyy-MM-dd')
          } else {
            this.historyData.starttime_str = ''
          }
          if (this.historyData.endtime) {
            this.historyData.endtime_str = new Time(this.historyData.endtime * 1000).dateFormat('yyyy-MM-dd')
          } else {
            this.historyData.endtime_str = ''
          }
        }
        this.viewData.v_starttime = new Date(retdata.starttime * 1000)
        this.viewData.v_endtime = new Date(retdata.endtime * 1000)
        this.handleBtn()
        if (retdata.ideas) {
          for (var i = 0; i < retdata.ideas.length; i++) {
            let curd = retdata.ideas[i]
            curd.datetime = new Time(this.viewData.endtime * 1000).dateFormat('yyyy-MM-dd')
          }
        }
        // if (retdata.confirmedidea) {
        //   this.idea = retdata.confirmedidea
        // }
        if (retdata.status === 2 && retdata.caninviteinfo) {
          this.getData3()
        }
        if (retdata.attachment && retdata.attachment !== '') {
          let arr = retdata.attachment.split(',')
          for (let i = 0; i < arr.length; i++) {
            this.fileList.push({name: arr[i], issuccess: true, url: arr[i]})
          }
        }
        this.samplePiece = []
        if (retdata.video && retdata.video !== '') {
          let arr = retdata.video.split(',')
          for (let i = 0; i < arr.length; i++) {
            this.samplePiece.push({name: arr[i], issuccess: true, url: arr[i]})
          }
        }
        if (this.query.type) {
          if (retdata.status === 5 || retdata.status === 6) {
            this.getData4()
          }
        }
      })
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/demands/fieldsList`).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.fieldsData = retdata
          this.durationOptions = this.$util.transSelectOption(retdata.duration, 'int')
          this.ratioOptions = this.$util.transSelectOption(retdata.ratio, 'int')
          this.videoclassOptions = this.$util.transSelectOption(retdata.videoclass, 'int')
          this.logo_allOptions = this.$util.transSelectOption(retdata.logo_all, 'int')
          this.logo_endOptions = this.$util.transSelectOption(retdata.logo_end, 'int')
          this.videotypeOptions = this.$util.transSelectOption(retdata.videotype)
          this.comefromOptions = this.$util.transSelectOption(retdata.comefrom)
          this.pricetypeOptions = this.$util.transSelectOption(retdata.pricetype)
          console.log(this.ratioOptions)
          this.getInfo()
        }
      })
    },
    initData () {
      this.showSos = false
      this.viewData = {}
      this.pageStart = 0
      this.disTabData = false
      this.tableData = []
      this.pageStart2 = 0
      this.disTabData2 = false
      this.tableData2 = []
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
      this.ideaRadio = ''
      this.issubmit = false
      this.tableData4 = []
      this.disTabData4 = false
      this.allowEdit = true
      this.showChooseUser = false
      this.submitUser = null
      this.dialogTitle = ''
      this.selectedIdeaData = null
      this.ideaObject = {}
      this.backReason = ''
      this.showBackDialog = false
      this.showIdeaDialog = false
      this.selectedSuid = 0
      this.showSupplyDialog = false
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.$util.setUserRole(this)
      let token = Token.get()
      this.uploadHeaders.Authorization = `Bearer ${token.token}`
      this.initData()
      this.$vux.loading.show()
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.make-detail-page{
  padding:10px;box-sizing: border-box;
  .sos-area{
    width:100%;
    .sos-txt{width:100%;display:flex;justify-content: center;align-items: center;color:#ff0000;padding:20px 0;}
  }
  .txt-css{text-align:left;padding:0 15px;box-sizing: border-box;}
  .diff-css{color:#ff0000;text-decoration:line-through;text-align:left;padding:0 15px 5px;}
  .add-make-list{
    width: 99.9%;
    border-collapse:collapse;
    td{
      border: 1px solid #333;
    }
    .title{
      width:115px;text-align: center;
      padding: 9px;
      span{color: red;}
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
  .idea-table{
    width: 99.9%;
    border-collapse: collapse;
    td{
      border: 1px solid #333;padding:5px 10px;box-sizing:border-box;
    }
    tr:nth-child(1){font-weight:bold;text-align:center;}
    tr td:nth-child(1){width:100px;text-align:center;}
    tr td:nth-child(3){background-color:#797373;color:#fff;}
  }
  .idea-table.three-col{
    tr td:nth-child(2){width:50%;}
  }
}
.users-box{
  height: 200px;
  overflow-y: scroll;
  .el-card__body{padding:10px;box-sizing: border-box;}
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
.inviteDialog{
  .el-input-group__prepend{padding:0;width:80px;text-align:center;}
}
</style>
