<template>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form :model="user">

            <el-form-item label="头像" >
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </el-form-item>
            <el-form-item label="账号" >
                <el-input v-model="user.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" >
                <el-input v-model="user.account" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "UserDialog",
        props:['dialogFormVisible'],
        data() {
            return {
                user:{

                },
            }
        },
        methods: {
            closeDialog () {
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>

</style>