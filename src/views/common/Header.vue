<template>
    <div class="header">
        <span style="color: white;float: right;padding-top: 15px;padding-right: 20px; padding-left: 20px;" >你好,{{$store.getters.getUser.nickname}}</span>
        <el-dropdown style="float: right;" @command="handleCommand">
                    <span class="el-dropdown-link">
                       <img  :src="$store.getters.getUser.avatar" class="user-image"/>
                    </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {removeStorage} from "../../utils/storage";

    export default {
        name: "header",
        data() {
            return {

            }
        },
        methods: {
            handleCommand(command) {
                if (command == "logout") {
                    removeStorage("token")
                    this.$router.push({name:'login'})
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
.el-dropdown {
    padding-top: 4px;
}
.user-image {
    width: 54px;
    height: 54px;
    border-radius: 50%;
}
</style>