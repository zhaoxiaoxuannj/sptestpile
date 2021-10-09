<%--
  Created by IntelliJ IDEA.
  User: Zxx
  Date: 2021/9/27
  Time: 16:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>datd测试桩页面</title>
    <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="/static/script/lib/element-ui-2.13.2/theme-chalk/index.css">
    <link rel="stylesheet" type="text/css" href="/static/css/custom.css">
    <script type="text/javascript" src="/static/script/lib/jquery-3.2.0/jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="/static/script/lib/vue-2.6.10/vue.min.js"></script>
    <script type="text/javascript" src="/static/script/lib/babel-polyfill-6.26.0/polyfill.min.js"></script>
    <script type="text/javascript" src="/static/script/lib/element-ui-2.13.2/index.js"></script>
    <script type="text/javascript" src="/static/script/lib/element-ui-2.13.2/umd/locale/zh-CN.js"></script>
    <script type="text/javascript" src="/static/script/lib/element-ui-2.13.2/umd/locale/en.js"></script>
    <script type="text/javascript" src="/static/script/lib/echarts/echarts-4.9.0.min.js"></script>
    <script type="text/javascript" src="/static/script/lib/echarts/china.js"></script>

</head>

<body>
<div id="app">
    <div>
        <el-radio-group v-model="configflag" size="small">
            <el-radio-button label="config">基础项配置</el-radio-button>
            <el-radio-button label="detect">域名检测</el-radio-button>
        </el-radio-group>
    </div>
   <el-form ref="clientform" :model="clientform" :rules="clientformrules" v-show="configflag=='config'"  label-width="130px">
        <h4>启动项配置</h4>
       <el-row>
           <el-col :span="6">
               <el-form-item label="远端服务器IP" prop="serverip">
                   <el-input type="text" v-model="clientform.serverip" style="width:200px"></el-input>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="远端服务器端口" prop="serverport" width="220px">
                   <el-input type="text" v-model="clientform.serverport" style="width:200px"></el-input>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="租户ID" prop="rentid">
                   <el-input v-model="clientform.rentid"></el-input>
               </el-form-item>
           </el-col>
       </el-row>
       <h4>基础配置</h4>
       <el-row>
           <el-col :span="6">
               <el-form-item label="madulm是否检测" prop="madulmflag">
                   <el-select v-model="clientform.madulmflag">
                       <el-option label="是" value="1"></el-option>
                       <el-option label="否" value="0"></el-option>
                   </el-select>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="是否返回内容分类" prop="contentflag">
                   <el-select v-model="clientform.contentflag">
                       <el-option label="返回内容分类" value="0"></el-option>
                       <el-option label="仅返回威胁" value="1"></el-option>
                   </el-select>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="缓存TTL(s)" prop="cachettl">
                      <el-input v-model="clientform.cachettl"></el-input>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="上报类型" prop="reporttype">
                   <el-select v-model="clientform.reporttype">
                       <el-option label="全部上报" value="0"></el-option>
                       <el-option label="仅上报威胁" value="1"></el-option>
                   </el-select>
               </el-form-item>
           </el-col>
       </el-row>
       <el-form-item align="center">
           <el-button type="primary" @click="operateClient(1)">启动并初始化</el-button>
           <el-button @click="operateClient(0)">停止</el-button>
       </el-form-item>
   </el-form>
    <el-radio-group v-model="showflag" size="small" style="margin-top: 20px" v-show="configflag=='detect'">
        <el-radio-button label="single">单域名查询</el-radio-button>
        <el-radio-button label="batch">批量域名检测</el-radio-button>
    </el-radio-group>
    <h4 v-show="configflag=='detect'">检测参数</h4>
    <el-form ref="detectform" :model="detectform" :rules="detectformrules" v-show="configflag=='detect'" label-width="130px">
       <el-row v-show="showflag=='single'">
           <el-col :span="12">
               <el-form-item label="待检测数据" prop="domain">
                   <el-input type="text" v-model="detectform.domain"></el-input>
               </el-form-item>
           </el-col>
           <el-col :span="6">
               <el-form-item label="检测类型" prop="detecttype">
                   <el-select v-model="detectform.detecttype">
                       <el-option label="组合查询" value="1"></el-option>
                       <el-option label="缓存查询" value="2"></el-option>
                       <el-option label="仅云端检测" value="3"></el-option>
                   </el-select>
               </el-form-item>
           </el-col>
       </el-row>
        <el-form-item align="center" v-show="showflag=='single'">
            <el-button type="primary" @click="onSubmit()">检测</el-button>
            <el-button>取消</el-button>
        </el-form-item>
       <el-row v-show="showflag=='batch'">
           <el-col :span="12">
               <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
                   <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
                   <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".ter">
                   <span class="add-file-right-more">支持扩展名：.ter </span>
               </div>
               <div class="add-file-list">
                   <ul>
                       <li v-for="(item, index) in fileList" :key="index"><a >{{item.name}}</a></li>
                   </ul>
               </div>
           </el-col>
       </el-row>
        <el-form-item align="center" v-show="showflag=='batch'">
            <el-button type="primary" @click="submitAddFile" >开始检测</el-button>
            <el-button @click="resetFileList" >全部删除</el-button>
        </el-form-item>
   </el-form>
    <h4 v-show="configflag=='detect'&& showflag=='single'">检测结果</h4>
        <el-input
                placeholder="检测结果"
                type="textarea"
                :rows="5"
                v-model="detectresult"
                v-show="configflag=='detect'&& showflag=='single'">
        </el-input>
</div>
</body>
<script>
var app=new Vue({
    el:'#app',
    data() {
        return {
        fileList:[],
        addFileName:"",
        showflag:"single",
        configflag:"config",
        detectresult:"",
        clientform:{
            serverip:"161.189.162.66",
            serverport:"25000",
            reporttype:"1",
            madulmflag:"1",
            contentflag:"0",
            cachettl:"5",
            rentid:"",
        },
        detectform:{
            domain:"",
            detecttype:"1"
        },
        clientformrules: {
            serverip:[
                {required: true, message: 'IP地址必填'}
            ],
            rentid:[
                {required: true, message: '租户ID必填'}
            ],
            serverport: [
                {required: true, message: '端口必填'},

            ],
            cachettl: [
                {required: true, message: '必须为数字'},

            ],
        },
        detectformrules: {
            domain:[
                {required: true, message: '待检测数据不能为空'}
            ]
        }
        }
    },
   methods:{
       onSubmit(){
           this.$refs.detectform.validate((valid)=>{
               if(valid) {
                   var that=this;
                   $.ajax({
                       type: 'POST',
                       url: 'detectsubmit',
                       data: that.detectform,
                       dataType:'text',
                       success:function(msginfo)
                       {
                           that.detectresult=msginfo
                       }
                   });
               }
               else{
                   this.$error("error");
               }
           });
        },
       operateClient(type){
           this.$refs.clientform.validate((valid)=>{
               if(valid) {
                   debugger;
                   var that=this;
                   var operateurl=type==1?"startClient":"stopClient";
                   $.ajax({
                       type: 'POST',
                       url: operateurl,
                       data: that.clientform,
                       dataType:'text',
                       success:function(msginfo){
                           that.$message(msginfo);
                       }
                   });
               }
               else{
                   this.$error("error");
       }
       });
       },
       getFile(event){
           var file = event.target.files;
           for(var i = 0;i<file.length;i++){
               //    上传类型判断
               var imgName = file[i].name;
               var idx = imgName.lastIndexOf(".");
               if (idx != -1){
                   var ext = imgName.substr(idx+1).toUpperCase();
                   ext = ext.toLowerCase( );
                   if (ext!='ter'){

                   }else{
                       this.fileList.push(file[i]);
                   }
               }else{

               }
           }
       },
       submitAddFile(){
           if(0 == this.fileList.length){
               this.$message({
                   type: 'info',
                   message: '请选择要上传的文件'
               });
               return;
           }

           var formData = new FormData();

           for(var i=0;i<this.fileList.length;i++){
               formData.append('fileUpload',this.fileList[i]);
           }
           let config = {
               headers: {
                   'Content-Type': 'multipart/form-data',
                   'Authorization': this.token
               }
           };
           var that=this;
           $.ajax({
               type: 'POST',
               url: 'detectbatchsubmit',
               data: formData,
               dataType:'text',
               cache: false,
               processData: false,
               contentType: false,
               success:function(msginfo)
               {
                   that.resetFileList();
                   
                   that.$message(msginfo);
               }
           });
           },
       resetFileList(){
           this.fileList=[]
       }
       }
       });
</script>
</html>
