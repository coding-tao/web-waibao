<template>
    <div class="label-wrap level-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="中文版" name="chinese"></el-tab-pane>
            <el-tab-pane label="英文版" name="english"></el-tab-pane>
        </el-tabs>
        <div class="words_list_header">
            <el-button class="link" type="primary">
                <router-link :to="{ name: 'productEdit', params: {}}">新增</router-link>
            </el-button>
        </div>
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%"
            >
            <el-table-column
            label="分类名称" min-width='100' align="center" >
            <template slot-scope="scope">
                <span v-if="scope.row.giftName != '谢谢参与'">{{ scope.row.giftType | formatGoodType}}</span>
                <span v-else>--</span>
            </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                min-width='100'
                 align="center"
                >
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"  class="btn-wrap"
                        @click="modalShow(scope.row)">编辑</el-button>
                    <el-button @click="handleDelete(tableData[scope.$index].id)" 
                    type="text" size="small" style="background: red;color: #fff;padding: 7px 14px;">删除</el-button>  
                </template>
            </el-table-column>
        </el-table>
            <el-pagination
            v-if="pageCount"
            layout="prev, pager, next"
            :current-page='pageIndex'
            :total="pageCount" @current-change="pageSizeChange">
            </el-pagination>
            <div class="confirm_dialog" >
                <el-dialog title="增减吉分" :visible.sync="dialogTableVisible">
                    <el-form :model="form">
                        <el-form-item label="*增减吉分:" :label-width="formLabelWidth">
                            <el-col :span="14">
                                <el-input placeholder="请输入正数" :maxlength='7' v-model="num" auto-complete="off"></el-input>
                                *正数增加，负数减少
                            </el-col>
                        </el-form-item>
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-col :span="14">
                                <el-input placeholder="例如：线下活动" :maxlength='10' v-model="contentText" auto-complete="off"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <el-col class="foot" :span="14" :offset="11">
                        <el-button type="primary" @click="confirmBtn">确 定</el-button>
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                    </el-col>
                </el-dialog>
            </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    data() {
        return {
           
            dialogTableVisible:false,
            formLabelWidth:'320px',
           
            form: {
                name: ''
            },
            titleModal:'新增标签',
            id:'',
            trueNameLike:'',
            mobileLike:'',
            loading:true,
            nicknameLike:'',
            sexArr:['未知','男','女'],
            pageIndex:1,
            pageCount: '',
            tableData: [],
            contentText:'',
            num:'',
            url:'',
            points:'',
            pointsLike:1,
            multipleSelection: [],
            userId:'',
            activeName:'chinese'
        }

    },
    created(){
        this.userId = this.$route.query.id;
    },
    mounted () {
        this.getUserList(1);
        let id = common.getCookie('sessionId');
        this.url = 'https://glocalme.icebartech.com/api/admin/weixinuser/weixinUserCoreList2Excel?sessionId='+id;
    },
    methods: {
        sort(d,f){
            this.pointsLike = this.pointsLike? 0 :1;
            this.getUserList(1);
            this.pageIndex = 1;
        },
        formDate(num){
            return common.dateFormate(num,'birth');
        },
        handleSelectionChange(val) {
            let Ids = [];
            val.forEach(function(item){ 
                Ids.push({id:item.id})
            })
            this.multipleSelection = Ids.length?JSON.stringify(Ids):[];
           
        },
        handleDelete(id){
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
                let  url = CONSTANT.URL.GOOD.DELETEGOODS,
                    param = {id:id}
                common.requestAjax(url,param,(res)=>{
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:res.msg
                        });
                        this.getGoodList(1);
                    }else{
                        this.$message({           
                            message: res.msg,           
                            type: 'warning'         
                        });
                    }
                }) 
   
            }).catch(() => {           
                this.$message({             
                    type: 'info',             
                    message: '已取消删除'           
                });                   
            });    
        },
        getUserList(pageIndex){
            this.pageIndex = pageIndex;
            this.loading = true;
            let url = CONSTANT.URL.USER.FINDUSERBYPAGE,
            param={
                trueNameLike:this.trueNameLike,
                nicknameLike:this.nicknameLike,
                mobileLike:this.mobileLike,
                pageIndex:pageIndex,
                pointsLike:this.pointsLike,
                pageSize:10,
                userId:this.userId?this.userId:''
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*10;
                }
            })
        },
        // 分页
        pageSizeChange(val){
           this.pageIndex = val;
           this.getUserList(val);
        },
        modalShow(val){
           this.id = val.id;
           this.points = val.points
           this.title = '增减吉分';
            this.num = '';
            this.contentText='';
           this.dialogTableVisible = true;
        },
        confirmBtn(item){
            if(!this.num){
                 this.$message({
                    type: 'warning',
                    message: '增减吉分不能为空!'
                });
                return false;
            }
            if(isNaN(this.num)){
                this.$message({
                    type: 'warning',
                    message: '增减吉分必须为数字!'
                });
                return false;
            }
            let num = parseInt(this.num);
            if(num>=0){
                if(this.points+num>999999){
                    this.$message({
                        type: 'warning',
                        message: '吉分总数不能大于6位数!'
                    });
                    return;
                }
            }else{
                if(this.points+(num)<0){
                    this.$message({
                        type: 'warning',
                        message: '吉分总数不能小于0!'
                    });
                    return;
                }
            }

            let url = CONSTANT.URL.USER.CHANGEPOINT,
            param={
                points:this.num,
                userId:this.id,
                memo:this.contentText
            }
            common.requestAjax(url,param,(res)=>{
                if(res.status == 200){
                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.dialogTableVisible = false;
                    this.getUserList(1)
                }else{
                    this.$message({
                        type: 'warning',
                        message: res.msg
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss" >
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .el-dialog__body{
        padding-bottom: 50px;
    }
    .level-list{
        .wrap-search{
            margin-bottom: 20px;
            .search-item{
                float: left;
                margin-right: 20px;
            }
            .search-title{
                display: inline;
                width: 100px;
                height: 36px;
                line-height: 36px;
                text-align: right;
                margin-bottom: 20px;
                margin-right: 10px;
            }
            button{
                float: left;
                margin-top: 20px;
            }

            .el-input{
                margin-top: 20px;
            }
        }
        .input_modal {
            margin-top: 20px;
            margin-bottom: 30px;
            span {
                display: inline-block;
            }
            .el-input {
                display: inline-block;
                width: 20%;
            }
            .el-button {
                display: inline-block;
            }
        }
        .words_list_header {
                padding-bottom: 15px;
                border-bottom: 1px solid #d0d0d0;
                .el-button {
                    a {
                        color: #fff;
                    }
                }
            }
    }

    .el-table_1_column_2 {
        .cell {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }
    .foot{
        margin-bottom: 20px;
    }
    .add-btn{
        margin-bottom: 20px;    
    }
    .export{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        padding: 8px 10px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #c4c4c4;
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
    }
    .pagination {
        text-align: center;
        width: 80%;
        margin-top: 60px;
    }
    .el-pagination{
        margin-left: 35%;
        margin-top: 50px;
    }
</style>
