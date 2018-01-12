<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="中文版" name="chinese"></el-tab-pane>
            <el-tab-pane label="英文版" name="english"></el-tab-pane>
        </el-tabs>
       <div class="main">
            <div class="title">
                <span>公司地址：</span>
                <el-input v-model="giftName" placeholder="请输入内容" class="input-text"></el-input>
            </div>        
            <div class="title">
                <span>联系电话：</span>
                <el-input v-model="giftName" placeholder="请输入联系电话" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>传真：</span>
                <el-input v-model="giftName" placeholder="请输入传真" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>邮编：</span>
                <el-input v-model="giftName" placeholder="请输入邮编" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>产品销售：</span>
                <el-input v-model="giftName" placeholder="请输入产品销售" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>技术支持：</span>
                <el-input v-model="giftName" placeholder="请输入技术支持" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>合作邮箱：</span>
                <el-input v-model="giftName" placeholder="请输入合作邮箱" class="input-text"></el-input>
            </div>
            <div class="title">
                <span>招聘邮箱：</span>
                <el-input v-model="giftName" placeholder="请输入招聘邮箱" class="input-text"></el-input>
            </div>            
            <div class="btns">
                <el-button type="primary"  @click="handleSave">保存</el-button>
            </div>
        </div>
       

    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    data() {
        return {
            giftName:'',
            percentage:'',
            exchangeLimit:'',
            giftType:'',
            giftTypeName:'',
            giftTypeCode:0,
            point:'',
            activeName:'chinese'
        }
    },
    mounted() {
        this.getGiftById();
    },
    methods: {
        getGiftById(){  
            if(this.id){
                let url = CONSTANT.URL.GIFT.GETGIFTBYID,
                param={id:this.id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        let data = res.data.bussData;
                        this.id = data.id;
                        this.giftName = data.giftName;
                        this.giftType = data.giftType;
                        if(this.giftType == '1000005'){
                            this.giftTypeName = '实物奖品'
                        }
                        else if(this.giftType == '1000006'){
                            this.giftTypeName = '虚拟奖品'
                        }else if(this.giftType == '1000007'){
                            this.giftTypeName = '吉分'
                        }
                        this.percentage = String(data.percentage);
                        this.exchangeLimit = data.exchangeLimit;
                        this.imgUrl = data.imageUrl;
                        this.fileUrl = data.fileUrl;
                        this.point = data.point;
                    }
                })
            }
        },
        handleSave(){
            
            if(!this.paraLimit(this.giftName,0)) { return false;}
            else if(!this.paraLimit(this.suffix,1)) { return false;}
            else if(!this.paraLimit(this.giftType,2)) { return false;}
            else if(!this.paraLimit(this.exchangeLimit,3)) { return false;}
            else if(!this.paraLimit(this.percentage,4)) { return false;}
           
            if(this.percentage.includes('.')){
                if(this.percentage.split('.')[1].length>2){
                    this.$message({
                        type: 'warning',
                        message: '中奖概率只能保留两位小数'
                    }); 
                    return       
                }
            }
            if(this.giftType == '1000007'){
                if(!this.paraLimit(this.point,5)){
                    return;
                }
            }
            let url = CONSTANT.URL.GIFT.SAVEGIFT;
            let param = {
                    id:this.id?this.id:'',
                    giftName:this.giftName,
                    giftType:this.giftType,
                    percentage:this.percentage,
                    exchangeLimit:this.exchangeLimit,
                    url:this.fileUrl,
                    point:this.point
                };
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.$router.push("/prizeList");
                }else{
                    this.$message({           
                        message: res.msg,           
                        type: 'warning'         
                    });
                }
            })
        },
    },
    
}
</script>

<style lang="scss" scoped>
    .container {
        .header{
            height: 46px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dedede;
            p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
            .el-button{
                float: right ;
            }
        }
        .main {
            width:80%;
            margin: 20px auto;
            clear: both;
            .title {
                margin-top: 20px;
                span {
                    width: 11%;
                    display: inline-block;
                    i{ color: red;}
                }
                .input-text {
                    width: 35%;
                }
               // .el-select{ width: 50%;}
               .pro-comments{ height: 96px;}
            }
            .cover {
                margin-top: 20px;
                span {
                    width: 11%;
                    float: left;
                    i{ color: red;}
                }
                .avatar-uploader {
                     .el-upload {
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        .avatar-uploader-icon {
                            font-size: 28px;
                            color: #8c939d;
                            width: 178px;
                            height: 178px;
                            line-height: 178px;
                            text-align: center;
                            border: 1px dashed #d9d9d9 !important;
                            border-radius: 6px;
                            margin-left: 6px;
                        }
                        .avatar {
                            width: 178px;
                            height: 178px;
                            display: block;
                        }
                    }
                    .el-upload:hover {
                        border-color: #20a0ff;
                    }
                    
                }
                
            }
            .btns {
                text-align: left;
                margin-top: 40px;
                margin-left: 11%;
            }
        }
    }
</style>
