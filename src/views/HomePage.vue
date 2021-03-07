<template>
    <el-container>
        <el-header><Header></Header></el-header>
        <el-container>
            <el-aside width="200px"><Aside></Aside></el-aside>
            <el-main>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="id"
                            label="id"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="account"
                            label="账号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="昵称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="float: right;">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
                <el-dialog title="用户信息" :visible.sync="dialogVisible" @close="closeDialog">

                    <el-form :model="userinfo" :rules="userinfoRules" ref="EditUserinforForm">
                        <el-form-item label="头像" >
                            <el-upload
                                    :http-request="upLoad"
                                    class="avatar-uploader"
                                    action="noaction"
                                    :show-file-list="false"
                                    >
                                <el-avatar  :src="userinfo.avatar" :key="userinfo.avatar" :size="60 "></el-avatar>
                            </el-upload>

                        </el-form-item>
                        <el-form-item label="账号" :label-width="120" prop="account">
                            <el-input v-model="userinfo.account" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" :label-width="120" prop="nickname">
                            <el-input v-model="userinfo.nickname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updateUser">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    import Header from "./common/Header"
    import Aside from "./common/Aside"
    import UserDialog from "./UserDialog";
    import {uploadImage,getUserList,updateUser, deleteUser} from "../apis/user";
    import {getStorage} from "../utils/storage";

    export default {
        components:{Header, Aside, UserDialog},
        name: "HomePage",
        data () {
            return {
                tableData: [],
                dialogVisible: false,
                currentPage:0,
                total:0,
                pageNum:0,
                pageSize:20,
                userinfo:{
                    id:'',
                    account:'',
                    nickname:'',
                    avatar:''
                },
                userinfoRules:{
                    account:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    nickname:[
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.init()
            this.$store.dispatch('asyncUpdateUser', JSON.parse(getStorage("user")))
        },
        methods: {
            handleCurrentChange(val) {
                this.pageNum = val
                this.init()
            },
            handleClick(user) {
                this.dialogVisible = true
                this.userinfo = user
            },
            deleteUser(user) {
                deleteUser(user.id).then(res => {
                    if (res.data.status == 200) {
                        this.$message.success("删除成功!")
                        this.init()
                    } else {
                        this.$message.error(res.data.message)
                    }

                }).catch(err => {
                    this.$message.error(err)
                })
            },
            closeDialog() {
                this.dialogVisible = false
            },
            handleAvatarSuccess() {

            },
            beforeAvatarUpload() {

            },
            updateUser () {
                this.$refs["EditUserinforForm"].validate((valid) => {

                    if (valid) {
                        updateUser(this.userinfo)
                        .then(res=>{
                            console.log(res)
                            if (res.data.status == 200) {
                                this.$message.success("更新成功!")
                            } else {
                                this.$message.error(res.data.message)
                            }
                            this.dialogVisible = false
                        }).catch(err=>{
                            this.$message.error(err)
                        })

                    }
                })
            },
            init() {
                getUserList(this.pageNum,this.pageSize)
                .then(res=> {
                    if (res.data.status == 200) {
                        this.tableData = res.data.data
                        this.total = res.data.num
                    }
                })
                .catch(err=>{
                    this.$message.error(err)
                })
            },
            upLoad(file) {
                const formData = new FormData();

                formData.append('file', file.file);
                uploadImage(formData).then(res=>{
                    if (res.data.code == 200) {
                        this.userinfo.avatar = res.data.data
                        this.$message.success("上传成功！")
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(err => {

                })


            }


        }

    }
</script>

<style lang="scss" >
.el-header {
    background-color: black;
}
</style>