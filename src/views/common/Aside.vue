<template>
    <div id="parent">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo "
                background-color="#96b97d"
                text-color="#fff"
                active-text-color="white">
            <el-menu-item index="2">
                <span slot="title">用户列表</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style lang="scss" scoped>
    .el-menu {
        height: 1000px;
    }


</style>